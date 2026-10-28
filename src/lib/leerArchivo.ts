// Lectura de archivos para la importación de Gestión Contable. Todo se lee en el navegador; al servidor solo se
// envía una muestra (para la sugerencia de la IA) y, al importar, las filas ya mapeadas.
//
// Formatos: CSV / TSV / TXT, JSON, Excel (.xlsx, .xlsm), Word (.docx, sus tablas) y, para que la IA los lea,
// PDF e imágenes. Los demás se intentan como texto; si no se pueden leer, se avisa y se sugiere convertirlos.

import { unzipSync, strFromU8 } from "fflate";
import { parsearCSV, parsearFecha } from "./contableCarga";

export interface ArchivoLeido {
  nombre: string;
  formato: string;
  hojas: string[];
  hoja: string;
  /** Todas las filas de la hoja, tal cual (la primera suele ser el encabezado). */
  matriz: string[][];
  filaEncabezado: number;
  encabezados: string[];
  filas: Record<string, string>[];
  /** PDF o imagen: el archivo en base64, para que la IA lo lea. */
  binario?: { base64: string; mime: string };
  advertencia?: string;
}

export const MAX_BINARIO_BYTES = 3_400_000;
const MAX_FILAS = 50_000;
const MAX_BYTES = 40_000_000;

function extension(nombre: string): string {
  const i = nombre.lastIndexOf(".");
  return i < 0 ? "" : nombre.slice(i + 1).toLowerCase();
}

const entidades: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
const decodificar = (s: string) =>
  s.replace(/&(amp|lt|gt|quot|apos);|&#(\d+);|&#x([0-9a-fA-F]+);/g, (m, _n, dec, hex) => (dec ? String.fromCodePoint(Number(dec)) : hex ? String.fromCodePoint(parseInt(hex, 16)) : (entidades[m] ?? m)));

/** Texto de todos los <t>...</t> (o <w:t>) dentro de un fragmento XML. */
function textos(xml: string, etiqueta: string): string {
  const re = new RegExp(`<${etiqueta}(?:\\s[^>]*)?>([\\s\\S]*?)</${etiqueta}>`, "g");
  let s = "";
  for (let m = re.exec(xml); m; m = re.exec(xml)) s += decodificar(m[1]);
  return s;
}

function columnaAIndice(ref: string): number {
  const letras = /^[A-Z]+/.exec(ref)?.[0] ?? "A";
  let n = 0;
  for (const ch of letras) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

/** Fecha de Excel (días desde 1899-12-30) → yyyy-mm-dd. */
export function fechaDeExcel(serial: number): string {
  const ms = Math.round(serial * 86400000) + Date.UTC(1899, 11, 30);
  return new Date(ms).toISOString().slice(0, 10);
}

interface HojaXlsx {
  nombre: string;
  matriz: string[][];
}

/** Hojas de un .xlsx como matrices de texto (los números salen como número; las fechas de Excel se convierten al leer los encabezados). */
export function leerXlsx(bytes: Uint8Array): HojaXlsx[] {
  const zip = unzipSync(bytes, { filter: (f) => /^xl\/(workbook\.xml|_rels\/workbook\.xml\.rels|sharedStrings\.xml|worksheets\/[^/]+\.xml)$/.test(f.name) });
  const texto = (ruta: string) => (zip[ruta] ? strFromU8(zip[ruta]) : "");
  const compartidas: string[] = [];
  const ss = texto("xl/sharedStrings.xml");
  for (const m of ss.matchAll(/<si(?:\s[^>]*)?>([\s\S]*?)<\/si>/g)) compartidas.push(textos(m[1], "t"));
  const rels = new Map<string, string>();
  for (const m of texto("xl/_rels/workbook.xml.rels").matchAll(/<Relationship\b[^>]*>/g)) {
    const id = /\bId="([^"]+)"/.exec(m[0])?.[1];
    const dest = /\bTarget="([^"]+)"/.exec(m[0])?.[1];
    if (id && dest) rels.set(id, dest.replace(/^\/?(xl\/)?/, "xl/"));
  }
  const hojas: HojaXlsx[] = [];
  for (const m of texto("xl/workbook.xml").matchAll(/<sheet\b[^>]*>/g)) {
    const nombre = decodificar(/\bname="([^"]*)"/.exec(m[0])?.[1] ?? `Hoja ${hojas.length + 1}`);
    const rid = /\br:id="([^"]+)"/.exec(m[0])?.[1] ?? "";
    const ruta = rels.get(rid) ?? `xl/worksheets/sheet${hojas.length + 1}.xml`;
    const xml = texto(ruta);
    if (!xml) continue;
    const matriz: string[][] = [];
    for (const fila of xml.matchAll(/<row\b([^>]*)>([\s\S]*?)<\/row>/g)) {
      const nFila = Number(/\br="(\d+)"/.exec(fila[1])?.[1] ?? matriz.length + 1) - 1;
      const celdas: string[] = [];
      for (const c of fila[2].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const ref = /\br="([A-Z]+\d+)"/.exec(c[1])?.[1] ?? "";
        const tipo = /\bt="([^"]+)"/.exec(c[1])?.[1] ?? "";
        const cuerpo = c[2] ?? "";
        let v = "";
        if (tipo === "s") v = compartidas[Number(/<v>([\s\S]*?)<\/v>/.exec(cuerpo)?.[1] ?? "-1")] ?? "";
        else if (tipo === "inlineStr") v = textos(cuerpo, "t");
        else v = decodificar(/<v>([\s\S]*?)<\/v>/.exec(cuerpo)?.[1] ?? "");
        celdas[ref ? columnaAIndice(ref) : celdas.length] = v;
      }
      for (let i = 0; i < celdas.length; i++) celdas[i] ??= "";
      matriz[nFila] = celdas;
      if (matriz.length > MAX_FILAS + 20) break;
    }
    for (let i = 0; i < matriz.length; i++) matriz[i] ??= [];
    hojas.push({ nombre, matriz });
  }
  return hojas;
}

