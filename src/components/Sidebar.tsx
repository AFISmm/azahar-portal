import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  UserCog,
  LogOut,
  Sparkles,
  Compass,
  Store,
  Receipt,
  Info,
  Sprout,
  ChevronLeft,
  X,
  IdCard,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { IS_DEMO_MODE } from "../lib/dataSource";
import { iniciales } from "../lib/format";
import logo from "../assets/azahar-logo.png";
import sidebarBg from "../assets/sidebar-bg.jpg";

const NOMINA_ITEMS = [
  { to: "/nomina/inicio", label: "Inicio", Icon: Home },
  { to: "/nomina/mi-contrato", label: "Mi contrato", Icon: FileText },
  { to: "/nomina/vacaciones", label: "Vacaciones", Icon: CalendarDays },
  { to: "/nomina/pagos", label: "Nómina", Icon: Banknote },
  { to: "/nomina/mis-solicitudes", label: "Mis solicitudes", Icon: ClipboardList },
  { to: "/nomina/incapacidades", label: "Incapacidades", Icon: HeartPulse },
  { to: "/nomina/documentos", label: "Documentos", Icon: Folder },
  { to: "/nomina/certificados", label: "Certificados", Icon: BadgeCheck },
];

const ADMINISTRACION = [
  { to: "/admin/solicitudes", label: "Solicitudes", Icon: ClipboardCheck },
  { to: "/admin/incapacidades", label: "Incapacidades", Icon: Stethoscope },
  { to: "/admin/documentos", label: "Documentos", Icon: FolderCog },
  { to: "/admin/empleados", label: "Empleados", Icon: Users },
  { to: "/admin/nomina", label: "Nómina", Icon: Receipt },
];

const GESTION_NEGOCIO = [
  { to: "/gestion-estrategica", label: "Gestión Estratégica", Icon: Compass },
  { to: "/gestion-comercial", label: "Gestión Comercial", Icon: Store },
  { to: "/gestion-operativa", label: "Gestión Operativa", Icon: Sprout },
  { to: "/informacion-general", label: "Información General", Icon: Info },
];

// El sidebar ahora lleva una foto de fondo fija (finca cafetera) con un velo
// oscuro encima, por lo que su paleta de texto deja de depender de las
// variables de tema claro/oscuro (--text-*) y usa tonos crema/claros fijos,
// para que siempre se lea bien sobre la fotografía sin importar el tema
// general de la app.
function itemClase(activo: boolean) {
  return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    activo ? "bg-accent-500 text-brand-900 shadow-card" : "text-cream-200/80 hover:bg-white/10 hover:text-cream-100"
  }`;
}

interface SidebarProps {
  abierto?: boolean;
  onCerrar?: () => void;
}

export function Sidebar({ abierto = false, onCerrar }: SidebarProps) {
  const { empleado, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const enGestionUsuarios = location.pathname.startsWith("/admin/usuarios");
  const enNomina = !enGestionUsuarios && (location.pathname.startsWith("/nomina") || location.pathname.startsWith("/admin"));

  return (
    <aside
      className={`fixed left-0 top-9 bottom-0 z-30 flex w-64 flex-col overflow-hidden border-r border-white/10 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        abierto ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${sidebarBg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-900/90 via-brand-900/85 to-brand-900/95" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-2.5 px-5 py-6">
        <button
          onClick={onCerrar}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-cream-200/70 transition hover:bg-white/10 hover:text-cream-100 md:hidden"
          aria-label="Cerrar menú"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="flex items-center justify-center rounded-xl bg-white px-3 py-2 ring-1 ring-white/20">
          <img src={logo} alt="Azahar Coffee Company" className="h-9 w-auto object-contain" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-cream-200/80">Azahar Coffee Company</p>
      </div>

      <nav onClick={() => onCerrar?.()} className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {enNomina ? (
          <div>
            <button
              onClick={() => navigate("/inicio")}
              className="mb-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-cream-200/80 transition hover:bg-white/10 hover:text-cream-100"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              Nómina
            </button>
            <div>
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-cream-200/60">Mi portal</p>
              <div className="space-y-1">
                {NOMINA_ITEMS.map(({ to, label, Icon }) => (
                  <NavLink key={to} to={to} className={({ isActive }) => itemClase(isActive)}>
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            {empleado?.rol === "admin" && (
              <div className="mt-6">
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-cream-200/60">Administración</p>
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
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <NavLink to="/inicio" className={({ isActive }) => itemClase(isActive)}>
                <Home className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                Inicio
              </NavLink>
            </div>

            {empleado?.rol === "admin" && (
              <div>
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-cream-200/60">Gestión del negocio</p>
                <div className="space-y-1">
                  {GESTION_NEGOCIO.map(({ to, label, Icon }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => itemClase(isActive)}>
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      {label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <NavLink to="/nomina/inicio" className={({ isActive }) => itemClase(isActive)}>
                <Banknote className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                Nómina
              </NavLink>
            </div>

            <div className="space-y-1">
              <NavLink to="/mi-perfil" className={({ isActive }) => itemClase(isActive)}>
                <IdCard className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                Mi Perfil
              </NavLink>
            </div>

            {empleado?.rol === "admin" && (
              <div className="space-y-1">
                <NavLink to="/admin/usuarios" className={({ isActive }) => itemClase(isActive)}>
                  <UserCog className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  Gestión de usuarios
                </NavLink>
              </div>
            )}
          </>
        )}
      </nav>

      <div className="border-t border-white/10 p-3">
        {IS_DEMO_MODE && (
          <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-accent-300/30 px-3 py-1.5 text-[11px] font-semibold text-accent-300">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            Modo demo — datos en memoria
          </div>
        )}
        {empleado && (
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500 font-heading text-xs font-bold text-brand-900">
              {iniciales(empleado.nombre)}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-cream-100">{empleado.nombre}</p>
              <p className="truncate text-xs text-cream-200/70">{empleado.cargo}</p>
            </div>
            <button
              onClick={() => void signOut()}
              className="shrink-0 rounded-lg p-2 text-cream-200/70 transition hover:bg-status-rechazada-bg hover:text-status-rechazada"
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
