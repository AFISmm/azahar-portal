// ============================================================================
// POS — Fase 1 (núcleo de venta): catálogo, pedidos con modificadores, cobro y
// cocina (KDS). Lo enruta api/trazabilidad.ts cuando `?r=pos-...` (vive en la
// misma función para no superar el límite de 12 funciones serverless de Hobby).
//
//   GET  pos-catalogo | pos-pedidos[&scope=abiertos|cocina|historial] | pos-pedido&id= | pos-config
//   POST pos-pedido-crear | pos-linea-agregar | pos-linea-cambiar | pos-para-llevar | pos-descuento |
//        pos-enviar-cocina | pos-cocina-estado | pos-pagar | pos-cancelar | pos-producto-disponible
//
// PERMISOS (empleados.permisos_pos): 'ADMIN' todo; 'CAJA' vende y cobra; 'COCINA' ve y mueve el KDS.
//
// DINERO: pesos COP ENTEROS. Las fórmulas (subtotal, descuento prorrateado, impuesto
// sobre lo gravable, saldo) son las del motor original de azahar-pos (lib/sales/engine.ts).
// LIMITACIÓN CONOCIDA: @vercel/postgres no ofrece transacciones multi-sentencia en este
// esquema; los pasos de una operación (p. ej. línea + modificadores) son secuenciales.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./db.js";
import { HttpError, requireAuth } from "./auth.js";
import { tieneAccesoTotal } from "./acceso.js";

type Fila = Record<string, unknown>;
type Body = Record<string, unknown>;
type PermisoPos = "ADMIN" | "CAJA" | "COCINA";

const PRODUCTO_EMPAQUE_ID = "prod-empaque-para-llevar";

interface Actor {
  id: string;
  nombre: string;
  permisos: string[];
}

