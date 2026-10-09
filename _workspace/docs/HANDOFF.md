# Bénin Flight Watcher — Handoff (13 sept. 2026)

## État du projet : PRODUCTION, OPÉRATIONNEL

Le site alertesvolsbenin.com est en ligne, testé et fonctionnel.

---

## Stack technique

| Composant | Détail |
|-----------|--------|
| Runtime | Cloudflare Worker (`benin-flight-watcher`) |
| Base de données | Cloudflare D1 (`benin-subscribers`) |
| State / KV | Cloudflare KV (`STATE` binding) |
| Fan-out | Cloudflare Queue (`benin-fanout`) |
| Email | Resend API (plan Free — 100 emails/jour) |
| SMS | Twilio — numéro `+14846420520` (US, $1.15/mois) |
| Paiement | PayPal Orders API v2 (mode `live`) |
| Anti-bot | Cloudflare Turnstile |
| Domaine | alertesvolsbenin.com + www.alertesvolsbenin.com → Cloudflare zone active |

---

## Secrets configurés (wrangler secret)

| Secret | Rôle |
|--------|------|
| `ADMIN_SECRET` | `@Kingesp2002` — Bearer token pour les endpoints admin |
| `RESEND_API_KEY` | Clé API Resend |
| `ALERT_EMAIL_FROM` | Adresse expéditrice Resend (vérifiée) |
| `ALERT_EMAIL_TO` | `espoiradouwekonou20@gmail.com` (alertes admin) |
| `PAYPAL_CLIENT_ID` | PayPal live |
| `PAYPAL_CLIENT_SECRET` | PayPal live |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile |
| `TWILIO_ACCOUNT_SID` | `TWILIO_SID_REDACTED` |
| `TWILIO_AUTH_TOKEN` | Token Twilio |
| `TWILIO_FROM_NUMBER` | `+14846420520` (numéro Twilio US acheté) |
| `TWILIO_TO_NUMBER` | Numéro admin Espoir (`+33749590636`) |

---

## Vars (wrangler.toml)

```toml
APP_BASE_URL = "https://alertesvolsbenin.com"
TARGET_URL = "https://www.voyage.benin.bj/"
PAYPAL_MODE = "live"
SUBSCRIPTION_PRICE_DISPLAY = "5,99 €"
SUBSCRIPTION_PRICE_AMOUNT = "5.99"
PLACEHOLDER_MARKERS = "bientôt disponible,sera bientôt,coming soon"
DEEP_ROUTES = "/booking,/vols,/conditions-generales,/reservations,/reservation,/reserver,/flights,/book"
```

---

## Routes disponibles

| Route | Méthode | Description |
|-------|---------|-------------|
| `/` | GET | Page d'accueil (landing) |
| `/inscription` | GET | Formulaire inscription |
| `/subscribe` | POST | Soumission inscription |
| `/api/create-order` | POST | Crée commande PayPal |
| `/api/capture-order` | POST | Capture paiement PayPal |
| `/confirm` | GET | Confirme email (`?token=`) |
| `/unsubscribe` | GET | Désinscription (`?token=`) |
| `/payment-success` | GET | Page succès paiement |
| `/payment-cancel` | GET | Page annulation |
| `/status` | GET | État détection (public) |
| `/admin` | GET | Dashboard admin |
| `/admin/subscribers` | GET (Bearer) | Stats + liste abonnés |
| `/check` | GET (Bearer) | Force un check manuel |
| `/test-notify` | GET (Bearer) | Test email + SMS admin |
| `/test-emails` | GET (Bearer) | Envoie 3 templates (`?to=`) |
| `/reset` | GET (Bearer) | Réarme l'état de surveillance |
| `/cgv` | GET | Conditions Générales de Vente + Mentions légales + RGPD |
| `/mentions-legales` | GET | Alias de /cgv |

---

## Logique de détection (cron toutes les minutes)

