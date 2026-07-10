import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Solicitud, SolicitudEstado, SolicitudTipo } from "../lib/types";
import { formatDate, formatDateTime } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Select } from "../components/ui";
import { StatusBadge, TipoBadge } from "../components/StatusBadge";
import { useLanguage } from "../context/LanguageContext";

const TIPOS: (SolicitudTipo | "todos")[] = ["todos", "vacaciones", "incapacidad", "documento", "certificado"];
const ESTADOS: (SolicitudEstado | "todos")[] = ["todos", "pendiente", "aprobada", "rechazada"];

export default function MisSolicitudes() {
  const { empleado } = useAuth();
  const { t } = useLanguage();
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

  const tipoLabels: Record<string, string> = {
    vacaciones: t("misSolicitudes.tipoVacaciones"),
    incapacidad: t("misSolicitudes.tipoIncapacidad"),
    documento: t("misSolicitudes.tipoDocumento"),
    certificado: t("misSolicitudes.tipoCertificado"),
  };
  const estadoLabels: Record<string, string> = {
    pendiente: t("misSolicitudes.estadoPendiente"),
    aprobada: t("misSolicitudes.estadoAprobada"),
    rechazada: t("misSolicitudes.estadoRechazada"),
  };

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("misSolicitudes.breadcrumb")} title={t("misSolicitudes.titulo")} description={t("misSolicitudes.descripcion")} />

      <div className="mb-5 flex flex-wrap gap-3">
        <Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as (typeof TIPOS)[number])} className="w-auto">
          {TIPOS.map((tipoOpt) => (
            <option key={tipoOpt} value={tipoOpt}>
              {tipoOpt === "todos" ? t("misSolicitudes.todosLosTipos") : tipoLabels[tipoOpt]}
            </option>
          ))}
        </Select>
        <Select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value as (typeof ESTADOS)[number])} className="w-auto">
          {ESTADOS.map((estadoOpt) => (
            <option key={estadoOpt} value={estadoOpt}>
              {estadoOpt === "todos" ? t("misSolicitudes.todosLosEstados") : estadoLabels[estadoOpt]}
            </option>
          ))}
        </Select>
      </div>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("misSolicitudes.cargando")}</p>
        ) : filtradas.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("misSolicitudes.sinResultados")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">{t("misSolicitudes.colTipo")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("misSolicitudes.colFechas")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("misSolicitudes.colMotivo")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("misSolicitudes.colCreada")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("misSolicitudes.colEstado")}</th>
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
