// ============================================================================
// POST   /api/auth/login  -> verifica correo + contraseña contra `empleados`
//                            (bcrypt) y, si coinciden, establece la cookie de
//                            sesión (ver api/_lib/auth.ts).
// DELETE /api/auth/login  -> cierra sesión (limpia la cookie). No requiere que
//                            la sesión sea válida.
// ----------------------------------------------------------------------------
// El logout vive aquí (no en api/auth/logout.ts) para no gastar una función
// serverless más del límite de 12 del plan Hobby de Vercel.
//
// El inicio de sesión con Google se eliminó: la única forma de entrar es correo
// y contraseña. Por eso el acceso total del dominio @mercurymethods.com (ver
// api/_lib/acceso.ts) depende de que esas cuentas solo las cree un
// administrador.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { sql } from "../_lib/db.js";
import { crearTokenSesion, limpiarCookieSesion, manejarError, setearCookieSesion } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

interface LoginPayload {
  correo: string;
  password: string;
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
  if (fila.estado !== "activo") {
    return res.status(403).json({ ok: false, mensaje: "Tu cuenta está desactivada. Contacta a un administrador." });
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
    if (req.method === "POST") return await login(req, res);
    if (req.method === "DELETE") return await logout(req, res);

    res.setHeader("Allow", "POST, DELETE");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
