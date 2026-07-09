// ============================================================================
// POST /api/chat
// ----------------------------------------------------------------------------
// Chatbot del portal: responde preguntas sobre qué hace cada módulo y cómo
// usarlo, usando un modelo de lenguaje real (Google Gemini, capa gratuita)
// con una base de conocimiento estática de la plataforma como instrucción de
// sistema. Requiere sesión iniciada (cualquier rol).
//
// A propósito NO se le pasan datos reales de empleados, nómina ni solicitudes
// al modelo — solo la descripción de qué existe y cómo se usa. Así el
// chatbot puede explicar "cómo pido vacaciones" o "qué hace Gestión
// Operativa", pero nunca expone información sensible de otras personas.
//
// Requiere GEMINI_API_KEY en Vercel (Project Settings -> Environment
// Variables). Sin ella, responde 500 { motivo: "config_faltante" } y el
// widget del chat lo muestra como "no disponible por ahora".
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { manejarError, requireAuth } from "./_lib/auth.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

const BASE_CONOCIMIENTO = `
Te llamas JARVIS, el asistente virtual del Portal Azahar, el portal interno de Azahar Coffee Company (empresa colombiana de
retail de café). Preséntate como JARVIS si te preguntan tu nombre. Tu única función es ayudar a las personas del equipo a
entender QUÉ existe en el portal y CÓMO usarlo. Responde siempre en español, de forma breve, clara y amable. Si te preguntan
algo que no tiene que ver con el portal, indícalo brevemente y redirige la conversación a temas del portal. Nunca inventes
datos personales, cifras de nómina o información de empleados específicos: no tienes acceso a esa información real, solo
conoces la estructura y funcionalidad de la plataforma descrita aquí abajo.

## Estructura general
El portal tiene dos roles: "empleado" (autoservicio) y "admin" (además del autoservicio, ve secciones de administración y
gestión del negocio). El sidebar cambia según el rol.

## Inicio (/inicio)
Es la página de aterrizaje para todos. Muestra un panorama de mercado y producción de café: estadísticas mundiales del café
(fuente ICO), la cadena de producción del café (cultivo, cosecha, beneficio, secado, trilla, tueste, empaque — con una vista de
detalle paso a paso), variación % de producción industrial (fuente EMMET/Mincit), producción agrícola anual (fuente EVA/Min.
Agricultura), y el valor del café en bolsa (precio interno FNC en pesos colombianos, con selector Día/Semana/Mes). Estos datos
están marcados como "de demostración" porque esas fuentes externas no tienen una API pública real conectada todavía.
También hay un ticker en la parte superior con indicadores económicos REALES (no de demostración): TRM (dólar), petróleo WTI,
café en bolsa internacional y oro, actualizados cada minuto.

## Módulo NÓMINA (autoservicio — "Mi portal")
Se accede desde el ítem "Nómina" del sidebar principal, que abre un sub-sidebar con:
- Inicio: panel personal con saludo, días de vacaciones disponibles, próxima fecha de nómina, solicitudes pendientes y tipo de contrato.
- Mi contrato: cargo, tipo de contrato, fecha de ingreso, antigüedad, departamento.
- Vacaciones: saldo de días disponibles/tomados e historial; botón "Solicitar vacaciones".
- Nómina: historial de pagos personales (periodo, monto, estado pagado/pendiente).
- Mis solicitudes: todas las solicitudes propias (vacaciones, incapacidad, documento, certificado) con su estado.
- Incapacidades: historial y formulario para radicar una nueva incapacidad.
- Documentos: documentos propios (contrato, certificados, etc.), con opción de subir uno nuevo.
- Certificados: solicitar certificado laboral o salarial, y ver los ya emitidos.

## Administración (dentro del sub-sidebar de NÓMINA, solo admin)
- Solicitudes: bandeja de todas las solicitudes del equipo, con botones Aprobar/Rechazar.
- Incapacidades: igual que Solicitudes, filtrado a incapacidades.
- Documentos: gestión de documentos de cualquier empleado.
- Empleados: directorio con buscador/filtros; alta, edición y ficha de detalle de cada empleado (datos de RRHH: cargo, salario, contrato, vacaciones).
- Nómina: nómina administrativa de toda la empresa (total del periodo, empleados en nómina, pagos pendientes) con botón "Marcar como pagado" por cada pago.

## Gestión de usuarios (/admin/usuarios, ítem propio en el sidebar, solo admin)
Administra el ACCESO al portal (distinto de los datos de RRHH de Empleados): lista de cuentas con correo, rol y estado, con
acciones para cambiar el rol (empleado/administrador), activar o desactivar el acceso, y eliminar una cuenta. Un admin no puede
modificar su propia cuenta desde esta pantalla.

## Gestión del negocio (grupo del sidebar, solo admin)
- Gestión Estratégica: objetivos/OKRs de la empresa, KPIs de alto nivel.
- Gestión Comercial: ventas por tienda, ticket promedio, producto más vendido.
- Gestión Operativa: registro de FINCAS cafeteras (código autogenerado, nombre, ubicación —vereda/municipio/departamento—,
  propietario, cédula, área total, área en café, número de árboles, variedad, coordenadas) y sus CERTIFICADOS (nombre del
  certificado, entidad certificadora, número, fechas de emisión/vencimiento), organizados en dos pestañas: "Fincas" y
  "Certificados" (con botones "Agregar finca" / "Agregar certificado").
- Información General: calendario tributario colombiano, indicadores económicos, y calculadoras propias del negocio cafetero
  (costo por taza, margen de utilidad).

## Registro (/registro)
Cualquiera puede crear una cuenta. Se elige "Empleado de la empresa" (formulario completo: cargo, departamento, tipo de
contrato, fecha de ingreso) o "Desarrollador de la página" (solo nombre, correo, contraseña y cargo — la cuenta queda con
rol administrador automáticamente).

## Otros detalles
- Hay un botón de tema claro/oscuro y una campana de notificaciones (a la derecha del encabezado de cada página) que muestra
  solicitudes pendientes de aprobar (si eres admin) y tus propias solicitudes ya resueltas, con botones "Ir" y "Eliminar".
- El portal puede correr en "modo demo" (datos de ejemplo en memoria, sin base de datos real) o en modo real conectado a
  Postgres — hoy corre en modo real.
`.trim();

