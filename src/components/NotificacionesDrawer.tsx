import { useNavigate } from "react-router-dom";
import { Bell, ArrowRight, Trash2, X } from "lucide-react";
import { formatDateTime } from "../lib/format";
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand-900/40 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="azahar-fade-in flex h-full w-full max-w-sm flex-col bg-[var(--surface-card)] shadow-card"
        role="dialog"
        aria-modal="true"
        aria-label="Notificaciones"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-brand-800" strokeWidth={1.75} />
            <h2 className="font-heading text-base font-semibold text-[var(--text-primary)]">Notificaciones</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cargando ? (
            <p className="py-8 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
          ) : notificaciones.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-14 text-center">
              <Bell className="h-8 w-8 text-[var(--text-muted)]" strokeWidth={1.5} />
              <p className="text-sm text-[var(--text-muted)]">No tienes notificaciones pendientes.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {notificaciones.map((n) => (
                <li key={n.id} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-app)] p-3.5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{n.titulo}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{n.descripcion}</p>
                  <p className="mt-1.5 text-[11px] text-[var(--text-muted)]">{formatDateTime(n.fecha)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        navigate(n.ruta);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-800 px-3 py-1.5 text-xs font-semibold text-cream-100 transition hover:bg-brand-900"
                    >
                      Ir
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={() => onEliminar(n.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-status-rechazada-bg hover:text-status-rechazada"
                    >
                      Eliminar
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
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
