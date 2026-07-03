import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  widthClassName?: string;
}

export function Modal({ open, onClose, title, children, widthClassName = "max-w-lg" }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-brand-900/40 px-4 py-10 backdrop-blur-[2px]">
      <div
        className={`azahar-fade-in w-full ${widthClassName} rounded-2xl bg-[var(--surface-card)] p-6 shadow-card`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
