# Claude Code Task Checklist

## Goal
Build the MVP for CallBotCompare in a way that is production-minded, SEO-friendly, and easy to extend.

## Phase 0: setup and decisions
- [ ] Confirm app will live in a new project folder or current workspace root
- [ ] Initialize Next.js app with TypeScript and App Router
- [ ] Add Tailwind CSS
- [ ] Add shadcn/ui
- [ ] Add Prisma and configure Postgres connection
- [ ] Create `.env.example`
- [ ] Add linting and formatting defaults

## Phase 1: data model
- [ ] Convert `prisma_schema_proposal.prisma` into working `prisma/schema.prisma`
- [ ] Run initial Prisma migration
- [ ] Create seed script from `seed-vendors.json`
- [ ] Seed verticals and features taxonomy
- [ ] Add helper functions for weighted score calculation
- [ ] Add helper functions for filter parsing and comparison queries

## Phase 2: app shell
- [ ] Build root layout
- [ ] Build site header and footer
- [ ] Build global styles
- [ ] Add reusable container, section, card, button, badge, and CTA components
- [ ] Add SEO utility helpers

## Phase 3: homepage
- [ ] Implement homepage using `HOMEPAGE_COPY.md`
- [ ] Add hero section
- [ ] Add top vendors section
- [ ] Add compare-by-use-case section
- [ ] Add compare-by-feature section
- [ ] Add methodology section
- [ ] Add FAQ section
- [ ] Add footer CTA

## Phase 4: vendors directory
- [ ] Build `/vendors` page
- [ ] Implement vendor search
- [ ] Implement filter sidebar
- [ ] Implement sort behavior
- [ ] Build vendor card component
- [ ] Preserve filters in URL params

## Phase 5: vendor detail pages
- [ ] Build `/vendors/[slug]`
- [ ] Add summary block
- [ ] Add scores block
- [ ] Add pros/cons module
- [ ] Add feature and integration module
- [ ] Add alternatives module
- [ ] Add CTA block
- [ ] Add FAQ and schema markup

## Phase 6: comparison experience
- [ ] Build `/compare` hub page
- [ ] Allow users to select up to 3 vendors
- [ ] Render side-by-side comparison table
- [ ] Build `/compare/[slug]` page template
- [ ] Seed at least 3 comparison pages
- [ ] Add verdict module and CTA block

## Phase 7: commercial pages and guides
- [ ] Build template for commercial landing pages
- [ ] Build template for guides
- [ ] Create `best-ai-receptionist-software` page
- [ ] Create first 5 vertical pages from `FIRST_10_PAGE_BRIEFS.md`
- [ ] Create `ai-receptionist-vs-virtual-receptionist` page
- [ ] Create `smith-ai-vs-goodcall` page

## Phase 8: lead capture and quiz
- [ ] Build `/quiz` multi-step flow
- [ ] Build `/contact` page
- [ ] Build lead submission API route
- [ ] Persist leads to database
- [ ] Add email notification stub or Resend integration
- [ ] Add thank-you state/page
- [ ] Track outbound referral CTA clicks

## Phase 9: admin or content operations
- [ ] Add simple auth-protected admin area or documented content editing workflow
- [ ] Build leads review page
- [ ] Build vendor CRUD or basic editing path
- [ ] Build comparison page CRUD or JSON/content-based management path
- [ ] Support featured vendor toggles

## Phase 10: SEO and technical polish
- [ ] Add metadata to all key routes
- [ ] Add schema markup helpers
- [ ] Generate sitemap
- [ ] Generate robots.txt
- [ ] Add canonical support
- [ ] Add breadcrumbs
- [ ] Add internal linking blocks
- [ ] Test mobile responsiveness
- [ ] Improve loading and empty states

## Phase 11: launch readiness
- [ ] Confirm local build passes
- [ ] Confirm lint passes
- [ ] Confirm core routes work
- [ ] Confirm seed data renders correctly
- [ ] Confirm forms save correctly
- [ ] Confirm compare filters work
- [ ] Write setup instructions in README
- [ ] Document next research tasks for filling missing vendor data

## Nice-to-have after MVP
- [ ] Import data from CSV
- [ ] Add editorial review notes UI
- [ ] Add comparison page generator helpers
- [ ] Add featured listing management
- [ ] Add lead routing rules
- [ ] Add calculator or ROI estimator

## Notes
- Prefer null-safe rendering over fake certainty
- Keep the data model reusable for future directory sites
- Ship the buyer journey first: homepage, compare, vendor pages, lead capture
