// ============================================================================
// API del módulo de Trazabilidad del café (única función serverless del
// módulo, para respetar el límite de 12 funciones del plan Hobby de Vercel).
// Se enruta por query string:
//
//   GET  /api/trazabilidad?r=publico&id=<loteEmpaqueId>   -> SIN sesión: ficha pública que abre el QR.
//   GET  /api/trazabilidad?r=resumen                      -> conteos + últimos lotes empacados.
//   GET  /api/trazabilidad?r=fincas[&id=]                 -> listado, o detalle de una finca.
//   GET  /api/trazabilidad?r=certificaciones | lotes-verdes[&id=] | fichas-cata | lotes-tostados | lotes-empaque[&id=]
//   GET  /api/trazabilidad?r=auditoria                    -> bitácora (solo ADMIN de trazabilidad).
//   POST /api/trazabilidad?r=crear-finca | crear-certificacion | crear-lote-verde | crear-ficha-cata | crear-lote-tostado | crear-lote-empaque
//   GET|POST /api/fincas  (rewrite de vercel.json -> ?r=gestion-fincas)  -> módulo Gestión Operativa.
//   ?r=tiendas | tienda-*  -> Gestión comercial (ver api/_lib/tiendas.ts).
//   ?r=pos-*  -> Sistema POS (ver api/_lib/pos.ts). Comparte esta función por el límite de 12 de Vercel Hobby.
//
// PERMISOS: por módulo (ver api/_lib/acceso.ts). 'ver' consulta todo; 'editar' registra en
// todas las etapas y ve la auditoría. Se asignan en Gestión de usuarios.
// ============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import QRCode from "qrcode";
import { sql } from "./_lib/db.js";
import { HttpError, manejarError, requireAuth } from "./_lib/auth.js";
import fincasGestion from "./_lib/fincasGestion.js";
import { cumple, permisosEfectivos, type Nivel, type PermisosModulos } from "./_lib/acceso.js";
import { POS_GET, POS_POST } from "./_lib/pos.js";
import { TIENDAS_GET, TIENDAS_POST } from "./_lib/tiendas.js";

type Fila = Record<string, unknown>;
type Body = Record<string, unknown>;

interface Actor {
  id: string;
  nombre: string;
  permisos: PermisosModulos;
}

