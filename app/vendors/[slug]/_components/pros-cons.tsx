type Vendor = {
  bestFor: string | null;
  editorVerdict: string | null;
};

export function ProsCons({ vendor }: { vendor: Vendor }) {
  if (!vendor.bestFor && !vendor.editorVerdict) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {vendor.bestFor ? (
        <div className="rounded-[var(--radius-card)] border border-rule bg-surface p-5">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-signal">
            Best for
          </h3>
          <p className="mt-2 text-sm text-ink-soft/90">{vendor.bestFor}</p>
        </div>
      ) : null}
      {vendor.editorVerdict ? (
        <div className="rounded-[var(--radius-card)] border border-rule bg-surface p-5">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
            Editor verdict
          </h3>
          <p className="mt-2 text-sm text-ink-soft/90">{vendor.editorVerdict}</p>
        </div>
      ) : null}
    </div>
  );
}
