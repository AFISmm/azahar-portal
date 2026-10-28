import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AlignVerticalJustifyStart, ArrowDown, ArrowUp, Check, Hand, MoveDiagonal2, Pencil, Plus, RotateCcw, X } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { useAcceso } from "../../auth/acceso";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/ui";
import { DIM, type Tam } from "./widgetsBase";
import {
  CATALOGO, LAYOUT_POR_DEFECTO, POR_ID, REM_FILA, borrarLayout, dimsIniciales, guardarLayout, leerLayout, type ItemLibre, type WidgetDef, type WidgetId,
} from "./widgetsCatalogo";

// ============================================================================
// Tablero del Inicio con widgets de posición y tamaño LIBRES (sin casillas):
//  - Se arrastran a cualquier parte y se redimensionan desde la esquina inferior derecha.
//  - Nunca se superponen: al soltar o mientras se arrastra, los demás se apartan hacia abajo
//    deslizándose con suavidad (sin vibrar).
//  - Cada widget adapta lo que muestra al tamaño que le des.
//  - La disposición se guarda por persona en este navegador.
// Se entra al modo edición con "Personalizar" o manteniendo pulsado un widget.
// ============================================================================

const PULSACION_LARGA_MS = 650;
const SNAP_PX = 8; // los movimientos se acomodan a múltiplos de 8 px para que quede ordenado
const GAP_REM = 1;
const ANCHO_APILADO = 640; // por debajo de este ancho del tablero los widgets se apilan en una columna
const CLAVE_GUIA = "azahar-inicio-guia-vista";
const TRANSICION =
  "left 240ms cubic-bezier(0.22,0.8,0.24,1), top 240ms cubic-bezier(0.22,0.8,0.24,1), width 200ms ease, height 200ms ease, box-shadow 200ms ease, transform 200ms ease";

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type Rects = Record<string, Rect>;

const interseca = (a: Rect, b: Rect) => a.x < b.x + b.w - 0.5 && a.x + a.w > b.x + 0.5 && a.y < b.y + b.h - 0.5 && a.y + a.h > b.y + 0.5;

/**
 * Quita las superposiciones: el widget `prioridad` (el que se está moviendo) se queda donde está y los
 * demás, en orden de arriba hacia abajo, bajan lo justo para no pisar a ninguno.
 */
function resolver(ids: string[], base: Rects, prioridad: string | null, gap: number): Rects {
  const orden = [...ids].sort((a, b) => (a === prioridad ? -1 : b === prioridad ? 1 : base[a].y - base[b].y || base[a].x - base[b].x));
  const colocados: string[] = [];
  const salida: Rects = {};
  for (const id of orden) {
    const r = { ...base[id] };
    let hayChoque = true;
    while (hayChoque) {
      hayChoque = false;
      for (const otro of colocados) {
        if (interseca(r, salida[otro])) {
          r.y = salida[otro].y + salida[otro].h + gap;
          hayChoque = true;
        }
      }
    }
    salida[id] = r;
    colocados.push(id);
  }
  return salida;
}

/** Sube cada widget hasta donde pueda (sin pisar a ninguno) para quitar los huecos; conserva su columna y su orden. */
function compactar(ids: string[], base: Rects, gap: number): Rects {
  const orden = [...ids].sort((a, b) => base[a].y - base[b].y || base[a].x - base[b].x);
  const colocados: string[] = [];
  const salida: Rects = {};
  for (const id of orden) {
    const r = { ...base[id], y: 0 };
    let hayChoque = true;
    while (hayChoque) {
      hayChoque = false;
      for (const otro of colocados) {
        if (interseca(r, salida[otro])) {
          r.y = salida[otro].y + salida[otro].h + gap;
          hayChoque = true;
        }
      }
    }
    salida[id] = r;
    colocados.push(id);
  }
  return salida;
}

