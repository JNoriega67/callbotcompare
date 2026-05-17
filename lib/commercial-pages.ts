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
  /** Integration pages most relevant to this segment (cross-cluster wiring). */
  relatedIntegrationSlugs?: ReadonlyArray<string>;
  /**
   * Year-month the page was last editorially reviewed (e.g. "2026-05").
   * Surfaces as "Updated May 2026" via <EditorialMeta />. Defaults to
   * "2026-05" in the template if not set.
   */
  updatedYearMonth?: string;
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
  relatedIntegrationSlugs: ["ai-receptionist-with-clio", "ai-receptionist-with-hubspot"],
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
  relatedIntegrationSlugs: [
    "ai-receptionist-with-hubspot",
    "ai-receptionist-with-salesforce",
    "ai-receptionist-with-gohighlevel",
  ],
};

export const COMMERCIAL_HOME_SERVICES: CommercialPageConfig = {
  slug: "best-ai-receptionist-for-home-services",
  metaTitle: "Best AI receptionist for home services (HVAC, plumbing, electrical) — 2026",
  metaDescription:
    "Independent comparison of AI receptionists for HVAC, plumbing, electrical, and other home-service businesses. Scored on dispatch routing, after-hours emergency handling, repeat-customer recognition, and field-service software integration.",
  eyebrow: "Best for · Home Services",
  headlineLead: "An AI receptionist for HVAC, plumbing, or electrical",
  headlineAccent: "lives or dies on dispatch.",
  intro:
    "When a furnace dies at 11pm or a pipe bursts at 6am, the call doesn't need to be answered politely — it needs to land in the right tech's queue with the right info. We rank AI receptionists for home-service businesses on dispatch routing, after-hours emergency triage, and how cleanly the call lands in your field-service software so the truck rolls without anyone re-keying the address.",
  filter: { type: "vertical", slug: "home-services" },
  criteria: [
    {
      title: "Emergency vs routine routing",
      body: "A burst pipe and a 'I'd like to schedule a tune-up' are not the same call. Tools that can branch the script on urgency — and route emergencies to the on-call tech while booking routine work into the next available slot — rank materially higher.",
    },
    {
      title: "Service-area gating",
      body: "Taking a call from outside your service area wastes everyone's time. Vendors that can check ZIP/postal codes against your coverage map and politely decline (or refer) outside-area callers save dispatch a ton of friction.",
    },
    {
      title: "Repeat-customer recognition",
      body: "If a customer calls from a number you've already serviced, the AI should recognize them, pull up the last job, and skip the 'have you used us before' questions. Vendors integrated with ServiceTitan / Housecall Pro / Jobber can do this; generic tools can't.",
    },
    {
      title: "After-hours feels like after-hours-staffed",
      body: "The 11pm caller is comparing you to whoever picks up first. Smooth after-hours flow — friendly greeting, urgency check, real follow-up commitment — converts emergency calls into next-morning trucks rolling.",
    },
    {
      title: "Lands the address, the equipment, and the symptom",
      body: "Dispatch needs three things before sending a truck: where, what equipment, what's wrong. Vendors that capture all three in structured fields (not free-text email summary) save your dispatchers from re-interviewing the customer in the morning.",
    },
  ],
  buyerNotes: [
    {
      title: "Integration with your FSM tool matters more than CRM",
      body: "ServiceTitan, Housecall Pro, Jobber, and FieldEdge are where home-service jobs actually live. A vendor that integrates with your specific FSM lets the AI book directly into the dispatch board. Generic CRM integrations don't replace this.",
    },
    {
      title: "Confirm on-call rotation handling",
      body: "Most trades run an on-call rotation that changes weekly. The AI needs to know who to text for emergencies tonight, not just push everything to a generic 'on-call' inbox. Some vendors handle this natively, some need an external tool.",
    },
    {
      title: "Beware of generic 'service business' demos",
      body: "Many vendors will pitch you with a demo built for restaurants or law firms. Insist on a demo with a service-area check, an emergency vs routine branch, and a dispatch handoff specific to your FSM tool. If they can't, they probably can't do it.",
    },
  ],
  faqs: [
    {
      question: "Can an AI receptionist actually handle emergency dispatch?",
      answer:
        "Yes for the intake side — captures the urgency, address, equipment, and symptom, and texts/calls the on-call tech with the right info in seconds. The actual dispatch decision (who to send, ETA) still typically routes to a human or your FSM tool, but the AI removes the 'what was the address again' loop entirely.",
    },
    {
      question: "Will it integrate with ServiceTitan / Housecall Pro / Jobber?",
      answer:
        "Some vendors do natively, some need a Zapier or webhook bridge, and some don't at all. ServiceTitan and Housecall Pro are the most commonly supported. Always confirm with a live demo against your tool — not a slide deck.",
    },
    {
      question: "How does it handle service-area calls from outside our coverage?",
      answer:
        "Better vendors check ZIP/postal codes against a configurable coverage map and either politely decline or refer the caller to a sister company. Without this, you'll waste dispatcher time triaging calls you can't take.",
    },
    {
      question: "What about repeat customers — do we have to re-take their info every time?",
      answer:
        "If the AI is integrated with your FSM, no — it can look up by phone number and load the existing customer record, last job, and equipment history. If it's only integrated with a CRM (or nothing), then yes, expect to re-take the info.",
    },
  ],
  relatedSlugs: ["best-ai-receptionist-for-contractors", "best-ai-answering-service-for-appointment-booking"],
  relatedIntegrationSlugs: ["ai-receptionist-with-servicetitan", "ai-receptionist-with-jobber"],
};

