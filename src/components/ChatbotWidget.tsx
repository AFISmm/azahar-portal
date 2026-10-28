import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { AudioLines, Loader2, LocateFixed, Mic, MicOff, Send, Settings2, Volume2, VolumeX, X } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { Asistente3D } from "./asistente3d/Asistente3D";
import { ElegirAsistente, type EleccionAsistente } from "./asistente3d/ElegirAsistente";

// ============================================================================
// Asistente del portal: se puede ARRASTRAR a cualquier parte de la pantalla (y
// recuerda dónde lo dejaste), se puede PERSONALIZAR (nombre, voz, velocidad) y
// tiene un MODO CONVERSACIÓN manos libres: le hablas por el micrófono, responde
// con voz y vuelve a escucharte solo, hasta que digas "adiós" o lo apagues.
// La voz y el reconocimiento usan las funciones gratuitas del navegador (Web
// Speech API): no hace falta ningún servicio extra.
// ============================================================================

interface Mensaje {
  rol: "user" | "assistant";
  contenido: string;
}

type GeneroVoz = "masculina" | "femenina";

interface Ajustes {
  nombre: string;
  genero: GeneroVoz;
  velocidad: number; // 0.8 – 1.3
  tono: number; // tono de piel del personaje 3D (0–3)
}

interface PosicionRel {
  fx: number; // fracción del ancho de la ventana (0–1), esquina izquierda del botón
  fy: number; // fracción del alto
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

const NOMBRE_POR_DEFECTO = "JARVIS";
const STORAGE_AJUSTES = "azahar-chat-ajustes";
const STORAGE_POSICION = "azahar-chat-posicion";
const STORAGE_ELEGIDO = "azahar-chat-personaje-elegido"; // + ":" + id del empleado
const STORAGE_MUTE = "jarvis-voz-desactivada";
const STORAGE_GENERO_ANTIGUO = "jarvis-genero-voz";
const MARGEN = 8; // px de margen al borde de la pantalla
const UMBRAL_ARRASTRE = 6; // px que hay que mover para que cuente como arrastre y no como clic
const MAX_SIN_VOZ = 3; // escuchas seguidas sin oír nada antes de salir del modo conversación

const FRASES_SALIDA = ["adios", "hasta luego", "chao", "chau", "terminar", "terminemos", "salir", "silencio", "eso es todo", "nada mas", "ya no", "detente", "para ya"];

function leerJson<T>(clave: string): T | null {
  try {
    const crudo = window.localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T) : null;
  } catch {
    return null;
  }
}

function guardarJson(clave: string, valor: unknown) {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // sin almacenamiento disponible (modo privado, etc.): funciona igual, solo no recuerda
  }
}

function ajustesIniciales(): Ajustes {
  const guardados = typeof window !== "undefined" ? leerJson<Partial<Ajustes>>(STORAGE_AJUSTES) : null;
  let generoAntiguo: GeneroVoz | null = null;
  try {
    generoAntiguo = window.localStorage.getItem(STORAGE_GENERO_ANTIGUO) as GeneroVoz | null;
  } catch {
    generoAntiguo = null;
  }
  const velocidad = typeof guardados?.velocidad === "number" ? Math.min(1.3, Math.max(0.8, guardados.velocidad)) : 1;
  return {
    nombre: limpiarNombre(guardados?.nombre) || NOMBRE_POR_DEFECTO,
    genero: guardados?.genero === "masculina" || guardados?.genero === "femenina" ? guardados.genero : (generoAntiguo ?? "femenina"),
    velocidad,
    tono: typeof guardados?.tono === "number" && guardados.tono >= 0 && guardados.tono <= 3 ? Math.round(guardados.tono) : 0,
  };
}

function limpiarNombre(v: unknown): string {
  return typeof v === "string" ? v.replace(/[^\p{L}\p{N} _-]/gu, "").trim().slice(0, 20) : "";
}

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** true si lo que dijo la persona es una orden de terminar la conversación ("adiós", "eso es todo"…). */
function esOrdenDeSalida(texto: string): boolean {
  const n = normalizar(texto);
  if (n.split(" ").length > 6) return false; // una pregunta larga no es una despedida
  return FRASES_SALIDA.some((f) => n === f || n.startsWith(f + " ") || n.endsWith(" " + f) || n.includes(" " + f + " "));
}

// ---------------------------------------------------------------------------
// Voz (síntesis del navegador)
// ---------------------------------------------------------------------------

