import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import MapaOrigenes from "../../components/MapaOrigenesCargador";
import { fmtFecha, trazabilidadApi } from "../../lib/trazabilidadApi";
import { AccesoDenegado, Cargando, ErrorCaja, LISTA, useCarga, usePermisosTraz } from "./comunes";

function Fila({ label, valor }: { label: string; valor: string | null | undefined }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[var(--border-subtle)] pb-2">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="text-right font-medium">{valor ?? "—"}</dd>
    </div>
  );
}

export default function TrazFincaDetalle() {
  const { id = "" } = useParams();
  const { tieneAcceso } = usePermisosTraz();
  const { datos, error, cargando } = useCarga(() => trazabilidadApi.finca(id));

  if (!tieneAcceso) return <AccesoDenegado etapa="el módulo de trazabilidad" />;
  if (cargando) return <Cargando />;
  if (error || !datos) return <ErrorCaja mensaje={error ?? "Finca no encontrada."} />;

  const { finca, certificaciones, lotesVerdes } = datos;
  const coords = finca.latitud != null && finca.longitud != null;

  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Trazabilidad"
        title={finca.nombre}
        description={[finca.region, finca.variedad].filter(Boolean).join(" · ") || "Región y variedad no registradas"}
      />
      <Link to="/trazabilidad/finca" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:underline">
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Fincas
      </Link>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Datos de la finca">
          <dl className="space-y-2 text-sm">
            <Fila label="Productor" valor={finca.identificadorProductor} />
            <Fila label="Región" valor={finca.region} />
            <Fila label="Variedad" valor={finca.variedad} />
            <Fila label="Altitud" valor={finca.altitudMsnm ? `${finca.altitudMsnm} msnm` : null} />
            <Fila label="Tipo de recolección" valor={finca.tipoRecoleccion} />
            <Fila label="Coordenadas" valor={coords ? `${finca.latitud}, ${finca.longitud}` : null} />
            <Fila label="Registrada el" valor={fmtFecha(finca.creadoEn)} />
          </dl>
        </Card>
        {coords && (
          <Card className="overflow-hidden p-0">
            <MapaOrigenes puntos={[{ id: finca.id, nombre: finca.nombre, latitud: finca.latitud as number, longitud: finca.longitud as number, region: finca.region }]} />
          </Card>
        )}
      </div>

      <Card title={`Certificaciones (${certificaciones.length})`}>
        {certificaciones.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Sin certificaciones registradas.</p>
        ) : (
          <ul className={LISTA}>
            {certificaciones.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-2.5">
                <div>
                  <p className="font-semibold">{c.nombre}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {c.entidadCertificadora} {c.fechaVencimiento && `· Vigente hasta ${fmtFecha(c.fechaVencimiento)}`}
                  </p>
                </div>
                {(c.certificadoUrl || c.urlVerificacion) && (
                  <a href={c.certificadoUrl ?? c.urlVerificacion ?? undefined} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-brand-800 px-2.5 py-1.5 text-xs font-bold text-brand-800 hover:bg-cream-200">
                    Ver certificado ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title={`Lotes verdes de esta finca (${lotesVerdes.length})`}>
        {lotesVerdes.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Sin lotes verdes registrados todavía.</p>
        ) : (
          <ul className={LISTA}>
            {lotesVerdes.map((lv) => (
              <li key={lv.id} className="py-2.5">
                <Link to={`/trazabilidad/lote-verde/${lv.id}`} className="font-semibold text-brand-800 hover:underline">
                  {lv.tipoProceso ?? "Proceso sin especificar"} — {fmtFecha(lv.fechaTrilla) ?? fmtFecha(lv.creadoEn)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
