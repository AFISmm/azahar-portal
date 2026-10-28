import type { ReactNode } from "react";
import { Card } from "../../components/Card";
import { useAcceso } from "../../auth/acceso";
import { IS_DEMO_MODE } from "../../lib/backendMode";
import type { EstadoHito } from "../../lib/contableApi";
import { formatCOP } from "../../lib/format";

export { AccesoDenegado, Cargando, ErrorCaja, useCarga } from "../trazabilidad/comunes";

/** 'ver' consulta todo el módulo; el módulo es de consulta y cargue local, no escribe en Alegra. */
export function usePermisoContable() {
  const acceso = useAcceso();
  return { tieneAcceso: acceso.ver("contable") };
}

export function AvisoDemo() {
  if (!IS_DEMO_MODE) return null;
  return (
    <p className="rounded-lg bg-accent-300/30 px-3 py-2 text-xs font-semibold text-brand-800">
      Modo demo: se muestran datos de EJEMPLO inventados. Los datos reales de Azahar solo se ven con el backend activo y el permiso del módulo.
    </p>
  );
}

export const cop = (n: number | null | undefined) => formatCOP(n);
export const num = (n: number | null | undefined) => (n === null || n === undefined ? "—" : new Intl.NumberFormat("es-CO").format(n));
export const pesos2 = (n: number | null | undefined) =>
  n === null || n === undefined ? "—" : new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const ESTADOS: Record<EstadoHito, { texto: string; clase: string }> = {
  hecho: { texto: "Hecho", clase: "bg-status-aprobada-bg text-status-aprobada" },
  "listo-no-subido": { texto: "Listo, sin subir", clase: "bg-status-pendiente-bg text-status-pendiente" },
  bloqueado: { texto: "Bloqueado", clase: "bg-status-rechazada-bg text-status-rechazada" },
};

export function EstadoPill({ estado }: { estado: EstadoHito }) {
  const e = ESTADOS[estado];
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${e.clase}`}>{e.texto}</span>;
}

export function Kpi({ etiqueta, valor, nota }: { etiqueta: string; valor: ReactNode; nota?: string }) {
  return (
    <Card className="text-center">
      <p className="font-heading text-2xl font-bold text-[var(--text-primary)]">{valor}</p>
      <p className="text-xs font-semibold text-[var(--text-secondary)]">{etiqueta}</p>
      {nota && <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{nota}</p>}
    </Card>
  );
}

/** Contenedor de tabla con scroll horizontal. */
export function Tabla({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
      <table className="w-full min-w-max text-left text-sm">{children}</table>
    </div>
  );
}

export const TH = "whitespace-nowrap bg-[var(--surface-muted)] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]";
export const TD = "whitespace-nowrap border-t border-[var(--border-subtle)] px-3 py-2 text-[var(--text-primary)]";
export const TD_NUM = `${TD} text-right tabular-nums`;

export function Pestanas<T extends string>({ valor, opciones, onCambiar }: { valor: T; opciones: { clave: T; etiqueta: string }[]; onCambiar: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist">
      {opciones.map((o) => (
        <button
          key={o.clave}
          role="tab"
          aria-selected={valor === o.clave}
          onClick={() => onCambiar(o.clave)}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
            valor === o.clave ? "bg-brand-800 text-cream-100" : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-cream-200"
          }`}
        >
          {o.etiqueta}
        </button>
      ))}
    </div>
  );
}

export function Notas({ notas }: { notas: string[] }) {
  if (!notas.length) return null;
  return (
    <ul className="list-disc space-y-1 pl-5 text-xs text-[var(--text-secondary)]">
      {notas.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}
