// ============================================================================
// Gestión comercial: tiendas. Se enruta desde api/trazabilidad.ts (límite de 12
// funciones de Vercel Hobby):
//   GET  ?r=tiendas                                    -> listado (módulo 'negocio', ver)
//   POST ?r=tienda-crear   { nombre, ciudad, ventasMes, estado }   (negocio, editar)
//   POST ?r=tienda-estado  { id, estado }                          (negocio, editar)
//   POST ?r=tienda-eliminar { id }                                 (negocio, editar)
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./db.js";
import { HttpError, requireModulo } from "./auth.js";

const ESTADOS = ["activa", "en remodelación", "cerrada"];

interface TiendaRow {
  id: string;
  nombre: string;
  ciudad: string;
  ventas_mes: string | number;
  estado: string;
}

function mapTienda(r: TiendaRow) {
  return { id: r.id, nombre: r.nombre, ciudad: r.ciudad, ventasMes: Number(r.ventas_mes), estado: r.estado };
}

type Body = Record<string, unknown>;

function texto(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

async function listar(req: VercelRequest, res: VercelResponse) {
  await requireModulo(req, "negocio", "ver");
  const { rows } = await sql<TiendaRow>`select id, nombre, ciudad, ventas_mes, estado from tiendas order by nombre`;
  return res.status(200).json({ ok: true, tiendas: rows.map(mapTienda) });
}

async function crear(req: VercelRequest, res: VercelResponse) {
  await requireModulo(req, "negocio", "editar");
  const b = req.body as Body;
  const nombre = texto(b.nombre);
  const ciudad = texto(b.ciudad);
  const ventas = b.ventasMes === undefined || b.ventasMes === "" ? 0 : Number(b.ventasMes);
  const estado = typeof b.estado === "string" && ESTADOS.includes(b.estado) ? b.estado : "activa";
  if (!nombre || !ciudad) throw new HttpError(400, "El nombre y la ciudad de la tienda son obligatorios.");
  if (!Number.isFinite(ventas) || ventas < 0) throw new HttpError(400, "Las ventas del mes deben ser un número igual o mayor a cero.");
  const { rows } = await sql<TiendaRow>`
    insert into tiendas (nombre, ciudad, ventas_mes, estado) values (${nombre}, ${ciudad}, ${Math.round(ventas)}, ${estado})
    returning id, nombre, ciudad, ventas_mes, estado
  `;
  return res.status(201).json({ ok: true, tienda: mapTienda(rows[0]) });
}

async function cambiarEstado(req: VercelRequest, res: VercelResponse) {
  await requireModulo(req, "negocio", "editar");
  const b = req.body as Body;
  const id = texto(b.id);
  const estado = typeof b.estado === "string" && ESTADOS.includes(b.estado) ? b.estado : null;
  if (!id || !estado) throw new HttpError(400, "Faltan la tienda o un estado válido (activa, en remodelación o cerrada).");
  const { rows } = await sql<TiendaRow>`
    update tiendas set estado = ${estado} where id = ${id}::uuid returning id, nombre, ciudad, ventas_mes, estado
  `;
  if (!rows[0]) throw new HttpError(404, "Tienda no encontrada.");
  return res.status(200).json({ ok: true, tienda: mapTienda(rows[0]) });
}

async function eliminar(req: VercelRequest, res: VercelResponse) {
  await requireModulo(req, "negocio", "editar");
  const id = texto((req.body as Body).id);
  if (!id) throw new HttpError(400, "Falta la tienda.");
  const { rows } = await sql`delete from tiendas where id = ${id}::uuid returning id`;
  if (!rows[0]) throw new HttpError(404, "Tienda no encontrada.");
  return res.status(200).json({ ok: true });
}

type Ruta = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

export const TIENDAS_GET: Record<string, Ruta> = { tiendas: listar };
export const TIENDAS_POST: Record<string, Ruta> = {
  "tienda-crear": crear,
  "tienda-estado": cambiarEstado,
  "tienda-eliminar": eliminar,
};
