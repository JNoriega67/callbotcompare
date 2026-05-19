import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const PATHS = [
  {
    title: "Compare tools",
    body: "Build a side-by-side of any vendors in the directory. Filter by booking, CRM, handoff, after-hours.",
    href: "/compare",
    cta: "Open compare",
  },
  {
    title: "Take the quiz",
    body: "Five questions. We surface the two or three strongest fits for your industry and call volume.",
    href: "/quiz",
    cta: "Start the quiz",
  },
  {
    title: "Talk to us",
    body: "Tell us about your setup. We email a shortlist back, usually within a business day.",
    href: "/contact",
    cta: "Get in touch",
  },
] as const;

/**
 * Final-section closer — three clear paths so buyers always have a next step.
 * Sits below the FAQ and the ConciergeCTA as the page's literal foot.
 */
export function FooterCTA() {
  return (
    <Section tone="paper" className="border-t border-rule py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="font-heading text-[10px] font-semibold text-signal">
              Pick your path
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
              Three ways to get to the right vendor.
            </h2>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-rule bg-rule md:grid-cols-3">
          {PATHS.map((p) => (
            <li key={p.href} className="bg-surface">
              <Link
                href={p.href}
                className="group block h-full px-6 py-7 transition-colors hover:bg-paper-deep"
              >
                <h3 className="font-heading text-lg font-semibold text-ink group-hover:text-signal">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                <p className="mt-5 inline-flex items-center gap-1 font-heading text-[12px] font-semibold text-signal">
                  {p.cta}
                  <span aria-hidden>→</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
