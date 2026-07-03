import type {
  Documento,
  Empleado,
  EstadoNomina,
  NominaPago,
  NuevoDocumentoInput,
  NuevoEmpleadoInput,
  NuevaSolicitudInput,
  Solicitud,
  SolicitudEstado,
} from "./types";
import { IS_DEMO_MODE } from "./supabaseClient";
import { mockDataSource } from "./mockDataSource";
import { supabaseDataSource } from "./supabaseDataSource";

/**
 * Contrato único que deben cumplir todas las fuentes de datos del portal.
 * Hay dos implementaciones intercambiables:
 *  - mockDataSource: datos en memoria, usada en "modo demo" (sin Supabase).
 *  - supabaseDataSource: consultas reales contra Supabase Postgres.
 * El resto de la aplicación importa únicamente `dataSource` desde este
 * archivo y nunca sabe cuál de las dos implementaciones está activa.
 */
export interface DataSource {
  listEmpleados(): Promise<Empleado[]>;
  getEmpleado(id: string): Promise<Empleado | null>;
  getEmpleadoByCorreo(correo: string): Promise<Empleado | null>;
  getEmpleadoByAuthUserId(authUserId: string): Promise<Empleado | null>;
  createEmpleado(input: NuevoEmpleadoInput): Promise<Empleado>;
  updateEmpleado(id: string, patch: Partial<NuevoEmpleadoInput>): Promise<Empleado>;

  listSolicitudes(params?: { empleadoId?: string }): Promise<Solicitud[]>;
  createSolicitud(input: NuevaSolicitudInput): Promise<Solicitud>;
  resolverSolicitud(id: string, estado: SolicitudEstado, resueltoPor?: string | null): Promise<Solicitud>;

  listDocumentos(params?: { empleadoId?: string }): Promise<Documento[]>;
  addDocumento(input: NuevoDocumentoInput): Promise<Documento>;

  listNominaPagos(params?: { empleadoId?: string }): Promise<NominaPago[]>;
  actualizarEstadoNominaPago(id: string, estado: EstadoNomina): Promise<NominaPago>;
}

export { IS_DEMO_MODE };

export const dataSource: DataSource = IS_DEMO_MODE ? mockDataSource : supabaseDataSource;
