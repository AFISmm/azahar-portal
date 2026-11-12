// ============================================================================
// Datos de Gestión Contable con información personal o bancaria. Viven en la base de datos
// (tabla contable_datos), NO en el repositorio: se cargan con db/cargar-contable.mjs a partir de los
// JSON que genera 04_SCRIPTS_MIGRACION/exportar_datos_portal_contable.py (carpeta fuera de git).
// Cada instancia de la función guarda una copia en memoria unos minutos para no releer la tabla.
// ============================================================================

import { sql } from "./db.js";
import { HttpError } from "./auth.js";

export interface Comprobante {
  id: string | null;
  numero: string | null;
  fecha: string;
  obs: string;
  total: number | null;
  estado: string;
  lineas: number;
  conTercero: number;
  origen: string;
}

export interface MovimientoExtracto {
  clave: string;
  mes: string;
  fecha: string | null;
  descripcion: string;
  debito: number;
  credito: number;
  saldo: number | null;
  concepto: string | null;
  cuenta: string;
  cuentaNombre: string | null;
  nit: string | null;
  tercero: string | null;
}

/** Forma mínima de lo que la API calcula; el resto se entrega tal cual al navegador. */
export interface ConciliacionDatos {
  mensual: Array<{ abonos?: number; cargos?: number; diferencia?: number; movimientos?: number; [k: string]: unknown }>;
  resumenCobros: Array<{ conciliados?: number; pagos?: number; [k: string]: unknown }>;
  [k: string]: unknown;
}
export interface NominaDatos {
  pagos: Array<{ estado: string; valor: number; [k: string]: unknown }>;
  [k: string]: unknown;
}
export interface TercerosDatos {
  balance2025: { faltantesEnAlegra: number; cubiertosPorListadoConsuelo: number; [k: string]: unknown };
  [k: string]: unknown;
}

export type ClaveContable = "conciliacion" | "nomina" | "terceros" | "comprobantes" | "movimientos";
interface Tipos {
  conciliacion: ConciliacionDatos;
  nomina: NominaDatos;
  terceros: TercerosDatos;
  comprobantes: Comprobante[];
  movimientos: MovimientoExtracto[];
}

const TTL_MS = 5 * 60 * 1000;
const cache = new Map<ClaveContable, { t: number; v: unknown }>();

export async function datosContables<K extends ClaveContable>(clave: K): Promise<Tipos[K]> {
  const hit = cache.get(clave);
  if (hit && Date.now() - hit.t < TTL_MS) return hit.v as Tipos[K];
  let rows: Array<{ datos: unknown }>;
  try {
    ({ rows } = await sql<{ datos: unknown }>`select datos from contable_datos where clave = ${clave} limit 1`);
  } catch {
    throw new HttpError(503, "Los datos contables todavía no están cargados en la base de datos.");
  }
  if (!rows[0]) throw new HttpError(503, `Faltan los datos contables «${clave}»: cárgalos con db/cargar-contable.mjs.`);
  cache.set(clave, { t: Date.now(), v: rows[0].datos });
  return rows[0].datos as Tipos[K];
}
