import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Select, Textarea } from "../../components/ui";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import {
  AccesoDenegado, Cargando, ErrorCaja, ExitoCaja, LISTA, RequiereAntes, SUBTITULO_FORM, TITULO_FORM, VACIO,
  leerFormulario, useCarga, useEnvio, usePermisosTraz,
} from "./comunes";

export default function TrazFichaCata() {
  const { puede } = usePermisosTraz();
  const { datos, cargando, recargar } = useCarga(async () => ({
    lotes: await trazabilidadApi.lotesVerdes(),
    fichas: await trazabilidadApi.fichasCata(),
  }));
  const { enviando, error, exito, enviar } = useEnvio();

  if (!puede("BENEFICIADO")) return <AccesoDenegado etapa="fichas de cata" />;
  if (cargando) return <Cargando />;
  if (!datos) return <ErrorCaja mensaje="No se pudo cargar la información." />;
  if (datos.lotes.length === 0) return <RequiereAntes que="un" to="/trazabilidad/lote-verde" enlace="lote verde" />;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Trazabilidad" title="Ficha de cata" description="Notas sensoriales de un lote verde, normalmente antes de decidir en qué blend de tueste entra." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className={TITULO_FORM}>Registrar ficha de cata</h2>
          <p className={SUBTITULO_FORM}>Las notas aparecen en la ficha pública del lote.</p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              const form = e.currentTarget;
              const valores = leerFormulario(e);
              void enviar(async () => {
                await trazabilidadApi.crear("ficha-cata", valores);
                form.reset();
                await recargar();
              });
            }}
          >
            <Field label="Lote verde catado *">
              <Select name="loteVerdeId" required defaultValue="">
                <option value="" disabled>Selecciona un lote verde…</option>
                {datos.lotes.map((lv) => (
                  <option key={lv.id} value={lv.id}>{lv.fincaNombre} — {lv.tipoProceso ?? "sin proceso"}</option>
                ))}
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Catador">
                <Input name="catador" />
              </Field>
              <Field label="Fecha">
                <Input name="fecha" type="date" />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Acidez (1-10)">
                <Input name="acidez" type="number" min={1} max={10} />
              </Field>
              <Field label="Cuerpo (1-10)">
                <Input name="cuerpo" type="number" min={1} max={10} />
              </Field>
              <Field label="Dulzor (1-10)">
                <Input name="dulzor" type="number" min={1} max={10} />
              </Field>
            </div>
            <Field label="Notas de cata">
              <Textarea name="notas" rows={3} placeholder="Ej. Notas cítricas, final a panela, cuerpo sedoso…" />
            </Field>
            {error && <ErrorCaja mensaje={error} />}
            {exito && <ExitoCaja mensaje="Ficha de cata registrada correctamente." />}
            <Button type="submit" disabled={enviando} className="w-full">Registrar ficha de cata</Button>
          </form>
        </Card>

        <Card title={`Fichas registradas (${datos.fichas.length})`}>
          <ul className={LISTA}>
            {datos.fichas.map((f) => (
              <li key={f.id} className="py-2">
                <Link to={`/trazabilidad/lote-verde/${f.loteVerdeId}`} className="block hover:underline">
                  <p className="font-semibold text-[var(--text-primary)]">{f.fincaNombre}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {f.catador ?? "sin catador"} · Acidez {f.acidez ?? "—"} · Cuerpo {f.cuerpo ?? "—"} · Dulzor {f.dulzor ?? "—"}
                  </p>
                  {f.notas && <p className="text-xs italic text-[var(--text-secondary)]">“{f.notas}”</p>}
                </Link>
              </li>
            ))}
            {datos.fichas.length === 0 && <p className={VACIO}>Aún no hay fichas de cata registradas.</p>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
