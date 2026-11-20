import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button, Field, Textarea } from "../components/ui";
import { formatCOP } from "../lib/format";
import { IVA_PLAN, PRODUCTOS_PLAN, SERVICIOS_PLAN } from "../lib/catalogoPlan";
import { enviarCotizacion } from "../lib/cotizaApi";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";

/** «Cotiza tu plan»: el cliente elige aplicaciones y servicios; la cotización llega a Metis Nexa como ticket de compra. */
export default function CotizaPlan() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [apps, setApps] = useState<string[]>([]);
  const [servicios, setServicios] = useState<string[]>([]);
  const [nota, setNota] = useState("");
  const [autoriza, setAutoriza] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviada, setEnviada] = useState(false);

  const alternar = (lista: string[], poner: (v: string[]) => void, id: string) => poner(lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]);

  const resumen = useMemo(() => {
    const elegidas = PRODUCTOS_PLAN.filter((p) => apps.includes(p.id));
    const totalApps = elegidas.reduce((s, p) => s + p.precio, 0);
    const extras = SERVICIOS_PLAN.filter((s) => servicios.includes(s.id)).map((s) => ({ nombre: s.nombre, precio: s.tipo === "porcentaje" ? Math.round(totalApps * s.valor) : s.valor }));
    const items = [...elegidas.map((p) => ({ nombre: p.nombre, precio: p.precio })), ...extras];
    const subtotal = items.reduce((s, i) => s + i.precio, 0);
    const iva = Math.round(subtotal * IVA_PLAN);
    return { items, subtotal, iva, total: subtotal + iva };
  }, [apps, servicios]);

  const hayElegidos = apps.length + servicios.length > 0;

  async function enviar() {
    setEnviando(true);
    try {
      await enviarCotizacion({ ids: [...apps, ...servicios], nota: nota.trim() || undefined, consentimiento: autoriza });
      setEnviada(true);
    } catch (e) {
      showToast(e instanceof Error ? e.message : t("cotiza.errorEnvio"), "error");
    } finally {
      setEnviando(false);
    }
  }

  if (enviada) {
    return (
      <>
        <PageHeader breadcrumb={t("sidebar.gestionNegocio")} title={t("sidebar.cotizaPlan")} />
        <Card>
          <div role="status" className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-status-aprobada" aria-hidden="true" />
            <div>
              <p className="font-semibold">{t("cotiza.enviada")}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{t("cotiza.enviadaDetalle")}</p>
              <Button className="mt-4" variant="outline" onClick={() => { setEnviada(false); setApps([]); setServicios([]); setNota(""); setAutoriza(false); }}>
                {t("cotiza.otra")}
              </Button>
            </div>
          </div>
        </Card>
      </>
    );
  }

  const fila = (id: string, nombre: string, descripcion: string, activo: boolean, alternarFila: () => void, precio?: string) => (
    <label key={id} htmlFor={`cp-${id}`} className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-[var(--surface-muted)]">
      <input id={`cp-${id}`} type="checkbox" checked={activo} onChange={alternarFila} className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-accent-500,#EAB35C)]" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{nombre}</span>
        <span className="block text-xs text-[var(--text-secondary)]">{descripcion}</span>
      </span>
      {precio && <span className="shrink-0 text-sm font-medium tabular-nums">{precio}</span>}
    </label>
  );

  return (
    <>
      <PageHeader breadcrumb={t("sidebar.gestionNegocio")} title={t("sidebar.cotizaPlan")} description={t("cotiza.descripcion")} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-6">
          <Card>
            <h2 className="mb-2 font-heading text-lg font-bold">{t("cotiza.apps")}</h2>
            <div>{PRODUCTOS_PLAN.map((p) => fila(p.id, p.nombre, p.descripcion, apps.includes(p.id), () => alternar(apps, setApps, p.id), `${formatCOP(p.precio)}${t("cotiza.mes")}`))}</div>
          </Card>
          <Card>
            <h2 className="mb-2 font-heading text-lg font-bold">{t("cotiza.servicios")}</h2>
            <div>{SERVICIOS_PLAN.map((s) => fila(s.id, s.nombre, s.descripcion, servicios.includes(s.id), () => alternar(servicios, setServicios, s.id)))}</div>
          </Card>
        </div>

        <Card className="h-fit lg:sticky lg:top-6">
          <h2 className="font-heading text-lg font-bold">{t("cotiza.resumen")}</h2>
          {!hayElegidos ? (
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{t("cotiza.vacio")}</p>
          ) : (
            <dl className="mt-3 space-y-1.5 text-sm">
              {resumen.items.map((i) => (
                <div key={i.nombre} className="flex justify-between gap-3"><dt>{i.nombre}</dt><dd className="tabular-nums">{formatCOP(i.precio)}</dd></div>
              ))}
              <div className="flex justify-between gap-3 border-t border-[var(--border-subtle)] pt-2"><dt>{t("cotiza.subtotal")}</dt><dd className="tabular-nums">{formatCOP(resumen.subtotal)}</dd></div>
              <div className="flex justify-between gap-3"><dt>IVA 19 %</dt><dd className="tabular-nums">{formatCOP(resumen.iva)}</dd></div>
              <div className="flex justify-between gap-3 text-base font-bold"><dt>{t("cotiza.total")}</dt><dd className="tabular-nums">{formatCOP(resumen.total)}{t("cotiza.mes")}</dd></div>
            </dl>
          )}
          <p className="mt-3 text-xs text-[var(--text-secondary)]">{t("cotiza.referencia")}</p>

          <div className="mt-4">
            <Field label={t("cotiza.nota")}>
              <Textarea value={nota} maxLength={1000} rows={3} onChange={(e) => setNota(e.target.value)} />
            </Field>
          </div>
          <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs">
            <input type="checkbox" checked={autoriza} onChange={(e) => setAutoriza(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer" />
            <span>{t("cotiza.autorizo")}</span>
          </label>
          <Button className="mt-4 w-full" disabled={!hayElegidos || !autoriza || enviando} onClick={enviar}>
            {enviando ? t("cotiza.enviando") : t("cotiza.enviar")}
          </Button>
        </Card>
      </div>
    </>
  );
}
