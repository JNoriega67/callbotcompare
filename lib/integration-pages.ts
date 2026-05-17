/**
 * Configs that drive the integration landing pages
 * (ai-receptionist-with-<tool>).
 *
 * Each page renders through <IntegrationLanding /> — copy, vendor filter,
 * spectrum, criteria, and FAQs live here so we add a page by writing a
 * config + a 5-line route wrapper.
 *
 * Why category matters: a CRM integration ranks vendors by
 * `hasCrmIntegration`; a calendar integration ranks by
 * `hasAppointmentBooking`. The filter is implicit from category so
 * configs stay terse.
 */

export type IntegrationCategory = "crm" | "calendar" | "fsm" | "legal-cms";

export type IntegrationDepth = "native" | "webhook" | "zapier" | "none";

export type IntegrationPageConfig = {
  /** Route slug (path relative to /). */
  slug: string;
  /** The tool's display name (used in headings + breadcrumbs). */
  toolName: string;
  category: IntegrationCategory;

  metaTitle: string;
  metaDescription: string;

  /** Small uppercase label at the top of the hero. */
  eyebrow: string;
  /** Main headline (rendered in heading font with weight contrast). */
  headlineLead: string;
  headlineAccent?: string;
  /** 2–4 sentence lede that explains the page. */
  intro: string;

  /**
   * The integration depth spectrum specific to this tool. Order from
   * best (native) → worst (none). Each row is rendered with a level
   * pill, a short label, and the practical implication.
   */
  spectrum: ReadonlyArray<{
    level: IntegrationDepth;
    label: string;
    body: string;
  }>;

  /**
   * What we look for in a "good" integration with this tool.
   * 3–5 items, editorial framing not feature checkboxes.
   */
  criteria: ReadonlyArray<{ title: string; body: string }>;

  /** Practical things a buyer evaluating this integration should know. */
  buyerNotes: ReadonlyArray<{ title: string; body: string }>;

  /** Page-specific FAQs. */
  faqs: ReadonlyArray<{ question: string; answer: string }>;

  /** Slugs of other integration pages to surface in the "related" block. */
  relatedSlugs?: ReadonlyArray<string>;
  /** Commercial/vertical pages most relevant to this tool (cross-cluster wiring). */
  relatedCommercialSlugs?: ReadonlyArray<string>;
  /**
   * Year-month the page was last editorially reviewed (e.g. "2026-05").
   * Surfaces as "Updated May 2026" via <EditorialMeta />. Defaults to
   * "2026-05" in the template if not set.
   */
  updatedYearMonth?: string;
};

/* ------------------------------------------------------------------ */
/* Integration pages                                                  */
/* ------------------------------------------------------------------ */

