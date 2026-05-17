# syntax=docker/dockerfile:1.7
# Multi-stage build for the CallBotCompare Next.js standalone runtime.
# - Built and pushed to ghcr.io by .github/workflows/deploy.yml
# - Pulled by /docker/callbotcompare/docker-compose.yml on the VPS
# - Joins the existing `n8n_default` network; routed by Traefik labels

ARG NODE_VERSION=22-alpine

############################
# Stage 1 — install deps
############################
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack prepare pnpm@11.1.2 --activate && \
    pnpm install --frozen-lockfile

############################
# Stage 2 — build app
############################
FROM node:${NODE_VERSION} AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.1.2 --activate

# NEXT_PUBLIC_* values are baked into the client bundle at build time.
ARG NEXT_PUBLIC_SITE_URL=https://callbotcompare.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# Prisma schema validation needs syntactically-valid URLs; the build
# itself never connects (all DB-querying pages are dynamic).
ENV DATABASE_URL="postgresql://stub:stub@localhost:5432/stub?sslmode=disable"
ENV DIRECT_URL="postgresql://stub:stub@localhost:5432/stub?sslmode=disable"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate && \
    pnpm build

############################
# Stage 3 — minimal runtime
############################
FROM node:${NODE_VERSION} AS runtime
WORKDIR /app
RUN apk add --no-cache curl tini

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy the standalone server + static assets + public folder per
# Next.js standalone packaging guidance.
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ || exit 1

# tini reaps zombie processes from Next's child workers cleanly
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
