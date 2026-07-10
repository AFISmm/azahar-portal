import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Award, Download } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Solicitud } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { useToast } from "../context/ToastContext";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button, Field, Select, Textarea } from "../components/ui";
import { StatusBadge } from "../components/StatusBadge";
import { useLanguage } from "../context/LanguageContext";

const TIPOS_CERTIFICADO = [{ value: "laboral" }, { value: "salarial" }];

export default function Certificados() {
  const { empleado } = useAuth();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const labelPorTipoCertificado: Record<string, string> = {
    laboral: t("certificados.tipoLaboral"),
    salarial: t("certificados.tipoSalarial"),
  };
  const [certificados, setCertificados] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [tipoCertificado, setTipoCertificado] = useState(TIPOS_CERTIFICADO[0].value);
  const [nota, setNota] = useState("");
  const [enviando, setEnviando] = useState(false);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const sols = await dataSource.listSolicitudes({ empleadoId: empleado.id });
    setCertificados(sols.filter((s) => s.tipo === "certificado"));
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
      const etiqueta = labelPorTipoCertificado[tipoCertificado] ?? t("certificados.tipoDefault");
      const motivo = nota ? `${etiqueta}. ${nota}` : etiqueta;
      await dataSource.createSolicitud({ empleadoId: empleado.id, tipo: "certificado", fechaInicio: null, fechaFin: null, motivo });
      showToast(t("certificados.toastExito"), "success");
      setNota("");
      await cargar();
    } finally {
      setEnviando(false);
    }
  }

  if (!empleado) return null;

  const emitidos = certificados.filter((c) => c.estado === "aprobada");

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("certificados.breadcrumb")} title={t("certificados.titulo")} description={t("certificados.descripcion")} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title={t("certificados.solicitarCertificado")} className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label={t("certificados.campoTipo")}>
              <Select value={tipoCertificado} onChange={(e) => setTipoCertificado(e.target.value)}>
                {TIPOS_CERTIFICADO.map((tc) => (
                  <option key={tc.value} value={tc.value}>
                    {labelPorTipoCertificado[tc.value]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t("certificados.campoNota")}>
              <Textarea rows={3} placeholder={t("certificados.placeholderNota")} value={nota} onChange={(e) => setNota(e.target.value)} />
            </Field>
            <Button type="submit" disabled={enviando} className="w-full">
              <Award className="h-4 w-4" strokeWidth={1.75} />
              {t("certificados.solicitarCertificado")}
            </Button>
          </form>
        </Card>

        <Card title={`${t("certificados.emitidos")} (${emitidos.length})`} className="lg:col-span-2">
          {cargando ? (
            <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("certificados.cargando")}</p>
          ) : certificados.length === 0 ? (
            <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("certificados.sinSolicitudes")}</p>
          ) : (
            <ul className="divide-y divide-[var(--border-subtle)]">
              {certificados.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{c.motivo}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t("certificados.solicitadoEl")} {formatDateTime(c.creadoEn)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge estado={c.estado} />
                    <Button variant="outline" disabled={c.estado !== "aprobada"} title={t("certificados.disponibleProximamente")}>
                      <Download className="h-4 w-4" strokeWidth={1.75} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
