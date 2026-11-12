// ============================================================================
// Carga a la base del portal los datos de Gestión Contable que tienen información personal o bancaria
// (conciliación, movimientos del extracto, comprobantes, pagos de nómina y terceros).
//
// Estos datos NUNCA van al repositorio: el exportador (contabilidad/04_SCRIPTS_MIGRACION/
// exportar_datos_portal_contable.py) los deja como JSON en contabilidad/05_DATOS_INTERMEDIOS/portal_contable/
// y este guion los sube a la tabla contable_datos. Se puede repetir cuando cambien los archivos.
//
// Uso:   POSTGRES_URL=<url de la base> node db/cargar-contable.mjs [carpeta-con-los-json]
// (nunca contra una base que no sea la del portal; la URL de producción se obtiene con `vercel env pull`)
// ============================================================================

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";

const URL_BD = process.env.POSTGRES_URL ?? process.env.DESTINO_URL;
if (!URL_BD) throw new Error("Falta POSTGRES_URL (la base del portal).");
const carpeta = resolve(process.argv[2] ?? "contabilidad/05_DATOS_INTERMEDIOS/portal_contable");
const sql = neon(URL_BD);

// clave en la tabla  ->  archivo JSON
const ARCHIVOS = {
  conciliacion: "conciliacionBancolombia.json",
  nomina: "pagosNomina.json",
  terceros: "terceros.json",
  comprobantes: "comprobantes.json",
  movimientos: "movimientos.json",
};

await sql(`
  create table if not exists contable_datos (
    clave text primary key,
    datos jsonb not null,
    actualizado timestamptz not null default now()
  )`);

for (const [clave, archivo] of Object.entries(ARCHIVOS)) {
  const ruta = resolve(carpeta, archivo);
  if (!existsSync(ruta)) throw new Error(`No existe ${ruta}: corre primero el exportador.`);
  const texto = readFileSync(ruta, "utf8");
  JSON.parse(texto); // valida antes de escribir
  await sql(
    `insert into contable_datos (clave, datos, actualizado) values ($1, $2::jsonb, now())
     on conflict (clave) do update set datos = excluded.datos, actualizado = now()`,
    [clave, texto],
  );
  console.log("ok", clave, `${Math.round(texto.length / 1024)} KB`);
}
const n = (await sql(`select count(*)::int as n from contable_datos`))[0].n;
console.log(`contable_datos: ${n} conjuntos`);
