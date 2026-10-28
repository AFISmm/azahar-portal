import { useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChartColumn, Coffee, Globe, Layers, Sparkles, TrendingUp } from "lucide-react";
import { MiniBarChart } from "../../components/MiniBarChart";
import { LineChartComparativo } from "../../components/LineChartComparativo";
import { formatCOP, formatDateTime } from "../../lib/format";
import { useLanguage } from "../../context/LanguageContext";
import {
  ULTIMA_ACTUALIZACION,
  FUENTE_BASE_MUNDIAL,
  statsMundiales,
  etapasProduccion,
  etapaIconos,
  FUENTE_VARIACION_INDUSTRIAL,
  variacionAcumuladaMensual,
  FUENTE_PRODUCCION_AGRICOLA,
  produccionAgricolaAnual,
  FUENTE_BOLSA,
  bolsaPorPeriodo,
  type PeriodoBolsa,
} from "../../lib/mockMercadoCafe";
import { type Tam, WidgetShell } from "./widgetsBase";

// Los cinco widgets originales del Inicio (mercado y producción de café), ahora con tamaños.

const PERIODOS: { id: PeriodoBolsa; claveLabel: string }[] = [
  { id: "dia", claveLabel: "inicioMercado.periodoDia" },
  { id: "semana", claveLabel: "inicioMercado.periodoSemana" },
  { id: "mes", claveLabel: "inicioMercado.periodoMes" },
];

export function FuenteFooter({ fuente }: { fuente: string }) {
  const { t } = useLanguage();
  return (
    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-2">
      <div className="text-[11px] text-[var(--text-muted)]">
        <p>
          {t("inicioMercado.fuentePrefix")} {fuente}
        </p>
        <p>
          {t("inicioMercado.ultimaActualizacionPrefix")} {formatDateTime(ULTIMA_ACTUALIZACION)}
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-300/30 px-2 py-0.5 text-[10px] font-semibold text-accent-500">
        <Sparkles className="h-3 w-3" strokeWidth={1.75} />
        {t("inicioMercado.datosDemostracion")}
      </span>
    </div>
  );
}

