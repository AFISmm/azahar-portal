// ============================================================================
// Importación de archivos de Gestión Contable: sugerencia de a qué módulo debe ir la información.
//
// Con GEMINI_API_KEY (la misma del chatbot) la sugerencia la da la IA a partir del nombre del archivo, los
// encabezados y una muestra de filas; si el archivo es PDF o imagen, la IA además lo lee y extrae las filas.
// Sin la llave, o si la IA falla, se usan reglas por palabras clave (modo "reglas"): la importación nunca queda
// bloqueada. A la IA solo se le envía una MUESTRA (máx. 15 filas), no el archivo completo de tablas.
// ============================================================================

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

/** Campos que cada destino entiende (el * = obligatorio). El usuario puede ajustar a qué columna corresponde cada uno. */
export const CAMPOS: Record<Destino, { clave: string; etiqueta: string; obligatorio?: boolean }[]> = {
  extracto: [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true },
    { clave: "descripcion", etiqueta: "Descripción" },
    { clave: "debito", etiqueta: "Débito / cargo" },
    { clave: "credito", etiqueta: "Crédito / abono" },
    { clave: "saldo", etiqueta: "Saldo" },
    { clave: "cuenta", etiqueta: "Cuenta contable" },
  ],
  "factura-compra": [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true },
    { clave: "numero", etiqueta: "Número de factura", obligatorio: true },
    { clave: "tercero", etiqueta: "Proveedor" },
    { clave: "nit", etiqueta: "NIT" },
    { clave: "total", etiqueta: "Total", obligatorio: true },
    { clave: "retefuente", etiqueta: "Retefuente" },
    { clave: "reteica", etiqueta: "Reteica" },
    { clave: "reteiva", etiqueta: "Reteiva" },
  ],
  "factura-venta": [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true },
    { clave: "numero", etiqueta: "Número de factura", obligatorio: true },
    { clave: "tercero", etiqueta: "Cliente" },
    { clave: "nit", etiqueta: "NIT" },
    { clave: "total", etiqueta: "Total", obligatorio: true },
  ],
  comprobante: [
    { clave: "fecha", etiqueta: "Fecha", obligatorio: true },
    { clave: "numero", etiqueta: "Número de comprobante" },
    { clave: "descripcion", etiqueta: "Descripción" },
    { clave: "cuenta", etiqueta: "Cuenta contable" },
    { clave: "debito", etiqueta: "Débito" },
    { clave: "credito", etiqueta: "Crédito" },
    { clave: "tercero", etiqueta: "Tercero" },
    { clave: "nit", etiqueta: "NIT" },
  ],
  tercero: [
    { clave: "nit", etiqueta: "NIT / identificación", obligatorio: true },
    { clave: "nombre", etiqueta: "Nombre o razón social", obligatorio: true },
    { clave: "tipo", etiqueta: "Tipo (cliente / proveedor)" },
    { clave: "direccion", etiqueta: "Dirección" },
    { clave: "telefono", etiqueta: "Teléfono" },
    { clave: "correo", etiqueta: "Correo" },
  ],
  catalogo: [
    { clave: "nombre", etiqueta: "Nombre del producto o servicio", obligatorio: true },
    { clave: "sku", etiqueta: "SKU / referencia" },
    { clave: "precio", etiqueta: "Precio" },
    { clave: "iva", etiqueta: "IVA" },
    { clave: "categoria", etiqueta: "Categoría" },
    { clave: "unidad", etiqueta: "Unidad de medida" },
  ],
};

export interface EntradaSugerir {
  nombre: string;
  formato: string;
  encabezados: string[];
  muestra: Record<string, string>[];
  /** Solo PDF e imágenes: el archivo en base64 (máx. ~3,5 MB) y su tipo MIME. */
  archivoBase64?: string;
  mime?: string;
}

export interface Sugerencia {
  destino: Destino;
  confianza: number;
  motivo: string;
  modo: "ia" | "reglas";
  /** Solo cuando la IA leyó un PDF o una imagen: lo que extrajo (hay que revisarlo). */
  extraido?: { encabezados: string[]; filas: Record<string, string>[] };
}

const quitarAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const PALABRAS: Record<Destino, string[]> = {
  tercero: ["nit", "razon social", "nombre", "direccion", "telefono", "correo", "email", "tipo persona", "cliente/proveedor", "tercero", "identificacion", "cedula"],
  extracto: ["extracto", "debito", "credito", "cargo", "abono", "saldo", "descripcion", "banco", "movimiento", "consignacion", "transferencia"],
  "factura-compra": ["proveedor", "factura", "compra", "retefuente", "reteica", "reteiva", "retencion", "iva descontable", "orden de compra"],
  "factura-venta": ["cliente", "factura", "venta", "prefijo", "medio de pago", "fecha de emision", "total factura", "iva generado", "pos"],
  comprobante: ["comprobante", "cuenta", "debe", "haber", "debito", "credito", "asiento", "nota contable", "puc", "tercero", "journal"],
  catalogo: ["sku", "precio", "producto", "referencia", "iva", "categoria", "unidad", "inventario", "servicio", "item"],
};

