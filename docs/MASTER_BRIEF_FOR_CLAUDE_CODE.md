# Master Brief for Claude Code

Build the MVP for `CallBotCompare`, a directory and comparison site for AI receptionist and AI phone agent software.

## Goal
Create a production-minded, SEO-friendly website that helps buyers compare AI receptionist vendors and captures leads through click-through referrals and a concierge recommendation flow.

## Read these files first
- `callbotcompare/CLAUDE_CODE_BUILD_SPEC.md`
- `callbotcompare/prisma_schema_proposal.prisma`
- `callbotcompare/FRONTEND_SITEMAP_AND_BUILD_PLAN.md`
- `callbotcompare/seed-vendors.json`
- `callbotcompare/HOMEPAGE_COPY.md`
- `callbotcompare/FIRST_10_PAGE_BRIEFS.md`
- `callbotcompare/CLAUDE_CODE_TASK_CHECKLIST.md`
- `callbotcompare/SEED_SCRIPT_TEMPLATE.ts`
- `callbotcompare/PUBLISH_READY_COPY.md`
- `callbotcompare/SCORING_RUBRIC.md`
- `callbotcompare/FRONTEND_VISUAL_DESIGN_SPEC.md`
- `callbotcompare/HOMEPAGE_WIREFRAME.md`
- `callbotcompare/STYLE_TILE_BRAND_BOARD.md`
- `callbotcompare/COMPONENT_UI_SPEC.md`
- `callbotcompare/MOBILE_LAYOUT_SPEC.md`

## Stack
- Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL

## MVP requirements
Build these first:
1. Homepage
2. Vendors directory page
3. Vendor detail pages
4. Compare hub
5. Comparison detail pages
6. `best-ai-receptionist-software` page
7. Quiz and lead form
8. Guide/article template

## Important constraints
- Do not fabricate unsupported vendor claims
- Use null-safe rendering where research is incomplete
- Keep components reusable
- Keep the architecture reusable for future directory sites
- Prioritize buyer utility over decorative UI

## Data requirements
- Implement the Prisma schema
- Seed vendors, verticals, and features from the provided files
- Build weighted score calculation support
- Allow filters by vertical, feature, and core boolean capabilities

## UX requirements
- Responsive and fast
- Strong internal linking
- Search and filters on vendors page
- Side-by-side comparison UI
- Clear CTA paths to compare, quiz, and contact
- Follow the visual design spec so the site does not look generic or AI-generated
- Use Montserrat for headings and a warm, trustworthy color system
- Follow the homepage wireframe, style tile, component spec, and mobile layout guidance

## Lead flow
Implement two conversion paths:
1. outbound referral clicks with event tracking
2. concierge recommendation lead form that persists to DB

## SEO requirements
- metadata on all major pages
- sitemap
- robots.txt
- canonical tags
- schema markup on key templates
- server-rendered pages where appropriate

## Content requirements
Use the provided copy and briefs to create:
- homepage
- best AI receptionist software page
- best AI receptionist for law firms
- Smith.ai vs Goodcall
- plus the supporting page templates for the rest

## Deliverables
- working app
- Prisma schema and migration
- seed script
- clean reusable component structure
- README with setup steps
- `.env.example`

## Definition of done
- app runs locally
- seed data loads correctly
- main routes render
- compare filters work
- lead form persists submissions
- major templates include metadata/schema
- code is organized and easy to extend

## Implementation approach
Start by scaffolding the app and data model, then build the homepage, vendor directory, vendor pages, compare hub, and lead flow before polishing admin tooling.

If something is ambiguous, make the most practical implementation choice and document it in the README.
