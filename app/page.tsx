import type { Metadata } from "next";

import { ConciergeCTA } from "@/app/_components/concierge-cta";
import { FaqSection } from "@/app/_components/faq-section";
import { FeatureTiles } from "@/app/_components/feature-tiles";
import { FooterCTA } from "@/app/_components/footer-cta";
import { GetMatched } from "@/app/_components/get-matched";
import { Hero } from "@/app/_components/hero";
import { HowWeEvaluate } from "@/app/_components/how-we-evaluate";
import { ImplementationHelp } from "@/app/_components/implementation-help";
import { MethodologyStrip } from "@/app/_components/methodology-strip";
import { TopPicks } from "@/app/_components/top-picks";
import { UseCaseGrid } from "@/app/_components/use-case-grid";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best AI Receptionist Software for Small Business",
  description:
    "Compare AI receptionist software, AI answering services, and phone agents for small business. Review features, pricing signals, integrations, and best-fit use cases.",
  path: "/",
});

// Homepage queries Prisma (TopPicks). Keep dynamic until ISR is wired in Phase 8.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      {/* Section order matches docs/HOMEPAGE_WIREFRAME.md (Header and Footer come from app/layout). */}
      <Hero />
      <MethodologyStrip />
      <TopPicks />
      <GetMatched />
      <UseCaseGrid />
      <FeatureTiles />
      <HowWeEvaluate />
      <ImplementationHelp />
      <FaqSection />
      <ConciergeCTA />
      <FooterCTA />
      <JsonLd data={organizationJsonLd()} />
    </>
  );
}
