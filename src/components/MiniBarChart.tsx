interface MiniBarChartProps {
  data: { label: string; value: number }[];
  barClassName?: string;
}

export function MiniBarChart({ data, barClassName = "bg-accent-500" }: MiniBarChartProps) {
  const maximo = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="flex h-24 items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex h-16 w-full items-end overflow-hidden rounded-md bg-[var(--surface-muted)]">
            <div
              className={`w-full rounded-md ${barClassName}`}
              style={{ height: `${Math.max(6, (d.value / maximo) * 100)}%`, transition: "height 0.5s ease" }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-[10px] font-medium uppercase text-[var(--text-muted)]">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
