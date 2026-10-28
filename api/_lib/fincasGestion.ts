// ============================================================================
// GET  /api/fincas  -> listado completo de fincas cafeteras. Solo admin.
// POST /api/fincas  -> registra una nueva finca. Solo admin.
// ----------------------------------------------------------------------------
// Vive en api/_lib (y se expone vía api/trazabilidad.ts + un rewrite en
// vercel.json) para no superar el límite de 12 funciones serverless del plan
// Hobby de Vercel. `codigo` (p. ej. "FIN-0001") se genera siempre en el
// servidor: nunca se acepta un valor de cliente para esta columna.
// ============================================================================
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./db.js";
import { HttpError, manejarError, requireModulo } from "./auth.js";
import { mapFincaRow, type FincaRow } from "./mappers.js";

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
  await requireModulo(req, "negocio", "ver");
  const { rows } = await sql<FincaRow>`select * from fincas order by nombre`;
  return res.status(200).json({ ok: true, fincas: rows.map(mapFincaRow) });
}

async function generarCodigo(): Promise<string> {
  const { rows } = await sql<{ total: string }>`select count(*) as total from fincas`;
  const total = Number(rows[0]?.total ?? 0);
  return `FIN-${String(total + 1).padStart(4, "0")}`;
}

async function crear(req: VercelRequest, res: VercelResponse) {
  await requireModulo(req, "negocio", "editar");

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

export default async function fincasGestion(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") return await listar(req, res);
    if (req.method === "POST") return await crear(req, res);

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
