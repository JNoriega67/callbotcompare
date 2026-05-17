import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  INTEGRATION_PAGES,
  type IntegrationCategory,
  type IntegrationDepth,
  type IntegrationPageConfig,
} from "@/lib/integration-pages";
import { COMMERCIAL_PAGES, type CommercialPageConfig } from "@/lib/commercial-pages";
import { prisma } from "@/lib/db";
import { formatPricing, formatScore } from "@/lib/scoring";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/**
 * Map integration category → vendor pool filter. CRM/FSM/legal-cms
 * pages rank vendors with `hasCrmIntegration` (proxy for "supports
 * structured push to an external system"); calendar pages rank by
 * `hasAppointmentBooking`. We rank by overall score within that pool;
 * the *specific* tool support is editorial.
 */
function categoryFilter(category: IntegrationCategory) {
  if (category === "calendar") {
    return { isPublished: true, hasAppointmentBooking: true };
  }
  // crm | fsm | legal-cms all proxy through CRM-integration capability.
  return { isPublished: true, hasCrmIntegration: true };
}

const DEPTH_RANK: Record<IntegrationDepth, number> = {
  native: 0,
  webhook: 1,
  zapier: 2,
  none: 3,
};

const DEPTH_PILL_CLASS: Record<IntegrationDepth, string> = {
  native:
    "bg-signal text-signal-ink ring-1 ring-inset ring-signal-deep/30",
  webhook:
    "bg-signal-soft text-signal-deep ring-1 ring-inset ring-signal/30",
  zapier:
    "bg-paper-deep text-ink-soft ring-1 ring-inset ring-rule",
  none:
    "bg-paper text-muted-ink ring-1 ring-inset ring-rule",
};

const DEPTH_RANK_LABEL: Record<IntegrationDepth, string> = {
  native: "01",
  webhook: "02",
  zapier: "03",
  none: "04",
};

type IntegrationLandingProps = {
  config: IntegrationPageConfig;
};

export async function IntegrationLanding({ config }: IntegrationLandingProps) {
  const where = categoryFilter(config.category);

  const vendors = await prisma.vendor.findMany({
    where,
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: 6,
  });

  const related: ReadonlyArray<IntegrationPageConfig> =
    config.relatedSlugs
      ?.map((slug) => INTEGRATION_PAGES[slug])
      .filter((c): c is IntegrationPageConfig => Boolean(c)) ?? [];

  const relatedCommercial: ReadonlyArray<CommercialPageConfig> =
    config.relatedCommercialSlugs
      ?.map((slug) => COMMERCIAL_PAGES[slug])
      .filter((c): c is CommercialPageConfig => Boolean(c)) ?? [];

  if (!vendors.length) {
    notFound();
  }

  const topThree = vendors.slice(0, 3);
  const sortedSpectrum = [...config.spectrum].sort(
    (a, b) => DEPTH_RANK[a.level] - DEPTH_RANK[b.level],
  );

  // Map the category to a sensible directory pre-filter URL.
  const directoryHref =
    config.category === "calendar"
      ? "/vendors?capabilities=booking"
      : "/vendors?capabilities=crm";

  return (
    <>
      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Integrations", href: "/vendors?capabilities=crm" },
              { label: config.toolName, href: `/${config.slug}` },
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
                  <span className="font-light text-ink/70">{config.headlineAccent}</span>
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
                  href={directoryHref}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-signal-ink transition-colors hover:bg-signal-hover"
                >
                  See {config.category === "calendar" ? "booking-capable" : "CRM-capable"} vendors
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
                  Need help wiring it? →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* INTEGRATION DEPTH SPECTRUM */}
      <Section tone="paper" className="pt-2 pb-14 md:pt-4 md:pb-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Integration depth
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                Not all &quot;{config.toolName} integration&quot; is the same.
              </h2>
              <p className="mt-4 text-ink-soft">
                Most vendor pages just say &quot;integrates with {config.toolName}.&quot; Four very
                different things hide under that label — and only one of them lets you skip the
                manual re-entry tax.
              </p>
              <Link
                href="/disclosure"
                className="mt-5 inline-flex items-center gap-1 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-signal hover:underline"
              >
                How we score integrations →
              </Link>
            </div>
            <ol className="space-y-3">
              {sortedSpectrum.map((row) => (
                <li
                  key={row.level}
                  className="rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-sm font-bold tabular-nums text-muted-ink">
                      {DEPTH_RANK_LABEL[row.level]}
                    </span>
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] " +
                        DEPTH_PILL_CLASS[row.level]
                      }
                    >
                      {row.level === "native"
                        ? "Best"
                        : row.level === "webhook"
                          ? "Good"
                          : row.level === "zapier"
                            ? "Workable"
                            : "Avoid"}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-ink md:text-lg">
                      {row.label}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{row.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* TOP PICKS — ranked vendors */}
      <Section tone="deep" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                Top picks
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
                Vendors most likely to actually integrate cleanly.
              </h2>
              <p className="mt-4 text-ink-soft">
                Ranked from the directory pool with{" "}
                {config.category === "calendar"
                  ? "appointment-booking capability"
                  : "CRM-integration capability"}
                . Always confirm {config.toolName} support specifically on a live demo against your
                own setup.
              </p>
              <Link
                href={directoryHref}
                className="mt-5 inline-flex items-center gap-1 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-signal hover:underline"
              >
                See all {vendors.length} candidates →
              </Link>
            </div>
            <ol>
              {topThree.map((v, i) => (
                <li
                  key={v.id}
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-rule py-5 first:border-t md:gap-6 md:py-6"
                >
                  <span className="font-heading text-2xl font-bold tabular-nums text-muted-ink md:text-3xl">
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

      {/* GET MATCHED CTA */}
      <Section tone="paper" className="pt-14 pb-10 md:pt-16 md:pb-12">
        <Container>
          <CtaBanner variant="matched" tone="deep" />
        </Container>
      </Section>

      {/* CRITERIA + BUYER NOTES */}
      <Section tone="tint" className="pt-6 pb-14 md:pt-10 md:pb-20">
        <Container className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              What &quot;good&quot; looks like
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-ink md:text-3xl">
              Criteria for a real {config.toolName} integration.
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
              Gotchas specific to {config.toolName}.
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
                {config.toolName}-specific questions.
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

      {/* RELATED INTEGRATIONS */}
      {related.length ? (
        <Section tone="paper" className="border-t border-rule pt-12 pb-16 md:pt-16 md:pb-20">
          <Container>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Related integrations
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              Same evaluation, different tool.
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

      {/* RELATED COMMERCIAL PAGES — cross-cluster link */}
      {relatedCommercial.length ? (
        <Section tone="deep" className="border-t border-rule py-12 md:py-16">
          <Container>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              For buyers in these segments
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              {config.toolName} buyers usually come from these use cases.
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedCommercial.map((r) => (
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
                      Read the segment guide →
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
            { label: config.toolName, href: `/${config.slug}` },
          ]),
          faqJsonLd(config.faqs),
        ]}
      />
    </>
  );
}
