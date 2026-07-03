import { type FormEvent, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays, parseISO } from "date-fns";
import {
  LayoutDashboard, FileText, CalendarDays, Banknote, ClipboardList, HeartPulse, Folder, Package, Target, BadgeCheck,
  ClipboardCheck, Stethoscope, FolderCog, Users,
  CalendarClock, Briefcase, Wallet, CalendarPlus,
  Building2, FileSignature, Hourglass,
  Activity, Clock, Paperclip,
  UploadCloud, Download,
  Monitor, Smartphone, KeyRound, AlertCircle,
  ShieldCheck, ChevronRight,
  UserPlus, FolderPlus, Search,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useToast } from "../context/ToastContext";
import { dataSource } from "../lib/dataSource";
import type { Documento, Empleado, NominaPago, Solicitud, SolicitudEstado, SolicitudTipo } from "../lib/types";
import { calcularAntiguedad, formatCOP, formatDate, formatDateTime, iniciales } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button, Field, Input, Select, Textarea } from "../components/ui";
import { ProgressRing } from "../components/ProgressRing";
import { ProgressBar } from "../components/ProgressBar";
import { MiniBarChart } from "../components/MiniBarChart";
import { StatusBadge, TipoBadge } from "../components/StatusBadge";
import { Modal } from "../components/Modal";
import { SolicitarVacacionesModal } from "../components/SolicitarVacacionesModal";
import { SubirDocumentoModal } from "../components/SubirDocumentoModal";
import { SolicitudesAdminTable } from "../components/admin/SolicitudesAdminTable";
import { EmpleadoForm, type EmpleadoFormValues } from "../components/admin/EmpleadoForm";

// ══════════════════════════════════════════════════════════════════════════
// Configuración de pestañas
// ══════════════════════════════════════════════════════════════════════════

type Role = "empleado" | "admin";
type EmpTab = "inicio" | "contrato" | "vacaciones" | "nomina" | "solicitudes" | "incapacidades" | "documentos" | "activos" | "objetivos" | "certificados";
type AdmTab = "resumen" | "solicitudes" | "nomina" | "incapacidades" | "documentos" | "empleados";

interface TabDef<T extends string> {
  id: T;
  label: string;
  Icon: typeof LayoutDashboard;
}

const EMP_TABS: TabDef<EmpTab>[] = [
  { id: "inicio", label: "Inicio", Icon: LayoutDashboard },
  { id: "contrato", label: "Mi contrato", Icon: FileText },
  { id: "vacaciones", label: "Vacaciones", Icon: CalendarDays },
  { id: "nomina", label: "Nómina", Icon: Banknote },
  { id: "solicitudes", label: "Mis solicitudes", Icon: ClipboardList },
  { id: "incapacidades", label: "Incapacidades", Icon: HeartPulse },
  { id: "documentos", label: "Documentos", Icon: Folder },
  { id: "activos", label: "Activos", Icon: Package },
  { id: "objetivos", label: "Objetivos", Icon: Target },
  { id: "certificados", label: "Certificados", Icon: BadgeCheck },
];

const ADM_TABS: TabDef<AdmTab>[] = [
  { id: "resumen", label: "Resumen", Icon: LayoutDashboard },
  { id: "solicitudes", label: "Solicitudes", Icon: ClipboardCheck },
  { id: "nomina", label: "Nómina", Icon: Banknote },
  { id: "incapacidades", label: "Incapacidades", Icon: Stethoscope },
  { id: "documentos", label: "Documentos", Icon: FolderCog },
  { id: "empleados", label: "Empleados", Icon: Users },
];

// ══════════════════════════════════════════════════════════════════════════
// Constantes compartidas
// ══════════════════════════════════════════════════════════════════════════

const VACACIONES_ANUALES = 15;
const MESES_CHART = ["Feb", "Mar", "Abr", "May", "Jun", "Jul"];
const DIAS_TRABAJADOS_MES = [19, 20, 21, 18, 22, 12];

const ESTADO_NOMINA_ESTILO: Record<NominaPago["estado"], string> = {
  pendiente: "bg-status-pendiente-bg text-status-pendiente",
  pagado: "bg-status-aprobada-bg text-status-aprobada",
};

const ESTADO_EMPLEADO_ESTILO: Record<Empleado["estado"], string> = {
  activo: "bg-status-aprobada-bg text-status-aprobada",
  inactivo: "bg-status-rechazada-bg text-status-rechazada",
};

const TIPOS_SOLICITUD: (SolicitudTipo | "todos")[] = ["todos", "vacaciones", "incapacidad", "documento", "certificado"];
const ESTADOS_SOLICITUD: (SolicitudEstado | "todos")[] = ["todos", "pendiente", "aprobada", "rechazada"];
const TIPOS_DOCUMENTO = ["Contrato", "Certificado", "Seguridad social", "Identificación", "Otro"];

// ══════════════════════════════════════════════════════════════════════════
// Raíz de la página
// ══════════════════════════════════════════════════════════════════════════

