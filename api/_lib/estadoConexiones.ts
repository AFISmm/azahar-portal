// ============================================================================
// Estado de las conexiones de este portal para la Oficina Virtual (módulo «Oficina Virtual»). Mismas reglas y mismos
// ids que usa la Oficina Virtual del portal de clientes de Metis Nexa (lib/azahar-estado.ts), pero aquí la sonda es
// local: este mismo servidor responde, así que web/API están vivas y solo se comprueban la base, las llaves y Alegra.
// `evaluar` es una función pura.
// ============================================================================

export type EstadoConexion = "ok" | "falla" | "config" | "sin_datos";
/** `detalle` = por qué está así (el motivo real); `accion` = qué falta o qué hacer para que pase a estar en línea. */
export type Estados = Record<string, { estado: EstadoConexion; detalle?: string; accion?: string; verificada?: boolean }>;

export interface Sondas {
  /** Fuentes de indicadores que respondieron (null = no se pudo pedir). */
  indicadores: number | null;
  db: boolean;
  /** Motivo real si la base no respondió (sin direcciones ni claves). */
  dbError?: string;
  /** Llave de Gemini y si hay plan de pago confirmado (GEMINI_PLAN_DE_PAGO=1). */
  gemini: { llave: boolean; planDePago: boolean };
  /** Store de Blob público (trazabilidad) y privado (adjuntos de PQR). */
  blob: { publico: boolean; privado: boolean };
  alegra: "sin_clave" | "ok" | "rechazada" | "caida";
  /** Detalle real de la falla de Alegra (código HTTP o error de red). */
  alegraError?: string;
}

const MODULOS = ["nomina", "trazabilidad", "pos", "contable", "estrategica", "comercial", "operativa", "informacion", "pqr", "documentos", "usuarios"];

