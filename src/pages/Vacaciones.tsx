import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Solicitud } from "../lib/types";
import { formatDate, formatDateTime } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button } from "../components/ui";
import { ProgressRing } from "../components/ProgressRing";
import { StatusBadge } from "../components/StatusBadge";
import { SolicitarVacacionesModal } from "../components/SolicitarVacacionesModal";

const VACACIONES_ANUALES = 15;

export default function Vacaciones() {
  const { empleado } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const sols = await dataSource.listSolicitudes({ empleadoId: empleado.id });
    setSolicitudes(sols.filter((s) => s.tipo === "vacaciones"));
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const usados = useMemo(() => Math.max(0, VACACIONES_ANUALES - (empleado?.diasVacacionesDisponibles ?? 0)), [empleado]);

  if (!empleado) return null;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Mi portal" title="Vacaciones" description="Consulta tu saldo disponible y el historial de tus solicitudes.">
        <Button onClick={() => setModalOpen(true)}>
          <CalendarPlus className="h-4 w-4" strokeWidth={1.75} />
          Solicitar vacaciones
        </Button>
      </PageHeader>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Card className="flex flex-col items-center justify-center text-center sm:col-span-1">
          <ProgressRing value={empleado.diasVacacionesDisponibles} max={VACACIONES_ANUALES} label="disponibles" sublabel={`de ${VACACIONES_ANUALES} días/año`} />
        </Card>
        <Card className="sm:col-span-2">
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Resumen del periodo</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-mono text-2xl font-bold text-[var(--text-primary)]">{VACACIONES_ANUALES}</p>
              <p className="text-xs text-[var(--text-muted)]">Días anuales</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-status-aprobada">{usados}</p>
              <p className="text-xs text-[var(--text-muted)]">Disfrutados</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-accent-500">{empleado.diasVacacionesDisponibles}</p>
              <p className="text-xs text-[var(--text-muted)]">Disponibles</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Historial de solicitudes">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : solicitudes.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Aún no has solicitado vacaciones.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Periodo</th>
                  <th className="py-2 pr-4 font-semibold">Motivo</th>
                  <th className="py-2 pr-4 font-semibold">Solicitada</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 font-mono text-[var(--text-primary)]">
                      {formatDate(s.fechaInicio)} — {formatDate(s.fechaFin)}
                    </td>
                    <td className="max-w-[240px] truncate py-3 pr-4 text-[var(--text-secondary)]">{s.motivo || "—"}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatDateTime(s.creadoEn)}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge estado={s.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <SolicitarVacacionesModal open={modalOpen} onClose={() => setModalOpen(false)} empleadoId={empleado.id} onCreated={cargar} />
    </div>
  );
}
