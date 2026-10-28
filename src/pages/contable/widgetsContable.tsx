import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Boxes, CalendarClock, ClipboardList, Landmark, ListChecks, Receipt, Rocket, ScrollText, UsersRound, Wallet } from "lucide-react";
import { contableApi, type Catalogo, type ConciliacionBancolombia, type PagosNomina, type RespuestaComprobantes, type ResumenContable, type Terceros } from "../../lib/contableApi";
import { useFiltroFechas } from "../../lib/contableFechas";
import { formatCOP, formatDate } from "../../lib/format";
import { WidgetShell, Cifra, Cargando, SinDatos, type Tam } from "../inicio/widgetsBase";
import { crearAlmacenLayout, empaquetar, type ConfigTablero, type WidgetDef } from "../inicio/widgetsCatalogo";
import { EstadoPill } from "./comunes";

// ============================================================================
// Widgets del tablero de Gestión Contable. Usan el mismo tablero que el Inicio (arrastrar, cambiar tamaño,
// agregar y quitar) y respetan el filtro de fechas del módulo cuando tienen fechas propias.
// ============================================================================

/** Cache de módulo: varios widgets que piden lo mismo hacen una sola consulta por visita al tablero. */
const cache = new Map<string, Promise<unknown>>();
function useDatos<T>(clave: string, cargar: () => Promise<T>): { datos: T | null; error: boolean } {
  const [estado, setEstado] = useState<{ datos: T | null; error: boolean }>({ datos: null, error: false });
  useEffect(() => {
    let vigente = true;
    if (!cache.has(clave)) cache.set(clave, cargar());
    (cache.get(clave) as Promise<T>).then(
      (d) => vigente && setEstado({ datos: d, error: false }),
      () => {
        cache.delete(clave);
        if (vigente) setEstado({ datos: null, error: true });
      },
    );
    return () => {
      vigente = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);
  return estado;
}

const useResumen = () => useDatos<ResumenContable>("resumen", () => contableApi.resumen());
const useConciliacion = () => useDatos<ConciliacionBancolombia>("conciliacion", () => contableApi.conciliacion());
const useNomina = () => useDatos<PagosNomina>("nomina", () => contableApi.nomina());
const useTerceros = () => useDatos<Terceros>("terceros", () => contableApi.terceros());
const useCatalogo = () => useDatos<Catalogo>("catalogo", () => contableApi.catalogo());
const usePrimeraPagina = () =>
  useDatos<RespuestaComprobantes>("comprobantes-1", () => contableApi.comprobantes({ desde: "", hasta: "", q: "", estado: "", pagina: 1 }));

function Estado({ cargando, error }: { cargando: boolean; error: boolean }) {
  if (error) return <SinDatos texto="No se pudo cargar." />;
  return cargando ? <Cargando /> : null;
}

function Comprobantes({ tam }: { tam: Tam }) {
  const { datos, error } = usePrimeraPagina();
  const vista = datos?.filas.filter((f) => f.estado === "vista previa").length ?? 0;
  return (
    <>
      <Estado cargando={!datos} error={error} />
      {datos && <Cifra valor={datos.totalGeneral.toLocaleString("es-CO")} etiqueta="comprobantes listados" detalle={tam === "S" ? undefined : `${vista}+ listos para subir`} />}
    </>
  );
}

function TercerosW({ tam }: { tam: Tam }) {
  const { datos, error } = useTerceros();
  return (
    <>
      <Estado cargando={!datos} error={error} />
      {datos && <Cifra valor={datos.balance2025.faltantesEnAlegra.toLocaleString("es-CO")} etiqueta="contactos por crear en Alegra" tono="aviso" detalle={tam === "S" ? undefined : `${datos.balance2025.cubiertosPorListadoConsuelo.toLocaleString("es-CO")} con datos del listado`} />}
    </>
  );
}

function CatalogoW({ tam }: { tam: Tam }) {
  const { datos, error } = useCatalogo();
  const filtro = useFiltroFechas();
  const cambios = datos?.cambiosAplicados.filter((c) => filtro.dentro(c.fecha)).length ?? 0;
  return (
    <>
      <Estado cargando={!datos} error={error} />
      {datos && <Cifra valor={datos.productos.length} etiqueta="productos en el catálogo" detalle={tam === "S" ? undefined : `${cambios} cambios en el período`} />}
    </>
  );
}

function NominaW({ tam }: { tam: Tam }) {
  const { datos, error } = useNomina();
  const filtro = useFiltroFechas();
  const pend = datos?.pagos.filter((p) => p.estado === "vista previa" && filtro.dentro(p.fecha)) ?? [];
  return (
    <>
      <Estado cargando={!datos} error={error} />
      {datos && <Cifra valor={pend.length} etiqueta="asientos de nómina por subir" tono={pend.length ? "aviso" : "ok"} detalle={tam === "S" ? undefined : formatCOP(pend.reduce((s, p) => s + p.valor, 0))} />}
    </>
  );
}

function ConciliacionW({ tam }: { tam: Tam }) {
  const { datos, error } = useConciliacion();
  const filtro = useFiltroFechas();
  if (!datos) return <Estado cargando={!error} error={error} />;
  const meses = datos.mensual.filter((m) => {
    const i = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"].indexOf(m.mes.split(" ")[0].toLowerCase());
    return i < 0 || filtro.mesDentro(`${m.mes.split(" ")[1]}-${String(i + 1).padStart(2, "0")}`);
  });
  const cuadrados = meses.filter((m) => Math.abs(m.diferencia) < 1).length;
  if (tam === "S" || tam === "M") return <Cifra valor={`${cuadrados}/${meses.length}`} etiqueta="meses cuadrados con el extracto" tono={cuadrados === meses.length ? "ok" : "mal"} />;
  const max = Math.max(1, ...meses.map((m) => Math.max(m.abonos, m.cargos)));
  return (
    <div className="flex h-full flex-col gap-2">
      <Cifra valor={`${cuadrados}/${meses.length}`} etiqueta="meses cuadrados con el extracto" tono={cuadrados === meses.length ? "ok" : "mal"} />
      <div className="flex min-h-0 flex-1 items-end gap-2">
        {meses.map((m) => (
          <div key={m.mes} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-1" title={`${m.mes}: abonos ${formatCOP(m.abonos)} · cargos ${formatCOP(m.cargos)}`}>
            <div className="flex flex-1 items-end gap-0.5">
              <div className="w-1/2 rounded-t bg-status-aprobada" style={{ height: `${(m.abonos / max) * 100}%` }} />
              <div className="w-1/2 rounded-t bg-accent-500" style={{ height: `${(m.cargos / max) * 100}%` }} />
            </div>
            <p className="truncate text-center text-[10px] text-[var(--text-muted)]">{m.mes.slice(0, 3)}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[var(--text-muted)]">Verde: abonos · Naranja: cargos</p>
    </div>
  );
}

function CobrosW({ tam }: { tam: Tam }) {
  const { datos, error } = useConciliacion();
  if (!datos) return <Estado cargando={!error} error={error} />;
  const pagos = datos.resumenCobros.reduce((s, m) => s + m.pagos, 0);
  const conc = datos.resumenCobros.reduce((s, m) => s + m.conciliados, 0);
  return <Cifra valor={`${pagos ? Math.round((conc / pagos) * 100) : 0}%`} etiqueta="cobros con factura del mismo valor" tono="aviso" detalle={tam === "S" ? undefined : `${conc} de ${pagos} pagos individuales`} />;
}

function HitosW({ tam }: { tam: Tam }) {
  const { datos, error } = useResumen();
  const filtro = useFiltroFechas();
  if (!datos) return <Estado cargando={!error} error={error} />;
  const hitos = datos.hitos.filter((h) => filtro.dentro(h.fecha));
  if (hitos.length === 0) return <SinDatos texto="No hay hitos en este período." />;
  return (
    <ul className="h-full divide-y divide-[var(--border-subtle)] overflow-y-auto pr-1">
      {hitos.slice(0, tam === "L" ? 5 : 9).map((h) => (
        <li key={h.id} className="flex items-center justify-between gap-2 py-1.5">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase text-[var(--text-muted)]">
              {h.area} · {formatDate(h.fecha)}
            </p>
            <p className="truncate text-xs font-semibold text-[var(--text-primary)]">{h.titulo}</p>
          </div>
          <EstadoPill estado={h.estado} />
        </li>
      ))}
    </ul>
  );
}

function PendientesW({ tam }: { tam: Tam }) {
  const { datos, error } = useDatos("bitacora", () => contableApi.bitacora());
  if (!datos) return <Estado cargando={!error} error={error} />;
  return (
    <ul className="h-full divide-y divide-[var(--border-subtle)] overflow-y-auto pr-1">
      {datos.pendientes.slice(0, tam === "M" ? 3 : 8).map((p) => (
        <li key={p.tarea} className="py-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-accent-500">{p.responsable}</p>
          <p className="line-clamp-2 text-xs text-[var(--text-primary)]">{p.tarea}</p>
        </li>
      ))}
    </ul>
  );
}

function UltimosW({ tam }: { tam: Tam }) {
  const { datos, error } = usePrimeraPagina();
  const filtro = useFiltroFechas();
  if (!datos) return <Estado cargando={!error} error={error} />;
  const filas = datos.filas.filter((f) => filtro.dentro(f.fecha)).slice(0, tam === "XL" ? 12 : 6);
  if (filas.length === 0) return <SinDatos texto="No hay comprobantes en este período." />;
  return (
    <ul className="h-full divide-y divide-[var(--border-subtle)] overflow-y-auto pr-1">
      {filas.map((c, i) => (
        <li key={`${c.numero}-${i}`} className="flex items-center justify-between gap-2 py-1.5 text-xs">
          <div className="min-w-0">
            <p className="truncate font-semibold text-[var(--text-primary)]">{c.numero ?? "Vista previa"}</p>
            <p className="truncate text-[var(--text-muted)]">
              {formatDate(c.fecha)} · {c.obs}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[var(--text-secondary)]">{formatCOP(c.total)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Próximo martes a las 5:00 p. m. (hora local) a partir de ahora. */
function proximoMartes5pm(ahora: Date = new Date()): Date {
  const d = new Date(ahora);
  d.setHours(17, 0, 0, 0);
  const dif = (2 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + dif);
  if (d <= ahora) d.setDate(d.getDate() + 7);
  return d;
}

function SyncW({ tam }: { tam: Tam }) {
  const d = proximoMartes5pm();
  return <Cifra valor={d.toLocaleDateString("es-CO", { weekday: "short", day: "numeric", month: "short" })} etiqueta="próxima actualización del catálogo" detalle={tam === "S" ? undefined : "Martes 5:00 p. m., archivo → Alegra"} />;
}

function AccesosW({ tam }: { tam: Tam }) {
  const ir = useNavigate();
  const accesos: { to: string; etiqueta: string; Icon: typeof Receipt }[] = [
    { to: "/contable/comprobantes", etiqueta: "Comprobantes", Icon: Receipt },
    { to: "/contable/terceros", etiqueta: "Terceros", Icon: UsersRound },
    { to: "/contable/catalogo", etiqueta: "Catálogo", Icon: Boxes },
    { to: "/contable/conciliacion", etiqueta: "Conciliación", Icon: Landmark },
    { to: "/contable/importacion", etiqueta: "Importar", Icon: ScrollText },
    { to: "/contable/documentacion", etiqueta: "Documentación", Icon: BookOpen },
  ];
  return (
    <div className={`grid gap-2 ${tam === "M" ? "grid-cols-3" : "grid-cols-3 sm:grid-cols-6"}`}>
      {accesos.map(({ to, etiqueta, Icon }) => (
        <button key={to} onClick={() => ir(to)} className="flex flex-col items-center gap-1 rounded-xl bg-[var(--surface-muted)] px-2 py-2.5 text-center transition hover:bg-cream-200">
          <Icon className="h-5 w-5 text-accent-500" strokeWidth={1.75} />
          <span className="w-full truncate text-[11px] font-semibold text-[var(--text-primary)]">{etiqueta}</span>
        </button>
      ))}
    </div>
  );
}

const ic = (Icono: typeof Receipt) => <Icono className="h-5 w-5" strokeWidth={1.75} />;
/** Marco del widget; al pulsarlo navega a su pantalla (sin recargar la página). */
function Marco({ titulo, icono, ruta, children }: { titulo: string; icono: ReactNode; ruta?: string; children: ReactNode }) {
  const navegar = useNavigate();
  return (
    <WidgetShell titulo={titulo} icono={icono} onClick={ruta ? () => navegar(ruta) : undefined}>
      {children}
    </WidgetShell>
  );
}
const envolver = (titulo: string, icono: ReactNode, contenido: ReactNode, ruta?: string) => (
  <Marco titulo={titulo} icono={icono} ruta={ruta}>
    {contenido}
  </Marco>
);

export const CATALOGO_CONTABLE: WidgetDef[] = [
  { id: "c-comprobantes", titulo: "Comprobantes contables", descripcion: "Cuántos comprobantes hay listados y cuántos esperan subirse.", icono: ic(Receipt), tamanos: ["S", "M"], tamInicial: "S", modulo: "contable", render: (t) => envolver("Comprobantes", ic(Receipt), <Comprobantes tam={t} />, "/contable/comprobantes") },
  { id: "c-terceros", titulo: "Terceros por crear", descripcion: "Contactos que faltan en Alegra para subir el balance 2025.", icono: ic(UsersRound), tamanos: ["S", "M"], tamInicial: "S", modulo: "contable", render: (t) => envolver("Terceros", ic(UsersRound), <TercerosW tam={t} />, "/contable/terceros") },
  { id: "c-catalogo", titulo: "Catálogo de productos", descripcion: "Productos del catálogo y cambios aplicados en el período.", icono: ic(Boxes), tamanos: ["S", "M"], tamInicial: "S", modulo: "contable", render: (t) => envolver("Catálogo", ic(Boxes), <CatalogoW tam={t} />, "/contable/catalogo") },
  { id: "c-conciliacion", titulo: "Conciliación bancaria", descripcion: "Meses cuadrados con el extracto y abonos contra cargos por mes.", icono: ic(Landmark), tamanos: ["S", "M", "L", "XL"], tamInicial: "L", modulo: "contable", render: (t) => envolver("Conciliación bancaria", ic(Landmark), <ConciliacionW tam={t} />, "/contable/conciliacion") },
  { id: "c-cobros", titulo: "Cobros con factura", descripcion: "Porcentaje de pagos individuales de la cuenta 13050501 con factura del mismo valor.", icono: ic(Wallet), tamanos: ["S", "M"], tamInicial: "S", modulo: "contable", render: (t) => envolver("Cobros 13050501", ic(Wallet), <CobrosW tam={t} />, "/contable/conciliacion") },
  { id: "c-nomina", titulo: "Pagos de nómina por subir", descripcion: "Asientos de pago de nómina del Banco de Bogotá pendientes de publicar.", icono: ic(ClipboardList), tamanos: ["S", "M"], tamInicial: "S", modulo: "contable", render: (t) => envolver("Pagos de nómina", ic(ClipboardList), <NominaW tam={t} />, "/contable/nomina") },
  { id: "c-hitos", titulo: "Qué se ha hecho", descripcion: "Hitos del trabajo contable y su estado (respeta el filtro de fechas).", icono: ic(ListChecks), tamanos: ["L", "XL"], tamInicial: "L", modulo: "contable", render: (t) => envolver("Qué se ha hecho", ic(ListChecks), <HitosW tam={t} />, "/contable/documentacion") },
  { id: "c-pendientes", titulo: "Pendientes por responsable", descripcion: "Tareas abiertas y quién las tiene.", icono: ic(ClipboardList), tamanos: ["M", "L"], tamInicial: "M", modulo: "contable", render: (t) => envolver("Pendientes", ic(ClipboardList), <PendientesW tam={t} />, "/contable/documentacion") },
  { id: "c-ultimos", titulo: "Últimos comprobantes", descripcion: "Los comprobantes más recientes (respeta el filtro de fechas).", icono: ic(Receipt), tamanos: ["L", "XL"], tamInicial: "L", modulo: "contable", render: (t) => envolver("Últimos comprobantes", ic(Receipt), <UltimosW tam={t} />, "/contable/comprobantes") },
  { id: "c-sync", titulo: "Próxima actualización del catálogo", descripcion: "Cuándo corre la actualización semanal archivo → Alegra.", icono: ic(CalendarClock), tamanos: ["S", "M"], tamInicial: "S", modulo: "contable", render: (t) => envolver("Catálogo → Alegra", ic(CalendarClock), <SyncW tam={t} />) },
  { id: "c-accesos", titulo: "Accesos rápidos", descripcion: "Atajos a las pantallas del módulo.", icono: ic(Rocket), tamanos: ["M", "W", "L"], tamInicial: "W", modulo: "contable", render: (t) => envolver("Accesos rápidos", ic(Rocket), <AccesosW tam={t} />) },
];

export const POR_ID_CONTABLE: Record<string, WidgetDef> = Object.fromEntries(CATALOGO_CONTABLE.map((w) => [w.id, w]));

const almacen = crearAlmacenLayout("azahar-contable-widgets-v1", POR_ID_CONTABLE);

export const CONFIG_CONTABLE: ConfigTablero = {
  catalogo: CATALOGO_CONTABLE,
  porId: POR_ID_CONTABLE,
  porDefecto: empaquetar([
    { id: "c-comprobantes", tam: "S" },
    { id: "c-terceros", tam: "S" },
    { id: "c-nomina", tam: "S" },
    { id: "c-sync", tam: "S" },
    { id: "c-conciliacion", tam: "L" },
    { id: "c-hitos", tam: "L" },
    { id: "c-pendientes", tam: "M" },
    { id: "c-catalogo", tam: "S" },
    { id: "c-cobros", tam: "S" },
    { id: "c-accesos", tam: "W" },
  ]),
  leer: almacen.leer,
  guardar: almacen.guardar,
  borrar: almacen.borrar,
  claveGuia: "azahar-contable-guia-vista",
  nombre: "tu tablero contable",
};
