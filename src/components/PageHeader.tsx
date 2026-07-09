import type { ReactNode } from "react";

interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

// Las notificaciones y el interruptor de tema ya no viven aquí: son
// controles globales fijos en la esquina superior derecha (ver
// HeaderControles.tsx y AppShell.tsx), visibles sin importar el scroll de
// la página. `children` sigue siendo para botones propios de cada página
// (ej. "Radicar PQR", "Subir documento").
export function PageHeader({ breadcrumb, title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{breadcrumb}</p>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
