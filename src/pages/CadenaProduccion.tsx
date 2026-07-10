import { Link } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { etapaIconos, etapasProduccion } from "../lib/mockMercadoCafe";
import { useLanguage } from "../context/LanguageContext";

export default function CadenaProduccion() {
  const { t } = useLanguage();
  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb={t("cadenaProduccion.breadcrumb")}
        title={t("cadenaProduccion.titulo")}
        description={t("cadenaProduccion.descripcion")}
      />

      <Link
        to="/inicio"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        {t("cadenaProduccion.volverInicio")}
      </Link>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {etapasProduccion.map((etapa, i) => {
          const Icon = etapaIconos[etapa.id] ?? Layers;
          return (
            <Card key={etapa.id} className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream-200 text-brand-800">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {t("cadenaProduccion.etapaPrefix")} {i + 1}
                </p>
                <h3 className="mt-0.5 font-heading text-base font-bold text-[var(--text-primary)]">{etapa.titulo}</h3>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{etapa.descripcion}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
