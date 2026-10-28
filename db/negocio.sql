-- ============================================================================
-- Gestión comercial: tiendas administrables desde el portal (agregar, eliminar y
-- cambiar su estado). Antes eran datos fijos de ejemplo. Idempotente.
-- ============================================================================

create table if not exists tiendas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  ciudad text not null,
  -- Ventas del mes en pesos COP enteros.
  ventas_mes numeric not null default 0,
  estado text not null default 'activa' check (estado in ('activa', 'en remodelación', 'cerrada')),
  creado_en timestamptz not null default now()
);

-- Tiendas iniciales (una sola vez: solo si la tabla está vacía).
insert into tiendas (nombre, ciudad, ventas_mes, estado)
select * from (values
  ('Azahar Poblado', 'Medellín', 168000000, 'activa'),
  ('Azahar Parque Lleras', 'Medellín', 142500000, 'activa'),
  ('Azahar Zona Rosa', 'Bogotá', 189300000, 'activa'),
  ('Azahar Cali Norte', 'Cali', 98700000, 'activa'),
  ('Azahar Manizales Centro', 'Manizales', 76400000, 'en remodelación'),
  ('Azahar Pereira Plaza', 'Pereira', 67600000, 'activa')
) as t (nombre, ciudad, ventas_mes, estado)
where not exists (select 1 from tiendas);
