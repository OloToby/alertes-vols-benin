-- Bénin Flight Watcher — D1 schema v3 (profil complet, sans paiement automatisé)
-- Fresh install : wrangler d1 execute benin-subscribers --file=schema.sql
-- Mise à jour d'une DB existante : wrangler d1 execute benin-subscribers --file=migrations/v3_profile.sql

CREATE TABLE IF NOT EXISTS subscribers (
  id           TEXT    PRIMARY KEY,               -- UUID v4
  email        TEXT    NOT NULL UNIQUE,
  phone        TEXT,                              -- E.164 (+33...)
  civility     TEXT,                              -- 'M' | 'Mme' | NULL (non précisé)
  first_name   TEXT,
  last_name    TEXT,
  sms_consent  INTEGER NOT NULL DEFAULT 0,        -- 1 = accord SMS explicite
  status       TEXT    NOT NULL DEFAULT 'pending', -- pending | confirmed | unsubscribed
  token        TEXT    NOT NULL UNIQUE,           -- UUID v4, confirm + unsubscribe
  created_at   TEXT    NOT NULL,                  -- ISO 8601
  confirmed_at TEXT                               -- NULL jusqu'à confirmation
);

CREATE INDEX IF NOT EXISTS idx_sub_status  ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_sub_token   ON subscribers(token);
CREATE INDEX IF NOT EXISTS idx_sub_email   ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_sub_fanout  ON subscribers(status, confirmed_at, id);
