import type { ReactNode } from "react";

// ============================================================================
// Base del tablero de widgets del Inicio (estilo iOS): tamaños, contenedor
// común y utilidades. Cada widget recibe el tamaño elegido y adapta lo que
// muestra: más compacto en los chicos, con más detalle en los grandes.
// ============================================================================

export type Tam = "S" | "M" | "W" | "L" | "XL";

/** Columnas y filas que ocupa cada tamaño en la cuadrícula (4 columnas en pantallas grandes, 2 en pequeñas). */
export const DIM: Record<Tam, { cols: number; rows: number; etiqueta: string }> = {
  S: { cols: 1, rows: 1, etiqueta: "Pequeño" },
  M: { cols: 2, rows: 1, etiqueta: "Mediano" },
  W: { cols: 4, rows: 1, etiqueta: "Ancho" },
  L: { cols: 2, rows: 2, etiqueta: "Grande" },
  XL: { cols: 4, rows: 2, etiqueta: "Extra grande" },
};

interface WidgetShellProps {
  titulo: string;
  icono: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

/** Marco común de todos los widgets: tarjeta con título que ocupa toda la celda de la cuadrícula. */
export function WidgetShell({ titulo, icono, children, onClick }: WidgetShellProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 shadow-card ${
        onClick ? "cursor-pointer transition hover:border-accent-500/50" : ""
      }`}
    >
      <h3 className="mb-2 flex shrink-0 items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
        <span className="shrink-0">{icono}</span>
        <span className="truncate">{titulo}</span>
      </h3>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** Número grande con su etiqueta: la pieza básica de los widgets pequeños. */
export function Cifra({ valor, etiqueta, detalle, tono }: { valor: ReactNode; etiqueta?: string; detalle?: string; tono?: "ok" | "mal" | "aviso" }) {
  const color = tono === "ok" ? "text-status-aprobada" : tono === "mal" ? "text-status-rechazada" : tono === "aviso" ? "text-status-pendiente" : "text-[var(--text-primary)]";
  return (
    <div className="min-w-0">
      {/* los montos largos (ej. $8.200.000) usan letra más chica para no cortarse en un widget pequeño */}
      <p className={`truncate font-mono font-bold leading-tight ${typeof valor === "string" && valor.length > 9 ? "text-lg" : "text-2xl"} ${color}`}>{valor}</p>
      {etiqueta && <p className="truncate text-xs text-[var(--text-secondary)]">{etiqueta}</p>}
      {detalle && <p className="truncate text-[11px] text-[var(--text-muted)]">{detalle}</p>}
    </div>
  );
}

export function Cargando({ texto = "Cargando…" }: { texto?: string }) {
  return <p className="text-xs text-[var(--text-muted)]">{texto}</p>;
}

export function SinDatos({ texto }: { texto: string }) {
  return <p className="text-xs text-[var(--text-muted)]">{texto}</p>;
}
