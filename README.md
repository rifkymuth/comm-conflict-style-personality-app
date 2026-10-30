# Profil Gaya Negosiasi

Aplikasi tes kepribadian untuk pelatihan internal: mengukur **gaya komunikasi** dan
**gaya menghadapi konflik** peserta (Big Five, Social Styles, dual-concern, lapis NLP).
Seluruh antarmuka dalam Bahasa Indonesia.

Aplikasi berupa **satu berkas statis** (`index.html`) yang berjalan sepenuhnya di browser
(perhitungan skor dan penyimpanan jawaban memakai `localStorage`). Tidak ada backend.

Empat tab:

1. **Isi Tes** — peserta mengisi identitas dan 61 pernyataan.
2. **Hasil Saya** — hasil individu + *kode hasil* untuk dikirim ke fasilitator.
3. **Rekap Tim** — fasilitator menempel kode hasil peserta untuk melihat rekap tim.
4. **Metodologi** — dasar ilmiah dan batasan penggunaan tes.

## Mode uji coba (`?demo`)

Secara bawaan ini adalah **versi produksi**: tombol bantu demo tersembunyi.

- Buka `index.html` biasa → produksi (tombol "Isi jawaban acak" dan "Muat data contoh"
  tidak tampil; tab Rekap Tim terbuka kosong).
- Buka `index.html?demo` → tombol demo muncul dan tab Rekap Tim memuat 8 peserta contoh,
  berguna untuk QA/peragaan.

## Menjalankan dengan Docker (nginx:alpine)

```sh
docker build -t negprof .
docker run --rm -p 8080:80 negprof
# buka http://localhost:8080
```

## Deploy dengan Coolify

Repositori ini sudah menyertakan `Dockerfile` dan `docker-compose.yml`, jadi Coolify tahu
di mana dan bagaimana membangun image. **Pastikan ketiga berkas (`index.html`, `Dockerfile`,
`docker-compose.yml`) sudah di-commit dan di-push** ke repositori Git yang terhubung ke Coolify.

**Cara yang disarankan — Build Pack: Docker Compose**

1. Di Coolify: **+ New** → **Application** → pilih sumber Git repositori ini.
2. **Build Pack:** pilih **Docker Compose**. Coolify otomatis menemukan `docker-compose.yml`
   di root (Base Directory `/`).
3. Isi **Domain** untuk aplikasi (mis. `negprof.perusahaan.id`). Coolify mengarahkan domain
   itu ke port **80** yang di-`expose` di compose, lengkap dengan TLS otomatis.
4. **Deploy.**

**Alternatif — Build Pack: Dockerfile**

1. **Build Pack:** pilih **Dockerfile**.
2. **Dockerfile Location:** `/Dockerfile` · **Base Directory:** `/`.
3. **Ports Exposes:** `80` (sudah dideklarasikan lewat `EXPOSE 80`, tetapi set manual bila perlu).
4. Isi **Domain**, lalu **Deploy.**

Untuk melihat perubahan setelah push, cukup klik **Redeploy** (atau aktifkan auto-deploy via webhook).

## Tanpa Docker

`index.html` sepenuhnya statis, sehingga bisa:

- dibuka langsung di browser (klik dua kali berkasnya), atau
- disajikan oleh server statis apa pun, mis. `npx serve .`, atau
- diunggah ke hosting statis / nginx internal perusahaan.

## Catatan

- Font dimuat dari Google Fonts (CDN). Bila jaringan internal tanpa internet, tampilan
  otomatis beralih ke font sistem (Segoe UI dsb.) tanpa mengubah tata letak.
- Data peserta hanya tersimpan di browser masing-masing; kode hasil berisi nama, unit,
  dan skor — bagikan hanya ke fasilitator.
