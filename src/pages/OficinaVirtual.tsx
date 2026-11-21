import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useTheme } from "../context/ThemeContext";

// Oficina Virtual de Azahar: el segundo piso de la oficina de Metis Nexa con el equipo que atiende a Azahar y las
// conexiones de este portal (módulos, integraciones y enlaces con Metis) con su estado en vivo. Es la misma app de
// Three.js que se muestra en el portal de clientes de Metis, publicada como archivos estáticos en
// /oficina-virtual-app y mostrada en un iframe del mismo origen; ella misma pide el estado a /api/azahar/estado.
export default function OficinaVirtual() {
  const { theme } = useTheme();
  const [cargada, setCargada] = useState(false);
  useEffect(() => setCargada(false), [theme]);

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Azahar"
        title="Oficina Virtual"
        description="El piso completo con sus cubículos y las conexiones de Azahar Portal con su estado en vivo. Arrastra para girar la oficina y haz clic en una conexión para ver su detalle."
      />
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-card">
        {!cargada && <p className="absolute inset-0 flex items-center justify-center text-sm text-[var(--text-muted)]">Cargando la oficina…</p>}
        <iframe
          key={theme}
          title="Oficina Virtual de Azahar Coffee"
          src={`/oficina-virtual-app/index.html?empresa=azahar&tema=${theme === "dark" ? "oscuro" : "claro"}`}
          onLoad={() => setCargada(true)}
          className="h-[calc(100dvh-11rem)] min-h-[34rem] w-full border-0 bg-transparent md:h-[calc(100vh-15rem)] md:min-h-[28rem]"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