export const COMMERCIAL_MEDICAL: CommercialPageConfig = {
  slug: "best-ai-receptionist-for-medical-offices",
  metaTitle: "Best AI receptionist for medical & dental offices (HIPAA-friendly) — 2026",
  metaDescription:
    "Independent comparison of AI receptionists for medical and dental practices. Scored on HIPAA-friendly workflows, appointment booking + insurance handling, no-show reduction, and EHR/PMS integration.",
  eyebrow: "Best for · Medical & Dental",
  headlineLead: "An AI receptionist for a clinic",
  headlineAccent: "is a patient-trust decision.",
  intro:
    "Medical and dental front-desk calls are mostly four things: book an appointment, reschedule, ask a billing question, or ask a clinical question the AI shouldn't answer. We rank AI receptionists for clinics on how cleanly they handle the first three, how strictly they hand off the fourth, and how seriously they treat HIPAA — not as a checkbox, but as a workflow constraint.",
  filter: { type: "vertical", slug: "medical-offices" },
  criteria: [
    {
      title: "HIPAA-friendly by default",
      body: "Encrypted recordings, optional transcripts, BAA available, no PHI in default email summaries. We weight this heavily — and we don't take a vendor's word for it without seeing the BAA terms.",
    },
    {
      title: "Booking, rescheduling, and cancellation in one flow",
      body: "Most patient calls are appointment changes. Tools that can read availability from your PMS, book new appointments, and cancel existing ones — without dropping the patient into 'please hold while we transfer you' — save real front-desk time.",
    },
    {
      title: "Insurance and intake screening",
      body: "Tools that can capture insurance carrier and member ID for verification, or screen new-patient intake fields, rank higher. Bonus for vendors that can pre-check eligibility before the appointment.",
    },
    {
      title: "Clean clinical-question handoff",
      body: "If a patient asks a clinical question, the AI should not answer it — it should escalate to a nurse line or front-desk transfer. Vendors that get this boundary right are safer to deploy.",
    },
    {
      title: "Multilingual when you need it",
      body: "Many practices serve a meaningful Spanish-speaking patient population. Native multilingual support (vs Google Translate on a transcript) matters for trust and accuracy.",
    },
  ],
  buyerNotes: [
    {
      title: "Get the BAA in writing before launch",
      body: "'HIPAA-friendly' is a marketing phrase. A signed BAA is the legal artifact. If a vendor can't produce one before you go live, that's a no — full stop.",
    },
    {
      title: "PMS/EHR integration is the hard part",
      body: "Booking into Dentrix, Eaglesoft, Open Dental, Athena, or Epic is non-trivial. Most AI receptionist vendors integrate with one or two PMS systems natively and use a workaround for the rest. Confirm your specific system before signing.",
    },
    {
      title: "Train the script with real call recordings",
      body: "Generic medical scripts miss the things patients actually call about (your specific insurance plans, your specific procedures, your specific cancellation policy). Plan to spend a week iterating the script with your front-desk before going fully live.",
    },
    {
      title: "Don't auto-handle prescription refills",
      body: "Refill requests should always go to a clinical workflow, not the AI. Confirm this is in the default script before deployment.",
    },
  ],
  faqs: [
    {
      question: "Is using an AI receptionist HIPAA-compliant?",
      answer:
        "It can be, with the right vendor. You need a signed BAA, encryption at rest and in transit, PHI excluded from default email summaries, and access controls on call recordings/transcripts. Several vendors in our directory advertise HIPAA-friendly workflows explicitly; we flag those.",
    },
    {
      question: "Can it book directly into our PMS (Dentrix, Athena, etc.)?",
      answer:
        "Sometimes natively, sometimes via a connector, and sometimes not at all. Dentrix, Eaglesoft, Open Dental are the most commonly supported on the dental side; Athena, eClinicalWorks, Epic on the medical side. Always confirm with a live demo against your specific PMS.",
    },
    {
      question: "What if a patient asks a clinical question?",
      answer:
        "Well-configured AI receptionists hand off to a nurse line or front-desk staff. They should not give clinical advice, even general advice. We recommend reviewing the default escalation rules before launch and tightening any that feel loose.",
    },
    {
      question: "How does it handle no-shows?",
      answer:
        "Most vendors send automated reminders 24-48h before the appointment and can take cancellation/reschedule calls 24/7 — which is the main no-show reducer. Some can also follow up after a no-show to reschedule. The combination typically cuts no-show rates noticeably.",
    },
  ],
  relatedSlugs: ["best-ai-answering-service-for-appointment-booking", "best-ai-phone-agent-with-crm-integration"],
  relatedIntegrationSlugs: ["ai-receptionist-with-calendly", "ai-receptionist-with-hubspot"],
};

