import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Solicitud, SolicitudTipo } from "../lib/types";

const CLAVE_DESCARTADAS = "azahar_notificaciones_descartadas";

const TIPO_LABEL: Record<SolicitudTipo, string> = {
  vacaciones: "vacaciones",
  incapacidad: "incapacidad",
  documento: "documento",
  certificado: "certificado",
};

export interface Notificacion {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  ruta: string;
}

function leerDescartadas(): Set<string> {
  try {
    const crudo = window.localStorage.getItem(CLAVE_DESCARTADAS);
    return new Set(crudo ? (JSON.parse(crudo) as string[]) : []);
  } catch {
    return new Set();
  }
}

function guardarDescartadas(set: Set<string>) {
  window.localStorage.setItem(CLAVE_DESCARTADAS, JSON.stringify(Array.from(set)));
}

/**
 * Deriva las notificaciones del portal a partir de las solicitudes existentes
 * (no hay una tabla de notificaciones aparte): para un admin, las solicitudes
 * de cualquier persona que estén pendientes de aprobar; para todos, sus
 * propias solicitudes ya resueltas que aún no haya revisado. "Eliminar" las
 * descarta de forma local (localStorage) — es una limitación conocida: el
 * descarte no sincroniza entre dispositivos.
 */
export function useNotificaciones() {
  const { empleado, role } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [descartadas, setDescartadas] = useState<Set<string>>(() => leerDescartadas());
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    if (!empleado) {
      setSolicitudes([]);
      setCargando(false);
      return;
    }
    setCargando(true);
    try {
      setSolicitudes(await dataSource.listSolicitudes());
    } finally {
      setCargando(false);
    }
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const notificaciones: Notificacion[] = [];
  if (empleado) {
    if (role === "admin") {
      for (const s of solicitudes) {
        if (s.estado !== "pendiente") continue;
        const id = `pendiente-${s.id}`;
        if (descartadas.has(id)) continue;
        notificaciones.push({
          id,
          titulo: "Nueva solicitud por aprobar",
          descripcion: `Solicitud de ${TIPO_LABEL[s.tipo]} pendiente de revisión.`,
          fecha: s.creadoEn,
          ruta: "/admin/solicitudes",
        });
      }
    }
    for (const s of solicitudes) {
      if (s.estado === "pendiente" || s.empleadoId !== empleado.id) continue;
      const id = `resuelta-${s.id}`;
      if (descartadas.has(id)) continue;
      notificaciones.push({
        id,
        titulo: s.estado === "aprobada" ? "Solicitud aprobada" : "Solicitud rechazada",
        descripcion: `Tu solicitud de ${TIPO_LABEL[s.tipo]} fue ${s.estado === "aprobada" ? "aprobada" : "rechazada"}.`,
        fecha: s.resueltoEn ?? s.creadoEn,
        ruta: "/nomina/mis-solicitudes",
      });
    }
  }
  notificaciones.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  function eliminar(id: string) {
    const nuevas = new Set(descartadas);
    nuevas.add(id);
    setDescartadas(nuevas);
    guardarDescartadas(nuevas);
  }

  return { notificaciones, cargando, eliminar, recargar: cargar };
}
