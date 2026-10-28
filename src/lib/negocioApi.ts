// Cliente HTTP de Gestión comercial: tiendas (ver api/_lib/tiendas.ts).

export type EstadoTiendaApi = "activa" | "en remodelación" | "cerrada";

export interface TiendaApi {
  id: string;
  nombre: string;
  ciudad: string;
  ventasMes: number;
  estado: EstadoTiendaApi;
}

export const ESTADOS_TIENDA: { valor: EstadoTiendaApi; etiqueta: string }[] = [
  { valor: "activa", etiqueta: "Activa" },
  { valor: "en remodelación", etiqueta: "En remodelación" },
  { valor: "cerrada", etiqueta: "Cerrada" },
];

async function llamar<T>(r: string, cuerpo?: unknown): Promise<T> {
  const respuesta = await fetch(`/api/trazabilidad?r=${r}`, {
    method: cuerpo === undefined ? "GET" : "POST",
    credentials: "include",
    headers: cuerpo === undefined ? undefined : { "Content-Type": "application/json" },
    body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
  });
  const payload = (await respuesta.json().catch(() => null)) as ({ ok: boolean; mensaje?: string } & T) | null;
  if (!respuesta.ok || !payload?.ok) throw new Error(payload?.mensaje ?? `Error ${respuesta.status} en Gestión comercial.`);
  return payload;
}

export const negocioApi = {
  tiendas: () => llamar<{ tiendas: TiendaApi[] }>("tiendas").then((d) => d.tiendas),
  crearTienda: (datos: { nombre: string; ciudad: string; ventasMes: number; estado: EstadoTiendaApi }) =>
    llamar<{ tienda: TiendaApi }>("tienda-crear", datos).then((d) => d.tienda),
  cambiarEstado: (id: string, estado: EstadoTiendaApi) => llamar<{ tienda: TiendaApi }>("tienda-estado", { id, estado }).then((d) => d.tienda),
  eliminarTienda: (id: string) => llamar<unknown>("tienda-eliminar", { id }),
};
