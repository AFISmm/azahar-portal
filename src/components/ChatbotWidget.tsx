import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Loader2, MessageCircle, Send, Settings2, Volume2, X } from "lucide-react";

interface Mensaje {
  rol: "user" | "assistant";
  contenido: string;
}

const SALUDO: Mensaje = {
  rol: "assistant",
  contenido:
    "¡Hola! Soy JARVIS, el asistente del Portal Azahar. Pregúntame qué hace algún módulo o cómo hacer algo (por ejemplo: \"¿cómo pido vacaciones?\").",
};

const FRASE_BIENVENIDA = "Bienvenido al portal, mi nombre es JARVIS y estoy disponible para ayudarte en lo que necesites.";
const FRASE_PRUEBA = "Hola, soy JARVIS. Así suena esta voz dentro del Portal Azahar.";
const STORAGE_KEY_VOZ = "jarvis-voz-uri";

/** Busca la mejor voz en español disponible en el navegador para la síntesis de voz. */
function elegirVozEspanol(voces: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return (
    voces.find((v) => v.lang?.toLowerCase().startsWith("es") && /female|mujer|f\b/i.test(v.name)) ??
    voces.find((v) => v.lang?.toLowerCase().startsWith("es")) ??
    undefined
  );
}

/** Resuelve qué voz usar: la elegida y guardada por la persona, o la mejor en español por defecto. */
function resolverVoz(voces: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const uriGuardado = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY_VOZ) : null;
  const guardada = uriGuardado ? voces.find((v) => v.voiceURI === uriGuardado) : undefined;
  return guardada ?? elegirVozEspanol(voces);
}

/** Síntesis de voz nativa del navegador (gratuita, calidad y variedad dependen del sistema). */
function hablarConVozDelNavegador(texto: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  function hablar() {
    const utterance = new SpeechSynthesisUtterance(texto);
    const voz = resolverVoz(window.speechSynthesis.getVoices());
    utterance.lang = voz?.lang || "es-ES";
    utterance.rate = 1;
    utterance.pitch = 1;
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
  const [mostrarVoces, setMostrarVoces] = useState(false);
  const [voces, setVoces] = useState<SpeechSynthesisVoice[]>([]);
  const [vozUri, setVozUri] = useState(() => (typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY_VOZ) ?? "" : ""));
  const finRef = useRef<HTMLDivElement>(null);
  const yaSaludoRef = useRef(false);

  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    function actualizarVoces() {
      setVoces(window.speechSynthesis.getVoices());
    }
    actualizarVoces();
    window.speechSynthesis.addEventListener("voiceschanged", actualizarVoces);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", actualizarVoces);
  }, []);

  const vocesEspanol = voces.filter((v) => v.lang?.toLowerCase().startsWith("es"));
  const listaVoces = vocesEspanol.length > 0 ? vocesEspanol : voces;

  function elegirVoz(uri: string) {
    setVozUri(uri);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY_VOZ, uri);
  }

  function probarVoz(uri: string) {
    const voz = voces.find((v) => v.voiceURI === uri);
    const utterance = new SpeechSynthesisUtterance(FRASE_PRUEBA);
    utterance.lang = voz?.lang || "es-ES";
    if (voz) utterance.voice = voz;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function alternarChat() {
    setAbierto((actual) => {
      const nuevo = !actual;
      if (nuevo && !yaSaludoRef.current) {
        yaSaludoRef.current = true;
        hablarConVozDelNavegador(FRASE_BIENVENIDA);
      }
      return nuevo;
    });
  }

  async function enviarMensaje(e: FormEvent) {
    e.preventDefault();
    const texto = entrada.trim();
    if (!texto || enviando) return;

    const historialPrevio = mensajes;
    const propios: Mensaje = { rol: "user", contenido: texto };
    setMensajes((actuales) => [...actuales, propios]);
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
    } catch {
      setMensajes((actuales) => [
        ...actuales,
        { rol: "assistant", contenido: "No pude conectarme en este momento. Revisa tu conexión e intenta de nuevo." },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      {abierto && (
        <div className="fixed bottom-24 right-6 z-40 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-card">
          <div className="flex items-center justify-between bg-brand-800 px-4 py-3">
            <div className="flex items-center gap-2 text-cream-100">
              <Bot className="h-4 w-4" strokeWidth={1.75} />
              <p className="font-heading text-sm font-semibold">JARVIS</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMostrarVoces((v) => !v)}
                className={`rounded-full p-1 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100 ${mostrarVoces ? "bg-white/10 text-cream-100" : ""}`}
                aria-label="Elegir voz del asistente"
                title="Elegir voz del asistente"
              >
                <Settings2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setAbierto(false)}
                className="rounded-full p-1 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {mostrarVoces && (
            <div className="space-y-2 border-b border-[var(--border-subtle)] bg-[var(--surface-muted)] px-3 py-3">
              <p className="text-xs font-semibold text-[var(--text-secondary)]">Voz del asistente (gratuita, del navegador)</p>
              {listaVoces.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)]">
                  Tu navegador no reportó voces todavía. Prueba abrir el chat de nuevo en unos segundos.
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <select
                    value={vozUri}
                    onChange={(e) => elegirVoz(e.target.value)}
                    className="flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-app)] px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-brand-800"
                  >
                    <option value="">Automática (mejor voz en español)</option>
                    {listaVoces.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => probarVoz(vozUri || resolverVoz(voces)?.voiceURI || "")}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-800 text-cream-100 transition hover:bg-brand-900"
                    aria-label="Probar voz"
                    title="Probar voz"
                  >
                    <Volume2 className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              )}
              <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                Las voces disponibles dependen de tu sistema operativo y navegador (Windows y Chrome suelen traer varias en
                español). Tu elección queda guardada en este dispositivo.
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
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Escribe tu pregunta…"
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
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-cream-100 shadow-card transition hover:bg-brand-900"
        aria-label={abierto ? "Cerrar a JARVIS" : "Abrir a JARVIS"}
        title="JARVIS — asistente del Portal Azahar"
      >
        {abierto ? <X className="h-5 w-5" strokeWidth={1.75} /> : <MessageCircle className="h-6 w-6" strokeWidth={1.75} />}
      </button>
    </>
  );
}
