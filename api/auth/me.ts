// ============================================================================
// GET /api/auth/me
// ----------------------------------------------------------------------------
// Devuelve el empleado de la sesión activa (o 401 si no hay ninguna). Lo usa
// AuthContext.tsx para restaurar la sesión al cargar la app y para
// refrescar el perfil del empleado actual.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@vercel/postgres";
import { sql } from "../_lib/db.js";
import { leerEmpleadoIdDeSesion, manejarError } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

// ----------------------------------------------------------------------------
// TEMPORAL: bootstrap del esquema de fincas/certificados. Se elimina justo
// después de usarse una sola vez. Vive aquí para no sumar una función
// serverless más al límite de 12 del plan Hobby.
// ----------------------------------------------------------------------------
const ESQUEMA_FINCAS_SQL = `
create table if not exists fincas (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  nombre text not null,
  vereda text,
  municipio text not null,
  departamento text not null,
  propietario text not null,
  cedula_propietario text not null,
  area_total numeric not null,
  area_cafe numeric not null,
  numero_arboles integer not null,
  variedad text not null,
  latitud numeric,
  longitud numeric,
  creado_en timestamptz not null default now()
);

create table if not exists certificados_finca (
  id uuid primary key default gen_random_uuid(),
  finca_id uuid not null references fincas (id) on delete cascade,
  nombre text not null,
  entidad_certificadora text not null,
  numero_certificado text,
  fecha_emision date not null,
  fecha_vencimiento date,
  creado_en timestamptz not null default now(),
  creado_por uuid references empleados (id)
);

create index if not exists idx_certificados_finca on certificados_finca (finca_id);
`;

async function migrarFincasTemporal(req: VercelRequest, res: VercelResponse): Promise<void> {
  const authSecret = process.env.AUTH_SECRET;
  const token = typeof req.query.token === "string" ? req.query.token : undefined;
  if (!authSecret || !token || token !== authSecret) {
    res.status(401).json({ ok: false, mensaje: "No autorizado." });
    return;
  }
  const client = createClient();
  try {
    await client.connect();
    await client.query(ESQUEMA_FINCAS_SQL);
    const tablas = await client.query(
      "select table_name from information_schema.tables where table_schema = 'public' order by table_name",
    );
    res.status(200).json({ ok: true, tablas: tablas.rows.map((r) => r.table_name as string) });
  } catch (err) {
    res.status(500).json({ ok: false, mensaje: err instanceof Error ? err.message : "Error inesperado." });
  } finally {
    await client.end();
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.migrarFincas === "1") {
    return migrarFincasTemporal(req, res);
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa GET." });
  }

  try {
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
  } catch (err) {
    return manejarError(res, err);
  }
}
