import { type FormEvent, useEffect, useState } from "react";
import { Lock, MessageSquareWarning } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { dataSource } from "../lib/dataSource";
import type { DestinoPqr } from "../lib/types";
import { formatDate } from "../lib/format";
import { useToast } from "../context/ToastContext";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Button, Field, Input, Select, Textarea } from "../components/ui";

export default function MiPerfil() {
  const { empleado, refreshEmpleado } = useAuth();
  const { showToast } = useToast();

  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [destinos, setDestinos] = useState<DestinoPqr[]>([]);
  const [adminDestinoId, setAdminDestinoId] = useState("");
  const [cedulaPqr, setCedulaPqr] = useState("");
  const [correoPqr, setCorreoPqr] = useState("");
  const [problema, setProblema] = useState("");
  const [enviandoPqr, setEnviandoPqr] = useState(false);

  useEffect(() => {
    if (!empleado) return;
    setCorreo(empleado.correo);
    setUsername(empleado.username ?? "");
    setCedulaPqr(empleado.numeroIdentificacion ?? "");
    setCorreoPqr(empleado.correo);
  }, [empleado]);

  useEffect(() => {
    if (!modalAbierto) return;
    void (async () => {
      const lista = await dataSource.listDestinosPqr();
      setDestinos(lista);
      setAdminDestinoId(lista[0]?.id ?? "");
    })();
  }, [modalAbierto]);

  if (!empleado) return null;

  const esDesarrollador = empleado.tipoCuenta === "desarrollador";

  const datosBloqueados = [
    { label: "Nombres y apellidos completos", valor: empleado.nombre },
    { label: "Fecha de nacimiento", valor: formatDate(empleado.fechaNacimiento) },
    { label: "Número de identificación", valor: empleado.numeroIdentificacion ?? "—" },
    { label: "Fecha de inicio en la empresa", valor: formatDate(empleado.fechaIngreso) },
  ];

  async function guardarCuenta(e: FormEvent) {
    e.preventDefault();
    setGuardando(true);
    try {
      await dataSource.actualizarPerfilPropio({
        correo: correo.trim() || undefined,
        username: username.trim(),
        password: password.trim() || undefined,
      });
      await refreshEmpleado();
      setPassword("");
      showToast("Perfil actualizado correctamente.", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "No se pudo actualizar el perfil.", "error");
    } finally {
      setGuardando(false);
    }
  }

  async function radicarPqr(e: FormEvent) {
    e.preventDefault();
    if (!empleado || !adminDestinoId) return;
    setEnviandoPqr(true);
    try {
      await dataSource.createPqr({
        nombre: empleado.nombre,
        cedula: cedulaPqr.trim() || null,
        correo: correoPqr.trim(),
        adminDestinoId,
        problema: problema.trim(),
      });
      showToast("Tu PQR fue radicada correctamente.", "success");
      setProblema("");
      setModalAbierto(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "No se pudo radicar la PQR.", "error");
    } finally {
      setEnviandoPqr(false);
    }
  }

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="Portal Azahar" title="Mi perfil" description="Tus datos personales y las credenciales de acceso al Portal Azahar.">
        {!esDesarrollador && (
          <Button variant="outline" onClick={() => setModalAbierto(true)}>
            <MessageSquareWarning className="h-4 w-4" strokeWidth={1.75} />
            Radicar PQR
          </Button>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Datos personales">
          <ul className="divide-y divide-[var(--border-subtle)]">
            {datosBloqueados.map(({ label, valor }) => (
              <li key={label} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">{valor}</p>
                </div>
                <Lock className="h-4 w-4 shrink-0 text-[var(--text-muted)]" strokeWidth={1.75} />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Estos datos son de solo lectura. Si necesitas corregir alguno, radica una PQR o contacta a Talento Humano.
          </p>
        </Card>

        <Card title="Cuenta">
          <form onSubmit={guardarCuenta} className="space-y-4">
            <Field label="Correo electrónico">
              <Input type="email" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </Field>
            <Field label="Nickname / usuario">
              <Input placeholder="Ej. jbarista" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Field>
            <Field label="Nueva contraseña (opcional)">
              <Input
                type="password"
                placeholder="Déjalo en blanco para no cambiarla"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Field>
            <Button type="submit" disabled={guardando} className="w-full">
              Guardar cambios
            </Button>
          </form>
        </Card>
      </div>

      <Modal open={modalAbierto} onClose={() => setModalAbierto(false)} title="Radicar PQR">
        <form onSubmit={radicarPqr} className="space-y-4">
          <Field label="Nombre y apellido">
            <Input value={empleado.nombre} disabled />
          </Field>
          <Field label="Número de cédula">
            <Input required value={cedulaPqr} onChange={(e) => setCedulaPqr(e.target.value)} />
          </Field>
          <Field label="Correo electrónico">
            <Input type="email" required value={correoPqr} onChange={(e) => setCorreoPqr(e.target.value)} />
          </Field>
          <Field label="Administrador destino">
            <Select value={adminDestinoId} onChange={(e) => setAdminDestinoId(e.target.value)}>
              {destinos.length === 0 && <option value="">No hay cuentas de desarrollador disponibles</option>}
              {destinos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Describe tu problema">
            <Textarea required rows={4} placeholder="Cuéntanos qué está pasando…" value={problema} onChange={(e) => setProblema(e.target.value)} />
          </Field>
          <Button type="submit" disabled={enviandoPqr || !adminDestinoId} className="w-full">
            Enviar PQR
          </Button>
        </form>
      </Modal>
    </div>
  );
}
