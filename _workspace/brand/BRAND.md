# BRAND.md — Identité visuelle complète · Alertes Vols Bénin

> **Ce fichier est autoportant.** Il contient toutes les informations nécessaires pour produire des visuels conformes à la charte sans accéder au code source ni au site.
> Dernière mise à jour : septembre 2026. Source : inspection directe du code (`src/subscribers.js`, `src/index.js`, `wrangler.toml`).

---

## 1. Le projet en 5 lignes

**Alertes Vols Bénin** est un service d'alerte par email et SMS destiné à la diaspora béninoise (France, Canada, USA, Gabon). Il surveille automatiquement le site officiel voyage.benin.bj — qui vend les vols spéciaux Paris-Cotonou à tarif réduit — et prévient les inscrits dès que les réservations s'ouvrent. Le problème : lors de la dernière campagne (décembre 2025), les billets se sont vendus en quelques minutes sans aucun avertissement préalable, laissant des milliers de personnes sans place. Le service est opérationnel (Cloudflare Workers, paiement PayPal, double opt-in), avec une base d'abonnés payants en croissance.

---

## 2. Positionnement et personnalité

### 5 adjectifs de marque

| Adjectif | Signification concrète |
|---|---|
| **Fiable** | On surveille chaque minute, 24h/24, 7j/7 — pas de promesse creuse |
| **Urgent** | Le ton reflète la réalité : les places partent vite, il faut agir |
| **Patriotique** | L'identité visuelle s'ancre dans le drapeau béninois (vert/jaune/rouge) |
| **Direct** | Phrases courtes, pas de jargon, un seul call-to-action par écran |
| **Communautaire** | On invite au partage, on compte les inscrits, on parle de « nous » |

### 5 anti-adjectifs (ce que la marque ne doit JAMAIS évoquer)

| Anti-adjectif | Pourquoi l'éviter |
|---|---|
| **Institutionnel** | On n'est pas le gouvernement ni Bénin Tours — toujours le préciser |
| **Luxueux** | Public diaspora, budget serré, pas de prétention premium |
| **Décontracté** | Le sujet est sérieux (risque de rater son vol), pas de ton humoristique |
| **Technologique** | On ne parle jamais de « Workers », « API », « cron » — c'est invisible |
| **Agressif** | Urgence oui, pression non — jamais de compte à rebours artificiel ni de fausse rareté |

### Référence visuelle implicite

Le site évoque un service de notification d'aéroport moderne (Flighty, KAYAK alerts) croisé avec une fierté nationale béninoise affirmée. Le fond photographique en diaporama (paysages du Bénin, Tour Eiffel) place l'utilisateur dans l'axe Paris-Cotonou. Les cartes blanches sur fond crème rappellent les boarding passes.

---

## 3. Palette de couleurs

### Couleurs principales

| Token | HEX | RGB | HSL | Rôle | Source |
|---|---|---|---|---|---|
| `--deep` | `#1B2B3C` | 27, 43, 60 | 211°, 38%, 17% | Texte principal, titres, fonds sombres | (`src/subscribers.js:761`) |
| `--bg` | `#F8F6F1` | 248, 246, 241 | 43°, 44%, 96% | Fond de page principal (crème chaud) | (`src/subscribers.js:761`) |
| `--bg2` | `#FFFFFF` | 255, 255, 255 | 0°, 0%, 100% | Fond des cartes et surfaces élevées | (`src/subscribers.js:761`) |
| `--muted` | `#667888` | 102, 120, 136 | 208°, 14%, 47% | Texte secondaire, légendes, labels | (`src/subscribers.js:761`) |
| `--accent` | `#E8112D` | 232, 17, 45 | 352°, 86%, 49% | Liens, accents, indicateurs requis | (`src/subscribers.js:761`) |
| `--line` | `rgba(27,43,60,0.10)` | — | — | Bordures, séparateurs, ombres légères | (`src/subscribers.js:761`) |

### Couleurs du drapeau béninois

| Token | HEX | RGB | HSL | Rôle | Source |
|---|---|---|---|---|---|
| `--flag-green` | `#008751` | 0, 135, 81 | 156°, 100%, 26% | CTA principaux, badges actifs, succès | (`src/subscribers.js:859`) |
| `--flag-yellow` | `#FCD116` | 252, 209, 22 | 49°, 98%, 54% | Barre du drapeau (élément décoratif) | (`src/subscribers.js:859`) |
| `--flag-red` | `#E8112D` | 232, 17, 45 | 352°, 86%, 49% | Barre du drapeau, alertes email, erreurs | (`src/subscribers.js:859`) |

### Couleurs contextuelles et états

