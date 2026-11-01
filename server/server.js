// Server ringan tanpa dependensi: menyajikan public/ dan API sesi di /api
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getResults, upsertResults, setResults, decodeResult, normalizeSession, validSession } from './db.js';

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC = fileURLToPath(new URL('../public/', import.meta.url));
const MAX_BODY = 256 * 1024;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.png': 'image/png', '.json': 'application/json',
};

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }

function send(res, status, body, type = 'application/json; charset=utf-8', headers = {}) {
  const data = typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', ...headers });
  res.end(data);
}

async function readBody(req) {
  let size = 0; const chunks = [];
  for await (const c of req) {
    size += c.length;
    if (size > MAX_BODY) throw new HttpError(413, 'Isi permintaan terlalu besar');
    chunks.push(c);
  }
  return Buffer.concat(chunks).toString('utf8');
}

// Terima JSON {result} / {results:[...]} atau teks bebas hasil copy-paste berisi kode NEG1
async function readCodes(req) {
  const raw = await readBody(req);
  let codes;
  if ((req.headers['content-type'] || '').includes('application/json')) {
    let body;
    try { body = JSON.parse(raw || '{}'); } catch { throw new HttpError(400, 'JSON tidak valid'); }
    codes = body.results ?? (body.result != null ? [body.result] : null);
    if (!Array.isArray(codes)) throw new HttpError(400, 'Kirim "result" atau "results"');
    codes = codes.map(c => String(c).trim());
  } else {
    codes = raw.match(/NEG1\.[A-Za-z0-9_-]+/g) || [];
  }
  const bad = codes.filter(c => !decodeResult(c));
  if (bad.length) throw new HttpError(400, `Kode hasil tidak valid: ${bad[0].slice(0, 40)}`);
  return codes;
}

async function handleApi(req, res, url) {
  const m = url.pathname.match(/^\/api\/sessions\/([^/]+)(\/results)?\/?$/);
  if (!m) throw new HttpError(404, 'Tidak ditemukan');
  const session = normalizeSession(decodeURIComponent(m[1]));
  if (!validSession(session)) throw new HttpError(400, 'Kode sesi hanya huruf, angka, dan tanda hubung (3–32 karakter)');
  const route = req.method + (m[2] ? ' results' : ' session');

  switch (route) {
    case 'GET session': {
      const results = getResults(session);
      if (url.searchParams.get('format') === 'text') return send(res, 200, results.join('\n') + (results.length ? '\n' : ''), 'text/plain; charset=utf-8');
      return send(res, 200, { code: session, results });
    }
    case 'POST results': {
      const codes = await readCodes(req);
      if (!codes.length) throw new HttpError(400, 'Tidak ada kode hasil NEG1 yang ditemukan');
      return send(res, 200, { code: session, ...upsertResults(session, codes) });
    }
    case 'PUT session':
      return send(res, 200, { code: session, ...setResults(session, await readCodes(req)) });
    default:
      throw new HttpError(405, 'Metode tidak didukung');
  }
}

async function serveStatic(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') throw new HttpError(405, 'Metode tidak didukung');
  let path;
  try { path = decodeURIComponent(url.pathname); } catch { throw new HttpError(400, 'URL tidak valid'); }
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(PUBLIC, path));
  if (!file.startsWith(PUBLIC.endsWith(sep) ? PUBLIC : PUBLIC + sep)) throw new HttpError(404, 'Tidak ditemukan');
  let data;
  try { data = await readFile(file); } catch { throw new HttpError(404, 'Tidak ditemukan'); }
  const ext = extname(file);
  send(res, 200, req.method === 'HEAD' ? '' : data, MIME[ext] || 'application/octet-stream',
    { 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=300' });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname === '/healthz') return send(res, 200, 'ok', 'text/plain');
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    await serveStatic(req, res, url);
  } catch (e) {
    const status = e.status || 500;
    if (status === 500) console.error(e);
    if (!res.headersSent) send(res, status, { error: status === 500 ? 'Kesalahan server' : e.message });
  }
});

server.listen(PORT, () => console.log(`negprof berjalan di http://localhost:${PORT}`));
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => server.close(() => process.exit(0)));
