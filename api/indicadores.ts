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
import { timingSafeEqual } from "node:crypto";
import { sql } from "./_lib/db.js";
import { HttpError, manejarError, requireAuth } from "./_lib/auth.js";
import { claveGemini } from "./_lib/gemini.js";
import { evaluar, motivoSeguro, sondearAlegra } from "./_lib/estadoConexiones.js";

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

/**
 * GET /api/indicadores?r=salud — estado de las conexiones de este portal, para la Oficina Virtual del portal del
 * equipo de Metis Nexa. Solo responde con la clave compartida (COTIZA_SHARED_SECRET); no expone ningún dato.
 * Comparte esta función porque el plan Hobby de Vercel limita a 12 funciones serverless.
 */
async function salud(req: VercelRequest, res: VercelResponse) {
  const secreto = process.env.COTIZA_SHARED_SECRET;
  const dado = String(req.headers.authorization ?? "").replace(/^Bearers+/i, "");
  const a = Buffer.from(dado);
  const b = Buffer.from(secreto ?? "");
  if (!secreto || secreto.length < 24 || a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ ok: false, mensaje: "No autorizado." });
  }
  let db = false;
  try {
    await sql`select 1`;
    db = true;
  } catch {
    db = false;
  }
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    ok: true,
    db,
    // «configurado» = existe la clave; no se hace una llamada de pago para comprobarla
    gemini: !!process.env.GEMINI_API_KEY,
    blob: !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_PRIVATE_READ_WRITE_TOKEN),
  });
}

async function leerIndicadores(): Promise<Indicador[]> {
  const [trm, wti, cafe, oro] = await Promise.all([
    obtenerTRM(),
    obtenerYahoo("CL=F", "wti", "Petróleo WTI", "US$/barril", "Mercado NYMEX (vía Yahoo Finance)"),
    obtenerYahoo("KC=F", "cafe", "Café arábica (ICE, contrato KC)", "US¢/libra", "ICE Futures (vía Yahoo Finance)"),
    obtenerYahoo("GC=F", "oro", "Oro", "US$/oz troy", "COMEX (vía Yahoo Finance)"),
  ]);
  return [trm, wti, cafe, oro].filter((i): i is Indicador => i !== null);
}

/**
 * GET /api/indicadores?r=estado (también /api/azahar/estado) — estado en vivo de las conexiones, para el módulo
 * «Oficina Virtual». Requiere sesión. No expone claves: solo si existen y si responden. Comparte función por el límite de 12.
 */
let cacheEstado: { at: number; conexiones: unknown } | null = null;
async function estado(req: VercelRequest, res: VercelResponse) {
  try {
    await requireAuth(req);
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.status).json({ ok: false, mensaje: err.message });
    return manejarError(res, err);
  }
  if (!cacheEstado || Date.now() - cacheEstado.at > 20_000) {
    const [indicadores, dbRes, alegra] = await Promise.all([
      leerIndicadores().then((l) => l.length, () => null),
      sql`select 1`.then(() => ({ ok: true as const }), (e: unknown) => ({ ok: false as const, error: motivoSeguro(e) })),
      sondearAlegra(),
    ]);
    const conexiones = evaluar({
      indicadores,
      db: dbRes.ok,
      dbError: dbRes.ok ? undefined : dbRes.error,
      gemini: { llave: !!process.env.GEMINI_API_KEY, planDePago: claveGemini() !== null },
      blob: { publico: !!process.env.BLOB_READ_WRITE_TOKEN, privado: !!process.env.BLOB_PRIVATE_READ_WRITE_TOKEN },
      alegra: alegra.estado,
      alegraError: alegra.error,
    });
    cacheEstado = { at: Date.now(), conexiones };
  }
  res.setHeader("Cache-Control", "no-store");
  // sinVerificacion: este portal no ofrece confirmar conexiones a mano (la oficina oculta el botón «Verificar»)
  return res.status(200).json({ ok: true, sinVerificacion: true, at: new Date(cacheEstado.at).toISOString(), conexiones: cacheEstado.conexiones });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.r === "salud") return salud(req, res);
  if (req.query.r === "estado") return estado(req, res);
  try {
    const indicadores = await leerIndicadores();

    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ ok: true, actualizado: new Date().toISOString(), indicadores });
  } catch (err) {
    return res.status(500).json({ ok: false, mensaje: err instanceof Error ? err.message : "Error inesperado.", indicadores: [] });
  }
}
