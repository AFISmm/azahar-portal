import { type FormEvent, useCallback, useEffect, useState } from "react";
import { HeartPulse, Paperclip } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Solicitud } from "../lib/types";
import { formatDate, formatDateTime } from "../lib/format";
import { useToast } from "../context/ToastContext";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Button, Field, Input, Textarea } from "../components/ui";
import { StatusBadge } from "../components/StatusBadge";
import { useLanguage } from "../context/LanguageContext";

export default function Incapacidades() {
  const { empleado } = useAuth();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [motivo, setMotivo] = useState("");
  const [soporte, setSoporte] = useState("");

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const sols = await dataSource.listSolicitudes({ empleadoId: empleado.id });
    setSolicitudes(sols.filter((s) => s.tipo === "incapacidad"));
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!empleado) return;
    setEnviando(true);
    try {
      const motivoCompleto = soporte ? `${motivo} (${t("incapacidades.soporteAdjunto")}: ${soporte})` : motivo;
      await dataSource.createSolicitud({
        empleadoId: empleado.id,
        tipo: "incapacidad",
        fechaInicio,
        fechaFin,
        motivo: motivoCompleto,
      });
      showToast(t("incapacidades.toastExito"), "success");
      setFechaInicio("");
      setFechaFin("");
      setMotivo("");
      setSoporte("");
      setModalOpen(false);
      await cargar();
    } finally {
      setEnviando(false);
    }
  }

  if (!empleado) return null;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("incapacidades.breadcrumb")} title={t("incapacidades.titulo")} description={t("incapacidades.descripcion")}>
        <Button onClick={() => setModalOpen(true)}>
          <HeartPulse className="h-4 w-4" strokeWidth={1.75} />
          {t("incapacidades.reportar")}
        </Button>
      </PageHeader>

      <Card title={t("incapacidades.historial")}>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("incapacidades.cargando")}</p>
        ) : solicitudes.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("incapacidades.sinRegistros")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">{t("incapacidades.colPeriodo")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("incapacidades.colDetalle")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("incapacidades.colReportada")}</th>
                  <th className="py-2 pr-4 font-semibold">{t("incapacidades.colEstado")}</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 font-mono text-[var(--text-primary)]">
                      {formatDate(s.fechaInicio)} — {formatDate(s.fechaFin)}
                    </td>
                    <td className="max-w-[280px] truncate py-3 pr-4 text-[var(--text-secondary)]">{s.motivo || "—"}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t("incapacidades.reportar")}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={t("incapacidades.campoFechaInicio")}>
              <Input type="date" required value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </Field>
            <Field label={t("incapacidades.campoFechaFin")}>
              <Input type="date" required value={fechaFin} min={fechaInicio || undefined} onChange={(e) => setFechaFin(e.target.value)} />
            </Field>
          </div>
          <Field label={t("incapacidades.campoMotivo")}>
            <Textarea rows={3} required placeholder={t("incapacidades.placeholderMotivo")} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
          </Field>
          <Field label={t("incapacidades.campoSoporte")}>
            <Input type="file" onChange={(e) => setSoporte(e.target.files?.[0]?.name ?? "")} />
            {soporte && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Paperclip className="h-3.5 w-3.5" strokeWidth={1.75} />
                {soporte}
              </p>
            )}
          </Field>
          <p className="text-xs text-[var(--text-muted)]">{t("incapacidades.notaDemo")}</p>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              {t("incapacidades.cancelar")}
            </Button>
            <Button type="submit" disabled={enviando}>
              <HeartPulse className="h-4 w-4" strokeWidth={1.75} />
              {t("incapacidades.enviarReporte")}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
