import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { ComparisonStackedCards } from "@/components/comparisons/comparison-stacked-cards";
import { ComparisonTable } from "@/components/comparisons/comparison-table";
import { VerdictBlock } from "@/app/compare/[slug]/_components/verdict-block";
import { prisma } from "@/lib/db";
import { breadcrumbJsonLd, buildMetadata, comparisonJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

async function loadComparison(slug: string) {
  return prisma.comparisonPage.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      vendors: {
        orderBy: { position: "asc" },
        include: { vendor: true },
      },
    },
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = await loadComparison(slug);
  if (!page) {
    return buildMetadata({
      title: "Comparison not found",
      description: "",
      path: `/compare/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? page.intro ?? page.verdict ?? page.title,
    path: `/compare/${slug}`,
  });
}

export default async function ComparisonDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await loadComparison(slug);
  if (!page) notFound();

  const vendors = page.vendors.map((cv) => cv.vendor);

  return (
    <>
      <Section tone="cream" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-4">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" },
              { label: page.title, href: `/compare/${page.slug}` },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold text-slate md:text-4xl">{page.title}</h1>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="space-y-10">
          <VerdictBlock intro={page.intro} verdict={page.verdict} />

          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-slate">Feature table</h2>
            <div className="hidden md:block">
              <ComparisonTable vendors={vendors} />
            </div>
            <div className="md:hidden">
              <ComparisonStackedCards vendors={vendors} />
            </div>
          </div>

          <div className="grid gap-6 rounded-card border border-border bg-sage/40 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-heading text-lg font-semibold text-slate">
                Not sure which one is right?
              </h2>
              <p className="mt-1 text-sm text-charcoal/85">
                Take the 5-step quiz and we'll shortlist vendors for your industry and call volume.
              </p>
            </div>
            <Link
              href="/quiz"
              className="rounded-[var(--radius-button)] bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-[color:var(--brand-teal-hover)]"
            >
              Take the quiz
            </Link>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={[
          comparisonJsonLd({
            title: page.title,
            slug: page.slug,
            vendors: vendors.map((v) => ({ name: v.name, slug: v.slug, description: v.summary })),
          }),
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Compare", href: "/compare" },
            { label: page.title, href: `/compare/${page.slug}` },
          ]),
        ]}
      />
    </>
  );
}
