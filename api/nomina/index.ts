// ============================================================================
// GET /api/nomina -> los propios pagos, o todos (opcionalmente filtrados por
//                    ?empleadoId=) si quien llama es admin.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { manejarError, requireAuth } from "../_lib/auth.js";
import { mapNominaPagoRow, type NominaPagoRow } from "../_lib/mappers.js";

interface EmpleadoRolRow {
  rol: "empleado" | "admin";
}

async function esAdmin(empleadoId: string): Promise<boolean> {
  const { rows } = await sql<EmpleadoRolRow>`select rol from empleados where id = ${empleadoId} limit 1`;
  return rows[0]?.rol === "admin";
}

function primerValor(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa GET." });
  }

  try {
    const { empleadoId } = await requireAuth(req);
    const admin = await esAdmin(empleadoId);
    const filtro = primerValor(req.query.empleadoId);
    const empleadoObjetivo = admin ? filtro || null : empleadoId;

    const { rows } = empleadoObjetivo
      ? await sql<NominaPagoRow>`select * from nomina_pagos where empleado_id = ${empleadoObjetivo} order by fecha_pago desc`
      : await sql<NominaPagoRow>`select * from nomina_pagos order by fecha_pago desc`;

    return res.status(200).json({ ok: true, pagos: rows.map(mapNominaPagoRow) });
  } catch (err) {
    return manejarError(res, err);
  }
}
