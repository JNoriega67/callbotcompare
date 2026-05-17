/**
 * Config objects driving the commercial landing pages (best-X-for-Y).
 *
 * Each page renders through <CommercialLanding /> — copy, filter, FAQs,
 * and buyer notes live here so we add a new page by writing a config +
 * a 5-line page.tsx wrapper.
 */

export type CommercialFilter =
  | { type: "vertical"; slug: string }
  | { type: "capability"; slug: "booking" | "crm" | "handoff" | "multilingual" | "247" | "hipaa" }
  | { type: "feature"; slug: string };

export type CommercialPageConfig = {
  /** Route slug (path relative to /). */
  slug: string;
  metaTitle: string;
  metaDescription: string;

  /** Small uppercase label at the top of the hero. */
  eyebrow: string;
  /** Main headline (rendered in heading font with weight contrast). */
  headlineLead: string;
  headlineAccent?: string;
  /** 2–4 sentence lede that explains the page. */
  intro: string;

  /** Filter that defines "who counts" for this page. */
  filter: CommercialFilter;

  /**
   * What we scored heavy in this use case. 3–5 items. Honest editorial
   * framing — not feature checkboxes.
   */
  criteria: ReadonlyArray<{ title: string; body: string }>;

  /** Practical things a buyer in this segment should know. 2–4 items. */
  buyerNotes: ReadonlyArray<{ title: string; body: string }>;

  /** Page-specific FAQs. */
  faqs: ReadonlyArray<{ question: string; answer: string }>;

  /** Slugs of other commercial pages to surface in the "related" block. */
  relatedSlugs?: ReadonlyArray<string>;
};

/* ------------------------------------------------------------------ */
/* Pages                                                              */
/* ------------------------------------------------------------------ */

export const COMMERCIAL_LAW_FIRMS: CommercialPageConfig = {
  slug: "best-ai-receptionist-for-law-firms",
  metaTitle: "Best AI receptionist for law firms (2026)",
  metaDescription:
    "Independent comparison of AI receptionist software for law firms. Scored on intake quality, conflict-check workflow, after-hours coverage, and CRM/CMS integration. No fabricated claims.",
  eyebrow: "Best for · Law Firms",
  headlineLead: "The right AI receptionist for a law firm",
  headlineAccent: "captures intake, not just calls.",
  intro:
    "For a firm, the call that arrives at 7:38pm is a potential matter — or a conflict you can't take. We rank AI receptionists for legal practices on the things that decide whether a missed call becomes a client: intake quality, routing logic, after-hours coverage, and how cleanly the data lands in your CRM or case management system.",
  filter: { type: "vertical", slug: "law-firms" },
  criteria: [
    {
      title: "Intake quality, not call quantity",
      body: "A receptionist that answers 100% of calls but mangles the matter description, jurisdiction, or opposing-party name has cost you the intake. We weight intake-script flexibility heavily over raw uptime.",
    },
    {
      title: "Conflict-check friendly",
      body: "Tools that surface caller names, opposing-party names, and matter type before connection — so reception or intake staff can run a conflict check before the call is transferred or a follow-up is scheduled.",
    },
    {
      title: "After-hours coverage that doesn't sound after-hours",
      body: "The 7pm caller often becomes the morning consult. We score vendors on how natural the after-hours flow sounds and how reliably the AI captures the contact info you'd need to follow up the next morning.",
    },
    {
      title: "Clean handoff to a real human",
      body: "Some intakes need a paralegal or attorney on the phone today. Vendors with strong human-handoff paths (live transfer, callback workflow, urgent escalation) rank higher for legal.",
    },
    {
      title: "Lands data in something you actually use",
      body: "CRM (Clio Grow, Lawmatics), case management (Clio, MyCase, PracticePanther), or a custom intake system — integrations that put structured intake data in the right place rank above generic email summaries.",
    },
  ],
  buyerNotes: [
    {
      title: "Don't use a generic chatbot script",
      body: "Legal intake is more structured than most SMB call flows. Insist on per-practice-area script branches: family vs PI vs estate vs business — the intake fields are different and so is the urgency rubric.",
    },
    {
      title: "Privilege and recording rules vary by state",
      body: "Single- vs two-party consent rules apply to AI-recorded calls too. Most vendors handle the consent prompt, but you should review their default greeting language with your ethics counsel before launch.",
    },
    {
      title: "Hybrid > pure AI for high-value matters",
      body: "For high-stakes practice areas (PI, criminal defense, large business), an AI + live receptionist hybrid still beats pure AI on conversion. The AI handles qualification, the human handles judgment.",
    },
  ],
  faqs: [
    {
      question: "Is using an AI receptionist for client intake an ethics issue?",
      answer:
        "Most state bars allow it, but you should disclose recording, avoid giving legal advice through the AI, and ensure conflict checks happen before any matter is opened. Treat the AI as a structured intake form that answers the phone — not as a paralegal.",
    },
    {
      question: "Can AI receptionists run conflict checks before transferring a call?",
      answer:
        "Not directly — but they can capture caller name, opposing party, and matter type, and pause/route based on it. The actual conflict check still happens via your CMS lookup. We flag vendors that pass these fields cleanly to the CMS rather than dumping them into an email.",
    },
    {
      question: "Should I use AI for after-hours only, or 24/7?",
      answer:
        "For most firms, the highest-value calls are after-hours and weekend. Starting with after-hours-only is a low-risk way to test the workflow. Move to 24/7 once you've validated the intake quality and CRM handoff.",
    },
    {
      question: "What about HIPAA / PHI? Family law calls can include health info.",
      answer:
        "If your practice handles cases involving health information, prefer a vendor that markets HIPAA-friendly workflows (encryption at rest, BAA available). Two of the vendors in our directory call this out explicitly.",
    },
  ],
  relatedSlugs: ["best-ai-phone-agent-with-crm-integration"],
};

