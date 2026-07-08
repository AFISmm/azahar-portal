import type { DataSource } from "./dataSource";
import type {
  Documento,
  Empleado,
  NominaPago,
  NuevoDocumentoInput,
  NuevoEmpleadoInput,
  NuevaSolicitudInput,
  Solicitud,
  SolicitudEstado,
} from "./types";
import { documentosSeed, empleadosSeed, nominaPagosSeed, solicitudesSeed } from "./mockData";

// Arreglos en memoria (module-level) que se mutan directamente. Como los
// módulos de ES se cargan una sola vez, todas las páginas comparten la misma
// referencia y ven los cambios entre sí durante la sesión del navegador.
const empleados: Empleado[] = [...empleadosSeed];
const solicitudes: Solicitud[] = [...solicitudesSeed];
const documentos: Documento[] = [...documentosSeed];
const nominaPagos: NominaPago[] = [...nominaPagosSeed];

let empleadoSeq = empleados.length + 1;
let solicitudSeq = solicitudes.length + 1;
let documentoSeq = documentos.length + 1;

function delay<T>(valor: T): Promise<T> {
  // Pequeña espera simulada para que las pantallas de carga tengan sentido.
  return new Promise((resolve) => setTimeout(() => resolve(valor), 120));
}

export const mockDataSource: DataSource = {
  async listEmpleados() {
    return delay([...empleados]);
  },

  async getEmpleado(id) {
    return delay(empleados.find((e) => e.id === id) ?? null);
  },

  async getEmpleadoByCorreo(correo) {
    const normalizado = correo.trim().toLowerCase();
    return delay(empleados.find((e) => e.correo.toLowerCase() === normalizado) ?? null);
  },

  async createEmpleado(input: NuevoEmpleadoInput) {
    const nuevo: Empleado = {
      id: `emp-${empleadoSeq++}`,
      estado: input.estado ?? "activo",
      avatarUrl: input.avatarUrl ?? null,
      telefono: input.telefono ?? null,
      salario: input.salario ?? null,
      createdAt: new Date().toISOString(),
      nombre: input.nombre,
      correo: input.correo,
      cargo: input.cargo,
      departamento: input.departamento,
      tipoContrato: input.tipoContrato,
      fechaIngreso: input.fechaIngreso,
      diasVacacionesDisponibles: input.diasVacacionesDisponibles,
      rol: input.rol,
    };
    empleados.push(nuevo);
    return delay(nuevo);
  },

  async updateEmpleado(id, patch) {
    const idx = empleados.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error("Empleado no encontrado");
    empleados[idx] = { ...empleados[idx], ...patch };
    return delay(empleados[idx]);
  },

  async deleteEmpleado(id) {
    const idx = empleados.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error("Empleado no encontrado");
    empleados.splice(idx, 1);
    // Mismo comportamiento que los `on delete cascade` de db/schema.sql:
    // al borrar el empleado también desaparecen sus solicitudes, documentos
    // y pagos de nómina asociados.
    for (let i = solicitudes.length - 1; i >= 0; i--) {
      if (solicitudes[i].empleadoId === id) solicitudes.splice(i, 1);
    }
    for (let i = documentos.length - 1; i >= 0; i--) {
      if (documentos[i].empleadoId === id) documentos.splice(i, 1);
    }
    for (let i = nominaPagos.length - 1; i >= 0; i--) {
      if (nominaPagos[i].empleadoId === id) nominaPagos.splice(i, 1);
    }
    return delay(undefined);
  },

  async listSolicitudes(params) {
    let resultado = [...solicitudes];
    if (params?.empleadoId) {
      resultado = resultado.filter((s) => s.empleadoId === params.empleadoId);
    }
    resultado.sort((a, b) => (a.creadoEn < b.creadoEn ? 1 : -1));
    return delay(resultado);
  },

  async createSolicitud(input: NuevaSolicitudInput) {
    const nueva: Solicitud = {
      id: `sol-${solicitudSeq++}`,
      empleadoId: input.empleadoId,
      tipo: input.tipo,
      estado: "pendiente",
      fechaInicio: input.fechaInicio ?? null,
      fechaFin: input.fechaFin ?? null,
      motivo: input.motivo ?? null,
      creadoEn: new Date().toISOString(),
      resueltoEn: null,
      resueltoPor: null,
    };
    solicitudes.push(nueva);
    return delay(nueva);
  },

  async resolverSolicitud(id: string, estado: SolicitudEstado, resueltoPor?: string | null) {
    const idx = solicitudes.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error("Solicitud no encontrada");
    solicitudes[idx] = {
      ...solicitudes[idx],
      estado,
      resueltoEn: new Date().toISOString(),
      resueltoPor: resueltoPor ?? null,
    };
    return delay(solicitudes[idx]);
  },

  async listDocumentos(params) {
    let resultado = [...documentos];
    if (params?.empleadoId) {
      resultado = resultado.filter((d) => d.empleadoId === params.empleadoId);
    }
    resultado.sort((a, b) => (a.subidoEn < b.subidoEn ? 1 : -1));
    return delay(resultado);
  },

  async addDocumento(input: NuevoDocumentoInput) {
    const nuevo: Documento = {
      id: `doc-${documentoSeq++}`,
      empleadoId: input.empleadoId,
      nombre: input.nombre,
      tipo: input.tipo,
      url: input.url ?? null,
      subidoEn: new Date().toISOString(),
      subidoPor: input.subidoPor ?? null,
    };
    documentos.push(nuevo);
    return delay(nuevo);
  },

  async listNominaPagos(params) {
    let resultado = [...nominaPagos];
    if (params?.empleadoId) {
      resultado = resultado.filter((n) => n.empleadoId === params.empleadoId);
    }
    resultado.sort((a, b) => (a.fechaPago < b.fechaPago ? 1 : -1));
    return delay(resultado);
  },

  async actualizarEstadoNominaPago(id, estado) {
    const idx = nominaPagos.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error("Pago de nómina no encontrado");
    nominaPagos[idx] = { ...nominaPagos[idx], estado };
    return delay(nominaPagos[idx]);
  },
};
