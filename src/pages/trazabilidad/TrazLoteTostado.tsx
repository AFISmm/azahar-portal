import { useState } from "react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Label, Select } from "../../components/ui";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import {
  AccesoDenegado, Cargando, ErrorCaja, ExitoCaja, LISTA, RequiereAntes, TITULO_FORM, VACIO,
  leerFormulario, useCarga, useEnvio, usePermisosTraz,
} from "./comunes";

export default function TrazLoteTostado() {
  const { ver, editar } = usePermisosTraz();
  const { datos, cargando, recargar } = useCarga(async () => ({
    verdes: await trazabilidadApi.lotesVerdes(),
    tostados: await trazabilidadApi.lotesTostados(),
  }));
  const { enviando, error, exito, enviar } = useEnvio();
  // loteVerdeId -> kilogramos (string). Estar en el objeto = seleccionado.
  const [seleccion, setSeleccion] = useState<Record<string, string>>({});

  if (!ver) return <AccesoDenegado etapa="tueste" />;
  if (cargando) return <Cargando />;
  if (!datos) return <ErrorCaja mensaje="No se pudo cargar la información." />;
  if (datos.verdes.length === 0) return <RequiereAntes que="un" to="/trazabilidad/lote-verde" enlace="lote verde" />;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Trazabilidad" title="Etapa 3 — Tueste" />
      <div className="grid gap-6 lg:grid-cols-2">
        {editar && (
        <Card>
          <h2 className={TITULO_FORM}>Registrar lote tostado</h2>
          <p className="mb-4 text-xs text-[var(--text-secondary)]">
            Selecciona uno o <strong>varios</strong> lotes verdes: si eliges más de uno, este lote tostado queda registrado como un <em>blend</em> de todos ellos.
          </p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              const form = e.currentTarget;
              const valores = leerFormulario(e);
              const componentes = Object.entries(seleccion).map(([loteVerdeId, kilogramos]) => ({ loteVerdeId, kilogramos }));
              void enviar(async () => {
                await trazabilidadApi.crear("lote-tostado", { ...valores, componentes });
                form.reset();
                setSeleccion({});
                await recargar();
              });
            }}
          >
            <div>
              <Label>Lotes verdes usados *</Label>
              <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-[var(--border-subtle)] p-3">
                {datos.verdes.map((lv) => {
                  const marcado = lv.id in seleccion;
                  return (
                    <label key={lv.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={marcado}
                          onChange={(e) =>
                            setSeleccion((s) => {
                              const { [lv.id]: _quitado, ...resto } = s;
                              void _quitado;
                              return e.target.checked ? { ...s, [lv.id]: "" } : resto;
                            })
                          }
                          className="h-4 w-4 accent-brand-800"
                        />
                        {lv.fincaNombre} <span className="text-[var(--text-muted)]">· {lv.tipoProceso ?? "sin proceso"}</span>
                      </span>
                      <input
                        type="number"
                        step="any"
                        placeholder="kg"
                        disabled={!marcado}
                        value={seleccion[lv.id] ?? ""}
                        onChange={(e) => setSeleccion((s) => ({ ...s, [lv.id]: e.target.value }))}
                        className="w-20 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-app)] px-2 py-1 text-xs disabled:opacity-40"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de tueste">
                <Input name="fecha" type="date" />
              </Field>
              <Field label="Perfil de tueste">
                <Select name="perfilTueste" defaultValue="">
                  <option value="">Selecciona…</option>
                  <option>Claro</option>
                  <option>Medio</option>
                  <option>Oscuro</option>
                </Select>
              </Field>
            </div>
            <Field label="Curva / tiempo de tueste">
              <Input name="curvaTueste" placeholder="Ej. 11 min, curva estándar filtrado" />
            </Field>
            <Field label="Maestro tostador">
              <Input name="maestroTostador" />
            </Field>

            {error && <ErrorCaja mensaje={error} />}
            {exito && <ExitoCaja mensaje="Lote tostado registrado correctamente." />}
            <Button type="submit" disabled={enviando || Object.keys(seleccion).length === 0} className="w-full">
              Registrar lote tostado
            </Button>
          </form>
        </Card>
        )}

        <Card title={`Lotes tostados registrados (${datos.tostados.length})`}>
          <ul className={LISTA}>
            {datos.tostados.map((lt) => (
              <li key={lt.id} className="py-2">
                <p className="font-semibold text-[var(--text-primary)]">
                  {lt.perfilTueste ?? "Tueste"} · {lt.componentes.length > 1 ? `Blend de ${lt.componentes.length} lotes` : "Origen único"}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{lt.componentes.map((c) => c.fincaNombre).join(" + ")}</p>
              </li>
            ))}
            {datos.tostados.length === 0 && <p className={VACIO}>Aún no hay lotes tostados registrados.</p>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
