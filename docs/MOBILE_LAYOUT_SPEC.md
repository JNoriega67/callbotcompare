# Mobile Layout Spec

Project: CallBotCompare

## Goal
Make the mobile experience feel deliberate, fast, and readable.

It should not feel like a desktop site compressed into a phone.

## Mobile design priorities
- clarity first
- short scroll chunks
- obvious CTA paths
- readable comparison experience
- easy filter interaction

## Header behavior
- compact sticky header
- wordmark left
- menu icon right
- optional primary CTA in menu or as compact button if space allows

## Hero on mobile
Order:
1. eyebrow
2. headline
3. subheadline
4. primary CTA
5. secondary CTA
6. proof bullets
7. comparison preview card

Notes:
- comparison preview should stack beneath copy
- do not let the hero become too tall with empty space

## Sections on mobile
### Top picks
- stacked cards
- each card should keep CTA visible without too much scrolling

### Compare by use case
- 2-column grid if width allows
- otherwise 1-column cards with strong tap targets

### Compare by feature
- compact tile grid
- short labels only

### How we evaluate
- stacked rows or accordion-style content if needed
- keep the scoring explanation simple

### FAQ
- clean accordion, large tap targets

## Vendor directory on mobile
### Search and filter behavior
- sticky search bar near top if practical
- filter drawer or bottom sheet
- active filters shown as chips above results

### Vendor cards
- concise summary
- top badges only
- CTA visible without expansion
- score near title area

## Comparison experience on mobile
This is the most important responsive challenge.

### Preferred approach
Use stacked comparison cards instead of forcing a tiny unreadable table.

Each vendor card should show:
- name
- score
- best for
- booking
- integrations
- handoff
- pricing signal
- CTA

### Optional secondary view
Allow horizontal scroll table only if still readable.

## Vendor detail pages on mobile
Recommended order:
1. summary card
2. CTA
3. best for / not ideal for
4. pricing snapshot
5. feature list
6. score breakdown
7. pros and cons
8. alternatives
9. FAQ

## Quiz on mobile
- one question per screen block
- large controls
- visible progress indicator
- short helper text
- submit button always easy to reach

## Forms on mobile
- single-column only
- 44px+ tap height targets
- labels always visible
- avoid long unbroken paragraphs around forms

## Sticky mobile CTA
Optional but recommended:
- sticky bottom bar for key pages
- label examples:
  - Compare tools
  - Get recommendations
  - Visit vendor

Should be subtle and not obstructive.

## Mobile spacing rules
- 20 to 24px horizontal padding
- 56 to 72px vertical section spacing
- compact spacing inside cards without feeling cramped

## Mobile anti-patterns to avoid
- giant hero with too much dead space
- unreadable comparison tables
- filters hidden too deeply
- tiny tap targets
- too many badges in one card
- repeated sections that all look the same

## Implementation note for Claude Code
Design mobile intentionally from the start. Do not treat it as a late CSS cleanup pass.
