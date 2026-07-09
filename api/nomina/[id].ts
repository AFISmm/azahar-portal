// ============================================================================
// PATCH /api/nomina/[id] -> actualiza el estado de un pago. Solo admin.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin } from "../_lib/auth.js";
import { mapNominaPagoRow, type EstadoNomina, type NominaPagoRow } from "../_lib/mappers.js";

function obtenerId(req: VercelRequest): string {
  const { id } = req.query;
  const valor = Array.isArray(id) ? id[0] : id;
  if (!valor) throw new HttpError(400, "Falta el id del pago.");
  return valor;
}

const ESTADOS_VALIDOS: EstadoNomina[] = ["pendiente", "pagado"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa PATCH." });
  }

  try {
    await requireAdmin(req);
    const id = obtenerId(req);
    const body = req.body as Partial<{ estado: EstadoNomina }>;
    if (!body.estado || !ESTADOS_VALIDOS.includes(body.estado)) {
      throw new HttpError(400, "El campo 'estado' es obligatorio y debe ser pendiente o pagado.");
    }

    const { rows } = await sql<NominaPagoRow>`update nomina_pagos set estado = ${body.estado} where id = ${id} returning *`;
    const fila = rows[0];
    if (!fila) throw new HttpError(404, "Pago de nómina no encontrado.");
    return res.status(200).json({ ok: true, pago: mapNominaPagoRow(fila) });
  } catch (err) {
    return manejarError(res, err);
  }
}
