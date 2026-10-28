import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { CalendarRange, X } from "lucide-react";
import { Input } from "../../components/ui";
import {
  ContextoFechas,
  FECHA_INICIO_HISTORIA,
  atajosRango,
  crearFiltro,
  guardarRango,
  leerRangoGuardado,
  type RangoFechas,
} from "../../lib/contableFechas";

/** Envuelve todas las pantallas de /contable con la barra de filtro de fechas (se recuerda mientras dure la sesión). */
export default function ContableLayout() {
  const [rango, setRangoEstado] = useState<RangoFechas>(leerRangoGuardado);
  const setRango = (r: RangoFechas) => {
    setRangoEstado(r);
    guardarRango(r);
  };
  const filtro = useMemo(() => crearFiltro(rango, setRango), [rango]);
  const atajos = useMemo(() => atajosRango(), []);
  const hoy = new Date().toISOString().slice(0, 10);
  const activo = (a: RangoFechas) => a.desde === rango.desde && a.hasta === rango.hasta;

  return (
    <ContextoFechas.Provider value={filtro}>
      <div className="mb-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-3 shadow-card">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex items-center gap-2 pb-2 text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">
            <CalendarRange className="h-4 w-4 text-accent-500" strokeWidth={1.75} />
            Filtrar por fecha
          </div>
          <label className="text-xs font-semibold text-[var(--text-secondary)]">
            Desde
            <Input type="date" value={rango.desde} min={FECHA_INICIO_HISTORIA} max={rango.hasta || hoy} onChange={(e) => setRango({ ...rango, desde: e.target.value })} className="mt-1 w-40" />
          </label>
          <label className="text-xs font-semibold text-[var(--text-secondary)]">
            Hasta
            <Input type="date" value={rango.hasta} min={rango.desde || FECHA_INICIO_HISTORIA} max={hoy} onChange={(e) => setRango({ ...rango, hasta: e.target.value })} className="mt-1 w-40" />
          </label>
          {!filtro.vacio && (
            <button onClick={() => setRango({ desde: "", hasta: "" })} className="mb-1.5 inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]">
              <X className="h-3.5 w-3.5" strokeWidth={1.75} />
              Limpiar
            </button>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {atajos.map((a) => (
            <button
              key={a.etiqueta}
              onClick={() => setRango(a.rango)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                activo(a.rango) ? "bg-brand-800 text-cream-100" : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-cream-200"
              }`}
            >
              {a.etiqueta}
            </button>
          ))}
        </div>
        {!filtro.vacio && (
          <p className="mt-2 text-[11px] text-[var(--text-muted)]">
            Mostrando {rango.desde ? `desde el ${rango.desde}` : "desde el inicio"} {rango.hasta ? `hasta el ${rango.hasta}` : "hasta hoy"}. Las pantallas sin fechas propias (por ejemplo, la lista de productos) se muestran completas.
          </p>
        )}
      </div>
      <Outlet />
    </ContextoFechas.Provider>
  );
}