| Couleur | HEX / valeur | Rôle | Source |
|---|---|---|---|
| Vert hover | `#006640` | État hover des boutons verts | (`src/subscribers.js:903`) |
| Vert dégradé clair | `#00A86B` | Dégradé du cercle de confirmation | (`src/subscribers.js:2204`) |
| Rouge fermé | `#C0392B` | Pastille « site fermé » (status dot) | (`src/subscribers.js:931`) |
| Placeholder input | `#9BADB3` | Texte placeholder des champs de saisie | (`src/subscribers.js:1368`) |
| Rouge sombre texte | `#8A1025` | Texte dans les encarts d'alerte/motivation | (`src/subscribers.js:1353`) |
| Vert sombre texte | `#1A5A3A` | Texte dans les encarts de succès (info-box) | (`src/subscribers.js:2213`) |
| Fond preuve sociale | `#1A1A2E` | Fond des cartes de commentaires Instagram | (`src/subscribers.js:936`) |
| Fond body sombre | `#0A0A0A` | Body des pages inscription/confirmation (sous le diaporama) | (`src/subscribers.js:1313`) |

### Dégradés

| Nom | Définition CSS | Usage | Source |
|---|---|---|---|
| Hero overlay (landing) | `linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.68) 70%, rgba(0,0,0,0.82) 100%)` | Assombrir le diaporama photo sous le texte hero | (`src/subscribers.js:885`) |
| Hero overlay (inscription) | `linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.88) 100%)` | Assombrir davantage sous le formulaire | (`src/subscribers.js:1322`) |
| Check circle | `linear-gradient(135deg, #008751, #00A86B)` | Cercle de validation (confirmation) | (`src/subscribers.js:2204`) |

### Pas de mode sombre

Le site n'implémente aucun mode sombre. Le fond crème `#F8F6F1` est le seul fond de page. Les pages d'inscription et de confirmation utilisent un body `#0A0A0A` mais celui-ci est entièrement recouvert par le diaporama photographique et son overlay sombre.

---

## 4. Règles d'usage des couleurs

### Combinaisons autorisées

| Fond | Texte | Contexte |
|---|---|---|
| `#F8F6F1` (crème) | `#1B2B3C` (deep) | Sections de contenu principal |
| `#F8F6F1` (crème) | `#667888` (muted) | Texte secondaire, légendes |
| `#FFFFFF` (blanc) | `#1B2B3C` (deep) | Intérieur des cartes |
| `#FFFFFF` (blanc) | `#667888` (muted) | Labels, sous-titres dans les cartes |
| `#008751` (vert) | `#FFFFFF` (blanc) | Boutons CTA, bannières email |
| `#E8112D` (rouge) | `#FFFFFF` (blanc) | Bannière email d'alerte, toast erreur |
| `#1B2B3C` (deep) | `#FFFFFF` (blanc) | En-tête email de bienvenue |
| Overlay sombre (photo) | `#FFFFFF` (blanc) | Texte hero sur fond photographique |
| Overlay sombre (photo) | `rgba(255,255,255,0.85)` | Sous-titres hero |

### Associations interdites

- Jamais `#FCD116` (jaune) comme fond de texte — contraste insuffisant avec le blanc et le crème.
- Jamais `#667888` (muted) sur fond photographique sombre — illisible.
- Jamais `#E8112D` (rouge) + `#008751` (vert) côte à côte comme texte — vibration optique.
- Jamais de texte `#1B2B3C` directement sur le diaporama photo sans overlay.

### Proportions indicatives

- **60 %** : crème `#F8F6F1` et blanc `#FFFFFF` (fonds)
- **25 %** : `#1B2B3C` et `#667888` (texte)
- **10 %** : `#008751` (CTA, accents positifs)
- **5 %** : `#FCD116` + `#E8112D` (éléments du drapeau, alertes ponctuelles)

Le vert `#008751` est la seule couleur d'action. Le jaune et le rouge sont décoratifs (barre du drapeau) sauf le rouge qui sert aussi aux erreurs et à l'email d'alerte d'ouverture.

---

## 5. Typographie

### Familles

| Rôle | Famille | Source | Graisses chargées | Substitution |
|---|---|---|---|---|
| Affichage (titres, wordmark) | **Sora** | Google Fonts | 400, 500, 600, 700, 800 | Poppins ou Montserrat (géométriques, même x-height) |
| Corps (texte, boutons, labels) | **Inter** | Google Fonts | 400, 500, 600, 700 | -apple-system, system-ui, sans-serif |

Source : (`src/subscribers.js:853`, `src/subscribers.js:760`)

Pile de substitution complète :
- Display : `'Sora', ui-sans-serif, system-ui, sans-serif`
- Body : `'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif`

### Hiérarchie typographique

