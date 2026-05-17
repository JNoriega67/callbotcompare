# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`calltreo.com` — a directory and comparison site for AI receptionist / AI phone agent software (formerly planned as `callbotcompare.com`; internal code identifiers and the repo name still use `callbotcompare`). Built with **Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + Prisma + PostgreSQL (Neon)**, deployed to **Hostinger Premium/Business Node.js shared hosting** via **GitHub Actions** on push to `main`. Private GitHub repo.

Source specs and copy live in [docs/](docs/) — the original briefs that drove the build, kept as reference. The full build plan is at `/Users/grady/.claude/plans/snuggly-floating-hammock.md`.

## Stack

- Next.js 16.2 (App Router, Turbopack, `output: 'standalone'`)
- React 19, TypeScript 5
- Tailwind v4 (CSS-first `@theme inline`, no config file)
- shadcn/ui — cherry-picked components in `components/ui/`
- Prisma + Postgres (Neon in prod, local Postgres or Neon dev branch for dev)
- pnpm (via corepack), Node >= 20.11 (`.nvmrc` pins 22)
- react-hook-form + zod for forms
- No auth library — admin deferred; content managed via Prisma Studio

## Commands

```bash
pnpm install                  # install dependencies
pnpm dev                      # Next.js dev (Turbopack) on http://localhost:3000
pnpm build                    # production build
pnpm start                    # run production build
pnpm lint                     # ESLint
pnpm typecheck                # tsc --noEmit
pnpm format                   # Prettier write
pnpm prisma migrate dev       # create + apply a dev migration
pnpm prisma db seed           # seed vendors, verticals, features, comparisons
pnpm prisma studio            # DB GUI ("admin" workflow for the MVP)
```

## Conventions

- **Filenames**: kebab-case for all `.ts`/`.tsx`. Components export PascalCase: `export function VendorCard()` lives in `vendor-card.tsx`.
- **Imports**: always via `@/` alias from project root (`@/lib/db`, `@/components/vendors/vendor-card`).
- **Route-private components**: anything used by exactly one route lives under that route's `_components/` folder (Next.js skips `_`-prefixed folders for routing). Promote to top-level `components/` only when a second route imports it.
- **Server-by-default**: every file is RSC unless it opens with `'use client'`.
- **No barrel `index.ts` files** — import files directly.
- **shadcn output is generated, not hand-edited** — customize via CSS variables in `globals.css` or wrap the primitive.

## Where things live

```
app/                  Next.js App Router routes + route-private _components/
components/           Cross-route shared primitives
  ui/                   shadcn-generated, do not hand-edit
  layout/, vendors/, comparisons/, forms/, marketing/
lib/                  db, scoring, filters, seo, leads, analytics, constants, utils
prisma/               schema.prisma, seed.ts, seed-vendors.json, migrations/
types/                vendor.ts, filters.ts
docs/                 Source specs and copy (reference, do not edit)
.github/workflows/    ci.yml, deploy.yml
```

## Source specs (consult before guessing)

- [docs/MASTER_BRIEF_FOR_CLAUDE_CODE.md](docs/MASTER_BRIEF_FOR_CLAUDE_CODE.md) — top-level brief
- [docs/CLAUDE_CODE_BUILD_SPEC.md](docs/CLAUDE_CODE_BUILD_SPEC.md) — full product/business/UX spec
- [docs/SCORING_RUBRIC.md](docs/SCORING_RUBRIC.md) — exact weighted-score formula
- [docs/HOMEPAGE_WIREFRAME.md](docs/HOMEPAGE_WIREFRAME.md) — fixed 12-section homepage layout
- [docs/HOMEPAGE_COPY.md](docs/HOMEPAGE_COPY.md), [docs/PUBLISH_READY_COPY.md](docs/PUBLISH_READY_COPY.md) — copy verbatim
- [docs/FRONTEND_VISUAL_DESIGN_SPEC.md](docs/FRONTEND_VISUAL_DESIGN_SPEC.md), [docs/STYLE_TILE_BRAND_BOARD.md](docs/STYLE_TILE_BRAND_BOARD.md) — colors, fonts, anti-AI-template rules
- [docs/MOBILE_LAYOUT_SPEC.md](docs/MOBILE_LAYOUT_SPEC.md) — comparison tables → stacked cards on mobile
- [docs/COMPONENT_UI_SPEC.md](docs/COMPONENT_UI_SPEC.md) — 9-column comparison table spec
- [docs/seed-vendors.json](docs/seed-vendors.json) — original 10-vendor seed snapshot; the live copy is at `prisma/seed-vendors.json`

## Non-obvious constraints (do not violate)

- **Do not fabricate vendor claims.** Pricing, capabilities, HIPAA status are intentionally `null` / "research needed" in seed data. Render null-safe (`—` or "On request"); never invent values.
- **Brand system is mandatory.** Montserrat for headings, Inter for body. Warm cream `#F7F4EE` page background (not pure white). Deep slate `#1F3A5F` for structure, soft teal `#2F7F79` as primary interactive, soft gold `#D9A441` sparingly.
- **Anti-AI-template design rules**: no default-Tailwind-demo look; no gradient overuse; no purple/pink AI-cliché palette; no robot/hologram art; no `rounded-2xl` everywhere; no identical card grids back-to-back; no fake stats or testimonials.
- **Scoring formula is exact**: `callHandling*0.20 + integrations*0.15 + automation*0.15 + easeOfSetup*0.10 + pricingValue*0.10 + verticalFit*0.10 + handoff*0.10 + reporting*0.05 + support*0.05`. Display reads `vendor.overallScore` from the seed; `lib/scoring.ts#computeOverallScore` is for future recalc only.
- **Filter state lives in the URL** (vendor directory + compare picker). See `lib/filters.ts`.
- **Mobile comparison = stacked cards**, not horizontal scroll. Render both, let CSS pick (`hidden md:block` / `md:hidden`).
- **Capability flags vs Feature taxonomy**: `Vendor.hasCrmIntegration` etc. (denormalized booleans) are the source of truth for filters and badges. The Feature taxonomy is reserved for future per-feature attributes.
- **`Lead.recommendedVendors` is `String?`** — comma-joined slugs, not JSON.

## Deployment

- **Target**: Hostinger KVM 2 **VPS** (not the classic Web Hosting plans — those don't run Node). The VPS already runs Docker + a Traefik reverse proxy with auto Let's Encrypt SSL.
- **Pattern**: CallTreo is a Docker container joined to the existing `n8n_default` network and routed by Traefik via labels. Config lives at `/docker/callbotcompare/` on the VPS (path keeps the legacy folder name; only the public brand changed).
- **Image**: built and pushed to `ghcr.io/jnoriega67/callbotcompare` by GitHub Actions.
- **CI** (`.github/workflows/ci.yml`): lint + typecheck + build on PRs (no image build).
- **Deploy** (`.github/workflows/deploy.yml`): on push to `main` — `prisma migrate deploy` against Neon, `docker buildx` + push to ghcr.io, SSH to VPS, `docker compose pull && up -d`, curl smoke check.
- **Secrets required**: `HOSTINGER_SSH_HOST` (VPS IP), `HOSTINGER_SSH_USER` (`root`), `HOSTINGER_SSH_KEY` (PEM private key, no passphrase), `NEON_DATABASE_URL` (pooled, prod), `NEON_DIRECT_URL` (direct, prod), `SITE_URL`, `NEXT_PUBLIC_SITE_URL`.
- **Image visibility**: the ghcr.io package should be **public** so the VPS can pull without auth (or configure `docker login ghcr.io` on the VPS with a PAT having `read:packages`).
