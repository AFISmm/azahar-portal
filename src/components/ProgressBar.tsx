interface ProgressBarProps {
  value: number;
  max: number;
  trackClassName?: string;
  fillClassName?: string;
}

export function ProgressBar({ value, max, trackClassName = "bg-brand-900/15", fillClassName = "bg-accent-500" }: ProgressBarProps) {
  const fraccion = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full ${trackClassName}`}>
      <div
        className={`h-full rounded-full ${fillClassName}`}
        style={{ width: `${fraccion * 100}%`, transition: "width 0.6s ease" }}
      />
    </div>
  );
}
