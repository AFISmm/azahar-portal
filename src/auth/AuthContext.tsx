import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { IS_DEMO_MODE } from "../lib/backendMode";
import { dataSource } from "../lib/dataSource";
import type { Empleado, Rol } from "../lib/types";

const DEMO_SESSION_KEY = "azahar_demo_empleado_id";
const DEMO_ADMIN_CORREO = "mariacamila.restrepo@azaharcoffee.co";

interface AuthUser {
  id: string;
  email: string;
}

export interface DatosRegistro {
  nombre: string;
  correo: string;
  password: string;
  cargo: string;
  departamento: string;
  tipoContrato: string;
  fechaIngreso: string;
  rol: Rol;
}

export interface ResultadoRegistro {
  ok: true;
  modo: "demo" | "real";
  mensajeBienvenida?: string;
}

interface RespuestaApiRegistro {
  ok: boolean;
  motivo?: "correo_duplicado" | "config_faltante" | "error";
  mensaje?: string;
  empleado?: Empleado;
  mensajeBienvenida?: string;
}

interface RespuestaApiAuth {
  ok: boolean;
  mensaje?: string;
  empleado?: Empleado;
}

interface AuthContextValue {
  user: AuthUser | null;
  empleado: Empleado | null;
  role: Rol | null;
  loading: boolean;
  signIn: (correo: string, password: string) => Promise<{ error?: string }>;
  signInDemo: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshEmpleado: () => Promise<void>;
  registrar: (datos: DatosRegistro) => Promise<ResultadoRegistro>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Consulta la sesión real (cookie HttpOnly) contra /api/auth/me. Devuelve el empleado, o null si no hay sesión válida. */
async function obtenerEmpleadoDeSesionReal(): Promise<Empleado | null> {
  try {
    const respuesta = await fetch("/api/auth/me", { credentials: "include" });
    if (!respuesta.ok) return null;
    const payload = (await respuesta.json()) as RespuestaApiAuth;
    return payload.ok ? (payload.empleado ?? null) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const [loading, setLoading] = useState(true);

  async function cargarEmpleadoDemo() {
    const empleadoId = window.localStorage.getItem(DEMO_SESSION_KEY);
    if (!empleadoId) {
      setUser(null);
      setEmpleado(null);
      return;
    }
    const perfil = await dataSource.getEmpleado(empleadoId);
    if (perfil) {
      setUser({ id: perfil.id, email: perfil.correo });
      setEmpleado(perfil);
    } else {
      window.localStorage.removeItem(DEMO_SESSION_KEY);
      setUser(null);
      setEmpleado(null);
    }
  }

  useEffect(() => {
    let activo = true;

    async function iniciar() {
      if (IS_DEMO_MODE) {
        await cargarEmpleadoDemo();
        if (activo) setLoading(false);
        return;
      }

      const perfil = await obtenerEmpleadoDeSesionReal();
      if (activo) {
        if (perfil) {
          setUser({ id: perfil.id, email: perfil.correo });
          setEmpleado(perfil);
        }
        setLoading(false);
      }
    }

    void iniciar();

    return () => {
      activo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Establece la sesión localmente en modo demo: guarda el id en localStorage y actualiza el estado. */
  function entrarComoEmpleadoDemo(perfil: Empleado) {
    window.localStorage.setItem(DEMO_SESSION_KEY, perfil.id);
    setUser({ id: perfil.id, email: perfil.correo });
    setEmpleado(perfil);
  }

  async function signIn(correo: string, password: string): Promise<{ error?: string }> {
    if (IS_DEMO_MODE) {
      if (!password) return { error: "Ingresa una contraseña (en modo demo cualquier valor es válido)." };
      const perfil = await dataSource.getEmpleadoByCorreo(correo);
      if (!perfil) return { error: "No existe ningún empleado demo con ese correo." };
      entrarComoEmpleadoDemo(perfil);
      return {};
    }

    let respuesta: Response;
    try {
      respuesta = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
    } catch {
      return { error: "No se pudo conectar con el servidor. Intenta de nuevo." };
    }

    const payload = (await respuesta.json().catch(() => null)) as RespuestaApiAuth | null;
    if (!respuesta.ok || !payload?.ok || !payload.empleado) {
      return { error: payload?.mensaje ?? "Correo o contraseña incorrectos." };
    }

    setUser({ id: payload.empleado.id, email: payload.empleado.correo });
    setEmpleado(payload.empleado);
    return {};
  }

  async function signInDemo(): Promise<{ error?: string }> {
    const perfil = await dataSource.getEmpleadoByCorreo(DEMO_ADMIN_CORREO);
    if (!perfil) return { error: "No se encontró el empleado demo." };
    entrarComoEmpleadoDemo(perfil);
    return {};
  }

  /**
   * Registra un nuevo empleado (POST /api/registro) con una vía de respaldo
   * en modo demo.
   *
   * 1. Verifica de inmediato (en el cliente) que el correo no exista ya en
   *    la fuente de datos actual — funciona igual en modo demo y en modo real.
   * 2. Llama al endpoint de registro. Si la llamada falla (red, o el endpoint
   *    no existe en este entorno) o responde 500 "config_faltante" (Postgres
   *    no está configurado en este despliegue), cae al registro local en
   *    modo demo.
   * 3. Si el endpoint responde 409, el correo ya está duplicado: lanza un error.
   * 4. Si responde 200, el servidor ya dejó la sesión iniciada (cookie) y
   *    devolvió el empleado creado: solo queda reflejarlo en el estado local.
   */
  async function registrar(datos: DatosRegistro): Promise<ResultadoRegistro> {
    const correoNormalizado = datos.correo.trim().toLowerCase();
    const existente = await dataSource.getEmpleadoByCorreo(correoNormalizado);
    if (existente) {
      throw new Error("Ya existe una cuenta registrada con ese correo.");
    }

    async function registrarLocalEnModoDemo(): Promise<ResultadoRegistro> {
      const nuevo = await dataSource.createEmpleado({
        nombre: datos.nombre,
        correo: datos.correo,
        cargo: datos.cargo,
        departamento: datos.departamento,
        tipoContrato: datos.tipoContrato,
        fechaIngreso: datos.fechaIngreso,
        diasVacacionesDisponibles: 15,
        rol: datos.rol,
      });
      entrarComoEmpleadoDemo(nuevo);
      return { ok: true, modo: "demo" };
    }

    // Mientras el cliente esté en modo demo (VITE_ENABLE_BACKEND != "true"),
    // el registro se procesa siempre localmente: ni siquiera se llama a
    // /api/registro. Esto evita, por ejemplo, que si Postgres ya tiene
    // POSTGRES_URL/AUTH_SECRET configuradas en Vercel pero todavía no se
    // corrió `db/schema.sql`, el usuario vea un error crudo de base de datos
    // en vez de simplemente seguir en modo demo como el resto de la app.
    if (IS_DEMO_MODE) {
      return registrarLocalEnModoDemo();
    }

    let respuesta: Response | null = null;
    try {
      respuesta = await fetch("/api/registro", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
    } catch {
      respuesta = null;
    }

    let payload: RespuestaApiRegistro | null = null;
    if (respuesta) {
      try {
        payload = (await respuesta.json()) as RespuestaApiRegistro;
      } catch {
        payload = null;
      }
    }

    // Sin respuesta utilizable (red caída, endpoint inexistente en este
    // entorno) o backend sin configurar/no funcional: registro local en modo demo.
    if (!respuesta || !payload || respuesta.status >= 500) {
      return registrarLocalEnModoDemo();
    }

    if (respuesta.status === 409 || !payload.ok) {
      throw new Error(payload.mensaje ?? "No se pudo completar el registro.");
    }

    // Registro exitoso en modo real: el servidor ya dejó la cookie de sesión
    // establecida y devolvió el perfil del empleado recién creado.
    if (payload.empleado) {
      setUser({ id: payload.empleado.id, email: payload.empleado.correo });
      setEmpleado(payload.empleado);
    }

    return { ok: true, modo: "real", mensajeBienvenida: payload.mensajeBienvenida };
  }

  async function signOut() {
    if (IS_DEMO_MODE) {
      window.localStorage.removeItem(DEMO_SESSION_KEY);
    } else {
      try {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      } catch {
        // Si la petición falla igual limpiamos el estado local.
      }
    }
    setUser(null);
    setEmpleado(null);
  }

  async function refreshEmpleado() {
    if (!user) return;
    const perfil = IS_DEMO_MODE ? await dataSource.getEmpleado(user.id) : await obtenerEmpleadoDeSesionReal();
    setEmpleado(perfil);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      empleado,
      role: empleado?.rol ?? null,
      loading,
      signIn,
      signInDemo,
      signOut,
      refreshEmpleado,
      registrar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, empleado, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
