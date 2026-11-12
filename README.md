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

## Módulos de Trazabilidad y POS

Además del portal de talento humano, el portal incluye dos módulos de negocio.
Ambos exigen backend real (Postgres) y **no tienen modo demo**.

- **Trazabilidad del café** (`/trazabilidad/*`): finca, certificaciones, lote
  verde (beneficiado y trilla), ficha de cata, tueste con blend, empaque con QR
  y auditoría de solo-anexado. La ficha pública que abre el QR de la bolsa es
  `/lote/:id` y no requiere sesión.
- **POS fase 1** (`/pos/*`): caja (catálogo con modificadores, cobro en efectivo
  o tarjeta, descuentos, "86"), pantalla de cocina (KDS) e historial. Dinero en
  pesos COP enteros. Fuera de esta fase: recetas/insumos/stock, turnos de caja
  y cierre Z, combos, reportes y propinas.

**Permisos por módulo.** Hay un módulo por ítem del sidebar, con su mismo nombre: Gestión Estratégica,
Gestión Comercial, Gestión Operativa, Información General, Sistema POS, Trazabilidad, Nómina (su
administración: solicitudes, incapacidades, documentos, empleados y pagos) y Gestión de usuarios. Inicio, la
Nómina de autoservicio y Mi Perfil son para todos. Se asignan por persona en Administración > Usuarios con
una matriz de casillas **Ver / Editar** (Editar incluye Ver), con un **rol** por persona (Administrador,
Gerencia, Calidad y trazabilidad, Operador POS, Empleado; ver `src/lib/roles.ts`), ordenada por cantidad de
permisos y con un botón **Guardar** por fila (los cambios son borradores hasta guardarlos). Se guardan en
`empleados.permisos_modulos` (jsonb; claves `estrategica`, `comercial`, `operativa`, `informacion`, `pos`,
`trazabilidad`, `rrhh`, `usuarios`) y la API valida el mismo nivel (`requireModulo` en `api/_lib/auth.ts`;
lecturas piden `ver`, escrituras `editar`). Una fila antigua con la clave única `negocio` vale para las cuatro
Gestiones/Información hasta que `db/modulos.sql` la convierte. Toda cuenta `@mercurymethods.com` tiene `editar`
en todos los módulos siempre (`api/_lib/acceso.ts`); nadie puede cambiarse sus propios permisos. En el POS,
descuentos, productos agotados (86) y cancelar cobros exigen además editar algún módulo de administración.

**Funciones serverless.** El plan Hobby de Vercel permite 12; ya están todas en
uso, así que trazabilidad y POS comparten `api/trazabilidad.ts` (se enruta con
`?r=...`; el POS vive en `api/_lib/pos.ts`) y `/api/fincas` es un rewrite hacia
esa misma función (ver `vercel.json`). No agregues funciones nuevas sin
consolidar otra.

**Base de datos.** `db/schema.sql` es el esquema base; `db/trazabilidad.sql`,
`db/pos.sql`, `db/pos-catalogo.sql` y `db/modulos.sql` agregan los módulos (idempotentes).
`db/migrar-trazabilidad.mjs` los aplica en una sola transacción sobre una base
existente y, opcionalmente, copia los datos de la antigua app de trazabilidad
(`ORIGEN_URL`); con `PRUEBA=1` hace un ensayo que no deja cambios. Para una base
nueva basta aplicar los cinco `.sql` en ese orden y crear el primer admin
(ver `db/schema.sql`, "Bootstrap").

**Variables de entorno de producción:** `POSTGRES_URL`, `AUTH_SECRET`,
`VITE_ENABLE_BACKEND=true`, `BLOB_READ_WRITE_TOKEN` (store **público**, lo usan
las fotos y certificados), y opcionales `GEMINI_API_KEY`, `GOOGLE_CLIENT_ID` y
`GOOGLE_CLIENT_SECRET`.

## Módulo Gestión Contable

Reúne el trabajo contable hecho en Alegra (migración desde Siigo): conciliaciones bancarias, cargue de
facturas, terceros, pagos de nómina, catálogo de productos y la documentación de lo realizado. Está en
`/contable` y se activa con el permiso **Gestión Contable** (Ver) en Gestión de usuarios; los roles
Administrador y Gerencia lo incluyen y las cuentas `@mercurymethods.com` lo tienen siempre.

