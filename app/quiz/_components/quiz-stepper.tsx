"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { QuizProgress } from "@/app/quiz/_components/quiz-progress";
import { QuizResults } from "@/app/quiz/_components/quiz-results";
import { QuizStep, type QuizOption } from "@/app/quiz/_components/quiz-step";

type StepKey = "industry" | "volume" | "needs" | "integrations" | "budget";

type Step = {
  key: StepKey;
  question: string;
  helper?: string;
  options: QuizOption[];
};

const STEPS: Step[] = [
  {
    key: "industry",
    question: "What industry are you in?",
    helper: "Pick the closest match — affects which vendors we shortlist.",
    options: [
      { value: "law-firms", label: "Law firm" },
      { value: "home-services", label: "Home services" },
      { value: "medical-offices", label: "Medical / dental office" },
      { value: "contractors", label: "Contractor" },
      { value: "real-estate", label: "Real estate" },
      { value: "small-business", label: "Other small business" },
    ],
  },
  {
    key: "volume",
    question: "Roughly how many inbound calls per month?",
    options: [
      { value: "<100", label: "Under 100" },
      { value: "100-500", label: "100 – 500" },
      { value: "500-2000", label: "500 – 2,000" },
      { value: "2000+", label: "Over 2,000" },
    ],
  },
  {
    key: "needs",
    question: "What does the AI need to do?",
    helper: "Pick the closest. We'll surface vendors strong in that workflow.",
    options: [
      { value: "answer", label: "Answer and route", hint: "Greet, qualify, route to a human." },
      { value: "book", label: "Book appointments", hint: "Calendar integration matters." },
      { value: "qualify", label: "Qualify leads", hint: "Capture intent and feed your CRM." },
      { value: "after-hours", label: "After-hours coverage", hint: "Backup for missed calls." },
    ],
  },
  {
    key: "integrations",
    question: "What needs to integrate with it?",
    options: [
      { value: "crm", label: "CRM (HubSpot, Salesforce, etc.)" },
      { value: "calendar", label: "Calendar / booking system" },
      { value: "phone", label: "Existing phone system" },
      { value: "none", label: "Nothing specific yet" },
    ],
  },
  {
    key: "budget",
    question: "What's your monthly budget range?",
    options: [
      { value: "<100", label: "Under $100" },
      { value: "100-300", label: "$100 – $300" },
      { value: "300-1000", label: "$300 – $1,000" },
      { value: "1000+", label: "$1,000+" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
];

type ResultVendor = {
  slug: string;
  name: string;
  tagline: string | null;
  overallScore: number | null;
  bestFor: string | null;
};

type QuizStepperProps = {
  publishedVendors: ResultVendor[];
};

export function QuizStepper({ publishedVendors }: QuizStepperProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<StepKey, string | null>>({
    industry: null,
    volume: null,
    needs: null,
    integrations: null,
    budget: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [recommended, setRecommended] = useState<string[] | null>(null);

  const total = STEPS.length;
  const step = STEPS[stepIndex];
  const currentValue = answers[step.key];

  const recommendedVendors = useMemo<ResultVendor[]>(() => {
    if (!recommended) return [];
    return recommended
      .map((slug) => publishedVendors.find((v) => v.slug === slug))
      .filter((v): v is ResultVendor => Boolean(v));
  }, [recommended, publishedVendors]);

  const onSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.key]: value }));
  };

  const goNext = async () => {
    if (stepIndex < total - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    // Final step — submit. We don't require an email at this stage (soft capture).
    setSubmitting(true);
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          // The /api/quiz endpoint requires name+email, but for the soft-capture
          // flow we synthesize placeholders so the server still validates while
          // the user has not yet entered their email.
          name: "quiz-anon",
          email: `quiz+${Date.now()}@calltreo.local`,
          industry: answers.industry ?? undefined,
          monthlyCallVolume: answers.volume ?? undefined,
          mainUseCase: answers.needs ?? undefined,
          mustHaveIntegrations: answers.integrations ?? undefined,
          budgetRange: answers.budget ?? undefined,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Quiz submission failed");
      }
      const data = (await response.json()) as { recommendedVendors?: string[] };
      setRecommended(data.recommendedVendors ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Quiz submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  if (recommended !== null) {
    return <QuizResults vendors={recommendedVendors} recommendedSlugs={recommended} />;
  }

  return (
    <div className="space-y-8 rounded-[var(--radius-card)] border border-rule bg-surface p-6 md:p-8">
      <QuizProgress current={stepIndex} total={total} />
      <QuizStep
        question={step.question}
        helper={step.helper}
        options={step.options}
        value={currentValue}
        onSelect={onSelect}
      />
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="rounded-[var(--radius-button)] border border-ink/25 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink/50 disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!currentValue || submitting}
          className="rounded-[var(--radius-button)] bg-signal px-5 py-2.5 text-sm font-semibold text-signal-ink transition-colors hover:bg-signal-hover disabled:opacity-60"
        >
          {stepIndex === total - 1 ? (submitting ? "Building shortlist…" : "See my shortlist") : "Next →"}
        </button>
      </div>
    </div>
  );
}
