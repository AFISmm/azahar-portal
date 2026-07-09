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

// ----------------------------------------------------------------------------
// TEMPORAL: siembra pagos de nómina de ejemplo (no existe un endpoint para
// crearlos, solo para actualizar su estado). Se elimina justo después de
// usarse una sola vez. Vive aquí para no sumar una función serverless más
// al límite de 12 del plan Hobby.
// ----------------------------------------------------------------------------
async function sembrarNominaTemporal(req: VercelRequest, res: VercelResponse): Promise<void> {
  const authSecret = process.env.AUTH_SECRET;
  const token = typeof req.query.token === "string" ? req.query.token : undefined;
  if (!authSecret || !token || token !== authSecret) {
    res.status(401).json({ ok: false, mensaje: "No autorizado." });
    return;
  }
  try {
    const { rows: empleados } = await sql<{ id: string; correo: string }>`select id, correo from empleados`;
    const montoPorCorreo: Record<string, number> = {
      "mariacamila.restrepo@azaharcoffee.co": 4800000,
      "juanpablo.gomez@azaharcoffee.co": 1700000,
      "laurasofia.martinez@azaharcoffee.co": 4200000,
      "carlosandres.perez@azaharcoffee.co": 3600000,
      "daniela.rios@azaharcoffee.co": 3200000,
      "santiago.vargas@azaharcoffee.co": 1300000,
    };
    let creados = 0;
    for (const emp of empleados) {
      const monto = montoPorCorreo[emp.correo];
      if (!monto) continue;
      await sql`insert into nomina_pagos (empleado_id, periodo, fecha_pago, monto, estado) values (${emp.id}, 'Junio 2026', '2026-06-30', ${monto}, 'pagado')`;
      await sql`insert into nomina_pagos (empleado_id, periodo, fecha_pago, monto, estado) values (${emp.id}, 'Julio 2026', '2026-07-31', ${monto}, 'pendiente')`;
      creados += 2;
    }
    res.status(200).json({ ok: true, creados });
  } catch (err) {
    res.status(500).json({ ok: false, mensaje: err instanceof Error ? err.message : "Error inesperado." });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.sembrar === "1") {
    return sembrarNominaTemporal(req, res);
  }

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
