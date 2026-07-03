// ============================================================================
// POST /api/agentes/registrar
// ----------------------------------------------------------------------------
// Función serverless de Vercel que implementa el equipo de agentes de IA
// (Claude, vía @anthropic-ai/sdk) que procesa el autorregistro de nuevos
// empleados desde /registro:
//
//   1. Agente Verificador de Identidad: consulta la tabla `empleados`
//      (la "memoria" persistente de usuarios ya registrados) para asegurar
//      que el correo no tenga ya una cuenta — evita registros duplicados.
//   2. Agente de Alta y Bienvenida: si el verificador aprueba, crea el
//      usuario de autenticación + la fila de empleado (reutilizando
//      api/_lib/crearEmpleado.ts) y redacta un mensaje de bienvenida.
//
// Requiere las siguientes variables de entorno configuradas directamente en
// el proyecto de Vercel (Project Settings -> Environment Variables), NUNCA en
// un archivo .env del cliente:
//   - SUPABASE_URL
//   - SUPABASE_SERVICE_ROLE_KEY
//   - ANTHROPIC_API_KEY
//
// Si alguna de estas variables no está configurada, el endpoint responde de
// inmediato con 500 { motivo: "config_faltante" }. El cliente (ver
// src/auth/AuthContext.tsx, función `registrar`) interpreta esa respuesta —
// o un error de red si el endpoint ni siquiera existe en este despliegue —
// como señal para usar el registro local en modo demo.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { crearEmpleadoYUsuario } from "../_lib/crearEmpleado";

// Modelo de Claude usado por los agentes. Configurable vía ANTHROPIC_MODEL
// para poder cambiarlo sin tocar código; "claude-sonnet-5" es el modelo
// insignia actual de Anthropic al momento de escribir este archivo.
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

interface RegistrarPayload {
  nombre: string;
  correo: string;
  password: string;
  cargo: string;
  departamento: string;
  tipoContrato: string;
  fechaIngreso: string;
}

interface DecisionVerificador {
  permitido: boolean;
  razon: string;
}

// ----------------------------------------------------------------------------
// Herramientas (tools) expuestas a los agentes.
// ----------------------------------------------------------------------------

const HERRAMIENTA_BUSCAR: Anthropic.Tool = {
  name: "buscar_empleado_por_correo",
  description:
    "Busca en la tabla `empleados` si ya existe un registro con el correo indicado (comparación insensible a mayúsculas/minúsculas). " +
    "Devuelve el id y nombre del empleado existente, o null si el correo está disponible.",
  input_schema: {
    type: "object",
    properties: {
      correo: { type: "string", description: "Correo corporativo a verificar." },
    },
    required: ["correo"],
  },
};

const HERRAMIENTA_DECISION: Anthropic.Tool = {
  name: "responder_decision",
  description: "Registra la decisión final del agente verificador sobre si se permite continuar con el registro.",
  input_schema: {
    type: "object",
    properties: {
      permitido: {
        type: "boolean",
        description: "true si el correo NO está registrado y el registro puede continuar; false si ya existe una cuenta con ese correo.",
      },
      razon: { type: "string", description: "Explicación breve (una frase, en español) de la decisión." },
    },
    required: ["permitido", "razon"],
  },
};

const HERRAMIENTA_CREAR: Anthropic.Tool = {
  name: "crear_empleado_y_usuario",
  description:
    "Confirma y ejecuta la creación del usuario de autenticación y la fila de empleado en la base de datos para completar el alta. " +
    "Llama a esta herramienta exactamente una vez, con confirmar=true, cuando estés listo para dar de alta al nuevo empleado.",
  input_schema: {
    type: "object",
    properties: {
      confirmar: { type: "boolean", description: "Debe ser true para proceder con la creación del empleado." },
    },
    required: ["confirmar"],
  },
};

// ----------------------------------------------------------------------------
// Agente Verificador de Identidad
// ----------------------------------------------------------------------------

