import { useNavigate, Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Select } from "../../components/ui";
import { fmtFecha, trazabilidadApi } from "../../lib/trazabilidadApi";
import {
  AccesoDenegado, Cargando, ErrorCaja, LISTA, RequiereAntes, SUBTITULO_FORM, TITULO_FORM, VACIO,
  leerFormulario, useCarga, useEnvio, usePermisosTraz,
} from "./comunes";

export default function TrazLoteEmpaque() {
  const { ver, editar } = usePermisosTraz();
  const navigate = useNavigate();
  const { datos, cargando } = useCarga(async () => ({
    tostados: await trazabilidadApi.lotesTostados(),
    empaques: await trazabilidadApi.lotesEmpaque(),
  }));
  const { enviando, error, enviar } = useEnvio();

  if (!ver) return <AccesoDenegado etapa="empaque y distribución" />;
  if (cargando) return <Cargando />;
  if (!datos) return <ErrorCaja mensaje="No se pudo cargar la información." />;
  if (datos.tostados.length === 0) return <RequiereAntes que="un" to="/trazabilidad/lote-tostado" enlace="lote tostado" />;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Trazabilidad" title="Etapa 4 — Empaque y distribución" description="Este es el punto que se enlaza al QR de la bolsa." />
      <div className="grid gap-6 lg:grid-cols-2">
        {editar && (
        <Card>
          <h2 className={TITULO_FORM}>Registrar lote de empaque</h2>
          <p className={SUBTITULO_FORM}>Al guardar, el código QR se genera automáticamente.</p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              const valores = leerFormulario(e);
              void enviar(async () => {
                const id = await trazabilidadApi.crear("lote-empaque", valores);
                navigate(`/trazabilidad/lote-empaque/${id}`);
              });
            }}
          >
            <Field label="Lote tostado de origen *">
              <Select name="loteTostadoId" required defaultValue="">
                <option value="" disabled>Selecciona un lote tostado…</option>
                {datos.tostados.map((lt) => (
                  <option key={lt.id} value={lt.id}>
                    {lt.perfilTueste ?? "Tueste"} — {fmtFecha(lt.fecha) ?? lt.id}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de empaque">
                <Input name="fechaEmpaque" type="date" />
              </Field>
              <Field label="Fecha de vencimiento">
                <Input name="fechaVencimiento" type="date" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Lote comercial">
                <Input name="loteComercial" placeholder="Ej. EEH-2026-08" />
              </Field>
              <Field label="Presentación">
                <Select name="presentacion" defaultValue="">
                  <option value="">Selecciona…</option>
                  <option>250g</option>
                  <option>340g</option>
                  <option>500g</option>
                  <option>1kg</option>
                </Select>
              </Field>
            </div>
            {error && <ErrorCaja mensaje={error} />}
            <Button type="submit" disabled={enviando} className="w-full">Registrar y generar QR</Button>
          </form>
        </Card>
        )}

        <Card title={`Lotes empacados (${datos.empaques.length})`}>
          <ul className={LISTA}>
            {datos.empaques.map((l) => (
              <li key={l.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold">{l.loteComercial ?? l.id}</p>
                  <p className="text-xs text-[var(--text-muted)]">{l.presentacion ?? "—"}</p>
                </div>
                <Link to={`/trazabilidad/lote-empaque/${l.id}`} className="text-xs font-semibold text-brand-800 underline">
                  Ver QR
                </Link>
              </li>
            ))}
            {datos.empaques.length === 0 && <p className={VACIO}>Aún no hay lotes empacados.</p>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