export default function GestionOperativa() {
  const [role, setRole] = useState<Role>("empleado");
  const [empTab, setEmpTab] = useState<EmpTab>("inicio");
  const [admTab, setAdmTab] = useState<AdmTab>("resumen");

  const tabs = role === "empleado" ? EMP_TABS : ADM_TABS;
  const activeId: string = role === "empleado" ? empTab : admTab;

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Gestión del negocio"
        title="Gestión Operativa"
        description="Portal de autoservicio y panel de administración de personas de Azahar Coffee Company."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-1">
          {(["empleado", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                role === r ? "bg-brand-800 text-cream-100 shadow-card" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {r === "empleado" ? "Portal Empleado" : "Administración"}
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          {role === "empleado"
            ? "Vista previa del autoservicio con tus propios datos de empleado."
            : "Panel de gestión de personas para todo el equipo."}
        </p>
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-[var(--border-subtle)]">
        {tabs.map((t) => {
          const isActive = t.id === activeId;
          return (
            <button
              key={t.id}
              onClick={() => (role === "empleado" ? setEmpTab(t.id as EmpTab) : setAdmTab(t.id as AdmTab))}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                isActive ? "border-brand-800 text-brand-800" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <t.Icon className="h-4 w-4" strokeWidth={1.75} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div key={`${role}-${activeId}`} className="azahar-fade-in">
        {role === "empleado" ? (
          <>
            {empTab === "inicio" && <TabInicio />}
            {empTab === "contrato" && <TabContrato />}
            {empTab === "vacaciones" && <TabVacaciones />}
            {empTab === "nomina" && <TabNomina />}
            {empTab === "solicitudes" && <TabMisSolicitudes />}
            {empTab === "incapacidades" && <TabIncapacidades />}
            {empTab === "documentos" && <TabDocumentos />}
            {empTab === "activos" && <TabActivos />}
            {empTab === "objetivos" && <TabObjetivos />}
            {empTab === "certificados" && <TabCertificados />}
          </>
        ) : (
          <>
            {admTab === "resumen" && <TabResumenAdmin />}
            {admTab === "solicitudes" && <TabSolicitudesAdmin />}
            {admTab === "nomina" && <TabNominaAdmin />}
            {admTab === "incapacidades" && <TabIncapacidadesAdmin />}
            {admTab === "documentos" && <TabDocumentosAdmin />}
            {admTab === "empleados" && <TabEmpleadosAdmin />}
          </>
        )}
      </div>
    </div>
  );
}

function MetricaMini({ icono, label, valor, unidad }: { icono: ReactNode; label: string; valor: string; unidad?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 shadow-card">
      <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
        {icono}
        <p className="text-[11px] font-medium uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-1 font-mono text-xl font-bold text-[var(--text-primary)]">{valor}</p>
      {unidad && <p className="text-xs text-[var(--text-muted)]">{unidad}</p>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Pestañas — Portal Empleado (vista previa con los datos del admin conectado)
// ══════════════════════════════════════════════════════════════════════════

function TabInicio() {
  const { empleado } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [pagos, setPagos] = useState<NominaPago[]>([]);
  const [cargando, setCargando] = useState(true);

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
  const pendientes = useMemo(() => solicitudes.filter((s) => s.estado === "pendiente"), [solicitudes]);
  const proximoPago = useMemo(() => pagos.find((p) => p.estado === "pendiente") ?? null, [pagos]);
  const barChartData = useMemo(() => MESES_CHART.map((label, i) => ({ label, value: DIAS_TRABAJADOS_MES[i] })), []);

  if (!empleado || !antiguedad) return null;

  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricaMini icono={<CalendarClock className="h-4 w-4" strokeWidth={1.75} />} label="Vacaciones disponibles" valor={`${empleado.diasVacacionesDisponibles}`} unidad="días" />
        <MetricaMini icono={<Briefcase className="h-4 w-4" strokeWidth={1.75} />} label="Días trabajados" valor={`${antiguedad.totalDias}`} unidad="desde ingreso" />
        <MetricaMini
          icono={<Wallet className="h-4 w-4" strokeWidth={1.75} />}
          label="Próxima nómina"
          valor={proximoPago ? formatDate(proximoPago.fechaPago, "d MMM") : "—"}
          unidad={proximoPago ? formatCOP(proximoPago.monto) : ""}
        />
        <MetricaMini icono={<ClipboardList className="h-4 w-4" strokeWidth={1.75} />} label="Solicitudes pendientes" valor={`${pendientes.length}`} unidad="por resolver" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card title="Vacaciones" className="flex flex-col items-center justify-center text-center md:row-span-2">
          <ProgressRing value={empleado.diasVacacionesDisponibles} max={VACACIONES_ANUALES} label="días disponibles" sublabel={`de ${VACACIONES_ANUALES} al año`} />
          <p className="mt-5 text-sm text-[var(--text-secondary)]">
            Has disfrutado{" "}
            <span className="font-semibold text-[var(--text-primary)]">{Math.max(0, VACACIONES_ANUALES - empleado.diasVacacionesDisponibles)}</span> días este periodo.
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-accent-500 to-accent-300 text-brand-900 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/70">Próxima nómina</p>
          {proximoPago ? (
            <>
              <p className="mt-1 font-mono text-2xl font-bold">{formatDate(proximoPago.fechaPago, "d 'de' MMMM")}</p>
              <p className="text-sm font-medium text-brand-900/80">
                {formatCOP(proximoPago.monto)} · {proximoPago.periodo}
              </p>
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

        <Card title="Solicitudes pendientes" actions={<span className="font-mono text-lg font-bold text-accent-500">{pendientes.length}</span>}>
          {pendientes.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No tienes solicitudes pendientes. ¡Todo al día!</p>
          ) : (
            <ul className="space-y-2.5">
              {pendientes.slice(0, 4).map((s) => (
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
    </div>
  );
}

function TabContrato() {
  const { empleado } = useAuth();
  const antiguedad = useMemo(() => (empleado ? calcularAntiguedad(empleado.fechaIngreso) : null), [empleado]);

  if (!empleado || !antiguedad) return null;

  const datos = [
    { label: "Cargo", valor: empleado.cargo, Icon: Briefcase },
    { label: "Tipo de contrato", valor: empleado.tipoContrato, Icon: FileSignature },
    { label: "Fecha de ingreso", valor: formatDate(empleado.fechaIngreso), Icon: CalendarDays, mono: true },
    { label: "Antigüedad", valor: antiguedad.texto, Icon: Hourglass },
    { label: "Departamento", valor: empleado.departamento, Icon: Building2 },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {datos.map(({ label, valor, Icon, mono }) => (
        <Card key={label} className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-brand-800">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
            <p className={`mt-0.5 text-base font-semibold text-[var(--text-primary)] ${mono ? "font-mono" : "font-heading"}`}>{valor}</p>
          </div>
        </Card>
      ))}

      <Card className="flex items-center gap-4 bg-brand-800 text-cream-100">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-100/15">
          <Briefcase className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cream-200/80">Correo corporativo</p>
          <p className="mt-0.5 text-base font-semibold">{empleado.correo}</p>
        </div>
      </Card>
    </div>
  );
}

function TabVacaciones() {
  const { empleado } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const sols = await dataSource.listSolicitudes({ empleadoId: empleado.id });
    setSolicitudes(sols.filter((s) => s.tipo === "vacaciones"));
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const usados = useMemo(() => Math.max(0, VACACIONES_ANUALES - (empleado?.diasVacacionesDisponibles ?? 0)), [empleado]);

  if (!empleado) return null;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">Balance de vacaciones</h2>
        <Button onClick={() => setModalOpen(true)}>
          <CalendarPlus className="h-4 w-4" strokeWidth={1.75} />
          Solicitar vacaciones
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Card className="flex flex-col items-center justify-center text-center sm:col-span-1">
          <ProgressRing value={empleado.diasVacacionesDisponibles} max={VACACIONES_ANUALES} label="disponibles" sublabel={`de ${VACACIONES_ANUALES} días/año`} />
        </Card>
        <Card className="sm:col-span-2">
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Resumen del periodo</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-mono text-2xl font-bold text-[var(--text-primary)]">{VACACIONES_ANUALES}</p>
              <p className="text-xs text-[var(--text-muted)]">Días anuales</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-status-aprobada">{usados}</p>
              <p className="text-xs text-[var(--text-muted)]">Disfrutados</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-accent-500">{empleado.diasVacacionesDisponibles}</p>
              <p className="text-xs text-[var(--text-muted)]">Disponibles</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Historial de solicitudes">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : solicitudes.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Aún no has solicitado vacaciones.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Periodo</th>
                  <th className="py-2 pr-4 font-semibold">Motivo</th>
                  <th className="py-2 pr-4 font-semibold">Solicitada</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 font-mono text-[var(--text-primary)]">
                      {formatDate(s.fechaInicio)} — {formatDate(s.fechaFin)}
                    </td>
                    <td className="max-w-[240px] truncate py-3 pr-4 text-[var(--text-secondary)]">{s.motivo || "—"}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatDateTime(s.creadoEn)}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge estado={s.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <SolicitarVacacionesModal open={modalOpen} onClose={() => setModalOpen(false)} empleadoId={empleado.id} onCreated={cargar} />
    </div>
  );
}

function TabNomina() {
  const { empleado } = useAuth();
  const [pagos, setPagos] = useState<NominaPago[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!empleado) return;
    setCargando(true);
    dataSource.listNominaPagos({ empleadoId: empleado.id }).then((data) => {
      setPagos(data);
      setCargando(false);
    });
  }, [empleado]);

  const proximoPago = useMemo(() => pagos.find((p) => p.estado === "pendiente") ?? null, [pagos]);

  if (!empleado) return null;

  return (
    <div>
      {proximoPago && (
        <Card className="mb-6 flex flex-col items-start justify-between gap-4 bg-gradient-to-br from-accent-500 to-accent-300 text-brand-900 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900/10">
              <Wallet className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/70">Próximo pago · {proximoPago.periodo}</p>
              <p className="font-mono text-xl font-bold">{formatDate(proximoPago.fechaPago, "d 'de' MMMM 'de' yyyy")}</p>
            </div>
          </div>
          <p className="font-mono text-2xl font-bold">{formatCOP(proximoPago.monto)}</p>
        </Card>
      )}

      <Card title="Historial de pagos">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Periodo</th>
                  <th className="py-2 pr-4 font-semibold">Fecha de pago</th>
                  <th className="py-2 pr-4 font-semibold">Monto</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 text-[var(--text-primary)]">{p.periodo}</td>
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">{formatDate(p.fechaPago)}</td>
                    <td className="py-3 pr-4 font-mono font-semibold text-[var(--text-primary)]">{formatCOP(p.monto)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_NOMINA_ESTILO[p.estado]}`}>
                        {p.estado === "pagado" ? "Pagado" : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function TabMisSolicitudes() {
  const { empleado } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<(typeof TIPOS_SOLICITUD)[number]>("todos");
  const [filtroEstado, setFiltroEstado] = useState<(typeof ESTADOS_SOLICITUD)[number]>("todos");

  useEffect(() => {
    if (!empleado) return;
    setCargando(true);
    dataSource.listSolicitudes({ empleadoId: empleado.id }).then((data) => {
      setSolicitudes(data);
      setCargando(false);
    });
  }, [empleado]);

  const filtradas = useMemo(
    () =>
      solicitudes.filter(
        (s) => (filtroTipo === "todos" || s.tipo === filtroTipo) && (filtroEstado === "todos" || s.estado === filtroEstado),
      ),
    [solicitudes, filtroTipo, filtroEstado],
  );

  if (!empleado) return null;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as (typeof TIPOS_SOLICITUD)[number])} className="w-auto">
          {TIPOS_SOLICITUD.map((t) => (
            <option key={t} value={t}>
              {t === "todos" ? "Todos los tipos" : t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </Select>
        <Select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value as (typeof ESTADOS_SOLICITUD)[number])} className="w-auto">
          {ESTADOS_SOLICITUD.map((e) => (
            <option key={e} value={e}>
              {e === "todos" ? "Todos los estados" : e.charAt(0).toUpperCase() + e.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : filtradas.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay solicitudes con estos filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Tipo</th>
                  <th className="py-2 pr-4 font-semibold">Fechas</th>
                  <th className="py-2 pr-4 font-semibold">Motivo</th>
                  <th className="py-2 pr-4 font-semibold">Creada</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4">
                      <TipoBadge tipo={s.tipo} />
                    </td>
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">
                      {s.fechaInicio ? `${formatDate(s.fechaInicio)} — ${formatDate(s.fechaFin)}` : "—"}
                    </td>
                    <td className="max-w-[260px] truncate py-3 pr-4 text-[var(--text-secondary)]">{s.motivo || "—"}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatDateTime(s.creadoEn)}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge estado={s.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function TabIncapacidades() {
  const { empleado } = useAuth();
  const { showToast } = useToast();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [motivo, setMotivo] = useState("");
  const [soporte, setSoporte] = useState("");

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const sols = await dataSource.listSolicitudes({ empleadoId: empleado.id });
    setSolicitudes(sols.filter((s) => s.tipo === "incapacidad"));
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const totalDias = useMemo(
    () =>
      solicitudes.reduce((acc, s) => {
        if (!s.fechaInicio || !s.fechaFin) return acc;
        return acc + differenceInCalendarDays(parseISO(s.fechaFin), parseISO(s.fechaInicio)) + 1;
      }, 0),
    [solicitudes],
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!empleado) return;
    setEnviando(true);
    try {
      const motivoCompleto = soporte ? `${motivo} (soporte adjunto: ${soporte})` : motivo;
      await dataSource.createSolicitud({ empleadoId: empleado.id, tipo: "incapacidad", fechaInicio, fechaFin, motivo: motivoCompleto });
      showToast("Incapacidad reportada. Talento Humano la revisará pronto.", "success");
      setFechaInicio("");
      setFechaFin("");
      setMotivo("");
      setSoporte("");
      setModalOpen(false);
      await cargar();
    } finally {
      setEnviando(false);
    }
  }

  if (!empleado) return null;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">Incapacidades</h2>
        <Button onClick={() => setModalOpen(true)}>
          <HeartPulse className="h-4 w-4" strokeWidth={1.75} />
          Reportar incapacidad
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total días", value: `${totalDias}`, Icon: Activity },
          { label: "Registros", value: `${solicitudes.length}`, Icon: FileText },
          { label: "Último reporte", value: solicitudes[0] ? formatDate(solicitudes[0].creadoEn) : "N/A", Icon: Clock },
        ].map((c) => (
          <Card key={c.label} className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-brand-800">
              <c.Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{c.label}</p>
              <p className="mt-0.5 font-mono text-lg font-bold text-[var(--text-primary)]">{c.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Historial de incapacidades">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : solicitudes.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">No has reportado incapacidades.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Periodo</th>
                  <th className="py-2 pr-4 font-semibold">Detalle</th>
                  <th className="py-2 pr-4 font-semibold">Reportada</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 font-mono text-[var(--text-primary)]">
                      {formatDate(s.fechaInicio)} — {formatDate(s.fechaFin)}
                    </td>
                    <td className="max-w-[280px] truncate py-3 pr-4 text-[var(--text-secondary)]">{s.motivo || "—"}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatDateTime(s.creadoEn)}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge estado={s.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Reportar incapacidad">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha de inicio">
              <Input type="date" required value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </Field>
            <Field label="Fecha de fin">
              <Input type="date" required value={fechaFin} min={fechaInicio || undefined} onChange={(e) => setFechaFin(e.target.value)} />
            </Field>
          </div>
          <Field label="Motivo / diagnóstico general">
            <Textarea rows={3} required placeholder="Ej. Gripe viral, reposo médico." value={motivo} onChange={(e) => setMotivo(e.target.value)} />
          </Field>
          <Field label="Adjuntar soporte médico">
            <Input type="file" onChange={(e) => setSoporte(e.target.files?.[0]?.name ?? "")} />
            {soporte && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Paperclip className="h-3.5 w-3.5" strokeWidth={1.75} />
                {soporte}
              </p>
            )}
          </Field>
          <p className="text-xs text-[var(--text-muted)]">Modo demo: el archivo no se sube a ningún servidor, solo se registra su nombre.</p>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={enviando}>
              <HeartPulse className="h-4 w-4" strokeWidth={1.75} />
              Enviar reporte
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function TabDocumentos() {
  const { empleado } = useAuth();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const docs = await dataSource.listDocumentos({ empleadoId: empleado.id });
    setDocumentos(docs);
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  if (!empleado) return null;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">Mis documentos</h2>
        <Button onClick={() => setModalOpen(true)}>
          <UploadCloud className="h-4 w-4" strokeWidth={1.75} />
          Subir documento
        </Button>
      </div>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : documentos.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">No tienes documentos registrados todavía.</p>
        ) : (
          <ul className="divide-y divide-[var(--border-subtle)]">
            {documentos.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream-200 text-brand-800">
                    <FileText className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{doc.nombre}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {doc.tipo} · Subido el {formatDate(doc.subidoEn)}
                    </p>
                  </div>
                </div>
                <Button variant="outline" disabled title="Disponible próximamente">
                  <Download className="h-4 w-4" strokeWidth={1.75} />
                  Descargar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <SubirDocumentoModal open={modalOpen} onClose={() => setModalOpen(false)} empleadoId={empleado.id} onCreated={cargar} />
    </div>
  );
}

const ACTIVOS_MOCK = [
  { nombre: "Laptop de trabajo", detalle: "Equipo asignado para funciones administrativas.", Icon: Monitor },
  { nombre: "Celular corporativo", detalle: "Línea y equipo para comunicación con tiendas.", Icon: Smartphone },
  { nombre: "Carné de acceso", detalle: "Acceso a oficinas administrativas y bodega central.", Icon: KeyRound },
];

function TabActivos() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">Activos asignados</h2>
        <p className="text-sm text-[var(--text-secondary)]">Equipos y recursos bajo tu responsabilidad.</p>
      </div>

      <div className="flex flex-col gap-3">
        {ACTIVOS_MOCK.map((it) => (
          <Card key={it.nombre} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-brand-800">
              <it.Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-semibold text-[var(--text-primary)]">{it.nombre}</p>
              <p className="text-xs text-[var(--text-muted)]">{it.detalle}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-status-aprobada-bg px-2.5 py-1 text-xs font-semibold text-status-aprobada">Activo</span>
          </Card>
        ))}

        <Card className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-accent-500" strokeWidth={1.75} />
          <p className="text-sm text-[var(--text-secondary)]">
            Para reportar daño o devolución de un activo, usa <span className="font-semibold text-[var(--text-primary)]">Mis solicitudes</span>.
          </p>
        </Card>
      </div>

      <p className="mt-4 text-xs text-[var(--text-muted)]">Vista de ejemplo: este módulo aún no está conectado a un inventario real de activos.</p>
    </div>
  );
}

const OBJETIVOS_MOCK = [
  { titulo: "Completar certificación de servicio al cliente", categoria: "Formación", pct: 65 },
  { titulo: "Reducir tiempos de atención en caja", categoria: "Eficiencia", pct: 80 },
  { titulo: "Apoyar el lanzamiento de la temporada", categoria: "Proyectos", pct: 40 },
  { titulo: "Completar inducción de nuevos compañeros", categoria: "Equipo", pct: 100 },
];

function TabObjetivos() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">Objetivos</h2>
        <p className="text-sm text-[var(--text-secondary)]">Metas y desempeño del periodo actual.</p>
      </div>

      <div className="flex flex-col gap-4">
        {OBJETIVOS_MOCK.map((g) => (
          <Card key={g.titulo}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-sm font-semibold text-[var(--text-primary)]">{g.titulo}</p>
                <span className="mt-1.5 inline-flex rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-semibold text-brand-800">{g.categoria}</span>
              </div>
              <span className="font-mono text-xl font-bold text-accent-500">{g.pct}%</span>
            </div>
            <ProgressBar value={g.pct} max={100} />
          </Card>
        ))}
      </div>

      <p className="mt-4 text-xs text-[var(--text-muted)]">Vista de ejemplo: la app aún no cuenta con un módulo de seguimiento de objetivos.</p>
    </div>
  );
}

interface CertificadoDisponible {
  id: string;
  title: string;
  desc: string;
  time: string;
}

const CERTIFICADOS_DISPONIBLES: CertificadoDisponible[] = [
  { id: "laboral", title: "Certificado laboral", desc: "Constancia de vinculación y cargo actual.", time: "24 horas" },
  { id: "salarial", title: "Certificado laboral y salarial", desc: "Incluye salario, para trámites bancarios o de crédito.", time: "48 horas" },
  { id: "vacaciones", title: "Certificado de vacaciones", desc: "Estado de días disponibles y tomados.", time: "24 horas" },
  { id: "pazysalvo", title: "Paz y salvo", desc: "Certificado de no deudas con la empresa.", time: "72 horas" },
];

function TabCertificados() {
  const { empleado } = useAuth();
  const { showToast } = useToast();
  const [certificados, setCertificados] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [solicitando, setSolicitando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const sols = await dataSource.listSolicitudes({ empleadoId: empleado.id });
    setCertificados(sols.filter((s) => s.tipo === "certificado"));
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  async function solicitar(item: CertificadoDisponible) {
    if (!empleado) return;
    setSolicitando(item.id);
    try {
      await dataSource.createSolicitud({ empleadoId: empleado.id, tipo: "certificado", fechaInicio: null, fechaFin: null, motivo: item.title });
      showToast("Solicitud de certificado enviada a Talento Humano.", "success");
      await cargar();
    } finally {
      setSolicitando(null);
    }
  }

  if (!empleado) return null;

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">Solicita un certificado</h2>
        <p className="text-sm text-[var(--text-secondary)]">Documentos oficiales de tu vinculación laboral.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CERTIFICADOS_DISPONIBLES.map((c) => (
          <Card key={c.id} className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-brand-800">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-[var(--text-primary)]">{c.title}</p>
                <p className="text-xs text-[var(--text-muted)]">{c.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
              <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                Entrega en {c.time}
              </span>
              <Button variant="outline" className="px-3 py-1.5 text-xs" disabled={solicitando === c.id} onClick={() => void solicitar(c)}>
                Solicitar
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card title={`Mis certificados solicitados (${certificados.length})`}>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : certificados.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Aún no has solicitado certificados.</p>
        ) : (
          <ul className="divide-y divide-[var(--border-subtle)]">
            {certificados.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{c.motivo}</p>
                  <p className="text-xs text-[var(--text-muted)]">Solicitado el {formatDateTime(c.creadoEn)}</p>
                </div>
                <StatusBadge estado={c.estado} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Pestañas — Administración (datos reales de todo el equipo)
// ══════════════════════════════════════════════════════════════════════════

function TabResumenAdmin() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    setCargando(true);
    const [emps, sols] = await Promise.all([dataSource.listEmpleados(), dataSource.listSolicitudes()]);
    setEmpleados(emps);
    setSolicitudes(sols);
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const empleadoPorId = useMemo(() => new Map(empleados.map((e) => [e.id, e])), [empleados]);
  const activos = useMemo(() => empleados.filter((e) => e.estado === "activo"), [empleados]);
  const pendientes = useMemo(() => solicitudes.filter((s) => s.estado === "pendiente"), [solicitudes]);
  const incapacidadesPendientes = useMemo(() => pendientes.filter((s) => s.tipo === "incapacidad"), [pendientes]);
  const nuevosEsteMes = useMemo(() => {
    const ahora = new Date();
    return empleados.filter((e) => {
      const d = parseISO(e.createdAt);
      return d.getFullYear() === ahora.getFullYear() && d.getMonth() === ahora.getMonth();
    }).length;
  }, [empleados]);
  const recientes = useMemo(() => solicitudes.slice(0, 5), [solicitudes]);
  const porDepartamento = useMemo(() => {
    const conteo = new Map<string, number>();
    for (const e of empleados) conteo.set(e.departamento, (conteo.get(e.departamento) ?? 0) + 1);
    return Array.from(conteo.entries())
      .map(([departamento, n]) => ({ departamento, n }))
      .sort((a, b) => b.n - a.n);
  }, [empleados]);
  const totalEmpleados = Math.max(1, empleados.length);

  if (cargando) return <p className="py-10 text-center text-sm text-[var(--text-muted)]">Cargando…</p>;

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-800/10 text-brand-800">
            <Users className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Empleados activos</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{activos.length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-pendiente-bg text-status-pendiente">
            <ClipboardCheck className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Solicitudes pendientes</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{pendientes.length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-rechazada-bg text-status-rechazada">
            <Stethoscope className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Incapacidades pendientes</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{incapacidadesPendientes.length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-aprobada-bg text-status-aprobada">
            <UserPlus className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Nuevos este mes</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{nuevosEsteMes}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Solicitudes recientes">
          {recientes.length === 0 ? (
            <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay solicitudes registradas.</p>
          ) : (
            <ul className="divide-y divide-[var(--border-subtle)]">
              {recientes.map((s) => {
                const emp = empleadoPorId.get(s.empleadoId);
                return (
                  <li key={s.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{emp?.nombre ?? "Empleado eliminado"}</p>
                      <div className="mt-1">
                        <TipoBadge tipo={s.tipo} />
                      </div>
                    </div>
                    <StatusBadge estado={s.estado} />
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card title="Distribución por departamento">
          <div className="space-y-4">
            {porDepartamento.map((d) => (
              <div key={d.departamento}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">{d.departamento}</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">{d.n} emp.</span>
                </div>
                <ProgressBar value={d.n} max={totalEmpleados} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function TabSolicitudesAdmin() {
  return (
    <SolicitudesAdminTable
      titulo="Solicitudes del equipo"
      descripcion="Aprueba o rechaza las solicitudes de vacaciones, incapacidades, documentos y certificados."
    />
  );
}

function TabIncapacidadesAdmin() {
  return <SolicitudesAdminTable tipoFijo="incapacidad" titulo="Incapacidades reportadas" descripcion="Revisa el soporte y resuelve cada caso." />;
}

function TabNominaAdmin() {
  const { showToast } = useToast();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [pagos, setPagos] = useState<NominaPago[]>([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const [emps, nom] = await Promise.all([dataSource.listEmpleados(), dataSource.listNominaPagos()]);
    setEmpleados(emps);
    setPagos(nom);
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const empleadoPorId = useMemo(() => new Map(empleados.map((e) => [e.id, e])), [empleados]);

  // Nómina del "periodo actual": el pago más reciente (mayor fecha de pago)
  // registrado por cada empleado.
  const pagosActuales = useMemo(() => {
    const masReciente = new Map<string, NominaPago>();
    for (const pago of pagos) {
      const actual = masReciente.get(pago.empleadoId);
      if (!actual || pago.fechaPago > actual.fechaPago) {
        masReciente.set(pago.empleadoId, pago);
      }
    }
    return Array.from(masReciente.values()).sort((a, b) => {
      const nombreA = empleadoPorId.get(a.empleadoId)?.nombre ?? "";
      const nombreB = empleadoPorId.get(b.empleadoId)?.nombre ?? "";
      return nombreA.localeCompare(nombreB);
    });
  }, [pagos, empleadoPorId]);

  const totalPeriodo = useMemo(() => pagosActuales.reduce((acc, p) => acc + p.monto, 0), [pagosActuales]);
  const numPendientes = useMemo(() => pagosActuales.filter((p) => p.estado === "pendiente").length, [pagosActuales]);

  async function marcarComoPagado(pago: NominaPago) {
    setProcesando(pago.id);
    try {
      await dataSource.actualizarEstadoNominaPago(pago.id, "pagado");
      showToast("Pago de nómina marcado como pagado.", "success");
      await cargar();
    } catch {
      showToast("No se pudo actualizar el pago.", "error");
    } finally {
      setProcesando(null);
    }
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-300/30 text-accent-500">
            <Wallet className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Total nómina del periodo</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{formatCOP(totalPeriodo)}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-800/10 text-brand-800">
            <Users className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Empleados en nómina</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{pagosActuales.length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-pendiente-bg text-status-pendiente">
            <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Pagos pendientes</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{numPendientes}</p>
          </div>
        </Card>
      </div>

      <Card title="Nómina del periodo actual">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Empleado</th>
                  <th className="py-2 pr-4 font-semibold">Periodo</th>
                  <th className="py-2 pr-4 font-semibold">Monto</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                  <th className="py-2 pr-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pagosActuales.map((pago) => {
                  const emp = empleadoPorId.get(pago.empleadoId);
                  return (
                    <tr key={pago.id} className="border-b border-[var(--border-subtle)] last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-[11px] font-bold text-cream-100">
                            {emp ? iniciales(emp.nombre) : "?"}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">{emp?.nombre ?? "Empleado eliminado"}</p>
                            <p className="text-xs text-[var(--text-muted)]">{emp?.cargo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-[var(--text-secondary)]">{pago.periodo}</td>
                      <td className="py-3 pr-4 font-mono font-semibold text-[var(--text-primary)]">{formatCOP(pago.monto)}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_NOMINA_ESTILO[pago.estado]}`}>
                          {pago.estado === "pagado" ? "Pagado" : "Pendiente"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right">
                        {pago.estado === "pendiente" ? (
                          <Button
                            variant="outline"
                            className="px-3 py-1.5 text-xs"
                            disabled={procesando === pago.id}
                            onClick={() => void marcarComoPagado(pago)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                            Marcar como pagado
                          </Button>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)]">Pagado el {formatDate(pago.fechaPago)}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function TabDocumentosAdmin() {
  const { empleado: adminActual } = useAuth();
  const { showToast } = useToast();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const [empleadoId, setEmpleadoId] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState(TIPOS_DOCUMENTO[0]);

  const cargar = useCallback(async () => {
    setCargando(true);
    const [docs, emps] = await Promise.all([dataSource.listDocumentos(), dataSource.listEmpleados()]);
    setDocumentos(docs);
    setEmpleados(emps);
    setEmpleadoId((actual) => actual || emps[0]?.id || "");
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const empleadoPorId = useMemo(() => new Map(empleados.map((e) => [e.id, e])), [empleados]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!empleadoId || !nombre) return;
    setEnviando(true);
    try {
      await dataSource.addDocumento({ empleadoId, nombre, tipo, subidoPor: adminActual?.id ?? null });
      showToast("Documento agregado al expediente del empleado.", "success");
      setNombre("");
      await cargar();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <Card title="Agregar documento" className="lg:col-span-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Empleado">
            <Select value={empleadoId} onChange={(e) => setEmpleadoId(e.target.value)} required>
              {empleados.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Nombre del documento">
            <Input required placeholder="Ej. Otrosí contrato 2026.pdf" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Field>
          <Field label="Tipo">
            <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {TIPOS_DOCUMENTO.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Button type="submit" disabled={enviando} className="w-full">
            <FolderPlus className="h-4 w-4" strokeWidth={1.75} />
            Agregar documento
          </Button>
        </form>
      </Card>

      <Card title={`Todos los documentos (${documentos.length})`} className="lg:col-span-2">
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Empleado</th>
                  <th className="py-2 pr-4 font-semibold">Documento</th>
                  <th className="py-2 pr-4 font-semibold">Tipo</th>
                  <th className="py-2 pr-4 font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((doc) => (
                  <tr key={doc.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 text-[var(--text-primary)]">{empleadoPorId.get(doc.empleadoId)?.nombre ?? "—"}</td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <FileText className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                        {doc.nombre}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{doc.tipo}</td>
                    <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">{formatDate(doc.subidoEn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function TabEmpleadosAdmin() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("todos");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setEmpleados(await dataSource.listEmpleados());
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const departamentos = useMemo(() => Array.from(new Set(empleados.map((e) => e.departamento))).sort(), [empleados]);

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return empleados.filter((e) => {
      const coincideTexto =
        !texto || e.nombre.toLowerCase().includes(texto) || e.correo.toLowerCase().includes(texto) || e.cargo.toLowerCase().includes(texto);
      const coincideDepto = filtroDepartamento === "todos" || e.departamento === filtroDepartamento;
      const coincideRol = filtroRol === "todos" || e.rol === filtroRol;
      return coincideTexto && coincideDepto && coincideRol;
    });
  }, [empleados, busqueda, filtroDepartamento, filtroRol]);

  async function handleCrear(valores: EmpleadoFormValues) {
    setEnviando(true);
    try {
      await dataSource.createEmpleado(valores);
      showToast(`Empleado ${valores.nombre} creado correctamente.`, "success");
      setModalOpen(false);
      await cargar();
    } catch {
      showToast("No se pudo crear el empleado. Intenta de nuevo.", "error");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-primary)]">Directorio de empleados</h2>
        <Button onClick={() => setModalOpen(true)}>
          <UserPlus className="h-4 w-4" strokeWidth={1.75} />
          Nuevo empleado
        </Button>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={1.75} />
          <Input placeholder="Buscar por nombre, correo o cargo…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="pl-9" />
        </div>
        <Select value={filtroDepartamento} onChange={(e) => setFiltroDepartamento(e.target.value)} className="w-auto">
          <option value="todos">Todos los departamentos</option>
          {departamentos.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)} className="w-auto">
          <option value="todos">Todos los roles</option>
          <option value="empleado">Empleado</option>
          <option value="admin">Administrador</option>
        </Select>
      </div>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
        ) : filtrados.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay empleados con estos filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Empleado</th>
                  <th className="py-2 pr-4 font-semibold">Cargo</th>
                  <th className="py-2 pr-4 font-semibold">Departamento</th>
                  <th className="py-2 pr-4 font-semibold">Contrato</th>
                  <th className="py-2 pr-4 font-semibold">Rol</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => navigate(`/admin/empleados/${emp.id}`)}
                    className="cursor-pointer border-b border-[var(--border-subtle)] transition last:border-0 hover:bg-[var(--surface-muted)]"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-[11px] font-bold text-cream-100">
                          {iniciales(emp.nombre)}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{emp.nombre}</p>
                          <p className="text-xs text-[var(--text-muted)]">{emp.correo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{emp.cargo}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{emp.departamento}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{emp.tipoContrato}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex rounded-full bg-cream-200 px-2.5 py-1 text-xs font-semibold text-brand-800">
                        {emp.rol === "admin" ? "Administrador" : "Empleado"}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_EMPLEADO_ESTILO[emp.estado]}`}>
                        {emp.estado === "activo" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo empleado" widthClassName="max-w-2xl">
        <EmpleadoForm modo="crear" enviando={enviando} onSubmit={(v) => void handleCrear(v)} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
