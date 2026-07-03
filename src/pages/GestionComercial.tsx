import { Store, Trophy } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { formatCOP } from "../lib/format";
import { kpisComerciales, productosTop, tiendasComerciales, type EstadoTienda } from "../lib/mockGestion";

const ESTADO_ESTILO: Record<EstadoTienda, string> = {
  activa: "bg-status-aprobada-bg text-status-aprobada",
  "en remodelación": "bg-status-pendiente-bg text-status-pendiente",
};

export default function GestionComercial() {
  const totalVentas = tiendasComerciales.reduce((acc, t) => acc + t.ventasMes, 0);
  const maxUnidades = Math.max(...productosTop.map((p) => p.unidades));

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Gestión del negocio"
        title="Gestión Comercial"
        description="Desempeño de ventas, tiendas y productos de Azahar Coffee Company."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpisComerciales.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{kpi.label}</p>
            <p className="mt-1.5 font-mono text-xl font-bold text-[var(--text-primary)] sm:text-2xl">{kpi.valor}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{kpi.detalle}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <Card title="Tiendas de Azahar Coffee Company" icon={<Store className="h-4 w-4" strokeWidth={1.75} />}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Tienda</th>
                  <th className="py-2 pr-4 font-semibold">Ciudad</th>
                  <th className="py-2 pr-4 font-semibold">Ventas del mes</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {tiendasComerciales.map((tienda) => (
                  <tr key={tienda.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{tienda.nombre}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{tienda.ciudad}</td>
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">{formatCOP(tienda.ventasMes)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[tienda.estado]}`}>
                        {tienda.estado === "activa" ? "Activa" : "En remodelación"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="pt-3 pr-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]" colSpan={2}>
                    Total del mes
                  </td>
                  <td className="pt-3 pr-4 font-mono text-sm font-bold text-[var(--text-primary)]" colSpan={2}>
                    {formatCOP(totalVentas)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        <Card title="Producto más vendido" icon={<Trophy className="h-4 w-4" strokeWidth={1.75} />}>
          <ul className="space-y-3">
            {productosTop.map((producto, idx) => (
              <li key={producto.nombre} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 font-heading text-xs font-bold text-brand-900">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--text-primary)]">{producto.nombre}</p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
                    <div
                      className="h-full rounded-full bg-accent-500"
                      style={{ width: `${(producto.unidades / maxUnidades) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  {producto.unidades.toLocaleString("es-CO")} u.
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
