import { useState, type ReactNode } from "react";
import { Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NotificacionesDrawer } from "./NotificacionesDrawer";
import { useNotificaciones } from "../hooks/useNotificaciones";

interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ breadcrumb, title, description, children }: PageHeaderProps) {
  const [abierto, setAbierto] = useState(false);
  const { notificaciones, cargando, eliminar } = useNotificaciones();

  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{breadcrumb}</p>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {children}
        <button
          onClick={() => setAbierto(true)}
          className="relative rounded-full border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          aria-label="Notificaciones"
          title="Notificaciones"
        >
          <Bell className="h-4 w-4" strokeWidth={1.75} />
          {notificaciones.length > 0 && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-500" />}
        </button>
        <ThemeToggle />
      </div>

      <NotificacionesDrawer
        open={abierto}
        onClose={() => setAbierto(false)}
        notificaciones={notificaciones}
        cargando={cargando}
        onEliminar={eliminar}
      />
    </div>
  );
}
