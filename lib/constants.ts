export const SITE_NAME = "CallBotCompare";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "http://localhost:3000";

export const SITE_TAGLINE = "Compare AI receptionist software without wasting weeks on demos.";

export const NAV_ITEMS = [
  { label: "Compare", href: "/compare" },
  { label: "Vendors", href: "/vendors" },
  { label: "Best of", href: "/best-ai-receptionist-software" },
  { label: "Quiz", href: "/quiz" },
] as const;

export const FOOTER_LINKS = [
  {
    heading: "Compare",
    links: [
      { label: "All vendors", href: "/vendors" },
      { label: "Compare hub", href: "/compare" },
      { label: "Best AI receptionist software", href: "/best-ai-receptionist-software" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Take the quiz", href: "/quiz" },
      { label: "Talk to us", href: "/contact" },
    ],
  },
] as const;

export const HOMEPAGE_FAQS = [
  {
    question: "What is an AI receptionist?",
    answer:
      "An AI receptionist answers inbound calls, qualifies callers, books appointments, and routes to a human when needed — without the cost of a full-time staffed answering service.",
  },
  {
    question: "How is this site different from a regular software review site?",
    answer:
      "We rank vendors against a transparent rubric tuned for small and mid-sized service businesses, not generic SaaS features. We mark fields we haven't verified as 'research needed' rather than guessing.",
  },
  {
    question: "Do you take affiliate revenue from vendors?",
    answer:
      "Where we have a referral relationship with a vendor we'll disclose it. Ranking is independent of whether a vendor pays us.",
  },
  {
    question: "Can you help me choose?",
    answer:
      "Yes. Take the quiz for an automated shortlist, or contact us for a human-reviewed recommendation tailored to your industry and call volume.",
  },
] as const;
