import Link from "next/link";

import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

type BreadcrumbsProps = {
  trail: ReadonlyArray<BreadcrumbItem>;
};

export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {trail.map((item, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-ink">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="hover:text-signal">
                      {item.label}
                    </Link>
                    <span aria-hidden className="text-muted/60">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}
