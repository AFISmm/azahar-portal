// ============================================================================
// POST /api/empleados-crear
// ----------------------------------------------------------------------------
// Función serverless de Vercel. Crea un nuevo empleado "completo" (fila en
// `empleados`, con contraseña temporal hasheada) desde el módulo de
// Administración. Solo un administrador autenticado puede invocarla — la
// autorización se hace leyendo la cookie de sesión del que llama (ver
// api/_lib/auth.ts, requireAdmin), ya no con un token Bearer separado.
//
// Esta función NO se invoca mientras el portal corre en "modo demo" (sin
// backend configurado): en ese caso, src/lib/mockDataSource.ts crea el
// empleado directamente en memoria desde el cliente (ver
// src/components/admin/EmpleadoForm.tsx y src/pages/admin/AdminEmpleados.tsx).
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { HttpError, manejarError, requireAdmin } from "./_lib/auth.js";
import { crearEmpleadoYUsuario } from "./_lib/crearEmpleado.js";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, mensaje: "Método no permitido. Usa POST." });
  }

  try {
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

    // Se genera una contraseña temporal aleatoria: el admin la comparte por
    // un canal seguro y el empleado la cambia en su primer ingreso (ese
    // flujo de "cambiar contraseña" queda fuera del alcance de este cambio).
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
  } catch (err) {
    return manejarError(res, err);
  }
}
