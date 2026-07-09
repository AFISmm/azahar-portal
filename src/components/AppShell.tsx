import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { IndicadoresTicker } from "./IndicadoresTicker";
import { ChatbotWidget } from "./ChatbotWidget";

export function AppShell() {
  return (
    <div className="min-h-screen bg-[var(--surface-app)] pt-9">
      <IndicadoresTicker />
      <ChatbotWidget />
      <div
        className="azahar-mosaic-bg pointer-events-none fixed"
        style={{ top: "-50vh", left: "-50vw", width: "200vw", height: "200vh", transform: "rotate(-22deg)" }}
        aria-hidden="true"
      />
      <Sidebar />
      <main className="relative ml-64 min-h-screen px-6 py-8 sm:px-10">
        <div className="mx-auto w-full max-w-[1180px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
