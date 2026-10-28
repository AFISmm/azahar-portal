import { useParams } from "react-router-dom";
import MapaOrigenes from "../components/MapaOrigenesCargador";
import { fmtFecha, trazabilidadApi } from "../lib/trazabilidadApi";
import { Cargando, useCarga } from "./trazabilidad/comunes";

// Ficha pública que abre el QR de la bolsa. NO requiere sesión (ver la ruta
// fuera de <ProtectedRoute> en App.tsx y `?r=publico` en api/trazabilidad.ts)
// y se ve igual en celular, tablet o TV gracias a la escala rem global.
export default function LotePublico() {
  const { id = "" } = useParams();
  const { datos: lote, error, cargando } = useCarga(() => trazabilidadApi.publico(id));

  if (cargando) return <Cargando />;
  if (error || !lote) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-100 px-4 text-center">
        <p className="text-sm text-brand-600">No encontramos este lote. Verifica el código QR de la bolsa.</p>
      </main>
    );
  }

  const origenes = lote.origenes;
  const esBlend = origenes.length > 1;
  const puntos = origenes
    .filter((o) => o.finca.latitud != null && o.finca.longitud != null)
    .map((o) => ({ id: o.finca.id, nombre: o.finca.nombre, latitud: o.finca.latitud as number, longitud: o.finca.longitud as number, region: o.finca.region }));

  return (
    <main className="min-h-screen bg-cream-100 px-4 py-8 text-brand-900">
      <div className="mx-auto max-w-md space-y-5">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Azahar Coffee Company</p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-brand-800">
            {esBlend ? "Blend de café" : (origenes[0]?.finca.nombre ?? "Café de origen único")}
          </h1>
          {lote.loteComercial && <p className="mt-1 text-sm text-brand-600">Lote {lote.loteComercial}</p>}
        </header>

        {puntos.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-brand-800/10 shadow-sm">
            <MapaOrigenes puntos={puntos} />
          </div>
        )}

        <ol className="space-y-0 rounded-2xl border border-brand-800/10 bg-white p-5 shadow-sm">
          {origenes.map((o, i) => (
            <li key={o.id} className="relative border-l-2 border-accent-500/50 pb-6 pl-5">
              <span className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-accent-500" />
              <p className="text-xs font-bold uppercase tracking-wide text-accent-500">Origen{origenes.length > 1 ? ` ${i + 1}` : ""}</p>
              <p className="font-bold">{o.finca.nombre}</p>
              <p className="text-sm text-brand-600">{[o.finca.region, o.finca.variedad].filter(Boolean).join(" · ") || "Región y variedad no registradas"}</p>
              {o.finca.altitudMsnm && <p className="text-xs text-brand-400">{o.finca.altitudMsnm} msnm</p>}

              {o.certificaciones.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {o.certificaciones.map((c) => (
                    <a
                      key={c.id}
                      href={c.url ?? undefined}
                      target={c.url ? "_blank" : undefined}
                      rel="noreferrer"
                      className="rounded-full border border-accent-500/40 bg-accent-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800 hover:bg-accent-500/20"
                    >
                      {c.nombre} {c.url && "↗"}
                    </a>
                  ))}
                </div>
              )}

              {o.tipoProceso && (
                <p className="mt-2 text-xs text-brand-600">
                  Proceso: <span className="font-semibold">{o.tipoProceso}</span>
                  {o.humedadFinalPct ? ` · Humedad final ${o.humedadFinalPct}%` : ""}
                </p>
              )}
              {fmtFecha(o.fechaSecado, true) && <p className="text-xs text-brand-400">Secado: {fmtFecha(o.fechaSecado, true)}</p>}
              {o.fotoSecadoUrl && <img src={o.fotoSecadoUrl} alt={`Secado del café de ${o.finca.nombre}`} className="mt-2 h-28 w-full rounded-lg object-cover" />}

              {o.fichasCata.length > 0 && (
                <div className="mt-2 rounded-lg bg-cream-100 p-2.5 text-xs text-brand-600">
                  <p className="mb-1 font-bold uppercase tracking-wide text-brand-400">Notas de cata</p>
                  {o.fichasCata.map((fc) => (
                    <p key={fc.id}>
                      {[fc.acidez ? `Acidez ${fc.acidez}/10` : null, fc.cuerpo ? `Cuerpo ${fc.cuerpo}/10` : null, fc.dulzor ? `Dulzor ${fc.dulzor}/10` : null].filter(Boolean).join(" · ")}
                      {fc.notas ? ` — ${fc.notas}` : ""}
                    </p>
                  ))}
                </div>
              )}
            </li>
          ))}

          {lote.tueste && (
            <li className="relative border-l-2 border-brand-800/50 pb-6 pl-5">
              <span className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-brand-800" />
              <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Tueste</p>
              <p className="font-bold">{lote.tueste.perfilTueste ?? "Perfil no registrado"}</p>
              {lote.tueste.maestroTostador && <p className="text-sm text-brand-600">Tostado por {lote.tueste.maestroTostador}</p>}
              {fmtFecha(lote.tueste.fecha, true) && <p className="text-xs text-brand-400">{fmtFecha(lote.tueste.fecha, true)}</p>}
            </li>
          )}

          <li className="relative pl-5">
            <span className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-brand-900" />
            <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Empaque</p>
            <p className="font-bold">{lote.presentacion ?? "Presentación no registrada"}</p>
            {fmtFecha(lote.fechaEmpaque, true) && <p className="text-xs text-brand-400">Empacado el {fmtFecha(lote.fechaEmpaque, true)}</p>}
            {fmtFecha(lote.fechaVencimiento, true) && <p className="text-xs text-brand-400">Vence: {fmtFecha(lote.fechaVencimiento, true)}</p>}
          </li>
        </ol>

        <p className="pb-6 text-center text-[11px] text-brand-400">Trazabilidad Azahar Coffee Company</p>
      </div>
    </main>
  );
}
