// ============================================================================
// Lógica compartida para crear un empleado "completo": hashea la contraseña
// con bcrypt e inserta la fila en `empleados` (Postgres). Ya no existe un
// paso separado de "crear usuario de autenticación": cada empleado ES su
// propia identidad de login (correo + password_hash), no hay una tabla
// auth.users como en Supabase.
//
// La usan tanto /api/empleados-crear.ts (alta manual por un admin) como
// /api/agentes/registrar.ts (autorregistro vía el equipo de agentes de IA).
// ============================================================================

import bcrypt from "bcryptjs";
import { sql } from "./db.js";
import { HttpError } from "./auth.js";
import { mapEmpleadoRow, type EmpleadoPublico, type EmpleadoRow } from "./mappers.js";

const RONDAS_SAL = 10;

export interface CrearEmpleadoInput {
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  tipoContrato: string;
  fechaIngreso: string;
  diasVacacionesDisponibles: number;
  rol: "empleado" | "admin";
  password: string;
  salario?: number | null;
  telefono?: string | null;
  estado?: "activo" | "inactivo";
}

function esErrorCorreoDuplicado(err: unknown): boolean {
  // Código de error estándar de Postgres para violación de restricción unique.
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}

/**
 * Hashea la contraseña e inserta la fila en `empleados`. Si el correo ya
 * existe, la restricción `unique` de la base de datos lanza un error con
 * código 23505, que aquí se traduce a un HttpError 409 reconocible para que
 * los callers (rutas de /api) lo devuelvan tal cual al cliente.
 */
export async function crearEmpleadoYUsuario(input: CrearEmpleadoInput): Promise<EmpleadoPublico> {
  const passwordHash = await bcrypt.hash(input.password, RONDAS_SAL);

  try {
    const { rows } = await sql<EmpleadoRow>`
      insert into empleados (
        nombre, correo, password_hash, cargo, departamento, tipo_contrato,
        fecha_ingreso, dias_vacaciones_disponibles, salario, rol, estado, telefono
      ) values (
        ${input.nombre},
        ${input.correo},
        ${passwordHash},
        ${input.cargo},
        ${input.departamento},
        ${input.tipoContrato},
        ${input.fechaIngreso},
        ${input.diasVacacionesDisponibles},
        ${input.salario ?? null},
        ${input.rol},
        ${input.estado ?? "activo"},
        ${input.telefono ?? null}
      )
      returning *
    `;
    return mapEmpleadoRow(rows[0]);
  } catch (err) {
    if (esErrorCorreoDuplicado(err)) {
      throw new HttpError(409, "Ya existe una cuenta registrada con ese correo.");
    }
    throw err;
  }
}
