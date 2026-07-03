import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loader2 } from "lucide-react";

function PantallaCarga() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[var(--surface-app)]">
      <Loader2 className="h-8 w-8 animate-spin text-brand-800" strokeWidth={1.75} />
    </div>
  );
}

/** Envuelve rutas que requieren una sesión iniciada (cualquier rol). */
export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <PantallaCarga />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

/** Envuelve rutas exclusivas del rol 'admin'; redirige al resto a /inicio. */
export function AdminRoute() {
  const { role, loading } = useAuth();
  if (loading) return <PantallaCarga />;
  if (role !== "admin") return <Navigate to="/inicio" replace />;
  return <Outlet />;
}
