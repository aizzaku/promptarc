# Pattern: Explain a Concept at the Right Depth

> "I want to explain a concept at the right depth for my level"

**Principles used**: Context Layering, Few-Shot Calibration, Role and Perspective Framing

---

## When to Use
- Need to understand a specific concept (not an entire domain)
- Existing explanations are either too basic or too advanced
- Want a calibrated explanation that respects what you already know

## The Pattern

```
Explain {{CONCEPT}}.

I already understand: {{RELATED_CONCEPTS_YOU_KNOW}}
I don't understand: {{SPECIFIC_CONFUSION_OR_GAP}}
I need this to: {{PRACTICAL_APPLICATION — build X, decide Y, explain to Z}}

Explain it as: {{CHOOSE_ONE}}
a) Analogy-first: Start with an analogy from {{FAMILIAR_DOMAIN}}, then get precise
b) Mechanism-first: Start with how it actually works, then implications
c) Why-first: Start with why this matters, then how it works

Include:
- The one thing most explanations get wrong or skip
- An edge case that tests whether I really understand it
- How this connects to {{RELATED_CONCEPT_I_KNOW}}

Do NOT: Start with a definition. I can read definitions. I need understanding.
```

## Why It Works
Specifying what you already know prevents re-explaining basics. The "one thing most explanations skip" targets the highest-value knowledge gap. The edge case serves as a comprehension test.

## Common Mistakes
- Not stating what you already know → explanation starts from scratch
- Not stating why you need it → explanation is academic instead of practical
- Asking to "explain simply" without specifying what simplification is acceptable → important nuance gets dropped
