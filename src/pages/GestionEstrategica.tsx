import { Compass, Sparkles, Target } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { iniciales } from "../lib/format";
import { iniciativasEstrategicas, kpisEstrategicos } from "../lib/mockGestion";

export default function GestionEstrategica() {
  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Gestión del negocio"
        title="Gestión Estratégica"
        description="Visión de largo plazo, indicadores clave e iniciativas activas de Azahar Coffee Company."
      />

      <Card className="mb-6 bg-gradient-to-br from-brand-800 to-brand-900 text-cream-100">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-100/10">
            <Compass className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-300">Misión y visión</p>
            <p className="mt-2 text-sm text-cream-100/90">
              <span className="font-semibold">Misión:</span> Ofrecer experiencias de café de origen colombiano de excelencia, conectando a
              nuestros clientes con el trabajo de los caficultores que respaldan cada taza.
            </p>
            <p className="mt-2 text-sm text-cream-100/90">
              <span className="font-semibold">Visión:</span> Ser la marca de café de especialidad más querida de Colombia para 2030, con
              presencia en las principales ciudades y una cadena de abastecimiento 100% sostenible.
            </p>
          </div>
        </div>
      </Card>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpisEstrategicos.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{kpi.label}</p>
            <p className="mt-1.5 font-mono text-2xl font-bold text-[var(--text-primary)]">{kpi.valor}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{kpi.detalle}</p>
          </Card>
        ))}
      </div>

      <Card title="Iniciativas estratégicas (OKRs)" icon={<Target className="h-4 w-4" strokeWidth={1.75} />}>
        <div className="space-y-4">
          {iniciativasEstrategicas.map((iniciativa) => (
            <div key={iniciativa.id} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold text-[var(--text-primary)]">{iniciativa.titulo}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{iniciativa.descripcion}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-800 font-heading text-[10px] font-bold text-cream-100">
                    {iniciales(iniciativa.responsable)}
                  </div>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">{iniciativa.responsable}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={iniciativa.progreso} max={100} />
                <span className="w-10 shrink-0 text-right font-mono text-xs font-semibold text-[var(--text-primary)]">
                  {iniciativa.progreso}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
        Datos de ejemplo con fines ilustrativos del módulo de gestión estratégica.
      </p>
    </div>
  );
}