const PISTAS_VOZ_FEMENINA = [
  "female", "mujer", "sabina", "dalia", "helena", "elena", "elvira", "laura", "lucia", "paulina", "raquel", "monica", "isabela", "camila",
  "valentina", "sofia", "carmen", "maria", "conchita", "esperanza", "marisol", "penelope", "salome", "victoria", "zira", "paloma", "catalina", "renata", "alba",
];
const PISTAS_VOZ_MASCULINA = [
  "male", "hombre", "pablo", "diego", "jorge", "raul", "raúl", "alvaro", "álvaro", "carlos", "andres", "andrés", "miguel", "juan", "enrique", "fernando",
  "santiago", "sebastian", "sebastián", "mateo", "tomas", "tomás", "david",
];

/** Heurística de género según el nombre reportado por el navegador (la Web Speech API no expone género). */
function generoDeVoz(v: SpeechSynthesisVoice): GeneroVoz | undefined {
  const nombre = v.name.toLowerCase();
  if (PISTAS_VOZ_FEMENINA.some((p) => nombre.includes(p))) return "femenina";
  if (PISTAS_VOZ_MASCULINA.some((p) => nombre.includes(p))) return "masculina";
  return undefined;
}

/**
 * Elige la voz que suene más natural: español latinoamericano antes que el de España, voces "Natural" /
 * "Neural" / "Online" / de Google antes que las básicas, y el género pedido cuando se puede distinguir.
 */
function elegirVoz(voces: SpeechSynthesisVoice[], genero: GeneroVoz): { voz?: SpeechSynthesisVoice; generoConocido: boolean } {
  const es = voces.filter((v) => v.lang?.toLowerCase().startsWith("es"));
  const candidatas = es.length > 0 ? es : voces;
  const puntaje = (v: SpeechSynthesisVoice) => {
    const nombre = v.name.toLowerCase();
    const lang = (v.lang ?? "").toLowerCase().replace("_", "-");
    let p = 0;
    if (lang === "es-co") p += 3;
    else if (["es-mx", "es-us", "es-419", "es-ar", "es-cl", "es-pe"].includes(lang)) p += 2;
    else if (lang.startsWith("es")) p += 1;
    if (/natural|neural|online/.test(nombre)) p += 4;
    else if (nombre.includes("google")) p += 2;
    const g = generoDeVoz(v);
    if (g === genero) p += 3;
    else if (g === undefined) p += 1;
    else p -= 3;
    return p;
  };
  const ordenadas = [...candidatas].sort((a, b) => puntaje(b) - puntaje(a));
  const voz = ordenadas[0];
  return { voz, generoConocido: !!voz && generoDeVoz(voz) === genero };
}

