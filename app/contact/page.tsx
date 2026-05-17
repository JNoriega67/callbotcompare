import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { LeadForm } from "@/components/forms/lead-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Talk to us",
  description:
    "Tell us a bit about your business and we'll point you to the strongest AI receptionist options for your industry, call volume, and workflow.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section tone="paper" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-4">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
            Need help choosing?
          </h1>
          <p className="max-w-2xl text-ink-soft">
            Tell us a little about your business and we&apos;ll point you to the strongest AI receptionist
            options for your industry, call volume, and workflow. No sales calls — just a short
            email back with a shortlist and the reasons behind it.
          </p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-start">
          <LeadForm hidden={{ source: "contact" }} submitLabel="Send my details" />
          <aside className="space-y-4 text-sm text-ink-soft">
            <h2 className="font-heading text-lg font-semibold text-ink">What happens next</h2>
            <ul className="space-y-2">
              <li>1. We read your context (usually within a business day).</li>
              <li>2. You get an email with 2–3 vendor suggestions and the reasons.</li>
              <li>3. If implementation help would be useful, we&apos;ll mention it — never the lead.</li>
            </ul>
            <p className="rounded-[var(--radius-card)] border border-rule bg-signal-soft/60 p-4 text-xs text-ink-soft">
              Prefer to self-serve? Take{" "}
              <a href="/quiz" className="text-signal underline-offset-2 hover:underline">
                the quiz
              </a>{" "}
              for an automated shortlist.
            </p>
          </aside>
        </Container>
      </Section>
    </>
  );
}