function primero(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}
function texto(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}
function entero(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

async function exigir(req: VercelRequest, roles: PermisoPos[]): Promise<Actor> {
  const { empleadoId } = await requireAuth(req);
  const { rows } = await sql<{ nombre: string; correo: string; estado: string; permisos_pos: string[] | null }>`
    select nombre, correo, estado, permisos_pos from empleados where id = ${empleadoId} limit 1
  `;
  const fila = rows[0];
  if (!fila || fila.estado !== "activo") throw new HttpError(401, "La sesión ya no es válida.");
  const permisos = tieneAccesoTotal(fila.correo) ? ["ADMIN"] : (fila.permisos_pos ?? []);
  if (permisos.length === 0) throw new HttpError(403, "No tienes acceso al POS.");
  if (!permisos.includes("ADMIN") && !roles.some((r) => permisos.includes(r))) {
    throw new HttpError(403, "Tu permiso no incluye esta función del POS.");
  }
  return { id: empleadoId, nombre: fila.nombre, permisos };
}

async function auditar(actor: Actor, tipo: string, referencia: string | null, detalle: string) {
  await sql`
    insert into pos_auditoria (empleado_id, usuario_nombre, tipo, referencia, detalle)
    values (${actor.id}, ${actor.nombre}, ${tipo}, ${referencia}, ${detalle})
  `;
}

// ---------------------------------------------------------------------------
// Cálculo de totales (única fuente de verdad: nadie más recalcula)
// ---------------------------------------------------------------------------

interface Totales {
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number; // subtotal - descuento + impuesto + propina
  propina: number;
  pagado: number;
  saldoPendiente: number;
}

function calcularTotales(pedido: Fila, lineas: Fila[], pagos: Fila[]): Totales {
  const vivas = lineas.filter((l) => !l.anulada);
  const subtotal = vivas.reduce((s, l) => s + Number(l.subtotal_linea), 0);
  const gravable = vivas.filter((l) => l.gravable).reduce((s, l) => s + Number(l.subtotal_linea), 0);
  const descuento = Math.min(Math.max(Number(pedido.descuento_total ?? 0), 0), subtotal);
  const baseGravable = subtotal > 0 ? gravable - Math.round((descuento * gravable) / subtotal) : 0;
  const impuesto = Math.round(baseGravable * Number(pedido.tasa_impuesto));
  const aprobados = pagos.filter((p) => p.estado === "aprobado");
  const propina = aprobados.reduce((s, p) => s + Number(p.propina), 0);
  const pagado = aprobados.reduce((s, p) => s + Number(p.monto), 0);
  const mercancia = subtotal - descuento + impuesto;
  return { subtotal, descuento, impuesto, propina, total: mercancia + propina, pagado, saldoPendiente: mercancia - pagado };
}

async function cargarPedidos(ids: string[]) {
  if (ids.length === 0) return [];
  const { rows: pedidos } = await sql`
    select p.*, e.nombre as empleado_nombre from pos_pedidos p left join empleados e on e.id = p.empleado_id
    where p.id = any(${ids as unknown as string}) order by p.creado_en
  `;
  const { rows: lineas } = await sql`select * from pos_pedido_lineas where pedido_id = any(${ids as unknown as string}) order by id`;
  const lineaIds = lineas.map((l) => l.id as string);
  const { rows: mods } = lineaIds.length
    ? await sql`select * from pos_linea_modificadores where linea_id = any(${lineaIds as unknown as string})`
    : { rows: [] as Fila[] };
  const { rows: pagos } = await sql`select * from pos_pagos where pedido_id = any(${ids as unknown as string}) order by creado_en`;

  return pedidos.map((p) => {
    const ls = lineas.filter((l) => l.pedido_id === p.id);
    const ps = pagos.filter((x) => x.pedido_id === p.id);
    return {
      id: p.id,
      numero: p.numero,
      nombreCliente: p.nombre_cliente,
      canal: p.canal,
      paraLlevar: p.para_llevar,
      estado: p.estado,
      descuentoMotivo: p.descuento_motivo,
      empleadoNombre: p.empleado_nombre,
      creadoEn: p.creado_en,
      enviadoCocinaEn: p.enviado_cocina_en,
      listoEn: p.listo_en,
      cobradoEn: p.cobrado_en,
      lineas: ls.map((l) => ({
        id: l.id,
        productoId: l.producto_id,
        descripcion: l.descripcion,
        cantidad: l.cantidad,
        precioUnitario: l.precio_unitario,
        subtotalLinea: l.subtotal_linea,
        notas: l.notas,
        estadoCocina: l.estado_cocina,
        anulada: l.anulada,
        modificadores: mods
          .filter((m) => m.linea_id === l.id)
          .map((m) => ({ id: m.id, descripcion: m.descripcion, precioDelta: m.precio_delta, tipo: m.tipo })),
      })),
      pagos: ps.map((x) => ({
        id: x.id,
        metodo: x.metodo,
        monto: x.monto,
        propina: x.propina,
        franquicia: x.franquicia,
        tipoTarjeta: x.tipo_tarjeta,
        ultimos4: x.ultimos4,
        recibido: x.recibido,
        estado: x.estado,
        creadoEn: x.creado_en,
      })),
      totales: calcularTotales(p, ls, ps),
    };
  });
}

async function cargarPedido(id: string) {
  const [pedido] = await cargarPedidos([id]);
  if (!pedido) throw new HttpError(404, "Pedido no encontrado.");
  return pedido;
}

async function pedidoModificable(id: string): Promise<Fila> {
  const { rows } = await sql`select * from pos_pedidos where id = ${id} limit 1`;
  const p = rows[0];
  if (!p) throw new HttpError(404, "Pedido no encontrado.");
  if (p.estado !== "abierto") throw new HttpError(409, "El pedido ya fue enviado a cocina o cerrado: no se puede modificar.");
  return p;
}

// ---------------------------------------------------------------------------
// Lecturas
// ---------------------------------------------------------------------------

async function catalogo(req: VercelRequest, res: VercelResponse) {
  await exigir(req, ["CAJA"]);
  const { rows: categorias } = await sql`select id, nombre, orden from pos_categorias where activo order by orden`;
  const { rows: productos } = await sql`
    select id, categoria_id, nombre, descripcion, precio_base, gravable, disponible
    from pos_productos where activo and id <> ${PRODUCTO_EMPAQUE_ID} order by nombre
  `;
  const { rows: grupos } = await sql`select * from pos_grupos_modificador order by nombre`;
  const { rows: mods } = await sql`select * from pos_modificadores order by precio_delta, nombre`;
  const { rows: cfg } = await sql`select tasa_impuesto, flujo_pedido from pos_config where id = 1`;
  return res.status(200).json({
    ok: true,
    config: { tasaImpuesto: Number(cfg[0].tasa_impuesto), flujoPedido: cfg[0].flujo_pedido },
    categorias: categorias.map((c) => ({ id: c.id, nombre: c.nombre })),
    productos: productos.map((p) => ({
      id: p.id,
      categoriaId: p.categoria_id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precioBase: p.precio_base,
      gravable: p.gravable,
      disponible: p.disponible,
      grupos: grupos
        .filter((g) => g.producto_id === p.id)
        .map((g) => ({
          id: g.id,
          nombre: g.nombre,
          min: g.min_selecciones,
          max: g.max_selecciones,
          obligatorio: g.obligatorio,
          modificadores: mods
            .filter((m) => m.grupo_id === g.id)
            .map((m) => ({ id: m.id, nombre: m.nombre, precioDelta: m.precio_delta, disponible: m.disponible, tipo: m.tipo })),
        })),
    })),
  });
}

async function pedidos(req: VercelRequest, res: VercelResponse) {
  const scope = primero(req.query.scope) ?? "abiertos";
  const actor = await exigir(req, scope === "cocina" ? ["COCINA", "CAJA"] : ["CAJA"]);
  void actor;
  const { rows } =
    scope === "cocina"
      ? await sql`select id from pos_pedidos where estado in ('enviadoCocina', 'enPreparacion', 'listo') order by enviado_cocina_en`
      : scope === "historial"
        ? await sql`select id from pos_pedidos where estado in ('entregado', 'cancelado') or cobrado_en is not null order by creado_en desc limit 100`
        : await sql`select id from pos_pedidos where estado in ('abierto', 'enviadoCocina', 'enPreparacion', 'listo') order by creado_en`;
  return res.status(200).json({ ok: true, pedidos: await cargarPedidos(rows.map((r) => r.id as string)) });
}

async function pedido(req: VercelRequest, res: VercelResponse) {
  await exigir(req, ["CAJA", "COCINA"]);
  const id = primero(req.query.id);
  if (!id) throw new HttpError(400, "Falta el id del pedido.");
  return res.status(200).json({ ok: true, pedido: await cargarPedido(id) });
}

// ---------------------------------------------------------------------------
// Escrituras
// ---------------------------------------------------------------------------

async function pedidoCrear(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, ["CAJA"]);
  const b = req.body as Body;
  const canal = ["mostrador", "kiosco", "online", "delivery", "catering"].includes(String(b.canal)) ? String(b.canal) : "mostrador";
  const { rows: cfg } = await sql`select tasa_impuesto from pos_config where id = 1`;
  const { rows } = await sql`
    insert into pos_pedidos (nombre_cliente, canal, tasa_impuesto, empleado_id)
    values (${texto(b.nombreCliente)}, ${canal}, ${cfg[0].tasa_impuesto as string}, ${actor.id})
    returning id
  `;
  return res.status(201).json({ ok: true, pedido: await cargarPedido(rows[0].id as string) });
}

