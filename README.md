# CallBotCompare

A directory and comparison site for AI receptionist and AI phone agent software, built as a credible buyer tool. Public domain target: **callbotcompare.com**.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Prisma · PostgreSQL (Neon)
- **Hosting:** Hostinger Premium/Business Node.js shared hosting
- **CI/CD:** GitHub Actions on push to `main`
- **Repo:** private — admin access via the GitHub UI

The source specs and copy that drove the build live in [`docs/`](docs/). The orienting guide for future Claude Code sessions is in [`CLAUDE.md`](CLAUDE.md).

---

## Prerequisites

- **Node 20.11+** (`.nvmrc` pins `22`; use `nvm use` if you have nvm)
- **pnpm 11+** — easiest path is via corepack: `corepack enable && corepack prepare pnpm@latest --activate`
- A **Neon** Postgres database (free tier is fine) — one project, two branches (`main` for prod, `dev` for local)

## Local development

```bash
# 1. Install dependencies
pnpm install

# 2. Copy the env template and fill in Neon connection strings
cp .env.example .env.local
#    DATABASE_URL  -> Neon pooled (-pooler) connection string for the dev branch
#    DIRECT_URL    -> Neon direct (non-pooler)  connection string for the dev branch
#    SITE_URL      -> http://localhost:3000
#    NEXT_PUBLIC_SITE_URL -> http://localhost:3000

# 3. Generate the Prisma client, apply migrations, seed
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed

# 4. Run the dev server (Turbopack)
pnpm dev
# -> http://localhost:3000
```

### Useful scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Next.js dev server (Turbopack) on `:3000` |
| `pnpm build` | Production build (standalone output) |
| `pnpm start` | Run the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm format` | Prettier write |
| `pnpm db:generate` | `prisma generate` |
| `pnpm db:migrate` | `prisma migrate dev` |
| `pnpm db:seed` | Seed verticals, features, 8 published + 2 hidden vendors, and the `smith-ai-vs-goodcall` comparison page |
| `pnpm db:studio` | Prisma Studio — the MVP "admin" UI |

## Content management (no /admin in MVP)

Until a real admin UI ships, manage data with **Prisma Studio**:

```bash
# Studio runs against whatever DATABASE_URL is in your shell
DATABASE_URL="<neon-pooled-string>" pnpm prisma studio
```

From there you can edit any vendor, comparison page, lead, or FAQ. For larger structural changes (taxonomies, new comparison pages), edit `prisma/seed-vendors.json` / `prisma/seed-comparisons.ts` and re-run `pnpm db:seed` (upserts are idempotent).

To **publish** a vendor: flip `isPublished` to `true` in Prisma Studio (or in the seed JSON).

## Project layout

```
app/                  Next.js App Router routes + route-private _components/
components/           Cross-route shared primitives
  ui/                 shadcn-generated, do not hand-edit
  layout/, vendors/, comparisons/, forms/, marketing/
lib/                  db · scoring · filters · seo · leads · analytics · constants · utils
prisma/               schema.prisma · seed.ts · seed-vendors.json · seed-comparisons.ts
types/                vendor.ts · filters.ts
docs/                 Source specs and copy (reference, do not edit)
.github/workflows/    ci.yml, deploy.yml
```

Conventions:

- **Filenames** are kebab-case. Component exports are PascalCase: `export function VendorCard()` lives in `vendor-card.tsx`.
- **Imports** always via the `@/` alias from project root.
- Route-specific UI lives in **`_components/`** under that route. Cross-route primitives live in top-level `components/`.
- **Server by default** — every file is RSC unless it opens with `'use client'`.
- Filter state for `/vendors` and `/compare` is encoded in the **URL** so it's shareable and back-button-safe.

## Brand system (do not violate)

- **Fonts:** Montserrat headings, Inter body (via `next/font/google`).
- **Palette:** cream `#F7F4EE` background (not pure white), deep slate `#1F3A5F`, soft teal `#2F7F79`, soft gold `#D9A441` sparingly.
- **Anti-AI-template rules:** no default-Tailwind-demo look, no gradient overuse, no purple/pink AI-cliché palette, no robot/hologram art, no `rounded-2xl` everywhere, no fake stats or testimonials.

See [`docs/STYLE_TILE_BRAND_BOARD.md`](docs/STYLE_TILE_BRAND_BOARD.md) and [`docs/FRONTEND_VISUAL_DESIGN_SPEC.md`](docs/FRONTEND_VISUAL_DESIGN_SPEC.md) for the full system.

## Scoring

The exact weighted-score formula is in [`docs/SCORING_RUBRIC.md`](docs/SCORING_RUBRIC.md) and codified in [`lib/scoring.ts`](lib/scoring.ts). Display reads `vendor.overallScore` from the seed (editor source of truth); the `computeOverallScore` helper is reserved for future recalc tooling. Don't render fabricated values — `null` fields render as `—` or `"On request"`.

## Deployment

