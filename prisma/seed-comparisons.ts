import { ContentStatus, type PrismaClient } from "@prisma/client";

type ComparisonSeed = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  verdict?: string;
  vendorSlugs: [string, string];
};

const COMPARISONS: ComparisonSeed[] = [
  {
    slug: "smith-ai-vs-goodcall",
    title: "Smith.ai vs Goodcall: which AI receptionist fits your business?",
    metaTitle: "Smith.ai vs Goodcall: AI Receptionist Comparison",
    metaDescription:
      "Side-by-side comparison of Smith.ai and Goodcall — features, pricing, setup, integrations, and which to choose for law firms, SMBs, and home services.",
    intro:
      "Smith.ai and Goodcall both market AI receptionist coverage for small businesses, but they sit at different points on the AI-to-human spectrum. Smith.ai blends AI workflows with human receptionists for stronger fallback, while Goodcall leans into a lighter-weight, AI-first setup that is faster to deploy. This page compares them on the criteria that actually drive a buying decision.",
    verdict:
      "One of the biggest differences is whether you need a more mature receptionist workflow with stronger human backup (Smith.ai), or a lighter-weight AI-first system that is easier to deploy quickly (Goodcall). If intake quality and complex routing matter most — especially for law firms and high-touch SMBs — Smith.ai is the safer default. If you want fast time-to-value on AI-first inbound coverage with light integrations, Goodcall is the simpler choice.",
    vendorSlugs: ["smith-ai", "goodcall"],
  },
  {
    slug: "smith-ai-vs-dialpad-ai-reception",
    title: "Smith.ai vs Dialpad AI Reception: which to pick?",
    metaTitle: "Smith.ai vs Dialpad AI Reception — comparison (2026)",
    metaDescription:
      "Smith.ai vs Dialpad AI Reception side by side: scoring rubric, integrations, hybrid AI+human model, who each tool actually fits.",
    intro:
      "Smith.ai and Dialpad AI Reception both target SMB inbound coverage but sit at meaningfully different ends of the market. Smith.ai is a receptionist-as-a-service company that's added AI on top of a mature human-receptionist workflow. Dialpad is a unified communications platform with AI Reception as one capability inside a broader contact-center suite. Same problem, very different shapes — and the right answer depends more on what else you need from the phone system than on the AI itself.",
    verdict:
      "Pick Smith.ai if you want a turnkey receptionist outcome and don't need to also run sales calls, support queues, or video conferencing through the same platform — their human-AI hybrid handles intake at high quality with minimal setup. Pick Dialpad AI Reception if you're already a Dialpad customer (or considering moving your whole communications stack there) and want AI reception as part of one platform instead of a separate vendor. Stand-alone Dialpad AI Reception is usually overkill if the only job is answering inbound calls.",
    vendorSlugs: ["smith-ai", "dialpad-ai-reception"],
  },
  {
    slug: "smith-ai-vs-abby-connect",
    title: "Smith.ai vs Abby Connect: human-led receptionists, AI-augmented",
    metaTitle: "Smith.ai vs Abby Connect — comparison (2026)",
    metaDescription:
      "Smith.ai vs Abby Connect compared on intake quality, AI augmentation depth, transfer behavior, and which is the better fit for law firms vs SMB service businesses.",
    intro:
      "Smith.ai and Abby Connect are the two best-known names in the receptionist-as-a-service category. Both blend live US-based human receptionists with AI augmentation, both publish hourly billing, and both serve a meaningful number of law firms. The actual differences live in script flexibility, transfer behavior, integration depth, and the way each handles after-hours — which is where most buyers' decision actually pivots.",
    verdict:
      "Smith.ai usually wins for law firms that need deeper intake workflows, conflict-check-aware capture, and tighter integrations with legal CRMs. Abby Connect tends to win for service businesses that want simpler 'just answer the phone professionally' coverage with predictable per-minute billing and a slightly warmer caller experience. Neither is a wrong choice for either segment — but the closer your call flows are to legal intake or sales qualification, the more Smith.ai's depth pays back.",
    vendorSlugs: ["smith-ai", "abby-connect"],
  },
  {
    slug: "goodcall-vs-dialzara",
    title: "Goodcall vs Dialzara: pure-AI receptionists for SMBs",
    metaTitle: "Goodcall vs Dialzara — comparison (2026)",
    metaDescription:
      "Goodcall vs Dialzara compared: pure-AI receptionist platforms for SMBs. Setup speed, integrations, pricing model, and which one fits which use case.",
    intro:
      "Goodcall and Dialzara are both AI-first answering platforms aimed at small and mid-sized businesses. Neither blends a human receptionist on top, which keeps pricing low and setup fast — but it also means the AI itself has to carry the full call. The differences come down to setup ergonomics, integration breadth, and how each handles the edge cases that decide whether the AI feels useful or annoying.",
    verdict:
      "Goodcall is the cleaner choice for first-time AI receptionist buyers who want minimal setup and don't need deep customization — the defaults are sensible and you're live fast. Dialzara is the better fit for teams that want more control over the call flow and the integration layer, at the cost of slightly more upfront configuration. Run the trial on whichever has the integration with your specific CRM; that's usually the decider when the rest is close.",
    vendorSlugs: ["goodcall", "dialzara"],
  },
  {
    slug: "abby-connect-vs-answerconnect",
    title: "Abby Connect vs AnswerConnect: live receptionist services compared",
    metaTitle: "Abby Connect vs AnswerConnect — comparison (2026)",
    metaDescription:
      "Abby Connect vs AnswerConnect side by side: live human receptionist services with AI augmentation. Pricing, intake depth, after-hours, and which fits which business.",
    intro:
      "Abby Connect and AnswerConnect are the two biggest US-based live-receptionist services for SMBs, and both have added AI to handle overflow and after-hours. They look superficially similar — minute-based plans, US-based reception teams, web-portal account management — but the texture of the actual service differs in ways that matter once you're past the marketing site.",
    verdict:
      "Abby Connect tends to win on caller-experience consistency and the warmth of the receptionist interaction; smaller teams report a tighter feedback loop on script tweaks. AnswerConnect wins on after-hours coverage breadth, broader integration list, and slightly more aggressive pricing at higher volumes. The decision usually comes down to whether you weight caller experience (Abby) or coverage breadth + integration (AnswerConnect) more heavily — both are credible.",
    vendorSlugs: ["abby-connect", "answerconnect"],
  },
  {
    slug: "synthflow-vs-bland-ai",
    title: "Synthflow vs Bland AI: no-code builder vs developer platform",
    metaTitle: "Synthflow vs Bland AI — comparison (2026)",
    metaDescription:
      "Synthflow vs Bland AI compared: no-code voice agent builder vs developer-focused AI phone platform. Pricing model, compliance, integrations, who each fits.",
    intro:
      "Synthflow and Bland AI both build AI voice agents and both publish a serious compliance posture (SOC 2, HIPAA, PCI, GDPR), but they target opposite ends of the buying audience. Synthflow leads with a no-code builder for agencies and SMB-to-mid-market teams. Bland leads with a programmable platform marketed at engineering-led enterprises. Same underlying technology category, very different go-to-market — and the right choice almost always comes down to who's going to configure it.",
    verdict:
      "Pick Synthflow if you don't have engineers on the build (or you're an agency standing up agents for clients) — the no-code path plus integrations with HubSpot, Salesforce, GoHighLevel, and Cal.com is genuinely faster to live. Pick Bland AI if you have an engineering team and want per-minute pricing across a unified LLM + STT + TTS + telephony stack with 40+ language support, and you're willing to wire the integrations yourself. Both are credible technical platforms; the wrong fit is buying Bland if your team can't write code, or buying Synthflow if you actually need custom call-graph logic at the API level.",
    vendorSlugs: ["synthflow", "bland-ai"],
  },
  {
    slug: "vapi-vs-bland-ai",
    title: "Vapi vs Bland AI: voice AI infrastructure compared",
    metaTitle: "Vapi vs Bland AI — comparison (2026)",
    metaDescription:
      "Vapi vs Bland AI side-by-side: both are developer-focused voice AI platforms with SOC 2 + HIPAA + PCI. Pricing model, language support, infrastructure approach.",
    intro:
      "Vapi and Bland AI are the two best-known developer-focused voice AI platforms. Both market 'API-first' or 'programmable' positioning, both publish SOC 2 + HIPAA + PCI posture, and both are used by serious enterprises (Vapi cites Ring, GoHealth, Instawork, Kavak; Bland cites 250+ enterprise customers across healthcare, finance, and insurance). The decision rarely comes down to whether the platform is good — both are — it comes down to pricing model, language depth, and how much of the call-graph you want to control yourself.",
    verdict:
      "Bland AI is the easier default if you want a single per-minute rate that covers everything (LLM + STT + TTS + telephony) and you need 40+ languages with real-time translation in 23 of them — they publish a broad integration list (Salesforce, HubSpot, Twilio, Zapier, Calendly, Genesys, Five9, NICE, Talkdesk, Amazon Connect, SIP) and a packaged 'handoff with context' for humans. Vapi is the better fit if you want a managed voice AI platform you can plug your own models into (the 'API-first by design' angle), and you're comfortable building your own integration + handoff layer. If you don't already know which philosophy fits your team, default to Bland — the packaged stack is one fewer thing to assemble.",
    vendorSlugs: ["vapi", "bland-ai"],
  },
  {
    slug: "synthflow-vs-vapi",
    title: "Synthflow vs Vapi: no-code builder vs API platform",
    metaTitle: "Synthflow vs Vapi — comparison (2026)",
    metaDescription:
      "Synthflow vs Vapi compared: no-code voice agent builder vs API-first developer platform. Audience fit, integrations, compliance, pricing model.",
    intro:
      "Synthflow and Vapi both build AI voice agents and both publish HIPAA + SOC 2 + PCI compliance posture, but they sit at opposite ends of the build-vs-buy spectrum. Synthflow ships a no-code builder marketed at agencies and SMB-to-mid-market teams. Vapi ships an 'API-first' platform marketed at developers and Fortune 100 engineering teams. They're rarely shortlisted together by the same buyer — but when they are, the question is usually whether you want to drag-and-drop or whether you want to write code.",
    verdict:
      "Pick Synthflow if the team that will own the agent doesn't write code, and you want named integrations with HubSpot, Salesforce, GoHighLevel, and Cal.com out of the box — pay-as-you-go pricing lets you keep usage costs proportional to actual call volume. Pick Vapi if you have engineering capacity, you want to bring your own LLM or stitch in custom call-flow logic at the API level, and you value the broader 'platform' framing where voice is one of several capabilities you'll build on top of. Neither is wrong; they just answer different questions.",
    vendorSlugs: ["synthflow", "vapi"],
  },
];

