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
        <div className="grid gap-6 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              Top picks
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] md:text-4xl">
              The strongest category players, ranked.
            </h2>
            <p className="mt-4 text-ink-soft">
              Start here, then narrow by use case, budget, and workflow complexity. Each rank is the
              editor's overall score out of 10. See every vendor in{" "}
              <Link href="/vendors" className="text-ink underline underline-offset-4 hover:text-signal">
                the full directory
              </Link>
              .
            </p>
          </div>

          <ol className="md:col-span-1">
            {vendors.length === 0 ? (
              <li className="border-y border-rule-strong py-6 text-sm text-muted-ink">
                No published vendors yet. Run <code className="font-mono">pnpm prisma db seed</code>.
              </li>
            ) : (
              vendors.map((v, i) => (
                <li
                  key={v.id}
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-rule-strong py-5 first:border-t md:gap-6 md:py-6"
                >
                  <span className="font-display text-3xl font-medium text-muted-ink md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/vendors/${v.slug}`}
                      className="font-display text-xl text-ink hover:text-signal md:text-2xl"
                    >
                      {v.name}
                    </Link>
                    {v.tagline ? (
                      <p className="mt-1 truncate text-sm text-ink-soft">{v.tagline}</p>
                    ) : null}
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-ink">
                      {formatPricing(v.pricingFromUsd, v.pricingModel)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-medium leading-none md:text-3xl">
                      {formatScore(v.overallScore)}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-ink">
                      Score
                    </p>
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
