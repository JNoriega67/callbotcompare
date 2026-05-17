/**
 * Config for productized service packages under /services.
 *
 * Each package gets its own subpage rendered via <ServicePage /> so the
 * services funnel feels like a real productized offer, not a single
 * dumping-ground page.
 *
 * Hub /services lists all packages with one-line positioning + price-from
 * + CTA into the subpage.
 */

export type ServicePackage = {
  /** Route slug — final URL is /services/<slug>. */
  slug: string;
  /** Order in the hub list (lower = earlier). */
  order: number;
  metaTitle: string;
  metaDescription: string;

  /** Small uppercase label at top of hero. */
  eyebrow: string;
  /** Card heading + page H1. */
  title: string;
  /** 1-sentence positioning shown on the hub card. */
  tagline: string;
  /** Intro paragraph on the package page. */
  intro: string;

  /** Who this is for, in 2-3 specific scenarios. */
  whoForBullets: ReadonlyArray<string>;
  /** Who shouldn't buy this — honest disqualifiers. */
  whoNotForBullets: ReadonlyArray<string>;

  /** Concrete outcomes — what changes for the buyer. */
  outcomes: ReadonlyArray<{ label: string; body: string }>;

  /** Scope: what's included. */
  included: ReadonlyArray<string>;
  /** Scope: what's NOT included (this engagement, not next one). */
  notIncluded: ReadonlyArray<string>;

  /** Process steps with rough timing. */
  process: ReadonlyArray<{ step: string; duration: string; body: string }>;

  /** Pricing — from-price and what moves it up. */
  pricingFrom: string;          // e.g. "From $800"
  pricingNotes: string;         // 1-2 sentences explaining
  pricingDrivers: ReadonlyArray<string>; // bullets

  /** Package FAQs. */
  faqs: ReadonlyArray<{ question: string; answer: string }>;

  /** Slugs of other packages to surface in the related block. */
  relatedSlugs?: ReadonlyArray<string>;
};

/* ------------------------------------------------------------------ */
/* Packages                                                           */
/* ------------------------------------------------------------------ */

export const SERVICE_VENDOR_SELECTION: ServicePackage = {
  slug: "vendor-selection",
  order: 1,
  metaTitle: "AI receptionist vendor selection — independent shortlist (CallTreo)",
  metaDescription:
    "Hire CallTreo to score your AI receptionist shortlist against your real call profile, integrations, and vertical. Output is a short written recommendation, not a deck. Fixed-scope from $800.",
  eyebrow: "Service · 01",
  title: "Vendor selection",
  tagline:
    "We rank your shortlist against your real call profile — and tell you which option is actually right, not the most expensive.",
  intro:
    "Picking an AI receptionist is a 1–3 week research project most teams don't have time for. We do that research for you against your actual numbers, then deliver a short written recommendation you can act on the same day. Vendor-neutral — we'll recommend whatever fits, including tools we have no commercial relationship with.",
  whoForBullets: [
    "You've narrowed it to 2–3 vendors and want a second opinion before committing.",
    "You haven't started and need someone to run the shortlist for you.",
    "You're skeptical of vendor sales calls and want an outside perspective.",
  ],
  whoNotForBullets: [
    "You already know exactly which vendor you want — skip to the setup engagement.",
    "You want a 50-page consultant deck. We write 3-page recommendations and answer questions live.",
    "Your monthly call volume is under 20 — at that scale, the cost of the engagement outweighs the upside.",
  ],
  outcomes: [
    {
      label: "Confidence in the pick",
      body: "You walk into the contract knowing why this vendor and not the others — with documented reasons your team can defend later.",
    },
    {
      label: "1–3 weeks saved",
      body: "We compress what would be your research project into a one-week turnaround. You get the time back.",
    },
    {
      label: "A baseline for setup",
      body: "Our recommendation doubles as the brief for the next engagement (whether you hire us for it or run it in-house).",
    },
  ],
  included: [
    "Discovery call (60 min): current call patterns, missed-call cost, decision-makers, integrations stack",
    "Review of your last 30 days of inbound call data (if available)",
    "Ranked recommendation of 2–3 vendors with the trade-offs for your situation",
    "Implementation effort + cost estimate for each option",
    "30-minute review call to walk through it and answer questions",
    "Written 3-page recommendation document, yours to keep",
  ],
  notIncluded: [
    "Actually building the integration (separate engagement)",
    "Negotiating contract terms with the vendor",
    "Ongoing managed services",
  ],
  process: [
    {
      step: "Kickoff call",
      duration: "60 min",
      body: "We walk through your current setup, what's working and what isn't, who's on the buying committee, and what 'good' looks like to you.",
    },
    {
      step: "Research + scoring",
      duration: "3–5 business days",
      body: "We test the integrations you care about, dig into pricing fine print, and check recent product changes that haven't made it to comparison pages yet.",
    },
    {
      step: "Written recommendation delivered",
      duration: "Day 6–7",
      body: "3 pages, no fluff: ranked picks, reasons, implementation effort, and what to ask in the demo. Sent as a PDF + editable doc.",
    },
    {
      step: "Review call",
      duration: "30 min",
      body: "We walk through it together, answer questions, and adjust if your context has shifted since kickoff.",
    },
  ],
  pricingFrom: "From $800",
  pricingNotes:
    "Flat fee, 50% upfront, 50% on delivery. We refund the back half if you find the work wasn't useful.",
  pricingDrivers: [
    "Multi-vertical or multi-location practices add 1–2 days of analysis",
    "More than 5 vendors to evaluate adds incremental cost",
    "Hybrid AI + human shortlist research is a separate scope (we'll quote it)",
  ],
  faqs: [
    {
      question: "Do you have referral relationships with any of the vendors you might recommend?",
      answer:
        "With some, yes — fully disclosed on our /disclosure page. None of the referral relationships move ranks in our public methodology, and our paid recommendations are no different. If the right vendor for you is one we don't earn a fee from, we recommend that one.",
    },
    {
      question: "What if our shortlist is bigger than 3 vendors?",
      answer:
        "We cap the recommended shortlist at 3 for clarity, but we can evaluate up to ~5 vendors in research. Above that, we quote an add-on.",
    },
    {
      question: "Can we hire you only for the setup, not the selection?",
      answer:
        "Yes — see the AI receptionist setup engagement. That assumes you've already picked the vendor.",
    },
    {
      question: "What if we hate your recommendation?",
      answer:
        "Then we refund the back half of the engagement, no questions. Our incentive is to make the right call, not to push you toward whatever we tested most recently.",
    },
  ],
  relatedSlugs: ["setup", "integration"],
};

