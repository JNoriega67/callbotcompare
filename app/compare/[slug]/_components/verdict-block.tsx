type VerdictBlockProps = {
  intro?: string | null;
  verdict?: string | null;
};

export function VerdictBlock({ intro, verdict }: VerdictBlockProps) {
  if (!intro && !verdict) return null;
  return (
    <div className="space-y-6">
      {intro ? (
        <p className="text-base text-charcoal/85 md:text-lg md:leading-relaxed">{intro}</p>
      ) : null}
      {verdict ? (
        <div className="rounded-card border border-border bg-sage/50 p-6">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-teal">
            Quick verdict
          </h2>
          <p className="mt-2 text-base text-charcoal/90">{verdict}</p>
        </div>
      ) : null}
    </div>
  );
}