export function evaluar(s: Sondas): Estados {
  const out: Estados = {};

  // Los módulos son pantallas de este portal: dependen de que responda la base de datos.
  const motivoDb = `la base de datos no responde${s.dbError ? `: ${s.dbError}` : ""}`;
  const accionDb = "Revisa el proyecto de Neon (¿suspendido, archivado o sin crédito?) y la variable de conexión POSTGRES_URL en Vercel.";
  for (const id of MODULOS) out[id] = s.db ? { estado: "ok" } : { estado: "falla", detalle: motivoDb, accion: accionDb };

  out.neon = s.db ? { estado: "ok" } : { estado: "falla", detalle: motivoDb, accion: accionDb };

  out.gemini = !s.gemini.llave
    ? {
        estado: "falla",
        detalle: "no hay clave de Gemini (GEMINI_API_KEY): el asistente responde solo con la guía local, sin IA",
        accion: "Contratar un plan de pago de Gemini con contrato de tratamiento de datos, poner la clave en GEMINI_API_KEY y GEMINI_PLAN_DE_PAGO=1 en Vercel.",
      }
    : !s.gemini.planDePago
      ? {
          estado: "falla",
          detalle: "hay clave de Gemini pero la IA está apagada a propósito: no se confirmó un plan de pago, y la capa gratuita puede usar los datos enviados",
          accion: "Contratar el plan de pago con contrato de datos, poner GEMINI_PLAN_DE_PAGO=1 en Vercel y retirar la clave gratuita anterior.",
        }
      : { estado: "config", detalle: "clave y plan de pago configurados; no se hacen llamadas de prueba (costarían dinero)", accion: "Confírmala a mano cuando hayas probado el asistente." };

  out.blob = !s.blob.publico && !s.blob.privado
    ? {
        estado: "falla",
        detalle: "no hay ninguna clave de almacenamiento (BLOB_READ_WRITE_TOKEN ni BLOB_PRIVATE_READ_WRITE_TOKEN): no se pueden subir archivos",
        accion: "Crear los stores de Vercel Blob (público para trazabilidad y privado para adjuntos de PQR) y poner sus tokens en Vercel.",
      }
    : !s.blob.privado
      ? {
          estado: "falla",
          detalle: "falta el store privado de Blob (BLOB_PRIVATE_READ_WRITE_TOKEN): los adjuntos de PQR se rechazan hasta que exista",
          accion: "En Vercel → Storage, crear un store de Blob PRIVADO, conectarlo al proyecto y poner su token como BLOB_PRIVATE_READ_WRITE_TOKEN; después, desplegar.",
        }
      : { estado: "config", detalle: "claves configuradas; no se hacen subidas de prueba", accion: "Confírmala a mano cuando hayas subido un adjunto de prueba." };

  out.indicadores =
    s.indicadores === null
      ? { estado: "falla", detalle: "el servidor no pudo pedir los indicadores", accion: "Reintenta en unos minutos; si sigue, revisa los registros de /api/indicadores en Vercel." }
      : s.indicadores > 0
        ? { estado: "ok", detalle: `${s.indicadores} de 4 fuentes${s.indicadores < 4 ? " (alguna fuente externa no respondió)" : ""}` }
        : {
            estado: "falla",
            detalle: "ninguna de las 4 fuentes externas respondió (Banco de la República para la TRM y Yahoo Finance para petróleo, café y oro)",
            accion: "Suele ser temporal. Si sigue, revisa que el servidor tenga salida a internet y que Yahoo Finance no esté limitando las consultas.",
          };

  out.alegra =
    s.alegra === "ok"
      ? { estado: "ok", detalle: "cuenta de Alegra responde (solo lectura)" }
      : s.alegra === "rechazada"
        ? { estado: "falla", detalle: `Alegra rechazó las credenciales${s.alegraError ? ` (${s.alegraError})` : ""}`, accion: "Generar un token nuevo en Alegra (Configuración → API) y actualizar ALEGRA_EMAIL y ALEGRA_TOKEN en Vercel." }
        : s.alegra === "caida"
          ? { estado: "falla", detalle: `Alegra no respondió${s.alegraError ? ` (${s.alegraError})` : ""}`, accion: "Reintenta en unos minutos; si sigue, revisa el estado del servicio de Alegra." }
          : {
              estado: "sin_datos",
              detalle: "el servidor no tiene credenciales de Alegra (ALEGRA_EMAIL y ALEGRA_TOKEN), así que no puede comprobar la conexión; los comprobantes se importan por archivo desde Gestión Contable",
              accion: "Poner ALEGRA_EMAIL y ALEGRA_TOKEN en las variables de Vercel. El servidor solo hará una lectura de la compañía (nunca crea ni modifica nada) y la conexión pasará a «En línea».",
            };

  // Enlaces con Metis Nexa: se comprueban desde el portal de Metis, no desde este servidor.
  out.metis_acceso = {
    estado: "sin_datos",
    detalle: "este servidor no puede ver cómo entran las personas desde la landing de Metis Nexa: esa comprobación vive en el portal de Metis",
    accion: "Se comprueba desde el portal de clientes de Metis Nexa, donde esta misma oficina muestra el estado completo.",
  };
  out.metis_portal = {
    estado: "sin_datos",
    detalle: "las cotizaciones y tickets hacia Metis Nexa se guardan en la base de datos del portal de Metis, que este servidor no consulta",
    accion: "Se comprueba desde el portal de clientes de Metis Nexa, donde esta misma oficina muestra el estado completo.",
  };
  return out;
}

/** Alegra: una sola lectura (GET /company) con las credenciales del servidor. Nunca crea ni modifica nada. */
export async function sondearAlegra(): Promise<{ estado: Sondas["alegra"]; error?: string }> {
  const email = process.env.ALEGRA_EMAIL;
  const token = process.env.ALEGRA_TOKEN;
  if (!email || !token) return { estado: "sin_clave" };
  try {
    const r = await fetch("https://api.alegra.com/api/v1/company", {
      headers: { Authorization: `Basic ${Buffer.from(`${email}:${token}`, "utf8").toString("base64")}`, Accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    });
    if (r.ok) return { estado: "ok" };
    return { estado: r.status === 401 || r.status === 403 ? "rechazada" : "caida", error: `HTTP ${r.status}` };
  } catch (err) {
    return { estado: "caida", error: err instanceof Error ? err.name === "TimeoutError" ? "tiempo de espera agotado" : "error de red" : "error de red" };
  }
}

/** Motivo de un error sin direcciones, claves ni usuarios (corto y seguro de mostrar). */
export function motivoSeguro(err: unknown): string {
  const t = err instanceof Error ? err.message : String(err);
  return t.replace(/\b[a-z]+:\/\/\S+/gi, "[dirección]").replace(/\b[\w.-]+\.(?:neon\.tech|vercel\.app|com|net)\b/gi, "[servidor]").slice(0, 140);
}