export const INTEGRATION_HUBSPOT: IntegrationPageConfig = {
  slug: "ai-receptionist-with-hubspot",
  toolName: "HubSpot",
  category: "crm",
  metaTitle: "AI receptionist with HubSpot integration (2026 buyer's guide)",
  metaDescription:
    "Which AI receptionists actually push structured caller data into HubSpot — versus emailing you a summary. We rank by integration depth, field mapping, deduplication, and lifecycle workflow handoff.",
  eyebrow: "Integration · HubSpot",
  headlineLead: "Pick an AI receptionist that",
  headlineAccent: "actually pushes to HubSpot.",
  intro:
    "Most vendors will tell you they integrate with HubSpot. Fewer can map qualification answers to your custom properties, dedupe against existing contacts, and trigger your downstream lifecycle workflows. This page ranks the ones that do — and explains the difference so the demo doesn't catch you off guard.",
  spectrum: [
    {
      level: "native",
      label: "Native HubSpot integration",
      body: "Built and maintained by the vendor against HubSpot's API. Real-time push, custom property mapping in their UI, dedupe by phone + email, and usually a 'log call' record attached to the contact. This is what you actually want.",
    },
    {
      level: "webhook",
      label: "Webhook → HubSpot",
      body: "Vendor fires a webhook after the call; you wire it to HubSpot via a serverless function or a workflow tool. More flexible than Zapier (lower latency, richer payload) but requires technical setup and you own the retry logic.",
    },
    {
      level: "zapier",
      label: "Zapier (or similar)",
      body: "Works for low call volume. Burns Zapier task credits, adds latency, and loses richer two-way features. Treat as a fallback when no native integration exists.",
    },
    {
      level: "none",
      label: "Email summary only",
      body: "Vendor emails you (or your team) a transcript summary. Someone re-keys the lead into HubSpot. Defeats most of the reason to automate the call — avoid if HubSpot is your source of truth.",
    },
  ],
  criteria: [
    {
      title: "Maps to your custom HubSpot properties",
      body: "Your sales team has custom properties (project_type, budget_range, source_subtype). The integration needs to let you map AI-captured fields to those, not just dump everything into the default 'notes' field.",
    },
    {
      title: "Deduplicates against existing contacts",
      body: "If a current customer calls, the AI shouldn't create a new contact — it should update the existing record and log the call against it. Native integrations handle this; Zapier setups usually don't.",
    },
    {
      title: "Triggers HubSpot workflows automatically",
      body: "Assign to the right rep, advance the lifecycle stage, schedule a follow-up task. Bonus if the AI can score the lead before triggering. Saves you from building this in your CRM's automation layer.",
    },
    {
      title: "Logs the call recording + transcript to the contact",
      body: "Native integrations usually attach the call recording and full transcript to the contact's timeline. Useful for both rep coaching and dispute resolution. Webhook-based setups have to wire this themselves.",
    },
  ],
  buyerNotes: [
    {
      title: "Confirm your HubSpot edition supports the integration",
      body: "Some vendor integrations require HubSpot Sales Pro or Service Pro for custom properties / workflow triggers. If you're on Starter or Free, half the value disappears. Confirm with the vendor before signing.",
    },
    {
      title: "Watch for per-call or per-record caps",
      body: "Some plans cap CRM pushes at numbers below normal SMB call volume. A $99/mo plan that caps at 200 monthly pushes runs out by the 8th if you take 30 calls/day. Read the pricing fine print.",
    },
    {
      title: "Test dedup with a real existing contact",
      body: "In the demo, ask them to simulate a call from a phone number that's already in HubSpot. If a duplicate contact gets created, you'll have a data hygiene problem inside a month.",
    },
  ],
  faqs: [
    {
      question: "Do all AI receptionists integrate with HubSpot?",
      answer:
        "Most claim to. The quality varies wildly — from a native real-time bi-directional sync down to a Zapier hook that fires every other call. Filter aggressively in your evaluation: ask for a live demo of the integration with your specific HubSpot edition.",
    },
    {
      question: "Will it work with HubSpot Free / Starter?",
      answer:
        "The contact-creation side usually works on Free. Custom properties, workflow triggers, and call logging often require Sales Pro or Service Pro. Confirm with the vendor before assuming the demo you saw on Enterprise will run on your plan.",
    },
    {
      question: "Can the AI book meetings in HubSpot Meetings?",
      answer:
        "Some vendors can — they'll write the booking directly into the rep's HubSpot Meetings link or into the assigned rep's calendar. Others use Google Calendar / Outlook directly. Both are workable; native HubSpot Meetings is cleaner if your reps live in HubSpot.",
    },
    {
      question: "What about HubSpot Service Hub for support calls?",
      answer:
        "If you're using HubSpot Service Hub, ask whether the integration creates Tickets vs Contacts vs Conversations. Best vendors let you choose per-script; mediocre ones create everything as a Contact and call it done.",
    },
  ],
  relatedSlugs: ["ai-receptionist-with-salesforce", "ai-receptionist-with-gohighlevel"],
  relatedCommercialSlugs: [
    "best-ai-phone-agent-with-crm-integration",
    "best-ai-receptionist-for-contractors",
  ],
};

