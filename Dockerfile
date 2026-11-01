FROM node:24-alpine

# Server Node tanpa dependensi npm: menyajikan public/ dan API sesi (SQLite bawaan node:sqlite)
WORKDIR /app
COPY package.json ./
COPY server ./server
COPY public ./public

# Basis data SQLite disimpan di /data — pasang volume agar hasil tidak hilang saat redeploy
RUN mkdir -p /data && chown node:node /data
ENV NODE_ENV=production PORT=3000 DB_PATH=/data/negprof.db
USER node
VOLUME /data

# Server mendengarkan di port 3000 — dideklarasikan agar Coolify mendeteksi port layanan secara otomatis
EXPOSE 3000

# Status sehat kontainer untuk Coolify / Docker
HEALTHCHECK --interval=600s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1

CMD ["node", "--disable-warning=ExperimentalWarning", "server/server.js"]
