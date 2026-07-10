import { useEffect, useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { dataSource } from "../lib/dataSource";
import type { NominaPago } from "../lib/types";
import { formatCOP, formatDate } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

const ESTADO_ESTILO: Record<NominaPago["estado"], string> = {
  pendiente: "bg-status-pendiente-bg text-status-pendiente",
  pagado: "bg-status-aprobada-bg text-status-aprobada",
};

export default function Nomina() {
  const { empleado } = useAuth();
  const { t } = useLanguage();
  const [pagos, setPagos] = useState<NominaPago[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!empleado) return;
    setCargando(true);
    dataSource.listNominaPagos({ empleadoId: empleado.id }).then((data) => {
      setPagos(data);
      setCargando(false);
    });
  }, [empleado]);

  const proximoPago = useMemo(() => pagos.find((p) => p.estado === "pendiente") ?? null, [pagos]);

  if (!empleado) return null;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("nomina.breadcrumb")} title={t("nomina.titulo")} description={t("nomina.descripcion")} />

      {proximoPago && (
        <Card className="mb-6 flex flex-col items-start justify-between gap-4 bg-gradient-to-br from-accent-500 to-accent-300 text-brand-900 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900/10">
              <Wallet className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/70">{t("nomina.proximoPago")} · {proximoPago.periodo}</p>
              <p className="font-mono text-xl font-bold">{formatDate(proximoPago.fechaPago, "d 'de' MMMM 'de' yyyy")}</p>
            </div>
          </div>
          <p className="font-mono text-2xl font-bold">{formatCOP(proximoPago.monto)}</p>
        </Card>
      )}

      <Card title={t("nomina.historialPagos")}>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("nomina.cargando")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">{t("nomina.colPeriodo")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("nomina.colFechaPago")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("nomina.colMonto")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("nomina.colEstado")}</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 text-[var(--text-primary)]">{p.periodo}</td>
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">{formatDate(p.fechaPago)}</td>
                    <td className="py-3 pr-4 font-mono font-semibold text-[var(--text-primary)]">{formatCOP(p.monto)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[p.estado]}`}>
                        {p.estado === "pagado" ? t("nomina.estadoPagado") : t("nomina.estadoPendiente")}
                      </span>
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
