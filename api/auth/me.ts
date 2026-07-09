// ============================================================================
// GET   /api/auth/me -> el empleado de la sesión activa (o 401 si no hay ninguna).
// PATCH /api/auth/me -> auto-edición del propio perfil: correo, contraseña y
//                       nickname/username (ver src/pages/MiPerfil.tsx). Nunca
//                       toca los campos "bloqueados" (nombre, cargo, fechas,
//                       identificación, salario, rol) — para eso existe
//                       PATCH /api/empleados/[id], reservado a administradores.
// ----------------------------------------------------------------------------
// GET  /api/auth/me?pqr=destinos  -> lista {id, nombre} de cuentas de tipo
//                                    'desarrollador' (para el selector del
//                                    formulario de radicar PQR). Cualquier
//                                    sesión activa puede consultarla.
// GET  /api/auth/me?pqr=recibidas -> PQR radicadas hacia la sesión actual.
//                                    Solo cuentas de tipo 'desarrollador'.
// POST /api/auth/me?pqr=1         -> radica una PQR. Cualquier cuenta que NO
//                                    sea de tipo 'desarrollador'.
// PATCH /api/auth/me?pqr=<id>     -> cambia el estado de una PQR propia
//                                    (pendiente/resuelta). Solo el
//                                    destinatario ('desarrollador') puede
//                                    resolverla.
// La funcionalidad de PQR vive aquí (en vez de su propio api/pqr/index.ts)
// para no superar el límite de 12 funciones serverless del plan Hobby de
// Vercel — mismo criterio que ya se usó para fusionar login+logout o
// nomina/solicitudes con sus PATCH por query string.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { sql } from "../_lib/db.js";
import { HttpError, leerEmpleadoIdDeSesion, manejarError, requireAuth } from "../_lib/auth.js";
import { mapEmpleadoRow, mapPqrRow, type EmpleadoRow, type PqrEstado, type PqrRow } from "../_lib/mappers.js";

const RONDAS_SAL = 10;

interface PerfilPatchPayload {
  correo?: string;
  password?: string;
  username?: string;
}

interface PqrPayload {
  nombre: string;
  cedula?: string;
  correo: string;
  adminDestinoId: string;
  problema: string;
}

function esErrorDuplicado(err: unknown): string | null {
  if (typeof err !== "object" || err === null || (err as { code?: string }).code !== "23505") return null;
  const detalle = (err as { constraint?: string }).constraint ?? "";
  if (detalle.includes("username")) return "username";
  return "correo";
}

async function actualizarPerfilPropio(req: VercelRequest, res: VercelResponse) {
  const { empleadoId } = await requireAuth(req);
  const body = req.body as PerfilPatchPayload;

  const { rows } = await sql<EmpleadoRow>`select * from empleados where id = ${empleadoId} limit 1`;
  const actual = rows[0];
  if (!actual) throw new HttpError(401, "La sesión ya no es válida.");

  const correo = body.correo?.trim() || actual.correo;
  const username = body.username !== undefined ? body.username.trim() || null : actual.username;
  const passwordHash = body.password ? await bcrypt.hash(body.password, RONDAS_SAL) : actual.password_hash;

  try {
    const { rows: actualizadas } = await sql<EmpleadoRow>`
      update empleados set correo = ${correo}, username = ${username}, password_hash = ${passwordHash}
      where id = ${empleadoId}
      returning *
    `;
    return res.status(200).json({ ok: true, empleado: mapEmpleadoRow(actualizadas[0]) });
  } catch (err) {
    const campo = esErrorDuplicado(err);
    if (campo === "username") throw new HttpError(409, "Ese nickname ya está en uso por otra cuenta.");
    if (campo === "correo") throw new HttpError(409, "Ya existe otra cuenta con ese correo.");
    throw err;
  }
}

async function listarDestinosPqr(req: VercelRequest, res: VercelResponse) {
  await requireAuth(req);
  const { rows } = await sql<{ id: string; nombre: string }>`
    select id, nombre from empleados where tipo_cuenta = 'desarrollador' order by nombre
  `;
  return res.status(200).json({ ok: true, destinos: rows });
}