function primero(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function texto(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function numero(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function entero(v: unknown): number | null {
  const n = numero(v);
  return n === null ? null : Math.round(n);
}

/** Acepta yyyy-MM-dd (lo que manda <input type="date">); cualquier otra cosa se descarta. */
function fecha(v: unknown): string | null {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
}

async function cargarActor(req: VercelRequest): Promise<Actor> {
  const { empleadoId } = await requireAuth(req);
  const { rows } = await sql<{ nombre: string; correo: string; estado: string; permisos_modulos: unknown }>`
    select nombre, correo, estado, permisos_modulos from empleados where id = ${empleadoId} limit 1
  `;
  const fila = rows[0];
  if (!fila || fila.estado !== "activo") throw new HttpError(401, "La sesión ya no es válida.");
  return { id: empleadoId, nombre: fila.nombre, permisos: permisosEfectivos(fila) };
}

/** Exige el nivel pedido en el módulo de trazabilidad: 'ver' para consultar, 'editar' para registrar. */
async function exigir(req: VercelRequest, nivel: Nivel = "ver"): Promise<Actor> {
  const actor = await cargarActor(req);
  if (!cumple(actor.permisos, "trazabilidad", nivel)) {
    throw new HttpError(403, nivel === "editar" ? "No tienes permiso de edición en trazabilidad." : "No tienes acceso al módulo de trazabilidad.");
  }
  return actor;
}

async function auditar(actor: Actor, entidad: string, entidadId: string, resumen: string) {
  await sql`
    insert into traz_auditoria (empleado_id, usuario_nombre, entidad, entidad_id, accion, resumen)
    values (${actor.id}, ${actor.nombre}, ${entidad}, ${entidadId}, 'crear', ${resumen})
  `;
}

// ---------------------------------------------------------------------------
// Mapeos fila (snake_case) -> JSON camelCase
// ---------------------------------------------------------------------------

function mapFinca(f: Fila) {
  return {
    id: f.id,
    nombre: f.nombre,
    identificadorProductor: f.identificador_productor,
    latitud: f.latitud,
    longitud: f.longitud,
    altitudMsnm: f.altitud_msnm,
    region: f.region,
    variedad: f.variedad,
    tipoRecoleccion: f.tipo_recoleccion,
    creadoEn: f.creado_en,
  };
}

function mapLoteVerde(l: Fila) {
  return {
    id: l.id,
    fincaId: l.finca_id,
    fincaNombre: l.finca_nombre ?? null,
    tipoProceso: l.tipo_proceso,
    fechaFermentacion: l.fecha_fermentacion,
    fechaSecado: l.fecha_secado,
    humedadFinalPct: l.humedad_final_pct,
    responsableCalidad: l.responsable_calidad,
    fechaTrilla: l.fecha_trilla,
    clasificacion: l.clasificacion,
    loteExportacion: l.lote_exportacion,
    transporte: l.transporte,
    fotoSecadoUrl: l.foto_secado_url,
    creadoEn: l.creado_en,
  };
}

function mapCertificacion(c: Fila) {
  return {
    id: c.id,
    fincaId: c.finca_id ?? null,
    fincaNombre: c.finca_nombre ?? null,
    nombre: c.nombre,
    entidadCertificadora: c.entidad_certificadora,
    urlVerificacion: c.url_verificacion,
    certificadoUrl: c.certificado_url,
    fechaEmision: c.fecha_emision,
    fechaVencimiento: c.fecha_vencimiento,
  };
}

function mapEmpaque(e: Fila) {
  return {
    id: e.id,
    loteTostadoId: e.lote_tostado_id,
    perfilTueste: e.perfil_tueste,
    fechaEmpaque: e.fecha_empaque,
    loteComercial: e.lote_comercial,
    fechaVencimiento: e.fecha_vencimiento,
    presentacion: e.presentacion,
    qrDataUrl: e.qr_data_url,
  };
}

// ---------------------------------------------------------------------------
// Lecturas
// ---------------------------------------------------------------------------

async function publico(req: VercelRequest, res: VercelResponse) {
  const id = primero(req.query.id);
  if (!id) throw new HttpError(400, "Falta el id del lote.");

  const { rows: empaques } = await sql`
    select id, lote_tostado_id, fecha_empaque::text as fecha_empaque, lote_comercial,
           fecha_vencimiento::text as fecha_vencimiento, presentacion
    from traz_lotes_empaque where id = ${id} limit 1
  `;
  const empaque = empaques[0];
  if (!empaque) throw new HttpError(404, "Lote no encontrado.");

  const { rows: tostados } = await sql`
    select fecha::text as fecha, perfil_tueste, maestro_tostador from traz_lotes_tostados where id = ${empaque.lote_tostado_id} limit 1
  `;
  const { rows: origenes } = await sql`
    select cb.id as componente_id, lv.id as lote_verde_id, lv.tipo_proceso, lv.humedad_final_pct,
           lv.fecha_secado::text as fecha_secado, lv.foto_secado_url,
           f.id as finca_id, f.nombre as finca_nombre, f.region, f.variedad, f.altitud_msnm, f.latitud, f.longitud
    from traz_componentes_blend cb
    join traz_lotes_verdes lv on lv.id = cb.lote_verde_id
    join traz_fincas f on f.id = lv.finca_id
    where cb.lote_tostado_id = ${empaque.lote_tostado_id}
    order by f.nombre
  `;
  const fincaIds = origenes.map((o) => o.finca_id as string);
  const loteIds = origenes.map((o) => o.lote_verde_id as string);
  const { rows: certs } = fincaIds.length
    ? await sql`select id, finca_id, nombre, certificado_url, url_verificacion from traz_certificaciones where finca_id = any(${fincaIds as unknown as string})`
    : { rows: [] as Fila[] };
  const { rows: catas } = loteIds.length
    ? await sql`select id, lote_verde_id, acidez, cuerpo, dulzor, notas from traz_fichas_cata where lote_verde_id = any(${loteIds as unknown as string})`
    : { rows: [] as Fila[] };

  return res.status(200).json({
    ok: true,
    lote: {
      id: empaque.id,
      loteComercial: empaque.lote_comercial,
      presentacion: empaque.presentacion,
      fechaEmpaque: empaque.fecha_empaque,
      fechaVencimiento: empaque.fecha_vencimiento,
      tueste: tostados[0]
        ? { perfilTueste: tostados[0].perfil_tueste, maestroTostador: tostados[0].maestro_tostador, fecha: tostados[0].fecha }
        : null,
      origenes: origenes.map((o) => ({
        id: o.componente_id,
        finca: {
          id: o.finca_id,
          nombre: o.finca_nombre,
          region: o.region,
          variedad: o.variedad,
          altitudMsnm: o.altitud_msnm,
          latitud: o.latitud,
          longitud: o.longitud,
        },
        tipoProceso: o.tipo_proceso,
        humedadFinalPct: o.humedad_final_pct,
        fechaSecado: o.fecha_secado,
        fotoSecadoUrl: o.foto_secado_url,
        certificaciones: certs
          .filter((c) => c.finca_id === o.finca_id)
          .map((c) => ({ id: c.id, nombre: c.nombre, url: c.certificado_url ?? c.url_verificacion ?? null })),
        fichasCata: catas
          .filter((c) => c.lote_verde_id === o.lote_verde_id)
          .map((c) => ({ id: c.id, acidez: c.acidez, cuerpo: c.cuerpo, dulzor: c.dulzor, notas: c.notas })),
      })),
    },
  });
}

async function resumen(req: VercelRequest, res: VercelResponse) {
  await exigir(req);
  const { rows: conteos } = await sql`
    select (select count(*)::int from traz_fincas) as fincas,
           (select count(*)::int from traz_lotes_verdes) as lotes_verdes,
           (select count(*)::int from traz_lotes_tostados) as lotes_tostados,
           (select count(*)::int from traz_lotes_empaque) as lotes_empaque
  `;
  const { rows: ultimos } = await sql`
    select id, lote_comercial, presentacion from traz_lotes_empaque order by creado_en desc limit 10
  `;
  const c = conteos[0];
  return res.status(200).json({
    ok: true,
    conteos: { fincas: c.fincas, lotesVerdes: c.lotes_verdes, lotesTostados: c.lotes_tostados, lotesEmpaque: c.lotes_empaque },
    ultimosEmpaques: ultimos.map((u) => ({ id: u.id, loteComercial: u.lote_comercial, presentacion: u.presentacion })),
  });
}

async function fincas(req: VercelRequest, res: VercelResponse) {
  await exigir(req);
  const id = primero(req.query.id);
  if (!id) {
    const { rows } = await sql`select * from traz_fincas order by creado_en desc`;
    return res.status(200).json({ ok: true, fincas: rows.map(mapFinca) });
  }
  const { rows } = await sql`select * from traz_fincas where id = ${id} limit 1`;
  if (!rows[0]) throw new HttpError(404, "Finca no encontrada.");
  const { rows: certs } = await sql`
    select id, nombre, entidad_certificadora, url_verificacion, certificado_url, fecha_emision::text as fecha_emision,
           fecha_vencimiento::text as fecha_vencimiento
    from traz_certificaciones where finca_id = ${id} order by creado_en desc
  `;
  const { rows: lotes } = await sql`
    select lv.id, lv.finca_id, f.nombre as finca_nombre, lv.tipo_proceso, lv.fecha_fermentacion::text as fecha_fermentacion,
      lv.fecha_secado::text as fecha_secado, lv.humedad_final_pct, lv.responsable_calidad, lv.fecha_trilla::text as fecha_trilla,
      lv.clasificacion, lv.lote_exportacion, lv.transporte, lv.foto_secado_url, lv.creado_en
    from traz_lotes_verdes lv join traz_fincas f on f.id = lv.finca_id where lv.finca_id = ${id} order by lv.creado_en desc
  `;
  return res.status(200).json({
    ok: true,
    finca: mapFinca(rows[0]),
    certificaciones: certs.map(mapCertificacion),
    lotesVerdes: lotes.map(mapLoteVerde),
  });
}

async function certificaciones(req: VercelRequest, res: VercelResponse) {
  await exigir(req);
  const { rows } = await sql`
    select c.id, c.finca_id, f.nombre as finca_nombre, c.nombre, c.entidad_certificadora, c.url_verificacion, c.certificado_url,
           c.fecha_emision::text as fecha_emision, c.fecha_vencimiento::text as fecha_vencimiento
    from traz_certificaciones c join traz_fincas f on f.id = c.finca_id order by c.creado_en desc
  `;
  return res.status(200).json({ ok: true, certificaciones: rows.map(mapCertificacion) });
}

async function lotesVerdes(req: VercelRequest, res: VercelResponse) {
  await exigir(req);
  const id = primero(req.query.id);
  if (id) {
    const { rows } = await sql`
      select lv.id, lv.finca_id, f.nombre as finca_nombre, lv.tipo_proceso, lv.fecha_fermentacion::text as fecha_fermentacion,
        lv.fecha_secado::text as fecha_secado, lv.humedad_final_pct, lv.responsable_calidad, lv.fecha_trilla::text as fecha_trilla,
        lv.clasificacion, lv.lote_exportacion, lv.transporte, lv.foto_secado_url, lv.creado_en
      from traz_lotes_verdes lv join traz_fincas f on f.id = lv.finca_id where lv.id = ${id}
    `;
    if (!rows[0]) throw new HttpError(404, "Lote verde no encontrado.");
    const { rows: catas } = await sql`
      select id, catador, fecha::text as fecha, acidez, cuerpo, dulzor, notas from traz_fichas_cata where lote_verde_id = ${id} order by creado_en desc
    `;
    return res.status(200).json({ ok: true, loteVerde: mapLoteVerde(rows[0]), fichasCata: catas });
  }
  const { rows } = await sql`
    select lv.id, lv.finca_id, f.nombre as finca_nombre, lv.tipo_proceso, lv.fecha_fermentacion::text as fecha_fermentacion,
      lv.fecha_secado::text as fecha_secado, lv.humedad_final_pct, lv.responsable_calidad, lv.fecha_trilla::text as fecha_trilla,
      lv.clasificacion, lv.lote_exportacion, lv.transporte, lv.foto_secado_url, lv.creado_en
    from traz_lotes_verdes lv join traz_fincas f on f.id = lv.finca_id order by lv.creado_en desc
  `;
  return res.status(200).json({ ok: true, lotesVerdes: rows.map(mapLoteVerde) });
}

async function fichasCata(req: VercelRequest, res: VercelResponse) {
  await exigir(req);
  const { rows } = await sql`
    select fc.id, fc.lote_verde_id, f.nombre as finca_nombre, fc.catador, fc.fecha::text as fecha, fc.acidez, fc.cuerpo, fc.dulzor, fc.notas
    from traz_fichas_cata fc
    join traz_lotes_verdes lv on lv.id = fc.lote_verde_id
    join traz_fincas f on f.id = lv.finca_id
    order by fc.creado_en desc
  `;
  return res.status(200).json({
    ok: true,
    fichasCata: rows.map((r) => ({
      id: r.id,
      loteVerdeId: r.lote_verde_id,
      fincaNombre: r.finca_nombre,
      catador: r.catador,
      fecha: r.fecha,
      acidez: r.acidez,
      cuerpo: r.cuerpo,
      dulzor: r.dulzor,
      notas: r.notas,
    })),
  });
}

async function lotesTostados(req: VercelRequest, res: VercelResponse) {
  await exigir(req);
  const { rows } = await sql`
    select t.id, t.fecha::text as fecha, t.perfil_tueste, t.curva_tueste, t.maestro_tostador,
      coalesce((select json_agg(json_build_object('loteVerdeId', cb.lote_verde_id, 'fincaNombre', f.nombre, 'kilogramos', cb.kilogramos))
        from traz_componentes_blend cb join traz_lotes_verdes lv on lv.id = cb.lote_verde_id join traz_fincas f on f.id = lv.finca_id
        where cb.lote_tostado_id = t.id), '[]'::json) as componentes
    from traz_lotes_tostados t order by t.creado_en desc
  `;
  return res.status(200).json({
    ok: true,
    lotesTostados: rows.map((t) => ({
      id: t.id,
      fecha: t.fecha,
      perfilTueste: t.perfil_tueste,
      curvaTueste: t.curva_tueste,
      maestroTostador: t.maestro_tostador,
      componentes: t.componentes,
    })),
  });
}

async function lotesEmpaque(req: VercelRequest, res: VercelResponse) {
  await exigir(req);
  const id = primero(req.query.id);
  if (id) {
    const { rows } = await sql`
      select e.id, e.lote_tostado_id, t.perfil_tueste, e.fecha_empaque::text as fecha_empaque, e.lote_comercial,
             e.fecha_vencimiento::text as fecha_vencimiento, e.presentacion, e.qr_data_url
      from traz_lotes_empaque e join traz_lotes_tostados t on t.id = e.lote_tostado_id where e.id = ${id}
    `;
    if (!rows[0]) throw new HttpError(404, "Lote de empaque no encontrado.");
    return res.status(200).json({ ok: true, loteEmpaque: mapEmpaque(rows[0]) });
  }
  // El PNG del QR (base64) es pesado: no viaja en el listado, solo en el detalle.
  const { rows } = await sql`
    select e.id, e.lote_tostado_id, t.perfil_tueste, e.fecha_empaque::text as fecha_empaque, e.lote_comercial,
           e.fecha_vencimiento::text as fecha_vencimiento, e.presentacion, null::text as qr_data_url
    from traz_lotes_empaque e join traz_lotes_tostados t on t.id = e.lote_tostado_id order by e.creado_en desc
  `;
  return res.status(200).json({ ok: true, lotesEmpaque: rows.map(mapEmpaque) });
}

async function auditoria(req: VercelRequest, res: VercelResponse) {
  await exigir(req, "editar");
  const { rows } = await sql`
    select id, usuario_nombre, entidad, resumen, creado_en from traz_auditoria order by creado_en desc limit 200
  `;
  return res.status(200).json({
    ok: true,
    registros: rows.map((r) => ({ id: r.id, usuarioNombre: r.usuario_nombre, entidad: r.entidad, resumen: r.resumen, creadoEn: r.creado_en })),
  });
}

// ---------------------------------------------------------------------------
// Escrituras (siempre solo "crear": los registros nunca se editan ni se borran)
// ---------------------------------------------------------------------------

async function crearFinca(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, "editar");
  const b = req.body as Body;
  const nombre = texto(b.nombre);
  if (!nombre) throw new HttpError(400, "El nombre de la finca es obligatorio.");
  const { rows } = await sql`
    insert into traz_fincas (nombre, identificador_productor, latitud, longitud, altitud_msnm, region, variedad, tipo_recoleccion)
    values (${nombre}, ${texto(b.identificadorProductor)}, ${numero(b.latitud)}, ${numero(b.longitud)}, ${entero(b.altitudMsnm)},
            ${texto(b.region)}, ${texto(b.variedad)}, ${texto(b.tipoRecoleccion)})
    returning id
  `;
  await auditar(actor, "Finca", rows[0].id, `Finca "${nombre}" registrada.`);
  return res.status(201).json({ ok: true, id: rows[0].id });
}

async function crearCertificacion(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, "editar");
  const b = req.body as Body;
  const fincaId = texto(b.fincaId);
  const nombre = texto(b.nombre);
  if (!fincaId) throw new HttpError(400, "Selecciona una finca.");
  if (!nombre) throw new HttpError(400, "El nombre de la certificación es obligatorio.");
  const { rows } = await sql`
    insert into traz_certificaciones (finca_id, nombre, entidad_certificadora, url_verificacion, certificado_url, fecha_emision, fecha_vencimiento)
    values (${fincaId}, ${nombre}, ${texto(b.entidadCertificadora)}, ${texto(b.urlVerificacion)}, ${texto(b.certificadoUrl)},
            ${fecha(b.fechaEmision)}, ${fecha(b.fechaVencimiento)})
    returning id
  `;
  await auditar(actor, "Certificacion", rows[0].id, `Certificación "${nombre}" registrada para la finca.`);
  return res.status(201).json({ ok: true, id: rows[0].id });
}

async function crearLoteVerde(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, "editar");
  const b = req.body as Body;
  const fincaId = texto(b.fincaId);
  if (!fincaId) throw new HttpError(400, "Selecciona una finca de origen.");
  const { rows } = await sql`
    insert into traz_lotes_verdes (finca_id, tipo_proceso, fecha_fermentacion, fecha_secado, humedad_final_pct, responsable_calidad,
      fecha_trilla, clasificacion, lote_exportacion, transporte, foto_secado_url)
    values (${fincaId}, ${texto(b.tipoProceso)}, ${fecha(b.fechaFermentacion)}, ${fecha(b.fechaSecado)}, ${numero(b.humedadFinalPct)},
      ${texto(b.responsableCalidad)}, ${fecha(b.fechaTrilla)}, ${texto(b.clasificacion)}, ${texto(b.loteExportacion)},
      ${texto(b.transporte)}, ${texto(b.fotoSecadoUrl)})
    returning id
  `;
  await auditar(actor, "LoteVerde", rows[0].id, "Lote verde registrado (beneficiado + trilla).");
  return res.status(201).json({ ok: true, id: rows[0].id });
}

