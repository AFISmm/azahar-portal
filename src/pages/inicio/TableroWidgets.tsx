import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, GripVertical, Minus, Pencil, Plus, RotateCcw } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { useAcceso } from "../../auth/acceso";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/ui";
import { DIM, ORDEN_TAM, type Tam, useColumnas } from "./widgetsBase";
import {
  CATALOGO, LAYOUT_POR_DEFECTO, POR_ID, borrarLayout, guardarLayout, leerLayout, type ItemLayout, type WidgetDef, type WidgetId,
} from "./widgetsCatalogo";

// ============================================================================
// Tablero del Inicio estilo widgets de iOS: cada tarjeta se puede mover, cambiar
// de tamaño, quitar, y se pueden agregar más desde la galería. La disposición
// se guarda por persona en este navegador. Se entra al modo edición con el botón
// "Personalizar" o manteniendo pulsado un widget.
// ============================================================================

const PULSACION_LARGA_MS = 650;

/** Pictograma del tamaño: un rectángulo con la proporción de columnas × filas que ocupa. */
function IconoTam({ tam, activo }: { tam: Tam; activo: boolean }) {
  const { cols, rows } = DIM[tam];
  return (
    <span
      className={`block rounded-[3px] border ${activo ? "border-cream-100 bg-cream-100/90" : "border-cream-100/70"}`}
      style={{ width: cols * 5 + 3, height: rows * 5 + 3 }}
    />
  );
}

interface ItemProps {
  item: ItemLayout;
  def: WidgetDef;
  columnas: number;
  editando: boolean;
  onTam: (t: Tam) => void;
  onQuitar: () => void;
  onPulsacionLarga: () => void;
  indice: number;
}

