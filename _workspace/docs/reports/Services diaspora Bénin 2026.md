# Services diaspora Bénin 2026 : ce qui marche vraiment

*Référence opérationnelle pour la mise à jour de la page web. Vérifications effectuées le 30 septembre 2026.*

La digitalisation des services publics béninois pour la diaspora s'est accélérée depuis 2025, mais la situation réelle sur le web est contrastée : **quatre ou cinq services phares sont pleinement opérationnels** avec des tarifs vérifiés (ePass, ANIP, casier judiciaire), tandis que la quasi-totalité des services consulaires classiques (ambassade Paris, laissez-passer, carte d'identité consulaire) sont inaccessibles en ligne au moment de la vérification — maintenance, 403 ou 503. Plusieurs domaines référencés dans des listes antérieures n'existent tout simplement plus (DNS error). La recommandation principale pour un développeur : mettre en avant ePass et les services ANIP comme la colonne vertébrale fiable, ajouter un avertissement générique sur l'indisponibilité temporaire des services consulaires parisiens, et purger les liens morts.

---

## 1. Services CONFIRMÉS fonctionnels (garder / mettre à jour)

### ePass — Renouvellement passeport 100 % en ligne

**Statut : Opérationnel.** Lancé officiellement le **21 octobre 2025** dans le cadre de l'initiative « Diplomatie 4D », ce service est le plus important ajout récent pour la diaspora. Il permet aux Béninois résidant à l'étranger (adultes et mineurs) de renouveler leur passeport biométrique en moins de 15 minutes de soumission, sans se déplacer dans un consulat. Le délai de traitement affiché est de **4 semaines maximum** à compter de la validation du dossier complet. La livraison se fait au choix à domicile, au consulat le plus proche, ou à la DEI au Bénin. Les certifications sécurité **ISO 27701 et ISO 27001** sont en place. Le tarif n'est pas publié sur le site — il est communiqué uniquement lors du processus in-app. **Prérequis obligatoires : NPI + numéro d'immatriculation consulaire (IC).** Application disponible sur Google Play (`com.sfx.mfa.govsmart`) et App Store (`id6744979270`). Support WhatsApp : +229 01 98 91 91 91. ([Source officielle](https://www.gouv.bj/article/3308/lancement-epass-dematerialisation-renouvellement-passeports-beninois-diaspora/) | [epass.gouv.bj](https://epass.gouv.bj))

| Champ | Valeur |
|-------|--------|
| URL | https://epass.gouv.bj |
| Tarif | Non publié publiquement (révélé in-app) |
| Délai | ≤ 4 semaines (objectif affiché) |
| Prérequis | NPI + immatriculation consulaire (IC) |
| Livraison | Domicile / consulat / DEI Bénin |

---

### ANIP — Actes d'état civil et identité en ligne

**Statut : Opérationnel 24/7.** La plateforme [eservices.anip.bj](https://eservices.anip.bj) publie une grille tarifaire complète, confirmée directement depuis la page `/services-et-couts`. C'est la source la plus fiable et la plus complète pour la diaspora.

| Service | Tarif confirmé | Délai |
|---------|----------------|-------|
| Certificat NPI/fID | **0 FCFA (gratuit)** | Instantané |
| Acte de naissance | **1 000 FCFA** | Instantané après paiement |
| Acte de naissance avec mention marginale | **2 000 FCFA** | Instantané |
| Acte de naissance reconstitué | **2 000 FCFA** | À confirmer |
| Acte de naissance transcrit | **2 000 FCFA** | À confirmer |
| Acte de mariage | **2 000 FCFA** | Instantané |
| Acte de décès | **2 000 FCFA** | Instantané |
| Certificat d'identification personnelle | **1 000 FCFA** | Instantané |
| Certificat de résidence | **2 000 FCFA** | À confirmer |
| Certificat de célibat / coutume | **2 000 FCFA** | À confirmer |
| Certificat de non-remariage / non-divorce | **2 000 FCFA** | À confirmer |
| Carte d'identité nationale biométrique | **6 000 FCFA** | À confirmer (retrait possible en consulat ?) |

([eservices.anip.bj/services-et-couts](https://eservices.anip.bj/services-et-couts))

Support : numéro vert 7054 | WhatsApp +229 01 48 50 00 00 | serviceclient@anip.bj. Le service « Retrouver mon NPI » est disponible directement sur eservices.anip.bj.

**Note développeur :** Le NPI étant un prérequis obligatoire pour ePass, il faut idéalement présenter ANIP (récupération du NPI) comme étape 1 dans le tunnel d'usage.

---

### Casier judiciaire bulletin B3 — service-public.bj

**Statut : Opérationnel.** Tarif vérifié directement sur la fiche officielle.

| Champ | Valeur |
|-------|--------|
| URL | https://service-public.bj/public/services/service/PS00373 |
| Tarif | **1 900 FCFA** |
| Délai | **72h** (peut dépasser en cas de forte demande) |
| Validité du document | 3 mois |
| Éligibilité | Tout Béninois ; Béninois nés à l'étranger doivent fournir en plus un certificat de nationalité béninoise |

([service-public.bj PS00373](https://service-public.bj/public/services/service/PS00373))

---

### My Afro Origins — Nationalité pour afro-descendants

**Statut : Opérationnel.** Portail actif permettant aux descendants d'Africains déportés lors de la traite négrière de demander la nationalité béninoise. Une cérémonie de remise d'attestations a eu lieu le 1er septembre 2026 (10 attestations remises), confirmant l'activité réelle du service. ([gouv.bj actualités](https://www.gouv.bj/actualites))

| Champ | Valeur |
|-------|--------|
| URL | https://myafroorigins.bj |
| Tarif | **Non confirmé** (100 USD mentionné ailleurs, absent du site) |
| Délai | **3 mois** à compter de la notification de réception du dossier complet |
| Contact | support.adan@gouv.bj | Lun-ven 8h-17h30 |

([myafroorigins.bj](https://myafroorigins.bj))

---

### ANDF — Foncier numérisé

**Statut : Opérationnel.** L'Agence Nationale du Domaine et du Foncier (ANDF) propose des e-services fonciers depuis son site andf.bj et le portail cadastre.bj. Des actualités de mai-juin 2025 confirment des nouveaux services en ligne. Services disponibles : extrait de plan cadastral, demande de titre foncier, transfert de propriétés.

| Champ | Valeur |
|-------|--------|
| URL | https://andf.bj + https://cadastre.bj |
| Tarif | 0,3 % valeur vénale (non confirmé officiellement) |
| Contact | (+229) 01 97 43 42 93 | andf@finances.bj |

([andf.bj](https://andf.bj))

---

### e-Visa — evisa.bj

**Statut : Partiellement opérationnel.** Le domaine officiel evisa.gouv.bj redirige en 301 vers evisa.bj (migration permanente). Le site evisa.bj est accessible avec des formulaires de demande de visa et de suivi de dossier, et une page d'exemption de visa. Les tarifs exacts (32 798 FCFA / 30j 1 entrée, 49 197 FCFA / 30j multi, 65 596 FCFA / 90j multi) sont plausibles mais n'ont pas pu être confirmés directement — les pages articles retournent 404 en raison du chargement dynamique du site.

| Champ | Valeur |
|-------|--------|
| URL | https://evisa.bj (redirige depuis evisa.gouv.bj) |
| Tarif | Non confirmé directement (pages tarifaires en 404) |
| Délai | Non confirmé |

**Note développeur :** Corriger tous les liens pointant vers evisa.gouv.bj vers evisa.bj. Ne pas afficher les tarifs en FCFA sans les avoir reverifiés sur le site — les pages de tarifs sont inaccessibles par fetch automatique.

---

## 2. Services INACCESSIBLES au moment de la recherche (statut incertain)

Ces services disposent d'une existence officielle ou d'une base légale, mais leurs plateformes étaient hors ligne le 30 septembre 2026. Les problèmes sont probablement temporaires pour la plupart.

| Service | URL | Problème | Recommandation |
|---------|-----|----------|----------------|
| Passeport en ambassade Paris | rendez-vous.benin-ambassade.fr | **HTTP 403** + paris.diplomatie.bj en maintenance | Garder avec avertissement de maintenance ; renvoyer vers l'ambassade par téléphone |
| Immatriculation consulaire (IC) | rendez-vous.benin-ambassade.fr | **HTTP 403** | Garder (prérequis pour ePass) ; noter que l'inscription se fait en consulat |
| Carte d'identité consulaire | rendez-vous.benin-ambassade.fr | **HTTP 403** | Garder avec avertissement ; tarif 30 € et délai 72h non confirmés |
| Laissez-passer consulaire | rendez-vous.benin-ambassade.fr | **HTTP 403** | Garder avec avertissement ; tarif 16 € non confirmé |
| Certificat de nationalité | justice.gouv.bj | **En maintenance** | Garder ; tarif 1 200 FCFA (timbre fiscal) non confirmé |
| Déclaration de naissance diaspora | idiaspora.service-public.bj | **HTTP 503** | Garder avec avertissement ; vérifier si migration vers service-public.bj |
| Couloir diaspora DEI | dei.gouv.bj | **HTTP 503** | Statut très incertain ; garder avec mention "service en vérification" |
| MonEntreprise.bj (sociétés) | monentreprise.bj | Indisponibilité technique explicite | Garder avec avertissement technique affiché par le site lui-même |
| APIEx / InvestBénin | investbenin.bj | Sous-pages en **404**, accueil accessible | Garder avec contact direct : (+229) 01 52 83 66 66 | apiex.contact@apiex.bj |
| TRADUX | tradux.gouv.bj | Accessible mais contenu vide | Statut opérationnel non confirmé ; garder avec mention "en développement" |

---

## 3. Services à SUPPRIMER ou CORRIGER

Ces services sont soit fondés sur des domaines inexistants, soit des informations qui ont été remplacées par de nouvelles URL.

| Service | Problème | Action |
|---------|----------|--------|
| Vols spéciaux Paris-Cotonou via **benintoursbenin.bj** | Domaine **DNS ENOTFOUND** (inexistant) | **Supprimer** la référence au domaine ; benintours.bj existe mais n'offre pas de vols diaspora |
| Liens vers **benin-ambassade.fr** | Redirige en 301 vers paris.diplomatie.bj | **Corriger** : remplacer tous les liens par paris.diplomatie.bj |
| **CDC Bénin / DIASDEV** (cdc.bj) | DNS error — domaine inexistant | **Supprimer** jusqu'à confirmation d'un nouveau domaine |
| **tourisme.bj** | DNS error — domaine inexistant | **Supprimer** |
| **beninrevelation.bj** | DNS error — domaine inexistant | **Supprimer** |
| **agence-diaspora.gouv.bj** | DNS error — domaine inexistant | **Supprimer** |
| **evisa.gouv.bj** (comme URL de destination) | Redirige vers evisa.bj | **Corriger** : mettre evisa.bj comme URL cible |
| Tarif passeport ambassade Paris (100 €) | Non confirmé, site en maintenance | **Marquer comme non vérifié** jusqu'à retour en ligne |
| Tarif laissez-passer (16 €) et carte consulaire (30 €) | Non confirmés, site 403 | **Marquer comme non vérifiés** |
| Tarif e-Visa (32 798 / 49 197 / 65 596 FCFA) | Pages tarifaires evisa.bj en 404 | **Marquer comme non vérifiés** ou supprimer jusqu'à reconfirmation |

---

## 4. Services MANQUANTS à AJOUTER

Ces services officiels fonctionnels ne figurent probablement pas encore dans la liste existante.

### ePass — À ajouter en priorité absolue

C'est le **service diaspora le plus important lancé en 2025**. Il n'existait pas avant octobre 2025. ([epass.gouv.bj](https://epass.gouv.bj) | [annonce officielle](https://www.gouv.bj/article/3308/lancement-epass-dematerialisation-renouvellement-passeports-beninois-diaspora/))

### ANIP eservices — Tarifs complets à ajouter

Si la page ne détaille pas encore tous les actes disponibles sur [eservices.anip.bj/services-et-couts](https://eservices.anip.bj/services-et-couts), ajouter la grille complète (voir section 1 ci-dessus). En particulier : certificat de célibat (2 000 FCFA), certificats de non-remariage/non-divorce (2 000 FCFA chacun) — utiles pour les mariages mixtes.

### Immatriculation consulaire (IC) — À ajouter comme étape préalable

Ce service doit apparaître clairement comme **prérequis obligatoire pour ePass**. Même si le site est en 403 actuellement, l'IC se fait en présentiel dans les ambassades/consulats béninois. Ajouter une note orientant les utilisateurs vers l'ambassade directement.

### Transcription d'actes civils étrangers via ANIP

L'ANIP propose la transcription des actes de naissance, mariage et décès survenus à l'étranger ([anip.bj](https://anip.bj)). Service important pour la diaspora qui n'est pas nécessairement listé. Tarif non encore affiché dans la grille publique — à demander par contact ANIP.

### Casier judiciaire B3 en ligne

Si absent de la liste actuelle, à ajouter : **1 900 FCFA, 72h, demande 100 % en ligne** via [service-public.bj](https://service-public.bj/public/services/service/PS00373).

---

## 5. Recommandations éditoriales

**Ce qui doit rester sur la page (avec mises à jour) :** Les services ANIP (actes d'état civil, NPI), le casier judiciaire B3, My Afro Origins, l'ANDF (foncier), l'e-Visa (avec URL corrigée vers evisa.bj et tarifs à reverifier). Les services consulaires (passeport en ambassade, laissez-passer, carte d'identité consulaire, immatriculation) doivent rester mais avec un bandeau d'avertissement indiquant que les sites sont temporairement inaccessibles et que la démarche doit se faire par contact direct avec l'ambassade de Paris.

**Ce qui doit être ajouté en priorité :** ePass en tête de liste comme innovation majeure, avec lien vers l'app mobile et la FAQ. La connexion logique NPI → IC → ePass doit être explicitée comme un parcours utilisateur. La grille tarifaire ANIP complète.

**Ce qui doit être supprimé sans délai :** Tous les liens vers benintoursbenin.bj, cdc.bj, tourisme.bj, beninrevelation.bj et agence-diaspora.gouv.bj — ces domaines n'existent plus. Tout lien vers benin-ambassade.fr doit pointer vers paris.diplomatie.bj.

**Ce qui doit être traité avec prudence :** Les tarifs consulaires (passeport 100 €, laissez-passer 16 €, carte consulaire 30 €) ne sont pas confirmés — les afficher comme « tarifs indicatifs, à vérifier directement auprès de l'ambassade » plutôt que comme tarifs officiels. Les tarifs e-Visa en FCFA méritent la même précaution. Le service DIASDEV/CDC n'a aucune base web vérifiable — à supprimer jusqu'à signal officiel.

**Signaux positifs à valoriser :** Le Bénin dispose désormais d'un écosystème numérique public cohérent — ePass, ANIP, service-public.bj, myafroorigins.bj, andf.bj — avec des tarifs publics, des certifications sécurité et un support multicanal (WhatsApp, numéro vert). Ces services méritent une présentation structurée sous forme de « services confirmés en ligne » plutôt qu'une liste plate mêlant fonctionnel et hors ligne.

---

*Sources principales vérifiées : [epass.gouv.bj](https://epass.gouv.bj) · [eservices.anip.bj](https://eservices.anip.bj) · [service-public.bj](https://service-public.bj) · [myafroorigins.bj](https://myafroorigins.bj) · [andf.bj](https://andf.bj) · [evisa.bj](https://evisa.bj) · [gouv.bj](https://www.gouv.bj) · [anip.bj](https://anip.bj)*
