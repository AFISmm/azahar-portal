// ============================================================================
// POST /api/registro
// ----------------------------------------------------------------------------
// Función serverless de Vercel que procesa el autorregistro de nuevos
// empleados desde /registro:
//
//   1. Verifica en la tabla `empleados` (la "memoria" persistente de usuarios
//      ya registrados, en Postgres) que el correo no tenga ya una cuenta —
//      evita registros duplicados. La restricción `unique` de la columna
//      `correo` en la base de datos es el respaldo final ante una posible
//      condición de carrera entre dos registros simultáneos.
//   2. Si el correo está disponible, crea la fila de empleado (reutilizando
//      api/_lib/crearEmpleado.ts, que hashea la contraseña con bcrypt) y
//      responde con un mensaje de bienvenida.
//
// Nota: esta ruta reemplazó a una versión anterior que delegaba estos dos
// pasos a un equipo de agentes de Claude (@anthropic-ai/sdk). Se simplificó
// a lógica directa porque el chequeo de duplicados no necesita un modelo de
// lenguaje de por medio (la base de datos ya lo resuelve de forma confiable
// y gratuita) y así se evita depender de una cuenta de facturación de un
// proveedor de IA solo para esta función.
//
// Requiere estas variables de entorno en el proyecto de Vercel (Project
// Settings -> Environment Variables), nunca en un archivo del cliente:
//   - POSTGRES_URL  (se define sola al conectar un almacenamiento Postgres)
//   - AUTH_SECRET   (firma la cookie de sesión)
//
// Si falta alguna, responde de inmediato con 500 { motivo: "config_faltante" }.
// El cliente (ver src/auth/AuthContext.tsx, función `registrar`) interpreta
// esa respuesta — o un error de red si el endpoint ni siquiera existe en
// este entorno — como señal para usar el registro local en modo demo.
//
// En éxito, deja al usuario con sesión iniciada (cookie de sesión, ver
// api/_lib/auth.ts) para que el frontend no tenga que llamar aparte a
// /api/auth/login.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./_lib/db.js";
import { HttpError, crearTokenSesion, setearCookieSesion } from "./_lib/auth.js";
import { crearEmpleadoYUsuario } from "./_lib/crearEmpleado.js";

interface RegistrarPayload {
  nombre: string;
  correo: string;
  password: string;
  cargo: string;
  departamento: string;
  tipoContrato: string;
  fechaIngreso: string;
}

interface EmpleadoEncontrado {
  id: string;
  nombre: string;
}

function mensajeBienvenida(payload: RegistrarPayload): string {
  const primerNombre = payload.nombre.trim().split(/\s+/)[0] ?? payload.nombre;
  return `¡Bienvenido(a) a Azahar Coffee Company, ${primerNombre}! Nos alegra que te unas como ${payload.cargo} en ${payload.departamento}.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, motivo: "error", mensaje: "Método no permitido. Usa POST." });
  }

  const postgresUrl = process.env.POSTGRES_URL;
  const authSecret = process.env.AUTH_SECRET;

  // Verificación explícita de configuración ANTES de tocar la base de datos:
  // así devolvemos un 500 claro y predecible en vez de dejar que la conexión
  // a Postgres falle de forma confusa.
  if (!postgresUrl || !authSecret) {
    return res.status(500).json({
      ok: false,
      motivo: "config_faltante",
      mensaje: "El servidor no tiene configuradas las credenciales necesarias (POSTGRES_URL, AUTH_SECRET).",
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

  try {
    // La tabla `empleados` es la memoria persistente: si ya existe un
    // registro con este correo, se rechaza antes de intentar crear nada.
    const { rows } = await sql<EmpleadoEncontrado>`
      select id, nombre from empleados where lower(correo) = lower(${payload.correo}) limit 1
    `;
    const empleadoExistente = rows[0] ?? null;
    if (empleadoExistente) {
      return res.status(409).json({
        ok: false,
        motivo: "correo_duplicado",
        mensaje: `El correo ya está registrado por ${empleadoExistente.nombre}.`,
      });
    }

    const empleado = await crearEmpleadoYUsuario({
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

    // Deja al usuario recién registrado con sesión iniciada de inmediato.
    const token = crearTokenSesion(empleado.id);
    setearCookieSesion(res, token, req);

    return res.status(200).json({ ok: true, empleado, mensajeBienvenida: mensajeBienvenida(payload) });
  } catch (err) {
    if (err instanceof HttpError && err.status === 409) {
      return res.status(409).json({ ok: false, motivo: "correo_duplicado", mensaje: err.message });
    }
    const mensaje = err instanceof Error ? err.message : "Error inesperado procesando el registro.";
    return res.status(500).json({ ok: false, motivo: "error", mensaje });
  }
}
