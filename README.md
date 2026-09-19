# Bénin Flight Watcher

Surveille `voyage.benin.bj` et alerte les abonnés dès que les réservations de vols charters Bénin ouvrent. Conçu pour la diaspora béninoise (Canada, USA, Gabon, France) qui a raté l'ouverture éclair de décembre 2025.

Tourne sur **Cloudflare Workers** (gratuit, 24/7, aucun serveur à gérer).

---

## Architecture

```
┌─────────────┐   cron */1 min   ┌──────────────────┐
│ voyage.     │ ◄──── fetch ───── │  Cloudflare       │
│ benin.bj    │                   │  Worker           │
└─────────────┘                   │  (src/index.js)   │
                                  └────────┬──────────┘
                                           │
                        ┌──────────────────┼──────────────────┐
                        ▼                  ▼                  ▼
                   KV (STATE)         D1 (subscribers)   Queue (fanout)
                   état, hashes       email, phone       messages abonnés
                   historique         statut, token      auto-chaînage 50/page
```

### Fichiers source

| Fichier | Rôle |
|---|---|
| `src/index.js` | Worker principal : détection, machine à états, veille RSS, endpoints admin |
| `src/notify.js` | Notifications admin (ntfy + Resend email + Twilio SMS) et mise en Queue |
| `src/subscribers.js` | Inscription, confirmation, désinscription, fan-out Queue consumer |
| `src/comment-images.js` | Images base64 pour la landing page |
| `schema.sql` | Schéma D1 (table subscribers) |
| `migrations/` | Scripts de migration D1 (v2 paiement, v3 profil) |
| `wrangler.toml` | Configuration Cloudflare (crons, bindings, variables) |

---

## Comment la détection fonctionne

### Cross-confirmation (deux signaux indépendants)

Le fan-out abonnés ne se déclenche que si **deux conditions sont vraies simultanément** :
1. Le marqueur "bientôt disponible" a disparu de la page
2. Au moins une route de réservation (`/booking`, `/vols`, `/conditions-generales`, etc.) répond HTTP 200

Un seul signal (redesign sans réservation, ou route en 200 avec marqueur encore présent) ne déclenche pas le fan-out.

### Confirmation temporelle (deux checks consécutifs)

Même avec les deux signaux positifs, le système attend un **deuxième check positif** une minute plus tard avant d'alerter les abonnés. Si le signal disparaît entre-temps (glitch réseau, maintenance), le système revient en surveillance sans rien envoyer.

**Exception** : si une source gouvernementale de confiance (domaine `.gouv.bj`) a publié une annonce pertinente (détectée via RSS), un seul check positif suffit.

### Machine à 4 états

```
closed ──► watching ──► pre_open ──► open_notified
  ▲            │            │
  └────────────┘            │
  └─────────────────────────┘
```

- **closed** : état normal, marqueur présent, site fermé
- **watching** : marqueur absent mais routes en 404 (possible redesign)
- **pre_open** : cross-confirmation positive, en attente du 2e check
- **open_notified** : fan-out envoyé, surveillance terminée jusqu'au `/reset`

Toutes les transitions sont réversibles : si le signal disparaît, l'état revient en arrière.

### Garde fan-out (safeFanout)

Avant chaque envoi, `safeFanout` relit l'état KV pour vérifier que le fan-out n'a pas déjà été envoyé. Ne throw jamais. L'état `open_notified` n'est écrit que si l'envoi a réellement réussi.

---

## Prérequis

1. Compte [Cloudflare](https://dash.cloudflare.com/sign-up) (gratuit)
2. Node.js installé
3. Topic [ntfy.sh](https://ntfy.sh) (gratuit, push mobile)
4. Compte [Resend](https://resend.com) (gratuit, 100 emails/jour)
5. Compte [Twilio](https://www.twilio.com) (payant, ~0.08 EUR/SMS)

## Installation

```bash
cd benin-flight-watcher
npm install
npx wrangler login
```

## Créer les bindings

```bash
npx wrangler kv namespace create STATE
npx wrangler d1 create benin-subscribers
npx wrangler d1 execute benin-subscribers --file=schema.sql
npx wrangler queues create benin-fanout
```

Mettre les IDs retournés dans `wrangler.toml`.

## Configurer les secrets

```bash
npx wrangler secret put ADMIN_SECRET
npx wrangler secret put NTFY_TOPIC
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put ALERT_EMAIL_FROM
npx wrangler secret put ALERT_EMAIL_TO
npx wrangler secret put TWILIO_ACCOUNT_SID
npx wrangler secret put TWILIO_AUTH_TOKEN
npx wrangler secret put TWILIO_FROM_NUMBER
npx wrangler secret put TWILIO_TO_NUMBER
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_CLIENT_SECRET
```

> Seuls `ADMIN_SECRET` et `RESEND_API_KEY` + `ALERT_EMAIL_FROM` sont requis. Les autres canaux (ntfy, SMS) sont activés automatiquement si leurs secrets sont définis.

## Déployer

```bash
npx wrangler deploy
```

Deux crons démarrent automatiquement :
- **`*/1 * * * *`** : vérification du site chaque minute
- **`0 6,18 * * *`** : veille RSS gouvernementale (2x/jour)

## Endpoints

| Endpoint | Auth | Description |
|---|---|---|
| `/` | Non | Landing page abonnés |
| `/status` | Non | Dernier run + état courant |
| `/check` | Bearer | Force une vérification immédiate |
| `/test-notify` | Bearer | Teste les canaux admin (ntfy/email/SMS) |
| `/reset` | Bearer | Réarme la surveillance (`closed`, signaux effacés) |
| `/admin` | Bearer | Page admin |
| `/admin/subscribers` | Bearer | Statistiques abonnés |

```bash
curl -H "Authorization: Bearer <ADMIN_SECRET>" https://<worker-url>/check
```

## Variables configurables (wrangler.toml)

| Variable | Description | Défaut |
|---|---|---|
| `TARGET_URL` | Page à surveiller | `https://www.voyage.benin.bj/` |
| `PLACEHOLDER_MARKERS` | Phrases marqueur (séparées par `,`) | `bientôt disponible,sera bientôt,coming soon` |
| `DEEP_ROUTES` | Routes à sonder pour cross-confirmation (séparées par `,`) | `/booking,/vols,/conditions-generales,...` |
| `GOV_RSS_URL` | Flux RSS pour la veille gouvernementale | Google News |

`DEEP_ROUTES` et `PLACEHOLDER_MARKERS` sont modifiables sans changer le code — juste `wrangler.toml` + `npx wrangler deploy`.

## Développement local

```bash
npx wrangler dev
```

Le KV, D1 et Queue sont simulés localement. Pour déclencher un cron manuellement :

```bash
curl http://localhost:8787/cdn-cgi/local/scheduled
```

## Coût réel

| Service | Coût |
|---|---|
| Cloudflare Workers | Gratuit (large marge sous 100k req/jour) |
| Cloudflare D1 | Gratuit (5M lectures/jour) |
| Cloudflare Queue | Gratuit (1M messages/mois) |
| ntfy.sh | Gratuit |
| Resend | Gratuit (100 emails/jour) |
| Twilio | ~0.08 EUR/SMS |
