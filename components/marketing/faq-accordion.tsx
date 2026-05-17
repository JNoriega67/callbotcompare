"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = { question: string; answer: string };

type FaqAccordionProps = {
  items: ReadonlyArray<FaqItem>;
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion multiple={false} className="divide-y divide-rule">
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`faq-${i}`} className="border-0">
          <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold text-ink hover:text-signal hover:no-underline md:text-lg">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-ink-soft">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
