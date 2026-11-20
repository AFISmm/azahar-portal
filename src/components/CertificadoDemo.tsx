import { useState } from "react";
import { Award, ShieldCheck } from "lucide-react";
import { Modal } from "./Modal";
import { fmtFecha, type CertificacionTraz } from "../lib/trazabilidadApi";

// Certificado de demostración: se muestra dentro del portal (sin abrir otra
// pestaña) para que el cliente vea qué puede validar. No es un documento
// oficial: lleva la marca "DEMO" y los datos de la certificación registrada.

function numeroDemo(id: string): string {
  return `DEMO-${id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase().padEnd(8, "0")}`;
}

export function CertificadoDemo({ certificacion }: { certificacion: CertificacionTraz }) {
  const c = certificacion;
  const hoy = new Date().toISOString().slice(0, 10);
  const vencida = !!c.fechaVencimiento && c.fechaVencimiento < hoy;

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-brand-800 bg-cream-100 p-6 text-center text-[var(--text-primary)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-7xl font-black tracking-widest text-brand-800/10"
        style={{ transform: "rotate(-24deg)" }}
      >
        DEMO
      </div>
      <div className="relative">
        <Award className="mx-auto h-10 w-10 text-brand-800" strokeWidth={1.5} />
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">Certificado de</p>
        <h3 className="font-heading text-2xl font-bold">{c.nombre}</h3>
        <p className="mt-4 text-sm text-[var(--text-muted)]">Se certifica que la finca</p>
        <p className="font-heading text-xl font-semibold">{c.fincaNombre ?? "—"}</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">cumple con los requisitos del estándar {c.nombre}.</p>

        <dl className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-x-4 gap-y-2 text-left text-sm">
          <dt className="text-[var(--text-muted)]">Entidad certificadora</dt>
          <dd className="text-right font-medium">{c.entidadCertificadora ?? "—"}</dd>
          <dt className="text-[var(--text-muted)]">N.º de certificado</dt>
          <dd className="text-right font-mono font-medium">{numeroDemo(c.id)}</dd>
          <dt className="text-[var(--text-muted)]">Emitido</dt>
          <dd className="text-right font-medium">{fmtFecha(c.fechaEmision) ?? "—"}</dd>
          <dt className="text-[var(--text-muted)]">Vigente hasta</dt>
          <dd className={`text-right font-medium ${vencida ? "text-status-rechazada" : ""}`}>{fmtFecha(c.fechaVencimiento) ?? "—"}</dd>
        </dl>

        <p className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${vencida ? "bg-red-100 text-status-rechazada" : "bg-green-100 text-green-800"}`}>
          <ShieldCheck className="h-4 w-4" strokeWidth={2} />
          {vencida ? "Certificado vencido" : "Certificado vigente"}
        </p>
        <p className="mt-4 text-[11px] text-[var(--text-muted)]">
          Documento de demostración sin validez legal. Muestra cómo se presenta y valida un certificado dentro del portal.
        </p>
      </div>
    </div>
  );
}

export function BotonVerCertificado({ certificacion }: { certificacion: CertificacionTraz }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="shrink-0 rounded-lg border border-brand-800 px-2.5 py-1.5 text-xs font-bold text-brand-800 hover:bg-cream-200"
      >
        Ver certificado
      </button>
      <Modal open={abierto} onClose={() => setAbierto(false)} title="Certificado (demostración)" widthClassName="max-w-xl">
        <CertificadoDemo certificacion={certificacion} />
      </Modal>
    </>
  );
}
