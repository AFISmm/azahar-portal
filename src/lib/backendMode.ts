// La app corre en "modo demo" (sin backend real) a menos que se active
// explícitamente con VITE_ENABLE_BACKEND=true. A diferencia de la
// configuración anterior con Supabase (que exponía una URL y una llave
// "anon" pensadas para el navegador), Vercel Postgres no tiene un equivalente
// público y seguro que el cliente pueda leer para autodetectar si hay backend
// configurado: toda la conexión a la base de datos vive del lado del
// servidor (ver api/_lib/db.ts). Por eso este flag es una bandera manual de
// opt-in en vez de una detección automática.
export const IS_DEMO_MODE = import.meta.env.VITE_ENABLE_BACKEND !== "true";
