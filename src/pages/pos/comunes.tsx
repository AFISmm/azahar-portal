import { useAcceso } from "../../auth/acceso";
import { Card } from "../../components/Card";

/**
 * Permisos del usuario actual sobre el POS: 'ver' consulta (cocina, historial);
 * 'editar' vende, cobra y mueve la cocina. `supervisor` (edición en algún módulo
 * de administración) además aplica descuentos, marca agotados y cancela cobros.
 */
export function usePermisosPos() {
  const acceso = useAcceso();
  return {
    ver: acceso.ver("pos"),
    editar: acceso.editar("pos"),
    supervisor: acceso.editar(["estrategica", "comercial", "operativa", "informacion", "rrhh", "usuarios"]),
  };
}

export function SinAccesoPos({ funcion }: { funcion: string }) {
  return (
    <Card>
      <p className="text-sm text-[var(--text-secondary)]">
        Tu cuenta no tiene permiso para usar <strong>{funcion}</strong>. Pide a un administrador del portal que te lo asigne en Administración &gt; Usuarios.
      </p>
    </Card>
  );
}

