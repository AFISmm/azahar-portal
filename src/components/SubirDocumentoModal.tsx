import { type FormEvent, useState } from "react";
import { Modal } from "./Modal";
import { Button, Field, Input, Select } from "./ui";
import { dataSource } from "../lib/dataSource";
import { useToast } from "../context/ToastContext";
import { UploadCloud } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  empleadoId: string;
  onCreated: () => void;
}

const TIPOS = ["Contrato", "Certificado", "Seguridad social", "Identificación", "Otro"];

export function SubirDocumentoModal({ open, onClose, empleadoId, onCreated }: Props) {
  const { showToast } = useToast();
  const [archivoNombre, setArchivoNombre] = useState("");
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!archivoNombre) {
      showToast("Selecciona un archivo para continuar.", "error");
      return;
    }
    setEnviando(true);
    try {
      await dataSource.addDocumento({ empleadoId, nombre: archivoNombre, tipo, subidoPor: empleadoId });
      showToast("Documento subido correctamente (modo demo: no se almacena en un servidor real).", "success");
      setArchivoNombre("");
      setTipo(TIPOS[0]);
      onCreated();
      onClose();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Subir documento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Archivo">
          <Input
            type="file"
            onChange={(e) => setArchivoNombre(e.target.files?.[0]?.name ?? "")}
          />
          {archivoNombre && <p className="mt-1.5 text-xs text-[var(--text-secondary)]">Seleccionado: {archivoNombre}</p>}
        </Field>
        <Field label="Tipo de documento">
          <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <p className="text-xs text-[var(--text-muted)]">
          Modo demo: el archivo no se envía a ningún servidor, solo se registra su nombre en tu lista de documentos.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={enviando}>
            <UploadCloud className="h-4 w-4" strokeWidth={1.75} />
            Subir documento
          </Button>
        </div>
      </form>
    </Modal>
  );
}
