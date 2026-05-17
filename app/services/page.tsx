import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { ServiceSection } from "@/app/services/_components/service-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Implementation services — pick, set up, and launch your AI receptionist",
  description:
    "Fixed-scope help with vendor selection, call flow design, CRM and booking integration, and AI receptionist launch. Built for small and mid-sized service teams that don't want to run the project themselves.",
  path: "/services",
});

const SERVICES = [
  {
    id: "selection",
    eyebrow: "Service · 01",
    title: "Vendor selection",
    whoItsFor:
      "Teams who've narrowed it to 2–3 options and want a second opinion before committing — or teams who haven't started and need someone to run the shortlist.",
    description:
      "We score your shortlist against your call volume, integrations stack, vertical, and the way your team actually answers the phone today. Output is a short written recommendation with reasons, not a deck.",
    deliverables: [
      "Discovery: current call patterns, missed-call cost, who answers when",
      "Ranked shortlist of 2–3 vendors with the trade-offs for your situation",
      "Implementation effort estimate per option",
      "30-minute review call to walk through it",
    ],
    pricing: "Fixed scope · from $800",
  },
  {
    id: "setup",
    eyebrow: "Service · 02",
    title: "AI receptionist setup",
    whoItsFor:
      "Businesses that have already picked a vendor and need someone to actually launch it — without burning an internal week or two.",
    description:
      "End-to-end launch: account configuration, number provisioning, greeting and call-flow prompts, fallback paths, and live test on a real number until it sounds like your business.",
    deliverables: [
      "Vendor account setup and routing rules",
      "Greeting, qualification, and FAQ prompts in your voice",
      "Escalation paths for after-hours, urgent, and complex calls",
      "Two weeks of post-launch tuning and prompt revisions",
    ],
    pricing: "Fixed scope · from $1,800",
  },
  {
    id: "integration",
    eyebrow: "Service · 03",
    title: "CRM &amp; booking integration",
    whoItsFor:
      "Teams that want the AI to push leads into a CRM, book directly into a calendar, or trigger workflows in a downstream tool.",
    description:
      "We wire the vendor's webhooks or native integration into HubSpot, Salesforce, Pipedrive, GoHighLevel, ServiceTitan, Cal.com, Acuity, or a custom backend — and test on real call flows before handoff.",
    deliverables: [
      "Field mapping (caller intent, contact data, qualification answers)",
      "CRM integration (native or via Zapier/n8n/webhook) with retry logic",
      "Calendar booking flow with conflict + buffer rules",
      "End-to-end test plan and runbook",
    ],
    pricing: "Fixed scope · from $1,200",
  },
  {
    id: "flow",
    eyebrow: "Service · 04",
    title: "Call flow &amp; routing design",
    whoItsFor:
      "Anyone whose calls aren't a simple 'qualify, capture, hand off' — service businesses with multiple departments, multilingual support, after-hours, emergency lanes, or complex intake.",
    description:
      "Pure design work: we map the actual call paths your business needs, write the AI prompts that drive each branch, and document handoff rules. Vendor-agnostic — works with whatever tool you've picked.",
    deliverables: [
      "Call flow diagram (qualification → routing → escalation)",
      "Prompt set covering each branch, in your tone of voice",
      "Edge-case playbook: refunds, escalation, language switch",
      "Optional A/B variants for greeting and qualification scripts",
    ],
    pricing: "Fixed scope · from $1,000",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Section tone="paper" className="pt-12 pb-10 md:pt-16 md:pb-14">
        <Container className="space-y-6">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Implementation services
              </p>
              <h1 className="mt-3 font-heading text-[2.4rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[4rem]">
                <span className="font-bold">Pick the right tool.</span>{" "}
                <span className="font-light text-ink/55">Launch it correctly.</span>
              </h1>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
                CallTreo also runs the engagements buyers ask for after the comparison work is done:
                shortlisting, setup, call-flow design, CRM and booking integration. Fixed-scope,
                practical, built for small and mid-sized service teams.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
                >
                  Talk to us about setup
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="#selection"
                  className="inline-flex items-center font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-signal hover:underline"
                >
                  See what we do →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" className="pt-4 pb-12 md:pt-8 md:pb-16">
        <Container className="space-y-12 md:space-y-16">
          {SERVICES.map((s) => (
            <ServiceSection
              key={s.id}
              id={s.id}
              eyebrow={s.eyebrow}
              title={s.title}
              whoItsFor={s.whoItsFor}
              description={s.description}
              deliverables={s.deliverables}
              pricing={s.pricing}
            />
          ))}
        </Container>
      </Section>

      <Section tone="paper" className="pt-0 pb-16 md:pb-24">
        <Container>
          <CtaBanner variant="talk" tone="ink" />
        </Container>
      </Section>

      <Section tone="paper" className="border-t border-rule pt-12 pb-16 md:pt-16 md:pb-20">
        <Container className="max-w-3xl">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
            Editorial note
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
            These engagements are independent of vendor ranking.
          </h2>
          <p className="mt-4 text-ink-soft">
            We score every vendor on the same published rubric before any commercial relationship
            exists. Setup engagements may use any tool you choose — including vendors we don&apos;t
            have a referral relationship with. Read the full editorial standard at{" "}
            <Link href="/disclosure" className="text-ink underline underline-offset-4 hover:text-signal">
              our disclosure page
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