interface ChatMensaje {
  rol: "user" | "assistant";
  contenido: string;
}

interface ChatPayload {
  mensaje: string;
  historial?: ChatMensaje[];
}

interface GeminiParte {
  text: string;
}

interface GeminiRespuesta {
  candidates?: { content?: { parts?: GeminiParte[] } }[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa POST." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      motivo: "config_faltante",
      mensaje: "El asistente todavía no está configurado (falta GEMINI_API_KEY).",
    });
  }

  try {
    const { empleadoId } = await requireAuth(req);
    const body = req.body as Partial<ChatPayload>;
    const mensaje = body.mensaje?.trim();
    if (!mensaje) {
      return res.status(400).json({ ok: false, mensaje: "Falta el mensaje." });
    }
    const historial = Array.isArray(body.historial) ? body.historial.slice(-10) : [];

    const contents = [
      ...historial.map((m) => ({
        role: m.rol === "assistant" ? "model" : "user",
        parts: [{ text: m.contenido }],
      })),
      { role: "user", parts: [{ text: mensaje }] },
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    const respuestaGemini = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: BASE_CONOCIMIENTO }] },
        generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
      }),
    });

    if (!respuestaGemini.ok) {
      const textoError = await respuestaGemini.text().catch(() => "");
      throw new Error(`Gemini respondió ${respuestaGemini.status}: ${textoError.slice(0, 200)}`);
    }

    const datos = (await respuestaGemini.json()) as GeminiRespuesta;
    const texto = datos.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";

    return res.status(200).json({
      ok: true,
      respuesta: texto.trim() || "No tengo una respuesta clara para eso. ¿Puedes reformular la pregunta?",
    });
  } catch (err) {
    return manejarError(res, err);
  }
}
