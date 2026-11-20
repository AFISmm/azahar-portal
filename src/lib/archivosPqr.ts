/**
 * Enlace para abrir el adjunto de una PQR. Los adjuntos nuevos están en un store privado y solo se leen a través de la API
 * (que comprueba quién pregunta); los antiguos, ya en el store público, se abren directo.
 */
export function enlaceAdjuntoPqr(url: string): string {
  return /\.public\.blob\.vercel-storage\.com\//.test(url) ? url : `/api/auth/me?archivo=${encodeURIComponent(url)}`;
}
