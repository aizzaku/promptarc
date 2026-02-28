# Pattern: Evaluate Build vs. Buy

> Domains: Decision Frameworks + Software Engineering + Business Strategy

**Principles used**: Chain-of-Thought Scaffolding, Specificity Amplification

---

## When to Use
- Deciding whether to build a component in-house or use a third-party service
- Evaluating SaaS tools vs. custom development
- Any make-or-buy decision for technical components

## The Pattern

```
Should I build or buy: {{COMPONENT/CAPABILITY}}

Context:
- What it needs to do: {{REQUIREMENTS}}
- How critical it is: {{CORE_TO_THE_BUSINESS | IMPORTANT_BUT_NOT_CORE | COMMODITY}}
- Team capacity: {{AVAILABLE_ENGINEERING_TIME}}
- Budget: {{MONTHLY_BUDGET_FOR_A_SERVICE}}

Analyze both options:

BUILD:
- Estimated development time: (be specific — person-weeks, not "a while")
- Ongoing maintenance burden: (what breaks, who fixes it, how often)
- What you gain: (customization, no vendor dependency, deep integration)
- What you risk: (distraction from core product, maintenance debt, slower to market)

BUY:
- Options available: (name specific products/services with pricing)
- Vendor lock-in assessment: (how hard is it to switch later? What's the data migration cost?)
- Gap analysis: (what can't the service do that you need?)
- Total cost of ownership: (license + integration + workarounds for gaps + switching cost)

Decision framework:
- If this is a commodity (auth, email, payments): BUY unless there's a specific, articulable reason not to.
- If this is core differentiator: BUILD unless the time-to-market cost outweighs the customization benefit.
- If it's in between: What's the 18-month total cost for each option, including engineering opportunity cost?

Recommend one. State what would flip the recommendation.
```
