import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FileText, FolderPlus } from "lucide-react";
import { dataSource } from "../../lib/dataSource";
import type { Documento, Empleado } from "../../lib/types";
import { formatDate } from "../../lib/format";
import { useAuth } from "../../auth/AuthContext";
import { useToast } from "../../context/ToastContext";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button, Field, Input, Select } from "../../components/ui";

const TIPOS = ["Contrato", "Certificado", "Seguridad social", "Identificación", "Otro"];

export default function AdminDocumentos() {
  const { empleado: adminActual } = useAuth();
  const { showToast } = useToast();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const [empleadoId, setEmpleadoId] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState(TIPOS[0]);

  const cargar = useCallback(async () => {
    setCargando(true);
    const [docs, emps] = await Promise.all([dataSource.listDocumentos(), dataSource.listEmpleados()]);
    setDocumentos(docs);
    setEmpleados(emps);
    setEmpleadoId((actual) => actual || emps[0]?.id || "");
    setCargando(false);
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const empleadoPorId = useMemo(() => new Map(empleados.map((e) => [e.id, e])), [empleados]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!empleadoId || !nombre) return;
    setEnviando(true);
    try {
      await dataSource.addDocumento({ empleadoId, nombre, tipo, subidoPor: adminActual?.id ?? null });
      showToast("Documento agregado al expediente del empleado.", "success");
      setNombre("");
      await cargar();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Administración" title="Documentos" description="Consulta y agrega documentos al expediente de cualquier empleado." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Agregar documento" className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Empleado">
              <Select value={empleadoId} onChange={(e) => setEmpleadoId(e.target.value)} required>
                {empleados.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nombre}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Nombre del documento">
              <Input required placeholder="Ej. Otrosí contrato 2026.pdf" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Field>
            <Field label="Tipo">
              <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </Field>
            <Button type="submit" disabled={enviando} className="w-full">
              <FolderPlus className="h-4 w-4" strokeWidth={1.75} />
              Agregar documento
            </Button>
          </form>
        </Card>

        <Card title={`Todos los documentos (${documentos.length})`} className="lg:col-span-2">
          {cargando ? (
            <p className="py-6 text-center text-sm text-[var(--text-muted)]">Cargando…</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                    <th className="py-2 pr-4 font-semibold">Empleado</th>
                    <th className="py-2 pr-4 font-semibold">Documento</th>
                    <th className="py-2 pr-4 font-semibold">Tipo</th>
                    <th className="py-2 pr-4 font-semibold">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map((doc) => (
                    <tr key={doc.id} className="border-b border-[var(--border-subtle)] last:border-0">
                      <td className="py-3 pr-4 text-[var(--text-primary)]">{empleadoPorId.get(doc.empleadoId)?.nombre ?? "—"}</td>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <FileText className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                          {doc.nombre}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-[var(--text-secondary)]">{doc.tipo}</td>
                      <td className="py-3 pr-4 font-mono text-[var(--text-secondary)]">{formatDate(doc.subidoEn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
