import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { SERVICE_PACKAGES, type ServicePackage } from "@/lib/services";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

type ServicePageProps = {
  pkg: ServicePackage;
};

export function ServicePage({ pkg }: ServicePageProps) {
  const related =
    pkg.relatedSlugs
      ?.map((slug) => SERVICE_PACKAGES[slug])
      .filter((p): p is ServicePackage => Boolean(p)) ?? [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: pkg.title, href: `/services/${pkg.slug}` },
          ]),
          faqJsonLd(pkg.faqs),
        ]}
      />

      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: pkg.title, href: `/services/${pkg.slug}` },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                {pkg.eyebrow}
              </p>
              <h1 className="mt-3 font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
                {pkg.title}
              </h1>
              <div className="mt-5">
                <EditorialMeta updated="2026-05" sourcingLabel="Disclosure" sourcingHref="/disclosure" />
              </div>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {pkg.tagline}
              </p>
            </div>
            <aside className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-7">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-signal">
                Engagement
              </p>
              <p className="mt-3 font-heading text-3xl font-bold leading-none text-ink">
                {pkg.pricingFrom}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pkg.pricingNotes}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/contact?source=services-${pkg.slug}`}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-4 py-2.5 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-signal-ink transition-colors hover:bg-signal-hover"
                >
                  Start this engagement
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 px-4 py-2.5 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Not sure? Take the quiz
                </Link>
              </div>
            </aside>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-ink-soft md:text-lg">
            {pkg.intro}
          </p>
        </Container>
      </Section>

      {/* OUTCOMES */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Outcomes
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              What changes for you.
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {pkg.outcomes.map((o, i) => (
              <li
                key={o.label}
                className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)]"
              >
                <span className="font-heading text-sm font-bold tabular-nums text-muted-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-ink">{o.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* SCOPE */}
      <Section tone="paper" className="py-14 md:py-20">
        <Container className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              What&apos;s included
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Scope of work.
            </h2>
            <ul className="mt-6 space-y-3">
              {pkg.included.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-rule pb-3 text-sm leading-relaxed text-ink-soft"
                >
                  <span aria-hidden className="font-heading text-signal">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
              Not included this engagement
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              What we won&apos;t pretend to cover.
            </h2>
            <ul className="mt-6 space-y-3">
              {pkg.notIncluded.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-rule pb-3 text-sm leading-relaxed text-ink-soft"
                >
                  <span aria-hidden className="font-heading text-muted-ink">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Process
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              How it actually runs.
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {pkg.process.map((p, i) => (
              <li
                key={p.step}
                className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-7"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-heading text-sm font-bold tabular-nums text-muted-ink">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">
                    {p.duration}
                  </span>
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* WHO FOR + WHO NOT FOR */}
      <Section tone="tint" className="py-14 md:py-20">
        <Container className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Who this is for
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              You probably want this if…
            </h2>
            <ul className="mt-6 space-y-4">
              {pkg.whoForBullets.map((b) => (
                <li key={b} className="border-l-2 border-signal pl-5 text-sm leading-relaxed text-ink-soft">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
              Who this isn&apos;t for
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Skip this engagement if…
            </h2>
            <ul className="mt-6 space-y-4">
              {pkg.whoNotForBullets.map((b) => (
                <li key={b} className="border-l-2 border-rule pl-5 text-sm leading-relaxed text-ink-soft">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* PRICING DETAIL */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Pricing
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                {pkg.pricingFrom}
              </h2>
              <p className="mt-3 text-ink-soft">{pkg.pricingNotes}</p>
            </div>
            <div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-ink">
                What moves the price up
              </p>
              <ul className="mt-3 space-y-3">
                {pkg.pricingDrivers.map((d) => (
                  <li
                    key={d}
                    className="flex gap-3 border-b border-rule pb-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <span aria-hidden className="font-heading text-signal">
                      +
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                FAQ
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">
                Questions before you commit.
              </h2>
            </div>
            <div className="border-t border-rule">
              <FaqAccordion items={pkg.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* RELATED PACKAGES */}
      {related.length ? (
        <Section tone="paper" className="border-t border-rule pt-12 pb-12 md:pt-16 md:pb-14">
          <Container>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Related engagements
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              Often bundled with this.
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group block h-full rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                      {r.eyebrow}
                    </p>
                    <p className="mt-2 font-heading text-lg font-semibold text-ink group-hover:text-signal">
                      {r.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.tagline}</p>
                    <p className="mt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal">
                      {r.pricingFrom} →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* TALK CTA */}
      <CtaBanner variant="talk" />
    </>
  );
}
