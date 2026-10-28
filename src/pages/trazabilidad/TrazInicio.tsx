import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { trazabilidadApi } from "../../lib/trazabilidadApi";
import { AccesoDenegado, Cargando, ErrorCaja, LISTA, useCarga, usePermisosTraz } from "./comunes";

export default function TrazInicio() {
  const { tieneAcceso } = usePermisosTraz();
  const { datos, error, cargando } = useCarga(() => trazabilidadApi.resumen());

  if (!tieneAcceso) return <AccesoDenegado etapa="el módulo de trazabilidad" />;

  const c = datos?.conteos;
  return (
    <div className="azahar-fade-in space-y-6">
      <PageHeader
        breadcrumb="Trazabilidad"
        title="Trazabilidad del café"
        description="Registra cada etapa de la cadena y genera el QR que va en la bolsa. El consumidor llega a la ficha pública del lote."
      />
      {cargando && <Cargando />}
      {error && <ErrorCaja mensaje={error} />}
      {c && datos && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Fincas", c.fincas],
              ["Lotes verdes", c.lotesVerdes],
              ["Lotes tostados", c.lotesTostados],
              ["Lotes empacados", c.lotesEmpaque],
            ].map(([etiqueta, valor]) => (
              <Card key={etiqueta} className="text-center">
                <p className="font-heading text-2xl font-bold text-[var(--text-primary)]">{valor}</p>
                <p className="text-xs text-[var(--text-secondary)]">{etiqueta}</p>
              </Card>
            ))}
          </div>

          <Card title="Últimos lotes empacados (con su QR)">
            {datos.ultimosEmpaques.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">
                Todavía no hay ningún lote empacado. Empieza por{" "}
                <Link to="/trazabilidad/finca" className="font-semibold text-brand-800 underline">
                  registrar una finca
                </Link>
                .
              </p>
            ) : (
              <ul className={LISTA}>
                {datos.ultimosEmpaques.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div>
                      <p className="font-semibold">{l.loteComercial ?? l.id}</p>
                      <p className="text-xs text-[var(--text-muted)]">{l.presentacion ?? "—"}</p>
                    </div>
                    <Link to={`/lote/${l.id}`} target="_blank" className="font-semibold text-brand-800 underline">
                      Ver ficha pública →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
