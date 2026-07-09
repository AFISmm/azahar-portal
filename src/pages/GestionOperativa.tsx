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

const TABS = ["Fincas", "Certificados"] as const;
type Tab = (typeof TABS)[number];

const VARIEDADES = ["Castillo", "Caturra", "Bourbon", "Colombia", "Typica", "Tabi", "Geisha"];

export default function GestionOperativa() {
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
      showToast("No se pudieron cargar las fincas. Intenta de nuevo.", "error");
    } finally {
      setCargandoFincas(false);
    }
  }, [showToast]);

  const cargarCertificados = useCallback(async () => {
    setCargandoCertificados(true);
    try {
      setCertificados(await dataSource.listCertificados());
    } catch {
      showToast("No se pudieron cargar los certificados. Intenta de nuevo.", "error");
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
      showToast(`Finca ${nueva.nombre} registrada correctamente.`, "success");
      setModalFincaOpen(false);
    } catch {
      showToast("No se pudo registrar la finca. Intenta de nuevo.", "error");
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
      showToast("Certificado registrado correctamente.", "success");
      setModalCertOpen(false);
    } catch {
      showToast("No se pudo registrar el certificado. Intenta de nuevo.", "error");
    } finally {
      setEnviandoCert(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader
        breadcrumb="Gestión del negocio"
        title="Gestión Operativa"
        description="Administra las fincas cafeteras registradas de Azahar Coffee Company y sus certificaciones."
      />

      <div className="mb-5 flex gap-1 border-b border-[var(--border-subtle)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === t ? "border-brand-800 text-brand-800" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Fincas" && (
        <>
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setModalFincaOpen(true)}>
              <Plus className="h-4 w-4" strokeWidth={1.75} />
              Agregar finca
            </Button>
          </div>
          <TabFincas fincas={fincas} cargando={cargandoFincas} />
        </>
      )}

      {tab === "Certificados" && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Select value={filtroFincaId} onChange={(e) => setFiltroFincaId(e.target.value)} className="w-auto">
              <option value="todas">Todas las fincas</option>
              {fincas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nombre}
                </option>
              ))}
            </Select>
            <Button onClick={() => setModalCertOpen(true)}>
              <Plus className="h-4 w-4" strokeWidth={1.75} />
              Agregar certificado
            </Button>
          </div>
          <TabCertificados certificados={certificadosFiltrados} cargando={cargandoCertificados} fincasPorId={fincasPorId} />
        </>
      )}

      <Modal open={modalFincaOpen} onClose={() => setModalFincaOpen(false)} title="Agregar finca" widthClassName="max-w-2xl">
        <FincaForm enviando={enviandoFinca} onSubmit={(v) => void handleCrearFinca(v)} onCancel={() => setModalFincaOpen(false)} />
      </Modal>

      <Modal open={modalCertOpen} onClose={() => setModalCertOpen(false)} title="Agregar certificado">
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

function formatUbicacion(f: Finca): string {
  const partes = [f.vereda ? `Vereda ${f.vereda}` : null, f.municipio, f.departamento].filter(Boolean);
  return partes.join(", ");
}

function formatCoordenadas(f: Finca): string {
  if (f.latitud === null || f.longitud === null) return "—";
  return `${f.latitud}, ${f.longitud}`;
}

