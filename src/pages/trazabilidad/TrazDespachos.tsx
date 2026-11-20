import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, Clock, Package, Pause, Play, RotateCcw, Siren, Truck } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/ui";
import { AccesoDenegado, usePermisosTraz } from "./comunes";

// DEMO funcional de seguimiento en vivo de pedidos y despachos. Los datos son
// de ejemplo y el reloj es simulado (cada pulso avanza el tiempo) para que se
// vea cómo reacciona el tablero. En producción los pedidos vendrían de las
// facturas de Alegra y cada cambio de etapa lo registraría una persona o un
// escaneo de QR.

const ETAPAS = ["Recibido", "Alistamiento", "Empacado", "Despachado", "En ruta", "Entregado"] as const;
const MIN_POR_ETAPA = 45; // estimación para calcular si un pedido llega a tiempo
const MIN_SIN_MOVIMIENTO = 90;

type Prioridad = "alta" | "media" | "baja";

interface Evento { t: number; texto: string }
interface Pedido {
  id: string;
  cliente: string;
  ciudad: string;
  lote: string;
  kg: number;
  prioridad: Prioridad;
  etapa: number;
  prometido: number;
  ultimoMov: number;
  transportista: string;
  incidente: string | null;
  eventos: Evento[];
}
interface Lote { id: string; nombre: string; stockKg: number }
interface Estado { ahora: number; pedidos: Pedido[] }

const LOTES: Lote[] = [
  { id: "LE-2026-014", nombre: "Huila · Lavado · 250 g", stockKg: 180 },
  { id: "LE-2026-015", nombre: "Nariño · Honey · 340 g", stockKg: 60 },
  { id: "LE-2026-016", nombre: "Cauca · Natural · 500 g", stockKg: 220 },
];

const MIN = 60_000;
const HORA = 60 * MIN;

function estadoInicial(): Estado {
  const base = new Date();
  base.setHours(9, 0, 0, 0);
  const ahora = base.getTime();
  const p = (
    id: string, cliente: string, ciudad: string, lote: string, kg: number, prioridad: Prioridad,
    etapa: number, prometidoEnHoras: number, haceMin: number, transportista: string, incidente: string | null = null,
  ): Pedido => ({
    id, cliente, ciudad, lote, kg, prioridad, etapa, transportista, incidente,
    prometido: ahora + prometidoEnHoras * HORA,
    ultimoMov: ahora - haceMin * MIN,
    eventos: [{ t: ahora - Math.max(haceMin, 30) * MIN, texto: "Pedido recibido desde Alegra" }].concat(
      etapa > 0 ? [{ t: ahora - haceMin * MIN, texto: `Etapa: ${ETAPAS[etapa]}` }] : [],
    ),
  });
  return {
    ahora,
    pedidos: [
      p("FV-2041", "Café Montecarlo (Bogotá)", "Bogotá", "LE-2026-014", 45, "alta", 1, 5, 20, "Servientrega"),
      p("FV-2042", "Hotel Casa Blanca", "Medellín", "LE-2026-016", 30, "alta", 4, 1, 25, "Coordinadora"),
      p("FV-2043", "Tienda El Origen", "Cali", "LE-2026-015", 40, "media", 0, 6, 15, "Servientrega"),
      p("FV-2044", "Panadería Arbol del Pan", "Bogotá", "LE-2026-014", 70, "media", 2, 3, 35, "Mensajería propia"),
      p("FV-2045", "Distribuidora Andina", "Bucaramanga", "LE-2026-015", 35, "media", 1, 8, 40, "Coordinadora"),
      p("FV-2046", "Restaurante La Huerta", "Bogotá", "LE-2026-016", 25, "alta", 3, 2, 10, "Mensajería propia"),
      p("FV-2047", "Oficinas Tecnoparque", "Medellín", "LE-2026-014", 20, "baja", 0, 20, 5, "Coordinadora"),
      p("FV-2048", "Cafetería Universidad", "Cali", "LE-2026-016", 55, "baja", 1, 24, 30, "Servientrega"),
      p("FV-2049", "Tienda Aldea Verde", "Pereira", "LE-2026-014", 30, "media", 4, 4, 130, "Coordinadora", "Retraso reportado por el transportista"),
      p("FV-2050", "Mercado Campesino", "Neiva", "LE-2026-015", 15, "baja", 5, -1, 60, "Servientrega"),
    ],
  };
}

