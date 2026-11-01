// Penyimpanan sesi: satu tabel SQLite, kunci = kode sesi, nilai = daftar kode hasil (JSON)
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export const MAX_RESULTS = 500;
const SESSION_RE = /^[A-Z0-9-]{3,32}$/;
const RESULT_RE = /^NEG1\.[A-Za-z0-9_-]{10,4000}$/;

const DB_PATH = resolve(process.env.DB_PATH || './data/negprof.db');
mkdirSync(dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(`PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS sessions (
  code    TEXT PRIMARY KEY,
  results TEXT NOT NULL DEFAULT '[]'
);`);

const qGet = db.prepare('SELECT results FROM sessions WHERE code = ?');
const qSet = db.prepare(`INSERT INTO sessions (code, results) VALUES (?, ?)
  ON CONFLICT(code) DO UPDATE SET results = excluded.results`);

export const normalizeSession = s => String(s || '').trim().toUpperCase().replace(/\s+/g, '-');
export const validSession = s => SESSION_RE.test(s);

// Kode hasil = 'NEG1.' + base64url(JSON [nama, unit, ...skor]); format sama dengan encode() di public/js/scoring.js
export function decodeResult(code) {
  if (!RESULT_RE.test(code)) return null;
  try {
    const a = JSON.parse(Buffer.from(code.slice(5), 'base64url').toString('utf8'));
    if (!Array.isArray(a) || a.length !== 7 || typeof a[0] !== 'string' || typeof a[1] !== 'string') return null;
    return a;
  } catch { return null; }
}
const identity = code => { const a = decodeResult(code); return (a[0].trim() + '\u0000' + a[1].trim()).toLowerCase(); };

export function getResults(session) {
  const row = qGet.get(session);
  return row ? JSON.parse(row.results) : [];
}

function tx(fn) {
  db.exec('BEGIN IMMEDIATE');
  try { const r = fn(); db.exec('COMMIT'); return r; } catch (e) { db.exec('ROLLBACK'); throw e; }
}

// Tambahkan hasil; hasil dengan nama+unit yang sama menggantikan entri lama
export function upsertResults(session, codes) {
  return tx(() => {
    const list = getResults(session);
    let added = 0, replaced = 0;
    for (const code of codes) {
      if (list.includes(code)) continue;
      const id = identity(code);
      const i = list.findIndex(c => identity(c) === id);
      if (i >= 0) { list[i] = code; replaced++; }
      else { list.push(code); added++; }
    }
    if (list.length > MAX_RESULTS) throw Object.assign(new Error(`Maksimal ${MAX_RESULTS} hasil per sesi`), { status: 413 });
    qSet.run(session, JSON.stringify(list));
    return { count: list.length, added, replaced };
  });
}

// Ganti seluruh daftar (penyuntingan oleh fasilitator); duplikat persis dibuang
export function setResults(session, codes) {
  const list = [...new Set(codes)];
  if (list.length > MAX_RESULTS) throw Object.assign(new Error(`Maksimal ${MAX_RESULTS} hasil per sesi`), { status: 413 });
  qSet.run(session, JSON.stringify(list));
  return { count: list.length };
}