export const INTEGRATION_SALESFORCE: IntegrationPageConfig = {
  slug: "ai-receptionist-with-salesforce",
  toolName: "Salesforce",
  category: "crm",
  metaTitle: "AI receptionist with Salesforce integration (2026 buyer's guide)",
  metaDescription:
    "Which AI receptionists push real caller data into Salesforce — not just an email summary. Ranked on native integration depth, Lead vs Contact handling, validation rules, and process automation triggers.",
  eyebrow: "Integration · Salesforce",
  headlineLead: "An AI receptionist that lands cleanly",
  headlineAccent: "inside Salesforce, not next to it.",
  intro:
    "Salesforce is opinionated about how data should flow in — Leads vs Contacts vs Opportunities, validation rules, required fields, assignment rules. An AI receptionist that fires a generic API call into Salesforce will trip every rule you've built. We rank vendors on whether the integration respects your Salesforce setup or fights it.",
  spectrum: [
    {
      level: "native",
      label: "Native Salesforce integration (AppExchange or direct)",
      body: "Pre-built object mapping, supports your custom fields and record types, respects validation rules and triggers, and logs Tasks against the right Lead or Contact. The only path that scales without an integration engineer.",
    },
    {
      level: "webhook",
      label: "Webhook → Salesforce REST API",
      body: "Vendor fires a webhook; you (or a connector like Workato / MuleSoft) translate it into Salesforce API calls. Powerful but requires real ops investment. Worth it for high call volume + complex Salesforce setup.",
    },
    {
      level: "zapier",
      label: "Zapier (or similar)",
      body: "Works for simple setups (a single Lead object, no custom fields). Falls over fast when you have validation rules or required custom fields. Cheap to set up, expensive to maintain.",
    },
    {
      level: "none",
      label: "Email summary only",
      body: "Vendor emails a transcript summary; staff re-keys into Salesforce. The single most common reason teams blame 'the AI' for messy Salesforce data — the AI never touched Salesforce.",
    },
  ],
  criteria: [
    {
      title: "Lead vs Contact vs Opportunity routing",
      body: "A net-new caller is a Lead; an existing customer call is logged against a Contact; a deal-stage call may need an Opportunity update. Tools that can route by caller status rank higher.",
    },
    {
      title: "Respects validation rules and required fields",
      body: "If your org has 'Industry is required on Lead', the AI needs to either capture Industry in the script or use a sensible default — not fire an API call that fails validation and silently drops the record.",
    },
    {
      title: "Triggers Salesforce assignment + process automation",
      body: "Round-robin lead assignment, territory rules, flow automation — these should fire naturally because the record was created normally. Vendors that bypass them via API tricks break the rest of your sales ops.",
    },
    {
      title: "Logs the call as a Task with recording link",
      body: "Reps live in Salesforce's activity feed. A Task with the call recording + transcript URL attached is how the call becomes useful for the rep follow-up.",
    },
  ],
  buyerNotes: [
    {
      title: "Test with your specific Salesforce org",
      body: "Salesforce demos against a fresh sandbox org are misleading. Insist on a demo against your actual sandbox — custom fields, validation rules, and all. The cracks show up immediately.",
    },
    {
      title: "Confirm SF edition compatibility",
      body: "Some vendor integrations require Sales Cloud Enterprise edition for API access and custom object support. Professional / Essentials may not be enough. Confirm before signing.",
    },
    {
      title: "Plan for the security review",
      body: "Salesforce admins are appropriately paranoid about third-party API access. Expect a 1–4 week security review at larger orgs. Smaller orgs can skip this if the integration goes via a connected app with scoped permissions.",
    },
  ],
  faqs: [
    {
      question: "Which Salesforce edition do I need?",
      answer:
        "Sales Cloud Professional is usually the floor for any real integration; Enterprise unlocks custom objects, more API calls per day, and process automation. Most AI receptionist vendors quietly assume Enterprise — confirm with yours.",
    },
    {
      question: "Will the integration respect my validation rules?",
      answer:
        "Native (AppExchange) integrations almost always do. Webhook-based setups depend on how you map the data on the way in. Zapier setups frequently break validation rules and silently drop records — test before relying on it.",
    },
    {
      question: "Can it use Salesforce Flow for downstream automation?",
      answer:
        "Yes — most integrations create the record like a normal user would, which fires your Flow / Process Builder rules automatically. Bypassing them via API is a red flag; ask the vendor explicitly.",
    },
    {
      question: "What about Salesforce Service Cloud for inbound support calls?",
      answer:
        "Service Cloud's Case object is the right destination for support calls. Some AI receptionist vendors support Case creation; others only do Lead/Contact. If you're a support-heavy team, filter on this explicitly.",
    },
  ],
  relatedSlugs: ["ai-receptionist-with-hubspot", "ai-receptionist-with-gohighlevel"],
  relatedCommercialSlugs: [
    "best-ai-phone-agent-with-crm-integration",
    "best-ai-receptionist-for-law-firms",
  ],
};

