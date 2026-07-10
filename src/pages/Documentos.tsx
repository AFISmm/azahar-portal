import { useCallback, useEffect, useState } from "react";
import { Download, FileText, UploadCloud } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { Documento } from "../lib/types";
import { formatDate } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Button } from "../components/ui";
import { SubirDocumentoModal } from "../components/SubirDocumentoModal";
import { useLanguage } from "../context/LanguageContext";

export default function Documentos() {
  const { empleado } = useAuth();
  const { t } = useLanguage();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const cargar = useCallback(async () => {
    if (!empleado) return;
    setCargando(true);
    const docs = await dataSource.listDocumentos({ empleadoId: empleado.id });
    setDocumentos(docs);
    setCargando(false);
  }, [empleado]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  if (!empleado) return null;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb={t("documentos.breadcrumb")} title={t("documentos.titulo")} description={t("documentos.descripcion")}>
        <Button onClick={() => setModalOpen(true)}>
          <UploadCloud className="h-4 w-4" strokeWidth={1.75} />
          {t("documentos.subir")}
        </Button>
      </PageHeader>

      <Card>
        {cargando ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("documentos.cargando")}</p>
        ) : documentos.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("documentos.sinDocumentos")}</p>
        ) : (
          <ul className="divide-y divide-[var(--border-subtle)]">
            {documentos.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream-200 text-brand-800">
                    <FileText className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{doc.nombre}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {doc.tipo} · {t("documentos.subidoEl")} {formatDate(doc.subidoEn)}
                    </p>
                  </div>
                </div>
                <Button variant="outline" disabled title={t("documentos.disponibleProximamente")}>
                  <Download className="h-4 w-4" strokeWidth={1.75} />
                  {t("documentos.descargar")}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <SubirDocumentoModal open={modalOpen} onClose={() => setModalOpen(false)} empleadoId={empleado.id} onCreated={cargar} />
    </div>
  );
}
