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
  MessageSquareWarning,
  Coffee,
  ChefHat,
  ShoppingCart,
  Flame,
  History,
  Package,
} from "lucide-react";
import type { PermisoPos, PermisoTrazabilidad } from "../lib/types";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { IS_DEMO_MODE } from "../lib/dataSource";
import { iniciales } from "../lib/format";
import type { ClaveTraduccion } from "../i18n/translations";
import logo from "../assets/azahar-logo.png";
import sidebarBg from "../assets/sidebar-bg.jpg";

const NOMINA_ITEMS: { to: string; claveLabel: ClaveTraduccion; Icon: typeof Home }[] = [
  { to: "/nomina/inicio", claveLabel: "sidebar.inicio", Icon: Home },
  { to: "/nomina/mi-contrato", claveLabel: "sidebar.miContrato", Icon: FileText },
  { to: "/nomina/vacaciones", claveLabel: "sidebar.vacaciones", Icon: CalendarDays },
  { to: "/nomina/pagos", claveLabel: "sidebar.nomina", Icon: Banknote },
  { to: "/nomina/mis-solicitudes", claveLabel: "sidebar.misSolicitudes", Icon: ClipboardList },
  { to: "/nomina/incapacidades", claveLabel: "sidebar.incapacidades", Icon: HeartPulse },
  { to: "/nomina/documentos", claveLabel: "sidebar.documentos", Icon: Folder },
  { to: "/nomina/certificados", claveLabel: "sidebar.certificados", Icon: BadgeCheck },
];

const ADMINISTRACION: { to: string; claveLabel: ClaveTraduccion; Icon: typeof Home }[] = [
  { to: "/admin/solicitudes", claveLabel: "sidebar.adminSolicitudes", Icon: ClipboardCheck },
  { to: "/admin/incapacidades", claveLabel: "sidebar.adminIncapacidades", Icon: Stethoscope },
  { to: "/admin/documentos", claveLabel: "sidebar.adminDocumentos", Icon: FolderCog },
  { to: "/admin/empleados", claveLabel: "sidebar.adminEmpleados", Icon: Users },
  { to: "/admin/nomina", claveLabel: "sidebar.adminNomina", Icon: Receipt },
];

const GESTION_NEGOCIO: { to: string; claveLabel: ClaveTraduccion; Icon: typeof Home }[] = [
  { to: "/gestion-estrategica", claveLabel: "sidebar.gestionEstrategica", Icon: Compass },
  { to: "/gestion-comercial", claveLabel: "sidebar.gestionComercial", Icon: Store },
  { to: "/gestion-operativa", claveLabel: "sidebar.gestionOperativa", Icon: Sprout },
  { to: "/informacion-general", claveLabel: "sidebar.informacionGeneral", Icon: Info },
];

// Módulo de Trazabilidad: cada ítem se muestra solo si el empleado tiene el
// permiso de esa etapa (o 'ADMIN'); los permisos se asignan en Admin > Usuarios.
const TRAZABILIDAD_ITEMS: { to: string; label: string; Icon: typeof Home; permiso: PermisoTrazabilidad | null }[] = [
  { to: "/trazabilidad", label: "Resumen", Icon: Home, permiso: null },
  { to: "/trazabilidad/finca", label: "Finca / Origen", Icon: Sprout, permiso: "FINCA" },
  { to: "/trazabilidad/certificacion", label: "Certificaciones", Icon: BadgeCheck, permiso: "FINCA" },
  { to: "/trazabilidad/lote-verde", label: "Beneficiado y trilla", Icon: Coffee, permiso: "BENEFICIADO" },
  { to: "/trazabilidad/ficha-cata", label: "Ficha de cata", Icon: ClipboardList, permiso: "BENEFICIADO" },
  { to: "/trazabilidad/lote-tostado", label: "Tueste", Icon: Flame, permiso: "TUESTE" },
  { to: "/trazabilidad/lote-empaque", label: "Empaque y QR", Icon: Package, permiso: "EMPAQUE" },
  { to: "/trazabilidad/auditoria", label: "Auditoría", Icon: History, permiso: "ADMIN" },
];

