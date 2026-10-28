-- ============================================================================
-- Gestión Contable: importación de archivos y conciliación bancaria estilo Alegra. Idempotente.
-- Estas tablas también se crean solas la primera vez que se usa el módulo (api/_lib/contableImportar.ts);
-- este archivo es la referencia (y sirve para crearlas a mano en Vercel Postgres).
-- ============================================================================

-- Un lote por archivo importado. `filas` guarda todas las filas tal como venían (objetos columna → valor);
-- `mapeo` dice qué columna es cada dato clave del destino (p. ej. {"nit": "NIT", "nombre": "RAZON SOCIAL"}).
-- destino: extracto | factura-compra | factura-venta | comprobante | tercero | catalogo
create table if not exists contable_importaciones (
  id text primary key default gen_random_uuid()::text,
  nombre_archivo text not null,
  formato text,
  destino text not null,
  sugerido_ia text,
  confianza numeric,
  encabezados jsonb not null default '[]'::jsonb,
  mapeo jsonb not null default '{}'::jsonb,
  filas jsonb not null default '[]'::jsonb,
  n_filas integer not null default 0,
  cuenta_banco text,
  creado_por text,
  creado_por_nombre text,
  creado_en timestamptz not null default now()
);
create index if not exists contable_importaciones_destino_idx on contable_importaciones (destino, creado_en desc);

-- Cuenta contable y tercero asignados a cada movimiento de un extracto (fuente = 'bancolombia-0590' o el id de un lote importado).
create table if not exists contable_conciliacion (
  fuente text not null,
  mov_clave text not null,
  cuenta_puc text,
  cuenta_nombre text,
  tercero_nit text,
  tercero_nombre text,
  conciliado boolean not null default false,
  actualizado_por text,
  actualizado_en timestamptz not null default now(),
  primary key (fuente, mov_clave)
);
