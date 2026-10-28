import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Ícono propio (un punto de color) en vez del marcador PNG por defecto de
// Leaflet, que se rompe con bundlers si no se reconfigura su ruta de imágenes.
const iconoAzahar = L.divIcon({
  className: "",
  html: '<div style="width:16px;height:16px;border-radius:9999px;background:#c9852e;border:2px solid #2a1515;box-shadow:0 0 0 2px white;"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export interface PuntoOrigen {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
  region?: string | null;
}

export default function MapaOrigenes({ puntos }: { puntos: PuntoOrigen[] }) {
  if (puntos.length === 0) return null;
  const centro: [number, number] = [puntos[0].latitud, puntos[0].longitud];
  return (
    <MapContainer center={centro} zoom={puntos.length > 1 ? 7 : 11} scrollWheelZoom={false} style={{ height: 220, width: "100%", borderRadius: 16 }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {puntos.map((p) => (
        <Marker key={p.id} position={[p.latitud, p.longitud]} icon={iconoAzahar}>
          <Popup>
            {p.nombre}
            {p.region ? ` — ${p.region}` : ""}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
