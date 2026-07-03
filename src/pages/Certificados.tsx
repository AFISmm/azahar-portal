import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Award, Download } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Solicitud } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { useToast } from "../context/ToastContext";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button, Field, Select, Textarea } from "../components/ui";
import { StatusBadge } from "../components/StatusBadge";

const TIPOS_CERTIFICADO = [
  { value: "laboral", label: "Certificado laboral" },
  { value: "salarial", label: "Certificado laboral y salarial" },
];

export default function Certificados() {
  const { empleado } = useAuth();
  const { showToast } = useToast();
  const [certificados, setCertificados] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [tipoCertificado, setTipoCertificado] = useState(TIPOS_CERTIFICADO[0].value);
  const [nota, setNota] = useState("");
  const [enviando, setEnviando] = useState(false);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const sols = await dataSource.listSolicitudes({ empleadoId: empleado.id });
    setCertificados(sols.filter((s) => s.tipo === "certificado"));
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!empleado) return;
    setEnviando(true);
    try {
      const etiqueta = TIPOS_CERTIFICADO.find((t) => t.value === tipoCertificado)?.label ?? "Certificado";
      const motivo = nota ? `${etiqueta}. ${nota}` : etiqueta;
      await dataSource.createSolicitud({ empleadoId: empleado.id, tipo: "certificado", fechaInicio: null, fechaFin: null, motivo });
      showToast("Solicitud de certificado enviada a Talento Humano.", "success");
      setNota("");
      await cargar();
    } finally {
      setEnviando(false);
    }
  }

  if (!empleado) return null;

  const emitidos = certificados.filter((c) => c.estado === "aprobada");

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Mi portal" title="Certificados" description="Solicita certificados laborales o salariales y consulta los ya emitidos." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Solicitar certificado" className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Tipo de certificado">
              <Select value={tipoCertificado} onChange={(e) => setTipoCertificado(e.target.value)}>
                {TIPOS_CERTIFICADO.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Nota adicional (opcional)">
              <Textarea rows={3} placeholder="Ej. Para trámite bancario, dirigido a…" value={nota} onChange={(e) => setNota(e.target.value)} />
            </Field>
            <Button type="submit" disabled={enviando} className="w-full">
              <Award className="h-4 w-4" strokeWidth={1.75} />
              Solicitar certificado
            </Button>
          </form>
        </Card>

        <Card title={`Certificados emitidos (${emitidos.length})`} className="lg:col-span-2">
          {cargando ? (
            <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
          ) : certificados.length === 0 ? (
            <p className="py-6 text-center text-sm text-[var(--text-muted)]">Aún no has solicitado certificados.</p>
          ) : (
            <ul className="divide-y divide-[var(--border-subtle)]">
              {certificados.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{c.motivo}</p>
                    <p className="text-xs text-[var(--text-muted)]">Solicitado el {formatDateTime(c.creadoEn)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge estado={c.estado} />
                    <Button variant="outline" disabled={c.estado !== "aprobada"} title="Disponible próximamente">
                      <Download className="h-4 w-4" strokeWidth={1.75} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
