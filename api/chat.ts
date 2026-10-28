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
// Con GEMINI_API_KEY en Vercel (Project Settings -> Environment Variables) usa la
// IA y devuelve modo "ia". Sin ella NO se queda mudo: responde con la guía básica
// de módulos de api/_lib/chatLocal.ts y devuelve modo "basico".
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { manejarError, requireAuth } from "./_lib/auth.js";
import { responderLocal } from "./_lib/chatLocal.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

/**
 * Instrucciones iniciales del asistente. `nombre` es el que la persona le puso en sus ajustes; con `modoVoz`
 * la respuesta se lee en voz alta, así que se pide corta y sin formato.
 */
function cabecera(nombre: string, modoVoz: boolean): string {
  return `
Te llamas ${nombre}, el asistente virtual del Portal Azahar, el portal interno de Azahar Coffee Company (empresa colombiana de
retail de café). Preséntate como ${nombre} si te preguntan tu nombre. Tu única función es ayudar a las personas del equipo a
entender QUÉ existe en el portal y CÓMO usarlo. Responde siempre en español, de forma breve, clara y amable. Si te preguntan
algo que no tiene que ver con el portal, indícalo brevemente y redirige la conversación a temas del portal. Nunca inventes
datos personales, cifras de nómina o información de empleados específicos: no tienes acceso a esa información real, solo
conoces la estructura y funcionalidad de la plataforma descrita aquí abajo.${
    modoVoz
      ? `

IMPORTANTE: la persona te habla por voz y tu respuesta se lee en voz alta. Responde en máximo 3 frases cortas, con tono
conversacional, SIN listas, SIN viñetas, SIN markdown, SIN emojis y sin leer enlaces ni símbolos.`
      : ""
  }

## Estructura general
Cada persona ve solo los módulos a los que un administrador le dio permiso. Por módulo hay dos niveles: "Ver" (consultar) y
"Editar" (además crear o cambiar). Inicio, Nómina personal y Mi perfil son para todos. Las cuentas de Mercury Methods tienen
acceso total. El sidebar cambia según esos permisos.
`.trim();
}

