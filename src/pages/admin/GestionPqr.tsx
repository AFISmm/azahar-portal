import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CheckCircle2, MessageSquareWarning, Paperclip } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { dataSource } from "../../lib/dataSource";
import type { Pqr } from "../../lib/types";
import { formatDateTime } from "../../lib/format";
import { useToast } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Textarea } from "../../components/ui";

const ESTADO_ESTILO: Record<Pqr["estado"], string> = {
  pendiente: "bg-status-pendiente-bg text-status-pendiente",
  resuelta: "bg-status-aprobada-bg text-status-aprobada",
};

export default function GestionPqr() {
  const { empleado } = useAuth();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState<string | null>(null);
  const [comentarios, setComentarios] = useState<Record<string, string>>({});
  const [archivos, setArchivos] = useState<Record<string, File | null>>({});

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const lista = await dataSource.listPqrRecibidas();
      setPqrs(lista);
    } catch {
      showToast(t("gestionPqr.errorCargarPqr"), "error");
    } finally {
      setCargando(false);
    }
  }, [showToast]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  if (empleado && empleado.tipoCuenta !== "desarrollador") {
    return <Navigate to="/inicio" replace />;
  }

  async function marcarComoResuelta(pqr: Pqr) {
    setProcesando(pqr.id);
    try {
      let respuestaAdjuntoUrl: string | undefined;
      let respuestaAdjuntoNombre: string | undefined;
      const archivo = archivos[pqr.id];
      if (archivo) {
        const subido = await dataSource.subirArchivoPqr(archivo);
        respuestaAdjuntoUrl = subido.url;
        respuestaAdjuntoNombre = subido.nombre;
      }
      await dataSource.actualizarEstadoPqr(pqr.id, "resuelta", comentarios[pqr.id]?.trim() ?? "", respuestaAdjuntoUrl, respuestaAdjuntoNombre);
      showToast(t("gestionPqr.toastPqrResuelta"), "success");
      setComentarios((actuales) => {
        const { [pqr.id]: _omitido, ...resto } = actuales;
        return resto;
      });
      setArchivos((actuales) => {
        const { [pqr.id]: _omitido, ...resto } = actuales;
        return resto;
      });
      await cargar();
    } catch {
      showToast(t("gestionPqr.errorActualizarPqr"), "error");
    } finally {
      setProcesando(null);
    }
  }

  const pendientes = pqrs.filter((p) => p.estado === "pendiente").length;

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb={t("gestionPqr.breadcrumb")}
        title={t("gestionPqr.titulo")}
        description={t("gestionPqr.descripcion")}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-pendiente-bg text-status-pendiente">
            <MessageSquareWarning className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{t("gestionPqr.pendientes")}</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{pendientes}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-800/10 text-brand-800">
            <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{t("gestionPqr.totalRecibidas")}</p>
            <p className="font-mono text-xl font-bold text-[var(--text-primary)]">{pqrs.length}</p>
          </div>
        </Card>
      </div>

      <Card title={t("gestionPqr.cardPqrRecibidas")}>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("gestionPqr.cargando")}</p>
        ) : pqrs.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("gestionPqr.sinPqr")}</p>
        ) : (
          <ul className="divide-y divide-[var(--border-subtle)]">
            {pqrs.map((p) => (
              <li key={p.id} className="py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{p.nombre}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {p.correo}
                      {p.cedula ? ` ${t("gestionPqr.ccPrefix")} ${p.cedula}` : ""}
                    </p>
                    <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                      {t("gestionPqr.radicadaElPrefix")} {formatDateTime(p.creadoEn)}
                    </p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[p.estado]}`}>
                    {p.estado === "resuelta" ? t("gestionPqr.estadoResuelta") : t("gestionPqr.estadoPendiente")}
                  </span>
                </div>

                <p className="mt-3 rounded-xl bg-[var(--surface-app)] p-3 text-sm text-[var(--text-secondary)]">{p.problema}</p>
                {p.adjuntoUrl && (
                  <a
                    href={p.adjuntoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-800 hover:underline"
                  >
                    <Paperclip className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {p.adjuntoNombre ?? t("gestionPqr.verAdjunto")}
                  </a>
                )}

                {p.estado === "pendiente" ? (
                  <div className="mt-3 space-y-2">
                    <Field label={t("gestionPqr.campoComentarioSolucion")}>
                      <Textarea
                        rows={2}
                        placeholder={t("gestionPqr.placeholderComentario")}
                        value={comentarios[p.id] ?? ""}
                        onChange={(e) => setComentarios((actuales) => ({ ...actuales, [p.id]: e.target.value }))}
                      />
                    </Field>
                    <Field label={t("gestionPqr.campoAdjuntarArchivo")}>
                      <Input
                        type="file"
                        onChange={(e) => setArchivos((actuales) => ({ ...actuales, [p.id]: e.target.files?.[0] ?? null }))}
                      />
                      {archivos[p.id] && (
                        <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                          {t("gestionPqr.seleccionadoPrefix")} {archivos[p.id]?.name}
                        </p>
                      )}
                    </Field>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        className="px-3 py-2 text-xs"
                        disabled={procesando === p.id}
                        onClick={() => void marcarComoResuelta(p)}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        {t("gestionPqr.marcarResuelta")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  p.comentario && (
                    <div className="mt-3 rounded-xl border border-[var(--border-subtle)] bg-status-aprobada-bg/40 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-status-aprobada">{t("gestionPqr.tuRespuesta")}</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">{p.comentario}</p>
                      {p.respuestaAdjuntoUrl && (
                        <a
                          href={p.respuestaAdjuntoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-status-aprobada hover:underline"
                        >
                          <Paperclip className="h-3.5 w-3.5" strokeWidth={1.75} />
                          {p.respuestaAdjuntoNombre ?? t("gestionPqr.verAdjunto")}
                        </a>
                      )}
                    </div>
                  )
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