async function ejecutarAgenteVerificador(
  anthropic: Anthropic,
  supabaseAdmin: SupabaseClient,
  correo: string,
): Promise<DecisionVerificador> {
  const systemPrompt =
    "Eres el Agente Verificador de Identidad del portal de empleados de Azahar Coffee Company (una compañía colombiana de retail de café). " +
    "Tu única tarea es evitar registros duplicados: determinar si un correo corporativo ya tiene una cuenta registrada antes de permitir " +
    "que continúe un autorregistro. La tabla `empleados` es la memoria persistente de todas las personas ya registradas.\n\n" +
    "Reglas estrictas:\n" +
    "1. Primero DEBES llamar a la herramienta buscar_empleado_por_correo con el correo indicado.\n" +
    "2. Con el resultado exacto de esa búsqueda, llama a responder_decision:\n" +
    "   - Si NO se encontró ningún empleado con ese correo: permitido=true, razon explicando que el correo está disponible.\n" +
    "   - Si SÍ se encontró un empleado con ese correo: permitido=false, razon indicando que el correo ya está en uso " +
    "(menciona el nombre del empleado existente si lo tienes).\n" +
    "No inventes información ni asumas nada: básate únicamente en el resultado real de la herramienta de búsqueda.";

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: `Verifica si el correo "${correo}" ya está registrado en el portal antes de continuar con el registro.` },
  ];

  const primeraRespuesta = await anthropic.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 1024,
    thinking: { type: "disabled" },
    system: systemPrompt,
    tools: [HERRAMIENTA_BUSCAR, HERRAMIENTA_DECISION],
    tool_choice: { type: "tool", name: "buscar_empleado_por_correo" },
    messages,
  });

  const llamadaBusqueda = primeraRespuesta.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use" && b.name === "buscar_empleado_por_correo",
  );
  if (!llamadaBusqueda) {
    throw new Error("El agente verificador no invocó la búsqueda de correo.");
  }

  // Ejecutamos la búsqueda real contra Supabase con la llave de servicio —
  // esto es la "memoria de usuarios" real, no una simulación del modelo.
  const { data: empleadoExistente, error: errorBusqueda } = await supabaseAdmin
    .from("empleados")
    .select("id, nombre")
    .ilike("correo", correo)
    .limit(1)
    .maybeSingle();
  if (errorBusqueda) {
    throw new Error(`Error consultando la tabla empleados: ${errorBusqueda.message}`);
  }

  messages.push({ role: "assistant", content: primeraRespuesta.content });
  messages.push({
    role: "user",
    content: [
      {
        type: "tool_result",
        tool_use_id: llamadaBusqueda.id,
        content: JSON.stringify({
          encontrado: Boolean(empleadoExistente),
          empleado: empleadoExistente ?? null,
        }),
      },
    ],
  });

  const segundaRespuesta = await anthropic.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 1024,
    thinking: { type: "disabled" },
    system: systemPrompt,
    tools: [HERRAMIENTA_BUSCAR, HERRAMIENTA_DECISION],
    tool_choice: { type: "tool", name: "responder_decision" },
    messages,
  });

  const llamadaDecision = segundaRespuesta.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use" && b.name === "responder_decision",
  );
  if (!llamadaDecision) {
    throw new Error("El agente verificador no emitió una decisión.");
  }

  const decisionInput = llamadaDecision.input as Partial<DecisionVerificador>;
  if (typeof decisionInput.permitido !== "boolean") {
    throw new Error("La decisión del agente verificador tiene un formato inválido.");
  }

  // Backstop de seguridad: la base de datos manda. Si la búsqueda sí
  // encontró un duplicado, nunca confiamos en que el modelo haya dicho
  // permitido=true (evita que un error del modelo cree un duplicado).
  if (empleadoExistente && decisionInput.permitido) {
    return {
      permitido: false,
      razon: `El correo ya está registrado por ${empleadoExistente.nombre}.`,
    };
  }

  return { permitido: decisionInput.permitido, razon: decisionInput.razon ?? "" };
}

// ----------------------------------------------------------------------------
// Agente de Alta y Bienvenida
// ----------------------------------------------------------------------------

