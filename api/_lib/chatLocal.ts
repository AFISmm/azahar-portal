// ============================================================================
// Respuestas "básicas" del asistente: una guía de los módulos del portal que
// funciona SIN servicio de IA (sin GEMINI_API_KEY). Compara las palabras de la
// pregunta con una lista de temas y responde el más parecido, en frases cortas
// pensadas para leerse en voz alta. Con GEMINI_API_KEY se usa la IA en su lugar.
// ============================================================================

interface Tema {
  claves: string[];
  respuesta: string;
}

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const TEMAS: Tema[] = [
  {
    claves: ["vacaciones", "vacacion", "descanso", "dias libres"],
    respuesta:
      "Para pedir vacaciones entra a Nómina, luego a Vacaciones, elige las fechas y envía la solicitud. Un administrador de RRHH la aprueba o la rechaza y te llega una notificación con la campana.",
  },
  {
    claves: ["incapacidad", "incapacidades", "enfermo", "medico", "reposo", "eps"],
    respuesta:
      "Para radicar una incapacidad ve a Nómina, luego Incapacidades, indica las fechas y el motivo, y envíala. RRHH la revisa y verás su estado en Mis solicitudes.",
  },
  {
    claves: ["certificado laboral", "certificado salarial", "certificado", "certificados", "constancia"],
    respuesta:
      "En Nómina, opción Certificados, puedes solicitar un certificado laboral o salarial. Cuando RRHH lo aprueba aparece en tu lista de certificados emitidos.",
  },
  {
    claves: ["pago", "pagos", "nomina", "salario", "sueldo", "quincena", "proximo pago", "cuando pagan"],
    respuesta:
      "En Nómina, opción Nómina, ves tu historial de pagos con el periodo, el monto y si está pagado o pendiente, y la fecha de tu próximo pago.",
  },
  {
    claves: ["documento", "documentos", "contrato", "expediente", "subir archivo"],
    respuesta:
      "En Nómina, opción Documentos, ves los documentos de tu expediente, como el contrato, y puedes subir uno nuevo. En Mi contrato ves tu cargo, tipo de contrato y antigüedad.",
  },
  {
    claves: ["perfil", "contrasena", "clave", "password", "nickname", "correo", "cambiar mis datos", "mis datos"],
    respuesta:
      "En Mi perfil cambias tu correo, tu nickname y tu contraseña. Tus datos personales son de solo lectura, salvo que administres usuarios o RRHH. Si es tu primer ingreso, el portal te pide elegir una contraseña nueva.",
  },
  {
    claves: ["pqr", "queja", "reclamo", "peticion", "problema con la pagina", "error del portal", "reportar"],
    respuesta:
      "Para reportar un problema del portal entra a Mi perfil y pulsa Radicar PQR. Describe lo que pasó, adjunta una captura si quieres, y llega al equipo de desarrollo.",
  },
  {
    claves: ["usuarios", "permisos", "permiso", "acceso", "dar acceso", "quitar acceso", "roles", "rol", "modulos"],
    respuesta:
      "En Gestión de usuarios, los administradores ven todas las cuentas y marcan, en cada módulo, si la persona puede Ver o también Editar. Los cambios se guardan al instante. Las cuentas de Mercury Methods tienen acceso total.",
  },
  {
    claves: ["trazabilidad", "lote", "origen", "qr", "beneficiado", "tueste", "tostado", "empaque", "blend", "ficha de cata", "cata"],
    respuesta:
      "Trazabilidad sigue el café desde la finca hasta la bolsa: finca, certificaciones, beneficiado y trilla, ficha de cata, tueste con blends y empaque. Al empacar se genera un código QR que abre una ficha pública con el origen, el mapa y la línea de tiempo del lote.",
  },
  {
    claves: ["pos", "sistema pos", "caja", "vender", "venta", "ventas", "pedido", "pedidos", "cocina", "cobrar", "cobro", "ticket", "mostrador", "kds"],
    respuesta:
      "El Sistema POS tiene tres partes. En Caja tomas pedidos con sus modificadores y los cobras en efectivo o tarjeta. En Cocina se ve cada pedido y se marca cuando está listo. En Historial consultas las ventas. Lo que puedes hacer depende de tus permisos de ver o editar.",
  },
  {
    claves: ["tienda", "tiendas", "gestion comercial", "comercial", "estado de la tienda", "remodelacion", "agregar tienda"],
    respuesta:
      "En Gestión comercial ves las ventas por tienda. Quien puede editar el módulo agrega tiendas, cambia su estado entre activa, en remodelación o cerrada, y las elimina.",
  },
  {
    claves: ["finca", "fincas", "gestion operativa", "operativa", "certificacion de finca", "organico", "rainforest", "fair trade"],
    respuesta:
      "En Gestión operativa registras las fincas cafeteras, con su ubicación, propietario, área y variedad, y sus certificados, como orgánico, Rainforest o Fair Trade, con las fechas de emisión y vencimiento.",
  },
  {
    claves: ["estrategica", "estrategia", "okr", "objetivos", "kpi", "indicadores"],
    respuesta:
      "Gestión estratégica muestra los objetivos de la empresa, el avance de cada iniciativa y los indicadores de alto nivel, como el crecimiento de ventas y el NPS.",
  },
  {
    claves: ["informacion general", "calendario tributario", "calculadora", "costo por taza", "margen", "impuestos"],
    respuesta:
      "Información general tiene el calendario tributario colombiano, los indicadores económicos y calculadoras del negocio cafetero, como el costo por taza y el margen de utilidad.",
  },
  {
    claves: ["inicio", "mercado", "precio del cafe", "bolsa", "trm", "dolar", "ticker", "cadena de produccion"],
    respuesta:
      "Inicio muestra el panorama del mercado del café: estadísticas mundiales, la cadena de producción y el precio del café en bolsa. Arriba hay un ticker con la TRM, el petróleo, el café y el oro actualizados cada minuto.",
  },
  {
    claves: ["tema", "oscuro", "claro", "idioma", "notificaciones", "campana", "modo oscuro"],
    respuesta:
      "Arriba a la derecha tienes el cambio de idioma, la campana de notificaciones y el botón de tema claro u oscuro.",
  },
  {
    claves: ["voz", "hablar", "microfono", "conversar", "escuchar", "hablame", "audio"],
    respuesta:
      "Pulsa el botón de ondas en la cabecera del chat para conversar por voz: me hablas, te respondo hablando y vuelvo a escucharte solo. Di adiós para terminar. También puedes cambiar mi nombre, mi voz y mi velocidad con el botón de ajustes, y arrastrarme por la pantalla.",
  },
  {
    claves: ["mover", "arrastrar", "posicion", "esquina", "personalizar", "nombre"],
    respuesta:
      "Puedes arrastrar mi botón a cualquier parte de la pantalla y recuerdo dónde me dejaste. Con el botón de ajustes cambias mi nombre, mi voz y mi velocidad, y puedes devolverme a la esquina.",
  },
  {
    claves: ["quien eres", "como te llamas", "que eres", "que haces", "para que sirves", "ayuda", "ayudame", "que puedes hacer"],
    respuesta:
      "Soy el asistente del Portal Azahar. Te explico qué hace cada módulo y cómo hacer cosas, por ejemplo pedir vacaciones, consultar tu nómina, registrar un lote de café o cobrar en el POS. Pregúntame lo que necesites.",
  },
];

