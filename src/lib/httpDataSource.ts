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
// Implementación real de DataSource: habla por HTTP con las funciones
// serverless de /api (ver api/empleados, api/solicitudes, api/documentos,
// api/nomina), que a su vez consultan Vercel Postgres. La sesión viaja como
// cookie HttpOnly (ver api/_lib/auth.ts), por eso todas las peticiones usan
// `credentials: "include"`.
// Solo se activa cuando VITE_ENABLE_BACKEND=true (ver src/lib/backendMode.ts,
// IS_DEMO_MODE).
// ---------------------------------------------------------------------------

class HttpDataSourceError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const respuesta = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const payload: unknown = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const mensaje =
      payload && typeof payload === "object" && "mensaje" in payload && typeof (payload as { mensaje?: unknown }).mensaje === "string"
        ? (payload as { mensaje: string }).mensaje
        : `Error ${respuesta.status} consultando ${url}.`;
    throw new HttpDataSourceError(respuesta.status, mensaje);
  }

  return payload as T;
}

function query(params?: { empleadoId?: string }): string {
  return params?.empleadoId ? `?empleadoId=${encodeURIComponent(params.empleadoId)}` : "";
}

/**
 * Construye un Empleado "sentinela": solo trae el correo relleno y el resto
 * de campos vacíos/por defecto. Se usa únicamente como valor de verdad
 * (truthy) para getEmpleadoByCorreo cuando el backend real confirma que el
 * correo ya existe — ver la nota de seguridad en api/empleados/index.ts sobre
 * por qué esa consulta (sin autenticar, usada antes del login desde
 * /registro) nunca puede devolver el perfil completo de otro empleado.
 */
function empleadoSentinela(correo: string): Empleado {
  return {
    id: "",
    nombre: "",
    correo,
    cargo: "",
    departamento: "",
    tipoContrato: "",
    fechaIngreso: "",
    diasVacacionesDisponibles: 0,
    salario: null,
    rol: "empleado",
    estado: "activo",
    avatarUrl: null,
    telefono: null,
    createdAt: "",
  };
}

export const httpDataSource: DataSource = {
  async listEmpleados() {
    const data = await fetchJson<{ ok: boolean; empleados: Empleado[] }>("/api/empleados");
    return data.empleados;
  },

  async getEmpleado(id) {
    try {
      const data = await fetchJson<{ ok: boolean; empleado: Empleado }>(`/api/empleados/${encodeURIComponent(id)}`);
      return data.empleado;
    } catch (err) {
      if (err instanceof HttpDataSourceError && (err.status === 404 || err.status === 401 || err.status === 403)) {
        return null;
      }
      throw err;
    }
  },

  async getEmpleadoByCorreo(correo) {
    // Ruta unificada con el listado admin (ver api/empleados/index.ts): con
    // ?correo= no requiere sesión y responde solo `{ existe: boolean }`, sin
    // exponer el resto del directorio de empleados. Solo se usa como chequeo
    // de duplicados antes de registrarse (ver AuthContext.tsx, registrar()).
    const data = await fetchJson<{ ok: boolean; existe: boolean }>(`/api/empleados?correo=${encodeURIComponent(correo)}`);
    return data.existe ? empleadoSentinela(correo) : null;
  },

  async createEmpleado(input: NuevoEmpleadoInput) {
    const data = await fetchJson<{ ok: boolean; empleado: Empleado }>("/api/empleados", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return data.empleado;
  },

  async updateEmpleado(id, patch) {
    const data = await fetchJson<{ ok: boolean; empleado: Empleado }>(`/api/empleados/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    return data.empleado;
  },

  async deleteEmpleado(id) {
    await fetchJson<{ ok: boolean }>(`/api/empleados/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  async listSolicitudes(params) {
    const data = await fetchJson<{ ok: boolean; solicitudes: Solicitud[] }>(`/api/solicitudes${query(params)}`);
    return data.solicitudes;
  },

  async createSolicitud(input: NuevaSolicitudInput) {
    const data = await fetchJson<{ ok: boolean; solicitud: Solicitud }>("/api/solicitudes", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return data.solicitud;
  },

  async resolverSolicitud(id, estado: SolicitudEstado) {
    // `resueltoPor` no se envía: el servidor siempre usa el id del admin de
    // la sesión actual (ver api/solicitudes/index.ts), nunca un valor del cliente.
    const data = await fetchJson<{ ok: boolean; solicitud: Solicitud }>(`/api/solicitudes?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ estado }),
    });
    return data.solicitud;
  },

  async listDocumentos(params) {
    const data = await fetchJson<{ ok: boolean; documentos: Documento[] }>(`/api/documentos${query(params)}`);
    return data.documentos;
  },

  async addDocumento(input: NuevoDocumentoInput) {
    const data = await fetchJson<{ ok: boolean; documento: Documento }>("/api/documentos", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return data.documento;
  },

  async listNominaPagos(params) {
    const data = await fetchJson<{ ok: boolean; pagos: NominaPago[] }>(`/api/nomina${query(params)}`);
    return data.pagos;
  },

  async actualizarEstadoNominaPago(id, estado: EstadoNomina) {
    const data = await fetchJson<{ ok: boolean; pago: NominaPago }>(`/api/nomina?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ estado }),
    });
    return data.pago;
  },
};