function TabFincas({ fincas, cargando }: { fincas: Finca[]; cargando: boolean }) {
  return (
    <Card>
      {cargando ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
      ) : fincas.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay fincas registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <th className="py-2 pr-4 font-semibold">Código</th>
                <th className="py-2 pr-4 font-semibold">Nombre</th>
                <th className="py-2 pr-4 font-semibold">Ubicación</th>
                <th className="py-2 pr-4 font-semibold">Propietario</th>
                <th className="py-2 pr-4 font-semibold">Cédula</th>
                <th className="py-2 pr-4 font-semibold">Área total</th>
                <th className="py-2 pr-4 font-semibold">Área café</th>
                <th className="py-2 pr-4 font-semibold">Árboles</th>
                <th className="py-2 pr-4 font-semibold">Variedad</th>
                <th className="py-2 pr-4 font-semibold">Coordenadas</th>
              </tr>
            </thead>
            <tbody>
              {fincas.map((f) => (
                <tr key={f.id} className="border-b border-[var(--border-subtle)] last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs font-semibold text-brand-800">{f.codigo}</td>
                  <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{f.nombre}</td>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{formatUbicacion(f)}</td>
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

  return (
    <Card>
      {cargando ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
      ) : certificados.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">No hay certificados registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <th className="py-2 pr-4 font-semibold">Finca</th>
                <th className="py-2 pr-4 font-semibold">Certificado</th>
                <th className="py-2 pr-4 font-semibold">Entidad certificadora</th>
                <th className="py-2 pr-4 font-semibold">Número</th>
                <th className="py-2 pr-4 font-semibold">Fecha de emisión</th>
                <th className="py-2 pr-4 font-semibold">Fecha de vencimiento</th>
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
        <Field label="Nombre de la finca">
          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Finca El Paraíso" />
        </Field>
        <Field label="Vereda (opcional)">
          <Input value={vereda} onChange={(e) => setVereda(e.target.value)} placeholder="Ej. El Roble" />
        </Field>
        <Field label="Municipio">
          <Input required value={municipio} onChange={(e) => setMunicipio(e.target.value)} placeholder="Ej. Pitalito" />
        </Field>
        <Field label="Departamento">
          <Input required value={departamento} onChange={(e) => setDepartamento(e.target.value)} placeholder="Ej. Huila" />
        </Field>
        <Field label="Propietario">
          <Input required value={propietario} onChange={(e) => setPropietario(e.target.value)} placeholder="Nombre completo" />
        </Field>
        <Field label="Cédula de ciudadanía del propietario">
          <Input required value={cedulaPropietario} onChange={(e) => setCedulaPropietario(e.target.value)} placeholder="Ej. 12345678" />
        </Field>
        <Field label="Área total (hectáreas)">
          <Input required type="number" min={0} step="0.1" value={areaTotal} onChange={(e) => setAreaTotal(Number(e.target.value))} />
        </Field>
        <Field label="Área en café (hectáreas)">
          <Input required type="number" min={0} step="0.1" value={areaCafe} onChange={(e) => setAreaCafe(Number(e.target.value))} />
        </Field>
        <Field label="Número de árboles sembrados">
          <Input required type="number" min={0} value={numeroArboles} onChange={(e) => setNumeroArboles(Number(e.target.value))} />
        </Field>
        <Field label="Variedad">
          <Select value={variedad} onChange={(e) => setVariedad(e.target.value)}>
            {VARIEDADES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Latitud (opcional)">
          <Input type="number" step="0.0001" value={latitud} onChange={(e) => setLatitud(e.target.value)} placeholder="Ej. 1.8534" />
        </Field>
        <Field label="Longitud (opcional)">
          <Input type="number" step="0.0001" value={longitud} onChange={(e) => setLongitud(e.target.value)} placeholder="Ej. -76.0511" />
        </Field>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={enviando}>
          <Plus className="h-4 w-4" strokeWidth={1.75} />
          Agregar finca
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
        <Field label="Finca">
          <Select required value={fincaId} onChange={(e) => setFincaId(e.target.value)}>
            {fincas.length === 0 && <option value="">No hay fincas registradas</option>}
            {fincas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Nombre del certificado">
          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Certificación Orgánica" />
        </Field>
        <Field label="Entidad certificadora">
          <Input required value={entidadCertificadora} onChange={(e) => setEntidadCertificadora(e.target.value)} placeholder="Ej. Rainforest Alliance" />
        </Field>
        <Field label="Número de certificado (opcional)">
          <Input value={numeroCertificado} onChange={(e) => setNumeroCertificado(e.target.value)} placeholder="Ej. RA-COL-88213" />
        </Field>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Fecha de emisión">
            <Input required type="date" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} />
          </Field>
          <Field label="Fecha de vencimiento (opcional)">
            <Input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={enviando || fincas.length === 0}>
          <Plus className="h-4 w-4" strokeWidth={1.75} />
          Agregar certificado
        </Button>
      </div>
    </form>
  );
}
