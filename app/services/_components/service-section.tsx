type ServiceSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  whoItsFor: string;
  description: string;
  deliverables: ReadonlyArray<string>;
  /** Optional pricing label, e.g. "Fixed scope · from $1,200" */
  pricing?: string;
};

export function ServiceSection({
  id,
  eyebrow,
  title,
  whoItsFor,
  description,
  deliverables,
  pricing,
}: ServiceSectionProps) {
  return (
    <article id={id} className="grid gap-10 border-t border-rule pt-12 md:grid-cols-[5fr_7fr] md:gap-16 md:pt-16">
      <div>
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-signal">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-ink md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-ink-soft">{description}</p>
        {pricing ? (
          <p className="mt-4 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink">
            {pricing}
          </p>
        ) : null}
      </div>
      <div className="space-y-6">
        <div>
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
            Who it&apos;s for
          </p>
          <p className="mt-2 text-ink-soft">{whoItsFor}</p>
        </div>
        <div>
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-ink">
            What we deliver
          </p>
          <ul className="mt-2 space-y-2 text-ink-soft">
            {deliverables.map((d) => (
              <li key={d} className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1 w-3 shrink-0 bg-signal"
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
