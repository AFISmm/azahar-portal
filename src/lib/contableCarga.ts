// Cargue de archivos del módulo Gestión Contable. Todo se procesa en el navegador: el archivo NO se sube a
// ningún servidor. Acepta CSV (guardar el Excel como "CSV UTF-8"). Dos perfiles:
//   - extracto: movimientos bancarios (Fecha, Descripción, Débito, Crédito, Cuenta PUC) → conciliación por mes y cuenta.
//   - facturas: facturas de venta o compra (Fecha, Número, Tercero/NIT, Total, Retefuente, Reteica, Reteiva) → resumen por mes.

export type Perfil = "extracto" | "facturas";

export function quitarAcentos(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function normalizarEncabezado(s: string): string {
  return quitarAcentos(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Separa el texto en filas/columnas respetando comillas; detecta el separador (; , tab). */
export function parsearCSV(texto: string): string[][] {
  const limpio = texto.replace(/^﻿/, "");
  const primera = limpio.split(/\r?\n/, 1)[0] ?? "";
  const cuenta = (c: string) => primera.split(c).length - 1;
  const sep = [";", "\t", ","].sort((a, b) => cuenta(b) - cuenta(a))[0];
  const filas: string[][] = [];
  let fila: string[] = [];
  let campo = "";
  let entreComillas = false;
  for (let i = 0; i < limpio.length; i++) {
    const c = limpio[i];
    if (entreComillas) {
      if (c === '"' && limpio[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') entreComillas = false;
      else campo += c;
    } else if (c === '"') entreComillas = true;
    else if (c === sep) {
      fila.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && limpio[i + 1] === "\n") i++;
      fila.push(campo);
      campo = "";
      if (fila.some((x) => x.trim() !== "")) filas.push(fila);
      fila = [];
    } else campo += c;
  }
  fila.push(campo);
  if (fila.some((x) => x.trim() !== "")) filas.push(fila);
  return filas;
}

/** "1.234,56", "1,234.56", "$ 1.234", "(500)" → número; vacío o inválido → null. */
export function parsearNumero(crudo: string | undefined): number | null {
  if (crudo === undefined) return null;
  let s = crudo.trim();
  if (!s) return null;
  let negativo = false;
  if (/^\(.*\)$/.test(s)) {
    negativo = true;
    s = s.slice(1, -1);
  }
  s = s.replace(/[^0-9.,-]/g, "");
  if (s.startsWith("-")) {
    negativo = !negativo;
    s = s.slice(1);
  }
  if (!s) return null;
  const ultimaComa = s.lastIndexOf(",");
  const ultimoPunto = s.lastIndexOf(".");
  if (ultimaComa >= 0 && ultimoPunto >= 0) {
    // el último separador es el decimal
    s = ultimaComa > ultimoPunto ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
  } else if (ultimaComa >= 0) {
    s = /,\d{1,2}$/.test(s) && s.split(",").length === 2 ? s.replace(",", ".") : s.replace(/,/g, "");
  } else if (ultimoPunto >= 0) {
    s = /\.\d{1,2}$/.test(s) && s.split(".").length === 2 ? s : s.replace(/\./g, "");
  }
  const n = Number(s);
  return Number.isFinite(n) ? (negativo ? -n : n) : null;
}

/** yyyy-mm-dd, dd/mm/yyyy o dd-mm-yyyy → yyyy-mm-dd; inválida → null. */
export function parsearFecha(crudo: string | undefined): string | null {
  const s = (crudo ?? "").trim();
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s);
  let a: number, me: number, d: number;
  if (m) [a, me, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  else if ((m = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/.exec(s))) [d, me, a] = [Number(m[1]), Number(m[2]), Number(m[3])];
  else return null;
  if (me < 1 || me > 12 || d < 1 || d > 31) return null;
  return `${a}-${String(me).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const NOMBRES_MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
export function etiquetaMes(iso: string): string {
  const [a, m] = iso.split("-");
  return `${NOMBRES_MES[Number(m) - 1]} ${a}`;
}

type Alias = Record<string, string[]>;
const ALIAS_EXTRACTO: Alias = {
  fecha: ["fecha"],
  descripcion: ["descripcion", "detalle", "concepto"],
  debito: ["debito", "cargo", "cargos", "debitos"],
  credito: ["credito", "abono", "abonos", "creditos"],
  cuenta: ["cuenta puc", "puc", "cuenta", "cuenta contable"],
};
const ALIAS_FACTURAS: Alias = {
  fecha: ["fecha", "fecha de emision", "fecha emision"],
  numero: ["numero", "codigo", "factura", "numero factura", "n factura", "n de factura"],
  tercero: ["tercero", "proveedor", "cliente", "nombre tercero", "nit", "nit tercero"],
  total: ["total", "total factura", "valor", "valor total"],
  retefuente: ["monto retefte", "retefuente", "rete fuente", "retencion en la fuente"],
  reteica: ["monto reteica", "reteica", "rete ica"],
  reteiva: ["monto reteiva", "reteiva", "rete iva", "monto reteova"],
};

function mapear(encabezado: string[], alias: Alias): Record<string, number> {
  const norm = encabezado.map(normalizarEncabezado);
  const mapa: Record<string, number> = {};
  for (const [clave, nombres] of Object.entries(alias)) {
    const idx = norm.findIndex((h) => nombres.includes(h));
    if (idx >= 0) mapa[clave] = idx;
  }
  return mapa;
}

export interface ResultadoExtracto {
  perfil: "extracto";
  filas: number;
  invalidas: { fila: number; motivo: string }[];
  sinCuenta: number;
  totalDebito: number;
  totalCredito: number;
  meses: { mes: string; etiqueta: string; movimientos: number; debito: number; credito: number; neto: number }[];
  cuentas: { cuenta: string; porMes: Record<string, { debito: number; credito: number }>; totalDebito: number; totalCredito: number }[];
}
export interface ResultadoFacturas {
  perfil: "facturas";
  filas: number;
  invalidas: { fila: number; motivo: string }[];
  duplicadas: string[];
  sinTercero: number;
  total: number;
  meses: { mes: string; etiqueta: string; facturas: number; total: number; retefuente: number; reteica: number; reteiva: number }[];
}
export type Resultado = ResultadoExtracto | ResultadoFacturas | { perfil: Perfil; error: string };

export function procesarArchivo(texto: string, perfil: Perfil, rango: { desde: string; hasta: string } = { desde: "", hasta: "" }): Resultado {
  const filas = parsearCSV(texto);
  if (filas.length < 2) return { perfil, error: "El archivo no tiene filas de datos." };
  const [encabezado, ...datos] = filas;
  const mapa = mapear(encabezado, perfil === "extracto" ? ALIAS_EXTRACTO : ALIAS_FACTURAS);
  const requeridas = perfil === "extracto" ? ["fecha", "debito", "credito"] : ["fecha", "total"];
  const faltan = requeridas.filter((c) => mapa[c] === undefined);
  if (faltan.length) return { perfil, error: `Faltan columnas obligatorias: ${faltan.join(", ")}. Encabezados encontrados: ${encabezado.map((h) => h.trim()).join(" | ")}` };

  const invalidas: { fila: number; motivo: string }[] = [];
  /** true si la fecha cae dentro del filtro de fechas del módulo. */
  const enRango = (iso: string) => (!rango.desde || iso >= rango.desde) && (!rango.hasta || iso <= rango.hasta);

  if (perfil === "extracto") {
    const porMes = new Map<string, { movimientos: number; debito: number; credito: number }>();
    const porCuenta = new Map<string, Map<string, { debito: number; credito: number }>>();
    let sinCuenta = 0;
    let validas = 0;
    datos.forEach((f, i) => {
      const fecha = parsearFecha(f[mapa.fecha]);
      const debito = parsearNumero(f[mapa.debito]) ?? 0;
      const credito = parsearNumero(f[mapa.credito]) ?? 0;
      if (!fecha) return void invalidas.push({ fila: i + 2, motivo: "Fecha inválida" });
      if (!enRango(fecha)) return;
      validas++;
      const mes = fecha.slice(0, 7);
      const m = porMes.get(mes) ?? { movimientos: 0, debito: 0, credito: 0 };
      m.movimientos++;
      m.debito += debito;
      m.credito += credito;
      porMes.set(mes, m);
      const cuenta = (mapa.cuenta !== undefined ? f[mapa.cuenta] : "")?.trim() || "";
      if (!cuenta) sinCuenta++;
      const clave = cuenta || "(sin cuenta)";
      const pc = porCuenta.get(clave) ?? new Map();
      const pm = pc.get(mes) ?? { debito: 0, credito: 0 };
      pm.debito += debito;
      pm.credito += credito;
      pc.set(mes, pm);
      porCuenta.set(clave, pc);
    });
    const meses = [...porMes.entries()].sort().map(([mes, v]) => ({ mes, etiqueta: etiquetaMes(mes), ...v, neto: v.credito - v.debito }));
    const cuentas = [...porCuenta.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([cuenta, pc]) => {
        const por: Record<string, { debito: number; credito: number }> = {};
        let td = 0;
        let tc = 0;
        for (const [mes, v] of pc) {
          por[mes] = v;
          td += v.debito;
          tc += v.credito;
        }
        return { cuenta, porMes: por, totalDebito: td, totalCredito: tc };
      });
    return { perfil, filas: validas, invalidas, sinCuenta, totalDebito: meses.reduce((s, m) => s + m.debito, 0), totalCredito: meses.reduce((s, m) => s + m.credito, 0), meses, cuentas };
  }

  const porMes = new Map<string, { facturas: number; total: number; retefuente: number; reteica: number; reteiva: number }>();
  const vistos = new Map<string, number>();
  let sinTercero = 0;
  let validas = 0;
  datos.forEach((f, i) => {
    const fecha = parsearFecha(f[mapa.fecha]);
    const total = parsearNumero(f[mapa.total]);
    if (!fecha || total === null) return void invalidas.push({ fila: i + 2, motivo: !fecha ? "Fecha inválida" : "Total inválido" });
    if (!enRango(fecha)) return;
    validas++;
    const mes = fecha.slice(0, 7);
    const m = porMes.get(mes) ?? { facturas: 0, total: 0, retefuente: 0, reteica: 0, reteiva: 0 };
    m.facturas++;
    m.total += total;
    m.retefuente += mapa.retefuente !== undefined ? (parsearNumero(f[mapa.retefuente]) ?? 0) : 0;
    m.reteica += mapa.reteica !== undefined ? (parsearNumero(f[mapa.reteica]) ?? 0) : 0;
    m.reteiva += mapa.reteiva !== undefined ? (parsearNumero(f[mapa.reteiva]) ?? 0) : 0;
    porMes.set(mes, m);
    if (mapa.tercero !== undefined && !(f[mapa.tercero] ?? "").trim()) sinTercero++;
    if (mapa.numero !== undefined) {
      const n = (f[mapa.numero] ?? "").trim();
      if (n) vistos.set(n, (vistos.get(n) ?? 0) + 1);
    }
  });
  const meses = [...porMes.entries()].sort().map(([mes, v]) => ({ mes, etiqueta: etiquetaMes(mes), ...v }));
  return { perfil, filas: validas, invalidas, duplicadas: [...vistos.entries()].filter(([, c]) => c > 1).map(([n]) => n), sinTercero, total: meses.reduce((s, m) => s + m.total, 0), meses };
}

/** Descarga un CSV (con BOM para que Excel respete las tildes). */
export function descargarCSV(nombre: string, filas: (string | number | null | undefined)[][]) {
  const celda = (v: string | number | null | undefined) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const blob = new Blob(["﻿" + filas.map((f) => f.map(celda).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(url);
}
