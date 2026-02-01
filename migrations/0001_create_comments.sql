-- Cloudflare D1: Comments table for anonymous comments
-- Run with: wrangler d1 execute <database-name> --remote --file=./migrations/0001_create_comments.sql

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);
