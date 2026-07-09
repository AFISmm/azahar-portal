// ============================================================================
// GET /api/indicadores
// ----------------------------------------------------------------------------
// Ticker de indicadores económicos con datos REALES (no de demostración):
//   - TRM (USD/COP): Banco de la República, vía la API pública de datos.gov.co
//     (sin llave, dataset oficial "TRM").
//   - Petróleo WTI, Café (arábica, contrato KC de ICE) y Oro: precios de
//     mercado vía el endpoint de gráficas de Yahoo Finance. Es un endpoint
//     NO documentado/no oficial (no requiere llave, pero puede cambiar o
//     limitar sin previo aviso) — por eso cada indicador se pide por
//     separado y si uno falla simplemente se omite del ticker en vez de
//     tumbar toda la respuesta.
//
// No requiere autenticación (se muestra en todo el portal, incluso antes de
// iniciar sesión no sería necesario, aunque hoy solo se usa ya autenticado).
// Se cachea 60s en el borde de Vercel para no golpear las fuentes en cada
// carga de página.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Indicador {
  id: string;
  nombre: string;
  valor: number;
  unidad: string;
  variacion: number;
  variacionPct: number;
  fuente: string;
}

async function obtenerTRM(): Promise<Indicador | null> {
  try {
    const resp = await fetch("https://www.datos.gov.co/resource/32sa-8pi3.json?$order=vigenciadesde%20DESC&$limit=2", {
      headers: { Accept: "application/json" },
    });
    if (!resp.ok) return null;
    const filas = (await resp.json()) as { valor: string; vigenciadesde: string }[];
    const actual = filas[0];
    const anterior = filas[1];
    if (!actual) return null;
    const valor = Number(actual.valor);
    const valorAnterior = anterior ? Number(anterior.valor) : valor;
    const variacion = valor - valorAnterior;
    return {
      id: "trm",
      nombre: "TRM (USD/COP)",
      valor,
      unidad: "COP",
      variacion,
      variacionPct: valorAnterior ? (variacion / valorAnterior) * 100 : 0,
      fuente: "Banco de la República — datos.gov.co",
    };
  } catch {
    return null;
  }
}

async function obtenerYahoo(simbolo: string, id: string, nombre: string, unidad: string, fuente: string): Promise<Indicador | null> {
  try {
    const resp = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?interval=1d&range=2d`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AzaharPortalBot/1.0)", Accept: "application/json" },
    });
    if (!resp.ok) return null;
    const datos = (await resp.json()) as {
      chart?: { result?: [{ meta?: { regularMarketPrice?: number; chartPreviousClose?: number } }] };
    };
    const meta = datos.chart?.result?.[0]?.meta;
    const valor = meta?.regularMarketPrice;
    if (valor === undefined) return null;
    const previo = meta?.chartPreviousClose ?? valor;
    const variacion = valor - previo;
    return {
      id,
      nombre,
      valor,
      unidad,
      variacion,
      variacionPct: previo ? (variacion / previo) * 100 : 0,
      fuente,
    };
  } catch {
    return null;
  }
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const [trm, wti, cafe, oro] = await Promise.all([
      obtenerTRM(),
      obtenerYahoo("CL=F", "wti", "Petróleo WTI", "US$/barril", "Mercado NYMEX (vía Yahoo Finance)"),
      obtenerYahoo("KC=F", "cafe", "Café arábica (ICE, contrato KC)", "US¢/libra", "ICE Futures (vía Yahoo Finance)"),
      obtenerYahoo("GC=F", "oro", "Oro", "US$/oz troy", "COMEX (vía Yahoo Finance)"),
    ]);

    const indicadores = [trm, wti, cafe, oro].filter((i): i is Indicador => i !== null);

    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ ok: true, actualizado: new Date().toISOString(), indicadores });
  } catch (err) {
    return res.status(500).json({ ok: false, mensaje: err instanceof Error ? err.message : "Error inesperado.", indicadores: [] });
  }
}
