interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({ value, max, size = 168, strokeWidth = 14, label, sublabel }: ProgressRingProps) {
  const radio = (size - strokeWidth) / 2;
  const circunferencia = 2 * Math.PI * radio;
  const fraccion = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const offset = circunferencia * (1 - fraccion);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radio} fill="none" stroke="var(--surface-muted)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radio}
          fill="none"
          stroke="var(--color-accent-500)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-mono text-3xl font-semibold text-[var(--text-primary)]">{value}</span>
        {label && <span className="text-xs font-medium text-[var(--text-secondary)]">{label}</span>}
        {sublabel && <span className="text-[11px] text-[var(--text-muted)]">{sublabel}</span>}
      </div>
    </div>
  );
}
