import { differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function formatCOP(monto: number | null | undefined): string {
  if (monto === null || monto === undefined) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(monto);
}

export function formatDate(iso: string | null | undefined, pattern = "d MMM yyyy"): string {
  if (!iso) return "—";
  try {
    return format(parseISO(iso), pattern, { locale: es });
  } catch {
    return iso;
  }
}

export function formatDateTime(iso: string | null | undefined): string {
  return formatDate(iso, "d MMM yyyy, HH:mm");
}

export interface Antiguedad {
  anios: number;
  meses: number;
  dias: number;
  totalDias: number;
  texto: string;
}

export function calcularAntiguedad(fechaIngresoIso: string, referencia: Date = new Date()): Antiguedad {
  const inicio = parseISO(fechaIngresoIso);
  const totalDias = Math.max(0, differenceInCalendarDays(referencia, inicio));
  const anios = Math.max(0, differenceInCalendarYears(referencia, inicio));
  const fechaTrasAnios = new Date(inicio);
  fechaTrasAnios.setFullYear(fechaTrasAnios.getFullYear() + anios);
  const meses = Math.max(0, differenceInCalendarMonths(referencia, fechaTrasAnios));
  const fechaTrasMeses = new Date(fechaTrasAnios);
  fechaTrasMeses.setMonth(fechaTrasMeses.getMonth() + meses);
  const dias = Math.max(0, differenceInCalendarDays(referencia, fechaTrasMeses));

  const partes: string[] = [];
  if (anios > 0) partes.push(`${anios} ${anios === 1 ? "año" : "años"}`);
  if (meses > 0) partes.push(`${meses} ${meses === 1 ? "mes" : "meses"}`);
  if (partes.length === 0) partes.push(`${dias} ${dias === 1 ? "día" : "días"}`);

  return { anios, meses, dias, totalDias, texto: partes.join(", ") };
}

export function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export function capitalizar(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