/** Tamaño "de contenido" (S/M/W/L/XL) que mejor corresponde a las medidas reales del widget, entre los que él soporta. */
function tamPara(def: WidgetDef, r: Rect, contW: number, rem: number, apilado: boolean): Tam {
  const colUnit = contW / 4;
  const cols = apilado
    ? 2
    : (() => {
        const c = r.w / colUnit;
        return c < 1.6 ? 1 : c < 3.2 ? 2 : 4;
      })();
  const filas = r.h / (REM_FILA * rem) < 1.55 ? 1 : 2;
  let mejor = def.tamanos[0];
  let mejorDist = Infinity;
  for (const t of def.tamanos) {
    const d = Math.abs(DIM[t].cols - cols) + Math.abs(DIM[t].rows - filas);
    const area = DIM[t].cols * DIM[t].rows;
    if (d < mejorDist || (d === mejorDist && area > DIM[mejor].cols * DIM[mejor].rows)) {
      mejor = t;
      mejorDist = d;
    }
  }
  return mejor;
}

/** Medidas mínimas de un widget: las del más pequeño de sus tamaños de contenido. */
function minimos(def: WidgetDef, contW: number, rem: number) {
  const minCols = Math.min(...def.tamanos.map((t) => DIM[t].cols));
  const minFilas = Math.min(...def.tamanos.map((t) => DIM[t].rows));
  return { w: Math.max(120, (minCols / 4) * contW * 0.94), h: (minFilas * REM_FILA - 1.2) * rem };
}

const snap = (v: number) => Math.round(v / SNAP_PX) * SNAP_PX;

interface Interaccion {
  tipo: "mover" | "redim";
  id: WidgetId;
  puntero: number;
  x0: number;
  y0: number;
  base: Rect;
  scrollY0: number;
}

interface ItemProps {
  def: WidgetDef;
  rect: Rect;
  tam: Tam;
  editando: boolean;
  apilado: boolean;
  activo: boolean;
  puedeSubir: boolean;
  puedeBajar: boolean;
  onIniciar: (e: ReactPointerEvent, tipo: "mover" | "redim") => void;
  onMover: (e: ReactPointerEvent) => void;
  onSoltar: (e: ReactPointerEvent) => void;
  onQuitar: () => void;
  onSubir: () => void;
  onBajar: () => void;
  onPulsacionLarga: () => void;
}

