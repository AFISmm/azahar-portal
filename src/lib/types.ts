// Tipos de dominio compartidos por toda la aplicación.
// Deben reflejar (en camelCase) las tablas definidas en db/schema.sql
// (snake_case en la base de datos).

export type Rol = "empleado" | "admin";
export type EstadoEmpleado = "activo" | "inactivo";

export interface Empleado {
  id: string;
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  tipoContrato: string;
  fechaIngreso: string; // ISO yyyy-MM-dd
  diasVacacionesDisponibles: number;
  salario: number | null;
  rol: Rol;
  estado: EstadoEmpleado;
  avatarUrl: string | null;
  telefono: string | null;
  createdAt: string;
}

export type NuevoEmpleadoInput = Omit<Empleado, "id" | "createdAt" | "estado" | "avatarUrl" | "telefono" | "salario"> &
  Partial<Pick<Empleado, "estado" | "avatarUrl" | "telefono" | "salario">>;

export type SolicitudTipo = "vacaciones" | "incapacidad" | "documento" | "certificado";
export type SolicitudEstado = "pendiente" | "aprobada" | "rechazada";

export interface Solicitud {
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

export type NuevaSolicitudInput = Pick<
  Solicitud,
  "empleadoId" | "tipo" | "fechaInicio" | "fechaFin" | "motivo"
>;

export interface Documento {
  id: string;
  empleadoId: string;
  nombre: string;
  tipo: string;
  url: string | null;
  subidoEn: string;
  subidoPor: string | null;
}

export type NuevoDocumentoInput = Pick<Documento, "empleadoId" | "nombre" | "tipo"> &
  Partial<Pick<Documento, "url" | "subidoPor">>;

export type EstadoNomina = "pendiente" | "pagado";

export interface NominaPago {
  id: string;
  empleadoId: string;
  periodo: string;
  fechaPago: string; // ISO yyyy-MM-dd
  monto: number;
  estado: EstadoNomina;
}
