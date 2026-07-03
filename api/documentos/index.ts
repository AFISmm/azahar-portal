// ============================================================================
// GET  /api/documentos -> los propios, o todos (opcionalmente filtrados por
//                         ?empleadoId=) si quien llama es admin.
// POST /api/documentos -> agrega un documento.
// ----------------------------------------------------------------------------
// A diferencia de solicitudes/nómina, un empleado normal SÍ puede agregar
// documentos a su propio expediente (ver src/pages/Documentos.tsx +
// src/components/SubirDocumentoModal.tsx, usado por cualquier empleado para
// "subir" sus propios documentos). Un admin, en cambio, puede agregar
// documentos al expediente de cualquier empleado (ver
// src/pages/admin/AdminDocumentos.tsx). Por eso este endpoint exige solo
// requireAuth, no requireAdmin, y decide el empleado_id efectivo según el rol.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAuth } from "../_lib/auth.js";
import { mapDocumentoRow, type DocumentoRow } from "../_lib/mappers.js";

interface EmpleadoRolRow {
  rol: "empleado" | "admin";
}

interface DocumentoPostPayload {
  empleadoId?: string;
  nombre: string;
  tipo: string;
  url?: string | null;
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
    const admin = await esAdmin(empleadoId);

    if (req.method === "GET") {
      const filtro = primerValor(req.query.empleadoId);
      const empleadoObjetivo = admin ? filtro || null : empleadoId;

      const { rows } = empleadoObjetivo
        ? await sql<DocumentoRow>`select * from documentos where empleado_id = ${empleadoObjetivo} order by subido_en desc`
        : await sql<DocumentoRow>`select * from documentos order by subido_en desc`;

      return res.status(200).json({ ok: true, documentos: rows.map(mapDocumentoRow) });
    }

    if (req.method === "POST") {
      const body = req.body as Partial<DocumentoPostPayload>;
      if (!body.nombre || !body.tipo) throw new HttpError(400, "Faltan campos requeridos: nombre, tipo.");

      // Un empleado normal solo puede escribir en su propio expediente; un
      // admin puede especificar cualquier empleadoId.
      const empleadoObjetivo = admin && body.empleadoId ? body.empleadoId : empleadoId;

      const { rows } = await sql<DocumentoRow>`
        insert into documentos (empleado_id, nombre, tipo, url, subido_por)
        values (${empleadoObjetivo}, ${body.nombre}, ${body.tipo}, ${body.url ?? null}, ${empleadoId})
        returning *
      `;
      return res.status(201).json({ ok: true, documento: mapDocumentoRow(rows[0]) });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
