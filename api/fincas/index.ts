// ============================================================================
// GET  /api/fincas  -> listado completo de fincas cafeteras. Solo admin.
// POST /api/fincas  -> registra una nueva finca. Solo admin.
// ----------------------------------------------------------------------------
// `codigo` (p. ej. "FIN-0001") se genera siempre en el servidor a partir del
// conteo actual de filas: nunca se acepta un valor de cliente para esta
// columna, así se evitan duplicados o códigos inconsistentes.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin } from "../_lib/auth.js";
import { mapFincaRow, type FincaRow } from "../_lib/mappers.js";

interface FincaPostPayload {
  nombre: string;
  vereda?: string | null;
  municipio: string;
  departamento: string;
  propietario: string;
  cedulaPropietario: string;
  areaTotal: number;
  areaCafe: number;
  numeroArboles: number;
  variedad: string;
  latitud?: number | null;
  longitud?: number | null;
}

async function listar(req: VercelRequest, res: VercelResponse) {
  await requireAdmin(req);
  const { rows } = await sql<FincaRow>`select * from fincas order by nombre`;
  return res.status(200).json({ ok: true, fincas: rows.map(mapFincaRow) });
}

async function generarCodigo(): Promise<string> {
  const { rows } = await sql<{ total: string }>`select count(*) as total from fincas`;
  const total = Number(rows[0]?.total ?? 0);
  return `FIN-${String(total + 1).padStart(4, "0")}`;
}

async function crear(req: VercelRequest, res: VercelResponse) {
  await requireAdmin(req);

  const body = req.body as Partial<FincaPostPayload>;
  const camposRequeridos: (keyof FincaPostPayload)[] = [
    "nombre",
    "municipio",
    "departamento",
    "propietario",
    "cedulaPropietario",
    "areaTotal",
    "areaCafe",
    "numeroArboles",
    "variedad",
  ];
  const faltantes = camposRequeridos.filter((campo) => body[campo] === undefined || body[campo] === null || body[campo] === "");
  if (faltantes.length > 0) {
    throw new HttpError(400, `Faltan campos requeridos: ${faltantes.join(", ")}`);
  }
  const payload = body as FincaPostPayload;
  const codigo = await generarCodigo();

  const { rows } = await sql<FincaRow>`
    insert into fincas (
      codigo, nombre, vereda, municipio, departamento, propietario,
      cedula_propietario, area_total, area_cafe, numero_arboles, variedad, latitud, longitud
    ) values (
      ${codigo},
      ${payload.nombre},
      ${payload.vereda ?? null},
      ${payload.municipio},
      ${payload.departamento},
      ${payload.propietario},
      ${payload.cedulaPropietario},
      ${payload.areaTotal},
      ${payload.areaCafe},
      ${payload.numeroArboles},
      ${payload.variedad},
      ${payload.latitud ?? null},
      ${payload.longitud ?? null}
    )
    returning *
  `;
  return res.status(201).json({ ok: true, finca: mapFincaRow(rows[0]) });
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