export function MiniLineChart({ data, labels, alto = "h-20" }: { data: number[]; labels: string[]; alto?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const ancho = 100;
  const altoVb = 32;
  const minimo = Math.min(...data);
  const maximo = Math.max(...data);
  const rango = maximo - minimo || 1;
  const coords = data.map((v, i) => ({
    x: data.length > 1 ? (i / (data.length - 1)) * ancho : ancho / 2,
    y: altoVb - ((v - minimo) / rango) * altoVb,
  }));
  const puntos = coords.map((c) => `${c.x},${c.y}`).join(" ");

  function manejarMovimiento(e: ReactMouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const proporcion = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHoverIndex(Math.round(proporcion * (data.length - 1)));
  }

  const activo = hoverIndex !== null ? coords[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${ancho} ${altoVb}`}
        preserveAspectRatio="none"
        className={`${alto} w-full cursor-default`}
        onMouseMove={manejarMovimiento}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <polyline points={puntos} fill="none" stroke="var(--color-accent-500)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {activo && (
          <>
            <line x1={activo.x} y1={0} x2={activo.x} y2={altoVb} stroke="var(--border-subtle)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <circle cx={activo.x} cy={activo.y} r={2.2} fill="var(--color-accent-500)" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
      {hoverIndex !== null && (
        <div
          className="pointer-events-none absolute -top-1 -translate-y-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-[var(--text-primary)] shadow-card"
          style={{ left: `${(hoverIndex / Math.max(1, data.length - 1)) * 100}%`, transform: "translate(-50%, -100%)" }}
        >
          {labels[hoverIndex]}: {data[hoverIndex] >= 0 ? "+" : ""}
          {data[hoverIndex].toFixed(1)}%
        </div>
      )}
    </div>
  );
}

export function WidgetBaseMundial({ tam }: { tam: Tam }) {
  const { t } = useLanguage();
  const compacto = tam === "M" || tam === "W";
  return (
    <WidgetShell titulo={t("inicioMercado.cardBaseMundial")} icono={<Globe className="h-4 w-4" strokeWidth={1.75} />}>
      {compacto ? (
        <div className="grid grid-cols-3 gap-2">
          {statsMundiales.map((s) => (
            <div key={s.label} className="min-w-0 rounded-xl bg-[var(--surface-muted)] px-2.5 py-2">
              <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{s.label}</p>
              <p className="font-mono text-lg font-bold leading-tight text-[var(--text-primary)]">
                {s.valor.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </p>
              <p className={`text-[11px] font-semibold ${s.deltaPct >= 0 ? "text-status-aprobada" : "text-status-rechazada"}`}>
                {s.deltaPct >= 0 ? "+" : ""}
                {s.deltaPct}%
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className={`grid flex-1 gap-3 ${tam === "XL" ? "grid-cols-3" : "grid-cols-1"}`}>
            {statsMundiales.map((s) => (
              <div key={s.label} className="rounded-xl bg-[var(--surface-muted)] p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{s.label}</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[var(--text-primary)]">
                  {s.valor.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">{s.unidad}</span>
                </p>
                <p className={`text-xs font-semibold ${s.deltaPct >= 0 ? "text-status-aprobada" : "text-status-rechazada"}`}>
                  {s.deltaPct >= 0 ? "+" : ""}
                  {s.deltaPct}% {t("inicioMercado.interanual")}
                </p>
              </div>
            ))}
          </div>
          {tam === "XL" && <FuenteFooter fuente={FUENTE_BASE_MUNDIAL} />}
        </div>
      )}
    </WidgetShell>
  );
}

export function WidgetValorBolsa({ tam }: { tam: Tam }) {
  const { t } = useLanguage();
  const [periodo, setPeriodo] = useState<PeriodoBolsa>("mes");
  const serie = bolsaPorPeriodo[periodo];
  const actual = serie.actual.at(-1)!;
  const comparacion = serie.anterior.at(-1)!;
  const variacionPct = useMemo(() => ((actual - comparacion) / comparacion) * 100, [actual, comparacion]);

  return (
    <WidgetShell titulo={t("inicioMercado.cardValorBolsa")} icono={<Coffee className="h-4 w-4" strokeWidth={1.75} />}>
      <div className="flex h-full flex-col">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex w-fit rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-0.5">
            {PERIODOS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriodo(p.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  periodo === p.id ? "bg-brand-800 text-cream-100 shadow-card" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t(p.claveLabel as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-mono text-lg font-bold text-[var(--text-primary)]">{formatCOP(actual)}</p>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${variacionPct >= 0 ? "bg-status-aprobada-bg text-status-aprobada" : "bg-status-rechazada-bg text-status-rechazada"}`}>
              {variacionPct >= 0 ? "+" : ""}
              {variacionPct.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="min-h-0 flex-1">
          <LineChartComparativo
            actual={serie.actual}
            anterior={serie.anterior}
            labelActual={serie.labelActual}
            labelAnterior={serie.labelAnterior}
            xLabels={tam === "XL" ? serie.xLabels : undefined}
            formatValue={formatCOP}
          />
        </div>
        {tam === "XL" && <FuenteFooter fuente={FUENTE_BOLSA} />}
      </div>
    </WidgetShell>
  );
}

export function WidgetVariacionIndustrial({ tam }: { tam: Tam }) {
  const { t } = useLanguage();
  const ultima = variacionAcumuladaMensual.at(-1)!;
  const color = ultima.valor >= 0 ? "text-status-aprobada" : "text-status-rechazada";
  const datos = variacionAcumuladaMensual.map((d) => d.valor);
  const etiquetas = variacionAcumuladaMensual.map((d) => d.mes);
  return (
    <WidgetShell titulo={t("inicioMercado.cardVariacionIndustrial")} icono={<TrendingUp className="h-4 w-4" strokeWidth={1.75} />}>
      {tam === "M" ? (
        <div className="flex h-full items-center gap-4">
          <div className="shrink-0">
            <p className={`font-mono text-3xl font-bold ${color}`}>
              {ultima.valor >= 0 ? "+" : ""}
              {ultima.valor.toFixed(1)}%
            </p>
            <p className="text-[11px] text-[var(--text-muted)]">{t("inicioMercado.variacionAcumulada12Meses")}</p>
          </div>
          <div className="min-w-0 flex-1">
            <MiniLineChart data={datos} labels={etiquetas} alto="h-14" />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <p className={`font-mono text-3xl font-bold ${color}`}>
            {ultima.valor >= 0 ? "+" : ""}
            {ultima.valor.toFixed(1)}%
          </p>
          <p className="mb-2 text-xs text-[var(--text-muted)]">{t("inicioMercado.variacionAcumulada12Meses")}</p>
          <MiniLineChart data={datos} labels={etiquetas} alto="h-24" />
          <div className="mt-1 flex justify-between text-[10px] text-[var(--text-muted)]">
            <span>{variacionAcumuladaMensual[0].mes}</span>
            <span>{ultima.mes}</span>
          </div>
          <div className="mt-auto">
            <FuenteFooter fuente={FUENTE_VARIACION_INDUSTRIAL} />
          </div>
        </div>
      )}
    </WidgetShell>
  );
}

export function WidgetProduccionAgricola({ tam }: { tam: Tam }) {
  const { t } = useLanguage();
  const ultima = produccionAgricolaAnual.at(-1)!;
  return (
    <WidgetShell titulo={t("inicioMercado.cardProduccionAgricola")} icono={<ChartColumn className="h-4 w-4" strokeWidth={1.75} />}>
      {tam === "M" ? (
        <div className="flex h-full items-center gap-4">
          <div className="shrink-0">
            <p className="font-mono text-3xl font-bold text-[var(--text-primary)]">{ultima.valor.toLocaleString("es-CO")}</p>
            <p className="text-[11px] text-[var(--text-muted)]">
              {t("inicioMercado.milesToneladas")} · {ultima.anio}
            </p>
          </div>
          <div className="min-w-0 flex-1 [&>div]:h-16">
            <MiniBarChart data={produccionAgricolaAnual.map((d) => ({ label: d.anio, value: d.valor }))} />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <p className="font-mono text-3xl font-bold text-[var(--text-primary)]">{ultima.valor.toLocaleString("es-CO")}</p>
          <p className="mb-3 text-xs text-[var(--text-muted)]">
            {t("inicioMercado.milesToneladas")} · {ultima.anio}
          </p>
          <MiniBarChart
            data={produccionAgricolaAnual.map((d) => ({ label: d.anio, value: d.valor }))}
            formatValue={(v) => `${v.toLocaleString("es-CO")} ${t("inicioMercado.milT")}`}
          />
          <div className="mt-auto">
            <FuenteFooter fuente={FUENTE_PRODUCCION_AGRICOLA} />
          </div>
        </div>
      )}
    </WidgetShell>
  );
}

export function WidgetCadenaProduccion({ tam }: { tam: Tam }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <WidgetShell titulo={t("inicioMercado.cardCadenaProduccion")} icono={<Layers className="h-4 w-4" strokeWidth={1.75} />} onClick={() => navigate("/cadena-produccion")}>
      <div className="flex h-full flex-col">
        <div className={`grid flex-1 content-center gap-2 ${tam === "W" || tam === "XL" ? "grid-cols-7" : "grid-cols-4"}`}>
          {etapasProduccion.map((etapa) => {
            const Icon = etapaIconos[etapa.id] ?? Layers;
            return (
              <div key={etapa.id} className="flex flex-col items-center gap-1 text-center">
                <div className={`flex items-center justify-center rounded-full bg-cream-200 text-brand-800 ${tam === "M" || tam === "W" ? "h-8 w-8" : "h-10 w-10"}`}>
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                {tam !== "M" && <p className="text-[11px] font-semibold leading-tight text-[var(--text-primary)]">{etapa.titulo}</p>}
              </div>
            );
          })}
        </div>
        <p className="mt-1 flex items-center justify-end gap-1.5 text-xs font-semibold text-accent-500">
          {t("inicioMercado.verProcesoCompleto")}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
        </p>
      </div>
    </WidgetShell>
  );
}
