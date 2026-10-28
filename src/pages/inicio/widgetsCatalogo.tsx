import type { ReactNode } from "react";
import {
  Award, Banknote, ChartColumn, ClipboardList, Clock, Coffee, FileCheck2, Gauge, Globe, Hand, Layers, Rocket, Store, Trophy, TrendingUp, Users,
} from "lucide-react";
import type { Modulo } from "../../lib/types";
import type { Tam } from "./widgetsBase";
import {
  WidgetBaseMundial, WidgetCadenaProduccion, WidgetProduccionAgricola, WidgetValorBolsa, WidgetVariacionIndustrial,
} from "./widgetsMercado";
import {
  WidgetAccesosRapidos, WidgetCertificadosFincas, WidgetEquipo, WidgetIndicadores, WidgetMisSolicitudes, WidgetPorAprobar,
  WidgetProductoTop, WidgetProximoPago, WidgetReloj, WidgetSaludo, WidgetTiendas, WidgetTrazabilidad,
} from "./widgetsPortal";

// ============================================================================
// Catálogo de widgets del Inicio. Para ofrecer uno nuevo basta agregarlo aquí.
// El Sistema POS NO tiene widgets (decisión del producto): no agregar ninguno.
// ============================================================================

export type WidgetId =
  | "saludo" | "proximo-pago" | "mis-solicitudes" | "reloj" | "indicadores" | "accesos-rapidos"
  | "base-mundial" | "valor-bolsa" | "variacion-industrial" | "produccion-agricola" | "cadena-produccion"
  | "por-aprobar" | "equipo" | "tiendas" | "certificados-fincas" | "producto-top" | "trazabilidad";

export interface WidgetDef {
  id: WidgetId;
  titulo: string;
  descripcion: string;
  icono: ReactNode;
  /** Tamaños permitidos (en orden de menor a mayor). */
  tamanos: Tam[];
  tamInicial: Tam;
  /** Módulo cuyo permiso de "Ver" hace falta para ofrecerlo (sin esto: para todos). */
  modulo?: Modulo | Modulo[];
  render: (tam: Tam) => ReactNode;
}

const ic = (Icono: typeof Globe) => <Icono className="h-5 w-5" strokeWidth={1.75} />;