export const SERVICE_SETUP: ServicePackage = {
  slug: "setup",
  order: 2,
  metaTitle: "AI receptionist setup — done-for-you launch (CallTreo)",
  metaDescription:
    "Done-for-you AI receptionist setup: account configuration, call flow design, prompts in your voice, escalation paths, and 2 weeks of post-launch tuning. Fixed-scope from $1,800.",
  eyebrow: "Service · 02",
  title: "AI receptionist setup",
  tagline:
    "End-to-end launch on the vendor you've picked — without burning an internal week.",
  intro:
    "Once you've picked a vendor, the setup is its own multi-week project: account configuration, greeting scripts, call flows, fallback paths, testing, then tuning. We run that project for you so your team can stay focused on actual customers — and so the AI sounds like you on day one, not month two.",
  whoForBullets: [
    "You've signed with a vendor and need it launched cleanly — not in 2 months when someone finds time.",
    "Your team is small and you don't have a project owner to run a 2-week launch.",
    "You've launched once before and the call flow ended up sounding generic. You want it tuned right.",
  ],
  whoNotForBullets: [
    "You enjoy writing call scripts and have the time. Save the money; do it yourself.",
    "You haven't picked a vendor yet — start with the vendor selection engagement.",
    "Your call flows are wildly nonstandard (10+ branches, multilingual edge cases). We'll quote that custom.",
  ],
  outcomes: [
    {
      label: "Live in 2–3 weeks",
      body: "From kickoff to a real number ringing the AI, ready to take production calls.",
    },
    {
      label: "Sounds like your business",
      body: "Voice tuned to your brand — not the vendor's default 'How may I direct your call?' robot voice.",
    },
    {
      label: "Stops sounding generic",
      body: "Real escalation rules for after-hours, urgent calls, off-script questions. Not a one-size-fits-all script.",
    },
  ],
  included: [
    "Vendor account configuration, number provisioning, routing rules",
    "Greeting + qualification scripts in your tone of voice",
    "FAQ branch built from your real customer questions (top 20)",
    "Escalation paths for after-hours, urgent, and off-script calls",
    "End-to-end live testing on a parallel number before cut-over",
    "Two weeks of post-launch tuning + prompt revisions",
  ],
  notIncluded: [
    "CRM / calendar integration (separate engagement — see Integration package)",
    "Hardware / physical phone systems (we work at the software layer)",
    "Ongoing call flow changes after the 2-week tuning window (we'll quote a retainer if you want one)",
  ],
  process: [
    {
      step: "Kickoff + brand voice capture",
      duration: "60 min + async",
      body: "Brand voice, top 20 customer questions, current call handling. We send a brief that captures all this in writing.",
    },
    {
      step: "Call flow design",
      duration: "Week 1",
      body: "We design the actual paths your business needs (qualification, FAQ, escalation, after-hours) and write the prompts for each branch.",
    },
    {
      step: "Vendor configuration",
      duration: "Week 1–2",
      body: "Account setup, number provisioning, routing rules, all the back-office config.",
    },
    {
      step: "Parallel-number live testing",
      duration: "Week 2",
      body: "We point the AI at a parallel number and run real calls through it. Anything that sounds off gets tuned before cut-over.",
    },
    {
      step: "Cut-over + 2-week tuning",
      duration: "Week 3+",
      body: "Production number switches to the AI. We listen to recordings and tune the prompts daily for the first 2 weeks.",
    },
  ],
  pricingFrom: "From $1,800",
  pricingNotes:
    "Flat fee, 50% upfront, 50% at launch. Excludes the vendor's own monthly fees.",
  pricingDrivers: [
    "Multi-location setups (each location adds ~$400–$800)",
    "Multilingual call flows (Spanish included; other languages add scope)",
    "After-hours / 24/7 hybrid (AI + live escalation) adds 1 week + scope",
    "Highly custom verticals (legal intake, medical PHI) add scope for compliance review",
  ],
  faqs: [
    {
      question: "How long until calls are live?",
      answer:
        "Most setups go live in 2–3 weeks from kickoff. Complex multi-location or legal/medical setups can take 4–6 weeks. We'll commit to a date in the kickoff call.",
    },
    {
      question: "What if the call flow needs to change after launch?",
      answer:
        "The first 2 weeks of tuning are included. After that, small changes (1–2 prompt edits) are usually 30 min of work — we'll either bill hourly or quote a small retainer if you expect ongoing changes.",
    },
    {
      question: "Do you handle the vendor relationship for us?",
      answer:
        "During setup, yes — we work directly with the vendor's onboarding team on your behalf. After launch, the account is in your name and you own the vendor relationship.",
    },
    {
      question: "What if we need to switch vendors later?",
      answer:
        "Most of the work (call flows, prompts, FAQ branch, escalation rules) is portable. Switching usually takes 1–2 weeks instead of the full setup time.",
    },
  ],
  relatedSlugs: ["vendor-selection", "integration", "call-flow"],
};

