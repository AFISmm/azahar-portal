import { PageHeader } from "../../components/PageHeader";
import { SolicitudesAdminTable } from "../../components/admin/SolicitudesAdminTable";
import { useLanguage } from "../../context/LanguageContext";

export default function AdminIncapacidades() {
  const { t } = useLanguage();
  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("adminIncapacidades.breadcrumb")} title={t("adminIncapacidades.titulo")} description={t("adminIncapacidades.descripcion")} />
      <SolicitudesAdminTable tipoFijo="incapacidad" titulo={t("adminIncapacidades.tablaTitulo")} descripcion={t("adminIncapacidades.tablaDescripcion")} />
    </div>
  );
}
