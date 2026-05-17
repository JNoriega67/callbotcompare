import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/layout/wordmark";
import { FOOTER_LINKS } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-ink text-over-ink">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[2.2fr_repeat(6,minmax(0,1fr))]">
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-1">
          <Link href="/" className="text-base">
            <Wordmark invert />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-over-ink/75">
            Independent comparisons of AI receptionist and AI phone agent software, ranked against a
            transparent rubric for small and mid-sized service businesses.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-over-ink/55">
            Methodology and editorial standards are{" "}
            <Link href="/methodology" className="underline underline-offset-2 hover:text-paper">
              public
            </Link>
            . Referral relationships are{" "}
            <Link href="/disclosure" className="underline underline-offset-2 hover:text-paper">
              disclosed
            </Link>
            .
          </p>
        </div>
        {FOOTER_LINKS.map((column) => (
          <div key={column.heading}>
            <h3 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
              {column.heading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-over-ink/85">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-rule-dark py-6 text-xs text-over-ink/55 md:flex-row md:items-center md:justify-between">
        <p>© {year} CallTreo. All rights reserved.</p>
        <p>
          Vendor mentions and scores are editorial. Where a referral relationship exists, we
          disclose it on the vendor page.
        </p>
      </Container>
    </footer>
  );
}
