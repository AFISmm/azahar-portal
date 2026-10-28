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
  cambiosAplicados: { fecha: string; tipo: string; detalle: string }[];
  sincronizacion: { programacion: string; sentido: string; reglas: string[] };
}

export type EstadoHito = "hecho" | "listo-no-subido" | "bloqueado" | "pendiente";
export interface Bitacora {
  actualizado: string;
  hitos: { id: string; fecha: string; area: string; titulo: string; estado: EstadoHito; detalle: string }[];
  lineaTiempo: { fecha: string; area: string; titulo: string; estado: EstadoHito; detalle: string }[];
  actividad: { mes: string; n: number; total: number; lineas: number; conTercero: number }[];
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
  hitos: { id: string; fecha: string; area: string; titulo: string; estado: EstadoHito }[];
  pendientes: number;
}

export interface ComprobanteFila {
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
export interface ParamsComprobantes {
  desde: string;
  hasta: string;
  q: string;
  estado: string;
  pagina: number;
}
export interface RespuestaComprobantes {
  totalGeneral: number;
  filtrados: number;
  pagina: number;
  paginas: number;
  filas: ComprobanteFila[];
  resumen: { n: number; total: number; lineas: number; conTercero: number };
  porMes: { mes: string; n: number; total: number; lineas: number; conTercero: number }[];
}

import type { Destino } from "./contableDestinos";

export class ContableError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function llamar<T>(r: string, params: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams({ r, ...params }).toString();
  const respuesta = await fetch(`/api/trazabilidad?${query}`, { credentials: "include" });
  const payload = (await respuesta.json().catch(() => null)) as ({ ok: boolean; mensaje?: string } & T) | null;
  if (!respuesta.ok || !payload?.ok) {
    throw new ContableError(respuesta.status, payload?.mensaje ?? `Error ${respuesta.status} consultando Gestión Contable.`);
  }
  return payload;
}

function comprobantesDemo(p: ParamsComprobantes): RespuestaComprobantes {
  const todos = CONTABLE_DEMO.comprobantes;
  const filas = todos.filter((c) => (!p.desde || c.fecha >= p.desde) && (!p.hasta || c.fecha <= p.hasta) && (!p.estado || c.estado === p.estado) && (!p.q || `${c.numero ?? ""} ${c.obs}`.toLowerCase().includes(p.q.toLowerCase())));
  const porMes = new Map<string, { n: number; total: number; lineas: number; conTercero: number }>();
  for (const c of filas) {
    const m = porMes.get(c.fecha.slice(0, 7)) ?? { n: 0, total: 0, lineas: 0, conTercero: 0 };
    m.n++;
    m.total += c.total ?? 0;
    m.lineas += c.lineas;
    m.conTercero += c.conTercero;
    porMes.set(c.fecha.slice(0, 7), m);
  }
  return {
    totalGeneral: todos.length,
    filtrados: filas.length,
    pagina: 1,
    paginas: 1,
    filas,
    resumen: { n: filas.length, total: filas.reduce((s, c) => s + (c.total ?? 0), 0), lineas: filas.reduce((s, c) => s + c.lineas, 0), conTercero: filas.reduce((s, c) => s + c.conTercero, 0) },
    porMes: [...porMes.entries()].sort(([a], [b]) => (a < b ? 1 : -1)).map(([mes, v]) => ({ mes, ...v })),
  };
}

const contableApiBase = {
  comprobantes: (p: ParamsComprobantes) =>
    IS_DEMO_MODE
      ? Promise.resolve(comprobantesDemo(p))
      : llamar<RespuestaComprobantes>("contable-comprobantes", { desde: p.desde, hasta: p.hasta, q: p.q, estado: p.estado, pagina: String(p.pagina) }),
  resumen: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.resumen) : llamar<{ resumen: ResumenContable }>("contable-resumen").then((d) => d.resumen)),
  conciliacion: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.conciliacion) : llamar<{ conciliacion: ConciliacionBancolombia }>("contable-conciliacion").then((d) => d.conciliacion)),
  nomina: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.nomina) : llamar<{ nomina: PagosNomina }>("contable-nomina").then((d) => d.nomina)),
  terceros: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.terceros) : llamar<{ terceros: Terceros }>("contable-terceros").then((d) => d.terceros)),
  catalogo: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.catalogo) : llamar<{ catalogo: Catalogo }>("contable-catalogo").then((d) => d.catalogo)),
  bitacora: () => (IS_DEMO_MODE ? Promise.resolve(CONTABLE_DEMO.bitacora) : llamar<{ bitacora: Bitacora }>("contable-bitacora").then((d) => d.bitacora)),
};

