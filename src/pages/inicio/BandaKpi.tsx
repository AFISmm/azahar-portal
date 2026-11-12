import type { ReactNode } from "react";
import { Banknote, CalendarDays, ClipboardList } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { dataSource } from "../../lib/dataSource";
import { formatCOP, formatDate } from "../../lib/format";
import { useCarga } from "../trazabilidad/comunes";

// Banda de indicadores del Inicio (estilo del dashboard de referencia): tarjetas de vidrio con
// ícono en chip, cifra grande y una pastilla con el detalle. Solo usa datos reales de la persona.

function Kpi({ icono, etiqueta, valor, pastilla, tono }: { icono: ReactNode; etiqueta: string; valor: ReactNode; pastilla?: string; tono: "naranja" | "espresso" | "crema" }) {
  const chip = tono === "naranja" ? "bg-accent-500 text-brand-900" : tono === "espresso" ? "bg-brand-800 text-cream-100" : "bg-accent-300 text-brand-900";
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${chip}`}>{icono}</span>
      <div className="min-w-0">
        <p className="truncate text-xs text-[var(--text-secondary)]">{etiqueta}</p>
        <p className="truncate font-mono text-2xl font-bold leading-tight text-[var(--text-primary)]">{valor}</p>
      </div>
      {pastilla && <span className="ml-auto shrink-0 rounded-full bg-accent-500/15 px-2 py-0.5 text-[10px] font-semibold text-accent-500">{pastilla}</span>}
    </div>
  );
}

export function BandaKpi() {
  const { empleado } = useAuth();
  const pagos = useCarga(() => (empleado ? dataSource.listNominaPagos({ empleadoId: empleado.id }) : Promise.resolve([])));
  const sols = useCarga(() => (empleado ? dataSource.listSolicitudes({ empleadoId: empleado.id }) : Promise.resolve([])));
  const proximo = pagos.datos?.find((p) => p.estado === "pendiente") ?? null;
  const lista = sols.datos ?? [];
  const pendientes = lista.filter((s) => s.estado === "pendiente").length;
  const aprobadas = lista.filter((s) => s.estado === "aprobada").length;
  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-3">
      <Kpi tono="naranja" icono={<Banknote className="h-5 w-5" strokeWidth={1.75} />} etiqueta="Próximo pago" valor={proximo ? formatCOP(proximo.monto) : "—"} pastilla={proximo ? formatDate(proximo.fechaPago, "d MMM") : undefined} />
      <Kpi tono="espresso" icono={<ClipboardList className="h-5 w-5" strokeWidth={1.75} />} etiqueta="Solicitudes pendientes" valor={pendientes} pastilla={`${aprobadas} aprobadas`} />
      <Kpi tono="crema" icono={<CalendarDays className="h-5 w-5" strokeWidth={1.75} />} etiqueta="Días de vacaciones" valor={empleado?.diasVacacionesDisponibles ?? "—"} pastilla="disponibles" />
    </div>
  );
}
