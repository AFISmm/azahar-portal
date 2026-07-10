import { PageHeader } from "../../components/PageHeader";
import { SolicitudesAdminTable } from "../../components/admin/SolicitudesAdminTable";
import { useLanguage } from "../../context/LanguageContext";

export default function AdminSolicitudes() {
  const { t } = useLanguage();
  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("adminSolicitudes.breadcrumb")} title={t("adminSolicitudes.titulo")} description={t("adminSolicitudes.descripcion")} />
      <SolicitudesAdminTable titulo={t("adminSolicitudes.tablaTitulo")} descripcion={t("adminSolicitudes.tablaDescripcion")} />
    </div>
  );
}
