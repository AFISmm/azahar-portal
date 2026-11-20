// ============================================================================
// POST   /api/auth/login  -> verifica correo + contraseña contra `empleados`
//                            (bcrypt) y, si coinciden, establece la cookie de
//                            sesión (ver api/_lib/auth.ts).
// DELETE /api/auth/login  -> cierra sesión (limpia la cookie). No requiere que
//                            la sesión sea válida.
// ----------------------------------------------------------------------------
// El logout vive aquí (no en api/auth/logout.ts) para no gastar una función
// serverless más del límite de 12 del plan Hobby de Vercel.
//
// Acceso de clientes con Google (+ código de app autenticadora), también aquí para no
// gastar otra función (rutas públicas por rewrite en vercel.json):
//   GET  /api/auth/google            (?r=google)    -> lleva a Google
//   GET  /api/auth/google/callback   (?r=google-cb) -> vuelve de Google y pide el código
//   GET  /api/auth/login?r=2fa                      -> estado del segundo factor (y QR si falta registrarlo)
//   POST /api/auth/login?r=2fa                      -> verifica el código y abre la sesión
// Google solo identifica a quien ya es empleado (mismo correo registrado) y NUNCA a las cuentas
// @mercurymethods.com, que tienen acceso total (api/_lib/acceso.ts) y solo entran con contraseña.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { sql } from "../_lib/db.js";
import { HttpError, crearTokenSesion, limpiarCookieSesion, manejarError, setearCookieSesion } from "../_lib/auth.js";
import { randomBytes } from "node:crypto";
import { tieneAccesoTotal } from "../_lib/acceso.js";
import {
  cifrarSecreto,
  cookie2fa,
  cookieGoogle,
  correoDeGoogle,
  descifrarSecreto,
  googleConfigurado,
  nuevoSecretoTotp,
  pkce,
  urlAutorizacion,
  urlOtpauth,
  verificarTotp,
} from "../_lib/google2fa.js";
import { aplicarCors } from "../_lib/cors.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";

interface LoginPayload {
  correo: string;
  password: string;
}

async function login(req: VercelRequest, res: VercelResponse) {
  const body = req.body as Partial<LoginPayload>;
  const correo = body.correo?.trim();
  const password = body.password;
  if (!correo || !password) {
    return res.status(400).json({ ok: false, mensaje: "Correo y contraseña son obligatorios." });
  }

  const { rows } = await sql<EmpleadoRow>`select * from empleados where lower(correo) = lower(${correo}) limit 1`;
  const fila = rows[0];
  const coincide = fila ? await bcrypt.compare(password, fila.password_hash) : false;

  if (!fila || !coincide) {
    return res.status(401).json({ ok: false, mensaje: "Correo o contraseña incorrectos." });
  }
  if (fila.estado !== "activo") {
    return res.status(403).json({ ok: false, mensaje: "Tu cuenta está desactivada. Contacta a un administrador." });
  }

  const token = crearTokenSesion(fila.id);
  setearCookieSesion(res, token, req);
  return res.status(200).json({ ok: true, empleado: mapEmpleadoRow(fila) });
}

// ----------------------------------------------------------- Google + segundo factor
const MAX_INTENTOS = 5;
const BLOQUEO_MIN = 10;

async function asegurarTabla2fa() {
  await sql`create table if not exists empleado_2fa (
    empleado_id uuid primary key references empleados(id) on delete cascade,
    secreto_cifrado text not null,
    activado boolean not null default false,
    ultimo_contador bigint not null default 0,
    intentos integer not null default 0,
    bloqueado_hasta timestamptz,
    creado_en timestamptz not null default now()
  )`;
}

interface Fila2fa {
  secreto_cifrado: string;
  activado: boolean;
  ultimo_contador: string | number;
  intentos: number;
  bloqueado_hasta: string | null;
}

function irA(res: VercelResponse, ruta: string) {
  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, ruta);
}

async function googleInicio(req: VercelRequest, res: VercelResponse) {
  if (!googleConfigurado()) return irA(res, "/login?google=no_disponible");
  const state = randomBytes(24).toString("base64url");
  const nonce = randomBytes(24).toString("base64url");
  const { verifier, challenge } = pkce();
  cookieGoogle.poner(res, req, { state, nonce, verifier });
  return irA(res, urlAutorizacion(state, nonce, challenge));
}

async function googleRetorno(req: VercelRequest, res: VercelResponse) {
  const flujo = cookieGoogle.leer(req);
  cookieGoogle.borrar(res, req);
  const code = typeof req.query.code === "string" ? req.query.code : "";
  const state = typeof req.query.state === "string" ? req.query.state : "";
  if (req.query.error) return irA(res, "/login?google=cancelado");
  if (!flujo || !code || state !== flujo.state) return irA(res, "/login?google=error");
  try {
    const { correo } = await correoDeGoogle(code, flujo.verifier, flujo.nonce);
    // Las cuentas con acceso total solo entran con contraseña: Google nunca las abre.
    if (tieneAccesoTotal(correo)) return irA(res, "/login?google=staff");
    const { rows } = await sql<EmpleadoRow>`select * from empleados where lower(correo) = ${correo} limit 1`;
    const fila = rows[0];
    if (!fila || fila.estado !== "activo") return irA(res, "/login?google=no_registrado");
    cookie2fa.poner(res, req, fila.id);
    return irA(res, "/verificar-2fa");
  } catch {
    return irA(res, "/login?google=error");
  }
}

