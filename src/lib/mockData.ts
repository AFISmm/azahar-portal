import type { Documento, Empleado, NominaPago, Solicitud } from "./types";

// ---------------------------------------------------------------------------
// Datos semilla para el "modo demo" de Portal Azahar.
// Seis empleados típicos de una compañía de retail de café colombiana.
// Estos arreglos viven en memoria durante la sesión del navegador: las
// mutaciones hechas a través de mockDataSource.ts modifican estos mismos
// arreglos, por lo que los cambios persisten mientras no se recargue la app.
// ---------------------------------------------------------------------------

export const empleadosSeed: Empleado[] = [
  {
    id: "emp-1",
    nombre: "María Camila Restrepo",
    correo: "mariacamila.restrepo@azaharcoffee.co",
    cargo: "Gerente de Talento Humano",
    departamento: "Talento Humano",
    tipoContrato: "Término indefinido",
    fechaIngreso: "2019-03-11",
    diasVacacionesDisponibles: 9,
    salario: 8200000,
    rol: "admin",
    estado: "activo",
    avatarUrl: null,
    telefono: "300 512 4471",
    createdAt: "2019-03-11T13:00:00.000Z",
  },
  {
    id: "emp-2",
    nombre: "Juan Esteban Gómez",
    correo: "juanesteban.gomez@azaharcoffee.co",
    cargo: "Barista Senior",
    departamento: "Operaciones de Tienda",
    tipoContrato: "Término indefinido",
    fechaIngreso: "2022-06-01",
    diasVacacionesDisponibles: 12,
    salario: 1950000,
    rol: "empleado",
    estado: "activo",
    avatarUrl: null,
    telefono: "301 884 2039",
    createdAt: "2022-06-01T13:00:00.000Z",
  },
  {
    id: "emp-3",
    nombre: "Laura Valentina Torres",
    correo: "lauravalentina.torres@azaharcoffee.co",
    cargo: "Gerente de Tienda",
    departamento: "Operaciones de Tienda",
    tipoContrato: "Término indefinido",
    fechaIngreso: "2020-09-15",
    diasVacacionesDisponibles: 6,
    salario: 3400000,
    rol: "empleado",
    estado: "activo",
    avatarUrl: null,
    telefono: "312 776 5510",
    createdAt: "2020-09-15T13:00:00.000Z",
  },
  {
    id: "emp-4",
    nombre: "Andrés Felipe Muñoz",
    correo: "andresfelipe.munoz@azaharcoffee.co",
    cargo: "Jefe de Logística",
    departamento: "Logística y Abastecimiento",
    tipoContrato: "Término fijo",
    fechaIngreso: "2021-01-20",
    diasVacacionesDisponibles: 15,
    salario: 4100000,
    rol: "empleado",
    estado: "activo",
    avatarUrl: null,
    telefono: "315 220 9981",
    createdAt: "2021-01-20T13:00:00.000Z",
  },
  {
    id: "emp-5",
    nombre: "Daniela Sofía Ramírez",
    correo: "danielasofia.ramirez@azaharcoffee.co",
    cargo: "Analista Contable",
    departamento: "Finanzas",
    tipoContrato: "Término indefinido",
    fechaIngreso: "2023-02-06",
    diasVacacionesDisponibles: 8,
    salario: 3100000,
    rol: "empleado",
    estado: "activo",
    avatarUrl: null,
    telefono: "318 402 6673",
    createdAt: "2023-02-06T13:00:00.000Z",
  },
  {
    id: "emp-6",
    nombre: "Santiago Zuluaga Ospina",
    correo: "santiago.zuluaga@azaharcoffee.co",
    cargo: "Barista",
    departamento: "Operaciones de Tienda",
    tipoContrato: "Aprendizaje SENA",
    fechaIngreso: "2025-11-03",
    diasVacacionesDisponibles: 4,
    salario: 1300000,
    rol: "empleado",
    estado: "activo",
    avatarUrl: null,
    telefono: "300 998 1123",
    createdAt: "2025-11-03T13:00:00.000Z",
  },
];