export const COMMERCIAL_CRM_INTEGRATION: CommercialPageConfig = {
  slug: "best-ai-phone-agent-with-crm-integration",
  metaTitle: "Best AI phone agent with CRM integration (2026)",
  metaDescription:
    "Independent comparison of AI phone agents with real CRM integration — not just an email summary. Scored on native vs middleware, field mapping, deduplication, and lead-scoring handoff.",
  eyebrow: "Best for · CRM-integrated",
  headlineLead: "An AI phone agent is only as good as",
  headlineAccent: "what lands in your CRM.",
  intro:
    "Buying an AI phone agent that emails you a call summary is a missed opportunity. The whole point is to push structured caller data into your CRM the moment the call ends — with the right fields, deduplicated against existing contacts, and tagged for your follow-up workflow. This page ranks vendors on how seriously they treat that integration, not on whether the box exists.",
  filter: { type: "capability", slug: "crm" },
  criteria: [
    {
      title: "Native integration > Zapier",
      body: "A native integration with your CRM (HubSpot, Salesforce, Pipedrive, GoHighLevel, etc.) gets richer field mapping, real-time pushes, and better error handling than a Zap. Webhook-with-built-in-retry comes second; pure Zapier comes third.",
    },
    {
      title: "Field mapping you can edit",
      body: "Caller intent, qualification answers, source, recording link, transcript — these need to land in the right CRM properties (often custom). Vendors that let you map fields without engineering help rank higher.",
    },
    {
      title: "Deduplication against existing contacts",
      body: "If a current customer calls, the AI shouldn't create a new lead — it should update the existing contact and log the call against it. Vendors that handle dedup by phone, email, or both rank higher.",
    },
    {
      title: "Lead scoring + workflow handoff",
      body: "Bonus points for vendors that can trigger downstream workflows in your CRM (assign to rep, advance lifecycle stage, schedule follow-up task) without you wiring it externally.",
    },
  ],
  buyerNotes: [
    {
      title: "Confirm your specific CRM, not just 'we integrate'",
      body: "'CRM integration' on a marketing site usually means HubSpot and Salesforce. If you're on GoHighLevel, Pipedrive, or a less common CRM, ask for a live demo of the integration with your exact tool before signing.",
    },
    {
      title: "Watch for monthly volume caps",
      body: "Some pricing plans cap CRM pushes at a number well below normal SMB call volume. A $99/mo plan that caps at 200 monthly pushes runs out by the 8th if you take 30 calls/day. Read the fine print.",
    },
    {
      title: "Plan the failure mode",
      body: "What happens if the CRM API is down when a call lands? Best vendors queue + retry. Average vendors silently drop. This is a routine question to ask in a demo — the answer tells you a lot.",
    },
  ],
  faqs: [
    {
      question: "Which CRMs do most AI phone agents integrate with natively?",
      answer:
        "HubSpot and Salesforce are universal. Pipedrive, Zoho, and GoHighLevel are common second-tier. Industry-specific CRMs (ServiceTitan, Clio, etc.) are hit-or-miss and almost always require checking with the vendor directly — and ideally a live demo of the integration.",
    },
    {
      question: "Is a Zapier integration good enough?",
      answer:
        "It works, but you'll spend Zapier task credits at SMB call volume and you lose richer features like real-time bi-directional sync. Treat Zapier as the fallback when no native integration exists, not the default.",
    },
    {
      question: "How do these tools handle existing contacts vs new leads?",
      answer:
        "Mid-tier vendors create a new contact on every call. Better vendors look up by phone number first and either update the existing contact + log the call against it, or warn the rep that this is an existing customer before transferring.",
    },
    {
      question: "Can the AI trigger a downstream workflow (assign rep, advance stage)?",
      answer:
        "Some can natively, some require you to wire it in your CRM's own automation builder. Worth asking specifically because it changes whether your CRM is the source of truth or just the dumping ground.",
    },
  ],
  relatedSlugs: ["best-ai-receptionist-for-law-firms"],
};

/** Lookup by slug for the related-pages block. */
export const COMMERCIAL_PAGES: Record<string, CommercialPageConfig> = {
  [COMMERCIAL_LAW_FIRMS.slug]: COMMERCIAL_LAW_FIRMS,
  [COMMERCIAL_CRM_INTEGRATION.slug]: COMMERCIAL_CRM_INTEGRATION,
};
