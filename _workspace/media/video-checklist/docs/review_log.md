# Journal de revue — Planche contact v1

## Scores (critères QA)

| Critère | Score | Notes |
|---|---|---|
| Compréhension hook (< 2 s, son coupé) | 7/10 | t=0 complètement blanc ; le hook n'apparaît qu'à t≈0.3. À corriger. |
| Lisibilité téléphone (360 px) | 8/10 | Titres lisibles. Sous-titres en 38–46 px correct. |
| Zone sûre 9:16 | 8/10 | Contenu bien dans la zone sûre. Ghost number légèrement à droite, OK. |
| Marque et honnêteté | 9/10 | Couleurs AVB, disclaimer présent, liens corrects. |
| Rythme — événement par temps | 8/10 | Chaque item = 1,5 s (3 beats). Bon tempo. |
| Transitions variées | 8/10 | Push-gauche pour les items, slide-bas pour la chute, fade pour le CTA. Pas de doublon consécutif. |
| Ressorts crédibles | 8/10 | Spring response 0.32-0.38 avec damping 0.85-0.88. Correct. |
| Pas de superposition texte | 8/10 | Transitions nettes grâce au décalage exit/enter. |
| Arc Paris→Cotonou | 5/10 | Trait trop fin (stroke-width 3.5 px svg), difficile à voir en miniature. |
| Recap (6 items cascade) | 7/10 | Les 6 items sont là (stagger jusqu'à t=11.15), mais la cascade semble s'arrêter à 4 en planche contact. À vérifier timing. |
| Erreurs SVG rx | — | `rx="4 0 0 4"` invalide → console errors. Visuel légèrement cassé sur le chip drapeau. |

## 3 Plus gros problèmes

1. **Hook t=0 blanc** : Le film démarre sur un écran blanc pur. TikTok montre la 1ère frame dans le feed. Décaler le déclenchement du spring à t=-0.1 pour que le hook soit déjà à 70% entré à t=0.

2. **Arc trop fin** : `stroke-width="3.5"` sur un viewBox de 920 unités rendu à ~870 px → visuellement ~3 px. Monter à `stroke-width="7"` et ajouter une ombre légère (stroke navy 0.1 en dessous) pour le faire ressortir.

3. **SVG `rx` invalide** : `rx="4 0 0 4"` et `rx="0 0 4 4"` ne sont pas valides en SVG (seule la valeur unique est acceptée). Remplacer par `rx="4"` ou `rx="0"` selon le cas. Utiliser un `clipPath` si l'arrondi partiel est important.

## Corrections v2

- [x] Hook : spring déclenché à t=-0.1 pour une 1ère frame non vide
- [x] Arc : stroke-width 3.5→7, + trait de fond plus épais (opacité 0.15)
- [x] SVG passport : rx simplifié à valeur unique
- [x] Recap stagger : accéléré (0.12→0.09 par item) pour voir les 6 éléments dès t=10.8
- [x] Fond arc : ajouter un sous-trait navy 0.1 opacity pour réhausser la visibilité
