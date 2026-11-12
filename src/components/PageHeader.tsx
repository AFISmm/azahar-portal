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
    <div className="page-header-band mb-6 mt-7 flex flex-col gap-4 rounded-2xl bg-brand-800 px-6 py-5 text-cream-100 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <span aria-hidden="true" className="mb-2 block h-1 w-10 rounded-full bg-accent-500" />
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent-300">{breadcrumb}</p>
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
        {description && <p className="mt-1 text-sm text-cream-200/85">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}
