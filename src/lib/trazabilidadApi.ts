// Cliente HTTP del módulo de Trazabilidad (ver api/trazabilidad.ts). Se habla
// siempre con el backend real: el módulo no tiene datos de demostración.

export interface FincaTraz {
  id: string;
  nombre: string;
  identificadorProductor: string | null;
  latitud: number | null;
  longitud: number | null;
  altitudMsnm: number | null;
  region: string | null;
  variedad: string | null;
  tipoRecoleccion: string | null;
  creadoEn: string;
}

export interface CertificacionTraz {
  id: string;
  fincaId: string | null;
  fincaNombre: string | null;
  nombre: string;
  entidadCertificadora: string | null;
  urlVerificacion: string | null;
  certificadoUrl: string | null;
  fechaEmision: string | null;
  fechaVencimiento: string | null;
}

export interface LoteVerdeTraz {
  id: string;
  fincaId: string;
  fincaNombre: string | null;
  tipoProceso: string | null;
  fechaFermentacion: string | null;
  fechaSecado: string | null;
  humedadFinalPct: number | null;
  responsableCalidad: string | null;
  fechaTrilla: string | null;
  clasificacion: string | null;
  loteExportacion: string | null;
  transporte: string | null;
  fotoSecadoUrl: string | null;
  creadoEn: string;
}

export interface FichaCataTraz {
  id: string;
  loteVerdeId?: string;
  fincaNombre?: string;
  catador: string | null;
  fecha: string | null;
  acidez: number | null;
  cuerpo: number | null;
  dulzor: number | null;
  notas: string | null;
}

export interface LoteTostadoTraz {
  id: string;
  fecha: string | null;
  perfilTueste: string | null;
  curvaTueste: string | null;
  maestroTostador: string | null;
  componentes: { loteVerdeId: string; fincaNombre: string; kilogramos: number | null }[];
}

export interface LoteEmpaqueTraz {
  id: string;
  loteTostadoId: string;
  perfilTueste: string | null;
  fechaEmpaque: string | null;
  loteComercial: string | null;
  fechaVencimiento: string | null;
  presentacion: string | null;
  qrDataUrl: string | null;
}

export interface RegistroAuditoriaTraz {
  id: string;
  usuarioNombre: string;
  entidad: string;
  resumen: string;
  creadoEn: string;
}

export interface LotePublico {
  id: string;
  loteComercial: string | null;
  presentacion: string | null;
  fechaEmpaque: string | null;
  fechaVencimiento: string | null;
  tueste: { perfilTueste: string | null; maestroTostador: string | null; fecha: string | null } | null;
  origenes: {
    id: string;
    finca: { id: string; nombre: string; region: string | null; variedad: string | null; altitudMsnm: number | null; latitud: number | null; longitud: number | null };
    tipoProceso: string | null;
    humedadFinalPct: number | null;
    fechaSecado: string | null;
    fotoSecadoUrl: string | null;
    certificaciones: { id: string; nombre: string; url: string | null }[];
    fichasCata: FichaCataTraz[];
  }[];
}

export class TrazError extends Error {
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
  if (!respuesta.ok || !payload?.ok) {
    throw new TrazError(respuesta.status, payload?.mensaje ?? `Error ${respuesta.status} consultando trazabilidad.`);
  }
  return payload;
}

export const trazabilidadApi = {
  resumen: () =>
    llamar<{
      conteos: { fincas: number; lotesVerdes: number; lotesTostados: number; lotesEmpaque: number };
      ultimosEmpaques: { id: string; loteComercial: string | null; presentacion: string | null }[];
    }>("resumen"),
  fincas: () => llamar<{ fincas: FincaTraz[] }>("fincas").then((d) => d.fincas),
  finca: (id: string) =>
    llamar<{ finca: FincaTraz; certificaciones: CertificacionTraz[]; lotesVerdes: LoteVerdeTraz[] }>("fincas", { id }),
  certificaciones: () => llamar<{ certificaciones: CertificacionTraz[] }>("certificaciones").then((d) => d.certificaciones),
  lotesVerdes: () => llamar<{ lotesVerdes: LoteVerdeTraz[] }>("lotes-verdes").then((d) => d.lotesVerdes),
  loteVerde: (id: string) => llamar<{ loteVerde: LoteVerdeTraz; fichasCata: FichaCataTraz[] }>("lotes-verdes", { id }),
  fichasCata: () => llamar<{ fichasCata: FichaCataTraz[] }>("fichas-cata").then((d) => d.fichasCata),
  lotesTostados: () => llamar<{ lotesTostados: LoteTostadoTraz[] }>("lotes-tostados").then((d) => d.lotesTostados),
  lotesEmpaque: () => llamar<{ lotesEmpaque: LoteEmpaqueTraz[] }>("lotes-empaque").then((d) => d.lotesEmpaque),
  loteEmpaque: (id: string) => llamar<{ loteEmpaque: LoteEmpaqueTraz }>("lotes-empaque", { id }).then((d) => d.loteEmpaque),
  auditoria: () => llamar<{ registros: RegistroAuditoriaTraz[] }>("auditoria").then((d) => d.registros),
  publico: (id: string) => llamar<{ lote: LotePublico }>("publico", { id }).then((d) => d.lote),

  crear: (tipo: "finca" | "certificacion" | "lote-verde" | "ficha-cata" | "lote-tostado" | "lote-empaque", datos: unknown) =>
    llamar<{ id: string }>(`crear-${tipo}`, {}, datos).then((d) => d.id),

  /** Sube evidencia (foto/PDF) a Vercel Blob; reutiliza el endpoint de subida del portal. */
  async subirArchivo(archivo: File): Promise<string> {
    const respuesta = await fetch(`/api/auth/me?subirArchivo=1&nombre=${encodeURIComponent(archivo.name)}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": archivo.type || "application/octet-stream" },
      body: archivo,
    });
    const payload = (await respuesta.json().catch(() => null)) as { ok: boolean; url?: string; mensaje?: string } | null;
    if (!respuesta.ok || !payload?.ok || !payload.url) {
      throw new TrazError(respuesta.status, payload?.mensaje ?? `Error ${respuesta.status} subiendo el archivo.`);
    }
    return payload.url;
  },
};

/** yyyy-MM-dd -> "12 sep 2026" sin pasar por Date (evita el desfase de zona horaria). */
export function fmtFecha(f: string | null | undefined, largo = false): string | null {
  if (!f) return null;
  const [y, m, d] = f.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", { year: "numeric", month: largo ? "long" : "short", day: "numeric" });
}
