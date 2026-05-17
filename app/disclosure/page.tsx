import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Editorial &amp; referral disclosure",
  description:
    "How CallTreo separates editorial ranking from referral relationships, what monetization paths we use, and how our rubric stays independent.",
  path: "/disclosure",
});

export default function DisclosurePage() {
  return (
    <>
      <Section tone="paper" className="pt-10 pb-6 md:pt-14 md:pb-8">
        <Container className="space-y-4">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Disclosure", href: "/disclosure" }]} />
          <h1 className="font-heading text-3xl font-bold text-ink md:text-5xl">
            How CallTreo stays editorial.
          </h1>
          <p className="max-w-3xl text-lg text-ink-soft">
            A short, plain-English version of how we separate ranking from money.
          </p>
        </Container>
      </Section>

      <Section tone="paper" className="pt-4 pb-20">
        <Container className="prose-editorial max-w-3xl space-y-8 text-ink-soft md:text-[17px] md:leading-[1.7]">
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">The rubric comes first.</h2>
            <p className="mt-3">
              Every vendor in our directory is scored against a fixed, published rubric — nine
              weighted dimensions covering call handling, integrations, automation, ease of setup,
              pricing clarity, vertical fit, handoff, reporting, and support. The score is set
              before any referral relationship is discussed and is not adjusted to reflect one.
            </p>
            <p className="mt-2">
              The full methodology lives at{" "}
              <Link href="/best-ai-receptionist-software" className="text-ink underline underline-offset-4 hover:text-signal">
                /best-ai-receptionist-software
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">What's monetized.</h2>
            <p className="mt-3">CallTreo earns money in two ways:</p>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-semibold text-ink">Referral fees</span> — some vendors pay us
                when a buyer signs up after clicking a CallTreo outbound link. On any vendor page
                where a referral relationship exists, we render a short disclosure next to the
                outbound button and apply{" "}
                <code className="rounded bg-paper-deep px-1.5 py-0.5 text-sm">rel="sponsored"</code>{" "}
                to the link (per Google's webmaster guidance).
              </li>
              <li>
                <span className="font-semibold text-ink">Implementation services</span> — we charge
                fixed-scope fees to teams who want help selecting a vendor, designing call flows,
                and wiring up CRMs. Details at{" "}
                <Link href="/services" className="text-ink underline underline-offset-4 hover:text-signal">
                  /services
                </Link>
                . These engagements are independent of vendor ranking.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">What's never monetized.</h2>
            <ul className="mt-3 space-y-2">
              <li>The overall editor score, sub-scores, and the order vendors appear in the directory.</li>
              <li>The text of vendor summaries, pros, cons, and editor verdicts.</li>
              <li>Quiz recommendations — the quiz returns the top-scored matches for the inputs you give, regardless of referral relationships.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">If we get something wrong.</h2>
            <p className="mt-3">
              We make a deliberate effort not to fabricate vendor claims. Fields we haven't
              independently verified are rendered as &ldquo;research needed&rdquo; or em-dashed
              rather than guessed at. If you spot something incorrect on a vendor page, email us at{" "}
              <a
                href="mailto:hello@calltreo.com"
                className="text-ink underline underline-offset-4 hover:text-signal"
              >
                hello@calltreo.com
              </a>{" "}
              and we&apos;ll fix it.
            </p>
          </div>

          <div className="rounded-[var(--radius-card)] border border-rule bg-paper-deep/60 p-6 text-sm">
            <p>
              Plain version: we rank vendors honestly, we tell you when we&apos;ll earn money from a
              click, and we keep the things that affect your decision — score, ranking, copy —
              independent of whether anyone is paying us.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
