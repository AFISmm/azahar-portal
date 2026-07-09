import type {
  ArchivoSubido,
  CertificadoFinca,
  DestinoPqr,
  Documento,
  Empleado,
  EstadoNomina,
  Finca,
  NominaPago,
  NuevaPqrInput,
  NuevoCertificadoInput,
  NuevoDocumentoInput,
  NuevoEmpleadoInput,
  NuevaFincaInput,
  NuevaSolicitudInput,
  PerfilPropioInput,
  Pqr,
  PqrEstado,
  Solicitud,
  SolicitudEstado,
} from "./types";
import { IS_DEMO_MODE } from "./backendMode";
import { mockDataSource } from "./mockDataSource";
import { httpDataSource } from "./httpDataSource";

/**
 * Contrato único que deben cumplir todas las fuentes de datos del portal.
 * Hay dos implementaciones intercambiables:
 *  - mockDataSource: datos en memoria, usada en "modo demo" (sin backend real).
 *  - httpDataSource: consultas reales contra las funciones serverless de /api,
 *    que a su vez hablan con Vercel Postgres.
 * El resto de la aplicación importa únicamente `dataSource` desde este
 * archivo y nunca sabe cuál de las dos implementaciones está activa.
 */
export interface DataSource {
  listEmpleados(): Promise<Empleado[]>;
  getEmpleado(id: string): Promise<Empleado | null>;
  getEmpleadoByCorreo(correo: string): Promise<Empleado | null>;
  createEmpleado(input: NuevoEmpleadoInput): Promise<Empleado>;
  updateEmpleado(id: string, patch: Partial<NuevoEmpleadoInput>): Promise<Empleado>;
  deleteEmpleado(id: string): Promise<void>;

  listSolicitudes(params?: { empleadoId?: string }): Promise<Solicitud[]>;
  createSolicitud(input: NuevaSolicitudInput): Promise<Solicitud>;
  resolverSolicitud(id: string, estado: SolicitudEstado, resueltoPor?: string | null): Promise<Solicitud>;

  listDocumentos(params?: { empleadoId?: string }): Promise<Documento[]>;
  addDocumento(input: NuevoDocumentoInput): Promise<Documento>;

  listNominaPagos(params?: { empleadoId?: string }): Promise<NominaPago[]>;
  actualizarEstadoNominaPago(id: string, estado: EstadoNomina): Promise<NominaPago>;

  listFincas(): Promise<Finca[]>;
  createFinca(input: NuevaFincaInput): Promise<Finca>;

  listCertificados(params?: { fincaId?: string }): Promise<CertificadoFinca[]>;
  createCertificado(input: NuevoCertificadoInput): Promise<CertificadoFinca>;

  actualizarPerfilPropio(patch: PerfilPropioInput): Promise<Empleado>;
  listDestinosPqr(): Promise<DestinoPqr[]>;
  createPqr(input: NuevaPqrInput): Promise<Pqr>;
  listPqrRecibidas(): Promise<Pqr[]>;
  listPqrPropias(): Promise<Pqr[]>;
  actualizarEstadoPqr(
    id: string,
    estado: PqrEstado,
    comentario?: string,
    respuestaAdjuntoUrl?: string,
    respuestaAdjuntoNombre?: string,
  ): Promise<Pqr>;
  subirArchivoPqr(archivo: File): Promise<ArchivoSubido>;
}

export { IS_DEMO_MODE };

export const dataSource: DataSource = IS_DEMO_MODE ? mockDataSource : httpDataSource;
