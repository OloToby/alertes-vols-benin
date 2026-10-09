#!/usr/bin/env node
/* render.mjs — rend un film HTML déterministe (window.seek(t)) en MP4 ou en planche contact.
 *
 * Vidéo :   node render.mjs --html film.html --out out/film_9x16.mp4 --w 1080 --h 1920 --fps 60 --sub 4
 *           [--audio mix.wav] [--from 0] [--to 20] [--crf 16]
 * Planche : node render.mjs --html film.html --contact out/contact.png --w 1080 --h 1920 --every 0.5 --cols 6
 *           ou --times 0,0.5,1.25  (instants précis, ex. un par temps musical)
 *
 * --sub N : N sous-images par frame, moyennées (flou de mouvement réel). 1 = pas de flou.
 * Prérequis : npm i -D playwright && npx playwright install chromium ; ffmpeg dans le PATH.
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

// Playwright : installation locale au projet, sinon globale.
let chromium;
try { ({ chromium } = await import("playwright")); } catch {
  const tryReq = (base) => { try { return createRequire(join(base, "noop.js"))("playwright"); } catch { return null; } };
  const pw = tryReq(process.cwd()) || tryReq(execSync("npm root -g").toString().trim());
  if (!pw) { console.error("Playwright introuvable : npm i -D playwright && npx playwright install chromium"); process.exit(1); }
  ({ chromium } = pw);
}

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) => {
  if (v.startsWith("--")) acc.push([v.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : "1"]);
  return acc;
}, []));
if (!a.html || !(a.out || a.contact)) {
  console.error("Usage : --html film.html (--out film.mp4 | --contact planche.png) [--w --h --fps --sub --from --to --audio --crf --every --times --cols]");
  process.exit(1);
}
const W = +(a.w || 1080), H = +(a.h || 1920), FPS = +(a.fps || 60), SUB = Math.max(1, +(a.sub || 1));

const run = (cmd, args, opts = {}) => new Promise((ok, ko) => {
  const p = spawn(cmd, args, { stdio: ["pipe", "inherit", "inherit"], ...opts });
  p.on("error", ko); p.on("close", (c) => (c === 0 ? ok() : ko(new Error(`${cmd} a échoué (${c})`))));
  return p;
});

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--disable-gpu-vsync", "--font-render-hinting=none", "--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on("console", (m) => m.type() === "error" && console.error("[page]", m.text()));
page.on("pageerror", (e) => console.error("[page error]", e.message));
const url = pathToFileURL(resolve(a.html)).href + `?w=${W}&h=${H}&render=1`;
await page.goto(url, { waitUntil: "load" });
await page.waitForFunction(() => window.__ready === true && typeof window.seek === "function", null, { timeout: 30000 });
const DURATION = await page.evaluate(() => window.DURATION);
const clip = { x: 0, y: 0, width: W, height: H };
const shot = async (t) => { await page.evaluate((tt) => window.seek(tt), t); return page.screenshot({ type: "png", clip }); };

if (a.contact) {
  const times = a.times ? a.times.split(",").map(Number)
    : Array.from({ length: Math.floor(DURATION / +(a.every || 0.5)) + 1 }, (_, i) => +(i * +(a.every || 0.5)).toFixed(3)).filter((t) => t < DURATION);
  const dir = mkdtempSync(join(tmpdir(), "contact-"));
  const { writeFileSync } = await import("node:fs");
  for (let i = 0; i < times.length; i++) writeFileSync(join(dir, String(i).padStart(4, "0") + ".png"), await shot(times[i]));
  const cols = +(a.cols || 6), rows = Math.ceil(times.length / cols);
  const tw = Math.round(360 * (W >= H ? 1.4 : 1));
  mkdirSync(dirname(resolve(a.contact)), { recursive: true });
  await run("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "1", "-i", join(dir, "%04d.png"),
    "-vf", `scale=${tw}:-2,drawtext=text='%{n}':x=8:y=8:fontsize=22:fontcolor=white:box=1:boxcolor=black@0.6,tile=${cols}x${rows}:padding=6:color=0x222222`,
    "-frames:v", "1", resolve(a.contact)]).catch(async () => {
      // drawtext indisponible (ffmpeg sans freetype) : planche sans numéros
      await run("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "1", "-i", join(dir, "%04d.png"),
        "-vf", `scale=${tw}:-2,tile=${cols}x${rows}:padding=6:color=0x222222`, "-frames:v", "1", resolve(a.contact)]);
    });
  rmSync(dir, { recursive: true, force: true });
  console.log(`Planche : ${a.contact} — ${times.length} vignettes aux instants [${times.join(", ")}]`);
} else {
  const from = +(a.from || 0), to = Math.min(+(a.to || DURATION), DURATION);
  const total = Math.round((to - from) * FPS);
  const R = FPS * SUB;
  mkdirSync(dirname(resolve(a.out)), { recursive: true });
  const vf = SUB > 1 ? ["-vf", `tmix=frames=${SUB},framestep=${SUB},setpts=N/(${FPS}*TB)`] : [];
  const audio = a.audio && existsSync(a.audio) ? ["-ss", String(from), "-i", a.audio] : [];
  const args = ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(R), "-c:v", "png", "-i", "-",
    ...audio, ...vf, "-r", String(FPS), "-c:v", "libx264", "-preset", "slow", "-crf", String(a.crf || 16),
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    ...(audio.length ? ["-c:a", "aac", "-b:a", "192k", "-shortest"] : []), resolve(a.out)];
  const ff = spawn("ffmpeg", args, { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, ko) => ff.on("close", (c) => (c === 0 ? ok() : ko(new Error("ffmpeg " + c)))));
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    for (let s = 0; s < SUB; s++) {
      // sous-images réparties sur l'obturateur (180° : moitié de la frame, centrée avant l'instant)
      const t = from + (f + (s - (SUB - 1)) / SUB * 0.5) / FPS;
      const buf = await shot(Math.max(from, t));
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    }
    if (f % FPS === 0) process.stdout.write(`\r${f}/${total} frames — ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  ff.stdin.end();
  await done;
  console.log(`\nVidéo : ${a.out} (${W}x${H}, ${FPS} fps, ${SUB} sous-images, ${(to - from).toFixed(2)} s)`);
}
await browser.close();
