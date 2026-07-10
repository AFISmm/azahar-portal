import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Button, Field, Input, Select } from "../components/ui";
import { useToast } from "../context/ToastContext";
import { dataSource } from "../lib/dataSource";
import { formatDate } from "../lib/format";
import type { CertificadoFinca, Finca, NuevaFincaInput, NuevoCertificadoInput } from "../lib/types";
import { useLanguage } from "../context/LanguageContext";
import type { ClaveTraduccion } from "../i18n/translations";

const TABS = ["Fincas", "Certificados"] as const;
type Tab = (typeof TABS)[number];

const TAB_LABEL_KEYS: Record<Tab, ClaveTraduccion> = {
  Fincas: "gestionOperativa.tabFincas",
  Certificados: "gestionOperativa.tabCertificados",
};

const VARIEDADES = ["Castillo", "Caturra", "Bourbon", "Colombia", "Typica", "Tabi", "Geisha"];

export default function GestionOperativa() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>("Fincas");

  const [fincas, setFincas] = useState<Finca[]>([]);
  const [cargandoFincas, setCargandoFincas] = useState(true);
  const [modalFincaOpen, setModalFincaOpen] = useState(false);
  const [enviandoFinca, setEnviandoFinca] = useState(false);

  const [certificados, setCertificados] = useState<CertificadoFinca[]>([]);
  const [cargandoCertificados, setCargandoCertificados] = useState(true);
  const [modalCertOpen, setModalCertOpen] = useState(false);
  const [enviandoCert, setEnviandoCert] = useState(false);
  const [filtroFincaId, setFiltroFincaId] = useState("todas");

  const cargarFincas = useCallback(async () => {
    setCargandoFincas(true);
    try {
      setFincas(await dataSource.listFincas());
    } catch {
      showToast(t("gestionOperativa.errorCargarFincas"), "error");
    } finally {
      setCargandoFincas(false);
    }
  }, [showToast]);

  const cargarCertificados = useCallback(async () => {
    setCargandoCertificados(true);
    try {
      setCertificados(await dataSource.listCertificados());
    } catch {
      showToast(t("gestionOperativa.errorCargarCertificados"), "error");
    } finally {
      setCargandoCertificados(false);
    }
  }, [showToast]);

  useEffect(() => {
    void cargarFincas();
    void cargarCertificados();
  }, [cargarFincas, cargarCertificados]);

  const fincasPorId = useMemo(() => new Map(fincas.map((f) => [f.id, f])), [fincas]);

  const certificadosFiltrados = useMemo(() => {
    if (filtroFincaId === "todas") return certificados;
    return certificados.filter((c) => c.fincaId === filtroFincaId);
  }, [certificados, filtroFincaId]);

  async function handleCrearFinca(input: NuevaFincaInput) {
    setEnviandoFinca(true);
    try {
      const nueva = await dataSource.createFinca(input);
      setFincas((actuales) => [nueva, ...actuales]);
      showToast(`${t("gestionOperativa.fincaRegistradaPrefijo")}${nueva.nombre}${t("gestionOperativa.fincaRegistradaSufijo")}`, "success");
      setModalFincaOpen(false);
    } catch {
      showToast(t("gestionOperativa.errorRegistrarFinca"), "error");
    } finally {
      setEnviandoFinca(false);
    }
  }

  async function handleCrearCertificado(input: NuevoCertificadoInput) {
    setEnviandoCert(true);
    try {
      const nuevo = await dataSource.createCertificado(input);
      // Se agrega de inmediato al estado local: la pestaña de Certificados
      // debe reflejar el nuevo registro sin recargar ni renavegar.
      setCertificados((actuales) => [nuevo, ...actuales]);
      showToast(t("gestionOperativa.certificadoRegistrado"), "success");
      setModalCertOpen(false);
    } catch {
      showToast(t("gestionOperativa.errorRegistrarCertificado"), "error");
    } finally {
      setEnviandoCert(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb={t("gestionOperativa.breadcrumb")}
        title={t("gestionOperativa.titulo")}
        description={t("gestionOperativa.descripcion")}
      />

      <div className="mb-5 flex gap-1 border-b border-[var(--border-subtle)]">
        {TABS.map((tabValue) => (
          <button
            key={tabValue}
            onClick={() => setTab(tabValue)}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === tabValue ? "border-brand-800 text-brand-800" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t(TAB_LABEL_KEYS[tabValue])}
          </button>
        ))}
      </div>

      {tab === "Fincas" && (
        <>
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setModalFincaOpen(true)}>
              <Plus className="h-4 w-4" strokeWidth={1.75} />
              {t("gestionOperativa.agregarFinca")}
            </Button>
          </div>
          <TabFincas fincas={fincas} cargando={cargandoFincas} />
        </>
      )}

      {tab === "Certificados" && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Select value={filtroFincaId} onChange={(e) => setFiltroFincaId(e.target.value)} className="w-auto">
              <option value="todas">{t("gestionOperativa.todasLasFincas")}</option>
              {fincas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nombre}
                </option>
              ))}
            </Select>
            <Button onClick={() => setModalCertOpen(true)}>
              <Plus className="h-4 w-4" strokeWidth={1.75} />
              {t("gestionOperativa.agregarCertificado")}
            </Button>
          </div>
          <TabCertificados certificados={certificadosFiltrados} cargando={cargandoCertificados} fincasPorId={fincasPorId} />
        </>
      )}

      <Modal open={modalFincaOpen} onClose={() => setModalFincaOpen(false)} title={t("gestionOperativa.agregarFinca")} widthClassName="max-w-2xl">
        <FincaForm enviando={enviandoFinca} onSubmit={(v) => void handleCrearFinca(v)} onCancel={() => setModalFincaOpen(false)} />
      </Modal>

      <Modal open={modalCertOpen} onClose={() => setModalCertOpen(false)} title={t("gestionOperativa.agregarCertificado")}>
        <CertificadoForm
          fincas={fincas}
          enviando={enviandoCert}
          onSubmit={(v) => void handleCrearCertificado(v)}
          onCancel={() => setModalCertOpen(false)}
        />
      </Modal>
    </div>
  );
}

