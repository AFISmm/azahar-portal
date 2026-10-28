import { PageHeader } from "../components/PageHeader";
import { useLanguage } from "../context/LanguageContext";
import { TableroWidgets } from "./inicio/TableroWidgets";

// Inicio: tablero de widgets personalizable (mover, cambiar tamaño, agregar y quitar).
// Los widgets y su catálogo viven en src/pages/inicio/.
export default function InicioMercado() {
  const { t } = useLanguage();
  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("inicioMercado.breadcrumb")} title={t("inicioMercado.titulo")} description={t("inicioMercado.descripcion")} />
      <TableroWidgets />
    </div>
  );
}
