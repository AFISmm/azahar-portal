// ============================================================================
// Gestión Contable: conciliaciones, cargue de facturas, terceros, nómina y catálogo, más la
// documentación del trabajo hecho. Se enruta desde api/trazabilidad.ts (límite de 12 funciones
// de Vercel Hobby):
//
//   GET ?r=contable-resumen | contable-conciliacion | contable-nomina | contable-terceros |
//       contable-catalogo | contable-bitacora
//
// PERMISOS: módulo 'contable' (ver api/_lib/acceso.ts), nivel 'ver'. Los datos son instantáneas
// generadas por 04_SCRIPTS_MIGRACION/exportar_datos_portal_contable.py y viven SOLO aquí, en el
// servidor: no se incluyen en el código que descarga el navegador.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireModulo } from "./auth.js";
import { CONCILIACION_BANCOLOMBIA } from "./contableData/conciliacionBancolombia.js";
import { PAGOS_NOMINA } from "./contableData/pagosNomina.js";
import { TERCEROS } from "./contableData/terceros.js";
import { CATALOGO } from "./contableData/catalogo.js";
import { BITACORA } from "./contableData/bitacora.js";

type Ruta = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

/** Envuelve una consulta: exige sesión y permiso 'ver' en el módulo y responde JSON. */
function consulta(datos: () => unknown): Ruta {
  return async (req, res) => {
    await requireModulo(req, "contable", "ver");
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({ ok: true, ...(datos() as object) });
  };
}

function resumen() {
  const c = CONCILIACION_BANCOLOMBIA;
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
      hitos: BITACORA.hitos.map((h) => ({ id: h.id, area: h.area, titulo: h.titulo, estado: h.estado })),
      pendientes: BITACORA.pendientes.length,
    },
  };
}

export const CONTABLE_GET: Record<string, Ruta> = {
  "contable-resumen": consulta(resumen),
  "contable-conciliacion": consulta(() => ({ conciliacion: CONCILIACION_BANCOLOMBIA })),
  "contable-nomina": consulta(() => ({ nomina: PAGOS_NOMINA })),
  "contable-terceros": consulta(() => ({ terceros: TERCEROS })),
  "contable-catalogo": consulta(() => ({ catalogo: CATALOGO })),
  "contable-bitacora": consulta(() => ({ bitacora: BITACORA })),
};
