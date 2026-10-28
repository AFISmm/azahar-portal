// ============================================================================
// Migra el módulo de Trazabilidad (antes la app Next.js "azahar-trazabilidad",
// con su propia base Neon) a la base de datos del portal. TODO ocurre en UNA
// sola transacción: o queda completo, o no cambia nada.
//
//   1. Aplica db/trazabilidad.sql (tablas traz_* + empleados.permisos_trazabilidad) y el POS
//      (db/pos.sql + db/pos-catalogo.sql: tablas pos_*, empleados.permisos_pos y catálogo inicial).
//   2. Copia los datos de la base vieja (si se pasa ORIGEN_URL), conservando los
//      ids: los QR ya impresos apuntan a /lote/<id> y no pueden cambiar.
//   3. Da permiso 'ADMIN' de trazabilidad a los correos de ADMINS_TRAZABILIDAD
//      (por defecto, los dos habilitados al inicio) que ya existan como empleados.
//
// Es idempotente: se puede correr varias veces (INSERT ... ON CONFLICT DO NOTHING).
//
// Uso (desde la carpeta azahar-portal):
//   DESTINO_URL="<POSTGRES_URL del portal en Vercel>" \
//   ORIGEN_URL="<DATABASE_URL de azahar-trazabilidad>" \
//   node db/migrar-trazabilidad.mjs
//
// Ensayo sin tocar nada real: agrega PRUEBA=1. Crea un esquema temporal, corre
// todo y lo borra en la misma transacción.
// ============================================================================

import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const DESTINO_URL = process.env.DESTINO_URL;
const ORIGEN_URL = process.env.ORIGEN_URL;
const PRUEBA = process.env.PRUEBA === "1";
const ADMINS = (process.env.ADMINS_TRAZABILIDAD ?? "felipe.serna@mercurymethods.com,david.illidge@mercurymethods.com")
  .split(",")
  .map((c) => c.trim().toLowerCase())
  .filter(Boolean);

if (!DESTINO_URL) {
  console.error("Falta DESTINO_URL (la POSTGRES_URL de la base del portal).");
  process.exit(1);
}

const destino = neon(DESTINO_URL);
const origen = ORIGEN_URL ? neon(ORIGEN_URL) : null;

// Timestamps de Prisma (timestamp sin zona, en UTC) -> texto con zona, para timestamptz.
const ts = (col) => `("${col}"::text || '+00') as "${col}"`;
const dia = (col) => `"${col}"::date::text as "${col}"`;

/** [tabla origen, tabla destino, columnas destino, consulta SELECT en origen (mismo orden de columnas)] */
const TABLAS = [
  ["Finca", "traz_fincas",
    ["id", "nombre", "identificador_productor", "latitud", "longitud", "altitud_msnm", "region", "variedad", "tipo_recoleccion", "creado_en"],
    `select id, nombre, "identificadorProductor", latitud, longitud, "altitudMsnm", region, variedad, "tipoRecoleccion", ${ts("creadoEn")} from "Finca" order by "creadoEn"`],
  ["Certificacion", "traz_certificaciones",
    ["id", "finca_id", "nombre", "entidad_certificadora", "url_verificacion", "certificado_url", "fecha_emision", "fecha_vencimiento", "creado_en"],
    `select id, "fincaId", nombre, "entidadCertificadora", "urlVerificacion", "certificadoUrl", ${dia("fechaEmision")}, ${dia("fechaVencimiento")}, ${ts("creadoEn")} from "Certificacion" order by "creadoEn"`],
  ["LoteVerde", "traz_lotes_verdes",
    ["id", "finca_id", "tipo_proceso", "fecha_fermentacion", "fecha_secado", "humedad_final_pct", "responsable_calidad", "fecha_trilla", "clasificacion", "lote_exportacion", "transporte", "foto_secado_url", "creado_en"],
    `select id, "fincaId", "tipoProceso", ${dia("fechaFermentacion")}, ${dia("fechaSecado")}, "humedadFinalPct", "responsableCalidad", ${dia("fechaTrilla")}, clasificacion, "loteExportacion", transporte, "fotoSecadoUrl", ${ts("creadoEn")} from "LoteVerde" order by "creadoEn"`],
  ["FichaCata", "traz_fichas_cata",
    ["id", "lote_verde_id", "catador", "fecha", "acidez", "cuerpo", "dulzor", "notas", "creado_en"],
    `select id, "loteVerdeId", catador, ${dia("fecha")}, acidez, cuerpo, dulzor, notas, ${ts("creadoEn")} from "FichaCata" order by "creadoEn"`],
  ["LoteTostado", "traz_lotes_tostados",
    ["id", "fecha", "perfil_tueste", "curva_tueste", "maestro_tostador", "creado_en"],
    `select id, ${dia("fecha")}, "perfilTueste", "curvaTueste", "maestroTostador", ${ts("creadoEn")} from "LoteTostado" order by "creadoEn"`],
  ["ComponenteBlend", "traz_componentes_blend",
    ["id", "lote_tostado_id", "lote_verde_id", "kilogramos"],
    `select id, "loteTostadoId", "loteVerdeId", kilogramos from "ComponenteBlend"`],
  ["LoteEmpaque", "traz_lotes_empaque",
    ["id", "lote_tostado_id", "fecha_empaque", "lote_comercial", "fecha_vencimiento", "presentacion", "qr_data_url", "creado_en"],
    `select id, "loteTostadoId", ${dia("fechaEmpaque")}, "loteComercial", ${dia("fechaVencimiento")}, presentacion, "qrDataUrl", ${ts("creadoEn")} from "LoteEmpaque" order by "creadoEn"`],
  // La bitácora conserva el nombre de quien capturó; empleado_id queda null (los usuarios viejos no son empleados del portal).
  ["RegistroAuditoria", "traz_auditoria",
    ["id", "usuario_nombre", "entidad", "entidad_id", "accion", "resumen", "creado_en"],
    `select id, "usuarioNombre", entidad, "entidadId", accion, resumen, ${ts("creadoEn")} from "RegistroAuditoria" order by "creadoEn"`],
];

