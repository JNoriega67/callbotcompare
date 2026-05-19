import Link from "next/link";

import { LeadForm } from "@/components/forms/lead-form";

type ResultVendor = {
  slug: string;
  name: string;
  tagline: string | null;
  overallScore: number | null;
  bestFor: string | null;
};

type QuizResultsProps = {
  vendors: ResultVendor[];
  recommendedSlugs: string[];
};

export function QuizResults({ vendors, recommendedSlugs }: QuizResultsProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="font-heading text-[11px] font-semibold text-signal">
          Your shortlist
        </p>
        <h2 className="font-heading text-3xl font-bold text-ink">
          Based on what you told us, start here.
        </h2>
        <p className="text-sm text-ink-soft">
          These are the strongest fits given your industry and call profile. The full editor score
          and reasoning is on each vendor page.
        </p>
      </div>

      <ol className="space-y-4">
        {vendors.map((v, i) => (
          <li
            key={v.slug}
            className="grid gap-3 rounded-[var(--radius-card)] border border-rule bg-surface p-5 shadow-[var(--shadow-card)] md:grid-cols-[auto_1fr_auto] md:items-center"
          >
            <span className="font-heading text-2xl font-bold text-ink md:text-3xl">{i + 1}</span>
            <div>
              <Link
                href={`/vendors/${v.slug}`}
                className="font-heading text-lg font-semibold text-ink hover:text-signal"
              >
                {v.name}
              </Link>
              {v.tagline ? <p className="text-sm text-muted-ink">{v.tagline}</p> : null}
              {v.bestFor ? (
                <p className="mt-2 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">Best for:</span> {v.bestFor}
                </p>
              ) : null}
            </div>
            <div className="text-right">
              <p className="font-heading text-xl font-bold text-ink">
                {v.overallScore?.toFixed(1) ?? "—"}
              </p>
              <p className="font-heading text-[10px] text-muted-ink">
                Editor score
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-[var(--radius-card)] border border-rule bg-signal-soft/60 p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold text-ink">
          Want our concierge to walk you through these?
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          Drop your email and we&apos;ll send a short note explaining why each made your shortlist —
          and which to look at first.
        </p>
        <div className="mt-5">
          <LeadForm
            hidden={{ source: "concierge", recommendedVendors: recommendedSlugs }}
            submitLabel="Send me the walkthrough"
          />
        </div>
      </div>

      {/* High-intent setup CTA — natural moment to surface paid help. */}
      <div className="rounded-[var(--radius-card)] border border-rule bg-surface p-6 shadow-[var(--shadow-card)] md:p-8">
        <p className="font-heading text-[11px] font-semibold text-signal">
          Want this done for you
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-ink">
          Skip the project — have us run the setup.
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          We pick the vendor, write the call flow, wire up the CRM and calendar, and hand you a
          working system in 2–3 weeks. Fixed scope, fixed price.
        </p>
        <div className="mt-5">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-signal px-4 py-2.5 font-heading text-[12px] font-semibold text-signal-ink transition-colors hover:bg-signal-hover"
          >
            See setup packages →
          </Link>
        </div>
      </div>
    </div>
  );
}
