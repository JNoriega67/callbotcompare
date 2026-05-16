# Frontend Visual Design Spec

Project: CallBotCompare

## Short answer
No, I had not created a full visual design spec yet.

This file fixes that.

## Design goal
Make the site feel:
- credible
- warm
- editorial
- modern
- practical
- human-made

It should not feel like:
- a generic AI landing page
- a neon SaaS template
- a crypto site
- a faceless affiliate spam site
- a cold enterprise dashboard

## Core design direction
The site should look like a thoughtful productized editorial business.

Think:
- trustworthy buying guide
- polished service brand
- calm software review site

Not:
- shiny startup gimmicks
- oversized gradients everywhere
- random illustration packs
- too much glassmorphism
- overly rounded toy-like cards

## Typography
Use:
- **Montserrat** for headings and key CTA emphasis
- A clean body font for readability, preferably:
  - Inter, or
  - Source Sans 3, or
  - system sans fallback

### Recommended pairing
- Headings: Montserrat
- Body: Inter

### Typography rules
- Strong headline contrast
- Tight, clean heading scale
- Body text should be highly readable, not trendy
- Avoid giant hero text that feels like a template
- Use sentence case, not excessive all-caps

## Color palette
Use welcoming, grounded colors.

### Primary palette
- Deep slate/navy: `#1F3A5F`
- Soft teal: `#2F7F79`
- Warm cream background: `#F7F4EE`
- Clean white: `#FFFFFF`
- Charcoal text: `#1F2933`
- Muted gray text: `#5B6875`

### Accent/support colors
- Soft gold accent: `#D9A441`
- Pale sage highlight: `#DCE9E2`
- Light blue-gray border: `#D6DEE6`
- Success green: `#2E8B57`
- Warning amber: `#B7791F`

## Color usage rules
- Background should be mostly cream/white, not stark white everywhere
- Use slate/navy for trust and structure
- Use teal as the main interactive brand color
- Use gold sparingly for highlights, badges, and subtle emphasis
- Avoid loud bright blue gradients
- Avoid purple/pink AI cliché color systems

## Visual personality
The site should feel like a smart advisor, not a bot.

### Desired signals
- clear spacing
- restrained color use
- crisp comparison tables
- thoughtful hierarchy
- careful typography
- editorial polish

### Avoid
- too many pill badges everywhere
- giant glowing buttons
- auto-generated illustration feel
- repetitive card grids with no visual rhythm
- shallow “AI future” visuals

## Layout style
### General layout
- content width around 1200px max
- readable text width for editorial sections
- generous whitespace, but not empty startup minimalism
- alternate white and cream sections for rhythm

### Homepage structure style
- Hero should feel grounded and useful
- Comparison tables should be a visual anchor
- Use real content blocks, not filler icons
- Blend editorial credibility with buyer-tool clarity

## Hero style
### Hero should include
- a strong left-aligned headline
- a practical subheadline
- two clear CTAs
- a visual comparison panel or vendor snapshot card on the right

### Hero should not include
- abstract AI artwork
- floating blobs
- cheesy chatbot graphics
- fake 3D device mockups unless very restrained

## Components

### Header
- simple, premium, clean
- sticky on scroll
- logo text should feel editorial/product-like
- nav should be short and useful

### Buttons
- primary: teal background with white text
- secondary: white or cream with navy border
- subtle hover transitions only
- not oversized, not cartoonish

### Cards
- low-to-medium border radius
- soft shadows only
- strong borders are okay if subtle
- cards should feel structured, not bubbly

### Tables
- comparison tables are core UI
- make them extremely readable
- sticky header on desktop
- alternating row background acceptable
- use icons/checks sparingly and consistently

### Vendor cards
- include logo area
- short summary
- top badges only
- score visible but not gamified
- CTA anchored consistently

### Badges
- use sparingly
- examples:
  - Best for law firms
  - Strong integrations
  - Easy setup
- badge colors should be muted

## Section styling
### How we evaluate
Should feel editorial and credible.
Use a grid of scoring criteria with short blurbs, not generic icon soup.

### Compare by use case
Use tasteful cards with real business language.
Example:
- Law firms
- Home services
- Medical offices

### Concierge CTA
Should feel like advisory help, not a lead trap.
Use warm background tint and plainspoken copy.

## Imagery and graphics
Use very little decorative imagery.

Preferred:
- product UI snapshots
- clean comparison visuals
- restrained iconography
- subtle line icons

Avoid:
- Midjourney-style art
- generic smiling stock teams everywhere
- robot heads
- hologram graphics

## Spacing and rhythm
- 72 to 112px vertical padding on major desktop sections
- tighter spacing on mobile
- do not stack identical card sections back-to-back without variation
- alternate text-heavy and tool-heavy sections for rhythm

## Mobile style
- sticky bottom CTA acceptable
- filters should collapse cleanly
- comparison experience should turn into stacked cards gracefully
- maintain calm spacing and readability

## Anti-AI-generated design rules
Claude Code should explicitly avoid these patterns:
- default Tailwind demo look
- overuse of gradients
- random emoji/icon overload
- generic dashboard cards with no hierarchy
- excessive rounded-2xl everywhere
- all sections looking identical
- fake testimonials unless real
- fake stats unless real

## Suggested Tailwind token direction
### Backgrounds
- page background: warm cream
- cards: white
- alternate section: pale sage or very light blue-gray tint

### Border radius
- cards: 14px to 18px
- buttons: 10px to 12px
- inputs: 10px to 12px

### Shadows
- subtle only
- prefer border + soft shadow rather than dramatic floating panels

## Brand feel in one sentence
CallBotCompare should feel like a trusted buyer's guide built by people who understand operations, not like an AI-generated affiliate template.

## Implementation request for Claude Code
When building the frontend:
- use Montserrat for headings
- use a warm cream background system instead of pure white everywhere
- use deep slate + teal as the primary brand combination
- keep the interface clean, human, and editorial
- prioritize hierarchy, readability, and trust over flashy effects
- make the homepage and compare pages look intentionally designed, not auto-generated
