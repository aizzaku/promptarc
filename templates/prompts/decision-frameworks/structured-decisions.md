# Pattern: Make a Decision Between Multiple Options

> "I want to make a decision between multiple options"

**Principles used**: Chain-of-Thought Scaffolding, Constraint-Driven Creativity, Negative Examples

---

## When to Use
- Choosing between 2-5 concrete options
- Decision has real consequences (not trivially reversible)
- Need structured analysis, not just gut feeling

## The Pattern

```
I need to decide between: {{OPTION_A}}, {{OPTION_B}}, {{OPTION_C}}

Context: {{WHY_THIS_DECISION_MATTERS}}
Timeline: {{WHEN_I_NEED_TO_DECIDE}}
Reversibility: {{ONE_WAY_DOOR | TWO_WAY_DOOR | PARTIALLY_REVERSIBLE}}

What matters most to me (ranked):
1. {{CRITERION_1}} (non-negotiable)
2. {{CRITERION_2}} (important)
3. {{CRITERION_3}} (nice to have)

For each option:
1. How well does it satisfy each criterion? (Strong / Adequate / Weak — with evidence, not just labels)
2. What's the best-case outcome in 12 months?
3. What's the worst-case outcome in 12 months?
4. What do I give up by choosing this? (Opportunity cost)
5. Pre-mortem: If this choice fails, the most likely reason is...

Then:
- Recommend ONE option. State your confidence (high/medium/low).
- Name the single factor that drove the recommendation.
- State what would change your recommendation.

Do NOT: Present a balanced analysis where all options look equal. If I'm reading this, I need a recommendation, not a comparison table where every option has the same number of pros and cons.
```

## Why It Works
Ranked criteria prevent "it depends." Requiring one recommendation with a driving factor forces the analysis to converge. The pre-mortem identifies risks before they materialize.

## Common Mistakes
- Not ranking criteria → analysis is balanced but unhelpful
- Too many criteria (10+) → everything matters equally, decision is harder not easier
- Forgetting "do nothing" as an option → sometimes the best choice is to wait
