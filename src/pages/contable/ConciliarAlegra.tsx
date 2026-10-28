import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCheck, Loader2, Wand2 } from "lucide-react";
import { Card } from "../../components/Card";
import { Button, Input, Select } from "../../components/ui";
import { useAcceso } from "../../auth/acceso";
import {
  FUENTE_BANCOLOMBIA,
  contableApi,
  type CambioConciliacion,
  type ConciliacionBancolombia,
  type CuentaBusqueda,
  type LoteImportado,
  type MovimientoConciliable,
  type TerceroBusqueda,
} from "../../lib/contableApi";
import { mesEtiquetaAIso, useFiltroFechas } from "../../lib/contableFechas";
import { formatDate } from "../../lib/format";
import { Combobox } from "./Combobox";
import { ErrorCaja, Kpi, TD, TD_NUM, TH, Tabla, cop } from "./comunes";

type Vista = "todos" | "pendientes" | "conciliados";

const aCambio = (m: MovimientoConciliable): CambioConciliacion => ({
  clave: m.clave,
  cuenta: m.cuenta,
  cuentaNombre: m.cuentaNombre,
  terceroNit: m.terceroNit,
  terceroNombre: m.terceroNombre,
  conciliado: m.conciliado,
});

/**
 * Conciliación bancaria al estilo de Alegra: se elige la cuenta bancaria (extracto) y el mes; cada movimiento lleva
 * la CUENTA contable y el TERCERO a los que corresponde, y se marca como conciliado. Todo se guarda al instante.
 */
