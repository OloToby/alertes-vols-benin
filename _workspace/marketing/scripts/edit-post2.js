/**
 * POST 2 — Montage ffmpeg depuis la prise brute unique
 * Input:  contenus/semaine-1/video-clips/raw-full-take.webm
 * Output: contenus/semaine-1/post2-video.mp4  (1080x1920, 9:16, H264)
 *
 * Effets appliqués:
 *  - Scale + pad vers 1080x1920
 *  - Fade in (0.5s) / Fade out (1s)
 *  - Sous-titres/overlays aux moments clés (timing basé sur la prise)
 */

const { execFileSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

const CLIPS = path.resolve(__dirname, '../contenus/semaine-1/video-clips');
const OUT   = path.resolve(__dirname, '../contenus/semaine-1');
const RAW   = path.join(CLIPS, 'raw-full-take.webm');
const FINAL = path.join(OUT,   'post2-video.mp4');

if (!fs.existsSync(RAW)) {
  console.error('❌ Fichier brut introuvable. Lance d\'abord: node scripts/record-post2-full.js');
  process.exit(1);
}

// Lire la durée de la vidéo brute
function getDuration(file) {
  const out = execFileSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1', file
  ]).toString().trim();
  return parseFloat(out);
}

const dur = getDuration(RAW);
console.log(`📹 Durée brute : ${dur.toFixed(1)}s`);

// Fontes Windows disponibles
const FONT_BOLD   = 'C\\:/Windows/Fonts/arialbd.ttf';
const FONT_NORMAL = 'C\\:/Windows/Fonts/arial.ttf';

// ── Overlays texte (timings calibrés sur la prise ~55-70s) ──────────────────
// Format: {t_start, t_end, text, color, size, y_offset_from_bottom}
// Les timings sont relatifs au déroulé du script record-post2-full.js
const overlays = [
  // Scène 1 — voyage.benin.bj  (approx 0–12s)
  { ts: 1.5,  te: 11, text: 'voyage.benin.bj',
    color: 'white',   size: 28, bar: true, sub: 'Site officiel du gouvernement du Bénin', subColor: 'FCD116' },

  // Scène 2 — landing  (approx 12–28s)
  { ts: 13,   te: 27, text: 'alertesvolsbenin.com',
    color: 'white',   size: 28, bar: true, sub: 'Alerte dès que les vols Paris-Cotonou s\'ouvrent', subColor: '00D26A' },

  // Scène 3 — inscription + formulaire  (approx 28–50s)
  { ts: 29,   te: 49, text: 'Inscription en 30 secondes',
    color: 'white',   size: 26, bar: true, sub: '5,99€ — Une fois. Pour toujours.', subColor: 'FCD116' },

  // Scène 4 — Stripe  (approx 50s–fin)
  { ts: 51,   te: dur - 0.5, text: 'Paiement sécurisé Stripe',
    color: 'white',   size: 26, bar: true, sub: 'Remboursement complet sous 18 mois si pas de vols', subColor: '00D26A' },
];

// Construire le filtre drawtext pour chaque overlay
function makeDrawtext(o) {
  const esc = s => s.replace(/'/g, "\\'").replace(/:/g, '\\:');
  const barH  = 80;
  const barY  = '(h-' + barH + ')';
  const textY = '(h-' + barH + '+14)';
  const subY  = '(h-' + barH + '+46)';
  const enable = `between(t,${o.ts},${o.te})`;

  const box = `drawbox=x=0:y=${barY}:w=iw:h=${barH}:color=black@0.72:t=fill:enable='${enable}'`;
  const txt = `drawtext=fontfile='${FONT_BOLD}':text='${esc(o.text)}':fontcolor=${o.color}:fontsize=${o.size}:x=20:y=${textY}:enable='${enable}'`;
  const sub = o.sub
    ? `,drawtext=fontfile='${FONT_NORMAL}':text='${esc(o.sub)}':fontcolor=${o.subColor}:fontsize=18:x=20:y=${subY}:enable='${enable}'`
    : '';
  return [box, txt + sub];
}

const filterParts = [];

// Scale + pad vers 1080x1920
filterParts.push('[0:v]scale=1080:-2,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black[scaled]');

// Fade in + fade out
filterParts.push(`[scaled]fade=t=in:st=0:d=0.5,fade=t=out:st=${(dur - 1).toFixed(1)}:d=1[faded]`);

// Construire la chaîne d'overlays
let prevLink = 'faded';
let overlayChain = '';
overlays.forEach((o, i) => {
  const [box, txt] = makeDrawtext(o);
  const outLink = i < overlays.length - 1 ? `ov${i}` : 'final';
  overlayChain += `[${prevLink}]${box}[b${i}];[b${i}]${txt}[${outLink}];`;
  prevLink = outLink;
});

const fullFilter = filterParts.join(';') + ';' + overlayChain.replace(/;$/, '');

console.log('\n▶  Montage en cours...');

try {
  execFileSync('ffmpeg', [
    '-y',
    '-i', RAW,
    '-filter_complex', fullFilter,
    '-map', '[final]',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18',
    '-movflags', '+faststart',
    '-an',
    FINAL
  ], { stdio: 'inherit', maxBuffer: 100 * 1024 * 1024 });

  const size = (fs.statSync(FINAL).size / 1_000_000).toFixed(1);
  const { execSync } = require('child_process');
  const finalDur = parseFloat(
    execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${FINAL}"`).toString().trim()
  );

  console.log(`\n✅  post2-video.mp4`);
  console.log(`   Durée  : ${finalDur.toFixed(0)}s`);
  console.log(`   Taille : ${size} MB`);
  console.log(`   Format : 1080x1920 (9:16) · H264 · sans son`);
  console.log(`\n   ➜ Importe dans CapCut / Premiere et ajoute ta voix.`);
  console.log(`   ➜ Script disponible : contenus/semaine-1/post2-video-teleprompter.html`);

} catch (e) {
  console.error('❌ ffmpeg error:', e.message);
  // Fallback simple sans overlays
  console.log('\n▶  Tentative fallback simple...');
  execFileSync('ffmpeg', [
    '-y', '-i', RAW,
    '-vf', 'scale=1080:-2,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black,fade=t=in:st=0:d=0.5',
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-movflags', '+faststart', '-an',
    FINAL
  ], { stdio: 'inherit' });
  console.log('✅ Vidéo simple sauvegardée (sans overlays)');
}
