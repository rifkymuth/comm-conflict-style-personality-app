FROM nginx:alpine

# Aplikasi satu-berkas statis; dilayani oleh konfigurasi bawaan nginx (/usr/share/nginx/html)
COPY index.html /usr/share/nginx/html/index.html

# nginx mendengarkan di port 80 — dideklarasikan agar Coolify mendeteksi port layanan secara otomatis
EXPOSE 80

# Status sehat kontainer untuk Coolify / Docker
HEALTHCHECK --interval=600s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:80/ || exit 1