function hora(t: number): string {
  return new Date(t).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
}
function duracion(ms: number): string {
  const min = Math.round(Math.abs(ms) / MIN);
  return min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`;
}

type Severidad = "critica" | "advertencia";
interface Alerta { id: string; severidad: Severidad; pedido: string; texto: string }

function calcularAlertas(estado: Estado): Alerta[] {
  const { ahora, pedidos } = estado;
  const alertas: Alerta[] = [];
  const pendientesPorLote = new Map<string, number>();
  for (const ped of pedidos) {
    if (ped.etapa < 3) pendientesPorLote.set(ped.lote, (pendientesPorLote.get(ped.lote) ?? 0) + ped.kg);
  }
  for (const lote of LOTES) {
    const requerido = pendientesPorLote.get(lote.id) ?? 0;
    if (requerido > lote.stockKg) {
      alertas.push({ id: `stock-${lote.id}`, severidad: "critica", pedido: lote.id, texto: `Stock insuficiente: pedidos pendientes requieren ${requerido} kg y el lote tiene ${lote.stockKg} kg.` });
    }
  }
  for (const ped of pedidos) {
    if (ped.etapa >= 5) continue;
    if (ped.incidente) alertas.push({ id: `inc-${ped.id}`, severidad: "critica", pedido: ped.id, texto: `Incidente: ${ped.incidente}.` });
    if (ahora > ped.prometido) {
      alertas.push({ id: `atr-${ped.id}`, severidad: "critica", pedido: ped.id, texto: `Atrasado ${duracion(ahora - ped.prometido)} frente a la fecha comprometida.` });
    } else {
      const necesario = (5 - ped.etapa) * MIN_POR_ETAPA * MIN;
      if (ped.prometido - ahora < necesario) {
        alertas.push({ id: `rie-${ped.id}`, severidad: "advertencia", pedido: ped.id, texto: `En riesgo: faltan ${duracion(ped.prometido - ahora)} y el proceso restante toma unos ${duracion(necesario)}.` });
      }
    }
    if (!ped.incidente && ahora - ped.ultimoMov > MIN_SIN_MOVIMIENTO * MIN) {
      alertas.push({ id: `mov-${ped.id}`, severidad: "advertencia", pedido: ped.id, texto: `Sin movimiento hace ${duracion(ahora - ped.ultimoMov)} en etapa ${ETAPAS[ped.etapa]}.` });
    }
  }
  return alertas.sort((a, b) => (a.severidad === b.severidad ? 0 : a.severidad === "critica" ? -1 : 1));
}

const PESO_PRIORIDAD: Record<Prioridad, number> = { alta: 0, media: 1, baja: 2 };
const ETIQUETA_PRIORIDAD: Record<Prioridad, string> = { alta: "Alta", media: "Media", baja: "Baja" };
const CLASE_PRIORIDAD: Record<Prioridad, string> = {
  alta: "bg-status-rechazada-bg text-status-rechazada",
  media: "bg-status-pendiente-bg text-status-pendiente",
  baja: "bg-status-aprobada-bg text-status-aprobada",
};

function avanzar(ped: Pedido, ahora: number): Pedido {
  if (ped.etapa >= 5) return ped;
  const etapa = ped.etapa + 1;
  return {
    ...ped,
    etapa,
    ultimoMov: ahora,
    incidente: null,
    eventos: [...ped.eventos, { t: ahora, texto: etapa === 5 ? "Entregado al cliente" : `Etapa: ${ETAPAS[etapa]}` }],
  };
}

export default function TrazDespachos() {
  const { tieneAcceso } = usePermisosTraz();
  const [estado, setEstado] = useState<Estado>(estadoInicial);
  const [enVivo, setEnVivo] = useState(true);
  const [velocidad, setVelocidad] = useState(1);
  const [filtro, setFiltro] = useState<"todos" | Prioridad>("todos");
  const [abierto, setAbierto] = useState<string | null>(null);

  useEffect(() => {
    if (!enVivo) return;
    const intervalo = window.setInterval(() => {
      setEstado((prev) => {
        const ahora = prev.ahora + 10 * MIN * velocidad;
        const pedidos = prev.pedidos.map((ped) => {
          if (ped.etapa >= 5 || ped.incidente) return ped;
          const prob = ped.prioridad === "alta" ? 0.3 : ped.prioridad === "media" ? 0.2 : 0.12;
          return Math.random() < prob * Math.min(velocidad, 3) ? avanzar(ped, ahora) : ped;
        });
        return { ahora, pedidos };
      });
    }, 3000);
    return () => window.clearInterval(intervalo);
  }, [enVivo, velocidad]);

  const alertas = useMemo(() => calcularAlertas(estado), [estado]);
  const alertasPorPedido = useMemo(() => {
    const mapa = new Map<string, Alerta[]>();
    for (const a of alertas) mapa.set(a.pedido, [...(mapa.get(a.pedido) ?? []), a]);
    return mapa;
  }, [alertas]);

  const activos = estado.pedidos.filter((p) => p.etapa < 5);
  const kgComprometidos = activos.reduce((s, p) => s + p.kg, 0);
  const enRiesgo = new Set(alertas.filter((a) => a.severidad === "advertencia" && a.id.startsWith("rie-")).map((a) => a.pedido)).size;
  const atrasados = new Set(alertas.filter((a) => a.id.startsWith("atr-")).map((a) => a.pedido)).size;
  const entregados = estado.pedidos.length - activos.length;

  const ordenados = [...estado.pedidos]
    .filter((p) => filtro === "todos" || p.prioridad === filtro)
    .sort((a, b) => (a.etapa >= 5 ? 1 : 0) - (b.etapa >= 5 ? 1 : 0) || PESO_PRIORIDAD[a.prioridad] - PESO_PRIORIDAD[b.prioridad] || a.prometido - b.prometido);

  const feed = estado.pedidos
    .flatMap((p) => p.eventos.map((e) => ({ ...e, pedido: p.id })))
    .sort((a, b) => b.t - a.t)
    .slice(0, 8);

  if (!tieneAcceso) return <AccesoDenegado etapa="el módulo de trazabilidad" />;

  const simularIncidente = () => {
    setEstado((prev) => {
      const candidato = prev.pedidos.find((p) => p.etapa >= 3 && p.etapa < 5 && !p.incidente);
      if (!candidato) return prev;
      return {
        ...prev,
        pedidos: prev.pedidos.map((p) =>
          p.id === candidato.id
            ? { ...p, incidente: "Vehículo detenido por bloqueo en la vía", eventos: [...p.eventos, { t: prev.ahora, texto: "⚠ Incidente reportado: vehículo detenido por bloqueo en la vía" }] }
            : p,
        ),
      };
    });
  };

  const forzarAvance = (id: string) =>
    setEstado((prev) => ({ ...prev, pedidos: prev.pedidos.map((p) => (p.id === id ? avanzar(p, prev.ahora) : p)) }));

  const resolverIncidente = (id: string) =>
    setEstado((prev) => ({
      ...prev,
      pedidos: prev.pedidos.map((p) => (p.id === id ? { ...p, incidente: null, ultimoMov: prev.ahora, eventos: [...p.eventos, { t: prev.ahora, texto: "Incidente resuelto, el pedido continúa" }] } : p)),
    }));

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Trazabilidad" title="Despachos en vivo" description="Seguimiento de pedidos por cantidad, prioridad y tiempo de entrega, con advertencias automáticas.">
        <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Demo</span>
      </PageHeader>

      <p className="mb-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-4 py-2.5 text-xs text-[var(--text-secondary)]">
        Demostración con datos de ejemplo. Los pedidos simulan facturas de Alegra y el reloj avanza solo para mostrar cómo reacciona el tablero. Puedes avanzar pedidos, simular un incidente y ver cómo aparecen las advertencias.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <span className={`h-2.5 w-2.5 rounded-full ${enVivo ? "animate-pulse bg-status-aprobada" : "bg-[var(--text-muted)]"}`} />
          {enVivo ? "En vivo" : "Pausado"} · {hora(estado.ahora)}
        </span>
        <Button type="button" variant="outline" onClick={() => setEnVivo((v) => !v)}>
          {enVivo ? <Pause className="mr-1.5 inline h-4 w-4" /> : <Play className="mr-1.5 inline h-4 w-4" />}
          {enVivo ? "Pausar" : "Reanudar"}
        </Button>
        <div className="inline-flex overflow-hidden rounded-lg border border-[var(--border-subtle)] text-xs font-bold">
          {[1, 2, 4].map((v) => (
            <button key={v} type="button" onClick={() => setVelocidad(v)} className={`px-3 py-2 ${velocidad === v ? "bg-brand-800 text-cream-100" : "hover:bg-cream-200"}`}>
              {v}x
            </button>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={simularIncidente}>
          <Siren className="mr-1.5 inline h-4 w-4" /> Simular incidente
        </Button>
        <Button type="button" variant="outline" onClick={() => { setEstado(estadoInicial()); setAbierto(null); }}>
          <RotateCcw className="mr-1.5 inline h-4 w-4" /> Reiniciar demo
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Indicador icono={<Package className="h-5 w-5" />} etiqueta="Pedidos activos" valor={String(activos.length)} nota={`${entregados} entregados`} />
        <Indicador icono={<Truck className="h-5 w-5" />} etiqueta="Kg comprometidos" valor={`${kgComprometidos} kg`} nota="en pedidos sin entregar" />
        <Indicador icono={<Clock className="h-5 w-5" />} etiqueta="En riesgo" valor={String(enRiesgo)} nota="no llegarían a tiempo" tono={enRiesgo > 0 ? "alerta" : undefined} />
        <Indicador icono={<AlertTriangle className="h-5 w-5" />} etiqueta="Atrasados" valor={String(atrasados)} nota="pasaron la fecha comprometida" tono={atrasados > 0 ? "critico" : undefined} />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card title={`Advertencias (${alertas.length})`} className="lg:col-span-2">
          {alertas.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-status-aprobada"><CheckCircle2 className="h-4 w-4" /> Todo en orden: no hay advertencias activas.</p>
          ) : (
            <ul className="space-y-2">
              {alertas.map((a) => (
                <li key={a.id} className={`flex items-start gap-2.5 rounded-lg px-3 py-2 text-sm ${a.severidad === "critica" ? "bg-status-rechazada-bg text-status-rechazada" : "bg-status-pendiente-bg text-[var(--text-primary)]"}`}>
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span><strong>{a.pedido}</strong> · {a.texto}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Actividad reciente">
          <ul className="space-y-2 text-xs">
            {feed.map((e, i) => (
              <li key={`${e.pedido}-${e.t}-${i}`} className="flex gap-2">
                <span className="w-12 shrink-0 font-mono text-[var(--text-muted)]">{hora(e.t)}</span>
                <span><strong>{e.pedido}</strong> · {e.texto}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Inventario por lote vs. pedidos pendientes" className="mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          {LOTES.map((l) => {
            const requerido = estado.pedidos.filter((p) => p.lote === l.id && p.etapa < 3).reduce((s, p) => s + p.kg, 0);
            const pct = Math.min(100, Math.round((requerido / l.stockKg) * 100));
            const falta = requerido > l.stockKg;
            return (
              <div key={l.id}>
                <p className="text-sm font-semibold">{l.nombre}</p>
                <p className="text-xs text-[var(--text-muted)]">{l.id} · stock {l.stockKg} kg</p>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                  <div className={`h-full rounded-full ${falta ? "bg-status-rechazada" : pct > 80 ? "bg-status-pendiente" : "bg-status-aprobada"}`} style={{ width: `${pct}%` }} />
                </div>
                <p className={`mt-1 text-xs ${falta ? "font-semibold text-status-rechazada" : "text-[var(--text-muted)]"}`}>
                  {requerido} kg por despachar{falta ? ` · faltan ${requerido - l.stockKg} kg` : ""}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card
        title="Pedidos por prioridad y tiempo de entrega"
        actions={
          <div className="inline-flex overflow-hidden rounded-lg border border-[var(--border-subtle)] text-xs font-bold">
            {(["todos", "alta", "media", "baja"] as const).map((f) => (
              <button key={f} type="button" onClick={() => setFiltro(f)} className={`px-3 py-1.5 capitalize ${filtro === f ? "bg-brand-800 text-cream-100" : "hover:bg-cream-200"}`}>
                {f}
              </button>
            ))}
          </div>
        }
      >
        <ul className="divide-y divide-[var(--border-subtle)]">
          {ordenados.map((p) => {
            const lista = alertasPorPedido.get(p.id) ?? [];
            const critico = lista.some((a) => a.severidad === "critica");
            const expandido = abierto === p.id;
            const restante = p.prometido - estado.ahora;
            return (
              <li key={p.id} className="py-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => setAbierto(expandido ? null : p.id)} className="flex min-w-0 flex-1 items-center gap-2 text-left" aria-expanded={expandido}>
                    {expandido ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{p.id} · {p.cliente}</span>
                      <span className="block text-xs text-[var(--text-muted)]">{p.ciudad} · {p.kg} kg · {p.lote} · {p.transportista}</span>
                    </span>
                  </button>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${CLASE_PRIORIDAD[p.prioridad]}`}>{ETIQUETA_PRIORIDAD[p.prioridad]}</span>
                  <span className={`w-36 text-right text-xs ${p.etapa >= 5 ? "text-status-aprobada" : restante < 0 ? "font-semibold text-status-rechazada" : "text-[var(--text-muted)]"}`}>
                    {p.etapa >= 5 ? "Entregado" : restante < 0 ? `Atrasado ${duracion(restante)}` : `Entrega en ${duracion(restante)}`}
                  </span>
                  {critico && <AlertTriangle className="h-4 w-4 text-status-rechazada" aria-label="Con advertencia crítica" />}
                  <Button type="button" variant="outline" disabled={p.etapa >= 5} onClick={() => forzarAvance(p.id)}>
                    {p.etapa >= 4 ? "Marcar entregado" : "Avanzar etapa"}
                  </Button>
                </div>

                <div className="mt-2.5 flex gap-1" aria-label={`Etapa: ${ETAPAS[p.etapa]}`}>
                  {ETAPAS.map((nombre, i) => (
                    <div key={nombre} className="flex-1">
                      <div className={`h-1.5 rounded-full ${i < p.etapa ? "bg-status-aprobada" : i === p.etapa ? (p.incidente ? "bg-status-rechazada" : "animate-pulse bg-accent-500") : "bg-[var(--surface-muted)]"}`} />
                      <p className={`mt-1 hidden text-[10px] sm:block ${i === p.etapa ? "font-bold" : "text-[var(--text-muted)]"}`}>{nombre}</p>
                    </div>
                  ))}
                </div>

                {expandido && (
                  <div className="mt-3 grid gap-4 rounded-xl bg-[var(--surface-muted)] p-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">Línea de tiempo</p>
                      <ol className="space-y-1.5 text-xs">
                        {p.eventos.map((e, i) => (
                          <li key={i} className="flex gap-2"><span className="w-12 shrink-0 font-mono text-[var(--text-muted)]">{hora(e.t)}</span><span>{e.texto}</span></li>
                        ))}
                      </ol>
                    </div>
                    <div className="text-xs">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">Detalle</p>
                      <p>Compromiso de entrega: <strong>{hora(p.prometido)}</strong></p>
                      <p>Último movimiento: <strong>hace {duracion(estado.ahora - p.ultimoMov)}</strong></p>
                      {lista.map((a) => <p key={a.id} className="mt-1 text-status-rechazada">⚠ {a.texto}</p>)}
                      {p.incidente && (
                        <Button type="button" variant="outline" className="mt-3" onClick={() => resolverIncidente(p.id)}>Marcar incidente resuelto</Button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

function Indicador({ icono, etiqueta, valor, nota, tono }: { icono: React.ReactNode; etiqueta: string; valor: string; nota: string; tono?: "alerta" | "critico" }) {
  const color = tono === "critico" ? "text-status-rechazada" : tono === "alerta" ? "text-status-pendiente" : "text-[var(--text-primary)]";
  return (
    <Card>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{icono}{etiqueta}</div>
      <p className={`mt-1 font-heading text-3xl font-bold ${color}`}>{valor}</p>
      <p className="text-xs text-[var(--text-muted)]">{nota}</p>
    </Card>
  );
}
