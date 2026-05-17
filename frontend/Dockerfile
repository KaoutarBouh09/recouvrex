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

# Copie comme template (pas directement dans conf.d/)
COPY nginx.conf /etc/nginx/templates/app.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

# Valeurs par défaut (Docker Compose local)
ENV BACKEND_HOST=backend
ENV BACKEND_PORT=9080

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]