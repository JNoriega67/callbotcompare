export const SITE_NAME = "CallTreo";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "http://localhost:3000";

export const SITE_TAGLINE = "Compare AI receptionist software without wasting weeks on demos.";

export const NAV_ITEMS = [
  { label: "Vendors", href: "/vendors" },
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/ai-receptionist-pricing" },
  { label: "Services", href: "/services" },
  { label: "Methodology", href: "/methodology" },
] as const;

export const FOOTER_LINKS = [
  {
    heading: "Compare",
    links: [
      { label: "All vendors", href: "/vendors" },
      { label: "Compare hub", href: "/compare" },
      { label: "Best AI receptionist software", href: "/best-ai-receptionist-software" },
      { label: "AI vs virtual receptionist", href: "/ai-receptionist-vs-virtual-receptionist" },
      { label: "Pricing guide", href: "/ai-receptionist-pricing" },
    ],
  },
  {
    heading: "By industry",
    links: [
      { label: "Law firms", href: "/best-ai-receptionist-for-law-firms" },
      { label: "Home services", href: "/best-ai-receptionist-for-home-services" },
      { label: "Medical offices", href: "/best-ai-receptionist-for-medical-offices" },
      { label: "Contractors", href: "/best-ai-receptionist-for-contractors" },
      { label: "Appointment booking", href: "/best-ai-answering-service-for-appointment-booking" },
    ],
  },
  {
    heading: "Integrations",
    links: [
      { label: "HubSpot", href: "/ai-receptionist-with-hubspot" },
      { label: "Salesforce", href: "/ai-receptionist-with-salesforce" },
      { label: "GoHighLevel", href: "/ai-receptionist-with-gohighlevel" },
      { label: "Calendly", href: "/ai-receptionist-with-calendly" },
      { label: "ServiceTitan", href: "/ai-receptionist-with-servicetitan" },
      { label: "Clio", href: "/ai-receptionist-with-clio" },
      { label: "Jobber", href: "/ai-receptionist-with-jobber" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Vendor selection", href: "/services/vendor-selection" },
      { label: "AI receptionist setup", href: "/services/setup" },
      { label: "CRM & booking integration", href: "/services/integration" },
      { label: "Call flow design", href: "/services/call-flow" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Methodology", href: "/methodology" },
      { label: "Disclosure", href: "/disclosure" },
      { label: "Take the quiz", href: "/quiz" },
      { label: "Talk to us", href: "/contact" },
    ],
  },
] as const;

/* Verbatim FAQs from docs/HOMEPAGE_COPY.md. */
export const HOMEPAGE_FAQS = [
  {
    question: "What is an AI receptionist?",
    answer:
      "An AI receptionist is software that answers inbound calls, handles basic conversations, routes calls, qualifies leads, and in some cases books appointments or updates systems.",
  },
  {
    question: "How is this different from a virtual receptionist?",
    answer:
      "A virtual receptionist is often human-led. An AI receptionist uses automated voice workflows, sometimes with human backup or escalation.",
  },
  {
    question: "Can an AI receptionist book appointments?",
    answer:
      "Many can, but the quality and workflow flexibility vary widely. That is one of the main things we compare.",
  },
  {
    question: "Is an AI answering service right for every business?",
    answer:
      "No. Businesses with complex or highly sensitive call flows may need a hybrid or human-first setup.",
  },
  {
    question: "How do you make money?",
    answer:
      "We may earn referral fees from some vendors or offer paid implementation help. Sponsored placements should always be disclosed clearly.",
  },
] as const;

/* Methodology criteria — surfaced both in the homepage strip and the
 * deeper "How we evaluate" section. Source: docs/SCORING_RUBRIC.md. */
export const METHODOLOGY_CRITERIA = [
  { label: "Call handling", description: "Conversation quality, routing reliability, edge-case handling." },
  { label: "Integrations", description: "Native CRM and calendar fit, API and webhook flexibility." },
  { label: "Automation", description: "Appointment booking, qualification, follow-up triggers." },
  { label: "Setup", description: "Time to launch, technical complexity, ongoing tuning." },
  { label: "Vertical fit", description: "Templates and signals for your industry's real workflow." },
  { label: "Pricing clarity", description: "How visible plans are and how cleanly they map to needs." },
] as const;

/* Compare-by-use-case cards on the homepage. If a dedicated landing page
 * exists for the vertical, link there; otherwise fall back to the filtered
 * vendor directory. */
export const USE_CASE_CARDS = [
  {
    label: "For law firms",
    verticalSlug: "law-firms",
    landingHref: "/best-ai-receptionist-for-law-firms",
    blurb: "Intake quality, conflict checks, structured routing.",
  },
  {
    label: "For home services",
    verticalSlug: "home-services",
    landingHref: "/best-ai-receptionist-for-home-services",
    blurb: "Dispatch, lead qualification, after-hours coverage.",
  },
  {
    label: "For medical offices",
    verticalSlug: "medical-offices",
    landingHref: "/best-ai-receptionist-for-medical-offices",
    blurb: "HIPAA-friendly, appointment booking, escalation.",
  },
  {
    label: "For contractors",
    verticalSlug: "contractors",
    landingHref: "/best-ai-receptionist-for-contractors",
    blurb: "Bilingual capacity, lead capture, project follow-up.",
  },
  {
    label: "For real estate teams",
    verticalSlug: "real-estate",
    blurb: "Inbound buyer/seller routing, fast handoff.",
  },
  {
    label: "For small business",
    verticalSlug: "small-business",
    blurb: "Light setup, predictable pricing, real-world workflows.",
  },
] as const;

/* Compare-by-feature tiles. */
export const FEATURE_TILES = [
  { label: "Appointment booking", capability: "booking" },
  { label: "CRM integration", capability: "crm" },
  { label: "Human handoff", capability: "handoff" },
  { label: "Multilingual support", capability: "multilingual" },
  { label: "After-hours coverage", capability: "247" },
  { label: "Lead qualification", featureSlug: "lead-qualification" },
  { label: "Analytics & reporting", featureSlug: "analytics-dashboard" },
  { label: "Healthcare-friendly", capability: "hipaa" },
] as const;
