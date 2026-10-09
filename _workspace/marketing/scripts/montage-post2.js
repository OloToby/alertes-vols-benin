const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const CLIPS = path.resolve(__dirname, '../contenus/semaine-1/video-clips');
const OUT   = path.resolve(__dirname, '../contenus/semaine-1');
const FINAL = path.join(OUT, 'post2-video.mp4');
const FONT  = 'C\\:\\\\Windows\\\\Fonts\\\\arialbd.ttf'; // ffmpeg escaped path Windows

// ── Helpers ─────────────────────────────────────────────────────────────────
function run(cmd, label) {
  console.log(`\n▶  ${label}`);
  execSync(cmd, { stdio: 'inherit' });
}

function clip(name) {
  return path.join(CLIPS, `${name}.webm`).replace(/\\/g, '/');
}

function out(name) {
  return path.join(CLIPS, `${name}.mp4`).replace(/\\/g, '/');
}

// ── Convert WebM → MP4, trim, add text overlays ──────────────────────────────

// Clip 1 — voyage.benin.bj
// Overlay: site URL + label gouvernement
run(`ffmpeg -y -i "${clip('clip1-voyage-benin')}" \
  -vf "drawbox=x=0:y=650:w=iw:h=70:color=black@0.7:t=fill, \
       drawtext=fontfile='${FONT}':text='voyage.benin.bj':fontcolor=white:fontsize=22:x=20:y=665, \
       drawtext=fontfile='${FONT}':text='Site officiel du gouvernement du Bénin':fontcolor=FFD700:fontsize=16:x=20:y=693" \
  -c:v libx264 -preset fast -crf 20 -an \
  "${out('c1')}"`,
  'Clip 1 → voyage.benin.bj'
);

// Clip 2 — alertesvolsbenin.com landing
run(`ffmpeg -y -i "${clip('clip2-alertes-landing')}" \
  -vf "drawbox=x=0:y=650:w=iw:h=70:color=black@0.7:t=fill, \
       drawtext=fontfile='${FONT}':text='alertesvolsbenin.com':fontcolor=white:fontsize=22:x=20:y=665, \
       drawtext=fontfile='${FONT}':text='Alertes par email + SMS dès l'ouverture des vols':fontcolor=FFD700:fontsize=16:x=20:y=693" \
  -c:v libx264 -preset fast -crf 20 -an \
  "${out('c2')}"`,
  'Clip 2 → landing page'
);

// Clip 3 — inscription / Stripe
run(`ffmpeg -y -i "${clip('clip3-inscription')}" \
  -vf "drawbox=x=0:y=650:w=iw:h=70:color=black@0.7:t=fill, \
       drawtext=fontfile='${FONT}':text='5,99€  —  Paiement sécurisé Stripe':fontcolor=white:fontsize=22:x=20:y=665, \
       drawtext=fontfile='${FONT}':text='Une fois. Pour toujours.':fontcolor=00D26A:fontsize=16:x=20:y=693" \
  -c:v libx264 -preset fast -crf 20 -an \
  "${out('c3')}"`,
  'Clip 3 → inscription'
);

// Clip 4 — CGV remboursement
run(`ffmpeg -y -i "${clip('clip4-cgv')}" \
  -vf "drawbox=x=0:y=650:w=iw:h=70:color=black@0.7:t=fill, \
       drawtext=fontfile='${FONT}':text='Conditions Générales de Vente':fontcolor=white:fontsize=22:x=20:y=665, \
       drawtext=fontfile='${FONT}':text='Remboursement intégral si pas de vol sous 18 mois':fontcolor=00D26A:fontsize=16:x=20:y=693" \
  -c:v libx264 -preset fast -crf 20 -an \
  "${out('c4')}"`,
  'Clip 4 → CGV'
);

// ── Intro title card (5s) ─────────────────────────────────────────────────
run(`ffmpeg -y \
  -f lavfi -i "color=c=0x04080e:s=1280x720:d=5" \
  -vf "drawtext=fontfile='${FONT}':text='Une arnaque ?':fontcolor=white:fontsize=60:x=(w-tw)/2:y=(h/2)-70:enable='between(t,0.5,4.5)', \
       drawtext=fontfile='${FONT}':text='On vous montre tout.':fontcolor=FCD116:fontsize=34:x=(w-tw)/2:y=(h/2)+10:enable='between(t,1,4.5)'" \
  -c:v libx264 -preset fast -crf 20 \
  "${out('c0-intro')}"`,
  'Intro title card'
);

// ── Outro CTA card (4s) ────────────────────────────────────────────────────
run(`ffmpeg -y \
  -f lavfi -i "color=c=0x04080e:s=1280x720:d=4" \
  -vf "drawtext=fontfile='${FONT}':text='alertesvolsbenin.com/inscription':fontcolor=white:fontsize=36:x=(w-tw)/2:y=(h/2)-40:enable='between(t,0.5,3.5)', \
       drawtext=fontfile='${FONT}':text='5,99€  ·  Lien en bio':fontcolor=00D26A:fontsize=26:x=(w-tw)/2:y=(h/2)+30:enable='between(t,1,3.5)'" \
  -c:v libx264 -preset fast -crf 20 \
  "${out('c5-outro')}"`,
  'Outro CTA card'
);

// ── Concat list ──────────────────────────────────────────────────────────────
const concatFile = path.join(CLIPS, 'concat.txt').replace(/\\/g, '/');
const clips = ['c0-intro','c1','c2','c3','c4','c5-outro'];
fs.writeFileSync(
  path.join(CLIPS, 'concat.txt'),
  clips.map(c => `file '${out(c)}'`).join('\n')
);

// ── Final concat ─────────────────────────────────────────────────────────────
run(`ffmpeg -y -f concat -safe 0 -i "${concatFile}" \
  -c:v libx264 -preset fast -crf 18 -movflags +faststart \
  "${FINAL.replace(/\\/g, '/')}"`,
  'Montage final'
);

console.log(`\n✅  Vidéo prête : contenus/semaine-1/post2-video.mp4`);
console.log(`   Durée estimée: ~35-45 secondes`);
console.log(`   Il te reste à ajouter la voix off dans Capcut / Premiere / DaVinci.`);
