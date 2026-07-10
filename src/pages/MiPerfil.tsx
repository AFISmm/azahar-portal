import { type FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, Lock, MessageSquareWarning, Paperclip } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { DestinoPqr, Pqr } from "../lib/types";
import { formatDate, formatDateTime } from "../lib/format";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button, Field, Input, Select, Textarea } from "../components/ui";

const ESTADO_ESTILO: Record<Pqr["estado"], string> = {
  pendiente: "bg-status-pendiente-bg text-status-pendiente",
  resuelta: "bg-status-aprobada-bg text-status-aprobada",
};

export default function MiPerfil() {
  const { empleado, refreshEmpleado } = useAuth();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  const [mostrarPqr, setMostrarPqr] = useState(() => searchParams.get("pqr") === "1");
  const [misPqr, setMisPqr] = useState<Pqr[]>([]);
  const [destinos, setDestinos] = useState<DestinoPqr[]>([]);
  const [adminDestinoId, setAdminDestinoId] = useState("");
  const [cedulaPqr, setCedulaPqr] = useState("");
  const [correoPqr, setCorreoPqr] = useState("");
  const [problema, setProblema] = useState("");
  const [archivoPqr, setArchivoPqr] = useState<File | null>(null);
  const [enviandoPqr, setEnviandoPqr] = useState(false);

  useEffect(() => {
    if (!empleado) return;
    setCorreo(empleado.correo);
    setUsername(empleado.username ?? "");
    setCedulaPqr(empleado.numeroIdentificacion ?? "");
    setCorreoPqr(empleado.correo);
  }, [empleado]);

  useEffect(() => {
    if (!mostrarPqr) return;
    void (async () => {
      const [listaDestinos, listaMias] = await Promise.all([dataSource.listDestinosPqr(), dataSource.listPqrPropias()]);
      setDestinos(listaDestinos);
      setAdminDestinoId(listaDestinos[0]?.id ?? "");
      setMisPqr(listaMias);
    })();
  }, [mostrarPqr]);

  if (!empleado) return null;

  const esDesarrollador = empleado.tipoCuenta === "desarrollador";

  const datosBloqueados = [
    { label: t("miPerfil.labelNombres"), valor: empleado.nombre },
    { label: t("miPerfil.labelFechaNacimiento"), valor: formatDate(empleado.fechaNacimiento) },
    { label: t("miPerfil.labelNumeroIdentificacion"), valor: empleado.numeroIdentificacion ?? "—" },
    { label: t("miPerfil.labelFechaIngreso"), valor: formatDate(empleado.fechaIngreso) },
  ];

  async function guardarCuenta(e: FormEvent) {
    e.preventDefault();
    setGuardando(true);
    try {
      await dataSource.actualizarPerfilPropio({
        correo: correo.trim() || undefined,
        username: username.trim(),
        password: password.trim() || undefined,
      });
      await refreshEmpleado();
      setPassword("");
      showToast(t("miPerfil.toastPerfilActualizado"), "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : t("miPerfil.errorActualizarPerfil"), "error");
    } finally {
      setGuardando(false);
    }
  }

  async function radicarPqr(e: FormEvent) {
    e.preventDefault();
    if (!empleado || !adminDestinoId) return;
    setEnviandoPqr(true);
    try {
      let adjuntoUrl: string | undefined;
      let adjuntoNombre: string | undefined;
      if (archivoPqr) {
        const subido = await dataSource.subirArchivoPqr(archivoPqr);
        adjuntoUrl = subido.url;
        adjuntoNombre = subido.nombre;
      }
      await dataSource.createPqr({
        nombre: empleado.nombre,
        cedula: cedulaPqr.trim() || null,
        correo: correoPqr.trim(),
        adminDestinoId,
        problema: problema.trim(),
        adjuntoUrl,
        adjuntoNombre,
      });
      showToast(t("miPerfil.toastPqrRadicada"), "success");
      setProblema("");
      setArchivoPqr(null);
      setMisPqr(await dataSource.listPqrPropias());
    } catch (err) {
      showToast(err instanceof Error ? err.message : t("miPerfil.errorRadicarPqr"), "error");
    } finally {
      setEnviandoPqr(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("miPerfil.breadcrumb")} title={t("miPerfil.titulo")} description={t("miPerfil.descripcion")}>
        {!esDesarrollador && (
          <Button variant="outline" onClick={() => setMostrarPqr((v) => !v)}>
            {mostrarPqr ? <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> : <MessageSquareWarning className="h-4 w-4" strokeWidth={1.75} />}
            {mostrarPqr ? t("miPerfil.volver") : t("miPerfil.radicarPqr")}
          </Button>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {mostrarPqr ? (
          <Card
            title={t("miPerfil.cardPqrTitulo")}
            actions={
              <button
                type="button"
                onClick={() => setMostrarPqr(false)}
                className="rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                aria-label={t("miPerfil.volverDatosPersonales")}
                title={t("miPerfil.volverDatosPersonales")}
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
            }
          >
            {misPqr.length > 0 && (
              <div className="mb-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{t("miPerfil.tusPqrRadicadas")}</p>
                <ul className="max-h-64 space-y-3 overflow-y-auto">
                  {misPqr.map((p) => (
                    <li key={p.id} className="rounded-xl border border-[var(--border-subtle)] p-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm text-[var(--text-secondary)]">{p.problema}</p>
                        <span className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${ESTADO_ESTILO[p.estado]}`}>
                          {p.estado === "resuelta" ? t("miPerfil.estadoResuelta") : t("miPerfil.estadoPendiente")}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                        {t("miPerfil.radicadaElPrefix")} {formatDateTime(p.creadoEn)}
                      </p>
                      {p.adjuntoUrl && (
                        <a
                          href={p.adjuntoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-800 hover:underline"
                        >
                          <Paperclip className="h-3.5 w-3.5" strokeWidth={1.75} />
                          {p.adjuntoNombre ?? t("miPerfil.verAdjunto")}
                        </a>
                      )}
                      {p.estado === "resuelta" && p.comentario && (
                        <div className="mt-2 rounded-lg bg-status-aprobada-bg/40 p-2.5">
                          <p className="text-xs font-semibold uppercase tracking-wide text-status-aprobada">{t("miPerfil.respuestaDesarrollador")}</p>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">{p.comentario}</p>
                          {p.respuestaAdjuntoUrl && (
                            <a
                              href={p.respuestaAdjuntoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-status-aprobada hover:underline"
                            >
                              <Paperclip className="h-3.5 w-3.5" strokeWidth={1.75} />
                              {p.respuestaAdjuntoNombre ?? t("miPerfil.verAdjunto")}
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{t("miPerfil.radicarNuevaPqr")}</p>
            <form onSubmit={radicarPqr} className="space-y-4">
              <Field label={t("miPerfil.campoNombreApellido")}>
                <Input value={empleado.nombre} disabled />
              </Field>
              <Field label={t("miPerfil.campoNumeroCedula")}>
                <Input required value={cedulaPqr} onChange={(e) => setCedulaPqr(e.target.value)} />
              </Field>
              <Field label={t("miPerfil.campoCorreoElectronico")}>
                <Input type="email" required value={correoPqr} onChange={(e) => setCorreoPqr(e.target.value)} />
              </Field>
              <Field label={t("miPerfil.campoAdminDestino")}>
                <Select value={adminDestinoId} onChange={(e) => setAdminDestinoId(e.target.value)}>
                  {destinos.length === 0 && <option value="">{t("miPerfil.sinCuentasDesarrollador")}</option>}
                  {destinos.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nombre}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={t("miPerfil.campoDescribeProblema")}>
                <Textarea
                  required
                  rows={4}
                  placeholder={t("miPerfil.placeholderProblema")}
                  value={problema}
                  onChange={(e) => setProblema(e.target.value)}
                />
              </Field>
              <Field label={t("miPerfil.campoAdjuntarArchivo")}>
                <Input type="file" onChange={(e) => setArchivoPqr(e.target.files?.[0] ?? null)} />
                {archivoPqr && (
                  <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                    {t("miPerfil.seleccionadoPrefix")} {archivoPqr.name}
                  </p>
                )}
              </Field>
              <Button type="submit" disabled={enviandoPqr || !adminDestinoId} className="w-full">
                {t("miPerfil.enviarPqr")}
              </Button>
            </form>
          </Card>
        ) : (
          <Card title={t("miPerfil.cardDatosPersonales")}>
            <ul className="divide-y divide-[var(--border-subtle)]">
              {datosBloqueados.map(({ label, valor }) => (
                <li key={label} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">{valor}</p>
                  </div>
                  <Lock className="h-4 w-4 shrink-0 text-[var(--text-muted)]" strokeWidth={1.75} />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[var(--text-muted)]">{t("miPerfil.notaSoloLectura")}</p>
          </Card>
        )}

        <Card title={t("miPerfil.cardCuenta")}>
          <form onSubmit={guardarCuenta} className="space-y-4">
            <Field label={t("miPerfil.campoCorreoElectronico")}>
              <Input type="email" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </Field>
            <Field label={t("miPerfil.campoNickname")}>
              <Input placeholder={t("miPerfil.placeholderNickname")} value={username} onChange={(e) => setUsername(e.target.value)} />
            </Field>
            <Field label={t("miPerfil.campoNuevaContrasena")}>
              <Input
                type="password"
                placeholder={t("miPerfil.placeholderContrasena")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Field>
            <Button type="submit" disabled={guardando} className="w-full">
              {t("miPerfil.guardarCambios")}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
