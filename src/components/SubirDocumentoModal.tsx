import { type FormEvent, useState } from "react";
import { Modal } from "./Modal";
import { Button, Field, Input, Select } from "./ui";
import { dataSource } from "../lib/dataSource";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";
import { UploadCloud } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  empleadoId: string;
  onCreated: () => void;
}

export function SubirDocumentoModal({ open, onClose, empleadoId, onCreated }: Props) {
  const { showToast } = useToast();
  const { t } = useLanguage();
  const TIPOS = [
    t("subirDocumento.tipoContrato"),
    t("subirDocumento.tipoCertificado"),
    t("subirDocumento.tipoSeguridadSocial"),
    t("subirDocumento.tipoIdentificacion"),
    t("subirDocumento.tipoOtro"),
  ];
  const [archivoNombre, setArchivoNombre] = useState("");
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!archivoNombre) {
      showToast(t("subirDocumento.errorSeleccionArchivo"), "error");
      return;
    }
    setEnviando(true);
    try {
      await dataSource.addDocumento({ empleadoId, nombre: archivoNombre, tipo, subidoPor: empleadoId });
      showToast(t("subirDocumento.exito"), "success");
      setArchivoNombre("");
      setTipo(TIPOS[0]);
      onCreated();
      onClose();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={t("subirDocumento.titulo")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label={t("subirDocumento.campoArchivo")}>
          <Input
            type="file"
            onChange={(e) => setArchivoNombre(e.target.files?.[0]?.name ?? "")}
          />
          {archivoNombre && <p className="mt-1.5 text-xs text-[var(--text-secondary)]">{t("subirDocumento.seleccionado")} {archivoNombre}</p>}
        </Field>
        <Field label={t("subirDocumento.campoTipo")}>
          <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {TIPOS.map((tp) => (
              <option key={tp} value={tp}>
                {tp}
              </option>
            ))}
          </Select>
        </Field>
        <p className="text-xs text-[var(--text-muted)]">
          {t("subirDocumento.modoDemo")}
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t("subirDocumento.cancelar")}
          </Button>
          <Button type="submit" disabled={enviando}>
            <UploadCloud className="h-4 w-4" strokeWidth={1.75} />
            {t("subirDocumento.botonSubir")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
