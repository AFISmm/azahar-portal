// ============================================================================
// GET /api/auth/me
// ----------------------------------------------------------------------------
// Devuelve el empleado de la sesión activa (o 401 si no hay ninguna). Lo usa
// AuthContext.tsx para restaurar la sesión al cargar la app y para
// refrescar el perfil del empleado actual.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { leerEmpleadoIdDeSesion, manejarError } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa GET." });
  }

  try {
    const empleadoId = leerEmpleadoIdDeSesion(req);
    if (!empleadoId) {
      return res.status(401).json({ ok: false });
    }

    const { rows } = await sql<EmpleadoRow>`select * from empleados where id = ${empleadoId} limit 1`;
    const fila = rows[0];
    if (!fila) {
      return res.status(401).json({ ok: false });
    }

    return res.status(200).json({ ok: true, empleado: mapEmpleadoRow(fila) });
  } catch (err) {
    return manejarError(res, err);
  }
}
