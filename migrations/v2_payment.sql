-- Migration v2 : ajout du paiement et du profil complet
-- Appliquer sur une DB existante :
--   wrangler d1 execute benin-subscribers --file=migrations/v2_payment.sql
--
-- NOTE : les colonnes stripe_* et payment_status/paid_at ont été ajoutées quand
-- Stripe était envisagé comme prestataire de paiement. Le projet utilise maintenant
-- PayPal (gestion via KV + PayPal API v2). Ces colonnes ne sont plus lues ni
-- écrites par le code — elles restent en base pour ne pas casser les déploiements
-- existants, mais peuvent être ignorées dans les nouvelles installations.
-- La migration v3 (v3_profile.sql) n'ajoute plus ces colonnes.

ALTER TABLE subscribers ADD COLUMN civility                 TEXT;
ALTER TABLE subscribers ADD COLUMN first_name               TEXT;
ALTER TABLE subscribers ADD COLUMN last_name                TEXT;
ALTER TABLE subscribers ADD COLUMN sms_consent              INTEGER NOT NULL DEFAULT 0;
ALTER TABLE subscribers ADD COLUMN payment_status           TEXT    NOT NULL DEFAULT 'unpaid'; -- inutilisé (PayPal via KV)
ALTER TABLE subscribers ADD COLUMN stripe_session_id        TEXT;                              -- inutilisé (Stripe abandonné)
ALTER TABLE subscribers ADD COLUMN stripe_payment_intent_id TEXT;                              -- inutilisé (Stripe abandonné)
ALTER TABLE subscribers ADD COLUMN paid_at                  TEXT;                              -- inutilisé

CREATE INDEX IF NOT EXISTS idx_sub_payment ON subscribers(payment_status);
CREATE INDEX IF NOT EXISTS idx_sub_stripe  ON subscribers(stripe_payment_intent_id);
