import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Solicitud, SolicitudEstado, SolicitudTipo } from "../lib/types";
import { formatDate, formatDateTime } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Select } from "../components/ui";
import { StatusBadge, TipoBadge } from "../components/StatusBadge";

const TIPOS: (SolicitudTipo | "todos")[] = ["todos", "vacaciones", "incapacidad", "documento", "certificado"];
const ESTADOS: (SolicitudEstado | "todos")[] = ["todos", "pendiente", "aprobada", "rechazada"];

export default function MisSolicitudes() {
  const { empleado } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<(typeof TIPOS)[number]>("todos");
  const [filtroEstado, setFiltroEstado] = useState<(typeof ESTADOS)[number]>("todos");

  useEffect(() => {
    if (!empleado) return;
    setCargando(true);
    dataSource.listSolicitudes({ empleadoId: empleado.id }).then((data) => {
      setSolicitudes(data);
      setCargando(false);
    });
  }, [empleado]);

  const filtradas = useMemo(
    () =>
      solicitudes.filter(
        (s) => (filtroTipo === "todos" || s.tipo === filtroTipo) && (filtroEstado === "todos" || s.estado === filtroEstado),
      ),
    [solicitudes, filtroTipo, filtroEstado],
  );

  if (!empleado) return null;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Mi portal" title="Mis solicitudes" description="Todas tus solicitudes de vacaciones, incapacidades, documentos y certificados." />

      <div className="mb-5 flex flex-wrap gap-3">
        <Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as (typeof TIPOS)[number])} className="w-auto">
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {t === "todos" ? "Todos los tipos" : t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </Select>
        <Select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value as (typeof ESTADOS)[number])} className="w-auto">
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e === "todos" ? "Todos los estados" : e.charAt(0).toUpperCase() + e.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : filtradas.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay solicitudes con estos filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Tipo</th>
                  <th className="py-2 pr-4 font-semibold">Fechas</th>
                  <th className="py-2 pr-4 font-semibold">Motivo</th>
                  <th className="py-2 pr-4 font-semibold">Creada</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4">
                      <TipoBadge tipo={s.tipo} />
                    </td>
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">
                      {s.fechaInicio ? `${formatDate(s.fechaInicio)} — ${formatDate(s.fechaFin)}` : "—"}
                    </td>
                    <td className="max-w-[260px] truncate py-3 pr-4 text-[var(--text-secondary)]">{s.motivo || "—"}</td>
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
    </div>
  );
}
