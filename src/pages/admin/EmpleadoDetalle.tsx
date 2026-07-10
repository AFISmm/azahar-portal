import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Mail, Phone } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import type { Documento, Empleado, NominaPago, Solicitud } from "../../lib/types";
import { calcularAntiguedad, formatCOP, formatDate, formatDateTime, iniciales } from "../../lib/format";
import { useToast } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/ui";
import { StatusBadge, TipoBadge } from "../../components/StatusBadge";
import { ProgressRing } from "../../components/ProgressRing";
import { EmpleadoForm, type EmpleadoFormValues } from "../../components/admin/EmpleadoForm";

const TABS = ["Contrato", "Vacaciones", "Solicitudes", "Documentos"] as const;
type Tab = (typeof TABS)[number];

const TAB_LABEL_KEYS: Record<Tab, "empleadoDetalle.tabContrato" | "empleadoDetalle.tabVacaciones" | "empleadoDetalle.tabSolicitudes" | "empleadoDetalle.tabDocumentos"> = {
  Contrato: "empleadoDetalle.tabContrato",
  Vacaciones: "empleadoDetalle.tabVacaciones",
  Solicitudes: "empleadoDetalle.tabSolicitudes",
  Documentos: "empleadoDetalle.tabDocumentos",
};

export default function EmpleadoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [pagos, setPagos] = useState<NominaPago[]>([]);
  const [cargando, setCargando] = useState(true);
  const [tab, setTab] = useState<Tab>("Contrato");
  const [modalEditar, setModalEditar] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const cargar = useCallback(async () => {
    if (!id) return;
    setCargando(true);
    const [emp, sols, docs, nom] = await Promise.all([
      dataSource.getEmpleado(id),
      dataSource.listSolicitudes({ empleadoId: id }),
      dataSource.listDocumentos({ empleadoId: id }),
      dataSource.listNominaPagos({ empleadoId: id }),
    ]);
    setEmpleado(emp);
    setSolicitudes(sols);
    setDocumentos(docs);
    setPagos(nom);
    setCargando(false);
  }, [id]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const antiguedad = useMemo(() => (empleado ? calcularAntiguedad(empleado.fechaIngreso) : null), [empleado]);

  async function handleEditar(valores: EmpleadoFormValues) {
    if (!empleado) return;
    setEnviando(true);
    try {
      await dataSource.updateEmpleado(empleado.id, valores);
      showToast(t("empleadoDetalle.toastActualizadoOk"), "success");
      setModalEditar(false);
      await cargar();
    } catch {
      showToast(t("empleadoDetalle.toastActualizadoError"), "error");
    } finally {
      setEnviando(false);
    }
  }

  if (cargando && !empleado) {
    return <p className="py-10 text-center text-sm text-[var(--text-muted)]">{t("empleadoDetalle.cargando")}</p>;
  }

  if (!empleado) {
    return (
      <div className="azahar-fade-in">
        <Button variant="ghost" onClick={() => navigate("/admin/empleados")}>
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          {t("empleadoDetalle.volver")}
        </Button>
        <p className="mt-6 text-sm text-[var(--text-muted)]">{t("empleadoDetalle.noEncontrado")}</p>
      </div>
    );
  }

  return (
    <div className="azahar-fade-in">
      <button
        onClick={() => navigate("/admin/empleados")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        {t("empleadoDetalle.volver")}
      </button>

      <PageHeader breadcrumb={t("empleadoDetalle.breadcrumb")} title={empleado.nombre} description={`${empleado.cargo} · ${empleado.departamento}`}>
        <Button variant="outline" onClick={() => setModalEditar(true)}>
          <Pencil className="h-4 w-4" strokeWidth={1.75} />
          {t("empleadoDetalle.editar")}
        </Button>
      </PageHeader>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-[auto_1fr]">
        <Card className="flex flex-col items-center justify-center gap-3 text-center sm:w-56">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-800 font-heading text-xl font-bold text-cream-100">
            {iniciales(empleado.nombre)}
          </div>
          <div>
            <p className="font-heading text-base font-semibold text-[var(--text-primary)]">{empleado.nombre}</p>
            <p className="text-xs text-[var(--text-muted)]">{empleado.rol === "admin" ? t("empleadoDetalle.rolAdmin") : t("empleadoDetalle.rolEmpleado")}</p>
          </div>
          <div className="w-full space-y-1.5 border-t border-[var(--border-subtle)] pt-3 text-left text-xs text-[var(--text-secondary)]">
            <p className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} /> {empleado.correo}
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} /> {empleado.telefono ?? t("empleadoDetalle.noRegistrado")}
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MiniStat label={t("empleadoDetalle.campoEstado")} valor={empleado.estado === "activo" ? t("empleadoDetalle.estadoActivo") : t("empleadoDetalle.estadoInactivo")} />
          <MiniStat label={t("empleadoDetalle.campoVacaciones")} valor={`${empleado.diasVacacionesDisponibles} ${t("empleadoDetalle.dias")}`} />
          <MiniStat label={t("empleadoDetalle.campoAntiguedad")} valor={antiguedad?.texto ?? "—"} />
          <MiniStat label={t("empleadoDetalle.campoSalario")} valor={formatCOP(empleado.salario)} mono />
        </div>
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-[var(--border-subtle)]">
        {TABS.map((tabItem) => (
          <button
            key={tabItem}
            onClick={() => setTab(tabItem)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === tabItem ? "border-brand-800 text-brand-800" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t(TAB_LABEL_KEYS[tabItem])}
          </button>
        ))}
      </div>

      {tab === "Contrato" && (
        <Card>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Dato label={t("empleadoDetalle.campoCargo")} valor={empleado.cargo} />
            <Dato label={t("empleadoDetalle.campoDepartamento")} valor={empleado.departamento} />
            <Dato label={t("empleadoDetalle.campoTipoContrato")} valor={empleado.tipoContrato} />
            <Dato label={t("empleadoDetalle.campoFechaIngreso")} valor={formatDate(empleado.fechaIngreso)} mono />
            <Dato label={t("empleadoDetalle.campoAntiguedad")} valor={antiguedad?.texto ?? "—"} />
            <Dato label={t("empleadoDetalle.campoSalario")} valor={formatCOP(empleado.salario)} mono />
          </dl>
        </Card>
      )}

      {tab === "Vacaciones" && (
        <Card className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <ProgressRing value={empleado.diasVacacionesDisponibles} max={15} label={t("empleadoDetalle.progresoDisponibles")} sublabel={t("empleadoDetalle.progresoSublabel")} />
          <div className="flex-1">
            <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{t("empleadoDetalle.historialVacaciones")}</h3>
            <SolicitudesLista items={solicitudes.filter((s) => s.tipo === "vacaciones")} />
          </div>
        </Card>
      )}

      {tab === "Solicitudes" && (
        <Card title={t("empleadoDetalle.todasSolicitudes")}>
          <SolicitudesLista items={solicitudes} mostrarTipo />
        </Card>
      )}

      {tab === "Documentos" && (
        <Card title={t("empleadoDetalle.documentosExpediente")}>
          {documentos.length === 0 ? (
            <p className="py-4 text-sm text-[var(--text-muted)]">{t("empleadoDetalle.sinDocumentos")}</p>
          ) : (
            <ul className="divide-y divide-[var(--border-subtle)]">
              {documentos.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{doc.nombre}</p>
                    <p className="text-xs text-[var(--text-muted)]">{doc.tipo}</p>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{formatDate(doc.subidoEn)}</p>
                </li>
              ))}
            </ul>
          )}
          {pagos.length > 0 && (
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              {t("empleadoDetalle.ultimoPago")} {formatDate(pagos[0]?.fechaPago)} · {formatCOP(pagos[0]?.monto)}
            </p>
          )}
        </Card>
      )}

      <Modal open={modalEditar} onClose={() => setModalEditar(false)} title={t("empleadoDetalle.modalEditarTitulo")} widthClassName="max-w-2xl">
        <EmpleadoForm modo="editar" valoresIniciales={empleado} enviando={enviando} onSubmit={(v) => void handleEditar(v)} onCancel={() => setModalEditar(false)} />
      </Modal>
    </div>
  );
}

