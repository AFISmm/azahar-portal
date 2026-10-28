import { useCallback, useEffect, useMemo, useState } from "react";
import { Ban, Banknote, ChefHat, CreditCard, Loader2, Minus, Percent, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { Button, Field, Input, Select } from "../../components/ui";
import { formatCOP } from "../../lib/format";
import { posApi, type CatalogoPos, type PedidoPos, type ProductoPos } from "../../lib/posApi";
import { ErrorCaja } from "../trazabilidad/comunes";
import { SinAccesoPos, usePermisosPos } from "./comunes";

// ---------------------------------------------------------------------------
// Modificadores de un producto (leche, shot extra, tamaño…)
// ---------------------------------------------------------------------------

function ModalModificadores({ producto, onCerrar, onAgregar }: { producto: ProductoPos | null; onCerrar: () => void; onAgregar: (ids: string[], notas: string, cantidad: number) => Promise<void> }) {
  const [elegidos, setElegidos] = useState<string[]>([]);
  const [notas, setNotas] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setElegidos([]);
    setNotas("");
    setCantidad(1);
  }, [producto?.id]);

  if (!producto) return null;
  const faltan = producto.grupos.filter((g) => elegidos.filter((id) => g.modificadores.some((m) => m.id === id)).length < Math.max(g.min, g.obligatorio ? 1 : 0));
  const delta = producto.grupos.flatMap((g) => g.modificadores).filter((m) => elegidos.includes(m.id)).reduce((s, m) => s + m.precioDelta, 0);

  function alternar(grupoId: string, modId: string, max: number) {
    const grupo = producto?.grupos.find((g) => g.id === grupoId);
    if (!grupo) return;
    setElegidos((actual) => {
      if (actual.includes(modId)) return actual.filter((id) => id !== modId);
      const delGrupo = actual.filter((id) => grupo.modificadores.some((m) => m.id === id));
      // Grupo de selección única: elegir otra opción reemplaza la anterior.
      if (max === 1) return [...actual.filter((id) => !delGrupo.includes(id)), modId];
      return delGrupo.length >= max ? actual : [...actual, modId];
    });
  }

  return (
    <Modal open onClose={onCerrar} title={producto.nombre}>
      <div className="space-y-4">
        {producto.grupos.map((g) => (
          <div key={g.id}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              {g.nombre} {g.obligatorio ? "· obligatorio" : max(g.max)}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.modificadores.map((m) => {
                const activo = elegidos.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={!m.disponible}
                    onClick={() => alternar(g.id, m.id, g.max)}
                    className={`rounded-lg border px-3 py-2 text-sm transition disabled:opacity-40 ${activo ? "border-brand-800 bg-brand-800 text-cream-100" : "border-[var(--border-subtle)] hover:bg-[var(--surface-muted)]"}`}
                  >
                    {m.nombre}
                    {m.precioDelta > 0 && <span className="ml-1 text-xs opacity-80">+{formatCOP(m.precioDelta)}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <Field label="Notas para cocina">
          <Input value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Ej. bien caliente" />
        </Field>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" className="px-2.5 py-2" onClick={() => setCantidad((c) => Math.max(1, c - 1))}>
              <Minus className="h-4 w-4" strokeWidth={1.75} />
            </Button>
            <span className="w-8 text-center font-semibold">{cantidad}</span>
            <Button type="button" variant="outline" className="px-2.5 py-2" onClick={() => setCantidad((c) => Math.min(99, c + 1))}>
              <Plus className="h-4 w-4" strokeWidth={1.75} />
            </Button>
          </div>
          <Button
            disabled={faltan.length > 0 || enviando}
            onClick={async () => {
              setEnviando(true);
              try {
                await onAgregar(elegidos, notas, cantidad);
              } finally {
                setEnviando(false);
              }
            }}
          >
            Agregar · {formatCOP((producto.precioBase + delta) * cantidad)}
          </Button>
        </div>
        {faltan.length > 0 && <p className="text-xs text-status-rechazada">Falta elegir: {faltan.map((g) => g.nombre).join(", ")}.</p>}
      </div>
    </Modal>
  );
}

function max(n: number) {
  return n > 1 ? `· hasta ${n}` : "· opcional";
}

// ---------------------------------------------------------------------------
// Cobro
// ---------------------------------------------------------------------------

function ModalCobro({ pedido, onCerrar, onPagado }: { pedido: PedidoPos | null; onCerrar: () => void; onPagado: (p: PedidoPos, cambio: number) => void }) {
  const [metodo, setMetodo] = useState<"efectivo" | "tarjeta">("efectivo");
  const [recibido, setRecibido] = useState("");
  const [propina, setPropina] = useState("");
  const [franquicia, setFranquicia] = useState("VISA");
  const [tipoTarjeta, setTipoTarjeta] = useState<"debito" | "credito">("debito");
  const [ultimos4, setUltimos4] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMetodo("efectivo");
    setRecibido("");
    setPropina("");
    setUltimos4("");
    setError(null);
  }, [pedido?.id]);

  if (!pedido) return null;
  const saldo = pedido.totales.saldoPendiente;
  const recibidoNum = Number(recibido) || 0;
  const cambio = metodo === "efectivo" && recibidoNum > saldo ? recibidoNum - saldo : 0;

  async function confirmar() {
    if (!pedido) return;
    setEnviando(true);
    setError(null);
    try {
      const r = await posApi.pagar({
        pedidoId: pedido.id,
        metodo,
        monto: saldo,
        propina: Number(propina) || 0,
        recibido: metodo === "efectivo" ? recibidoNum || saldo : undefined,
        franquicia: metodo === "tarjeta" ? franquicia : undefined,
        tipoTarjeta: metodo === "tarjeta" ? tipoTarjeta : undefined,
        ultimos4: metodo === "tarjeta" && ultimos4 ? ultimos4 : undefined,
      });
      onPagado(r.pedido, r.cambio);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo registrar el pago.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Modal open onClose={onCerrar} title={`Cobrar pedido #${pedido.numero}`}>
      <div className="space-y-4">
        <p className="text-center font-heading text-3xl font-bold text-[var(--text-primary)]">{formatCOP(saldo)}</p>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant={metodo === "efectivo" ? "primary" : "outline"} onClick={() => setMetodo("efectivo")}>
            <Banknote className="h-4 w-4" strokeWidth={1.75} /> Efectivo
          </Button>
          <Button type="button" variant={metodo === "tarjeta" ? "primary" : "outline"} onClick={() => setMetodo("tarjeta")}>
            <CreditCard className="h-4 w-4" strokeWidth={1.75} /> Tarjeta
          </Button>
        </div>

        {metodo === "efectivo" ? (
          <>
            <Field label="Efectivo recibido">
              <Input type="number" inputMode="numeric" value={recibido} onChange={(e) => setRecibido(e.target.value)} placeholder={String(saldo)} />
            </Field>
            {cambio > 0 && <p className="rounded-lg bg-status-aprobada-bg px-3 py-2 text-center text-sm font-semibold text-status-aprobada">Cambio: {formatCOP(cambio)}</p>}
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Franquicia">
              <Select value={franquicia} onChange={(e) => setFranquicia(e.target.value)}>
                {["VISA", "MASTERCARD", "AMEX", "DINERS"].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </Select>
            </Field>
            <Field label="Tipo">
              <Select value={tipoTarjeta} onChange={(e) => setTipoTarjeta(e.target.value as "debito" | "credito")}>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
              </Select>
            </Field>
            <div className="col-span-2">
              <Field label="Últimos 4 dígitos (opcional)">
                <Input inputMode="numeric" maxLength={4} value={ultimos4} onChange={(e) => setUltimos4(e.target.value.replace(/\D/g, ""))} />
              </Field>
            </div>
          </div>
        )}

        <Field label="Propina (opcional)">
          <Input type="number" inputMode="numeric" value={propina} onChange={(e) => setPropina(e.target.value)} />
        </Field>
        {error && <ErrorCaja mensaje={error} />}
        <Button className="w-full" disabled={enviando || (metodo === "efectivo" && recibido !== "" && recibidoNum < saldo)} onClick={() => void confirmar()}>
          {enviando && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />}
          Confirmar pago
        </Button>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Pantalla de venta
// ---------------------------------------------------------------------------

export default function PosVenta() {
  const { editar, supervisor } = usePermisosPos();
  const [catalogo, setCatalogo] = useState<CatalogoPos | null>(null);
  const [abiertos, setAbiertos] = useState<PedidoPos[]>([]);
  const [actualId, setActualId] = useState<string | null>(null);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [productoModal, setProductoModal] = useState<ProductoPos | null>(null);
  const [cobrando, setCobrando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  const actual = abiertos.find((p) => p.id === actualId) ?? null;

  const cargar = useCallback(async () => {
    try {
      const [cat, ped] = await Promise.all([posApi.catalogo(), posApi.pedidos("abiertos")]);
      setCatalogo(cat);
      setAbiertos(ped);
      setCategoria((c) => c ?? cat.categorias[0]?.id ?? null);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar el POS.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  function reemplazar(p: PedidoPos) {
    setAbiertos((lista) => (lista.some((x) => x.id === p.id) ? lista.map((x) => (x.id === p.id ? p : x)) : [...lista, p]));
  }

  async function accion(fn: () => Promise<PedidoPos | void>) {
    setError(null);
    try {
      const p = await fn();
      if (p) reemplazar(p);
      return p;
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo completar la acción.");
    }
  }

  const productos = useMemo(() => catalogo?.productos.filter((p) => p.categoriaId === categoria) ?? [], [catalogo, categoria]);

  if (!editar) return <SinAccesoPos funcion="la caja del POS" />;
  if (cargando) return <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-brand-800" strokeWidth={1.75} /></div>;
  if (!catalogo) return <ErrorCaja mensaje={error ?? "No se pudo cargar el POS."} />;

  async function nuevoPedido() {
    const p = await accion(() => posApi.crearPedido());
    if (p) setActualId(p.id);
  }

  async function agregar(producto: ProductoPos, ids: string[], notas: string, cantidad: number) {
    let pedido = actual;
    if (!pedido) {
      pedido = (await accion(() => posApi.crearPedido())) ?? null;
      if (!pedido) return;
      setActualId(pedido.id);
    }
    const id = pedido.id;
    await accion(() => posApi.agregarLinea({ pedidoId: id, productoId: producto.id, cantidad, modificadorIds: ids, notas }));
    setProductoModal(null);
  }

  const puedeEditar = actual?.estado === "abierto";
  const pagado = !!actual && actual.totales.saldoPendiente <= 0 && actual.totales.subtotal > 0;
  const sinProductos = !actual || actual.lineas.filter((l) => l.productoId !== "prod-empaque-para-llevar").length === 0;

  return (
    <div className="azahar-fade-in">
      <PageHeader breadcrumb="POS" title="Caja" description="Toma pedidos, cóbralos y envíalos a cocina.">
        <Button onClick={() => void nuevoPedido()}>
          <Plus className="h-4 w-4" strokeWidth={1.75} /> Nuevo pedido
        </Button>
      </PageHeader>

      {error && <div className="mb-4"><ErrorCaja mensaje={error} /></div>}
      {aviso && <p className="mb-4 rounded-lg bg-status-aprobada-bg px-3 py-2 text-sm font-semibold text-status-aprobada">{aviso}</p>}

      {abiertos.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {abiertos.map((p) => (
            <button
              key={p.id}
              onClick={() => setActualId(p.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${p.id === actualId ? "border-brand-800 bg-brand-800 text-cream-100" : "border-[var(--border-subtle)] hover:bg-[var(--surface-muted)]"}`}
            >
              #{p.numero} {p.nombreCliente ?? ""} · {formatCOP(p.totales.total)} {p.estado !== "abierto" && "· en cocina"}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {catalogo.categorias.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoria(c.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${c.id === categoria ? "bg-accent-500 text-brand-900" : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-cream-200"}`}
              >
                {c.nombre}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {productos.map((p) => (
              <div key={p.id} className="relative">
                <button
                  disabled={!p.disponible || !puedeEditar && !!actual}
                  onClick={() => (p.grupos.length > 0 ? setProductoModal(p) : void agregar(p, [], "", 1))}
                  className="flex h-full w-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-3 text-left transition hover:border-accent-500/60 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="font-heading text-sm font-semibold text-[var(--text-primary)]">{p.nombre}</span>
                  <span className="mt-1 line-clamp-2 text-xs text-[var(--text-muted)]">{p.descripcion}</span>
                  <span className="mt-auto pt-2 font-mono text-sm font-bold text-brand-800">{formatCOP(p.precioBase)}</span>
                  {!p.disponible && <span className="text-[11px] font-semibold text-status-rechazada">AGOTADO</span>}
                </button>
                {supervisor && (
                  <button
                    title={p.disponible ? "Marcar agotado (86)" : "Marcar disponible"}
                    onClick={() =>
                      void (async () => {
                        await posApi.productoDisponible(p.id, !p.disponible);
                        await cargar();
                      })()
                    }
                    className="absolute right-2 top-2 rounded-md bg-[var(--surface-muted)] p-1 text-[var(--text-muted)] hover:text-status-rechazada"
                  >
                    <Ban className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <Card title={actual ? `Pedido #${actual.numero}` : "Ticket"} icon={<ShoppingBag className="h-4 w-4" strokeWidth={1.75} />} className="h-fit">
          {!actual ? (
            <p className="text-sm text-[var(--text-muted)]">Elige un producto para abrir un pedido, o toca «Nuevo pedido».</p>
          ) : (
            <div className="space-y-3">
              <ul className="divide-y divide-[var(--border-subtle)] text-sm">
                {actual.lineas.filter((l) => !l.anulada).map((l) => (
                  <li key={l.id} className="py-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold">{l.cantidad}× {l.descripcion}</p>
                        {l.modificadores.map((m) => (
                          <p key={m.id} className="text-xs text-[var(--text-muted)]">· {m.descripcion}{m.precioDelta > 0 && ` (+${formatCOP(m.precioDelta)})`}</p>
                        ))}
                        {l.notas && <p className="text-xs italic text-[var(--text-muted)]">“{l.notas}”</p>}
                      </div>
                      <span className="shrink-0 font-mono text-xs">{formatCOP(l.subtotalLinea)}</span>
                    </div>
                    {puedeEditar && l.productoId !== "prod-empaque-para-llevar" && (
                      <div className="mt-1 flex items-center gap-1">
                        <button className="rounded-md border border-[var(--border-subtle)] p-1" onClick={() => void accion(() => posApi.cambiarLinea({ pedidoId: actual.id, lineaId: l.id, cantidad: l.cantidad - 1 }))} disabled={l.cantidad <= 1}>
                          <Minus className="h-3 w-3" strokeWidth={1.75} />
                        </button>
                        <button className="rounded-md border border-[var(--border-subtle)] p-1" onClick={() => void accion(() => posApi.cambiarLinea({ pedidoId: actual.id, lineaId: l.id, cantidad: l.cantidad + 1 }))}>
                          <Plus className="h-3 w-3" strokeWidth={1.75} />
                        </button>
                        <button className="ml-1 rounded-md p-1 text-status-rechazada" onClick={() => void accion(() => posApi.cambiarLinea({ pedidoId: actual.id, lineaId: l.id, eliminar: true }))}>
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {puedeEditar && (
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 accent-brand-800" checked={actual.paraLlevar} onChange={(e) => void accion(() => posApi.paraLlevar(actual.id, e.target.checked))} />
                  Para llevar
                </label>
              )}

              <dl className="space-y-1 border-t border-[var(--border-subtle)] pt-3 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-mono">{formatCOP(actual.totales.subtotal)}</dd></div>
                {actual.totales.descuento > 0 && <div className="flex justify-between text-status-aprobada"><dt>Descuento</dt><dd className="font-mono">−{formatCOP(actual.totales.descuento)}</dd></div>}
                <div className="flex justify-between"><dt>Impuesto ({Math.round(catalogo.config.tasaImpuesto * 100)}%)</dt><dd className="font-mono">{formatCOP(actual.totales.impuesto)}</dd></div>
                {actual.totales.propina > 0 && <div className="flex justify-between"><dt>Propina</dt><dd className="font-mono">{formatCOP(actual.totales.propina)}</dd></div>}
                <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1 font-heading text-base font-bold"><dt>Total</dt><dd className="font-mono">{formatCOP(actual.totales.total)}</dd></div>
                {actual.totales.pagado > 0 && <div className="flex justify-between text-xs text-[var(--text-muted)]"><dt>Pagado</dt><dd className="font-mono">{formatCOP(actual.totales.pagado)}</dd></div>}
              </dl>

              <div className="grid gap-2">
                {!pagado && (
                  <Button disabled={sinProductos} onClick={() => setCobrando(true)}>
                    <Banknote className="h-4 w-4" strokeWidth={1.75} /> Cobrar {formatCOP(actual.totales.saldoPendiente)}
                  </Button>
                )}
                {pagado && actual.estado === "abierto" && <p className="text-center text-xs font-semibold text-status-aprobada">Pagado ✓</p>}
                {puedeEditar && (
                  <Button variant="secondary" disabled={sinProductos} onClick={() => void accion(() => posApi.enviarCocina(actual.id))}>
                    <ChefHat className="h-4 w-4" strokeWidth={1.75} /> Enviar a cocina
                  </Button>
                )}
                {supervisor && puedeEditar && !sinProductos && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const valor = window.prompt("Descuento en % (0-100):");
                      const motivo = valor ? window.prompt("Motivo del descuento:") : null;
                      if (valor && motivo) void accion(() => posApi.descuento({ pedidoId: actual.id, tipo: "porcentaje", valor: Number(valor), motivo }));
                    }}
                  >
                    <Percent className="h-4 w-4" strokeWidth={1.75} /> Aplicar descuento
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    const motivo = window.prompt("Motivo de la cancelación:");
                    if (!motivo) return;
                    void (async () => {
                      const p = await accion(() => posApi.cancelar(actual.id, motivo));
                      if (p) {
                        setAbiertos((l) => l.filter((x) => x.id !== p.id));
                        setActualId(null);
                      }
                    })();
                  }}
                >
                  Cancelar pedido
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <ModalModificadores producto={productoModal} onCerrar={() => setProductoModal(null)} onAgregar={(ids, notas, cant) => (productoModal ? agregar(productoModal, ids, notas, cant) : Promise.resolve())} />
      <ModalCobro
        pedido={cobrando ? actual : null}
        onCerrar={() => setCobrando(false)}
        onPagado={(p, cambio) => {
          reemplazar(p);
          setCobrando(false);
          setAviso(cambio > 0 ? `Pago registrado. Cambio a entregar: ${formatCOP(cambio)}.` : "Pago registrado.");
          window.setTimeout(() => setAviso(null), 6000);
        }}
      />
    </div>
  );
}
