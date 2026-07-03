// ============================================================================
// POST /api/auth/logout
// ----------------------------------------------------------------------------
// Limpia la cookie de sesión. No requiere que la sesión sea válida: si ya
// expiró o no existe, simplemente no hay nada que limpiar.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { limpiarCookieSesion, manejarError } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa POST." });
  }

  try {
    limpiarCookieSesion(res);
    return res.status(200).json({ ok: true });
  } catch (err) {
    return manejarError(res, err);
  }
}