async function lineaAgregar(req: VercelRequest, res: VercelResponse) {
  await exigir(req, ["CAJA"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  const productoId = texto(b.productoId);
  const cantidad = entero(b.cantidad) ?? 1;
  if (!pedidoId || !productoId) throw new HttpError(400, "Faltan pedido o producto.");
  if (cantidad < 1 || cantidad > 99) throw new HttpError(400, "Cantidad inválida.");
  await pedidoModificable(pedidoId);

  const { rows: prods } = await sql`select * from pos_productos where id = ${productoId} and activo limit 1`;
  const prod = prods[0];
  if (!prod) throw new HttpError(404, "Producto no encontrado.");
  if (!prod.disponible) throw new HttpError(409, `${prod.nombre} está agotado.`);

  const modificadorIds = Array.isArray(b.modificadorIds) ? (b.modificadorIds as unknown[]).filter((x): x is string => typeof x === "string") : [];
  const { rows: grupos } = await sql`select * from pos_grupos_modificador where producto_id = ${productoId}`;
  const { rows: mods } = modificadorIds.length
    ? await sql`select m.* from pos_modificadores m join pos_grupos_modificador g on g.id = m.grupo_id
                where m.id = any(${modificadorIds as unknown as string}) and g.producto_id = ${productoId}`
    : { rows: [] as Fila[] };
  if (mods.length !== new Set(modificadorIds).size) throw new HttpError(400, "Hay modificadores que no pertenecen a este producto.");
  for (const m of mods) if (!m.disponible) throw new HttpError(409, `${m.nombre} está agotado.`);

  // Reglas de selección por grupo (mínimo/máximo/obligatorio).
  for (const g of grupos) {
    const n = mods.filter((m) => m.grupo_id === g.id).length;
    if (n > Number(g.max_selecciones)) throw new HttpError(400, `"${g.nombre}": máximo ${g.max_selecciones}.`);
    if (n < Number(g.min_selecciones) || (g.obligatorio && n === 0)) throw new HttpError(400, `"${g.nombre}": elige al menos ${Math.max(Number(g.min_selecciones), 1)}.`);
  }

  const delta = (mods as Fila[]).reduce<number>((s, m) => s + Number(m.precio_delta), 0);
  const precioUnitario = Number(prod.precio_base) + delta;
  const { rows } = await sql`
    insert into pos_pedido_lineas (pedido_id, producto_id, descripcion, cantidad, precio_unitario, subtotal_linea, gravable, notas)
    values (${pedidoId}, ${productoId}, ${prod.nombre as string}, ${cantidad}, ${precioUnitario}, ${precioUnitario * cantidad}, ${prod.gravable as boolean}, ${texto(b.notas) ?? ""})
    returning id
  `;
  for (const m of mods) {
    await sql`
      insert into pos_linea_modificadores (linea_id, modificador_id, descripcion, precio_delta, tipo)
      values (${rows[0].id as string}, ${m.id as string}, ${m.nombre as string}, ${Number(m.precio_delta)}, ${m.tipo as string})
    `;
  }
  return res.status(201).json({ ok: true, pedido: await cargarPedido(pedidoId) });
}

async function lineaCambiar(req: VercelRequest, res: VercelResponse) {
  await exigir(req, ["CAJA"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  const lineaId = texto(b.lineaId);
  if (!pedidoId || !lineaId) throw new HttpError(400, "Faltan pedido o línea.");
  await pedidoModificable(pedidoId);
  if (b.eliminar === true) {
    await sql`delete from pos_pedido_lineas where id = ${lineaId} and pedido_id = ${pedidoId}`;
  } else {
    const cantidad = entero(b.cantidad);
    if (cantidad === null || cantidad < 1 || cantidad > 99) throw new HttpError(400, "Cantidad inválida.");
    await sql`update pos_pedido_lineas set cantidad = ${cantidad}, subtotal_linea = precio_unitario * ${cantidad} where id = ${lineaId} and pedido_id = ${pedidoId}`;
  }
  return res.status(200).json({ ok: true, pedido: await cargarPedido(pedidoId) });
}

/** Al marcar "para llevar" se agrega solo la línea de empaque (precio 0); al desmarcar se quita. */
async function paraLlevar(req: VercelRequest, res: VercelResponse) {
  await exigir(req, ["CAJA"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  if (!pedidoId) throw new HttpError(400, "Falta el pedido.");
  await pedidoModificable(pedidoId);
  const activo = b.paraLlevar === true;
  await sql`update pos_pedidos set para_llevar = ${activo} where id = ${pedidoId}`;
  await sql`delete from pos_pedido_lineas where pedido_id = ${pedidoId} and producto_id = ${PRODUCTO_EMPAQUE_ID}`;
  if (activo) {
    await sql`
      insert into pos_pedido_lineas (pedido_id, producto_id, descripcion, cantidad, precio_unitario, subtotal_linea, gravable)
      select ${pedidoId}, id, nombre, 1, 0, 0, false from pos_productos where id = ${PRODUCTO_EMPAQUE_ID}
    `;
  }
  return res.status(200).json({ ok: true, pedido: await cargarPedido(pedidoId) });
}

async function descuento(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, ["ADMIN"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  const tipo = b.tipo === "porcentaje" ? "porcentaje" : b.tipo === "monto" ? "monto" : null;
  const valor = entero(b.valor);
  const motivo = texto(b.motivo);
  if (!pedidoId || !tipo || valor === null || valor < 0) throw new HttpError(400, "Datos de descuento inválidos.");
  if (!motivo) throw new HttpError(400, "El motivo del descuento es obligatorio.");
  if (tipo === "porcentaje" && valor > 100) throw new HttpError(400, "El porcentaje no puede superar 100.");
  const p = await pedidoModificable(pedidoId);
  const { rows } = await sql`select coalesce(sum(subtotal_linea), 0)::int as s from pos_pedido_lineas where pedido_id = ${pedidoId} and not anulada`;
  const subtotal = Number(rows[0].s);
  const monto = Math.min(tipo === "monto" ? valor : Math.round((subtotal * valor) / 100), subtotal);
  await sql`update pos_pedidos set descuento_tipo = ${tipo}, descuento_total = ${monto}, descuento_motivo = ${motivo} where id = ${pedidoId}`;
  await auditar(actor, "descuentoAplicado", `#${p.numero}`, `Descuento de $${monto} (${tipo === "monto" ? "monto" : `${valor}%`}): ${motivo}`);
  return res.status(200).json({ ok: true, pedido: await cargarPedido(pedidoId) });
}

async function enviarCocina(req: VercelRequest, res: VercelResponse) {
  await exigir(req, ["CAJA"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  if (!pedidoId) throw new HttpError(400, "Falta el pedido.");
  await pedidoModificable(pedidoId);
  const actual = await cargarPedido(pedidoId);
  if (actual.lineas.filter((l) => !l.anulada && l.productoId !== PRODUCTO_EMPAQUE_ID).length === 0) {
    throw new HttpError(400, "El pedido no tiene productos.");
  }
  const { rows: cfg } = await sql`select flujo_pedido from pos_config where id = 1`;
  if (cfg[0].flujo_pedido === "pagarAntes" && actual.totales.saldoPendiente > 0) {
    throw new HttpError(409, "Esta tienda cobra antes de enviar a cocina: registra el pago primero.");
  }
  await sql`update pos_pedidos set estado = 'enviadoCocina', enviado_cocina_en = now() where id = ${pedidoId}`;
  return res.status(200).json({ ok: true, pedido: await cargarPedido(pedidoId) });
}

/** KDS: mueve el estado de una línea (recibido → preparando → listo) y deriva el del pedido. */
async function cocinaEstado(req: VercelRequest, res: VercelResponse) {
  await exigir(req, ["COCINA"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  const estado = texto(b.estado);
  if (!pedidoId || !estado || !["recibido", "preparando", "listo", "entregado"].includes(estado)) throw new HttpError(400, "Datos inválidos.");

  if (estado === "entregado") {
    await sql`update pos_pedidos set estado = 'entregado' where id = ${pedidoId} and estado = 'listo'`;
    return res.status(200).json({ ok: true, pedido: await cargarPedido(pedidoId) });
  }
  const lineaId = texto(b.lineaId);
  if (lineaId) await sql`update pos_pedido_lineas set estado_cocina = ${estado} where id = ${lineaId} and pedido_id = ${pedidoId}`;
  else await sql`update pos_pedido_lineas set estado_cocina = ${estado} where pedido_id = ${pedidoId} and not anulada`;

  const { rows } = await sql`
    select count(*)::int as total, count(*) filter (where estado_cocina = 'listo')::int as listas,
           count(*) filter (where estado_cocina <> 'recibido')::int as iniciadas
    from pos_pedido_lineas where pedido_id = ${pedidoId} and not anulada and producto_id <> ${PRODUCTO_EMPAQUE_ID}
  `;
  const { total, listas, iniciadas } = rows[0] as { total: number; listas: number; iniciadas: number };
  const nuevo = total > 0 && listas === total ? "listo" : iniciadas > 0 ? "enPreparacion" : "enviadoCocina";
  await sql`
    update pos_pedidos set estado = ${nuevo}, listo_en = case when ${nuevo} = 'listo' then now() else listo_en end
    where id = ${pedidoId} and estado in ('enviadoCocina', 'enPreparacion', 'listo')
  `;
  return res.status(200).json({ ok: true, pedido: await cargarPedido(pedidoId) });
}

async function pagar(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, ["CAJA"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  const metodo = texto(b.metodo);
  if (!pedidoId || !metodo || !["efectivo", "tarjeta", "otro"].includes(metodo)) throw new HttpError(400, "Datos de pago inválidos.");
  const actual = await cargarPedido(pedidoId);
  if (actual.estado === "cancelado") throw new HttpError(409, "El pedido está cancelado.");
  if (actual.totales.saldoPendiente <= 0) throw new HttpError(409, "El pedido ya está pagado.");

  // El monto nunca excede el saldo: en efectivo, lo que sobra es cambio, no pago.
  const recibido = entero(b.recibido);
  const monto = Math.min(entero(b.monto) ?? actual.totales.saldoPendiente, actual.totales.saldoPendiente);
  if (monto < 1) throw new HttpError(400, "El monto debe ser mayor a cero.");
  if (metodo === "efectivo" && recibido !== null && recibido < monto) throw new HttpError(400, "El efectivo recibido no cubre el monto.");
  const propina = Math.max(entero(b.propina) ?? 0, 0);

  let franquicia: string | null = null;
  let tipoTarjeta: string | null = null;
  let ultimos4: string | null = null;
  if (metodo === "tarjeta") {
    franquicia = ["VISA", "MASTERCARD", "AMEX", "DINERS"].includes(String(b.franquicia)) ? String(b.franquicia) : null;
    tipoTarjeta = b.tipoTarjeta === "credito" ? "credito" : b.tipoTarjeta === "debito" ? "debito" : null;
    // Solo los últimos 4: nunca se guarda ni se acepta el número completo de la tarjeta.
    ultimos4 = typeof b.ultimos4 === "string" && /^\d{4}$/.test(b.ultimos4) ? b.ultimos4 : null;
    if (!franquicia || !tipoTarjeta) throw new HttpError(400, "Indica la franquicia y si es débito o crédito.");
  }

  await sql`
    insert into pos_pagos (pedido_id, metodo, monto, propina, franquicia, tipo_tarjeta, ultimos4, recibido, empleado_id)
    values (${pedidoId}, ${metodo}, ${monto}, ${propina}, ${franquicia}, ${tipoTarjeta}, ${ultimos4}, ${recibido}, ${actor.id})
  `;
  if (actual.totales.saldoPendiente - monto <= 0) {
    await sql`update pos_pedidos set cobrado_en = now() where id = ${pedidoId} and cobrado_en is null`;
  }
  const despues = await cargarPedido(pedidoId);
  return res.status(201).json({
    ok: true,
    pedido: despues,
    cambio: metodo === "efectivo" && recibido !== null ? Math.max(recibido - monto, 0) : 0,
  });
}

async function cancelar(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, ["CAJA"]);
  const b = req.body as Body;
  const pedidoId = texto(b.pedidoId);
  const motivo = texto(b.motivo);
  if (!pedidoId) throw new HttpError(400, "Falta el pedido.");
  if (!motivo) throw new HttpError(400, "El motivo de la cancelación es obligatorio.");
  const actual = await cargarPedido(pedidoId);
  if (actual.estado === "cancelado" || actual.estado === "entregado") throw new HttpError(409, "El pedido ya está cerrado.");
  // Cancelar un pedido ya cobrado equivale a un reembolso: solo un administrador.
  if (actual.totales.pagado > 0 && !actor.permisos.includes("ADMIN")) {
    throw new HttpError(403, "Cancelar un pedido ya cobrado requiere un administrador del POS.");
  }
  await sql`update pos_pedidos set estado = 'cancelado' where id = ${pedidoId}`;
  if (actual.totales.pagado > 0) await sql`update pos_pagos set estado = 'reembolsado' where pedido_id = ${pedidoId} and estado = 'aprobado'`;
  await auditar(actor, "cancelacion", `#${actual.numero}`, `Pedido cancelado${actual.totales.pagado > 0 ? ` (reembolsado $${actual.totales.pagado})` : ""}: ${motivo}`);
  return res.status(200).json({ ok: true, pedido: await cargarPedido(pedidoId) });
}

/** "86": marca un producto como agotado/disponible. */
async function productoDisponible(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, ["ADMIN"]);
  const b = req.body as Body;
  const productoId = texto(b.productoId);
  if (!productoId || typeof b.disponible !== "boolean") throw new HttpError(400, "Datos inválidos.");
  const { rows } = await sql`update pos_productos set disponible = ${b.disponible} where id = ${productoId} returning nombre`;
  if (!rows[0]) throw new HttpError(404, "Producto no encontrado.");
  await auditar(actor, "producto86", productoId, `${rows[0].nombre} marcado como ${b.disponible ? "disponible" : "agotado (86)"}.`);
  return res.status(200).json({ ok: true });
}

type Ruta = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

export const POS_GET: Record<string, Ruta> = {
  "pos-catalogo": catalogo,
  "pos-pedidos": pedidos,
  "pos-pedido": pedido,
};

export const POS_POST: Record<string, Ruta> = {
  "pos-pedido-crear": pedidoCrear,
  "pos-linea-agregar": lineaAgregar,
  "pos-linea-cambiar": lineaCambiar,
  "pos-para-llevar": paraLlevar,
  "pos-descuento": descuento,
  "pos-enviar-cocina": enviarCocina,
  "pos-cocina-estado": cocinaEstado,
  "pos-pagar": pagar,
  "pos-cancelar": cancelar,
  "pos-producto-disponible": productoDisponible,
};