| Niveau | Police | Taille | Graisse | Interlignage | Interlettrage | Casse | Source |
|---|---|---|---|---|---|---|---|
| H1 hero (landing) | Sora | clamp(28px, 7vw, 60px) | 700 | 1.08 | -0.5px | Normale (première lettre majuscule) | (`src/subscribers.js:900`) |
| H1 inscription | Sora | clamp(24px, 5vw, 38px) | 700 | 1.12 | — | Normale | (`src/subscribers.js:1335`) |
| H2 sections | Sora | clamp(28px, 5vw, 48px) | 700 | 1.1 | -0.4px | Normale | (`src/subscribers.js:923`) |
| H2 cartes (pageShell) | Sora | 22px | 700 | — | -0.3px | Normale | (`src/subscribers.js:769`) |
| H4 étapes | Inter | 15px | 600 | — | — | Normale | (`src/subscribers.js:957`) |
| Corps / sous-titre | Inter | clamp(15px, 1.8vw, 17px) | 400 | 1.8 | — | Normale | (`src/subscribers.js:924`) |
| Hero lead | Inter | clamp(16px, 1.6vw, 19px) | 400 | 1.65 | — | Normale | (`src/subscribers.js:901`) |
| Bouton CTA | Inter | 15–16px | 600 | — | — | Normale | (`src/subscribers.js:902, 1374`) |
| Numéro d'étape | Sora | 13px | 600 (italic) | — | 0.02em | Normale | (`src/subscribers.js:956`) |
| Label formulaire | Inter | 11px | 600 | — | 0.06em | MAJUSCULE | (`src/subscribers.js:1362`) |
| Légende / caption | Inter | 12–13px | 400–500 | 1.5–1.6 | — | Normale | (`src/subscribers.js:928, 1003`) |
| Wordmark | Sora | 15px | 600 | — | 0.01em | Normale | (`src/subscribers.js:891`) |
| Footer | Inter | 12px | 400 | 1.9 | — | Normale | (`src/subscribers.js:962`) |

### Notes typographiques

- Les titres H1 et H2 utilisent exclusivement Sora en 700. Jamais de 800 en production malgré son chargement.
- Les call-to-action sont en Inter 600, jamais en Sora.
- L'italique n'apparaît que sur les numéros d'étape (01, 02, 03) et les légendes photo.
- Aucun texte n'est entièrement en majuscules sauf les labels de formulaire (11px).

---

## 6. Logo et signature visuelle

### Logo actuel

**Il n'existe aucun fichier logo vectoriel (SVG, AI, EPS) ni raster (PNG) dans le dépôt.** Le dossier `public/` est vide. Le dossier `Images/` contient 3 photos JPEG (`01.jpg`, `02.jpg`, `03.jpg`) qui sont des screenshots de la campagne décembre 2025, pas des logos.

### Favicon

Un SVG inline sert de favicon sur toutes les pages :

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#008751"/>
  <text x="16" y="24" text-anchor="middle" font-size="22">✈</text>
</svg>
```

Carré vert `#008751`, coins arrondis (rx=6), emoji avion blanc centré. (`src/index.js:91`)

### Wordmark (en-tête du site)

Composition en deux éléments :
1. **Icône** : carré 36×36px, `border-radius: 8px`, fond `rgba(255,255,255,0.12)`, bordure `rgba(255,255,255,0.22)`, emoji ✈ à 18px centré
2. **Texte** : « Alertes Vols Bénin » en Sora 15px/600, `color: rgba(255,255,255,0.90)`, `letter-spacing: 0.01em`

Source : (`src/subscribers.js:889–891`)

### Drapeau-chip

Mini-drapeau béninois en haut à droite : 32×22px, `border-radius: 4px`, grille CSS reproduisant le drapeau (bande verte verticale à gauche, jaune en haut à droite, rouge en bas à droite). (`src/subscribers.js:893–896`)

### Barre tricolore (flag stripe)

Élément récurrent en haut des cartes et en pied de page : barre horizontale de 3–4px de haut, trois segments dans les proportions **1:2:1** (vert `#008751` · jaune `#FCD116` · rouge `#E8112D`). (`src/subscribers.js:765–768, 965–968`)

### Fichiers logo

4 fichiers SVG sont disponibles à la racine du dépôt :

| Fichier | Variante | Dimensions | Usage |
|---|---|---|---|
| `logo-icon.svg` | Icône seule (carré vert + avion blanc) | 512×512 | Favicon, avatar, icône d'app, posts sociaux carrés |
| `logo.svg` | Horizontal (icône + wordmark + barre tricolore) | 520×80 | Header web, signature email, documents |
| `logo-stacked.svg` | Empilé (icône au-dessus du wordmark + barre) | 280×200 | Avatar carré avec texte, Apple Touch icon |
| `logo-white.svg` | Horizontal blanc (wordmark blanc, icône identique) | 520×80 | Fonds sombres (`#1B2B3C`, overlay photo, `#0A0A0A`) |
| `og-image.svg` | Image Open Graph complète | 1200×630 | `meta og:image`, `twitter:image`, aperçu de lien WhatsApp/Facebook |

**Icône** : carré arrondi vert `#008751` (rx proportionnel : 96/512 = ~19%), avion stylisé en vue du dessus, blanc 95% d'opacité. L'avion est un tracé vectoriel custom, pas l'emoji ✈ — il reste lisible jusqu'à 32×32px.

**Wordmark** : texte « Alertes Vols Bénin » en Sora 700, `letter-spacing: -0.3`, souligné par la barre tricolore 1:2:1. Couleur `#1B2B3C` (fond clair) ou `#FFFFFF` (fond sombre).

**Zone de protection** : laisser au minimum la hauteur de l'icône comme marge autour du logo complet. Jamais de texte ou d'élément graphique qui touche le logo.

**Taille minimale** : icône seule = 24×24px. Logo horizontal = 200px de large. En dessous, utiliser uniquement l'icône.

**Usages interdits** : ne jamais déformer les proportions, ne jamais changer la couleur du carré vert, ne jamais remplacer l'avion par l'emoji ✈ dans un contexte formel, ne jamais retirer la barre tricolore du logo horizontal/empilé.

