# Pattern: Design an Architecture from Scratch

> "I want to design an architecture from scratch"

**Principles used**: Context Layering, Chain-of-Thought Scaffolding, Constraint-Driven Creativity

---

## When to Use
- Starting a new project or major feature that needs architectural decisions
- Evaluating whether an existing architecture should change
- Translating business requirements into technical structure

## The Pattern

```
I'm designing the architecture for {{PROJECT_DESCRIPTION}}.

Context:
- Team: {{TEAM_SIZE}} engineers, experience with {{TECHNOLOGIES}}
- Scale: {{EXPECTED_LOAD}} (users, requests, data volume)
- Timeline: {{DEADLINE_OR_PACE}}
- Hard constraints: {{NON_NEGOTIABLE_REQUIREMENTS}}

Work through this systematically:
1. What are the core domains/bounded contexts?
2. What are the data flows between them?
3. Where are the consistency boundaries? (What MUST be transactional vs. eventually consistent?)
4. What's the simplest architecture that handles the scale requirements?
5. Where will this architecture hurt at 10x the current scale?

Deliverables:
- Component diagram (text-based) showing services/modules and their relationships
- Data model sketch for each bounded context (key entities and relationships)
- API boundary definitions between components
- Decision log: for each architectural choice, state what was chosen, what was rejected, and why

Do NOT: over-architect for hypothetical scale. Design for current requirements + one reasonable growth step.
```

## Why It Works
The chain-of-thought scaffolding (steps 1-5) forces systematic reasoning instead of jumping to a pattern. The constraint on scale ("simplest architecture that handles...") prevents over-engineering. The decision log creates accountability for choices.

## Common Mistakes
- Providing no scale context → Claude defaults to enterprise patterns
- Skipping the "what was rejected" in the decision log → no learning from the process
- Not stating team experience → Claude may recommend unfamiliar tech

## Variations
- **Microservices assessment**: Add "For each proposed service, justify why it can't be a module in the monolith."
- **Migration**: Add "Current architecture: {{DESCRIPTION}}. Propose a migration path, not a rewrite."
- **Serverless-first**: Add constraint "Prefer serverless/managed services. Justify any self-hosted component."
