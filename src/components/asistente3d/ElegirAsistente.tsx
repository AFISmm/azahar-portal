import { useState } from "react";
import { Asistente3D } from "./Asistente3D";
import { TONOS_PIEL, type GeneroAsistente } from "./personaje";

export interface EleccionAsistente {
  genero: GeneroAsistente;
  tono: number;
  nombre: string;
}

const NOMBRE_SUGERIDO: Record<GeneroAsistente, string> = { masculina: "Mateo", femenina: "Valentina" };
const TONOS_NOMBRE = ["Claro", "Trigueño", "Moreno", "Oscuro"];

interface Props {
  inicial: EleccionAsistente;
  /** true la primera vez (no se puede omitir); false al cambiarlo desde los ajustes. */
  primeraVez: boolean;
  onConfirmar: (e: EleccionAsistente) => void;
  onCancelar?: () => void;
}

export function ElegirAsistente({ inicial, primeraVez, onConfirmar, onCancelar }: Props) {
  const [genero, setGenero] = useState<GeneroAsistente>(inicial.genero);
  const [tono, setTono] = useState(inicial.tono);
  const [nombre, setNombre] = useState(inicial.nombre);
  const [nombreEditado, setNombreEditado] = useState(!primeraVez);

  function elegir(g: GeneroAsistente) {
    setGenero(g);
    if (!nombreEditado) setNombre(NOMBRE_SUGERIDO[g]);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-3" role="dialog" aria-modal="true" aria-label="Elige a tu asistente">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-card">
        <h2 className="font-heading text-xl font-semibold text-[var(--text-primary)]">Elige a tu asistente</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Te acompañará por el portal: te responde por voz o por escrito, te mira, parpadea y habla contigo. Podrás cambiarlo cuando quieras desde sus ajustes.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {(["masculina", "femenina"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => elegir(g)}
              aria-pressed={genero === g}
              className={`flex flex-col items-center rounded-2xl border-2 p-2 transition ${
                genero === g ? "border-brand-800 bg-accent-300/20" : "border-[var(--border-subtle)] hover:border-brand-800/60"
              }`}
            >
              <Asistente3D genero={g} tono={tono} hablando={false} className="aspect-square w-full max-w-[11rem] overflow-hidden rounded-full bg-cream-100" />
              <span className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">{g === "masculina" ? "Él" : "Ella"}</span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          <p className="mb-1.5 text-xs font-semibold text-[var(--text-secondary)]">Tono de piel</p>
          <div className="flex gap-2">
            {TONOS_PIEL.map((c, i) => (
              <button
                key={c}
                type="button"
                onClick={() => setTono(i)}
                aria-label={TONOS_NOMBRE[i]}
                aria-pressed={tono === i}
                title={TONOS_NOMBRE[i]}
                className={`h-8 w-8 rounded-full border-2 transition ${tono === i ? "scale-110 border-brand-800" : "border-transparent ring-1 ring-[var(--border-subtle)]"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="asistente-nombre" className="mb-1 block text-xs font-semibold text-[var(--text-secondary)]">
            Nombre de tu asistente
          </label>
          <input
            id="asistente-nombre"
            value={nombre}
            maxLength={20}
            onChange={(e) => {
              setNombre(e.target.value.replace(/[^\p{L}\p{N} _-]/gu, ""));
              setNombreEditado(true);
            }}
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-brand-800"
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {!primeraVez && onCancelar && (
            <button type="button" onClick={onCancelar} className="rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:border-brand-800">
              Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={() => onConfirmar({ genero, tono, nombre: nombre.trim() || NOMBRE_SUGERIDO[genero] })}
            className="rounded-lg bg-brand-800 px-5 py-2 text-sm font-semibold text-cream-100 transition hover:bg-brand-900"
          >
            {primeraVez ? "Empezar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