| Pantalla (en el orden del menú) | Ruta | Qué muestra |
|---|---|---|
| Tablero | `/contable` | **Widgets personalizables** (mover, cambiar tamaño, agregar y quitar), con el mismo tablero del Inicio (`TableroWidgets` recibe una configuración; el catálogo contable vive en `src/pages/contable/widgetsContable.tsx`) |
| 1. Comprobantes contables | `/contable/comprobantes` | Comprobantes de Alegra (detalle desde nov-2025 + 13 cierres destacados; no es el listado completo, Alegra tiene ≈114.000), los pendientes de subir («vista previa») y pestañas con lo **importado**: comprobantes, facturas de compra y facturas de venta |
| 2. Terceros | `/contable/terceros` | Terceros importados y estado del balance 2025 y de enero–marzo |
| 3. Catálogo de productos | `/contable/catalogo` | Catálogo importado, cambios aplicados y reglas de la actualización de los martes |
| 4. Conciliación bancaria | `/contable/conciliacion` | **Conciliar (cuentas y terceros)** al estilo de Alegra: cuenta contable y tercero por movimiento, conciliado, guardado al instante; más las vistas por mes, cuentas PUC, 53051501 + 42100501, cobros 13050501 y extractos importados |
| 5. Importación de archivos | `/contable/importacion` | Se sube **cualquier archivo** (Excel, CSV, Word, JSON, PDF, imagen); la **IA sugiere** a qué módulo va (Extractos bancarios, Facturas de compra, Facturas de venta, Comprobantes contables, Terceros, Catálogo) y la persona confirma o elige a mano; se mapean las columnas y se importa |
| 6. Documentación | `/contable/documentacion` | Línea de tiempo desde diciembre de 2016, actividad por mes, trabajo de octubre de 2026, decisiones, pendientes, scripts y limitaciones |
| (sin menú) Pagos de nómina | `/contable/nomina` | Pagos del Banco de Bogotá y el asiento propuesto; se llega desde el widget «Pagos de nómina» |

**Importación de archivos y conciliación (qué hay detrás).**
- Lectura en el navegador (`src/lib/leerArchivo.ts`, con `fflate` para .xlsx y .docx): detecta hoja y fila de encabezados. Al servidor solo viaja una **muestra** (15 filas) para la sugerencia y, al importar, las filas.
- Sugerencia: `api/_lib/contableIA.ts`. Con `GEMINI_API_KEY` (la misma del chatbot) la da Gemini y, si el archivo es PDF o imagen, también lo lee y extrae la tabla (hay que revisarla). **Sin la llave, o si la IA falla, usa reglas por palabras clave**: la importación nunca queda bloqueada.
- Datos en Postgres: tablas `contable_importaciones` y `contable_conciliacion` (se crean solas la primera vez; referencia en `db/contable.sql`). Las rutas están en `api/_lib/contableImportar.ts`.
- Los **terceros** que se ofrecen al conciliar salen de lo importado en el destino «Terceros» (no hay datos personales en el repositorio); las **cuentas** salen del plan de cuentas de Alegra (`api/_lib/contableData/planCuentas.ts`).
- Conciliar en el portal guarda la asociación cuenta/tercero; **no crea comprobantes en Alegra**.

**Filtro de fechas.** Todas las pantallas comparten una barra «Filtrar por fecha» (Desde / Hasta y atajos: todo el historial, cada año desde 2016, último trimestre). Se guarda en `sessionStorage` y se aplica a comprobantes, conciliación, nómina, terceros, catálogo, documentación y al archivo cargado. Lo que no tiene fechas propias (la lista de productos) se muestra completo.

**De dónde salen los datos.** Son instantáneas generadas por `04_SCRIPTS_MIGRACION/descargar_comprobantes_alegra.py`
(lee todos los comprobantes de Alegra) y por `04_SCRIPTS_MIGRACION/exportar_datos_portal_contable.py`, que viven en
la carpeta `contabilidad/` (fuera de git).

- **Con información personal o bancaria** (conciliación y movimientos del extracto Bancolombia, comprobantes, pagos
  de nómina y terceros): el exportador los deja como JSON en `contabilidad/05_DATOS_INTERMEDIOS/portal_contable/`
  y `node db/cargar-contable.mjs` los sube a la tabla `contable_datos` de la base del portal. **Nunca se versionan en
  git** (ni se ponen en `api/_lib/contableData/`). La API los lee con `api/_lib/contableStore.ts`.
- **Sin datos personales** (catálogo de productos, plan de cuentas y bitácora): siguen como módulos TypeScript en
  `api/_lib/contableData/*.ts`; `bitacora.ts` se edita a mano.

Se sirven únicamente por `GET /api/trazabilidad?r=contable-*` (misma función serverless que Trazabilidad y POS, por el
límite de 12 de Vercel Hobby), con sesión y permiso `contable`. **No se importan desde `src/`**: todo lo que está en
`src/` termina en el código público que descarga el navegador. En modo demo se usan datos de ejemplo inventados
(`src/lib/contableDemo.ts`).

Para actualizar los datos: correr el exportador y luego `POSTGRES_URL=<base> node db/cargar-contable.mjs`; no hace
falta desplegar (la API refresca su copia en memoria cada 5 minutos).

**Límites actuales:** el módulo es de consulta; no escribe en Alegra ni se conecta a Alegra en vivo (las
credenciales de Alegra no están en este proyecto). Las escrituras en Alegra las hacen los scripts de
`04_SCRIPTS_MIGRACION`.

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
