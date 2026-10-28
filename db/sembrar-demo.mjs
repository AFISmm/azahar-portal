// ============================================================================
// Datos de DEMOSTRACIÓN para mostrar el portal con información en todos los módulos:
// empleados, nómina, solicitudes, documentos, fincas y certificados (Gestión
// operativa), trazabilidad completa con QR, y ventas del Sistema POS.
//
// Es idempotente (ids fijos + ON CONFLICT DO NOTHING) y todo ocurre en UNA transacción.
// Los empleados demo se crean con una contraseña aleatoria que NO se guarda ni se
// muestra: no se puede iniciar sesión con ellos (solo existen para mostrar datos).
//
// Requisitos: haber aplicado antes db/schema.sql y los demás .sql (ver README).
//
// Uso (desde la carpeta del portal):
//   DESTINO_URL="<POSTGRES_URL>" BASE_URL="https://mi-azahar-portal.vercel.app" node db/sembrar-demo.mjs
// ============================================================================

import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";
import { neon } from "@neondatabase/serverless";

const DESTINO_URL = process.env.DESTINO_URL;
const BASE_URL = (process.env.BASE_URL ?? "https://mi-azahar-portal.vercel.app").replace(/\/$/, "");
if (!DESTINO_URL) throw new Error("Falta DESTINO_URL (la POSTGRES_URL de la base del portal).");
const sql = neon(DESTINO_URL);

/** uuid determinístico a partir de un texto (para que correr el guion dos veces no duplique nada). */
const uid = (semilla) => {
  const h = createHash("md5").update(semilla).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
};

const consultas = [];
const q = (texto, params = []) => consultas.push([texto, params]);
function insertar(tabla, fila) {
  const cols = Object.keys(fila);
  q(`insert into ${tabla} (${cols.join(", ")}) values (${cols.map((_, i) => `$${i + 1}`).join(", ")}) on conflict do nothing`, cols.map((c) => fila[c]));
}