/** Sugerencia por palabras clave en el nombre del archivo y los encabezados. Siempre devuelve algo. */
export function sugerirPorReglas(e: EntradaSugerir): Sugerencia {
  const nombre = quitarAcentos(e.nombre);
  const encabezados = e.encabezados.map(quitarAcentos);
  const puntos = {} as Record<Destino, number>;
  for (const d of DESTINOS) {
    let p = 0;
    for (const palabra of PALABRAS[d]) {
      if (encabezados.some((h) => h.includes(palabra))) p += 2;
      if (nombre.includes(palabra)) p += 1;
    }
    puntos[d] = p;
  }
  // desempates frecuentes
  const tiene = (...ps: string[]) => ps.some((p) => encabezados.some((h) => h.includes(p)));
  if (tiene("proveedor")) puntos["factura-compra"] += 2;
  if (tiene("cliente") && tiene("factura")) puntos["factura-venta"] += 2;
  if (tiene("sku", "precio")) puntos.catalogo += 2;
  if (tiene("nit") && tiene("nombre", "razon social") && !tiene("factura", "debito", "credito")) puntos.tercero += 3;
  if (tiene("saldo") && tiene("debito", "credito", "cargo", "abono")) puntos.extracto += 2;
  if (tiene("cuenta") && tiene("debito", "debe") && tiene("credito", "haber") && !tiene("saldo")) puntos.comprobante += 3;
  const orden = [...DESTINOS].sort((a, b) => puntos[b] - puntos[a]);
  const mejor = orden[0];
  const segundo = orden[1];
  const total = Math.max(1, puntos[mejor] + puntos[segundo]);
  const hayDatos = puntos[mejor] > 0;
  return {
    destino: hayDatos ? mejor : "comprobante",
    confianza: hayDatos ? Math.min(0.9, 0.35 + (puntos[mejor] / total) * 0.5) : 0.1,
    motivo: hayDatos
      ? `Por las palabras de los encabezados y del nombre del archivo, se parece más a "${DESTINO_NOMBRE[mejor]}".`
      : "No se reconocieron encabezados conocidos; elige el destino manualmente.",
    modo: "reglas",
  };
}

interface RespuestaGemini {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
}

const MODELO = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

function instrucciones(soloClasificar: boolean): string {
  const lista = DESTINOS.map((d) => `- "${d}": ${DESTINO_NOMBRE[d]}`).join("\n");
  const campos = DESTINOS.map((d) => `- ${d}: ${CAMPOS[d].map((c) => c.clave).join(", ")}`).join("\n");
  return `Eres un asistente contable de una empresa colombiana. Decide a qué módulo de contabilidad pertenece un archivo.
Módulos posibles:
${lista}

Responde SOLO un JSON con esta forma:
{"destino": "<uno de los códigos>", "confianza": <número entre 0 y 1>, "motivo": "<una frase corta en español>"${
    soloClasificar ? "" : `, "encabezados": ["..."], "filas": [{"columna": "valor"}]`
  }}
${
  soloClasificar
    ? ""
    : `\nAdemás extrae del documento la tabla de datos: "encabezados" son los nombres de columna y "filas" hasta 300 filas, con los valores tal como aparecen (texto). Usa, cuando aplique, estos nombres de columna según el destino:\n${campos}\nNo inventes datos: si algo no se lee, déjalo vacío.`
}`;
}

/** Pide la sugerencia a Gemini. Devuelve null si no hay llave o la IA no respondió algo utilizable. */
async function consultarIA(e: EntradaSugerir): Promise<Sugerencia | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const binario = !!e.archivoBase64 && !!e.mime;
  const muestra = e.muestra.slice(0, 15).map((f) => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v).slice(0, 80)])));
  const contexto = `Nombre del archivo: ${e.nombre}\nFormato: ${e.formato}\n${
    binario ? "El archivo va adjunto." : `Encabezados: ${JSON.stringify(e.encabezados.slice(0, 40))}\nMuestra de filas: ${JSON.stringify(muestra)}`
  }`;
  const partes: Record<string, unknown>[] = [{ text: contexto }];
  if (binario) partes.push({ inlineData: { mimeType: e.mime, data: e.archivoBase64 } });
  const cuerpo = JSON.stringify({
    contents: [{ role: "user", parts: partes }],
    systemInstruction: { parts: [{ text: instrucciones(!binario) }] },
    generationConfig: { temperature: 0.1, maxOutputTokens: binario ? 8000 : 400, responseMimeType: "application/json" },
  });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent?key=${apiKey}`;
  try {
    let r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: cuerpo });
    if (r.status === 503) {
      await new Promise((ok) => setTimeout(ok, 1200));
      r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: cuerpo });
    }
    if (!r.ok) return null;
    const datos = (await r.json()) as RespuestaGemini;
    const texto = datos.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
    const j = JSON.parse(texto.replace(/^```json|```$/g, "").trim()) as Partial<Sugerencia> & { encabezados?: unknown; filas?: unknown };
    if (!j.destino || !(DESTINOS as readonly string[]).includes(j.destino)) return null;
    const s: Sugerencia = {
      destino: j.destino,
      confianza: Math.min(1, Math.max(0, Number(j.confianza) || 0.5)),
      motivo: String(j.motivo ?? "").slice(0, 300) || "Sugerido por la IA.",
      modo: "ia",
    };
    if (binario && Array.isArray(j.encabezados) && Array.isArray(j.filas)) {
      const encabezados = (j.encabezados as unknown[]).map((h) => String(h).slice(0, 60)).slice(0, 40);
      const filas = (j.filas as Record<string, unknown>[])
        .slice(0, 300)
        .filter((f) => f && typeof f === "object")
        .map((f) => Object.fromEntries(Object.entries(f).map(([k, v]) => [String(k).slice(0, 60), String(v ?? "").slice(0, 300)])));
      if (encabezados.length && filas.length) s.extraido = { encabezados, filas };
    }
    return s;
  } catch {
    return null;
  }
}

/** IA primero; si no hay llave o falla, reglas. Nunca lanza. */
export async function sugerirDestino(e: EntradaSugerir): Promise<Sugerencia> {
  return (await consultarIA(e)) ?? sugerirPorReglas(e);
}
