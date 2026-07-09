import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { IndicadoresTicker } from "./IndicadoresTicker";
import { ChatbotWidget } from "./ChatbotWidget";
import logo from "../assets/azahar-logo.png";

export function AppShell() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--surface-app)] pt-9">
      <IndicadoresTicker />
      <ChatbotWidget />
      <div
        className="azahar-mosaic-bg pointer-events-none fixed"
        style={{ top: "-50vh", left: "-50vw", width: "200vw", height: "200vh", transform: "rotate(-22deg)" }}
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-9 z-30 flex h-14 items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 md:hidden">
        <button
          onClick={() => setSidebarAbierto(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)]"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <img src={logo} alt="Azahar Coffee Company" className="h-7 w-auto object-contain" />
        <p className="truncate text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Azahar Coffee Company</p>
      </header>

      {sidebarAbierto && (
        <div
          onClick={() => setSidebarAbierto(false)}
          className="fixed inset-0 top-9 z-20 bg-black/50 md:hidden"
          aria-hidden="true"
        />
      )}

      <Sidebar abierto={sidebarAbierto} onCerrar={() => setSidebarAbierto(false)} />

      <main className="relative min-h-screen px-6 pb-8 pt-14 sm:px-10 md:ml-64 md:pt-8">
        <div className="mx-auto w-full max-w-[1180px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