// POS: igual que trazabilidad, cada item depende de empleado.permisosPos.
const POS_ITEMS: { to: string; label: string; Icon: typeof Home; permiso: PermisoPos }[] = [
  { to: "/pos", label: "Caja", Icon: ShoppingCart, permiso: "CAJA" },
  { to: "/pos/cocina", label: "Cocina", Icon: ChefHat, permiso: "COCINA" },
  { to: "/pos/historial", label: "Historial", Icon: ClipboardList, permiso: "CAJA" },
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
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  // Rutas que, aunque empiecen con "/admin", son ítems sueltos del sidebar
  // principal (no parte del sub-sidebar de Administración de NÓMINA).
  const enPaginaIndependiente = location.pathname.startsWith("/admin/usuarios") || location.pathname.startsWith("/admin/pqr");
  const permisosTraz = empleado?.permisosTrazabilidad ?? [];
  const tieneTraz = permisosTraz.length > 0;
  const enTraz = location.pathname.startsWith("/trazabilidad");
  const permisosPos = empleado?.permisosPos ?? [];
  const tienePos = permisosPos.length > 0;
  const enPos = location.pathname.startsWith("/pos");
  const enNomina = !enTraz && !enPos && !enPaginaIndependiente && (location.pathname.startsWith("/nomina") || location.pathname.startsWith("/admin"));

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex w-64 flex-col overflow-hidden border-r border-white/10 transition-transform duration-300 ease-in-out md:top-9 md:z-30 md:translate-x-0 ${
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
          className="absolute right-3 top-3 rounded-lg p-2.5 text-cream-200/70 transition hover:bg-white/10 hover:text-cream-100 md:hidden"
          aria-label="Cerrar menú"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="flex items-center justify-center rounded-xl bg-white px-3 py-2 ring-1 ring-white/20">
          <img src={logo} alt="Azahar Coffee Company" className="h-9 w-auto object-contain" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-cream-200/80">{t("sidebar.azaharCoffeeCompany")}</p>
      </div>

      <nav onClick={() => onCerrar?.()} className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {enPos ? (
          <div>
            <button
              onClick={() => navigate("/inicio")}
              className="mb-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-cream-200/80 transition hover:bg-white/10 hover:text-cream-100"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {t("sidebar.pos")}
            </button>
            <div className="space-y-1">
              {POS_ITEMS.filter(({ permiso }) => permisosPos.includes("ADMIN") || permisosPos.includes(permiso)).map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} end className={({ isActive }) => itemClase(isActive)}>
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ) : enTraz ? (
          <div>
            <button
              onClick={() => navigate("/inicio")}
              className="mb-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-cream-200/80 transition hover:bg-white/10 hover:text-cream-100"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {t("sidebar.trazabilidad")}
            </button>
            <div className="space-y-1">
              {TRAZABILIDAD_ITEMS.filter(({ permiso }) => permiso === null || permisosTraz.includes("ADMIN") || permisosTraz.includes(permiso)).map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} end={to === "/trazabilidad"} className={({ isActive }) => itemClase(isActive)}>
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ) : enNomina ? (
          <div>
            <button
              onClick={() => navigate("/inicio")}
              className="mb-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-cream-200/80 transition hover:bg-white/10 hover:text-cream-100"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {t("sidebar.nomina")}
            </button>
            <div>
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-cream-200/60">{t("sidebar.miPortal")}</p>
              <div className="space-y-1">
                {NOMINA_ITEMS.map(({ to, claveLabel, Icon }) => (
                  <NavLink key={to} to={to} className={({ isActive }) => itemClase(isActive)}>
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    {t(claveLabel)}
                  </NavLink>
                ))}
              </div>
            </div>

            {empleado?.rol === "admin" && (
              <div className="mt-6">
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-cream-200/60">{t("sidebar.administracion")}</p>
                <div className="space-y-1">
                  {ADMINISTRACION.map(({ to, claveLabel, Icon }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => itemClase(isActive)}>
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      {t(claveLabel)}
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
                {t("sidebar.inicio")}
              </NavLink>
            </div>

            {empleado?.rol === "admin" && (
              <div>
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-cream-200/60">{t("sidebar.gestionNegocio")}</p>
                <div className="space-y-1">
                  {GESTION_NEGOCIO.map(({ to, claveLabel, Icon }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => itemClase(isActive)}>
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      {t(claveLabel)}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            {tienePos && (
              <div className="space-y-1">
                <NavLink to={permisosPos.includes("ADMIN") || permisosPos.includes("CAJA") ? "/pos" : "/pos/cocina"} className={({ isActive }) => itemClase(isActive)}>
                  <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {t("sidebar.pos")}
                </NavLink>
              </div>
            )}

            {tieneTraz && (
              <div className="space-y-1">
                <NavLink to="/trazabilidad" className={({ isActive }) => itemClase(isActive)}>
                  <Coffee className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {t("sidebar.trazabilidad")}
                </NavLink>
              </div>
            )}

            <div className="space-y-1">
              <NavLink to="/nomina/inicio" className={({ isActive }) => itemClase(isActive)}>
                <Banknote className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {t("sidebar.nomina")}
              </NavLink>
            </div>

            <div className="space-y-1">
              <NavLink to="/mi-perfil" className={({ isActive }) => itemClase(isActive)}>
                <IdCard className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {t("sidebar.miPerfil")}
              </NavLink>
            </div>

            {empleado?.rol === "admin" && (
              <div className="space-y-1">
                <NavLink to="/admin/usuarios" className={({ isActive }) => itemClase(isActive)}>
                  <UserCog className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {t("sidebar.gestionUsuarios")}
                </NavLink>
              </div>
            )}

            {empleado?.tipoCuenta === "desarrollador" && (
              <div className="space-y-1">
                <NavLink to="/admin/pqr" className={({ isActive }) => itemClase(isActive)}>
                  <MessageSquareWarning className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {t("sidebar.gestionPqr")}
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
            {t("sidebar.modoDemo")}
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
              className="shrink-0 rounded-lg p-2.5 text-cream-200/70 transition hover:bg-status-rechazada-bg hover:text-status-rechazada"
              title={t("sidebar.cerrarSesion")}
              aria-label={t("sidebar.cerrarSesion")}
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
