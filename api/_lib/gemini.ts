// ============================================================================
// Candado para el uso de Gemini. La capa gratuita de Google puede usar lo que se envía para mejorar sus modelos, así
// que NINGÚN dato del portal (chat, archivos contables) se envía a Gemini a menos que, además de la llave, esté
// confirmado que la cuenta es de PAGO y tiene contrato de tratamiento de datos: GEMINI_PLAN_DE_PAGO=1.
// Sin esa confirmación el chat responde con la guía local (sin IA) y la sugerencia de importación usa solo reglas locales.
// ============================================================================
export function claveGemini(): string | null {
  const llave = process.env.GEMINI_API_KEY;
  if (!llave) return null;
  if (process.env.GEMINI_PLAN_DE_PAGO !== "1") return null;
  return llave;
}
