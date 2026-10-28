import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Award, Banknote, CalendarClock, ClipboardList, Clock, Coffee, FileCheck2, Gauge, Hand, Rocket, Sprout, Store, Trophy, UserCog, Users,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { useAcceso } from "../../auth/acceso";
import { dataSource } from "../../lib/dataSource";
import { IS_DEMO_MODE } from "../../lib/backendMode";
import { negocioApi, type TiendaApi } from "../../lib/negocioApi";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import { productosTop, tiendasComerciales } from "../../lib/mockGestion";
import { formatCOP, formatDate } from "../../lib/format";
import type { Modulo } from "../../lib/types";
import { useCarga } from "../trazabilidad/comunes";
import { Cargando, Cifra, SinDatos, type Tam, WidgetShell } from "./widgetsBase";

// Widgets con información del propio portal: tu nómina y solicitudes, el equipo, las tiendas,
// las fincas, la trazabilidad y accesos rápidos. Cada uno solo se ofrece si tienes permiso de
// ver el módulo del que toma datos. (El Sistema POS no ofrece widgets.)

const diasHasta = (iso: string) => Math.round((new Date(iso.slice(0, 10) + "T00:00:00").getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000);

function Fila({ izquierda, derecha, tono }: { izquierda: string; derecha?: string; tono?: "ok" | "mal" | "aviso" }) {
  const color = tono === "ok" ? "text-status-aprobada" : tono === "mal" ? "text-status-rechazada" : tono === "aviso" ? "text-status-pendiente" : "text-[var(--text-muted)]";
  return (
    <li className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] py-1.5 text-xs last:border-0">
      <span className="min-w-0 truncate text-[var(--text-primary)]">{izquierda}</span>
      {derecha && <span className={`shrink-0 font-mono ${color}`}>{derecha}</span>}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Personales (todos los usuarios)
// ---------------------------------------------------------------------------

export function WidgetSaludo({ tam }: { tam: Tam }) {
  const { empleado } = useAuth();
  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";
  const primerNombre = empleado?.nombre.split(" ")[0] ?? "";
  const fecha = new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
  return (
    <WidgetShell titulo="Hola" icono={<Hand className="h-4 w-4" strokeWidth={1.75} />}>
      <p className="font-heading text-xl font-bold leading-tight text-[var(--text-primary)]">
        {saludo}, {primerNombre}
      </p>
      <p className="text-xs text-[var(--text-secondary)]">{fecha.charAt(0).toUpperCase() + fecha.slice(1)}</p>
      {tam !== "S" && empleado && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-secondary)]">{empleado.cargo}</span>
          <span className="rounded-full bg-accent-300/30 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-primary)]">{empleado.diasVacacionesDisponibles} días de vacaciones</span>
        </div>
      )}
      {tam === "L" && empleado && <p className="mt-3 text-xs text-[var(--text-muted)]">En la empresa desde el {formatDate(empleado.fechaIngreso)}.</p>}
    </WidgetShell>
  );
}

export function WidgetProximoPago({ tam }: { tam: Tam }) {
  const { empleado } = useAuth();
  const { datos, cargando } = useCarga(() => (empleado ? dataSource.listNominaPagos({ empleadoId: empleado.id }) : Promise.resolve([])));
  const proximo = datos?.find((p) => p.estado === "pendiente") ?? null;
  return (
    <WidgetShell titulo="Próximo pago" icono={<Banknote className="h-4 w-4" strokeWidth={1.75} />}>
      {cargando ? (
        <Cargando />
      ) : proximo ? (
        <>
          <Cifra valor={formatCOP(proximo.monto)} etiqueta={formatDate(proximo.fechaPago, "d 'de' MMMM")} detalle={tam === "S" ? undefined : proximo.periodo} />
        </>
      ) : (
        <SinDatos texto="No tienes pagos pendientes." />
      )}
    </WidgetShell>
  );
}

