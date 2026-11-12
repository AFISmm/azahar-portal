// ============================================================================
// Gestión Contable: importación de archivos, búsquedas (terceros y cuentas) y conciliación bancaria estilo Alegra.
// Se enruta desde api/trazabilidad.ts (límite de 12 funciones de Vercel Hobby):
//
//   GET  ?r=contable-importaciones[&destino=]            -> lotes importados (sin filas)
//   GET  ?r=contable-importacion&id=&pagina=&q=          -> filas de un lote (50 por página)
//   GET  ?r=contable-buscar-terceros&q=                  -> terceros importados que coinciden (NIT o nombre)
//   GET  ?r=contable-buscar-cuentas&q=                   -> cuentas del plan de Alegra que coinciden
//   GET  ?r=contable-movimientos&fuente=&mes=            -> movimientos del extracto con lo ya asignado
//   POST ?r=contable-sugerir          {nombre, formato, encabezados, muestra[, archivoBase64, mime]}
//   POST ?r=contable-importar-crear   {nombre, formato, destino, sugerido, confianza, encabezados, mapeo, cuentaBanco}
//   POST ?r=contable-importar-filas   {id, filas[]}      (hasta 2.000 por llamada, 50.000 por lote)
//   POST ?r=contable-importar-borrar  {id}
//   POST ?r=contable-conciliar        {fuente, items[]}
//
// PERMISOS: módulo 'contable'. 'ver' consulta; 'editar' importa, borra y concilia.
// Las tablas se crean solas la primera vez (create table if not exists; ver también db/contable.sql).
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./db.js";
import { HttpError, requireModulo } from "./auth.js";
import { CAMPOS, DESTINOS, sugerirDestino, type Destino, type EntradaSugerir } from "./contableIA.js";
import { PLAN_CUENTAS } from "./contableData/planCuentas.js";
import { datosContables } from "./contableStore.js";

type Ruta = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;
type Fila = Record<string, string>;

const MAX_FILAS_LLAMADA = 2000;
const MAX_FILAS_LOTE = 50000;
const MAX_ITEMS_CONCILIAR = 500;
export const FUENTE_BANCOLOMBIA = "bancolombia-0590";

let tablasListas: Promise<void> | null = null;

/** Crea las tablas si no existen (una vez por instancia). */
function asegurarTablas(): Promise<void> {
  tablasListas ??= (async () => {
    await sql`
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
      )`;
    await sql`create index if not exists contable_importaciones_destino_idx on contable_importaciones (destino, creado_en desc)`;
    await sql`
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
      )`;
  })().catch((e) => {
    tablasListas = null;
    throw e;
  });
  return tablasListas;
}

function param(req: VercelRequest, nombre: string): string {
  const v = req.query[nombre];
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

function cuerpo(req: VercelRequest): Record<string, unknown> {
  const b = req.body as unknown;
  if (typeof b === "object" && b !== null && !Array.isArray(b)) return b as Record<string, unknown>;
  throw new HttpError(400, "Cuerpo inválido.");
}

const texto = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esDestino = (v: unknown): v is Destino => typeof v === "string" && (DESTINOS as readonly string[]).includes(v);

/** Deja solo texto/números cortos: una fila nunca lleva objetos anidados. */
function limpiarFila(f: unknown): Fila | null {
  if (typeof f !== "object" || f === null || Array.isArray(f)) return null;
  const salida: Fila = {};
  for (const [k, v] of Object.entries(f as Record<string, unknown>).slice(0, 60)) {
    if (v === null || v === undefined) continue;
    salida[String(k).slice(0, 80)] = typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? String(v).slice(0, 500) : "";
  }
  return salida;
}

/** Valida el mapeo campo→columna: solo campos del destino y columnas que existen. */
function limpiarMapeo(destino: Destino, mapeo: unknown, encabezados: string[]): Record<string, string> {
  const ok = new Set(CAMPOS[destino].map((c) => c.clave));
  const salida: Record<string, string> = {};
  if (typeof mapeo !== "object" || mapeo === null) return salida;
  for (const [campo, col] of Object.entries(mapeo as Record<string, unknown>)) {
    if (ok.has(campo) && typeof col === "string" && encabezados.includes(col)) salida[campo] = col;
  }
  return salida;
}

// ---------------------------------------------------------------- consultas

const importaciones: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "ver");
  await asegurarTablas();
  const destino = param(req, "destino");
  const { rows } = esDestino(destino)
    ? await sql`select id, nombre_archivo, formato, destino, sugerido_ia, confianza, n_filas, cuenta_banco, encabezados, mapeo, creado_por_nombre, creado_en
                from contable_importaciones where destino = ${destino} order by creado_en desc limit 100`
    : await sql`select id, nombre_archivo, formato, destino, sugerido_ia, confianza, n_filas, cuenta_banco, encabezados, mapeo, creado_por_nombre, creado_en
                from contable_importaciones order by creado_en desc limit 100`;
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({
    ok: true,
    importaciones: rows.map((r) => ({
      id: r.id,
      nombreArchivo: r.nombre_archivo,
      formato: r.formato,
      destino: r.destino,
      sugeridoIa: r.sugerido_ia,
      confianza: r.confianza === null ? null : Number(r.confianza),
      filas: r.n_filas,
      cuentaBanco: r.cuenta_banco,
      encabezados: r.encabezados,
      mapeo: r.mapeo,
      creadoPor: r.creado_por_nombre,
      creadoEn: r.creado_en,
    })),
  });
};

