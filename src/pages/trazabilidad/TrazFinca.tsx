import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Select } from "../../components/ui";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import {
  AccesoDenegado, Cargando, ErrorCaja, ExitoCaja, Hint, LISTA, SUBTITULO_FORM, TITULO_FORM, VACIO,
  leerFormulario, useCarga, useEnvio, usePermisosTraz,
} from "./comunes";

export default function TrazFinca() {
  const { ver, editar } = usePermisosTraz();
  const { datos: fincas, cargando, recargar } = useCarga(() => trazabilidadApi.fincas());
  const { enviando, error, exito, enviar } = useEnvio();

  if (!ver) return <AccesoDenegado etapa="fincas" />;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Trazabilidad" title="Etapa 1 — Finca / Origen" description="Datos capturados por el productor o el responsable de campo." />
      <div className="grid gap-6 lg:grid-cols-2">
        {editar && (
        <Card>
          <h2 className={TITULO_FORM}>Registrar finca</h2>
          <p className={SUBTITULO_FORM}>Las fincas con coordenadas aparecen en el mapa de la ficha pública.</p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              const form = e.currentTarget;
              const datos = leerFormulario(e);
              void enviar(async () => {
                await trazabilidadApi.crear("finca", datos);
                form.reset();
                await recargar();
              });
            }}
          >
            <Field label="Nombre de la finca *">
              <Input name="nombre" required placeholder="Finca La Esperanza" />
            </Field>
            <Field label="Productor / identificador">
              <Input name="identificadorProductor" placeholder="Nombre del productor o código interno" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Field label="Latitud">
                  <Input name="latitud" type="number" step="any" />
                </Field>
                <Hint>Ej. 4.6685</Hint>
              </div>
              <div>
                <Field label="Longitud">
                  <Input name="longitud" type="number" step="any" />
                </Field>
                <Hint>Ej. -75.6547</Hint>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Altitud (msnm)">
                <Input name="altitudMsnm" type="number" />
              </Field>
              <Field label="Región">
                <Input name="region" placeholder="Huila, Colombia" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Variedad">
                <Input name="variedad" placeholder="Caturra, Geisha, Bourbon…" />
              </Field>
              <Field label="Tipo de recolección">
                <Select name="tipoRecoleccion" defaultValue="">
                  <option value="">Selecciona…</option>
                  <option>Manual</option>
                  <option>Selectiva</option>
                  <option>Mecánica</option>
                </Select>
              </Field>
            </div>
            {error && <ErrorCaja mensaje={error} />}
            {exito && <ExitoCaja mensaje="Finca registrada correctamente." />}
            <Button type="submit" disabled={enviando} className="w-full">
              Registrar finca
            </Button>
          </form>
        </Card>
        )}

        <Card title={`Fincas registradas (${fincas?.length ?? 0})`}>
          {cargando && <Cargando />}
          <ul className={LISTA}>
            {fincas?.map((f) => (
              <li key={f.id} className="py-2">
                <Link to={`/trazabilidad/finca/${f.id}`} className="block hover:underline">
                  <p className="font-semibold text-[var(--text-primary)]">{f.nombre}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {f.region ?? "sin región"} · {f.variedad ?? "sin variedad"}
                  </p>
                </Link>
              </li>
            ))}
            {fincas?.length === 0 && <p className={VACIO}>Aún no hay fincas registradas.</p>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
