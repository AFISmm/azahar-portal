import { PageHeader } from "../../components/PageHeader";
import { TableroWidgets } from "../inicio/TableroWidgets";
import { AccesoDenegado, AvisoDemo, usePermisoContable } from "./comunes";
import { CONFIG_CONTABLE } from "./widgetsContable";

/** Tablero de Gestión Contable: widgets que se pueden mover, cambiar de tamaño, agregar y quitar, como en el Inicio. */
export default function ContableInicio() {
  const { tieneAcceso } = usePermisoContable();
  if (!tieneAcceso) return <AccesoDenegado etapa="Gestión Contable" />;
  return (
    <div className="azahar-fade-in space-y-4">
      <PageHeader
        breadcrumb="Gestión Contable"
        title="Tablero contable"
        description="Estado del trabajo contable en Alegra. Personalízalo con los widgets que necesites; los que tienen fechas respetan el filtro de arriba."
      />
      <AvisoDemo />
      <TableroWidgets config={CONFIG_CONTABLE} />
    </div>
  );
}
