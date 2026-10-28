import { type FormEvent, type ReactNode, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card } from "../../components/Card";
import { useAcceso } from "../../auth/acceso";

/** Permisos del usuario actual sobre trazabilidad: 'ver' consulta; 'editar' además registra y ve la auditoría. */
export function usePermisosTraz() {
  const acceso = useAcceso();
  const ver = acceso.ver("trazabilidad");
  const editar = acceso.editar("trazabilidad");
  return { ver, editar, tieneAcceso: ver };
}

/** Carga datos al montar y expone `recargar`. */
export function useCarga<T>(cargador: () => Promise<T>) {
  const [datos, setDatos] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  const recargar = useCallback(async () => {
    setCargando(true);
    try {
      setDatos(await cargador());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar la información.");
    } finally {
      setCargando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void recargar();
  }, [recargar]);

  return { datos, error, cargando, recargar };
}

export function Cargando() {
  return (
    <div className="flex justify-center py-16">
      <Loader2 className="h-7 w-7 animate-spin text-brand-800" strokeWidth={1.75} />
    </div>
  );
}

export function ErrorCaja({ mensaje }: { mensaje: string }) {
  return <p className="rounded-lg bg-status-rechazada-bg px-3 py-2 text-sm text-status-rechazada">{mensaje}</p>;
}

export function ExitoCaja({ mensaje }: { mensaje: string }) {
  return <p className="rounded-lg bg-status-aprobada-bg px-3 py-2 text-xs font-semibold text-status-aprobada">{mensaje}</p>;
}

export function AccesoDenegado({ etapa }: { etapa: string }) {
  return (
    <Card>
      <p className="text-sm text-[var(--text-secondary)]">
        Tu cuenta no tiene permiso para usar <strong>{etapa}</strong>. Pide a un administrador del portal que te asigne el
        permiso desde Administración &gt; Usuarios si crees que esto es un error.
      </p>
    </Card>
  );
}

export function RequiereAntes({ que, to, enlace }: { que: string; to: string; enlace: string }) {
  return (
    <Card>
      <p className="text-sm text-[var(--text-secondary)]">
        Primero registra al menos {que}{" "}
        <Link to={to} className="font-semibold text-brand-800 underline">
          {enlace}
        </Link>
        .
      </p>
    </Card>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-[11px] text-[var(--text-muted)]">{children}</p>;
}

export const TITULO_FORM = "mb-1 font-heading text-lg font-bold text-[var(--text-primary)]";
export const SUBTITULO_FORM = "mb-4 text-xs text-[var(--text-secondary)]";
export const LISTA = "divide-y divide-[var(--border-subtle)] text-sm";
export const VACIO = "py-2 text-[var(--text-muted)]";

/** Convierte un <form> en objeto plano (los archivos se manejan aparte). */
export function leerFormulario(e: FormEvent<HTMLFormElement>): Record<string, FormDataEntryValue> {
  e.preventDefault();
  return Object.fromEntries(new FormData(e.currentTarget).entries());
}

/** Estado de envío de un formulario de captura: `enviar(fn)` maneja cargando/error/éxito. */
export function useEnvio() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  async function enviar(accion: () => Promise<void>) {
    setEnviando(true);
    setError(null);
    setExito(false);
    try {
      await accion();
      setExito(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setEnviando(false);
    }
  }

  return { enviando, error, exito, enviar };
}
