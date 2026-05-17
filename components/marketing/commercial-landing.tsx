import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { ComparisonStackedCards } from "@/components/comparisons/comparison-stacked-cards";
import { ComparisonTable } from "@/components/comparisons/comparison-table";
import { COMMERCIAL_PAGES, type CommercialFilter, type CommercialPageConfig } from "@/lib/commercial-pages";
import { INTEGRATION_PAGES, type IntegrationPageConfig } from "@/lib/integration-pages";
import { prisma } from "@/lib/db";
import { formatPricing, formatScore } from "@/lib/scoring";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/**
 * Maps a CommercialFilter into a Prisma `where`. Single source of
 * truth for "which vendors count for this page."
 */
function filterToWhere(filter: CommercialFilter) {
  if (filter.type === "vertical") {
    return {
      isPublished: true,
      vendorVerticals: { some: { vertical: { slug: filter.slug } } },
    };
  }
  if (filter.type === "capability") {
    const map = {
      booking: { hasAppointmentBooking: true },
      crm: { hasCrmIntegration: true },
      handoff: { hasHumanHandoff: true },
      multilingual: { hasMultilingual: true },
      "247": { has24x7: true },
      hipaa: { hipaaFriendly: true },
    } as const;
    return { isPublished: true, ...map[filter.slug] };
  }
  // feature
  return {
    isPublished: true,
    vendorFeatures: { some: { feature: { slug: filter.slug } } },
  };
}

/** Builds the URL that filters the directory to the same vendors. */
function directoryHref(filter: CommercialFilter): string {
  if (filter.type === "vertical") return `/vendors?verticals=${filter.slug}`;
  if (filter.type === "capability") return `/vendors?capabilities=${filter.slug}`;
  return `/vendors?features=${filter.slug}`;
}

type CommercialLandingProps = {
  config: CommercialPageConfig;
};

