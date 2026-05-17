import Link from "next/link";

import { cn } from "@/lib/utils";

type CtaBannerVariant = "matched" | "setup" | "compare" | "talk";

type CtaBannerProps = {
  variant: CtaBannerVariant;
  className?: string;
  /** Optional override of the default tone wrapper (paper/deep/ink). */
  tone?: "paper" | "deep" | "ink";
};

const COPY: Record<CtaBannerVariant, {
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
  cta: string;
}> = {
  matched: {
    eyebrow: "Get matched",
    heading: "Get matched to the right AI receptionist.",
    body: "Five questions. We surface the two or three strongest fits for your industry and call volume. No email gate.",
    href: "/quiz",
    cta: "Take the quiz",
  },
  setup: {
    eyebrow: "Setup help",
    heading: "Want it set up correctly the first time?",
    body: "Fixed-scope setup engagements: vendor selection, call flow design, CRM integration, launch. Built for SMB teams that don't want to run the project themselves.",
    href: "/services",
    cta: "Talk to us about setup",
  },
  compare: {
    eyebrow: "Compare",
    heading: "Build a side-by-side on your shortlist.",
    body: "Pick up to three vendors and compare against the criteria that actually drive the decision. Shareable link, no signup.",
    href: "/compare",
    cta: "Open compare",
  },
  talk: {
    eyebrow: "Talk to us",
    heading: "Tell us about your setup. We'll point you somewhere useful.",
    body: "A short email back with a shortlist and the reasons — usually within a business day. No sales calls.",
    href: "/contact",
    cta: "Get in touch",
  },
};

const TONE_WRAP: Record<NonNullable<CtaBannerProps["tone"]>, string> = {
  paper: "bg-paper text-ink",
  deep: "bg-paper-deep text-ink",
  ink: "bg-ink text-paper",
};

/**
 * Reusable CTA banner used inside vendor detail, comparison, and
 * commercial pages. Editorial framing — not a marketing pop-out.
 */
export function CtaBanner({ variant, tone = "deep", className }: CtaBannerProps) {
  const copy = COPY[variant];
  const isDark = tone === "ink";

  return (
    <aside
      className={cn(
        "rounded-[var(--radius-card)] border p-6 md:p-8",
        TONE_WRAP[tone],
        tone === "ink" ? "border-rule-dark" : "border-rule",
        className,
      )}
    >
      <div className="grid gap-5 md:grid-cols-[1.6fr_1fr] md:items-end md:gap-8">
        <div>
          <p
            className={cn(
              "font-heading text-[10px] font-semibold uppercase tracking-[0.22em]",
              isDark ? "text-signal-soft" : "text-signal",
            )}
          >
            {copy.eyebrow}
          </p>
          <h3
            className={cn(
              "mt-2 font-heading text-xl font-bold leading-tight md:text-2xl",
              isDark ? "text-paper" : "text-ink",
            )}
          >
            {copy.heading}
          </h3>
          <p className={cn("mt-2 text-sm leading-relaxed", isDark ? "text-over-ink/80" : "text-ink-soft")}>
            {copy.body}
          </p>
        </div>
        <div className="md:text-right">
          <Link
            href={copy.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-[var(--radius-button)] px-5 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors",
              isDark
                ? "bg-signal text-signal-ink hover:bg-signal-hover"
                : "bg-signal text-signal-ink hover:bg-signal-hover",
            )}
          >
            {copy.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
