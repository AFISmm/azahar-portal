import { supabase } from "./supabaseClient";
import type { DataSource } from "./dataSource";
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

// ---------------------------------------------------------------------------
// Implementación real basada en Supabase. Traduce entre las columnas en
// snake_case de Postgres (ver supabase/migrations/001_init.sql) y los tipos
// en camelCase usados por el resto de la aplicación (src/lib/types.ts).
// Solo se activa cuando VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY están
// definidas (ver src/lib/supabaseClient.ts, IS_DEMO_MODE).
// ---------------------------------------------------------------------------

function client() {
  if (!supabase) {
    throw new Error("Supabase no está configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

interface EmpleadoRow {
  id: string;
  auth_user_id: string | null;
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  tipo_contrato: string;
  fecha_ingreso: string;
  dias_vacaciones_disponibles: number;
  salario: number | null;
  rol: "empleado" | "admin";
  estado: "activo" | "inactivo";
  avatar_url: string | null;
  telefono: string | null;
  created_at: string;
}

function empleadoFromRow(row: EmpleadoRow): Empleado {
  return {
    id: row.id,
    authUserId: row.auth_user_id,
    nombre: row.nombre,
    correo: row.correo,
    cargo: row.cargo,
    departamento: row.departamento,
    tipoContrato: row.tipo_contrato,
    fechaIngreso: row.fecha_ingreso,
    diasVacacionesDisponibles: row.dias_vacaciones_disponibles,
    salario: row.salario,
    rol: row.rol,
    estado: row.estado,
    avatarUrl: row.avatar_url,
    telefono: row.telefono,
    createdAt: row.created_at,
  };
}

interface SolicitudRow {
  id: string;
  empleado_id: string;
  tipo: Solicitud["tipo"];
  estado: SolicitudEstado;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  motivo: string | null;
  creado_en: string;
  resuelto_en: string | null;
  resuelto_por: string | null;
}

function solicitudFromRow(row: SolicitudRow): Solicitud {
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

interface DocumentoRow {
  id: string;
  empleado_id: string;
  nombre: string;
  tipo: string;
  url: string | null;
  subido_en: string;
  subido_por: string | null;
}

function documentoFromRow(row: DocumentoRow): Documento {
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

interface NominaPagoRow {
  id: string;
  empleado_id: string;
  periodo: string;
  fecha_pago: string;
  monto: number;
  estado: "pendiente" | "pagado";
}

function nominaPagoFromRow(row: NominaPagoRow): NominaPago {
  return {
    id: row.id,
    empleadoId: row.empleado_id,
    periodo: row.periodo,
    fechaPago: row.fecha_pago,
    monto: row.monto,
    estado: row.estado,
  };
}

export const supabaseDataSource: DataSource = {
  async listEmpleados() {
    const { data, error } = await client().from("empleados").select("*").order("nombre");
    if (error) throw error;
    return (data as EmpleadoRow[]).map(empleadoFromRow);
  },

  async getEmpleado(id) {
    const { data, error } = await client().from("empleados").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? empleadoFromRow(data as EmpleadoRow) : null;
  },

  async getEmpleadoByCorreo(correo) {
    const { data, error } = await client().from("empleados").select("*").ilike("correo", correo).maybeSingle();
    if (error) throw error;
    return data ? empleadoFromRow(data as EmpleadoRow) : null;
  },

  async getEmpleadoByAuthUserId(authUserId) {
    const { data, error } = await client()
      .from("empleados")
      .select("*")
      .eq("auth_user_id", authUserId)
      .maybeSingle();
    if (error) throw error;
    return data ? empleadoFromRow(data as EmpleadoRow) : null;
  },

  async createEmpleado(input: NuevoEmpleadoInput) {
    // NOTA: esta función solo inserta la fila en `empleados`. Crear también el
    // usuario de autenticación de Supabase (auth.users) requiere la llave de
    // servicio y debe hacerse desde /api/empleados-crear.ts (ver ese archivo).
    const { data, error } = await client()
      .from("empleados")
      .insert({
        nombre: input.nombre,
        correo: input.correo,
        cargo: input.cargo,
        departamento: input.departamento,
        tipo_contrato: input.tipoContrato,
        fecha_ingreso: input.fechaIngreso,
        dias_vacaciones_disponibles: input.diasVacacionesDisponibles,
        rol: input.rol,
        estado: input.estado ?? "activo",
        avatar_url: input.avatarUrl ?? null,
        telefono: input.telefono ?? null,
        salario: input.salario ?? null,
      })
      .select("*")
      .single();
    if (error) throw error;
    return empleadoFromRow(data as EmpleadoRow);
  },

  async updateEmpleado(id, patch) {
    const payload: Record<string, unknown> = {};
    if (patch.nombre !== undefined) payload.nombre = patch.nombre;
    if (patch.correo !== undefined) payload.correo = patch.correo;
    if (patch.cargo !== undefined) payload.cargo = patch.cargo;
    if (patch.departamento !== undefined) payload.departamento = patch.departamento;
    if (patch.tipoContrato !== undefined) payload.tipo_contrato = patch.tipoContrato;
    if (patch.fechaIngreso !== undefined) payload.fecha_ingreso = patch.fechaIngreso;
    if (patch.diasVacacionesDisponibles !== undefined) payload.dias_vacaciones_disponibles = patch.diasVacacionesDisponibles;
    if (patch.rol !== undefined) payload.rol = patch.rol;
    if (patch.estado !== undefined) payload.estado = patch.estado;
    if (patch.avatarUrl !== undefined) payload.avatar_url = patch.avatarUrl;
    if (patch.telefono !== undefined) payload.telefono = patch.telefono;
    if (patch.salario !== undefined) payload.salario = patch.salario;

    const { data, error } = await client().from("empleados").update(payload).eq("id", id).select("*").single();
    if (error) throw error;
    return empleadoFromRow(data as EmpleadoRow);
  },

  async listSolicitudes(params) {
    let query = client().from("solicitudes").select("*").order("creado_en", { ascending: false });
    if (params?.empleadoId) query = query.eq("empleado_id", params.empleadoId);
    const { data, error } = await query;
    if (error) throw error;
    return (data as SolicitudRow[]).map(solicitudFromRow);
  },

  async createSolicitud(input: NuevaSolicitudInput) {
    const { data, error } = await client()
      .from("solicitudes")
      .insert({
        empleado_id: input.empleadoId,
        tipo: input.tipo,
        estado: "pendiente",
        fecha_inicio: input.fechaInicio ?? null,
        fecha_fin: input.fechaFin ?? null,
        motivo: input.motivo ?? null,
      })
      .select("*")
      .single();
    if (error) throw error;
    return solicitudFromRow(data as SolicitudRow);
  },

  async resolverSolicitud(id, estado, resueltoPor) {
    const { data, error } = await client()
      .from("solicitudes")
      .update({ estado, resuelto_en: new Date().toISOString(), resuelto_por: resueltoPor ?? null })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return solicitudFromRow(data as SolicitudRow);
  },

  async listDocumentos(params) {
    let query = client().from("documentos").select("*").order("subido_en", { ascending: false });
    if (params?.empleadoId) query = query.eq("empleado_id", params.empleadoId);
    const { data, error } = await query;
    if (error) throw error;
    return (data as DocumentoRow[]).map(documentoFromRow);
  },

  async addDocumento(input: NuevoDocumentoInput) {
    const { data, error } = await client()
      .from("documentos")
      .insert({
        empleado_id: input.empleadoId,
        nombre: input.nombre,
        tipo: input.tipo,
        url: input.url ?? null,
        subido_por: input.subidoPor ?? null,
      })
      .select("*")
      .single();
    if (error) throw error;
    return documentoFromRow(data as DocumentoRow);
  },

  async listNominaPagos(params) {
    let query = client().from("nomina_pagos").select("*").order("fecha_pago", { ascending: false });
    if (params?.empleadoId) query = query.eq("empleado_id", params.empleadoId);
    const { data, error } = await query;
    if (error) throw error;
    return (data as NominaPagoRow[]).map(nominaPagoFromRow);
  },

  async actualizarEstadoNominaPago(id: string, estado: EstadoNomina) {
    const { data, error } = await client().from("nomina_pagos").update({ estado }).eq("id", id).select("*").single();
    if (error) throw error;
    return nominaPagoFromRow(data as NominaPagoRow);
  },
};