export function WidgetMisSolicitudes({ tam }: { tam: Tam }) {
  const { empleado } = useAuth();
  const { datos, cargando } = useCarga(() => (empleado ? dataSource.listSolicitudes({ empleadoId: empleado.id }) : Promise.resolve([])));
  const lista = datos ?? [];
  const cuenta = (e: string) => lista.filter((s) => s.estado === e).length;
  return (
    <WidgetShell titulo="Mis solicitudes" icono={<ClipboardList className="h-4 w-4" strokeWidth={1.75} />}>
      {cargando ? (
        <Cargando />
      ) : tam === "S" ? (
        <Cifra valor={cuenta("pendiente")} etiqueta="pendientes" tono={cuenta("pendiente") > 0 ? "aviso" : undefined} />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            <Cifra valor={cuenta("pendiente")} etiqueta="Pendientes" tono="aviso" />
            <Cifra valor={cuenta("aprobada")} etiqueta="Aprobadas" tono="ok" />
            <Cifra valor={cuenta("rechazada")} etiqueta="Rechazadas" tono="mal" />
          </div>
          {tam === "L" && (
            <ul className="mt-2">
              {lista.slice(0, 4).map((s) => (
                <Fila key={s.id} izquierda={`${s.tipo[0].toUpperCase()}${s.tipo.slice(1)} · ${formatDate(s.creadoEn)}`} derecha={s.estado} tono={s.estado === "aprobada" ? "ok" : s.estado === "rechazada" ? "mal" : "aviso"} />
              ))}
              {lista.length === 0 && <SinDatos texto="Aún no tienes solicitudes." />}
            </ul>
          )}
        </>
      )}
    </WidgetShell>
  );
}

export function WidgetReloj({ tam }: { tam: Tam }) {
  const [ahora, setAhora] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setAhora(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <WidgetShell titulo="Hora" icono={<Clock className="h-4 w-4" strokeWidth={1.75} />}>
      <p className="font-mono text-3xl font-bold leading-tight text-[var(--text-primary)]">
        {ahora.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", ...(tam === "M" ? { second: "2-digit" } : {}) })}
      </p>
      <p className="text-xs text-[var(--text-secondary)]">{ahora.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "short" })}</p>
    </WidgetShell>
  );
}

