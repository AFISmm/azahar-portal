import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

type ToastTipo = "success" | "error" | "info";

interface ToastItem {
  id: number;
  mensaje: string;
  tipo: ToastTipo;
}

interface ToastContextValue {
  showToast: (mensaje: string, tipo?: ToastTipo) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ICONOS: Record<ToastTipo, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

const ESTILOS: Record<ToastTipo, string> = {
  success: "border-l-4 border-status-aprobada text-[var(--text-primary)]",
  error: "border-l-4 border-status-rechazada text-[var(--text-primary)]",
  info: "border-l-4 border-accent-500 text-[var(--text-primary)]",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((mensaje: string, tipo: ToastTipo = "success") => {
    const id = idRef.current++;
    setToasts((actuales) => [...actuales, { id, mensaje, tipo }]);
    window.setTimeout(() => {
      setToasts((actuales) => actuales.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  function cerrar(id: number) {
    setToasts((actuales) => actuales.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => {
          const Icono = ICONOS[toast.tipo];
          return (
            <div
              key={toast.id}
              className={`azahar-fade-in flex items-start gap-3 rounded-lg bg-[var(--surface-card)] px-4 py-3 shadow-card ${ESTILOS[toast.tipo]}`}
            >
              <Icono className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} />
              <p className="flex-1 text-sm font-medium">{toast.mensaje}</p>
              <button
                onClick={() => cerrar(toast.id)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Cerrar notificación"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}