function ItemWidget({ item, def, columnas, editando, onTam, onQuitar, onPulsacionLarga, indice }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, disabled: !editando });
  const { cols, rows } = DIM[item.tam];
  const temporizador = useRef<number | null>(null);
  const origen = useRef({ x: 0, y: 0 });
  const largaDisparada = useRef(false);

  function cancelarPulsacion() {
    if (temporizador.current !== null) {
      window.clearTimeout(temporizador.current);
      temporizador.current = null;
    }
  }

  // Fuera del modo edición, mantener pulsado el widget entra al modo edición (como en iOS).
  function alPulsar(e: React.PointerEvent) {
    if (editando) return;
    largaDisparada.current = false;
    origen.current = { x: e.clientX, y: e.clientY };
    cancelarPulsacion();
    temporizador.current = window.setTimeout(() => {
      largaDisparada.current = true;
      onPulsacionLarga();
    }, PULSACION_LARGA_MS);
  }

  function alMover(e: React.PointerEvent) {
    if (Math.hypot(e.clientX - origen.current.x, e.clientY - origen.current.y) > 8) cancelarPulsacion();
  }

  useEffect(() => cancelarPulsacion, []);

  return (
    <div
      ref={setNodeRef}
      data-widget={item.id}
      style={{
        gridColumn: `span ${Math.min(cols, columnas)}`,
        gridRow: `span ${rows}`,
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 30 : undefined,
        animationDelay: `${(indice % 5) * -0.12}s`,
      }}
      className={`relative min-h-0 ${editando ? "azahar-wiggle touch-none select-none" : ""} ${isDragging ? "opacity-70 shadow-2xl" : ""}`}
      onPointerDown={alPulsar}
      onPointerMove={alMover}
      onPointerUp={cancelarPulsacion}
      onPointerCancel={cancelarPulsacion}
      onPointerLeave={cancelarPulsacion}
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
      <div className={`h-full ${editando ? "pointer-events-none" : ""}`}>{def.render(item.tam)}</div>

      {editando && (
        <>
          <div className="absolute inset-0 cursor-grab rounded-2xl ring-2 ring-accent-500/70 active:cursor-grabbing" {...attributes} {...listeners} aria-label={`Mover ${def.titulo}`} />
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onQuitar}
            className="absolute -left-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-status-rechazada text-white shadow-card transition hover:scale-110"
            aria-label={`Quitar ${def.titulo}`}
            title="Quitar este widget"
          >
            <Minus className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <div
            className="absolute -bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-800 px-2 py-1 shadow-card"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-3.5 w-3.5 text-cream-100/60" strokeWidth={1.75} />
            {ORDEN_TAM.filter((t) => def.tamanos.includes(t)).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTam(t)}
                className={`flex h-6 min-w-6 items-center justify-center rounded-md px-1 transition ${t === item.tam ? "bg-accent-500" : "hover:bg-white/15"}`}
                aria-label={`Tamaño ${DIM[t].etiqueta}`}
                aria-pressed={t === item.tam}
                title={DIM[t].etiqueta}
              >
                <IconoTam tam={t} activo={t === item.tam} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function TableroWidgets({ onEditandoCambia }: { onEditandoCambia?: (editando: boolean) => void }) {
  const { empleado } = useAuth();
  const acceso = useAcceso();
  const columnas = useColumnas();
  const usuarioId = empleado?.id ?? "";

  const [items, setItems] = useState<ItemLayout[]>(() => (usuarioId ? leerLayout(usuarioId) : null) ?? LAYOUT_POR_DEFECTO);
  const [editando, setEditando] = useState(false);
  const [galeria, setGaleria] = useState(false);

  // Si el usuario cambia (cerrar sesión y entrar con otro), se carga SU disposición.
  useEffect(() => {
    if (usuarioId) setItems(leerLayout(usuarioId) ?? LAYOUT_POR_DEFECTO);
  }, [usuarioId]);

  function actualizar(nuevos: ItemLayout[]) {
    setItems(nuevos);
    if (usuarioId) guardarLayout(usuarioId, nuevos);
  }

  function ponerEditando(valor: boolean) {
    setEditando(valor);
    onEditandoCambia?.(valor);
  }

  const permitido = (def: WidgetDef) => !def.modulo || acceso.ver(def.modulo);

  // Solo se muestran los widgets a los que esta persona tiene derecho (si le quitaron un permiso, desaparecen).
  const visibles = useMemo(() => items.filter((i) => POR_ID[i.id] && permitido(POR_ID[i.id])), [items, acceso]); // eslint-disable-line react-hooks/exhaustive-deps
  const disponibles = CATALOGO.filter((d) => permitido(d) && !items.some((i) => i.id === d.id));

  const sensores = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function alSoltar(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const desde = items.findIndex((i) => i.id === active.id);
    const hasta = items.findIndex((i) => i.id === over.id);
    if (desde >= 0 && hasta >= 0) actualizar(arrayMove(items, desde, hasta));
  }

  function agregar(id: WidgetId) {
    const def = POR_ID[id];
    actualizar([...items, { id, tam: def.tamInicial }]);
    if (disponibles.length <= 1) setGaleria(false);
  }

  function restablecer() {
    if (usuarioId) borrarLayout(usuarioId);
    setItems(LAYOUT_POR_DEFECTO);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        {editando ? (
          <p className="text-xs text-[var(--text-secondary)]">
            Arrastra un widget para moverlo, elige su tamaño abajo de cada uno, o quítalo con el botón rojo. Tus cambios se guardan solos.
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
              <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={restablecer}>
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} /> Restablecer
              </Button>
            </>
          )}
          <Button className="px-3 py-1.5 text-xs" onClick={() => ponerEditando(!editando)}>
            {editando ? <Check className="h-3.5 w-3.5" strokeWidth={1.75} /> : <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />}
            {editando ? "Listo" : "Personalizar"}
          </Button>
        </div>
      </div>

      <DndContext sensors={sensores} collisionDetection={closestCenter} onDragEnd={alSoltar}>
        <SortableContext items={visibles.map((i) => i.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-4 pb-4 lg:grid-cols-4 [grid-auto-flow:dense] [grid-auto-rows:9rem]">
            {visibles.map((item, i) => (
              <ItemWidget
                key={item.id}
                item={item}
                def={POR_ID[item.id]}
                columnas={columnas}
                editando={editando}
                indice={i}
                onTam={(t) => actualizar(items.map((x) => (x.id === item.id ? { ...x, tam: t } : x)))}
                onQuitar={() => actualizar(items.filter((x) => x.id !== item.id))}
                onPulsacionLarga={() => ponerEditando(true)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {visibles.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] p-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">Tu inicio está vacío.</p>
          <Button className="mt-3" onClick={() => { ponerEditando(true); setGaleria(true); }}>
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
                  <span className="mt-1 block text-[11px] text-[var(--text-muted)]">Tamaños: {d.tamanos.map((t) => DIM[t].etiqueta).join(", ")}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
