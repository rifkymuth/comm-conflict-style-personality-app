# Profil Gaya Negosiasi

Aplikasi tes kepribadian untuk pelatihan internal: mengukur **gaya komunikasi** dan
**gaya menghadapi konflik** peserta (Big Five, Social Styles, dual-concern, lapis NLP).
Seluruh antarmuka dalam Bahasa Indonesia.

Empat tab:

1. **Isi Tes** — peserta mengisi identitas, **kode sesi**, dan 61 pernyataan.
2. **Hasil Saya** — hasil individu; *kode hasil* otomatis dikirim ke sesi saat menekan "Lihat hasil".
   Tombol "Simpan PDF" membuka dialog cetak browser (pilih *Simpan sebagai PDF*).
3. **Rekap Tim** — fasilitator memuat semua hasil sesi dengan kode sesi (atau menempel kode manual),
   lalu bisa menyimpan rekap sebagai PDF.
4. **Metodologi** — dasar ilmiah dan batasan penggunaan tes.

## Arsitektur

```
public/               frontend statis
  index.html          markup
  css/styles.css      gaya
  js/data.js          butir tes & tabel interpretasi
  js/scoring.js       perhitungan skor, encode/decode kode hasil (NEG1.…)
  js/api.js           pemanggil API sesi
  js/app.js           tampilan, tab, rekap tim
server/
  server.js           server Node (node:http) — menyajikan public/ + API
  db.js               SQLite (node:sqlite) — tabel sessions(code, results)
```

Tanpa dependensi npm; butuh **Node ≥ 22.13** (disarankan Node 24). Perhitungan skor tetap
di browser; server hanya menyimpan daftar kode hasil per kode sesi:

```sql
sessions(code TEXT PRIMARY KEY, results TEXT)  -- results = JSON ["NEG1.…", …]
```

Alur sesi:

1. Fasilitator memilih kode sesi apa pun (atau "Buat kode acak") di tab Rekap Tim, lalu
   membagikan kode / "tautan peserta" (`https://domain/?s=KODE`). Sesi dibuat otomatis saat
   hasil pertama masuk.
2. Peserta mengisi tes; saat menekan "Lihat hasil", kode hasilnya dikirim ke sesi. Mengirim
   ulang dengan nama + unit yang sama **menggantikan** hasil lama.
3. Fasilitator menekan "Muat dari sesi". Kode yang dikirim manual bisa ditempel di kotak teks
   lalu "Simpan ke sesi" (juga untuk menghapus entri yang salah).

## API

Kode sesi: huruf, angka, dan `-`, 3–32 karakter, tidak peka huruf besar/kecil.

| Metode & path | Isi | Keterangan |
|---|---|---|
| `GET /api/sessions/:kode` | – | `{code, results:[…]}` (kosong bila sesi baru) |
| `GET /api/sessions/:kode?format=text` | – | teks biasa, satu kode hasil per baris (siap salin-tempel) |
| `POST /api/sessions/:kode/results` | JSON `{result}` / `{results:[…]}` **atau** teks bebas berisi kode `NEG1.` | tambah/ganti hasil → `{code, count, added, replaced}` |
| `PUT /api/sessions/:kode` | sama seperti POST | ganti seluruh daftar → `{code, count}` |
| `GET /healthz` | – | `ok` |

Contoh menempel kode dari WhatsApp langsung ke sesi:

```sh
curl -X POST -H "Content-Type: text/plain" --data-binary @kode.txt https://domain/api/sessions/K7M2QX/results
curl https://domain/api/sessions/K7M2QX?format=text
```

Batas: 500 hasil per sesi, isi permintaan maks. 256 KB.

## Menjalankan lokal

```sh
npm start            # atau: node server/server.js
# buka http://localhost:3000
```

Variabel lingkungan: `PORT` (bawaan `3000`), `DB_PATH` (bawaan `./data/negprof.db`).

## Mode uji coba (`?demo`)

Secara bawaan ini adalah **versi produksi**: tombol bantu demo tersembunyi.

- Buka `/` → produksi (tombol "Isi jawaban acak" dan "Muat data contoh" tidak tampil).
- Buka `/?demo` → tombol demo muncul dan tab Rekap Tim memuat 8 peserta contoh,
  berguna untuk QA/peragaan.

## Menjalankan dengan Docker

```sh
docker compose up --build
# atau
docker build -t negprof .
docker run --rm -p 3000:3000 -v negprof-data:/data negprof
```

`docker-compose.yml` sengaja hanya memakai `expose` (untuk proxy Coolify), sehingga port tidak
terbuka ke host. Untuk lokal, `docker-compose.override.yml` otomatis digabungkan oleh
`docker compose up` dan memublikasikan port ke http://localhost:3000 (ubah dengan
`HOST_PORT=8080 docker compose up`).

Basis data SQLite ada di `/data/negprof.db` di dalam kontainer; **selalu pasang volume** ke
`/data` agar hasil tidak hilang saat kontainer dibuat ulang.

## Deploy dengan Coolify

**Cara yang disarankan — Build Pack: Docker Compose**

1. Di Coolify: **+ New** → **Application** → pilih sumber Git repositori ini.
2. **Build Pack:** pilih **Docker Compose** (Base Directory `/`).
3. Isi **Domain**. Coolify mengarahkan domain ke port **3000** yang di-`expose` di compose.
4. Volume `negprof-data` dari compose otomatis dibuat sebagai penyimpanan persisten.
5. **Deploy.**

**Alternatif — Build Pack: Dockerfile**

1. **Build Pack:** **Dockerfile** · **Dockerfile Location:** `/Dockerfile` · **Base Directory:** `/`.
2. **Ports Exposes:** `3000`.
3. Tambahkan **Persistent Storage** dengan *destination path* `/data`.
4. Isi **Domain**, lalu **Deploy.**

> Migrasi dari versi nginx sebelumnya: ubah port aplikasi di Coolify dari `80` ke `3000`.

## Catatan

- Font dimuat dari Google Fonts (CDN). Bila jaringan tanpa internet, tampilan otomatis beralih
  ke font sistem tanpa mengubah tata letak.
- Jawaban butir hanya tersimpan di browser peserta. Server hanya menyimpan kode hasil (nama,
  unit, skor). Siapa pun yang mengetahui kode sesi dapat melihat hasil sesi itu, jadi bagikan
  kode hanya kepada peserta pelatihan dan pakai kode yang sulit ditebak (mis. "Buat kode acak").
