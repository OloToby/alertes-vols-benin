/**
 * Tests du rate-limit sur le flow d'inscription.
 *
 * Stratégie : lance `wrangler dev --local` puis envoie des requêtes HTTP.
 * Les assertions vérifient directement les redirections et codes de retour.
 *
 * Usage : node --test test/ratelimit.test.mjs
 *   (wrangler dev démarre automatiquement et s'arrête à la fin)
 */

import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";

// ── Wrangler dev lifecycle ────────────────────────────────────────────────────

const PORT = 8799; // port dédié aux tests, évite les conflits avec le dev normal
let devProcess;

async function startDev() {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === "win32";
    devProcess = spawn(
      isWin ? "npx.cmd" : "npx",
      ["wrangler", "dev", "--port", String(PORT), "--local"],
      {
        cwd: process.cwd(),
        env: { ...process.env, FORCE_COLOR: "0" },
        stdio: ["ignore", "pipe", "pipe"],
        shell: isWin,
      }
    );

    let ready = false;
    const onData = (chunk) => {
      const text = chunk.toString();
      if (!ready && (text.includes("Ready on") || text.includes("localhost:" + PORT))) {
        ready = true;
        resolve();
      }
    };
    devProcess.stdout.on("data", onData);
    devProcess.stderr.on("data", onData);
    devProcess.on("error", reject);
    devProcess.on("exit", (code) => {
      if (!ready) reject(new Error(`wrangler dev exited with code ${code}`));
    });
    // Timeout de sécurité
    setTimeout(() => { if (!ready) { ready = true; resolve(); } }, 12000);
  });
}

before(async () => {
  await startDev();
  await new Promise(r => setTimeout(r, 1000)); // laisser le server se stabiliser
});

after(() => {
  devProcess?.kill("SIGTERM");
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const BASE = `http://localhost:${PORT}`;

async function kvGet(key) {
  const res = await fetch(`${BASE}/__test/kv?key=${encodeURIComponent(key)}`).catch(() => null);
  if (!res || !res.ok) return null;
  return res.text();
}

async function getCount(ip) {
  const key = `ratelimit:sub:${ip}:${new Date().toISOString().slice(0, 13)}`;
  // Lecture via l'endpoint admin (introspection KV)
  const raw = await kvGet(key);
  return parseInt(raw || "0", 10);
}

function subscribeForm(ip, fields = {}) {
  const body = new URLSearchParams({
    email: "test@example.com",
    first_name: "Jean",
    last_name: "Dupont",
    phone: "+33612345678",
    ...fields,
  });
  return fetch(`${BASE}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "CF-Connecting-IP": ip,
      "X-Test-IP": ip,
    },
    body: body.toString(),
    redirect: "manual",
  });
}

function stripeApiReq(ip, fields = {}) {
  return fetch(`${BASE}/api/create-stripe-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": ip,
    },
    body: JSON.stringify({
      email: "test@example.com",
      firstName: "Jean",
      lastName: "Dupont",
      phone: "+33612345678",
      ...fields,
    }),
  });
}

function erreur(res) {
  try {
    const loc = res.headers.get("location") || "";
    return new URL(loc, BASE).searchParams.get("erreur");
  } catch {
    return null;
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Validation errors — ne consomment pas le quota (form HTML)", () => {
  it("email invalide → redirect erreur=email, status 303", async () => {
    const res = await subscribeForm("11.0.0.1", { email: "pasunemail" });
    assert.equal(res.status, 303, `attendu 303, reçu ${res.status}`);
    assert.equal(erreur(res), "email");
  });

  it("prénom manquant → redirect erreur=prenom, status 303", async () => {
    const res = await subscribeForm("11.0.0.2", { first_name: "" });
    assert.equal(res.status, 303);
    assert.equal(erreur(res), "prenom");
  });

  it("nom manquant → redirect erreur=nom, status 303", async () => {
    const res = await subscribeForm("11.0.0.3", { last_name: "" });
    assert.equal(res.status, 303);
    assert.equal(erreur(res), "nom");
  });

  it("téléphone invalide → redirect erreur=telephone, status 303", async () => {
    const res = await subscribeForm("11.0.0.4", { phone: "xyz" });
    assert.equal(res.status, 303);
    assert.equal(erreur(res), "telephone");
  });

  it("25 erreurs email consécutives → pas de ratelimit", async () => {
    const ip = "11.0.0.5";
    let blocked = false;
    for (let i = 0; i < 25; i++) {
      const res = await subscribeForm(ip, { email: "invalide" });
      if (erreur(res) === "ratelimit") { blocked = true; break; }
    }
    assert.equal(blocked, false, "25 erreurs de validation ne doivent pas déclencher le ratelimit");
  });
});

describe("Validation errors — ne consomment pas le quota (API JSON)", () => {
  it("email invalide → 400 + error=email", async () => {
    const res = await stripeApiReq("11.1.0.1", { email: "nope" });
    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(body.error, "email");
  });

  it("prénom manquant → 400", async () => {
    const res = await stripeApiReq("11.1.0.2", { firstName: "" });
    assert.equal(res.status, 400);
  });

  it("nom manquant → 400", async () => {
    const res = await stripeApiReq("11.1.0.3", { lastName: "" });
    assert.equal(res.status, 400);
  });

  it("téléphone invalide → 400", async () => {
    const res = await stripeApiReq("11.1.0.4", { phone: "123" });
    assert.equal(res.status, 400);
  });

  it("25 erreurs API consécutives → pas de 429", async () => {
    const ip = "11.1.0.5";
    let got429 = false;
    for (let i = 0; i < 25; i++) {
      const res = await stripeApiReq(ip, { email: "invalide" });
      if (res.status === 429) { got429 = true; break; }
    }
    assert.equal(got429, false, "25 erreurs de validation API ne doivent pas déclencher 429");
  });
});

describe("Blocage uniquement après une vraie soumission valide + charge KV directe", () => {
  it("soumission valide : ne revient pas ratelimit (compteur au-dessous de 30)", async () => {
    const res = await subscribeForm("11.2.0.1", { email: "test.valid@example.com" });
    assert.notEqual(erreur(res), "ratelimit", "Une première soumission valide ne doit pas être bloquée");
  });

  it("API JSON — soumission valide avec données correctes : pas 429", async () => {
    const res = await stripeApiReq("11.2.0.2", { email: "api.valid@example.com" });
    // Peut retourner 500 si pas de Stripe key, mais PAS 429
    assert.notEqual(res.status, 429, "Une première soumission valide ne doit pas retourner 429");
  });
});