// Esquema de trazabilidad + esquema y catálogo inicial del POS (todo idempotente).
const ddl = ["trazabilidad.sql", "pos.sql", "pos-catalogo.sql"]
  .map((archivo) => readFileSync(new URL(`./${archivo}`, import.meta.url), "utf8"))
  .join("\n")
  .replace(/--.*$/gm, "") // fuera comentarios
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

// 1. Leer TODO el origen antes de abrir la transacción en el destino.
const datos = {};
if (origen) {
  for (const [nombreOrigen, , , consulta] of TABLAS) {
    datos[nombreOrigen] = await origen(consulta, []);
    console.log(`origen: ${nombreOrigen} -> ${datos[nombreOrigen].length} filas`);
  }
} else {
  console.log("Sin ORIGEN_URL: solo se aplica el esquema y los permisos (no se copian datos).");
}

// 2. Armar las sentencias de la transacción.
const esquema = "migracion_prueba";
const consultas = [];
const q = (txn) => {
  if (PRUEBA) {
    consultas.push(txn(`create schema ${esquema}`));
    consultas.push(txn(`set local search_path = ${esquema}`));
    // empleados de mentira para poder probar la columna y las FKs
    consultas.push(txn(`create table empleados (id uuid primary key default gen_random_uuid(), correo text, nombre text)`));
    for (const correo of ADMINS) consultas.push(txn(`insert into empleados (correo, nombre) values ($1, 'Prueba')`, [correo]));
  }
  for (const sentencia of ddl) consultas.push(txn(sentencia));

  for (const [nombreOrigen, tablaDestino, columnas] of TABLAS) {
    for (const fila of datos[nombreOrigen] ?? []) {
      const valores = Object.values(fila);
      const cols = [...columnas];
      const params = [...valores];
      if (tablaDestino === "traz_auditoria") {
        // usuario_nombre viene de la consulta; accion también. Nada que ajustar.
      }
      const marcadores = params.map((_, i) => `$${i + 1}`).join(", ");
      consultas.push(txn(`insert into ${tablaDestino} (${cols.join(", ")}) values (${marcadores}) on conflict (id) do nothing`, params));
    }
  }

  consultas.push(
    txn(`update empleados set permisos_trazabilidad = array['ADMIN'], permisos_pos = array['ADMIN'] where lower(correo) = any($1)`, [ADMINS]),
  );
  consultas.push(txn(`select 'pos_productos' as tabla, count(*)::int as filas from pos_productos`));
  for (const [, tablaDestino] of TABLAS) consultas.push(txn(`select '${tablaDestino}' as tabla, count(*)::int as filas from ${tablaDestino}`));
  consultas.push(txn(`select correo, permisos_trazabilidad from empleados where lower(correo) = any($1)`, [ADMINS]));
  if (PRUEBA) consultas.push(txn(`drop schema ${esquema} cascade`));
  return consultas;
};

const resultados = await destino.transaction(q);

// 3. Informe
const nTablas = TABLAS.length + 1; // +1: conteo de pos_productos
const inicioConteos = resultados.length - (PRUEBA ? 1 : 0) - 1 - nTablas;
console.log(PRUEBA ? "\n== ENSAYO (esquema temporal, ya eliminado; no se cambió nada real) ==" : "\n== MIGRACIÓN APLICADA ==");
for (let i = 0; i < nTablas; i++) console.log(`${resultados[inicioConteos + i][0].tabla}: ${resultados[inicioConteos + i][0].filas} filas`);
const admins = resultados[resultados.length - (PRUEBA ? 2 : 1)];
for (const correo of ADMINS) {
  const fila = admins.find((a) => a.correo.toLowerCase() === correo);
  console.log(fila ? `permiso ADMIN de trazabilidad -> ${correo}` : `AVISO: ${correo} no existe como empleado del portal. Créalo en Admin > Usuarios y asígnale el permiso ahí.`);
}
