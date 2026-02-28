# Pattern: Turn a Business Idea into a Technical Architecture

> Domains: Business Strategy + Software Engineering

**Principles used**: Chain-of-Thought Scaffolding, Context Layering

---

## When to Use
- Have a validated business idea and need to design the technical system
- Translating business requirements into engineering decisions

## The Pattern

```
Translate this business concept into a technical architecture.

Business: {{WHAT_THE_BUSINESS_DOES}}
Revenue model: {{HOW_IT_MAKES_MONEY}}
Target users: {{WHO_AND_HOW_MANY_AT_LAUNCH}}
Scale target: {{WHERE_IT_NEEDS_TO_BE_IN_12_MONTHS}}

Work through the translation:
1. Core user flows: What are the 3-5 critical paths a user takes? (These become your engineering priorities.)
2. Data model: What are the core entities and relationships? (Derived from the business model, not assumed.)
3. Technical requirements driven by business: Which business constraints create specific technical requirements? (e.g., "real-time pricing" → WebSocket or SSE; "PCI compliance" → specific infrastructure)
4. Build order: What's the minimum viable technical stack for launch? What gets added at each growth stage?
5. Buy vs. build: For each component, is it core (build it) or commodity (buy/use a service)?

Do NOT: Design for the 12-month target from day 1. Design for launch, with a clear path to scale.
```
