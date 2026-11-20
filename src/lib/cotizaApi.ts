// Cliente HTTP de «Cotiza tu plan»: envía la cotización al servidor de azahar-portal, que la reenvía
// al portal del equipo de Metis Nexa como ticket de compra (ver api/_lib/cotizacion.ts).

export interface CotizacionEnviada {
  ids: string[];
  nota?: string;
  consentimiento: boolean;
}

export async function enviarCotizacion(datos: CotizacionEnviada): Promise<void> {
  const respuesta = await fetch("/api/solicitudes?r=cotizacion", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  const payload = (await respuesta.json().catch(() => null)) as { ok?: boolean; mensaje?: string } | null;
  if (!respuesta.ok || !payload?.ok) throw new Error(payload?.mensaje ?? `Error ${respuesta.status} al enviar la cotización.`);
}