// ============================================================================
// Importación de archivos, búsquedas y conciliación estilo Alegra (ver api/_lib/contableImportar.ts).
// En modo demo no hay base de datos: la importación avisa que requiere el backend.
// ============================================================================

export interface LoteImportado {
  id: string;
  nombreArchivo: string;
  formato: string | null;
  destino: Destino;
  sugeridoIa: Destino | null;
  confianza: number | null;
  filas: number;
  cuentaBanco: string | null;
  encabezados: string[];
  mapeo: Record<string, string>;
  creadoPor: string | null;
  creadoEn: string;
}

export interface FilasLote {
  importacion: { id: string; nombreArchivo: string; destino: Destino; encabezados: string[]; mapeo: Record<string, string>; filas: number };
  total: number;
  pagina: number;
  paginas: number;
  filas: (Record<string, string> & { n: number })[];
}

export interface SugerenciaImportacion {
  destino: Destino;
  confianza: number;
  motivo: string;
  modo: "ia" | "reglas";
  extraido?: { encabezados: string[]; filas: Record<string, string>[] };
}

export interface TerceroBusqueda {
  nit: string;
  nombre: string;
}
export interface CuentaBusqueda {
  codigo: string;
  nombre: string;
  tipo: string;
}

export interface MovimientoConciliable {
  clave: string;
  mes: string;
  fecha: string | null;
  descripcion: string;
  debito: number;
  credito: number;
  saldo: number | null;
  cuentaSugerida: string;
  cuentaSugeridaNombre: string | null;
  nitSugerido: string | null;
  terceroSugerido: string | null;
  cuenta: string | null;
  cuentaNombre: string | null;
  terceroNit: string | null;
  terceroNombre: string | null;
  conciliado: boolean;
}

export interface CambioConciliacion {
  clave: string;
  cuenta: string | null;
  cuentaNombre: string | null;
  terceroNit: string | null;
  terceroNombre: string | null;
  conciliado: boolean;
}

export const FUENTE_BANCOLOMBIA = "bancolombia-0590";

