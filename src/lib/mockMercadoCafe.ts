// ---------------------------------------------------------------------------
// Datos de ejemplo para el nuevo panel "Inicio" (mercado y producción del
// café), visible para todos los usuarios del portal, sin importar su rol.
//
// Estos valores son ilustrativos con fines de demostración para Azahar
// Coffee Company y no representan cifras oficiales de mercado en tiempo
// real. Cada tarjeta cita una fuente de referencia habitual del sector.
// ---------------------------------------------------------------------------

import { Droplets, Flame, Hand, Layers, PackageCheck, Sprout, Sun, type LucideIcon } from "lucide-react";

/** Marca de tiempo fija (no se usa `Date.now()`/`new Date()`) para simular la última sincronización de datos. */
export const ULTIMA_ACTUALIZACION = "2026-07-08T07:30:00-05:00";

// ---- Card A: Base de datos mundial del café --------------------------------

export const FUENTE_BASE_MUNDIAL = "ICO — International Coffee Organization";

export interface StatMundial {
  label: string;
  valor: number;
  unidad: string;
  deltaPct: number;
}

export const statsMundiales: StatMundial[] = [
  { label: "Producción mundial", valor: 171.4, unidad: "millones de sacos de 60 kg", deltaPct: 2.1 },
  { label: "Consumo mundial", valor: 167.8, unidad: "millones de sacos de 60 kg", deltaPct: 1.4 },
  { label: "Exportaciones", valor: 128.6, unidad: "millones de sacos de 60 kg", deltaPct: -0.6 },
];

// ---- Card B: Cadena de producción del café ---------------------------------

export interface EtapaProduccion {
  id: string;
  titulo: string;
  descripcion: string;
}

export const etapasProduccion: EtapaProduccion[] = [
  {
    id: "cultivo",
    titulo: "Cultivo",
    descripcion:
      "Se seleccionan variedades adaptadas a la altitud y el clima local y se siembran los almácigos de café. Las plantas se trasladan al lote definitivo tras varios meses de vivero y tardan entre dos y cuatro años en producir su primera cosecha.",
  },
  {
    id: "cosecha",
    titulo: "Cosecha",
    descripcion:
      "La recolección se hace principalmente a mano, escogiendo únicamente los granos (cerezas) que ya están maduros. En zonas de ladera, como gran parte de la caficultura colombiana, esta selección manual y por pasadas es clave para la calidad final.",
  },
  {
    id: "beneficio",
    titulo: "Beneficio",
    descripcion:
      "El beneficio húmedo despulpa la cereza para retirar la pulpa y luego fermenta el grano en tanques durante horas para eliminar el mucílago. Después se lava con abundante agua para dejar el café listo para secar.",
  },
  {
    id: "secado",
    titulo: "Secado",
    descripcion:
      "El café lavado se seca al sol en patios o carpas, o de forma mecánica en secadores, hasta llegar a un nivel de humedad cercano al 10-12%. Un secado uniforme es esencial para evitar defectos y conservar los atributos de la taza.",
  },
  {
    id: "trilla",
    titulo: "Trilla",
    descripcion:
      "El café seco (pergamino) pasa por la trilladora, que retira la cáscara o pergamino y deja al descubierto el grano verde u oro, listo para ser clasificado por tamaño y densidad antes de su comercialización o exportación.",
  },
  {
    id: "tueste",
    titulo: "Tueste",
    descripcion:
      "El grano verde se tuesta a altas temperaturas para desarrollar los aromas, acidez y cuerpo característicos del café. El punto y el tiempo de tueste se ajustan según el perfil de sabor que se busca lograr.",
  },
  {
    id: "empaque",
    titulo: "Empaque y distribución",
    descripcion:
      "El café tostado se muele o se empaca en grano, protegido en materiales que conservan su frescura, y se distribuye a tiendas, tostadoras y clientes finales, cerrando el recorrido de la finca a la taza.",
  },
];

export const etapaIconos: Record<string, LucideIcon> = {
  cultivo: Sprout,
  cosecha: Hand,
  beneficio: Droplets,
  secado: Sun,
  trilla: Layers,
  tueste: Flame,
  empaque: PackageCheck,
};

// ---- Card C: Variación % acumulada — producción industrial -----------------

export const FUENTE_VARIACION_INDUSTRIAL = "EMMET — Cálculos OEE — Mincit";

export interface PuntoVariacion {
  mes: string;
  valor: number;
}

export const variacionAcumuladaMensual: PuntoVariacion[] = [
  { mes: "Ago", valor: -2.4 },
  { mes: "Sep", valor: -1.1 },
  { mes: "Oct", valor: 0.5 },
  { mes: "Nov", valor: -0.8 },
  { mes: "Dic", valor: 1.2 },
  { mes: "Ene", valor: 2.6 },
  { mes: "Feb", valor: 1.9 },
  { mes: "Mar", valor: 3.4 },
  { mes: "Abr", valor: 4.8 },
  { mes: "May", valor: 5.6 },
  { mes: "Jun", valor: 6.7 },
  { mes: "Jul", valor: 7.9 },
];

// ---- Card D: Producción agrícola anual -------------------------------------

export const FUENTE_PRODUCCION_AGRICOLA = "EVA — Ministerio de Agricultura — Cálculos OEE — Mincit";

export interface PuntoProduccionAnual {
  anio: string;
  valor: number;
}

/** Miles de toneladas de café producidas por año (cifra ilustrativa). */
export const produccionAgricolaAnual: PuntoProduccionAnual[] = [
  { anio: "2022", valor: 540 },
  { anio: "2023", valor: 575 },
  { anio: "2024", valor: 598 },
  { anio: "2025", valor: 612 },
  { anio: "2026", valor: 634 },
];

// ---- Card E: Valor del café en bolsa ----------------------------------------

export const FUENTE_BOLSA = "FNC — Federación Nacional de Cafeteros";

export type PeriodoBolsa = "dia" | "semana" | "mes";

export interface SerieBolsa {
  xLabels: string[];
  actual: number[];
  anterior: number[];
  labelActual: string;
  labelAnterior: string;
}

/** Precio interno de referencia (COP) por carga de 125 kg de café pergamino seco. */
export const bolsaPorPeriodo: Record<PeriodoBolsa, SerieBolsa> = {
  dia: {
    xLabels: ["8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm"],
    actual: [2180000, 2185000, 2190000, 2195000, 2198000, 2200000, 2202000, 2205000],
    anterior: [2160000, 2165000, 2170000, 2172000, 2175000, 2178000, 2180000, 2182000],
    labelActual: "Hoy",
    labelAnterior: "Ayer",
  },
  semana: {
    xLabels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    actual: [2150000, 2160000, 2170000, 2185000, 2190000, 2198000, 2205000],
    anterior: [2100000, 2110000, 2120000, 2130000, 2140000, 2150000, 2155000],
    labelActual: "Esta semana",
    labelAnterior: "La semana pasada",
  },
  mes: {
    xLabels: ["1", "5", "10", "15", "20", "25", "30"],
    actual: [2080000, 2100000, 2120000, 2150000, 2170000, 2190000, 2205000],
    anterior: [2000000, 2010000, 2030000, 2050000, 2060000, 2075000, 2090000],
    labelActual: "Este mes",
    labelAnterior: "El mes pasado",
  },
};