export const SERVICE_INTEGRATION: ServicePackage = {
  slug: "integration",
  order: 3,
  metaTitle: "AI receptionist CRM & booking integration setup (CallTreo)",
  metaDescription:
    "We wire your AI receptionist into HubSpot, Salesforce, GoHighLevel, ServiceTitan, Cal.com, or your custom backend — with field mapping, dedup, and end-to-end testing. Fixed-scope from $1,200.",
  eyebrow: "Service · 03",
  title: "CRM & booking integration",
  tagline:
    "Wire the AI into your CRM, calendar, or FSM tool so calls become structured records, not email summaries.",
  intro:
    "Most AI receptionist failures aren't failures of the AI — they're failures of integration. An AI that emails you a transcript every call is barely better than voicemail. We wire the vendor's webhook or native integration into your real CRM/calendar/FSM, with proper field mapping and dedup, so calls land as structured records your team can actually work.",
  whoForBullets: [
    "Your AI works, but the data lands in someone's inbox instead of the CRM.",
    "You need it to book directly into Calendly / Google / Outlook, not text the customer a link.",
    "You run on a vertical tool (ServiceTitan, Jobber, Clio) and the vendor's standard integration doesn't cover it.",
  ],
  whoNotForBullets: [
    "You're happy with email summaries (some teams genuinely are; that's fine).",
    "You haven't launched the AI yet — bundle this into the Setup engagement instead.",
    "Your CRM is fully bespoke with no documented API (we can't wire what we can't reach).",
  ],
  outcomes: [
    {
      label: "Structured data, not email summaries",
      body: "Calls land as contacts/leads/tasks in the right CRM record with the right fields, every time.",
    },
    {
      label: "No more dedup babysitting",
      body: "Repeat customers get matched against their existing record automatically — no duplicate contacts piling up.",
    },
    {
      label: "Calendar bookings on the call",
      body: "If booking is in scope, customers leave the call with a confirmed appointment — not a 'we'll text you a link.'",
    },
  ],
  included: [
    "Field mapping (caller intent, qualification answers, source, custom fields)",
    "CRM integration: native, webhook, or via a connector (Zapier / n8n / Make) — whatever fits",
    "Dedup against existing contacts (by phone + email)",
    "Calendar booking flow with conflict + buffer rules",
    "Retry + error handling so a failed API call doesn't drop the lead",
    "End-to-end test plan + runbook for your ops team",
  ],
  notIncluded: [
    "Building a CRM from scratch (we integrate into one that exists)",
    "Custom CRM workflow / automation design (separate scope)",
    "Ongoing maintenance of the integration after the engagement",
  ],
  process: [
    {
      step: "Discovery + integration scoping",
      duration: "60 min",
      body: "We map your CRM/calendar setup, identify required fields, and confirm whether the vendor supports the integration natively or needs a connector.",
    },
    {
      step: "Field mapping + connector setup",
      duration: "Week 1",
      body: "Configure field mapping in the vendor's integration UI or build the connector workflow.",
    },
    {
      step: "Dedup + booking logic",
      duration: "Week 1–2",
      body: "Wire dedup rules, calendar conflict handling, error retry. Test with real-looking call data.",
    },
    {
      step: "End-to-end test + handoff",
      duration: "Week 2",
      body: "Run 10–20 real call simulations end-to-end. Document the integration + runbook. Hand off to your ops team.",
    },
  ],
  pricingFrom: "From $1,200",
  pricingNotes:
    "Flat fee, 50% upfront, 50% at handoff. Excludes any connector subscription costs (Zapier, n8n, Make).",
  pricingDrivers: [
    "Native integration vs webhook+connector (native is cheaper)",
    "Number of custom fields to map (10+ adds scope)",
    "Multi-pipeline / multi-record-type routing",
    "Custom API or undocumented endpoints (quoted separately)",
  ],
  faqs: [
    {
      question: "Which CRMs and calendars do you integrate with?",
      answer:
        "HubSpot, Salesforce, Pipedrive, Zoho, GoHighLevel, ServiceTitan, Housecall Pro, Jobber, Clio, Cal.com, Calendly, Google Calendar, Outlook 365 — and anything else with an API. See our integration pages for tool-specific guidance.",
    },
    {
      question: "What if the vendor doesn't have a native integration?",
      answer:
        "We build a webhook + connector (typically Zapier, n8n, or Make) that turns the AI's call events into the right CRM action. Slightly slower than native but functional for almost any case.",
    },
    {
      question: "Will you handle the security review with our IT team?",
      answer:
        "Yes if your CRM is enterprise (Salesforce Enterprise, HubSpot Enterprise) and needs a formal security review. We'll provide docs and answer questions; we can't speed up the review itself.",
    },
    {
      question: "What if the integration breaks later?",
      answer:
        "We document the integration in a runbook so your team can fix the common breakages. For ongoing maintenance, we offer a small monthly retainer — usually optional.",
    },
  ],
  relatedSlugs: ["setup", "call-flow", "vendor-selection"],
};

