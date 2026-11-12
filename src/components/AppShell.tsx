import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, PanelLeftOpen } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { IndicadoresTicker } from "./IndicadoresTicker";
import { ChatbotWidget } from "./ChatbotWidget";
import { HeaderControles } from "./HeaderControles";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/azahar-logo.png";
import fondoFoto from "../assets/sidebar-bg.jpg";

const CLAVE_SIDEBAR = "azahar_sidebar_oculto";

export function AppShell() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  // En pantallas grandes el menú se puede ocultar; la elección se recuerda en este navegador.
  const [sidebarOculto, setSidebarOculto] = useState(() => {
    try {
      return window.localStorage.getItem(CLAVE_SIDEBAR) === "1";
    } catch {
      return false;
    }
  });
  function alternarSidebar(oculto: boolean) {
    setSidebarOculto(oculto);
    try {
      window.localStorage.setItem(CLAVE_SIDEBAR, oculto ? "1" : "0");
    } catch {
      // sin almacenamiento
    }
  }
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--surface-app)] pt-9">
      <IndicadoresTicker />
      <ChatbotWidget />
      {/* Fondo de toda la app: la foto de la finca, desenfocada y con un velo del color del tema */}
      <div className="azahar-foto-fondo pointer-events-none fixed inset-0" style={{ backgroundImage: `url(${fondoFoto})` }} aria-hidden="true" />
      <div className="azahar-velo-fondo pointer-events-none fixed inset-0" aria-hidden="true" />

      {sidebarOculto && (
        <button
          onClick={() => alternarSidebar(false)}
          className="glass fixed left-4 top-12 z-30 hidden h-10 w-10 items-center justify-center rounded-xl text-[var(--text-primary)] transition hover:text-accent-500 md:flex"
          aria-label="Mostrar menú"
          title="Mostrar menú"
        >
          <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} />
        </button>
      )}

      {/* Notificaciones + tema + idioma: fijos en la esquina superior derecha,
          siempre visibles sin importar el scroll o el ancho del contenido. */}
      <div className="fixed right-4 top-12 z-30 hidden items-center gap-2 md:flex">
        <HeaderControles />
      </div>

      <header className="fixed inset-x-0 top-9 z-30 flex h-14 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]/80 px-4 backdrop-blur-md md:hidden">
        <button
          onClick={() => setSidebarAbierto(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)]"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <a href="https://mercury-methods.vercel.app/" rel="noreferrer" aria-label="Volver al sitio de Metis Intel">
          <img src={logo} alt="Azahar Coffee Company" className="h-7 w-auto object-contain" />
        </a>
        <p className="flex-1 truncate text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">{t("sidebar.azaharCoffeeCompany")}</p>
        <div className="flex shrink-0 items-center gap-2">
          <HeaderControles />
        </div>
      </header>

      {sidebarAbierto && (
        <div
          onClick={() => setSidebarAbierto(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden="true"
        />
      )}

      <Sidebar abierto={sidebarAbierto} onCerrar={() => setSidebarAbierto(false)} oculto={sidebarOculto} onOcultar={() => alternarSidebar(true)} />

      <main className={`relative min-h-screen px-6 pb-8 pt-14 transition-[margin,padding] duration-300 sm:px-10 md:pt-8 ${sidebarOculto ? "md:ml-0 md:pl-20" : "md:ml-[17.5rem]"}`}>
        <div className="mx-auto w-full max-w-[73.75rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