async function listarPqrRecibidas(req: VercelRequest, res: VercelResponse) {
  const { empleadoId } = await requireAuth(req);
  const { rows: filasSolicitante } = await sql<EmpleadoRow>`select * from empleados where id = ${empleadoId} limit 1`;
  if (filasSolicitante[0]?.tipo_cuenta !== "desarrollador") {
    throw new HttpError(403, "Solo las cuentas de desarrollador pueden ver las PQR recibidas.");
  }
  const { rows } = await sql<PqrRow>`select * from pqr where admin_destino_id = ${empleadoId} order by creado_en desc`;
  return res.status(200).json({ ok: true, pqr: rows.map(mapPqrRow) });
}

async function radicarPqr(req: VercelRequest, res: VercelResponse) {
  const { empleadoId } = await requireAuth(req);
  const { rows: filasSolicitante } = await sql<EmpleadoRow>`select * from empleados where id = ${empleadoId} limit 1`;
  if (filasSolicitante[0]?.tipo_cuenta === "desarrollador") {
    throw new HttpError(403, "Las cuentas de desarrollador no pueden radicar PQR.");
  }

  const body = req.body as Partial<PqrPayload>;
  const nombre = body.nombre?.trim();
  const correo = body.correo?.trim();
  const problema = body.problema?.trim();
  const adminDestinoId = body.adminDestinoId?.trim();
  if (!nombre || !correo || !problema || !adminDestinoId) {
    throw new HttpError(400, "Faltan campos requeridos: nombre, correo, problema, adminDestinoId.");
  }

  const { rows: filasDestino } = await sql<EmpleadoRow>`select * from empleados where id = ${adminDestinoId} limit 1`;
  if (filasDestino[0]?.tipo_cuenta !== "desarrollador") {
    throw new HttpError(400, "El destinatario seleccionado no es una cuenta de desarrollador válida.");
  }

  const { rows } = await sql<PqrRow>`
    insert into pqr (empleado_id, nombre, cedula, correo, admin_destino_id, problema)
    values (${empleadoId}, ${nombre}, ${body.cedula?.trim() || null}, ${correo}, ${adminDestinoId}, ${problema})
    returning *
  `;
  return res.status(201).json({ ok: true, pqr: mapPqrRow(rows[0]) });
}

async function actualizarEstadoPqr(req: VercelRequest, res: VercelResponse, pqrId: string) {
  const { empleadoId } = await requireAuth(req);
  const body = req.body as { estado?: PqrEstado };
  if (body.estado !== "pendiente" && body.estado !== "resuelta") {
    throw new HttpError(400, "Estado inválido.");
  }

  const { rows } = await sql<PqrRow>`select * from pqr where id = ${pqrId} limit 1`;
  const actual = rows[0];
  if (!actual) throw new HttpError(404, "PQR no encontrada.");
  if (actual.admin_destino_id !== empleadoId) {
    throw new HttpError(403, "No puedes modificar una PQR que no fue radicada hacia tu cuenta.");
  }

  const { rows: actualizadas } = await sql<PqrRow>`update pqr set estado = ${body.estado} where id = ${pqrId} returning *`;
  return res.status(200).json({ ok: true, pqr: mapPqrRow(actualizadas[0]) });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      if (req.query.pqr === "destinos") return await listarDestinosPqr(req, res);
      if (req.query.pqr === "recibidas") return await listarPqrRecibidas(req, res);

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
    }

    if (req.method === "PATCH") {
      const pqrId = req.query.pqr;
      if (typeof pqrId === "string" && pqrId) {
        return await actualizarEstadoPqr(req, res, pqrId);
      }
      return await actualizarPerfilPropio(req, res);
    }

    if (req.method === "POST" && req.query.pqr === "1") {
      return await radicarPqr(req, res);
    }

    res.setHeader("Allow", "GET, PATCH, POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
