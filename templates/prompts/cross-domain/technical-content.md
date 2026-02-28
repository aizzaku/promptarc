# Pattern: Write a Technical Blog Post About Something I Built

> Domains: Software Engineering + Content Publishing

**Principles used**: Context Layering, Constraint-Driven Creativity, Few-Shot Calibration

---

## When to Use
- Writing about a technical project, decision, or lesson
- Creating content that serves both engineers and non-engineers
- Turning a post-mortem, migration, or build into a publishable piece

## The Pattern

```
I built/did {{TECHNICAL_THING}}. I want to write about it.

What happened: {{THE_STORY — problem, approach, outcome}}
The interesting part: {{WHAT_WOULD_SURPRISE_OR_HELP_OTHER_ENGINEERS}}
Target reader: {{AUDIENCE — junior devs / senior engineers / engineering managers / mixed}}

Write the post with this structure:
1. Hook: The problem or result that makes someone click (NOT "In this post, I'll explain...")
2. Context: Just enough background that the reader understands the constraints (1-2 paragraphs, not a literature review)
3. The journey: What you tried, what worked, what failed — with enough technical detail to be useful, not so much it's a tutorial
4. The insight: What did you learn that the reader can apply to THEIR work?
5. Close: The takeaway or open question (NOT a summary)

Include actual code/config for the critical parts. Don't over-explain the code — show it, annotate the non-obvious parts, move on.

Voice: {{VOICE — e.g., "post-mortem style, honest about mistakes" / "tutorial-ish but opinionated" / "conference talk energy"}}
Length: {{TARGET_WORD_COUNT}}
```
