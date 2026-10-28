// Cliente HTTP del POS (ver api/_lib/pos.ts, enrutado por api/trazabilidad.ts). Dinero en pesos COP enteros.

export interface ModificadorPos {
  id: string;
  nombre: string;
  precioDelta: number;
  disponible: boolean;
  tipo: string;
}

export interface GrupoPos {
  id: string;
  nombre: string;
  min: number;
  max: number;
  obligatorio: boolean;
  modificadores: ModificadorPos[];
}

export interface ProductoPos {
  id: string;
  categoriaId: string;
  nombre: string;
  descripcion: string;
  precioBase: number;
  gravable: boolean;
  disponible: boolean;
  grupos: GrupoPos[];
}

export interface CatalogoPos {
  config: { tasaImpuesto: number; flujoPedido: "pagarAntes" | "pagarDespues" };
  categorias: { id: string; nombre: string }[];
  productos: ProductoPos[];
}

export type EstadoPedidoPos = "abierto" | "enviadoCocina" | "enPreparacion" | "listo" | "entregado" | "cobrado" | "cancelado";
export type EstadoCocinaPos = "recibido" | "preparando" | "listo";

export interface LineaPos {
  id: string;
  productoId: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotalLinea: number;
  notas: string;
  estadoCocina: EstadoCocinaPos;
  anulada: boolean;
  modificadores: { id: string; descripcion: string; precioDelta: number; tipo: string }[];
}

export interface PagoPos {
  id: string;
  metodo: "efectivo" | "tarjeta" | "otro";
  monto: number;
  propina: number;
  franquicia: string | null;
  tipoTarjeta: string | null;
  ultimos4: string | null;
  recibido: number | null;
  estado: "aprobado" | "rechazado" | "reembolsado";
  creadoEn: string;
}

export interface TotalesPos {
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  propina: number;
  pagado: number;
  saldoPendiente: number;
}

export interface PedidoPos {
  id: string;
  numero: number;
  nombreCliente: string | null;
  canal: string;
  paraLlevar: boolean;
  estado: EstadoPedidoPos;
  descuentoMotivo: string | null;
  empleadoNombre: string | null;
  creadoEn: string;
  enviadoCocinaEn: string | null;
  listoEn: string | null;
  cobradoEn: string | null;
  lineas: LineaPos[];
  pagos: PagoPos[];
  totales: TotalesPos;
}

export interface PagoInput {
  pedidoId: string;
  metodo: "efectivo" | "tarjeta" | "otro";
  monto?: number;
  propina?: number;
  recibido?: number;
  franquicia?: string;
  tipoTarjeta?: "debito" | "credito";
  ultimos4?: string;
}

export class PosError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function llamar<T>(r: string, params: Record<string, string> = {}, cuerpo?: unknown): Promise<T> {
  const query = new URLSearchParams({ r, ...params }).toString();
  const respuesta = await fetch(`/api/trazabilidad?${query}`, {
    method: cuerpo === undefined ? "GET" : "POST",
    credentials: "include",
    headers: cuerpo === undefined ? undefined : { "Content-Type": "application/json" },
    body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
  });
  const payload = (await respuesta.json().catch(() => null)) as ({ ok: boolean; mensaje?: string } & T) | null;
  if (!respuesta.ok || !payload?.ok) throw new PosError(respuesta.status, payload?.mensaje ?? `Error ${respuesta.status} en el POS.`);
  return payload;
}

const pedidoDe = (d: { pedido: PedidoPos }) => d.pedido;

export const posApi = {
  catalogo: () => llamar<CatalogoPos>("pos-catalogo"),
  pedidos: (scope: "abiertos" | "cocina" | "historial") => llamar<{ pedidos: PedidoPos[] }>("pos-pedidos", { scope }).then((d) => d.pedidos),
  crearPedido: (nombreCliente?: string) => llamar<{ pedido: PedidoPos }>("pos-pedido-crear", {}, { nombreCliente }).then(pedidoDe),
  agregarLinea: (datos: { pedidoId: string; productoId: string; cantidad: number; modificadorIds: string[]; notas?: string }) =>
    llamar<{ pedido: PedidoPos }>("pos-linea-agregar", {}, datos).then(pedidoDe),
  cambiarLinea: (datos: { pedidoId: string; lineaId: string; cantidad?: number; eliminar?: boolean }) =>
    llamar<{ pedido: PedidoPos }>("pos-linea-cambiar", {}, datos).then(pedidoDe),
  paraLlevar: (pedidoId: string, paraLlevar: boolean) => llamar<{ pedido: PedidoPos }>("pos-para-llevar", {}, { pedidoId, paraLlevar }).then(pedidoDe),
  descuento: (datos: { pedidoId: string; tipo: "monto" | "porcentaje"; valor: number; motivo: string }) =>
    llamar<{ pedido: PedidoPos }>("pos-descuento", {}, datos).then(pedidoDe),
  enviarCocina: (pedidoId: string) => llamar<{ pedido: PedidoPos }>("pos-enviar-cocina", {}, { pedidoId }).then(pedidoDe),
  cocinaEstado: (datos: { pedidoId: string; lineaId?: string; estado: EstadoCocinaPos | "entregado" }) =>
    llamar<{ pedido: PedidoPos }>("pos-cocina-estado", {}, datos).then(pedidoDe),
  pagar: (datos: PagoInput) => llamar<{ pedido: PedidoPos; cambio: number }>("pos-pagar", {}, datos),
  cancelar: (pedidoId: string, motivo: string) => llamar<{ pedido: PedidoPos }>("pos-cancelar", {}, { pedidoId, motivo }).then(pedidoDe),
  productoDisponible: (productoId: string, disponible: boolean) => llamar<unknown>("pos-producto-disponible", {}, { productoId, disponible }),
};

export const ETIQUETA_ESTADO_PEDIDO: Record<EstadoPedidoPos, string> = {
  abierto: "Abierto",
  enviadoCocina: "En cocina",
  enPreparacion: "Preparando",
  listo: "Listo",
  entregado: "Entregado",
  cobrado: "Cobrado",
  cancelado: "Cancelado",
};
