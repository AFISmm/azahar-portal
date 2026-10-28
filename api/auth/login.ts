// ============================================================================
// POST   /api/auth/login                  -> verifica correo + contraseña
//                                            contra `empleados` (bcrypt) y,
//                                            si coinciden, establece la
//                                            cookie de sesión (ver
//                                            api/_lib/auth.ts).
// DELETE /api/auth/login                  -> cierra sesión (limpia la
//                                            cookie). No requiere que la
//                                            sesión sea válida.
// GET    /api/auth/login?google=start     -> redirige a la pantalla de
//                                            consentimiento de Google.
// GET    /api/auth/login?google=callback  -> vuelve de Google, intercambia
//                                            el code, y si el correo
//                                            verificado coincide con un
//                                            empleado ya existente, deja la
//                                            sesión iniciada.
// ----------------------------------------------------------------------------
// El logout, y ahora el login con Google, viven en este mismo archivo (no en
// api/auth/logout.ts ni api/auth/google.ts) para no gastar más funciones
// serverless del límite de 12 del plan Hobby de Vercel — ya se usan las 12.
//
// El login con Google NUNCA crea una cuenta nueva: solo sirve como una
// credencial alterna para una cuenta que un admin ya creó (mismo modelo que
// la contraseña temporal + cambio obligatorio). Si el correo de Google no
// coincide con ningún empleado, se rechaza con un mensaje claro.
//
// Requiere estas variables de entorno (Project Settings -> Environment
// Variables): GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET. El redirect_uri
// autorizado en Google Cloud Console debe ser exactamente
// `https://<dominio>/api/auth/login?google=callback`.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { sql } from "../_lib/db.js";
import { crearTokenSesion, limpiarCookieSesion, manejarError, setearCookieSesion } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

interface LoginPayload {
  correo: string;
  password: string;
}

const ESTADO_GOOGLE_COOKIE = "google_oauth_state";

function urlBase(req: VercelRequest): string {
  const protocolo = req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
  return `${protocolo}://${req.headers.host}`;
}

function redirectUriGoogle(req: VercelRequest): string {
  return `${urlBase(req)}/api/auth/login?google=callback`;
}

function extraerCookie(req: VercelRequest, nombre: string): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  for (const parte of cookieHeader.split(";")) {
    const [clave, ...resto] = parte.trim().split("=");
    if (clave === nombre) return decodeURIComponent(resto.join("="));
  }
  return null;
}

/** Inicia el flujo: genera un `state` anti-CSRF, lo guarda en una cookie corta, y redirige a Google. */
function iniciarGoogle(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.redirect(302, "/login?google_error=config_faltante");
  }

  const estado = crypto.randomBytes(24).toString("hex");
  const seguro = req.headers["x-forwarded-proto"] === "https";
  res.setHeader(
    "Set-Cookie",
    `${ESTADO_GOOGLE_COOKIE}=${estado}; HttpOnly; Path=/; Max-Age=300; SameSite=Lax${seguro ? "; Secure" : ""}`,
  );

  const parametros = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUriGoogle(req),
    response_type: "code",
    scope: "openid email profile",
    state: estado,
    prompt: "select_account",
  });
  return res.redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${parametros.toString()}`);
}

interface RespuestaTokenGoogle {
  id_token?: string;
  error?: string;
  error_description?: string;
}

interface InfoTokenGoogle {
  aud?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
}

/** Vuelve de Google: valida el state, intercambia el code, y verifica el id_token contra el endpoint oficial de Google. */
async function callbackGoogle(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.redirect(302, "/login?google_error=config_faltante");
  }

  const estadoCookie = extraerCookie(req, ESTADO_GOOGLE_COOKIE);
  res.setHeader("Set-Cookie", `${ESTADO_GOOGLE_COOKIE}=; HttpOnly; Path=/; Max-Age=0`);

  const query = req.query;
  const code = typeof query.code === "string" ? query.code : undefined;
  const estadoRecibido = typeof query.state === "string" ? query.state : undefined;

  if (!code || !estadoRecibido || !estadoCookie || estadoRecibido !== estadoCookie) {
    return res.redirect(302, "/login?google_error=estado_invalido");
  }

  const respuestaToken = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUriGoogle(req),
      grant_type: "authorization_code",
    }),
  });
  const datosToken = (await respuestaToken.json().catch(() => null)) as RespuestaTokenGoogle | null;
  if (!respuestaToken.ok || !datosToken?.id_token) {
    return res.redirect(302, "/login?google_error=token_fallido");
  }

  // Verificación del id_token delegada al propio endpoint de Google (llamada
  // servidor-a-servidor, no del cliente) en vez de validar el JWT a mano.
  const respuestaInfo = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(datosToken.id_token)}`);
  const info = (await respuestaInfo.json().catch(() => null)) as InfoTokenGoogle | null;
  const emailVerificado = info?.email_verified === true || info?.email_verified === "true";
  if (!respuestaInfo.ok || !info?.email || info.aud !== clientId || !emailVerificado) {
    return res.redirect(302, "/login?google_error=token_invalido");
  }

  const { rows } = await sql<EmpleadoRow>`select * from empleados where lower(correo) = lower(${info.email}) limit 1`;
  const empleado = rows[0];
  if (!empleado || empleado.estado !== "activo") {
    return res.redirect(302, "/login?google_error=sin_cuenta");
  }

  const token = crearTokenSesion(empleado.id);
  setearCookieSesion(res, token, req);
  return res.redirect(302, "/inicio");
}

async function login(req: VercelRequest, res: VercelResponse) {
  const body = req.body as Partial<LoginPayload>;
  const correo = body.correo?.trim();
  const password = body.password;
  if (!correo || !password) {
    return res.status(400).json({ ok: false, mensaje: "Correo y contraseña son obligatorios." });
  }

  const { rows } = await sql<EmpleadoRow>`select * from empleados where lower(correo) = lower(${correo}) limit 1`;
  const fila = rows[0];
  const coincide = fila ? await bcrypt.compare(password, fila.password_hash) : false;

  if (!fila || !coincide) {
    return res.status(401).json({ ok: false, mensaje: "Correo o contraseña incorrectos." });
  }

  const token = crearTokenSesion(fila.id);
  setearCookieSesion(res, token, req);
  return res.status(200).json({ ok: true, empleado: mapEmpleadoRow(fila) });
}

async function logout(_req: VercelRequest, res: VercelResponse) {
  limpiarCookieSesion(res);
  return res.status(200).json({ ok: true });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET" && req.query.google === "start") {
      try {
        return iniciarGoogle(req, res);
      } catch {
        return res.redirect(302, "/login?google_error=error_inesperado");
      }
    }
    if (req.method === "GET" && req.query.google === "callback") {
      try {
        return await callbackGoogle(req, res);
      } catch {
        return res.redirect(302, "/login?google_error=error_inesperado");
      }
    }
    if (req.method === "POST") return await login(req, res);
    if (req.method === "DELETE") return await logout(req, res);

    res.setHeader("Allow", "POST, DELETE, GET");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
