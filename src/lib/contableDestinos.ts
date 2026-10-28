// Destinos de la importación de archivos de Gestión Contable y los campos de cada uno.
// IMPORTANTE: mantener igual que api/_lib/contableIA.ts (CAMPOS / DESTINO_NOMBRE), que es lo que valida el servidor.

export const DESTINOS = ["extracto", "factura-compra", "factura-venta", "comprobante", "tercero", "catalogo"] as const;
export type Destino = (typeof DESTINOS)[number];

export const DESTINO_NOMBRE: Record<Destino, string> = {
  extracto: "Extractos bancarios",
  "factura-compra": "Facturas de compra",
  "factura-venta": "Facturas de venta",
  comprobante: "Comprobantes contables",
  tercero: "Terceros",
  catalogo: "Catálogo de productos y/o servicios",
};

/** Dónde se ve lo importado en cada destino. */
export const DESTINO_RUTA: Record<Destino, string> = {
  extracto: "/contable/conciliacion",
  "factura-compra": "/contable/comprobantes",
  "factura-venta": "/contable/comprobantes",
  comprobante: "/contable/comprobantes",
  tercero: "/contable/terceros",
  catalogo: "/contable/catalogo",
};

export interface CampoDestino {
  clave: string;
  etiqueta: string;
  obligatorio?: boolean;
  /** Nombres de columna (sin tildes, en minúscula) que se reconocen solos. */
  alias: string[];
}

