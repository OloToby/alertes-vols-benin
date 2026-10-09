# Shotlist — Checklist voyage Bénin · 15 s · 120 BPM (beat = 0,5 s)

| # | Beats | Secondes | Texte écran | Visuel / Animation | Transition sortie |
|---|---|---|---|---|---|
| 1 HOOK | 0–3 | 0,0–1,5 | « Avant de partir / au Bénin : » | Fond blanc. Ligne 1 shoot depuis la gauche (spring 0,4/0,88). Ligne 2 décalée 80 ms. Barre tricolore glisse depuis le bas à t=0,3. | Lignes sortent vers la gauche (spring 0,2/1,0) à t=1,3 |
| 2 PASSEPORT | 3–6 | 1,5–3,0 | « 01 / Passeport / Valide 6 mois après le retour / Béninois ? → ePass.bj » | Passeport SVG (carnet navy) side-spring de la droite. Coche verte se dessine (stroke-dashoffset) de t=1,8 à t=2,3. SVG scale 0,85→1,0 sur spring. | Push gauche |
| 3 e-VISA | 6–9 | 3,0–4,5 | « 02 / e-Visa / Passeport français / → evisa.bj » | Phone SVG avec écran evisa.bj. Badge "e-VISA" pop (spring 0,35/0,72). Coche verte. | Push gauche |
| 4 VACCIN | 9–12 | 4,5–6,0 | « 03 / Vaccin / Fièvre jaune / OBLIGATOIRE » | Carnet jaune SVG. Tampon rouge « OBLIGATOIRE » tombe à t=5,0 (rotate -12° spring 0,3/0,72). Coche rouge. | Push gauche |
| 5 PALUDISME | 12–15 | 6,0–7,5 | « 04 / Paludisme / Avis médical / avant le départ » | Pill capsule SVG + croix médicale. Coche verte. | Push gauche |
| 6 ASSURANCE | 15–18 | 7,5–9,0 | « 05 / Assurance / Médicale + rapatriement » | Bouclier SVG (shield navy + croix blanche). Coche verte. | Push gauche |
| 7 BILLET | 18–21 | 9,0–10,5 | « 06 / Billet retour / Requis à l'entrée » | Boarding pass SVG rouge/blanc. Coche verte. | Push gauche |
| 8 RÉCAP | 21–23 | 10,5–11,5 | « ✓ Passeport ✓ e-Visa ✓ Vaccin ✓ Paludisme ✓ Assurance ✓ Billet » | Cascade des 6 items avec coches (stagger 80 ms). Barre tricolore pulse. | Glissement vers le bas |
| 9 CHUTE | 23–26 | 11,5–13,0 | « Il ne manque / que le billet. » | Fond vert plein #008751. Texte blanc Sora 700 en scale 0,85→1,0. Barre tricolore en bas (jaune/rouge sur vert). | Slide vers le haut |
| 10 CTA | 26–30 | 13,0–15,0 | Logo · « Soyez prévenu / dès l'ouverture. » · « alertesvolsbenin.com » · Mention indépendance | Fond blanc. Logo + wordmark glissent depuis gauche. Arc Paris→Cotonou se trace (stroke-dashoffset 1,5 s). URL en vert. Mention grise en bas. | — |

## Notes de rythme
- Chaque item = 3 beats (1,5 s) : slide-in (0,3 s) + lecture (0,7 s) + coche (0,4 s) + slide-out (0,1 s overlap avec item suivant)
- Impact fort à chaque multiple de 4 beats (mesures 1, 2, 3, 4…)
- Coche : stroke-dashoffset animé via MK.tween(t, t0+0,3, t0+0,7, 0, 1, ease.outCubic)
- Tampon OBLIGATOIRE : MK.spring(t - 5,0, 0,3, 0,72) → scale 0→1 + légère rotation