export const COMMERCIAL_CONTRACTORS: CommercialPageConfig = {
  slug: "best-ai-receptionist-for-contractors",
  metaTitle: "Best AI receptionist for contractors & remodelers — 2026",
  metaDescription:
    "Independent comparison of AI receptionists for general contractors, remodelers, and builders. Scored on lead qualification, project-size screening, jobsite-friendly handoff, and CRM follow-up automation.",
  eyebrow: "Best for · Contractors",
  headlineLead: "A contractor's AI receptionist",
  headlineAccent: "filters tire-kickers from real projects.",
  intro:
    "Contractors don't suffer from too few calls — they suffer from too many calls that won't turn into work. The right AI receptionist for a general contractor or remodeler doesn't just answer; it qualifies. Budget range, project type, timeline, decision-maker — these are the four things that decide whether a lead is worth a site visit. We rank vendors on how reliably they get them, and how cleanly they route the qualified leads into your CRM.",
  filter: { type: "vertical", slug: "contractors" },
  criteria: [
    {
      title: "Qualification before booking",
      body: "Site visits are the bottleneck. Tools that capture budget range, project scope, and timeline before scheduling — and politely decline or defer leads outside your target range — protect your calendar from $5k-budget callers asking for whole-house remodels.",
    },
    {
      title: "Decision-maker check",
      body: "A remodel that needs both spouses on board is a different sales cycle than one with a single decision-maker. Vendors that can ask 'are you the homeowner / are both decision-makers available' early save you from one-and-done sales calls.",
    },
    {
      title: "Jobsite-friendly handoff",
      body: "When you're on a roof or in a crawl space, you can't take a call. The AI should either book the lead directly or text you a structured summary you can read in 30 seconds at lunch — not voicemail you have to call back at 7pm.",
    },
    {
      title: "Lands in a CRM the GC actually uses",
      body: "JobNimbus, Buildertrend, JobTread, GoHighLevel, or a simple spreadsheet — vendors that can push qualified leads into your existing tool, with the qualification fields mapped, save real admin hours per week.",
    },
    {
      title: "Follow-up automation for warm leads",
      body: "Qualified leads that don't book on the first call need follow-up. Tools that can trigger an SMS or email follow-up sequence (or hand off to a CRM that does) convert noticeably better than tools that drop the lead after a single touch.",
    },
  ],
  buyerNotes: [
    {
      title: "Set your floor explicitly in the script",
      body: "If you don't take projects under $25k, say so in the script. The AI can decline politely and refer the caller to a smaller-job specialist. This is one of the highest-ROI script edits a contractor can make.",
    },
    {
      title: "Integration with JobNimbus / Buildertrend matters more than HubSpot",
      body: "Most contractor-specific CRMs aren't on every AI vendor's standard integration list. Confirm yours specifically — and ideally see a live demo of the integration — before signing.",
    },
    {
      title: "Use the AI to gate site visits, not to sell",
      body: "The AI's job is to qualify and book. The actual sale happens at the site visit or follow-up call with you. Don't expect the AI to close — expect it to protect your calendar.",
    },
  ],
  faqs: [
    {
      question: "Will the AI actually qualify leads, or just take messages?",
      answer:
        "The better vendors qualify — they ask budget range, project type, timeline, and decision-maker status, then route accordingly. Cheaper or generic tools default to 'take a message,' which doesn't move the needle for contractors. Filter for vendors that explicitly support qualification scripts.",
    },
    {
      question: "Can it integrate with JobNimbus, Buildertrend, or JobTread?",
      answer:
        "Some natively, some via Zapier or webhook, and some not at all. Always confirm against your specific CRM. If your CRM isn't on the integration list, ask about webhook or Zapier support before signing.",
    },
    {
      question: "What if I'm a one-truck operator — is this overkill?",
      answer:
        "Not necessarily. A solo GC who's losing 3-5 calls a week to voicemail typically pays back an AI receptionist in the first month if even one of those calls turns into a job. The math gets harder if your call volume is genuinely low (under ~20 calls/month).",
    },
    {
      question: "Will customers feel like they're talking to a robot?",
      answer:
        "Modern AI receptionists sound natural enough that most customers don't realize until ~30 seconds in. The bigger risk is a poorly written script — robotic phrasing, no empathy, scripted-sounding qualification questions. Spend time on the script; the voice tech is mostly fine.",
    },
  ],
  relatedSlugs: ["best-ai-receptionist-for-home-services", "best-ai-phone-agent-with-crm-integration"],
  relatedIntegrationSlugs: ["ai-receptionist-with-jobber", "ai-receptionist-with-gohighlevel"],
};

