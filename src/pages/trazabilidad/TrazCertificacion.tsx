import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Select } from "../../components/ui";
import { fmtFecha, trazabilidadApi } from "../../lib/trazabilidadApi";
import {
  AccesoDenegado, Cargando, ErrorCaja, ExitoCaja, Hint, LISTA, RequiereAntes, SUBTITULO_FORM, TITULO_FORM, VACIO,
  leerFormulario, useCarga, useEnvio, usePermisosTraz,
} from "./comunes";

export default function TrazCertificacion() {
  const { ver, editar } = usePermisosTraz();
  const { datos, cargando, recargar } = useCarga(async () => ({
    fincas: await trazabilidadApi.fincas(),
    certificaciones: await trazabilidadApi.certificaciones(),
  }));
  const { enviando, error, exito, enviar } = useEnvio();

  if (!ver) return <AccesoDenegado etapa="certificaciones" />;
  if (cargando) return <Cargando />;
  if (!datos) return <ErrorCaja mensaje="No se pudo cargar la información." />;
  if (datos.fincas.length === 0) return <RequiereAntes que="una" to="/trazabilidad/finca" enlace="finca de origen" />;

  const hoy = new Date().toISOString().slice(0, 10);

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Trazabilidad" title="Certificaciones" description="Certificación vigente de una finca, con enlace verificable y evidencia opcional." />
      <div className="grid gap-6 lg:grid-cols-2">
        {editar && (
        <Card>
          <h2 className={TITULO_FORM}>Registrar certificación</h2>
          <p className={SUBTITULO_FORM}>Aparece como insignia en la ficha pública de los lotes de esa finca.</p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              const form = e.currentTarget;
              const valores = leerFormulario(e);
              const archivo = (form.elements.namedItem("certificadoArchivo") as HTMLInputElement).files?.[0];
              void enviar(async () => {
                const certificadoUrl = archivo ? await trazabilidadApi.subirArchivo(archivo) : undefined;
                await trazabilidadApi.crear("certificacion", { ...valores, certificadoArchivo: undefined, certificadoUrl });
                form.reset();
                await recargar();
              });
            }}
          >
            <Field label="Finca *">
              <Select name="fincaId" required defaultValue="">
                <option value="" disabled>Selecciona una finca…</option>
                {datos.fincas.map((f) => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </Select>
            </Field>
            <Field label="Nombre de la certificación *">
              <Input name="nombre" required placeholder="Orgánico, Fair Trade, Rainforest Alliance…" />
            </Field>
            <Field label="Entidad certificadora">
              <Input name="entidadCertificadora" />
            </Field>
            <div>
              <Field label="URL de verificación pública">
                <Input name="urlVerificacion" type="url" placeholder="https://…" />
              </Field>
              <Hint>Donde cualquiera puede validar el certificado.</Hint>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de emisión">
                <Input name="fechaEmision" type="date" />
              </Field>
              <Field label="Fecha de vencimiento">
                <Input name="fechaVencimiento" type="date" />
              </Field>
            </div>
            <div>
              <Field label="Certificado (evidencia)">
                <Input name="certificadoArchivo" type="file" accept="application/pdf,image/*" />
              </Field>
              <Hint>Opcional. PDF o imagen.</Hint>
            </div>
            {error && <ErrorCaja mensaje={error} />}
            {exito && <ExitoCaja mensaje="Certificación registrada correctamente." />}
            <Button type="submit" disabled={enviando} className="w-full">Registrar certificación</Button>
          </form>
        </Card>
        )}

        <Card title={`Certificaciones registradas (${datos.certificaciones.length})`}>
          <ul className={LISTA}>
            {datos.certificaciones.map((c) => {
              const vencida = !!c.fechaVencimiento && c.fechaVencimiento < hoy;
              return (
                <li key={c.id} className="py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{c.nombre} · {c.fincaNombre}</p>
                      <p className="text-xs text-[var(--text-muted)]">{c.entidadCertificadora ?? "sin entidad certificadora"}</p>
                      {(c.fechaEmision || c.fechaVencimiento) && (
                        <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                          {c.fechaEmision && `Emitida: ${fmtFecha(c.fechaEmision)}`}
                          {c.fechaEmision && c.fechaVencimiento && " · "}
                          {c.fechaVencimiento && (
                            <span className={vencida ? "font-semibold text-status-rechazada" : ""}>
                              {vencida ? "Venció" : "Vigente hasta"}: {fmtFecha(c.fechaVencimiento)}
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                    {(c.certificadoUrl || c.urlVerificacion) && (
                      <a href={c.certificadoUrl ?? c.urlVerificacion ?? undefined} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-brand-800 px-2.5 py-1.5 text-xs font-bold text-brand-800 hover:bg-cream-200">
                        Ver certificado ↗
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
            {datos.certificaciones.length === 0 && <p className={VACIO}>Aún no hay certificaciones registradas.</p>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
