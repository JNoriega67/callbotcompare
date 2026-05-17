import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/marketing/json-ld";
import { SERVICE_PACKAGES_ORDERED } from "@/lib/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Implementation services — pick, set up, and launch your AI receptionist",
  description:
    "Fixed-scope implementation services: vendor selection, end-to-end setup, CRM & booking integration, and call flow design. Built for SMB service teams that don't want to run the project themselves.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ])}
      />

      {/* HERO */}
      <Section tone="paper" className="pt-12 pb-10 md:pt-16 md:pb-14">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
            ]}
          />
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
                Four fixed-scope engagements that pick up where the comparison work ends. Each one
                is its own discrete project — scope, outcomes, and price documented upfront. Built
                for small and mid-sized service teams that don&apos;t want to run the project
                themselves.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
                >
                  Talk to us about a project
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Not sure where to start? Take the quiz
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PACKAGE CARDS */}
      <Section tone="paper" className="pt-4 pb-14 md:pt-6 md:pb-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {SERVICE_PACKAGES_ORDERED.map((pkg) => (
              <li key={pkg.slug}>
                <Link
                  href={`/services/${pkg.slug}`}
                  className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-rule bg-surface p-7 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:p-8"
                >
                  <div>
                    <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-signal">
                      {pkg.eyebrow}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-bold text-ink group-hover:text-signal md:text-3xl">
                      {pkg.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-ink-soft md:text-lg">
                      {pkg.tagline}
                    </p>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-3 border-t border-rule pt-4">
                    <span className="font-heading text-base font-bold text-ink">{pkg.pricingFrom}</span>
                    <span className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-signal group-hover:underline">
                      See package details →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* HOW WE WORK */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              How we work
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              Fixed scope. Written deliverables. Honest disqualifiers.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-7">
              <h3 className="font-heading text-lg font-semibold text-ink">No retainers up front</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Every package is a discrete engagement with a fixed scope and a flat fee. If you
                want ongoing help after launch, we&apos;ll quote a small retainer separately — never
                an open-ended monthly contract.
              </p>
            </article>
            <article className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-7">
              <h3 className="font-heading text-lg font-semibold text-ink">Vendor-neutral</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                We&apos;ll implement whatever vendor fits your case — including ones we have no
                referral relationship with. Our incentive is the engagement, not the affiliate. See
                the{" "}
                <Link
                  href="/disclosure"
                  className="text-ink underline underline-offset-4 hover:text-signal"
                >
                  disclosure page
                </Link>{" "}
                for the full standard.
              </p>
            </article>
            <article className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-7">
              <h3 className="font-heading text-lg font-semibold text-ink">We&apos;ll tell you no</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Each package page lists who shouldn&apos;t buy it. If your situation falls outside
                what we do well, we&apos;ll say so on the discovery call instead of taking the
                engagement and underdelivering.
              </p>
            </article>
          </div>
        </Container>
      </Section>

      {/* PRICING SUMMARY */}
      <Section tone="paper" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Pricing
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                Posted on every page.
              </h2>
              <p className="mt-4 text-ink-soft">
                Every engagement has a from-price and a list of what moves it up. No discovery
                games — you know roughly what it costs before you call.
              </p>
            </div>
            <ul className="divide-y divide-rule border-y border-rule">
              {SERVICE_PACKAGES_ORDERED.map((pkg) => (
                <li key={pkg.slug} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-6 py-5">
                  <div>
                    <p className="font-heading text-base font-semibold text-ink">{pkg.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">{pkg.tagline}</p>
                  </div>
                  <span className="font-heading text-base font-bold tabular-nums text-ink">
                    {pkg.pricingFrom}
                  </span>
                  <Link
                    href={`/services/${pkg.slug}`}
                    className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal underline-offset-4 hover:underline"
                  >
                    Details →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* TALK CTA */}
      <CtaBanner variant="talk" />

      {/* EDITORIAL NOTE */}
      <Section tone="paper" className="border-t border-rule pt-12 pb-16 md:pt-16 md:pb-20">
        <Container className="max-w-3xl">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
            Editorial note
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
            These engagements are independent of vendor ranking.
          </h2>
          <p className="mt-4 text-ink-soft">
            We score every vendor on the same{" "}
            <Link href="/methodology" className="text-ink underline underline-offset-4 hover:text-signal">
              published rubric
            </Link>{" "}
            before any commercial relationship exists. Setup engagements may use any tool you choose
            — including vendors we don&apos;t have a referral relationship with. The full editorial
            standard is on{" "}
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
