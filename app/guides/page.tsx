import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { JsonLd } from "@/components/marketing/json-ld";
import { GUIDES_ORDERED } from "@/lib/guides";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI receptionist implementation guides — practical playbooks",
  description:
    "Long-form, practical guides for launching and running an AI receptionist: setup, CRM and booking integration, call flow design, launch checklist, and post-launch optimization.",
  path: "/guides",
});

export default function GuidesHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
        ])}
      />

      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Implementation library
              </p>
              <h1 className="mt-3 font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
                Practical playbooks,{" "}
                <span className="font-light text-ink/60">written by people who&apos;ve shipped them.</span>
              </h1>
              <div className="mt-5">
                <EditorialMeta updated="2026-05" />
              </div>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                Each guide is the exact project plan we use on real engagements — not a marketing
                explainer. Start with the Setup guide if you&apos;re launching; jump to Post-launch
                Optimization if you&apos;re already live and something feels off.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* GUIDE LIST */}
      <Section tone="paper" className="pt-4 pb-14 md:pt-6 md:pb-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {GUIDES_ORDERED.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-rule bg-surface p-7 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:p-8"
                >
                  <div>
                    <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-signal">
                      {g.eyebrow} · {g.readingTime}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-bold text-ink group-hover:text-signal md:text-3xl">
                      {g.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-ink-soft md:text-lg">
                      {g.tagline}
                    </p>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-3 border-t border-rule pt-4">
                    <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                      {g.sections.length} sections
                      {g.checklist?.length ? ` · ${g.checklist.length}-item checklist` : ""}
                    </span>
                    <span className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-signal group-hover:underline">
                      Read the guide →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* READING PATH */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Suggested reading path
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                Pick the entry point that matches your stage.
              </h2>
              <p className="mt-4 text-ink-soft">
                Each guide stands alone, but most teams hit them in this order during a real
                project.
              </p>
            </div>
            <div className="space-y-6">
              <PathStep
                step="01"
                label="You're evaluating"
                body="Read the Setup guide to understand the project before scoping vendors. Helps you ask the right questions on demos."
                href="/guides/ai-receptionist-setup-guide"
                cta="Setup guide →"
              />
              <PathStep
                step="02"
                label="You've picked a vendor"
                body="The Call Flow Design guide first (decisions you'll make once), then the CRM & Booking Integration guide (what you'll do once you start configuring)."
                href="/guides/call-flow-design-guide"
                cta="Call flow guide →"
              />
              <PathStep
                step="03"
                label="You're days from cut-over"
                body="The Launch Checklist. Don't skip items — they're things we've watched go wrong in production."
                href="/guides/ai-receptionist-launch-checklist"
                cta="Launch checklist →"
              />
              <PathStep
                step="04"
                label="You're already live"
                body="The Post-launch Optimization guide. The metrics framework + tuning cadence that catches the drift before it becomes 'we should switch vendors.'"
                href="/guides/post-launch-optimization-guide"
                cta="Post-launch guide →"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* MATCHED CTA */}
      <CtaBanner variant="matched" />

      {/* SETUP CTA */}
      <CtaBanner variant="setup" />
    </>
  );
}

function PathStep({
  step,
  label,
  body,
  href,
  cta,
}: {
  step: string;
  label: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule pb-5 last:border-b-0 last:pb-0">
      <span className="font-heading text-2xl font-bold tabular-nums text-muted-ink/70">{step}</span>
      <div>
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-signal">
          {label}
        </p>
        <p className="mt-1.5 text-base leading-relaxed text-ink-soft md:text-[17px]">{body}</p>
        <Link
          href={href}
          className="mt-3 inline-flex items-center font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-signal hover:underline"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