const SALUDOS = ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "saludos"];
const GRACIAS = ["gracias", "muchas gracias", "te agradezco", "listo gracias", "perfecto gracias"];

/** Respuesta básica (sin IA) a una pregunta sobre el portal. */
export function responderLocal(mensaje: string, nombre: string): string {
  const n = normalizar(mensaje);
  if (!n) return "No te escuché bien. ¿Me repites la pregunta?";
  const palabras = n.split(" ");

  if (palabras.length <= 4 && GRACIAS.some((g) => n.includes(g))) return "¡Con gusto! Si tienes otra duda del portal, aquí estoy.";
  if (palabras.length <= 4 && SALUDOS.some((s) => n === s || n.startsWith(s + " "))) {
    return `¡Hola! Soy ${nombre}, el asistente del Portal Azahar. ¿En qué te puedo ayudar? Puedes preguntarme, por ejemplo, cómo pedir vacaciones, cómo registrar un lote de café o cómo cobrar en el POS.`;
  }

  if (n.includes("como te llamas") || n.includes("tu nombre") || n.includes("quien eres")) {
    return `Me llamo ${nombre}. Soy el asistente del Portal Azahar: te explico qué hace cada módulo y cómo usarlo. Pregúntame lo que necesites.`;
  }

  let mejor: Tema | null = null;
  let mejorPuntaje = 0;
  for (const tema of TEMAS) {
    let puntaje = 0;
    for (const clave of tema.claves) {
      const c = normalizar(clave);
      // una clave de varias palabras pesa más; se busca como palabra completa o frase completa
      if ((" " + n + " ").includes(" " + c + " ")) puntaje += c.includes(" ") ? 3 : 2;
    }
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejor = tema;
    }
  }
  if (mejor) return mejor.respuesta;

  return `No tengo una respuesta exacta para eso, pero te puedo orientar sobre los módulos del portal: Nómina, con vacaciones, incapacidades y certificados; Gestión de usuarios; Gestión del negocio; Trazabilidad del café; y el Sistema POS. ¿Sobre cuál quieres saber?`;
}
