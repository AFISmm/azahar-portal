import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Loader2, Mic, MicOff, MessageCircle, Send, Settings2, Volume2, VolumeX, X } from "lucide-react";

interface Mensaje {
  rol: "user" | "assistant";
  contenido: string;
}

type GeneroVoz = "masculina" | "femenina";

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

const SALUDO: Mensaje = {
  rol: "assistant",
  contenido:
    "¡Hola! Soy JARVIS, el asistente del Portal Azahar. Pregúntame qué hace algún módulo o cómo hacer algo (por ejemplo: \"¿cómo pido vacaciones?\"), o usa el micrófono para hablarme.",
};

const FRASE_BIENVENIDA = "Bienvenido al portal, mi nombre es JARVIS y estoy disponible para ayudarte en lo que necesites.";
const FRASE_PRUEBA = "Hola, bienvenido al portal de Azahar, acá estoy para ayudarte.";
const STORAGE_KEY_GENERO = "jarvis-genero-voz";
const STORAGE_KEY_MUTE = "jarvis-voz-desactivada";

const PISTAS_VOZ_FEMENINA = [
  "female", "mujer", "sabina", "dalia", "helena", "elena", "elvira", "laura",
  "lucia", "paulina", "raquel", "monica", "isabela", "camila", "valentina",
  "sofia", "carmen", "maria", "conchita", "esperanza", "marisol", "penelope",
  "salome", "victoria", "zira", "paloma", "catalina", "renata", "alba",
];

const PISTAS_VOZ_MASCULINA = [
  "male", "hombre", "pablo", "diego", "jorge", "raul", "raúl", "alvaro", "álvaro",
  "carlos", "andres", "andrés", "miguel", "juan", "enrique", "fernando",
  "santiago", "sebastian", "sebastián", "mateo", "tomas", "tomás", "david", "jorge",
];

/** Heurística de género según el nombre reportado por el navegador (la Web Speech API no expone género). */
function generoDeVoz(v: SpeechSynthesisVoice): GeneroVoz | undefined {
  const nombre = v.name.toLowerCase();
  if (PISTAS_VOZ_FEMENINA.some((p) => nombre.includes(p))) return "femenina";
  if (PISTAS_VOZ_MASCULINA.some((p) => nombre.includes(p))) return "masculina";
  return undefined;
}

/** Busca la mejor voz en español para el género pedido; si el sistema no distingue, cae a cualquier voz en español. */
function resolverVozPorGenero(voces: SpeechSynthesisVoice[], genero: GeneroVoz): SpeechSynthesisVoice | undefined {
  const esVoces = voces.filter((v) => v.lang?.toLowerCase().startsWith("es"));
  const candidatas = esVoces.length > 0 ? esVoces : voces;
  return (
    candidatas.find((v) => generoDeVoz(v) === genero) ??
    candidatas.find((v) => generoDeVoz(v) === undefined) ??
    candidatas[0]
  );
}

/**
 * Síntesis de voz nativa del navegador (gratuita). Cuando el sistema no trae voces masculina/femenina
 * distinguibles por nombre, se usa el tono (pitch) para diferenciar igual las dos opciones.
 */
function hablarConVozDelNavegador(texto: string, genero: GeneroVoz) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  function hablar() {
    const utterance = new SpeechSynthesisUtterance(texto);
    const voz = resolverVozPorGenero(window.speechSynthesis.getVoices(), genero);
    utterance.lang = voz?.lang || "es-ES";
    utterance.pitch = genero === "masculina" ? 0.85 : 1.15;
    utterance.rate = 1;
    if (voz) utterance.voice = voz;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", hablar, { once: true });
  } else {
    hablar();
  }
}