export const INTEGRATION_GOHIGHLEVEL: IntegrationPageConfig = {
  slug: "ai-receptionist-with-gohighlevel",
  toolName: "GoHighLevel",
  category: "crm",
  metaTitle: "AI receptionist with GoHighLevel integration — agency-friendly options",
  metaDescription:
    "GoHighLevel-friendly AI receptionists for agencies and SMBs running everything from one platform. Ranked by sub-account support, pipeline + appointment automation, and bulk-rollout friendliness.",
  eyebrow: "Integration · GoHighLevel",
  headlineLead: "AI receptionists that fit",
  headlineAccent: "the GoHighLevel agency stack.",
  intro:
    "GoHighLevel buyers are usually agencies serving SMB clients or SMBs that run their whole stack from one platform. The right AI receptionist for GoHighLevel works at sub-account scale, pushes calls into the right pipeline, books into the right calendar, and doesn't require a fresh integration per client. We rank vendors on agency-friendliness, not just whether 'GHL' is on their feature list.",
  spectrum: [
    {
      level: "native",
      label: "Native GoHighLevel integration",
      body: "Built against GHL's API, supports sub-accounts, maps to GHL pipelines and custom fields, books into GHL calendars natively. Easier rollout across multiple client accounts.",
    },
    {
      level: "webhook",
      label: "Webhook → GHL Inbound Webhook trigger",
      body: "GoHighLevel's native inbound webhook lets you trigger workflows from external events. Solid path when no native integration exists — you get the GHL automation power on a slight delay.",
    },
    {
      level: "zapier",
      label: "Zapier",
      body: "Works but introduces a third platform to maintain. Watch your task burn at SMB call volume.",
    },
    {
      level: "none",
      label: "Email summary only",
      body: "GHL teams move fast; an emailed summary is dead on arrival. Avoid for any rollout you intend to keep past month 1.",
    },
  ],
  criteria: [
    {
      title: "Sub-account support for agencies",
      body: "If you're an agency, the AI needs to live inside each client's GHL sub-account without you re-onboarding from scratch each time. White-label support matters; per-sub-account configuration matters more.",
    },
    {
      title: "Pipeline + opportunity routing",
      body: "GHL teams live in pipelines. The AI should create opportunities in the right pipeline / stage based on the call script, not dump everything into 'New Lead'.",
    },
    {
      title: "Native calendar booking",
      body: "Most GHL teams book through GHL's own calendar (round-robin support, multi-provider). Vendors that book into GHL calendars directly beat ones that book into Google Calendar and re-sync.",
    },
    {
      title: "SMS + nurture handoff",
      body: "GHL's strength is multi-channel follow-up. The AI should be able to trigger an SMS or email nurture sequence in GHL after the call — not require you to manually move the contact.",
    },
  ],
  buyerNotes: [
    {
      title: "Agency-tier customers should ask about white-label",
      body: "If you resell the AI receptionist as part of your offer, white-labeling matters. Some vendors support it cleanly; others require a custom contract. Ask early.",
    },
    {
      title: "Confirm calendar logic at sub-account level",
      body: "GHL calendars are configured per sub-account. If a vendor 'supports GHL calendars' generically but you have to re-wire per client, that's a 2-hour onboarding tax per account.",
    },
    {
      title: "Test the SMS handoff timing",
      body: "If the AI creates the opportunity but the SMS workflow fires before the AI finishes writing custom fields, the SMS will go out missing the qualification context. Test the timing end-to-end.",
    },
  ],
  faqs: [
    {
      question: "Are there AI receptionists built specifically for GoHighLevel?",
      answer:
        "A handful. Most general-purpose AI receptionists also work with GHL via their webhook trigger or a native integration. Agency-focused vendors are usually the better fit because they understand the sub-account + white-label model out of the box.",
    },
    {
      question: "Will the AI work in client sub-accounts?",
      answer:
        "Native integrations: usually yes, with per-sub-account config. Webhook-based setups: you'll need to wire the webhook per sub-account. Plan a few hours per client for first-time rollout.",
    },
    {
      question: "Can it create opportunities in the right pipeline?",
      answer:
        "Native integrations and most webhook-based setups can — you map call types to pipeline/stage in the AI vendor's UI. Generic Zapier setups usually create everything in 'New Lead' and require manual cleanup.",
    },
    {
      question: "Will it integrate with GHL's SMS + workflow automation?",
      answer:
        "Yes for most vendors via the standard webhook → workflow trigger path. Native integrations make this turnkey; webhook setups make it possible but you wire each step.",
    },
  ],
  relatedSlugs: ["ai-receptionist-with-hubspot", "ai-receptionist-with-calendly"],
  relatedCommercialSlugs: [
    "best-ai-phone-agent-with-crm-integration",
    "best-ai-receptionist-for-home-services",
  ],
};