### Architecture

- **App** → Docker container running the Next.js standalone server, on a Hostinger **KVM 2 VPS**. The container joins the VPS's existing `n8n_default` Docker network and is routed by the existing **Traefik** reverse proxy (which handles SSL via Let's Encrypt TLS-ALPN-01).
- **Image registry** → GitHub Container Registry (`ghcr.io/jnoriega67/callbotcompare`).
- **Database** → Neon (managed Postgres). Pooled connection at runtime; direct connection for migrations.
- **Build** → GitHub Actions: build the image, push to ghcr.io, SSH to VPS, `docker compose pull && up -d`. Nothing builds on the VPS.

### One-time setup

1. **Neon:** create the project. Use the default branch for prod and create a `dev` branch for local development.
2. **VPS bootstrap:**
   - Provision the deploy SSH key (one-shot Ed25519, no passphrase) and add the public half to the VPS's `~/.ssh/authorized_keys`.
   - Make sure the existing Traefik stack is running (`docker ps | grep traefik`).
   - Create the app directory and drop in the compose file + env:
     ```bash
     ssh root@<vps-ip> "mkdir -p /docker/callbotcompare"
     scp deploy/docker-compose.yml root@<vps-ip>:/docker/callbotcompare/
     scp deploy/env.production.example root@<vps-ip>:/docker/callbotcompare/.env
     # then edit /docker/callbotcompare/.env on the VPS with real Neon URLs
     ```
3. **GitHub Container Registry visibility:** after the first `deploy.yml` run pushes the image, open https://github.com/users/JNoriega67/packages/container/callbotcompare/settings and change visibility to **Public** so the VPS can `docker pull` without auth. (Or keep it private and `docker login ghcr.io` on the VPS with a PAT that has `read:packages`.)
4. **Domain & SSL:** point `callbotcompare.com` (and optionally `www`) at the VPS IP via A record. Traefik will issue the cert on first request — no manual step.
5. **GitHub secrets** (Settings → Secrets and variables → Actions → New repository secret):
   - `HOSTINGER_SSH_HOST` (e.g. `187.124.70.200`)
   - `HOSTINGER_SSH_USER` (e.g. `root`)
   - `HOSTINGER_SSH_KEY` (private key, PEM format, no passphrase)
   - `NEON_DATABASE_URL` (pooled connection string, **main** branch)
   - `NEON_DIRECT_URL` (direct connection string, **main** branch)
   - `SITE_URL` and `NEXT_PUBLIC_SITE_URL` (`https://callbotcompare.com`)
6. **First seed (manual):** the deploy workflow runs `prisma migrate deploy` but doesn't seed. From local, with the prod Neon URLs in env, run:
   ```bash
   DATABASE_URL="<neon-main-pooled>" DIRECT_URL="<neon-main-direct>" pnpm tsx prisma/seed.ts
   ```

### Continuous deploy

Push to `main` runs `.github/workflows/deploy.yml`:

1. `prisma migrate deploy` against Neon main
2. `docker build` + `docker push` of the image to ghcr.io (tagged `latest` and `<sha>`)
3. SSH to VPS, `docker compose pull && docker compose up -d --remove-orphans && docker image prune -f`
4. Smoke check `/` and `/vendors` on `$SITE_URL` (curl with retry)

PRs run `.github/workflows/ci.yml` (lint + typecheck + build of the pnpm bundle — no image build).

### Manual ops on the VPS

```bash
ssh root@<vps-ip>
cd /docker/callbotcompare
docker compose ps               # status
docker compose logs -f app      # tail logs
docker compose pull && docker compose up -d   # force redeploy of :latest
docker compose down             # stop (Traefik will 404 until back up)
```

## Notable choices & gotchas

- **Tailwind v4 in CSS-first mode** — brand tokens live in `app/globals.css` under `@theme inline`. `components.json` has `"tailwind": { "config": "" }`.
- **shadcn base-nova preset** uses `@base-ui/react`, not `@radix-ui/react-*`. The trigger API is `render` (not `asChild`); the Accordion uses `multiple` (not `type="single" collapsible`).
- **Capability filters** read denormalized booleans on `Vendor` (`hasCrmIntegration`, etc.), not the `Feature` taxonomy. The taxonomy stays for future per-feature attributes.
- **`Lead.recommendedVendors`** is a `String?` — comma-joined slugs, not JSON.
- **All DB-querying pages are `dynamic = 'force-dynamic'`** for the MVP. Worth revisiting (per-route `revalidate`) once we know real traffic patterns.
- **`next/image` is set to `unoptimized: true`** since Sharp on Hostinger shared isn't guaranteed. Swap to a CDN later if image traffic grows.
- **Prisma 6** (not 7) — v7 moved `directUrl` out of `schema.prisma` and broke the `@prisma/client` re-export; staying on the stable line.
- **Zod 3** (not 4) — `@hookform/resolvers@5` type-mismatches with zod 4 as of this writing.
