// Memoria de usuarios del login: recuerda los correos que ya iniciaron sesión
// en ESTE navegador para elegirlos con un clic la próxima vez. Solo guarda
// correos (nunca contraseñas ni tokens) en localStorage, y falla en silencio si
// el navegador lo bloquea (modo privado, datos de sitio deshabilitados, etc.).

const CLAVE = "azahar_usuarios_recordados";
const MAXIMO = 5;

export function leerUsuariosRecordados(): string[] {
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    const lista: unknown = crudo ? JSON.parse(crudo) : [];
    return Array.isArray(lista) ? lista.filter((c): c is string => typeof c === "string").slice(0, MAXIMO) : [];
  } catch {
    return [];
  }
}

function guardar(lista: string[]) {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(lista.slice(0, MAXIMO)));
  } catch {
    // sin almacenamiento disponible: la app funciona igual, solo no recuerda
  }
}

/** Pone el correo al frente de la lista (sin duplicados, máx. 5). */
export function recordarUsuario(correo: string): string[] {
  const limpio = correo.trim().toLowerCase();
  if (!limpio) return leerUsuariosRecordados();
  const lista = [limpio, ...leerUsuariosRecordados().filter((c) => c !== limpio)];
  guardar(lista);
  return lista.slice(0, MAXIMO);
}

export function olvidarUsuario(correo: string): string[] {
  const lista = leerUsuariosRecordados().filter((c) => c !== correo.trim().toLowerCase());
  guardar(lista);
  return lista;
}
