import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import type { Empleado, Solicitud, SolicitudEstado, SolicitudTipo } from "../../lib/types";
import { formatDate, formatDateTime, iniciales } from "../../lib/format";
import { useAuth } from "../../auth/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Card } from "../Card";
import { Button, Select } from "../ui";
import { StatusBadge, TipoBadge } from "../StatusBadge";

const ESTADOS: (SolicitudEstado | "todos")[] = ["todos", "pendiente", "aprobada", "rechazada"];
const TIPOS: (SolicitudTipo | "todos")[] = ["todos", "vacaciones", "incapacidad", "documento", "certificado"];

interface Props {
  tipoFijo?: SolicitudTipo;
  titulo: string;
  descripcion: string;
}

export function SolicitudesAdminTable({ tipoFijo, titulo, descripcion }: Props) {
  const { empleado: adminActual } = useAuth();
  const { showToast } = useToast();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<(typeof ESTADOS)[number]>("todos");
  const [filtroTipo, setFiltroTipo] = useState<(typeof TIPOS)[number]>("todos");
  const [procesando, setProcesando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const [sols, emps] = await Promise.all([dataSource.listSolicitudes(), dataSource.listEmpleados()]);
    setSolicitudes(tipoFijo ? sols.filter((s) => s.tipo === tipoFijo) : sols);
    setEmpleados(emps);
    setCargando(false);
  }, [tipoFijo]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const empleadoPorId = useMemo(() => new Map(empleados.map((e) => [e.id, e])), [empleados]);

  const filtradas = useMemo(
    () =>
      solicitudes.filter(
        (s) => (filtroEstado === "todos" || s.estado === filtroEstado) && (filtroTipo === "todos" || s.tipo === filtroTipo),
      ),
    [solicitudes, filtroEstado, filtroTipo],
  );

  async function resolver(id: string, estado: SolicitudEstado) {
    setProcesando(id);
    try {
      await dataSource.resolverSolicitud(id, estado, adminActual?.id ?? null);
      showToast(estado === "aprobada" ? "Solicitud aprobada." : "Solicitud rechazada.", estado === "aprobada" ? "success" : "info");
      await cargar();
    } finally {
      setProcesando(null);
    }
  }

  return (
    <Card>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-base font-semibold text-[var(--text-primary)]">{titulo}</h2>
          <p className="text-sm text-[var(--text-secondary)]">{descripcion}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!tipoFijo && (
            <Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as (typeof TIPOS)[number])} className="w-auto">
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t === "todos" ? "Todos los tipos" : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </Select>
          )}
          <Select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value as (typeof ESTADOS)[number])} className="w-auto">
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e === "todos" ? "Todos los estados" : e.charAt(0).toUpperCase() + e.slice(1)}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {cargando ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
      ) : filtradas.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay solicitudes con estos filtros.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <th className="py-2 pr-4 font-semibold">Empleado</th>
                {!tipoFijo && <th className="py-2 pr-4 font-semibold">Tipo</th>}
                <th className="py-2 pr-4 font-semibold">Fechas</th>
                <th className="py-2 pr-4 font-semibold">Motivo</th>
                <th className="py-2 pr-4 font-semibold">Estado</th>
                <th className="py-2 pr-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((s) => {
                const emp = empleadoPorId.get(s.empleadoId);
                return (
                  <tr key={s.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-[11px] font-bold text-cream-100">
                          {emp ? iniciales(emp.nombre) : "?"}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{emp?.nombre ?? "Empleado eliminado"}</p>
                          <p className="text-xs text-[var(--text-muted)]">{formatDateTime(s.creadoEn)}</p>
                        </div>
                      </div>
                    </td>
                    {!tipoFijo && (
                      <td className="py-3 pr-4">
                        <TipoBadge tipo={s.tipo} />
                      </td>
                    )}
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">
                      {s.fechaInicio ? `${formatDate(s.fechaInicio)} — ${formatDate(s.fechaFin)}` : "—"}
                    </td>
                    <td className="max-w-[240px] truncate py-3 pr-4 text-[var(--text-secondary)]">{s.motivo || "—"}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge estado={s.estado} />
                    </td>
                    <td className="py-3 pr-4">
                      {s.estado === "pendiente" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="border-status-aprobada! text-status-aprobada! px-2.5 py-1.5"
                            disabled={procesando === s.id}
                            onClick={() => void resolver(s.id, "aprobada")}
                            title="Aprobar"
                          >
                            <Check className="h-4 w-4" strokeWidth={1.75} />
                          </Button>
                          <Button
                            variant="outline"
                            className="border-status-rechazada! text-status-rechazada! px-2.5 py-1.5"
                            disabled={procesando === s.id}
                            onClick={() => void resolver(s.id, "rechazada")}
                            title="Rechazar"
                          >
                            <X className="h-4 w-4" strokeWidth={1.75} />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-right text-xs text-[var(--text-muted)]">Resuelta {formatDateTime(s.resueltoEn)}</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
