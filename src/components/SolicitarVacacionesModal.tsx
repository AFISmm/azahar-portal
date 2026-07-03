import { type FormEvent, useState } from "react";
import { Modal } from "./Modal";
import { Button, Field, Input, Textarea } from "./ui";
import { dataSource } from "../lib/dataSource";
import { useToast } from "../context/ToastContext";
import { CalendarPlus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  empleadoId: string;
  onCreated: () => void;
}

export function SolicitarVacacionesModal({ open, onClose, empleadoId, onCreated }: Props) {
  const { showToast } = useToast();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);

  function limpiar() {
    setFechaInicio("");
    setFechaFin("");
    setMotivo("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      await dataSource.createSolicitud({
        empleadoId,
        tipo: "vacaciones",
        fechaInicio,
        fechaFin,
        motivo: motivo || null,
      });
      showToast("Solicitud de vacaciones enviada. Quedó pendiente de aprobación.", "success");
      limpiar();
      onCreated();
      onClose();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Solicitar vacaciones">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fecha de inicio">
            <Input type="date" required value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </Field>
          <Field label="Fecha de fin">
            <Input type="date" required value={fechaFin} min={fechaInicio || undefined} onChange={(e) => setFechaFin(e.target.value)} />
          </Field>
        </div>
        <Field label="Motivo (opcional)">
          <Textarea rows={3} placeholder="Cuéntanos brevemente el motivo de tu solicitud…" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        </Field>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={enviando}>
            <CalendarPlus className="h-4 w-4" strokeWidth={1.75} />
            Enviar solicitud
          </Button>
        </div>
      </form>
    </Modal>
  );
}
