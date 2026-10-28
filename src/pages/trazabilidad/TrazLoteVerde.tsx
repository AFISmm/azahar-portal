import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Select } from "../../components/ui";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import {
  AccesoDenegado, Cargando, ErrorCaja, ExitoCaja, Hint, LISTA, RequiereAntes, SUBTITULO_FORM, TITULO_FORM, VACIO,
  leerFormulario, useCarga, useEnvio, usePermisosTraz,
} from "./comunes";

const SECCION = "pt-2 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]";

export default function TrazLoteVerde() {
  const { ver, editar } = usePermisosTraz();
  const { datos, cargando, recargar } = useCarga(async () => ({
    fincas: await trazabilidadApi.fincas(),
    lotes: await trazabilidadApi.lotesVerdes(),
  }));
  const { enviando, error, exito, enviar } = useEnvio();

  if (!ver) return <AccesoDenegado etapa="beneficiado y trilla" />;
  if (cargando) return <Cargando />;
  if (!datos) return <ErrorCaja mensaje="No se pudo cargar la información." />;
  if (datos.fincas.length === 0) return <RequiereAntes que="una" to="/trazabilidad/finca" enlace="finca de origen" />;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Trazabilidad" title="Etapa 2 — Beneficiado y trilla/exportación" description="Capturado por el beneficiadero y por trilla/exportación." />
      <div className="grid gap-6 lg:grid-cols-2">
        {editar && (
        <Card>
          <h2 className={TITULO_FORM}>Registrar lote verde</h2>
          <p className={SUBTITULO_FORM}>Beneficiado y trilla son pasos secuenciales sobre el mismo lote físico antes del tueste.</p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              const form = e.currentTarget;
              const valores = leerFormulario(e);
              const foto = (form.elements.namedItem("fotoSecado") as HTMLInputElement).files?.[0];
              void enviar(async () => {
                const fotoSecadoUrl = foto ? await trazabilidadApi.subirArchivo(foto) : undefined;
                await trazabilidadApi.crear("lote-verde", { ...valores, fotoSecado: undefined, fotoSecadoUrl });
                form.reset();
                await recargar();
              });
            }}
          >
            <Field label="Finca de origen *">
              <Select name="fincaId" required defaultValue="">
                <option value="" disabled>Selecciona una finca…</option>
                {datos.fincas.map((f) => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </Select>
            </Field>

            <p className={SECCION}>Beneficiado</p>
            <Field label="Tipo de proceso">
              <Select name="tipoProceso" defaultValue="">
                <option value="">Selecciona…</option>
                <option>Lavado</option>
                <option>Natural</option>
                <option>Honey</option>
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de fermentación">
                <Input name="fechaFermentacion" type="date" />
              </Field>
              <Field label="Fecha de secado">
                <Input name="fechaSecado" type="date" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Humedad final (%)">
                <Input name="humedadFinalPct" type="number" step="0.1" placeholder="11.5" />
              </Field>
              <Field label="Responsable de calidad">
                <Input name="responsableCalidad" />
              </Field>
            </div>

            <p className={SECCION}>Trilla y exportación</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de trilla">
                <Input name="fechaTrilla" type="date" />
              </Field>
              <Field label="Clasificación (malla/tamaño)">
                <Input name="clasificacion" placeholder="Ej. Malla 16+" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Lote de exportación / marca ICO">
                <Input name="loteExportacion" />
              </Field>
              <Field label="Transporte / contenedor">
                <Input name="transporte" />
              </Field>
            </div>

            <div>
              <Field label="Foto del secado (evidencia)">
                <Input name="fotoSecado" type="file" accept="image/*" />
              </Field>
              <Hint>Opcional. JPG/PNG.</Hint>
            </div>

            {error && <ErrorCaja mensaje={error} />}
            {exito && <ExitoCaja mensaje="Lote verde registrado correctamente." />}
            <Button type="submit" disabled={enviando} className="w-full">Registrar lote verde</Button>
          </form>
        </Card>
        )}

        <Card title={`Lotes verdes registrados (${datos.lotes.length})`}>
          <ul className={LISTA}>
            {datos.lotes.map((l) => (
              <li key={l.id} className="py-2">
                <Link to={`/trazabilidad/lote-verde/${l.id}`} className="block hover:underline">
                  <p className="font-semibold text-[var(--text-primary)]">{l.fincaNombre}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {l.tipoProceso ?? "sin proceso"} · {l.clasificacion ?? "sin clasificar"}
                  </p>
                </Link>
              </li>
            ))}
            {datos.lotes.length === 0 && <p className={VACIO}>Aún no hay lotes verdes registrados.</p>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
