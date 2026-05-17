import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/layout/wordmark";
import { FOOTER_LINKS } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule-strong bg-paper">
      <Container className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-base">
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-ink-soft">
            Independent comparisons of AI receptionist and AI phone agent software, ranked against a
            transparent rubric for small and mid-sized service businesses.
          </p>
        </div>
        {FOOTER_LINKS.map((column) => (
          <div key={column.heading}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
              {column.heading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-signal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-rule py-6 text-xs text-muted-ink md:flex-row md:items-center md:justify-between">
        <p>© {year} CallTreo. All rights reserved.</p>
        <p>
          Vendor mentions and scores are editorial. Where a referral relationship exists, we
          disclose it on the vendor page.
        </p>
      </Container>
    </footer>
  );
}
