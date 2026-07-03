import { useMemo } from "react";
import { Briefcase, Building2, CalendarDays, FileSignature, Hourglass } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { calcularAntiguedad, formatDate } from "../lib/format";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function MiContrato() {
  const { empleado } = useAuth();
  const antiguedad = useMemo(() => (empleado ? calcularAntiguedad(empleado.fechaIngreso) : null), [empleado]);

  if (!empleado || !antiguedad) return null;

  const datos = [
    { label: "Cargo", valor: empleado.cargo, Icon: Briefcase },
    { label: "Tipo de contrato", valor: empleado.tipoContrato, Icon: FileSignature },
    { label: "Fecha de ingreso", valor: formatDate(empleado.fechaIngreso), Icon: CalendarDays, mono: true },
    { label: "Antigüedad", valor: antiguedad.texto, Icon: Hourglass },
    { label: "Departamento", valor: empleado.departamento, Icon: Building2 },
  ];

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Mi portal" title="Mi contrato" description="Información general de tu vínculo laboral con Azahar Coffee Company." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {datos.map(({ label, valor, Icon, mono }) => (
          <Card key={label} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-brand-800">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
              <p className={`mt-0.5 text-base font-semibold text-[var(--text-primary)] ${mono ? "font-mono" : "font-heading"}`}>{valor}</p>
            </div>
          </Card>
        ))}

        <Card className="flex items-center gap-4 bg-brand-800 text-cream-100">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-100/15">
            <Briefcase className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cream-200/80">Correo corporativo</p>
            <p className="mt-0.5 text-base font-semibold">{empleado.correo}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
