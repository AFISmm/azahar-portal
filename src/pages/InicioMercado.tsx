import { CalendarDays } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { TableroWidgets } from "./inicio/TableroWidgets";
import { BandaKpi } from "./inicio/BandaKpi";

// Inicio: tablero de widgets personalizable (mover, cambiar tamaño, agregar y quitar).
// Los widgets y su catálogo viven en src/pages/inicio/. Encabezado y tarjetas de vidrio, como el dashboard de referencia.
export default function InicioMercado() {
  const { t } = useLanguage();
  const fecha = new Date().toLocaleDateString("es-CO", { weekday: "short", day: "numeric", month: "short" });
  const hoy = fecha.charAt(0).toUpperCase() + fecha.slice(1);
  return (
    <div className="azahar-fade-in dash-backdrop">
      <div className="mb-4 mt-7 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-500">{t("inicioMercado.breadcrumb")}</p>
          <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">{t("inicioMercado.titulo")}</h1>
          <p className="max-w-2xl text-sm text-[var(--text-secondary)]">{t("inicioMercado.descripcion")}</p>
        </div>
        <span className="glass inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[var(--text-primary)]">
          <CalendarDays className="h-4 w-4 text-accent-500" strokeWidth={1.75} />
          {hoy}
        </span>
      </div>
      <BandaKpi />
      <TableroWidgets />
    </div>
  );
}
