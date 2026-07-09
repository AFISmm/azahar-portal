// ============================================================================
// GET   /api/solicitudes          -> las propias, o todas (opcionalmente
//                                     filtradas por ?empleadoId=) si admin.
// POST  /api/solicitudes          -> crea una solicitud propia del que llama.
// PATCH /api/solicitudes?id=...   -> aprueba/rechaza una solicitud. Solo admin.
// ----------------------------------------------------------------------------
// El PATCH por-id vivía en su propio archivo (api/solicitudes/[id].ts) y se
// fusionó aquí (usando ?id= en el query string en vez de un segmento de ruta)
// para no gastar dos funciones serverless del límite de 12 del plan Hobby.
//
// Un empleado sin rol admin JAMÁS puede leer ni escribir solicitudes de otro:
// el empleado_id efectivo siempre se resuelve del lado del servidor a partir
// de la sesión, nunca de un valor que envíe el cliente.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin, requireAuth } from "../_lib/auth.js";
import { mapSolicitudRow, type SolicitudEstado, type SolicitudRow, type SolicitudTipo } from "../_lib/mappers.js";

interface EmpleadoRolRow {
  rol: "empleado" | "admin";
}

interface SolicitudPostPayload {
  tipo: SolicitudTipo;
  fechaInicio?: string | null;
  fechaFin?: string | null;
  motivo?: string | null;
}

const ESTADOS_VALIDOS: SolicitudEstado[] = ["pendiente", "aprobada", "rechazada"];

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
  // Nunca se confía en ?empleadoId= para un no-admin: se fuerza a su propio id.
  const empleadoObjetivo = admin ? filtro || null : empleadoId;

  const { rows } = empleadoObjetivo
    ? await sql<SolicitudRow>`select * from solicitudes where empleado_id = ${empleadoObjetivo} order by creado_en desc`
    : await sql<SolicitudRow>`select * from solicitudes order by creado_en desc`;

  return res.status(200).json({ ok: true, solicitudes: rows.map(mapSolicitudRow) });
}

async function crear(req: VercelRequest, res: VercelResponse) {
  const { empleadoId } = await requireAuth(req);
  const body = req.body as Partial<SolicitudPostPayload>;
  if (!body.tipo) throw new HttpError(400, "Falta el campo 'tipo'.");

  // El empleado_id de la nueva solicitud siempre es el del que llama, sin
  // importar qué venga en el body.
  const { rows } = await sql<SolicitudRow>`
    insert into solicitudes (empleado_id, tipo, estado, fecha_inicio, fecha_fin, motivo)
    values (${empleadoId}, ${body.tipo}, 'pendiente', ${body.fechaInicio ?? null}, ${body.fechaFin ?? null}, ${body.motivo ?? null})
    returning *
  `;
  return res.status(201).json({ ok: true, solicitud: mapSolicitudRow(rows[0]) });
}

async function resolver(req: VercelRequest, res: VercelResponse) {
  const { empleadoId: adminId } = await requireAdmin(req);
  const id = primerValor(req.query.id);
  if (!id) throw new HttpError(400, "Falta el id de la solicitud.");
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
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") return await listar(req, res);
    if (req.method === "POST") return await crear(req, res);
    if (req.method === "PATCH") return await resolver(req, res);

    res.setHeader("Allow", "GET, POST, PATCH");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
