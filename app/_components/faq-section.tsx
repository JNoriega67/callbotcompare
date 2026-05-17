import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/marketing/json-ld";
import { HOMEPAGE_FAQS } from "@/lib/constants";
import { faqJsonLd } from "@/lib/seo";

export function FaqSection() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] md:text-4xl">
              Common questions.
            </h2>
          </div>
          <div className="border-t border-rule-strong">
            <FaqAccordion items={HOMEPAGE_FAQS} />
          </div>
        </div>
      </Container>
      <JsonLd data={faqJsonLd(HOMEPAGE_FAQS)} />
    </Section>
  );
}
