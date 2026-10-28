// ============================================================================
// Permisos por módulo. Cada empleado tiene `permisos_modulos` (jsonb) con, por
// módulo, 'ver' o 'editar' ('editar' implica 'ver'); sin entrada = sin acceso.
// Lo asignan los administradores en Gestión de usuarios.
//
// REGLA DE ACCESO TOTAL: toda cuenta cuyo correo termine en @mercurymethods.com
// tiene 'editar' en TODOS los módulos, sin importar lo guardado en la base. Se
// evalúa siempre en el servidor, a partir del correo de la fila.
//
// IMPORTANTE: sin verificación de correo (el login con Google se eliminó), esa
// regla solo es segura si NADIE puede obtener un correo de este dominio por su
// cuenta. Por eso el registro público (api/registro.ts) lo rechaza y el cambio
// de correo propio (api/auth/me.ts) no permite pasar a este dominio: estas
// cuentas solo las crea un administrador desde Gestión de usuarios.
// ============================================================================

export const DOMINIO_ACCESO_TOTAL = "@mercurymethods.com";

export type Modulo = "negocio" | "rrhh" | "usuarios" | "trazabilidad" | "pos";
export type Nivel = "ver" | "editar";
export type PermisosModulos = Partial<Record<Modulo, Nivel>>;

export const MODULOS: Modulo[] = ["negocio", "rrhh", "usuarios", "trazabilidad", "pos"];
const MODULOS_ADMIN: Modulo[] = ["negocio", "rrhh", "usuarios"];

export function tieneAccesoTotal(correo: string | null | undefined): boolean {
  return typeof correo === "string" && correo.trim().toLowerCase().endsWith(DOMINIO_ACCESO_TOTAL);
}

/** Limpia lo que venga de la base o del cliente: solo módulos y niveles válidos. */
export function sanearPermisos(crudo: unknown): PermisosModulos {
  const limpio: PermisosModulos = {};
  if (typeof crudo !== "object" || crudo === null || Array.isArray(crudo)) return limpio;
  for (const m of MODULOS) {
    const nivel = (crudo as Record<string, unknown>)[m];
    if (nivel === "ver" || nivel === "editar") limpio[m] = nivel;
  }
  return limpio;
}

/** Permisos efectivos de una fila de `empleados`. */
export function permisosEfectivos(fila: { correo?: string | null; permisos_modulos?: unknown }): PermisosModulos {
  if (tieneAccesoTotal(fila.correo)) return Object.fromEntries(MODULOS.map((m) => [m, "editar"])) as PermisosModulos;
  return sanearPermisos(fila.permisos_modulos);
}

/** true si tiene el nivel pedido en alguno de los módulos indicados. */
export function cumple(permisos: PermisosModulos, modulos: Modulo | Modulo[], nivel: Nivel): boolean {
  return (Array.isArray(modulos) ? modulos : [modulos]).some((m) => permisos[m] === "editar" || (nivel === "ver" && permisos[m] === "ver"));
}

/** Rol "administrador" heredado del portal: se deriva, ya no se guarda: tiene acceso a algún módulo de administración. */
export function esAdminEfectivo(fila: { correo?: string | null; permisos_modulos?: unknown }): boolean {
  const p = permisosEfectivos(fila);
  return MODULOS_ADMIN.some((m) => !!p[m]);
}
