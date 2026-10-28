import { useCallback, useEffect, useState } from "react";
import { Check, ChefHat, Flame, Loader2, PackageCheck } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/ui";
import { posApi, type EstadoCocinaPos, type PedidoPos } from "../../lib/posApi";
import { ErrorCaja } from "../trazabilidad/comunes";
import { SinAccesoPos, usePermisosPos } from "./comunes";

const ESTADO_ESTILO: Record<string, string> = {
  enviadoCocina: "border-status-pendiente",
  enPreparacion: "border-accent-500",
  listo: "border-status-aprobada",
};

function minutosDesde(iso: string | null): number {
  return iso ? Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000)) : 0;
}

/** Pantalla de cocina (KDS): se actualiza sola cada 8 segundos. */
export default function PosCocina() {
  const { puede } = usePermisosPos();
  const [pedidos, setPedidos] = useState<PedidoPos[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    try {
      setPedidos(await posApi.pedidos("cocina"));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar la cocina.");
    } finally {
      setCargando(false);
    }
  }, []);

  const permitido = puede("COCINA");
  useEffect(() => {
    if (!permitido) return;
    void cargar();
    const t = window.setInterval(() => void cargar(), 8000);
    return () => window.clearInterval(t);
  }, [cargar, permitido]);

  async function mover(pedidoId: string, estado: EstadoCocinaPos | "entregado", lineaId?: string) {
    try {
      await posApi.cocinaEstado({ pedidoId, estado, lineaId });
      await cargar();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo actualizar.");
    }
  }

  if (!permitido) return <SinAccesoPos funcion="la pantalla de cocina" />;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="POS" title="Cocina" description="Pedidos en curso. Se actualiza solo cada pocos segundos." />
      {error && <div className="mb-4"><ErrorCaja mensaje={error} /></div>}
      {cargando && <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-brand-800" strokeWidth={1.75} /></div>}
      {!cargando && pedidos.length === 0 && <Card><p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay pedidos en cocina.</p></Card>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pedidos.map((p) => (
          <div key={p.id} className={`rounded-2xl border-2 bg-[var(--surface-card)] p-4 shadow-card ${ESTADO_ESTILO[p.estado] ?? "border-[var(--border-subtle)]"}`}>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-heading text-lg font-bold">#{p.numero} {p.paraLlevar && <span className="ml-1 rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold text-brand-900">PARA LLEVAR</span>}</p>
              <span className="text-xs text-[var(--text-muted)]">{minutosDesde(p.enviadoCocinaEn)} min</span>
            </div>
            {p.nombreCliente && <p className="mb-2 text-xs text-[var(--text-secondary)]">{p.nombreCliente}</p>}
            <ul className="space-y-2 text-sm">
              {p.lineas.filter((l) => !l.anulada && l.productoId !== "prod-empaque-para-llevar").map((l) => (
                <li key={l.id} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={`font-semibold ${l.estadoCocina === "listo" ? "text-[var(--text-muted)] line-through" : ""}`}>{l.cantidad}× {l.descripcion}</p>
                    {l.modificadores.map((m) => (
                      <p key={m.id} className="text-xs text-[var(--text-secondary)]">· {m.descripcion}</p>
                    ))}
                    {l.notas && <p className="text-xs font-semibold text-status-rechazada">“{l.notas}”</p>}
                  </div>
                  {l.estadoCocina !== "listo" && (
                    <button
                      title="Marcar esta línea como lista"
                      onClick={() => void mover(p.id, "listo", l.id)}
                      className="shrink-0 rounded-md border border-[var(--border-subtle)] p-1.5 hover:bg-status-aprobada-bg"
                    >
                      <Check className="h-4 w-4 text-status-aprobada" strokeWidth={1.75} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.estado === "enviadoCocina" && (
                <Button variant="secondary" className="flex-1" onClick={() => void mover(p.id, "preparando")}>
                  <Flame className="h-4 w-4" strokeWidth={1.75} /> Preparar
                </Button>
              )}
              {(p.estado === "enviadoCocina" || p.estado === "enPreparacion") && (
                <Button className="flex-1" onClick={() => void mover(p.id, "listo")}>
                  <ChefHat className="h-4 w-4" strokeWidth={1.75} /> Todo listo
                </Button>
              )}
              {p.estado === "listo" && (
                <Button className="flex-1" onClick={() => void mover(p.id, "entregado")}>
                  <PackageCheck className="h-4 w-4" strokeWidth={1.75} /> Entregado
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
