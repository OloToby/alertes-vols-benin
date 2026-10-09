# Services officiels béninois — Voyage et documents de voyage (diaspora)

> Recherche effectuée le 2026-09-30. Sources : tentatives de fetch direct sur les sites officiels béninois. Nombre d'appels d'outils utilisés : ~15.

---

## 1. Vols spéciaux Paris-Cotonou (Bénin Tours S.A. / gouvernement)

### Takeaway
Aucune édition 2025-2026 annoncée n'a pu être trouvée. Le domaine benintoursbenin.bj n'existe pas ; benintours.bj est un opérateur touristique intérieur sans offre de vols diaspora.

### Cited Findings
- Le domaine **benintoursbenin.bj** n'existe pas (DNS inexistant). — [Tentative de fetch : benintoursbenin.bj] (echec ENOTFOUND)
- **benintours.bj** existe et se présente comme « l'opérateur touristique officiel du Bénin » spécialisé en circuits intérieurs, sans aucune offre de vol Paris-Cotonou ni de programme diaspora. — [benintours.bj](https://www.benintours.bj)
- Aucune annonce de vol spécial Paris-Cotonou n'a été détectée sur gouv.bj ni sur paris.diplomatie.bj. — [gouv.bj](https://www.gouv.bj) ; [paris.diplomatie.bj](https://paris.diplomatie.bj)

### Inferences
- Le programme de vols spéciaux diaspora, s'il existe, n'est pas annoncé via les canaux officiels web en ligne au moment de la recherche, ou passe par des canaux hors-ligne (ambassade, associations diaspora).
- benintours.bj pourrait être le prestataire officiel mais ne propose pas de vente de billets en ligne.

### Gaps
- Impossible de confirmer l'existence ou non d'une prochaine édition de vols spéciaux ; aucune source officielle datée 2025-2026 trouvée.
- Le tarif (prix billet) et le canal de réservation officiel restent non vérifiés.
- Il n'est pas clair si ce service a déjà existé sous cette forme ou relève d'une annonce passée.

---

## 2. Laissez-passer consulaire (Ambassade Paris — rendez-vous.benin-ambassade.fr)

### Takeaway
Le domaine benin-ambassade.fr est redirigé vers paris.diplomatie.bj (301 Moved Permanently). Le sous-domaine rendez-vous.benin-ambassade.fr retourne HTTP 403 Forbidden, ce qui indique qu'il est soit restreint, soit inaccessible publiquement. Les tarifs et délais indiqués (16 €, 72h) ne peuvent pas être confirmés directement.

