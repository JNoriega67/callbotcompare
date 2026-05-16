import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { HOMEPAGE_FAQS } from "@/lib/constants";
import { faqJsonLd } from "@/lib/seo";

export function FaqSection() {
  return (
    <Section tone="cream">
      <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <h2 className="font-heading text-3xl font-bold text-slate">Common questions</h2>
          <p className="mt-2 text-charcoal/80">
            More on how AI receptionist software fits a small or mid-sized business.
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-2 md:p-4">
          <FaqAccordion items={HOMEPAGE_FAQS} />
        </div>
      </Container>
      <JsonLd data={faqJsonLd(HOMEPAGE_FAQS)} />
    </Section>
  );
}