async function ejecutarAgenteAlta(
  anthropic: Anthropic,
  supabaseAdmin: SupabaseClient,
  payload: RegistrarPayload,
): Promise<{ empleadoId: string; mensajeBienvenida: string }> {
  const systemPrompt =
    "Eres el Agente de Alta y Bienvenida del portal de empleados de Azahar Coffee Company. Se te invoca únicamente después de que el " +
    "Agente Verificador de Identidad confirmó que el correo del nuevo empleado no está duplicado.\n\n" +
    "Tu tarea, en orden:\n" +
    "1. Llama a la herramienta crear_empleado_y_usuario con confirmar=true para completar el alta.\n" +
    "2. Con el resultado de esa herramienta, responde ÚNICAMENTE con un mensaje de bienvenida corto (1 a 2 frases), cálido y en español, " +
    "dirigido a la persona por su nombre de pila, mencionando su cargo y/o departamento. No uses markdown, listas ni saludos genéricos de IA " +
    "(evita frases como 'Como asistente de IA...').";

  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content:
        `Completa el alta de ${payload.nombre}, quien ingresa como ${payload.cargo} en el departamento de ${payload.departamento} ` +
        `(${payload.tipoContrato}), a partir del ${payload.fechaIngreso}.`,
    },
  ];

  const primeraRespuesta = await anthropic.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 512,
    thinking: { type: "disabled" },
    system: systemPrompt,
    tools: [HERRAMIENTA_CREAR],
    tool_choice: { type: "tool", name: "crear_empleado_y_usuario" },
    messages,
  });

  const llamadaCrear = primeraRespuesta.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use" && b.name === "crear_empleado_y_usuario",
  );
  if (!llamadaCrear) {
    throw new Error("El agente de alta no invocó la creación del empleado.");
  }

  // Ejecutamos la creación real usando los datos validados del request, no
  // los que el modelo pudiera repetir en su llamada a la herramienta — así
  // evitamos que una alucinación del modelo altere la contraseña o el correo.
  const filaEmpleado = await crearEmpleadoYUsuario(supabaseAdmin, {
    nombre: payload.nombre,
    correo: payload.correo,
    cargo: payload.cargo,
    departamento: payload.departamento,
    tipoContrato: payload.tipoContrato,
    fechaIngreso: payload.fechaIngreso,
    diasVacacionesDisponibles: 15,
    rol: "empleado",
    password: payload.password,
  });

  messages.push({ role: "assistant", content: primeraRespuesta.content });
  messages.push({
    role: "user",
    content: [
      {
        type: "tool_result",
        tool_use_id: llamadaCrear.id,
        content: JSON.stringify({ ok: true, empleadoId: filaEmpleado.id, nombre: payload.nombre, cargo: payload.cargo }),
      },
    ],
  });

  const segundaRespuesta = await anthropic.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 256,
    thinking: { type: "disabled" },
    system: systemPrompt,
    tools: [HERRAMIENTA_CREAR],
    messages,
  });

  const bloqueTexto = segundaRespuesta.content.find((b): b is Anthropic.TextBlock => b.type === "text");
  const primerNombre = payload.nombre.trim().split(/\s+/)[0] ?? payload.nombre;
  const mensajeBienvenida =
    bloqueTexto?.text.trim() ||
    `¡Bienvenido(a) a Azahar Coffee Company, ${primerNombre}! Nos alegra que te unas como ${payload.cargo} en ${payload.departamento}.`;

  return { empleadoId: filaEmpleado.id, mensajeBienvenida };
}

// ----------------------------------------------------------------------------
// Handler HTTP
// ----------------------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, motivo: "error", mensaje: "Método no permitido. Usa POST." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  // Verificación explícita de configuración ANTES de construir cualquier
  // cliente: así devolvemos un 500 claro y predecible en vez de dejar que el
  // SDK de Anthropic o de Supabase fallen de forma confusa.
  if (!supabaseUrl || !serviceRoleKey || !anthropicApiKey) {
    return res.status(500).json({
      ok: false,
      motivo: "config_faltante",
      mensaje:
        "El servidor no tiene configuradas las credenciales necesarias (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY). " +
        "El equipo de agentes de IA se activa cuando estas variables se configuren en Vercel.",
    });
  }

  const body = req.body as Partial<RegistrarPayload>;
  const camposRequeridos: (keyof RegistrarPayload)[] = [
    "nombre",
    "correo",
    "password",
    "cargo",
    "departamento",
    "tipoContrato",
    "fechaIngreso",
  ];
  const faltantes = camposRequeridos.filter((campo) => !body[campo]);
  if (faltantes.length > 0) {
    return res.status(400).json({ ok: false, motivo: "error", mensaje: `Faltan campos requeridos: ${faltantes.join(", ")}` });
  }
  const payload = body as RegistrarPayload;

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const anthropic = new Anthropic({ apiKey: anthropicApiKey });

  try {
    const decision = await ejecutarAgenteVerificador(anthropic, supabaseAdmin, payload.correo);

    if (!decision.permitido) {
      return res.status(409).json({
        ok: false,
        motivo: "correo_duplicado",
        mensaje: decision.razon || "Ya existe una cuenta registrada con ese correo.",
      });
    }

    const { empleadoId, mensajeBienvenida } = await ejecutarAgenteAlta(anthropic, supabaseAdmin, payload);

    return res.status(200).json({ ok: true, empleadoId, mensajeBienvenida });
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : "Error inesperado procesando el registro.";
    return res.status(500).json({ ok: false, motivo: "error", mensaje });
  }
}