export const solicitudesSeed: Solicitud[] = [
  {
    id: "sol-1",
    empleadoId: "emp-2",
    tipo: "vacaciones",
    estado: "pendiente",
    fechaInicio: "2026-08-10",
    fechaFin: "2026-08-17",
    motivo: "Viaje familiar de fin de año escolar.",
    creadoEn: "2026-06-20T15:12:00.000Z",
    resueltoEn: null,
    resueltoPor: null,
  },
  {
    id: "sol-2",
    empleadoId: "emp-2",
    tipo: "vacaciones",
    estado: "aprobada",
    fechaInicio: "2025-12-15",
    fechaFin: "2025-12-22",
    motivo: "Descanso de fin de año.",
    creadoEn: "2025-11-02T09:30:00.000Z",
    resueltoEn: "2025-11-03T14:05:00.000Z",
    resueltoPor: "emp-1",
  },
  {
    id: "sol-3",
    empleadoId: "emp-3",
    tipo: "incapacidad",
    estado: "aprobada",
    fechaInicio: "2026-04-02",
    fechaFin: "2026-04-04",
    motivo: "Gripe viral, reposo médico de 3 días.",
    creadoEn: "2026-04-02T08:00:00.000Z",
    resueltoEn: "2026-04-02T11:20:00.000Z",
    resueltoPor: "emp-1",
  },
  {
    id: "sol-4",
    empleadoId: "emp-4",
    tipo: "vacaciones",
    estado: "rechazada",
    fechaInicio: "2026-07-01",
    fechaFin: "2026-07-15",
    motivo: "Coincide con cierre de inventario trimestral.",
    creadoEn: "2026-06-01T10:00:00.000Z",
    resueltoEn: "2026-06-03T16:40:00.000Z",
    resueltoPor: "emp-1",
  },
  {
    id: "sol-5",
    empleadoId: "emp-5",
    tipo: "certificado",
    estado: "pendiente",
    fechaInicio: null,
    fechaFin: null,
    motivo: "Certificado laboral y salarial para trámite de crédito de vivienda.",
    creadoEn: "2026-06-28T18:22:00.000Z",
    resueltoEn: null,
    resueltoPor: null,
  },
  {
    id: "sol-6",
    empleadoId: "emp-6",
    tipo: "documento",
    estado: "pendiente",
    fechaInicio: null,
    fechaFin: null,
    motivo: "Solicitud de copia del contrato de aprendizaje firmado.",
    creadoEn: "2026-06-30T12:10:00.000Z",
    resueltoEn: null,
    resueltoPor: null,
  },
  {
    id: "sol-7",
    empleadoId: "emp-1",
    tipo: "vacaciones",
    estado: "aprobada",
    fechaInicio: "2026-01-05",
    fechaFin: "2026-01-09",
    motivo: "Descanso de inicio de año.",
    creadoEn: "2025-12-10T09:00:00.000Z",
    resueltoEn: "2025-12-10T09:00:00.000Z",
    resueltoPor: "emp-1",
  },
  {
    id: "sol-8",
    empleadoId: "emp-3",
    tipo: "vacaciones",
    estado: "pendiente",
    fechaInicio: "2026-08-01",
    fechaFin: "2026-08-05",
    motivo: "Trámites personales.",
    creadoEn: "2026-07-01T09:00:00.000Z",
    resueltoEn: null,
    resueltoPor: null,
  },
];

export const documentosSeed: Documento[] = [
  { id: "doc-1", empleadoId: "emp-2", nombre: "Contrato laboral.pdf", tipo: "Contrato", url: null, subidoEn: "2022-06-01T13:00:00.000Z", subidoPor: "emp-1" },
  { id: "doc-2", empleadoId: "emp-2", nombre: "Afiliación EPS.pdf", tipo: "Seguridad social", url: null, subidoEn: "2022-06-02T09:00:00.000Z", subidoPor: "emp-1" },
  { id: "doc-3", empleadoId: "emp-3", nombre: "Contrato laboral.pdf", tipo: "Contrato", url: null, subidoEn: "2020-09-15T13:00:00.000Z", subidoPor: "emp-1" },
  { id: "doc-4", empleadoId: "emp-3", nombre: "Certificado laboral 2025.pdf", tipo: "Certificado", url: null, subidoEn: "2025-05-20T10:00:00.000Z", subidoPor: "emp-1" },
  { id: "doc-5", empleadoId: "emp-4", nombre: "Contrato a término fijo.pdf", tipo: "Contrato", url: null, subidoEn: "2021-01-20T13:00:00.000Z", subidoPor: "emp-1" },
  { id: "doc-6", empleadoId: "emp-5", nombre: "Contrato laboral.pdf", tipo: "Contrato", url: null, subidoEn: "2023-02-06T13:00:00.000Z", subidoPor: "emp-1" },
  { id: "doc-7", empleadoId: "emp-6", nombre: "Contrato de aprendizaje SENA.pdf", tipo: "Contrato", url: null, subidoEn: "2025-11-03T13:00:00.000Z", subidoPor: "emp-1" },
  { id: "doc-8", empleadoId: "emp-1", nombre: "Contrato laboral.pdf", tipo: "Contrato", url: null, subidoEn: "2019-03-11T13:00:00.000Z", subidoPor: "emp-1" },
];

function periodoPagos(mesesAtras: number): { periodo: string; fechaPago: string; estado: "pendiente" | "pagado" }[] {
  const pagos: { periodo: string; fechaPago: string; estado: "pendiente" | "pagado" }[] = [];
  const hoy = new Date(2026, 6, 3); // 3 de julio de 2026 (fecha de referencia de la demo)
  for (let i = mesesAtras; i >= 0; i--) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 30);
    const periodoLabel = fecha.toLocaleDateString("es-CO", { month: "long", year: "numeric" });
    const estado: "pendiente" | "pagado" = i === 0 ? "pendiente" : "pagado";
    pagos.push({
      periodo: periodoLabel.charAt(0).toUpperCase() + periodoLabel.slice(1),
      fechaPago: fecha.toISOString().slice(0, 10),
      estado,
    });
  }
  return pagos;
}

function nominaParaEmpleado(empleadoId: string, salarioBase: number, mesesAtras: number): NominaPago[] {
  return periodoPagos(mesesAtras).map((p, idx) => ({
    id: `nom-${empleadoId}-${idx}`,
    empleadoId,
    periodo: p.periodo,
    fechaPago: p.fechaPago,
    monto: salarioBase,
    estado: p.estado,
  }));
}

export const nominaPagosSeed: NominaPago[] = [
  ...nominaParaEmpleado("emp-1", 8200000, 5),
  ...nominaParaEmpleado("emp-2", 1950000, 5),
  ...nominaParaEmpleado("emp-3", 3400000, 5),
  ...nominaParaEmpleado("emp-4", 4100000, 5),
  ...nominaParaEmpleado("emp-5", 3100000, 5),
  ...nominaParaEmpleado("emp-6", 1300000, 5),
];
