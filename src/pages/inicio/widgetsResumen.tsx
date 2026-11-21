import { useNavigate } from "react-router-dom";
import { Award, Banknote, Calculator, ClipboardList, Coffee, FileCheck2, Gauge, LifeBuoy, Store, Target, Users } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { dataSource } from "../../lib/dataSource";
import { IS_DEMO_MODE } from "../../lib/backendMode";
import { contableApi, type ResumenContable } from "../../lib/contableApi";
import { negocioApi, type TiendaApi } from "../../lib/negocioApi";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import { kpisEstrategicos, tiendasComerciales } from "../../lib/mockGestion";
import { formatCOP, formatDate } from "../../lib/format";
import { useCarga } from "../trazabilidad/comunes";
import { Cargando, Cifra, type Tam, WidgetShell } from "./widgetsBase";

// ============================================================================
// Widgets del RESUMEN del Inicio: los indicadores más importantes de cada módulo (el Sistema POS no ofrece
// widgets, decisión del producto). Cada uno muestra datos REALES cuando los hay; si el módulo todavía no tiene
// datos (o el portal está en modo demostración) muestra datos DEMO y lo avisa con la etiqueta «DEMO».
// ============================================================================

/** Carga datos reales; si faltan o no hay nada que mostrar, devuelve los de demostración y `demo: true`. */
function useRealODemo<T>(cargar: () => Promise<T>, hayDatos: (d: T) => boolean, demo: T) {
  const { datos, cargando, error } = useCarga(cargar);
  const real = !IS_DEMO_MODE && !error && datos !== null && hayDatos(datos);
  return { cargando, demo: !cargando && !real, datos: (real ? datos : demo) as T };
}

