import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { QuizStepper } from "@/app/quiz/_components/quiz-stepper";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Find your AI receptionist match",
  description:
    "Answer 5 quick questions and we'll shortlist the best AI receptionist vendors for your industry, call volume, and workflow.",
  path: "/quiz",
});

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const publishedVendors = await prisma.vendor.findMany({
    where: { isPublished: true },
    orderBy: [{ overallScore: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    select: {
      slug: true,
      name: true,
      tagline: true,
      overallScore: true,
      bestFor: true,
    },
  });

  return (
    <>
      <Section tone="paper" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container className="space-y-4">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Quiz", href: "/quiz" },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
            Find your AI receptionist match
          </h1>
          <p className="max-w-2xl text-ink-soft">
            Five questions. No email required up front — we&apos;ll show your shortlist first, then you
            can grab a personalized walkthrough if it&apos;s useful.
          </p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="max-w-3xl">
          <QuizStepper publishedVendors={publishedVendors} />
        </Container>
      </Section>
    </>
  );
}