const importacion: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "ver");
  await asegurarTablas();
  const id = texto(param(req, "id"), 80);
  const q = texto(param(req, "q"), 80).toLowerCase();
  const pagina = Math.max(1, Number.parseInt(param(req, "pagina"), 10) || 1);
  const tam = 50;
  // filtro de fechas del módulo: solo aplica a lotes que tienen una columna de fecha (ya normalizada a yyyy-mm-dd al importar)
  const FECHA = /^\d{4}-\d{2}-\d{2}$/;
  const desde = FECHA.test(param(req, "desde")) ? param(req, "desde") : "";
  const hasta = FECHA.test(param(req, "hasta")) ? param(req, "hasta") : "";
  const lote = (await sql`select id, nombre_archivo, destino, encabezados, mapeo, n_filas from contable_importaciones where id = ${id} limit 1`).rows[0];
  if (!lote) throw new HttpError(404, "No existe esa importación.");
  const patron = `%${q}%`;
  const total = Number(
    (await sql`select count(*)::int as n from contable_importaciones i, jsonb_array_elements(i.filas) f where i.id = ${id} and (${q} = '' or lower(f::text) like ${patron})
               and (${desde} = '' or substr(coalesce(f ->> (i.mapeo ->> 'fecha'), ''), 1, 10) >= ${desde})
               and (${hasta} = '' or substr(coalesce(f ->> (i.mapeo ->> 'fecha'), ''), 1, 10) <= ${hasta})`).rows[0].n,
  );
  const filas = (
    await sql`select f, n from contable_importaciones i, jsonb_array_elements(i.filas) with ordinality as t(f, n)
              where i.id = ${id} and (${q} = '' or lower(f::text) like ${patron})
                and (${desde} = '' or substr(coalesce(f ->> (i.mapeo ->> 'fecha'), ''), 1, 10) >= ${desde})
                and (${hasta} = '' or substr(coalesce(f ->> (i.mapeo ->> 'fecha'), ''), 1, 10) <= ${hasta}) order by n offset ${(pagina - 1) * tam} limit ${tam}`
  ).rows.map((r) => ({ n: Number(r.n), ...(r.f as Fila) }));
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({
    ok: true,
    importacion: { id: lote.id, nombreArchivo: lote.nombre_archivo, destino: lote.destino, encabezados: lote.encabezados, mapeo: lote.mapeo, filas: lote.n_filas },
    total,
    pagina,
    paginas: Math.max(1, Math.ceil(total / tam)),
    filas,
  });
};

const buscarTerceros: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "ver");
  await asegurarTablas();
  const q = texto(param(req, "q"), 60).toLowerCase();
  const patron = `%${q}%`;
  const { rows } = await sql`
    select distinct on (nit) nit, nombre from (
      select f ->> (i.mapeo ->> 'nit') as nit, f ->> (i.mapeo ->> 'nombre') as nombre
      from contable_importaciones i, jsonb_array_elements(i.filas) f
      where i.destino = 'tercero' and i.mapeo ? 'nit'
    ) t
    where nit is not null and nit <> '' and (${q} = '' or lower(nit) like ${patron} or lower(coalesce(nombre, '')) like ${patron})
    order by nit limit 20`;
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({ ok: true, terceros: rows.map((r) => ({ nit: r.nit, nombre: r.nombre ?? "" })) });
};

const quitarAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const buscarCuentas: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "ver");
  const q = quitarAcentos(texto(param(req, "q"), 60));
  const lista = q ? PLAN_CUENTAS.filter((c) => c.codigo.startsWith(q) || quitarAcentos(c.nombre).includes(q) || c.codigo.includes(q)) : PLAN_CUENTAS;
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({ ok: true, cuentas: lista.slice(0, 25) });
};

