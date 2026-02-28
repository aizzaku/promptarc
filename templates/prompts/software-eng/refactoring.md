# Pattern: Refactor Without Breaking Things

> "I want to refactor without breaking things"

**Principles used**: Constraint-Driven Creativity, Chain-of-Thought Scaffolding, Specificity Amplification

---

## When to Use
- Code works but is hard to maintain, extend, or understand
- Preparing code for a new feature that the current structure can't support cleanly
- Reducing tech debt in a targeted area

## The Pattern

```
I need to refactor {{MODULE/FILE/FUNCTION}}.

Current state:
- What it does: {{DESCRIPTION}}
- Why it needs refactoring: {{SPECIFIC_PAIN_POINT — not "it's messy" but "adding a new payment provider requires changing 7 files"}}
- Current code: {{PASTE_CODE}}

Constraints:
- All existing tests must continue to pass
- External API surface (function signatures, return types) must not change unless I explicitly approve
- No new dependencies
- This should be done in {{1/2/3}} focused commits, each independently correct

Plan the refactoring:
1. What's the target state? (Describe the structure after refactoring)
2. What are the transformation steps? (Each step must leave the code in a working state)
3. For each step: what's the change and how do you verify it didn't break anything?

Then implement step 1. I'll review before continuing.
```

## Why It Works
The constraint on independently-correct commits prevents a "big bang" refactor that can't be reviewed incrementally. Requiring the external API to stay stable prevents scope creep. Planning the target state first ensures the refactoring has a destination, not just "make it better."

## Common Mistakes
- "Make it cleaner" without defining what clean means → aimless changes
- Not requiring incremental steps → one giant commit that's impossible to review
- Changing behavior during refactoring → combining refactoring with feature work (these should be separate)

## Variations
- **Extract module**: "This file is 800 lines. Identify cohesive groups of functionality and propose how to split them into separate modules without changing behavior."
- **Pattern migration**: "Convert this from {{PATTERN_A}} to {{PATTERN_B}}. Example of target pattern: {{EXAMPLE}}."
- **Type hardening**: "Add strict types to this module. Start with the public API surface, then internal functions. Flag any `any` types that can't be eliminated and explain why."