export async function seedComparisons(prisma: PrismaClient) {
  console.log(`seeding ${COMPARISONS.length} comparison page(s)…`);

  for (const comparison of COMPARISONS) {
    const vendors = await prisma.vendor.findMany({
      where: { slug: { in: comparison.vendorSlugs } },
    });
    if (vendors.length !== comparison.vendorSlugs.length) {
      const foundSlugs = vendors.map((v) => v.slug);
      const missing = comparison.vendorSlugs.filter((s) => !foundSlugs.includes(s));
      console.warn(
        `  ! skipping ${comparison.slug}: missing vendor(s) ${missing.join(", ")}`,
      );
      continue;
    }

    const orderedVendors = comparison.vendorSlugs
      .map((slug, index) => {
        const vendor = vendors.find((v) => v.slug === slug);
        return vendor ? { vendor, position: index } : null;
      })
      .filter((v): v is { vendor: (typeof vendors)[number]; position: number } => v !== null);

    const page = await prisma.comparisonPage.upsert({
      where: { slug: comparison.slug },
      update: {
        title: comparison.title,
        metaTitle: comparison.metaTitle,
        metaDescription: comparison.metaDescription,
        intro: comparison.intro,
        verdict: comparison.verdict,
        status: ContentStatus.PUBLISHED,
      },
      create: {
        slug: comparison.slug,
        title: comparison.title,
        metaTitle: comparison.metaTitle,
        metaDescription: comparison.metaDescription,
        intro: comparison.intro,
        verdict: comparison.verdict,
        status: ContentStatus.PUBLISHED,
      },
    });

    await prisma.comparisonVendor.deleteMany({ where: { comparisonId: page.id } });
    for (const { vendor, position } of orderedVendors) {
      await prisma.comparisonVendor.create({
        data: { comparisonId: page.id, vendorId: vendor.id, position },
      });
    }
  }
}