async function crearFichaCata(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, "editar");
  const b = req.body as Body;
  const loteVerdeId = texto(b.loteVerdeId);
  if (!loteVerdeId) throw new HttpError(400, "Selecciona el lote verde catado.");
  const { rows } = await sql`
    insert into traz_fichas_cata (lote_verde_id, catador, fecha, acidez, cuerpo, dulzor, notas)
    values (${loteVerdeId}, ${texto(b.catador)}, ${fecha(b.fecha)}, ${entero(b.acidez)}, ${entero(b.cuerpo)}, ${entero(b.dulzor)}, ${texto(b.notas)})
    returning id
  `;
  await auditar(actor, "FichaCata", rows[0].id, "Ficha de cata registrada.");
  return res.status(201).json({ ok: true, id: rows[0].id });
}

async function crearLoteTostado(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, "editar");
  const b = req.body as Body;
  const componentes = Array.isArray(b.componentes) ? (b.componentes as Body[]) : [];
  const validos = componentes.filter((c) => texto(c.loteVerdeId));
  if (validos.length === 0) throw new HttpError(400, "Selecciona al menos un lote verde para el tueste.");

  const { rows } = await sql`
    insert into traz_lotes_tostados (fecha, perfil_tueste, curva_tueste, maestro_tostador)
    values (${fecha(b.fecha)}, ${texto(b.perfilTueste)}, ${texto(b.curvaTueste)}, ${texto(b.maestroTostador)})
    returning id
  `;
  const id = rows[0].id as string;
  for (const c of validos) {
    await sql`
      insert into traz_componentes_blend (lote_tostado_id, lote_verde_id, kilogramos)
      values (${id}, ${texto(c.loteVerdeId)}, ${numero(c.kilogramos)})
      on conflict (lote_tostado_id, lote_verde_id) do nothing
    `;
  }
  await auditar(
    actor,
    "LoteTostado",
    id,
    validos.length > 1 ? `Lote tostado registrado como blend de ${validos.length} lotes verdes.` : "Lote tostado registrado (origen único).",
  );
  return res.status(201).json({ ok: true, id });
}

