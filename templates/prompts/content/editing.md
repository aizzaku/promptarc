# Pattern: Edit My Draft Without Losing Voice

> "I want to edit my draft for clarity without losing voice"

**Principles used**: Role and Perspective Framing, Constraint-Driven Creativity, Negative Examples

---

## When to Use
- You have a draft that needs tightening
- Content is too long and needs cutting
- Clarity issues but you don't want the voice "corrected" into generic prose

## The Pattern

```
Edit this draft. My #1 priority is: {{TIGHTEN / CLARIFY / RESTRUCTURE / CUT_LENGTH}}.

Draft:
{{PASTE_DRAFT}}

Rules:
- Preserve my voice. If a sentence sounds like me (even if imperfect), keep the voice and fix only the clarity issue.
- Cut ruthlessly. Apply the delete test: if a sentence doesn't add information, delete it.
- Don't add content. You can rearrange, cut, and tighten — but don't insert new ideas or examples.
- Flag (don't fix) any factual claims that seem unsupported.
- Show your changes as: [ORIGINAL → EDITED] for significant changes so I can review the reasoning.

Target length: {{TARGET}} (currently {{CURRENT_LENGTH}})
```

## Why It Works
The "preserve voice" instruction with the specific guidance on imperfect-but-authentic sentences prevents Claude from smoothing everything into its default register. Showing changes as diffs makes the editing transparent and reviewable.

## Common Mistakes
- Not specifying the #1 editing priority → Claude changes everything equally, losing focus
- Not saying "don't add content" → Claude pads with its own material
- Giving a rough draft to edit when what you need is a rewrite (different pattern)

## Variations
- **Copy edit only**: "Fix grammar, spelling, and punctuation. Do NOT change sentence structure, word choice, or voice."
- **Structure edit**: "The content is fine but the structure isn't working. Propose a reordering that creates better flow. Don't rewrite — just show the new section order with one-line rationale."
- **Cut to length**: "This is {{CURRENT}} words. Cut to {{TARGET}} words. Prioritize keeping: arguments and evidence. Cut: transitions, repeated points, caveats."
