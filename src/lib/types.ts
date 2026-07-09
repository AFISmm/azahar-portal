// Tipos de dominio compartidos por toda la aplicación.
// Deben reflejar (en camelCase) las tablas definidas en db/schema.sql
// (snake_case en la base de datos).

export type Rol = "empleado" | "admin";
export type EstadoEmpleado = "activo" | "inactivo";
export type TipoCuenta = "empleado" | "desarrollador";

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
  fechaNacimiento: string | null;
  numeroIdentificacion: string | null;
  username: string | null;
  tipoCuenta: TipoCuenta;
  createdAt: string;
}

export type NuevoEmpleadoInput = Omit<
  Empleado,
  "id" | "createdAt" | "estado" | "avatarUrl" | "telefono" | "salario" | "fechaNacimiento" | "numeroIdentificacion" | "username" | "tipoCuenta"
> &
  Partial<Pick<Empleado, "estado" | "avatarUrl" | "telefono" | "salario" | "fechaNacimiento" | "numeroIdentificacion" | "username" | "tipoCuenta">>;

export interface PerfilPropioInput {
  correo?: string;
  password?: string;
  username?: string;
}

export type PqrEstado = "pendiente" | "resuelta";

export interface Pqr {
  id: string;
  empleadoId: string;
  nombre: string;
  cedula: string | null;
  correo: string;
  adminDestinoId: string | null;
  problema: string;
  estado: PqrEstado;
  creadoEn: string;
}

export type NuevaPqrInput = Pick<Pqr, "nombre" | "cedula" | "correo" | "problema"> & { adminDestinoId: string };

export interface DestinoPqr {
  id: string;
  nombre: string;
}

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

export interface Finca {
  id: string;
  codigo: string;
  nombre: string;
  vereda: string | null;
  municipio: string;
  departamento: string;
  propietario: string;
  cedulaPropietario: string;
  areaTotal: number;
  areaCafe: number;
  numeroArboles: number;
  variedad: string;
  latitud: number | null;
  longitud: number | null;
  creadoEn: string;
}

export type NuevaFincaInput = Omit<Finca, "id" | "codigo" | "creadoEn" | "vereda" | "latitud" | "longitud"> &
  Partial<Pick<Finca, "vereda" | "latitud" | "longitud">>;

export interface CertificadoFinca {
  id: string;
  fincaId: string;
  nombre: string;
  entidadCertificadora: string;
  numeroCertificado: string | null;
  fechaEmision: string;
  fechaVencimiento: string | null;
  creadoEn: string;
  creadoPor: string | null;
}

export type NuevoCertificadoInput = Omit<CertificadoFinca, "id" | "creadoEn" | "creadoPor" | "numeroCertificado" | "fechaVencimiento"> &
  Partial<Pick<CertificadoFinca, "numeroCertificado" | "fechaVencimiento">>;
