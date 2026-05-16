# CallBotCompare Build Spec

Project: CallBotCompare
Primary domain target: callbotcompare.com
Backup domains: voiceagentlist.com, phonestaffai.com
Date: 2026-05-16

## Objective

Build a directory and comparison site for AI receptionist and AI phone agent software.

Primary goal:
- Generate qualified buyer intent and monetize through referral deals, featured listings, and implementation help.

Secondary goal:
- Build a reusable directory framework that can later support adjacent categories.

## Business model

### Phase 1 monetization
- Referral or affiliate links to vendors with partner programs
- Lead form: "Help me choose the right AI receptionist"
- Paid consulting/setup offer for businesses that need implementation help

### Phase 2 monetization
- Featured listings
- Sponsored comparison pages with clear disclosure
- Premium buyer guides
- Done-for-you setup services for agencies, MSPs, legal offices, clinics, and home service companies

## MVP definition

Launch a credible public site with:
- Homepage
- Main comparison page
- 20 to 30 vendor profile pages
- 10 to 15 commercial content pages
- 5 to 10 comparison pages
- Lead capture quiz/form
- Admin-friendly content model

This is not a generic blog. It should feel like a buyer tool.

## Core positioning

CallBotCompare helps small and mid-sized businesses compare AI receptionists and phone agents based on actual buying criteria:
- call handling quality
- transfer logic
- booking capability
- CRM integration
- vertical fit
- pricing clarity
- deployment complexity
- after-hours and multilingual support

## Target buyers

### Primary
- Small business owners
- Operations managers
- Office managers
- Revenue leaders
- Agencies and MSPs buying on behalf of clients

### Highest-value verticals
- Law firms
- Home services
- Medical and dental offices
- Contractors
- Real estate teams
- Financial offices
- MSPs and IT service firms

## Recommended stack

Use a modern SEO-friendly stack that Claude Code can ship quickly.

### Preferred
- Next.js 15+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma ORM
- NextAuth or Clerk for admin auth
- Vercel for deployment
- Resend for email notifications
- Plausible or PostHog for analytics

### Acceptable alternate stack
- Supabase for auth, Postgres, storage, and admin convenience

## High-level architecture

- Public marketing/content site
- Structured vendor directory
- Comparison engine driven by database records
- Lead form and quiz with email notifications
- Lightweight admin or CMS workflow for updating vendors and pages

## Information architecture

### Core public pages
1. /
2. /compare
3. /vendors
4. /vendors/[slug]
5. /best-ai-receptionist-software
6. /pricing
7. /quiz
8. /contact

### Commercial category pages
- /best-ai-receptionist-for-law-firms
- /best-ai-receptionist-for-home-services
- /best-ai-receptionist-for-medical-offices
- /best-ai-receptionist-for-contractors
- /best-ai-receptionist-for-real-estate
- /best-ai-receptionist-for-small-business
- /best-ai-answering-service-for-appointment-booking
- /best-ai-phone-agent-with-crm-integration
- /best-ai-receptionist-for-after-hours-calls
- /best-ai-receptionist-for-lead-capture

### Comparison pages
- /compare/smith-ai-vs-goodcall
- /compare/smith-ai-vs-dialzara
- /compare/goodcall-vs-dialzara
- /compare/ai-receptionist-vs-virtual-receptionist
- /compare/ai-answering-service-vs-voicemail-tree

### Editorial / buyer guide pages
- /guides/how-to-choose-an-ai-receptionist
- /guides/ai-receptionist-pricing-guide
- /guides/what-to-test-before-you-buy-an-ai-phone-agent
- /guides/ai-receptionist-implementation-checklist
- /guides/questions-to-ask-before-buying-an-ai-answering-service

## UX requirements

### Homepage sections
- Hero with clear value proposition and CTA
- Trust/explainer section: how we evaluate vendors
- Top ranked vendors summary grid
- Compare by use case section
- Compare by feature section
- Buyer quiz CTA
- Implementation help CTA
- Latest comparison/guides block
- FAQ

### Compare page
Must support filtering and sorting by:
- industry fit
- price range
- human handoff
- CRM integration
- appointment booking
- multilingual support
- 24/7 support
- HIPAA-friendly claims or healthcare suitability
- small business focus
- agency/MSP friendliness

### Vendor pages
Each vendor page should include:
- summary
- who it is best for
- pros/cons
- pricing snapshot
- core features
- integrations
- ideal industries
- setup complexity
- screenshot/logo area
- editor notes
- CTA buttons
- structured FAQ
- schema markup

### Comparison pages
- side-by-side feature table
- pricing comparison
- best-for summary
- verdict by use case
- CTA module

## Functional requirements

