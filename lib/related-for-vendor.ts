/**
 * Pick a small set of related editorial pages to surface on a vendor
 * detail page. The goal is internal linking depth — not exhaustiveness.
 * We cap at 6 links so the section is glanceable.
 */

import { COMMERCIAL_PAGES } from "@/lib/commercial-pages";
import { INTEGRATION_PAGES } from "@/lib/integration-pages";

export type RelatedGuide = {
  href: string;
  title: string;
  eyebrow: string;
};

type VendorRelatedInput = {
  /** Vertical slugs the vendor is tagged with. */
  verticalSlugs: ReadonlyArray<string>;
  hasCrmIntegration: boolean | null;
  hasAppointmentBooking: boolean | null;
  hipaaFriendly: boolean | null;
};

/** Map a vendor vertical slug → the matching commercial page slug. */
const VERTICAL_TO_COMMERCIAL: Record<string, string> = {
  "law-firms": "best-ai-receptionist-for-law-firms",
  "home-services": "best-ai-receptionist-for-home-services",
  "medical-offices": "best-ai-receptionist-for-medical-offices",
  contractors: "best-ai-receptionist-for-contractors",
};

/** Map a vendor vertical → the most relevant integration slug. */
const VERTICAL_TO_INTEGRATION: Record<string, string> = {
  "law-firms": "ai-receptionist-with-clio",
  "home-services": "ai-receptionist-with-servicetitan",
  "medical-offices": "ai-receptionist-with-calendly",
  contractors: "ai-receptionist-with-jobber",
};

function toGuide(slug: string, kind: "commercial" | "integration"): RelatedGuide | null {
  if (kind === "commercial") {
    const c = COMMERCIAL_PAGES[slug];
    if (!c) return null;
    return {
      href: `/${c.slug}`,
      title: `${c.headlineLead} ${c.headlineAccent ?? ""}`.trim(),
      eyebrow: c.eyebrow,
    };
  }
  const i = INTEGRATION_PAGES[slug];
  if (!i) return null;
  return {
    href: `/${i.slug}`,
    title: `AI receptionist with ${i.toolName}`,
    eyebrow: i.eyebrow,
  };
}

export function relatedGuidesForVendor(input: VendorRelatedInput, max = 6): RelatedGuide[] {
  const seen = new Set<string>();
  const results: RelatedGuide[] = [];

  const push = (g: RelatedGuide | null) => {
    if (!g || seen.has(g.href) || results.length >= max) return;
    seen.add(g.href);
    results.push(g);
  };

  // 1) Vertical-matched commercial pages first (highest editorial relevance).
  for (const v of input.verticalSlugs) {
    const slug = VERTICAL_TO_COMMERCIAL[v];
    if (slug) push(toGuide(slug, "commercial"));
  }

  // 2) Vertical-matched integration pages (CRM/FSM/legal tool that's likely in use).
  for (const v of input.verticalSlugs) {
    const slug = VERTICAL_TO_INTEGRATION[v];
    if (slug) push(toGuide(slug, "integration"));
  }

  // 3) Capability-matched commercial pages.
  if (input.hasCrmIntegration) {
    push(toGuide("best-ai-phone-agent-with-crm-integration", "commercial"));
  }
  if (input.hasAppointmentBooking) {
    push(toGuide("best-ai-answering-service-for-appointment-booking", "commercial"));
  }

  // 4) Capability-matched integration pages — broader CRM/booking guides.
  if (input.hasCrmIntegration) {
    push(toGuide("ai-receptionist-with-hubspot", "integration"));
    push(toGuide("ai-receptionist-with-salesforce", "integration"));
  }
  if (input.hasAppointmentBooking) {
    push(toGuide("ai-receptionist-with-calendly", "integration"));
  }

  return results;
}
