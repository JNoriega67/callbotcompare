"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/layout/wordmark";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Track which pathname we opened the menu under. Comparing it inline
  // lets us auto-close on route change without an effect-driven setState
  // (which triggers react-hooks/set-state-in-effect — see React 19 docs
  // on storing derived state during render).
  const [openedFor, setOpenedFor] = useState<string | null>(null);
  const isOpen = open && openedFor === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggle() {
    if (isOpen) {
      setOpen(false);
      setOpenedFor(null);
    } else {
      setOpen(true);
      setOpenedFor(pathname);
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-paper/90 backdrop-blur-sm transition-shadow",
        scrolled ? "shadow-[0_1px_0_var(--rule)]" : "shadow-none",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-base">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-7 font-heading text-[12px] font-semibold md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-muted-ink transition-colors hover:text-ink",
                  active && "text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-signal"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="rounded-[var(--radius-button)] bg-signal px-3.5 py-1.5 font-heading text-[12px] font-semibold text-signal-ink transition-colors hover:bg-signal-hover"
          >
            Talk to us
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-rule text-ink md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={toggle}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            className="h-4 w-4"
            aria-hidden
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </Container>
      {isOpen ? (
        <div className="border-t border-rule bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 font-heading text-sm font-semibold text-ink hover:bg-paper-deep"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-[var(--radius-button)] bg-ink px-4 py-2 text-center font-heading text-sm font-semibold text-paper"
            >
              Talk to us
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
