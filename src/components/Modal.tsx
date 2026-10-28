import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  widthClassName?: string;
  /** Para formularios largos (ej. crear/editar empleado): ocupa casi toda la pantalla en vez de una tarjeta pequeña centrada, para que nunca haga falta scroll para ver dónde termina. */
  fullScreen?: boolean;
}

export function Modal({ open, onClose, title, children, widthClassName = "max-w-lg", fullScreen = false }: ModalProps) {
  if (!open) return null;

  // Portal a document.body: cualquier ancestro con una animación
  // "azahar-fade-in" (transform: translateY(...) both) crea un containing
  // block para elementos "fixed" y los atrapa dentro de su propio tamaño en
  // vez del viewport real. Renderizar el modal fuera de ese árbol evita el
  // problema sin tener que perseguir cuál ancestro tiene la animación.
  const contenido = fullScreen ? (
    <div className="fixed inset-x-0 bottom-0 top-9 z-50 flex md:pl-64" onClick={onClose}>
      <div
        className="m-3 flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-6 py-3">
          <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pb-4 pt-11 md:pl-64" onClick={onClose}>
      <div
        className={`my-auto flex max-h-[calc(100vh-3.5rem)] w-full ${widthClassName} flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-card`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-6 py-3">
          <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(contenido, document.body);
}
