// ============================================================================
// Punto único de acceso a Postgres para todas las funciones serverless en
// /api. `@vercel/postgres` lee automáticamente la variable de entorno
// POSTGRES_URL una vez que conectas un almacenamiento Postgres (Neon) a este
// proyecto en Vercel (Project -> Storage) — a diferencia de la configuración
// anterior con Supabase, no hay que copiar ninguna llave manualmente.
// ============================================================================

import { sql } from "@vercel/postgres";

export { sql };