---

## 7. Vocabulaire et ton

### Personne et registre

- **Vouvoiement** sur la landing page et les sections publiques : « Inscrivez-vous », « Vous recevez l'alerte », « Soyez prévenu ». (`src/subscribers.js:1041–1042, 1076`)
- **Tutoiement** dans les emails, les pages post-inscription et les messages de confirmation : « Confirme ton inscription », « Tu recevras l'alerte », « C'est tout bon ! ». (`src/subscribers.js:2079, 2258, 2319–2321`)
- **Langue** : français exclusivement, pas d'anglicismes sauf « email » et « SMS ».
- **Registre** : courant-soutenu en public, courant-familier en privé (emails). Jamais argotique, jamais administratif.

### 15 termes à employer

Extraits du contenu réel du site et des emails :

| # | Terme | Contexte d'usage | Source |
|---|---|---|---|
| 1 | vols Paris-Cotonou | Toujours dans cet ordre, jamais « Cotonou-Paris » | (`src/subscribers.js:1041`) |
| 2 | voyage.benin.bj | Nom du site officiel, toujours en minuscules | (`src/subscribers.js:1042`) |
| 3 | s'ouvrent / ouverture | Pour désigner le moment où les réservations deviennent disponibles | (`src/subscribers.js:1041`) |
| 4 | alerte | Le produit vendu — « recevoir une alerte » | (`src/subscribers.js:1083`) |
| 5 | en quelques minutes | Expression récurrente pour l'urgence | (`src/subscribers.js:1042, 1076`) |
| 6 | inscrivez-vous / s'inscrire | CTA principal | (`src/subscribers.js:1043–1044`) |
| 7 | prévenu(e) | « Soyez prévenu dès que… » | (`src/subscribers.js:1041`) |
| 8 | surveillance automatique | Rassurer sur la fiabilité | (`src/subscribers.js:1081`) |
| 9 | chaque minute | Fréquence de vérification | (`src/subscribers.js:1133`) |
| 10 | paiement sécurisé | Associé à PayPal | (`src/subscribers.js:1081`) |
| 11 | les places partent vite | Titre de section, urgence | (`src/subscribers.js:1075`) |
| 12 | diaspora | Audience cible (dans les emails) | (`src/subscribers.js:2316`) |
| 13 | décembre 2025 | Référence historique de preuve sociale | (`src/subscribers.js:1076, 1100`) |
| 14 | passe le mot | Incitation au partage | (`src/subscribers.js:2365`) |
| 15 | dès l'ouverture | Temporalité de la promesse | (`src/subscribers.js:1083`) |

### 15 termes bannis

| # | Terme banni | Pourquoi | Utiliser à la place |
|---|---|---|---|
| 1 | Bénin Tours | Risque de confusion avec l'opérateur officiel | « le site voyage.benin.bj » |
| 2 | gouvernement | On n'est pas affilié | « site officiel » si nécessaire |
| 3 | officiel | Pourrait laisser croire à une affiliation | « automatique », « fiable » |
| 4 | garanti | On ne garantit pas d'avoir un billet | « prévenu en premier » |
| 5 | gratuit | Le service est payant | « à partir de X € » |
| 6 | bot / robot | Trop technique | « système de surveillance » |
| 7 | scraping / crawl | Jargon technique | « vérification automatique » |
| 8 | API / webhook | Jargon technique | ne pas mentionner |
| 9 | Cloudflare / Workers | Infrastructure invisible | ne pas mentionner |
| 10 | FOMO | Anglicisme marketing | exprimer l'urgence factuellement |
| 11 | dernière chance | Pression artificielle | « les places partent vite » |
| 12 | exclusif | Fausse rareté | « parmi les premiers prévenus » |
| 13 | pas cher | Registre familier dévalorisant | « tarif spécial » |
| 14 | promo / promotion | Ce n'est pas une promo, c'est un service | « inscription » |
| 15 | newsletter | Ce n'est pas une newsletter | « alerte » |

### Formulation des éléments récurrents

- **Titres** : phrase courte, verbe d'action ou constat percutant. Ex : « Les places partent vite. Très vite. », « Soyez prévenu dès que les vols Paris-Cotonou s'ouvrent. » (`src/subscribers.js:1041, 1075`)
- **CTA** : verbe à l'infinitif ou impératif + complément. Ex : « S'inscrire », « M'alerter dès l'ouverture », « Réserver maintenant → ». La flèche `→` termine systématiquement les CTA secondaires. (`src/subscribers.js:1043, 1083, 2425`)
- **Emojis** : utilisés dans les emails (🇧🇯 ✈️ 📬 💳) et les notifications admin, **jamais dans le texte de la landing page**. Les emojis servent de repère visuel, pas de décoration. (`src/subscribers.js:2315, 2420`)
- **Longueur** : phrases de 10–20 mots max. Paragraphes de 1–3 phrases.

---

## 8. Systeme visuel

### Rayons de bordure

