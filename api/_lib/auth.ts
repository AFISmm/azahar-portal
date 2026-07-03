// ============================================================================
// Autenticación hecha a mano para Portal Azahar: contraseñas con hash bcrypt
// (ver api/_lib/crearEmpleado.ts) + una cookie de sesión firmada como JWT.
// Reemplaza a Supabase Auth, que no tiene equivalente en Vercel Postgres.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { sql } from "./db.js";
import { mapEmpleadoRow, type EmpleadoRow } from "./mappers.js";

export const SESSION_COOKIE_NAME = "azahar_session";

const TREINTA_DIAS_EN_SEGUNDOS = 60 * 60 * 24 * 30;

/** Error HTTP tipado: las rutas de /api lo capturan y lo traducen a una respuesta JSON (ver manejarError). */
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

function obtenerAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET no está configurado en el servidor. Defínelo en las variables de entorno del proyecto de Vercel.",
    );
  }
  return secret;
}

/** Firma un JWT de sesión para el empleado indicado. Expira en ~30 días. */
export function crearTokenSesion(empleadoId: string): string {
  return jwt.sign({ empleadoId }, obtenerAuthSecret(), { expiresIn: TREINTA_DIAS_EN_SEGUNDOS });
}

function extraerCookie(cookieHeader: string, nombre: string): string | null {
  const partes = cookieHeader.split(";");
  for (const parte of partes) {
    const [clave, ...resto] = parte.trim().split("=");
    if (clave === nombre) {
      return decodeURIComponent(resto.join("="));
    }
  }
  return null;
}

/** true si la petición llegó por HTTPS (Vercel siempre lo indica vía este encabezado, incluso detrás del proxy). */
function esPeticionSegura(req: VercelRequest): boolean {
  return req.headers["x-forwarded-proto"] === "https";
}

/**
 * Establece la cookie de sesión HttpOnly. `Secure` solo se añade cuando la
 * petición es realmente HTTPS: en local (`vercel dev` sobre http plano) el
 * navegador descartaría una cookie `Secure` enviada por un origen no seguro,
 * dejando al usuario sin poder iniciar sesión.
 */
export function setearCookieSesion(res: VercelResponse, token: string, req: VercelRequest): void {
  const atributos = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${TREINTA_DIAS_EN_SEGUNDOS}`,
  ];
  if (esPeticionSegura(req)) atributos.push("Secure");
  res.setHeader("Set-Cookie", atributos.join("; "));
}

/** Limpia la cookie de sesión (logout). */
export function limpiarCookieSesion(res: VercelResponse): void {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
}

/** Lee y valida la cookie de sesión de la petición. Devuelve el id de empleado, o null si no hay sesión válida. */
export function leerEmpleadoIdDeSesion(req: VercelRequest): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const token = extraerCookie(cookieHeader, SESSION_COOKIE_NAME);
  if (!token) return null;
  try {
    const payload = jwt.verify(token, obtenerAuthSecret());
    if (typeof payload === "object" && payload !== null && typeof (payload as { empleadoId?: unknown }).empleadoId === "string") {
      return (payload as { empleadoId: string }).empleadoId;
    }
    return null;
  } catch {
    return null;
  }
}

/** Exige una sesión válida. Lanza HttpError 401 si no la hay. */
export async function requireAuth(req: VercelRequest): Promise<{ empleadoId: string }> {
  const empleadoId = leerEmpleadoIdDeSesion(req);
  if (!empleadoId) {
    throw new HttpError(401, "No hay una sesión activa. Inicia sesión de nuevo.");
  }
  return { empleadoId };
}

/** Exige una sesión válida Y que el empleado tenga rol 'admin'. Lanza HttpError 401/403. */
export async function requireAdmin(req: VercelRequest): Promise<{ empleadoId: string; empleado: EmpleadoRow }> {
  const { empleadoId } = await requireAuth(req);
  const { rows } = await sql<EmpleadoRow>`select * from empleados where id = ${empleadoId} limit 1`;
  const empleado = rows[0];
  if (!empleado) {
    throw new HttpError(401, "La sesión ya no es válida.");
  }
  if (empleado.rol !== "admin") {
    throw new HttpError(403, "Esta acción requiere rol de administrador.");
  }
  return { empleadoId, empleado };
}

/** Traduce cualquier error capturado en un catch a una respuesta JSON con el código HTTP adecuado. */
export function manejarError(res: VercelResponse, err: unknown): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({ ok: false, mensaje: err.message });
    return;
  }
  const mensaje = err instanceof Error ? err.message : "Error inesperado en el servidor.";
  res.status(500).json({ ok: false, mensaje });
}

// Re-exportado por conveniencia: varias rutas necesitan mapear la fila del
// admin cargado por requireAdmin al perfil público (por ejemplo para devolver
// también el perfil del solicitante).
export { mapEmpleadoRow };
