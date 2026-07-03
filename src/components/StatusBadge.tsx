import type { SolicitudEstado } from "../lib/types";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const CONFIG: Record<SolicitudEstado, { label: string; bg: string; text: string; Icon: typeof Clock }> = {
  pendiente: { label: "Pendiente", bg: "bg-status-pendiente-bg", text: "text-status-pendiente", Icon: Clock },
  aprobada: { label: "Aprobada", bg: "bg-status-aprobada-bg", text: "text-status-aprobada", Icon: CheckCircle2 },
  rechazada: { label: "Rechazada", bg: "bg-status-rechazada-bg", text: "text-status-rechazada", Icon: XCircle },
};

export function StatusBadge({ estado }: { estado: SolicitudEstado }) {
  const { label, bg, text, Icon } = CONFIG[estado];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${bg} ${text}`}>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {label}
    </span>
  );
}

const TIPO_LABEL: Record<string, string> = {
  vacaciones: "Vacaciones",
  incapacidad: "Incapacidad",
  documento: "Documento",
  certificado: "Certificado",
};

export function TipoBadge({ tipo }: { tipo: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-cream-200 px-2.5 py-1 text-xs font-semibold text-brand-800">
      {TIPO_LABEL[tipo] ?? tipo}
    </span>
  );
}
