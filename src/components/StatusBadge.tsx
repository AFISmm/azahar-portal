import type { SolicitudEstado } from "../lib/types";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ICONO_CONFIG: Record<SolicitudEstado, { bg: string; text: string; Icon: typeof Clock }> = {
  pendiente: { bg: "bg-status-pendiente-bg", text: "text-status-pendiente", Icon: Clock },
  aprobada: { bg: "bg-status-aprobada-bg", text: "text-status-aprobada", Icon: CheckCircle2 },
  rechazada: { bg: "bg-status-rechazada-bg", text: "text-status-rechazada", Icon: XCircle },
};

export function StatusBadge({ estado }: { estado: SolicitudEstado }) {
  const { t } = useLanguage();
  const { bg, text, Icon } = ICONO_CONFIG[estado];
  const LABEL: Record<SolicitudEstado, string> = {
    pendiente: t("statusBadge.pendiente"),
    aprobada: t("statusBadge.aprobada"),
    rechazada: t("statusBadge.rechazada"),
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${bg} ${text}`}>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {LABEL[estado]}
    </span>
  );
}

export function TipoBadge({ tipo }: { tipo: string }) {
  const { t } = useLanguage();
  const TIPO_LABEL: Record<string, string> = {
    vacaciones: t("statusBadge.vacaciones"),
    incapacidad: t("statusBadge.incapacidad"),
    documento: t("statusBadge.documento"),
    certificado: t("statusBadge.certificado"),
  };
  return (
    <span className="inline-flex items-center rounded-full bg-cream-200 px-2.5 py-1 text-xs font-semibold text-brand-800">
      {TIPO_LABEL[tipo] ?? tipo}
    </span>
  );
}
