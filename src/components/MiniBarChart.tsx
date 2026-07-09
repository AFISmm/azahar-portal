import { useState } from "react";

interface MiniBarChartProps {
  data: { label: string; value: number }[];
  barClassName?: string;
  formatValue?: (value: number) => string;
}

export function MiniBarChart({ data, barClassName = "bg-accent-500", formatValue }: MiniBarChartProps) {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const maximo = Math.max(1, ...data.map((d) => d.value));
  const activo = data.find((d) => d.label === hoverLabel) ?? null;

  return (
    <div className="flex h-24 items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="relative flex flex-1 flex-col items-center gap-1.5">
          {activo?.label === d.label && (
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-[var(--text-primary)] shadow-card">
              {formatValue ? formatValue(activo.value) : activo.value}
            </div>
          )}
          <div
            className="flex h-16 w-full cursor-default items-end overflow-hidden rounded-md bg-[var(--surface-muted)]"
            onMouseEnter={() => setHoverLabel(d.label)}
            onMouseLeave={() => setHoverLabel(null)}
          >
            <div
              className={`w-full rounded-md transition-opacity ${barClassName} ${hoverLabel && hoverLabel !== d.label ? "opacity-50" : ""}`}
              style={{ height: `${Math.max(6, (d.value / maximo) * 100)}%`, transition: "height 0.5s ease" }}
            />
          </div>
          <span className="text-[10px] font-medium uppercase text-[var(--text-muted)]">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
