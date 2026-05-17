# ─── Stage 1 : Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .

# ← Ajouter ces 2 lignes
ARG VITE_NODE_ENV=docker
ENV VITE_NODE_ENV=docker

RUN npm run build

# ─── Stage 2 : Serve via NGINX ─────────────────────────────────────────────────
FROM nginx:1.27-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

ENV BACKEND_HOST=backend
ENV BACKEND_PORT=9080

EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst '$BACKEND_HOST $BACKEND_PORT' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf && nginx -g 'daemon off;'"]