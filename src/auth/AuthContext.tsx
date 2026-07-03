import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { IS_DEMO_MODE, supabase } from "../lib/supabaseClient";
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
}

export interface ResultadoRegistro {
  ok: true;
  modo: "demo" | "agentes";
  mensajeBienvenida?: string;
}

interface RespuestaApiAgentesRegistrar {
  ok: boolean;
  motivo?: "correo_duplicado" | "config_faltante" | "error";
  mensaje?: string;
  empleadoId?: string;
  mensajeBienvenida?: string;
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

      if (!supabase) {
        if (activo) setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const sesionUser = data.session?.user ?? null;
      if (sesionUser) {
        setUser({ id: sesionUser.id, email: sesionUser.email ?? "" });
        const perfil = await dataSource.getEmpleadoByAuthUserId(sesionUser.id);
        if (activo) setEmpleado(perfil);
      }
      if (activo) setLoading(false);
    }

    void iniciar();

    if (!IS_DEMO_MODE && supabase) {
      const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const sesionUser = session?.user ?? null;
        if (!sesionUser) {
          setUser(null);
          setEmpleado(null);
          return;
        }
        setUser({ id: sesionUser.id, email: sesionUser.email ?? "" });
        const perfil = await dataSource.getEmpleadoByAuthUserId(sesionUser.id);
        setEmpleado(perfil);
      });
      return () => {
        activo = false;
        sub.subscription.unsubscribe();
      };
    }

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

    if (!supabase) return { error: "Supabase no está configurado." };
    const { data, error } = await supabase.auth.signInWithPassword({ email: correo, password });
    if (error) return { error: error.message };
    const sesionUser = data.user;
    if (sesionUser) {
      setUser({ id: sesionUser.id, email: sesionUser.email ?? "" });
      const perfil = await dataSource.getEmpleadoByAuthUserId(sesionUser.id);
      setEmpleado(perfil);
      if (!perfil) return { error: "Tu usuario no tiene un perfil de empleado asociado." };
    }
    return {};
  }

  async function signInDemo(): Promise<{ error?: string }> {
    const perfil = await dataSource.getEmpleadoByCorreo(DEMO_ADMIN_CORREO);
    if (!perfil) return { error: "No se encontró el empleado demo." };
    entrarComoEmpleadoDemo(perfil);
    return {};
  }

  /**
   * Registra un nuevo empleado a través del equipo de agentes de IA
   * (POST /api/agentes/registrar) con una vía de respaldo en modo demo.
   *
   * 1. Verifica de inmediato (en el cliente) que el correo no exista ya en
   *    la fuente de datos actual — funciona igual en modo demo y en modo real.
   * 2. Llama al endpoint de agentes. Si la llamada falla (red, o el endpoint
   *    no existe en este entorno) o responde 500 "config_faltante" (Supabase
   *    o Anthropic no están configurados en este despliegue), cae al registro
   *    local en modo demo.
   * 3. Si el endpoint responde 409, el correo ya está duplicado: lanza un error.
   * 4. Si responde 200, inicia sesión de verdad con la contraseña recién creada.
   */
  async function registrar(datos: DatosRegistro): Promise<ResultadoRegistro> {
    const correoNormalizado = datos.correo.trim().toLowerCase();
    const existente = await dataSource.getEmpleadoByCorreo(correoNormalizado);
    if (existente) {
      throw new Error("Ya existe una cuenta registrada con ese correo.");
    }

    let respuesta: Response | null = null;
    try {
      respuesta = await fetch("/api/agentes/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
    } catch {
      respuesta = null;
    }

    let payload: RespuestaApiAgentesRegistrar | null = null;
    if (respuesta) {
      try {
        payload = (await respuesta.json()) as RespuestaApiAgentesRegistrar;
      } catch {
        payload = null;
      }
    }

    const configFaltante = respuesta?.status === 500 && payload?.motivo === "config_faltante";

    // Sin respuesta utilizable (red caída, endpoint inexistente en este
    // entorno) o backend de agentes sin configurar: registro local en modo demo.
    if (!respuesta || !payload || configFaltante) {
      const nuevo = await dataSource.createEmpleado({
        nombre: datos.nombre,
        correo: datos.correo,
        cargo: datos.cargo,
        departamento: datos.departamento,
        tipoContrato: datos.tipoContrato,
        fechaIngreso: datos.fechaIngreso,
        diasVacacionesDisponibles: 15,
        rol: "empleado",
      });
      entrarComoEmpleadoDemo(nuevo);
      return { ok: true, modo: "demo" };
    }

    if (respuesta.status === 409 || !payload.ok) {
      throw new Error(payload.mensaje ?? "No se pudo completar el registro.");
    }

    // Registro exitoso en modo real: inicia sesión con la contraseña recién
    // establecida, igual que la rama real de signIn.
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: datos.correo, password: datos.password });
      if (error) throw new Error(error.message);
      const sesionUser = data.user;
      if (sesionUser) {
        setUser({ id: sesionUser.id, email: sesionUser.email ?? "" });
        const perfil = await dataSource.getEmpleadoByAuthUserId(sesionUser.id);
        setEmpleado(perfil);
      }
    }

    return { ok: true, modo: "agentes", mensajeBienvenida: payload.mensajeBienvenida };
  }

  async function signOut() {
    if (IS_DEMO_MODE) {
      window.localStorage.removeItem(DEMO_SESSION_KEY);
    } else if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setEmpleado(null);
  }

  async function refreshEmpleado() {
    if (!user) return;
    const perfil = IS_DEMO_MODE
      ? await dataSource.getEmpleado(user.id)
      : await dataSource.getEmpleadoByAuthUserId(user.id);
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
