# Pattern: Scaffold a New Project the Right Way

> "I want to scaffold a new project the right way"

**Principles used**: Context Layering, Constraint-Driven Creativity, Chain-of-Thought Scaffolding

---

## When to Use
- Starting a new project from zero
- Setting up the foundation that everything else builds on
- Choosing the initial structure, tooling, and conventions

## The Pattern

```
I'm starting a new project: {{PROJECT_DESCRIPTION}}.

Requirements:
- Primary purpose: {{WHAT_IT_DOES}}
- Target users: {{WHO_USES_IT}}
- Scale expectation: {{INITIAL_SCALE}} now, {{GROWTH_TARGET}} in 12 months
- Team: {{TEAM_SIZE_AND_EXPERIENCE}}
- Timeline: {{FIRST_MILESTONE}} by {{DATE}}

Decided already:
- {{STACK_DECISIONS_ALREADY_MADE}}

Still open:
- {{DECISIONS_STILL_NEEDED}}

Set up the project with:
1. Directory structure (show the tree with a one-line description of each directory's purpose)
2. Package configuration (dependencies — justify each one. No "nice to have" packages.)
3. Linting/formatting config (opinionated defaults, no bikeshedding)
4. Base types/interfaces for the core domain
5. One working end-to-end vertical slice (e.g., one API endpoint from route to database and back) as proof the stack works

Do NOT include:
- Auth (unless it's a core requirement for the first milestone)
- CI/CD (we'll add it when we have something to deploy)
- Monitoring/logging infrastructure (premature for day 1)
- README boilerplate
```

## Why It Works
The "one working vertical slice" requirement ensures the scaffolding actually functions — it's not just folder structure, it's a provably working foundation. The explicit exclusions prevent over-engineering on day 1.

## Common Mistakes
- Including everything (auth, CI/CD, monitoring, Docker) for a project that's weeks away from needing them
- Not specifying what's already decided → Claude re-evaluates settled choices
- Not including the vertical slice → scaffolding that looks right but doesn't compile

## Variations
- **Monorepo**: Add "This is a monorepo with {{PACKAGES}}. Set up workspace tooling and shared config."
- **API-first**: Add "Start with the API contract (OpenAPI/GraphQL schema) before any implementation."
- **From template**: "Use {{FRAMEWORK_CLI}} to scaffold, then customize: {{SPECIFIC_CHANGES}}."
