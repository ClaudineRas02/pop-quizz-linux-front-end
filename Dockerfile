# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim AS build

ARG VITE_API_HOSTNAME
ENV VITE_API_HOSTNAME=$VITE_API_HOSTNAME

WORKDIR /app

# Keep dependency installation cacheable while ensuring the lock file is obeyed.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# The unprivileged NGINX image listens on 8080 by default.
FROM nginxinc/nginx-unprivileged:1.29-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
