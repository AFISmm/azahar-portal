// Datos de EJEMPLO (inventados) para el modo demo de Gestión Contable. No son cifras reales de Azahar: los
// datos reales los sirve la API con sesión y permiso del módulo (ver api/_lib/contable.ts).

import type { Bitacora, ComprobanteFila, Catalogo, ConciliacionBancolombia, PagosNomina, ResumenContable, Terceros } from "./contableApi";

const MESES = ["Mes 1 (ejemplo)", "Mes 2 (ejemplo)", "Mes 3 (ejemplo)"];

const conciliacion: ConciliacionBancolombia = {
  cuenta: "Cuenta de ahorros (ejemplo)",
  periodo: "Datos de demostración",
  generado: "2026-01-01",
  mensual: MESES.map((mes, i) => ({
    mes,
    saldoAnterior: 10_000_000 + i * 1_000_000,
    abonos: 50_000_000,
    cargos: 49_000_000,
    saldoCalculado: 11_000_000 + i * 1_000_000,
    saldoExtracto: 11_000_000 + i * 1_000_000,
    diferencia: 0,
    movimientos: 120 + i * 10,
  })),
  cuentas: [
    { cuenta: "13050501", nombre: "Clientes nacionales", porMes: Object.fromEntries(MESES.map((m) => [m, { debito: 0, credito: 30_000_000 }])), totalDebito: 0, totalCredito: 90_000_000 },
    { cuenta: "22050501", nombre: "Proveedores nacionales", porMes: Object.fromEntries(MESES.map((m) => [m, { debito: 15_000_000, credito: 0 }])), totalDebito: 45_000_000, totalCredito: 0 },
    { cuenta: "53051501", nombre: "Financieros - Comisiones", porMes: Object.fromEntries(MESES.map((m) => [m, { debito: 200_000, credito: 0 }])), totalDebito: 600_000, totalCredito: 0 },
    { cuenta: "42100501", nombre: "Financieros - Intereses", porMes: Object.fromEntries(MESES.map((m) => [m, { debito: 0, credito: 500 }])), totalDebito: 0, totalCredito: 1_500 },
  ],
  unificado: MESES.map((mes) => ({ mes, comisiones: 200_000, intereses: 500, neto: 199_500 })),
  resumenCobros: MESES.map((mes) => ({ mes, pagos: 40, valor: 3_000_000, conciliados: 30, valorConciliado: 2_200_000, sinFactura: 10, valorSinFactura: 800_000, abonosDatafono: 60, valorDatafono: 9_000_000, ventasTarjeta: 200_000_000 })),
  cobros: [
    { mes: MESES[0], fecha: "2026-01-05", descripcion: "PAGO QR CLIENTE EJEMPLO", concepto: "Venta pago QR", credito: 27_760, estado: "CONCILIADO", factura: "SEDE 2026-01-05", medioPago: "48", totalFactura: 27_760, candidatas: 1 },
    { mes: MESES[0], fecha: "2026-01-09", descripcion: "PAGO INTERBANC EMPRESA EJEMPLO", concepto: "Abono interbancario de cliente", credito: 1_500_000, estado: "SIN FACTURA IGUAL", factura: null, medioPago: null, totalFactura: null, candidatas: 0 },
  ],
  notas: ["Datos de demostración: no son cifras reales."],
};

const nomina: PagosNomina = {
  cuenta: "Banco (ejemplo)",
  generado: "2026-01-01",
  asiento: "Débito Salarios por pagar / Crédito Banco.",
  notas: ["Datos de demostración."],
  pagos: [
    { fecha: "2026-01-15", valor: 12_000_000, gmf: 48_000, ref: 1001, tipo: "nómina", estado: "vista previa", comprobante: null },
    { fecha: "2026-01-20", valor: 2_500_000, gmf: 10_000, ref: 1002, tipo: "liquidación", estado: "publicado", comprobante: "AC-1" },
    { fecha: "2026-01-22", valor: 1_100_000, gmf: 4_400, ref: 1003, tipo: "ya registrado (vacaciones)", estado: "excluido", comprobante: null },
  ],
};

const terceros: Terceros = {
  generado: "2026-01-01",
  balance2025: { lineas: 1000, nitDistintos: 200, faltantesEnAlegra: 50, cubiertosPorListadoConsuelo: 45, sinDato: 5, tercerosListado: 180, fuente: "Archivo de ejemplo", bloqueo: "Sin bloqueo (demostración)." },
  eneroMarzo: {
    comprobantes: 100,
    lineasAnalizadas: 300,
    porClasificacion: [
      { clasificacion: "1 tercero (inequívoco)", lineas: 225 },
      { clasificacion: "Siigo sin NIT en la línea", lineas: 75 },
    ],
    nitInequivocos: 40,
    nitYaEnAlegra: 30,
    nitFaltantes: 10,
    comprobantesAEditar: 80,
    lineasAEditar: 180,
  },
};

