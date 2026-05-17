import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** Render in inverted color (light on dark) when on a dark surface. */
  invert?: boolean;
};

/**
 * CallTreo wordmark — PascalCase, Montserrat 700, tightly kerned,
 * with a small teal mark to the right. Reads as a confident
 * editorial publication name without resorting to a logo motif.
 */
export function Wordmark({ className, invert = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center gap-2",
        invert ? "text-paper" : "text-ink",
        className,
      )}
      aria-label="CallTreo"
    >
      <span
        className="font-heading text-[1.05em] font-bold leading-none"
        style={{ letterSpacing: "-0.022em" }}
      >
        CallTreo
      </span>
      <span
        aria-hidden
        className={cn(
          "block h-1.5 w-1.5 rounded-full",
          invert ? "bg-paper" : "bg-signal",
        )}
      />
    </span>
  );
}
