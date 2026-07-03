// ============================================================================
// Tipos de fila de Postgres (snake_case) y funciones de mapeo a los tipos
// camelCase que consume el frontend (ver src/lib/types.ts).
// ----------------------------------------------------------------------------
// Estos tipos se duplican intencionalmente respecto a src/lib/types.ts: las
// funciones de /api viven fuera del proyecto de TypeScript de Vite (ver
// tsconfig.json/tsconfig.app.json, que solo incluyen "src") y se verifican con
// una invocación aislada de `tsc` (ver README.md). Mantenerlas separadas evita
// acoplar los dos entornos de build.
//
// Nota importante sobre `numeric`: el driver de Postgres devuelve las
// columnas `numeric` como strings (para no perder precisión), así que todas
// las funciones de mapeo convierten explícitamente esos campos con `Number(...)`.
// ============================================================================

export type Rol = "empleado" | "admin";
export type EstadoEmpleado = "activo" | "inactivo";

export interface EmpleadoRow {
  id: string;
  nombre: string;
  correo: string;
  password_hash: string;
  cargo: string;
  departamento: string;
  tipo_contrato: string;
  fecha_ingreso: string;
  dias_vacaciones_disponibles: string | number;
  salario: string | number | null;
  rol: Rol;
  estado: EstadoEmpleado;
  avatar_url: string | null;
  telefono: string | null;
  created_at: string;
}

/** Empleado tal como se expone al frontend: nunca incluye `password_hash`. */
export interface EmpleadoPublico {
  id: string;
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  tipoContrato: string;
  fechaIngreso: string;
  diasVacacionesDisponibles: number;
  salario: number | null;
  rol: Rol;
  estado: EstadoEmpleado;
  avatarUrl: string | null;
  telefono: string | null;
  createdAt: string;
}

export function mapEmpleadoRow(row: EmpleadoRow): EmpleadoPublico {
  return {
    id: row.id,
    nombre: row.nombre,
    correo: row.correo,
    cargo: row.cargo,
    departamento: row.departamento,
    tipoContrato: row.tipo_contrato,
    fechaIngreso: row.fecha_ingreso,
    diasVacacionesDisponibles: Number(row.dias_vacaciones_disponibles),
    salario: row.salario === null ? null : Number(row.salario),
    rol: row.rol,
    estado: row.estado,
    avatarUrl: row.avatar_url,
    telefono: row.telefono,
    createdAt: row.created_at,
  };
}

export type SolicitudTipo = "vacaciones" | "incapacidad" | "documento" | "certificado";
export type SolicitudEstado = "pendiente" | "aprobada" | "rechazada";

export interface SolicitudRow {
  id: string;
  empleado_id: string;
  tipo: SolicitudTipo;
  estado: SolicitudEstado;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  motivo: string | null;
  creado_en: string;
  resuelto_en: string | null;
  resuelto_por: string | null;
}

export interface SolicitudPublica {
  id: string;
  empleadoId: string;
  tipo: SolicitudTipo;
  estado: SolicitudEstado;
  fechaInicio: string | null;
  fechaFin: string | null;
  motivo: string | null;
  creadoEn: string;
  resueltoEn: string | null;
  resueltoPor: string | null;
}

export function mapSolicitudRow(row: SolicitudRow): SolicitudPublica {
  return {
    id: row.id,
    empleadoId: row.empleado_id,
    tipo: row.tipo,
    estado: row.estado,
    fechaInicio: row.fecha_inicio,
    fechaFin: row.fecha_fin,
    motivo: row.motivo,
    creadoEn: row.creado_en,
    resueltoEn: row.resuelto_en,
    resueltoPor: row.resuelto_por,
  };
}

export interface DocumentoRow {
  id: string;
  empleado_id: string;
  nombre: string;
  tipo: string;
  url: string | null;
  subido_en: string;
  subido_por: string | null;
}

export interface DocumentoPublico {
  id: string;
  empleadoId: string;
  nombre: string;
  tipo: string;
  url: string | null;
  subidoEn: string;
  subidoPor: string | null;
}

export function mapDocumentoRow(row: DocumentoRow): DocumentoPublico {
  return {
    id: row.id,
    empleadoId: row.empleado_id,
    nombre: row.nombre,
    tipo: row.tipo,
    url: row.url,
    subidoEn: row.subido_en,
    subidoPor: row.subido_por,
  };
}

export type EstadoNomina = "pendiente" | "pagado";

export interface NominaPagoRow {
  id: string;
  empleado_id: string;
  periodo: string;
  fecha_pago: string;
  monto: string | number;
  estado: EstadoNomina;
}

export interface NominaPagoPublico {
  id: string;
  empleadoId: string;
  periodo: string;
  fechaPago: string;
  monto: number;
  estado: EstadoNomina;
}

export function mapNominaPagoRow(row: NominaPagoRow): NominaPagoPublico {
  return {
    id: row.id,
    empleadoId: row.empleado_id,
    periodo: row.periodo,
    fechaPago: row.fecha_pago,
    monto: Number(row.monto),
    estado: row.estado,
  };
}