export const CAMPOS: Record<Destino, CampoDestino[]> = {
  extracto: [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true, alias: ["fecha", "fecha movimiento", "fecha de la transaccion"] },
    { clave: "descripcion", etiqueta: "Descripción", alias: ["descripcion", "detalle", "concepto", "detalle movimiento", "movimiento"] },
    { clave: "debito", etiqueta: "Débito / cargo", alias: ["debito", "debitos", "cargo", "cargos", "retiro", "salida", "valor debito"] },
    { clave: "credito", etiqueta: "Crédito / abono", alias: ["credito", "creditos", "abono", "abonos", "deposito", "entrada", "valor credito"] },
    { clave: "saldo", etiqueta: "Saldo", alias: ["saldo", "saldo calculado", "saldo final"] },
    { clave: "cuenta", etiqueta: "Cuenta contable", alias: ["cuenta puc", "puc", "cuenta contable", "cuenta"] },
  ],
  "factura-compra": [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true, alias: ["fecha", "fecha de emision", "fecha emision"] },
    { clave: "numero", etiqueta: "Número de factura", obligatorio: true, alias: ["numero", "codigo", "factura", "numero factura", "n factura", "n de factura"] },
    { clave: "tercero", etiqueta: "Proveedor", alias: ["proveedor", "tercero", "nombre proveedor", "razon social"] },
    { clave: "nit", etiqueta: "NIT", alias: ["nit", "identificacion", "nit proveedor"] },
    { clave: "total", etiqueta: "Total", obligatorio: true, alias: ["total", "total factura", "valor", "valor total"] },
    { clave: "retefuente", etiqueta: "Retefuente", alias: ["monto retefte", "retefuente", "rete fuente", "retencion en la fuente"] },
    { clave: "reteica", etiqueta: "Reteica", alias: ["monto reteica", "reteica", "rete ica"] },
    { clave: "reteiva", etiqueta: "Reteiva", alias: ["monto reteiva", "reteiva", "rete iva", "monto reteova"] },
  ],
  "factura-venta": [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true, alias: ["fecha", "fecha de emision", "fecha emision"] },
    { clave: "numero", etiqueta: "Número de factura", obligatorio: true, alias: ["numero", "codigo", "factura", "numero factura", "n factura", "n de factura"] },
    { clave: "tercero", etiqueta: "Cliente", alias: ["cliente", "tercero", "nombre cliente", "razon social"] },
    { clave: "nit", etiqueta: "NIT", alias: ["nit", "identificacion", "nit cliente"] },
    { clave: "total", etiqueta: "Total", obligatorio: true, alias: ["total", "total factura", "valor", "valor total"] },
  ],
  comprobante: [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true, alias: ["fecha"] },
    { clave: "numero", etiqueta: "Número de comprobante", alias: ["comprobante", "numero", "codigo", "numero comprobante"] },
    { clave: "descripcion", etiqueta: "Descripción", alias: ["descripcion", "detalle", "concepto", "observaciones"] },
    { clave: "cuenta", etiqueta: "Cuenta contable", alias: ["cuenta", "cuenta contable", "puc", "codigo cuenta"] },
    { clave: "debito", etiqueta: "Débito", alias: ["debito", "debe", "debitos"] },
    { clave: "credito", etiqueta: "Crédito", alias: ["credito", "haber", "creditos"] },
    { clave: "tercero", etiqueta: "Tercero", alias: ["tercero", "nombre tercero", "nombre"] },
    { clave: "nit", etiqueta: "NIT", alias: ["nit", "identificacion", "nit tercero"] },
  ],
  tercero: [
    { clave: "nit", etiqueta: "NIT / identificación", obligatorio: true, alias: ["nit", "identificacion", "cedula", "documento", "numero de identificacion"] },
    { clave: "nombre", etiqueta: "Nombre o razón social", obligatorio: true, alias: ["nombre", "razon social", "nombre o razon social", "tercero"] },
    { clave: "tipo", etiqueta: "Tipo (cliente / proveedor)", alias: ["tipo", "tipo 1", "cliente proveedor", "tipo tercero", "clasificacion"] },
    { clave: "direccion", etiqueta: "Dirección", alias: ["direccion"] },
    { clave: "telefono", etiqueta: "Teléfono", alias: ["telefono", "celular", "movil"] },
    { clave: "correo", etiqueta: "Correo", alias: ["correo", "email", "correo electronico", "e mail"] },
  ],
  catalogo: [
    { clave: "nombre", etiqueta: "Nombre del producto o servicio", obligatorio: true, alias: ["nombre", "producto", "descripcion", "item", "articulo", "servicio"] },
    { clave: "sku", etiqueta: "SKU / referencia", alias: ["sku", "skus", "sku s", "referencia", "codigo"] },
    { clave: "precio", etiqueta: "Precio", alias: ["precio", "precio base", "precio total", "valor", "precio de venta"] },
    { clave: "iva", etiqueta: "IVA", alias: ["iva", "impuesto", "iva 19", "iva 5"] },
    { clave: "categoria", etiqueta: "Categoría", alias: ["categoria"] },
    { clave: "unidad", etiqueta: "Unidad de medida", alias: ["unidad", "unidad de medida", "um"] },
  ],
};

const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Asigna a cada campo del destino la columna del archivo que mejor le corresponde (por nombre). */
export function autoMapear(destino: Destino, encabezados: string[]): Record<string, string> {
  const norm = encabezados.map(normalizar);
  const usadas = new Set<number>();
  const mapeo: Record<string, string> = {};
  for (const campo of CAMPOS[destino]) {
    let idx = -1;
    for (const alias of campo.alias) {
      idx = norm.findIndex((h, i) => !usadas.has(i) && h === alias);
      if (idx >= 0) break;
    }
    if (idx < 0) idx = norm.findIndex((h, i) => !usadas.has(i) && campo.alias.some((a) => a.length > 3 && h.includes(a)));
    if (idx >= 0) {
      usadas.add(idx);
      mapeo[campo.clave] = encabezados[idx];
    }
  }
  return mapeo;
}

export function faltantes(destino: Destino, mapeo: Record<string, string>): string[] {
  return CAMPOS[destino].filter((c) => c.obligatorio && !mapeo[c.clave]).map((c) => c.etiqueta);
}