function ItemWidget({
  def, rect, tam, editando, apilado, activo, puedeSubir, puedeBajar, onIniciar, onMover, onSoltar, onQuitar, onSubir, onBajar, onPulsacionLarga,
}: ItemProps) {
  const temporizador = useRef<number | null>(null);
  const origen = useRef({ x: 0, y: 0 });
  const largaDisparada = useRef(false);

  const cancelar = useCallback(() => {
    if (temporizador.current !== null) {
      window.clearTimeout(temporizador.current);
      temporizador.current = null;
    }
  }, []);
  useEffect(() => cancelar, [cancelar]);

  function alPulsar(e: ReactPointerEvent) {
    if (editando) return;
    largaDisparada.current = false;
    origen.current = { x: e.clientX, y: e.clientY };
    cancelar();
    temporizador.current = window.setTimeout(() => {
      largaDisparada.current = true;
      onPulsacionLarga();
    }, PULSACION_LARGA_MS);
  }

  return (
    <div
      data-widget={def.id}
      className={`group absolute min-h-0 rounded-2xl ${editando ? "touch-none select-none outline-dashed outline-2 outline-offset-2 outline-accent-500/70" : ""}`}
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        // el que se arrastra va pegado al puntero (sin transición); los demás se deslizan suavemente
        transition: activo ? "box-shadow 200ms ease, transform 200ms ease" : TRANSICION,
        transform: activo ? "scale(1.012)" : undefined,
        boxShadow: activo ? "0 18px 40px -12px rgba(42,21,21,0.45)" : editando ? "0 6px 18px -10px rgba(42,21,21,0.35)" : undefined,
        zIndex: activo ? 30 : editando ? 1 : undefined,
        willChange: activo ? "transform, left, top" : undefined,
      }}
      onPointerDown={alPulsar}
      onPointerMove={(e) => {
        if (Math.hypot(e.clientX - origen.current.x, e.clientY - origen.current.y) > 8) cancelar();
      }}
      onPointerUp={cancelar}
      onPointerCancel={cancelar}
      onPointerLeave={cancelar}
      onClickCapture={(e) => {
        // tras una pulsación larga no debe dispararse el clic del widget (por ejemplo, navegar)
        if (largaDisparada.current) {
          e.preventDefault();
          e.stopPropagation();
          largaDisparada.current = false;
        }
      }}
    >
      {/* En edición el contenido no recibe clics: todo el widget es un asa para arrastrar */}
      <div className={`h-full ${editando ? "pointer-events-none" : ""}`}>{def.render(tam)}</div>

      {!editando && (
        // pista discreta al pasar el cursor: hay una esquina para cambiar el tamaño
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-80"
        >
          <MoveDiagonal2 className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
      )}

      {editando && (
        <>
          {!apilado && (
            <div
              className={`absolute inset-0 rounded-2xl ${activo ? "cursor-grabbing" : "cursor-grab"}`}
              onPointerDown={(e) => onIniciar(e, "mover")}
              onPointerMove={onMover}
              onPointerUp={onSoltar}
              onPointerCancel={onSoltar}
              aria-label={`Mover ${def.titulo}`}
            />
          )}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onQuitar}
            className="absolute -left-2.5 -top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-status-rechazada text-white shadow-card transition hover:scale-110"
            aria-label={`Quitar ${def.titulo}`}
            title="Quitar este widget"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>

          {apilado && (
            <div className="absolute -top-2.5 right-2 z-10 flex gap-1" onPointerDown={(e) => e.stopPropagation()}>
              <button
                type="button"
                disabled={!puedeSubir}
                onClick={onSubir}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-800 text-cream-100 shadow-card disabled:opacity-40"
                aria-label={`Subir ${def.titulo}`}
              >
                <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <button
                type="button"
                disabled={!puedeBajar}
                onClick={onBajar}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-800 text-cream-100 shadow-card disabled:opacity-40"
                aria-label={`Bajar ${def.titulo}`}
              >
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          )}

          {/* Esquina inferior derecha: arrastra para cambiar el tamaño a tu gusto */}
          <div
            role="slider"
            aria-label={`Cambiar el tamaño de ${def.titulo}`}
            aria-valuenow={Math.round(rect.w)}
            className="absolute -bottom-3 -right-3 z-10 flex h-8 w-8 cursor-nwse-resize touch-none items-center justify-center rounded-full bg-accent-500 text-brand-900 shadow-card transition-transform duration-150 hover:scale-110"
            onPointerDown={(e) => onIniciar(e, "redim")}
            onPointerMove={onMover}
            onPointerUp={onSoltar}
            onPointerCancel={onSoltar}
            title="Arrastra para cambiar el tamaño"
          >
            <MoveDiagonal2 className="h-4 w-4 rotate-90" strokeWidth={2.25} />
          </div>
        </>
      )}
    </div>
  );
}