/** Tablas de un .docx (cada tabla = una "hoja"); si no hay tablas, los párrafos como una sola columna. */
export function leerDocx(bytes: Uint8Array): HojaXlsx[] {
  const zip = unzipSync(bytes, { filter: (f) => f.name === "word/document.xml" });
  const xml = zip["word/document.xml"] ? strFromU8(zip["word/document.xml"]) : "";
  const hojas: HojaXlsx[] = [];
  let n = 0;
  for (const t of xml.matchAll(/<w:tbl>([\s\S]*?)<\/w:tbl>/g)) {
    const matriz = [...t[1].matchAll(/<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/g)].map((tr) => [...tr[1].matchAll(/<w:tc>([\s\S]*?)<\/w:tc>/g)].map((tc) => textos(tc[1], "w:t").trim()));
    if (matriz.length) hojas.push({ nombre: `Tabla ${++n}`, matriz });
  }
  if (hojas.length === 0) {
    const parrafos = [...xml.matchAll(/<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g)].map((p) => textos(p[1], "w:t").trim()).filter(Boolean);
    if (parrafos.length) hojas.push({ nombre: "Texto", matriz: [["texto"], ...parrafos.map((p) => [p])] });
  }
  return hojas;
}

/** Una hoja como filas de objetos: la fila de encabezados es la que se indica o la que parece serlo. */
export function detectarEncabezado(matriz: string[][]): number {
  const limite = Math.min(matriz.length, 15);
  const puntos = [];
  let maximo = 0;
  for (let i = 0; i < limite; i++) {
    const vacias = matriz[i].filter((c) => c.trim() !== "");
    const texto = vacias.filter((c) => Number.isNaN(Number(c.replace(/[$.,\s]/g, "")))).length;
    puntos.push({ i, llenas: vacias.length, texto });
    maximo = Math.max(maximo, vacias.length);
  }
  const candidata = puntos.find((p) => p.llenas >= 2 && p.llenas >= maximo * 0.6 && p.texto >= p.llenas * 0.6);
  return candidata?.i ?? 0;
}

export function aplicarEncabezado(matriz: string[][], fila: number): { encabezados: string[]; filas: Record<string, string>[] } {
  const crudos = matriz[fila] ?? [];
  const vistos = new Map<string, number>();
  const encabezados = crudos.map((h, i) => {
    const base = h.trim() || `Columna ${i + 1}`;
    const n = (vistos.get(base) ?? 0) + 1;
    vistos.set(base, n);
    return n === 1 ? base : `${base} (${n})`;
  });
  const esFecha = encabezados.map((h) => /fecha/i.test(h));
  const filas: Record<string, string>[] = [];
  for (let i = fila + 1; i < matriz.length && filas.length < MAX_FILAS; i++) {
    const celdas = matriz[i] ?? [];
    if (!celdas.some((c) => c && c.trim() !== "")) continue;
    const f: Record<string, string> = {};
    encabezados.forEach((h, j) => {
      let v = (celdas[j] ?? "").trim();
      if (esFecha[j] && /^\d{5}(\.\d+)?$/.test(v) && Number(v) > 20000 && Number(v) < 80000) v = fechaDeExcel(Number(v));
      if (v !== "") f[h] = v;
    });
    if (Object.keys(f).length) filas.push(f);
  }
  return { encabezados, filas };
}