export const INTEGRATION_CALENDLY: IntegrationPageConfig = {
  slug: "ai-receptionist-with-calendly",
  toolName: "Calendly",
  category: "calendar",
  metaTitle: "AI receptionist with Calendly booking — best options (2026)",
  metaDescription:
    "AI receptionists that actually book into Calendly during the call — instead of texting the customer a Calendly link. Ranked on availability sync, event-type routing, and reschedule handling.",
  eyebrow: "Integration · Calendly",
  headlineLead: "Book the appointment on the call,",
  headlineAccent: "not after it.",
  intro:
    "The point of integrating an AI receptionist with Calendly is to close the booking before the caller hangs up — not to text them a link and hope. We rank vendors on whether they can read Calendly availability in real time, book the right event type for the request, and handle reschedules without a second call.",
  spectrum: [
    {
      level: "native",
      label: "Native Calendly API integration",
      body: "Real-time availability read, books on-call, supports multiple event types per organizer, handles reschedules. The whole point of integrating in the first place.",
    },
    {
      level: "webhook",
      label: "Webhook → custom booking flow",
      body: "Vendor fires a webhook with caller details; you have a Calendly API webhook listener that creates the event. More work, more flexibility — usually overkill unless you have Calendly logic the native integration can't handle.",
    },
    {
      level: "zapier",
      label: "Zapier",
      body: "Workable but means the booking is created after the call ends. Caller may have already moved on. Acceptable for low-volume use cases where booking immediacy isn't critical.",
    },
    {
      level: "none",
      label: "SMS the Calendly link",
      body: "AI texts the caller a Calendly link mid-call. Conversion drops dramatically vs booking on-call (most studies show 30-50% drop-off). Treat as a fallback, not a primary flow.",
    },
  ],
  criteria: [
    {
      title: "Books during the call, not after",
      body: "The whole conversion win comes from booking before the caller hangs up. Tools that can confirm a slot and lock it in-call beat tools that SMS a Calendly link every time.",
    },
    {
      title: "Routes to the right event type",
      body: "A 'consult' is a different Calendly event from a 'demo' is different from a 'follow-up'. The AI should know which event type to book based on the call script — not default to a generic 30-minute slot for everything.",
    },
    {
      title: "Handles reschedules and cancellations",
      body: "Most post-booking calls are reschedules and cancellations. The AI should be able to look up the existing booking by phone number and modify it — not just take a message.",
    },
    {
      title: "Multi-organizer / round-robin support",
      body: "If you have multiple sales reps with Calendly availability, the AI needs to either pick the round-robin assignee or book to a specific rep based on caller context.",
    },
  ],
  buyerNotes: [
    {
      title: "Watch for the 'we send a Calendly link' demo",
      body: "Many vendors will pitch you 'Calendly integration' that means 'we SMS the link.' That's not integration — that's a copy-paste. Specifically ask: 'Can you book on the call, in my Calendly, without the caller needing to click a link?'",
    },
    {
      title: "Confirm event-type mapping is configurable",
      body: "If the AI books everything as 'New Consult' regardless of what the call was about, your event types lose their meaning. Configurable mapping should be in the AI vendor's UI, not their professional services.",
    },
    {
      title: "Plan for cancellation policy enforcement",
      body: "If you have a no-show policy enforced via Calendly's own settings (e.g., charge a fee on cancellation under 24h), confirm the AI books in a way that triggers your policy correctly.",
    },
  ],
  faqs: [
    {
      question: "Can the AI actually book into Calendly during the call?",
      answer:
        "Yes — vendors with native Calendly integration can read availability and create the event before the caller hangs up. Watch for vendors that pitch 'Calendly integration' but actually just SMS the link mid-call; that's a meaningfully worse experience.",
    },
    {
      question: "What about Calendly Routing for sales qualification?",
      answer:
        "Some AI receptionists integrate with Calendly Routing — the AI captures qualification answers, then routes the booking to the right rep automatically. Worth asking about if you already use Routing on your inbound form flow.",
    },
    {
      question: "Can it reschedule existing Calendly bookings?",
      answer:
        "Vendors with full native integration: yes — the AI can look up the booking by caller phone + email and modify it. Vendors with webhook-only or Zapier integration: usually no — reschedule calls become tickets for a human.",
    },
    {
      question: "What if I want to switch from Calendly to something else later?",
      answer:
        "If you might move to Google Calendar / Outlook native, prefer a vendor that supports all three (most do). Calendly-only vendors are rare; most calendar-aware AI vendors are calendar-flexible by design.",
    },
  ],
  relatedSlugs: ["ai-receptionist-with-gohighlevel"],
  relatedCommercialSlugs: [
    "best-ai-answering-service-for-appointment-booking",
    "best-ai-receptionist-for-medical-offices",
  ],
};

