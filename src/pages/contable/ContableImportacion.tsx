import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, FileUp, Loader2, Sparkles } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Input, Select } from "../../components/ui";
import { useAcceso } from "../../auth/acceso";
import { contableApi, type SugerenciaImportacion } from "../../lib/contableApi";
import { CAMPOS, DESTINOS, DESTINO_NOMBRE, DESTINO_RUTA, autoMapear, faltantes, type Destino } from "../../lib/contableDestinos";
import { leerArchivo, normalizarFechas, type ArchivoLeido } from "../../lib/leerArchivo";
import { AccesoDenegado, AvisoDemo, ErrorCaja, TD, TH, Tabla, usePermisoContable } from "./comunes";
import { ImportadosCard } from "./ImportadosCard";

const LOTE = 1500;

const formatoPct = (n: number) => `${Math.round(n * 100)}%`;

/** Importación de archivos: se sube cualquier archivo, la IA sugiere a qué módulo va y la persona confirma o elige a mano. */
export default function ContableImportacion() {
  const { tieneAcceso } = usePermisoContable();
  const acceso = useAcceso();
  const puedeEditar = acceso.editar("contable");
  const entrada = useRef<HTMLInputElement>(null);

  const [archivo, setArchivo] = useState<File | null>(null);
  const [leido, setLeido] = useState<ArchivoLeido | null>(null);
  const [leyendo, setLeyendo] = useState(false);
  const [sugerencia, setSugerencia] = useState<SugerenciaImportacion | null>(null);
  const [sugiriendo, setSugiriendo] = useState(false);
  const [destino, setDestino] = useState<Destino | "">("");
  const [mapeo, setMapeo] = useState<Record<string, string>>({});
  const [cuentaBanco, setCuentaBanco] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [progreso, setProgreso] = useState<{ hecho: number; total: number } | null>(null);
  const [exito, setExito] = useState<{ filas: number; destino: Destino } | null>(null);
  const [recarga, setRecarga] = useState(0);

  const reiniciar = useCallback(() => {
    setArchivo(null);
    setLeido(null);
    setSugerencia(null);
    setDestino("");
    setMapeo({});
    setCuentaBanco("");
    setError(null);
    setProgreso(null);
  }, []);

  const elegirDestino = useCallback((d: Destino | "", enc: string[]) => {
    setDestino(d);
    setMapeo(d ? autoMapear(d, enc) : {});
  }, []);

  /** Pide la sugerencia con una muestra (o con el archivo, si es PDF/imagen) y preselecciona el destino. */
  const sugerir = useCallback(
    async (l: ArchivoLeido) => {
      setSugiriendo(true);
      try {
        const s = await contableApi.sugerir({
          nombre: l.nombre,
          formato: l.formato,
          encabezados: l.encabezados,
          muestra: l.filas.slice(0, 15),
          archivoBase64: l.binario?.base64,
          mime: l.binario?.mime,
        });
        setSugerencia(s);
        let usado = l;
        if (s.extraido) {
          // PDF o imagen: la IA extrajo la tabla; se trabaja con eso (hay que revisarlo)
          usado = { ...l, encabezados: s.extraido.encabezados, filas: s.extraido.filas, matriz: [] };
          setLeido(usado);
        }
        elegirDestino(s.destino, usado.encabezados);
      } catch {
        setSugerencia(null);
      } finally {
        setSugiriendo(false);
      }
    },
    [elegirDestino],
  );

  async function alElegirArchivo(f: File | undefined, opciones: { hoja?: string; filaEncabezado?: number } = {}, resugerir = true) {
    if (!f) return;
    setArchivo(f);
    setExito(null);
    setError(null);
    setLeyendo(true);
    try {
      const l = await leerArchivo(f, opciones);
      setLeido(l);
      if (l.advertencia) {
        setSugerencia(null);
        return;
      }
      if (resugerir) await sugerir(l);
      else if (destino) setMapeo(autoMapear(destino, l.encabezados));
    } finally {
      setLeyendo(false);
    }
  }

  async function importar() {
    if (!leido || !destino) return;
    setError(null);
    const dFaltan = faltantes(destino, mapeo);
    if (dFaltan.length) return setError(`Indica a qué columna corresponde: ${dFaltan.join(", ")}.`);
    try {
      const filas = normalizarFechas(leido.filas, mapeo.fecha);
      setProgreso({ hecho: 0, total: filas.length });
      const id = await contableApi.importarCrear({
        nombre: leido.nombre,
        formato: leido.formato,
        destino,
        sugerido: sugerencia?.destino ?? null,
        confianza: sugerencia?.confianza ?? null,
        encabezados: leido.encabezados,
        mapeo,
        cuentaBanco,
      });
      for (let i = 0; i < filas.length; i += LOTE) {
        await contableApi.importarFilas(id, filas.slice(i, i + LOTE));
        setProgreso({ hecho: Math.min(filas.length, i + LOTE), total: filas.length });
      }
      setExito({ filas: filas.length, destino });
      setRecarga((n) => n + 1);
      reiniciar();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo importar.");
    } finally {
      setProgreso(null);
    }
  }

  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;

  const hayFilas = !!leido && leido.filas.length > 0;
  const columnasVista = leido?.encabezados.slice(0, 8) ?? [];
  const difiere = !!sugerencia && !!destino && sugerencia.destino !== destino;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Importación de archivos"
        description="Sube un archivo en cualquier formato (Excel, CSV, Word, PDF, imagen…). La IA sugiere a qué módulo va la información y tú confirmas o eliges otro."
      />
      <AvisoDemo />

      {exito && (
        <p className="flex items-center gap-2 rounded-lg bg-status-aprobada-bg px-3 py-2 text-sm font-semibold text-status-aprobada">
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
          Se importaron {exito.filas.toLocaleString("es-CO")} filas a {DESTINO_NOMBRE[exito.destino]}.{" "}
          <Link to={DESTINO_RUTA[exito.destino]} className="underline">
            Verlas
          </Link>
        </p>
      )}

      <Card title="1. Sube el archivo">
        <label
          className={`flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[var(--border-subtle)] px-4 py-8 text-center transition ${puedeEditar ? "cursor-pointer hover:border-accent-500/60" : "opacity-60"}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (puedeEditar) void alElegirArchivo(e.dataTransfer.files[0]);
          }}
        >
          {leyendo ? <Loader2 className="h-6 w-6 animate-spin text-brand-800" strokeWidth={1.75} /> : <FileUp className="h-6 w-6 text-accent-500" strokeWidth={1.75} />}
          <span className="text-sm font-semibold text-[var(--text-primary)]">{archivo ? archivo.name : "Arrastra un archivo aquí o haz clic para elegirlo"}</span>
          <span className="text-xs text-[var(--text-muted)]">Excel (.xlsx), CSV, Word (.docx), JSON, PDF o imagen. Hasta 40 MB (PDF e imágenes, hasta 3,4 MB).</span>
          <input ref={entrada} type="file" className="sr-only" disabled={!puedeEditar} onChange={(e) => void alElegirArchivo(e.target.files?.[0])} />
        </label>
        {!puedeEditar && <p className="mt-2 text-xs text-status-pendiente">Tu cuenta puede consultar este módulo pero no importar. Pide el permiso de edición en Gestión de usuarios.</p>}
        {leido?.advertencia && <div className="mt-3"><ErrorCaja mensaje={leido.advertencia} /></div>}
      </Card>

      {leido && !leido.advertencia && (
        <>
          <Card title="2. ¿A qué módulo va?">
            <div className="space-y-3">
              {sugiriendo && (
                <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> La IA está revisando el archivo…
                </p>
              )}
              {sugerencia && (
                <div className="rounded-xl border border-accent-500/40 bg-accent-300/15 px-4 py-3">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                    <Sparkles className="h-4 w-4 text-accent-500" strokeWidth={1.75} />
                    {sugerencia.modo === "ia" ? "Sugerencia de la IA" : "Sugerencia automática"}: {DESTINO_NOMBRE[sugerencia.destino]}
                    <span className="rounded-full bg-[var(--surface-card)] px-2 py-0.5 text-xs font-semibold text-[var(--text-secondary)]">{formatoPct(sugerencia.confianza)} de seguridad</span>
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{sugerencia.motivo}</p>
                  {sugerencia.modo === "reglas" && <p className="mt-1 text-[11px] text-[var(--text-muted)]">La IA no estaba disponible: se usaron reglas por palabras clave. Revisa el destino.</p>}
                  {sugerencia.extraido && <p className="mt-1 text-[11px] font-semibold text-status-pendiente">La IA leyó el documento y extrajo {sugerencia.extraido.filas.length} filas: revísalas antes de importar.</p>}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Módulo de destino</label>
                  <Select value={destino} onChange={(e) => elegirDestino(e.target.value as Destino | "", leido.encabezados)} aria-label="Módulo de destino">
                    <option value="">Elegir…</option>
                    {DESTINOS.map((d) => (
                      <option key={d} value={d}>
                        {DESTINO_NOMBRE[d]}
                        {sugerencia?.destino === d ? " (sugerido)" : ""}
                      </option>
                    ))}
                  </Select>
                  {difiere && <p className="mt-1 text-[11px] text-[var(--text-muted)]">Elegiste un módulo distinto al sugerido; está bien, tú decides.</p>}
                </div>
                {leido.hojas.length > 1 && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Hoja o tabla</label>
                    <Select value={leido.hoja} onChange={(e) => void alElegirArchivo(archivo ?? undefined, { hoja: e.target.value }, false)} aria-label="Hoja">
                      {leido.hojas.map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </Select>
                  </div>
                )}
                {leido.matriz.length > 0 && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Fila de encabezados</label>
                    <Input
                      type="number"
                      min={1}
                      max={Math.max(1, leido.matriz.length)}
                      value={leido.filaEncabezado + 1}
                      onChange={(e) => void alElegirArchivo(archivo ?? undefined, { hoja: leido.hoja, filaEncabezado: Math.max(0, Number(e.target.value) - 1) }, false)}
                      aria-label="Fila de encabezados"
                    />
                  </div>
                )}
                {destino === "extracto" && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Cuenta bancaria del extracto</label>
                    <Input value={cuentaBanco} onChange={(e) => setCuentaBanco(e.target.value)} placeholder="Ej.: Bancolombia ahorros 0590" aria-label="Cuenta bancaria" />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {destino && (
            <Card title="3. ¿Qué columna es cada dato?">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CAMPOS[destino].map((c) => (
                  <div key={c.clave}>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                      {c.etiqueta}
                      {c.obligatorio && <span className="text-status-rechazada"> *</span>}
                    </label>
                    <Select value={mapeo[c.clave] ?? ""} onChange={(e) => setMapeo((m) => ({ ...m, [c.clave]: e.target.value }))} aria-label={c.etiqueta}>
                      <option value="">— No importar —</option>
                      {leido.encabezados.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </Select>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">Se importan todas las columnas del archivo; esto solo le dice al sistema cuáles son los datos clave de {DESTINO_NOMBRE[destino]}.</p>
            </Card>
          )}

          <Card title={`Vista previa (${hayFilas ? leido.filas.length.toLocaleString("es-CO") : 0} filas)`}>
            {!hayFilas ? (
              <p className="text-sm text-[var(--text-secondary)]">No se encontraron filas debajo de la fila de encabezados. Prueba con otra hoja o cambia la fila de encabezados.</p>
            ) : (
              <Tabla>
                <thead>
                  <tr>
                    {columnasVista.map((c) => (
                      <th key={c} className={TH}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leido.filas.slice(0, 8).map((f, i) => (
                    <tr key={i}>
                      {columnasVista.map((c) => (
                        <td key={c} className={`${TD} max-w-xs truncate`} title={f[c]}>
                          {f[c] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Tabla>
            )}
            {error && <div className="mt-3"><ErrorCaja mensaje={error} /></div>}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button onClick={() => void importar()} disabled={!puedeEditar || !destino || !hayFilas || !!progreso}>
                {progreso ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <FileUp className="h-4 w-4" strokeWidth={1.75} />}
                {progreso ? `Importando ${progreso.hecho.toLocaleString("es-CO")} de ${progreso.total.toLocaleString("es-CO")}…` : `Importar${hayFilas ? ` ${leido.filas.length.toLocaleString("es-CO")} filas` : ""}${destino ? ` a ${DESTINO_NOMBRE[destino]}` : ""}`}
              </Button>
              <Button variant="ghost" onClick={reiniciar} disabled={!!progreso}>
                Cancelar
              </Button>
            </div>
          </Card>
        </>
      )}

      <div key={recarga}>
        <ImportadosCard destino={[...DESTINOS]} titulo="Importaciones realizadas" />
      </div>
    </div>
  );
}
