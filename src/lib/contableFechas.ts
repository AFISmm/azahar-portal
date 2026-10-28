// Filtro de fechas compartido por todas las pantallas de Gestión Contable. Lo guarda ContableLayout (estado +
// sessionStorage) y cada pantalla lo lee con useFiltroFechas().

import { createContext, useContext } from "react";

/** Rango en formato yyyy-MM-dd; "" = sin límite. */
export interface RangoFechas {
  desde: string;
  hasta: string;
}

export interface FiltroFechas extends RangoFechas {
  setRango: (r: RangoFechas) => void;
  /** true si no hay ningún límite. */
  vacio: boolean;
  /** true si la fecha (yyyy-MM-dd o ISO) cae dentro del rango. */
  dentro: (fecha: string | null | undefined) => boolean;
  /** true si el mes (yyyy-MM) se solapa con el rango. */
  mesDentro: (mes: string) => boolean;
  /** true si el período [ini, fin] (yyyy-MM-dd) se solapa con el rango. */
  periodoDentro: (ini: string, fin: string) => boolean;
}

/** Primer mes con información: la migración empieza con el cierre de diciembre de 2016. */
export const FECHA_INICIO_HISTORIA = "2016-12-01";

export function crearFiltro(rango: RangoFechas, setRango: (r: RangoFechas) => void): FiltroFechas {
  const { desde, hasta } = rango;
  const dentro = (f: string | null | undefined) => {
    if (!f) return !desde && !hasta;
    const dia = f.slice(0, 10);
    return (!desde || dia >= desde) && (!hasta || dia <= hasta);
  };
  const periodoDentro = (ini: string, fin: string) => (!desde || fin >= desde) && (!hasta || ini <= hasta);
  return {
    desde,
    hasta,
    setRango,
    vacio: !desde && !hasta,
    dentro,
    periodoDentro,
    mesDentro: (mes) => periodoDentro(`${mes}-01`, `${mes}-31`),
  };
}

export const ContextoFechas = createContext<FiltroFechas>(crearFiltro({ desde: "", hasta: "" }, () => {}));

export function useFiltroFechas(): FiltroFechas {
  return useContext(ContextoFechas);
}

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** "Abril 2026" → "2026-04"; si no se reconoce, null. */
export function mesEtiquetaAIso(etiqueta: string): string | null {
  const m = /^([A-Za-zÁÉÍÓÚáéíóúñÑ]+)\s+(\d{4})/.exec(etiqueta.trim());
  if (!m) return null;
  const i = MESES.indexOf(m[1].toLowerCase());
  return i < 0 ? null : `${m[2]}-${String(i + 1).padStart(2, "0")}`;
}

/** "2026-04" → "abril 2026". */
export function mesIsoAEtiqueta(mes: string): string {
  const [a, m] = mes.split("-");
  return `${MESES[Number(m) - 1] ?? m} ${a}`;
}

/** Atajos del selector: todo el historial, cada año desde 2016, año en curso y último trimestre. */
export function atajosRango(hoy: Date = new Date()): { etiqueta: string; rango: RangoFechas }[] {
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const anio = hoy.getFullYear();
  const trimestre = new Date(hoy);
  trimestre.setMonth(trimestre.getMonth() - 3);
  const atajos = [
    { etiqueta: "Todo (desde dic. 2016)", rango: { desde: "", hasta: "" } },
    { etiqueta: "Último trimestre", rango: { desde: iso(trimestre), hasta: iso(hoy) } },
  ];
  for (let a = anio; a >= 2016; a--) {
    atajos.push({ etiqueta: String(a), rango: { desde: a === 2016 ? FECHA_INICIO_HISTORIA : `${a}-01-01`, hasta: `${a}-12-31` } });
  }
  return atajos;
}

const CLAVE = "contable.rangoFechas";

export function leerRangoGuardado(): RangoFechas {
  try {
    const crudo = sessionStorage.getItem(CLAVE);
    if (crudo) {
      const r = JSON.parse(crudo) as Partial<RangoFechas>;
      if (typeof r.desde === "string" && typeof r.hasta === "string") return { desde: r.desde, hasta: r.hasta };
    }
  } catch {
    // sessionStorage no disponible: se parte sin filtro
  }
  return { desde: "", hasta: "" };
}

export function guardarRango(r: RangoFechas) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(r));
  } catch {
    // sin almacenamiento: el filtro vale solo mientras la página siga abierta
  }
}
