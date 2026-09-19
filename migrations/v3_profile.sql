-- Migration v3 : ajout du profil complet (sans colonnes Stripe)
-- Appliquer sur une DB existante :
--   wrangler d1 execute benin-subscribers --file=migrations/v3_profile.sql

ALTER TABLE subscribers ADD COLUMN civility    TEXT;
ALTER TABLE subscribers ADD COLUMN first_name  TEXT;
ALTER TABLE subscribers ADD COLUMN last_name   TEXT;
ALTER TABLE subscribers ADD COLUMN sms_consent INTEGER NOT NULL DEFAULT 0;