| Élément | Rayon | Source |
|---|---|---|
| Bouton CTA principal | 12px | (`src/subscribers.js:902`) |
| Bouton secondaire / input | 10px | (`src/subscribers.js:1365, 1374`) |
| Carte (pageShell) | 16px | (`src/subscribers.js:764`) |
| Carte (inscription/confirmation) | 20px | (`src/subscribers.js:1338`) |
| Image / photo | 16–18px | (`src/subscribers.js:908, 998`) |
| Proof item (commentaire) | 12px | (`src/subscribers.js:936`) |
| Badge / pill (compteur) | 999px (capsule) | (`src/subscribers.js:1355`) |
| Favicon | rx=6 (sur 32px) | (`src/index.js:91`) |
| Wordmark icône | 8px | (`src/subscribers.js:890`) |
| Flag chip | 4px | (`src/subscribers.js:893`) |
| Flag stripe | 2px | (`src/subscribers.js:765`) |

### Ombres

| Contexte | Valeur CSS | Source |
|---|---|---|
| Carte standard | `0 2px 24px rgba(27,43,60,0.10)` | (`src/subscribers.js:764`) |
| Carte inscription (glassmorphism) | `0 8px 48px rgba(0,0,0,0.30)` | (`src/subscribers.js:1338`) |
| Bouton CTA vert | `0 4px 20px rgba(27,43,60,0.20)` | (`src/subscribers.js:902`) |
| Bouton CTA vert (green shadow) | `0 4px 20px rgba(0,135,81,0.25)` | (`src/subscribers.js:1374`) |
| Image route (hero) | `0 4px 24px rgba(0,0,0,0.35)` | (`src/subscribers.js:908`) |
| Image (section last-year) | `0 4px 24px rgba(27,43,60,0.12)` | (`src/subscribers.js:998`) |
| FAB partage | `0 4px 20px rgba(0,0,0,0.25)` | (`src/subscribers.js:736`) |
| Focus ring input | `0 0 0 3px rgba(0,135,81,0.12)` | (`src/subscribers.js:1367`) |
| Stepper active | `0 2px 12px rgba(0,135,81,0.30)` | (`src/subscribers.js:1348`) |
| Check circle confirmation | `0 4px 24px rgba(0,135,81,0.30)` | (`src/subscribers.js:2204`) |

### Epaisseurs de bordure

| Contexte | Epaisseur | Source |
|---|---|---|
| Carte, séparateur standard | 1px solid `rgba(27,43,60,0.10)` | (`src/subscribers.js:764`) |
| Input / select | 1.5px solid `rgba(27,43,60,0.12)` | (`src/subscribers.js:1365`) |
| Flag stripe / barre | 3–4px (hauteur, pas une bordure) | (`src/subscribers.js:765, 1339`) |

### Espacement (valeurs récurrentes)

Le site utilise un système de spacing fluide avec `clamp()`. Valeurs les plus fréquentes :

| Usage | Valeur | Source |
|---|---|---|
| Padding section (vertical) | `clamp(48px, 8vw, 96px)` | (`src/subscribers.js:920, 950`) |
| Padding section (horizontal) | `clamp(16px, 4vw, 48px)` | (`src/subscribers.js:920`) |
| Padding inner content | `clamp(24px, 5vw, 80px)` | (`src/subscribers.js:921`) |
| Padding carte | 40px 36px (pageShell), 22–32px (inscription) | (`src/subscribers.js:764, 1343`) |
| Padding bouton | 16px 40px (grand), 15px 30px (formulaire) | (`src/subscribers.js:902, 1374`) |
| Gap entre sections | 40–64px | (`src/subscribers.js:921, 945`) |
| Gap steps | 24px | (`src/subscribers.js:954`) |
| Margin-bottom titre → texte | 12–18px | (`src/subscribers.js:769, 900`) |

### Icônes

- **Pas de bibliothèque d'icônes** (ni Lucide, ni Heroicons, ni Font Awesome).
- Toutes les icônes sont des **SVG inline** dessinées à la main : flèches CTA, partage, WhatsApp, Facebook, copier, info, erreur, check. (`src/subscribers.js:1044–1046, 719–731`)
- Style : trait (`stroke`) pour les flèches (1.8px, `stroke-linecap: round`, `stroke-linejoin: round`), remplissage (`fill`) pour les icônes sociales.
- L'emoji ✈ est utilisé comme icône d'identité (wordmark, favicon), pas comme icône fonctionnelle.

### Style photographique

- **Diaporama hero** : 14 slides en fondu enchaîné (cycle de 70s), photos de paysages du Bénin et de la Tour Eiffel. Sources : `voyage.benin.bj/assets/` (bg-illustration, bg-ganvie, bg-nikki, hero-bg, cotonou, ganvie, ouidah) et Unsplash (scènes africaines). Filtre : `saturate(110%) brightness(0.80)`. (`src/subscribers.js:868–883`)
- **Image route** : composite JPEG (Tour Eiffel + avion Air France + monuments béninois + plage) encodée en base64. Style carte postale. (`src/subscribers.js:805`)
- **Photos « L'année dernière »** : 3 screenshots JPEG de la campagne décembre 2025 (captures d'écran du site voyage.benin.bj). (`src/subscribers.js:806–808`)
- **Commentaires Instagram** : 8 images PNG de commentaires sous le post @explore.benin, encodées en base64. (`src/comment-images.js`)