export function TableroWidgets() {
  const { empleado } = useAuth();
  const acceso = useAcceso();
  const usuarioId = empleado?.id ?? "";

  const [items, setItems] = useState<ItemLibre[]>(() => (usuarioId ? leerLayout(usuarioId) : null) ?? LAYOUT_POR_DEFECTO);
  const [editando, setEditando] = useState(false);
  const [galeria, setGaleria] = useState(false);
  const [vivo, setVivo] = useState<{ id: WidgetId; rect: Rect } | null>(null);
  const [guiaVista, setGuiaVista] = useState(() => {
    try {
      return window.localStorage.getItem(CLAVE_GUIA) === "1";
    } catch {
      return true;
    }
  });
  const [medidas, setMedidas] = useState({ w: 1000, rem: 16 });
  const contRef = useRef<HTMLDivElement>(null);
  const interaccion = useRef<Interaccion | null>(null);

  useEffect(() => {
    if (usuarioId) setItems(leerLayout(usuarioId) ?? LAYOUT_POR_DEFECTO);
  }, [usuarioId]);

  useLayoutEffect(() => {
    const el = contRef.current;
    if (!el) return;
    const medir = () => setMedidas({ w: el.clientWidth, rem: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 });
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { w: contW, rem } = medidas;
  const apilado = contW < ANCHO_APILADO;
  const gap = GAP_REM * rem;

  const permitido = useCallback((def: WidgetDef) => !def.modulo || acceso.ver(def.modulo), [acceso]);
  const visibles = useMemo(() => items.filter((i) => POR_ID[i.id] && permitido(POR_ID[i.id])), [items, permitido]);
  const disponibles = CATALOGO.filter((d) => permitido(d) && !items.some((i) => i.id === d.id));

  /** Posición real en píxeles de cada widget, ya sin superposiciones (y con el widget en movimiento donde lo lleva el puntero). */
  const { rects, alto } = useMemo(() => {
    const ids = visibles.map((i) => i.id as string);
    if (apilado) {
      const orden = [...visibles].sort((a, b) => a.y - b.y || a.x - b.x);
      const salida: Rects = {};
      let y = 0;
      for (const it of orden) {
        const h = vivo?.id === it.id ? vivo.rect.h : it.h * rem;
        salida[it.id] = { x: 0, y, w: contW, h };
        y += h + gap;
      }
      return { rects: salida, alto: y };
    }
    const base: Rects = {};
    for (const it of visibles) base[it.id] = { x: it.x * contW, y: it.y * rem, w: it.w * contW, h: it.h * rem };
    if (vivo && base[vivo.id]) base[vivo.id] = vivo.rect;
    const resuelto = resolver(ids, base, vivo?.id ?? null, gap);
    const fondo = Math.max(0, ...Object.values(resuelto).map((r) => r.y + r.h));
    return { rects: resuelto, alto: fondo };
  }, [visibles, vivo, contW, rem, gap, apilado]);

  const ordenApilado = useMemo(() => [...visibles].sort((a, b) => a.y - b.y || a.x - b.x).map((i) => i.id), [visibles]);

  // ---- guardado ----
  const commit = useCallback(
    (nuevos: ItemLibre[]) => {
      setItems(nuevos);
      if (usuarioId) guardarLayout(usuarioId, nuevos);
    },
    [usuarioId],
  );

  /** Pasa las posiciones ya resueltas (px) al formato guardado (fracciones y rem). */
  const desdeRects = useCallback(
    (r: Rects): ItemLibre[] =>
      items.map((it) => {
        const p = r[it.id];
        if (!p) return it;
        return { id: it.id, x: p.x / contW, y: p.y / rem, w: p.w / contW, h: p.h / rem };
      }),
    [items, contW, rem],
  );

  // ---- interacción: arrastrar y redimensionar ----
  function iniciar(e: ReactPointerEvent, id: WidgetId, tipo: "mover" | "redim") {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const r = rects[id];
    if (!r) return;
    e.stopPropagation();
    e.preventDefault();
    document.body.style.userSelect = "none"; // mientras se arrastra no se selecciona texto de la página
    e.currentTarget.setPointerCapture(e.pointerId);
    interaccion.current = { tipo, id, puntero: e.pointerId, x0: e.clientX, y0: e.clientY, base: { ...r }, scrollY0: window.scrollY };
    setVivo({ id, rect: { ...r } });
  }

  function mover(e: ReactPointerEvent) {
    const a = interaccion.current;
    if (!a || a.puntero !== e.pointerId) return;
    // al acercarse al borde de la pantalla, la página se desplaza sola para poder seguir arrastrando
    if (e.clientY > window.innerHeight - 70) window.scrollBy(0, 14);
    else if (e.clientY < 70) window.scrollBy(0, -14);
    const dx = e.clientX - a.x0;
    const dy = e.clientY - a.y0 + (window.scrollY - a.scrollY0);
    const def = POR_ID[a.id];
    if (a.tipo === "mover") {
      const x = Math.min(Math.max(0, snap(a.base.x + dx)), Math.max(0, contW - a.base.w));
      const y = Math.max(0, snap(a.base.y + dy));
      setVivo({ id: a.id, rect: { ...a.base, x, y } });
    } else {
      const min = minimos(def, contW, rem);
      const w = Math.min(Math.max(min.w, snap(a.base.w + dx)), contW - a.base.x);
      const h = Math.min(Math.max(min.h, snap(a.base.h + dy)), 44 * rem);
      setVivo({ id: a.id, rect: { ...a.base, w, h } });
    }
  }

  function soltar(e: ReactPointerEvent) {
    const a = interaccion.current;
    if (!a || a.puntero !== e.pointerId) return;
    interaccion.current = null;
    document.body.style.userSelect = "";
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ya liberado
    }
    // lo que se ve en pantalla (con los demás ya apartados) es lo que se guarda
    commit(desdeRects(rects));
    setVivo(null);
  }

  // ---- acciones ----
  function agregar(id: WidgetId) {
    const def = POR_ID[id];
    const { w, h } = dimsIniciales(def.tamInicial);
    // entra por abajo del todo, sin pisar a nadie
    const fondoRem = Math.max(0, ...visibles.map((i) => i.y + i.h)) + GAP_REM;
    commit([...items, { id, x: 0.006, y: fondoRem, w, h }]);
    if (disponibles.length <= 1) setGaleria(false);
  }

  /** Quita los huecos: sube los widgets lo que puedan, sin cambiar su columna ni su tamaño. */
  function acomodar() {
    commit(desdeRects(compactar(visibles.map((i) => i.id as string), rects, gap)));
  }

  function restablecer() {
    if (usuarioId) borrarLayout(usuarioId);
    setItems(LAYOUT_POR_DEFECTO);
  }

  function mover1(id: WidgetId, delta: -1 | 1) {
    const i = ordenApilado.indexOf(id);
    const j = i + delta;
    if (j < 0 || j >= ordenApilado.length) return;
    const a = items.find((x) => x.id === id)!;
    const b = items.find((x) => x.id === ordenApilado[j])!;
    commit(items.map((x) => (x.id === a.id ? { ...x, x: b.x, y: b.y } : x.id === b.id ? { ...x, x: a.x, y: a.y } : x)));
  }

  function cerrarGuia() {
    setGuiaVista(true);
    try {
      window.localStorage.setItem(CLAVE_GUIA, "1");
    } catch {
      // sin almacenamiento
    }
  }

  function alternarEdicion(valor: boolean) {
    setEditando(valor);
    if (valor) cerrarGuia();
  }

  return (
    <div>
      {/* Aviso de bienvenida (una sola vez): que se note que el inicio se puede personalizar */}
      {!editando && !guiaVista && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-accent-500/40 bg-accent-300/15 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500 text-brand-900">
            <Hand className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <p className="min-w-0 flex-1 text-sm text-[var(--text-primary)]">
            <strong>Tu inicio es tuyo.</strong> Pulsa <em>Personalizar</em> para mover los widgets a donde quieras, cambiar su tamaño desde la esquina inferior derecha de cada uno y agregar los que
            necesites.
          </p>
          <Button className="px-3 py-1.5 text-xs" onClick={() => alternarEdicion(true)}>
            <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} /> Probar ahora
          </Button>
          <button type="button" onClick={cerrarGuia} className="rounded-lg px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]">
            Entendido
          </button>
        </div>
      )}

      <div
        className={`z-20 mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl ${
          editando ? "sticky top-12 border border-accent-500/50 bg-[var(--surface-card)] px-4 py-2.5 shadow-card" : ""
        }`}
      >
        {editando ? (
          <p className="min-w-0 flex-1 text-xs text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Modo personalizar:</strong>{" "}
            {apilado ? "usa las flechas para ordenar" : "arrastra un widget para moverlo a donde quieras"}, cambia su tamaño desde el círculo naranja de la esquina inferior derecha y quita los que no uses con la{" "}
            <span className="font-semibold text-status-rechazada">×</span> roja. Se guarda solo.
          </p>
        ) : (
          <p className="text-xs text-[var(--text-muted)]">Personaliza tu inicio: mueve, cambia el tamaño o agrega widgets. También puedes mantener pulsado uno.</p>
        )}
        <div className="flex items-center gap-2">
          {editando && (
            <>
              <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setGaleria(true)}>
                <Plus className="h-3.5 w-3.5" strokeWidth={1.75} /> Agregar widget
              </Button>
              {!apilado && (
                <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={acomodar}>
                  <AlignVerticalJustifyStart className="h-3.5 w-3.5" strokeWidth={1.75} /> Acomodar
                </Button>
              )}
              <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={restablecer}>
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} /> Restablecer
              </Button>
            </>
          )}
          <Button className="px-3 py-1.5 text-xs" onClick={() => alternarEdicion(!editando)}>
            {editando ? <Check className="h-3.5 w-3.5" strokeWidth={1.75} /> : <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />}
            {editando ? "Listo" : "Personalizar"}
          </Button>
        </div>
      </div>

      <div ref={contRef} className="relative" style={{ height: Math.max(alto, rem * 12) + (editando ? 3 * rem : 0), transition: "height 240ms ease" }}>
        {visibles.map((item) => {
          const def = POR_ID[item.id];
          const r = rects[item.id];
          if (!r) return null;
          const idxApilado = ordenApilado.indexOf(item.id);
          return (
            <ItemWidget
              key={item.id}
              def={def}
              rect={r}
              tam={tamPara(def, r, contW, rem, apilado)}
              editando={editando}
              apilado={apilado}
              activo={vivo?.id === item.id}
              puedeSubir={idxApilado > 0}
              puedeBajar={idxApilado < ordenApilado.length - 1}
              onIniciar={(e, tipo) => iniciar(e, item.id, tipo)}
              onMover={mover}
              onSoltar={soltar}
              onQuitar={() => commit(items.filter((x) => x.id !== item.id))}
              onSubir={() => mover1(item.id, -1)}
              onBajar={() => mover1(item.id, 1)}
              onPulsacionLarga={() => alternarEdicion(true)}
            />
          );
        })}
      </div>

      {visibles.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] p-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">Tu inicio está vacío.</p>
          <Button
            className="mt-3"
            onClick={() => {
              alternarEdicion(true);
              setGaleria(true);
            }}
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} /> Agregar un widget
          </Button>
        </div>
      )}

      <Modal open={galeria} onClose={() => setGaleria(false)} title="Agregar un widget" widthClassName="max-w-3xl">
        {disponibles.length === 0 ? (
          <p className="text-sm text-[var(--text-secondary)]">Ya tienes en tu inicio todos los widgets disponibles para ti.</p>
        ) : (
          <div className="grid max-h-[65vh] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2">
            {disponibles.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => agregar(d.id)}
                className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] p-3 text-left transition hover:border-accent-500 hover:bg-[var(--surface-muted)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-brand-800">{d.icono}</span>
                <span className="min-w-0">
                  <span className="block font-heading text-sm font-semibold text-[var(--text-primary)]">{d.titulo}</span>
                  <span className="block text-xs text-[var(--text-secondary)]">{d.descripcion}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
