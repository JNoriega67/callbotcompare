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
    <Accordion multiple={false} className="divide-y divide-border">
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={`faq-${i}`} className="border-0 py-1">
          <AccordionTrigger className="text-left font-heading text-base font-semibold text-slate hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-charcoal/85">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