### Éléments graphiques récurrents

1. **Barre tricolore 1:2:1** (vert/jaune/rouge) — en haut des cartes et en pied de page
2. **Drapeau-chip** — en haut à droite de la barre de navigation
3. **Overlay dégradé sombre** — sur toute photo de fond
4. **Glassmorphism** — cartes semi-transparentes (`rgba(255,255,255,0.95)`, `backdrop-filter: blur(20px)`) sur les pages inscription et confirmation
5. **Pastille pulsante** — dot vert animé devant le compteur d'inscrits (`animation: pulse 1.8s ease-in-out infinite`)

---

## 9. Déclinaison réseaux sociaux

### Formats Instagram

| Format | Dimensions | Usage |
|---|---|---|
| Post carré | 1080 × 1080 px | Annonces, pédagogie, preuve sociale |
| Post portrait | 1080 × 1350 px | Contenu enrichi, infographies |
| Story / Reel | 1080 × 1920 px | Urgence, alertes, partage rapide |

### Zones sûres

- **Post carré/portrait** : marge intérieure de 60px sur les 4 côtés. Texte principal dans les 960 × 960 px centraux (carré) ou 960 × 1230 px (portrait).
- **Story** : marge haute de 200px (UI Instagram), marge basse de 280px (swipe up / réponse), marges latérales de 60px. Zone de texte sûre : 960 × 1440 px centrée verticalement.

### Taille minimale de texte

- Post : 36px minimum pour le corps, 60px minimum pour les titres.
- Story : 42px minimum pour le corps, 72px minimum pour les titres.

### Placement du logo/wordmark

- **Post** : en haut à gauche, avec le flag-chip en haut à droite. Wordmark en blanc si fond sombre, en `#1B2B3C` si fond clair.
- **Story** : centré en haut (sous la zone UI), wordmark + flag-chip sur la même ligne.
- **Tous formats** : barre tricolore 1:2:1 en bas du visuel, pleine largeur, 8–12px de haut.

### 4 gabarits de post détaillés

#### Gabarit A — Annonce (« Les vols sont ouverts ! »)

- **Fond** : photo de paysage béninois, overlay `rgba(0,0,0,0.65)`
- **Haut** : wordmark blanc + flag-chip
- **Centre** : emoji 🇧🇯✈️ en grand (120px), titre en Sora 700 blanc « Les vols Paris-Cotonou sont OUVERTS ! », sous-titre en Inter 400 `rgba(255,255,255,0.85)` « Réserve vite sur voyage.benin.bj »
- **Bas** : barre tricolore 1:2:1, 8px
- **CTA implicite** : flèche → en bas à droite

#### Gabarit B — Pédagogie (« Comment ça marche »)

- **Fond** : crème `#F8F6F1`
- **Haut** : wordmark `#1B2B3C` + flag-chip
- **Corps** : 3 blocs verticaux numérotés (01, 02, 03) en Sora italic `#E8112D`, titre en Inter 600 `#1B2B3C`, description en Inter 400 `#667888`. Séparateur `rgba(27,43,60,0.10)` entre chaque bloc.
- **Bas** : barre tricolore 1:2:1

#### Gabarit C — Preuve sociale (témoignages)

- **Fond** : `#1B2B3C` (deep)
- **Haut** : wordmark blanc + flag-chip
- **Centre** : screenshots de commentaires Instagram inclinés (rotation ±0.8°), superposés, sur fond `#1A1A2E`. Bordure `rgba(255,255,255,0.08)`, `border-radius: 12px`.
- **Texte** : « 109 commentaires, 2,6K likes sous @explore.benin » en Inter 500 blanc
- **Bas** : CTA « S'inscrire → » en capsule verte `#008751`, barre tricolore

#### Gabarit D — Promotion / rappel

- **Fond** : diaporama-style (photo + overlay sombre)
- **Haut** : wordmark blanc + flag-chip
- **Centre** : titre Sora 700 blanc « Soyez prévenu dès l'ouverture. », sous-titre « Les places partent en quelques minutes. » en Inter 400, `rgba(255,255,255,0.85)`
- **CTA** : bouton vert `#008751` « S'inscrire — X,XX € », `border-radius: 12px`
- **Bas** : barre tricolore 1:2:1

---

## 10. Bloc prêt à coller

Copier-coller ce bloc en tête de conversation avec une IA générative :

