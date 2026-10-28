-- ============================================================================
-- Módulo de Trazabilidad del café, integrado al portal (antes era una app
-- Next.js aparte, "azahar-trazabilidad"). Es idempotente: se puede correr más
-- de una vez. Se aplica automáticamente con db/migrar-trazabilidad.mjs.
--
-- Prefijo `traz_` para no chocar con la tabla `fincas` de Gestión Operativa.
-- Los ids son `text` (no uuid) para conservar los cuid de la app original: los
-- QR ya impresos apuntan a /lote/<id> y ese id no puede cambiar.
-- ============================================================================

-- Permisos por etapa, asignados a cada empleado desde Admin > Usuarios.
-- Valores: 'ADMIN' | 'FINCA' | 'BENEFICIADO' | 'TUESTE' | 'EMPAQUE'.
alter table empleados add column if not exists permisos_trazabilidad text[] not null default '{}';

create table if not exists traz_fincas (
  id text primary key default gen_random_uuid()::text,
  nombre text not null,
  identificador_productor text,
  latitud double precision,
  longitud double precision,
  altitud_msnm integer,
  region text,
  variedad text,
  tipo_recoleccion text,
  creado_en timestamptz not null default now()
);

create table if not exists traz_certificaciones (
  id text primary key default gen_random_uuid()::text,
  finca_id text not null references traz_fincas (id),
  nombre text not null,
  entidad_certificadora text,
  url_verificacion text,
  certificado_url text,
  fecha_emision date,
  fecha_vencimiento date,
  creado_en timestamptz not null default now()
);

create table if not exists traz_lotes_verdes (
  id text primary key default gen_random_uuid()::text,
  finca_id text not null references traz_fincas (id),
  tipo_proceso text,
  fecha_fermentacion date,
  fecha_secado date,
  humedad_final_pct double precision,
  responsable_calidad text,
  fecha_trilla date,
  clasificacion text,
  lote_exportacion text,
  transporte text,
  foto_secado_url text,
  creado_en timestamptz not null default now()
);

create table if not exists traz_fichas_cata (
  id text primary key default gen_random_uuid()::text,
  lote_verde_id text not null references traz_lotes_verdes (id),
  catador text,
  fecha date,
  acidez integer,
  cuerpo integer,
  dulzor integer,
  notas text,
  creado_en timestamptz not null default now()
);

create table if not exists traz_lotes_tostados (
  id text primary key default gen_random_uuid()::text,
  fecha date,
  perfil_tueste text,
  curva_tueste text,
  maestro_tostador text,
  creado_en timestamptz not null default now()
);

-- Blend: un lote tostado combina varios lotes verdes (muchos-a-muchos real).
create table if not exists traz_componentes_blend (
  id text primary key default gen_random_uuid()::text,
  lote_tostado_id text not null references traz_lotes_tostados (id),
  lote_verde_id text not null references traz_lotes_verdes (id),
  kilogramos double precision,
  unique (lote_tostado_id, lote_verde_id)
);

create table if not exists traz_lotes_empaque (
  id text primary key default gen_random_uuid()::text,
  lote_tostado_id text not null references traz_lotes_tostados (id),
  fecha_empaque date,
  lote_comercial text,
  fecha_vencimiento date,
  presentacion text,
  qr_data_url text,
  creado_en timestamptz not null default now()
);

-- Bitácora de solo-anexado: los registros de trazabilidad nunca se editan ni
-- se borran; se corrigen con un registro nuevo.
create table if not exists traz_auditoria (
  id text primary key default gen_random_uuid()::text,
  empleado_id uuid references empleados (id) on delete set null,
  usuario_nombre text not null,
  entidad text not null,
  entidad_id text not null,
  accion text not null default 'crear',
  resumen text not null,
  creado_en timestamptz not null default now()
);

create index if not exists traz_lotes_verdes_finca_idx on traz_lotes_verdes (finca_id);
create index if not exists traz_lotes_empaque_tostado_idx on traz_lotes_empaque (lote_tostado_id);
create index if not exists traz_auditoria_creado_idx on traz_auditoria (creado_en desc);
