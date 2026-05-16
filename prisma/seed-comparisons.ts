import { ContentStatus, type PrismaClient } from "@prisma/client";

type ComparisonSeed = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  verdict?: string;
  vendorSlugs: [string, string];
};

const COMPARISONS: ComparisonSeed[] = [
  {
    slug: "smith-ai-vs-goodcall",
    title: "Smith.ai vs Goodcall: which AI receptionist fits your business?",
    metaTitle: "Smith.ai vs Goodcall: AI Receptionist Comparison",
    metaDescription:
      "Side-by-side comparison of Smith.ai and Goodcall — features, pricing, setup, integrations, and which to choose for law firms, SMBs, and home services.",
    intro:
      "Smith.ai and Goodcall both market AI receptionist coverage for small businesses, but they sit at different points on the AI-to-human spectrum. Smith.ai blends AI workflows with human receptionists for stronger fallback, while Goodcall leans into a lighter-weight, AI-first setup that is faster to deploy. This page compares them on the criteria that actually drive a buying decision.",
    verdict:
      "One of the biggest differences is whether you need a more mature receptionist workflow with stronger human backup (Smith.ai), or a lighter-weight AI-first system that is easier to deploy quickly (Goodcall). If intake quality and complex routing matter most — especially for law firms and high-touch SMBs — Smith.ai is the safer default. If you want fast time-to-value on AI-first inbound coverage with light integrations, Goodcall is the simpler choice.",
    vendorSlugs: ["smith-ai", "goodcall"],
  },
];

export async function seedComparisons(prisma: PrismaClient) {
  console.log(`seeding ${COMPARISONS.length} comparison page(s)…`);

  for (const comparison of COMPARISONS) {
    const vendors = await prisma.vendor.findMany({
      where: { slug: { in: comparison.vendorSlugs } },
    });
    if (vendors.length !== comparison.vendorSlugs.length) {
      const foundSlugs = vendors.map((v) => v.slug);
      const missing = comparison.vendorSlugs.filter((s) => !foundSlugs.includes(s));
      console.warn(
        `  ! skipping ${comparison.slug}: missing vendor(s) ${missing.join(", ")}`,
      );
      continue;
    }

    const orderedVendors = comparison.vendorSlugs
      .map((slug, index) => {
        const vendor = vendors.find((v) => v.slug === slug);
        return vendor ? { vendor, position: index } : null;
      })
      .filter((v): v is { vendor: (typeof vendors)[number]; position: number } => v !== null);

    const page = await prisma.comparisonPage.upsert({
      where: { slug: comparison.slug },
      update: {
        title: comparison.title,
        metaTitle: comparison.metaTitle,
        metaDescription: comparison.metaDescription,
        intro: comparison.intro,
        verdict: comparison.verdict,
        status: ContentStatus.PUBLISHED,
      },
      create: {
        slug: comparison.slug,
        title: comparison.title,
        metaTitle: comparison.metaTitle,
        metaDescription: comparison.metaDescription,
        intro: comparison.intro,
        verdict: comparison.verdict,
        status: ContentStatus.PUBLISHED,
      },
    });

    await prisma.comparisonVendor.deleteMany({ where: { comparisonId: page.id } });
    for (const { vendor, position } of orderedVendors) {
      await prisma.comparisonVendor.create({
        data: { comparisonId: page.id, vendorId: vendor.id, position },
      });
    }
  }
}
