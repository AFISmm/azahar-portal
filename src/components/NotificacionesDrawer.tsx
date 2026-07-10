import { useNavigate } from "react-router-dom";
import { Bell, ArrowRight, Trash2, X } from "lucide-react";
import { formatDateTime } from "../lib/format";
import { useLanguage } from "../context/LanguageContext";
import type { Notificacion } from "../hooks/useNotificaciones";

interface Props {
  open: boolean;
  onClose: () => void;
  notificaciones: Notificacion[];
  cargando: boolean;
  onEliminar: (id: string) => void;
}

export function NotificacionesDrawer({ open, onClose, notificaciones, cargando, onEliminar }: Props) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-9 bottom-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="azahar-fade-in flex h-full w-64 flex-col border-l border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-card"
        role="dialog"
        aria-modal="true"
        aria-label={t("notificaciones.titulo")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-brand-800" strokeWidth={1.75} />
            <h2 className="font-heading text-sm font-semibold text-[var(--text-primary)]">{t("notificaciones.titulo")}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          {cargando ? (
            <p className="py-8 text-center text-xs text-[var(--text-muted)]">{t("notificaciones.cargando")}</p>
          ) : notificaciones.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-14 text-center">
              <Bell className="h-8 w-8 text-[var(--text-muted)]" strokeWidth={1.5} />
              <p className="text-xs text-[var(--text-muted)]">{t("notificaciones.vacio")}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {notificaciones.map((n) => (
                <li key={n.id} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-app)] p-3">
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{n.titulo}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{n.descripcion}</p>
                  <p className="mt-1.5 text-[11px] text-[var(--text-muted)]">{formatDateTime(n.fecha)}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => {
                        onClose();
                        navigate(n.ruta);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg bg-brand-800 px-2.5 py-1 text-[11px] font-semibold text-cream-100 transition hover:bg-brand-900"
                    >
                      {t("notificaciones.ir")}
                      <ArrowRight className="h-3 w-3" strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={() => onEliminar(n.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-secondary)] transition hover:bg-status-rechazada-bg hover:text-status-rechazada"
                    >
                      {t("notificaciones.eliminar")}
                      <Trash2 className="h-3 w-3" strokeWidth={1.75} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
