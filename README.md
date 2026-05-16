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

- **App** → Hostinger Premium/Business Node.js shared hosting (Passenger-style restart, port 65002 SSH).
- **Database** → Neon (managed Postgres). Pooled connection at runtime; direct connection for migrations.
- **Build** → GitHub Actions. Hostinger's shared plan has tight memory; we never build on the server.

### One-time setup

1. **Neon project:** create `callbotcompare` project. Use the default branch for prod and create a `dev` branch for local development.
2. **Hostinger app:** in hPanel, create a Node.js app, select Node 22.x, enable SSH. Note the SSH host, port (usually 65002), user, and the app's deploy path. Set the "startup file" to `.next/standalone/server.js`. Add the production env vars (`DATABASE_URL`, `DIRECT_URL`, `SITE_URL`, `NEXT_PUBLIC_SITE_URL`, `NODE_ENV=production`, `PORT`).
3. **Domain & SSL:** point `callbotcompare.com` at the Hostinger app and provision SSL via Let's Encrypt in hPanel.
4. **GitHub secrets** (Settings → Secrets and variables → Actions → New repository secret):
   - `HOSTINGER_SSH_HOST`
   - `HOSTINGER_SSH_USER`
   - `HOSTINGER_SSH_PORT` (typically `65002`)
   - `HOSTINGER_SSH_KEY` (private key in PEM format; add the matching public key to the Hostinger account)
   - `HOSTINGER_DEPLOY_PATH` (absolute path on the server)
   - `NEON_DATABASE_URL` (pooled connection string for prod)
   - `NEON_DIRECT_URL` (direct connection string for prod)
   - `SITE_URL` and `NEXT_PUBLIC_SITE_URL` (e.g. `https://callbotcompare.com`)
5. **First migration:** from local with the prod Neon URLs in a `.env.production.local`, run `pnpm prisma migrate deploy` and `DATABASE_URL=$NEON_DATABASE_URL DIRECT_URL=$NEON_DIRECT_URL pnpm tsx prisma/seed.ts`.

### Continuous deploy

After the one-time setup, pushing to `main` runs `.github/workflows/deploy.yml`:

1. Build the app in CI (with `output: 'standalone'`)
2. Run `prisma migrate deploy` against Neon
3. `rsync` the standalone bundle (+ `public/`, `.next/static/`) to Hostinger
4. Install prod deps remotely (`pnpm install --prod --frozen-lockfile`) — _not currently in the workflow because standalone bundles its own `node_modules`; uncomment in `deploy.yml` if your Hostinger app needs an extra step_
5. Touch `tmp/restart.txt` to restart the app (Passenger-style)
6. Smoke check the public URL

PRs run `.github/workflows/ci.yml` (lint + typecheck + build).

## Notable choices & gotchas

- **Tailwind v4 in CSS-first mode** — brand tokens live in `app/globals.css` under `@theme inline`. `components.json` has `"tailwind": { "config": "" }`.
- **shadcn base-nova preset** uses `@base-ui/react`, not `@radix-ui/react-*`. The trigger API is `render` (not `asChild`); the Accordion uses `multiple` (not `type="single" collapsible`).
- **Capability filters** read denormalized booleans on `Vendor` (`hasCrmIntegration`, etc.), not the `Feature` taxonomy. The taxonomy stays for future per-feature attributes.
- **`Lead.recommendedVendors`** is a `String?` — comma-joined slugs, not JSON.
- **All DB-querying pages are `dynamic = 'force-dynamic'`** for the MVP. Worth revisiting (per-route `revalidate`) once we know real traffic patterns.
- **`next/image` is set to `unoptimized: true`** since Sharp on Hostinger shared isn't guaranteed. Swap to a CDN later if image traffic grows.
- **Prisma 6** (not 7) — v7 moved `directUrl` out of `schema.prisma` and broke the `@prisma/client` re-export; staying on the stable line.
- **Zod 3** (not 4) — `@hookform/resolvers@5` type-mismatches with zod 4 as of this writing.