/** Quita lo que suena mal al leerlo en voz alta: markdown, enlaces, símbolos y saltos de línea. */
function limpiarParaVoz(texto: string): string {
  return texto
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[*_#`>~|]/g, "")
    .replace(/\s*\n+\s*/g, ". ")
    .replace(/\.\s*\./g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Parte el texto en trozos cortos: Chrome corta en silencio las locuciones largas (más de ~15 s). */
function trocear(texto: string): string[] {
  const frases = texto.split(/(?<=[.!?¿:;])\s+/);
  const trozos: string[] = [];
  let actual = "";
  for (const f of frases) {
    if ((actual + " " + f).trim().length > 170 && actual) {
      trozos.push(actual.trim());
      actual = f;
    } else {
      actual = (actual + " " + f).trim();
    }
  }
  if (actual) trozos.push(actual.trim());
  return trozos;
}

let tokenHabla = 0; // al cancelar una locución, sus eventos "onend" tardíos deben ignorarse

function detenerVoz() {
  tokenHabla += 1;
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

/** Habla `texto` por trozos y avisa con `alFinalizar` solo si NO la cancelaron (otra locución o `detenerVoz`). */
function hablar(texto: string, ajustes: Pick<Ajustes, "genero" | "velocidad">, alFinalizar?: () => void, alIniciar?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    alFinalizar?.();
    return;
  }
  const trozos = trocear(limpiarParaVoz(texto));
  if (trozos.length === 0) {
    alFinalizar?.();
    return;
  }
  detenerVoz();
  const miToken = tokenHabla;

  function arrancar() {
    if (miToken !== tokenHabla) return;
    const { voz, generoConocido } = elegirVoz(window.speechSynthesis.getVoices(), ajustes.genero);
    let i = 0;
    const siguiente = () => {
      if (miToken !== tokenHabla) return;
      if (i >= trozos.length) {
        alFinalizar?.();
        return;
      }
      const u = new SpeechSynthesisUtterance(trozos[i]);
      i += 1;
      u.lang = voz?.lang || "es-CO";
      if (voz) u.voice = voz;
      u.rate = ajustes.velocidad;
      // Si el sistema no distingue voces masculina/femenina, el tono marca la diferencia.
      u.pitch = generoConocido ? 1 : ajustes.genero === "masculina" ? 0.85 : 1.12;
      if (i === 1) u.onstart = () => alIniciar?.();
      u.onend = siguiente;
      u.onerror = (ev) => {
        if (miToken !== tokenHabla) return;
        // "interrupted"/"canceled" son cancelaciones nuestras; cualquier otro error: pasar al siguiente trozo
        if (ev.error === "interrupted" || ev.error === "canceled") return;
        siguiente();
      };
      window.speechSynthesis.speak(u);
    };
    // Chrome a veces ignora speak() si se llama en el mismo tick que cancel(): pequeño retraso.
    window.setTimeout(siguiente, 60);
  }

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", arrancar, { once: true });
    // si el navegador nunca avisa, se habla con la voz por defecto
    window.setTimeout(arrancar, 800);
  } else {
    arrancar();
  }
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export function ChatbotWidget() {
  const { empleado } = useAuth();
  const claveElegido = `${STORAGE_ELEGIDO}:${empleado?.id ?? ""}`;
  const [ajustes, setAjustes] = useState<Ajustes>(ajustesIniciales);
  // Al iniciar sesión por primera vez (en este navegador) se elige si el asistente es él o ella.
  const [eligiendo, setEligiendo] = useState(() => {
    if (typeof window === "undefined" || !empleado) return false;
    try {
      return window.localStorage.getItem(claveElegido) !== "1";
    } catch {
      return false;
    }
  });
  const [cambiandoPersonaje, setCambiandoPersonaje] = useState(false);
  const nombre = ajustes.nombre;

  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>(() => [saludoInicial(ajustesIniciales().nombre)]);
  const [entrada, setEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [hablando, setHablando] = useState(false);
  const [conversando, setConversando] = useState(false);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [modoRespuesta, setModoRespuesta] = useState<"ia" | "basico" | null>(null);
  const [vozActivada, setVozActivada] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_MUTE) !== "1";
    } catch {
      return true;
    }
  });

  // ---- posición arrastrable ----
  const [posicion, setPosicion] = useState<PosicionRel | null>(() => (typeof window !== "undefined" ? leerJson<PosicionRel>(STORAGE_POSICION) : null));
  const [viewport, setViewport] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1280, h: typeof window !== "undefined" ? window.innerHeight : 800, rem: 16 });
  const arrastreRef = useRef<{ id: number; x0: number; y0: number; bx: number; by: number; movido: boolean; desdeBoton: boolean } | null>(null);

  const finRef = useRef<HTMLDivElement>(null);
  const yaSaludoRef = useRef(false);
  const reconocimientoRef = useRef<SpeechRecognitionInstance | null>(null);
  const timeoutEscuchaRef = useRef<number | null>(null);
  const sinVozRef = useRef(0);
  // refs espejo del estado: los callbacks del reconocimiento/voz viven más que un render
  const conversandoRef = useRef(false);
  const abiertoRef = useRef(false);
  const enviandoRef = useRef(false);
  const hablandoRef = useRef(false);
  const vozActivadaRef = useRef(vozActivada);
  const ajustesRef = useRef(ajustes);
  const mensajesRef = useRef(mensajes);
  const porVozRef = useRef(false);

  useEffect(() => { conversandoRef.current = conversando; }, [conversando]);
  useEffect(() => { abiertoRef.current = abierto; }, [abierto]);
  useEffect(() => { enviandoRef.current = enviando; }, [enviando]);
  useEffect(() => { hablandoRef.current = hablando; }, [hablando]);
  useEffect(() => { vozActivadaRef.current = vozActivada; }, [vozActivada]);
  useEffect(() => { ajustesRef.current = ajustes; }, [ajustes]);
  useEffect(() => { mensajesRef.current = mensajes; }, [mensajes]);

  const soportaReconocimiento = typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const esMovil = viewport.w < 640;
  const tamBoton = viewport.rem * 4;

  useLayoutEffect(() => {
    const medir = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight, rem: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 });
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  /** Esquina superior izquierda del botón en píxeles, siempre dentro de la pantalla. */
  const posBoton = useCallback(
    (rel: PosicionRel | null) => {
      const maxX = viewport.w - tamBoton - MARGEN;
      const maxY = viewport.h - tamBoton - MARGEN;
      if (!rel) return { x: maxX - (esMovil ? 8 : 16), y: maxY - (esMovil ? 8 : 16) };
      return { x: Math.min(maxX, Math.max(MARGEN, rel.fx * viewport.w)), y: Math.min(maxY, Math.max(MARGEN, rel.fy * viewport.h)) };
    },
    [viewport, tamBoton, esMovil],
  );

  const botonPx = posBoton(posicion);

  /** Ventana de chat junto al botón: se abre hacia el lado donde hay más espacio. */
  const anchoVentana = Math.min(viewport.rem * 26, viewport.w - 2 * MARGEN);
  const altoVentana = Math.min(viewport.rem * 34, viewport.h * 0.74);
  const ventanaPx = (() => {
    const haciaIzquierda = botonPx.x + tamBoton / 2 > viewport.w / 2;
    const haciaArriba = botonPx.y + tamBoton / 2 > viewport.h / 2;
    const x = haciaIzquierda ? botonPx.x + tamBoton - anchoVentana : botonPx.x;
    const y = haciaArriba ? botonPx.y - altoVentana - MARGEN : botonPx.y + tamBoton + MARGEN;
    return {
      x: Math.min(viewport.w - anchoVentana - MARGEN, Math.max(MARGEN, x)),
      y: Math.min(viewport.h - altoVentana - MARGEN, Math.max(MARGEN, y)),
    };
  })();

  function iniciarArrastre(e: ReactPointerEvent<HTMLElement>, desdeBoton: boolean) {
    if (!desdeBoton && esMovil) return; // en el celular la ventana ocupa la pantalla: no se arrastra
    if (e.button !== 0 && e.pointerType === "mouse") return;
    arrastreRef.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, bx: botonPx.x, by: botonPx.y, movido: false, desdeBoton };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function moverArrastre(e: ReactPointerEvent<HTMLElement>) {
    const a = arrastreRef.current;
    if (!a || a.id !== e.pointerId) return;
    const dx = e.clientX - a.x0;
    const dy = e.clientY - a.y0;
    if (!a.movido && Math.hypot(dx, dy) < UMBRAL_ARRASTRE) return;
    a.movido = true;
    setPosicion({ fx: (a.bx + dx) / viewport.w, fy: (a.by + dy) / viewport.h });
  }

  function terminarArrastre(e: ReactPointerEvent<HTMLElement>) {
    const a = arrastreRef.current;
    if (!a || a.id !== e.pointerId) return;
    arrastreRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ya liberado
    }
    if (a.movido) {
      // se ajusta a los límites reales antes de recordarla
      const fijada = posBoton({ fx: (a.bx + (e.clientX - a.x0)) / viewport.w, fy: (a.by + (e.clientY - a.y0)) / viewport.h });
      const rel = { fx: fijada.x / viewport.w, fy: fijada.y / viewport.h };
      setPosicion(rel);
      guardarJson(STORAGE_POSICION, rel);
    } else if (a.desdeBoton) {
      alternarChat();
    }
  }

  function restablecerPosicion() {
    setPosicion(null);
    try {
      window.localStorage.removeItem(STORAGE_POSICION);
    } catch {
      // nada que borrar
    }
  }

  // ---- ciclo de vida ----
  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

  useEffect(
    () => () => {
      conversandoRef.current = false;
      detenerVoz();
      if (timeoutEscuchaRef.current !== null) window.clearTimeout(timeoutEscuchaRef.current);
      reconocimientoRef.current?.abort();
    },
    [],
  );

  function actualizarAjustes(parcial: Partial<Ajustes>) {
    setAjustes((actual) => {
      const nuevo = { ...actual, ...parcial };
      guardarJson(STORAGE_AJUSTES, nuevo);
      return nuevo;
    });
  }

  function confirmarPersonaje(e: EleccionAsistente) {
    actualizarAjustes({ genero: e.genero, tono: e.tono, nombre: limpiarNombre(e.nombre) || ajustes.nombre });
    setMensajes((m) => (m.length <= 1 ? [saludoInicial(limpiarNombre(e.nombre) || ajustes.nombre)] : m));
    try {
      window.localStorage.setItem(claveElegido, "1");
    } catch {
      // sin almacenamiento: se volverá a preguntar la próxima vez
    }
    setEligiendo(false);
    setCambiandoPersonaje(false);
  }

  function elegirGenero(g: GeneroVoz) {
    actualizarAjustes({ genero: g });
    hablar(`Hola, soy ${nombre}. Así sueno con esta voz.`, { genero: g, velocidad: ajustes.velocidad });
  }

  function alternarVoz() {
    const nuevo = !vozActivada;
    setVozActivada(nuevo);
    try {
      window.localStorage.setItem(STORAGE_MUTE, nuevo ? "0" : "1");
    } catch {
      // sin almacenamiento
    }
    if (!nuevo) {
      detenerVoz();
      setHablando(false);
      if (conversandoRef.current) detenerConversacion();
    }
  }

  function agregarMensaje(m: Mensaje) {
    setMensajes((actuales) => [...actuales, m]);
  }

  // ---- escucha ----
  function limpiarTimeoutEscucha() {
    if (timeoutEscuchaRef.current !== null) {
      window.clearTimeout(timeoutEscuchaRef.current);
      timeoutEscuchaRef.current = null;
    }
  }

  function detenerEscucha() {
    limpiarTimeoutEscucha();
    const r = reconocimientoRef.current;
    reconocimientoRef.current = null;
    if (r) {
      r.onresult = null;
      r.onerror = null;
      r.onend = null;
      try {
        r.abort();
      } catch {
        // ya detenido
      }
    }
    setEscuchando(false);
  }

  function detenerConversacion(mensajeFinal?: string) {
    conversandoRef.current = false;
    setConversando(false);
    sinVozRef.current = 0;
    detenerEscucha();
    detenerVoz();
    setHablando(false);
    setEntrada("");
    if (mensajeFinal) {
      agregarMensaje({ rol: "assistant", contenido: mensajeFinal });
      if (vozActivadaRef.current) {
        setHablando(true);
        hablar(mensajeFinal, ajustesRef.current, () => setHablando(false));
      }
    }
  }

  /** Abre el micrófono una vez. En modo conversación, al terminar de hablar la respuesta se vuelve a llamar sola. */
  function escuchar() {
    if (!soportaReconocimiento || reconocimientoRef.current) return;
    const Constructor = window.SpeechRecognition ?? window.webkitSpeechRecognition!;
    const reconocimiento = new Constructor();
    reconocimiento.lang = "es-CO";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = true; // se ve lo que va entendiendo mientras hablas
    let huboResultado = false;

    reconocimiento.onresult = (evento) => {
      limpiarTimeoutEscucha();
      let parcial = "";
      let final = "";
      for (let i = evento.resultIndex; i < evento.results.length; i++) {
        const r = evento.results[i];
        if (r.isFinal) final += r[0].transcript;
        else parcial += r[0].transcript;
      }
      if (parcial) setEntrada(parcial);
      if (final.trim()) {
        huboResultado = true;
        sinVozRef.current = 0;
        setEntrada("");
        const texto = final.trim();
        if (conversandoRef.current && esOrdenDeSalida(texto)) {
          agregarMensaje({ rol: "user", contenido: texto });
          detenerConversacion("¡Hasta luego! Cuando quieras seguimos hablando.");
          return;
        }
        porVozRef.current = true;
        void enviarTexto(texto);
      }
    };

    reconocimiento.onerror = (evento) => {
      limpiarTimeoutEscucha();
      reconocimientoRef.current = null;
      setEscuchando(false);
      if (evento.error === "aborted") return;
      if (evento.error === "no-speech") {
        // silencio: en conversación se reintenta unas veces y luego se despide
        if (conversandoRef.current) {
          sinVozRef.current += 1;
          if (sinVozRef.current >= MAX_SIN_VOZ) detenerConversacion("No te escucho. Cuando quieras retomamos: pulsa el botón de conversar.");
        }
        return;
      }
      conversandoRef.current = false;
      setConversando(false);
      const mensaje =
        evento.error === "not-allowed" || evento.error === "service-not-allowed" || evento.error === "audio-capture"
          ? "No pude acceder al micrófono. Revisa que le hayas dado permiso a este sitio en tu navegador (el candado junto a la dirección)."
          : evento.error === "network"
            ? "No pude conectarme al servicio de reconocimiento de voz. Revisa tu conexión a internet e intenta de nuevo."
            : "No entendí lo que dijiste por el micrófono. Intenta de nuevo o escribe tu pregunta.";
      agregarMensaje({ rol: "assistant", contenido: mensaje });
    };

    reconocimiento.onend = () => {
      limpiarTimeoutEscucha();
      const eraEste = reconocimientoRef.current === reconocimiento;
      if (eraEste) reconocimientoRef.current = null;
      setEscuchando(false);
      // Si no llegó nada y seguimos en conversación (y no estamos pensando ni hablando), se vuelve a escuchar.
      if (eraEste && !huboResultado && conversandoRef.current && abiertoRef.current && !enviandoRef.current && !hablandoRef.current) {
        window.setTimeout(() => {
          if (conversandoRef.current && !reconocimientoRef.current && !enviandoRef.current && !hablandoRef.current) escuchar();
        }, 250);
      }
    };

    reconocimientoRef.current = reconocimiento;
    setEscuchando(true);
    try {
      reconocimiento.start();
    } catch {
      reconocimientoRef.current = null;
      setEscuchando(false);
      return;
    }
    // Salvaguarda: si el navegador nunca dispara onresult/onerror/onend, se fuerza el corte.
    timeoutEscuchaRef.current = window.setTimeout(() => {
      if (reconocimientoRef.current !== reconocimiento) return;
      reconocimiento.onend = null;
      reconocimiento.onerror = null;
      try {
        reconocimiento.abort();
      } catch {
        // ya detenido
      }
      reconocimientoRef.current = null;
      setEscuchando(false);
      if (conversandoRef.current) {
        sinVozRef.current += 1;
        if (sinVozRef.current >= MAX_SIN_VOZ) detenerConversacion("No te escucho. Cuando quieras retomamos: pulsa el botón de conversar.");
        else escuchar();
      } else {
        agregarMensaje({ rol: "assistant", contenido: "No detecté audio del micrófono. Revisa que esté permitido y activo en tu navegador, e intenta de nuevo." });
      }
    }, 12000);
  }

  /** Micrófono de un solo uso (dictar una pregunta). Si el asistente está hablando, lo interrumpe y te escucha. */
  function alternarMicrofono() {
    if (!soportaReconocimiento) return;
    if (escuchando) {
      detenerEscucha();
      return;
    }
    detenerVoz();
    setHablando(false);
    escuchar();
  }

  /** Modo conversación manos libres: escucha → responde con voz → vuelve a escuchar. */
  function alternarConversacion() {
    if (!soportaReconocimiento) return;
    if (conversandoRef.current) {
      detenerConversacion();
      return;
    }
    if (!vozActivadaRef.current) {
      setVozActivada(true);
      vozActivadaRef.current = true;
      try {
        window.localStorage.setItem(STORAGE_MUTE, "0");
      } catch {
        // sin almacenamiento
      }
    }
    sinVozRef.current = 0;
    conversandoRef.current = true;
    setConversando(true);
    setAbierto(true);
    abiertoRef.current = true;
    detenerVoz();
    setHablando(false);
    escuchar();
  }

  function alternarChat() {
    const nuevo = !abiertoRef.current;
    abiertoRef.current = nuevo;
    setAbierto(nuevo);
    if (nuevo && !yaSaludoRef.current) {
      yaSaludoRef.current = true;
      if (vozActivadaRef.current) {
        const frase = `Bienvenido al portal, mi nombre es ${ajustesRef.current.nombre} y estoy disponible para ayudarte en lo que necesites.`;
        setHablando(true);
        hablar(frase, ajustesRef.current, () => setHablando(false));
      }
    }
    if (!nuevo) {
      // al cerrar se apaga todo: ni voz ni micrófono quedan activos en segundo plano
      conversandoRef.current = false;
      setConversando(false);
      detenerEscucha();
      detenerVoz();
      setHablando(false);
      setMostrarAjustes(false);
    }
  }

  // ---- conversación con el asistente ----
  async function enviarTexto(texto: string) {
    if (!texto.trim() || enviandoRef.current) return;
    const porVoz = porVozRef.current || conversandoRef.current;
    porVozRef.current = false;

    const historialPrevio = mensajesRef.current;
    agregarMensaje({ rol: "user", contenido: texto });
    setEntrada("");
    setEnviando(true);
    enviandoRef.current = true;
    detenerEscucha();

    let respuesta: string;
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto, historial: historialPrevio, nombreAsistente: ajustesRef.current.nombre, modoVoz: porVoz }),
      });
      const datos = (await resp.json().catch(() => null)) as { ok: boolean; respuesta?: string; modo?: "ia" | "basico"; mensaje?: string } | null;
      if (datos?.ok && datos.respuesta) {
        respuesta = datos.respuesta;
        if (datos.modo) setModoRespuesta(datos.modo);
      } else {
        respuesta = datos?.mensaje || "No pude responder en este momento. Intenta de nuevo en un momento.";
      }
    } catch {
      respuesta = "No pude conectarme en este momento. Revisa tu conexión e intenta de nuevo.";
    }
    agregarMensaje({ rol: "assistant", contenido: respuesta });
    setEnviando(false);
    enviandoRef.current = false;

    const reanudar = () => {
      setHablando(false);
      if (conversandoRef.current && abiertoRef.current) escuchar();
    };
    if (vozActivadaRef.current && abiertoRef.current) {
      hablar(respuesta, ajustesRef.current, reanudar, () => setHablando(true));
    } else {
      reanudar();
    }
  }

  function enviarMensaje(e: FormEvent) {
    e.preventDefault();
    void enviarTexto(entrada);
  }

  const estado = escuchando ? "Escuchando…" : enviando ? "Pensando…" : hablando ? "Hablando…" : conversando ? "Conversación activa" : "";

  const clasesVentana = esMovil
    ? "fixed inset-x-2 bottom-24 top-20"
    : "fixed";
  const estiloVentana = esMovil ? undefined : { left: ventanaPx.x, top: ventanaPx.y, width: anchoVentana, height: altoVentana };

  return (
    <>
      {abierto && (
        <div
          className={`${clasesVentana} z-40 flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-card`}
          style={estiloVentana}
          role="dialog"
          aria-label={`Chat con ${nombre}`}
        >
          {/* La cabecera sirve de "agarradera" para mover todo el asistente por la pantalla */}
          <div
            className={`flex select-none items-center justify-between bg-brand-800 px-3 py-2.5 ${esMovil ? "" : "cursor-grab touch-none active:cursor-grabbing"}`}
            onPointerDown={(e) => iniciarArrastre(e, false)}
            onPointerMove={moverArrastre}
            onPointerUp={terminarArrastre}
            onPointerCancel={terminarArrastre}
            title={esMovil ? undefined : "Arrastra para mover el asistente"}
          >
            <div className="flex min-w-0 items-center gap-2 text-cream-100">
              <Asistente3D genero={ajustes.genero} tono={ajustes.tono} hablando={hablando} escuchando={escuchando} pensando={enviando} className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-cream-100 ring-1 ring-accent-300/70" />
              <div className="min-w-0 leading-tight">
                <p className="truncate font-heading text-sm font-semibold">{nombre}</p>
                <p className="truncate text-[11px] text-cream-200/80" aria-live="polite">
                  {estado || "Asistente del Portal Azahar"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-0.5" onPointerDown={(e) => e.stopPropagation()}>
              {soportaReconocimiento && (
                <button
                  onClick={alternarConversacion}
                  className={`rounded-full p-2 transition ${conversando ? "bg-accent-500 text-brand-900" : "text-cream-100/80 hover:bg-white/10 hover:text-cream-100"}`}
                  aria-label={conversando ? "Terminar la conversación por voz" : "Conversar por voz (manos libres)"}
                  aria-pressed={conversando}
                  title={conversando ? "Terminar la conversación por voz" : "Conversar por voz (manos libres)"}
                >
                  <AudioLines className="h-4 w-4" strokeWidth={1.75} />
                </button>
              )}
              <button
                onClick={alternarVoz}
                className="rounded-full p-2 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100"
                aria-label={vozActivada ? "Silenciar respuestas habladas" : "Activar respuestas habladas"}
                title={vozActivada ? "Silenciar respuestas habladas" : "Activar respuestas habladas"}
              >
                {vozActivada ? <Volume2 className="h-4 w-4" strokeWidth={1.75} /> : <VolumeX className="h-4 w-4" strokeWidth={1.75} />}
              </button>
              <button
                onClick={() => setMostrarAjustes((v) => !v)}
                className={`rounded-full p-2 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100 ${mostrarAjustes ? "bg-white/10 text-cream-100" : ""}`}
                aria-label="Personalizar el asistente"
                title="Personalizar el asistente"
              >
                <Settings2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                onClick={alternarChat}
                className="rounded-full p-2 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {mostrarAjustes && (
            <div className="max-h-[55%] space-y-3 overflow-y-auto border-b border-[var(--border-subtle)] bg-[var(--surface-muted)] px-3 py-3">
              <div>
                <label htmlFor="chat-nombre" className="mb-1 block text-xs font-semibold text-[var(--text-secondary)]">
                  Nombre del asistente
                </label>
                <input
                  id="chat-nombre"
                  value={ajustes.nombre}
                  maxLength={20}
                  onChange={(e) => actualizarAjustes({ nombre: e.target.value.replace(/[^\p{L}\p{N} _-]/gu, "") })}
                  onBlur={() => actualizarAjustes({ nombre: limpiarNombre(ajustes.nombre) || NOMBRE_POR_DEFECTO })}
                  className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-3 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-brand-800"
                />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold text-[var(--text-secondary)]">Voz (gratuita, del navegador)</p>
                <div className="flex items-center gap-2">
                  {(["femenina", "masculina"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => elegirGenero(g)}
                      className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        ajustes.genero === g
                          ? "border-brand-800 bg-brand-800 text-cream-100"
                          : "border-[var(--border-subtle)] bg-[var(--surface-app)] text-[var(--text-primary)] hover:border-brand-800"
                      }`}
                    >
                      {g === "femenina" ? "Voz femenina" : "Voz masculina"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="chat-velocidad" className="mb-1 flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
                  <span>Velocidad al hablar</span>
                  <span className="font-mono font-normal">{ajustes.velocidad.toFixed(2)}×</span>
                </label>
                <input
                  id="chat-velocidad"
                  type="range"
                  min={0.8}
                  max={1.3}
                  step={0.05}
                  value={ajustes.velocidad}
                  onChange={(e) => actualizarAjustes({ velocidad: Number(e.target.value) })}
                  onPointerUp={() => hablar(`Así hablo a esta velocidad.`, ajustes)}
                  className="w-full accent-brand-800"
                />
              </div>

              <button
                type="button"
                onClick={() => setCambiandoPersonaje(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:border-brand-800"
              >
                Cambiar de personaje (él / ella, tono de piel)
              </button>

              <button
                type="button"
                onClick={restablecerPosicion}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:border-brand-800"
              >
                <LocateFixed className="h-3.5 w-3.5" strokeWidth={1.75} /> Devolver a la esquina
              </button>

              <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                Arrastra el botón del asistente (o esta ventana por su cabecera) a donde quieras; recuerda su lugar. Tus ajustes se guardan en este dispositivo.
                {" "}Las voces dependen de tu sistema y navegador (las «Natural» suenan mejor).
                {modoRespuesta && ` Respuestas: ${modoRespuesta === "ia" ? "con inteligencia artificial" : "básicas (guía de módulos, sin IA)"}.`}
                {!soportaReconocimiento && " El micrófono no está disponible en este navegador (prueba con Chrome o Edge)."}
              </p>
            </div>
          )}

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.rol === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    m.rol === "user" ? "bg-brand-800 text-cream-100" : "bg-[var(--surface-muted)] text-[var(--text-primary)]"
                  }`}
                >
                  {m.contenido}
                </div>
              </div>
            ))}
            {enviando && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-xl bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--text-muted)]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.75} />
                  Pensando…
                </div>
              </div>
            )}
            <div ref={finRef} />
          </div>

          {conversando && (
            <p className="border-t border-[var(--border-subtle)] bg-accent-300/20 px-3 py-1.5 text-center text-[11px] font-medium text-brand-800">
              Modo conversación: háblame con naturalidad. Di «adiós» o pulsa el botón de ondas para terminar.
            </p>
          )}

          <form onSubmit={enviarMensaje} className="flex items-center gap-2 border-t border-[var(--border-subtle)] p-2.5">
            {soportaReconocimiento && (
              <button
                type="button"
                onClick={alternarMicrofono}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                  escuchando ? "animate-pulse bg-red-600 text-white" : "bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-brand-800 hover:text-cream-100"
                }`}
                aria-label={escuchando ? "Detener grabación" : `Hablarle a ${nombre}`}
                title={escuchando ? "Detener grabación" : `Hablarle a ${nombre} (también interrumpe su voz)`}
              >
                {escuchando ? <MicOff className="h-4 w-4" strokeWidth={1.75} /> : <Mic className="h-4 w-4" strokeWidth={1.75} />}
              </button>
            )}
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder={escuchando ? "Te escucho…" : "Escribe tu pregunta…"}
              className="min-w-0 flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-brand-800"
            />
            <button
              type="submit"
              disabled={enviando || !entrada.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-800 text-cream-100 transition hover:bg-brand-900 disabled:opacity-50"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante: se arrastra a cualquier parte; un toque corto abre o cierra el chat */}
      <div className="fixed z-40" style={{ left: botonPx.x, top: botonPx.y, width: tamBoton, height: tamBoton }}>
        {(escuchando || hablando) && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 animate-ping rounded-full ${escuchando ? "bg-red-500/50" : "bg-accent-500/50"}`}
          />
        )}
        <button
          onPointerDown={(e) => iniciarArrastre(e, true)}
          onPointerMove={moverArrastre}
          onPointerUp={terminarArrastre}
          onPointerCancel={terminarArrastre}
          onClick={(e) => {
            if (e.detail === 0) alternarChat(); // activación con teclado (Enter / Espacio)
          }}
          className={`relative flex h-full w-full touch-none select-none items-center justify-center overflow-hidden rounded-full bg-cream-100 text-brand-800 shadow-card transition hover:scale-105 active:cursor-grabbing ${
            escuchando ? "ring-4 ring-red-500/70" : hablando ? "ring-4 ring-accent-500/80" : conversando ? "ring-4 ring-accent-300/80" : "cursor-grab"
          }`}
          aria-label={abierto ? `Cerrar a ${nombre}` : `Abrir a ${nombre}`}
          title={`${nombre} — asistente del Portal Azahar (arrástrame a donde quieras)`}
        >
          {abierto ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Asistente3D genero={ajustes.genero} tono={ajustes.tono} hablando={hablando} escuchando={escuchando} pensando={enviando} className="h-full w-full" />}
        </button>
      </div>

      {(eligiendo || cambiandoPersonaje) && (
        <ElegirAsistente
          primeraVez={eligiendo}
          inicial={{ genero: ajustes.genero, tono: ajustes.tono, nombre: eligiendo && ajustes.nombre === NOMBRE_POR_DEFECTO ? (ajustes.genero === "masculina" ? "Mateo" : "Valentina") : ajustes.nombre }}
          onConfirmar={confirmarPersonaje}
          onCancelar={() => setCambiandoPersonaje(false)}
        />
      )}
    </>
  );
}

function saludoInicial(nombre: string): Mensaje {
  return {
    rol: "assistant",
    contenido: `¡Hola! Soy ${nombre}, el asistente del Portal Azahar. Pregúntame qué hace algún módulo o cómo hacer algo (por ejemplo: "¿cómo pido vacaciones?"). Puedes escribirme, usar el micrófono, o pulsar el botón de ondas para conversar conmigo por voz.`,
  };
}