export function WidgetIndicadores({ tam }: { tam: Tam }) {
  interface Ind { id: string; nombre: string; valor: number; unidad: string; variacionPct: number }
  const { datos, cargando } = useCarga(async () => {
    const r = await fetch("/api/indicadores");
    if (!r.ok) return [] as Ind[];
    const j = (await r.json()) as { ok: boolean; indicadores: Ind[] };
    return j.ok ? j.indicadores : [];
  });
  const lista = datos ?? [];
  const fmt = (i: Ind) => (i.unidad === "COP" ? `$${i.valor.toLocaleString("es-CO", { maximumFractionDigits: 0 })}` : `${i.unidad.startsWith("US") ? i.unidad.slice(0, 3) + " " : ""}${i.valor.toLocaleString("es-CO", { maximumFractionDigits: 2 })}`);
  return (
    <WidgetShell titulo="Indicadores en vivo" icono={<Gauge className="h-4 w-4" strokeWidth={1.75} />}>
      {cargando ? (
        <Cargando />
      ) : lista.length === 0 ? (
        <SinDatos texto="Indicadores no disponibles por ahora." />
      ) : tam === "W" || tam === "M" ? (
        <div className={`grid gap-2 ${tam === "W" ? "grid-cols-4" : "grid-cols-2"}`}>
          {lista.slice(0, tam === "W" ? 4 : 2).map((i) => (
            <div key={i.id} className="min-w-0 rounded-xl bg-[var(--surface-muted)] px-2.5 py-2">
              <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{i.nombre}</p>
              <p className="truncate font-mono text-sm font-bold text-[var(--text-primary)]">{fmt(i)}</p>
              <p className={`text-[11px] font-semibold ${i.variacionPct >= 0 ? "text-status-aprobada" : "text-status-rechazada"}`}>{i.variacionPct >= 0 ? "+" : ""}{i.variacionPct.toFixed(2)}%</p>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {lista.map((i) => (
            <Fila key={i.id} izquierda={i.nombre} derecha={`${fmt(i)}  ${i.variacionPct >= 0 ? "+" : ""}${i.variacionPct.toFixed(2)}%`} tono={i.variacionPct >= 0 ? "ok" : "mal"} />
          ))}
        </ul>
      )}
    </WidgetShell>
  );
}

export function WidgetAccesosRapidos({ tam }: { tam: Tam }) {
  const a = useAcceso();
  // El Sistema POS queda fuera a propósito: no tiene widgets ni accesos en el Inicio.
  const accesos: { to: string; etiqueta: string; Icon: typeof Rocket; visible: boolean }[] = [
    { to: "/nomina/inicio", etiqueta: "Mi nómina", Icon: Banknote, visible: true },
    { to: "/nomina/vacaciones", etiqueta: "Vacaciones", Icon: CalendarClock, visible: true },
    { to: "/nomina/certificados", etiqueta: "Certificados", Icon: Award, visible: true },
    { to: "/mi-perfil", etiqueta: "Mi perfil", Icon: UserCog, visible: true },
    { to: "/trazabilidad", etiqueta: "Trazabilidad", Icon: Coffee, visible: a.ver("trazabilidad") },
    { to: "/gestion-comercial", etiqueta: "Tiendas", Icon: Store, visible: a.ver("comercial") },
    { to: "/gestion-operativa", etiqueta: "Fincas", Icon: Sprout, visible: a.ver("operativa") },
    { to: "/admin/usuarios", etiqueta: "Usuarios", Icon: Users, visible: a.ver("usuarios") },
  ];
  const visibles = accesos.filter((x) => x.visible).slice(0, tam === "L" ? 8 : 4);
  return (
    <WidgetShell titulo="Accesos rápidos" icono={<Rocket className="h-4 w-4" strokeWidth={1.75} />}>
      <div className={`grid gap-2 ${tam === "L" ? "grid-cols-2" : "grid-cols-4"}`}>
        {visibles.map(({ to, etiqueta, Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-1 rounded-xl bg-[var(--surface-muted)] px-2 py-2.5 text-center transition hover:bg-cream-200">
            <Icon className="h-5 w-5 text-accent-500" strokeWidth={1.75} />
            <span className="w-full truncate text-[11px] font-semibold text-[var(--text-primary)]">{etiqueta}</span>
          </Link>
        ))}
      </div>
    </WidgetShell>
  );
}

// ---------------------------------------------------------------------------
// Con permiso de módulo
// ---------------------------------------------------------------------------

export function WidgetPorAprobar({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const { datos, cargando } = useCarga(async () => {
    const [solicitudes, empleados] = await Promise.all([dataSource.listSolicitudes(), dataSource.listEmpleados()]);
    return { solicitudes, nombres: Object.fromEntries(empleados.map((e) => [e.id, e.nombre])) as Record<string, string> };
  });
  const pendientes = (datos?.solicitudes ?? []).filter((s) => s.estado === "pendiente");
  return (
    <WidgetShell titulo="Solicitudes por aprobar" icono={<FileCheck2 className="h-4 w-4" strokeWidth={1.75} />} onClick={() => navigate("/admin/solicitudes")}>
      {cargando ? (
        <Cargando />
      ) : tam === "S" ? (
        <Cifra valor={pendientes.length} etiqueta="por revisar" tono={pendientes.length > 0 ? "aviso" : "ok"} />
      ) : (
        <div className="flex h-full gap-4">
          <div className="shrink-0">
            <Cifra valor={pendientes.length} etiqueta="por revisar" tono={pendientes.length > 0 ? "aviso" : "ok"} />
          </div>
          {tam === "L" && (
            <ul className="min-w-0 flex-1">
              {pendientes.slice(0, 5).map((s) => (
                <Fila key={s.id} izquierda={`${datos?.nombres[s.empleadoId] ?? "Empleado"} — ${s.tipo}`} derecha={formatDate(s.creadoEn)} />
              ))}
              {pendientes.length === 0 && <SinDatos texto="No hay solicitudes pendientes." />}
            </ul>
          )}
        </div>
      )}
    </WidgetShell>
  );
}

export function WidgetEquipo({ tam }: { tam: Tam }) {
  const { datos, cargando } = useCarga(() => dataSource.listEmpleados());
  const lista = datos ?? [];
  const activos = lista.filter((e) => e.estado === "activo").length;
  const deptos = new Set(lista.map((e) => e.departamento)).size;
  return (
    <WidgetShell titulo="Equipo" icono={<Users className="h-4 w-4" strokeWidth={1.75} />}>
      {cargando ? <Cargando /> : tam === "S" ? <Cifra valor={activos} etiqueta="activos" /> : (
        <div className="grid grid-cols-3 gap-2">
          <Cifra valor={lista.length} etiqueta="Personas" />
          <Cifra valor={activos} etiqueta="Activas" tono="ok" />
          <Cifra valor={deptos} etiqueta="Áreas" />
        </div>
      )}
    </WidgetShell>
  );
}

export function WidgetTiendas({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const { datos, cargando } = useCarga<TiendaApi[]>(() =>
    IS_DEMO_MODE ? Promise.resolve(tiendasComerciales.map((t) => ({ ...t, estado: t.estado as TiendaApi["estado"] }))) : negocioApi.tiendas(),
  );
  const lista = datos ?? [];
  const operando = lista.filter((t) => t.estado !== "cerrada");
  const total = operando.reduce((s, t) => s + t.ventasMes, 0);
  const colorEstado = (e: TiendaApi["estado"]) => (e === "activa" ? "ok" : e === "cerrada" ? "mal" : "aviso");
  return (
    <WidgetShell titulo="Tiendas" icono={<Store className="h-4 w-4" strokeWidth={1.75} />} onClick={() => navigate("/gestion-comercial")}>
      {cargando ? (
        <Cargando />
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex gap-6">
            <Cifra valor={formatCOP(total)} etiqueta="ventas del mes" />
            <Cifra valor={`${lista.filter((t) => t.estado === "activa").length}/${lista.length}`} etiqueta="activas" />
          </div>
          {(tam === "L" || tam === "XL") && (
            <ul className="mt-2 min-h-0 flex-1 overflow-hidden">
              {[...lista].sort((a, b) => b.ventasMes - a.ventasMes).slice(0, tam === "XL" ? 6 : 5).map((t) => (
                <Fila key={t.id} izquierda={`${t.nombre} · ${t.ciudad}`} derecha={`${formatCOP(t.ventasMes)} · ${t.estado}`} tono={colorEstado(t.estado)} />
              ))}
            </ul>
          )}
        </div>
      )}
    </WidgetShell>
  );
}

export function WidgetCertificadosFincas({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const { datos, cargando } = useCarga(async () => {
    const [certs, fincas] = await Promise.all([dataSource.listCertificados(), dataSource.listFincas()]);
    return { certs, fincas: Object.fromEntries(fincas.map((f) => [f.id, f.nombre])) as Record<string, string> };
  });
  const certs = (datos?.certs ?? []).filter((c) => c.fechaVencimiento).map((c) => ({ ...c, dias: diasHasta(c.fechaVencimiento!) })).sort((a, b) => a.dias - b.dias);
  const vencidos = certs.filter((c) => c.dias < 0).length;
  const porVencer = certs.filter((c) => c.dias >= 0 && c.dias <= 60).length;
  return (
    <WidgetShell titulo="Certificados de fincas" icono={<Award className="h-4 w-4" strokeWidth={1.75} />} onClick={() => navigate("/gestion-operativa")}>
      {cargando ? (
        <Cargando />
      ) : (
        <div className="flex h-full flex-col">
          <div className="grid grid-cols-3 gap-2">
            <Cifra valor={datos?.certs.length ?? 0} etiqueta="Vigentes y no" />
            <Cifra valor={porVencer} etiqueta="Por vencer (60 d)" tono={porVencer > 0 ? "aviso" : "ok"} />
            <Cifra valor={vencidos} etiqueta="Vencidos" tono={vencidos > 0 ? "mal" : "ok"} />
          </div>
          {tam === "L" && (
            <ul className="mt-2">
              {certs.slice(0, 5).map((c) => (
                <Fila key={c.id} izquierda={`${datos?.fincas[c.fincaId] ?? "Finca"} — ${c.nombre}`} derecha={c.dias < 0 ? `venció hace ${-c.dias} d` : `en ${c.dias} d`} tono={c.dias < 0 ? "mal" : c.dias <= 60 ? "aviso" : undefined} />
              ))}
            </ul>
          )}
        </div>
      )}
    </WidgetShell>
  );
}

export function WidgetProductoTop({ tam }: { tam: Tam }) {
  const maximo = Math.max(...productosTop.map((p) => p.unidades));
  return (
    <WidgetShell titulo="Productos más vendidos" icono={<Trophy className="h-4 w-4" strokeWidth={1.75} />}>
      <ul className="space-y-1.5">
        {productosTop.slice(0, tam === "L" ? 6 : 3).map((p, i) => (
          <li key={p.nombre} className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 font-heading text-[10px] font-bold text-brand-900">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-[var(--text-primary)]">{p.nombre}</p>
              <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div className="h-full rounded-full bg-accent-500" style={{ width: `${(p.unidades / maximo) * 100}%` }} />
              </div>
            </div>
            <span className="shrink-0 font-mono text-[11px] text-[var(--text-secondary)]">{p.unidades.toLocaleString("es-CO")}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-[10px] text-[var(--text-muted)]">Datos de ejemplo.</p>
    </WidgetShell>
  );
}

export function WidgetTrazabilidad({ tam }: { tam: Tam }) {
  const navigate = useNavigate();
  const { datos, cargando, error } = useCarga(() => trazabilidadApi.resumen());
  const c = datos?.conteos;
  return (
    <WidgetShell titulo="Trazabilidad del café" icono={<Coffee className="h-4 w-4" strokeWidth={1.75} />} onClick={() => navigate("/trazabilidad")}>
      {cargando ? (
        <Cargando />
      ) : error || !c ? (
        <SinDatos texto="No se pudo cargar la trazabilidad." />
      ) : tam === "S" ? (
        <Cifra valor={c.lotesEmpaque} etiqueta="lotes empacados" />
      ) : (
        <div className="flex h-full flex-col">
          <div className="grid grid-cols-4 gap-2">
            <Cifra valor={c.fincas} etiqueta="Fincas" />
            <Cifra valor={c.lotesVerdes} etiqueta="Verdes" />
            <Cifra valor={c.lotesTostados} etiqueta="Tostados" />
            <Cifra valor={c.lotesEmpaque} etiqueta="Empacados" />
          </div>
          {tam === "L" && (
            <ul className="mt-2">
              {(datos?.ultimosEmpaques ?? []).slice(0, 4).map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] py-1.5 text-xs last:border-0">
                  <span className="truncate text-[var(--text-primary)]">{l.loteComercial ?? l.id} · {l.presentacion ?? "—"}</span>
                  <Link to={`/lote/${l.id}`} target="_blank" onClick={(e) => e.stopPropagation()} className="shrink-0 font-semibold text-accent-500 underline">
                    Ficha
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </WidgetShell>
  );
}

export type { Modulo };
