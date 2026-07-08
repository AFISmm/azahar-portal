interface LineChartComparativoProps {
  actual: number[];
  anterior: number[];
  labelActual: string;
  labelAnterior: string;
  xLabels?: string[];
  height?: number;
}

/** Gráfico de líneas ligero (sin librerías) que compara dos series numéricas, ej. periodo actual vs. periodo anterior. */
export function LineChartComparativo({ actual, anterior, labelActual, labelAnterior, xLabels, height = 40 }: LineChartComparativoProps) {
  const ancho = 100;
  const todos = [...actual, ...anterior];
  const minimo = Math.min(...todos);
  const maximo = Math.max(...todos);
  const rango = maximo - minimo || 1;
  const n = Math.max(actual.length, anterior.length);

  const puntos = (serie: number[]) =>
    serie
      .map((v, i) => {
        const x = n > 1 ? (i / (n - 1)) * ancho : ancho / 2;
        const y = height - ((v - minimo) / rango) * height;
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${ancho} ${height}`} preserveAspectRatio="none" className="h-28 w-full">
        <polyline
          points={puntos(anterior)}
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth={2}
          strokeDasharray="3 2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={puntos(actual)}
          fill="none"
          stroke="var(--color-accent-500)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {xLabels && xLabels.length > 0 && (
        <div className="mt-1 flex justify-between text-[10px] text-[var(--text-muted)]">
          {xLabels.map((label, i) => (
            <span key={`${label}-${i}`} className={i === 0 || i === xLabels.length - 1 ? "" : "hidden sm:inline"}>
              {label}
            </span>
          ))}
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
