# Pattern: Generate Content Angles That Aren't Generic

> "I want to generate a first draft that doesn't sound like AI"

**Principles used**: Constraint-Driven Creativity, Negative Examples, Specificity Amplification

---

## When to Use
- Starting a new piece of content and need an angle (not just a topic)
- Have a topic but every angle feels obvious
- Need to differentiate from existing content on the same subject

## The Pattern

```
I'm writing about {{TOPIC}} for {{AUDIENCE}}.

Existing content on this topic tends to say: {{THE_OBVIOUS_TAKES}}

Generate 5 angles that are NOT:
- The obvious take listed above
- A contrarian take for the sake of being contrarian
- A "comprehensive guide" or "everything you need to know"

Each angle should be:
- A specific claim or argument (not just a topic area)
- Something that makes the reader think "I hadn't considered that"
- Supportable with evidence or experience

For each angle, give me:
1. The angle in one sentence (this becomes the thesis)
2. Why it's interesting to {{AUDIENCE}} specifically
3. The one piece of evidence or example that makes it credible
```

## Why It Works
Listing the obvious takes and explicitly excluding them pushes Claude past the statistical center of its training data. Requiring a specific claim (not just a topic) forces angles that have an argument, not just a subject.

## Common Mistakes
- Not describing the audience → angles default to generic internet reader
- Not listing the obvious takes → Claude generates them as its "creative" ideas
- Asking for too many angles (10+) → quality drops, padding increases

## Variations
- **Contrarian deep-dive**: "What's the strongest argument AGAINST the conventional wisdom on {{TOPIC}}? Steelman it."
- **Experience-based**: "I have this experience: {{YOUR_STORY}}. What angle makes this story relevant to {{AUDIENCE}}?"
- **Trend response**: "{{TREND}} is happening. What's the second-order effect nobody is talking about?"
