// ============================================================================
// PATCH /api/solicitudes/[id] -> aprueba/rechaza una solicitud. Solo admin.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin } from "../_lib/auth.js";
import { mapSolicitudRow, type SolicitudEstado, type SolicitudRow } from "../_lib/mappers.js";

function obtenerId(req: VercelRequest): string {
  const { id } = req.query;
  const valor = Array.isArray(id) ? id[0] : id;
  if (!valor) throw new HttpError(400, "Falta el id de la solicitud.");
  return valor;
}

const ESTADOS_VALIDOS: SolicitudEstado[] = ["pendiente", "aprobada", "rechazada"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa PATCH." });
  }

  try {
    const { empleadoId: adminId } = await requireAdmin(req);
    const id = obtenerId(req);
    const body = req.body as Partial<{ estado: SolicitudEstado }>;
    if (!body.estado || !ESTADOS_VALIDOS.includes(body.estado)) {
      throw new HttpError(400, "El campo 'estado' es obligatorio y debe ser pendiente, aprobada o rechazada.");
    }

    const { rows } = await sql<SolicitudRow>`
      update solicitudes
      set estado = ${body.estado}, resuelto_en = now(), resuelto_por = ${adminId}
      where id = ${id}
      returning *
    `;
    const fila = rows[0];
    if (!fila) throw new HttpError(404, "Solicitud no encontrada.");
    return res.status(200).json({ ok: true, solicitud: mapSolicitudRow(fila) });
  } catch (err) {
    return manejarError(res, err);
  }
}