async function crearLoteEmpaque(req: VercelRequest, res: VercelResponse) {
  const actor = await exigir(req, "editar");
  const b = req.body as Body;
  const loteTostadoId = texto(b.loteTostadoId);
  if (!loteTostadoId) throw new HttpError(400, "Selecciona el lote tostado de origen.");

  const { rows } = await sql`
    insert into traz_lotes_empaque (lote_tostado_id, fecha_empaque, lote_comercial, fecha_vencimiento, presentacion)
    values (${loteTostadoId}, ${fecha(b.fechaEmpaque)}, ${texto(b.loteComercial)}, ${fecha(b.fechaVencimiento)}, ${texto(b.presentacion)})
    returning id
  `;
  const id = rows[0].id as string;

  // El QR se genera DESPUÉS de tener el id real (no adivinable) del lote,
  // porque la URL pública lo necesita: https://<host>/lote/<id>.
  const host = req.headers.host ?? "localhost:3000";
  const protocolo = host.startsWith("localhost") ? "http" : "https";
  const qr = await QRCode.toDataURL(`${protocolo}://${host}/lote/${id}`, {
    margin: 1,
    width: 320,
    color: { dark: "#3B2020", light: "#F7F1E6" },
  });
  await sql`update traz_lotes_empaque set qr_data_url = ${qr} where id = ${id}`;

  await auditar(actor, "LoteEmpaque", id, "Lote de empaque registrado y QR generado.");
  return res.status(201).json({ ok: true, id });
}

