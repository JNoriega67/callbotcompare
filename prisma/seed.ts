import { PrismaClient, PricingModel } from "@prisma/client";

import seedVendors from "./seed-vendors.json" with { type: "json" };
import { seedComparisons } from "./seed-comparisons";

const prisma = new PrismaClient();

const verticals = [
  { slug: "law-firms", name: "Law Firms" },
  { slug: "home-services", name: "Home Services" },
  { slug: "medical-offices", name: "Medical Offices" },
  { slug: "dental-offices", name: "Dental Offices" },
  { slug: "real-estate", name: "Real Estate" },
  { slug: "contractors", name: "Contractors" },
  { slug: "small-business", name: "Small Business" },
  { slug: "msp-agency", name: "MSP / Agency" },
  { slug: "auto-dealers", name: "Auto Dealerships" },
];

const features = [
  { slug: "crm-integration", name: "CRM Integration", category: "integrations" },
  { slug: "appointment-booking", name: "Appointment Booking", category: "workflow" },
  { slug: "human-handoff", name: "Human Handoff", category: "workflow" },
  { slug: "multilingual-support", name: "Multilingual Support", category: "capabilities" },
  { slug: "after-hours-coverage", name: "After-hours Coverage", category: "coverage" },
  { slug: "sms-follow-up", name: "SMS Follow-up", category: "workflow" },
  { slug: "call-recording", name: "Call Recording", category: "reporting" },
  { slug: "analytics-dashboard", name: "Analytics Dashboard", category: "reporting" },
  { slug: "hipaa-friendly", name: "HIPAA-friendly", category: "compliance" },
  { slug: "lead-qualification", name: "Lead Qualification", category: "workflow" },
];

type SeedVendor = {
  slug: string;
  name: string;
  tagline?: string | null;
  websiteUrl?: string | null;
  affiliateUrl?: string | null;
  summary?: string | null;
  bestFor?: string | null;
  editorVerdict?: string | null;
  pricingModel?: keyof typeof PricingModel | null;
  pricingFromUsd?: number | null;
  pricingNotes?: string | null;
  setupComplexity?: number | null;
  hipaaFriendly?: boolean | null;
  hasAppointmentBooking?: boolean | null;
  hasCrmIntegration?: boolean | null;
  hasHumanHandoff?: boolean | null;
  hasMultilingual?: boolean | null;
  has24x7?: boolean | null;
  isPublished?: boolean;
  overallScore?: number | null;
  scoreCallHandling?: number | null;
  scoreIntegrations?: number | null;
  scoreAutomation?: number | null;
  scoreEaseOfSetup?: number | null;
  scorePricingValue?: number | null;
  scoreVerticalFit?: number | null;
  scoreHandoff?: number | null;
  scoreReporting?: number | null;
  scoreSupport?: number | null;
  verticals?: string[];
  features?: string[];
};

function toPricingModel(value?: string | null): PricingModel {
  switch (value) {
    case "SUBSCRIPTION":
      return PricingModel.SUBSCRIPTION;
    case "USAGE_BASED":
      return PricingModel.USAGE_BASED;
    case "PER_MINUTE":
      return PricingModel.PER_MINUTE;
    case "HYBRID":
      return PricingModel.HYBRID;
    case "CUSTOM_QUOTE":
      return PricingModel.CUSTOM_QUOTE;
    default:
      return PricingModel.UNKNOWN;
  }
}

async function main() {
  console.log("seeding verticals…");
  for (const vertical of verticals) {
    await prisma.vertical.upsert({
      where: { slug: vertical.slug },
      update: vertical,
      create: vertical,
    });
  }

  console.log("seeding features…");
  for (const feature of features) {
    await prisma.feature.upsert({
      where: { slug: feature.slug },
      update: feature,
      create: feature,
    });
  }

  console.log(`seeding ${(seedVendors as SeedVendor[]).length} vendors…`);
  for (const vendor of seedVendors as SeedVendor[]) {
    const data = {
      name: vendor.name,
      tagline: vendor.tagline ?? null,
      websiteUrl: vendor.websiteUrl ?? null,
      affiliateUrl: vendor.affiliateUrl ?? null,
      summary: vendor.summary ?? null,
      bestFor: vendor.bestFor ?? null,
      editorVerdict: vendor.editorVerdict ?? null,
      pricingModel: toPricingModel(vendor.pricingModel),
      pricingFromUsd: vendor.pricingFromUsd ?? null,
      pricingNotes: vendor.pricingNotes ?? null,
      setupComplexity: vendor.setupComplexity ?? null,
      hipaaFriendly: vendor.hipaaFriendly ?? null,
      hasAppointmentBooking: vendor.hasAppointmentBooking ?? null,
      hasCrmIntegration: vendor.hasCrmIntegration ?? null,
      hasHumanHandoff: vendor.hasHumanHandoff ?? null,
      hasMultilingual: vendor.hasMultilingual ?? null,
      has24x7: vendor.has24x7 ?? null,
      isPublished: vendor.isPublished ?? true,
      overallScore: vendor.overallScore ?? null,
      scoreCallHandling: vendor.scoreCallHandling ?? null,
      scoreIntegrations: vendor.scoreIntegrations ?? null,
      scoreAutomation: vendor.scoreAutomation ?? null,
      scoreEaseOfSetup: vendor.scoreEaseOfSetup ?? null,
      scorePricingValue: vendor.scorePricingValue ?? null,
      scoreVerticalFit: vendor.scoreVerticalFit ?? null,
      scoreHandoff: vendor.scoreHandoff ?? null,
      scoreReporting: vendor.scoreReporting ?? null,
      scoreSupport: vendor.scoreSupport ?? null,
    };

    const created = await prisma.vendor.upsert({
      where: { slug: vendor.slug },
      update: data,
      create: { slug: vendor.slug, ...data },
    });

    // Reset join rows so reseeds reflect the latest JSON.
    await prisma.vendorVertical.deleteMany({ where: { vendorId: created.id } });
    await prisma.vendorFeature.deleteMany({ where: { vendorId: created.id } });

    for (const verticalSlug of vendor.verticals ?? []) {
      const vertical = await prisma.vertical.findUnique({ where: { slug: verticalSlug } });
      if (!vertical) {
        console.warn(`  ! vertical not found: ${verticalSlug}`);
        continue;
      }
      await prisma.vendorVertical.create({
        data: { vendorId: created.id, verticalId: vertical.id },
      });
    }

    for (const featureSlug of vendor.features ?? []) {
      const feature = await prisma.feature.findUnique({ where: { slug: featureSlug } });
      if (!feature) {
        console.warn(`  ! feature not found: ${featureSlug}`);
        continue;
      }
      await prisma.vendorFeature.create({
        data: { vendorId: created.id, featureId: feature.id, valueBool: true },
      });
    }
  }

  await seedComparisons(prisma);

  const [vendorCount, publishedCount, verticalCount, featureCount, comparisonCount] =
    await Promise.all([
      prisma.vendor.count(),
      prisma.vendor.count({ where: { isPublished: true } }),
      prisma.vertical.count(),
      prisma.feature.count(),
      prisma.comparisonPage.count(),
    ]);

  console.log("\nseed complete:");
  console.log(`  vendors:     ${vendorCount} (${publishedCount} published)`);
  console.log(`  verticals:   ${verticalCount}`);
  console.log(`  features:    ${featureCount}`);
  console.log(`  comparisons: ${comparisonCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
