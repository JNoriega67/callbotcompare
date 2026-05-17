import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** Render in inverted color (light on dark) when on a dark surface. */
  invert?: boolean;
};

/**
 * Calltreo wordmark.
 *
 *   calltreo.
 *
 * Lowercase Inter ExtraBold with a signal-orange period. Reads like an
 * editorial publication mark, not a SaaS logo. Pure SVG so it renders
 * crisply at any size and inherits color via currentColor.
 */
export function Wordmark({ className, invert = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline gap-0",
        invert ? "text-paper" : "text-ink",
        className,
      )}
      aria-label="calltreo"
    >
      <span
        className="font-body text-[1.25em] font-extrabold leading-none tracking-tight"
        // Fixed kerning override so the letters sit tighter than Inter's defaults.
        style={{ letterSpacing: "-0.045em" }}
      >
        calltreo
      </span>
      <span className="text-[1.25em] font-extrabold leading-none text-signal" aria-hidden>
        .
      </span>
    </span>
  );
}
