// ============================================================================
// GET /api/empleados
// ----------------------------------------------------------------------------
// Tiene dos modos, según los parámetros de query:
//
//  - GET /api/empleados            -> listado completo, SOLO administradores.
//  - GET /api/empleados?correo=... -> chequeo de existencia SIN autenticar.
//
// El segundo modo existe porque /registro necesita verificar en el cliente
// si un correo ya está en uso ANTES de que exista cualquier sesión (ver
// src/lib/httpDataSource.ts, getEmpleadoByCorreo, y
// src/auth/AuthContext.tsx, registrar()). Como no hay sesión todavía, esta
// rama NUNCA puede exigir requireAdmin/requireAuth — pero por la misma razón
// jamás debe devolver más que un booleano de existencia: exponer el listado
// completo (o siquiera el nombre) de empleados sin autenticar sería una fuga
// de datos. La verificación real y definitiva del duplicado ocurre de todas
// formas del lado del servidor en /api/registro.ts (más la restricción
// `unique` en la base de datos), así que esta ruta es solo una ayuda de UX,
// no el mecanismo de seguridad.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { manejarError, requireAdmin } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa GET." });
  }

  try {
    const correoParam = req.query.correo;
    const correo = Array.isArray(correoParam) ? correoParam[0] : correoParam;

    if (typeof correo === "string" && correo.trim()) {
      const { rows } = await sql<{ existe: boolean }>`
        select exists(select 1 from empleados where lower(correo) = lower(${correo.trim()})) as existe
      `;
      return res.status(200).json({ ok: true, existe: Boolean(rows[0]?.existe) });
    }

    await requireAdmin(req);
    const { rows } = await sql<EmpleadoRow>`select * from empleados order by nombre`;
    return res.status(200).json({ ok: true, empleados: rows.map(mapEmpleadoRow) });
  } catch (err) {
    return manejarError(res, err);
  }
}
