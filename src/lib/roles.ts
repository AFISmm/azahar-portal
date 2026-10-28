import type { Modulo, PermisosModulos } from "./types";

// ============================================================================
// Roles de Gestión de usuarios. Un rol es una combinación de permisos por módulo
// (Ver / Editar): al elegirlo se marcan las casillas de esa combinación, y el rol
// de cada persona se calcula a partir de las casillas que tiene. Los permisos son
// la fuente de verdad; el rol es solo su nombre.
// ============================================================================

export interface RolPredefinido {
  clave: string;
  nombre: string;
  descripcion: string;
  permisos: PermisosModulos;
}

/** De mayor a menor privilegio. */
export const ROLES_PREDEFINIDOS: RolPredefinido[] = [
  {
    clave: "administrador",
    nombre: "Administrador",
    descripcion: "Edita todos los módulos, incluida la gestión de usuarios.",
    permisos: { estrategica: "editar", comercial: "editar", operativa: "editar", informacion: "editar", pos: "editar", trazabilidad: "editar", rrhh: "editar", usuarios: "editar" },
  },
  {
    clave: "gerencia",
    nombre: "Gerencia",
    descripcion: "Consulta Gestión Estratégica, Comercial, Operativa, Información General, Nómina y Gestión de usuarios (solo ver).",
    permisos: { estrategica: "ver", comercial: "ver", operativa: "ver", informacion: "ver", rrhh: "ver", usuarios: "ver" },
  },
  {
    clave: "calidad",
    nombre: "Calidad y trazabilidad",
    descripcion: "Registra en Trazabilidad y consulta el Sistema POS.",
    permisos: { trazabilidad: "editar", pos: "ver" },
  },
  {
    clave: "pos",
    nombre: "Operador POS",
    descripcion: "Vende, cobra y mueve la cocina en el Sistema POS.",
    permisos: { pos: "editar" },
  },
  {
    clave: "empleado",
    nombre: "Empleado",
    descripcion: "Sin módulos adicionales: solo Inicio, Nómina personal y Mi perfil.",
    permisos: {},
  },
];

export const ROL_ACCESO_TOTAL = "Acceso total";
export const ROL_PERSONALIZADO = "Personalizado";

const MODULOS: Modulo[] = ["estrategica", "comercial", "operativa", "informacion", "pos", "trazabilidad", "rrhh", "usuarios"];

/** Normaliza (solo módulos y niveles válidos) para poder comparar dos conjuntos de permisos. */
export function normalizar(p: PermisosModulos | undefined): PermisosModulos {
  const limpio: PermisosModulos = {};
  for (const m of MODULOS) if (p?.[m] === "ver" || p?.[m] === "editar") limpio[m] = p[m];
  return limpio;
}

export function igualPermisos(a: PermisosModulos | undefined, b: PermisosModulos | undefined): boolean {
  const x = normalizar(a);
  const y = normalizar(b);
  return MODULOS.every((m) => x[m] === y[m]);
}

/** Nombre del rol que corresponde a un conjunto de permisos (o "Personalizado" si no calza con ninguno). */
export function rolDe(permisos: PermisosModulos | undefined, accesoTotal = false): string {
  if (accesoTotal) return ROL_ACCESO_TOTAL;
  return ROLES_PREDEFINIDOS.find((r) => igualPermisos(r.permisos, permisos))?.nombre ?? ROL_PERSONALIZADO;
}

/** Cuántos módulos puede usar (la "cantidad de permisos") y, a igualdad, cuánto puede editar. */
export function cantidadPermisos(permisos: PermisosModulos | undefined): { modulos: number; ediciones: number } {
  const p = normalizar(permisos);
  return { modulos: MODULOS.filter((m) => p[m]).length, ediciones: MODULOS.filter((m) => p[m] === "editar").length };
}

/** Orden de la lista: acceso total primero y luego por cantidad de permisos (más a menos), después por nombre. */
export function compararPorPermisos<T extends { nombre: string; accesoTotal?: boolean; permisosModulos: PermisosModulos }>(a: T, b: T): number {
  if (!!a.accesoTotal !== !!b.accesoTotal) return a.accesoTotal ? -1 : 1;
  const ca = cantidadPermisos(a.permisosModulos);
  const cb = cantidadPermisos(b.permisosModulos);
  return cb.modulos - ca.modulos || cb.ediciones - ca.ediciones || a.nombre.localeCompare(b.nombre, "es");
}
