# Frontend Sitemap and Build Plan

## Recommended file/folder structure

```text
callbotcompare/
  app/
    (marketing)/
      page.tsx
      pricing/page.tsx
      quiz/page.tsx
      contact/page.tsx
      vendors/page.tsx
      vendors/[slug]/page.tsx
      compare/page.tsx
      compare/[slug]/page.tsx
      guides/[slug]/page.tsx
      best-ai-receptionist-software/page.tsx
      best-ai-receptionist-for-[vertical]/page.tsx
    admin/
      page.tsx
      vendors/page.tsx
      comparisons/page.tsx
      guides/page.tsx
      leads/page.tsx
    api/
      leads/route.ts
      quiz/route.ts
    sitemap.ts
    robots.ts
    layout.tsx
    globals.css
  components/
    layout/
    marketing/
    vendors/
    comparisons/
    forms/
    ui/
  lib/
    db.ts
    seo.ts
    scoring.ts
    filters.ts
    analytics.ts
    validators.ts
  prisma/
    schema.prisma
    seed.ts
  public/
    images/
    logos/
  content/
    guides/
  types/
  README.md
```

## Page-by-page requirements

### 1) Homepage
Purpose:
- explain value fast
- direct users into compare flow, vendor pages, or quiz

Sections:
- hero
- top vendors
- compare by use case
- compare by features
- how we evaluate
- implementation help CTA
- recent guides/comparisons
- FAQ

Primary CTA:
- Compare tools
- Take the quiz

### 2) Vendors index
Purpose:
- searchable/filterable directory

Requirements:
- grid or table toggle optional
- filters sidebar
- sort by score, price, best for, newest
- badges for key capabilities

### 3) Vendor detail page
Purpose:
- rank for branded searches and convert buyers

Sections:
- summary card
- pricing snapshot
- best for / not ideal for
- features and integrations
- pros and cons
- setup notes
- alternatives
- CTA block
- FAQs

### 4) Compare hub
Purpose:
- let users evaluate multiple vendors quickly

Requirements:
- choose up to 3 vendors
- filter list by key features
- compare table with sticky headers on desktop
- mobile stacked comparison cards

### 5) Comparison detail page
Purpose:
- target buyer-intent comparison keywords

Template sections:
- quick verdict
- feature table
- pricing view
- best use case by business type
- final recommendation
- CTA to quiz

### 6) Quiz page
Purpose:
- capture leads and recommend vendors

Flow:
- step 1: industry
- step 2: inbound call volume
- step 3: need booking or routing
- step 4: required integrations
- step 5: budget and timeline
- result screen with recommended vendors
- capture email before full results if desired

### 7) Guides
Purpose:
- support SEO and internal linking

Template:
- clean article layout
- table of contents
- inline CTA blocks
- FAQ block
- related comparisons/vendors

## Design system notes

### Colors
- neutral base
- one strong accent color
- success color for recommendation badges
- warning color for setup complexity notes

### Typography
- clear sans-serif
- strong hierarchy
- table readability is more important than decorative style

### UI behavior
- sticky compare CTA on mobile
- persistent filter state in URL
- skeleton loading where helpful
- no modal-heavy UX on first launch

## Database-backed UI modules

### Vendor card fields
- name
- logo
- short summary
- score
- top 3 badges
- starting price if known
- CTA

### Vendor comparison table columns
- best for
- monthly starting price
- booking
- CRM integration
- human handoff
- multilingual
- after-hours support
- healthcare suitability
- setup complexity
- editor score

### Landing page modules
Make these modular so Claude Code can reuse them:
- hero
- proof strip
- ranked vendor list
- comparison table preview
- CTA banner
- FAQ section
- related content cards

## Suggested seed taxonomy

### Verticals
- law-firms
- home-services
- medical-offices
- dental-offices
- real-estate
- contractors
- small-business
- msp-agency

### Features
- crm-integration
- appointment-booking
- human-handoff
- multilingual-support
- after-hours-coverage
- sms-follow-up
- call-recording
- analytics-dashboard
- hipaa-friendly
- lead-qualification

## Initial page publishing order

### Tier 1
- homepage
- vendors index
- 10 vendor pages
- compare hub
- best-ai-receptionist-software
- quiz
- contact

### Tier 2
- 5 vertical pages
- 3 comparison pages
- pricing guide
- implementation checklist

### Tier 3
- 10 more vendor pages
- 5 more comparison/editorial pages
- admin cleanup and featured listings support

## Claude Code task list

### Task 1: scaffold
- create Next.js TypeScript app
- configure Tailwind and shadcn/ui
- add Prisma and Postgres config
- create base layout and nav/footer

### Task 2: data layer
- implement Prisma schema
- create seed data
- create query helpers
- create score calculation helper

### Task 3: templates
- build homepage
- build vendors list page
- build vendor detail template
- build compare hub and comparison detail template
- build guide template

### Task 4: conversion
- build quiz multi-step flow
- build lead form API route
- persist leads
- send notification email or log stub

### Task 5: SEO and polish
- metadata helpers
- schema markup
- sitemap and robots
- responsive QA
- loading and empty states

## Handoff notes for Claude Code

Ask Claude Code to:
- implement clean reusable components
- use seeded realistic placeholder data
- prioritize the directory, compare, and lead flow before blogging features
- keep the code generic enough that the same framework could be reused for other comparison sites later
