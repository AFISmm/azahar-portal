import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

interface Indicador {
  id: string;
  nombre: string;
  valor: number;
  unidad: string;
  variacion: number;
  variacionPct: number;
  fuente: string;
}

const REFRESCO_MS = 60_000;

function formatearValor(ind: Indicador): string {
  if (ind.unidad === "COP") {
    return `$${ind.valor.toLocaleString("es-CO", { maximumFractionDigits: 2 })}`;
  }
  if (ind.unidad.startsWith("US$")) {
    return `US$ ${ind.valor.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (ind.unidad.startsWith("US¢")) {
    return `US¢ ${ind.valor.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${ind.valor.toLocaleString("es-CO")} ${ind.unidad}`;
}

export function IndicadoresTicker() {
  const [indicadores, setIndicadores] = useState<Indicador[]>([]);
  const [pausado, setPausado] = useState(false);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const resp = await fetch("/api/indicadores");
        if (!resp.ok) return;
        const datos = (await resp.json()) as { ok: boolean; indicadores: Indicador[] };
        if (activo && datos.ok) setIndicadores(datos.indicadores);
      } catch {
        // Fuente externa no disponible: se deja el último valor conocido (o ninguno).
      } finally {
        if (activo) setCargado(true);
      }
    }

    void cargar();
    const intervalo = window.setInterval(cargar, REFRESCO_MS);
    return () => {
      activo = false;
      window.clearInterval(intervalo);
    };
  }, []);

  const celdas = (sufijo: string) =>
    indicadores.map((ind) => (
      <div key={`${ind.id}-${sufijo}`} className="flex shrink-0 items-center gap-2 px-5 py-2 text-xs">
        <span className="font-semibold uppercase tracking-wide text-cream-100/70">{ind.nombre}</span>
        <span className="font-mono font-semibold text-cream-100">{formatearValor(ind)}</span>
        <span className={`font-mono font-semibold ${ind.variacion >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {ind.variacion >= 0 ? "+" : ""}
          {ind.variacionPct.toFixed(2)}%
        </span>
      </div>
    ));

  return (
    <div className="fixed inset-x-0 top-0 z-40 flex h-9 items-center overflow-hidden border-b border-brand-900/40 bg-brand-900">
      <button
        onClick={() => setPausado((p) => !p)}
        className="z-10 flex h-full shrink-0 items-center justify-center border-r border-cream-100/10 bg-brand-900 px-3 text-cream-100/70 transition hover:text-cream-100"
        aria-label={pausado ? "Reanudar ticker" : "Pausar ticker"}
        title={pausado ? "Reanudar" : "Pausar"}
      >
        {pausado ? <Play className="h-3.5 w-3.5" strokeWidth={1.75} /> : <Pause className="h-3.5 w-3.5" strokeWidth={1.75} />}
      </button>
      <div className="flex-1 overflow-hidden">
        {!cargado ? (
          <p className="px-5 text-xs text-cream-100/60">Cargando indicadores…</p>
        ) : indicadores.length === 0 ? (
          <p className="px-5 text-xs text-cream-100/60">Indicadores no disponibles en este momento.</p>
        ) : (
          <div className="azahar-ticker-track flex w-max" data-pausado={pausado}>
            {celdas("a")}
            {celdas("b")}
          </div>
        )}
      </div>
    </div>
  );
}