const enDias = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10);
const diasHasta = (iso: string) => Math.round((new Date(iso.slice(0, 10) + "T00:00:00").getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000);

// ---------------------------------------------------------------------------- Nómina (cada persona)
export function RMiNomina({ tam }: { tam: Tam }) {
  const { empleado } = useAuth();
  const navigate = useNavigate();
  const r = useRealODemo(
    async () => (empleado ? dataSource.listNominaPagos({ empleadoId: empleado.id }) : []),
    (l) => l.some((p) => p.estado === "pendiente"),
    [{ id: "demo", monto: 3_250_000, fechaPago: enDias(5), periodo: "Quincena en curso", estado: "pendiente" }] as Awaited<ReturnType<typeof dataSource.listNominaPagos>>,
  );
  const proximo = r.datos.find((p) => p.estado === "pendiente") ?? null;
  return (
    <WidgetShell titulo="Mi nómina" icono={<Banknote className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/nomina/inicio")}>
      {r.cargando ? (
        <Cargando />
      ) : (
        <div className="flex gap-6">
          <Cifra valor={proximo ? formatCOP(proximo.monto) : "—"} etiqueta="próximo pago" detalle={proximo ? formatDate(proximo.fechaPago, "d 'de' MMMM") : undefined} />
          {tam !== "S" && <Cifra valor={empleado?.diasVacacionesDisponibles ?? 12} etiqueta="días de vacaciones" />}
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Solicitudes (cada persona)
export function RSolicitudes({ tam }: { tam: Tam }) {
  const { empleado } = useAuth();
  const navigate = useNavigate();
  const r = useRealODemo(
    async () => {
      const l = empleado ? await dataSource.listSolicitudes({ empleadoId: empleado.id }) : [];
      return { pendiente: l.filter((s) => s.estado === "pendiente").length, aprobada: l.filter((s) => s.estado === "aprobada").length, rechazada: l.filter((s) => s.estado === "rechazada").length };
    },
    (c) => c.pendiente + c.aprobada + c.rechazada > 0,
    { pendiente: 2, aprobada: 5, rechazada: 1 },
  );
  return (
    <WidgetShell titulo="Mis solicitudes" icono={<ClipboardList className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/nomina/mis-solicitudes")}>
      {r.cargando ? (
        <Cargando />
      ) : tam === "S" ? (
        <Cifra valor={r.datos.pendiente} etiqueta="pendientes" tono={r.datos.pendiente > 0 ? "aviso" : undefined} />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          <Cifra valor={r.datos.pendiente} etiqueta="Pendientes" tono="aviso" />
          <Cifra valor={r.datos.aprobada} etiqueta="Aprobadas" tono="ok" />
          <Cifra valor={r.datos.rechazada} etiqueta="Rechazadas" tono="mal" />
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Talento humano (con permiso)
export function RPorAprobar({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const r = useRealODemo(
    async () => {
      const l = await dataSource.listSolicitudes();
      return { total: l.length, pendientes: l.filter((s) => s.estado === "pendiente").length };
    },
    (c) => c.total > 0,
    { total: 18, pendientes: 4 },
  );
  return (
    <WidgetShell titulo="Por aprobar" icono={<FileCheck2 className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/admin/solicitudes")}>
      {r.cargando ? <Cargando /> : <Cifra valor={r.datos.pendientes} etiqueta="solicitudes por revisar" detalle={tam === "S" ? undefined : `${r.datos.total} en total`} tono={r.datos.pendientes > 0 ? "aviso" : "ok"} />}
    </WidgetShell>
  );
}

export function REquipo({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const r = useRealODemo(
    async () => {
      const l = await dataSource.listEmpleados();
      return { personas: l.length, activas: l.filter((e) => e.estado === "activo").length, areas: new Set(l.map((e) => e.departamento)).size };
    },
    (c) => c.personas > 1,
    { personas: 24, activas: 22, areas: 5 },
  );
  return (
    <WidgetShell titulo="Equipo" icono={<Users className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/admin/usuarios")}>
      {r.cargando ? (
        <Cargando />
      ) : (
        <div className={`grid gap-2 ${tam === "S" ? "grid-cols-1" : "grid-cols-3"}`}>
          <Cifra valor={r.datos.personas} etiqueta="Personas" />
          {tam !== "S" && <Cifra valor={r.datos.activas} etiqueta="Activas" tono="ok" />}
          {tam !== "S" && <Cifra valor={r.datos.areas} etiqueta="Áreas" />}
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Trazabilidad
export function RTrazabilidad({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const r = useRealODemo(
    async () => (await trazabilidadApi.resumen()).conteos,
    (c) => c.fincas + c.lotesVerdes + c.lotesTostados + c.lotesEmpaque > 0,
    { fincas: 8, lotesVerdes: 14, lotesTostados: 11, lotesEmpaque: 9 } as Awaited<ReturnType<typeof trazabilidadApi.resumen>>["conteos"],
  );
  return (
    <WidgetShell titulo="Trazabilidad del café" icono={<Coffee className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/trazabilidad")}>
      {r.cargando ? (
        <Cargando />
      ) : tam === "S" ? (
        <Cifra valor={r.datos.lotesEmpaque} etiqueta="lotes empacados" />
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4">
          <Cifra valor={r.datos.fincas} etiqueta="Fincas" />
          <Cifra valor={r.datos.lotesVerdes} etiqueta="Lotes verdes" />
          <Cifra valor={r.datos.lotesTostados} etiqueta="Tostados" />
          <Cifra valor={r.datos.lotesEmpaque} etiqueta="Empacados" tono="ok" />
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Gestión comercial
const TIENDAS_DEMO: TiendaApi[] = tiendasComerciales.map((t) => ({ ...t, estado: t.estado as TiendaApi["estado"] }));

export function RTiendas({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const r = useRealODemo<TiendaApi[]>(() => negocioApi.tiendas(), (l) => l.length > 0, TIENDAS_DEMO);
  const operando = r.datos.filter((t) => t.estado !== "cerrada");
  const total = operando.reduce((s, t) => s + t.ventasMes, 0);
  const colorEstado = (e: TiendaApi["estado"]) => (e === "activa" ? "text-status-aprobada" : e === "cerrada" ? "text-status-rechazada" : "text-status-pendiente");
  return (
    <WidgetShell titulo="Ventas por tienda" icono={<Store className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/gestion-comercial")}>
      {r.cargando ? (
        <Cargando />
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex gap-6">
            <Cifra valor={formatCOP(total)} etiqueta="ventas del mes" />
            <Cifra valor={`${r.datos.filter((t) => t.estado === "activa").length}/${r.datos.length}`} etiqueta="tiendas activas" />
          </div>
          {tam !== "S" && tam !== "M" && (
            <ul className="mt-2 min-h-0 flex-1 overflow-hidden">
              {[...r.datos].sort((a, b) => b.ventasMes - a.ventasMes).slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] py-1.5 text-xs last:border-0">
                  <span className="min-w-0 truncate text-[var(--text-primary)]">{t.nombre} · {t.ciudad}</span>
                  <span className={`shrink-0 font-mono ${colorEstado(t.estado)}`}>{formatCOP(t.ventasMes)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Gestión operativa (fincas)
export function RFincas() {
  const navigate = useNavigate();
  const r = useRealODemo(
    async () => {
      const certs = (await dataSource.listCertificados()).filter((c) => c.fechaVencimiento).map((c) => diasHasta(c.fechaVencimiento!));
      return { total: certs.length, porVencer: certs.filter((d) => d >= 0 && d <= 60).length, vencidos: certs.filter((d) => d < 0).length };
    },
    (c) => c.total > 0,
    { total: 12, porVencer: 3, vencidos: 1 },
  );
  return (
    <WidgetShell titulo="Certificados de fincas" icono={<Award className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/gestion-operativa")}>
      {r.cargando ? (
        <Cargando />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          <Cifra valor={r.datos.total} etiqueta="Certificados" />
          <Cifra valor={r.datos.porVencer} etiqueta="Por vencer (60 d)" tono={r.datos.porVencer > 0 ? "aviso" : "ok"} />
          <Cifra valor={r.datos.vencidos} etiqueta="Vencidos" tono={r.datos.vencidos > 0 ? "mal" : "ok"} />
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Gestión contable
const CONTABLE_DEMO = {
  conciliacion: { meses: 12, mesesCuadrados: 9, movimientos: 1284, abonos: 640, cargos: 644, cobrosConciliados: 410, cobrosTotal: 452 },
  nomina: { asientosPendientes: 6, valorPendiente: 48_500_000 },
  terceros: { faltantesEnAlegra: 38, cubiertos: 214 },
  catalogo: { productos: 96, cambios: 7 },
  hitos: [],
  pendientes: 5,
  actualizado: "",
} as ResumenContable;

export function RContable({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const r = useRealODemo<ResumenContable>(() => contableApi.resumen(), (d) => d.conciliacion.meses > 0 || d.catalogo.productos > 0 || d.terceros.cubiertos > 0, CONTABLE_DEMO);
  const d = r.datos;
  return (
    <WidgetShell titulo="Gestión contable" icono={<Calculator className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate("/contable")}>
      {r.cargando ? (
        <Cargando />
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <Cifra valor={`${d.conciliacion.mesesCuadrados}/${d.conciliacion.meses}`} etiqueta="meses cuadrados" tono="ok" />
          <Cifra valor={d.terceros.faltantesEnAlegra} etiqueta="terceros por crear" tono={d.terceros.faltantesEnAlegra > 0 ? "aviso" : "ok"} />
          {tam !== "S" && <Cifra valor={d.nomina.asientosPendientes} etiqueta="pagos de nómina por subir" />}
          {tam !== "S" && <Cifra valor={d.pendientes} etiqueta="tareas pendientes" tono={d.pendientes > 0 ? "aviso" : "ok"} />}
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Gestión estratégica
export function REstrategica({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  // El módulo de Gestión Estratégica todavía trabaja con cifras de ejemplo: el widget lo dice con la etiqueta DEMO.
  return (
    <WidgetShell titulo="Gestión estratégica" icono={<Target className="h-4 w-4" strokeWidth={1.75} />} demo onClick={() => navigate("/gestion-estrategica")}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {kpisEstrategicos.slice(0, tam === "S" ? 2 : 4).map((k) => (
          <Cifra key={k.label} valor={k.valor} etiqueta={k.label} />
        ))}
      </div>
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- PQR
export function RPqr() {
  const { empleado } = useAuth();
  const navigate = useNavigate();
  const r = useRealODemo(
    async () => {
      const l = empleado?.tipoCuenta === "desarrollador" ? await dataSource.listPqrRecibidas() : await dataSource.listPqrPropias();
      return { pendientes: l.filter((p) => p.estado === "pendiente").length, resueltas: l.filter((p) => p.estado === "resuelta").length };
    },
    (c) => c.pendientes + c.resueltas > 0,
    { pendientes: 3, resueltas: 7 },
  );
  return (
    <WidgetShell titulo="PQR" icono={<LifeBuoy className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo} onClick={() => navigate(empleado?.tipoCuenta === "desarrollador" ? "/admin/pqr" : "/mi-perfil")}>
      {r.cargando ? (
        <Cargando />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <Cifra valor={r.datos.pendientes} etiqueta="Pendientes" tono={r.datos.pendientes > 0 ? "aviso" : "ok"} />
          <Cifra valor={r.datos.resueltas} etiqueta="Resueltas" tono="ok" />
        </div>
      )}
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------- Información general (mercado)
interface Ind { id: string; nombre: string; valor: number; unidad: string; variacionPct: number }
const INDICADORES_DEMO: Ind[] = [
  { id: "trm", nombre: "TRM", valor: 4120.5, unidad: "COP", variacionPct: 0.35 },
  { id: "cafe", nombre: "Café (lb)", valor: 2.45, unidad: "USD", variacionPct: -0.8 },
  { id: "brent", nombre: "Petróleo Brent", valor: 82.1, unidad: "USD", variacionPct: 1.2 },
  { id: "oro", nombre: "Oro (oz)", valor: 2050, unidad: "USD", variacionPct: 0.4 },
];

export function RIndicadores({ tam }: { tam: Tam }) {
  const r = useRealODemo<Ind[]>(
    async () => {
      const resp = await fetch("/api/indicadores");
      if (!resp.ok) return [];
      const j = (await resp.json()) as { ok: boolean; indicadores: Ind[] };
      return j.ok ? j.indicadores : [];
    },
    (l) => l.length > 0,
    INDICADORES_DEMO,
  );
  const fmt = (i: Ind) => (i.unidad === "COP" ? `$${i.valor.toLocaleString("es-CO", { maximumFractionDigits: 0 })}` : `${i.unidad.startsWith("US") ? "US$ " : ""}${i.valor.toLocaleString("es-CO", { maximumFractionDigits: 2 })}`);
  return (
    <WidgetShell titulo="Indicadores económicos" icono={<Gauge className="h-4 w-4" strokeWidth={1.75} />} demo={r.demo}>
      {r.cargando ? (
        <Cargando />
      ) : (
        <div className={`grid gap-2 ${tam === "W" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
          {r.datos.slice(0, tam === "W" ? 4 : 2).map((i) => (
            <div key={i.id} className="min-w-0 rounded-xl bg-[var(--surface-muted)] px-2.5 py-2">
              <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{i.nombre}</p>
              <p className="truncate font-mono text-sm font-bold text-[var(--text-primary)]">{fmt(i)}</p>
              <p className={`text-[11px] font-semibold ${i.variacionPct >= 0 ? "text-status-aprobada" : "text-status-rechazada"}`}>
                {i.variacionPct >= 0 ? "+" : ""}
                {i.variacionPct.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      )}
    </WidgetShell>
  );
}
