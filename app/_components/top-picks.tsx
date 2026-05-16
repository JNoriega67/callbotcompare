import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { VendorCard } from "@/components/vendors/vendor-card";
import { prisma } from "@/lib/db";

export async function TopPicks() {
  const vendors = await prisma.vendor.findMany({
    where: { isPublished: true },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    take: 3,
  });

  return (
    <Section tone="cream">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold text-slate">
              Top AI receptionist software to start with
            </h2>
            <p className="mt-2 max-w-2xl text-charcoal/80">
              Start with the strongest category players, then narrow by use case, budget, and
              workflow complexity.
            </p>
          </div>
          <Link
            href="/vendors"
            className="rounded-[var(--radius-button)] border border-slate/25 px-4 py-2 text-sm font-semibold text-slate transition-colors hover:border-teal hover:text-teal"
          >
            View all vendors →
          </Link>
        </div>
        {vendors.length === 0 ? (
          <p className="rounded-card border border-dashed border-border bg-surface p-6 text-center text-sm text-muted">
            No published vendors yet. Run <code className="font-mono">pnpm prisma db seed</code> to
            populate the directory.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