export async function CommercialLanding({ config }: CommercialLandingProps) {
  const where = filterToWhere(config.filter);

  const vendors = await prisma.vendor.findMany({
    where,
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: 6,
  });

  const related: ReadonlyArray<CommercialPageConfig> =
    config.relatedSlugs
      ?.map((slug) => COMMERCIAL_PAGES[slug])
      .filter((c): c is CommercialPageConfig => Boolean(c)) ?? [];

  const relatedIntegrations: ReadonlyArray<IntegrationPageConfig> =
    config.relatedIntegrationSlugs
      ?.map((slug) => INTEGRATION_PAGES[slug])
      .filter((c): c is IntegrationPageConfig => Boolean(c)) ?? [];

  if (!vendors.length) {
    // Defensive: shouldn't happen with seeded data, but better to 404
    // than render a page that promises a ranking and then shows nothing.
    notFound();
  }

  const topThree = vendors.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: config.eyebrow, href: `/${config.slug}` },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-14">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                {config.eyebrow}
              </p>
              <h1 className="mt-3 font-heading text-[2.2rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.5rem]">
                <span className="font-bold">{config.headlineLead}</span>{" "}
                {config.headlineAccent ? (
                  <span className="font-light text-ink/55">{config.headlineAccent}</span>
                ) : null}
              </h1>
              <div className="mt-5">
                <EditorialMeta updated={config.updatedYearMonth ?? "2026-05"} />
              </div>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-base leading-relaxed text-ink-soft md:text-lg">{config.intro}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={directoryHref(config.filter)}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-signal"
                >
                  Compare these vendors
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-ink/15 bg-surface px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Take the quiz
                </Link>
                <Link
                  href="/services"
                  className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-ink underline-offset-4 hover:text-signal hover:underline"
                >
                  Need help launching it? →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* TOP PICKS — ranked list */}
      <Section tone="paper" className="pt-2 pb-14 md:pt-4 md:pb-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Top picks
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                The {topThree.length === 1 ? "lead pick" : `top ${topThree.length}`} for this use
                case.
              </h2>
              <p className="mt-4 text-ink-soft">
                Pulled live from the directory using the same editor rubric. Scores update as
                vendors change.
              </p>
              <Link
                href={directoryHref(config.filter)}
                className="mt-5 inline-flex items-center gap-1 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-signal hover:underline"
              >
                See all {vendors.length} in the directory →
              </Link>
            </div>
            <ol>
              {topThree.map((v, i) => (
                <li
                  key={v.id}
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-rule py-5 first:border-t md:gap-6 md:py-6"
                >
                  <span className="font-heading text-2xl font-bold tabular-nums text-muted-ink/70 md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/vendors/${v.slug}`}
                      className="font-heading text-xl font-bold text-ink hover:text-signal md:text-2xl"
                    >
                      {v.name}
                    </Link>
                    {v.tagline ? (
                      <p className="mt-1 truncate text-sm text-ink-soft">{v.tagline}</p>
                    ) : null}
                    {v.bestFor ? (
                      <p className="mt-1 text-sm text-ink-soft">
                        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
                          Best for ·{" "}
                        </span>
                        {v.bestFor}
                      </p>
                    ) : null}
                    <p className="mt-2 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-ink">
                      {formatPricing(v.pricingFromUsd, v.pricingModel)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-2xl font-bold leading-none tabular-nums text-ink md:text-3xl">
                      {formatScore(v.overallScore)}
                    </p>
                    <Link
                      href={`/vendors/${v.slug}`}
                      className="mt-2 inline-block font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-signal underline-offset-4 hover:underline"
                    >
                      Read review →
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* TABLE */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container className="space-y-6">
          <div className="grid gap-3 md:grid-cols-[5fr_7fr] md:items-end md:gap-12">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Side by side
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
                The full shortlist on one row each.
              </h2>
            </div>
            <p className="text-sm text-ink-soft">
              Same data as the directory, filtered to this use case. Mobile renders as stacked
              cards instead of a scroll-table.
            </p>
          </div>
          <div className="hidden md:block">
            <ComparisonTable vendors={vendors} />
          </div>
          <div className="md:hidden">
            <ComparisonStackedCards vendors={vendors} />
          </div>
        </Container>
      </Section>

      {/* GET MATCHED CTA */}
      <Section tone="paper" className="pt-14 pb-10 md:pt-16 md:pb-12">
        <Container>
          <CtaBanner variant="matched" tone="deep" />
        </Container>
      </Section>

      {/* WHAT WE LOOK FOR + BUYER NOTES */}
      <Section tone="paper" className="pt-6 pb-14 md:pt-10 md:pb-20">
        <Container className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              What we look for
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Criteria we weight heavy for this use case.
            </h2>
            <dl className="mt-6">
              {config.criteria.map((c, i) => (
                <div
                  key={c.title}
                  className="grid grid-cols-[2rem_1fr] items-baseline gap-4 border-b border-rule py-5"
                >
                  <dt className="font-heading text-sm font-bold tabular-nums text-muted-ink">
                    {String(i + 1).padStart(2, "0")}
                  </dt>
                  <dd>
                    <p className="font-heading text-base font-semibold text-ink">{c.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Buyer notes
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Things you&apos;ll wish someone told you.
            </h2>
            <ul className="mt-6 space-y-6">
              {config.buyerNotes.map((n) => (
                <li key={n.title} className="border-l-2 border-signal pl-5">
                  <p className="font-heading text-base font-semibold text-ink">{n.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper" className="pt-2 pb-16 md:pb-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                FAQ
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">
                Specific to this segment.
              </h2>
            </div>
            <div className="border-t border-rule">
              <FaqAccordion items={config.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* SETUP CTA */}
      <Section tone="paper" className="pb-12">
        <Container>
          <CtaBanner variant="setup" tone="ink" />
        </Container>
      </Section>

      {/* RELATED COMMERCIAL PAGES */}
      {related.length ? (
        <Section tone="paper" className="border-t border-rule pt-12 pb-16 md:pt-16 md:pb-20">
          <Container>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Related
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              Other angles on the same problem.
            </h2>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-5"
                  >
                    <span>
                      <p className="font-heading text-lg font-semibold text-ink group-hover:text-signal">
                        {r.headlineLead} {r.headlineAccent ?? ""}
                      </p>
                      <p className="mt-1 text-sm text-muted-ink">{r.eyebrow}</p>
                    </span>
                    <span
                      aria-hidden
                      className="font-heading text-sm text-muted-ink group-hover:text-signal"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/best-ai-receptionist-software"
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span>
                    <p className="font-heading text-lg font-semibold text-ink group-hover:text-signal">
                      Best AI receptionist software (overall)
                    </p>
                    <p className="mt-1 text-sm text-muted-ink">Best of · All segments</p>
                  </span>
                  <span aria-hidden className="font-heading text-sm text-muted-ink group-hover:text-signal">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* RELATED INTEGRATIONS — cross-cluster link */}
      {relatedIntegrations.length ? (
        <Section tone="deep" className="border-t border-rule py-12 md:py-16">
          <Container>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Tool-specific integration guides
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              For buyers wiring the AI into a specific stack.
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedIntegrations.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:p-6"
                  >
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                        {r.eyebrow}
                      </p>
                      <p className="mt-2 font-heading text-lg font-semibold text-ink group-hover:text-signal md:text-xl">
                        {r.headlineLead} {r.headlineAccent ?? ""}
                      </p>
                    </div>
                    <p className="mt-4 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal group-hover:underline">
                      Read the {r.toolName} guide →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* FINAL TALK-TO-US */}
      <Section tone="paper" className="pb-20">
        <Container>
          <CtaBanner variant="talk" tone="deep" />
        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: config.eyebrow, href: `/${config.slug}` },
          ]),
          faqJsonLd(config.faqs),
        ]}
      />
    </>
  );
}
