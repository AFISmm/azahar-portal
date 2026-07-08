// ============================================================================
// ENDPOINT TEMPORAL — bootstrap de esquema de base de datos.
// ----------------------------------------------------------------------------
// Ejecuta el esquema de db/schema.sql contra Postgres (el SQL va embebido
// aquí, no se lee del disco, para evitar depender de que Vercel incluya
// db/schema.sql en el paquete de la función serverless).
//
// Existe solo porque POSTGRES_URL/AUTH_SECRET están marcadas "Sensitive" en
// Vercel y no se pueden leer localmente (ni con `vercel env pull`) para
// correr el script a mano — pero SÍ están disponibles dentro de la función
// serverless en tiempo de ejecución, que es donde corre este archivo.
//
// Protegido con un token de un solo uso (?token=...) comparado contra
// AUTH_SECRET, ya que todavía no existe ningún usuario admin en la base para
// autenticarse por el flujo normal. Debe eliminarse de inmediato después de
// usarse una sola vez.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@vercel/postgres";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authSecret = process.env.AUTH_SECRET;
  const token = typeof req.query.token === "string" ? req.query.token : undefined;

  if (!authSecret || !token || token !== authSecret) {
    return res.status(401).json({ ok: false, mensaje: "No autorizado." });
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

    return res.status(200).json({
      ok: true,
      resultados,
      tablas: tablas.rows.map((r) => r.table_name as string),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, mensaje: err instanceof Error ? err.message : "Error inesperado." });
  } finally {
    await client.end();
  }
}
