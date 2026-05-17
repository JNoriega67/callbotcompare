# Claude Frontend Design System for CallTreo

Project: CallTreo
Purpose: Give Claude a single source of truth for frontend design decisions.

## Core objective
Design CallTreo as a premium, modern, buyer-focused authority site for AI receptionist software.

The site should feel:
- credible
- premium
- clean
- editorial
- modern
- practical
- high-trust

The site should not feel:
- AI-generated
- template-like
- affiliate-spammy
- overly warm or creamy
- flashy startup-neon
- crypto-like
- gimmicky

## Design inspiration
Use the overall polish, density, and confidence of sites like RetellAI and Smith.ai as inspiration.

Important:
- do not copy them literally
- do not clone their layout
- do not copy their colors
- do not copy their brand system
- do not copy proprietary visual assets

Use them as reference points for:
- confidence
- product-marketing polish
- typography quality
- section rhythm
- visual density
- premium SaaS/editorial execution

## Brand positioning translated into design
CallTreo is not just a directory.
It is:
- a buyer guide
- a comparison engine
- an implementation services funnel
- an authority content hub

The design should support all four roles.

## Typography

### Font direction
We want a typography system influenced by the feel of Smith.ai.

### Approved font stack
#### Headings
- Primary heading font: **Montserrat**

Use Montserrat for:
- H1
- H2
- H3
- section headers
- strong CTA headings
- selected nav emphasis
- major comparison/page titles

#### Body / UI font
Use one of these in order of preference:
1. **Inter**
2. **Plus Jakarta Sans**
3. **Manrope**
4. system sans-serif fallback

If the current project already uses Inter well, keep Inter for body copy.

### Typography behavior
#### Headings should feel
- strong
- crisp
- premium
- deliberate
- clean

#### Body text should feel
- readable
- neutral
- modern
- non-gimmicky
- useful

### Typography rules
- do not use too many font weights
- do not use playful oversized display typography
- avoid cramped line-height on headers
- avoid overly airy text spacing that weakens authority
- keep paragraph width readable
- use sentence case, not excessive all caps
- use strong hierarchy between title, section header, body, metadata, and CTA copy

### Suggested type scale
- H1: 44 to 60px desktop, 34 to 42px mobile
- H2: 30 to 40px desktop, 26 to 32px mobile
- H3: 22 to 28px desktop, 20 to 24px mobile
- body large: 18 to 20px
- body standard: 16 to 18px
- small/meta text: 13 to 15px

### Suggested weights
- H1: 700
- H2: 700
- H3: 600 or 700
- body: 400 or 500
- nav: 500 or 600
- labels/meta: 500

## Color system

### Core palette
Use these colors consistently.

#### Primary colors
- Deep Slate / Navy: `#1F3A5F`
- Soft Teal: `#2F7F79`
- Soft Off-White: `#F5F7FA`
- White: `#FFFFFF`
- Charcoal Text: `#1F2933`
- Muted Gray Text: `#5B6875`

#### Supporting colors
- Pale Sage: `#DCE9E2`
- Light Blue Gray Border: `#D6DEE6`
- Success Green: `#2E8B57`
- Amber: `#B7791F`
- Soft Highlight Blue: `#E8F1F8`

### Color usage rules
- do not use cream backgrounds
- do not use purple/pink AI gradients
- do not use loud electric blue UI
- do not use excessive gradients
- page background should be soft off-white, not bright white everywhere
- cards should mostly be white
- text should primarily be charcoal and deep slate
- primary CTAs should use soft teal
- deep slate should anchor headings, nav, and strong structural elements
- use pale sage or soft highlight blue for subtle sectional variation

## Visual style

### Overall feel
CallTreo should feel like:
- a premium buyer guide
- a sharp productized editorial brand
- a software category authority

### Avoid these common bad patterns
- generic Tailwind demo UI
- giant glowing buttons
- random gradient blobs
- excessive rounded corners everywhere
- shallow feature-card spam
- fake startup illustrations
- generic “AI robot” art
- loud visual gimmicks

## Layout principles

### Width and rhythm
- max content width: around 1180 to 1240px
- readable editorial width for long-form text blocks
- use strong spacing rhythm between sections
- alternate layout patterns so every section does not look identical

