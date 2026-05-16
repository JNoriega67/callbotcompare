Build this project in the current workspace using the spec files in `/callbotcompare`.

Read and follow:
1. `callbotcompare/CLAUDE_CODE_BUILD_SPEC.md`
2. `callbotcompare/prisma_schema_proposal.prisma`
3. `callbotcompare/FRONTEND_SITEMAP_AND_BUILD_PLAN.md`

Your job:
- scaffold the full MVP for CallBotCompare
- use Next.js + TypeScript + Tailwind + Prisma + Postgres
- create a production-minded directory/comparison site
- implement seeded data and all key page templates
- build the lead form and quiz flow
- make the site SEO-friendly and responsive

Priorities in order:
1. homepage
2. vendors index
3. vendor detail pages
4. compare hub
5. comparison detail pages
6. best-ai-receptionist-software page
7. quiz and lead capture
8. guide template
9. admin or simple content editing path

Constraints:
- do not fabricate precise vendor claims if data is missing
- use placeholders or null-safe UI where research is incomplete
- keep components reusable
- keep data structures generic for future comparison-site reuse
- optimize for clean MVP delivery over unnecessary complexity

Definition of done:
- app runs locally
- database schema works
- seed data populates site
- key pages render correctly
- filters work
- lead submission persists
- metadata and schema markup exist on major templates
- README includes setup steps

If something is ambiguous, make the most practical implementation choice and document it.