### Cited Findings
- **www.benin-ambassade.fr** redirige en 301 vers **https://paris.diplomatie.bj/** — [benin-ambassade.fr](https://www.benin-ambassade.fr) → [paris.diplomatie.bj](https://paris.diplomatie.bj)
- **rendez-vous.benin-ambassade.fr** retourne HTTP **403 Forbidden** : le système de prise de rendez-vous en ligne est inaccessible via fetch public. — [rendez-vous.benin-ambassade.fr](https://rendez-vous.benin-ambassade.fr) (echec HTTP 403)
- Le site **paris.diplomatie.bj** est accessible mais son contenu textuel est essentiellement constitué de SVG/images encodées en base64, ce qui empêche l'extraction des tarifs et procédures par fetch automatisé. — [paris.diplomatie.bj](https://paris.diplomatie.bj)

### Inferences
- La migration de benin-ambassade.fr vers paris.diplomatie.bj est officielle et semble récente. Les anciens bookmarks et liens vers benin-ambassade.fr fonctionnent toujours via la redirection.
- Le 403 sur rendez-vous.benin-ambassade.fr peut indiquer : (a) système nécessitant une authentification préalable, (b) migration du système de RDV vers paris.diplomatie.bj non encore complète, ou (c) restriction géographique/IP.

### Gaps
- Le tarif exact du laissez-passer consulaire (16 € annoncé) n'a pas pu être confirmé via source officielle accessible.
- Le délai de 72h n'a pas pu être confirmé.
- Il n'est pas établi si le système de RDV en ligne est réellement opérationnel ou suspendu.

---

## 3. Couloir diaspora DEI Cotonou (dei.gouv.bj)

### Takeaway
Le site dei.gouv.bj retourne HTTP 503 Service Unavailable avec un header Retry-After: 3600, ce qui indique que le service est techniquement hors ligne au moment de la recherche. Son existence en tant que service officiel ne peut pas être confirmée.

### Cited Findings
- **dei.gouv.bj** retourne HTTP **503 Service Unavailable** (Retry-After: 3600) — site inaccessible. — [dei.gouv.bj](https://dei.gouv.bj) (echec HTTP 503)
- Même comportement 503 observé pour **dei.gouv.bj/couloir-diaspora** (sous-page). — [dei.gouv.bj/couloir-diaspora](https://dei.gouv.bj/couloir-diaspora) (echec HTTP 503)
- Aucune mention de ce service n'a été trouvée sur gouv.bj ni paris.diplomatie.bj.

### Inferences
- Le 503 peut être temporaire (maintenance) ou permanent (service suspendu/en migration).
- L'absence de mention sur les autres sites officiels interroge l'existence opérationnelle de ce service.

### Gaps
- Il est impossible de confirmer si ce service (couloir diaspora DEI) existe réellement comme service opérationnel ou s'il s'agit d'un projet non encore déployé.
- Les documents requis, la procédure d'accès et les conditions d'éligibilité restent totalement inconnus.

---

## 4. e-Visa pour proches étrangers (evisa.gouv.bj / evisa.bj)

### Takeaway
Le domaine evisa.gouv.bj redirige vers evisa.bj (301), indiquant une migration de plateforme. Le site evisa.bj est partiellement fonctionnel : les formulaires de demande existent, une page sur les coûts des visas est référencée, mais les tarifs précis en FCFA n'ont pas pu être extraits. La loi 2025-15 n'a pas été confirmée.

### Cited Findings
- **evisa.gouv.bj** redirige en 301 vers **https://evisa.bj/** — migration officielle de domaine confirmée. — [evisa.gouv.bj](https://evisa.gouv.bj) → [evisa.bj](https://evisa.bj)
- **evisa.bj** est accessible avec des formulaires de demande de visa et de suivi de dossier. Une page intitulée « Les coûts des visas d'entrée au Bénin » est référencée dans les articles du site. — [evisa.bj](https://evisa.bj)
- Les formulaires du site utilisent un chargement dynamique (mention « Loading... ») qui empêche l'extraction automatique des données tarifaires. — [evisa.bj](https://evisa.bj)
- Une page sur les pays exemptés de visa (« Voyager sans visa (pays exemptés) ») est disponible sur evisa.bj. — [evisa.bj](https://evisa.bj)
- Les URLs spécifiques aux articles de tarifs (/fr/couts-des-visas, /fr/article/les-couts-des-visas-d-entree-au-benin, etc.) retournent toutes HTTP 404. — [evisa.bj articles](https://evisa.bj/fr/couts-des-visas) (echec HTTP 404)

### Inferences
- Les tarifs annoncés dans la question (32 798 FCFA / 30j 1 entrée, 49 197 FCFA / 30j multi, 65 596 FCFA / 90j multi) sont plausibles étant donné le contexte de la plateforme, mais n'ont pas pu être confirmés par source directe.
- La migration de evisa.gouv.bj vers evisa.bj peut avoir modifié les tarifs ou les structures de pages.

### Gaps
- Les tarifs exacts en FCFA (et leur conversion en EUR) n'ont pas pu être extraits depuis une source officielle accessible.
- La loi 2025-15 n'a pas pu être confirmée — aucune mention trouvée sur les sites officiels accessibles.
- Les délais de traitement exacts ne sont pas confirmés.

---

## 5. Diaspora Tour / consulats itinérants (paris.diplomatie.bj)

### Takeaway
Aucune annonce d'une édition 2025 ou 2026 du Diaspora Tour n'a été trouvée sur paris.diplomatie.bj ni sur aucun autre site officiel consulté. Le site paris.diplomatie.bj est accessible mais son contenu est difficile à extraire automatiquement.

### Cited Findings
- **paris.diplomatie.bj** est accessible (HTTP 200) mais le contenu de la page d'accueil est constitué essentiellement d'images SVG encodées, sans texte extractible sur les services ou actualités. — [paris.diplomatie.bj](https://paris.diplomatie.bj)
- Les sous-pages /actualites/, /diaspora-tour/, /services-consulaires/, /laissez-passer/, /inscription-diaspora-tour/ retournent toutes HTTP 404. — Fetches directs (echecs HTTP 404)
- Aucune mention de dates, villes ou programme pour un Diaspora Tour 2025-2026 n'a été trouvée sur gouv.bj. — [gouv.bj](https://www.gouv.bj)

### Inferences
- Le site paris.diplomatie.bj est probablement un WordPress ou CMS avec une structure de URLs différente de celle testée, ce qui explique les 404.
- L'absence d'annonce visible ne signifie pas que le Diaspora Tour n'existe pas, mais qu'il n'est pas annoncé via les canaux web officiels détectables.

### Gaps
- Impossible de confirmer s'il y a une édition 2025 ou 2026 annoncée, et si oui, les dates et villes.
- Le programme Diaspora Tour (éditions passées) n'a pas pu être vérifié.

---

## 6. Autres services voyage non listés

### Takeaway
Aucun service supplémentaire officiel de voyage/transport/accueil pour la diaspora n'a pu être identifié au-delà de ceux déjà listés, d'après les sites officiels accessibles.

### Cited Findings
- **agence-diaspora.gouv.bj** : domaine inexistant (DNS ENOTFOUND). — tentative fetch (echec ENOTFOUND)
- **benintours.bj** se présente comme opérateur touristique officiel (circuits intérieurs) mais sans services spécifiques diaspora détectés. — [benintours.bj](https://www.benintours.bj)
- Le site **gouv.bj** ne mentionne pas de service de transport ou d'accueil diaspora sur sa page principale. — [gouv.bj](https://www.gouv.bj)

### Inferences
- Il n'existe pas de portail unique regroupant tous les services diaspora au Bénin accessible publiquement via web.

### Gaps
- Des services pourraient exister sous d'autres ministères (tourisme, transport) non consultés.
- Des services communiqués uniquement via réseaux sociaux (Facebook, WhatsApp) ou associations diaspora n'ont pas pu être vérifiés.

---

## Résumé de disponibilité des sites officiels (au 2026-09-30)

| Site | Statut | Remarque |
|------|--------|----------|
| paris.diplomatie.bj | ✅ Accessible (HTTP 200) | Contenu difficile à extraire (SVG) |
| evisa.bj | ✅ Accessible (HTTP 200) | Migration depuis evisa.gouv.bj ; contenu dynamique |
| evisa.gouv.bj | ↪️ Redirige vers evisa.bj | Redirection 301 permanente |
| www.benin-ambassade.fr | ↪️ Redirige vers paris.diplomatie.bj | Redirection 301 permanente |
| rendez-vous.benin-ambassade.fr | ❌ HTTP 403 Forbidden | Inaccessible publiquement |
| dei.gouv.bj | ❌ HTTP 503 Unavailable | Hors ligne ou en maintenance |
| benintoursbenin.bj | ❌ DNS ENOTFOUND | Domaine inexistant |
| benintours.bj | ✅ Accessible | Opérateur touristique intérieur uniquement |
| agence-diaspora.gouv.bj | ❌ DNS ENOTFOUND | Domaine inexistant |
