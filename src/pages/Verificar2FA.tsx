import { type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";
import { Loader2, ShieldCheck } from "lucide-react";
import { Button, Field, Input } from "../components/ui";
import logo from "../assets/azahar-logo.png";
import sidebarBg from "../assets/sidebar-bg.jpg";

interface Estado {
  ok: boolean;
  enrolado?: boolean;
  correo?: string;
  secreto?: string;
  otpauth?: string;
  mensaje?: string;
}

/**
 * Segundo paso del acceso con Google: el código de 6 dígitos de la app autenticadora.
 * La primera vez muestra el QR para registrarla (Google Authenticator, Microsoft Authenticator, Authy…).
 */
export default function Verificar2FA() {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        const r = await fetch("/api/auth/login?r=2fa", { credentials: "same-origin", cache: "no-store" });
        const j = (await r.json()) as Estado;
        if (!vivo) return;
        setEstado(j);
        if (j.ok && j.otpauth) setQr(await QRCode.toDataURL(j.otpauth, { margin: 1, width: 192 }));
      } catch {
        if (vivo) setEstado({ ok: false, mensaje: "No pudimos cargar la verificación. Vuelve a entrar con Google." });
      }
    })();
    return () => {
      vivo = false;
    };
  }, []);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const r = await fetch("/api/auth/login?r=2fa", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
      });
      const j = (await r.json()) as { ok: boolean; mensaje?: string };
      if (j.ok) {
        window.location.assign("/inicio"); // recarga completa: la sesión ya quedó en la cookie
        return;
      }
      setError(j.mensaje ?? "No pudimos verificar el código.");
    } catch {
      setError("No pudimos verificar el código. Inténtalo de nuevo.");
    }
    setEnviando(false);
  }

  const sinPaso = estado && !estado.ok;

  return (
    <div className="azahar-login-light relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${sidebarBg})` }} aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-900/80 via-brand-900/70 to-brand-900/85" aria-hidden="true" />

      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-cream-100 p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo} alt="Azahar Coffee Company" className="mb-4 h-14 w-auto object-contain" />
          <h1 className="font-heading text-xl font-bold text-brand-900">Verificación en dos pasos</h1>
          {estado?.correo && <p className="mt-1 text-sm text-brand-600">{estado.correo}</p>}
        </div>

        {!estado && (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
          </div>
        )}

        {sinPaso && (
          <>
            <p className="rounded-lg bg-status-rechazada-bg px-3 py-2 text-sm text-status-rechazada">{estado.mensaje ?? "Tu acceso con Google venció."}</p>
            <Link to="/login" className="mt-4 block text-center text-sm font-semibold text-brand-800 hover:underline">
              Volver a iniciar sesión
            </Link>
          </>
        )}

        {estado?.ok && (
          <form onSubmit={enviar} className="space-y-4">
            {estado.enrolado === false ? (
              <div className="space-y-3 text-center text-sm text-brand-700">
                <p>Primera vez: escanea este código con tu app autenticadora (Google Authenticator, Microsoft Authenticator o Authy) y escribe el código de 6 dígitos que te muestre.</p>
                {qr && <img src={qr} alt="Código QR para tu app autenticadora" className="mx-auto h-48 w-48 rounded-lg bg-white p-1" />}
                {estado.secreto && (
                  <p className="text-xs text-brand-500">
                    ¿No puedes escanear? Escribe esta clave en la app: <span className="select-all font-mono font-semibold text-brand-800">{estado.secreto}</span>
                  </p>
                )}
              </div>
            ) : (
              <p className="text-center text-sm text-brand-700">Escribe el código de 6 dígitos de tu app autenticadora.</p>
            )}

            <Field label="Código de 6 dígitos">
              <Input
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                maxLength={6}
                required
                placeholder="000000"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                autoFocus
              />
            </Field>

            {error && <p className="rounded-lg bg-status-rechazada-bg px-3 py-2 text-sm text-status-rechazada">{error}</p>}

            <Button type="submit" disabled={enviando || codigo.length !== 6} className="w-full">
              {enviando ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />}
              Verificar y entrar
            </Button>
            <Link to="/login" className="block text-center text-sm text-brand-600 hover:underline">
              Cancelar
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
