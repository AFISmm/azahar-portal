# Portal Azahar

Portal de autoservicio de empleados y administración de talento humano para
**Azahar Coffee Company**. Permite a cualquier persona del equipo consultar su
contrato, solicitar vacaciones, reportar incapacidades, ver su nómina y pedir
certificados; y permite al equipo de Talento Humano (rol `admin`) aprobar
solicitudes y administrar el directorio de empleados.

## Stack técnico

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (configuración "CSS-first" con `@theme`, sin `tailwind.config.js`)
- [react-router-dom v7](https://reactrouter.com/) para el enrutamiento
- [Supabase](https://supabase.com/) (Postgres + Auth) como backend real opcional
- [lucide-react](https://lucide.dev/) para iconografía
- [date-fns](https://date-fns.org/) para manejo de fechas (locale `es`)
- Una función serverless de Vercel en `/api` para operaciones que requieren la llave de servicio de Supabase

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. **No necesitas configurar nada más**: la
aplicación arranca automáticamente en **modo demo**, con datos de ejemplo en
memoria (seis empleados de Azahar, solicitudes, nómina y documentos ya
cargados). En la pantalla de inicio de sesión hay un botón **"Entrar en modo
demo"** que te ingresa de inmediato como la Gerente de Talento Humano
(usuaria administradora), sin necesidad de credenciales.

Otros comandos útiles:

```bash
npm run build    # tsc -b && vite build — build de producción
npm run preview  # sirve el build de producción localmente
npm run lint     # oxlint
```

## Cómo funciona el "modo demo"

Toda la app habla con una única abstracción de datos: `src/lib/dataSource.ts`.
Esa abstracción decide en tiempo de ejecución cuál de estas dos
implementaciones usar:

- **`mockDataSource`** (`src/lib/mockDataSource.ts`): datos en memoria,
  sembrados desde `src/lib/mockData.ts`. Las creaciones/ediciones (crear
  empleado, solicitar vacaciones, aprobar una solicitud, etc.) mutan esos
  arreglos en memoria, así que los cambios persisten mientras no recargues la
  página.
- **`supabaseDataSource`** (`src/lib/supabaseDataSource.ts`): consultas reales
  contra las tablas de Supabase.

La variable `IS_DEMO_MODE` (en `src/lib/supabaseClient.ts`) es `true` cuando
`VITE_SUPABASE_URL` o `VITE_SUPABASE_ANON_KEY` no están definidas. En modo
demo verás una insignia "Modo demo" en la parte inferior del menú lateral.

## Activar backend real con Supabase

1. **Crea un proyecto en Supabase** en [supabase.com](https://supabase.com/).
2. **Ejecuta la migración**: copia el contenido de
   `supabase/migrations/001_init.sql` y pégalo en el *SQL Editor* de tu
   proyecto de Supabase, luego ejecútalo. Esto crea las tablas `empleados`,
   `solicitudes`, `documentos` y `nomina_pagos`, junto con Row Level Security
   y sus políticas.
3. **Configura las variables del cliente**: copia `.env.example` a
   `.env.local` y completa:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
   Con estas dos variables presentes, la app deja el modo demo automáticamente
   y empieza a usar `supabaseDataSource`.
4. **Crea al menos un empleado administrador** manualmente en Supabase
   (usuario en *Authentication* + fila en `empleados` con `rol = 'admin'` y
   `auth_user_id` apuntando a ese usuario), para poder iniciar sesión y usar
   el módulo de Empleados y crear al resto del equipo.
5. **Configura la función serverless** (`api/empleados-crear.ts`): en el
   dashboard de Vercel, ve a *Project Settings → Environment Variables* y
   define, **solo ahí** (nunca en un archivo del cliente ni en `.env.local`):
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...   (la llave "service_role", secreta)
   ```
   Esta función crea el usuario de Supabase Auth y su fila en `empleados` en
   una sola operación cuando un admin usa "Nuevo empleado" en producción.

## Estructura del proyecto

```
azahar-portal/
├── api/
│   └── empleados-crear.ts       # función serverless (Vercel) — crea usuarios reales
├── public/
│   └── azahar-logo.png          # logo usado como favicon
├── supabase/
│   └── migrations/001_init.sql  # esquema completo + RLS (no se aplica automáticamente)
├── src/
│   ├── assets/azahar-logo.png
│   ├── auth/                    # AuthContext + ProtectedRoute/AdminRoute
│   ├── components/               # UI compartida (Card, Modal, Sidebar, gráficos…)
│   │   └── admin/                 # componentes exclusivos de Administración
│   ├── context/                  # ThemeContext (claro/oscuro) y ToastContext
│   ├── lib/                      # tipos, formateo y la capa de datos (mock + Supabase)
│   ├── pages/                    # una página por ruta de "Mi portal"
│   │   └── admin/                 # páginas de "Administración"
│   ├── App.tsx                   # definición de rutas
│   └── main.tsx
├── vercel.json                  # rewrite de SPA
└── .env.example
```

## Notas de diseño

- Paleta de marca "café": marrón oxblood (`brand-800 #412020`, tono real del
  logo), caramelo (`accent-500 #C9852E`) y cremas cálidos — con soporte
  completo de tema claro/oscuro (toggle en el encabezado, persistido en
  `localStorage`).
- Tipografías: Inter (encabezados/números), DM Sans (texto de navegación y
  cuerpo) y JetBrains Mono (fechas y cifras de nómina).
- Todo el copy de la interfaz está en español, orientado a una compañía
  colombiana de retail de café.