const catalogo: Catalogo = {
  generado: "2026-01-01",
  archivo: "catalogo-ejemplo.xlsx",
  productos: [
    { id: 1, nombre: "PRODUCTO DE EJEMPLO 1", sku: "EJ-001", categoria: "Café", situacion: "A la venta", precioBase: 50_000, precioTotal: 52_500 },
    { id: null, nombre: "PRODUCTO DE EJEMPLO 2", sku: null, categoria: "Café", situacion: "Rotativo (fuera de stock)", precioBase: null, precioTotal: null },
  ],
  cambiosAplicados: [{ fecha: "2026-01-10", tipo: "Precio", detalle: "Producto de ejemplo: $45.000 → $50.000" }],
  sincronizacion: { programacion: "Todos los martes a las 5:00 p. m.", sentido: "Archivo → Alegra", reglas: ["Regla de ejemplo."] },
};

const bitacora: Bitacora = {
  actualizado: "2026-01-01",
  hitos: [
    { id: "ej-1", fecha: "2026-01-05", area: "Ejemplo", titulo: "Hito terminado (demostración)", estado: "hecho", detalle: "Descripción de ejemplo." },
    { id: "ej-2", fecha: "2026-02-05", area: "Ejemplo", titulo: "Hito listo sin subir (demostración)", estado: "listo-no-subido", detalle: "Descripción de ejemplo." },
    { id: "ej-3", fecha: "2026-03-05", area: "Ejemplo", titulo: "Hito bloqueado (demostración)", estado: "bloqueado", detalle: "Descripción de ejemplo." },
  ],
  lineaTiempo: [
    { fecha: "2016-12-31", area: "Ejemplo", titulo: "Cierre histórico de ejemplo", estado: "hecho", detalle: "Detalle de ejemplo." },
    { fecha: "2020-12-31", area: "Ejemplo", titulo: "Cierre pendiente de ejemplo", estado: "pendiente", detalle: "Detalle de ejemplo." },
    { fecha: "2026-03-05", area: "Ejemplo", titulo: "Hito bloqueado (demostración)", estado: "bloqueado", detalle: "Detalle de ejemplo." },
  ],
  actividad: [
    { mes: "2016-12", n: 2, total: 2_000_000, lineas: 40, conTercero: 0 },
    { mes: "2026-01", n: 50, total: 80_000_000, lineas: 150, conTercero: 20 },
  ],
  decisiones: ["Decisión de ejemplo."],
  pendientes: [{ responsable: "Responsable", tarea: "Tarea de ejemplo.", bloquea: "—" }],
  scripts: [{ archivo: "script_ejemplo.py", uso: "Uso de ejemplo." }],
  archivos: [{ archivo: "archivo_ejemplo.xlsx", descripcion: "Descripción de ejemplo." }],
  limitaciones: ["Modo demostración: no se muestran datos reales."],
};

const resumen: ResumenContable = {
  actualizado: "2026-01-01",
  conciliacion: { meses: 3, mesesCuadrados: 3, movimientos: 390, abonos: 150_000_000, cargos: 147_000_000, cobrosConciliados: 90, cobrosTotal: 120 },
  nomina: { asientosPendientes: 1, valorPendiente: 12_000_000 },
  terceros: { faltantesEnAlegra: 50, cubiertos: 45 },
  catalogo: { productos: 2, cambios: 1 },
  hitos: bitacora.hitos.map(({ id, fecha, area, titulo, estado }) => ({ id, fecha, area, titulo, estado })),
  pendientes: 1,
};

const comprobantes: ComprobanteFila[] = [
  { id: "1", numero: "EJ-1", fecha: "2016-12-31", obs: "Cierre contable de ejemplo", total: 1_000_000, estado: "open", lineas: 20, conTercero: 0, origen: "alegra" },
  { id: "2", numero: "EJ-2", fecha: "2026-01-05", obs: "Ventas diarias de ejemplo", total: 4_000_000, estado: "open", lineas: 3, conTercero: 0, origen: "alegra" },
  { id: null, numero: "EJ-3", fecha: "2025-12-31", obs: "Ajuste de ejemplo (vista previa)", total: 9_000_000, estado: "vista previa", lineas: 100, conTercero: 90, origen: "vista previa" },
];

export const CONTABLE_DEMO = { resumen, conciliacion, nomina, terceros, catalogo, bitacora, comprobantes };