### Search and filtering
- search vendors by name
- filter by features and verticals
- compare selected vendors
- preserve filters in URL params

### Lead flow
Two conversion paths:

#### Path A: click-through referral
- CTA from vendor pages and comparison pages
- event tracking for outbound clicks

#### Path B: concierge match form
Form fields:
- name
- email
- company
- phone optional
- industry
- monthly inbound call volume
- main use case
- current phone setup
- must-have integrations
- budget range
- timeline
- notes

On submit:
- save lead to database
- send notification email
- show thank-you page

### Quiz
The quiz can be a guided variant of the concierge form. It should output:
- recommended vendors
- CTA to talk to us for help choosing

## Non-functional requirements

- Fast page load
- Strong internal linking
- SEO-ready metadata and schema
- Mobile-first responsive design
- Easy content updates
- Reusable components
- Clean codebase for future categories

## SEO requirements

- Server-rendered pages
- Static generation where possible
- Dynamic sitemap.xml
- robots.txt
- canonical URLs
- Organization, Article, FAQ, Breadcrumb, and Product/SoftwareApplication-like schema where appropriate
- Comparison pages should target transactional search intent

## Content model

The site should support these content types:
- vendor
- comparison
- landing page
- guide/article
- FAQ block
- lead submission
- reviewer notes

## Scoring model

Each vendor should have a transparent internal score across weighted dimensions.

### Suggested weights
- call handling quality: 20
- integration depth: 15
- booking/workflow automation: 15
- ease of setup: 10
- pricing clarity/value: 10
- vertical suitability: 10
- handoff and escalation: 10
- reporting/analytics: 5
- support and onboarding: 5

Store both raw dimension scores and total weighted score.

## Seed vendor list for MVP

Start with placeholders or initial records for these sample vendors, then refine after live research:
- Smith.ai
- Goodcall
- Dialzara
- Abby Connect
- Rosie
- AnswerConnect
- Dialpad AI voice-related offering
- Retell-based providers if applicable
- Voiceflow-agency style solutions if they market inbound receptionist outcomes
- niche legal/medical AI answering vendors

Do not fabricate claims. Mark uncertain fields as null or "research needed".

## Admin workflow

Minimum acceptable admin workflow:
- manage vendors
- manage comparison pages
- manage guides
- review leads
- update featured vendor flags

Best option:
- simple internal admin dashboard protected by auth
- optional MDX content support for guides

## Visual direction

Tone:
- practical
- trustworthy
- clean
- slightly technical
- not flashy

Style:
- white/light neutral background
- dark text
- blue or teal accent acceptable
- tables and cards should be crisp and easy to scan
- avoid generic startup gradients unless subtle

## Components to build

- Header/nav
- Footer
- Hero
- Vendor card
- Comparison table
- Filter sidebar
- Badge system
- CTA banner
- Lead form
- Quiz stepper
- FAQ accordion
- Breadcrumbs
- Related content block
- Sticky CTA on mobile

## Suggested route map

- /
- /vendors
- /vendors/[slug]
- /compare
- /compare/[slug]
- /guides/[slug]
- /best-ai-receptionist-software
- /best-ai-receptionist-for-[vertical]
- /pricing
- /quiz
- /contact
- /admin
- /admin/vendors
- /admin/comparisons
- /admin/guides
- /admin/leads

## Phase plan for Claude Code

### Phase 1: foundation
- initialize app
- set up database and ORM
- create base layout and design system
- implement vendor model and seed script
- build homepage skeleton and vendors index

### Phase 2: money pages
- build vendor detail pages
- build compare page with filters
- build flagship best-of page
- build guide page template
- implement SEO metadata and schema

### Phase 3: conversion
- build lead form
- build quiz flow
- email notifications
- analytics events
- thank-you page

### Phase 4: admin and polish
- admin auth
- admin CRUD for vendors/guides/comparisons
- performance cleanup
- responsive polish
- sitemap generation

## Acceptance criteria

Claude Code should consider MVP complete when:
- site runs locally and builds cleanly
- homepage, vendor pages, compare page, and lead flow all work
- at least 10 seeded vendors render correctly
- filters function correctly
- metadata and schema are implemented on key templates
- lead submissions save to DB and notify by email stub or config
- code is organized and documented

## Deliverables requested from Claude Code

1. Working Next.js app
2. Prisma schema and migrations
3. Seed script with sample vendor data
4. Reusable UI components
5. Admin flow or documented content update method
6. README with setup steps
7. Environment variable template

## Notes for implementation

- Favor shipping a clean MVP over premature complexity
- Keep content/data structures generic enough to reuse for future comparison sites
- Use mock data if needed initially, but structure everything for real data
- Do not block the build on affiliate integrations or external APIs
- Build for editorial control and SEO first, then optimize operations
