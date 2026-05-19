import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function NotFound() {
  return (
    <Section tone="cream" className="py-24">
      <Container className="max-w-2xl space-y-5 text-center">
        <p className="text-xs font-semibold text-signal">404</p>
        <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
          We couldn't find that page.
        </h1>
        <p className="text-ink-soft/80">
          The link may be out of date, or we may have moved the page. Try the directory or jump
          straight to the comparison hub.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/vendors"
            className="rounded-[var(--radius-button)] bg-signal px-5 py-3 text-sm font-semibold text-signal-ink hover:bg-signal-hover"
          >
            Browse vendors
          </Link>
          <Link
            href="/"
            className="rounded-[var(--radius-button)] border border-ink/25 bg-surface px-5 py-3 text-sm font-semibold text-ink hover:border-ink/50"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </Section>
  );
}
