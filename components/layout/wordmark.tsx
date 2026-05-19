import Image from "next/image";

import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /**
   * Light-on-dark variant. Kept on the props API for back-compat with
   * existing callers; the brand image is transparent so there's no
   * surface treatment to flip.
   */
  invert?: boolean;
};

/**
 * CallTreo wordmark — renders the brand image (public/calltreo-logo.png)
 * which contains both the icon mark and the wordmark text on a
 * transparent background. The same image is used for both light and
 * dark surfaces.
 */
export function Wordmark({ className, invert: _invert = false }: WordmarkProps) {
  return (
    <span
      className={cn("inline-flex select-none items-center", className)}
      aria-label="CallTreo"
    >
      <Image
        src="/calltreo-logo.png"
        alt="CallTreo"
        width={1180}
        height={460}
        priority
        className="h-14 w-auto md:h-16"
      />
    </span>
  );
}

/**
 * Kept as an alias of Wordmark so any older imports keep working.
 * We no longer ship a separate mark-only component.
 */
export const BrandMark = Wordmark;
