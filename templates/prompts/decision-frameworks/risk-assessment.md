# Pattern: Assess Risks I Might Be Blind To

> "I want to assess risks I might be blind to"

**Principles used**: Role and Perspective Framing, Chain-of-Thought Scaffolding, Specificity Amplification

---

## When to Use
- Before committing to a significant decision or plan
- When something feels too good / too smooth (where are the hidden risks?)
- Pre-mortem exercise for a project or strategy

## The Pattern

```
I'm about to: {{PLAN/DECISION/ACTION}}

Here are the risks I've already identified:
{{LIST_KNOWN_RISKS}}

Act as someone who's seen similar plans fail. What am I missing?

Analyze risks in three layers:
1. Obvious risks I might be underweighting: (risks I mentioned but may not be taking seriously enough — recalibrate my assessment)
2. Hidden risks I haven't considered: (things that commonly go wrong with {{TYPE_OF_PLAN}} that I haven't mentioned)
3. Black swans: (unlikely but catastrophic scenarios — what's the tail risk?)

For each risk:
- Probability: High (>50%) / Medium (15-50%) / Low (<15%)
- Impact: Catastrophic / Significant / Manageable
- Reversibility: Can I recover from this? How long?
- Early warning signal: What would I observe BEFORE this risk materializes?
- Mitigation: What can I do NOW to reduce probability or impact?

Rank the risks by: probability × impact × (1/reversibility). Address the top 3.

Do NOT: List risks without actionable mitigation. "The market might not exist" isn't useful without "Here's how to validate market existence before committing resources."
```

## Why It Works
Requiring early warning signals shifts risk management from reactive to proactive. The three-layer structure catches both underweighted known risks and unknown unknowns. The ranking formula prevents treating all risks equally.

## Common Mistakes
- All risks rated "medium" → nothing is prioritized
- No mitigation actions → risk register that doesn't reduce risk
- Only considering technical risks for technical projects → missing people, market, and timing risks
