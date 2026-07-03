// ============================================================================
// Lógica compartida para crear un empleado "completo": un usuario de
// autenticación en Supabase (auth.users) + su fila correspondiente en la
// tabla `empleados`. La usan tanto /api/empleados-crear.ts (creación manual
// por un admin) como /api/agentes/registrar.ts (autorregistro vía el equipo
// de agentes de IA).
// ============================================================================

import type { SupabaseClient } from "@supabase/supabase-js";

export interface CrearEmpleadoInput {
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
  password: string;
}

export interface EmpleadoCreado {
  id: string;
  auth_user_id: string;
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  tipo_contrato: string;
  fecha_ingreso: string;
  dias_vacaciones_disponibles: number;
  rol: string;
  salario: number | null;
  telefono: string | null;
  [key: string]: unknown;
}

/**
 * Crea el usuario de Supabase Auth y su fila en `empleados` en una sola
 * operación. Si la inserción en `empleados` falla, revierte la creación del
 * usuario de auth para no dejar cuentas huérfanas.
 *
 * `supabaseAdmin` debe ser un cliente construido con la llave de servicio
 * (SUPABASE_SERVICE_ROLE_KEY) — nunca la llave anónima.
 */
export async function crearEmpleadoYUsuario(
  supabaseAdmin: SupabaseClient,
  input: CrearEmpleadoInput,
): Promise<EmpleadoCreado> {
  const { data: nuevoUsuario, error: errorCrearUsuario } = await supabaseAdmin.auth.admin.createUser({
    email: input.correo,
    password: input.password,
    email_confirm: true,
  });

  if (errorCrearUsuario || !nuevoUsuario.user) {
    throw new Error(errorCrearUsuario?.message ?? "No se pudo crear el usuario de autenticación.");
  }

  const { data: filaEmpleado, error: errorInsertar } = await supabaseAdmin
    .from("empleados")
    .insert({
      auth_user_id: nuevoUsuario.user.id,
      nombre: input.nombre,
      correo: input.correo,
      cargo: input.cargo,
      departamento: input.departamento,
      tipo_contrato: input.tipoContrato,
      fecha_ingreso: input.fechaIngreso,
      dias_vacaciones_disponibles: input.diasVacacionesDisponibles,
      rol: input.rol,
      salario: input.salario ?? null,
      telefono: input.telefono ?? null,
    })
    .select("*")
    .single();

  if (errorInsertar) {
    // Revertimos la creación del usuario de auth para no dejar cuentas huérfanas
    // sin fila de empleado asociada.
    await supabaseAdmin.auth.admin.deleteUser(nuevoUsuario.user.id);
    throw new Error(errorInsertar.message);
  }

  return filaEmpleado as EmpleadoCreado;
}