async function enviar<T>(r: string, cuerpo: unknown): Promise<T> {
  const respuesta = await fetch(`/api/trazabilidad?r=${r}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
  });
  const payload = (await respuesta.json().catch(() => null)) as ({ ok: boolean; mensaje?: string } & T) | null;
  if (!respuesta.ok || !payload?.ok) {
    throw new ContableError(respuesta.status, payload?.mensaje ?? `Error ${respuesta.status} en Gestión Contable.`);
  }
  return payload;
}

const requiereBackend = () => Promise.reject(new ContableError(0, "Esta función necesita el backend activo (no está disponible en modo demo)."));

/** Movimientos de ejemplo para probar la pantalla de conciliación en modo demo. */
function movimientosDemo(): MovimientoConciliable[] {
  const base = (i: number, desc: string, debito: number, credito: number, cuenta: string, nombre: string): MovimientoConciliable => ({
    clave: `demo-${i}`, mes: "Mes 1 (ejemplo)", fecha: `2026-01-0${i}`, descripcion: desc, debito, credito, saldo: null,
    cuentaSugerida: cuenta, cuentaSugeridaNombre: nombre, nitSugerido: null, terceroSugerido: null, cuenta: null, cuentaNombre: null, terceroNit: null, terceroNombre: null, conciliado: false,
  });
  return [
    base(1, "PAGO QR CLIENTE EJEMPLO", 0, 27_760, "13050501", "Clientes nacionales"),
    base(2, "COMISION BANCARIA", 1_500, 0, "53051501", "Financieros - Comisiones"),
    base(3, "PAGO A PROVEEDOR EJEMPLO", 450_000, 0, "22050501", "Proveedores nacionales"),
  ];
}

const CUENTAS_DEMO: CuentaBusqueda[] = [
  { codigo: "13050501", nombre: "Clientes nacionales", tipo: "asset" },
  { codigo: "22050501", nombre: "Proveedores nacionales", tipo: "liability" },
  { codigo: "53051501", nombre: "Financieros - Comisiones", tipo: "expense" },
];

export const contableApi = {
  ...contableApiBase,
  importaciones: (destino?: Destino) =>
    IS_DEMO_MODE ? Promise.resolve([] as LoteImportado[]) : llamar<{ importaciones: LoteImportado[] }>("contable-importaciones", destino ? { destino } : {}).then((d) => d.importaciones),
  importacion: (id: string, pagina: number, q: string, desde = "", hasta = "") =>
    IS_DEMO_MODE ? requiereBackend() : llamar<FilasLote>("contable-importacion", { id, pagina: String(pagina), q, desde, hasta }),
  buscarTerceros: (q: string) =>
    IS_DEMO_MODE ? Promise.resolve([{ nit: "900000001", nombre: "TERCERO DE EJEMPLO" }] as TerceroBusqueda[]) : llamar<{ terceros: TerceroBusqueda[] }>("contable-buscar-terceros", { q }).then((d) => d.terceros),
  buscarCuentas: (q: string) =>
    IS_DEMO_MODE
      ? Promise.resolve(CUENTAS_DEMO.filter((c) => !q || c.codigo.startsWith(q) || c.nombre.toLowerCase().includes(q.toLowerCase())))
      : llamar<{ cuentas: CuentaBusqueda[] }>("contable-buscar-cuentas", { q }).then((d) => d.cuentas),
  movimientos: (fuente: string, mes: string) =>
    IS_DEMO_MODE ? Promise.resolve(movimientosDemo()) : llamar<{ movimientos: MovimientoConciliable[] }>("contable-movimientos", { fuente, mes }).then((d) => d.movimientos),
  sugerir: (entrada: { nombre: string; formato: string; encabezados: string[]; muestra: Record<string, string>[]; archivoBase64?: string; mime?: string }) =>
    IS_DEMO_MODE
      ? Promise.resolve({ destino: "comprobante", confianza: 0.1, motivo: "En modo demo no hay sugerencia de la IA: elige el destino manualmente.", modo: "reglas" } as SugerenciaImportacion)
      : enviar<{ sugerencia: SugerenciaImportacion }>("contable-sugerir", entrada).then((d) => d.sugerencia),
  importarCrear: (c: { nombre: string; formato: string; destino: Destino; sugerido: Destino | null; confianza: number | null; encabezados: string[]; mapeo: Record<string, string>; cuentaBanco: string }) =>
    IS_DEMO_MODE ? requiereBackend() : enviar<{ id: string }>("contable-importar-crear", c).then((d) => d.id),
  importarFilas: (id: string, filas: Record<string, string>[]) => (IS_DEMO_MODE ? requiereBackend() : enviar<{ agregadas: number }>("contable-importar-filas", { id, filas })),
  importarBorrar: (id: string) => (IS_DEMO_MODE ? requiereBackend() : enviar<object>("contable-importar-borrar", { id })),
  conciliar: (fuente: string, items: CambioConciliacion[]) => (IS_DEMO_MODE ? Promise.resolve({ guardados: items.length }) : enviar<{ guardados: number }>("contable-conciliar", { fuente, items })),
};
