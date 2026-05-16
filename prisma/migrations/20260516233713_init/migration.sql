-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PricingModel" AS ENUM ('UNKNOWN', 'SUBSCRIPTION', 'USAGE_BASED', 'PER_MINUTE', 'HYBRID', 'CUSTOM_QUOTE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'REVIEWED', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM');

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "websiteUrl" TEXT,
    "affiliateUrl" TEXT,
    "logoUrl" TEXT,
    "summary" TEXT,
    "bestFor" TEXT,
    "editorVerdict" TEXT,
    "pricingModel" "PricingModel" NOT NULL DEFAULT 'UNKNOWN',
    "pricingFromUsd" INTEGER,
    "pricingNotes" TEXT,
    "setupComplexity" INTEGER,
    "verticalFitNotes" TEXT,
    "supportNotes" TEXT,
    "reportingNotes" TEXT,
    "handoffNotes" TEXT,
    "bookingNotes" TEXT,
    "integrationsNotes" TEXT,
    "hipaaFriendly" BOOLEAN,
    "hasAppointmentBooking" BOOLEAN,
    "hasCrmIntegration" BOOLEAN,
    "hasHumanHandoff" BOOLEAN,
    "hasMultilingual" BOOLEAN,
    "has24x7" BOOLEAN,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "overallScore" DOUBLE PRECISION,
    "scoreCallHandling" DOUBLE PRECISION,
    "scoreIntegrations" DOUBLE PRECISION,
    "scoreAutomation" DOUBLE PRECISION,
    "scoreEaseOfSetup" DOUBLE PRECISION,
    "scorePricingValue" DOUBLE PRECISION,
    "scoreVerticalFit" DOUBLE PRECISION,
    "scoreHandoff" DOUBLE PRECISION,
    "scoreReporting" DOUBLE PRECISION,
    "scoreSupport" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vertical" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vertical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorVertical" (
    "vendorId" TEXT NOT NULL,
    "verticalId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "VendorVertical_pkey" PRIMARY KEY ("vendorId","verticalId")
);

-- CreateTable
CREATE TABLE "VendorFeature" (
    "vendorId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "valueText" TEXT,
    "valueBool" BOOLEAN,
    "notes" TEXT,

    CONSTRAINT "VendorFeature_pkey" PRIMARY KEY ("vendorId","featureId")
);

-- CreateTable
CREATE TABLE "ComparisonPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "intro" TEXT,
    "verdict" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComparisonPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonVendor" (
    "comparisonId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "ComparisonVendor_pkey" PRIMARY KEY ("comparisonId","vendorId")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "excerpt" TEXT,
    "bodyMd" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "excerpt" TEXT,
    "bodyMd" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "pageType" TEXT,
    "pageSlug" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "source" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "industry" TEXT,
    "monthlyCallVolume" TEXT,
    "mainUseCase" TEXT,
    "currentPhoneSetup" TEXT,
    "mustHaveIntegrations" TEXT,
    "budgetRange" TEXT,
    "timeline" TEXT,
    "notes" TEXT,
    "recommendedVendors" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_slug_key" ON "Vendor"("slug");

-- CreateIndex
CREATE INDEX "Vendor_isPublished_idx" ON "Vendor"("isPublished");

-- CreateIndex
CREATE INDEX "Vendor_overallScore_idx" ON "Vendor"("overallScore");

-- CreateIndex
CREATE UNIQUE INDEX "Vertical_slug_key" ON "Vertical"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_slug_key" ON "Feature"("slug");

-- CreateIndex
CREATE INDEX "VendorVertical_verticalId_idx" ON "VendorVertical"("verticalId");

-- CreateIndex
CREATE INDEX "VendorFeature_featureId_idx" ON "VendorFeature"("featureId");

-- CreateIndex
CREATE UNIQUE INDEX "ComparisonPage_slug_key" ON "ComparisonPage"("slug");

-- CreateIndex
CREATE INDEX "ComparisonVendor_vendorId_idx" ON "ComparisonVendor"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "Guide_slug_key" ON "Guide"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_slug_key" ON "LandingPage"("slug");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- AddForeignKey
ALTER TABLE "VendorVertical" ADD CONSTRAINT "VendorVertical_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorVertical" ADD CONSTRAINT "VendorVertical_verticalId_fkey" FOREIGN KEY ("verticalId") REFERENCES "Vertical"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorFeature" ADD CONSTRAINT "VendorFeature_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorFeature" ADD CONSTRAINT "VendorFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonVendor" ADD CONSTRAINT "ComparisonVendor_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "ComparisonPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonVendor" ADD CONSTRAINT "ComparisonVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