```
CHARTE GRAPHIQUE — ALERTES VOLS BÉNIN

Tu produis des visuels pour "Alertes Vols Bénin", un service d'alerte par email/SMS pour les vols spéciaux Paris-Cotonou (diaspora béninoise).

COULEURS (respecter les HEX exacts) :
- Fond principal : #F8F6F1 (crème chaud)
- Fond carte : #FFFFFF
- Texte principal : #1B2B3C
- Texte secondaire : #667888
- CTA / accent vert : #008751 (hover : #006640)
- Drapeau jaune : #FCD116
- Drapeau rouge / accent urgent : #E8112D
- Toujours une barre tricolore en bas : vert #008751 (1 part) | jaune #FCD116 (2 parts) | rouge #E8112D (1 part)

TYPOGRAPHIES :
- Titres : Sora Bold (700), letter-spacing négatif (-0.4px)
- Corps : Inter Regular (400) ou Medium (500)
- Boutons : Inter SemiBold (600)
- Si indisponible : Poppins pour Sora, system-ui pour Inter

TON :
- Français, vouvoiement en public, tutoiement en privé
- Direct, urgent mais pas agressif
- Phrases courtes (15 mots max)
- Termes clés : "vols Paris-Cotonou", "voyage.benin.bj", "alerte", "en quelques minutes", "s'inscrire", "dès l'ouverture"
- Jamais dire : "garanti", "exclusif", "dernière chance", "gratuit", "officiel"
- Emojis : 🇧🇯 ✈️ uniquement, jamais dans les titres

ÉLÉMENTS VISUELS :
- Photos de paysages béninois + Tour Eiffel en fond, avec overlay sombre
- Cartes blanches à coins arrondis (16-20px) avec ombre douce
- Boutons verts #008751 à coins arrondis (12px)
- Logo disponible : logo.svg (horizontal), logo-icon.svg (icône), logo-white.svg (fond sombre)
- Flag-chip (mini drapeau béninois) en haut à droite
- 2 fonds Instagram : #F8F6F1 (posts clairs) ou #1B2B3C (posts sombres)
- Titres fixes Instagram : Sora 700, 60-72px (post), 72-96px (story), letter-spacing -0.5px
- Traitement photo : Saturation +10, Exposition -0.3, Ombres +10, vignettage léger

NE JAMAIS :
- Utiliser le jaune #FCD116 comme fond de texte
- Écrire "Bénin Tours" ou "gouvernement"
- Mettre du texte directement sur photo sans overlay sombre
- Utiliser des icônes d'une bibliothèque (tout est SVG custom)
- Mélanger rouge #E8112D et vert #008751 comme texte côte à côte
```

---

## 11. Trois prompts de génération d'image modèles

### Prompt A — Post Instagram annonce d'ouverture (1080×1080)

```
Crée un post Instagram carré 1080x1080 pour "Alertes Vols Bénin".

Fond : photographie aérienne d'une plage tropicale béninoise avec cocotiers, recouverte d'un overlay dégradé noir (opacity 65%).

En haut à gauche : le texte "✈ Alertes Vols Bénin" en police Sora SemiBold 600 taille 32px, couleur blanche.
En haut à droite : un petit rectangle arrondi (32x22px, border-radius 4px) reproduisant le drapeau du Bénin (bande verte verticale à gauche, jaune en haut à droite, rouge en bas à droite).

Au centre : les emojis 🇧🇯✈️ en très grand (120px), puis en dessous le titre "Les vols Paris-Cotonou sont OUVERTS !" en Sora Bold 700 blanc, taille 60px, letter-spacing -0.5px, centré.
Sous le titre : "Réserve vite sur voyage.benin.bj" en Inter Regular 400, couleur rgba(255,255,255,0.85), taille 36px.

Tout en bas : une barre horizontale pleine largeur de 8px de haut, divisée en 3 segments : vert #008751 (25%), jaune #FCD116 (50%), rouge #E8112D (25%).

Style général : moderne, épuré, urgent mais élégant. Pas de fioritures.
```

### Prompt B — Story Instagram pédagogie (1080×1920)

```
Crée une story Instagram 1080x1920 pour "Alertes Vols Bénin".

Fond : couleur unie crème #F8F6F1.

En haut (y=220px, centré) : "✈ Alertes Vols Bénin" en Sora SemiBold 600 taille 36px, couleur #1B2B3C.

Titre (y=340px) : "Comment ça marche" en Sora Bold 700 taille 64px, couleur #1B2B3C, letter-spacing -0.4px, centré.

Trois blocs empilés (y=480px, y=720px, y=960px), chacun composé de :
- Un numéro "01" / "02" / "03" en Sora SemiBold Italic 600, couleur #E8112D, taille 42px
- Un titre en Inter SemiBold 600, couleur #1B2B3C, taille 42px : "Vous vous inscrivez" / "On surveille pour vous" / "Vous recevez l'alerte"
- Une description en Inter Regular 400, couleur #667888, taille 32px, line-height 1.65
  - "Renseignez vos coordonnées."
  - "Vérification chaque minute, 24h/24."
  - "Email + SMS dès l'ouverture."
- Séparateur horizontal entre chaque bloc : ligne 1px couleur rgba(27,43,60,0.10)

En bas (y=1840px) : barre tricolore pleine largeur 10px : vert #008751 (25%) | jaune #FCD116 (50%) | rouge #E8112D (25%).

Style : minimaliste, aéré, lisible. Pas de photo de fond.
```

### Prompt C — Post Instagram preuve sociale (1080×1350)

