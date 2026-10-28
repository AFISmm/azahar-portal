import mascota from "../assets/chatbot-mascota.png";

interface Props {
  /** Mueve la boca mientras el asistente responde en voz alta. */
  hablando?: boolean;
  /** Abre más los ojos mientras te escucha. */
  escuchando?: boolean;
  className?: string;
}

// Las coordenadas del SVG son las del recorte de la imagen (256 × 256).
const PIEL = "#FFB19F";
const TRAZO = "#4A1F2A";

/**
 * El campesino cafetero: parpadea, sonríe de vez en cuando y mueve la boca al hablar.
 * La imagen es fija; los párpados y la boca son capas SVG animadas con CSS (ver "mascota-*" en index.css).
 */
export function MascotaChatbot({ hablando = false, escuchando = false, className = "" }: Props) {
  return (
    <span className={`relative block ${className}`} aria-hidden="true">
      <span className={`block h-full w-full ${hablando ? "mascota-cabeceo" : "mascota-respira"}`}>
        <img src={mascota} alt="" draggable={false} className="pointer-events-none h-full w-full select-none object-cover" />
        <svg viewBox="0 0 256 256" className="pointer-events-none absolute inset-0 h-full w-full">
          {/* Párpados: tapan el ojo al bajar (parpadeo) */}
          <g className={escuchando ? "mascota-ojos-atentos" : undefined}>
            <g className="mascota-parpado" style={{ transformOrigin: "72px 88px" }}>
              <ellipse cx="72" cy="100" rx="10.5" ry="13.5" fill={PIEL} />
              <path d="M62 107 Q72 114 82 107" fill="none" stroke={TRAZO} strokeWidth="2.2" strokeLinecap="round" />
            </g>
            <g className="mascota-parpado" style={{ transformOrigin: "125px 80px" }}>
              <ellipse cx="125.5" cy="102" rx="19.5" ry="22.5" fill={PIEL} />
              <path d="M107 112 Q125 124 144 112" fill="none" stroke={TRAZO} strokeWidth="2.6" strokeLinecap="round" />
            </g>
          </g>

          {/* Sonrisa bajo el bigote: se ensancha de vez en cuando */}
          {!hablando && (
            <g className="mascota-sonrisa" style={{ transformOrigin: "89px 141px" }}>
              <path d="M76 140 Q89 153 103 139" fill="none" stroke={TRAZO} strokeWidth="2.2" strokeLinecap="round" />
              <path d="M76 140 L74.5 137.5 M103 139 L104.5 136.5" fill="none" stroke={TRAZO} strokeWidth="1.6" strokeLinecap="round" />
            </g>
          )}

          {/* Boca abierta al hablar */}
          {hablando && (
            <g className="mascota-boca" style={{ transformOrigin: "89px 138px" }}>
              <path d="M77 138 Q89 136 101 138 Q99 156 89 157 Q79 156 77 138 Z" fill="#5A1E2B" stroke={TRAZO} strokeWidth="1.6" strokeLinejoin="round" />
              <ellipse cx="89" cy="152" rx="6.5" ry="3.4" fill="#E8667A" />
            </g>
          )}
        </svg>
      </span>
    </span>
  );
}
