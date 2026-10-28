import { useAuth } from "../../auth/AuthContext";
import { Card } from "../../components/Card";
import type { PermisoPos } from "../../lib/types";

/** Permisos del usuario actual sobre el POS ('ADMIN' lo puede todo). */
export function usePermisosPos() {
  const { empleado } = useAuth();
  const permisos = empleado?.permisosPos ?? [];
  const esAdmin = permisos.includes("ADMIN");
  return {
    permisos,
    tieneAcceso: permisos.length > 0,
    esAdmin,
    puede: (funcion: PermisoPos) => esAdmin || permisos.includes(funcion),
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

export const ETIQUETA_PERMISO_POS: Record<PermisoPos, string> = {
  ADMIN: "Administrador del POS",
  CAJA: "Caja (vende y cobra)",
  COCINA: "Cocina (pantalla KDS)",
};