// ---------------------------------------------------------------------------

type Ruta = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

const GET_RUTAS: Record<string, Ruta> = {
  publico,
  resumen,
  fincas,
  certificaciones,
  "lotes-verdes": lotesVerdes,
  "fichas-cata": fichasCata,
  "lotes-tostados": lotesTostados,
  "lotes-empaque": lotesEmpaque,
  auditoria,
  "gestion-fincas": fincasGestion,
  ...POS_GET,
  ...TIENDAS_GET,
};

const POST_RUTAS: Record<string, Ruta> = {
  "crear-finca": crearFinca,
  "crear-certificacion": crearCertificacion,
  "crear-lote-verde": crearLoteVerde,
  "crear-ficha-cata": crearFichaCata,
  "crear-lote-tostado": crearLoteTostado,
  "crear-lote-empaque": crearLoteEmpaque,
  "gestion-fincas": fincasGestion,
  ...POS_POST,
  ...TIENDAS_POST,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const r = primero(req.query.r) ?? "";
    const tabla = req.method === "GET" ? GET_RUTAS : req.method === "POST" ? POST_RUTAS : null;
    if (!tabla) {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).json({ ok: false, mensaje: "Método no permitido." });
    }
    const ruta = tabla[r];
    if (!ruta) throw new HttpError(404, "Ruta de trazabilidad desconocida.");
    return await ruta(req, res);
  } catch (err) {
    return manejarError(res, err);
  }
}