function aBase64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

const MIME_BINARIO: Record<string, string> = { pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif" };

function vacio(nombre: string, formato: string, extra: Partial<ArchivoLeido> = {}): ArchivoLeido {
  return { nombre, formato, hojas: [], hoja: "", matriz: [], filaEncabezado: 0, encabezados: [], filas: [], ...extra };
}

function desdeMatriz(base: ArchivoLeido, hojas: HojaXlsx[], hoja?: string, filaEncabezado?: number): ArchivoLeido {
  const actual = hojas.find((h) => h.nombre === hoja) ?? hojas.find((h) => h.matriz.some((f) => f.some((c) => c.trim()))) ?? hojas[0];
  if (!actual) return { ...base, advertencia: "El archivo no tiene datos que se puedan leer." };
  const fila = filaEncabezado ?? detectarEncabezado(actual.matriz);
  return { ...base, hojas: hojas.map((h) => h.nombre), hoja: actual.nombre, matriz: actual.matriz, filaEncabezado: fila, ...aplicarEncabezado(actual.matriz, fila) };
}

/** Lee cualquier archivo. Si cambian la hoja o la fila de encabezados, se vuelve a llamar con esas opciones. */
export async function leerArchivo(archivo: File, opciones: { hoja?: string; filaEncabezado?: number } = {}): Promise<ArchivoLeido> {
  const ext = extension(archivo.name);
  if (archivo.size > MAX_BYTES) return vacio(archivo.name, ext, { advertencia: "El archivo pesa más de 40 MB. Divídelo o expórtalo como CSV." });
  const bytes = new Uint8Array(await archivo.arrayBuffer());

  if (ext in MIME_BINARIO) {
    if (bytes.length > MAX_BINARIO_BYTES) return vacio(archivo.name, ext, { advertencia: "El PDF o la imagen pesa más de 3,4 MB: la IA no puede leerlo. Expórtalo como Excel o CSV, o comprímelo." });
    return vacio(archivo.name, ext, { binario: { base64: aBase64(bytes), mime: MIME_BINARIO[ext] } });
  }
  const base = vacio(archivo.name, ext);
  try {
    if (ext === "xlsx" || ext === "xlsm") return desdeMatriz(base, leerXlsx(bytes), opciones.hoja, opciones.filaEncabezado);
    if (ext === "docx") return desdeMatriz(base, leerDocx(bytes), opciones.hoja, opciones.filaEncabezado);
    if (ext === "xls" || ext === "doc" || ext === "ppt" || ext === "pptx") {
      return { ...base, advertencia: `El formato .${ext} no se puede leer directamente. Guárdalo como .xlsx, .csv o .docx (Archivo → Guardar como) y vuelve a subirlo.` };
    }
    const texto = new TextDecoder("utf-8").decode(bytes);
    if (ext === "json") {
      const j = JSON.parse(texto) as unknown;
      const lista = Array.isArray(j) ? j : Array.isArray((j as { data?: unknown })?.data) ? ((j as { data: unknown[] }).data) : null;
      if (!lista || lista.length === 0 || typeof lista[0] !== "object") return { ...base, advertencia: "El JSON debe ser una lista de objetos (una fila por objeto)." };
      const cols = [...new Set(lista.slice(0, 200).flatMap((o) => Object.keys(o as object)))].slice(0, 60);
      const matriz = [cols, ...lista.slice(0, MAX_FILAS).map((o) => cols.map((c) => String((o as Record<string, unknown>)[c] ?? "")))];
      return desdeMatriz(base, [{ nombre: "JSON", matriz }], undefined, 0);
    }
    if (texto.includes("\u0000")) return { ...base, advertencia: "No reconozco este formato. Guárdalo como Excel (.xlsx), CSV, Word (.docx), PDF o imagen." };
    return desdeMatriz(base, [{ nombre: "Texto", matriz: parsearCSV(texto) }], undefined, opciones.filaEncabezado);
  } catch (e) {
    return { ...base, advertencia: `No se pudo leer el archivo (${e instanceof Error ? e.message : "formato inválido"}).` };
  }
}

/** Pasa a yyyy-mm-dd la columna de fecha indicada (si no se entiende, la deja como estaba). */
export function normalizarFechas(filas: Record<string, string>[], columna: string | undefined): Record<string, string>[] {
  if (!columna) return filas;
  return filas.map((f) => (f[columna] ? { ...f, [columna]: parsearFecha(f[columna]) ?? f[columna] } : f));
}
