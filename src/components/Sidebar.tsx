import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  CalendarDays,
  Banknote,
  ClipboardList,
  HeartPulse,
  Folder,
  BadgeCheck,
  ClipboardCheck,
  Stethoscope,
  FolderCog,
  Users,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { IS_DEMO_MODE } from "../lib/dataSource";
import { iniciales } from "../lib/format";
import logo from "../assets/azahar-logo.png";

const MI_PORTAL = [
  { to: "/inicio", label: "Inicio", Icon: Home },
  { to: "/mi-contrato", label: "Mi contrato", Icon: FileText },
  { to: "/vacaciones", label: "Vacaciones", Icon: CalendarDays },
  { to: "/nomina", label: "Nómina", Icon: Banknote },
  { to: "/mis-solicitudes", label: "Mis solicitudes", Icon: ClipboardList },
  { to: "/incapacidades", label: "Incapacidades", Icon: HeartPulse },
  { to: "/documentos", label: "Documentos", Icon: Folder },
  { to: "/certificados", label: "Certificados", Icon: BadgeCheck },
];

const ADMINISTRACION = [
  { to: "/admin/solicitudes", label: "Solicitudes", Icon: ClipboardCheck },
  { to: "/admin/incapacidades", label: "Incapacidades", Icon: Stethoscope },
  { to: "/admin/documentos", label: "Documentos", Icon: FolderCog },
  { to: "/admin/empleados", label: "Empleados", Icon: Users },
];

function itemClase(activo: boolean) {
  return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    activo
      ? "bg-brand-800 text-cream-100 shadow-card"
      : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
  }`;
}

export function Sidebar() {
  const { empleado, signOut } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface-sidebar)]">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <img src={logo} alt="Azahar Coffee Company" className="h-10 w-10 rounded-full object-cover ring-1 ring-[var(--border-subtle)]" />
        <div className="leading-tight">
          <p className="font-heading text-sm font-bold text-[var(--text-primary)]">Portal Azahar</p>
          <p className="text-[11px] text-[var(--text-muted)]">Azahar Coffee Company</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        <div>
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Mi portal</p>
          <div className="space-y-1">
            {MI_PORTAL.map(({ to, label, Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => itemClase(isActive)}>
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {empleado?.rol === "admin" && (
          <div>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Administración</p>
            <div className="space-y-1">
              {ADMINISTRACION.map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} className={({ isActive }) => itemClase(isActive)}>
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="border-t border-[var(--border-subtle)] p-3">
        {IS_DEMO_MODE && (
          <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-accent-300/30 px-3 py-1.5 text-[11px] font-semibold text-accent-500">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            Modo demo — datos en memoria
          </div>
        )}
        {empleado && (
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-800 font-heading text-xs font-bold text-cream-100">
              {iniciales(empleado.nombre)}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{empleado.nombre}</p>
              <p className="truncate text-xs text-[var(--text-muted)]">{empleado.cargo}</p>
            </div>
            <button
              onClick={() => void signOut()}
              className="shrink-0 rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-status-rechazada-bg hover:text-status-rechazada"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
