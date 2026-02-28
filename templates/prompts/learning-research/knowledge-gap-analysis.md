# Pattern: Find What I Don't Know That I Don't Know

> "I want to find what I don't know that I don't know"

**Principles used**: Chain-of-Thought Scaffolding, Role and Perspective Framing, Specificity Amplification

---

## When to Use
- Entering a new domain and want to know what you're missing
- About to make a decision and want to stress-test your knowledge
- Feel like you understand something but suspect there are blind spots

## The Pattern

```
I think I understand {{TOPIC/DOMAIN}} well enough to {{GOAL}}.

Here's what I currently know (or believe):
{{LIST_YOUR_CURRENT_UNDERSTANDING — bullet points of key beliefs/knowledge}}

Act as an expert in this domain who's evaluating whether I'm ready to {{GOAL}}.

1. Where am I right? (Confirm what I've got correct — briefly)
2. Where am I wrong? (Correct any misconceptions — explain why my belief is wrong)
3. Where am I incomplete? (What important things do I know exist but haven't learned deeply enough?)
4. Where am I blind? (What important aspects haven't I mentioned at all — things I don't even know to ask about?)

For category 4 (blind spots), rank them by:
- How likely this gap is to cause problems if ignored
- How easy it is to fill the gap

Start with the high-impact, easy-to-fill blind spots — best ROI for my learning time.
```

## Why It Works
Having the user state their current understanding gives Claude a baseline to evaluate against. The four-category framework (right / wrong / incomplete / blind) ensures complete coverage. Ranking blind spots by impact × effort makes the output immediately actionable.

## Common Mistakes
- Not listing current understanding → Claude doesn't know what to evaluate
- Listing too little ("I know some stuff about it") → evaluation can't be specific
- Not specifying the goal → Claude can't determine which gaps matter for YOUR context
