// ============================================================================
// Gestión Contable: conciliaciones, cargue de facturas, terceros, nómina y catálogo, más la
// documentación del trabajo hecho. Se enruta desde api/trazabilidad.ts (límite de 12 funciones
// de Vercel Hobby):
//
//   GET ?r=contable-resumen | contable-conciliacion | contable-nomina | contable-terceros |
//       contable-catalogo | contable-bitacora
//   GET ?r=contable-comprobantes&desde=&hasta=&q=&estado=&pagina=   -> comprobantes contables (filtro en el servidor)
//
// PERMISOS: módulo 'contable' (ver api/_lib/acceso.ts), nivel 'ver'. Los datos son instantáneas
// generadas por 04_SCRIPTS_MIGRACION/exportar_datos_portal_contable.py y viven SOLO aquí, en el
// servidor: no se incluyen en el código que descarga el navegador.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireModulo } from "./auth.js";
import { CATALOGO } from "./contableData/catalogo.js";
import { BITACORA } from "./contableData/bitacora.js";
import { datosContables, type Comprobante } from "./contableStore.js";

type Ruta = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

/** Envuelve una consulta: exige sesión y permiso 'ver' en el módulo y responde JSON. */
function consulta(datos: () => unknown | Promise<unknown>): Ruta {
  return async (req, res) => {
    await requireModulo(req, "contable", "ver");
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({ ok: true, ...((await datos()) as object) });
  };
}

function param(req: VercelRequest, nombre: string): string {
  const v = req.query[nombre];
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const TAMANO_PAGINA = 100;

/** Comprobantes contables de Alegra (y los que están en vista previa), con filtro por fechas, texto y estado. */
const comprobantes: Ruta = async (req, res) => {
  await requireModulo(req, "contable", "ver");
  const desde = FECHA.test(param(req, "desde")) ? param(req, "desde") : "";
  const hasta = FECHA.test(param(req, "hasta")) ? param(req, "hasta") : "";
  const q = param(req, "q").trim().toLowerCase().slice(0, 80);
  const estado = param(req, "estado");
  const pagina = Math.max(1, Number.parseInt(param(req, "pagina"), 10) || 1);

  const COMPROBANTES = await datosContables("comprobantes");
  const filtrados: Comprobante[] = COMPROBANTES.filter(
    (c) =>
      (!desde || c.fecha >= desde) &&
      (!hasta || c.fecha <= hasta) &&
      (!estado || c.estado === estado) &&
      (!q || `${c.numero ?? ""} ${c.obs}`.toLowerCase().includes(q)),
  );
  const porMes = new Map<string, { n: number; total: number; lineas: number; conTercero: number }>();
  let total = 0;
  let lineas = 0;
  let conTercero = 0;
  for (const c of filtrados) {
    const mes = c.fecha.slice(0, 7);
    const m = porMes.get(mes) ?? { n: 0, total: 0, lineas: 0, conTercero: 0 };
    m.n++;
    m.total += c.total ?? 0;
    m.lineas += c.lineas;
    m.conTercero += c.conTercero;
    porMes.set(mes, m);
    total += c.total ?? 0;
    lineas += c.lineas;
    conTercero += c.conTercero;
  }
  const paginas = Math.max(1, Math.ceil(filtrados.length / TAMANO_PAGINA));
  const actual = Math.min(pagina, paginas);
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({
    ok: true,
    totalGeneral: COMPROBANTES.length,
    filtrados: filtrados.length,
    pagina: actual,
    paginas,
    filas: filtrados.slice((actual - 1) * TAMANO_PAGINA, actual * TAMANO_PAGINA),
    resumen: { n: filtrados.length, total, lineas, conTercero },
    porMes: [...porMes.entries()].sort(([a], [b]) => (a < b ? 1 : -1)).map(([mes, v]) => ({ mes, ...v })),
  });
};

/** Comprobantes de Alegra por mes (desde diciembre de 2016): demuestra qué hay contabilizado en cada período. */
function actividadMensual(COMPROBANTES: Comprobante[]) {
  const meses = new Map<string, { n: number; total: number; lineas: number; conTercero: number }>();
  for (const c of COMPROBANTES) {
    if (c.origen !== "alegra") continue;
    const mes = c.fecha.slice(0, 7);
    const m = meses.get(mes) ?? { n: 0, total: 0, lineas: 0, conTercero: 0 };
    m.n++;
    m.total += c.total ?? 0;
    m.lineas += c.lineas;
    m.conTercero += c.conTercero;
    meses.set(mes, m);
  }
  return [...meses.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([mes, v]) => ({ mes, ...v }));
}

async function resumen() {
  const [c, PAGOS_NOMINA, TERCEROS] = await Promise.all([datosContables("conciliacion"), datosContables("nomina"), datosContables("terceros")]);
  const abonos = c.mensual.reduce((s, m) => s + (m.abonos ?? 0), 0);
  const cargos = c.mensual.reduce((s, m) => s + (m.cargos ?? 0), 0);
  const cobrosConciliados = c.resumenCobros.reduce((s, m) => s + (m.conciliados ?? 0), 0);
  const cobrosTotal = c.resumenCobros.reduce((s, m) => s + (m.pagos ?? 0), 0);
  const nominaPendiente = PAGOS_NOMINA.pagos.filter((p) => p.estado === "vista previa");
  return {
    resumen: {
      actualizado: BITACORA.actualizado,
      conciliacion: {
        meses: c.mensual.length,
        mesesCuadrados: c.mensual.filter((m) => Math.abs(m.diferencia ?? 0) < 1).length,
        movimientos: c.mensual.reduce((s, m) => s + (m.movimientos ?? 0), 0),
        abonos,
        cargos,
        cobrosConciliados,
        cobrosTotal,
      },
      nomina: { asientosPendientes: nominaPendiente.length, valorPendiente: nominaPendiente.reduce((s, p) => s + p.valor, 0) },
      terceros: { faltantesEnAlegra: TERCEROS.balance2025.faltantesEnAlegra, cubiertos: TERCEROS.balance2025.cubiertosPorListadoConsuelo },
      catalogo: { productos: CATALOGO.productos.length, cambios: CATALOGO.cambiosAplicados.length },
      hitos: BITACORA.hitos.map((h) => ({ id: h.id, fecha: h.fecha, area: h.area, titulo: h.titulo, estado: h.estado })),
      pendientes: BITACORA.pendientes.length,
    },
  };
}

export const CONTABLE_GET: Record<string, Ruta> = {
  "contable-resumen": consulta(resumen),
  "contable-conciliacion": consulta(async () => ({ conciliacion: await datosContables("conciliacion") })),
  "contable-nomina": consulta(async () => ({ nomina: await datosContables("nomina") })),
  "contable-terceros": consulta(async () => ({ terceros: await datosContables("terceros") })),
  "contable-catalogo": consulta(() => ({ catalogo: CATALOGO })),
  "contable-bitacora": consulta(async () => ({ bitacora: { ...BITACORA, actividad: actividadMensual(await datosContables("comprobantes")) } })),
  "contable-comprobantes": comprobantes,
};