### Section rhythm
Alternate among:
- editorial text sections
- comparison/tool sections
- grid/card sections
- CTA sections
- trust/methodology sections

The homepage and key pages should not feel like stacked identical blocks.

## Navigation
The nav should feel:
- clean
- premium
- compact
- confident

### Navigation behavior
- sticky on scroll
- short, useful top-level labels
- dropdowns can be structured, but do not become messy
- logo should have room to breathe
- CTA should not dominate the nav visually

## Logo usage
The logo/mark is now live and should be treated as a core brand asset.

Rules:
- do not crowd the logo
- do not oversize it
- preserve clean spacing around it
- ensure it works in both desktop and mobile header states

## Buttons

### Primary button
- background: Soft Teal `#2F7F79`
- text: White
- hover: slightly darker teal
- shape: softly rounded rectangle
- weight: medium to semibold

### Secondary button
- background: White or Soft Off-White
- border: Deep Slate or Light Blue Gray
- text: Deep Slate

### Button rules
- avoid huge bubbly buttons
- avoid neon hover states
- keep motion subtle

## Cards
Cards should feel:
- structured
- premium
- clean
- useful

### Card styling
- white background
- subtle border
- very soft shadow only if needed
- border radius around 14px to 18px
- strong internal spacing

## Tables
Comparison tables are core UI.

Requirements:
- very readable
- strong row separation
- premium but restrained
- sticky headers on desktop
- mobile should degrade gracefully into stacked cards when needed
- do not create tiny unreadable scroll-tables on mobile

## Page-level design guidance

### Homepage
Should feel like:
- a buyer guide homepage
- a category authority page
- a productized editorial experience

Must include:
- strong hero
- premium comparison preview
- methodology/trust section
- vertical browse section
- feature browse section
- get matched CTA
- services CTA
- internal linking to guides/comparisons

### Vendors directory
Should feel like:
- a serious tool
- not a generic filter grid

Needs:
- clear filter system
- better active filter visibility
- strong result card hierarchy
- clear actions per vendor

### Compare hub
Should feel like:
- a practical buyer utility
- a tool the user would actually share with a team

Needs:
- strong explanation
- visible next steps
- clear CTA after selection
- polished interaction states

### Vendor pages
Should feel like:
- editorial reviews with conversion paths

Needs:
- strong above-the-fold summary
- score block
- pricing snapshot
- best for / not ideal for
- CTAs for vendor click and setup help
- related vendors and comparisons

### Comparison pages
Should feel like:
- high-intent buyer decision pages

Needs:
- quick verdict
- strong side-by-side module
- “who each is for” guidance
- CTA to visit vendor
- CTA to get matched
- CTA for setup help

### Services pages
Should feel like:
- productized service offers
- not agency fluff

Needs:
- clear scope
- clear price framing
- clear deliverables
- clear CTA
- strong internal links from buyer pages

## Mobile behavior
Mobile should be intentional, not compressed desktop.

### Mobile priorities
- clarity
- speed
- strong CTA visibility
- readable card stacks
- easy filter access
- graceful comparison behavior

### Mobile rules
- sticky header
- optional sticky bottom CTA where appropriate
- filter drawer/sheet on directory page
- comparison tables should convert to cards
- keep card density readable

## Content feel
The visual design should match the tone of the copy.

That means:
- plainspoken
- sharp
- helpful
- practical
- not over-marketed

## Interaction feel
- hover states should be subtle
- motion should be restrained
- components should feel stable and premium
- no excessive animation

## Trust signals
Where useful, the design should help communicate:
- public methodology
- editorial independence
- disclosed referral relationships
- practical services
- credible implementation help

## Implementation rules for Claude
When changing the frontend:
- prefer reusable design tokens
- keep components consistent
- improve hierarchy before adding decoration
- use typography and spacing to create premium feel
- keep performance in mind
- do not over-design
- do not make it look like an AI-generated startup template

## Final design standard
If a page does not feel like a premium, serious, buyer-focused SaaS/editorial brand, keep improving it.

If a page feels like a generic UI kit demo with new copy, it is not done.
