# Fiche légale — Alertes Vols Bénin
_Dernière mise à jour : 25 septembre 2026_

## Éditeur
- Forme : **Micro-entrepreneur / Entrepreneur individuel (EI)** ✓ confirmé
- Nom prénom : **Jean Joël NADISON**
- Nom commercial : **Olohoun Studio**
- Mention « EI » : Entrepreneur individuel (EI) ✓
- Adresse (siège) : **16 Rue Frida Kahlo, 17138 Saint-Xandre, France**
- SIREN / SIRET : **[À COMPLÉTER — voir onglet "Informations fiscales" Stripe ou impots.gouv.fr]**
- Capital social : non applicable (EI)
- N° TVA intracom : TVA non applicable, art. 293 B du CGI
- Email de contact : alertesvolsbenin@gmail.com
- Téléphone de contact : +33 7 49 59 06 36
- Directeur de la publication : Jean Joël NADISON
- Activité réglementée : aucune (service d'alerte numérique)

## Hébergement
- Hébergeur principal (Worker + D1 + KV + Queues) : Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis. Tél : +1 (650) 319-8930. Site : cloudflare.com
- Émission des emails : Resend, Inc. (resend.com) — prestataire d'envoi d'emails transactionnels, États-Unis
- Envoi des SMS : Twilio, Inc. (twilio.com) — prestataire SMS, États-Unis
- Paiement en ligne : Stripe, Inc. (stripe.com) — prestataire de paiement, États-Unis / Stripe Payments Europe, Ltd. pour les transactions européennes

## Données & RGPD
- Responsable de traitement : **[À COMPLÉTER : prénom + nom]**, joignable à alertesvolsbenin@gmail.com
- DPO désigné : non (non obligatoire pour une personne physique / micro-entreprise)
- Contact RGPD : alertesvolsbenin@gmail.com

### Traitements

| Finalité | Base légale | Données | Durée | Destinataires | Hors UE |
|---|---|---|---|---|---|
| Inscription et envoi de l'alerte | Exécution du contrat (art. 6.1.b RGPD) | Prénom, nom, email, téléphone (optionnel), consentement SMS | Durée du service + 3 ans (prescription) | Resend (email), Twilio (SMS si consentement) | OUI — Resend US, Twilio US |
| Paiement | Exécution du contrat | Email, données de paiement (gérées par Stripe — jamais vues par le service) | 10 ans (archives comptables, L123-22 C. com.) | Stripe (Stripe Payments Europe pour les cartes EU) | Potentiellement (Stripe US) |
| Analytique first-party | Intérêt légitime (amélioration du service) | session_id SHA-256 (reset quotidien), page, pays CF-IPCountry, device, browser, référent (pas d'IP brute, pas de nom) | 13 mois (hypothèse) | Aucun tiers | Non (D1 Cloudflare — edge global) |
| Lutte anti-bot (Turnstile) | Intérêt légitime (sécurité) | Token Turnstile, IP (envoi à Cloudflare) | Durée de la session | Cloudflare Challenges | OUI — Cloudflare US |
| Logs techniques | Intérêt légitime (sécurité, débogage) | State KV, hashes, rate-limits | 7200s (sessions Stripe KV) / variable | Aucun | Non (KV Cloudflare — edge) |

### Sous-traitants / transferts hors UE

| Sous-traitant | Rôle | Localisation | Garantie |
|---|---|---|---|
| Cloudflare, Inc. | Hébergement Worker, D1, KV, Queues | USA + edge mondial | DPA + SCCs (Standard Contractual Clauses) |
| Resend, Inc. | Envoi emails transactionnels | USA | DPA + SCCs |
| Twilio, Inc. | Envoi SMS | USA | DPA + SCCs |
| Stripe Payments Europe, Ltd. | Paiement (carte bancaire) | Irlande (UE) | Adéquuation UE |
| ~~Google LLC~~ | ~~Chargement polices (Sora, Inter depuis fonts.googleapis.com)~~ | ~~USA~~ | **SUPPRIMÉ** — polices auto-hébergées sur Cloudflare depuis le 25/09/2026 |

### Traceurs (cookies / localStorage / sessionStorage)

| Nom | Émetteur | Finalité | Durée | Exempté CNIL ? |
|---|---|---|---|---|
| Cookies Cloudflare infrastructure (\_\_cflb, \_cfduid, etc.) | Cloudflare | Équilibrage de charge, sécurité réseau | Session | Oui (strictement nécessaires à l'infrastructure) |
| Cookie Turnstile (cf_clearance, etc.) | Cloudflare Challenges | Vérification anti-bot | Session / court terme | Oui si strictement nécessaire à la sécurité |
| ~~Google Fonts~~ | ~~Google LLC~~ | ~~Chargement de polices~~ | ~~Transfert d'IP~~ | **SUPPRIMÉ — polices auto-hébergées depuis le 25/09/2026** |

Aucun cookie analytique, publicitaire ou de pistage : analytics entièrement first-party (D1 Cloudflare), pas de GA4, Facebook Pixel, Hotjar, GTM.

## Commerce
- Offre : service d'alerte par email et/ou SMS lors de l'ouverture de voyage.benin.bj
- Prix TTC : 5,99 € (toutes taxes comprises)
- TVA : **[À COMPLÉTER — franchise TVA art. 293 B, ou taux appliqué si assujetti]**
- B2C exclusif
- Paiement : en ligne par carte bancaire via Stripe, one-shot (paiement unique)
- Facturation : **[À COMPLÉTER — reçu Stripe automatique ou facture émise ?]**
- Accès au service : immédiat après confirmation du paiement Stripe
- Rétractation : 14 jours (art. L221-18 C. conso), sauf si l'alerte a déjà été envoyée (exécution complète du service avec accord préalable exprès — à recueillir au checkout)
- Résiliation : sans objet (paiement unique, pas d'abonnement récurrent)
- Remboursement garanti si voyage.benin.bj n'ouvre pas dans les 18 mois suivant l'inscription
- Remboursement standard : sur demande à alertesvolsbenin@gmail.com dans les 14 jours si droit de rétractation non épuisé
- Reconduction tacite : aucune
- Médiateur de la consommation : **CM2C — Centre de Médiation et d'Arbitrage en ligne** · cm2c.net · 14 rue Saint-Jean, 75017 Paris
- Garantie légale de conformité : applicable (art. L217-3 et s. C. conso — service numérique, 2 ans)
- Garantie des vices cachés : applicable (art. 1641 C. civ.)

## Hypothèses prises
- L'éditeur est un particulier ou micro-entrepreneur (basé sur la formulation "un particulier" dans legal.js:154)
- La franchise TVA art. 293 B est appliquée (aucun numéro de TVA visible, prix affiché sans mention HT)
- Les clauses contractuelles types (SCCs) de l'UE couvrent les transferts vers Cloudflare, Resend et Twilio (pratique standard pour ces acteurs — vérifier les DPA)
- La durée de conservation analytics est de 13 mois (limite CNIL pour les cookies — à caler avec la purge D1 réelle)
- Le consentement SMS est explicitement recueilli au formulaire (sms_consent case dédiée, non pré-cochée)
- L'acceptation des CGV n'est pas encore recueillie au checkout Stripe (à vérifier et corriger si absent)