export const CATALOGO: WidgetDef[] = [
  { id: "saludo", titulo: "Saludo", descripcion: "Tu saludo del día, cargo y días de vacaciones.", icono: ic(Hand), tamanos: ["S", "M", "L"], tamInicial: "M", render: (t) => <WidgetSaludo tam={t} /> },
  { id: "proximo-pago", titulo: "Próximo pago", descripcion: "Monto y fecha de tu próximo pago de nómina.", icono: ic(Banknote), tamanos: ["S", "M"], tamInicial: "S", render: (t) => <WidgetProximoPago tam={t} /> },
  { id: "mis-solicitudes", titulo: "Mis solicitudes", descripcion: "Tus solicitudes pendientes, aprobadas y rechazadas.", icono: ic(ClipboardList), tamanos: ["S", "M", "L"], tamInicial: "S", render: (t) => <WidgetMisSolicitudes tam={t} /> },
  { id: "reloj", titulo: "Hora y fecha", descripcion: "Reloj en vivo con la fecha de hoy.", icono: ic(Clock), tamanos: ["S", "M"], tamInicial: "S", render: (t) => <WidgetReloj tam={t} /> },
  { id: "indicadores", titulo: "Indicadores en vivo", descripcion: "TRM, petróleo, café y oro actualizados cada minuto.", icono: ic(Gauge), tamanos: ["M", "W", "L"], tamInicial: "W", render: (t) => <WidgetIndicadores tam={t} /> },
  { id: "accesos-rapidos", titulo: "Accesos rápidos", descripcion: "Atajos a los módulos que usas más.", icono: ic(Rocket), tamanos: ["M", "W", "L"], tamInicial: "M", render: (t) => <WidgetAccesosRapidos tam={t} /> },

  { id: "base-mundial", titulo: "Base de datos mundial del café", descripcion: "Producción, consumo y exportaciones mundiales (datos de demostración).", icono: ic(Globe), tamanos: ["M", "W", "L", "XL"], tamInicial: "W", render: (t) => <WidgetBaseMundial tam={t} /> },
  { id: "valor-bolsa", titulo: "Valor del café en bolsa", descripcion: "Precio de referencia por día, semana o mes (datos de demostración).", icono: ic(Coffee), tamanos: ["L", "XL"], tamInicial: "XL", render: (t) => <WidgetValorBolsa tam={t} /> },
  { id: "variacion-industrial", titulo: "Variación de producción industrial", descripcion: "Variación % acumulada de los últimos 12 meses (datos de demostración).", icono: ic(TrendingUp), tamanos: ["M", "L"], tamInicial: "L", render: (t) => <WidgetVariacionIndustrial tam={t} /> },
  { id: "produccion-agricola", titulo: "Producción agrícola anual", descripcion: "Miles de toneladas por año (datos de demostración).", icono: ic(ChartColumn), tamanos: ["M", "L"], tamInicial: "L", render: (t) => <WidgetProduccionAgricola tam={t} /> },
  { id: "cadena-produccion", titulo: "Cadena de producción del café", descripcion: "De cultivo a empaque, con acceso al proceso completo.", icono: ic(Layers), tamanos: ["M", "W", "L", "XL"], tamInicial: "W", render: (t) => <WidgetCadenaProduccion tam={t} /> },

  { id: "por-aprobar", titulo: "Solicitudes por aprobar", descripcion: "Cuántas solicitudes del equipo esperan respuesta.", icono: ic(FileCheck2), tamanos: ["S", "M", "L"], tamInicial: "M", modulo: "rrhh", render: (t) => <WidgetPorAprobar tam={t} /> },
  { id: "equipo", titulo: "Equipo", descripcion: "Personas, activas y áreas de la empresa.", icono: ic(Users), tamanos: ["S", "M"], tamInicial: "M", modulo: ["usuarios", "rrhh"], render: (t) => <WidgetEquipo tam={t} /> },
  { id: "tiendas", titulo: "Tiendas", descripcion: "Ventas del mes y estado de cada tienda.", icono: ic(Store), tamanos: ["M", "L", "XL"], tamInicial: "L", modulo: "comercial", render: (t) => <WidgetTiendas tam={t} /> },
  { id: "certificados-fincas", titulo: "Certificados de fincas", descripcion: "Vigentes, por vencer y vencidos.", icono: ic(Award), tamanos: ["M", "L"], tamInicial: "L", modulo: "operativa", render: (t) => <WidgetCertificadosFincas tam={t} /> },
  { id: "producto-top", titulo: "Productos más vendidos", descripcion: "Ranking de productos (datos de ejemplo).", icono: ic(Trophy), tamanos: ["M", "L"], tamInicial: "M", modulo: "comercial", render: (t) => <WidgetProductoTop tam={t} /> },
  { id: "trazabilidad", titulo: "Trazabilidad del café", descripcion: "Fincas, lotes y últimos empaques con su ficha pública.", icono: ic(Coffee), tamanos: ["S", "M", "L"], tamInicial: "M", modulo: "trazabilidad", render: (t) => <WidgetTrazabilidad tam={t} /> },
];

export const POR_ID: Record<string, WidgetDef> = Object.fromEntries(CATALOGO.map((w) => [w.id, w]));

/**
 * Posición y tamaño libres de un widget. `x` y `w` son FRACCIONES del ancho del tablero (así se adaptan a
 * cualquier pantalla); `y` y `h` están en rem (así escalan con el tamaño de letra del portal).
 */
