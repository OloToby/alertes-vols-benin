CREATE TABLE IF NOT EXISTS diaspora_searches (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  query       TEXT    NOT NULL,
  result_count INTEGER DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_ds_query ON diaspora_searches(query);
