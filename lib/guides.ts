/**
 * Long-form implementation guides under /guides/<slug>.
 *
 * These are practical, sectioned how-to pieces — not blog posts. Each
 * guide is rendered through <GuidePage /> using a small block-based
 * content model (paragraphs, lists, h3s, callouts, checklists) so the
 * layout stays consistent without bringing in a full MDX pipeline.
 */

export type GuideBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: ReadonlyArray<string> }
  | { kind: "ol"; items: ReadonlyArray<string> }
  | { kind: "h3"; text: string }
  | { kind: "callout"; tone: "tip" | "warning" | "note"; title?: string; body: string };

export type GuideSection = {
  /** Anchor / TOC id (kebab-case). */
  id: string;
  heading: string;
  blocks: ReadonlyArray<GuideBlock>;
};

export type GuideChecklistItem = {
  label: string;
  detail?: string;
};

export type GuideConfig = {
  /** Route slug — final URL is /guides/<slug>. */
  slug: string;
  /** Sort order in the hub. */
  order: number;
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  title: string;
  tagline: string;
  /** Reading time estimate, e.g. "12 min read". */
  readingTime: string;
  /** 2–4 sentence lede shown in the hero. */
  intro: string;

  sections: ReadonlyArray<GuideSection>;
  /** Optional end-of-guide checklist. */
  checklist?: ReadonlyArray<GuideChecklistItem>;

  /** Cross-cluster wiring. */
  relatedGuideSlugs?: ReadonlyArray<string>;
  relatedCommercialSlugs?: ReadonlyArray<string>;
  relatedIntegrationSlugs?: ReadonlyArray<string>;
  relatedServiceSlugs?: ReadonlyArray<string>;
};

/* ------------------------------------------------------------------ */
/* Guides                                                              */
/* ------------------------------------------------------------------ */

