import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loader2 } from "lucide-react";
import CambiarPasswordObligatorio from "../pages/CambiarPasswordObligatorio";

function PantallaCarga() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[var(--surface-app)]">
      <Loader2 className="h-8 w-8 animate-spin text-brand-800" strokeWidth={1.75} />
    </div>
  );
}

/**
 * Envuelve rutas que requieren una sesión iniciada (cualquier rol).
 *
 * Si `empleado.debeCambiarPassword` es true (cuenta creada por un admin, que
 * le puso la contraseña), se bloquea el resto del portal y se muestra
 * únicamente la pantalla de cambio de contraseña obligatorio hasta que la
 * actualice — ni siquiera el sidebar/AppShell se renderiza.
 */
export function ProtectedRoute() {
  const { user, empleado, loading } = useAuth();
  if (loading) return <PantallaCarga />;
  if (!user) return <Navigate to="/login" replace />;
  if (empleado?.debeCambiarPassword) return <CambiarPasswordObligatorio />;
  return <Outlet />;
}

/** Envuelve rutas exclusivas del rol 'admin'; redirige al resto a /inicio. */
export function AdminRoute() {
  const { role, loading } = useAuth();
  if (loading) return <PantallaCarga />;
  if (role !== "admin") return <Navigate to="/inicio" replace />;
  return <Outlet />;
}
