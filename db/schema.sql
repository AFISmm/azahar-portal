-- ============================================================================
-- Portal Azahar — esquema inicial de Vercel Postgres (Neon)
-- ----------------------------------------------------------------------------
-- Este archivo NO se aplica automáticamente. Ejecútalo una sola vez desde la
-- pestaña "Query" del panel de Vercel Postgres (Project -> Storage -> tu base
-- de datos -> Query), o desde cualquier cliente de Postgres apuntando a la
-- cadena de conexión, cuando quieras activar el backend real
-- (ver README.md, sección "Activar backend real con Vercel Postgres").
--
-- A diferencia del esquema anterior basado en Supabase, aquí no existe
-- `auth.users` ni Row Level Security: la autenticación es manejada a mano por
-- el propio backend (ver api/_lib/auth.ts) y la autorización se hace en cada
-- función serverless de /api (requireAuth / requireAdmin), no en la base de
-- datos.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- Tabla: empleados
-- Un registro por persona del equipo. `password_hash` reemplaza a
-- `auth_user_id`: cada empleado ES su propia identidad de autenticación
-- (login por correo + contraseña, hash con bcrypt).
-- ----------------------------------------------------------------------------
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
  fecha_nacimiento date,
  numero_identificacion text,
  username text unique,
  tipo_cuenta text not null default 'empleado' check (tipo_cuenta in ('empleado', 'desarrollador')),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Tabla: solicitudes
-- Vacaciones, incapacidades, solicitudes de documentos y certificados. El
-- flujo es siempre: se crea en 'pendiente' y un admin la resuelve.
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- Tabla: documentos
-- Expediente documental de cada empleado (contratos, certificados, etc).
-- ----------------------------------------------------------------------------
create table documentos (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references empleados (id) on delete cascade,
  nombre text not null,
  tipo text not null,
  url text,
  subido_en timestamptz not null default now(),
  subido_por uuid references empleados (id)
);

-- ----------------------------------------------------------------------------
-- Tabla: nomina_pagos
-- Historial de pagos de nómina por empleado.
-- ----------------------------------------------------------------------------
create table nomina_pagos (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references empleados (id) on delete cascade,
  periodo text not null,
  fecha_pago date not null,
  monto numeric not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagado'))
);

-- ----------------------------------------------------------------------------
-- Tabla: fincas
-- Registro de fincas cafeteras (módulo Gestión Operativa). `codigo` es un
-- identificador corto legible ("FIN-0001"), distinto del `id` interno.
-- ----------------------------------------------------------------------------
create table fincas (
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

-- ----------------------------------------------------------------------------
-- Tabla: certificados_finca
-- Certificaciones asociadas a cada finca (organica, Rainforest Alliance,
-- Fair Trade, etc.).
-- ----------------------------------------------------------------------------
create table certificados_finca (
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

-- ----------------------------------------------------------------------------
-- Tabla: pqr
-- Peticiones/quejas/reclamos sobre la plataforma, radicadas por cualquier
-- cuenta que no sea de tipo 'desarrollador' hacia una cuenta que sí lo sea
-- (ver empleados.tipo_cuenta).
-- ----------------------------------------------------------------------------
create table pqr (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references empleados (id) on delete cascade,
  nombre text not null,
  cedula text,
  correo text not null,
  admin_destino_id uuid references empleados (id),
  problema text not null,
  adjunto_url text,
  adjunto_nombre text,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'resuelta')),
  comentario text,
  respuesta_adjunto_url text,
  respuesta_adjunto_nombre text,
  resuelto_en timestamptz,
  creado_en timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Índices recomendados
-- ----------------------------------------------------------------------------
create index idx_solicitudes_empleado on solicitudes (empleado_id);
create index idx_documentos_empleado on documentos (empleado_id);
create index idx_nomina_pagos_empleado on nomina_pagos (empleado_id);
create index idx_certificados_finca on certificados_finca (finca_id);
create index idx_pqr_empleado on pqr (empleado_id);

-- ----------------------------------------------------------------------------
-- Bootstrap: primer administrador
-- ----------------------------------------------------------------------------
-- No existe un flujo de "invitar admin": crea tu primer empleado normalmente
-- desde /registro (queda con rol = 'empleado') y luego ejecuta manualmente,
-- también desde la pestaña "Query":
--
--   update empleados set rol = 'admin' where correo = 'tu-correo@azaharcoffee.co';
-- ----------------------------------------------------------------------------
