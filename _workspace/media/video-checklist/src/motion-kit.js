/* motion-kit.js — primitives de motion design déterministes (fonctions pures du temps).
 * Tout se calcule à partir de t (secondes). Aucun état entre deux frames, aucun timer.
 * Chargé via <script src="motion-kit.js"></script> → expose window.MK
 */
(function (root) {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const map = (x, a, b, c = 0, d = 1) => lerp(c, d, clamp((x - a) / (b - a)));
  const mix = (a, b, p) => a.map((v, i) => lerp(v, b[i], p));

  /* Ressort analytique (réponse indicielle 0 → 1).
   * response : durée perçue en s (≈ période propre). damping : 1 = critique (aucun dépassement),
   * 0.85 = léger dépassement "premium", < 0.7 = rebondissant (à éviter hors gag). */
  function spring(t, response = 0.45, damping = 0.86) {
    if (t <= 0) return 0;
    const w = (2 * Math.PI) / response;
    const z = damping;
    if (z < 1) {
      const wd = w * Math.sqrt(1 - z * z);
      return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t));
    }
    if (z === 1) return 1 - Math.exp(-w * t) * (1 + w * t);
    const s = Math.sqrt(z * z - 1);
    const r1 = -w * (z - s), r2 = -w * (z + s);
    return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
  }

  /* Piste à plusieurs cibles : somme d'un ressort par changement → reste une fonction pure de t.
   * keys = [[t0, v0], [t1, v1], ...] (t croissants). opts = {response, damping} ou par clé [t, v, {response, damping}] */
  function track(t, keys, opts = {}) {
    let v = keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      const [ti, vi, o = {}] = keys[i];
      const prev = keys[i - 1][1];
      v += (vi - prev) * spring(t - ti, o.response ?? opts.response ?? 0.45, o.damping ?? opts.damping ?? 0.86);
    }
    return v;
  }

  /* Easings (pour ce qui ne doit PAS dépasser : opacité, flou, couleurs). */
  const ease = {
    linear: (p) => p,
    outCubic: (p) => 1 - Math.pow(1 - p, 3),
    inOutCubic: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    outExpo: (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
    inOutExpo: (p) => (p <= 0 ? 0 : p >= 1 ? 1 : p < 0.5 ? Math.pow(2, 20 * p - 10) / 2 : (2 - Math.pow(2, -20 * p + 10)) / 2),
    outQuint: (p) => 1 - Math.pow(1 - p, 5),
  };
  /* Tween borné : valeur entre t0 et t1 avec easing. */
  const tween = (t, t0, t1, a, b, fn = ease.outCubic) => lerp(a, b, fn(clamp((t - t0) / (t1 - t0))));

  /* Décalage en cascade : délai de l'élément i sur n, réparti sur `spread` secondes. */
  const stagger = (i, n, spread, curve = ease.outCubic) => (n <= 1 ? 0 : curve(i / (n - 1)) * spread);

  /* Grille musicale. */
  const beat = (bpm) => 60 / bpm;
  const onBeat = (bpm, n, offset = 0) => offset + n * beat(bpm);
  /* Impulsion 1 → 0 après chaque temps (pour pulser sur la musique). */
  const pulse = (t, bpm, decay = 6, offset = 0) => {
    const b = beat(bpm);
    const ph = ((t - offset) % b + b) % b;
    return Math.exp(-decay * ph);
  };

  /* Aléatoire reproductible. */
  function rng(seed = 1) {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let r = Math.imul(a ^ (a >>> 15), 1 | a);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* Bruit 1D lisse et déterministe (micro-mouvements caméra, flottement). */
  function noise1(x, seed = 7) {
    const h = (n) => { const s = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453; return s - Math.floor(s); };
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    return lerp(h(i), h(i + 1), u) * 2 - 1;
  }

  /* Texte : nombre de caractères visibles pour une frappe humaine (rythme irrégulier mais déterministe). */
  function typed(t, t0, text, cps = 16, seed = 3) {
    const r = rng(seed); let acc = t0, n = 0;
    for (; n < text.length; n++) { acc += (0.6 + r() * 0.8) / cps; if (acc > t) break; }
    return text.slice(0, n);
  }

  /* Tableau à palettes (split-flap) : caractère affiché pour une cible donnée. */
  const FLAP = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-→:.€";
  function flap(t, t0, target, perChar = 0.035, seed = 11) {
    const r = rng(seed);
    return [...target].map((ch, i) => {
      const start = t0 + i * 0.04 + r() * 0.06;
      const idx = FLAP.indexOf(ch.toUpperCase());
      const steps = idx < 0 ? 0 : idx;
      const k = Math.floor((t - start) / perChar);
      if (k < 0) return " ";
      return k >= steps ? ch : FLAP[k % FLAP.length];
    }).join("");
  }

  root.MK = { clamp, lerp, map, mix, spring, track, ease, tween, stagger, beat, onBeat, pulse, rng, noise1, typed, flap };
})(typeof window !== "undefined" ? window : globalThis);
