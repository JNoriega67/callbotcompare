import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function Loading() {
  return (
    <Section tone="cream" className="py-16">
      <Container className="space-y-6">
        <div className="h-8 w-2/3 animate-pulse rounded-md bg-border-soft" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-border-soft" />
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-[var(--radius-card)] border border-rule bg-surface"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