export const COMMERCIAL_BOOKING: CommercialPageConfig = {
  slug: "best-ai-answering-service-for-appointment-booking",
  metaTitle: "Best AI answering service for appointment booking (2026)",
  metaDescription:
    "Independent comparison of AI answering services that actually book appointments — not just take messages. Scored on calendar integration, service-type-to-duration mapping, deposit handling, and double-booking prevention.",
  eyebrow: "Best for · Appointment Booking",
  headlineLead: "An AI answering service that takes messages",
  headlineAccent: "isn't an answering service.",
  intro:
    "If a customer has to wait for someone to call them back to actually book the appointment, you've lost half the value of automating the call. This page ranks AI answering services on the thing buyers actually care about: can it open the calendar, find the right slot for the right service, and hold the appointment without double-booking? We rank vendors on the booking flow end-to-end — not just on whether 'booking' is a feature flag.",
  filter: { type: "capability", slug: "booking" },
  criteria: [
    {
      title: "Real calendar integration",
      body: "Google Calendar, Outlook 365, Calendly, or a native calendar that syncs back to those. Vendors that 'book' by sending you an email and asking you to confirm don't count. We weight bi-directional sync with your real calendar heavily.",
    },
    {
      title: "Service-type to duration mapping",
      body: "A cleaning consult is 30 minutes, a full assessment is 90 minutes. The AI needs to know which is which and book the right block — not a generic 60-minute slot for everything. Vendors with configurable service types rank higher.",
    },
    {
      title: "Double-booking prevention",
      body: "Booking has to lock the slot the moment the customer commits, not the moment a human reviews it. Tools that book-then-confirm leave a race condition open and end up with overbooked calendars. Real-time sync to your calendar matters here.",
    },
    {
      title: "Deposit and prepayment handling",
      body: "For high-no-show segments (specialty services, expensive consults), being able to collect a deposit during the booking flow cuts no-shows dramatically. Vendors with Stripe or square-style payment capture rank higher for these use cases.",
    },
    {
      title: "Rescheduling and cancellation in the same flow",
      body: "Most booking-related calls after the initial booking are reschedules and cancellations. Tools that handle both 24/7 — without dropping the caller into 'please call us during business hours' — save real admin time.",
    },
  ],
  buyerNotes: [
    {
      title: "Test the booking with your actual services",
      body: "Most demos use a fake 'service A / service B' setup. Insist on a demo configured with your real services, real durations, and real provider calendars. That's where the cracks show up.",
    },
    {
      title: "Confirm cancellation policy enforcement",
      body: "If your policy is '24h notice or you forfeit the deposit,' the AI needs to enforce that automatically. Some vendors will accept any cancellation and quietly refund — which costs you money over time.",
    },
    {
      title: "Watch the provider-routing rules",
      body: "If you have multiple providers (multiple stylists, multiple techs, multiple consultants), the AI needs to know who can do what service and route accordingly. Tools that book any provider for any service create operational chaos.",
    },
  ],
  faqs: [
    {
      question: "What calendars do these integrate with?",
      answer:
        "Google Calendar and Microsoft 365 / Outlook are nearly universal. Calendly, Acuity, and Square Appointments are common. Industry-specific systems (Mindbody, Vagaro, Boulevard) are hit-or-miss. Always confirm your specific calendar tool before signing.",
    },
    {
      question: "Can it take a deposit during the booking call?",
      answer:
        "Some vendors can — typically via a Stripe or Square integration that texts the customer a payment link mid-call. This is one of the biggest no-show reducers if your average ticket is high enough to justify it.",
    },
    {
      question: "How does it avoid double-booking?",
      answer:
        "Real-time bi-directional sync with your calendar. The AI checks availability the second before booking and writes the appointment immediately. Vendors that 'book later' (email to staff, staff confirms) leave a window open for double-booking — avoid those if reliability matters.",
    },
    {
      question: "What if a customer wants to talk to a person instead of booking with the AI?",
      answer:
        "Good vendors offer a 'press 0 / say agent' style fallback. The AI then captures contact info and either transfers (if you have staffed reception) or schedules a callback. Confirm this is configurable before launch — some default escalation rules are too aggressive (or too passive).",
    },
  ],
  relatedSlugs: ["best-ai-receptionist-for-medical-offices", "best-ai-receptionist-for-home-services"],
  relatedIntegrationSlugs: ["ai-receptionist-with-calendly", "ai-receptionist-with-gohighlevel"],
};

/** Lookup by slug for the related-pages block. */
export const COMMERCIAL_PAGES: Record<string, CommercialPageConfig> = {
  [COMMERCIAL_LAW_FIRMS.slug]: COMMERCIAL_LAW_FIRMS,
  [COMMERCIAL_CRM_INTEGRATION.slug]: COMMERCIAL_CRM_INTEGRATION,
  [COMMERCIAL_HOME_SERVICES.slug]: COMMERCIAL_HOME_SERVICES,
  [COMMERCIAL_MEDICAL.slug]: COMMERCIAL_MEDICAL,
  [COMMERCIAL_CONTRACTORS.slug]: COMMERCIAL_CONTRACTORS,
  [COMMERCIAL_BOOKING.slug]: COMMERCIAL_BOOKING,
};
