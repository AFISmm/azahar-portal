import { useMemo, useState } from "react";
import { CalendarClock, Calculator, LineChart } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Field, Input } from "../components/ui";
import { formatCOP, formatDate } from "../lib/format";
import { calendarioFiscal, indicadoresEconomicos } from "../lib/mockGestion";

const GRAMOS_POR_LIBRA = 453.6;

const TABS = ["Calendario", "Indicadores", "Calculadoras"] as const;
type Tab = (typeof TABS)[number];

export default function InformacionGeneral() {
  const [tab, setTab] = useState<Tab>("Calendario");

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Gestión del negocio"
        title="Información General"
        description="Fechas de cumplimiento, indicadores económicos y calculadoras de referencia para el negocio."
      />

      <div className="mb-5 flex gap-1 border-b border-[var(--border-subtle)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === t ? "border-brand-800 text-brand-800" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Calendario" && <TabCalendario />}
      {tab === "Indicadores" && <TabIndicadores />}
      {tab === "Calculadoras" && <TabCalculadoras />}
    </div>
  );
}

function TabCalendario() {
  return (
    <Card title="Próximas fechas de cumplimiento" icon={<CalendarClock className="h-4 w-4" strokeWidth={1.75} />}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
              <th className="py-2 pr-4 font-semibold">Concepto</th>
              <th className="py-2 pr-4 font-semibold">Fecha</th>
              <th className="py-2 pr-4 font-semibold">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {calendarioFiscal.map((item) => (
              <tr key={item.concepto} className="border-b border-[var(--border-subtle)] last:border-0">
                <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{item.concepto}</td>
                <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">{formatDate(item.fecha)}</td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">{item.detalle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-[var(--text-muted)]">
        Fechas de referencia general para cualquier compañía colombiana. Verifica siempre el calendario tributario oficial de la DIAN
        según el NIT de la empresa.
      </p>
    </Card>
  );
}

function TabIndicadores() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {indicadoresEconomicos.map((ind) => (
          <Card key={ind.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{ind.label}</p>
            <p className="mt-1.5 font-mono text-xl font-bold text-[var(--text-primary)]">{ind.valor}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{ind.detalle}</p>
          </Card>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
        <LineChart className="h-3.5 w-3.5" strokeWidth={1.75} />
        Cifras de referencia aproximadas, no oficiales. Consulta las fuentes oficiales (DIAN, Banco de la República) para valores exactos.
      </p>
    </div>
  );
}

function TabCalculadoras() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <CalculadoraCostoPorTaza />
      <CalculadoraMargenUtilidad />
    </div>
  );
}

function CalculadoraCostoPorTaza() {
  const [precioLibra, setPrecioLibra] = useState(28000);
  const [gramosPorTaza, setGramosPorTaza] = useState(18);
  const [costoInsumos, setCostoInsumos] = useState(600);

  const costoCafe = useMemo(() => (precioLibra / GRAMOS_POR_LIBRA) * gramosPorTaza, [precioLibra, gramosPorTaza]);
  const costoTotal = costoCafe + costoInsumos;

  return (
    <Card title="Costo por taza de café" icon={<Calculator className="h-4 w-4" strokeWidth={1.75} />}>
      <div className="space-y-3">
        <Field label="Precio por libra de café (COP)">
          <Input type="number" min={0} value={precioLibra} onChange={(e) => setPrecioLibra(Number(e.target.value))} />
        </Field>
        <Field label="Gramos de café por taza">
          <Input type="number" min={0} value={gramosPorTaza} onChange={(e) => setGramosPorTaza(Number(e.target.value))} />
        </Field>
        <Field label="Costo de insumos adicionales (COP: vaso, leche, azúcar…)">
          <Input type="number" min={0} value={costoInsumos} onChange={(e) => setCostoInsumos(Number(e.target.value))} />
        </Field>
      </div>

      <div className="mt-5 rounded-xl bg-[var(--surface-muted)] p-4">
        <div className="flex justify-between text-sm text-[var(--text-secondary)]">
          <span>Costo de café por taza</span>
          <span className="font-mono">{formatCOP(costoCafe)}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm text-[var(--text-secondary)]">
          <span>Insumos adicionales</span>
          <span className="font-mono">{formatCOP(costoInsumos)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-[var(--border-subtle)] pt-3">
          <span className="text-sm font-semibold text-[var(--text-primary)]">Costo total por taza</span>
          <span className="font-mono text-lg font-bold text-brand-800">{formatCOP(costoTotal)}</span>
        </div>
      </div>
    </Card>
  );
}

function CalculadoraMargenUtilidad() {
  const [precioVenta, setPrecioVenta] = useState(8500);
  const [costo, setCosto] = useState(3200);

  const utilidad = precioVenta - costo;
  const margen = precioVenta > 0 ? (utilidad / precioVenta) * 100 : 0;

  return (
    <Card title="Margen de utilidad" icon={<Calculator className="h-4 w-4" strokeWidth={1.75} />}>
      <div className="space-y-3">
        <Field label="Precio de venta (COP)">
          <Input type="number" min={0} value={precioVenta} onChange={(e) => setPrecioVenta(Number(e.target.value))} />
        </Field>
        <Field label="Costo del producto (COP)">
          <Input type="number" min={0} value={costo} onChange={(e) => setCosto(Number(e.target.value))} />
        </Field>
      </div>

      <div className="mt-5 rounded-xl bg-[var(--surface-muted)] p-4">
        <div className="flex justify-between text-sm text-[var(--text-secondary)]">
          <span>Utilidad por unidad</span>
          <span className={`font-mono ${utilidad < 0 ? "text-status-rechazada" : ""}`}>{formatCOP(utilidad)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-[var(--border-subtle)] pt-3">
          <span className="text-sm font-semibold text-[var(--text-primary)]">Margen de utilidad</span>
          <span className={`font-mono text-lg font-bold ${margen < 0 ? "text-status-rechazada" : "text-brand-800"}`}>
            {margen.toFixed(1)}%
          </span>
        </div>
      </div>
    </Card>
  );
}
