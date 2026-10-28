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
  { id: "tiendas", titulo: "Tiendas", descripcion: "Ventas del mes y estado de cada tienda.", icono: ic(Store), tamanos: ["M", "L", "XL"], tamInicial: "L", modulo: "negocio", render: (t) => <WidgetTiendas tam={t} /> },
  { id: "certificados-fincas", titulo: "Certificados de fincas", descripcion: "Vigentes, por vencer y vencidos.", icono: ic(Award), tamanos: ["M", "L"], tamInicial: "L", modulo: "negocio", render: (t) => <WidgetCertificadosFincas tam={t} /> },
  { id: "producto-top", titulo: "Productos más vendidos", descripcion: "Ranking de productos (datos de ejemplo).", icono: ic(Trophy), tamanos: ["M", "L"], tamInicial: "M", modulo: "negocio", render: (t) => <WidgetProductoTop tam={t} /> },
  { id: "trazabilidad", titulo: "Trazabilidad del café", descripcion: "Fincas, lotes y últimos empaques con su ficha pública.", icono: ic(Coffee), tamanos: ["S", "M", "L"], tamInicial: "M", modulo: "trazabilidad", render: (t) => <WidgetTrazabilidad tam={t} /> },
];

export const POR_ID: Record<string, WidgetDef> = Object.fromEntries(CATALOGO.map((w) => [w.id, w]));

export interface ItemLayout {
  id: WidgetId;
  tam: Tam;
}

/** Disposición inicial: saludo + pago + solicitudes arriba y, debajo, los cinco widgets de mercado originales. */
export const LAYOUT_POR_DEFECTO: ItemLayout[] = [
  { id: "saludo", tam: "M" },
  { id: "proximo-pago", tam: "S" },
  { id: "mis-solicitudes", tam: "S" },
  { id: "base-mundial", tam: "W" },
  { id: "valor-bolsa", tam: "XL" },
  { id: "variacion-industrial", tam: "L" },
  { id: "produccion-agricola", tam: "L" },
  { id: "cadena-produccion", tam: "W" },
];

const clave = (usuarioId: string) => `azahar-inicio-widgets-v1:${usuarioId}`;

/** Lee la disposición guardada de esta persona (descarta widgets o tamaños que ya no existen). */
export function leerLayout(usuarioId: string): ItemLayout[] | null {
  try {
    const crudo = window.localStorage.getItem(clave(usuarioId));
    if (!crudo) return null;
    const lista = JSON.parse(crudo) as unknown;
    if (!Array.isArray(lista)) return null;
    const vistos = new Set<string>();
    const limpio: ItemLayout[] = [];
    for (const x of lista as { id?: string; tam?: string }[]) {
      const def = x?.id ? POR_ID[x.id] : undefined;
      if (!def || vistos.has(def.id)) continue;
      vistos.add(def.id);
      limpio.push({ id: def.id, tam: def.tamanos.includes(x.tam as Tam) ? (x.tam as Tam) : def.tamInicial });
    }
    return limpio;
  } catch {
    return null;
  }
}

export function guardarLayout(usuarioId: string, items: ItemLayout[]) {
  try {
    window.localStorage.setItem(clave(usuarioId), JSON.stringify(items));
  } catch {
    // sin almacenamiento disponible: el tablero funciona igual, solo no recuerda
  }
}

export function borrarLayout(usuarioId: string) {
  try {
    window.localStorage.removeItem(clave(usuarioId));
  } catch {
    // nada que borrar
  }
}
