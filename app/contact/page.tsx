import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tell us what you need",
  description:
    "Get help choosing the right AI receptionist platform, planning implementation, or resolving an issue with an existing setup.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section tone="paper" className="pt-10 pb-6 md:pt-14 md:pb-8">
        <Container className="space-y-5">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <h1 className="font-heading text-[2.25rem] font-bold leading-[1.05] tracking-tight text-ink md:text-[3.25rem]">
            Tell us what you need
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Get help choosing the right AI receptionist platform, planning implementation, or
            resolving an issue with an existing setup. Pick what fits — we&apos;ll route from
            there.
          </p>
        </Container>
      </Section>

      <Section tone="paper" className="pb-16 md:pb-24">
        <Container className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-start md:gap-14">
          <ContactForm />
          <aside className="space-y-6 text-sm text-ink-soft">
            <div>
              <h2 className="font-heading text-lg font-semibold text-ink">What happens next</h2>
              <ul className="mt-3 space-y-2">
                <li>1. We read your message — usually within a business day.</li>
                <li>2. You get a reply tailored to what you asked for, not a generic intake.</li>
                <li>
                  3. If you flagged it urgent and you&apos;re an existing setup, expect a same-day
                  response.
                </li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-rule bg-signal-soft/50 p-4 text-xs leading-relaxed text-ink-soft">
              <p className="font-heading text-xs font-semibold text-ink">
                Prefer to self-serve?
              </p>
              <p className="mt-2">
                Take{" "}
                <Link href="/quiz" className="text-signal underline-offset-2 hover:underline">
                  the quiz
                </Link>{" "}
                for an automated shortlist, browse the{" "}
                <Link href="/vendors" className="text-signal underline-offset-2 hover:underline">
                  vendor directory
                </Link>
                , or read the{" "}
                <Link href="/guides" className="text-signal underline-offset-2 hover:underline">
                  implementation guides
                </Link>
                .
              </p>
            </div>
            <div className="border-t border-rule pt-5 text-xs leading-relaxed text-muted-ink">
              <p>
                Our{" "}
                <Link
                  href="/methodology"
                  className="text-ink underline underline-offset-2 hover:text-signal"
                >
                  methodology
                </Link>{" "}
                and{" "}
                <Link
                  href="/disclosure"
                  className="text-ink underline underline-offset-2 hover:text-signal"
                >
                  referral disclosure
                </Link>{" "}
                are public. We don&apos;t take retainers and won&apos;t recommend a tool we
                wouldn&apos;t use ourselves.
              </p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
