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

## Registro de nuevos empleados con un equipo de agentes de IA

La página `/registro` permite que cualquier persona cree su propia cuenta
(nombre, correo, contraseña, cargo, departamento, tipo de contrato y fecha de
ingreso). Detrás de "Crear cuenta" corre un **equipo de dos agentes de Claude**
(`api/agentes/registrar.ts`, construido con `@anthropic-ai/sdk`) pensado
explícitamente para evitar registros duplicados ("memoria de usuarios para que
solo se registre una sola vez"):

1. **Agente Verificador de Identidad**: antes de crear nada, consulta —
   mediante una herramienta (`buscar_empleado_por_correo`) que ejecuta una
   consulta real a Supabase con la llave de servicio — si el correo ya existe
   en la tabla `empleados`. Esa tabla es la memoria persistente de todos los
   registros anteriores. El agente responde con una decisión estructurada
   (`permitido` + `razon`) a través de una segunda herramienta forzada
   (`responder_decision`); el servidor además nunca confía ciegamente en el
   modelo si la propia consulta a la base de datos ya encontró un duplicado.
2. **Agente de Alta y Bienvenida**: solo se invoca si el verificador aprueba.
   Llama a una herramienta (`crear_empleado_y_usuario`) que ejecuta
   `crearEmpleadoYUsuario` (`api/_lib/crearEmpleado.ts`, la misma lógica que
   usa `api/empleados-crear.ts` para altas manuales desde Administración) y
   luego redacta un mensaje de bienvenida corto y personalizado en español.

Contrato HTTP: `POST /api/agentes/registrar` con
`{ nombre, correo, password, cargo, departamento, tipoContrato, fechaIngreso }`.
Responde `200 { ok: true, empleadoId, mensajeBienvenida }` en éxito,
`409 { ok: false, motivo: "correo_duplicado" }` si el correo ya existe, y
`500 { ok: false, motivo: "config_faltante" | "error" }` si faltan credenciales
o hay un error inesperado.

**Este flujo se activa solo cuando `ANTHROPIC_API_KEY`, `SUPABASE_URL` y
`SUPABASE_SERVICE_ROLE_KEY` están configuradas en Vercel** (ver
`.env.example`). Mientras el portal corra sin backend configurado —el estado
actual de este despliegue— `src/auth/AuthContext.tsx` detecta la respuesta
`config_faltante` (o que el endpoint ni siquiera exista en este entorno) y
cae automáticamente al registro local en modo demo: crea el empleado en
`mockDataSource` e inicia sesión de inmediato, mostrando un aviso de que el
equipo de agentes de IA se activará cuando se configuren esas credenciales.
La base de datos también refuerza la unicidad del correo a nivel de esquema
(`empleados.correo` es `unique`, ver `supabase/migrations/001_init.sql`) como
respaldo del propio chequeo del agente.

## Estructura del proyecto

```
azahar-portal/
├── api/
│   ├── _lib/
│   │   └── crearEmpleado.ts     # lógica compartida: crea usuario Supabase Auth + fila `empleados`
│   ├── agentes/
│   │   └── registrar.ts         # equipo de agentes de IA (Claude) para el autorregistro
│   └── empleados-crear.ts       # función serverless (Vercel) — alta manual desde Administración
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
│   ├── pages/                    # una página por ruta de "Mi portal" y "Gestión del negocio"
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
