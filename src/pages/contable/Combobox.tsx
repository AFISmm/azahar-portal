import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface ComboboxProps<T> {
  /** Texto que se muestra cuando hay algo elegido ("13050501 · Clientes nacionales"). */
  valorTexto: string;
  placeholder: string;
  /** Busca opciones; se llama con retardo mientras se escribe. */
  buscar: (q: string) => Promise<T[]>;
  clave: (o: T) => string;
  etiqueta: (o: T) => string;
  onElegir: (o: T) => void;
  onLimpiar?: () => void;
  /** Texto de una acción al final de la lista (p. ej. "Agregar tercero nuevo"); recibe lo escrito. */
  accionExtra?: { texto: string; onClick: (q: string) => void };
  disabled?: boolean;
  ariaLabel: string;
}

/** Selector con búsqueda, al estilo de las listas de Alegra: se escribe, aparecen opciones y se elige una. */
export function Combobox<T>({ valorTexto, placeholder, buscar, clave, etiqueta, onElegir, onLimpiar, accionExtra, disabled, ariaLabel }: ComboboxProps<T>) {
  const [abierto, setAbierto] = useState(false);
  const [q, setQ] = useState("");
  const [opciones, setOpciones] = useState<T[]>([]);
  const [cargando, setCargando] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    let vigente = true;
    setCargando(true);
    const t = setTimeout(() => {
      buscar(q)
        .then((o) => vigente && setOpciones(o))
        .catch(() => vigente && setOpciones([]))
        .finally(() => vigente && setCargando(false));
    }, 250);
    return () => {
      vigente = false;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, abierto]);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => {
      if (contenedor.current && !contenedor.current.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto]);

  return (
    <div ref={contenedor} className="relative min-w-[12rem]">
      <div className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] focus-within:border-brand-800 focus-within:ring-2 focus-within:ring-brand-800/20">
        <input
          aria-label={ariaLabel}
          disabled={disabled}
          value={abierto ? q : valorTexto}
          placeholder={placeholder}
          onFocus={() => {
            setQ("");
            setAbierto(true);
          }}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-transparent px-2.5 py-1.5 text-xs text-[var(--text-primary)] outline-none disabled:opacity-60"
        />
        {valorTexto && onLimpiar && !abierto && !disabled && (
          <button type="button" onClick={onLimpiar} aria-label={`Quitar ${ariaLabel.toLowerCase()}`} className="px-1.5 text-[var(--text-muted)] hover:text-status-rechazada">
            <X className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        )}
      </div>
      {abierto && (
        <div className="absolute left-0 z-30 mt-1 max-h-60 w-80 max-w-[85vw] overflow-y-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] py-1 shadow-lg">
          {cargando && <p className="px-3 py-2 text-xs text-[var(--text-muted)]">Buscando…</p>}
          {!cargando && opciones.length === 0 && <p className="px-3 py-2 text-xs text-[var(--text-muted)]">Sin resultados.</p>}
          {opciones.map((o) => (
            <button
              key={clave(o)}
              type="button"
              onClick={() => {
                onElegir(o);
                setAbierto(false);
              }}
              className="block w-full truncate px-3 py-1.5 text-left text-xs text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
            >
              {etiqueta(o)}
            </button>
          ))}
          {accionExtra && (
            <button
              type="button"
              onClick={() => {
                accionExtra.onClick(q);
                setAbierto(false);
              }}
              className="block w-full border-t border-[var(--border-subtle)] px-3 py-2 text-left text-xs font-semibold text-brand-800 hover:bg-[var(--surface-muted)]"
            >
              + {accionExtra.texto}
              {q ? ` “${q}”` : ""}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
