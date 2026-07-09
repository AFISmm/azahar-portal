import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

interface Mensaje {
  rol: "user" | "assistant";
  contenido: string;
}

const SALUDO: Mensaje = {
  rol: "assistant",
  contenido: "¡Hola! Soy el asistente del Portal Azahar. Pregúntame qué hace algún módulo o cómo hacer algo (por ejemplo: \"¿cómo pido vacaciones?\").",
};

export function ChatbotWidget() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([SALUDO]);
  const [entrada, setEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

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
        respuesta = "El asistente todavía no está activado en este despliegue: falta configurar GEMINI_API_KEY en Vercel.";
      } else {
        respuesta = datos?.mensaje || "No pude responder en este momento. Intenta de nuevo en un momento.";
      }
      setMensajes((actuales) => [...actuales, { rol: "assistant", contenido: respuesta }]);
    } catch {
      setMensajes((actuales) => [
        ...actuales,
        { rol: "assistant", contenido: "No pude conectarme con el asistente. Revisa tu conexión e intenta de nuevo." },
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
              <p className="font-heading text-sm font-semibold">Asistente Azahar</p>
            </div>
            <button
              onClick={() => setAbierto(false)}
              className="rounded-full p-1 text-cream-100/80 transition hover:bg-white/10 hover:text-cream-100"
              aria-label="Cerrar chat"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>

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
        onClick={() => setAbierto((a) => !a)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-cream-100 shadow-card transition hover:bg-brand-900"
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente"}
        title="Asistente del Portal Azahar"
      >
        {abierto ? <X className="h-5 w-5" strokeWidth={1.75} /> : <MessageCircle className="h-6 w-6" strokeWidth={1.75} />}
      </button>
    </>
  );
}
