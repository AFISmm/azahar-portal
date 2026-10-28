// ============================================================================
// Regla de acceso total: toda cuenta cuyo correo termine en @mercurymethods.com
// tiene permisos de administrador del portal y de ADMIN en TODOS los módulos
// (trazabilidad y POS), sin importar lo guardado en la base. Se evalúa siempre
// en el servidor, a partir del correo de la fila.
//
// IMPORTANTE: como no hay verificación de correo (el login con Google, que sí lo
// verificaba, se eliminó), esta regla solo es segura si NADIE puede obtener un
// correo de este dominio por su cuenta. Por eso:
//   - el registro público (api/registro.ts) rechaza correos de este dominio;
//   - el cambio de correo propio (api/auth/me.ts) no permite pasar a este dominio.
// Estas cuentas solo las crea un administrador desde Gestión de usuarios.
// ============================================================================

export const DOMINIO_ACCESO_TOTAL = "@mercurymethods.com";

export function tieneAccesoTotal(correo: string | null | undefined): boolean {
  return typeof correo === "string" && correo.trim().toLowerCase().endsWith(DOMINIO_ACCESO_TOTAL);
}

/** true si la fila es administradora del portal: rol 'admin' guardado, o acceso total por dominio. */
export function esAdminEfectivo(fila: { rol?: string | null; correo?: string | null }): boolean {
  return fila.rol === "admin" || tieneAccesoTotal(fila.correo);
}