const num = (v: unknown): number => {
  const n = Number(String(v ?? "").replace(/[^0-9.,-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

/** Movimientos de un extracto (el del proyecto o uno importado) con la cuenta y el tercero ya asignados. */
const movimientos: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "ver");
  await asegurarTablas();
  const fuente = texto(param(req, "fuente"), 80);
  const mes = texto(param(req, "mes"), 20); // "Abril 2026" o "2026-04"
  let filas: { clave: string; mes: string; fecha: string | null; descripcion: string; debito: number; credito: number; saldo: number | null; cuentaSugerida: string; cuentaSugeridaNombre: string | null; nitSugerido: string | null; terceroSugerido: string | null }[];
  if (fuente === FUENTE_BANCOLOMBIA) {
    filas = (await datosContables("movimientos")).filter((m) => !mes || m.mes === mes || (m.fecha ?? "").startsWith(mes)).map((m) => ({
      clave: m.clave, mes: m.mes, fecha: m.fecha, descripcion: m.descripcion, debito: m.debito, credito: m.credito, saldo: m.saldo,
      cuentaSugerida: m.cuenta, cuentaSugeridaNombre: m.cuentaNombre, nitSugerido: m.nit, terceroSugerido: m.tercero,
    }));
  } else {
    const lote = (await sql`select id, destino, mapeo from contable_importaciones where id = ${fuente} limit 1`).rows[0];
    if (!lote || lote.destino !== "extracto") throw new HttpError(404, "No existe ese extracto importado.");
    const m = lote.mapeo as Record<string, string>;
    const { rows } = await sql`select f, n from contable_importaciones i, jsonb_array_elements(i.filas) with ordinality as t(f, n) where i.id = ${fuente} order by n limit 20000`;
    filas = rows
      .map((r) => {
        const f = r.f as Fila;
        const fecha = (m.fecha ? f[m.fecha] : "") ?? "";
        return {
          clave: `${fuente}:${r.n}`,
          mes: fecha.slice(0, 7),
          fecha: /^\d{4}-\d{2}-\d{2}/.test(fecha) ? fecha.slice(0, 10) : null,
          descripcion: (m.descripcion ? f[m.descripcion] : "") ?? "",
          debito: m.debito ? num(f[m.debito]) : 0,
          credito: m.credito ? num(f[m.credito]) : 0,
          saldo: m.saldo && f[m.saldo] !== undefined ? num(f[m.saldo]) : null,
          cuentaSugerida: (m.cuenta ? f[m.cuenta] : "") ?? "",
          cuentaSugeridaNombre: null,
          nitSugerido: null,
          terceroSugerido: null,
        };
      })
      .filter((x) => !mes || x.mes === mes);
  }
  const guardado = (await sql`select mov_clave, cuenta_puc, cuenta_nombre, tercero_nit, tercero_nombre, conciliado from contable_conciliacion where fuente = ${fuente}`).rows;
  const porClave = new Map(guardado.map((g) => [g.mov_clave as string, g]));
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({
    ok: true,
    movimientos: filas.slice(0, 3000).map((x) => {
      const g = porClave.get(x.clave);
      return {
        ...x,
        cuenta: g?.cuenta_puc ?? null,
        cuentaNombre: g?.cuenta_nombre ?? null,
        terceroNit: g?.tercero_nit ?? null,
        terceroNombre: g?.tercero_nombre ?? null,
        conciliado: g?.conciliado ?? false,
      };
    }),
  });
};

// ---------------------------------------------------------------- escrituras

const sugerir: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "ver");
  const b = cuerpo(req);
  const entrada: EntradaSugerir = {
    nombre: texto(b.nombre, 200),
    formato: texto(b.formato, 20),
    encabezados: Array.isArray(b.encabezados) ? (b.encabezados as unknown[]).map((h) => texto(h, 80)).slice(0, 60) : [],
    muestra: Array.isArray(b.muestra) ? (b.muestra as unknown[]).map(limpiarFila).filter((f): f is Fila => !!f).slice(0, 15) : [],
  };
  const mime = texto(b.mime, 60);
  const base64 = typeof b.archivoBase64 === "string" ? b.archivoBase64 : "";
  if (base64 && /^(application\/pdf|image\/(png|jpeg|webp|gif))$/.test(mime) && base64.length < 5_000_000) {
    entrada.archivoBase64 = base64;
    entrada.mime = mime;
  }
  const sugerencia = await sugerirDestino(entrada);
  return res.status(200).json({ ok: true, sugerencia });
};

