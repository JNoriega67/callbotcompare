import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { prisma } from "@/lib/db";
import { formatPricing, formatScore } from "@/lib/scoring";

export async function TopPicks() {
  const vendors = await prisma.vendor.findMany({
    where: { isPublished: true },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: 5,
  });

  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="font-heading text-[10px] font-semibold text-signal">
              Top picks
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.1] text-ink md:text-4xl">
              The strongest category players, ranked.
            </h2>
            <p className="mt-4 text-ink-soft">
              Start here, then narrow by use case, budget, and workflow complexity. Each rank is the
              editor&apos;s overall score out of 10 against our published rubric.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-heading text-[12px] font-semibold ">
              <Link
                href="/vendors"
                className="inline-flex items-center gap-1 text-ink underline-offset-4 hover:text-signal hover:underline"
              >
                See full directory
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-1 text-muted-ink underline-offset-4 hover:text-signal hover:underline"
              >
                Build a side-by-side
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <ol className="md:col-span-1">
            {vendors.length === 0 ? (
              <li className="border-y border-rule py-6 text-sm text-muted-ink">
                No published vendors yet. Run <code className="font-mono">pnpm prisma db seed</code>.
              </li>
            ) : (
              vendors.map((v, i) => (
                <li
                  key={v.id}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-rule py-5 first:border-t md:gap-6 md:py-6"
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
                    <p className="mt-1 font-heading text-[10px] font-semibold text-muted-ink">
                      {formatPricing(v.pricingFromUsd, v.pricingModel)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-2xl font-bold leading-none tabular-nums text-ink md:text-3xl">
                      {formatScore(v.overallScore)}
                    </p>
                    <Link
                      href={`/vendors/${v.slug}`}
                      className="mt-2 inline-block font-heading text-[10px] font-semibold text-signal underline-offset-4 hover:underline"
                    >
                      Read review →
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
