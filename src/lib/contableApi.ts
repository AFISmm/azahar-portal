// Cliente del módulo Gestión Contable (ver api/_lib/contable.ts). En modo demo (sin backend) usa datos de
// EJEMPLO inventados (contableDemo.ts): los datos reales viven solo en el servidor y se piden con sesión
// y permiso del módulo 'contable'.

import { IS_DEMO_MODE } from "./backendMode";
import { CONTABLE_DEMO } from "./contableDemo";

export interface MesConciliacion {
  mes: string;
  saldoAnterior: number;
  abonos: number;
  cargos: number;
  saldoCalculado: number;
  saldoExtracto: number;
  diferencia: number;
  movimientos: number;
}
export interface CuentaPuc {
  cuenta: string;
  nombre: string;
  porMes: Record<string, { debito: number; credito: number }>;
  totalDebito: number;
  totalCredito: number;
}
export interface UnificadoMes {
  mes: string;
  comisiones: number;
  intereses: number;
  neto: number;
}
export interface ResumenCobrosMes {
  mes: string;
  pagos: number;
  valor: number;
  conciliados: number;
  valorConciliado: number;
  sinFactura: number;
  valorSinFactura: number;
  abonosDatafono: number;
  valorDatafono: number;
  ventasTarjeta: number;
}
export interface Cobro {
  mes: string;
  fecha: string | null;
  descripcion: string;
  concepto: string;
  credito: number;
  estado: "CONCILIADO" | "SIN FACTURA IGUAL";
  factura: string | null;
  medioPago: string | null;
  totalFactura: number | null;
  candidatas: number;
}
export interface ConciliacionBancolombia {
  cuenta: string;
  periodo: string;
  generado: string;
  mensual: MesConciliacion[];
  cuentas: CuentaPuc[];
  unificado: UnificadoMes[];
  resumenCobros: ResumenCobrosMes[];
  cobros: Cobro[];
  notas: string[];
}

export interface PagoNomina {
  fecha: string;
  valor: number;
  gmf: number;
  ref: number | string;
  tipo: string;
  estado: "vista previa" | "publicado" | "excluido";
  comprobante: string | null;
}
export interface PagosNomina {
  cuenta: string;
  generado: string;
  asiento: string;
  notas: string[];
  pagos: PagoNomina[];
}

export interface Terceros {
  generado: string;
  balance2025: {
    lineas: number;
    nitDistintos: number;
    faltantesEnAlegra: number;
    cubiertosPorListadoConsuelo: number;
    sinDato: number;
    tercerosListado: number;
    fuente: string;
    bloqueo: string;
  };
  eneroMarzo: {
    comprobantes: number;
    lineasAnalizadas: number;
    porClasificacion: { clasificacion: string; lineas: number }[];
    nitInequivocos: number;
    nitYaEnAlegra: number;
    nitFaltantes: number;
    comprobantesAEditar: number;
    lineasAEditar: number;
  };
}

export interface ProductoCatalogo {
  id: number | null;
  nombre: string;
  sku: string | null;
  categoria: string;
  situacion: string;
  precioBase: number | null;
  precioTotal: number | null;
}
export interface Catalogo {
  generado: string;
  archivo: string;
  productos: ProductoCatalogo[];
  cambiosAplicados: { tipo: string; detalle: string }[];
  sincronizacion: { programacion: string; sentido: string; reglas: string[] };
}

export type EstadoHito = "hecho" | "listo-no-subido" | "bloqueado";
export interface Bitacora {
  actualizado: string;
  hitos: { id: string; area: string; titulo: string; estado: EstadoHito; detalle: string }[];
  decisiones: string[];
  pendientes: { responsable: string; tarea: string; bloquea: string }[];
  scripts: { archivo: string; uso: string }[];
  archivos: { archivo: string; descripcion: string }[];
  limitaciones: string[];
}

export interface ResumenContable {
  actualizado: string;
  conciliacion: { meses: number; mesesCuadrados: number; movimientos: number; abonos: number; cargos: number; cobrosConciliados: number; cobrosTotal: number };
  nomina: { asientosPendientes: number; valorPendiente: number };
  terceros: { faltantesEnAlegra: number; cubiertos: number };
  catalogo: { productos: number; cambios: number };
  hitos: { id: string; area: string; titulo: string; estado: EstadoHito }[];
  pendientes: number;
}

export class ContableError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function llamar<T>(r: string): Promise<T> {
  const respuesta = await fetch(`/api/trazabilidad?r=${r}`, { credentials: "include" });
  const payload = (await respuesta.json().catch(() => null)) as ({ ok: boolean; mensaje?: string } & T) | null;
  if (!respuesta.ok || !payload?.ok) {
    throw new ContableError(respuesta.status, payload?.mensaje ?? `Error ${respuesta.status} consultando Gestión Contable.`);
  }
  return payload;
}

export const contableApi = {
  resumen: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.resumen) : llamar<{ resumen: ResumenContable }>("contable-resumen").then((d) => d.resumen)),
  conciliacion: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.conciliacion) : llamar<{ conciliacion: ConciliacionBancolombia }>("contable-conciliacion").then((d) => d.conciliacion)),
  nomina: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.nomina) : llamar<{ nomina: PagosNomina }>("contable-nomina").then((d) => d.nomina)),
  terceros: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.terceros) : llamar<{ terceros: Terceros }>("contable-terceros").then((d) => d.terceros)),
  catalogo: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.catalogo) : llamar<{ catalogo: Catalogo }>("contable-catalogo").then((d) => d.catalogo)),
  bitacora: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.bitacora) : llamar<{ bitacora: Bitacora }>("contable-bitacora").then((d) => d.bitacora)),
};
