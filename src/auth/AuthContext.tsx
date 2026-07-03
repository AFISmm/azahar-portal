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

interface AuthContextValue {
  user: AuthUser | null;
  empleado: Empleado | null;
  role: Rol | null;
  loading: boolean;
  signIn: (correo: string, password: string) => Promise<{ error?: string }>;
  signInDemo: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshEmpleado: () => Promise<void>;
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

  async function signIn(correo: string, password: string): Promise<{ error?: string }> {
    if (IS_DEMO_MODE) {
      if (!password) return { error: "Ingresa una contraseña (en modo demo cualquier valor es válido)." };
      const perfil = await dataSource.getEmpleadoByCorreo(correo);
      if (!perfil) return { error: "No existe ningún empleado demo con ese correo." };
      window.localStorage.setItem(DEMO_SESSION_KEY, perfil.id);
      setUser({ id: perfil.id, email: perfil.correo });
      setEmpleado(perfil);
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
    window.localStorage.setItem(DEMO_SESSION_KEY, perfil.id);
    setUser({ id: perfil.id, email: perfil.correo });
    setEmpleado(perfil);
    return {};
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
