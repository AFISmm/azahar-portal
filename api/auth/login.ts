// ============================================================================
// POST /api/auth/login
// ----------------------------------------------------------------------------
// Verifica correo + contraseña contra `empleados` (bcrypt) y, si coinciden,
// establece la cookie de sesión (ver api/_lib/auth.ts).
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { sql } from "../_lib/db.js";
import { crearTokenSesion, manejarError, setearCookieSesion } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

interface LoginPayload {
  correo: string;
  password: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa POST." });
  }

  try {
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
  } catch (err) {
    return manejarError(res, err);
  }
}
