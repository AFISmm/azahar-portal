// ============================================================================
// GET   /api/nomina        -> los propios pagos, o todos (opcionalmente
//                             filtrados por ?empleadoId=) si admin.
// PATCH /api/nomina?id=... -> actualiza el estado de un pago. Solo admin.
// ----------------------------------------------------------------------------
// El PATCH por-id vivía en su propio archivo (api/nomina/[id].ts) y se
// fusionó aquí (usando ?id= en el query string en vez de un segmento de ruta)
// para no gastar dos funciones serverless del límite de 12 del plan Hobby.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin, requireAuth } from "../_lib/auth.js";
import { mapNominaPagoRow, type EstadoNomina, type NominaPagoRow } from "../_lib/mappers.js";

interface EmpleadoRolRow {
  rol: "empleado" | "admin";
}

const ESTADOS_VALIDOS: EstadoNomina[] = ["pendiente", "pagado"];

async function esAdmin(empleadoId: string): Promise<boolean> {
  const { rows } = await sql<EmpleadoRolRow>`select rol from empleados where id = ${empleadoId} limit 1`;
  return rows[0]?.rol === "admin";
}

function primerValor(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

async function listar(req: VercelRequest, res: VercelResponse) {
  const { empleadoId } = await requireAuth(req);
  const admin = await esAdmin(empleadoId);
  const filtro = primerValor(req.query.empleadoId);
  const empleadoObjetivo = admin ? filtro || null : empleadoId;

  const { rows } = empleadoObjetivo
    ? await sql<NominaPagoRow>`select * from nomina_pagos where empleado_id = ${empleadoObjetivo} order by fecha_pago desc`
    : await sql<NominaPagoRow>`select * from nomina_pagos order by fecha_pago desc`;

  return res.status(200).json({ ok: true, pagos: rows.map(mapNominaPagoRow) });
}

async function actualizarEstado(req: VercelRequest, res: VercelResponse) {
  await requireAdmin(req);
  const id = primerValor(req.query.id);
  if (!id) throw new HttpError(400, "Falta el id del pago.");
  const body = req.body as Partial<{ estado: EstadoNomina }>;
  if (!body.estado || !ESTADOS_VALIDOS.includes(body.estado)) {
    throw new HttpError(400, "El campo 'estado' es obligatorio y debe ser pendiente o pagado.");
  }

  const { rows } = await sql<NominaPagoRow>`update nomina_pagos set estado = ${body.estado} where id = ${id} returning *`;
  const fila = rows[0];
  if (!fila) throw new HttpError(404, "Pago de nómina no encontrado.");
  return res.status(200).json({ ok: true, pago: mapNominaPagoRow(fila) });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") return await listar(req, res);
    if (req.method === "PATCH") return await actualizarEstado(req, res);

    res.setHeader("Allow", "GET, PATCH");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
