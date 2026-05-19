type VerdictBlockProps = {
  intro?: string | null;
  verdict?: string | null;
};

export function VerdictBlock({ intro, verdict }: VerdictBlockProps) {
  if (!intro && !verdict) return null;
  return (
    <div className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
      <div>
        <p className="font-heading text-[10px] font-semibold text-signal">
          Quick verdict
        </p>
        <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-ink md:text-3xl">
          Read this first.
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          The summary version of who each tool actually fits — and the deeper context below if
          you&apos;re still narrowing it down.
        </p>
      </div>
      <div className="space-y-6 text-base leading-relaxed text-ink-soft md:text-[17px] md:leading-[1.7]">
        {intro ? <p>{intro}</p> : null}
        {verdict ? (
          <div className="border-l-2 border-signal bg-paper-deep/50 px-5 py-4 text-ink">
            <p className="font-heading text-[10px] font-semibold text-signal">
              Verdict
            </p>
            <p className="mt-2 font-heading text-lg font-semibold leading-snug md:text-xl">
              {verdict}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
