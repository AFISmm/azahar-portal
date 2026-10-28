import { useEffect, useRef, useState } from "react";
import { MascotaChatbot } from "../MascotaChatbot";
import type { EstadoAsistente, GeneroAsistente } from "./personaje";

interface Props {
  genero: GeneroAsistente;
  /** Índice del tono de piel (TONOS_PIEL). */
  tono?: number;
  hablando?: boolean;
  escuchando?: boolean;
  pensando?: boolean;
  /** Tamaño y forma: la clase debe dar ancho y alto al contenedor. */
  className?: string;
  /** Si el navegador no puede dibujar en 3D se muestra la ilustración plana. */
  alternativaPlana?: boolean;
}

/**
 * Asistente en 3D (three.js, cargado solo cuando se necesita). Sigue el puntero con la mirada,
 * parpadea, sonríe y mueve la boca cuando habla. Si WebGL no está disponible, muestra la ilustración plana.
 */
export function Asistente3D({ genero, tono = 0, hablando = false, escuchando = false, pensando = false, className = "", alternativaPlana = true }: Props) {
  const contenedor = useRef<HTMLDivElement>(null);
  const estadoRef = useRef<EstadoAsistente>({ hablando, escuchando, pensando });
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    estadoRef.current = { hablando, escuchando, pensando };
  }, [hablando, escuchando, pensando]);

  useEffect(() => {
    const host = contenedor.current;
    if (!host) return;
    let cancelado = false;
    let limpiar: (() => void) | null = null;

    void (async () => {
      try {
        const [THREE, { crearPersonaje }] = await Promise.all([import("three"), import("./personaje")]);
        if (cancelado) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%;pointer-events:none";
        host.appendChild(renderer.domElement);

        const escena = new THREE.Scene();
        const camara = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
        camara.position.set(0, 1.05, 6.9);
        camara.lookAt(0, 1.05, 0);

        const personaje = crearPersonaje(THREE, { genero, tono });
        escena.add(personaje.grupo);

        const ajustar = () => {
          const w = host.clientWidth || 64;
          const h = host.clientHeight || 64;
          renderer.setSize(w, h, false);
          camara.aspect = w / h;
          camara.updateProjectionMatrix();
        };
        ajustar();
        const observador = new ResizeObserver(ajustar);
        observador.observe(host);

        const puntero = { x: 0, y: 0 };
        const alMover = (ev: PointerEvent) => {
          puntero.x = Math.max(-1, Math.min(1, (ev.clientX / window.innerWidth - 0.5) * 2));
          puntero.y = Math.max(-1, Math.min(1, -(ev.clientY / window.innerHeight - 0.5) * 2));
        };
        window.addEventListener("pointermove", alMover, { passive: true });

        const reloj = new THREE.Clock();
        const reducido = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
        renderer.setAnimationLoop(() => {
          const dt = Math.min(0.05, reloj.getDelta());
          const t = reloj.elapsedTime;
          personaje.actualizar(t, dt, reducido ? { hablando: false, escuchando: false, pensando: false } : estadoRef.current, reducido ? { x: 0, y: 0 } : puntero);
          renderer.render(escena, camara);
        });

        limpiar = () => {
          renderer.setAnimationLoop(null);
          window.removeEventListener("pointermove", alMover);
          observador.disconnect();
          personaje.liberar();
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        };
        if (cancelado) limpiar();
      } catch {
        if (!cancelado) setFallo(true);
      }
    })();

    return () => {
      cancelado = true;
      limpiar?.();
    };
  }, [genero, tono]);

  if (fallo && alternativaPlana) {
    return <MascotaChatbot hablando={hablando} escuchando={escuchando} className={className} />;
  }
  return <div ref={contenedor} className={className} aria-hidden="true" />;
}
