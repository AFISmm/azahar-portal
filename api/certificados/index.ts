// ============================================================================
// GET  /api/certificados            -> listado completo, opcionalmente
//                                       filtrado por ?fincaId=. Solo admin.
// POST /api/certificados            -> registra un certificado de una finca.
//                                       Solo admin.
// ----------------------------------------------------------------------------
// `creado_por` siempre se resuelve del lado del servidor a partir de la
// sesión del admin que llama (ver requireAdmin), nunca de un valor enviado
// por el cliente — mismo criterio que `resuelto_por` en api/solicitudes/index.ts.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin } from "../_lib/auth.js";
import { mapCertificadoFincaRow, type CertificadoFincaRow } from "../_lib/mappers.js";

interface CertificadoPostPayload {
  fincaId: string;
  nombre: string;
  entidadCertificadora: string;
  numeroCertificado?: string | null;
  fechaEmision: string;
  fechaVencimiento?: string | null;
}

function primerValor(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function esErrorFincaInexistente(err: unknown): boolean {
  // Código de error estándar de Postgres para violación de llave foránea.
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23503";
}

async function listar(req: VercelRequest, res: VercelResponse) {
  await requireAdmin(req);
  const fincaId = primerValor(req.query.fincaId);

  const { rows } = fincaId
    ? await sql<CertificadoFincaRow>`select * from certificados_finca where finca_id = ${fincaId} order by creado_en desc`
    : await sql<CertificadoFincaRow>`select * from certificados_finca order by creado_en desc`;

  return res.status(200).json({ ok: true, certificados: rows.map(mapCertificadoFincaRow) });
}

async function crear(req: VercelRequest, res: VercelResponse) {
  const { empleadoId } = await requireAdmin(req);

  const body = req.body as Partial<CertificadoPostPayload>;
  const camposRequeridos: (keyof CertificadoPostPayload)[] = ["fincaId", "nombre", "entidadCertificadora", "fechaEmision"];
  const faltantes = camposRequeridos.filter((campo) => body[campo] === undefined || body[campo] === null || body[campo] === "");
  if (faltantes.length > 0) {
    throw new HttpError(400, `Faltan campos requeridos: ${faltantes.join(", ")}`);
  }
  const payload = body as CertificadoPostPayload;

  try {
    const { rows } = await sql<CertificadoFincaRow>`
      insert into certificados_finca (
        finca_id, nombre, entidad_certificadora, numero_certificado, fecha_emision, fecha_vencimiento, creado_por
      ) values (
        ${payload.fincaId},
        ${payload.nombre},
        ${payload.entidadCertificadora},
        ${payload.numeroCertificado ?? null},
        ${payload.fechaEmision},
        ${payload.fechaVencimiento ?? null},
        ${empleadoId}
      )
      returning *
    `;
    return res.status(201).json({ ok: true, certificado: mapCertificadoFincaRow(rows[0]) });
  } catch (err) {
    if (esErrorFincaInexistente(err)) {
      throw new HttpError(400, "La finca indicada no existe.");
    }
    throw err;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") return await listar(req, res);
    if (req.method === "POST") return await crear(req, res);

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