export const INTEGRATION_SERVICETITAN: IntegrationPageConfig = {
  slug: "ai-receptionist-with-servicetitan",
  toolName: "ServiceTitan",
  category: "fsm",
  metaTitle: "AI receptionist with ServiceTitan integration (HVAC, plumbing, electrical)",
  metaDescription:
    "AI receptionists that integrate with ServiceTitan for HVAC, plumbing, and electrical businesses. Ranked on dispatch board booking, on-call rotation handling, and repeat-customer lookup.",
  eyebrow: "Integration · ServiceTitan",
  headlineLead: "AI receptionist for ServiceTitan shops:",
  headlineAccent: "dispatch first, marketing second.",
  intro:
    "If your shop runs on ServiceTitan, the AI receptionist's job is to land jobs on the dispatch board — not just take a message. We rank vendors on whether they can read customer history from ServiceTitan, book directly to dispatch, respect your on-call rotation, and gate calls by service area before the truck rolls.",
  spectrum: [
    {
      level: "native",
      label: "Native ServiceTitan integration",
      body: "Reads customer history (last job, equipment, service plan), books on the dispatch board directly, respects technician skills/zones. The only path that doesn't require dispatcher re-entry.",
    },
    {
      level: "webhook",
      label: "Webhook → ServiceTitan API",
      body: "Vendor fires webhook; a connector translates to ServiceTitan API calls. Workable if ServiceTitan API access is enabled on your plan — but most shops without a dedicated ops engineer won't run this themselves.",
    },
    {
      level: "zapier",
      label: "Zapier",
      body: "ServiceTitan's Zapier support is limited; most teams hit feature gaps fast. Treat as a stopgap, not a long-term setup.",
    },
    {
      level: "none",
      label: "Email summary to dispatcher",
      body: "Dispatcher reads the email, opens ServiceTitan, re-creates the job. The most common reason a 'simple AI receptionist' fails to pay back at home-service shops — the AI just moved the work, didn't eliminate it.",
    },
  ],
  criteria: [
    {
      title: "Books directly on the dispatch board",
      body: "ServiceTitan's dispatch board is the source of truth. AI should create the job there, in the right job type, with the right priority, in a slot that respects technician availability. Anything less requires dispatch to re-enter.",
    },
    {
      title: "Reads customer history before booking",
      body: "Repeat customers shouldn't have to re-give their address, equipment model, or service plan. Native integrations look up by phone number and load the existing customer's record + history before booking.",
    },
    {
      title: "Respects on-call rotation and tech skills",
      body: "Emergency at 11pm should route to the on-call tech, not Monday's day-shift schedule. Plumbing call shouldn't go to the HVAC-only tech. Vendors that read ServiceTitan's rotation + skill matrix do this automatically.",
    },
    {
      title: "Gates by service area / ZIP",
      body: "Calls from outside your service area should be politely declined or referred — not booked and then voided in the morning when dispatch notices. Native integration usually handles this; webhook setups need manual config.",
    },
  ],
  buyerNotes: [
    {
      title: "Confirm ServiceTitan API access on your plan",
      body: "ServiceTitan API access isn't included on every plan. Some integrations require Pro or higher. Confirm with both the AI vendor and your ServiceTitan rep before signing.",
    },
    {
      title: "Test the dispatch board write in your sandbox",
      body: "A demo against the vendor's sandbox is misleading — your job types, business units, and dispatch settings are different. Get a sandbox demo against a copy of your ServiceTitan setup.",
    },
    {
      title: "Plan the script around emergency vs membership",
      body: "ServiceTitan shops typically have membership-plan callers (priority) and emergency-rate callers (premium). The AI script needs to ask the right question early to route correctly — and your ServiceTitan needs to push that distinction to dispatch.",
    },
  ],
  faqs: [
    {
      question: "Which AI receptionists integrate with ServiceTitan?",
      answer:
        "A smaller set than CRMs like HubSpot. ServiceTitan-native integrations exist (some vendors have ServiceTitan as an explicit integration on their feature list); many more support it via webhook + a connector. Always confirm with a live demo against your ServiceTitan instance.",
    },
    {
      question: "Will it create jobs directly in ServiceTitan?",
      answer:
        "Native integrations: yes, on the dispatch board, with the right job type. Webhook-based: yes if you wire it. Email-only: no — dispatch re-enters. The native path is the only one that fully eliminates the dispatcher data-entry tax.",
    },
    {
      question: "Can it look up repeat customers?",
      answer:
        "Native integrations look up by phone number and load the existing customer (with their service plan status, last job, and equipment). Webhook-based usually doesn't unless you wire the lookup yourself.",
    },
    {
      question: "How does it handle on-call rotation?",
      answer:
        "Native integrations read ServiceTitan's on-call config and route accordingly. Without that, you'll need to manually configure the AI's escalation rules every time the rotation changes — error-prone for any shop with weekly rotation.",
    },
  ],
  relatedSlugs: ["ai-receptionist-with-jobber"],
  relatedCommercialSlugs: [
    "best-ai-receptionist-for-home-services",
    "best-ai-receptionist-for-contractors",
  ],
};

