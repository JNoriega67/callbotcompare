import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { VendorCard } from "@/components/vendors/vendor-card";
import { prisma } from "@/lib/db";
import { METHODOLOGY_CRITERIA } from "@/lib/constants";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best AI Receptionist Software for Small Business",
  description:
    "Independent comparison of the best AI receptionist software for small business. Ranked by call handling, integrations, booking, ease of setup, and pricing.",
  path: "/best-ai-receptionist-software",
});

export const dynamic = "force-dynamic";

export default async function BestAIReceptionistPage() {
  const vendors = await prisma.vendor.findMany({
    where: { isPublished: true },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: 6,
  });

  return (
    <>
      <Section tone="cream" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-5">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Best AI receptionist software", href: "/best-ai-receptionist-software" },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold text-slate md:text-4xl">
            Best AI Receptionist Software for Small Business
          </h1>
          <p className="max-w-3xl text-charcoal/85">
            An opinionated, independent ranking of AI receptionist and AI phone agent platforms
            for small and mid-sized service businesses. We score on call handling quality,
            integrations, booking, handoff, ease of setup, and pricing clarity — not feature counts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quiz"
              className="rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--brand-teal-hover)]"
            >
              Take the quiz
            </Link>
            <Link
              href="/compare"
              className="rounded-[var(--radius-button)] border border-slate/25 bg-surface px-5 py-3 text-sm font-semibold text-slate hover:border-slate/50"
            >
              Build a side-by-side
            </Link>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="space-y-12">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold text-slate">Top picks</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
            <p className="text-sm text-muted">
              Looking at every option? See the{" "}
              <Link href="/vendors" className="text-teal hover:underline">
                full directory
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold text-slate">
              What we score (and why)
            </h2>
            <p className="max-w-3xl text-charcoal/85">
              A vendor's marketing site rarely tells you what matters in production. We rank on
              the dimensions buyers consistently care about a year after rollout — not the ones
              that look good in a demo.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {METHODOLOGY_CRITERIA.map((c) => (
                <li
                  key={c.label}
                  className="rounded-card border border-border bg-surface p-4"
                >
                  <p className="font-heading text-sm font-semibold text-slate">{c.label}</p>
                  <p className="mt-1 text-xs text-muted">{c.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-border bg-sage/40 p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-slate">
              The shortest path: tell us about your business
            </h2>
            <p className="mt-2 text-sm text-charcoal/85">
              Five questions and you'll have a ranked shortlist. We won't gate the results behind
              an email — that comes after, only if you want a personalized walkthrough.
            </p>
            <div className="mt-5">
              <Link
                href="/quiz"
                className="rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--brand-teal-hover)]"
              >
                Take the quiz →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Best AI receptionist software", href: "/best-ai-receptionist-software" },
        ])}
      />
    </>
  );
}