1. Fetch `https://www.voyage.benin.bj/`
2. Vérifie si marqueurs placeholder présents (`bientôt disponible`, etc.)
3. Sonde 8 routes profondes en HEAD (cherche un 200)
4. **Confirmation croisée** : marqueur absent + au moins 1 route en 200
5. **Double check** : 2 crons consécutifs positifs → fan-out abonnés
6. **Signal gouvernemental** (RSS, 2x/jour) : si source de confiance → 1 seul check suffit

États : `closed` → `pre_open` → `open_notified`

---

## Fan-out abonnés (Queue Cloudflare)

- Pages de 50 abonnés, auto-chaîné (pagination curseur `confirmed_at + id`)
- Email via Resend batch
- SMS via Twilio (seulement si `sms_consent = 1`)
- SMS personnalisé avec prénom + lien : `https://www.voyage.benin.bj/`
- Salutation selon heure française (Bonjour / Bonsoir)

---

## Twilio — Compte upgradé

- Compte : **payant** (`Active`, $20 de solde)
- Profil Trust Hub : **"Alertes Vols Bénin"** — Individual — **Approved**
- Numéro Twilio : `+14846420520` (US Local, Voice+SMS+MMS, $1.15/mois)
- Auto-recharge : activée (recharge à $20 quand < $10)
- **Pas besoin d'A2P 10DLC** : les SMS vont vers France (+33), pas vers les USA

---

## Validation téléphone

Numéros français uniquement : format `+33` suivi de 9 chiffres.
Validé côté client (inscription.js) et côté serveur (subscribers.js).

---

## Pages légales

- `/cgv` et `/mentions-legales` → page complète CGV + CGU + RGPD
- Liens dans le footer de la landing et de la page d'inscription
- Opérateur affiché : "Alertes Vols Bénin" (nom personnel retiré)
- Politique de remboursement : 14j rétractation + remboursement si pas d'ouverture sous 18 mois

---

## Ce qui reste à faire

### Prioritaire (avant d'avoir beaucoup d'abonnés)
- [ ] **Upgrade Resend** : plan Free → Pro ($20/mois, 50K emails/mois)
  → resend.com/pricing
  → Sans ça : limité à 100 emails/jour — bloquant dès ~100 abonnés

### Tests de validation (quand tu veux)
- [ ] **Test fan-out contenu** : vérifier que l'email et le SMS d'alerte s'affichent bien avec le bon texte et le bon lien
- [ ] **Test idempotence** : déclencher 2 `/check` rapides en état `crossConfirmed` et confirmer qu'une seule notification part

---

## Commandes utiles

```bash
# Vérifier l'état de détection en live
curl https://alertesvolsbenin.com/status

# Stats abonnés
curl -H "Authorization: Bearer @Kingesp2002" https://alertesvolsbenin.com/admin/subscribers

# Tester email + SMS admin
curl -H "Authorization: Bearer @Kingesp2002" https://alertesvolsbenin.com/test-notify

# Envoyer les 3 templates email à une adresse
curl -H "Authorization: Bearer @Kingesp2002" "https://alertesvolsbenin.com/test-emails?to=TON_EMAIL"

# Réarmer la surveillance (après un open_notified)
curl -H "Authorization: Bearer @Kingesp2002" https://alertesvolsbenin.com/reset

# Déployer
npx wrangler deploy

# Voir les logs en live
npx wrangler tail
```

---

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src/index.js` | Router principal + logique de détection + cron |
| `src/notify.js` | Email admin, SMS admin, enqueue fan-out |
| `src/handlers/subscribers.js` | Inscription, paiement, confirm, fanout |
| `src/pages/landing.js` | Page d'accueil |
| `src/pages/inscription.js` | Page formulaire HTML |
| `src/pages/legal.js` | Page CGV / Mentions légales / RGPD |
| `src/pages/emails.js` | Templates email (confirmation, bienvenue, alerte) |
| `src/pages/admin.js` | Dashboard admin SPA |
| `schema.sql` | Schéma D1 + index |
| `wrangler.toml` | Configuration Worker + bindings |
| `.dev.vars` | Secrets locaux (non déployé) |
