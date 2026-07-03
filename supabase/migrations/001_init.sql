-- ============================================================================
-- Portal Azahar — esquema inicial de Supabase
-- ----------------------------------------------------------------------------
-- Este archivo NO se aplica automáticamente. Cópialo y ejecútalo en el
-- SQL Editor de tu proyecto de Supabase cuando quieras activar el backend
-- real (ver README.md, sección "Activar backend real con Supabase").
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Tabla: empleados
-- Un registro por persona del equipo. `auth_user_id` enlaza con el usuario de
-- Supabase Auth que le corresponde (creado por /api/empleados-crear.ts).
-- ----------------------------------------------------------------------------
create table if not exists empleados (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users (id) on delete set null,
  nombre text not null,
  correo text not null unique,
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

-- ----------------------------------------------------------------------------
-- Tabla: solicitudes
-- Vacaciones, incapacidades, solicitudes de documentos y certificados. El
-- flujo es siempre: se crea en 'pendiente' y un admin la resuelve.
-- ----------------------------------------------------------------------------
create table if not exists solicitudes (
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
create table if not exists documentos (
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
create table if not exists nomina_pagos (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references empleados (id) on delete cascade,
  periodo text not null,
  fecha_pago date not null,
  monto numeric not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagado'))
);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table empleados enable row level security;
alter table solicitudes enable row level security;
alter table documentos enable row level security;
alter table nomina_pagos enable row level security;

-- ----------------------------------------------------------------------------
-- Función auxiliar: ¿el usuario autenticado actual es administrador?
-- Se usa en las políticas de "admin ve/edita todo" de las cuatro tablas.
-- SECURITY DEFINER evita recursión infinita al consultar `empleados` desde
-- las propias políticas de `empleados`.
-- ----------------------------------------------------------------------------
create or replace function es_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from empleados
    where auth_user_id = auth.uid()
      and rol = 'admin'
  );
$$;

-- ----------------------------------------------------------------------------
-- Políticas: empleados
-- - Un empleado puede ver y actualizar únicamente su propia fila.
-- - Un admin puede ver, insertar y actualizar todas las filas.
-- ----------------------------------------------------------------------------
create policy "empleados_select_propio"
  on empleados for select
  using (auth_user_id = auth.uid());

create policy "empleados_update_propio"
  on empleados for update
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

create policy "empleados_admin_select_todo"
  on empleados for select
  using (es_admin());

create policy "empleados_admin_insert"
  on empleados for insert
  with check (es_admin());

create policy "empleados_admin_update_todo"
  on empleados for update
  using (es_admin())
  with check (es_admin());

-- ----------------------------------------------------------------------------
-- Políticas: solicitudes
-- - Un empleado puede ver y crear solicitudes propias (vía subconsulta a
--   empleados por auth_user_id).
-- - Un admin puede ver y actualizar (aprobar/rechazar) todas las solicitudes.
-- ----------------------------------------------------------------------------
create policy "solicitudes_select_propias"
  on solicitudes for select
  using (
    empleado_id in (select id from empleados where auth_user_id = auth.uid())
  );

create policy "solicitudes_insert_propias"
  on solicitudes for insert
  with check (
    empleado_id in (select id from empleados where auth_user_id = auth.uid())
  );

create policy "solicitudes_admin_select_todo"
  on solicitudes for select
  using (es_admin());

create policy "solicitudes_admin_update_todo"
  on solicitudes for update
  using (es_admin())
  with check (es_admin());

-- ----------------------------------------------------------------------------
-- Políticas: documentos
-- - Un empleado puede ver sus propios documentos y subir documentos propios.
-- - Un admin puede ver, insertar y actualizar documentos de cualquier empleado.
-- ----------------------------------------------------------------------------
create policy "documentos_select_propios"
  on documentos for select
  using (
    empleado_id in (select id from empleados where auth_user_id = auth.uid())
  );

create policy "documentos_insert_propios"
  on documentos for insert
  with check (
    empleado_id in (select id from empleados where auth_user_id = auth.uid())
  );

create policy "documentos_admin_select_todo"
  on documentos for select
  using (es_admin());

create policy "documentos_admin_insert"
  on documentos for insert
  with check (es_admin());

create policy "documentos_admin_update_todo"
  on documentos for update
  using (es_admin())
  with check (es_admin());

-- ----------------------------------------------------------------------------
-- Políticas: nomina_pagos
-- - Un empleado solo puede ver (nunca insertar/editar) sus propios pagos.
-- - Un admin puede ver, insertar y actualizar los pagos de todo el equipo.
-- ----------------------------------------------------------------------------
create policy "nomina_select_propia"
  on nomina_pagos for select
  using (
    empleado_id in (select id from empleados where auth_user_id = auth.uid())
  );

create policy "nomina_admin_select_todo"
  on nomina_pagos for select
  using (es_admin());

create policy "nomina_admin_insert"
  on nomina_pagos for insert
  with check (es_admin());

create policy "nomina_admin_update_todo"
  on nomina_pagos for update
  using (es_admin())
  with check (es_admin());

-- ----------------------------------------------------------------------------
-- Índices recomendados
-- ----------------------------------------------------------------------------
create index if not exists idx_solicitudes_empleado on solicitudes (empleado_id);
create index if not exists idx_documentos_empleado on documentos (empleado_id);
create index if not exists idx_nomina_pagos_empleado on nomina_pagos (empleado_id);
create index if not exists idx_empleados_auth_user on empleados (auth_user_id);