const dia = (aaaa, mm, dd) => `${aaaa}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
const haceDias = (n, hora = 10, min = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hora, min, 0, 0);
  return d.toISOString();
};

// ---------------------------------------------------------------------------
// 0. Referencias que ya existen en la base
// ---------------------------------------------------------------------------
const existentes = await sql(`select id, correo from empleados`);
const idPorCorreo = (c) => existentes.find((e) => e.correo.toLowerCase() === c)?.id;
const cajeroId = idPorCorreo("demo.cajero@azaharcoffee.co") ?? null;
const felipeId = idPorCorreo("felipe.serna@mercurymethods.com");
const davidId = idPorCorreo("david.illidge@mercurymethods.com");
const productos = await sql(`select id, nombre, precio_base, gravable from pos_productos`);
const prod = Object.fromEntries(productos.map((p) => [p.id, p]));
if (productos.length === 0) throw new Error("No hay catálogo del POS: aplica db/pos-catalogo.sql primero.");

// ---------------------------------------------------------------------------
// 1. Cuentas de desarrollo: cargo DESARROLLADOR, sin nombre de empresa
// ---------------------------------------------------------------------------
q(`update empleados set cargo = 'DESARROLLADOR', departamento = 'Tecnología y Desarrollo', tipo_contrato = 'Prestación de servicios'
   where lower(correo) like '%@mercurymethods.com'`);
// los 3 usuarios demo de permisos: departamentos válidos del portal
q(`update empleados set departamento = 'Operaciones de Tienda', tipo_contrato = 'Término indefinido', salario = 2300000 where lower(correo) = 'demo.cajero@azaharcoffee.co'`);
q(`update empleados set departamento = 'Producción y Calidad', tipo_contrato = 'Término indefinido', salario = 3500000 where lower(correo) = 'demo.calidad@azaharcoffee.co'`);
q(`update empleados set departamento = 'Talento Humano', tipo_contrato = 'Término indefinido', salario = 6200000 where lower(correo) = 'demo.gerencia@azaharcoffee.co'`);

// ---------------------------------------------------------------------------
// 2. Empleados demo (no se puede iniciar sesión con ellos)
// ---------------------------------------------------------------------------
const hashInutilizable = await bcrypt.hash(randomBytes(24).toString("hex"), 10);
const empleados = [
  ["María Camila Restrepo", "mariacamila.restrepo@azaharcoffee.co", "Gerente de Talento Humano", "Talento Humano", "Término indefinido", "2022-03-01", 12, 6800000, "1017234561", "1988-04-12", "310 555 0101"],
  ["Carlos Andrés Pérez", "carlosandres.perez@azaharcoffee.co", "Barista Senior", "Operaciones de Tienda", "Término indefinido", "2023-06-15", 9, 2400000, "1032456789", "1995-09-03", "311 555 0102"],
  ["Daniela Sofía Ramírez", "danielasofia.ramirez@azaharcoffee.co", "Coordinadora Comercial", "Mercadeo", "Término indefinido", "2022-09-01", 15, 4900000, "1020345678", "1991-12-21", "312 555 0103"],
  ["Andrés Felipe Muñoz", "andresfelipe.munoz@azaharcoffee.co", "Director Estratégico", "Finanzas", "Término indefinido", "2021-01-10", 6, 9500000, "79845612", "1983-07-30", "313 555 0104"],
  ["Laura Valentina Torres", "lauravalentina.torres@azaharcoffee.co", "Jefe de Tienda Poblado", "Operaciones de Tienda", "Término indefinido", "2023-02-20", 11, 3800000, "1037654321", "1993-02-14", "314 555 0105"],
  ["Juan Sebastián Gómez", "juansebastian.gomez@azaharcoffee.co", "Maestro Tostador", "Producción y Calidad", "Término indefinido", "2023-11-05", 14, 3200000, "1001234987", "1992-06-08", "315 555 0106"],
  ["Paula Andrea Hernández", "paulaandrea.hernandez@azaharcoffee.co", "Analista de Calidad", "Producción y Calidad", "Término fijo", "2024-04-01", 10, 3500000, "1019876543", "1996-11-25", "316 555 0107"],
  ["Santiago Ortiz Vélez", "santiago.ortiz@azaharcoffee.co", "Auxiliar de Bodega", "Logística y Abastecimiento", "Término fijo", "2024-08-12", 8, 1900000, "1045678912", "1999-01-17", "317 555 0108"],
  ["Valentina Cárdenas", "valentina.cardenas@azaharcoffee.co", "Contadora", "Finanzas", "Término indefinido", "2022-07-18", 13, 5200000, "52987456", "1987-10-02", "318 555 0109"],
  ["Miguel Ángel Rojas", "miguelangel.rojas@azaharcoffee.co", "Cajero", "Operaciones de Tienda", "Aprendizaje SENA", "2025-01-13", 15, 1500000, "1056781234", "2002-05-19", "319 555 0110"],
];
const empId = {};
for (const [nombre, correo, cargo, departamento, contrato, ingreso, vacaciones, salario, cedula, nacimiento, tel] of empleados) {
  const id = uid(`emp:${correo}`);
  empId[correo] = id;
  insertar("empleados", {
    id, nombre, correo, password_hash: hashInutilizable, cargo, departamento, tipo_contrato: contrato, fecha_ingreso: ingreso,
    dias_vacaciones_disponibles: vacaciones, salario, rol: "empleado", estado: "activo", telefono: tel,
    fecha_nacimiento: nacimiento, numero_identificacion: cedula, debe_cambiar_password: false,
  });
}
// Cuentas desactivadas (con motivo y fecha) para ver la ficha de Gestión de usuarios completa
const desactivados = [
  ["Sebastián Arango Mejía", "sebastian.arango@azaharcoffee.co", "Barista", "Operaciones de Tienda", "Término fijo", "2024-02-05", 4, 1800000, "1098765432", "1997-03-09", "320 555 0111", "Terminación del contrato a término fijo (vencimiento el 30 de septiembre).", 38],
  ["Natalia Ospina Duque", "natalia.ospina@azaharcoffee.co", "Analista de Mercadeo", "Mercadeo", "Término indefinido", "2023-05-22", 0, 3900000, "1036547890", "1994-08-27", "321 555 0112", "Renuncia voluntaria: se retiró para trabajar en otra empresa.", 21],
  ["Hernán Darío Vélez", "hernan.velez@azaharcoffee.co", "Auxiliar de Logística", "Logística y Abastecimiento", "Prestación de servicios", "2024-09-02", 6, 2100000, "71234567", "1990-12-01", "322 555 0113", "Cuenta desactivada por solicitud de Talento Humano: finalizó el contrato de prestación de servicios.", 9],
];
for (const [nombre, correo, cargo, departamento, contrato, ingreso, vacaciones, salario, cedula, nacimiento, tel, motivo, hace] of desactivados) {
  insertar("empleados", {
    id: uid(`emp:${correo}`), nombre, correo, password_hash: hashInutilizable, cargo, departamento, tipo_contrato: contrato, fecha_ingreso: ingreso,
    dias_vacaciones_disponibles: vacaciones, salario, rol: "empleado", estado: "inactivo", telefono: tel,
    fecha_nacimiento: nacimiento, numero_identificacion: cedula, debe_cambiar_password: false,
    motivo_desactivacion: motivo, desactivado_en: haceDias(hace),
  });
}
// quien resuelve las solicitudes: María Camila (gerente de talento humano)
const resuelve = empId["mariacamila.restrepo@azaharcoffee.co"];
// Los administradores (Mercury) y los demás también necesitan quedar con ids conocidos
const e = (correo) => empId[correo] ?? idPorCorreo(correo);

// ---------------------------------------------------------------------------
// 3. Nómina: pagos de julio a octubre (pagados) y noviembre (pendiente)
// ---------------------------------------------------------------------------
const meses = [
  ["Julio 2026", "2026-07-31", "pagado"],
  ["Agosto 2026", "2026-08-31", "pagado"],
  ["Septiembre 2026", "2026-09-30", "pagado"],
  ["Octubre 2026", "2026-10-31", "pagado"],
  ["Noviembre 2026", "2026-11-30", "pendiente"],
];
const sueldos = [
  ...empleados.map(([, correo, , , , , , salario]) => [e(correo), salario * 0.92]),
  [idPorCorreo("demo.cajero@azaharcoffee.co"), 2300000 * 0.92],
  [idPorCorreo("demo.calidad@azaharcoffee.co"), 3500000 * 0.92],
  [idPorCorreo("demo.gerencia@azaharcoffee.co"), 6200000 * 0.92],
  [felipeId, 6000000],
  [davidId, 6000000],
];
for (const [id, neto] of sueldos) {
  if (!id) continue;
  const monto = Math.round(neto / 1000) * 1000;
  for (const [periodo, fecha, estado] of meses) {
    insertar("nomina_pagos", { id: uid(`pago:${id}:${periodo}`), empleado_id: id, periodo, fecha_pago: fecha, monto, estado });
  }
}

// ---------------------------------------------------------------------------
// 4. Solicitudes: vacaciones, incapacidades, documentos y certificados
// ---------------------------------------------------------------------------
const solicitudes = [
  // [correo, tipo, estado, inicio, fin, motivo, creadoHaceDias]
  ["carlosandres.perez@azaharcoffee.co", "vacaciones", "aprobada", "2026-12-15", "2026-12-29", "Vacaciones de fin de año con la familia.", 30],
  ["carlosandres.perez@azaharcoffee.co", "certificado", "aprobada", null, null, "Laboral. Para trámite de crédito de vivienda.", 12],
  ["danielasofia.ramirez@azaharcoffee.co", "vacaciones", "pendiente", "2026-11-23", "2026-12-04", "Viaje programado desde inicio de año.", 3],
  ["danielasofia.ramirez@azaharcoffee.co", "documento", "aprobada", null, null, "Copia del contrato firmado para renovación de visa.", 20],
  ["lauravalentina.torres@azaharcoffee.co", "incapacidad", "aprobada", "2026-10-05", "2026-10-08", "Gripa con reposo médico de 4 días (incapacidad EPS adjunta).", 22],
  ["lauravalentina.torres@azaharcoffee.co", "vacaciones", "rechazada", "2026-11-10", "2026-11-20", "Coincide con la apertura de la nueva tienda; se reprograma.", 15],
  ["juansebastian.gomez@azaharcoffee.co", "incapacidad", "pendiente", "2026-10-27", "2026-10-30", "Procedimiento odontológico menor, reposo de 4 días.", 1],
  ["juansebastian.gomez@azaharcoffee.co", "certificado", "pendiente", null, null, "Salarial. Para presentar a una entidad financiera.", 2],
  ["paulaandrea.hernandez@azaharcoffee.co", "vacaciones", "aprobada", "2026-09-14", "2026-09-25", "Descanso programado tras la cosecha principal.", 45],
  ["paulaandrea.hernandez@azaharcoffee.co", "incapacidad", "aprobada", "2026-08-03", "2026-08-05", "Cuadro viral, 3 días de reposo.", 80],
  ["santiago.ortiz@azaharcoffee.co", "vacaciones", "pendiente", "2026-12-01", "2026-12-12", "Matrimonio de un familiar en otra ciudad.", 5],
  ["santiago.ortiz@azaharcoffee.co", "certificado", "aprobada", null, null, "Laboral. Trámite de arriendo.", 18],
  ["valentina.cardenas@azaharcoffee.co", "vacaciones", "aprobada", "2026-07-20", "2026-08-03", "Vacaciones de mitad de año.", 100],
  ["valentina.cardenas@azaharcoffee.co", "documento", "pendiente", null, null, "Certificado de ingresos y retenciones del año anterior.", 4],
  ["miguelangel.rojas@azaharcoffee.co", "incapacidad", "pendiente", "2026-10-26", "2026-10-28", "Esguince de tobillo, 3 días de incapacidad.", 2],
  ["miguelangel.rojas@azaharcoffee.co", "certificado", "rechazada", null, null, "Salarial. Falta la antigüedad mínima para este certificado.", 10],
  ["andresfelipe.munoz@azaharcoffee.co", "vacaciones", "aprobada", "2026-11-02", "2026-11-06", "Semana de descanso, asistencia a congreso de café especial.", 25],
  ["mariacamila.restrepo@azaharcoffee.co", "documento", "aprobada", null, null, "Copia de la afiliación a la caja de compensación.", 40],
  ["demo.cajero@azaharcoffee.co", "vacaciones", "pendiente", "2026-12-20", "2027-01-03", "Vacaciones de diciembre.", 6],
  ["demo.calidad@azaharcoffee.co", "certificado", "aprobada", null, null, "Laboral. Presentación en una embajada.", 9],
  ["demo.gerencia@azaharcoffee.co", "incapacidad", "aprobada", "2026-09-21", "2026-09-23", "Migraña severa, reposo de 3 días.", 38],
  // cuentas de desarrollo
  ["felipe.serna@mercurymethods.com", "certificado", "aprobada", null, null, "Laboral. Verificación para proveedores.", 14],
  ["felipe.serna@mercurymethods.com", "certificado", "aprobada", null, null, "Salarial. Soporte para trámite bancario.", 7],
  ["felipe.serna@mercurymethods.com", "vacaciones", "aprobada", "2026-12-22", "2027-01-05", "Descanso de fin de año.", 11],
  ["felipe.serna@mercurymethods.com", "incapacidad", "pendiente", "2026-10-29", "2026-10-30", "Control médico programado.", 0],
  ["david.illidge@mercurymethods.com", "vacaciones", "pendiente", "2026-11-16", "2026-11-20", "Viaje corto, cobertura acordada con el equipo.", 2],
  ["david.illidge@mercurymethods.com", "certificado", "aprobada", null, null, "Laboral. Verificación para proveedores.", 21],
];
solicitudes.forEach(([correo, tipo, estado, ini, fin, motivo, hace], i) => {
  const empleadoId = e(correo);
  if (!empleadoId) return;
  const resuelta = estado !== "pendiente";
  insertar("solicitudes", {
    id: uid(`sol:${correo}:${tipo}:${i}`), empleado_id: empleadoId, tipo, estado, fecha_inicio: ini, fecha_fin: fin, motivo,
    creado_en: haceDias(hace, 9 + (i % 6), (i * 7) % 60),
    resuelto_en: resuelta ? haceDias(Math.max(hace - 1, 0), 15, 30) : null,
    resuelto_por: resuelta ? resuelve : null,
  });
});

// ---------------------------------------------------------------------------
// 5. Documentos del expediente
// ---------------------------------------------------------------------------
const docs = [
  ["carlosandres.perez@azaharcoffee.co", "Contrato de trabajo", "Contrato"],
  ["carlosandres.perez@azaharcoffee.co", "Cédula de ciudadanía", "Identificación"],
  ["danielasofia.ramirez@azaharcoffee.co", "Contrato de trabajo", "Contrato"],
  ["danielasofia.ramirez@azaharcoffee.co", "Afiliación a EPS", "Seguridad social"],
  ["lauravalentina.torres@azaharcoffee.co", "Contrato de trabajo", "Contrato"],
  ["lauravalentina.torres@azaharcoffee.co", "Incapacidad EPS — octubre 2026", "Incapacidad"],
  ["juansebastian.gomez@azaharcoffee.co", "Contrato de trabajo", "Contrato"],
  ["paulaandrea.hernandez@azaharcoffee.co", "Contrato a término fijo", "Contrato"],
  ["paulaandrea.hernandez@azaharcoffee.co", "Diploma profesional", "Formación"],
  ["santiago.ortiz@azaharcoffee.co", "Contrato a término fijo", "Contrato"],
  ["valentina.cardenas@azaharcoffee.co", "Contrato de trabajo", "Contrato"],
  ["valentina.cardenas@azaharcoffee.co", "Tarjeta profesional de contadora", "Formación"],
  ["miguelangel.rojas@azaharcoffee.co", "Contrato de aprendizaje SENA", "Contrato"],
  ["mariacamila.restrepo@azaharcoffee.co", "Contrato de trabajo", "Contrato"],
  ["felipe.serna@mercurymethods.com", "Contrato de prestación de servicios", "Contrato"],
  ["david.illidge@mercurymethods.com", "Contrato de prestación de servicios", "Contrato"],
];
docs.forEach(([correo, nombre, tipo], i) => {
  const empleadoId = e(correo);
  if (empleadoId) insertar("documentos", { id: uid(`doc:${correo}:${nombre}`), empleado_id: empleadoId, nombre, tipo, url: null, subido_en: haceDias(60 + i * 3), subido_por: resuelve });
});

// ---------------------------------------------------------------------------
// 6. Gestión operativa: fincas y certificados
// ---------------------------------------------------------------------------
const fincasOp = [
  ["FIN-0001", "La Virginia", "El Carmen", "Pitalito", "Huila", "Consuelo Ortiz", "36421877", 12.5, 9.8, 38000, "Caturra", 1.853, -76.048],
  ["FIN-0002", "El Recuerdo", "La Palma", "Acevedo", "Huila", "Hernán Rojas", "12987456", 8.2, 6.5, 26000, "Geisha", 1.8056, -75.8888],
  ["FIN-0003", "La Esperanza", "Alto Cabuyal", "Garzón", "Huila", "Gloria Trujillo", "26543901", 15, 11, 42000, "Bourbon Rosado", 2.1949, -75.6275],
  ["FIN-0004", "El Paraíso", "San Roque", "La Unión", "Nariño", "Edgar Burbano", "5231876", 6, 4.5, 17000, "Castillo", 1.6046, -77.1306],
  ["FIN-0005", "Los Naranjos", "Julumito", "Popayán", "Cauca", "Asociación Caficultores del Cauca", "900456781", 20, 14, 55000, "Caturra", 2.4448, -76.6147],
  ["FIN-0006", "Villa Sol", "La Concha", "Calarcá", "Quindío", "Luis Fernando Giraldo", "7512346", 9, 7, 29000, "Típica", 4.5292, -75.6397],
];
const fincaOpId = {};
for (const [codigo, nombre, vereda, municipio, depto, propietario, cedula, total, cafe, arboles, variedad, lat, lon] of fincasOp) {
  fincaOpId[codigo] = uid(`finca:${codigo}`);
  insertar("fincas", { id: fincaOpId[codigo], codigo, nombre, vereda, municipio, departamento: depto, propietario, cedula_propietario: cedula, area_total: total, area_cafe: cafe, numero_arboles: arboles, variedad, latitud: lat, longitud: lon });
}
const certsOp = [
  ["FIN-0001", "Orgánico", "Control Union Certifications", "CU-ORG-88231", "2025-03-10", "2027-03-09"],
  ["FIN-0001", "Rainforest Alliance", "Rainforest Alliance", "RA-CO-440912", "2025-06-01", "2026-12-10"],
  ["FIN-0002", "Fair Trade", "FLOCERT", "FLO-ID 41872", "2025-09-15", "2027-09-14"],
  ["FIN-0002", "Café de Colombia (origen)", "Federación Nacional de Cafeteros", "FNC-HUI-7731", "2024-11-02", "2026-11-01"],
  ["FIN-0003", "Rainforest Alliance", "Rainforest Alliance", "RA-CO-512377", "2025-04-20", "2027-04-19"],
  ["FIN-0003", "Práctica 4C", "4C Association", "4C-CO-20931", "2024-01-15", "2026-01-14"],
  ["FIN-0004", "Orgánico", "BCS Öko-Garantie", "BCS-NAR-31877", "2025-08-05", "2027-08-04"],
  ["FIN-0004", "Fair Trade", "FLOCERT", "FLO-ID 39054", "2025-02-12", "2027-02-11"],
  ["FIN-0005", "UTZ / Rainforest Alliance", "Rainforest Alliance", "RA-CO-377720", "2025-10-01", "2027-09-30"],
  ["FIN-0006", "Café de Colombia (origen)", "Federación Nacional de Cafeteros", "FNC-QUI-5120", "2025-05-18", "2027-05-17"],
];
for (const [codigo, nombre, entidad, numero, emision, vence] of certsOp) {
  insertar("certificados_finca", { id: uid(`certfinca:${codigo}:${nombre}`), finca_id: fincaOpId[codigo], nombre, entidad_certificadora: entidad, numero_certificado: numero, fecha_emision: emision, fecha_vencimiento: vence });
}

// ---------------------------------------------------------------------------
// 7. Trazabilidad: cadena completa con QR
// ---------------------------------------------------------------------------
const T = (s) => `demo-${s}`;
const tfincas = [
  ["huila-virginia", "Finca La Virginia", "Familia Ortiz", 1.853, -76.048, 1750, "Huila, Colombia", "Arábica - Caturra", "Selectiva"],
  ["huila-recuerdo", "Finca El Recuerdo", "Familia Rojas", 1.8056, -75.8888, 1820, "Huila, Colombia", "Arábica - Geisha", "Selectiva"],
  ["huila-esperanza", "Finca La Esperanza", "Familia Trujillo", 2.1949, -75.6275, 1900, "Huila, Colombia", "Arábica - Bourbon Rosado", "Manual"],
  ["narino-paraiso", "Finca El Paraíso", "Hermanos Burbano", 1.6046, -77.1306, 2050, "Nariño, Colombia", "Arábica - Castillo", "Selectiva"],
  ["cauca-naranjos", "Finca Los Naranjos", "Asociación Caficultores del Cauca", 2.4448, -76.6147, 1780, "Cauca, Colombia", "Arábica - Caturra", "Manual"],
  ["quindio-villasol", "Finca Villa Sol", "Familia Giraldo", 4.5292, -75.6397, 1650, "Quindío, Colombia", "Arábica - Típica", "Mecánica"],
];
for (const [k, nombre, productor, lat, lon, alt, region, variedad, recoleccion] of tfincas) {
  insertar("traz_fincas", { id: T(`finca-${k}`), nombre, identificador_productor: productor, latitud: lat, longitud: lon, altitud_msnm: alt, region, variedad, tipo_recoleccion: recoleccion, creado_en: haceDias(120) });
}
const tcerts = [
  ["huila-virginia", "Orgánico", "Control Union Certifications", "https://www.controlunion.com", "2025-03-10", "2027-03-09"],
  ["huila-virginia", "Rainforest Alliance", "Rainforest Alliance", "https://www.rainforest-alliance.org", "2025-06-01", "2027-05-31"],
  ["huila-recuerdo", "Fair Trade", "FLOCERT", "https://www.flocert.net", "2025-09-15", "2027-09-14"],
  ["huila-esperanza", "Rainforest Alliance", "Rainforest Alliance", "https://www.rainforest-alliance.org", "2025-04-20", "2027-04-19"],
  ["narino-paraiso", "Orgánico", "BCS Öko-Garantie", "https://www.bcs-oeko.com", "2025-08-05", "2027-08-04"],
  ["cauca-naranjos", "Fair Trade", "FLOCERT", "https://www.flocert.net", "2025-10-01", "2027-09-30"],
  ["quindio-villasol", "Café de Colombia (origen)", "Federación Nacional de Cafeteros", "https://www.cafedecolombia.com", "2025-05-18", "2027-05-17"],
];
for (const [k, nombre, entidad, url, emision, vence] of tcerts) {
  insertar("traz_certificaciones", { id: T(`cert-${k}-${nombre.toLowerCase().replace(/[^a-z]+/g, "")}`), finca_id: T(`finca-${k}`), nombre, entidad_certificadora: entidad, url_verificacion: url, fecha_emision: emision, fecha_vencimiento: vence, creado_en: haceDias(110) });
}
// lotes verdes: [clave, finca, proceso, fermentación, secado, humedad, responsable, trilla, clasificación, lote exportación, transporte]
const verdes = [
  ["v1", "huila-virginia", "Lavado", "2026-08-02", "2026-08-12", 11.2, "Paula Hernández", "2026-08-25", "Excelso Supremo, malla 17/18", "EXP-HUI-0826", "Contenedor 20' — Buenaventura"],
  ["v2", "huila-recuerdo", "Honey", "2026-08-06", "2026-08-18", 10.9, "Paula Hernández", "2026-08-28", "Supremo, malla 18", "EXP-HUI-0827", "Camión refrigerado — Bogotá"],
  ["v3", "huila-esperanza", "Natural", "2026-08-10", "2026-08-30", 11.5, "Paula Hernández", "2026-09-05", "Excelso, malla 15/16", "EXP-HUI-0831", "Camión — Medellín"],
  ["v4", "narino-paraiso", "Lavado", "2026-08-15", "2026-08-26", 11.0, "Juan Gómez", "2026-09-08", "Supremo, malla 17", "EXP-NAR-0901", "Camión — Cali"],
  ["v5", "cauca-naranjos", "Lavado", "2026-08-20", "2026-09-01", 11.3, "Juan Gómez", "2026-09-12", "Excelso Supremo, malla 17/18", "EXP-CAU-0905", "Camión — Medellín"],
  ["v6", "quindio-villasol", "Honey", "2026-08-24", "2026-09-04", 11.1, "Paula Hernández", "2026-09-15", "Excelso, malla 15/16", "EXP-QUI-0908", "Camión — Bogotá"],
  ["v7", "huila-recuerdo", "Natural", "2026-09-01", "2026-09-20", 11.4, "Paula Hernández", "2026-09-28", "Supremo, malla 18", "EXP-HUI-0930", "Camión refrigerado — Bogotá"],
  ["v8", "narino-paraiso", "Honey", "2026-09-05", "2026-09-17", 10.8, "Juan Gómez", "2026-09-30", "Supremo, malla 17", "EXP-NAR-1004", "Camión — Cali"],
];
for (const [k, finca, proceso, ferm, secado, humedad, resp, trilla, clasif, lote, transp] of verdes) {
  insertar("traz_lotes_verdes", { id: T(k), finca_id: T(`finca-${finca}`), tipo_proceso: proceso, fecha_fermentacion: ferm, fecha_secado: secado, humedad_final_pct: humedad, responsable_calidad: resp, fecha_trilla: trilla, clasificacion: clasif, lote_exportacion: lote, transporte: transp, foto_secado_url: null, creado_en: haceDias(70 - verdes.findIndex((v) => v[0] === k) * 4) });
}
const catas = [
  ["v1", "Paula Hernández", "2026-08-27", 8, 7, 8, "Cítrico limpio, panela, final largo y dulce."],
  ["v2", "Paula Hernández", "2026-08-30", 9, 6, 9, "Floral, durazno y miel; acidez brillante."],
  ["v3", "Juan Gómez", "2026-09-07", 6, 8, 8, "Frutos rojos maduros, cuerpo cremoso."],
  ["v4", "Juan Gómez", "2026-09-10", 8, 7, 7, "Manzana verde, caramelo, limpio."],
  ["v5", "Paula Hernández", "2026-09-14", 7, 8, 8, "Chocolate, nueces y un toque de naranja."],
  ["v6", "Paula Hernández", "2026-09-17", 7, 7, 8, "Mandarina, cacao y azúcar morena."],
  ["v7", "Paula Hernández", "2026-09-30", 8, 7, 9, "Fresa, vino suave y mucha dulzura."],
  ["v8", "Juan Gómez", "2026-10-02", 8, 6, 8, "Durazno, panela y acidez media-alta."],
];
catas.forEach(([v, catador, fecha, acidez, cuerpo, dulzor, notas], i) => {
  insertar("traz_fichas_cata", { id: T(`cata-${v}`), lote_verde_id: T(v), catador, fecha, acidez, cuerpo, dulzor, notas, creado_en: haceDias(55 - i * 3) });
});
// lotes tostados y sus componentes (blends)
const tostados = [
  ["t1", "2026-10-06", "Medio", "11 min 30 s, desarrollo 18%, curva estándar filtrado", "Juan Gómez", [["v1", 40], ["v2", 25], ["v4", 35]]],
  ["t2", "2026-10-09", "Claro", "10 min 10 s, desarrollo 15%, perfil frutal", "Juan Gómez", [["v3", 60]]],
  ["t3", "2026-10-13", "Medio", "12 min 00 s, desarrollo 19%", "Juan Gómez", [["v5", 45], ["v6", 30]]],
  ["t4", "2026-10-16", "Oscuro", "13 min 20 s, desarrollo 22%, perfil espresso", "Juan Gómez", [["v7", 50]]],
  ["t5", "2026-10-21", "Medio", "11 min 45 s, desarrollo 18%", "Juan Gómez", [["v1", 30], ["v8", 30]]],
];
tostados.forEach(([k, fecha, perfil, curva, maestro, comps], i) => {
  insertar("traz_lotes_tostados", { id: T(k), fecha, perfil_tueste: perfil, curva_tueste: curva, maestro_tostador: maestro, creado_en: haceDias(22 - i * 4) });
  for (const [v, kg] of comps) insertar("traz_componentes_blend", { id: T(`blend-${k}-${v}`), lote_tostado_id: T(k), lote_verde_id: T(v), kilogramos: kg });
});
// lotes de empaque con su QR (apunta a la ficha pública de ESTE sitio)
const empaques = [
  ["e1", "t1", "2026-10-08", "EEH-2026-10-A", "2027-10-08", "340g"],
  ["e2", "t1", "2026-10-08", "EEH-2026-10-B", "2027-10-08", "500g"],
  ["e3", "t2", "2026-10-11", "FRU-2026-10-A", "2027-10-11", "340g"],
  ["e4", "t3", "2026-10-15", "ARC-2026-10-A", "2027-10-15", "500g"],
  ["e5", "t4", "2026-10-18", "ESP-2026-10-A", "2027-10-18", "1kg"],
  ["e6", "t5", "2026-10-23", "EEH-2026-10-C", "2027-10-23", "250g"],
  ["e7", "t5", "2026-10-23", "EEH-2026-10-D", "2027-10-23", "340g"],
];
for (const [k, tostado, fecha, lote, vence, presentacion] of empaques) {
  const qr = await QRCode.toDataURL(`${BASE_URL}/lote/${T(k)}`, { margin: 1, width: 320, color: { dark: "#3B2020", light: "#F7F1E6" } });
  insertar("traz_lotes_empaque", { id: T(k), lote_tostado_id: T(tostado), fecha_empaque: fecha, lote_comercial: lote, fecha_vencimiento: vence, presentacion, qr_data_url: qr, creado_en: haceDias(20 - empaques.findIndex((x) => x[0] === k) * 2) });
}
// bitácora de auditoría de la cadena
const auditoria = [
  ...tfincas.map(([k, nombre]) => [`finca-${k}`, "Finca", `Finca "${nombre}" registrada.`, "Felipe Serna", 120]),
  ...verdes.map(([k], i) => [k, "LoteVerde", "Lote verde registrado (beneficiado + trilla).", "Demo Calidad", 70 - i * 4]),
  ...catas.map(([v], i) => [`cata-${v}`, "FichaCata", "Ficha de cata registrada.", "Demo Calidad", 55 - i * 3]),
  ...tostados.map(([k, , , , , comps], i) => [k, "LoteTostado", comps.length > 1 ? `Lote tostado registrado como blend de ${comps.length} lotes verdes.` : "Lote tostado registrado (origen único).", "David Illidge", 22 - i * 4]),
  ...empaques.map(([k], i) => [k, "LoteEmpaque", "Lote de empaque registrado y QR generado.", "David Illidge", 20 - i * 2]),
];
auditoria.forEach(([entidadId, entidad, resumen, usuario, hace], i) => {
  insertar("traz_auditoria", { id: T(`aud-${i}`), usuario_nombre: usuario, entidad, entidad_id: T(entidadId), accion: "crear", resumen, creado_en: haceDias(hace, 8 + (i % 8), (i * 11) % 60) });
});

// ---------------------------------------------------------------------------
// 8. Sistema POS: ventas de los últimos días (+ pedidos en cocina)
// ---------------------------------------------------------------------------
const LECHE = { entera: [0, "Leche Entera", 0], deslactosada: [1, "Leche Deslactosada", 0], almendra: [2, "Leche de Almendra", 2500], avena: [3, "Leche de Avena", 2500] };
const slugLeche = { entera: "leche-entera", deslactosada: "leche-deslactosada", almendra: "leche-de-almendra", avena: "leche-de-avena" };
// [producto, cantidad, leche?, notas?]
const L = (p, c = 1, leche = null, notas = "") => ({ p, c, leche, notas });
const tarjetas = ["VISA", "MASTERCARD", "AMEX", "DINERS"];
const ventas = [
  // [hace días, hora, cliente, líneas, método, propina, estado]
  [3, 8, "Mesa 2", [L("prod-latte", 2, "avena"), L("prod-croissant", 2)], "tarjeta", 2000, "entregado"],
  [3, 9, "", [L("prod-americano"), L("prod-almojabana", 2)], "efectivo", 0, "entregado"],
  [3, 11, "Reunión", [L("prod-cappuccino", 3), L("prod-brownie", 3)], "tarjeta", 5000, "entregado"],
  [3, 15, "", [L("prod-coldbrew", 2), L("prod-muffin")], "efectivo", 0, "entregado"],
  [2, 8, "", [L("prod-flatwhite", 1, "entera"), L("prod-desayuno-sandwich")], "tarjeta", 0, "entregado"],
  [2, 10, "Mesa 5", [L("prod-latte-helado", 2, "almendra"), L("prod-desayuno-huevos", 2)], "tarjeta", 4000, "entregado"],
  [2, 13, "", [L("prod-grano-huila-340"), L("prod-espresso")], "efectivo", 0, "entregado"],
  [2, 16, "Pedido telefónico", [L("prod-grano-arcoiris-500"), L("prod-grano-fruta-340")], "tarjeta", 0, "entregado"],
  [1, 8, "", [L("prod-americano", 2), L("prod-croissant", 2)], "efectivo", 0, "entregado"],
  [1, 9, "Mesa 1", [L("prod-latte", 1, "deslactosada"), L("prod-desayuno-tostadas")], "tarjeta", 1500, "entregado"],
  [1, 12, "", [L("prod-frappe", 2), L("prod-brownie", 2)], "efectivo", 0, "entregado"],
  [1, 17, "Obsequio cliente", [L("prod-merch-vaso"), L("prod-latte", 1, "entera")], "tarjeta", 0, "entregado"],
  [0, 8, "", [L("prod-espresso", 2), L("prod-almojabana", 2)], "efectivo", 0, "entregado"],
  [0, 9, "Mesa 3", [L("prod-cappuccino", 2, "almendra"), L("prod-muffin", 2)], "tarjeta", 3000, "entregado"],
  // en cocina ahora mismo
  [0, 10, "Mesa 4", [L("prod-latte", 2, "avena"), L("prod-desayuno-huevos"), L("prod-croissant")], "tarjeta", 2000, "enPreparacion"],
  [0, 10, "", [L("prod-americano"), L("prod-desayuno-sandwich")], "efectivo", 0, "enviadoCocina"],
];
const tasa = 0.08;
let n = 0;
for (const [hace, hora, cliente, lineas, metodo, propina, estado] of ventas) {
  n += 1;
  const pedidoId = uid(`pedido:demo:${n}`);
  const creado = haceDias(hace, hora, (n * 13) % 50);
  let subtotal = 0;
  let gravable = 0;
  const filas = [];
  lineas.forEach((l, i) => {
    const p = prod[l.p];
    if (!p) return;
    const delta = l.leche ? LECHE[l.leche][2] : 0;
    const unit = Number(p.precio_base) + delta;
    const sub = unit * l.c;
    subtotal += sub;
    if (p.gravable) gravable += sub;
    filas.push({ id: uid(`linea:${pedidoId}:${i}`), p, l, unit, sub, delta });
  });
  const impuesto = Math.round(gravable * tasa);
  const total = subtotal + impuesto;
  const listo = estado === "entregado";
  insertar("pos_pedidos", {
    id: pedidoId, nombre_cliente: cliente || null, canal: "mostrador", para_llevar: n % 4 === 0, estado, tasa_impuesto: tasa,
    empleado_id: cajeroId, creado_en: creado, enviado_cocina_en: creado, listo_en: listo ? creado : null, cobrado_en: creado,
  });
  for (const f of filas) {
    insertar("pos_pedido_lineas", {
      id: f.id, pedido_id: pedidoId, producto_id: f.p.id, descripcion: f.p.nombre, cantidad: f.l.c, precio_unitario: f.unit, subtotal_linea: f.sub,
      gravable: f.p.gravable, notas: f.l.notas, estado_cocina: listo ? "listo" : estado === "enPreparacion" ? "preparando" : "recibido",
    });
    if (f.l.leche) {
      const [idx, nombre, delta] = LECHE[f.l.leche];
      insertar("pos_linea_modificadores", { id: uid(`mod:${f.id}`), linea_id: f.id, modificador_id: `mod-leche-${slugLeche[f.l.leche]}-${f.p.id}-${idx}`, descripcion: nombre, precio_delta: delta, tipo: "agregar" });
    }
  }
  const efectivo = metodo === "efectivo";
  insertar("pos_pagos", {
    id: uid(`pago:${pedidoId}`), pedido_id: pedidoId, metodo, monto: total, propina,
    franquicia: efectivo ? null : tarjetas[n % tarjetas.length], tipo_tarjeta: efectivo ? null : n % 3 === 0 ? "credito" : "debito",
    ultimos4: efectivo ? null : String(1000 + ((n * 937) % 9000)), recibido: efectivo ? Math.ceil(total / 1000) * 1000 : null,
    estado: "aprobado", empleado_id: cajeroId, creado_en: creado,
  });
}
insertar("pos_auditoria", { id: uid("posaud:1"), usuario_nombre: "Felipe Serna", tipo: "producto86", referencia: "prod-brownie", detalle: "Brownie marcado como agotado (86) y vuelto a habilitar al reponer.", creado_en: haceDias(2, 14) });
insertar("pos_auditoria", { id: uid("posaud:2"), usuario_nombre: "Felipe Serna", tipo: "descuentoAplicado", referencia: "#6", detalle: "Descuento de $4.500 (10%): cliente frecuente.", creado_en: haceDias(2, 10) });

// ---------------------------------------------------------------------------
// Ejecutar todo en una transacción y mostrar el resumen
// ---------------------------------------------------------------------------
await sql.transaction((txn) => consultas.map(([texto, params]) => txn(texto, params)));
const [r] = await sql(`select
  (select count(*)::int from empleados) as empleados,
  (select count(*)::int from nomina_pagos) as pagos,
  (select count(*)::int from solicitudes) as solicitudes,
  (select count(*)::int from documentos) as documentos,
  (select count(*)::int from fincas) as fincas,
  (select count(*)::int from certificados_finca) as certificados,
  (select count(*)::int from tiendas) as tiendas,
  (select count(*)::int from traz_fincas) as traz_fincas,
  (select count(*)::int from traz_lotes_verdes) as lotes_verdes,
  (select count(*)::int from traz_lotes_tostados) as lotes_tostados,
  (select count(*)::int from traz_lotes_empaque) as lotes_empaque,
  (select count(*)::int from pos_pedidos) as pedidos_pos`);
console.log("sentencias:", consultas.length);
console.log(JSON.stringify(r, null, 1));
