// ============================================================================
// «Cotiza tu plan»: reenvía la cotización del cliente al portal del equipo de Metis Nexa, donde
// queda como ticket de compra para que un administrador la apruebe. Llamada de SERVIDOR a servidor,
// con una clave compartida (COTIZA_SHARED_SECRET). El navegador nunca ve ni la clave ni esa URL.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { HttpError, requireModulo } from "./auth.js";

const URL_POR_DEFECTO = "https://mn-portalclientes.vercel.app/portal/metisintel/api/cotizaciones";

interface CuerpoCotizacion {
  ids?: unknown;
  nota?: unknown;
  consentimiento?: unknown;
}

export async function cotizar(req: VercelRequest, res: VercelResponse) {
  // Cotizar un plan compromete a la empresa: solo quien gestiona usuarios (administración) puede enviarla.
  const { empleado } = await requireModulo(req, "usuarios", "editar");

  const secreto = process.env.COTIZA_SHARED_SECRET;
  if (!secreto) throw new HttpError(503, "El envío de cotizaciones aún no está configurado.");

  const body = (req.body ?? {}) as CuerpoCotizacion;
  const ids = Array.isArray(body.ids) ? body.ids.filter((x): x is string => typeof x === "string").slice(0, 30) : [];
  if (!ids.length) throw new HttpError(400, "Elige al menos una aplicación o servicio.");
  if (body.consentimiento !== true) throw new HttpError(400, "Debes autorizar el tratamiento de tus datos para enviar la cotización.");

  let respuesta: Response;
  try {
    respuesta = await fetch(process.env.COTIZA_API_URL || URL_POR_DEFECTO, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secreto}` },
      body: JSON.stringify({
        tenant: "azahar",
        ids,
        note: typeof body.nota === "string" ? body.nota.slice(0, 1000) : undefined,
        // El contacto sale de la sesión del servidor, nunca de lo que envíe el navegador.
        contactName: empleado.nombre,
        contactEmail: empleado.correo,
        consent: true,
      }),
    });
  } catch {
    throw new HttpError(502, "No pudimos contactar a Metis Nexa. Intenta de nuevo en unos minutos.");
  }
  if (!respuesta.ok) throw new HttpError(502, "Metis Nexa no pudo recibir la cotización. Intenta de nuevo más tarde.");
  return res.status(201).json({ ok: true });
}