const BASE_CONOCIMIENTO = `
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

## Gestión de usuarios (/admin/usuarios, ítem propio en el sidebar, módulo "Usuarios")
Administra el ACCESO al portal (distinto de los datos de RRHH de Empleados): tabla con todas las cuentas y, en cada fila,
casillas "Ver" y "Editar" por módulo (Negocio, RRHH, Usuarios, Trazabilidad y Sistema POS); "Editar" incluye "Ver" y los
cambios se guardan al instante. Además permite activar o desactivar la cuenta y eliminarla. Nadie puede cambiarse sus propios
permisos, y las cuentas @mercurymethods.com tienen acceso total fijo.

## Gestión del negocio (grupo del sidebar, módulo "Negocio")
- Gestión Estratégica: objetivos/OKRs de la empresa, KPIs de alto nivel.
- Gestión Comercial: ventas por tienda y producto más vendido. Quien puede editar el módulo agrega tiendas, cambia el estado
  de cada una (activa, en remodelación o cerrada) y las elimina.
- Gestión Operativa: registro de FINCAS cafeteras (código autogenerado, nombre, ubicación —vereda/municipio/departamento—,
  propietario, cédula, área total, área en café, número de árboles, variedad, coordenadas) y sus CERTIFICADOS (nombre del
  certificado, entidad certificadora, número, fechas de emisión/vencimiento), organizados en dos pestañas: "Fincas" y
  "Certificados" (con botones "Agregar finca" / "Agregar certificado").
- Información General: calendario tributario colombiano, indicadores económicos, y calculadoras propias del negocio cafetero
  (costo por taza, margen de utilidad).

## Trazabilidad del café (módulo "Trazabilidad")
Sigue el café desde la finca hasta la bolsa: Finca/Origen, Certificaciones, Beneficiado y trilla (lote verde), Ficha de cata,
Tueste (un lote tostado puede ser un blend de varios lotes verdes) y Empaque. Al registrar un lote de empaque se genera un
código QR que abre una ficha pública (sin iniciar sesión) con el origen, el mapa y la línea de tiempo. "Ver" consulta;
"Editar" además registra y permite ver la auditoría (bitácora de solo-anexado de quién registró qué).

## Sistema POS (módulo "Sistema POS")
Caja: catálogo por categorías con modificadores (tipo de leche, shot extra, tamaño), varios pedidos abiertos, "para llevar",
cobro en efectivo (con cambio) o tarjeta, y envío a cocina. Cocina (KDS): pantalla con los pedidos en curso para marcarlos
preparando, listos y entregados. Historial: ventas recientes. Descuentos, marcar un producto agotado y cancelar un pedido ya
cobrado requieren además ser administrador de algún módulo de administración.

## Registro (/registro)
Cualquier persona puede crear una cuenta de empleado (cargo, departamento, tipo de contrato, fecha de ingreso). La cuenta nace
SIN acceso a módulos: un administrador se los asigna después en Gestión de usuarios. Las cuentas @mercurymethods.com no se
registran solas: las crea un administrador.

## Voz y personalización del asistente
Se me puede hablar por micrófono y respondo con voz. El botón de ondas en la cabecera del chat activa el modo conversación
manos libres (escucho, respondo y vuelvo a escuchar; decir "adiós" lo termina). El botón de ajustes permite cambiar mi
nombre, mi voz (femenina o masculina) y la velocidad, y mi botón se puede arrastrar a cualquier parte de la pantalla.

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
  /** Nombre que la persona le puso al asistente en sus ajustes. */
  nombreAsistente?: string;
  /** true si la pregunta llegó por voz: la respuesta se leerá en voz alta. */
  modoVoz?: boolean;
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

  try {
    const { empleadoId } = await requireAuth(req);
    const body = req.body as Partial<ChatPayload>;
    const mensaje = body.mensaje?.trim();
    if (!mensaje) {
      return res.status(400).json({ ok: false, mensaje: "Falta el mensaje." });
    }
    // El nombre viene del cliente y entra al prompt: solo letras, números, espacios y guiones, máx. 20.
    const nombreAsistente = (body.nombreAsistente ?? "").replace(/[^\p{L}\p{N} _-]/gu, "").trim().slice(0, 20) || "JARVIS";
    const modoVoz = body.modoVoz === true;

    // Sin GEMINI_API_KEY no se deja al asistente mudo: se responde con la guía básica de módulos (sin IA).
    if (!apiKey) {
      return res.status(200).json({ ok: true, respuesta: responderLocal(mensaje, nombreAsistente), modo: "basico" });
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
    const cuerpoGemini = JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: `${cabecera(nombreAsistente, modoVoz)}\n\n${BASE_CONOCIMIENTO}` }] },
      generationConfig: { temperature: 0.4, maxOutputTokens: modoVoz ? 220 : 500 },
    });

    // El modelo (preview) a veces responde 503 por sobrecarga temporal de Google;
    // un único reintento corto evita que ese hipo se le muestre a la persona.
    let respuestaGemini = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: cuerpoGemini,
    });
    if (respuestaGemini.status === 503) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      respuestaGemini = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: cuerpoGemini,
      });
    }

    if (!respuestaGemini.ok) {
      const textoError = await respuestaGemini.text().catch(() => "");
      throw new Error(`Gemini respondió ${respuestaGemini.status}: ${textoError.slice(0, 200)}`);
    }

    const datos = (await respuestaGemini.json()) as GeminiRespuesta;
    const texto = datos.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";

    return res.status(200).json({
      ok: true,
      respuesta: texto.trim() || "No tengo una respuesta clara para eso. ¿Puedes reformular la pregunta?",
      modo: "ia",
    });
  } catch (err) {
    return manejarError(res, err);
  }
}
