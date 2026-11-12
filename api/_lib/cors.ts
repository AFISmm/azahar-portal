// ============================================================================
// CORS acotado para /api/auth/*: solo la landing de Metis Intel (los dos
// dominios de Vercel, personal y corporativo) puede llamar estos endpoints con
// credenciales, para el acceso único desde esa landing.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";

const ORIGENES_PERMITIDOS = ["https://mercury-methods.vercel.app", "https://mi-landingpage-six.vercel.app"];

/** Aplica las cabeceras CORS si el origen de la petición está en la lista blanca. Devuelve true si se manejó un preflight OPTIONS (ya respondido). */
export function aplicarCors(req: VercelRequest, res: VercelResponse): boolean {
  const origen = req.headers.origin;
  if (typeof origen === "string" && ORIGENES_PERMITIDOS.includes(origen)) {
    res.setHeader("Access-Control-Allow-Origin", origen);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return true;
  }
  return false;
}
