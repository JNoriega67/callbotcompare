import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FOOTER_LINKS, SITE_NAME } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-heading text-lg font-bold text-slate">
            {SITE_NAME}
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Independent comparisons of AI receptionist and AI phone agent software, ranked against a
            transparent rubric for small and mid-sized service businesses.
          </p>
        </div>
        {FOOTER_LINKS.map((column) => (
          <div key={column.heading}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-slate">
              {column.heading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-charcoal/80">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-teal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>© {year} {SITE_NAME}. All rights reserved.</p>
        <p>
          Vendor mentions and scores are editorial. Where a referral relationship exists, we
          disclose it on the vendor page.
        </p>
      </Container>
    </footer>
  );
}
