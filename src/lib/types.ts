// Tipos de dominio compartidos por toda la aplicación.
// Deben reflejar (en camelCase) las tablas definidas en db/schema.sql
// (snake_case en la base de datos).

export type Rol = "empleado" | "admin";
export type EstadoEmpleado = "activo" | "inactivo";
export type TipoCuenta = "empleado" | "desarrollador";

/**
 * Módulos con permiso configurable. Cada empleado tiene, por módulo, 'ver' o
 * 'editar' ('editar' implica 'ver'); sin entrada = sin acceso. Los asigna un
 * administrador en Gestión de usuarios. Inicio, Nómina personal y Mi perfil son
 * para todos y no aparecen aquí.
 */
export type Modulo = "negocio" | "rrhh" | "usuarios" | "trazabilidad" | "pos";
export type NivelModulo = "ver" | "editar";
export type PermisosModulos = Partial<Record<Modulo, NivelModulo>>;

export const MODULOS_INFO: { clave: Modulo; nombre: string; descripcion: string }[] = [
  { clave: "negocio", nombre: "Gestión del negocio", descripcion: "Gestión estratégica, comercial, operativa e información general" },
  { clave: "rrhh", nombre: "RRHH y nómina", descripcion: "Solicitudes, incapacidades, documentos, empleados y nómina" },
  { clave: "usuarios", nombre: "Gestión de usuarios", descripcion: "Cuentas, accesos y permisos por módulo" },
  { clave: "trazabilidad", nombre: "Trazabilidad", descripcion: "Finca, beneficiado, tueste, empaque y QR" },
  { clave: "pos", nombre: "Punto de venta", descripcion: "Caja, cocina e historial de ventas" },
];

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
  /** true cuando la contraseña la eligió un admin: fuerza cambiarla en el primer ingreso antes de usar el resto del portal. */
  debeCambiarPassword: boolean;
  /** Etapas de trazabilidad habilitadas para la cuenta; vacío = sin acceso al módulo. Las asigna un admin en Admin > Usuarios. */
  /** true = correo del dominio corporativo (@mercurymethods.com): acceso total fijo, no editable. */
  accesoTotal?: boolean;
  /** Nivel por módulo (ver / editar). Las cuentas @mercurymethods.com lo tienen todo en 'editar'. */
  permisosModulos: PermisosModulos;
  createdAt: string;
}

export type NuevoEmpleadoInput = Omit<
  Empleado,
  | "id"
  | "createdAt"
  | "estado"
  | "avatarUrl"
  | "telefono"
  | "salario"
  | "fechaNacimiento"
  | "numeroIdentificacion"
  | "username"
  | "tipoCuenta"
  | "debeCambiarPassword"
  | "permisosModulos"
> &
  Partial<Pick<Empleado, "estado" | "avatarUrl" | "telefono" | "salario" | "fechaNacimiento" | "numeroIdentificacion" | "username" | "tipoCuenta" | "permisosModulos">> & {
    /** Contraseña inicial elegida por el admin al crear la cuenta (alta manual). Si no se manda, el servidor genera una aleatoria. */
    passwordTemporal?: string;
  };

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
  adjuntoUrl: string | null;
  adjuntoNombre: string | null;
  estado: PqrEstado;
  comentario: string | null;
  respuestaAdjuntoUrl: string | null;
  respuestaAdjuntoNombre: string | null;
  resueltoEn: string | null;
  creadoEn: string;
}

export type NuevaPqrInput = Pick<Pqr, "nombre" | "cedula" | "correo" | "problema"> & {
  adminDestinoId: string;
  adjuntoUrl?: string | null;
  adjuntoNombre?: string | null;
};

export interface ArchivoSubido {
  url: string;
  nombre: string;
}

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
