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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Your shortlist</p>
        <h2 className="font-heading text-3xl font-bold text-slate">
          Based on what you told us, start here.
        </h2>
        <p className="text-sm text-charcoal/80">
          These are the strongest fits given your industry and call profile. The full editor score
          and reasoning is on each vendor page.
        </p>
      </div>

      <ol className="space-y-4">
        {vendors.map((v, i) => (
          <li
            key={v.slug}
            className="grid gap-3 rounded-card border border-border bg-surface p-5 md:grid-cols-[auto_1fr_auto] md:items-center"
          >
            <span className="font-heading text-2xl font-bold text-slate md:text-3xl">{i + 1}</span>
            <div>
              <Link
                href={`/vendors/${v.slug}`}
                className="font-heading text-lg font-semibold text-slate hover:text-teal"
              >
                {v.name}
              </Link>
              {v.tagline ? <p className="text-sm text-muted">{v.tagline}</p> : null}
              {v.bestFor ? (
                <p className="mt-2 text-sm text-charcoal/85">
                  <span className="font-semibold text-slate">Best for:</span> {v.bestFor}
                </p>
              ) : null}
            </div>
            <div className="text-right">
              <p className="font-heading text-xl font-bold text-slate">
                {v.overallScore?.toFixed(1) ?? "—"}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted">Editor score</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-card border border-border bg-sage/40 p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold text-slate">
          Want our concierge to walk you through these?
        </h3>
        <p className="mt-1 text-sm text-charcoal/85">
          Drop your email and we'll send a short note explaining why each made your shortlist —
          and which to look at first.
        </p>
        <div className="mt-5">
          <LeadForm
            hidden={{ source: "concierge", recommendedVendors: recommendedSlugs }}
            submitLabel="Send me the walkthrough"
          />
        </div>
      </div>
    </div>
  );
}