export const SERVICE_CALL_FLOW: ServicePackage = {
  slug: "call-flow",
  order: 4,
  metaTitle: "AI receptionist call flow & routing design (CallTreo)",
  metaDescription:
    "Vendor-agnostic call flow and routing design for AI receptionists. We map your real call paths, write the AI prompts, and document edge-case handling. Fixed-scope from $1,000.",
  eyebrow: "Service · 04",
  title: "Call flow & routing design",
  tagline:
    "Pure design work: we map your real call paths, write the AI prompts, and document the edge cases.",
  intro:
    "Most teams' call flow has at least 5–8 real branches (qualification, routing, after-hours, urgent escalation, language switch, FAQ deflection, billing). Vendor templates don't cover yours. We design the actual flow your business needs and hand you the prompts ready to drop into any vendor — or to brief your own implementation team with.",
  whoForBullets: [
    "Your calls aren't a simple 'qualify, capture, hand off' — you have real branches.",
    "You're DIY-ing the AI launch and want the call flow done by someone who's built dozens.",
    "You've launched once and the AI sounds generic. The call flow is the fix; the vendor isn't the problem.",
  ],
  whoNotForBullets: [
    "Your call flow is simple (single department, business hours only, no booking). Skip this; the vendor's template will be fine.",
    "You want us to also wire the integrations and tune post-launch. Get the Setup package instead — flow is included.",
    "You don't have a vendor picked. Start with vendor selection so we can tune the flow to the vendor's prompt format.",
  ],
  outcomes: [
    {
      label: "Vendor-agnostic flow",
      body: "Documented in a format that works with any AI receptionist — easy to swap vendors later without re-designing.",
    },
    {
      label: "Prompts in your voice",
      body: "The AI sounds like your business, not the vendor's default template. Major difference on customer perception.",
    },
    {
      label: "Edge cases documented",
      body: "After-hours, urgent, off-script, language switch, billing complaint — each has a documented path, not a hope.",
    },
  ],
  included: [
    "Discovery: current call patterns, top 10 call types, who currently answers each",
    "Call flow diagram (qualification → routing → escalation) as a single canonical document",
    "Prompt set covering each branch, in your tone of voice",
    "Edge-case playbook: refunds, complaints, urgent escalation, language switch, after-hours",
    "Optional A/B variants for greeting and qualification scripts",
    "30-min handoff call with your implementation team (in-house or vendor)",
  ],
  notIncluded: [
    "Wiring the flow into the vendor (Setup engagement)",
    "Building integrations (Integration engagement)",
    "Ongoing flow updates after handoff (retainer optional)",
  ],
  process: [
    {
      step: "Discovery",
      duration: "60 min",
      body: "Map current call handling, identify top 10 call types, capture brand voice samples.",
    },
    {
      step: "Flow design + diagram",
      duration: "3–5 business days",
      body: "Build the canonical flow diagram and write the prompt set for each branch.",
    },
    {
      step: "Review + iterate",
      duration: "Async + 30 min call",
      body: "You read it, mark up what's wrong, we iterate. Usually 1–2 rounds.",
    },
    {
      step: "Handoff",
      duration: "30 min",
      body: "Walk through the final document with whoever will implement it. Answer questions, hand over editable files.",
    },
  ],
  pricingFrom: "From $1,000",
  pricingNotes:
    "Flat fee, 50% upfront, 50% on delivery. Includes one round of revisions; further revisions billed at $200/hour.",
  pricingDrivers: [
    "Multi-language flows add scope per language",
    "10+ branches (large multi-department orgs) add scope",
    "Vertical-specific compliance (legal intake, HIPAA-sensitive medical) adds review time",
  ],
  faqs: [
    {
      question: "Does the call flow work with any AI vendor?",
      answer:
        "Yes — the design is vendor-agnostic. The prompts are written in plain language that works in any vendor's prompt builder. We'll add vendor-specific formatting if you've already picked one.",
    },
    {
      question: "Can you also implement it in the vendor for us?",
      answer:
        "Yes — that's the Setup engagement. If you're hiring us for both, we bundle them at a discount.",
    },
    {
      question: "What if our call flow needs change in 6 months?",
      answer:
        "Most clients re-engage for an hour or two when the flow needs a meaningful update. Small tweaks you can do yourself with the documented playbook.",
    },
    {
      question: "Will the flow handle multilingual calls?",
      answer:
        "Yes, if your business serves multilingual customers. We design the language-switch path, write the prompts in each language, and handle the escalation rules. Spanish is included; other languages add scope.",
    },
  ],
  relatedSlugs: ["setup", "vendor-selection"],
};

export const SERVICE_PACKAGES: Record<string, ServicePackage> = {
  [SERVICE_VENDOR_SELECTION.slug]: SERVICE_VENDOR_SELECTION,
  [SERVICE_SETUP.slug]: SERVICE_SETUP,
  [SERVICE_INTEGRATION.slug]: SERVICE_INTEGRATION,
  [SERVICE_CALL_FLOW.slug]: SERVICE_CALL_FLOW,
};

export const SERVICE_PACKAGES_ORDERED: ReadonlyArray<ServicePackage> = Object.values(SERVICE_PACKAGES).sort(
  (a, b) => a.order - b.order,
);
