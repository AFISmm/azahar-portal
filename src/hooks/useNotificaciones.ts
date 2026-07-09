import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Pqr, Solicitud, SolicitudTipo } from "../lib/types";

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
 * Deriva las notificaciones del portal a partir de solicitudes y PQR
 * existentes (no hay una tabla de notificaciones aparte):
 *  - Admin: solicitudes de cualquier persona pendientes de aprobar.
 *  - Cuenta de desarrollador: PQR pendientes radicadas hacia su cuenta.
 *  - Todos: sus propias solicitudes ya resueltas, y sus propias PQR ya
 *    resueltas (con el comentario de respuesta del desarrollador), que aún
 *    no hayan revisado.
 * "Eliminar" las descarta de forma local (localStorage) — es una limitación
 * conocida: el descarte no sincroniza entre dispositivos.
 */
export function useNotificaciones() {
  const { empleado, role } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [pqrRecibidas, setPqrRecibidas] = useState<Pqr[]>([]);
  const [pqrPropias, setPqrPropias] = useState<Pqr[]>([]);
  const [descartadas, setDescartadas] = useState<Set<string>>(() => leerDescartadas());
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    if (!empleado) {
      setSolicitudes([]);
      setPqrRecibidas([]);
      setPqrPropias([]);
      setCargando(false);
      return;
    }
    setCargando(true);
    try {
      const esDesarrollador = empleado.tipoCuenta === "desarrollador";
      const [sols, recibidas, propias] = await Promise.all([
        dataSource.listSolicitudes(),
        esDesarrollador ? dataSource.listPqrRecibidas() : Promise.resolve([]),
        esDesarrollador ? Promise.resolve([]) : dataSource.listPqrPropias(),
      ]);
      setSolicitudes(sols);
      setPqrRecibidas(recibidas);
      setPqrPropias(propias);
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

    if (empleado.tipoCuenta === "desarrollador") {
      for (const p of pqrRecibidas) {
        if (p.estado !== "pendiente") continue;
        const id = `pqr-pendiente-${p.id}`;
        if (descartadas.has(id)) continue;
        notificaciones.push({
          id,
          titulo: "Nueva PQR radicada",
          descripcion: `${p.nombre} radicó una PQR: "${p.problema.slice(0, 60)}${p.problema.length > 60 ? "…" : ""}"`,
          fecha: p.creadoEn,
          ruta: "/admin/pqr",
        });
      }
    } else {
      for (const p of pqrPropias) {
        if (p.estado !== "resuelta") continue;
        const id = `pqr-resuelta-${p.id}`;
        if (descartadas.has(id)) continue;
        notificaciones.push({
          id,
          titulo: "Tu PQR fue resuelta",
          descripcion: p.comentario ? `El desarrollador respondió: "${p.comentario.slice(0, 80)}${p.comentario.length > 80 ? "…" : ""}"` : "Tu PQR ya fue marcada como resuelta.",
          fecha: p.resueltoEn ?? p.creadoEn,
          ruta: "/mi-perfil?pqr=1",
        });
      }
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