function formatUbicacion(f: Finca, t: (clave: ClaveTraduccion) => string): string {
  const partes = [f.vereda ? `${t("gestionOperativa.veredaPrefijo")}${f.vereda}` : null, f.municipio, f.departamento].filter(Boolean);
  return partes.join(", ");
}

function formatCoordenadas(f: Finca): string {
  if (f.latitud === null || f.longitud === null) return "—";
  return `${f.latitud}, ${f.longitud}`;
}

function TabFincas({ fincas, cargando }: { fincas: Finca[]; cargando: boolean }) {
  const { t } = useLanguage();
  return (
    <Card>
      {cargando ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("gestionOperativa.cargando")}</p>
      ) : fincas.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("gestionOperativa.sinFincas")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colCodigo")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colNombre")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colUbicacion")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colPropietario")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colCedula")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colAreaTotal")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colAreaCafe")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colArboles")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colVariedad")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colCoordenadas")}</th>
              </tr>
            </thead>
            <tbody>
              {fincas.map((f) => (
                <tr key={f.id} className="border-b border-[var(--border-subtle)] last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs font-semibold text-brand-800">{f.codigo}</td>
                  <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{f.nombre}</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatUbicacion(f, t)}</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{f.propietario}</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{f.cedulaPropietario}</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{f.areaTotal} ha</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{f.areaCafe} ha</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{f.numeroArboles.toLocaleString("es-CO")}</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{f.variedad}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-[var(--text-secondary)]">{formatCoordenadas(f)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function TabCertificados({
  certificados,
  cargando,
  fincasPorId,
}: {
  certificados: CertificadoFinca[];
  cargando: boolean;
  fincasPorId: Map<string, Finca>;
}) {
  const hoy = new Date();
  const { t } = useLanguage();

  return (
    <Card>
      {cargando ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("gestionOperativa.cargando")}</p>
      ) : certificados.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("gestionOperativa.sinCertificados")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colFinca")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colCertificado")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colEntidadCertificadora")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colNumero")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colFechaEmision")}</th>
                <th className="py-2 pr-4 font-semibold">{t("gestionOperativa.colFechaVencimiento")}</th>
              </tr>
            </thead>
            <tbody>
              {certificados.map((c) => {
                const vencido = c.fechaVencimiento !== null && new Date(c.fechaVencimiento) < hoy;
                return (
                  <tr key={c.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{fincasPorId.get(c.fincaId)?.nombre ?? "—"}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{c.nombre}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{c.entidadCertificadora}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[var(--text-secondary)]">{c.numeroCertificado ?? "—"}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatDate(c.fechaEmision)}</td>
                    <td className={`py-3 pr-4 ${vencido ? "font-semibold text-status-rechazada" : "text-[var(--text-secondary)]"}`}>
                      {formatDate(c.fechaVencimiento)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function FincaForm({
  enviando,
  onSubmit,
  onCancel,
}: {
  enviando: boolean;
  onSubmit: (input: NuevaFincaInput) => void;
  onCancel: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [vereda, setVereda] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [propietario, setPropietario] = useState("");
  const [cedulaPropietario, setCedulaPropietario] = useState("");
  const [areaTotal, setAreaTotal] = useState(0);
  const [areaCafe, setAreaCafe] = useState(0);
  const [numeroArboles, setNumeroArboles] = useState(0);
  const [variedad, setVariedad] = useState(VARIEDADES[0]);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const { t } = useLanguage();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      nombre,
      vereda: vereda.trim() || null,
      municipio,
      departamento,
      propietario,
      cedulaPropietario,
      areaTotal: Number(areaTotal),
      areaCafe: Number(areaCafe),
      numeroArboles: Number(numeroArboles),
      variedad,
      latitud: latitud.trim() ? Number(latitud) : null,
      longitud: longitud.trim() ? Number(longitud) : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label={t("gestionOperativa.campoNombreFinca")}>
          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t("gestionOperativa.placeholderNombreFinca")} />
        </Field>
        <Field label={t("gestionOperativa.campoVereda")}>
          <Input value={vereda} onChange={(e) => setVereda(e.target.value)} placeholder={t("gestionOperativa.placeholderVereda")} />
        </Field>
        <Field label={t("gestionOperativa.campoMunicipio")}>
          <Input required value={municipio} onChange={(e) => setMunicipio(e.target.value)} placeholder={t("gestionOperativa.placeholderMunicipio")} />
        </Field>
        <Field label={t("gestionOperativa.campoDepartamento")}>
          <Input required value={departamento} onChange={(e) => setDepartamento(e.target.value)} placeholder={t("gestionOperativa.placeholderDepartamento")} />
        </Field>
        <Field label={t("gestionOperativa.colPropietario")}>
          <Input required value={propietario} onChange={(e) => setPropietario(e.target.value)} placeholder={t("gestionOperativa.placeholderNombreCompleto")} />
        </Field>
        <Field label={t("gestionOperativa.campoCedulaPropietario")}>
          <Input required value={cedulaPropietario} onChange={(e) => setCedulaPropietario(e.target.value)} placeholder={t("gestionOperativa.placeholderCedula")} />
        </Field>
        <Field label={t("gestionOperativa.campoAreaTotal")}>
          <Input required type="number" min={0} step="0.1" value={areaTotal} onChange={(e) => setAreaTotal(Number(e.target.value))} />
        </Field>
        <Field label={t("gestionOperativa.campoAreaCafe")}>
          <Input required type="number" min={0} step="0.1" value={areaCafe} onChange={(e) => setAreaCafe(Number(e.target.value))} />
        </Field>
        <Field label={t("gestionOperativa.campoNumeroArboles")}>
          <Input required type="number" min={0} value={numeroArboles} onChange={(e) => setNumeroArboles(Number(e.target.value))} />
        </Field>
        <Field label={t("gestionOperativa.colVariedad")}>
          <Select value={variedad} onChange={(e) => setVariedad(e.target.value)}>
            {VARIEDADES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t("gestionOperativa.campoLatitud")}>
          <Input type="number" step="0.0001" value={latitud} onChange={(e) => setLatitud(e.target.value)} placeholder={t("gestionOperativa.placeholderLatitud")} />
        </Field>
        <Field label={t("gestionOperativa.campoLongitud")}>
          <Input type="number" step="0.0001" value={longitud} onChange={(e) => setLongitud(e.target.value)} placeholder={t("gestionOperativa.placeholderLongitud")} />
        </Field>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          {t("gestionOperativa.cancelar")}
        </Button>
        <Button type="submit" disabled={enviando}>
          <Plus className="h-4 w-4" strokeWidth={1.75} />
          {t("gestionOperativa.agregarFinca")}
        </Button>
      </div>
    </form>
  );
}

function CertificadoForm({
  fincas,
  enviando,
  onSubmit,
  onCancel,
}: {
  fincas: Finca[];
  enviando: boolean;
  onSubmit: (input: NuevoCertificadoInput) => void;
  onCancel: () => void;
}) {
  const [fincaId, setFincaId] = useState(fincas[0]?.id ?? "");
  const [nombre, setNombre] = useState("");
  const [entidadCertificadora, setEntidadCertificadora] = useState("");
  const [numeroCertificado, setNumeroCertificado] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const { t } = useLanguage();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      fincaId,
      nombre,
      entidadCertificadora,
      numeroCertificado: numeroCertificado.trim() || null,
      fechaEmision,
      fechaVencimiento: fechaVencimiento.trim() || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <Field label={t("gestionOperativa.colFinca")}>
          <Select required value={fincaId} onChange={(e) => setFincaId(e.target.value)}>
            {fincas.length === 0 && <option value="">{t("gestionOperativa.selectSinFincas")}</option>}
            {fincas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t("gestionOperativa.campoNombreCertificado")}>
          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t("gestionOperativa.placeholderNombreCertificado")} />
        </Field>
        <Field label={t("gestionOperativa.colEntidadCertificadora")}>
          <Input required value={entidadCertificadora} onChange={(e) => setEntidadCertificadora(e.target.value)} placeholder={t("gestionOperativa.placeholderEntidadCertificadora")} />
        </Field>
        <Field label={t("gestionOperativa.campoNumeroCertificado")}>
          <Input value={numeroCertificado} onChange={(e) => setNumeroCertificado(e.target.value)} placeholder={t("gestionOperativa.placeholderNumeroCertificado")} />
        </Field>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label={t("gestionOperativa.colFechaEmision")}>
            <Input required type="date" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} />
          </Field>
          <Field label={t("gestionOperativa.campoFechaVencimientoOpcional")}>
            <Input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          {t("gestionOperativa.cancelar")}
        </Button>
        <Button type="submit" disabled={enviando || fincas.length === 0}>
          <Plus className="h-4 w-4" strokeWidth={1.75} />
          {t("gestionOperativa.agregarCertificado")}
        </Button>
      </div>
    </form>
  );
}
