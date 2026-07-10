import { useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChartColumn, Coffee, Globe, Layers, Sparkles, TrendingUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { MiniBarChart } from "../components/MiniBarChart";
import { LineChartComparativo } from "../components/LineChartComparativo";
import { formatCOP, formatDateTime } from "../lib/format";
import { useLanguage } from "../context/LanguageContext";
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
} from "../lib/mockMercadoCafe";

const PERIODOS: { id: PeriodoBolsa; claveLabel: string }[] = [
  { id: "dia", claveLabel: "inicioMercado.periodoDia" },
  { id: "semana", claveLabel: "inicioMercado.periodoSemana" },
  { id: "mes", claveLabel: "inicioMercado.periodoMes" },
];

export default function InicioMercado() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [periodo, setPeriodo] = useState<PeriodoBolsa>("mes");

  const ultimaVariacion = variacionAcumuladaMensual.at(-1)!;
  const ultimaProduccion = produccionAgricolaAnual.at(-1)!;

  const serieBolsa = bolsaPorPeriodo[periodo];
  const valorActualBolsa = serieBolsa.actual.at(-1)!;
  const valorComparacionBolsa = serieBolsa.anterior.at(-1)!;
  const variacionBolsaPct = useMemo(
    () => ((valorActualBolsa - valorComparacionBolsa) / valorComparacionBolsa) * 100,
    [valorActualBolsa, valorComparacionBolsa],
  );

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb={t("inicioMercado.breadcrumb")}
        title={t("inicioMercado.titulo")}
        description={t("inicioMercado.descripcion")}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Card A — Base de datos mundial del café */}
        <Card title={t("inicioMercado.cardBaseMundial")} icon={<Globe className="h-4 w-4" strokeWidth={1.75} />} className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {statsMundiales.map((s) => (
              <div key={s.label} className="rounded-xl bg-[var(--surface-muted)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{s.label}</p>
                <p className="mt-1.5 font-mono text-2xl font-bold text-[var(--text-primary)]">
                  {s.valor.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{s.unidad}</p>
                <p className={`mt-1 text-xs font-semibold ${s.deltaPct >= 0 ? "text-status-aprobada" : "text-status-rechazada"}`}>
                  {s.deltaPct >= 0 ? "+" : ""}
                  {s.deltaPct}% {t("inicioMercado.interanual")}
                </p>
              </div>
            ))}
          </div>
          <FuenteFooter fuente={FUENTE_BASE_MUNDIAL} />
        </Card>

        {/* Card E — Valor del café en bolsa (ahora en la posición ancha) */}
        <Card title={t("inicioMercado.cardValorBolsa")} icon={<Coffee className="h-4 w-4" strokeWidth={1.75} />} className="lg:col-span-3">
          <div className="mb-4 inline-flex w-fit rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-1">
            {PERIODOS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriodo(p.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  periodo === p.id ? "bg-brand-800 text-cream-100 shadow-card" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t(p.claveLabel as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          <div className="mb-3 flex flex-wrap items-baseline gap-2.5">
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{formatCOP(valorActualBolsa)}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                variacionBolsaPct >= 0 ? "bg-status-aprobada-bg text-status-aprobada" : "bg-status-rechazada-bg text-status-rechazada"
              }`}
            >
              {variacionBolsaPct >= 0 ? "+" : ""}
              {variacionBolsaPct.toFixed(1)}%
            </span>
          </div>

          <LineChartComparativo
            actual={serieBolsa.actual}
            anterior={serieBolsa.anterior}
            labelActual={serieBolsa.labelActual}
            labelAnterior={serieBolsa.labelAnterior}
            xLabels={serieBolsa.xLabels}
            formatValue={formatCOP}
          />

          <p className="mt-2 text-[11px] text-[var(--text-muted)]">{t("inicioMercado.notaPrecioReferencia")}</p>
          <FuenteFooter fuente={FUENTE_BOLSA} />
        </Card>

        {/* Card C — Variación % acumulada, producción industrial */}
        <Card title={t("inicioMercado.cardVariacionIndustrial")} icon={<TrendingUp className="h-4 w-4" strokeWidth={1.75} />}>
          <p className={`font-mono text-3xl font-bold ${ultimaVariacion.valor >= 0 ? "text-status-aprobada" : "text-status-rechazada"}`}>
            {ultimaVariacion.valor >= 0 ? "+" : ""}
            {ultimaVariacion.valor.toFixed(1)}%
          </p>
          <p className="mb-3 text-xs text-[var(--text-muted)]">{t("inicioMercado.variacionAcumulada12Meses")}</p>
          <MiniLineChart data={variacionAcumuladaMensual.map((d) => d.valor)} labels={variacionAcumuladaMensual.map((d) => d.mes)} />
          <div className="mt-1.5 flex justify-between text-[10px] text-[var(--text-muted)]">
            <span>{variacionAcumuladaMensual[0].mes}</span>
            <span>{ultimaVariacion.mes}</span>
          </div>
          <FuenteFooter fuente={FUENTE_VARIACION_INDUSTRIAL} />
        </Card>

        {/* Card D — Producción agrícola anual */}
        <Card title={t("inicioMercado.cardProduccionAgricola")} icon={<ChartColumn className="h-4 w-4" strokeWidth={1.75} />}>
          <p className="font-mono text-3xl font-bold text-[var(--text-primary)]">{ultimaProduccion.valor.toLocaleString("es-CO")}</p>
          <p className="mb-4 text-xs text-[var(--text-muted)]">
            {t("inicioMercado.milesToneladas")} · {ultimaProduccion.anio}
          </p>
          <MiniBarChart
            data={produccionAgricolaAnual.map((d) => ({ label: d.anio, value: d.valor }))}
            formatValue={(v) => `${v.toLocaleString("es-CO")} ${t("inicioMercado.milT")}`}
          />
          <FuenteFooter fuente={FUENTE_PRODUCCION_AGRICOLA} />
        </Card>

        {/* Card B — Cadena de producción del café (ahora en la posición angosta, tarjeta completa clicable) */}
        <Card
          title={t("inicioMercado.cardCadenaProduccion")}
          icon={<Layers className="h-4 w-4" strokeWidth={1.75} />}
          onClick={() => navigate("/cadena-produccion")}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {etapasProduccion.map((etapa) => {
              const Icon = etapaIconos[etapa.id] ?? Layers;
              return (
                <div key={etapa.id} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-brand-800">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <p className="text-[11px] font-semibold leading-tight text-[var(--text-primary)]">{etapa.titulo}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 flex items-center justify-end gap-1.5 text-sm font-semibold text-accent-500">
            {t("inicioMercado.verProcesoCompleto")}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </p>
        </Card>
      </div>
    </div>
  );
}

function FuenteFooter({ fuente }: { fuente: string }) {
  const { t } = useLanguage();
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-3">
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

function MiniLineChart({ data, labels }: { data: number[]; labels: string[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const ancho = 100;
  const alto = 32;
  const minimo = Math.min(...data);
  const maximo = Math.max(...data);
  const rango = maximo - minimo || 1;
  const coords = data.map((v, i) => ({
    x: data.length > 1 ? (i / (data.length - 1)) * ancho : ancho / 2,
    y: alto - ((v - minimo) / rango) * alto,
  }));
  const puntos = coords.map((c) => `${c.x},${c.y}`).join(" ");

  function manejarMovimiento(e: ReactMouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const proporcion = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const indice = Math.round(proporcion * (data.length - 1));
    setHoverIndex(indice);
  }

  const activo = hoverIndex !== null ? coords[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${ancho} ${alto}`}
        preserveAspectRatio="none"
        className="h-20 w-full cursor-default"
        onMouseMove={manejarMovimiento}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <polyline
          points={puntos}
          fill="none"
          stroke="var(--color-accent-500)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {activo && (
          <>
            <line x1={activo.x} y1={0} x2={activo.x} y2={alto} stroke="var(--border-subtle)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
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
