import type { Empleado, Modulo, NivelModulo } from "../lib/types";
import { useAuth } from "./AuthContext";

/** true si el empleado tiene el nivel pedido en alguno de los módulos indicados ('editar' implica 'ver'). */
export function cumpleNivel(empleado: Pick<Empleado, "permisosModulos"> | null | undefined, modulos: Modulo | Modulo[], nivel: NivelModulo): boolean {
  const permisos = empleado?.permisosModulos ?? {};
  return (Array.isArray(modulos) ? modulos : [modulos]).some((m) => permisos[m] === "editar" || (nivel === "ver" && permisos[m] === "ver"));
}

/** Permisos por módulo del usuario actual. La API vuelve a validar todo: esto solo decide qué se muestra. */
export function useAcceso() {
  const { empleado } = useAuth();
  return {
    ver: (m: Modulo | Modulo[]) => cumpleNivel(empleado, m, "ver"),
    editar: (m: Modulo | Modulo[]) => cumpleNivel(empleado, m, "editar"),
  };
}
