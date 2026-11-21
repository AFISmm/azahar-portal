import { Building2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function OficinaVirtual() {
  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Azahar" title="Oficina Virtual" description="Espacio de trabajo virtual del equipo." />
      <Card>
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-brand-800" strokeWidth={1.5} />
          <div>
            <p className="font-semibold">Próximamente</p>
            <p className="text-sm text-[var(--text-muted)]">Este módulo está en construcción.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
