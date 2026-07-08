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
// TEMPORAL: bootstrap de esquema, ver mensaje de commit. Se elimina justo
// después de usarse una sola vez. Vive aquí (en vez de en su propio archivo)
// para no sumar una función serverless más al límite de 12 del plan Hobby.
// ----------------------------------------------------------------------------
const ESQUEMA_SQL = `
create extension if not exists pgcrypto;

create table empleados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text unique not null,
  password_hash text not null,
  cargo text not null,
  departamento text not null,
  tipo_contrato text not null,
  fecha_ingreso date not null,
  dias_vacaciones_disponibles numeric not null default 15,
  salario numeric,
  rol text not null default 'empleado' check (rol in ('empleado', 'admin')),
  estado text not null default 'activo' check (estado in ('activo', 'inactivo')),
  avatar_url text,
  telefono text,
  created_at timestamptz not null default now()
);

create table solicitudes (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references empleados (id) on delete cascade,
  tipo text not null check (tipo in ('vacaciones', 'incapacidad', 'documento', 'certificado')),
  estado text not null default 'pendiente' check (estado in ('pendiente', 'aprobada', 'rechazada')),
  fecha_inicio date,
  fecha_fin date,
  motivo text,
  creado_en timestamptz not null default now(),
  resuelto_en timestamptz,
  resuelto_por uuid references empleados (id)
);

create table documentos (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references empleados (id) on delete cascade,
  nombre text not null,
  tipo text not null,
  url text,
  subido_en timestamptz not null default now(),
  subido_por uuid references empleados (id)
);

create table nomina_pagos (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references empleados (id) on delete cascade,
  periodo text not null,
  fecha_pago date not null,
  monto numeric not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagado'))
);

create index idx_solicitudes_empleado on solicitudes (empleado_id);
create index idx_documentos_empleado on documentos (empleado_id);
create index idx_nomina_pagos_empleado on nomina_pagos (empleado_id);
`;

async function migrarEsquemaTemporal(req: VercelRequest, res: VercelResponse): Promise<void> {
  const authSecret = process.env.AUTH_SECRET;
  const token = typeof req.query.token === "string" ? req.query.token : undefined;
  if (!authSecret || !token || token !== authSecret) {
    res.status(401).json({ ok: false, mensaje: "No autorizado." });
    return;
  }
  const client = createClient();
  try {
    await client.connect();
    const resultados: string[] = [];
    try {
      await client.query(ESQUEMA_SQL);
      resultados.push("Ejecutado como un solo bloque.");
    } catch (errBloque) {
      resultados.push(`Bloque único falló (${(errBloque as Error).message}); ejecutando por partes.`);
      const statements = ESQUEMA_SQL.split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      for (const stmt of statements) {
        await client.query(stmt);
        resultados.push(`OK: ${stmt.slice(0, 60)}...`);
      }
    }
    const tablas = await client.query(
      "select table_name from information_schema.tables where table_schema = 'public' order by table_name",
    );
    res.status(200).json({ ok: true, resultados, tablas: tablas.rows.map((r) => r.table_name as string) });
  } catch (err) {
    res.status(500).json({ ok: false, mensaje: err instanceof Error ? err.message : "Error inesperado." });
  } finally {
    await client.end();
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.migrar === "1") {
    return migrarEsquemaTemporal(req, res);
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
