import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, FileUp, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { Button, Input } from "../../components/ui";
import { useAcceso } from "../../auth/acceso";
import { contableApi, type FilasLote, type LoteImportado } from "../../lib/contableApi";
import { DESTINO_NOMBRE, type Destino } from "../../lib/contableDestinos";
import { useFiltroFechas } from "../../lib/contableFechas";
import { formatDateTime } from "../../lib/format";
import { Cargando, ErrorCaja, TD, TH, Tabla } from "./comunes";

/** Filas de un lote importado (50 por página, con búsqueda y, si el lote tiene fecha, el filtro de fechas del módulo). */
function FilasDelLote({ lote }: { lote: LoteImportado }) {
  const fechas = useFiltroFechas();
  const [pagina, setPagina] = useState(1);
  const [q, setQ] = useState("");
  const [consulta, setConsulta] = useState("");
  const [datos, setDatos] = useState<FilasLote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const conFecha = !!lote.mapeo.fecha;

  useEffect(() => {
    const t = setTimeout(() => {
      setConsulta(q);
      setPagina(1);
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    setPagina(1);
  }, [fechas.desde, fechas.hasta]);

  useEffect(() => {
    let vigente = true;
    contableApi
      .importacion(lote.id, pagina, consulta, conFecha ? fechas.desde : "", conFecha ? fechas.hasta : "")
      .then((d) => {
        if (!vigente) return;
        setDatos(d);
        setError(null);
      })
      .catch((e) => vigente && setError(e instanceof Error ? e.message : "No se pudo cargar."));
    return () => {
      vigente = false;
    };
  }, [lote.id, pagina, consulta, conFecha, fechas.desde, fechas.hasta]);

  const columnas = lote.encabezados.slice(0, 8);
  return (
    <div className="mt-3 space-y-2">
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar en las filas…" aria-label="Buscar en las filas" />
      {error && <ErrorCaja mensaje={error} />}
      {!datos && !error && <Cargando />}
      {datos && (
        <>
          <Tabla>
            <thead>
              <tr>
                <th className={TH}>#</th>
                {columnas.map((c) => (
                  <th key={c} className={TH}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datos.filas.map((f) => (
                <tr key={f.n}>
                  <td className={`${TD} text-[var(--text-muted)]`}>{f.n}</td>
                  {columnas.map((c) => (
                    <td key={c} className={`${TD} max-w-xs truncate`} title={f[c]}>
                      {f[c] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
              {datos.filas.length === 0 && (
                <tr>
                  <td className={TD} colSpan={columnas.length + 1}>
                    No hay filas{conFecha && !fechas.vacio ? " en este período" : ""}.
                  </td>
                </tr>
              )}
            </tbody>
          </Tabla>
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>
              {datos.total.toLocaleString("es-CO")} filas · página {datos.pagina} de {datos.paginas}
              {lote.encabezados.length > columnas.length ? ` · se muestran ${columnas.length} de ${lote.encabezados.length} columnas` : ""}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" className="px-2.5 py-1.5" disabled={datos.pagina <= 1} onClick={() => setPagina(datos.pagina - 1)} aria-label="Página anterior">
                <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
              </Button>
              <Button variant="outline" className="px-2.5 py-1.5" disabled={datos.pagina >= datos.paginas} onClick={() => setPagina(datos.pagina + 1)} aria-label="Página siguiente">
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** Lo que se ha importado a un módulo (terceros, catálogo, extractos…): lotes por archivo, con sus filas. */
export function ImportadosCard({ destino, titulo }: { destino: Destino | Destino[]; titulo: string }) {
  const acceso = useAcceso();
  const destinos = Array.isArray(destino) ? destino : [destino];
  const [lotes, setLotes] = useState<LoteImportado[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [abierto, setAbierto] = useState<string | null>(null);
  const clave = destinos.join(",");

  const cargar = useCallback(async () => {
    try {
      const todos = await contableApi.importaciones();
      setLotes(todos.filter((l) => clave.split(",").includes(l.destino)));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar.");
    }
  }, [clave]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  async function borrar(l: LoteImportado) {
    if (!window.confirm(`¿Eliminar la importación "${l.nombreArchivo}" (${l.filas.toLocaleString("es-CO")} filas)? Esto también borra lo conciliado sobre ella.`)) return;
    try {
      await contableApi.importarBorrar(l.id);
      await cargar();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar.");
    }
  }

  return (
    <Card
      title={titulo}
      actions={
        <Link to="/contable/importacion" className="inline-flex items-center gap-1.5 rounded-lg border border-brand-800 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-cream-200">
          <FileUp className="h-3.5 w-3.5" strokeWidth={1.75} />
          Importar archivo
        </Link>
      }
    >
      {error && <ErrorCaja mensaje={error} />}
      {!lotes && !error && <Cargando />}
      {lotes && lotes.length === 0 && (
        <p className="text-sm text-[var(--text-secondary)]">
          Todavía no se ha importado ningún archivo a este módulo. Usa <strong>Importar archivo</strong> (la IA sugiere a qué módulo va cada archivo).
        </p>
      )}
      {lotes && lotes.length > 0 && (
        <ul className="divide-y divide-[var(--border-subtle)]">
          {lotes.map((l) => (
            <li key={l.id} className="py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[var(--text-primary)]">{l.nombreArchivo}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {destinos.length > 1 ? `${DESTINO_NOMBRE[l.destino]} · ` : ""}
                    {l.filas.toLocaleString("es-CO")} filas · {formatDateTime(l.creadoEn)}
                    {l.creadoPor ? ` · ${l.creadoPor}` : ""}
                    {l.cuentaBanco ? ` · ${l.cuentaBanco}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="px-3 py-1.5 text-xs" onClick={() => setAbierto(abierto === l.id ? null : l.id)}>
                    {abierto === l.id ? <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.75} /> : <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.75} />}
                    {abierto === l.id ? "Ocultar" : "Ver filas"}
                  </Button>
                  {acceso.editar("contable") && (
                    <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={() => void borrar(l)} aria-label={`Eliminar ${l.nombreArchivo}`}>
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </Button>
                  )}
                </div>
              </div>
              {abierto === l.id && <FilasDelLote lote={l} />}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
