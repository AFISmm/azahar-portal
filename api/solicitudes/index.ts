// ============================================================================
// GET  /api/solicitudes -> las propias, o todas (opcionalmente filtradas por
//                          ?empleadoId=) si quien llama es admin.
// POST /api/solicitudes -> crea una solicitud propia del que llama.
// ----------------------------------------------------------------------------
// Un empleado sin rol admin JAMÁS puede leer ni escribir solicitudes de otro:
// el empleado_id efectivo siempre se resuelve del lado del servidor a partir
// de la sesión, nunca de un valor que envíe el cliente.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAuth } from "../_lib/auth.js";
import { mapSolicitudRow, type SolicitudRow, type SolicitudTipo } from "../_lib/mappers.js";

interface EmpleadoRolRow {
  rol: "empleado" | "admin";
}

interface SolicitudPostPayload {
  tipo: SolicitudTipo;
  fechaInicio?: string | null;
  fechaFin?: string | null;
  motivo?: string | null;
}

async function esAdmin(empleadoId: string): Promise<boolean> {
  const { rows } = await sql<EmpleadoRolRow>`select rol from empleados where id = ${empleadoId} limit 1`;
  return rows[0]?.rol === "admin";
}

function primerValor(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { empleadoId } = await requireAuth(req);

    if (req.method === "GET") {
      const admin = await esAdmin(empleadoId);
      const filtro = primerValor(req.query.empleadoId);
      // Nunca se confía en ?empleadoId= para un no-admin: se fuerza a su propio id.
      const empleadoObjetivo = admin ? filtro || null : empleadoId;

      const { rows } = empleadoObjetivo
        ? await sql<SolicitudRow>`select * from solicitudes where empleado_id = ${empleadoObjetivo} order by creado_en desc`
        : await sql<SolicitudRow>`select * from solicitudes order by creado_en desc`;

      return res.status(200).json({ ok: true, solicitudes: rows.map(mapSolicitudRow) });
    }

    if (req.method === "POST") {
      const body = req.body as Partial<SolicitudPostPayload>;
      if (!body.tipo) throw new HttpError(400, "Falta el campo 'tipo'.");

      // El empleado_id de la nueva solicitud siempre es el del que llama,
      // sin importar qué venga en el body.
      const { rows } = await sql<SolicitudRow>`
        insert into solicitudes (empleado_id, tipo, estado, fecha_inicio, fecha_fin, motivo)
        values (${empleadoId}, ${body.tipo}, 'pendiente', ${body.fechaInicio ?? null}, ${body.fechaFin ?? null}, ${body.motivo ?? null})
        returning *
      `;
      return res.status(201).json({ ok: true, solicitud: mapSolicitudRow(rows[0]) });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
