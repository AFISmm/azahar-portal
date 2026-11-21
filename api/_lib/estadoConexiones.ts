// ============================================================================
// Estado de las conexiones de este portal para la Oficina Virtual (módulo «Oficina Virtual»). Mismas reglas y mismos
// ids que usa la Oficina Virtual del portal de clientes de Metis Nexa (lib/azahar-estado.ts), pero aquí la sonda es
// local: este mismo servidor responde, así que web/API están vivas y solo se comprueban la base, las llaves y Alegra.
// `evaluar` es una función pura.
// ============================================================================

export type EstadoConexion = "ok" | "falla" | "config" | "sin_datos";
export type Estados = Record<string, { estado: EstadoConexion; detalle?: string; verificada?: boolean }>;

export interface Sondas {
  /** Fuentes de indicadores que respondieron (null = no se pudo pedir). */
  indicadores: number | null;
  db: boolean;
  /** Llave de Gemini y si hay plan de pago confirmado (GEMINI_PLAN_DE_PAGO=1). */
  gemini: { llave: boolean; planDePago: boolean };
  /** Store de Blob público (trazabilidad) y privado (adjuntos de PQR). */
  blob: { publico: boolean; privado: boolean };
  alegra: "sin_clave" | "ok" | "rechazada" | "caida";
}

const MODULOS = ["nomina", "trazabilidad", "pos", "contable", "estrategica", "comercial", "operativa", "informacion", "pqr", "documentos", "usuarios"];

export function evaluar(s: Sondas): Estados {
  const out: Estados = {};

  // Los módulos son pantallas de este portal: dependen de que responda la base de datos.
  for (const id of MODULOS) out[id] = s.db ? { estado: "ok" } : { estado: "falla", detalle: "la base de datos no responde" };

  out.neon = s.db ? { estado: "ok" } : { estado: "falla", detalle: "no responde" };

  out.gemini = !s.gemini.llave
    ? { estado: "falla", detalle: "falta la clave" }
    : !s.gemini.planDePago
      ? { estado: "falla", detalle: "clave presente pero IA apagada: falta confirmar el plan de pago (GEMINI_PLAN_DE_PAGO=1)" }
      : { estado: "config", detalle: "clave y plan de pago configurados; no se hacen llamadas de prueba" };

  out.blob = !s.blob.publico && !s.blob.privado
    ? { estado: "falla", detalle: "faltan las claves" }
    : !s.blob.privado
      ? { estado: "falla", detalle: "falta el store privado (BLOB_PRIVATE_READ_WRITE_TOKEN): los adjuntos de PQR se rechazan" }
      : { estado: "config", detalle: "claves configuradas; no se hacen llamadas de prueba" };

  out.indicadores =
    s.indicadores === null
      ? { estado: "falla", detalle: "no responde" }
      : s.indicadores > 0
        ? { estado: "ok", detalle: `${s.indicadores} de 4 fuentes` }
        : { estado: "falla", detalle: "las fuentes externas no respondieron" };

  out.alegra =
    s.alegra === "ok"
      ? { estado: "ok", detalle: "cuenta de Alegra responde (solo lectura)" }
      : s.alegra === "rechazada"
        ? { estado: "falla", detalle: "Alegra rechazó las credenciales" }
        : s.alegra === "caida"
          ? { estado: "falla", detalle: "Alegra no responde" }
          : { estado: "sin_datos", detalle: "sin credenciales de Alegra en el servidor (se importan archivos)" };

  // Enlaces con Metis Nexa: se comprueban desde el portal de Metis, no desde este servidor.
  out.metis_acceso = { estado: "sin_datos", detalle: "se verifica desde el portal de Metis" };
  out.metis_portal = { estado: "sin_datos", detalle: "se verifica desde el portal de Metis" };
  return out;
}

/** Alegra: una sola lectura (GET /company) con las credenciales del servidor. Nunca crea ni modifica nada. */
export async function sondearAlegra(): Promise<Sondas["alegra"]> {
  const email = process.env.ALEGRA_EMAIL;
  const token = process.env.ALEGRA_TOKEN;
  if (!email || !token) return "sin_clave";
  try {
    const r = await fetch("https://api.alegra.com/api/v1/company", {
      headers: { Authorization: `Basic ${Buffer.from(`${email}:${token}`, "utf8").toString("base64")}`, Accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    });
    if (r.ok) return "ok";
    return r.status === 401 || r.status === 403 ? "rechazada" : "caida";
  } catch {
    return "caida";
  }
}
