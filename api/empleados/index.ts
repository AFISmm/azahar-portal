// ============================================================================
// GET  /api/empleados            -> listado completo, SOLO administradores.
// GET  /api/empleados?correo=... -> chequeo de existencia SIN autenticar.
// POST /api/empleados            -> alta manual de un empleado. Solo admin.
// ----------------------------------------------------------------------------
// El chequeo de existencia por correo existe porque /registro necesita
// verificar en el cliente si un correo ya está en uso ANTES de que exista
// cualquier sesión (ver src/lib/httpDataSource.ts, getEmpleadoByCorreo, y
// src/auth/AuthContext.tsx, registrar()). Como no hay sesión todavía, esta
// rama NUNCA puede exigir requireAdmin/requireAuth — pero por la misma razón
// jamás debe devolver más que un booleano de existencia: exponer el listado
// completo (o siquiera el nombre) de empleados sin autenticar sería una fuga
// de datos. La verificación real y definitiva del duplicado ocurre de todas
// formas del lado del servidor en /api/registro.ts (más la restricción
// `unique` en la base de datos), así que esta rama es solo una ayuda de UX,
// no el mecanismo de seguridad.
//
// El alta manual (POST) vivía antes en su propio archivo
// (api/empleados-crear.ts) — se fusionó aquí para no gastar dos funciones
// serverless del límite de 12 del plan Hobby de Vercel por un módulo tan
// simple. Mismo contrato HTTP que tenía ese endpoint (ver
// src/lib/httpDataSource.ts, createEmpleado).
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { HttpError, manejarError, requireAdmin } from "../_lib/auth.js";
import { mapEmpleadoRow, type EmpleadoRow } from "../_lib/mappers.js";
import { crearEmpleadoYUsuario } from "../_lib/crearEmpleado.js";

interface EmpleadoCrearPayload {
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  tipoContrato: string;
  fechaIngreso: string;
  diasVacacionesDisponibles: number;
  rol: "empleado" | "admin";
  salario?: number | null;
  telefono?: string | null;
  estado?: "activo" | "inactivo";
  passwordTemporal?: string;
}

function generarPasswordTemporal(): string {
  return `Azahar-${Math.random().toString(36).slice(2, 10)}!`;
}

async function listarOVerificar(req: VercelRequest, res: VercelResponse) {
  const correoParam = req.query.correo;
  const correo = Array.isArray(correoParam) ? correoParam[0] : correoParam;

  if (typeof correo === "string" && correo.trim()) {
    const { rows } = await sql<{ existe: boolean }>`
      select exists(select 1 from empleados where lower(correo) = lower(${correo.trim()})) as existe
    `;
    return res.status(200).json({ ok: true, existe: Boolean(rows[0]?.existe) });
  }

  await requireAdmin(req);
  const { rows } = await sql<EmpleadoRow>`select * from empleados order by nombre`;
  return res.status(200).json({ ok: true, empleados: rows.map(mapEmpleadoRow) });
}

async function crear(req: VercelRequest, res: VercelResponse) {
  // Solo un administrador autenticado puede crear empleados manualmente.
  await requireAdmin(req);

  const body = req.body as Partial<EmpleadoCrearPayload>;
  const camposRequeridos: (keyof EmpleadoCrearPayload)[] = [
    "nombre",
    "correo",
    "cargo",
    "departamento",
    "tipoContrato",
    "fechaIngreso",
    "diasVacacionesDisponibles",
    "rol",
  ];
  const faltantes = camposRequeridos.filter((campo) => body[campo] === undefined || body[campo] === null || body[campo] === "");
  if (faltantes.length > 0) {
    throw new HttpError(400, `Faltan campos requeridos: ${faltantes.join(", ")}`);
  }
  const payload = body as EmpleadoCrearPayload;

  // Se genera una contraseña temporal aleatoria: el admin la comparte por un
  // canal seguro y el empleado la cambia en su primer ingreso (ese flujo de
  // "cambiar contraseña" queda fuera del alcance de este cambio).
  const passwordTemporal = payload.passwordTemporal || generarPasswordTemporal();

  const empleado = await crearEmpleadoYUsuario({
    nombre: payload.nombre,
    correo: payload.correo,
    cargo: payload.cargo,
    departamento: payload.departamento,
    tipoContrato: payload.tipoContrato,
    fechaIngreso: payload.fechaIngreso,
    diasVacacionesDisponibles: payload.diasVacacionesDisponibles,
    rol: payload.rol,
    salario: payload.salario ?? null,
    telefono: payload.telefono ?? null,
    estado: payload.estado ?? "activo",
    password: passwordTemporal,
  });

  return res.status(201).json({
    ok: true,
    empleado,
    passwordTemporal,
    mensaje: "Empleado creado. Comparte la contraseña temporal por un canal seguro para que la cambie en su primer ingreso.",
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") return await listarOVerificar(req, res);
    if (req.method === "POST") return await crear(req, res);

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
  } catch (err) {
    return manejarError(res, err);
  }
}