function MiniStat({ label, valor, mono }: { label: string; valor: string; mono?: boolean }) {
  return (
    <Card className="text-center">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className={`mt-1 text-base font-semibold text-[var(--text-primary)] ${mono ? "font-mono" : "font-heading"}`}>{valor}</p>
    </Card>
  );
}

function Dato({ label, valor, mono }: { label: string; valor: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</dt>
      <dd className={`mt-0.5 text-sm font-medium text-[var(--text-primary)] ${mono ? "font-mono" : ""}`}>{valor}</dd>
    </div>
  );
}

function SolicitudesLista({ items, mostrarTipo }: { items: Solicitud[]; mostrarTipo?: boolean }) {
  const { t } = useLanguage();
  if (items.length === 0) return <p className="py-4 text-sm text-[var(--text-muted)]">{t("empleadoDetalle.sinSolicitudes")}</p>;
  return (
    <ul className="space-y-2.5">
      {items.map((s) => (
        <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[var(--surface-muted)] px-3 py-2.5">
          <div className="flex items-center gap-2">
            {mostrarTipo && <TipoBadge tipo={s.tipo} />}
            <span className="text-xs text-[var(--text-secondary)]">
              {s.fechaInicio ? `${formatDate(s.fechaInicio)} — ${formatDate(s.fechaFin)}` : formatDateTime(s.creadoEn)}
            </span>
          </div>
          <StatusBadge estado={s.estado} />
        </li>
      ))}
    </ul>
  );
}