export const GUIDE_SETUP: GuideConfig = {
  slug: "ai-receptionist-setup-guide",
  order: 1,
  metaTitle: "AI receptionist setup guide — end-to-end launch playbook (2026)",
  metaDescription:
    "How to actually launch an AI receptionist in 2–3 weeks: account configuration, number provisioning, call flow design, escalation rules, testing protocol, and post-launch tuning.",
  eyebrow: "Guide · Setup",
  title: "AI receptionist setup guide",
  tagline: "The end-to-end playbook for launching an AI receptionist in 2–3 weeks — without sounding generic on day one.",
  readingTime: "14 min read",
  intro:
    "Most failed AI receptionist deployments aren't failures of the AI — they're failures of the launch project. The vendor's onboarding email assumes you know what you're doing, the default scripts sound robotic, and three weeks later the team blames the tool. This guide is the project plan we use on our own setup engagements: what to do in what order, what to actually configure, and what to leave for the post-launch tuning window.",
  sections: [
    {
      id: "pre-flight",
      heading: "Pre-flight: things to nail before you touch the vendor",
      blocks: [
        {
          kind: "p",
          text: "Skip these and you'll either rebuild work twice or launch sounding like every other AI receptionist on the market. A 60-90 minute internal session covers most of it.",
        },
        { kind: "h3", text: "Capture brand voice samples" },
        {
          kind: "p",
          text: "Pull 5–10 examples of your team answering the phone — voicemail recordings, sales calls, training videos. The AI's voice should sound like your highest-performing team member, not like the vendor's stock template. If you don't have recordings, write 3 sample dialogues in the tone you want.",
        },
        { kind: "h3", text: "List your top 20 customer questions" },
        {
          kind: "p",
          text: "Your front-desk staff already knows them. Most are some flavor of pricing, hours, location, services, scheduling, or status updates. The AI needs to answer all 20 without escalating to a human — that's where 70%+ of the call deflection value lives.",
        },
        { kind: "h3", text: "Decide your escalation triggers" },
        {
          kind: "p",
          text: "Before the AI launches, write down the exact phrases or situations that should bypass the AI and reach a human immediately. Common ones: 'I'd like to speak to a manager,' 'this is an emergency,' billing disputes, anything legal. The AI's escalation rules should match this list.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Cheap win",
          body: "Pull your last 30 days of voicemail transcripts. Sort by frequency. The top 20 are usually 80%+ of inbound — and they're almost all script-able.",
        },
      ],
    },
    {
      id: "vendor-config",
      heading: "Vendor account configuration",
      blocks: [
        {
          kind: "p",
          text: "Most vendors give you a fresh tenant within minutes of signup. The standard checklist:",
        },
        {
          kind: "ol",
          items: [
            "Verify the billing plan matches what you signed up for (overage rates are where surprises live)",
            "Set the time zone correctly — wrong time zone breaks after-hours rules",
            "Configure the business hours schedule, including holidays and lunch breaks if relevant",
            "Add team members with the right roles (admin / editor / viewer)",
            "Connect webhooks or native CRM integration (more in the integration guide)",
            "Set up call recording with the right retention period (HIPAA-friendly setups need encryption + BAA review)",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Watch the auto-greeting",
          body: "Most vendors ship with a default greeting like 'Thank you for calling, how may I direct your call.' Replace it before you wire up the number — it'll burn brand equity every call until you do.",
        },
      ],
    },
    {
      id: "number-provisioning",
      heading: "Number provisioning + porting",
      blocks: [
        {
          kind: "p",
          text: "You have three options: a new number from the vendor, porting your existing number, or call forwarding from your current line. Pick by what risk you're willing to take during launch.",
        },
        { kind: "h3", text: "Option A — new number from vendor (lowest risk)" },
        {
          kind: "p",
          text: "Best for first launch. You point a small percentage of inbound to the new number (e.g. add it to your Google Business profile alongside your main line), test for 1–2 weeks, then port if you're happy.",
        },
        { kind: "h3", text: "Option B — call forwarding (medium risk)" },
        {
          kind: "p",
          text: "Your existing phone system forwards inbound calls to the AI's number. Easy to roll back; you can flip forwarding off in 30 seconds. Pay attention to caller-ID display — some carriers strip it during forwarding, which breaks CRM lookups.",
        },
        { kind: "h3", text: "Option C — port your existing number (highest risk, cleanest end state)" },
        {
          kind: "p",
          text: "Once you're confident, port. Porting takes 5–10 business days and there's a brief porting window where calls can drop. Don't port the week of launch — port after 2 weeks of stable testing.",
        },
      ],
    },
    {
      id: "call-flow",
      heading: "Call flow design (the part that decides whether it works)",
      blocks: [
        {
          kind: "p",
          text: "This is where most launches stumble. The default template handles maybe 60% of your real calls; the other 40% need explicit branching. The fastest way to get to a working flow:",
        },
        {
          kind: "ol",
          items: [
            "Start with the greeting (one line, on-brand, mentions you're recorded)",
            "First branch: emergency or routine — emergency routes immediately to on-call",
            "Routine branch: new customer or existing — new customers go to qualification, existing to lookup-then-route",
            "Qualification branch: capture the 3–5 fields you actually need (intent, service area, timeline, contact, anything required for routing)",
            "FAQ branch: the AI fields the top-20 questions from pre-flight without escalating",
            "Booking branch: if booking is in scope, the AI offers a slot and locks it",
            "Always-on fallback: 'speak to a person' should always work, every state of the call",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Write prompts in your voice, not the AI's",
          body: "The biggest difference between a generic and a brand-aligned AI is the prompt text. Use contractions, your team's actual phrasing, and the words your customers use. 'How can I help' beats 'How may I direct your call.'",
        },
      ],
    },
    {
      id: "escalation",
      heading: "Escalation rules: what gets a human",
      blocks: [
        {
          kind: "p",
          text: "Aggressive escalation makes the AI feel useless; lazy escalation makes the AI sound trapped. Find the middle. Recommended escalation triggers:",
        },
        {
          kind: "ul",
          items: [
            "Explicit request ('speak to a human', 'manager', 'representative')",
            "Strong negative sentiment (frustration, swearing, multiple repetitions)",
            "Off-script questions the FAQ branch doesn't cover",
            "Specific topics: billing dispute, complaint, legal, refund",
            "High-value caller (VIP customer detected via CRM lookup)",
            "Emergency keywords (configurable to your business)",
          ],
        },
        {
          kind: "p",
          text: "For after-hours escalation, the AI should ALWAYS capture the contact info and reason before escalating — even when it can't transfer immediately. That way the morning team has context, not just 'someone called urgent at 11pm.'",
        },
      ],
    },
    {
      id: "testing",
      heading: "Testing protocol (don't skip this)",
      blocks: [
        {
          kind: "p",
          text: "The vendor's test mode is fine; better is testing against a parallel real number before cut-over. 5–10 real-feeling calls covering each major branch:",
        },
        {
          kind: "ol",
          items: [
            "Standard new-customer inquiry (most common path)",
            "Existing-customer call (test CRM lookup if integrated)",
            "Booking call (test calendar integration)",
            "FAQ call — try a few of the top-20 questions",
            "Off-script call — ask something the AI shouldn't be able to handle, verify escalation",
            "After-hours call — test the after-hours flow",
            "Emergency call — verify emergency routing works",
            "Cancellation / reschedule — if booking is in scope",
            "Spanish-language call — if multilingual is in scope",
            "Aggressive caller — test the 'speak to a human' fallback under pressure",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Listen to the recordings, don't just check that the right thing happened",
          body: "The AI can technically book the appointment and still sound robotic doing it. Listen for tone, awkward pauses, mispronunciations, and weird transitions. That's what your real customers hear.",
        },
      ],
    },
    {
      id: "cut-over",
      heading: "Cut-over + the 2-week tuning window",
      blocks: [
        {
          kind: "p",
          text: "Once you've tested 10 real-feeling calls and they sound right, point your production number at the AI. Plan to spend ~30 minutes per day for the first two weeks listening to real call recordings and tweaking prompts.",
        },
        { kind: "h3", text: "What to listen for in week 1" },
        {
          kind: "ul",
          items: [
            "Calls that escalated when the AI could have handled them → tighten escalation triggers",
            "Calls where the AI escalated late (frustrated customer) → loosen escalation triggers",
            "Awkward phrasing or mispronunciations → edit prompts",
            "Calls that ended without a clear next step → add a closing line to the flow",
          ],
        },
        { kind: "h3", text: "What to measure in week 2" },
        {
          kind: "ul",
          items: [
            "Containment rate (% of calls the AI handled without escalation) — target 60-80%",
            "Booking rate (if booking is in scope) — should approach your previous staffed rate",
            "Average call duration — drift up over a few days usually means the AI is over-explaining",
            "Customer-initiated escalations — these are the AI's failures; investigate each",
          ],
        },
      ],
    },
  ],
  checklist: [
    { label: "Brand voice samples captured (5–10 examples)" },
    { label: "Top 20 customer questions documented with answers" },
    { label: "Escalation trigger list written" },
    { label: "Vendor account configured (timezone, hours, billing, team)" },
    { label: "Greeting replaced (no default vendor language)" },
    { label: "Number provisioning strategy chosen (new / forward / port)" },
    { label: "Call flow drafted (greeting → branch → qualification → FAQ → booking → fallback)" },
    { label: "Escalation rules configured + tested" },
    { label: "10 real-feeling test calls passed across all major paths" },
    { label: "Production cut-over scheduled (not on Friday, not before a long weekend)" },
    { label: "2-week tuning calendar blocked (~30 min/day)" },
  ],
  relatedGuideSlugs: ["crm-and-booking-integration-guide", "call-flow-design-guide", "ai-receptionist-launch-checklist"],
  relatedCommercialSlugs: ["best-ai-receptionist-software"],
  relatedServiceSlugs: ["setup", "call-flow"],
};

export const GUIDE_INTEGRATION: GuideConfig = {
  slug: "crm-and-booking-integration-guide",
  order: 2,
  metaTitle: "CRM & booking integration guide for AI receptionists (2026)",
  metaDescription:
    "How to wire an AI receptionist into your CRM and calendar without breaking your data: integration depth choices, field mapping, deduplication strategy, error handling, and end-to-end testing.",
  eyebrow: "Guide · Integration",
  title: "CRM and booking integration guide",
  tagline: "How to wire the AI into your CRM and calendar so calls land as clean records — not duplicate contacts and dropped bookings.",
  readingTime: "11 min read",
  intro:
    "Most AI receptionist integrations work the day they ship and rot within a month. Duplicate contacts pile up. Bookings collide. Custom fields don't get populated. The vendor blames your CRM; your CRM admin blames the vendor. This guide is the integration playbook to avoid that — from picking the right depth of integration to wiring the dedup logic correctly.",
  sections: [
    {
      id: "depth",
      heading: "Pick the right depth of integration",
      blocks: [
        {
          kind: "p",
          text: "Most vendor pages will tell you they 'integrate with HubSpot.' Four very different things hide under that label. From best to worst:",
        },
        {
          kind: "ol",
          items: [
            "Native integration: built and maintained by the vendor, with field mapping in their UI, dedup built in, retry logic, and call recording attached to the record. Pick this when it exists.",
            "Webhook + connector (n8n / Make / Zapier): vendor fires a webhook, you wire it via a connector to your CRM. More flexible, more setup, you own the retry logic.",
            "Zapier-only: works at low volume, burns tasks, no two-way features. Treat as a stopgap.",
            "Email summary: an email lands in your inbox after the call. Someone re-keys into the CRM. Defeats most of the automation value.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Rule of thumb",
          body: "If your CRM is one of HubSpot, Salesforce, GoHighLevel, Pipedrive, Zoho — there's almost always a native option somewhere. Look for it before defaulting to Zapier.",
        },
      ],
    },
    {
      id: "field-mapping",
      heading: "Field mapping: get the schema right before launch",
      blocks: [
        {
          kind: "p",
          text: "Don't dump everything into the default 'Notes' field. Each AI-captured field should map to a structured CRM field — either a built-in one (Phone, Email, Source, Industry) or a custom one (Project Type, Budget Range, Urgency).",
        },
        { kind: "h3", text: "Required fields" },
        {
          kind: "ul",
          items: [
            "Caller name + phone + email (Contact-level)",
            "Source = 'AI receptionist' (or similar) so you can segment lead reporting later",
            "Call timestamp + recording URL + transcript URL (as activity attachments)",
            "Intent / qualification answers (one custom property per question)",
          ],
        },
        { kind: "h3", text: "Optional but recommended" },
        {
          kind: "ul",
          items: [
            "Sentiment score (some vendors compute this) — useful for prioritization",
            "Disposition (booked, escalated, info-only) — useful for funnel reporting",
            "Caller's stated urgency — used by some teams to auto-assign rep priority",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Custom fields require the right CRM plan",
          body: "HubSpot Starter / Salesforce Essentials cap custom properties. If you need many custom fields, confirm your plan supports them before wiring the integration.",
        },
      ],
    },
    {
      id: "dedup",
      heading: "Deduplication: the silent destroyer of CRM hygiene",
      blocks: [
        {
          kind: "p",
          text: "The single most common integration failure: every call creates a new contact, regardless of whether that caller already exists. By month 3 you have 200 duplicates, your sales reps are calling the same customer twice, and someone blames the AI when the AI did exactly what you asked it to.",
        },
        { kind: "h3", text: "Lookup rules (in priority order)" },
        {
          kind: "ol",
          items: [
            "Match by phone number first (most reliable; the AI always has it)",
            "Fall back to email if no phone match (less reliable; the AI may not always have it)",
            "Fall back to name + zip if neither matches (rare; usually means a new lead anyway)",
          ],
        },
        {
          kind: "p",
          text: "If a match exists, update the existing contact + log the call as an activity. Do NOT create a new contact. Most native integrations handle this; webhook setups need you to write the lookup logic explicitly.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Quick test",
          body: "In your demo, ask the vendor to simulate a call from a phone number that already exists in your CRM. If a duplicate gets created, you'll have to wire dedup yourself.",
        },
      ],
    },
    {
      id: "booking",
      heading: "Booking integration: book on the call, not after",
      blocks: [
        {
          kind: "p",
          text: "The whole point of integrating a calendar is to close the appointment before the caller hangs up. If your integration texts a booking link and asks the caller to click it later, you've recreated voicemail with extra steps.",
        },
        { kind: "h3", text: "Real-time availability lookup" },
        {
          kind: "p",
          text: "The AI should query the calendar's availability API during the call, find slots that match the requested service type, and offer 2–3 options. Native integrations with Google Calendar, Outlook 365, Calendly, Acuity all support this.",
        },
        { kind: "h3", text: "Service-type to duration mapping" },
        {
          kind: "p",
          text: "A consult and a full service take different time blocks. The AI needs to know which service type to map each call request to so it books the right-length slot. Vendors that 'book' generically end up creating overlapping appointments.",
        },
        { kind: "h3", text: "Conflict prevention" },
        {
          kind: "p",
          text: "Bi-directional sync matters here. If the AI books a 2pm slot at the same instant a customer books 2pm directly in Calendly, one of those will collide. Vendors with real-time sync handle this; lazy-sync setups don't.",
        },
      ],
    },
    {
      id: "error-handling",
      heading: "Error handling: what happens when the API is down",
      blocks: [
        {
          kind: "p",
          text: "The CRM will go down. The calendar will go down. The connector will hit a rate limit. Plan the failure mode upfront so you're not losing leads when it happens.",
        },
        { kind: "h3", text: "Retry with exponential backoff" },
        {
          kind: "p",
          text: "Most vendors with native integrations retry failed pushes 3–5 times over a few minutes. Connectors like n8n and Make let you build retry logic. Zapier's retry behavior is more limited; check the docs.",
        },
        { kind: "h3", text: "Fallback queue" },
        {
          kind: "p",
          text: "If retries exhaust, the AI should fall back to logging the call to an internal queue (email, Slack, an internal database) so the lead isn't silently dropped. Most native integrations do this; some webhook setups don't.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Test the failure mode in staging",
          body: "Disable your CRM's API key temporarily and run a test call. Verify the lead lands somewhere — not nowhere. If the call just disappears, you have a silent failure problem to fix.",
        },
      ],
    },
    {
      id: "end-to-end-test",
      heading: "End-to-end test plan",
      blocks: [
        {
          kind: "p",
          text: "Before cut-over, run 10–15 real-feeling test calls and verify each one lands cleanly in the CRM:",
        },
        {
          kind: "ol",
          items: [
            "Net-new caller with full info → new Contact created with all custom fields populated",
            "Net-new caller with partial info → new Contact with required fields populated, optional fields left null (not garbage)",
            "Existing caller (by phone) → existing Contact updated + call logged as activity",
            "Existing caller (by email) → existing Contact updated (not duplicate)",
            "Booking call → calendar event created with right duration, right organizer, right reminders",
            "Reschedule call → existing event modified, not deleted-and-recreated",
            "Cancellation call → event cancelled, customer notified per your settings",
            "AI-escalated call → activity logged with escalation reason",
            "Spanish-language call → fields populated correctly in the right language",
            "Call where CRM API was down (simulate) → lead landed in fallback queue",
          ],
        },
      ],
    },
  ],
  checklist: [
    { label: "Integration depth chosen (native / webhook / Zapier / email)" },
    { label: "Custom fields created in CRM (intent, qualification answers, source)" },
    { label: "Field mapping configured in vendor's UI" },
    { label: "Dedup rules wired (phone first, email fallback)" },
    { label: "Calendar integration tested for real-time availability" },
    { label: "Service-type to duration mapping configured" },
    { label: "Retry + fallback queue wired for API failures" },
    { label: "10 end-to-end test calls passed" },
    { label: "Runbook documented for ops team" },
  ],
  relatedGuideSlugs: ["ai-receptionist-setup-guide", "call-flow-design-guide"],
  relatedIntegrationSlugs: [
    "ai-receptionist-with-hubspot",
    "ai-receptionist-with-salesforce",
    "ai-receptionist-with-gohighlevel",
    "ai-receptionist-with-calendly",
  ],
  relatedServiceSlugs: ["integration"],
};

export const GUIDE_CALL_FLOW: GuideConfig = {
  slug: "call-flow-design-guide",
  order: 3,
  metaTitle: "Call flow design guide for AI receptionists (2026)",
  metaDescription:
    "How to design an AI receptionist call flow that handles your real calls — qualification branches, FAQ deflection, escalation triggers, edge cases, and what to put in vs leave out.",
  eyebrow: "Guide · Call Flow",
  title: "Call flow design guide",
  tagline: "Vendor templates handle the easy calls. This guide handles the rest — qualification, branching, escalation, and the edge cases that decide whether the AI feels useful or annoying.",
  readingTime: "13 min read",
  intro:
    "The vendor's default call flow is built to ship fast, not to handle your business specifically. Most teams that say 'the AI doesn't work' have a flow problem, not an AI problem. This guide walks through the call flow design patterns we use on real engagements — what branches to build, what to qualify on, when to escalate, and how to keep the conversation feeling natural across all of it.",
  sections: [
    {
      id: "the-shape",
      heading: "The shape of a real call flow",
      blocks: [
        {
          kind: "p",
          text: "Most useful flows have 4–7 top-level branches. More than that and the AI gets confused; fewer and you're missing call types. The canonical shape:",
        },
        {
          kind: "ol",
          items: [
            "Greeting + recording disclosure (one line, on-brand)",
            "Urgency check: emergency or routine?",
            "Customer status: new or existing? (CRM lookup if integrated)",
            "Intent capture: what does the caller need? (qualification or FAQ)",
            "Resolution: book the appointment / answer the question / escalate to human / end with promised follow-up",
            "Always-on fallback: 'speak to a person' works in every state",
          ],
        },
        {
          kind: "p",
          text: "Each branch has its own sub-flow with the prompts, qualification questions, and escalation rules specific to that path. The AI should be able to switch between branches mid-call (a customer who started as 'routine new customer' might surface an emergency halfway through).",
        },
      ],
    },
    {
      id: "qualification",
      heading: "Qualification: capture the 3–5 fields you actually need",
      blocks: [
        {
          kind: "p",
          text: "More qualification questions = lower completion rate. Pick the fewest that your sales/dispatch team can't live without:",
        },
        {
          kind: "ul",
          items: [
            "Service area / location (gates whether you can take the call at all)",
            "Service or matter type (decides routing and rep assignment)",
            "Urgency or timeline (decides priority)",
            "Contact info (so you can follow up if the call drops)",
            "Decision-maker status (for high-stakes verticals like remodeling, legal)",
          ],
        },
        { kind: "h3", text: "Phrase questions naturally" },
        {
          kind: "p",
          text: "'What's the address of the property?' beats 'Please provide your service address.' Vendors that let you customize prompt phrasing have a big advantage — use it.",
        },
        { kind: "h3", text: "Skip what you can derive" },
        {
          kind: "p",
          text: "If you have the caller's phone number and they're an existing customer in the CRM, you already have the address — don't ask again. Use CRM lookup to skip redundant questions.",
        },
      ],
    },
    {
      id: "faq-deflection",
      heading: "FAQ deflection: where most of the deflection value lives",
      blocks: [
        {
          kind: "p",
          text: "70–80% of inbound calls at a typical SMB are one of: 'what are your hours,' 'how much does X cost,' 'do you service Y area,' 'when's my appointment,' 'can I reschedule.' If the AI handles these without escalating, your front-desk staff gets their time back.",
        },
        { kind: "h3", text: "Build the FAQ from real call data" },
        {
          kind: "p",
          text: "Pull 30 days of voicemail or call recordings. Sort by frequency. The top 20 questions are your FAQ. Don't write a generic FAQ — yours is specific to your business, your hours, your services.",
        },
        { kind: "h3", text: "Write answers in natural sentences, not docs" },
        {
          kind: "p",
          text: "'Our hours are Monday through Friday, 8am to 6pm, and Saturday 9am to 2pm. We're closed Sunday.' beats 'Hours of operation: M-F 8am-6pm; Sat 9am-2pm; Sun closed.' The AI reads what you write.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Pricing questions are where AI either wins or loses trust",
          body: "If you publish prices, the AI should quote them confidently. If you don't, the AI should explain why and offer a fast follow-up — never sound evasive.",
        },
      ],
    },
    {
      id: "escalation-triggers",
      heading: "Escalation: the trigger list",
      blocks: [
        {
          kind: "p",
          text: "Escalation that's too aggressive makes the AI feel pointless; escalation that's too lazy makes the AI feel like a wall. Recommended triggers, in priority order:",
        },
        {
          kind: "ol",
          items: [
            "Explicit request ('speak to a human', 'manager', 'representative', 'agent')",
            "Strong negative sentiment (frustration, repetition, raised voice)",
            "Specific high-risk topics (billing dispute, complaint, legal threat, refund)",
            "VIP customers (detected via CRM lookup; configurable per business)",
            "Off-script questions the FAQ branch can't handle",
            "Emergency keywords (define per business: 'leak', 'fire', 'urgent', 'pain' for medical, etc.)",
            "Caller-detected ambiguity after 2 failed clarification attempts",
          ],
        },
      ],
    },
    {
      id: "edge-cases",
      heading: "Edge cases worth designing for",
      blocks: [
        { kind: "h3", text: "Language switch mid-call" },
        {
          kind: "p",
          text: "Caller starts in English but is more comfortable in Spanish. Better vendors detect this and offer to switch; lesser vendors miss it entirely. If your customer base is meaningfully multilingual, this is a must-design.",
        },
        { kind: "h3", text: "Background noise and bad lines" },
        {
          kind: "p",
          text: "Construction sites, busy kitchens, driving — your real callers won't always be in quiet rooms. The AI should ask the caller to repeat (politely) when it can't parse, not pretend it heard correctly.",
        },
        { kind: "h3", text: "After-hours emergency vs after-hours routine" },
        {
          kind: "p",
          text: "After-hours flow shouldn't be a flat 'we're closed.' Real emergencies need the on-call escalation; routine after-hours should book the next-available morning slot.",
        },
        { kind: "h3", text: "Call recording disclosure" },
        {
          kind: "p",
          text: "Two-party-consent states require explicit consent for recording. Most AI vendors handle the disclosure phrase; review the default language with your counsel before launch.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Never let the AI improvise on legal or medical advice",
          body: "Hard-code these into immediate escalation. The cost of an AI giving wrong advice on either topic is much higher than the cost of escalating a few times when it wasn't needed.",
        },
      ],
    },
    {
      id: "iterate",
      heading: "Iterate post-launch",
      blocks: [
        {
          kind: "p",
          text: "No call flow is right on day one. Plan to spend ~30 min/day for the first 2 weeks listening to recordings and adjusting:",
        },
        {
          kind: "ul",
          items: [
            "Calls that escalated unnecessarily → tighten escalation criteria for that case",
            "Calls where the AI sounded awkward → edit the prompt for that branch",
            "Calls where the customer asked something not in the FAQ → add it",
            "Calls where qualification took too long → cut a question",
            "Calls where qualification missed context → add a question (carefully)",
          ],
        },
      ],
    },
  ],
  checklist: [
    { label: "Top-level branch structure documented (4–7 branches)" },
    { label: "Qualification questions narrowed to 3–5 critical ones" },
    { label: "FAQ built from real 30-day call data (top 20)" },
    { label: "Escalation triggers written out + tested" },
    { label: "Edge cases designed: language switch, after-hours, recording disclosure, legal/medical advice" },
    { label: "All prompts written in your brand voice (not vendor default)" },
    { label: "Always-on 'speak to a human' fallback tested in each branch" },
    { label: "Post-launch tuning calendar blocked for 2 weeks" },
  ],
  relatedGuideSlugs: ["ai-receptionist-setup-guide", "crm-and-booking-integration-guide"],
  relatedCommercialSlugs: ["best-ai-receptionist-software"],
  relatedServiceSlugs: ["call-flow", "setup"],
};

export const GUIDE_LAUNCH_CHECKLIST: GuideConfig = {
  slug: "ai-receptionist-launch-checklist",
  order: 4,
  metaTitle: "AI receptionist launch checklist — pre-cut-over verification (2026)",
  metaDescription:
    "The pre-launch verification checklist we run before pointing production traffic at an AI receptionist. 40+ items across config, flows, integrations, testing, and rollback.",
  eyebrow: "Guide · Launch Checklist",
  title: "AI receptionist launch checklist",
  tagline: "Skip an item on this list and you'll find it the hard way. The pre-cut-over verification we run before pointing production calls at the AI.",
  readingTime: "8 min read",
  intro:
    "The setup work is done. The flow is built. The integrations are wired. Now you're hours away from pointing real customer calls at the AI. This is the checklist we use to catch the things that always-on-paper passed in testing but break in production — wrong time zone, untested escalation, no fallback when the CRM is down.",
  sections: [
    {
      id: "config",
      heading: "Account + configuration",
      blocks: [
        {
          kind: "ul",
          items: [
            "Billing plan matches what you signed up for (no surprise overage rate)",
            "Time zone set correctly (wrong TZ breaks after-hours, breaks scheduling, breaks reporting)",
            "Business hours configured including lunch / holidays / early-close days",
            "Greeting replaced with brand-voice version (no default vendor text remains)",
            "Recording disclosure phrase reviewed by counsel for your state's consent law",
            "Call recording retention set per your data policy (most teams: 90 days minimum)",
            "Team members added with right roles (admin / editor / viewer)",
            "Notification rules set for escalations, missed calls, integration errors",
          ],
        },
      ],
    },
    {
      id: "flow",
      heading: "Call flow",
      blocks: [
        {
          kind: "ul",
          items: [
            "All 4–7 top-level branches built and named clearly",
            "Greeting → branch decision is fast (<3 seconds of AI talking before user can respond)",
            "Qualification questions narrowed to 3–5 critical fields",
            "FAQ branch handles top-20 customer questions without escalating",
            "Escalation triggers configured: explicit request, sentiment, topics, VIP, off-script, emergencies",
            "Always-on 'speak to a person' fallback tested in EACH branch",
            "Booking branch tested if booking is in scope",
            "After-hours flow tested (emergency vs routine paths)",
            "Spanish-language path tested if multilingual is in scope",
          ],
        },
      ],
    },
    {
      id: "integrations",
      heading: "CRM, calendar, FSM integrations",
      blocks: [
        {
          kind: "ul",
          items: [
            "CRM integration tested: net-new caller → new Contact with custom fields populated",
            "Dedup tested: existing caller (by phone) → existing Contact updated, NOT duplicated",
            "Call recording + transcript URLs attached to the Contact activity",
            "Calendar integration tested: booking lands in the right calendar with right duration",
            "Service-type to duration mapping verified for each service type",
            "Conflict prevention verified (simulate concurrent booking, verify only one wins)",
            "API failure tested (disable CRM key, verify fallback queue catches the lead)",
            "Reschedule + cancellation flow tested",
          ],
        },
      ],
    },
    {
      id: "phone",
      heading: "Phone + number provisioning",
      blocks: [
        {
          kind: "ul",
          items: [
            "Number provisioned (new) OR forwarding configured (existing) OR port scheduled (later)",
            "Inbound caller ID is preserved (test with multiple carriers if forwarding)",
            "Voicemail fallback configured (what happens if the AI itself is down)",
            "SMS/text capability configured if you use that channel",
            "Toll-free vs local number choice made deliberately (cost + caller perception)",
          ],
        },
      ],
    },
    {
      id: "ops-readiness",
      heading: "Ops readiness",
      blocks: [
        {
          kind: "ul",
          items: [
            "Internal team trained on what the AI handles + when to expect escalations",
            "Escalation routing tested end-to-end (where does an escalated call actually land?)",
            "Reporting dashboard reviewed — you know where to look for containment rate, booking rate, escalations",
            "Runbook documented for common issues (integration error, mis-escalation, wrong booking time)",
            "First-week tuning calendar blocked (~30 min/day to listen to recordings)",
            "Stakeholders notified of cut-over date (sales team, customer success, anyone who answers escalations)",
          ],
        },
      ],
    },
    {
      id: "rollback",
      heading: "Rollback plan",
      blocks: [
        {
          kind: "p",
          text: "If something is meaningfully broken in the first 24-48 hours, you need to be able to revert without a panic. Have this lined up:",
        },
        {
          kind: "ul",
          items: [
            "Forwarding can be flipped off in <5 minutes (no port = no panic)",
            "Vendor has a 'pause' or 'disable' mode that stops new calls from going to the AI",
            "A live person is on standby to answer the line during the cut-over window",
            "You know who to call at the vendor's support for production issues",
            "Customer-facing apology language drafted for the worst case (cut-over hits a snag, customers get a weird experience)",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Don't launch on a Friday",
          body: "Launch Tuesday morning. Tuesday gives you 4 business days to catch issues before the weekend. Friday-launches mean you spend Saturday on the phone with vendor support.",
        },
      ],
    },
  ],
  relatedGuideSlugs: ["ai-receptionist-setup-guide", "post-launch-optimization-guide"],
  relatedServiceSlugs: ["setup"],
};

export const GUIDE_POST_LAUNCH: GuideConfig = {
  slug: "post-launch-optimization-guide",
  order: 5,
  metaTitle: "AI receptionist post-launch optimization guide (KPIs + tuning)",
  metaDescription:
    "What to measure, when to tune, and how to avoid the post-launch drift that quietly kills AI receptionist deployments. The metrics framework + tuning playbook for the first 90 days.",
  eyebrow: "Guide · Optimization",
  title: "Post-launch optimization guide",
  tagline: "Most AI receptionist deployments quietly drift in the first 90 days. This is the metrics framework + tuning playbook to catch and fix it.",
  readingTime: "10 min read",
  intro:
    "The cut-over went fine, the first week was solid, then somewhere around week 5 the team stopped looking at the dashboards. By month 3 the containment rate has dropped, customers are complaining about edge cases the AI used to handle, and someone is suggesting you 'switch vendors.' That's not a vendor problem — that's a tuning-discipline problem. This guide is the metrics + cadence playbook to keep an AI receptionist healthy past launch.",
  sections: [
    {
      id: "kpis",
      heading: "The metrics framework",
      blocks: [
        {
          kind: "p",
          text: "Too many KPIs and no one looks at them. The minimum useful set:",
        },
        { kind: "h3", text: "Containment rate" },
        {
          kind: "p",
          text: "Percentage of calls handled end-to-end by the AI without escalation. Target depends on your business — most well-tuned setups run 60-85%. If yours is below 50%, the call flow needs work. If it's above 95%, you may be escalating too rarely (check the recordings).",
        },
        { kind: "h3", text: "Booking rate (if booking is in scope)" },
        {
          kind: "p",
          text: "Percentage of qualified booking-intent calls that result in a confirmed appointment. Should approach or exceed your previous staffed rate within 4–6 weeks. If it doesn't, the booking flow is the bottleneck.",
        },
        { kind: "h3", text: "Average call duration" },
        {
          kind: "p",
          text: "Drift up over a few weeks usually means the AI is over-explaining. Drift down often means callers are hanging up early — check whether the AI is missing intent.",
        },
        { kind: "h3", text: "Customer-initiated escalations" },
        {
          kind: "p",
          text: "Calls where the caller asked for a human. Each one is a failure to handle that intent. Tracking the trend matters more than the absolute number.",
        },
        { kind: "h3", text: "Integration error rate" },
        {
          kind: "p",
          text: "CRM pushes that failed, bookings that didn't sync, webhooks that timed out. Should be near-zero in steady state; a spike means a config or API problem.",
        },
      ],
    },
    {
      id: "weekly-cadence",
      heading: "Weekly review cadence",
      blocks: [
        {
          kind: "p",
          text: "30 minutes a week, every week, for the first 90 days. The discipline is the whole game.",
        },
        {
          kind: "ol",
          items: [
            "Review the 5 KPI numbers vs last week (containment, booking, duration, escalations, errors)",
            "Listen to 5 randomly sampled call recordings end-to-end",
            "Listen to 5 calls flagged as escalations or low-sentiment",
            "List 1–3 specific changes to make based on what you heard",
            "Make the changes, deploy, note them in a changelog",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Keep a changelog",
          body: "Every prompt edit, escalation rule change, FAQ addition — log it with date + reason. When something breaks 6 weeks later, you'll have a paper trail of what changed.",
        },
      ],
    },
    {
      id: "common-issues",
      heading: "Common drift patterns and how to fix them",
      blocks: [
        { kind: "h3", text: "Containment rate dropped 10+ points" },
        {
          kind: "p",
          text: "Almost always a new question type the AI doesn't have FAQ coverage for. Listen to escalated calls; add the new questions to the FAQ.",
        },
        { kind: "h3", text: "Customers reporting the AI sounds 'off'" },
        {
          kind: "p",
          text: "Usually means a prompt was edited badly, or the vendor pushed a model update that changed the voice. Pull a recent call, compare to a launch-week call. If the voice changed, escalate to the vendor.",
        },
        { kind: "h3", text: "Booking rate dropped" },
        {
          kind: "p",
          text: "Either a calendar integration issue (check error logs) or a script change that made the booking flow more confusing. Roll back to the previous booking script and compare.",
        },
        { kind: "h3", text: "Duplicate contacts piling up in CRM" },
        {
          kind: "p",
          text: "Dedup broke. Either the vendor's lookup logic regressed or your CRM field changed. Run a dedup audit; restore the lookup rule.",
        },
        { kind: "h3", text: "After-hours escalations going to voicemail" },
        {
          kind: "p",
          text: "On-call rotation may have changed without updating the AI's escalation routing. Verify the rotation in the AI's config matches reality.",
        },
      ],
    },
    {
      id: "quarterly",
      heading: "Quarterly deeper review",
      blocks: [
        {
          kind: "p",
          text: "Every 90 days, take a longer look:",
        },
        {
          kind: "ul",
          items: [
            "Pull the full quarter of call data — top intents, escalation reasons, drop-off points",
            "Re-evaluate FAQ coverage against the last quarter's actual questions",
            "Audit CRM data hygiene — duplicate rate, custom field fill rate",
            "Review pricing vs realized ROI (did you stay in your bucket? overage cost?)",
            "Review vendor's product changelog — anything new you should adopt?",
            "Stakeholder check: ask the customer success / sales team what they're hearing about the AI",
          ],
        },
      ],
    },
    {
      id: "when-to-switch",
      heading: "When 'switch vendors' is actually the right call",
      blocks: [
        {
          kind: "p",
          text: "Most 'we should switch' instincts are tuning problems. But sometimes it's actually a vendor problem:",
        },
        {
          kind: "ul",
          items: [
            "The vendor pushed a model update that meaningfully degraded the voice and won't roll back",
            "Pricing changed unfavorably and there's no negotiation room",
            "A critical integration the vendor promised was 'on the roadmap' is now indefinitely deferred",
            "Support response time has degraded to the point of breaking incident response",
            "The vendor's company is in trouble (layoffs, missed payroll, sudden leadership exit)",
          ],
        },
        {
          kind: "p",
          text: "Before switching, write down what specifically would have to be true on the new vendor for it to be better — and verify that on a demo. Switching for novelty usually means rebuilding the same problems.",
        },
      ],
    },
  ],
  relatedGuideSlugs: ["ai-receptionist-launch-checklist", "ai-receptionist-setup-guide"],
  relatedServiceSlugs: ["setup", "call-flow"],
};

/* ------------------------------------------------------------------ */
/* Registry + ordering                                                 */
/* ------------------------------------------------------------------ */

export const GUIDES: Record<string, GuideConfig> = {
  [GUIDE_SETUP.slug]: GUIDE_SETUP,
  [GUIDE_INTEGRATION.slug]: GUIDE_INTEGRATION,
  [GUIDE_CALL_FLOW.slug]: GUIDE_CALL_FLOW,
  [GUIDE_LAUNCH_CHECKLIST.slug]: GUIDE_LAUNCH_CHECKLIST,
  [GUIDE_POST_LAUNCH.slug]: GUIDE_POST_LAUNCH,
};

export const GUIDES_ORDERED: ReadonlyArray<GuideConfig> = Object.values(GUIDES).sort(
  (a, b) => a.order - b.order,
);
