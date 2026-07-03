import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  return (
    <div className="min-h-screen bg-[var(--surface-app)]">
      <Sidebar />
      <main className="ml-64 min-h-screen px-6 py-8 sm:px-10">
        <div className="mx-auto w-full max-w-[1180px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
