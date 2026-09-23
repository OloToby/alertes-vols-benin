-- v4: Analytics first-party — aucun outil tiers
CREATE TABLE IF NOT EXISTS analytics_events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id   TEXT    NOT NULL,        -- SHA256(ip+date)[:12], reset quotidien
  event_name   TEXT    NOT NULL,        -- page_view | form_error | payment_initiated | …
  page         TEXT,                    -- pathname : '/', '/inscription', …
  metadata     TEXT,                    -- JSON optionnel : {field, code, v, …}
  country      TEXT,                    -- CF-IPCountry (2 lettres)
  device       TEXT,                    -- mobile | tablet | desktop | unknown
  browser      TEXT,                    -- Chrome | Safari | Firefox | Edge | Other
  referrer_type TEXT,                   -- direct | facebook | whatsapp | google | …
  created_at   TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ae_event_date  ON analytics_events(event_name, created_at);
CREATE INDEX IF NOT EXISTS idx_ae_session     ON analytics_events(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ae_date        ON analytics_events(created_at);
