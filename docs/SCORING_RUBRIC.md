# Vendor Scoring Rubric

## Purpose
Use this rubric to assign consistent internal scores to vendors. The rubric should help the site rank vendors without pretending to have false precision.

Use a 1 to 10 scale for each dimension.
- 1 to 3 = weak
- 4 to 6 = adequate or mixed
- 7 to 8 = strong
- 9 to 10 = category-leading

## Weighted dimensions
- Call handling quality: 20%
- Integration depth: 15%
- Booking/workflow automation: 15%
- Ease of setup: 10%
- Pricing clarity/value: 10%
- Vertical suitability: 10%
- Handoff and escalation: 10%
- Reporting/analytics: 5%
- Support/onboarding: 5%

Total score formula:
`(callHandling*0.20) + (integrations*0.15) + (automation*0.15) + (easeOfSetup*0.10) + (pricingValue*0.10) + (verticalFit*0.10) + (handoff*0.10) + (reporting*0.05) + (support*0.05)`

## Field-by-field scoring guidance

### 1) Call handling quality
Score based on:
- how natural the conversation flow appears
- ability to answer common questions
- routing reliability
- handling of interruptions or edge cases
- overall confidence in first-contact experience

### 2) Integration depth
Score based on:
- native CRM integrations
- calendar integrations
- workflow tools or API/webhook support
- ease of passing data into downstream systems
- breadth of practical business stack support

### 3) Booking/workflow automation
Score based on:
- appointment scheduling ability
- qualification logic
- follow-up triggers
- branching workflows
- multi-step task handling beyond simple message capture

### 4) Ease of setup
Score based on:
- time to initial launch
- technical complexity
- quality of onboarding flow
- need for developer or agency help
- amount of ongoing tuning required

### 5) Pricing clarity/value
Score based on:
- whether pricing is visible or easy to understand
- whether plans map cleanly to buyer needs
- perceived value relative to capability
- hidden complexity in pricing model

### 6) Vertical suitability
Score based on:
- whether the tool fits key industries well
- available templates or workflows by use case
- evidence of vertical-specific support or positioning
- practical fit for SMB operational environments

### 7) Handoff and escalation
Score based on:
- ability to transfer to a human
- quality of escalation logic
- fallback handling for difficult calls
- emergency or urgent routing support

### 8) Reporting and analytics
Score based on:
- dashboards
- call summaries
- conversion or lead visibility
- operational reporting quality
- usefulness for managers

### 9) Support and onboarding
Score based on:
- implementation support
- responsiveness
- training/help resources
- account support quality
- confidence a normal SMB can get value quickly

## Data fields that support ranking

### Core vendor fields
- name
- slug
- websiteUrl
- summary
- bestFor
- pricingModel
- pricingFromUsd
- setupComplexity
- overallScore

### Boolean flags
- hasAppointmentBooking
- hasCrmIntegration
- hasHumanHandoff
- hasMultilingual
- has24x7
- hipaaFriendly

### Relational fields
- verticals
- features

### Editorial fields
- editorVerdict
- pricingNotes
- integrationsNotes
- handoffNotes
- supportNotes
- reportingNotes
- verticalFitNotes

## Scoring workflow recommendation
1. Fill objective fields first
2. Score each dimension with short editor notes
3. Calculate weighted score automatically
4. Review for outliers before publishing
5. Mark incomplete fields as research needed rather than inventing certainty

## Suggested UI usage
- Show rounded overall score publicly
- Show a limited subset of sub-scores publicly if useful
- Keep full editor notes internal if needed
- Use badges for standout strengths instead of overloading users with raw scoring detail
