import type * as THREE_NS from "three";

type Three = typeof THREE_NS;

export type GeneroAsistente = "masculina" | "femenina";

export interface EstadoAsistente {
  hablando: boolean;
  escuchando: boolean;
  pensando: boolean;
}

export interface OpcionesPersonaje {
  genero: GeneroAsistente;
  /** Índice de TONOS_PIEL. */
  tono: number;
}

export const TONOS_PIEL = ["#FFC8AE", "#F1B48C", "#C98A5E", "#8D5B3E"] as const;

export interface Personaje {
  grupo: THREE_NS.Group;
  /** t y dt en segundos; puntero en -1..1 respecto al centro de la ventana. */
  actualizar: (t: number, dt: number, estado: EstadoAsistente, puntero: { x: number; y: number }) => void;
  liberar: () => void;
}

const suavizar = (actual: number, objetivo: number, k: number) => actual + (objetivo - actual) * Math.min(1, k);

/**
 * Campesino / campesina cafetera en 3D estilo "juguete de arcilla": figuras simples con contorno oscuro,
 * parpadeo, sonrisa, cejas, pupilas que siguen el puntero y boca que se mueve al hablar.
 */
export function crearPersonaje(THREE: Three, { genero, tono }: OpcionesPersonaje): Personaje {
  const esMujer = genero === "femenina";
  const liberables: Array<{ dispose: () => void }> = [];

  const grupo = new THREE.Group();
  const cuerpo = new THREE.Group(); // respira
  const cabeza = new THREE.Group(); // gira hacia el puntero
  grupo.add(cuerpo);
  cuerpo.add(cabeza);
  cabeza.position.set(0, 1.15, 0);

  const material = (color: string, extra: THREE_NS.MeshStandardMaterialParameters = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0, ...extra });
    liberables.push(m);
    return m;
  };
  const contornoMat = new THREE.MeshBasicMaterial({ color: "#3a1f1f", side: THREE.BackSide });
  liberables.push(contornoMat);

  function malla(geo: THREE_NS.BufferGeometry, mat: THREE_NS.Material, padre: THREE_NS.Object3D, contorno = 0): THREE_NS.Mesh {
    liberables.push(geo);
    const m = new THREE.Mesh(geo, mat);
    padre.add(m);
    if (contorno > 0) {
      const c = new THREE.Mesh(geo, contornoMat);
      c.scale.setScalar(1 + contorno);
      m.add(c);
    }
    return m;
  }
  const esfera = (r: number) => new THREE.SphereGeometry(r, 40, 28);

  const piel = material(TONOS_PIEL[tono] ?? TONOS_PIEL[0]);
  const pielOscura = material(new THREE.Color(TONOS_PIEL[tono] ?? TONOS_PIEL[0]).multiplyScalar(0.9).getStyle());
  const color = {
    pelo: esMujer ? "#4B2A1E" : "#4A2C1B",
    camisa: esMujer ? "#F08A6E" : "#8FD3D8",
    panuelo: esMujer ? "#F2B84B" : "#E23B4A",
    paja: "#EBC98E",
    cinta: esMujer ? "#C2185B" : "#7A1F3D",
  };

  // ---------------- cuerpo ----------------
  const torso = malla(new THREE.CapsuleGeometry(0.8, 0.85, 12, 28), material(color.camisa), cuerpo, 0.04);
  torso.position.set(0, -0.75, 0);
  torso.scale.set(1.2, 1, 0.8);
  for (const lado of [-1, 1]) {
    const hombro = malla(esfera(0.42), material(color.camisa), cuerpo, 0.04);
    hombro.position.set(lado * 1.05, -0.4, 0);
    hombro.scale.set(1, 1.05, 0.9);
  }
  const cuello = malla(new THREE.CylinderGeometry(0.3, 0.34, 0.35, 24), pielOscura, cuerpo);
  cuello.position.set(0, 0.2, 0);
  // pañuelo al cuello
  const panuelo = malla(new THREE.TorusGeometry(0.5, 0.17, 16, 40), material(color.panuelo), cuerpo, 0.05);
  panuelo.rotation.x = Math.PI / 2;
  panuelo.position.set(0, 0.0, 0.05);
  panuelo.scale.set(1.15, 1, 1);
  const nudo = malla(new THREE.ConeGeometry(0.2, 0.46, 20), material(color.panuelo), cuerpo, 0.05);
  nudo.position.set(0, -0.32, 0.55);
  nudo.rotation.x = Math.PI;
  // correa de la mochila / bolso cafetero
  const correa = malla(new THREE.BoxGeometry(0.17, 1.5, 0.07), material("#8A4B22"), cuerpo, 0.06);
  correa.position.set(0.5, -0.65, 0.62);
  correa.rotation.z = 0.5;

  // ---------------- cabeza ----------------
  const craneo = malla(esfera(1), piel, cabeza, 0.035);
  craneo.scale.set(1.02, 0.96, 0.95);
  for (const lado of [-1, 1]) {
    const oreja = malla(esfera(0.2), piel, cabeza, 0.06);
    oreja.position.set(lado * 0.99, -0.02, 0);
    oreja.scale.set(0.6, 1, 0.9);
  }
  const nariz = malla(esfera(0.14), pielOscura, cabeza, 0.08);
  nariz.position.set(0, -0.1, 0.93);
  // mejillas
  const mejillaMat = material(esMujer ? "#FF7F8F" : "#FF8F86", { transparent: true, opacity: 0.55, roughness: 1 });
  const mejillas: THREE_NS.Mesh[] = [];
  for (const lado of [-1, 1]) {
    const m = malla(esfera(0.2), mejillaMat, cabeza);
    m.position.set(lado * 0.56, -0.3, 0.8);
    m.scale.set(1, 0.7, 0.3);
    m.rotation.y = lado * 0.5;
    mejillas.push(m);
  }

  // ---------------- ojos ----------------
  const blancoMat = material("#FFFFFF", { roughness: 0.3 });
  const irisMat = material(esMujer ? "#2E5E4E" : "#5A2E1C", { roughness: 0.25 });
  const pupilaMat = material("#150B0B", { roughness: 0.2 });
  const brilloMat = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
  liberables.push(brilloMat);
  const ojos: Array<{ grupo: THREE_NS.Group; mirada: THREE_NS.Group }> = [];
  for (const lado of [-1, 1]) {
    const g = new THREE.Group();
    g.position.set(lado * 0.38, 0.08, 0.83);
    g.rotation.y = lado * 0.22;
    cabeza.add(g);
    const blanco = malla(esfera(0.22), blancoMat, g, 0.07);
    blanco.scale.set(0.95, 1.15, 0.55);
    const mirada = new THREE.Group();
    mirada.position.z = 0.05;
    g.add(mirada);
    const iris = malla(esfera(0.135), irisMat, mirada);
    iris.position.z = 0.02;
    iris.scale.set(1, 1.05, 0.6);
    const pupila = malla(esfera(0.07), pupilaMat, mirada);
    pupila.position.z = 0.07;
    pupila.scale.set(1, 1, 0.6);
    const brillo = malla(esfera(0.04), brilloMat, mirada);
    brillo.position.set(0.05, 0.06, 0.1);
    const brillo2 = malla(esfera(0.022), brilloMat, mirada);
    brillo2.position.set(-0.05, -0.05, 0.1);
    ojos.push({ grupo: g, mirada });

    if (esMujer) {
      // pestañas
      const pest = malla(new THREE.CapsuleGeometry(0.018, 0.13, 4, 8), material("#2A1410"), g);
      pest.position.set(lado * 0.2, 0.2, 0.06);
      pest.rotation.z = lado * -0.9;
      const pest2 = malla(new THREE.CapsuleGeometry(0.018, 0.11, 4, 8), material("#2A1410"), g);
      pest2.position.set(lado * 0.24, 0.1, 0.06);
      pest2.rotation.z = lado * -1.3;
    }
  }

  // ---------------- cejas ----------------
  const cejaMat = material(color.pelo);
  const cejas: THREE_NS.Mesh[] = [];
  for (const lado of [-1, 1]) {
    const c = malla(new THREE.CapsuleGeometry(esMujer ? 0.03 : 0.045, 0.22, 6, 12), cejaMat, cabeza);
    c.rotation.z = Math.PI / 2 + lado * (esMujer ? -0.12 : -0.05);
    c.position.set(lado * 0.38, 0.46, 0.84);
    c.rotation.y = lado * 0.2;
    cejas.push(c);
  }

  // ---------------- boca ----------------
  const labioMat = material(esMujer ? "#D6366B" : "#7A2F2F");
  const sonrisa = new THREE.Group();
  sonrisa.position.set(0, -0.56, 0.88);
  cabeza.add(sonrisa);
  const arco = malla(new THREE.TorusGeometry(0.2, esMujer ? 0.04 : 0.03, 10, 28, Math.PI), labioMat, sonrisa);
  arco.rotation.z = Math.PI; // la curva abre hacia arriba: sonrisa
  arco.position.y = 0.2;
  const boca = new THREE.Group();
  boca.position.set(0, -0.56, 0.88);
  cabeza.add(boca);
  const interior = malla(esfera(0.19), material("#4F1623", { roughness: 0.9 }), boca, 0.08);
  interior.scale.set(1, 1, 0.35);
  const lengua = malla(esfera(0.11), material("#E8667A", { roughness: 0.8 }), boca);
  lengua.position.set(0, -0.08, 0.04);
  lengua.scale.set(1, 0.55, 0.4);

  // ---------------- bigote (él) ----------------
  if (!esMujer) {
    for (const lado of [-1, 1]) {
      const b = malla(new THREE.CapsuleGeometry(0.075, 0.3, 8, 16), cejaMat, cabeza, 0.12);
      b.position.set(lado * 0.2, -0.36, 0.93);
      b.rotation.z = lado * (Math.PI / 2 + 0.28);
      b.rotation.y = lado * -0.3;
    }
  }

  // ---------------- pelo ----------------
  const peloMat = material(color.pelo, { roughness: 0.8 });
  const casco = malla(new THREE.SphereGeometry(1.06, 40, 28, 0, Math.PI * 2, 0, Math.PI * 0.5), peloMat, cabeza, 0.03);
  casco.position.set(0, 0.1, -0.14);
  casco.rotation.x = -0.62;
  casco.scale.set(1.0, 1.0, 1.02);
  if (esMujer) {
    // dos trenzas
    for (const lado of [-1, 1]) {
      for (let i = 0; i < 5; i++) {
        const seg = malla(esfera(0.2 - i * 0.012), peloMat, cabeza, 0.06);
        seg.position.set(lado * (1.02 + i * 0.03), -0.35 - i * 0.3, 0.05 + i * 0.03);
      }
      const lazo = malla(esfera(0.12), material(color.cinta), cabeza, 0.06);
      lazo.position.set(lado * 1.18, -1.9, 0.18);
    }
  } else {
    // patillas
    for (const lado of [-1, 1]) {
      const p = malla(new THREE.CapsuleGeometry(0.07, 0.3, 6, 12), peloMat, cabeza);
      p.position.set(lado * 0.95, -0.02, 0.35);
    }
  }

  // ---------------- sombrero de paja ----------------
  const sombrero = new THREE.Group();
  sombrero.position.set(0, 0.72, 0);
  sombrero.rotation.z = 0.05;
  cabeza.add(sombrero);
  const pajaMat = material(color.paja, { roughness: 0.85 });
  const ala = malla(new THREE.CylinderGeometry(1.8, 1.8, 0.07, 56), pajaMat, sombrero, 0.03);
  ala.position.y = 0.0;
  ala.scale.set(1, 1, 0.95);
  const corona = malla(new THREE.SphereGeometry(1.0, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2), pajaMat, sombrero, 0.03);
  corona.scale.set(1, 0.7, 1);
  corona.position.y = 0.02;
  const cinta = malla(new THREE.TorusGeometry(1.0, 0.09, 14, 56), material(color.cinta), sombrero, 0.04);
  cinta.rotation.x = Math.PI / 2;
  cinta.position.y = 0.13;
  if (esMujer) {
    // flor en la cinta
    const centro = malla(esfera(0.09), material("#FFD54F"), sombrero);
    centro.position.set(0.85, 0.2, 0.62);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const pet = malla(esfera(0.1), material("#FF6F91"), sombrero, 0.05);
      pet.position.set(0.85 + Math.cos(a) * 0.15, 0.2 + Math.sin(a) * 0.15, 0.62);
    }
  }

  // ---------------- luces ----------------
  const hemi = new THREE.HemisphereLight("#FFF3E0", "#E3B79A", 1.5);
  const luzPrincipal = new THREE.DirectionalLight("#FFFFFF", 2.2);
  luzPrincipal.position.set(2.5, 4, 6);
  const luzRelleno = new THREE.DirectionalLight("#FFD9B0", 0.7);
  luzRelleno.position.set(-4, 1, 3);
  grupo.add(hemi, luzPrincipal, luzRelleno);

  // ---------------- animación ----------------
  const est = {
    giroY: 0,
    giroX: 0,
    inclina: 0,
    mirX: 0,
    mirY: 0,
    parpadeo: 0, // 0 abierto … 1 cerrado
    siguienteParpadeo: 1.5,
    inicioParpadeo: -10,
    dobleParpadeo: false,
    apertura: 0,
    ceja: 0,
    sonrisa: 1,
  };

  function actualizar(t: number, dt: number, e: EstadoAsistente, puntero: { x: number; y: number }) {
    const k = dt * 7;

    // respiración
    cuerpo.position.y = Math.sin(t * 1.7) * 0.035;
    torso.scale.y = 1 + Math.sin(t * 1.7) * 0.012;

    // hacia dónde mira: el puntero; pensando, hacia arriba a un lado
    let objGiroY = puntero.x * 0.4;
    let objGiroX = -puntero.y * 0.22;
    let objInclina = 0;
    if (e.pensando) {
      objGiroY = 0.3;
      objGiroX = -0.18;
      objInclina = -0.1;
    }
    if (e.escuchando) objInclina = 0.1;
    if (e.hablando) {
      objGiroX += Math.sin(t * 6.5) * 0.05;
      objGiroY += Math.sin(t * 3.1) * 0.06;
      objInclina += Math.sin(t * 4.2) * 0.04;
    } else {
      objGiroY += Math.sin(t * 0.7) * 0.05; // un movimiento suave aunque esté quieto
    }
    est.giroY = suavizar(est.giroY, objGiroY, k);
    est.giroX = suavizar(est.giroX, objGiroX, k);
    est.inclina = suavizar(est.inclina, objInclina, k);
    cabeza.rotation.set(est.giroX, est.giroY, est.inclina);

    // pupilas
    const mx = e.pensando ? 0.6 : puntero.x;
    const my = e.pensando ? 0.8 : puntero.y;
    est.mirX = suavizar(est.mirX, mx, k * 1.4);
    est.mirY = suavizar(est.mirY, my, k * 1.4);
    for (const o of ojos) {
      o.mirada.position.x = est.mirX * 0.06;
      o.mirada.position.y = est.mirY * 0.07;
    }

    // parpadeo
    if (t >= est.siguienteParpadeo) {
      est.inicioParpadeo = t;
      est.dobleParpadeo = Math.random() < 0.25;
      est.siguienteParpadeo = t + 2.2 + Math.random() * 3;
    }
    const p = (t - est.inicioParpadeo) / 0.16;
    let cerrado = p >= 0 && p <= 1 ? Math.sin(p * Math.PI) : 0;
    if (est.dobleParpadeo) {
      const p2 = (t - est.inicioParpadeo - 0.24) / 0.16;
      if (p2 >= 0 && p2 <= 1) cerrado = Math.sin(p2 * Math.PI);
    }
    est.parpadeo = cerrado;
    const abierto = e.escuchando ? 1.12 : 1;
    for (const o of ojos) o.grupo.scale.set(1, Math.max(0.06, abierto * (1 - est.parpadeo * 0.94)), 1);

    // cejas
    const objCeja = e.escuchando ? 0.1 : e.pensando ? 0.06 : e.hablando ? Math.sin(t * 5) * 0.02 + 0.02 : 0;
    est.ceja = suavizar(est.ceja, objCeja, k);
    cejas.forEach((c, i) => {
      c.position.y = 0.46 + est.ceja;
      c.rotation.x = e.pensando && i === 1 ? -0.3 : 0;
    });

    // boca: sonrisa en reposo (se ensancha cada tanto) y boca abierta al hablar
    if (e.hablando) {
      const objAp = Math.min(1, Math.max(0.12, Math.abs(Math.sin(t * 13) * Math.cos(t * 4.7)) * 1.15 + 0.1));
      est.apertura = suavizar(est.apertura, objAp, dt * 22);
    } else {
      est.apertura = suavizar(est.apertura, 0, dt * 14);
    }
    const hablaVisible = est.apertura > 0.04;
    boca.visible = hablaVisible;
    sonrisa.visible = !hablaVisible;
    boca.scale.set(0.75 + est.apertura * 0.25, 0.05 + est.apertura * 0.95, 1);
    const ciclo = Math.sin(t * 1.05);
    const sonrisaAncha = ciclo > 0.55 ? 1 + (ciclo - 0.55) * 0.9 : 1;
    est.sonrisa = suavizar(est.sonrisa, sonrisaAncha, k * 0.5);
    sonrisa.scale.set(est.sonrisa, 0.8 + (est.sonrisa - 1) * 1.2, 1);
    mejillas.forEach((m) => m.scale.set(1 + (est.sonrisa - 1) * 0.6, 0.7 + (est.sonrisa - 1) * 0.5, 0.3));
  }

  function liberar() {
    for (const l of liberables) l.dispose();
  }

  return { grupo, actualizar, liberar };
}