export function ConciliarAlegra({ datos }: { datos: ConciliacionBancolombia }) {
  const acceso = useAcceso();
  const puedeEditar = acceso.editar("contable");
  const filtro = useFiltroFechas();

  const [lotes, setLotes] = useState<LoteImportado[]>([]);
  const [fuente, setFuente] = useState(FUENTE_BANCOLOMBIA);
  const [mes, setMes] = useState("");
  const [movs, setMovs] = useState<MovimientoConciliable[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(0);
  const [guardadoOk, setGuardadoOk] = useState(false);
  const [vista, setVista] = useState<Vista>("todos");
  const [texto, setTexto] = useState("");
  const [nuevoTercero, setNuevoTercero] = useState<{ clave: string; nit: string; nombre: string } | null>(null);
  const cola = useRef<Map<string, CambioConciliacion>>(new Map());
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  // extractos que se pueden conciliar: el del proyecto y los importados
  useEffect(() => {
    contableApi
      .importaciones("extracto")
      .then(setLotes)
      .catch(() => setLotes([]));
  }, []);

  const mesesDisponibles = useMemo(() => {
    if (fuente !== FUENTE_BANCOLOMBIA) return [] as string[];
    return datos.mensual
      .map((m) => m.mes)
      .filter((m) => {
        const iso = mesEtiquetaAIso(m);
        return !iso || filtro.mesDentro(iso);
      });
  }, [datos.mensual, fuente, filtro]);

  // al cambiar de fuente o de filtro, se elige un mes válido
  useEffect(() => {
    if (fuente === FUENTE_BANCOLOMBIA) setMes((m) => (mesesDisponibles.includes(m) ? m : (mesesDisponibles[0] ?? "")));
    else setMes("");
  }, [fuente, mesesDisponibles]);

  useEffect(() => {
    let vigente = true;
    setMovs(null);
    setError(null);
    if (fuente === FUENTE_BANCOLOMBIA && !mes) {
      setMovs([]);
      return;
    }
    contableApi
      .movimientos(fuente, mes)
      .then((m) => vigente && setMovs(m))
      .catch((e) => vigente && setError(e instanceof Error ? e.message : "No se pudo cargar."));
    return () => {
      vigente = false;
    };
  }, [fuente, mes]);

  const vaciarCola = useCallback(async () => {
    const items = [...cola.current.values()];
    cola.current.clear();
    if (items.length === 0) return;
    setGuardando((n) => n + 1);
    try {
      for (let i = 0; i < items.length; i += 400) await contableApi.conciliar(fuente, items.slice(i, i + 400));
      setGuardadoOk(true);
      setTimeout(() => setGuardadoOk(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar. Intenta de nuevo.");
    } finally {
      setGuardando((n) => n - 1);
    }
  }, [fuente]);

  /** Aplica el cambio en pantalla y lo manda al servidor poco después (varios cambios seguidos viajan juntos). */
  const cambiar = useCallback(
    (claves: string[], parche: Partial<MovimientoConciliable>) => {
      setMovs((actual) =>
        (actual ?? []).map((m) => {
          if (!claves.includes(m.clave)) return m;
          const nuevo = { ...m, ...parche };
          cola.current.set(m.clave, aCambio(nuevo));
          return nuevo;
        }),
      );
      if (temporizador.current) clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => void vaciarCola(), 500);
    },
    [vaciarCola],
  );

  useEffect(() => () => void (temporizador.current && clearTimeout(temporizador.current)), []);

  const lista = useMemo(
    () =>
      (movs ?? []).filter(
        (m) =>
          filtro.dentro(m.fecha ?? undefined) &&
          (vista === "todos" || (vista === "conciliados") === m.conciliado) &&
          (!texto || `${m.descripcion} ${m.cuenta ?? ""} ${m.terceroNombre ?? ""} ${m.terceroNit ?? ""}`.toLowerCase().includes(texto.toLowerCase())),
      ),
    [movs, vista, texto, filtro],
  );

  const resumen = useMemo(() => {
    const todos = (movs ?? []).filter((m) => filtro.dentro(m.fecha ?? undefined));
    const suma = (xs: MovimientoConciliable[]) => ({ abonos: xs.reduce((s, m) => s + m.credito, 0), cargos: xs.reduce((s, m) => s + m.debito, 0) });
    const conc = todos.filter((m) => m.conciliado);
    const mensual = datos.mensual.find((m) => m.mes === mes);
    return { total: todos.length, conciliados: conc.length, todos: suma(todos), conc: suma(conc), mensual };
  }, [movs, filtro, datos.mensual, mes]);

  const pendientesConSugerida = (movs ?? []).filter((m) => !m.conciliado && !m.cuenta && m.cuentaSugerida);
  const pendientesConCuenta = (movs ?? []).filter((m) => !m.conciliado && (m.cuenta || m.cuentaSugerida));

  const buscarCuentas = useCallback((q: string) => contableApi.buscarCuentas(q), []);
  const buscarTerceros = useCallback((q: string) => contableApi.buscarTerceros(q), []);

  const progreso = resumen.total ? Math.round((resumen.conciliados / resumen.total) * 100) : 0;
  const porConciliar = {
    abonos: resumen.todos.abonos - resumen.conc.abonos,
    cargos: resumen.todos.cargos - resumen.conc.cargos,
  };

  return (
    <div className="space-y-4">
      <Card title="Conciliar movimientos con su cuenta y su tercero">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Cuenta bancaria (extracto)</label>
            <Select value={fuente} onChange={(e) => setFuente(e.target.value)} aria-label="Cuenta bancaria">
              <option value={FUENTE_BANCOLOMBIA}>{datos.cuenta} (datos del proyecto)</option>
              {lotes.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.cuentaBanco ? `${l.cuentaBanco} · ` : ""}
                  {l.nombreArchivo} (importado)
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Período</label>
            {fuente === FUENTE_BANCOLOMBIA ? (
              <Select value={mes} onChange={(e) => setMes(e.target.value)} aria-label="Mes">
                {mesesDisponibles.length === 0 && <option value="">Sin meses en el período</option>}
                {mesesDisponibles.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </Select>
            ) : (
              <p className="py-2 text-sm text-[var(--text-secondary)]">Todo el extracto importado (usa el filtro de fechas de arriba para acotar).</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Buscar</label>
            <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Descripción, cuenta o tercero…" aria-label="Buscar" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {resumen.mensual && fuente === FUENTE_BANCOLOMBIA && <Kpi etiqueta="Saldo final según extracto" valor={cop(resumen.mensual.saldoExtracto)} nota={`Inicial ${cop(resumen.mensual.saldoAnterior)}`} />}
        <Kpi etiqueta="Abonos / cargos del período" valor={`${cop(resumen.todos.abonos)}`} nota={`Cargos ${cop(resumen.todos.cargos)}`} />
        <Kpi etiqueta="Conciliados" valor={`${resumen.conciliados}/${resumen.total}`} nota={`${progreso}% de los movimientos`} />
        <Kpi etiqueta="Por conciliar" valor={cop(Math.abs(porConciliar.abonos - porConciliar.cargos))} nota={`Abonos ${cop(porConciliar.abonos)} · cargos ${cop(porConciliar.cargos)}`} />
      </div>

      <Card
        title={`Movimientos (${lista.length})`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {guardando > 0 && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.75} /> Guardando…
              </span>
            )}
            {guardando === 0 && guardadoOk && <span className="text-xs font-semibold text-status-aprobada">Guardado</span>}
            <Select value={vista} onChange={(e) => setVista(e.target.value as Vista)} aria-label="Mostrar" className="!w-auto !py-1.5 text-xs">
              <option value="todos">Todos</option>
              <option value="pendientes">Pendientes</option>
              <option value="conciliados">Conciliados</option>
            </Select>
            {puedeEditar && (
              <>
                <Button
                  variant="outline"
                  className="px-3 py-1.5 text-xs"
                  disabled={pendientesConSugerida.length === 0}
                  title="Pone la cuenta sugerida en los movimientos que no tienen cuenta"
                  onClick={() => pendientesConSugerida.forEach((m) => cambiar([m.clave], { cuenta: m.cuentaSugerida, cuentaNombre: m.cuentaSugeridaNombre }))}
                >
                  <Wand2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Aplicar cuentas sugeridas ({pendientesConSugerida.length})
                </Button>
                <Button
                  className="px-3 py-1.5 text-xs"
                  disabled={pendientesConCuenta.length === 0}
                  title="Marca como conciliados los pendientes que ya tienen cuenta"
                  onClick={() => pendientesConCuenta.forEach((m) => cambiar([m.clave], { conciliado: true, cuenta: m.cuenta ?? m.cuentaSugerida, cuentaNombre: m.cuentaNombre ?? m.cuentaSugeridaNombre }))}
                >
                  <CheckCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Conciliar pendientes ({pendientesConCuenta.length})
                </Button>
              </>
            )}
          </div>
        }
      >
        {error && <ErrorCaja mensaje={error} />}
        {!movs && !error && (
          <p className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> Cargando movimientos…
          </p>
        )}
        {movs && (
          <Tabla>
            <thead>
              <tr>
                {["Fecha", "Descripción", "Débito", "Crédito", "Cuenta contable", "Tercero", "Conciliado"].map((h) => (
                  <th key={h} className={TH}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lista.slice(0, 300).map((m) => (
                <tr key={m.clave} className={m.conciliado ? "bg-status-aprobada-bg/30" : ""}>
                  <td className={TD}>{formatDate(m.fecha)}</td>
                  <td className={`${TD} max-w-[16rem] truncate`} title={m.descripcion}>
                    {m.descripcion}
                  </td>
                  <td className={TD_NUM}>{m.debito ? cop(m.debito) : "—"}</td>
                  <td className={TD_NUM}>{m.credito ? cop(m.credito) : "—"}</td>
                  <td className={TD}>
                    <Combobox<CuentaBusqueda>
                      ariaLabel="Cuenta contable"
                      disabled={!puedeEditar}
                      valorTexto={m.cuenta ? `${m.cuenta}${m.cuentaNombre ? ` · ${m.cuentaNombre}` : ""}` : ""}
                      placeholder={m.cuentaSugerida ? `Sugerida: ${m.cuentaSugerida}` : "Elegir cuenta…"}
                      buscar={buscarCuentas}
                      clave={(c) => c.codigo}
                      etiqueta={(c) => `${c.codigo} · ${c.nombre}`}
                      onElegir={(c) => cambiar([m.clave], { cuenta: c.codigo, cuentaNombre: c.nombre })}
                      onLimpiar={() => cambiar([m.clave], { cuenta: null, cuentaNombre: null, conciliado: false })}
                    />
                  </td>
                  <td className={TD}>
                    {nuevoTercero?.clave === m.clave ? (
                      <form
                        className="flex items-center gap-1"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!nuevoTercero.nit.trim()) return;
                          cambiar([m.clave], { terceroNit: nuevoTercero.nit.trim(), terceroNombre: nuevoTercero.nombre.trim() || null });
                          setNuevoTercero(null);
                        }}
                      >
                        <Input value={nuevoTercero.nit} onChange={(e) => setNuevoTercero({ ...nuevoTercero, nit: e.target.value })} placeholder="NIT" className="!w-24 !px-2 !py-1 text-xs" aria-label="NIT del tercero" autoFocus />
                        <Input value={nuevoTercero.nombre} onChange={(e) => setNuevoTercero({ ...nuevoTercero, nombre: e.target.value })} placeholder="Nombre" className="!w-36 !px-2 !py-1 text-xs" aria-label="Nombre del tercero" />
                        <Button type="submit" className="px-2 py-1 text-xs">
                          OK
                        </Button>
                      </form>
                    ) : (
                      <Combobox<TerceroBusqueda>
                        ariaLabel="Tercero"
                        disabled={!puedeEditar}
                        valorTexto={m.terceroNit ? `${m.terceroNit}${m.terceroNombre ? ` · ${m.terceroNombre}` : ""}` : ""}
                        placeholder={m.terceroSugerido ? `Sugerido: ${m.terceroSugerido}` : "Elegir tercero…"}
                        buscar={buscarTerceros}
                        clave={(t) => t.nit}
                        etiqueta={(t) => `${t.nit} · ${t.nombre}`}
                        onElegir={(t) => cambiar([m.clave], { terceroNit: t.nit, terceroNombre: t.nombre })}
                        onLimpiar={() => cambiar([m.clave], { terceroNit: null, terceroNombre: null })}
                        accionExtra={{ texto: "Agregar tercero nuevo", onClick: (q) => setNuevoTercero({ clave: m.clave, nit: /^\d/.test(q) ? q : "", nombre: /^\d/.test(q) ? "" : q }) }}
                      />
                    )}
                  </td>
                  <td className={`${TD} text-center`}>
                    <input
                      type="checkbox"
                      checked={m.conciliado}
                      disabled={!puedeEditar}
                      onChange={(e) => cambiar([m.clave], e.target.checked ? { conciliado: true, cuenta: m.cuenta ?? m.cuentaSugerida ?? null, cuentaNombre: m.cuentaNombre ?? m.cuentaSugeridaNombre } : { conciliado: false })}
                      aria-label={`Conciliado: ${m.descripcion}`}
                      className="h-4 w-4 accent-[var(--color-brand-800)]"
                    />
                  </td>
                </tr>
              ))}
              {lista.length === 0 && (
                <tr>
                  <td className={TD} colSpan={7}>
                    No hay movimientos con este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </Tabla>
        )}
        {lista.length > 300 && <p className="mt-2 text-xs text-[var(--text-muted)]">Se muestran los primeros 300 de {lista.length}. Usa la búsqueda o “Pendientes” para acotar.</p>}
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Los terceros se buscan entre los importados (módulo <strong>Terceros</strong> o <strong>Importación de archivos</strong>); si no está, usa “Agregar tercero nuevo”. Las cuentas son las de movimiento del plan de cuentas
          de Alegra. Conciliar aquí guarda la asociación en el portal; no crea comprobantes en Alegra.
        </p>
      </Card>
    </div>
  );
}
