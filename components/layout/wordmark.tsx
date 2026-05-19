import Image from "next/image";

import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /**
   * Light-on-dark variant. Flattens the multi-color brand image into a
   * pure white silhouette so it reads cleanly on the dark navy footer.
   * `brightness-0` collapses all RGB to black; `invert` then flips
   * black to white. Alpha is preserved by both filters, so the
   * transparent backdrop stays transparent.
   */
  invert?: boolean;
};

/**
 * CallTreo wordmark — renders the brand image (public/calltreo-logo.png)
 * which contains both the icon mark and the wordmark text on a
 * transparent background. Same image for both surfaces; the dark
 * variant is produced at render time via CSS filters.
 */
export function Wordmark({ className, invert = false }: WordmarkProps) {
  return (
    <span
      className={cn("inline-flex select-none items-center", className)}
      aria-label="CallTreo"
    >
      <Image
        src="/calltreo-logo.png"
        alt="CallTreo"
        width={1340}
        height={540}
        priority
        className={cn(
          "h-14 w-auto md:h-16",
          invert && "brightness-0 invert",
        )}
      />
    </span>
  );
}

/**
 * Kept as an alias of Wordmark so any older imports keep working.
 * We no longer ship a separate mark-only component.
 */
export const BrandMark = Wordmark;