async function estado2fa(req: VercelRequest, res: VercelResponse) {
  const id = cookie2fa.leer(req);
  if (!id) throw new HttpError(401, "Vuelve a entrar con Google.");
  const { rows: emp } = await sql<EmpleadoRow>`select * from empleados where id = ${id} limit 1`;
  if (!emp[0] || emp[0].estado !== "activo") throw new HttpError(401, "Vuelve a entrar con Google.");
  await asegurarTabla2fa();
  const { rows } = await sql<Fila2fa>`select * from empleado_2fa where empleado_id = ${id} limit 1`;
  if (rows[0]?.activado) return res.status(200).json({ ok: true, enrolado: true, correo: emp[0].correo });
  // Aún sin registrar: se crea (o se reutiliza) el secreto y se entrega UNA vez para el QR.
  let secreto: string;
  if (rows[0]) secreto = descifrarSecreto(rows[0].secreto_cifrado);
  else {
    secreto = nuevoSecretoTotp();
    await sql`insert into empleado_2fa (empleado_id, secreto_cifrado) values (${id}, ${cifrarSecreto(secreto)}) on conflict do nothing`;
    const { rows: de } = await sql<Fila2fa>`select * from empleado_2fa where empleado_id = ${id} limit 1`;
    secreto = descifrarSecreto(de[0].secreto_cifrado);
  }
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ ok: true, enrolado: false, correo: emp[0].correo, secreto, otpauth: urlOtpauth(emp[0].correo, secreto) });
}

async function verificar2fa(req: VercelRequest, res: VercelResponse) {
  const id = cookie2fa.leer(req);
  if (!id) throw new HttpError(401, "Vuelve a entrar con Google.");
  const codigo = String((req.body as { codigo?: unknown } | undefined)?.codigo ?? "").replace(/\s+/g, "");
  const { rows: emp } = await sql<EmpleadoRow>`select * from empleados where id = ${id} limit 1`;
  if (!emp[0] || emp[0].estado !== "activo") throw new HttpError(401, "Vuelve a entrar con Google.");
  await asegurarTabla2fa();
  const { rows } = await sql<Fila2fa>`select * from empleado_2fa where empleado_id = ${id} limit 1`;
  const fila = rows[0];
  if (!fila) throw new HttpError(400, "Primero abre la pantalla para registrar tu app autenticadora.");
  if (fila.bloqueado_hasta && new Date(fila.bloqueado_hasta).getTime() > Date.now()) {
    throw new HttpError(429, "Demasiados intentos. Espera unos minutos y vuelve a entrar con Google.");
  }
  const contador = verificarTotp(descifrarSecreto(fila.secreto_cifrado), codigo);
  // Un código ya usado no sirve otra vez (evita repetirlo si alguien lo vio).
  if (contador === null || contador <= Number(fila.ultimo_contador)) {
    const intentos = fila.intentos + 1;
    if (intentos >= MAX_INTENTOS) {
      await sql`update empleado_2fa set intentos = 0, bloqueado_hasta = now() + make_interval(mins => ${BLOQUEO_MIN}) where empleado_id = ${id}`;
    } else {
      await sql`update empleado_2fa set intentos = ${intentos} where empleado_id = ${id}`;
    }
    throw new HttpError(401, "Código incorrecto o vencido.");
  }
  await sql`update empleado_2fa set activado = true, ultimo_contador = ${contador}, intentos = 0, bloqueado_hasta = null where empleado_id = ${id}`;
  // setearCookieSesion fija Set-Cookie y cookie2fa.borrar lo agrega: este orden conserva las dos.
  setearCookieSesion(res, crearTokenSesion(id), req);
  cookie2fa.borrar(res, req);
  return res.status(200).json({ ok: true, empleado: mapEmpleadoRow(emp[0]) });
}

async function logout(req: VercelRequest, res: VercelResponse) {
  limpiarCookieSesion(res, req);
  return res.status(200).json({ ok: true });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (aplicarCors(req, res)) return;
  try {
    const r = req.query.r;
    if (req.method === "GET" && r === "google") return await googleInicio(req, res);
    if (req.method === "GET" && r === "google-cb") return await googleRetorno(req, res);
    if (req.method === "GET" && r === "2fa") return await estado2fa(req, res);
    if (req.method === "POST" && r === "2fa") return await verificar2fa(req, res);
    if (req.method === "POST") return await login(req, res);
    if (req.method === "DELETE") return await logout(req, res);

    res.setHeader("Allow", "GET, POST, DELETE, OPTIONS");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