```
Crée un post Instagram portrait 1080x1350 pour "Alertes Vols Bénin".

Fond : couleur unie #1B2B3C (bleu très foncé).

En haut à gauche : "✈ Alertes Vols Bénin" en Sora SemiBold 600 taille 32px, couleur blanche.
En haut à droite : mini drapeau béninois (rectangle arrondi).

Au centre : 4 cartes de commentaires Instagram empilées avec une légère rotation alternée (-0.8° et +0.6°), chacune un rectangle arrondi (border-radius 12px) avec fond #1A1A2E, bordure 1px rgba(255,255,255,0.08), contenant un faux commentaire Instagram (photo de profil ronde, nom en gras blanc, texte en gris clair). Les cartes se chevauchent légèrement avec une ombre portée douce.

Sous les cartes : "109 commentaires, 2,6K likes" en Inter Medium 500 blanc taille 32px, puis "sous le post @explore.benin" en Inter Regular 400 couleur #667888 taille 28px.

En bas : un bouton capsule avec fond #008751, texte "S'inscrire →" en Inter SemiBold 600 blanc taille 36px, border-radius 12px, centré.

Tout en bas : barre tricolore 8px (vert 25% | jaune 50% | rouge 25%).

Ambiance : sombre, social proof, communautaire.
```

---

## 12. A ne jamais faire

| # | Interdit | Vérification |
|---|---|---|
| 1 | Ne jamais placer du texte `#667888` sur un fond photographique ou sombre — illisible. | Contraste < 3:1 |
| 2 | Ne jamais utiliser `#FCD116` (jaune) comme couleur de fond sous du texte blanc ou clair. | Contraste < 2:1 |
| 3 | Ne jamais écrire « Bénin Tours », « gouvernement du Bénin » ou « officiel » sans la mention « non affilié ». | Risque juridique |
| 4 | Ne jamais placer le vert `#008751` et le rouge `#E8112D` comme texte côte à côte. | Vibration optique, inaccessible aux daltoniens |
| 5 | Ne jamais omettre la barre tricolore (1:2:1) en bas d'un visuel de marque. | Signature visuelle absente |
| 6 | Ne jamais utiliser de police avec empattements (serif) dans les visuels. | Hors charte — Sora et Inter sont sans empattement |
| 7 | Ne jamais utiliser une graisse Sora 800 dans un titre — la graisse maximale en production est 700. | Incohérence typographique |
| 8 | Ne jamais créer un visuel sans le wordmark « ✈ Alertes Vols Bénin » ou au minimum l'emoji ✈ + la barre tricolore. | Identification impossible |
| 9 | Ne jamais mettre un CTA dans une autre couleur que `#008751` (vert) — sauf email d'alerte d'ouverture qui utilise le rouge `#E8112D` en bannière uniquement. | Confusion sur l'action principale |
| 10 | Ne jamais utiliser de compte à rebours, de jauge de rareté artificielle ou de formulation type « dernière chance / offre limitée ». | Contraire au positionnement (urgent mais honnête) |

---

## 13. Sources et lacunes

### Fichiers inspectés

| Fichier | Contenu extrait |
|---|---|
| `src/subscribers.js` | 100 % de l'identité visuelle : CSS variables, templates HTML (landing, inscription, confirmation, emails), contenu rédactionnel, composants, typographie |
| `src/index.js` | Favicon SVG, routing, meta-descriptions, vocabulaire admin |
| `src/notify.js` | Ton des notifications admin (emails, SMS) |
| `src/comment-images.js` | Images de preuve sociale (commentaires Instagram, base64 PNG) |
| `wrangler.toml` | Variables d'environnement (prix, URLs, brand_name "Alertes Vols Bénin") |
| `schema.sql` | Structure des données abonnés (champs de formulaire) |
| `package.json` | Dépendances (aucune librairie UI, pas de Tailwind, pas de framework CSS) |
| `Images/01.jpg, 02.jpg, 03.jpg` | Photos de la campagne décembre 2025 |
| Site en ligne | Vérifié — contenu identique au code, aucun élément supplémentaire |

### Éléments `A DEFINIR` — décisions à prendre

| # | Élément | Décision validée |
|---|---|---|
| 1 | ~~Logo vectoriel~~ | 4 fichiers SVG créés : `logo-icon.svg`, `logo.svg`, `logo-stacked.svg`, `logo-white.svg` — **Fait** |
| 2 | **Fond des posts Instagram** | Crème `#F8F6F1` pour posts clairs (pédagogie, promotion) · `#1B2B3C` pour posts sombres (preuve sociale, annonce d'ouverture) — **Validé** |
| 3 | **Taille des grands titres** (visuels fixes) | Sora 700, 60–72px posts carrés, 72–96px stories, `letter-spacing: -0.5px` — **Validé** |
| 4 | ~~Image OG/partage~~ | `og-image.svg` créé (1200×630) : fond `#1B2B3C` + wordmark + titre Sora 700 blanc + barre tricolore. Remplace l'image de voyage.benin.bj — **Fait** |
| 5 | **Palette d'illustrations** | Vert : `#D4EDDA` (fond léger) · `#A3D9B1` (remplissage) · `#008751` (accent) · `#1A5A3A` (texte) · `#00A86B` (dégradé). Neutres pâles : `#FFF3CD` (jaune) · `#F8D7DA` (rouge) — **Validé** |
| 6 | **Traitement photo** | Saturation +10, Exposition −0.3 stop, Ombres +10, vignettage léger (équivalent CSS `saturate(110%) brightness(0.80)`) — **Validé** |
