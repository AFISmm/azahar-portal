// ============================================================================
// GET    /api/empleados/[id]  -> el propio empleado, o cualquiera si eres admin.
// PATCH  /api/empleados/[id]  -> actualización parcial, solo administradores.
// DELETE /api/empleados/[id]  -> elimina la cuenta, solo administradores.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin, requireAuth } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

interface EmpleadoPatchPayload {
  nombre?: string;
  correo?: string;
  cargo?: string;
  departamento?: string;
  tipoContrato?: string;
  fechaIngreso?: string;
  diasVacacionesDisponibles?: number;
  salario?: number | null;
  rol?: "empleado" | "admin";
  estado?: "activo" | "inactivo";
  avatarUrl?: string | null;
  telefono?: string | null;
  permisosTrazabilidad?: string[];
  permisosPos?: string[];
}

const PERMISOS_TRAZABILIDAD = ["ADMIN", "FINCA", "BENEFICIADO", "TUESTE", "EMPAQUE"];
const PERMISOS_POS = ["ADMIN", "CAJA", "COCINA"];

function obtenerId(req: VercelRequest): string {
  const { id } = req.query;
  const valor = Array.isArray(id) ? id[0] : id;
  if (!valor) throw new HttpError(400, "Falta el id del empleado.");
  return valor;
}

function esErrorCorreoDuplicado(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const id = obtenerId(req);

    if (req.method === "GET") {
      const { empleadoId } = await requireAuth(req);
      if (empleadoId !== id) {
        // No está consultando su propio perfil: solo un admin puede ver el de alguien más.
        const { rows: filasSolicitante } = await sql<EmpleadoRow>`select * from empleados where id = ${empleadoId} limit 1`;
        if (filasSolicitante[0]?.rol !== "admin") {
          throw new HttpError(403, "No tienes permiso para consultar este empleado.");
        }
      }

      const { rows } = await sql<EmpleadoRow>`select * from empleados where id = ${id} limit 1`;
      const fila = rows[0];
      if (!fila) throw new HttpError(404, "Empleado no encontrado.");
      return res.status(200).json({ ok: true, empleado: mapEmpleadoRow(fila) });
    }

    if (req.method === "PATCH") {
      await requireAdmin(req);

      const { rows: filasActuales } = await sql<EmpleadoRow>`select * from empleados where id = ${id} limit 1`;
      const actual = filasActuales[0];
      if (!actual) throw new HttpError(404, "Empleado no encontrado.");

      const body = req.body as EmpleadoPatchPayload;

      // Se resuelve explícitamente cada columna editable (patch o valor
      // actual) y se hace un único UPDATE con todos los valores resultantes,
      // en vez de construir SQL dinámico a partir de las llaves del body.
      const nombre = body.nombre ?? actual.nombre;
      const correo = body.correo ?? actual.correo;
      const cargo = body.cargo ?? actual.cargo;
      const departamento = body.departamento ?? actual.departamento;
      const tipoContrato = body.tipoContrato ?? actual.tipo_contrato;
      const fechaIngreso = body.fechaIngreso ?? actual.fecha_ingreso;
      const diasVacacionesDisponibles = body.diasVacacionesDisponibles ?? Number(actual.dias_vacaciones_disponibles);
      const salario = body.salario !== undefined ? body.salario : actual.salario === null ? null : Number(actual.salario);
      const rol = body.rol ?? actual.rol;
      const estado = body.estado ?? actual.estado;
      const avatarUrl = body.avatarUrl !== undefined ? body.avatarUrl : actual.avatar_url;
      const telefono = body.telefono !== undefined ? body.telefono : actual.telefono;
      if (body.permisosTrazabilidad !== undefined) {
        if (!Array.isArray(body.permisosTrazabilidad) || body.permisosTrazabilidad.some((p) => !PERMISOS_TRAZABILIDAD.includes(p))) {
          throw new HttpError(400, "Permisos de trazabilidad inválidos.");
        }
      }
      if (body.permisosPos !== undefined) {
        if (!Array.isArray(body.permisosPos) || body.permisosPos.some((p) => !PERMISOS_POS.includes(p))) {
          throw new HttpError(400, "Permisos de POS inválidos.");
        }
      }

      try {
        const { rows } = await sql<EmpleadoRow>`
          update empleados set
            nombre = ${nombre},
            correo = ${correo},
            cargo = ${cargo},
            departamento = ${departamento},
            tipo_contrato = ${tipoContrato},
            fecha_ingreso = ${fechaIngreso},
            dias_vacaciones_disponibles = ${diasVacacionesDisponibles},
            salario = ${salario},
            rol = ${rol},
            estado = ${estado},
            avatar_url = ${avatarUrl},
            telefono = ${telefono}
          where id = ${id}
          returning *
        `;
        // Los permisos de módulos van en un UPDATE aparte y SOLO si vienen en la
        // petición: así editar un empleado sigue funcionando aunque la migración
        // db/migrar-trazabilidad.mjs (que crea esas columnas) aún no se haya corrido.
        let fila = rows[0];
        if (body.permisosTrazabilidad !== undefined || body.permisosPos !== undefined) {
          const trazabilidad = body.permisosTrazabilidad ?? fila.permisos_trazabilidad ?? [];
          const pos = body.permisosPos ?? fila.permisos_pos ?? [];
          const { rows: conPermisos } = await sql<EmpleadoRow>`
            update empleados set
              permisos_trazabilidad = ${trazabilidad as unknown as string},
              permisos_pos = ${pos as unknown as string}
            where id = ${id}
            returning *
          `;
          fila = conPermisos[0];
        }
        return res.status(200).json({ ok: true, empleado: mapEmpleadoRow(fila) });
      } catch (err) {
        if (esErrorCorreoDuplicado(err)) {
          throw new HttpError(409, "Ya existe otro empleado con ese correo.");
        }
        throw err;
      }
    }

    if (req.method === "DELETE") {
      await requireAdmin(req);

      const { rows: filasActuales } = await sql<EmpleadoRow>`select * from empleados where id = ${id} limit 1`;
      if (!filasActuales[0]) throw new HttpError(404, "Empleado no encontrado.");

      // Las llaves foráneas de solicitudes, documentos y nomina_pagos usan
      // `on delete cascade` (ver db/schema.sql), así que este único DELETE
      // ya se encarga de limpiar todas las filas relacionadas.
      await sql`delete from empleados where id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, PATCH, DELETE");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
