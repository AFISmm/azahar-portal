-- Segundo factor (app autenticadora) del acceso con Google. La tabla también se crea sola
-- en la primera visita a /verificar-2fa (api/auth/login.ts), este archivo es solo documentación.
create table if not exists empleado_2fa (
  empleado_id uuid primary key references empleados(id) on delete cascade,
  secreto_cifrado text not null,          -- AES-256-GCM con clave derivada de AUTH_SECRET
  activado boolean not null default false, -- true cuando verificó su primer código
  ultimo_contador bigint not null default 0, -- evita reutilizar un código
  intentos integer not null default 0,
  bloqueado_hasta timestamptz,
  creado_en timestamptz not null default now()
);