export const INTEGRATION_CLIO: IntegrationPageConfig = {
  slug: "ai-receptionist-with-clio",
  toolName: "Clio",
  category: "legal-cms",
  metaTitle: "AI receptionist with Clio integration (law firm buyer's guide)",
  metaDescription:
    "AI receptionists that integrate with Clio Grow and Clio Manage. Ranked on intake capture quality, conflict-check friendliness, matter creation, and Clio Grow lead workflow handoff.",
  eyebrow: "Integration · Clio",
  headlineLead: "AI receptionists for Clio firms:",
  headlineAccent: "intake quality, not just call volume.",
  intro:
    "A law firm's AI receptionist lives or dies on intake quality — capturing the right matter type, opposing party, and jurisdiction in fields your team will actually use. If your firm runs Clio, those fields need to land in Clio Grow (intake) or Clio Manage (matter) cleanly. We rank vendors on whether the integration respects how Clio actually works.",
  spectrum: [
    {
      level: "native",
      label: "Native Clio Grow / Manage integration",
      body: "Creates a Lead in Clio Grow with mapped intake fields, optionally creates a Matter in Clio Manage if the lead converts. Handles conflict-check workflow (capture-but-don't-transfer until check completes).",
    },
    {
      level: "webhook",
      label: "Webhook → Clio API",
      body: "Vendor fires webhook; you map fields to Clio's API. Possible but few firms have the dev capacity. Usually only worth it when the firm has an ops-savvy admin or works with a Clio-certified consultant.",
    },
    {
      level: "zapier",
      label: "Zapier",
      body: "Clio has decent Zapier support. Works for simple lead creation; less flexible for custom intake fields or matter-side workflow. Acceptable bridge for smaller firms.",
    },
    {
      level: "none",
      label: "Email intake summary",
      body: "Common in practice — but means your paralegal re-keys every intake into Clio Grow. Acceptable only if intake volume is low.",
    },
  ],
  criteria: [
    {
      title: "Captures structured intake fields per practice area",
      body: "Family vs PI vs estate vs business — different intake fields, different urgency rubrics. The AI script should branch by practice area; the integration should map those fields into Clio Grow's matching custom fields.",
    },
    {
      title: "Captures opposing party + jurisdiction",
      body: "Conflict checks depend on opposing party names. Jurisdiction affects which attorney can take the matter. Both should land in Clio as structured fields, not free-text notes.",
    },
    {
      title: "Conflict-check-friendly workflow",
      body: "The AI should capture intake but flag the lead as 'awaiting conflict check' — not auto-create a matter and not auto-transfer the call. Vendors that get this wrong create matters before checks complete.",
    },
    {
      title: "Logs the call recording to the lead/matter",
      body: "Attorney needs to hear the original call when reviewing intake quality. Native integrations attach the recording + transcript URL to the Clio record; webhook setups have to wire this.",
    },
  ],
  buyerNotes: [
    {
      title: "Confirm Clio Grow vs Clio Manage routing",
      body: "Most firms want new leads in Clio Grow first, then converted matters in Clio Manage. Some smaller firms skip Grow and go straight to Manage. The integration needs to match your setup, not the vendor's assumption.",
    },
    {
      title: "Review the script with your ethics counsel",
      body: "State bar rules on AI-handled intake vary. Recording disclosure, advice avoidance, conflict-check handling — all should be reviewed against your state's rules before going live.",
    },
    {
      title: "Plan for the HIPAA / sensitive-info overlap",
      body: "Family law intakes often include medical or financial info that triggers HIPAA-adjacent obligations. Make sure your Clio + AI receptionist setup encrypts at rest and limits access to intake notes.",
    },
  ],
  faqs: [
    {
      question: "Do AI receptionists integrate with Clio Grow?",
      answer:
        "A growing set do. Native Clio Grow integrations are still less common than HubSpot / Salesforce integrations, but the gap is closing. Always confirm with a live demo against your Clio Grow setup — including your custom intake fields.",
    },
    {
      question: "Can the AI create matters directly in Clio Manage?",
      answer:
        "Some vendors can, but most firms prefer the AI to create Leads in Grow that a human converts to Matters in Manage. This keeps the human in the conflict-check loop and avoids premature matter creation.",
    },
    {
      question: "Will it support multi-practice firms?",
      answer:
        "Better vendors let you configure per-practice-area script branches (family / PI / business / estate / etc.) so the right intake fields get captured for each. Vendors with a one-size-fits-all script are usually a poor fit for multi-practice firms.",
    },
    {
      question: "What about the conflict check itself?",
      answer:
        "The conflict check still happens via Clio's own conflict-check tool or your firm's process — the AI doesn't run it. The AI's job is to capture the data needed to run the check (caller name, opposing party, matter type) and flag the lead appropriately.",
    },
  ],
  relatedSlugs: ["ai-receptionist-with-hubspot"],
  relatedCommercialSlugs: ["best-ai-receptionist-for-law-firms"],
};

