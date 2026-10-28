import { lazy, Suspense } from "react";
import type { PuntoOrigen } from "./MapaOrigenes";

// Leaflet pesa bastante y solo lo usan 2 pantallas: se carga bajo demanda.
const MapaOrigenes = lazy(() => import("./MapaOrigenes"));

export default function MapaOrigenesCargador({ puntos }: { puntos: PuntoOrigen[] }) {
  return (
    <Suspense fallback={<div style={{ height: 220 }} className="animate-pulse rounded-2xl bg-[var(--surface-muted)]" />}>
      <MapaOrigenes puntos={puntos} />
    </Suspense>
  );
}
