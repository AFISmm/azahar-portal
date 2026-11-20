// ============================================================================
// Acceso de clientes con Google + segundo factor (código de app autenticadora).
// Google no informa si una cuenta tiene la verificación en dos pasos, así que el
// segundo factor lo exige este portal: tras Google, cada empleado debe dar el
// código de 6 dígitos de su app autenticadora (se registra la primera vez).
// ============================================================================

import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { HttpError } from "./auth.js";

// ----------------------------------------------------------------- TOTP (RFC 6238)
const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32(buf: Buffer): string {
  let bits = 0;
  let valor = 0;
  let salida = "";
  for (const byte of buf) {
    valor = (valor << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      salida += ALFABETO[(valor >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) salida += ALFABETO[(valor << (5 - bits)) & 31];
  return salida;
}

export function desdeBase32(texto: string): Buffer {
  let bits = 0;
  let valor = 0;
  const bytes: number[] = [];
  for (const c of texto.replace(/=+$/, "").toUpperCase()) {
    const i = ALFABETO.indexOf(c);
    if (i < 0) throw new Error("Base32 inválido");
    valor = (valor << 5) | i;
    bits += 5;
    if (bits >= 8) {
      bytes.push((valor >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}

export function nuevoSecretoTotp(): string {
  return base32(randomBytes(20));
}

export function codigoTotp(secretoBase32: string, contador: number, digitos = 6): string {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(contador));
  const h = createHmac("sha1", desdeBase32(secretoBase32)).update(msg).digest();
  const o = h[h.length - 1] & 15;
  const n = ((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
  return String(n % 10 ** digitos).padStart(digitos, "0");
}

/** Contador del código que coincide (ventana ±1 de 30 s), o null. */
export function verificarTotp(secretoBase32: string, codigo: string, ahoraMs = Date.now()): number | null {
  if (!/^\d{6}$/.test(codigo)) return null;
  const actual = Math.floor(ahoraMs / 1000 / 30);
  for (const c of [actual, actual - 1, actual + 1]) {
    const esperado = Buffer.from(codigoTotp(secretoBase32, c));
    if (timingSafeEqual(esperado, Buffer.from(codigo))) return c;
  }
  return null;
}

export function urlOtpauth(correo: string, secreto: string): string {
  const etiqueta = encodeURIComponent(`Azahar Portal:${correo}`);
  return `otpauth://totp/${etiqueta}?secret=${secreto}&issuer=${encodeURIComponent("Azahar Portal")}&algorithm=SHA1&digits=6&period=30`;
}

// ----------------------------------------------------------- secreto cifrado en la base
function claveCifrado(): Buffer {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET no está configurado.");
  return createHash("sha256").update(`azahar-2fa:${s}`).digest();
}

export function cifrarSecreto(secreto: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", claveCifrado(), iv);
  const ct = Buffer.concat([c.update(secreto, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), ct]).toString("base64");
}

export function descifrarSecreto(guardado: string): string {
  const b = Buffer.from(guardado, "base64");
  const d = createDecipheriv("aes-256-gcm", claveCifrado(), b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString("utf8");
}

// ------------------------------------------------------------------- cookies firmadas
const COOKIE_GOOGLE = "azahar_g";
const COOKIE_2FA = "azahar_2fa";

function secretoAuth(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET no está configurado.");
  return s;
}

function leerCookie(req: VercelRequest, nombre: string): string | null {
  for (const parte of (req.headers.cookie ?? "").split(";")) {
    const [k, ...r] = parte.trim().split("=");
    if (k === nombre) return decodeURIComponent(r.join("="));
  }
  return null;
}

function poner(res: VercelResponse, req: VercelRequest, nombre: string, valor: string, maxAge: number) {
  const segura = req.headers["x-forwarded-proto"] === "https";
  const atributos = [`${nombre}=${encodeURIComponent(valor)}`, "HttpOnly", "Path=/", "SameSite=Lax", `Max-Age=${maxAge}`];
  if (segura) atributos.push("Secure");
  const previas = res.getHeader("Set-Cookie");
  const lista = Array.isArray(previas) ? previas.map(String) : previas ? [String(previas)] : [];
  res.setHeader("Set-Cookie", [...lista, atributos.join("; ")]);
}

export const cookieGoogle = {
  poner: (res: VercelResponse, req: VercelRequest, datos: { state: string; nonce: string; verifier: string }) =>
    poner(res, req, COOKIE_GOOGLE, jwt.sign(datos, secretoAuth(), { expiresIn: "10m", audience: "google-flujo" }), 600),
  leer: (req: VercelRequest): { state: string; nonce: string; verifier: string } | null => {
    const t = leerCookie(req, COOKIE_GOOGLE);
    if (!t) return null;
    try {
      const p = jwt.verify(t, secretoAuth(), { algorithms: ["HS256"], audience: "google-flujo" }) as Record<string, unknown>;
      return typeof p.state === "string" && typeof p.nonce === "string" && typeof p.verifier === "string"
        ? { state: p.state, nonce: p.nonce, verifier: p.verifier }
        : null;
    } catch {
      return null;
    }
  },
  borrar: (res: VercelResponse, req: VercelRequest) => poner(res, req, COOKIE_GOOGLE, "", 0),
};

/** Cookie del paso «ya entró con Google, falta el código»: no abre ninguna sesión, solo sirve para /api/auth/login?r=2fa. */
export const cookie2fa = {
  poner: (res: VercelResponse, req: VercelRequest, empleadoId: string) =>
    poner(res, req, COOKIE_2FA, jwt.sign({ empleadoId }, secretoAuth(), { expiresIn: "10m", audience: "2fa-pendiente" }), 600),
  leer: (req: VercelRequest): string | null => {
    const t = leerCookie(req, COOKIE_2FA);
    if (!t) return null;
    try {
      const p = jwt.verify(t, secretoAuth(), { algorithms: ["HS256"], audience: "2fa-pendiente" }) as Record<string, unknown>;
      return typeof p.empleadoId === "string" ? p.empleadoId : null;
    } catch {
      return null;
    }
  },
  borrar: (res: VercelResponse, req: VercelRequest) => poner(res, req, COOKIE_2FA, "", 0),
};

// ----------------------------------------------------------------------- Google OAuth
const REDIRECT_PATH = "/api/auth/google/callback";

export function googleConfigurado(): boolean {
  return !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
}

/** Dirección de retorno registrada en Google: siempre el dominio de producción del portal. */
export function redirectUri(): string {
  const base = (process.env.PORTAL_PUBLIC_URL || "https://mi-azahar-portal.vercel.app").replace(/\/+$/, "");
  return `${base}${REDIRECT_PATH}`;
}

export function pkce(): { verifier: string; challenge: string } {
  const verifier = randomBytes(32).toString("base64url");
  return { verifier, challenge: createHash("sha256").update(verifier).digest("base64url") };
}

export function urlAutorizacion(state: string, nonce: string, challenge: string): string {
  const q = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: redirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${q}`;
}

/** Cambia el código por el id_token (llega directo de Google por TLS) y valida sus datos. Devuelve el correo verificado. */
export async function correoDeGoogle(code: string, verifier: string, nonce: string): Promise<{ correo: string; nombre: string }> {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: redirectUri(),
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new HttpError(401, "Google no confirmó el acceso.");
  const j = (await r.json()) as { id_token?: string };
  const partes = (j.id_token ?? "").split(".");
  if (partes.length !== 3) throw new HttpError(401, "Respuesta de Google inválida.");
  let c: Record<string, unknown>;
  try {
    c = JSON.parse(Buffer.from(partes[1], "base64url").toString("utf8"));
  } catch {
    throw new HttpError(401, "Respuesta de Google inválida.");
  }
  const okEmisor = c.iss === "https://accounts.google.com" || c.iss === "accounts.google.com";
  const vigente = typeof c.exp === "number" && c.exp * 1000 > Date.now();
  if (!okEmisor || c.aud !== process.env.GOOGLE_CLIENT_ID || !vigente || c.nonce !== nonce) throw new HttpError(401, "Respuesta de Google inválida.");
  if (c.email_verified !== true || typeof c.email !== "string") throw new HttpError(401, "Tu correo de Google no está verificado.");
  return { correo: c.email.trim().toLowerCase(), nombre: typeof c.name === "string" ? c.name : "" };
}
