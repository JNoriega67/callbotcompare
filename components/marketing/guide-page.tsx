import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { EditorialMeta } from "@/components/marketing/editorial-meta";
import { JsonLd } from "@/components/marketing/json-ld";
import { COMMERCIAL_PAGES, type CommercialPageConfig } from "@/lib/commercial-pages";
import { GUIDES, type GuideBlock, type GuideConfig, type GuideSection } from "@/lib/guides";
import { INTEGRATION_PAGES, type IntegrationPageConfig } from "@/lib/integration-pages";
import { SERVICE_PACKAGES, type ServicePackage } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";

const CALLOUT_TONE_CLASS: Record<"tip" | "warning" | "note", string> = {
  tip: "border-signal/40 bg-signal-soft/40 text-ink",
  warning: "border-[color:var(--warning)]/40 bg-[color:var(--warning)]/10 text-ink",
  note: "border-rule bg-paper-deep text-ink",
};

const CALLOUT_TONE_LABEL: Record<"tip" | "warning" | "note", string> = {
  tip: "Tip",
  warning: "Watch out",
  note: "Note",
};

function renderBlock(block: GuideBlock, idx: number) {
  switch (block.kind) {
    case "p":
      return (
        <p key={idx} className="text-base leading-[1.7] text-ink-soft md:text-[17px]">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="ml-1 space-y-2 border-l-2 border-rule pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="text-base leading-[1.65] text-ink-soft">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="ml-1 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[1.5rem_1fr] items-baseline gap-3 text-base leading-[1.65] text-ink-soft"
            >
              <span className="font-heading text-sm font-bold tabular-nums text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "h3":
      return (
        <h3
          key={idx}
          className="pt-2 font-heading text-xl font-semibold text-ink md:text-2xl"
        >
          {block.text}
        </h3>
      );
    case "callout":
      return (
        <aside
          key={idx}
          className={
            "rounded-[var(--radius-card)] border-l-4 px-5 py-4 md:px-6 md:py-5 " +
            CALLOUT_TONE_CLASS[block.tone]
          }
        >
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-signal">
            {block.title ?? CALLOUT_TONE_LABEL[block.tone]}
          </p>
          <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{block.body}</p>
        </aside>
      );
  }
}

function renderSection(section: GuideSection) {
  return (
    <section
      key={section.id}
      id={section.id}
      className="scroll-mt-24 border-t border-rule pt-10 first:border-t-0 first:pt-0 md:pt-12"
    >
      <h2 className="font-heading text-2xl font-bold leading-[1.15] text-ink md:text-3xl">
        {section.heading}
      </h2>
      <div className="mt-5 space-y-5 md:space-y-6">{section.blocks.map(renderBlock)}</div>
    </section>
  );
}

type GuidePageProps = {
  guide: GuideConfig;
};

export function GuidePage({ guide }: GuidePageProps) {
  const relatedGuides: ReadonlyArray<GuideConfig> =
    guide.relatedGuideSlugs?.map((slug) => GUIDES[slug]).filter((g): g is GuideConfig => Boolean(g)) ??
    [];
  const relatedCommercial: ReadonlyArray<CommercialPageConfig> =
    guide.relatedCommercialSlugs
      ?.map((slug) => COMMERCIAL_PAGES[slug])
      .filter((c): c is CommercialPageConfig => Boolean(c)) ?? [];
  const relatedIntegrations: ReadonlyArray<IntegrationPageConfig> =
    guide.relatedIntegrationSlugs
      ?.map((slug) => INTEGRATION_PAGES[slug])
      .filter((i): i is IntegrationPageConfig => Boolean(i)) ?? [];
  const relatedServices: ReadonlyArray<ServicePackage> =
    guide.relatedServiceSlugs
      ?.map((slug) => SERVICE_PACKAGES[slug])
      .filter((s): s is ServicePackage => Boolean(s)) ?? [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title, href: `/guides/${guide.slug}` },
        ])}
      />

      {/* HERO */}
      <Section tone="paper" className="pt-10 pb-10 md:pt-14 md:pb-12">
        <Container className="space-y-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: guide.title, href: `/guides/${guide.slug}` },
            ]}
          />
          <div className="space-y-5">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              {guide.eyebrow} · {guide.readingTime}
            </p>
            <h1 className="font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.25rem]">
              {guide.title}
            </h1>
            <EditorialMeta updated={guide.updatedYearMonth ?? "2026-05"} />
            <p className="max-w-3xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {guide.tagline}
            </p>
            <p className="max-w-3xl text-base leading-relaxed text-ink-soft md:text-[17px]">
              {guide.intro}
            </p>
          </div>
        </Container>
      </Section>

      {/* BODY + TOC */}
      <Section tone="paper" className="pt-2 pb-14 md:pt-4 md:pb-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-[7fr_4fr] md:gap-16">
            {/* Main body */}
            <article className="space-y-10 md:space-y-14">
              {guide.sections.map(renderSection)}

              {/* CHECKLIST */}
              {guide.checklist?.length ? (
                <section
                  id="checklist"
                  className="scroll-mt-24 border-t border-rule pt-10 md:pt-12"
                >
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
                    Checklist
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-bold leading-[1.15] text-ink md:text-3xl">
                    The version you can copy.
                  </h2>
                  <ul className="mt-6 divide-y divide-rule rounded-[var(--radius-card)] border border-rule bg-surface shadow-[var(--shadow-card)]">
                    {guide.checklist.map((item, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[2rem_1fr] items-start gap-3 p-4 md:p-5"
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded border border-ink/25 text-[12px] font-bold text-signal"
                        >
                          ☐
                        </span>
                        <div>
                          <p className="text-[15px] leading-[1.5] text-ink">{item.label}</p>
                          {item.detail ? (
                            <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </article>

            {/* TOC sidebar */}
            <aside className="md:sticky md:top-24 md:self-start">
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-signal">
                On this page
              </p>
              <nav className="mt-3 border-l border-rule">
                <ol className="space-y-1.5">
                  {guide.sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block border-l-2 border-transparent pl-3 text-sm text-muted-ink transition-colors hover:border-signal hover:text-ink"
                      >
                        <span className="font-heading text-[10px] font-semibold tabular-nums text-muted-ink/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        {s.heading}
                      </a>
                    </li>
                  ))}
                  {guide.checklist?.length ? (
                    <li>
                      <a
                        href="#checklist"
                        className="block border-l-2 border-transparent pl-3 text-sm text-muted-ink transition-colors hover:border-signal hover:text-ink"
                      >
                        <span className="font-heading text-[10px] font-semibold tabular-nums text-muted-ink/60">
                          {String(guide.sections.length + 1).padStart(2, "0")}
                        </span>{" "}
                        Checklist
                      </a>
                    </li>
                  ) : null}
                </ol>
              </nav>

              {/* Sidebar CTA */}
              <div className="mt-8 rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)]">
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-signal">
                  Want this done for you?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  We run the engagement most teams use this guide to scope. Fixed-scope, written
                  deliverables.
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-ink px-4 py-2 font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-signal"
                >
                  See implementation services →
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* MATCHED CTA */}
      <CtaBanner variant="matched" />

      {/* RELATED GUIDES */}
      {relatedGuides.length ? (
        <Section tone="paper" className="border-t border-rule pt-12 pb-12 md:pt-16 md:pb-16">
          <Container>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Continue reading
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              More from the implementation library.
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:p-6"
                  >
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                        {g.eyebrow} · {g.readingTime}
                      </p>
                      <p className="mt-2 font-heading text-lg font-semibold text-ink group-hover:text-signal">
                        {g.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.tagline}</p>
                    </div>
                    <p className="mt-4 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-signal group-hover:underline">
                      Read the guide →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* RELATED INTEGRATIONS + COMMERCIAL + SERVICES — flat list */}
      {relatedIntegrations.length + relatedCommercial.length + relatedServices.length > 0 ? (
        <Section tone="deep" className="border-t border-rule py-12 md:py-16">
          <Container>
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              Also helpful
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              Specific tools, segments, and services this guide touches.
            </h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {relatedIntegrations.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex h-full items-baseline justify-between gap-4 rounded-[var(--radius-card)] border border-rule bg-surface p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                        {r.eyebrow}
                      </p>
                      <p className="mt-1 font-heading text-base font-semibold text-ink group-hover:text-signal">
                        AI receptionist with {r.toolName}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="font-heading text-sm text-muted-ink group-hover:text-signal"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
              {relatedCommercial.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="group flex h-full items-baseline justify-between gap-4 rounded-[var(--radius-card)] border border-rule bg-surface p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                        {r.eyebrow}
                      </p>
                      <p className="mt-1 font-heading text-base font-semibold text-ink group-hover:text-signal">
                        {r.headlineLead} {r.headlineAccent ?? ""}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="font-heading text-sm text-muted-ink group-hover:text-signal"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
              {relatedServices.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full items-baseline justify-between gap-4 rounded-[var(--radius-card)] border border-rule bg-surface p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
                        {r.eyebrow}
                      </p>
                      <p className="mt-1 font-heading text-base font-semibold text-ink group-hover:text-signal">
                        {r.title} · {r.pricingFrom}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="font-heading text-sm text-muted-ink group-hover:text-signal"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* SETUP CTA */}
      <CtaBanner variant="setup" />
    </>
  );
}
