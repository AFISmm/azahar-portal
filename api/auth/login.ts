// ============================================================================
// POST   /api/auth/login -> verifica correo + contraseña contra `empleados`
//                           (bcrypt) y, si coinciden, establece la cookie de
//                           sesión (ver api/_lib/auth.ts).
// DELETE /api/auth/login -> cierra sesión (limpia la cookie). No requiere que
//                           la sesión sea válida: si ya expiró o no existe,
//                           simplemente no hay nada que limpiar.
// ----------------------------------------------------------------------------
// El logout vivía en su propio archivo (api/auth/logout.ts) y se fusionó
// aquí (distinguiendo por método HTTP) para no gastar dos funciones
// serverless del límite de 12 del plan Hobby de Vercel.
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