export interface ItemLibre {
  id: WidgetId;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Tamaños de referencia (columnas × filas de una cuadrícula imaginaria de 4 columnas) para disposiciones iniciales. */
export const REM_FILA = 10; // una "fila" lógica = 9rem de alto + 1rem de separación
const SEP_X = 0.012; // separación horizontal entre widgets (fracción del ancho)

/**
 * Convierte una lista ordenada de {id, tamaño} en posiciones libres, repartiéndolos como lo haría una
 * cuadrícula de 4 columnas. Se usa para la disposición inicial y para migrar la versión anterior.
 */
export function empaquetar(lista: { id: WidgetId; tam: Tam }[]): ItemLibre[] {
  const COLS = 4;
  const ocupado: boolean[][] = [];
  const libre = (f: number, c: number, nc: number, nf: number) => {
    for (let i = f; i < f + nf; i++) for (let j = c; j < c + nc; j++) if (ocupado[i]?.[j]) return false;
    return true;
  };
  const dims: Record<Tam, [number, number]> = { S: [1, 1], M: [2, 1], W: [4, 1], L: [2, 2], XL: [4, 2] };
  return lista.map(({ id, tam }) => {
    const [nc, nf] = dims[tam];
    let fila = 0;
    let col = 0;
    search: for (; ; fila++) {
      for (col = 0; col + nc <= COLS; col++) {
        if (libre(fila, col, nc, nf)) break search;
      }
    }
    for (let i = fila; i < fila + nf; i++) for (let j = col; j < col + nc; j++) (ocupado[i] ??= [])[j] = true;
    return { id, x: col / COLS + SEP_X / 2, y: fila * REM_FILA, w: nc / COLS - SEP_X, h: nf * REM_FILA - 1 };
  });
}

/** Tamaño inicial (en fracción y rem) de un widget recién agregado. */
export function dimsIniciales(tam: Tam): { w: number; h: number } {
  const [nc, nf] = ({ S: [1, 1], M: [2, 1], W: [4, 1], L: [2, 2], XL: [4, 2] } as Record<Tam, [number, number]>)[tam];
  return { w: nc / 4 - SEP_X, h: nf * REM_FILA - 1 };
}

/** Disposición inicial: saludo + pago + solicitudes arriba y, debajo, los cinco widgets de mercado originales. */
export const LAYOUT_POR_DEFECTO: ItemLibre[] = empaquetar([
  { id: "saludo", tam: "M" },
  { id: "proximo-pago", tam: "S" },
  { id: "mis-solicitudes", tam: "S" },
  { id: "base-mundial", tam: "W" },
  { id: "valor-bolsa", tam: "XL" },
  { id: "variacion-industrial", tam: "L" },
  { id: "produccion-agricola", tam: "L" },
  { id: "cadena-produccion", tam: "W" },
]);

const claveV1 = (usuarioId: string) => `azahar-inicio-widgets-v1:${usuarioId}`;
const clave = (usuarioId: string) => `azahar-inicio-widgets-v2:${usuarioId}`;

function limpiarLibre(lista: unknown): ItemLibre[] | null {
  if (!Array.isArray(lista)) return null;
  const vistos = new Set<string>();
  const limpio: ItemLibre[] = [];
  for (const x of lista as Partial<ItemLibre>[]) {
    const def = x?.id ? POR_ID[x.id] : undefined;
    if (!def || vistos.has(def.id)) continue;
    const ok = [x.x, x.y, x.w, x.h].every((n) => typeof n === "number" && Number.isFinite(n));
    if (!ok) continue;
    vistos.add(def.id);
    limpio.push({ id: def.id, x: Math.min(Math.max(x.x!, 0), 0.98), y: Math.max(x.y!, 0), w: Math.min(Math.max(x.w!, 0.1), 1), h: Math.max(x.h!, 6) });
  }
  return limpio;
}

/** Lee la disposición guardada de esta persona; si solo existe la versión anterior (por tamaños), la convierte. */
export function leerLayout(usuarioId: string): ItemLibre[] | null {
  try {
    const crudo = window.localStorage.getItem(clave(usuarioId));
    if (crudo) return limpiarLibre(JSON.parse(crudo));
    const antiguo = window.localStorage.getItem(claveV1(usuarioId));
    if (!antiguo) return null;
    const lista = JSON.parse(antiguo) as { id?: string; tam?: string }[];
    const valida = lista
      .filter((x) => x?.id && POR_ID[x.id])
      .map((x) => ({ id: x.id as WidgetId, tam: (POR_ID[x.id!].tamanos.includes(x.tam as Tam) ? x.tam : POR_ID[x.id!].tamInicial) as Tam }));
    return valida.length ? empaquetar(valida) : null;
  } catch {
    return null;
  }
}

export function guardarLayout(usuarioId: string, items: ItemLibre[]) {
  try {
    window.localStorage.setItem(clave(usuarioId), JSON.stringify(items));
  } catch {
    // sin almacenamiento disponible: el tablero funciona igual, solo no recuerda
  }
}

export function borrarLayout(usuarioId: string) {
  try {
    window.localStorage.removeItem(clave(usuarioId));
    window.localStorage.removeItem(claveV1(usuarioId));
  } catch {
    // nada que borrar
  }
}
