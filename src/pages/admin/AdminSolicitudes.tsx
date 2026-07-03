import { PageHeader } from "../../components/PageHeader";
import { SolicitudesAdminTable } from "../../components/admin/SolicitudesAdminTable";

export default function AdminSolicitudes() {
  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Administración" title="Solicitudes" description="Aprueba o rechaza las solicitudes de todos los empleados." />
      <SolicitudesAdminTable titulo="Todas las solicitudes" descripcion="Vacaciones, incapacidades, documentos y certificados." />
    </div>
  );
}
