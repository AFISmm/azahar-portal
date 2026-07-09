import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

interface LineChartComparativoProps {
  actual: number[];
  anterior: number[];
  labelActual: string;
  labelAnterior: string;
  xLabels?: string[];
  height?: number;
  formatValue?: (value: number) => string;
}

/** Gráfico de líneas ligero (sin librerías) que compara dos series numéricas, ej. periodo actual vs. periodo anterior. */
export function LineChartComparativo({
  actual,
  anterior,
  labelActual,
  labelAnterior,
  xLabels,
  height = 40,
  formatValue = (v) => `${v}`,
}: LineChartComparativoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const ancho = 100;
  const todos = [...actual, ...anterior];
  const minimo = Math.min(...todos);
  const maximo = Math.max(...todos);
  const rango = maximo - minimo || 1;
  const n = Math.max(actual.length, anterior.length);

  const coordsDe = (serie: number[]) =>
    serie.map((v, i) => ({
      x: n > 1 ? (i / (n - 1)) * ancho : ancho / 2,
      y: height - ((v - minimo) / rango) * height,
    }));
  const coordsActual = coordsDe(actual);
  const coordsAnterior = coordsDe(anterior);
  const puntos = (coords: { x: number; y: number }[]) => coords.map((c) => `${c.x},${c.y}`).join(" ");

  function manejarMovimiento(e: ReactMouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const proporcion = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHoverIndex(Math.round(proporcion * (n - 1)));
  }

  const puntoActual = hoverIndex !== null ? coordsActual[hoverIndex] : null;
  const puntoAnterior = hoverIndex !== null ? coordsAnterior[hoverIndex] : null;

  return (
    <div>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${ancho} ${height}`}
          preserveAspectRatio="none"
          className="h-28 w-full cursor-default"
          onMouseMove={manejarMovimiento}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <polyline
            points={puntos(coordsAnterior)}
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth={2}
            strokeDasharray="3 2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={puntos(coordsActual)}
            fill="none"
            stroke="var(--color-accent-500)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {hoverIndex !== null && puntoActual && (
            <>
              <line
                x1={puntoActual.x}
                y1={0}
                x2={puntoActual.x}
                y2={height}
                stroke="var(--border-subtle)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={puntoActual.x} cy={puntoActual.y} r={2.4} fill="var(--color-accent-500)" vectorEffect="non-scaling-stroke" />
              {puntoAnterior && <circle cx={puntoAnterior.x} cy={puntoAnterior.y} r={2} fill="var(--text-muted)" vectorEffect="non-scaling-stroke" />}
            </>
          )}
        </svg>
        {hoverIndex !== null && puntoActual && (
          <div
            className="pointer-events-none absolute -top-1 -translate-y-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] px-2.5 py-1.5 text-[11px] whitespace-nowrap text-[var(--text-primary)] shadow-card"
            style={{ left: `${(hoverIndex / Math.max(1, n - 1)) * 100}%`, transform: "translate(-50%, -100%)" }}
          >
            {xLabels?.[hoverIndex] && <p className="mb-0.5 font-semibold text-[var(--text-muted)]">{xLabels[hoverIndex]}</p>}
            <p className="flex items-center gap-1.5 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent-500)" }} />
              {formatValue(actual[hoverIndex])}
            </p>
            {anterior[hoverIndex] !== undefined && (
              <p className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--text-muted)" }} />
                {formatValue(anterior[hoverIndex])}
              </p>
            )}
          </div>
        )}
      </div>

      {xLabels && xLabels.length > 0 && (
        <div className="mt-1 flex justify-between text-[10px] text-[var(--text-muted)]">
          {xLabels.map((label, i) => {
            // Con pocos puntos (semana, horas del día) se muestran todas las
            // etiquetas; con muchos (mes completo, día a día) solo se
            // muestran algunas parejas para que no se amontonen, aunque el
            // arreglo completo sigue disponible para el tooltip al pasar el mouse.
            const paso = Math.max(1, Math.ceil(xLabels.length / 8));
            const esVisible = i === 0 || i === xLabels.length - 1 || i % paso === 0;
            return (
              <span key={`${label}-${i}`} className={esVisible ? "" : "invisible"}>
                {label}
              </span>
            );
          })}
        </div>
      )}

      <div className="mt-2 flex items-center gap-4 text-xs text-[var(--text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-accent-500)" }} />
          {labelActual}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--text-muted)" }} />
          {labelAnterior}
        </span>
      </div>
    </div>
  );
}