const importarCrear: Ruta = async (req, res) => {
  const { empleadoId, empleado } = await requireModulo(req, "contable", "editar");
  await asegurarTablas();
  const b = cuerpo(req);
  if (!esDestino(b.destino)) throw new HttpError(400, "Elige a qué módulo va la información.");
  const encabezados = Array.isArray(b.encabezados) ? (b.encabezados as unknown[]).map((h) => texto(h, 80)).filter(Boolean).slice(0, 60) : [];
  const mapeo = limpiarMapeo(b.destino, b.mapeo, encabezados);
  const faltan = CAMPOS[b.destino].filter((c) => c.obligatorio && !mapeo[c.clave]).map((c) => c.etiqueta);
  if (faltan.length) throw new HttpError(400, `Falta indicar a qué columna corresponde: ${faltan.join(", ")}.`);
  const sugerido = esDestino(b.sugerido) ? b.sugerido : null;
  const confianza = typeof b.confianza === "number" && Number.isFinite(b.confianza) ? Math.min(1, Math.max(0, b.confianza)) : null;
  const { rows } = await sql`
    insert into contable_importaciones (nombre_archivo, formato, destino, sugerido_ia, confianza, encabezados, mapeo, cuenta_banco, creado_por, creado_por_nombre)
    values (${texto(b.nombre, 200) || "archivo"}, ${texto(b.formato, 20)}, ${b.destino}, ${sugerido}, ${confianza}, ${JSON.stringify(encabezados)}::jsonb, ${JSON.stringify(mapeo)}::jsonb,
            ${texto(b.cuentaBanco, 80) || null}, ${empleadoId}, ${(empleado as { nombre?: string }).nombre ?? null})
    returning id`;
  return res.status(201).json({ ok: true, id: rows[0].id });
};

const importarFilas: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "editar");
  await asegurarTablas();
  const b = cuerpo(req);
  const id = texto(b.id, 80);
  if (!Array.isArray(b.filas)) throw new HttpError(400, "Faltan las filas.");
  const filas = (b.filas as unknown[]).slice(0, MAX_FILAS_LLAMADA).map(limpiarFila).filter((f): f is Fila => !!f && Object.values(f).some((v) => v !== ""));
  if (filas.length === 0) return res.status(200).json({ ok: true, agregadas: 0 });
  const actual = (await sql`select n_filas from contable_importaciones where id = ${id} limit 1`).rows[0];
  if (!actual) throw new HttpError(404, "No existe esa importación.");
  if (Number(actual.n_filas) + filas.length > MAX_FILAS_LOTE) throw new HttpError(400, `Un archivo admite hasta ${MAX_FILAS_LOTE.toLocaleString("es-CO")} filas.`);
  await sql`update contable_importaciones set filas = filas || ${JSON.stringify(filas)}::jsonb, n_filas = n_filas + ${filas.length} where id = ${id}`;
  return res.status(200).json({ ok: true, agregadas: filas.length });
};

const importarBorrar: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "editar");
  await asegurarTablas();
  const id = texto(cuerpo(req).id, 80);
  await sql`delete from contable_importaciones where id = ${id}`;
  await sql`delete from contable_conciliacion where fuente = ${id}`;
  return res.status(200).json({ ok: true });
};

const conciliar: Ruta = async (req, res) => {
  const { empleadoId } = await requireModulo(req, "contable", "editar");
  await asegurarTablas();
  const b = cuerpo(req);
  const fuente = texto(b.fuente, 80);
  if (!fuente) throw new HttpError(400, "Falta la fuente.");
  if (!Array.isArray(b.items)) throw new HttpError(400, "Faltan los movimientos.");
  const items = (b.items as Record<string, unknown>[]).slice(0, MAX_ITEMS_CONCILIAR);
  for (const it of items) {
    const clave = texto(it.clave, 100);
    if (!clave) continue;
    const cuenta = texto(it.cuenta, 30) || null;
    const nit = texto(it.terceroNit, 30) || null;
    await sql`
      insert into contable_conciliacion (fuente, mov_clave, cuenta_puc, cuenta_nombre, tercero_nit, tercero_nombre, conciliado, actualizado_por, actualizado_en)
      values (${fuente}, ${clave}, ${cuenta}, ${texto(it.cuentaNombre, 200) || null}, ${nit}, ${texto(it.terceroNombre, 200) || null}, ${it.conciliado === true}, ${empleadoId}, now())
      on conflict (fuente, mov_clave) do update set cuenta_puc = excluded.cuenta_puc, cuenta_nombre = excluded.cuenta_nombre, tercero_nit = excluded.tercero_nit,
        tercero_nombre = excluded.tercero_nombre, conciliado = excluded.conciliado, actualizado_por = excluded.actualizado_por, actualizado_en = now()`;
  }
  return res.status(200).json({ ok: true, guardados: items.length });
};

export const IMPORTAR_GET: Record<string, Ruta> = {
  "contable-importaciones": importaciones,
  "contable-importacion": importacion,
  "contable-buscar-terceros": buscarTerceros,
  "contable-buscar-cuentas": buscarCuentas,
  "contable-movimientos": movimientos,
};

export const IMPORTAR_POST: Record<string, Ruta> = {
  "contable-sugerir": sugerir,
  "contable-importar-crear": importarCrear,
  "contable-importar-filas": importarFilas,
  "contable-importar-borrar": importarBorrar,
  "contable-conciliar": conciliar,
};