export function ChatbotWidget() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([SALUDO]);
  const [entrada, setEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [genero, setGenero] = useState<GeneroVoz>(
    () => (typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY_GENERO) as GeneroVoz | null) ?? "femenina" : "femenina"),
  );
  const [vozActivada, setVozActivada] = useState(
    () => (typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY_MUTE) !== "1" : true),
  );
  const finRef = useRef<HTMLDivElement>(null);
  const yaSaludoRef = useRef(false);
  const reconocimientoRef = useRef<SpeechRecognitionInstance | null>(null);

  const soportaReconocimiento =
    typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

  useEffect(() => {
    return () => reconocimientoRef.current?.stop();
  }, []);

  function elegirGenero(g: GeneroVoz) {
    setGenero(g);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY_GENERO, g);
    hablarConVozDelNavegador(FRASE_PRUEBA, g);
  }

  function alternarVoz() {
    setVozActivada((actual) => {
      const nuevo = !actual;
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY_MUTE, nuevo ? "0" : "1");
      if (!nuevo && typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
      return nuevo;
    });
  }

  function alternarChat() {
    setAbierto((actual) => {
      const nuevo = !actual;
      if (nuevo && !yaSaludoRef.current) {
        yaSaludoRef.current = true;
        if (vozActivada) hablarConVozDelNavegador(FRASE_BIENVENIDA, genero);
      }
      return nuevo;
    });
  }

  async function enviarTexto(texto: string) {
    if (!texto.trim() || enviando) return;

    const historialPrevio = mensajes;
    setMensajes((actuales) => [...actuales, { rol: "user", contenido: texto }]);
    setEntrada("");
    setEnviando(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto, historial: historialPrevio }),
      });
      const datos = (await resp.json().catch(() => null)) as { ok: boolean; respuesta?: string; motivo?: string; mensaje?: string } | null;

      let respuesta: string;
      if (datos?.ok && datos.respuesta) {
        respuesta = datos.respuesta;
      } else if (datos?.motivo === "config_faltante") {
        respuesta = "Todavía no estoy activado del todo en este despliegue: falta configurar GEMINI_API_KEY en Vercel.";
      } else {
        respuesta = datos?.mensaje || "No pude responder en este momento. Intenta de nuevo en un momento.";
      }
      setMensajes((actuales) => [...actuales, { rol: "assistant", contenido: respuesta }]);
      if (vozActivada) hablarConVozDelNavegador(respuesta, genero);
    } catch {
      const respuesta = "No pude conectarme en este momento. Revisa tu conexión e intenta de nuevo.";
      setMensajes((actuales) => [...actuales, { rol: "assistant", contenido: respuesta }]);
      if (vozActivada) hablarConVozDelNavegador(respuesta, genero);
    } finally {
      setEnviando(false);
    }
  }

  function enviarMensaje(e: FormEvent) {
    e.preventDefault();
    void enviarTexto(entrada);
  }

  function alternarEscucha() {
    if (!soportaReconocimiento) return;

    if (escuchando) {
      reconocimientoRef.current?.stop();
      return;
    }

    const Constructor = window.SpeechRecognition ?? window.webkitSpeechRecognition!;
    const reconocimiento = new Constructor();
    reconocimiento.lang = "es-CO";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;
    reconocimiento.onresult = (evento) => {
      const texto = evento.results[0]?.[0]?.transcript ?? "";
      if (texto.trim()) void enviarTexto(texto.trim());
    };
    reconocimiento.onerror = (evento) => {
      setEscuchando(false);
      if (evento.error === "no-speech" || evento.error === "aborted") return;
      const mensaje =
        evento.error === "not-allowed" || evento.error === "audio-capture"
          ? "No pude acceder al micrófono. Revisa que le hayas dado permiso a este sitio en tu navegador."
          : evento.error === "network"
            ? "No pude conectarme al servicio de reconocimiento de voz. Revisa tu conexión a internet e intenta de nuevo."
            : "No entendí lo que dijiste por el micrófono. Intenta de nuevo o escribe tu pregunta.";
      setMensajes((actuales) => [...actuales, { rol: "assistant", contenido: mensaje }]);
    };
    reconocimiento.onend = () => setEscuchando(false);

    reconocimientoRef.current = reconocimiento;
    setEscuchando(true);
    reconocimiento.start();
  }

  return (
    <>
      {abierto && (
        <div className="fixed inset-x-4 bottom-20 top-28 z-40 flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-card sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[50vw] sm:max-w-2xl">
          <div className="flex items-center justify-between bg-brand-800 px-4 py-3">
            <div className="flex items-center gap-2 text-cream-100">
              <Bot className="h-4 w-4" strokeWidth={1.75} />
              <p className="font-heading text-sm font-semibold">JARVIS</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={alternarVoz}
                className="rounded-full p-2.5 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100"
                aria-label={vozActivada ? "Silenciar respuestas habladas" : "Activar respuestas habladas"}
                title={vozActivada ? "Silenciar respuestas habladas" : "Activar respuestas habladas"}
              >
                {vozActivada ? <Volume2 className="h-4 w-4" strokeWidth={1.75} /> : <VolumeX className="h-4 w-4" strokeWidth={1.75} />}
              </button>
              <button
                onClick={() => setMostrarAjustes((v) => !v)}
                className={`rounded-full p-2.5 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100 ${mostrarAjustes ? "bg-white/10 text-cream-100" : ""}`}
                aria-label="Elegir voz del asistente"
                title="Elegir voz del asistente"
              >
                <Settings2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setAbierto(false)}
                className="rounded-full p-2.5 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {mostrarAjustes && (
            <div className="space-y-2 border-b border-[var(--border-subtle)] bg-[var(--surface-muted)] px-3 py-3">
              <p className="text-xs font-semibold text-[var(--text-secondary)]">Voz del asistente (gratuita, del navegador)</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => elegirGenero("femenina")}
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    genero === "femenina"
                      ? "border-brand-800 bg-brand-800 text-cream-100"
                      : "border-[var(--border-subtle)] bg-[var(--surface-app)] text-[var(--text-primary)] hover:border-brand-800"
                  }`}
                >
                  Voz femenina
                </button>
                <button
                  type="button"
                  onClick={() => elegirGenero("masculina")}
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    genero === "masculina"
                      ? "border-brand-800 bg-brand-800 text-cream-100"
                      : "border-[var(--border-subtle)] bg-[var(--surface-app)] text-[var(--text-primary)] hover:border-brand-800"
                  }`}
                >
                  Voz masculina
                </button>
              </div>
              <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                Las voces disponibles dependen de tu sistema operativo y navegador. Tu elección queda guardada en este
                dispositivo.
                {!soportaReconocimiento && " El micrófono para hablarle a JARVIS no está disponible en este navegador."}
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
                  Escribiendo…
                </div>
              </div>
            )}
            <div ref={finRef} />
          </div>

          <form onSubmit={enviarMensaje} className="flex items-center gap-2 border-t border-[var(--border-subtle)] p-2.5">
            {soportaReconocimiento && (
              <button
                type="button"
                onClick={alternarEscucha}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                  escuchando
                    ? "animate-pulse bg-red-600 text-white"
                    : "bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-brand-800 hover:text-cream-100"
                }`}
                aria-label={escuchando ? "Detener grabación" : "Hablarle a JARVIS"}
                title={escuchando ? "Detener grabación" : "Hablarle a JARVIS"}
              >
                {escuchando ? <MicOff className="h-4 w-4" strokeWidth={1.75} /> : <Mic className="h-4 w-4" strokeWidth={1.75} />}
              </button>
            )}
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder={escuchando ? "Escuchando…" : "Escribe tu pregunta…"}
              className="flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-brand-800"
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

      <button
        onClick={alternarChat}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-cream-100 shadow-card transition hover:bg-brand-900 sm:bottom-6 sm:right-6"
        aria-label={abierto ? "Cerrar a JARVIS" : "Abrir a JARVIS"}
        title="JARVIS — asistente del Portal Azahar"
      >
        {abierto ? <X className="h-5 w-5" strokeWidth={1.75} /> : <MessageCircle className="h-6 w-6" strokeWidth={1.75} />}
      </button>
    </>
  );
}
