import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { formatCOP, formatDateTime } from "../../lib/format";
import { ETIQUETA_ESTADO_PEDIDO, posApi, type PedidoPos } from "../../lib/posApi";
import { ErrorCaja } from "../trazabilidad/comunes";
import { SinAccesoPos, usePermisosPos } from "./comunes";

export default function PosHistorial() {
  const { ver } = usePermisosPos();
  const [pedidos, setPedidos] = useState<PedidoPos[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const permitido = ver;

  useEffect(() => {
    if (!permitido) return;
    posApi.pedidos("historial").then(setPedidos, (e) => setError(e instanceof Error ? e.message : "No se pudo cargar el historial."));
  }, [permitido]);

  if (!permitido) return <SinAccesoPos funcion="el historial del POS" />;

  const ventas = pedidos?.filter((p) => p.estado !== "cancelado").reduce((s, p) => s + p.totales.pagado, 0) ?? 0;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Sistema POS" title="Historial de ventas" description="Los últimos 100 pedidos cobrados, entregados o cancelados." />
      {error && <ErrorCaja mensaje={error} />}
      {!pedidos && !error && <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-brand-800" strokeWidth={1.75} /></div>}
      {pedidos && (
        <Card>
          <p className="mb-4 text-sm text-[var(--text-secondary)]">Cobrado en estos pedidos: <span className="font-mono font-bold text-[var(--text-primary)]">{formatCOP(ventas)}</span></p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4">Pedido</th>
                  <th className="py-2 pr-4">Fecha</th>
                  <th className="py-2 pr-4">Productos</th>
                  <th className="py-2 pr-4">Pago</th>
                  <th className="py-2 pr-4">Estado</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {pedidos.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2 pr-4 font-semibold">#{p.numero}</td>
                    <td className="whitespace-nowrap py-2 pr-4 text-xs text-[var(--text-muted)]">{formatDateTime(p.creadoEn)}</td>
                    <td className="py-2 pr-4 text-xs text-[var(--text-secondary)]">{p.lineas.filter((l) => !l.anulada && l.subtotalLinea > 0).map((l) => `${l.cantidad}× ${l.descripcion}`).join(", ")}</td>
                    <td className="py-2 pr-4 text-xs">{p.pagos.filter((x) => x.estado !== "rechazado").map((x) => (x.metodo === "tarjeta" ? `${x.franquicia ?? "Tarjeta"} ${x.tipoTarjeta ?? ""}` : "Efectivo")).join(", ") || "—"}</td>
                    <td className="py-2 pr-4 text-xs">{ETIQUETA_ESTADO_PEDIDO[p.estado]}</td>
                    <td className="py-2 text-right font-mono">{formatCOP(p.totales.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pedidos.length === 0 && <p className="py-4 text-sm text-[var(--text-muted)]">Todavía no hay ventas.</p>}
          </div>
        </Card>
      )}
    </div>
  );
}
