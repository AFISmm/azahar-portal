-- ============================================================================
-- POS (punto de venta) integrado al portal — Fase 1: núcleo de venta.
-- Catálogo, pedidos con modificadores, cobro (efectivo / tarjeta) y pantalla de
-- cocina (KDS). Basado en azahar-pos, pero sobre Postgres en vez de memoria.
-- Idempotente. Se aplica con db/migrar-trazabilidad.mjs (aplica también este archivo).
--
-- DINERO: pesos COP ENTEROS (no hay centavos). Ej. 9500 = $9.500.
-- ============================================================================

-- Permisos del POS por empleado: 'ADMIN' (todo) | 'CAJA' (vende y cobra) | 'COCINA' (KDS).
alter table empleados add column if not exists permisos_pos text[] not null default '{}';

create table if not exists pos_config (
  id integer primary key default 1 check (id = 1),
  -- Impoconsumo / IVA aplicado sobre lo gravable (después de descuento). 0.08 = 8%.
  tasa_impuesto numeric not null default 0.08,
  -- 'pagarAntes' (mostrador: se cobra y luego va a cocina) | 'pagarDespues' (mesa).
  flujo_pedido text not null default 'pagarAntes' check (flujo_pedido in ('pagarAntes', 'pagarDespues'))
);
insert into pos_config (id) values (1) on conflict (id) do nothing;

create table if not exists pos_categorias (
  id text primary key,
  nombre text not null,
  orden integer not null default 0,
  activo boolean not null default true
);

create table if not exists pos_productos (
  id text primary key,
  categoria_id text not null references pos_categorias (id),
  nombre text not null,
  descripcion text not null default '',
  precio_base integer not null,
  gravable boolean not null default true,
  es_combo boolean not null default false,
  -- false = agotado ("86")
  disponible boolean not null default true,
  activo boolean not null default true
);

create table if not exists pos_grupos_modificador (
  id text primary key,
  producto_id text not null references pos_productos (id),
  nombre text not null,
  min_selecciones integer not null default 0,
  max_selecciones integer not null default 1,
  obligatorio boolean not null default false
);

create table if not exists pos_modificadores (
  id text primary key,
  grupo_id text not null references pos_grupos_modificador (id),
  nombre text not null,
  precio_delta integer not null default 0,
  disponible boolean not null default true,
  tipo text not null default 'agregar' check (tipo in ('agregar', 'sin', 'sustituir'))
);

create sequence if not exists pos_pedido_numero_seq;

create table if not exists pos_pedidos (
  id uuid primary key default gen_random_uuid(),
  numero integer not null default nextval('pos_pedido_numero_seq'),
  nombre_cliente text,
  canal text not null default 'mostrador' check (canal in ('mostrador', 'kiosco', 'online', 'delivery', 'catering')),
  para_llevar boolean not null default false,
  -- abierto -> enviadoCocina -> enPreparacion -> listo -> entregado ; cobrado ; cancelado
  estado text not null default 'abierto' check (estado in ('abierto', 'enviadoCocina', 'enPreparacion', 'listo', 'entregado', 'cobrado', 'cancelado')),
  -- Se congela al crear el pedido (C-SNAPSHOT): cambiar la tasa después no altera pedidos viejos.
  tasa_impuesto numeric not null,
  descuento_tipo text check (descuento_tipo in ('monto', 'porcentaje')),
  descuento_total integer not null default 0,
  descuento_motivo text,
  empleado_id uuid references empleados (id) on delete set null,
  creado_en timestamptz not null default now(),
  enviado_cocina_en timestamptz,
  listo_en timestamptz,
  cobrado_en timestamptz
);

create table if not exists pos_pedido_lineas (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pos_pedidos (id) on delete cascade,
  producto_id text not null references pos_productos (id),
  descripcion text not null,
  cantidad integer not null check (cantidad > 0),
  -- Incluye los deltas de modificadores. Snapshot al vender.
  precio_unitario integer not null,
  subtotal_linea integer not null,
  gravable boolean not null,
  notas text not null default '',
  estado_cocina text not null default 'recibido' check (estado_cocina in ('recibido', 'preparando', 'listo')),
  anulada boolean not null default false,
  motivo_anulacion text
);

create table if not exists pos_linea_modificadores (
  id uuid primary key default gen_random_uuid(),
  linea_id uuid not null references pos_pedido_lineas (id) on delete cascade,
  modificador_id text references pos_modificadores (id),
  descripcion text not null,
  precio_delta integer not null default 0,
  tipo text not null default 'agregar'
);

create table if not exists pos_pagos (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pos_pedidos (id) on delete cascade,
  metodo text not null check (metodo in ('efectivo', 'tarjeta', 'otro')),
  monto integer not null check (monto > 0),
  propina integer not null default 0,
  -- Solo para tarjeta (sin PAN/CVV: nunca se guardan datos de tarjeta).
  franquicia text,
  tipo_tarjeta text check (tipo_tarjeta in ('debito', 'credito')),
  ultimos4 text,
  -- Efectivo: lo que entregó el cliente (para calcular el cambio).
  recibido integer,
  estado text not null default 'aprobado' check (estado in ('aprobado', 'rechazado', 'reembolsado')),
  empleado_id uuid references empleados (id) on delete set null,
  creado_en timestamptz not null default now()
);

-- Bitácora de solo-anexado de eventos sensibles del POS (descuentos, anulaciones, 86, cancelaciones).
create table if not exists pos_auditoria (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid references empleados (id) on delete set null,
  usuario_nombre text not null,
  tipo text not null,
  referencia text,
  detalle text not null,
  creado_en timestamptz not null default now()
);

create index if not exists pos_productos_categoria_idx on pos_productos (categoria_id);
create index if not exists pos_grupos_producto_idx on pos_grupos_modificador (producto_id);
create index if not exists pos_mods_grupo_idx on pos_modificadores (grupo_id);
create index if not exists pos_pedidos_estado_idx on pos_pedidos (estado, creado_en);
create index if not exists pos_lineas_pedido_idx on pos_pedido_lineas (pedido_id);
create index if not exists pos_pagos_pedido_idx on pos_pagos (pedido_id);
