import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { CalendarPlus, UploadCloud, Wallet, Briefcase, ClipboardList, CalendarClock } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { NominaPago, Solicitud } from "../lib/types";
import { calcularAntiguedad, formatCOP, formatDate } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button } from "../components/ui";
import { ProgressRing } from "../components/ProgressRing";
import { ProgressBar } from "../components/ProgressBar";
import { MiniBarChart } from "../components/MiniBarChart";
import { StatusBadge, TipoBadge } from "../components/StatusBadge";
import { SolicitarVacacionesModal } from "../components/SolicitarVacacionesModal";
import { SubirDocumentoModal } from "../components/SubirDocumentoModal";

const VACACIONES_ANUALES = 15;
const MESES_CHART = ["Feb", "Mar", "Abr", "May", "Jun", "Jul"];
const DIAS_TRABAJADOS_MES = [19, 20, 21, 18, 22, 12];

export default function Inicio() {
  const { empleado } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [pagos, setPagos] = useState<NominaPago[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalVacaciones, setModalVacaciones] = useState(false);
  const [modalDocumento, setModalDocumento] = useState(false);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const [sols, nom] = await Promise.all([
      dataSource.listSolicitudes({ empleadoId: empleado.id }),
      dataSource.listNominaPagos({ empleadoId: empleado.id }),
    ]);
    setSolicitudes(sols);
    setPagos(nom);
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const antiguedad = useMemo(() => (empleado ? calcularAntiguedad(empleado.fechaIngreso) : null), [empleado]);

  const solicitudesPendientes = useMemo(() => solicitudes.filter((s) => s.estado === "pendiente"), [solicitudes]);

  const { proximoPago, progresoPago } = useMemo(() => {
    const proximo = pagos.find((p) => p.estado === "pendiente") ?? null;
    if (!proximo) return { proximoPago: null as NominaPago | null, progresoPago: 0 };
    const idx = pagos.indexOf(proximo);
    const anterior = pagos[idx + 1] ?? null;
    if (!anterior) return { proximoPago: proximo, progresoPago: 0.5 };
    const total = Math.max(1, differenceInCalendarDays(parseISO(proximo.fechaPago), parseISO(anterior.fechaPago)));
    const transcurrido = Math.max(0, differenceInCalendarDays(new Date(), parseISO(anterior.fechaPago)));
    return { proximoPago: proximo, progresoPago: Math.min(1, transcurrido / total) };
  }, [pagos]);

  if (!empleado || !antiguedad) return null;

  const primerNombre = empleado.nombre.split(" ")[0];
  const barChartData = MESES_CHART.map((label, i) => ({ label, value: DIAS_TRABAJADOS_MES[i] }));

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Mi portal" title="Inicio" />

      {/* Hero de bienvenida */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 p-7 text-cream-100 shadow-card">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-accent-300">
              {new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold sm:text-3xl">Hola, {primerNombre} 👋</h2>
            <p className="mt-1 text-sm text-cream-200/80">{empleado.cargo} · {empleado.departamento}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setModalVacaciones(true)}>
              <CalendarPlus className="h-4 w-4" strokeWidth={1.75} />
              Solicitar vacaciones
            </Button>
            <Button
              variant="outline"
              className="border-cream-100/40! text-cream-100! hover:bg-cream-100/10!"
              onClick={() => setModalDocumento(true)}
            >
              <UploadCloud className="h-4 w-4" strokeWidth={1.75} />
              Subir documento
            </Button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 border-t border-cream-100/15 pt-6 sm:grid-cols-4">
          <Metrica icono={<CalendarClock className="h-4 w-4" strokeWidth={1.75} />} label="Vacaciones disponibles" valor={`${empleado.diasVacacionesDisponibles}`} unidad="días" />
          <Metrica icono={<Briefcase className="h-4 w-4" strokeWidth={1.75} />} label="Días trabajados" valor={`${antiguedad.totalDias}`} unidad="desde ingreso" />
          <Metrica
            icono={<Wallet className="h-4 w-4" strokeWidth={1.75} />}
            label="Próxima nómina"
            valor={proximoPago ? formatDate(proximoPago.fechaPago, "d MMM") : "—"}
            unidad={proximoPago ? formatCOP(proximoPago.monto) : ""}
          />
          <Metrica icono={<ClipboardList className="h-4 w-4" strokeWidth={1.75} />} label="Solicitudes pendientes" valor={`${solicitudesPendientes.length}`} unidad="por resolver" />
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card title="Vacaciones" className="md:row-span-2 flex flex-col items-center justify-center text-center">
          <ProgressRing value={empleado.diasVacacionesDisponibles} max={VACACIONES_ANUALES} label="días disponibles" sublabel={`de ${VACACIONES_ANUALES} al año`} />
          <p className="mt-5 text-sm text-[var(--text-secondary)]">
            Has disfrutado <span className="font-semibold text-[var(--text-primary)]">{Math.max(0, VACACIONES_ANUALES - empleado.diasVacacionesDisponibles)}</span> días este periodo.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => setModalVacaciones(true)}>
            <CalendarPlus className="h-4 w-4" strokeWidth={1.75} />
            Solicitar
          </Button>
        </Card>

        <Card className="bg-gradient-to-br from-accent-500 to-accent-300 text-brand-900 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/70">Próxima nómina</p>
          {proximoPago ? (
            <>
              <p className="mt-1 font-mono text-2xl font-bold">{formatDate(proximoPago.fechaPago, "d 'de' MMMM")}</p>
              <p className="text-sm font-medium text-brand-900/80">{formatCOP(proximoPago.monto)} · {proximoPago.periodo}</p>
              <div className="mt-4">
                <ProgressBar value={progresoPago * 100} max={100} trackClassName="bg-brand-900/15" fillClassName="bg-brand-900" />
                <p className="mt-1.5 text-xs font-medium text-brand-900/70">{Math.round(progresoPago * 100)}% del periodo transcurrido</p>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm">No hay pagos programados.</p>
          )}
        </Card>

        <Card title="Días trabajados">
          <p className="font-mono text-3xl font-bold text-[var(--text-primary)]">{antiguedad.totalDias}</p>
          <p className="mb-4 text-xs text-[var(--text-muted)]">días desde el {formatDate(empleado.fechaIngreso)}</p>
          <MiniBarChart data={barChartData} />
        </Card>

        <Card title="Solicitudes pendientes" actions={<span className="font-mono text-lg font-bold text-accent-500">{solicitudesPendientes.length}</span>}>
          {solicitudesPendientes.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No tienes solicitudes pendientes. ¡Todo al día!</p>
          ) : (
            <ul className="space-y-2.5">
              {solicitudesPendientes.slice(0, 4).map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-2 rounded-lg bg-[var(--surface-muted)] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <TipoBadge tipo={s.tipo} />
                    <span className="text-xs text-[var(--text-secondary)]">{formatDate(s.creadoEn)}</span>
                  </div>
                  <StatusBadge estado={s.estado} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Tipo de contrato">
          <p className="font-heading text-lg font-bold text-[var(--text-primary)]">{empleado.tipoContrato}</p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Fecha de ingreso</dt>
              <dd className="font-mono text-[var(--text-primary)]">{formatDate(empleado.fechaIngreso)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Antigüedad</dt>
              <dd className="text-[var(--text-primary)]">{antiguedad.texto}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Departamento</dt>
              <dd className="text-[var(--text-primary)]">{empleado.departamento}</dd>
            </div>
          </dl>
        </Card>
      </div>

      {cargando && <p className="mt-4 text-center text-xs text-[var(--text-muted)]">Actualizando datos…</p>}

      <SolicitarVacacionesModal open={modalVacaciones} onClose={() => setModalVacaciones(false)} empleadoId={empleado.id} onCreated={cargar} />
      <SubirDocumentoModal open={modalDocumento} onClose={() => setModalDocumento(false)} empleadoId={empleado.id} onCreated={cargar} />
    </div>
  );
}

function Metrica({ icono, label, valor, unidad }: { icono: ReactNode; label: string; valor: string; unidad?: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-cream-200/70">
        {icono}
        <p className="text-[11px] font-medium uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-1 font-mono text-xl font-bold sm:text-2xl">{valor}</p>
      {unidad && <p className="text-xs text-cream-200/70">{unidad}</p>}
    </div>
  );
}
