import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { fmtFecha, trazabilidadApi } from "../../lib/trazabilidadApi";
import { AccesoDenegado, Cargando, ErrorCaja, LISTA, useCarga, usePermisosTraz } from "./comunes";

function Fila({ label, valor }: { label: string; valor: string | number | null | undefined }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[var(--border-subtle)] pb-2">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="text-right font-medium">{valor ?? "—"}</dd>
    </div>
  );
}

export default function TrazLoteVerdeDetalle() {
  const { id = "" } = useParams();
  const { tieneAcceso } = usePermisosTraz();
  const { datos, error, cargando } = useCarga(() => trazabilidadApi.loteVerde(id));

  if (!tieneAcceso) return <AccesoDenegado etapa="el módulo de trazabilidad" />;
  if (cargando) return <Cargando />;
  if (error || !datos) return <ErrorCaja mensaje={error ?? "Lote verde no encontrado."} />;

  const { loteVerde: l, fichasCata } = datos;
  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader breadcrumb="Trazabilidad" title={`Lote verde — ${l.fincaNombre ?? ""}`} description={l.tipoProceso ?? "Proceso sin especificar"} />
      <Link to="/trazabilidad/lote-verde" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:underline">
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Lotes verdes
      </Link>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Beneficiado">
          <dl className="space-y-2 text-sm">
            <Fila label="Finca" valor={l.fincaNombre} />
            <Fila label="Proceso" valor={l.tipoProceso} />
            <Fila label="Fermentación" valor={fmtFecha(l.fechaFermentacion)} />
            <Fila label="Secado" valor={fmtFecha(l.fechaSecado)} />
            <Fila label="Humedad final" valor={l.humedadFinalPct != null ? `${l.humedadFinalPct}%` : null} />
            <Fila label="Responsable de calidad" valor={l.responsableCalidad} />
          </dl>
        </Card>
        <Card title="Trilla y exportación">
          <dl className="space-y-2 text-sm">
            <Fila label="Trilla" valor={fmtFecha(l.fechaTrilla)} />
            <Fila label="Clasificación" valor={l.clasificacion} />
            <Fila label="Lote de exportación" valor={l.loteExportacion} />
            <Fila label="Transporte" valor={l.transporte} />
          </dl>
        </Card>
      </div>

      {l.fotoSecadoUrl && (
        <Card title="Foto del secado">
          <img src={l.fotoSecadoUrl} alt="Secado del café" className="max-h-80 rounded-xl object-cover" />
        </Card>
      )}

      <Card title={`Fichas de cata (${fichasCata.length})`}>
        {fichasCata.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Sin fichas de cata para este lote.</p>
        ) : (
          <ul className={LISTA}>
            {fichasCata.map((f) => (
              <li key={f.id} className="py-2.5">
                <p className="font-semibold">{f.catador ?? "Sin catador"} {f.fecha && <span className="font-normal text-[var(--text-muted)]">· {fmtFecha(f.fecha)}</span>}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Acidez {f.acidez ?? "—"} · Cuerpo {f.cuerpo ?? "—"} · Dulzor {f.dulzor ?? "—"}
                </p>
                {f.notas && <p className="text-xs italic text-[var(--text-secondary)]">“{f.notas}”</p>}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