export const INTEGRATION_JOBBER: IntegrationPageConfig = {
  slug: "ai-receptionist-with-jobber",
  toolName: "Jobber",
  category: "fsm",
  metaTitle: "AI receptionist with Jobber integration (lawn care, cleaning, landscaping)",
  metaDescription:
    "AI receptionists that integrate with Jobber for lawn care, cleaning, landscaping, and service businesses. Ranked on quote-vs-job routing, recurring-service handling, and crew assignment.",
  eyebrow: "Integration · Jobber",
  headlineLead: "AI receptionist for Jobber shops:",
  headlineAccent: "qualify before you quote.",
  intro:
    "Jobber's shops live and die on the right job landing in the right calendar — quote requests, one-off jobs, recurring services, and follow-up visits all flow differently. We rank AI receptionists for Jobber on whether they can route by request type, handle recurring-service customers without re-onboarding, and book directly into your Jobber schedule.",
  spectrum: [
    {
      level: "native",
      label: "Native Jobber integration",
      body: "Creates a client in Jobber, distinguishes quote requests from job bookings, books into the Jobber schedule with the right crew assignment. Cleanest path for shops that already run on Jobber.",
    },
    {
      level: "webhook",
      label: "Webhook → Jobber API",
      body: "Workable; Jobber's API is reasonable. Smaller shops usually don't have someone to maintain a custom integration — so this works for shops with a tech-savvy office manager or a Jobber consultant.",
    },
    {
      level: "zapier",
      label: "Zapier",
      body: "Jobber has solid Zapier support. Workable for client creation + simple bookings; falls short on recurring-service logic or crew assignment.",
    },
    {
      level: "none",
      label: "Email summary",
      body: "Office manager re-enters into Jobber. Works at low call volume; doesn't scale past one office staff member.",
    },
  ],
  criteria: [
    {
      title: "Quote-request vs job-booking routing",
      body: "Quote calls go to the estimator queue (or get auto-scheduled for a site visit); job bookings go directly into the crew calendar. The AI should ask the right question early and route accordingly — not lump everything as 'new lead'.",
    },
    {
      title: "Recurring-service customer recognition",
      body: "Existing recurring customers (weekly lawn, monthly cleaning) shouldn't have to give their address again. Native integrations look up by phone and load the existing client with their recurring schedule.",
    },
    {
      title: "Right crew / service type assignment",
      body: "Different crews handle different work — landscaping vs maintenance vs hardscape. The AI should know which crew (or service type) to book based on the call, not default to 'any available'.",
    },
    {
      title: "Booking respects crew capacity + travel",
      body: "Native integrations check Jobber's schedule + travel-time settings before offering a slot. Tools that just check 'is this slot free' end up double-booking when travel time between jobs gets ignored.",
    },
  ],
  buyerNotes: [
    {
      title: "Test recurring-customer lookup",
      body: "In the demo, simulate a recurring customer calling about a one-off addition (e.g., 'I'd like an extra cleaning this week'). The AI should recognize them and book against their existing schedule, not create a new client.",
    },
    {
      title: "Confirm Jobber plan compatibility",
      body: "API access and some integration features are gated by Jobber's plan tier. Confirm your plan supports the integration before signing — particularly if you're on the Core tier.",
    },
    {
      title: "Plan for seasonality",
      body: "Lawn care, snow removal, etc. have seasonal spikes. The AI should be configurable to handle 'sorry, fully booked for this week' messaging gracefully and offer the next available slot — not just keep booking.",
    },
  ],
  faqs: [
    {
      question: "Do AI receptionists integrate with Jobber?",
      answer:
        "Yes — Jobber's a common integration for service-business-focused AI vendors. Native integrations are most common via webhook + Jobber's API. Always confirm with a live demo of the booking flow against your Jobber setup.",
    },
    {
      question: "Will it create new clients vs find existing ones?",
      answer:
        "Better integrations look up by phone number first and only create a new client if no match. Generic integrations create a new client every call, which leaves you with duplicate clients in Jobber by month 3.",
    },
    {
      question: "Can it book recurring services?",
      answer:
        "Native integrations can — they recognize the recurring-service offering and book the next-in-sequence visit. Webhook-based usually can't; you'll get a 'new client created' record and have to manually attach it to the recurring schedule.",
    },
    {
      question: "What about quote requests?",
      answer:
        "Quote requests typically need a site visit or a phone-back from an estimator. The AI should capture the quote-request details (property type, work scope, contact info) and route to your estimator workflow — not auto-create a job.",
    },
  ],
  relatedSlugs: ["ai-receptionist-with-servicetitan"],
  relatedCommercialSlugs: [
    "best-ai-receptionist-for-home-services",
    "best-ai-answering-service-for-appointment-booking",
  ],
};

/** Lookup by slug for related-pages blocks. */
export const INTEGRATION_PAGES: Record<string, IntegrationPageConfig> = {
  [INTEGRATION_HUBSPOT.slug]: INTEGRATION_HUBSPOT,
  [INTEGRATION_SALESFORCE.slug]: INTEGRATION_SALESFORCE,
  [INTEGRATION_GOHIGHLEVEL.slug]: INTEGRATION_GOHIGHLEVEL,
  [INTEGRATION_CALENDLY.slug]: INTEGRATION_CALENDLY,
  [INTEGRATION_SERVICETITAN.slug]: INTEGRATION_SERVICETITAN,
  [INTEGRATION_CLIO.slug]: INTEGRATION_CLIO,
  [INTEGRATION_JOBBER.slug]: INTEGRATION_JOBBER,
};
