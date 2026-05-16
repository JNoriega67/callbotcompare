import { PrismaClient, PricingModel } from '@prisma/client'
import seedVendors from './seed-vendors.json'

const prisma = new PrismaClient()

const verticals = [
  { slug: 'law-firms', name: 'Law Firms' },
  { slug: 'home-services', name: 'Home Services' },
  { slug: 'medical-offices', name: 'Medical Offices' },
  { slug: 'dental-offices', name: 'Dental Offices' },
  { slug: 'real-estate', name: 'Real Estate' },
  { slug: 'contractors', name: 'Contractors' },
  { slug: 'small-business', name: 'Small Business' },
  { slug: 'msp-agency', name: 'MSP / Agency' },
]

const features = [
  { slug: 'crm-integration', name: 'CRM Integration', category: 'integrations' },
  { slug: 'appointment-booking', name: 'Appointment Booking', category: 'workflow' },
  { slug: 'human-handoff', name: 'Human Handoff', category: 'workflow' },
  { slug: 'multilingual-support', name: 'Multilingual Support', category: 'capabilities' },
  { slug: 'after-hours-coverage', name: 'After-hours Coverage', category: 'coverage' },
  { slug: 'sms-follow-up', name: 'SMS Follow-up', category: 'workflow' },
  { slug: 'call-recording', name: 'Call Recording', category: 'reporting' },
  { slug: 'analytics-dashboard', name: 'Analytics Dashboard', category: 'reporting' },
  { slug: 'hipaa-friendly', name: 'HIPAA-friendly', category: 'compliance' },
  { slug: 'lead-qualification', name: 'Lead Qualification', category: 'workflow' },
]

function toPricingModel(value?: string | null): PricingModel {
  switch (value) {
    case 'SUBSCRIPTION':
      return PricingModel.SUBSCRIPTION
    case 'USAGE_BASED':
      return PricingModel.USAGE_BASED
    case 'PER_MINUTE':
      return PricingModel.PER_MINUTE
    case 'HYBRID':
      return PricingModel.HYBRID
    case 'CUSTOM_QUOTE':
      return PricingModel.CUSTOM_QUOTE
    default:
      return PricingModel.UNKNOWN
  }
}

async function main() {
  for (const vertical of verticals) {
    await prisma.vertical.upsert({
      where: { slug: vertical.slug },
      update: vertical,
      create: vertical,
    })
  }

  for (const feature of features) {
    await prisma.feature.upsert({
      where: { slug: feature.slug },
      update: feature,
      create: feature,
    })
  }

  for (const vendor of seedVendors as any[]) {
    const created = await prisma.vendor.upsert({
      where: { slug: vendor.slug },
      update: {
        name: vendor.name,
        tagline: vendor.tagline,
        websiteUrl: vendor.websiteUrl,
        affiliateUrl: vendor.affiliateUrl,
        summary: vendor.summary,
        bestFor: vendor.bestFor,
        editorVerdict: vendor.editorVerdict,
        pricingModel: toPricingModel(vendor.pricingModel),
        pricingFromUsd: vendor.pricingFromUsd,
        pricingNotes: vendor.pricingNotes,
        setupComplexity: vendor.setupComplexity,
        hipaaFriendly: vendor.hipaaFriendly,
        hasAppointmentBooking: vendor.hasAppointmentBooking,
        hasCrmIntegration: vendor.hasCrmIntegration,
        hasHumanHandoff: vendor.hasHumanHandoff,
        hasMultilingual: vendor.hasMultilingual,
        has24x7: vendor.has24x7,
        overallScore: vendor.overallScore,
        scoreCallHandling: vendor.scoreCallHandling,
        scoreIntegrations: vendor.scoreIntegrations,
        scoreAutomation: vendor.scoreAutomation,
        scoreEaseOfSetup: vendor.scoreEaseOfSetup,
        scorePricingValue: vendor.scorePricingValue,
        scoreVerticalFit: vendor.scoreVerticalFit,
        scoreHandoff: vendor.scoreHandoff,
        scoreReporting: vendor.scoreReporting,
        scoreSupport: vendor.scoreSupport,
        isPublished: true,
      },
      create: {
        slug: vendor.slug,
        name: vendor.name,
        tagline: vendor.tagline,
        websiteUrl: vendor.websiteUrl,
        affiliateUrl: vendor.affiliateUrl,
        summary: vendor.summary,
        bestFor: vendor.bestFor,
        editorVerdict: vendor.editorVerdict,
        pricingModel: toPricingModel(vendor.pricingModel),
        pricingFromUsd: vendor.pricingFromUsd,
        pricingNotes: vendor.pricingNotes,
        setupComplexity: vendor.setupComplexity,
        hipaaFriendly: vendor.hipaaFriendly,
        hasAppointmentBooking: vendor.hasAppointmentBooking,
        hasCrmIntegration: vendor.hasCrmIntegration,
        hasHumanHandoff: vendor.hasHumanHandoff,
        hasMultilingual: vendor.hasMultilingual,
        has24x7: vendor.has24x7,
        overallScore: vendor.overallScore,
        scoreCallHandling: vendor.scoreCallHandling,
        scoreIntegrations: vendor.scoreIntegrations,
        scoreAutomation: vendor.scoreAutomation,
        scoreEaseOfSetup: vendor.scoreEaseOfSetup,
        scorePricingValue: vendor.scorePricingValue,
        scoreVerticalFit: vendor.scoreVerticalFit,
        scoreHandoff: vendor.scoreHandoff,
        scoreReporting: vendor.scoreReporting,
        scoreSupport: vendor.scoreSupport,
        isPublished: true,
      },
    })

    await prisma.vendorVertical.deleteMany({ where: { vendorId: created.id } })
    await prisma.vendorFeature.deleteMany({ where: { vendorId: created.id } })

    for (const verticalSlug of vendor.verticals || []) {
      const vertical = await prisma.vertical.findUnique({ where: { slug: verticalSlug } })
      if (!vertical) continue
      await prisma.vendorVertical.create({
        data: {
          vendorId: created.id,
          verticalId: vertical.id,
        },
      })
    }

    for (const featureSlug of vendor.features || []) {
      const feature = await prisma.feature.findUnique({ where: { slug: featureSlug } })
      if (!feature) continue
      await prisma.vendorFeature.create({
        data: {
          vendorId: created.id,
          featureId: feature.id,
          valueBool: true,
        },
      })
    }
  }

  console.log('Seed complete')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
