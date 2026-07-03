// ============================================================================
// POST /api/empleados-crear
// ----------------------------------------------------------------------------
// Función serverless de Vercel. Crea un nuevo empleado "completo": un usuario
// de autenticación en Supabase (auth.users) + su fila correspondiente en la
// tabla `empleados`.
//
// Requiere las siguientes variables de entorno configuradas directamente en
// el proyecto de Vercel (Project Settings -> Environment Variables), NUNCA en
// un archivo .env del cliente:
//   - SUPABASE_URL
//   - SUPABASE_SERVICE_ROLE_KEY
//
// Esta función NO se invoca mientras el portal corre en "modo demo" (sin
// Supabase configurado): en ese caso, src/lib/mockDataSource.ts crea el
// empleado directamente en memoria desde el cliente (ver
// src/components/admin/EmpleadoForm.tsx y src/pages/admin/AdminEmpleados.tsx).
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { crearEmpleadoYUsuario } from "./_lib/crearEmpleado";

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
  passwordTemporal?: string;
}

function generarPasswordTemporal(): string {
  return `Azahar-${Math.random().toString(36).slice(2, 10)}!`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido. Usa POST." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      error: "El servidor no tiene configuradas SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.",
    });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 1. Verificar que quien llama está autenticado y es administrador.
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  if (!token) {
    return res.status(401).json({ error: "Falta el encabezado Authorization: Bearer <token>." });
  }

  const { data: usuarioData, error: errorUsuario } = await supabaseAdmin.auth.getUser(token);
  if (errorUsuario || !usuarioData.user) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }

  const { data: empleadoSolicitante, error: errorEmpleado } = await supabaseAdmin
    .from("empleados")
    .select("id, rol")
    .eq("auth_user_id", usuarioData.user.id)
    .maybeSingle();

  if (errorEmpleado || !empleadoSolicitante || empleadoSolicitante.rol !== "admin") {
    return res.status(403).json({ error: "Solo un administrador puede crear empleados." });
  }

  // 2. Validar el cuerpo de la solicitud.
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
    return res.status(400).json({ error: `Faltan campos requeridos: ${faltantes.join(", ")}` });
  }

  const payload = body as EmpleadoCrearPayload;

  // 3. Crear el usuario de autenticación (con contraseña temporal) y su fila
  //    en `empleados`, delegando la lógica compartida a api/_lib/crearEmpleado.ts.
  const passwordTemporal = payload.passwordTemporal || generarPasswordTemporal();

  try {
    const filaEmpleado = await crearEmpleadoYUsuario(supabaseAdmin, {
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
      password: passwordTemporal,
    });

    return res.status(201).json({
      empleado: filaEmpleado,
      passwordTemporal,
      mensaje: "Empleado creado. Comparte la contraseña temporal por un canal seguro para que la cambie en su primer ingreso.",
    });
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : "No se pudo crear el empleado.";
    return res.status(400).json({ error: mensaje });
  }
}
