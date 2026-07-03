import { PageHeader } from "../../components/PageHeader";
import { SolicitudesAdminTable } from "../../components/admin/SolicitudesAdminTable";

export default function AdminIncapacidades() {
  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Administración" title="Incapacidades" description="Gestiona las incapacidades médicas reportadas por el equipo." />
      <SolicitudesAdminTable tipoFijo="incapacidad" titulo="Incapacidades reportadas" descripcion="Revisa el soporte y resuelve cada caso." />
    </div>
  );
}
