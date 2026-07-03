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
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Neon) como backend real opcional, con autenticación propia (bcrypt + cookie de sesión JWT)
- [lucide-react](https://lucide.dev/) para iconografía
- [date-fns](https://date-fns.org/) para manejo de fechas (locale `es`)
- Funciones serverless de Vercel en `/api` para toda la lógica que necesita hablar con Postgres o manejar sesiones

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
- **`httpDataSource`** (`src/lib/httpDataSource.ts`): consultas reales, vía
  `fetch`, contra las funciones serverless de `/api` (que a su vez hablan con
  Vercel Postgres).

La variable `IS_DEMO_MODE` (en `src/lib/backendMode.ts`) es `true` a menos que
definas `VITE_ENABLE_BACKEND=true`. En modo demo verás una insignia "Modo
demo" en la parte inferior del menú lateral.

## Activar backend real con Vercel Postgres

1. **Crea la base de datos**: en el dashboard de Vercel, ve a tu proyecto →
   pestaña *Storage* → *Create Database* → elige *Postgres* (Neon) → conéctala
   a este proyecto. Esto define automáticamente la variable de entorno
   `POSTGRES_URL` (y variantes) en el proyecto — no hay ninguna llave que
   copiar a mano, a diferencia de la configuración anterior con Supabase.
2. **Ejecuta el esquema**: copia el contenido de `db/schema.sql` y pégalo en
   la pestaña *Query* que ofrece Vercel Postgres (o en cualquier cliente de
   Postgres apuntando a la cadena de conexión), luego ejecútalo. Esto crea las
   tablas `empleados`, `solicitudes`, `documentos` y `nomina_pagos`. No hay
   Row Level Security ni tablas de `auth`: la autorización se hace en cada
   función serverless de `/api` (ver `api/_lib/auth.ts`, `requireAuth` /
   `requireAdmin`).
3. **Configura las variables del servidor**: en *Project Settings →
   Environment Variables*, define (además de la `POSTGRES_URL` ya creada):
   ```
   AUTH_SECRET=...          (genera un valor con: openssl rand -hex 32)
   ```
4. **Activa el flag del cliente**: define `VITE_ENABLE_BACKEND=true` (variable
   de entorno del proyecto en Vercel, o en tu `.env.local` para desarrollo
   local). Con esto la app deja el modo demo automáticamente y empieza a usar
   `httpDataSource`.
5. **Crea tu primer administrador (bootstrap)**: no existe un flujo de
   "invitar admin" — regístrate normalmente desde `/registro` (queda con
   `rol = 'empleado'`) y luego, desde la pestaña *Query* de Vercel Postgres,
   ejecuta:
   ```sql
   update empleados set rol = 'admin' where correo = 'tu-correo@azaharcoffee.co';
   ```
   Cierra sesión y vuelve a entrar para que el nuevo rol tome efecto. Desde
   ahí ya puedes usar el módulo de Empleados para crear al resto del equipo
   (`POST /api/empleados-crear`, protegido con `requireAdmin`).

## Registro de nuevos empleados

La página `/registro` permite que cualquier persona cree su propia cuenta
(nombre, correo, contraseña, cargo, departamento, tipo de contrato y fecha de
ingreso). Detrás de "Crear cuenta" corre `api/registro.ts`, pensado
explícitamente para evitar registros duplicados ("memoria de usuarios para que
solo se registre una sola vez"):

1. Antes de crear nada, consulta directamente la tabla `empleados` (la
   memoria persistente de todos los registros anteriores) para verificar si
   el correo ya existe.
2. Si el correo está disponible, crea la fila de empleado reutilizando
   `crearEmpleadoYUsuario` (`api/_lib/crearEmpleado.ts`, la misma lógica que
   usa `api/empleados-crear.ts` para altas manuales desde Administración —
   hashea la contraseña con bcrypt e inserta la fila en `empleados`) y
   responde con un mensaje de bienvenida.

> Esta ruta reemplazó a una versión anterior que delegaba estos dos pasos a
> un equipo de agentes de Claude (`@anthropic-ai/sdk`). Se simplificó a
> lógica directa porque el chequeo de duplicados no necesita un modelo de
> lenguaje de por medio — la base de datos ya lo resuelve de forma confiable
> y gratuita — y así se evita depender de una cuenta de facturación de un
> proveedor de IA solo para esta función.

Contrato HTTP: `POST /api/registro` con
`{ nombre, correo, password, cargo, departamento, tipoContrato, fechaIngreso }`.
Responde `200 { ok: true, empleado, mensajeBienvenida }` en éxito (y deja al
usuario con sesión iniciada, vía la misma cookie que usa `/api/auth/login`),
`409 { ok: false, motivo: "correo_duplicado" }` si el correo ya existe, y
`500 { ok: false, motivo: "config_faltante" | "error" }` si faltan credenciales
o hay un error inesperado.

**Este flujo se activa solo cuando `POSTGRES_URL` y `AUTH_SECRET` están
configuradas en Vercel** (ver `.env.example`). Mientras el portal corra sin
backend configurado —el estado actual de este despliegue— `src/auth/AuthContext.tsx`
detecta la respuesta `config_faltante` (o que el endpoint ni siquiera exista
en este entorno) y cae automáticamente al registro local en modo demo: crea
el empleado en `mockDataSource` e inicia sesión de inmediato, mostrando un
aviso de que se usará la base de datos real cuando se configure Postgres. La
base de datos también refuerza la unicidad del correo a nivel de esquema
(`empleados.correo` es `unique`, ver `db/schema.sql`) como respaldo ante una
posible condición de carrera entre dos registros simultáneos.

## Estructura del proyecto

```
azahar-portal/
├── api/
│   ├── _lib/
│   │   ├── db.ts                 # re-exporta `sql` de @vercel/postgres
│   │   ├── auth.ts                # sesión JWT en cookie, requireAuth/requireAdmin, manejarError
│   │   ├── mappers.ts             # filas de Postgres (snake_case) <-> tipos camelCase
│   │   └── crearEmpleado.ts       # hashea password (bcrypt) + inserta fila en `empleados`
│   ├── auth/
│   │   ├── login.ts              # POST — verifica credenciales, setea la cookie de sesión
│   │   ├── logout.ts             # POST — limpia la cookie de sesión
│   │   └── me.ts                 # GET  — empleado de la sesión activa
│   ├── empleados/
│   │   ├── index.ts              # GET — listado (admin) o chequeo de existencia por ?correo=
│   │   └── [id].ts               # GET (propio o admin) / PATCH (admin)
│   ├── solicitudes/
│   │   ├── index.ts              # GET (propias o todas si admin) / POST (propia)
│   │   └── [id].ts               # PATCH — aprobar/rechazar, solo admin
│   ├── documentos/
│   │   └── index.ts              # GET (propios o todos si admin) / POST (propio o cualquiera si admin)
│   ├── nomina/
│   │   ├── index.ts              # GET (propios o todos si admin)
│   │   └── [id].ts               # PATCH — cambiar estado, solo admin
│   ├── registro.ts              # función serverless (Vercel) — autorregistro desde /registro
│   └── empleados-crear.ts       # función serverless (Vercel) — alta manual desde Administración
├── db/
│   └── schema.sql                # esquema completo de Postgres (no se aplica automáticamente)
├── public/
│   └── azahar-logo.png          # logo usado como favicon
├── src/
│   ├── assets/azahar-logo.png
│   ├── auth/                    # AuthContext + ProtectedRoute/AdminRoute
│   ├── components/               # UI compartida (Card, Modal, Sidebar, gráficos…)
│   │   └── admin/                 # componentes exclusivos de Administración
│   ├── context/                  # ThemeContext (claro/oscuro) y ToastContext
│   ├── lib/                      # tipos, formateo y la capa de datos (mock + HTTP/Postgres)
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
