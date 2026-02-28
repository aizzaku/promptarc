# Mental Models for Prompting

How to think about what happens when you give Claude instructions. These models aren't technically precise descriptions of transformer architectures — they're useful abstractions that help you predict and improve prompt behavior.

---

## Model 1: The Probability Funnel

Think of Claude's output as a funnel. At the top, every possible response exists. Each piece of context you provide narrows the funnel, eliminating categories of responses.

```
All possible responses
    │
    ├── Role: "senior engineer" ──→ eliminates casual, non-technical responses
    │
    ├── Domain: "payment processing" ──→ eliminates non-fintech solutions
    │
    ├── Task: "design retry logic" ──→ eliminates unrelated code
    │
    ├── Constraint: "idempotent" ──→ eliminates non-idempotent designs
    │
    └── Example: specific format ──→ eliminates wrong output shapes
        │
        ▼
    Narrow band of good responses
```

**Implication**: Every prompt element is a filter. If your output is too broad/generic, you haven't added enough filters. If it's too narrow/wrong, one of your filters is pointing in the wrong direction.

**Common mistake**: Adding more text without adding more filters. A 500-word prompt with one filter performs worse than a 50-word prompt with five filters.

---

## Model 2: The Context Window as Working Memory

Claude's context window is analogous to human working memory — limited capacity, recency bias, and interference effects.

**Recency bias**: Instructions near the end of the prompt are weighted more heavily than instructions at the beginning. Critical rules go at the end (or are repeated at the end).

**Interference**: Contradictory instructions don't average out — they create confusion. If one section says "be concise" and another says "explain thoroughly," Claude oscillates unpredictably between both.

**Capacity**: There's a practical limit to how many distinct instructions Claude can track simultaneously. Past ~3,500 words of CLAUDE.md rules, instruction-following starts degrading. Not because Claude can't read longer prompts, but because conflicting or overlapping rules create interference.

**Implication**: Treat your CLAUDE.md like working memory, not a filing cabinet. Every rule has a cost — it competes with other rules for attention. Fewer, clearer rules outperform many vague ones.

---

## Model 3: The Expert Impersonation

When you assign Claude a role, think of it as Claude wearing a mask of the most likely behavior for that role across its training data.

**Strong masks**: Roles with consistent, well-documented behavior patterns. "Copy editor at The New York Times" produces predictable output because that role has a narrow, well-defined behavioral range.

**Weak masks**: Roles that are vague or inconsistent in training data. "Creative thinker" means different things in different contexts — Claude doesn't know which version you want.

**Mask + context interaction**: The mask sets default behaviors, but specific instructions override them. A "senior engineer" mask defaults to thorough code review, but you can override: "Focus only on security issues, ignore style."

**Implication**: Choose roles where the default behaviors align with what you want. Then use specific instructions only for deviations from that default. This is more efficient than specifying everything from scratch.

---

## Model 4: The Instruction Hierarchy

Not all instructions carry equal weight. Claude processes them in an implicit hierarchy:

```
1. System prompt (highest priority — but you don't control this in Claude Code)
2. CLAUDE.md files (loaded as high-priority context)
3. Conversation history (accumulated context)
4. Current message (the immediate request)
5. Tool results / retrieved context (treated as data, not instructions)
```

Within CLAUDE.md, priority is influenced by:
- **Position**: Later rules can override earlier ones (recency)
- **Specificity**: Specific rules override general ones
- **Explicitness**: "NEVER do X" overrides "try to do Y" when they conflict
- **Repetition**: Rules stated multiple times (in different words) are weighted more heavily

**Implication**: Put your NON-NEGOTIABLE rules in prominent positions with strong language. Put SUGGESTED guidelines in less prominent positions with softer language. The structure of the document communicates priority.

---

## Model 5: The Training Distribution

Claude's default behavior is the average of its training data for any given context. Your prompt shifts it away from that average.

**Why this matters**: If you want output that's common in training data (standard code patterns, conventional business analysis), you need minimal prompting. If you want output that's rare in training data (unconventional approaches, specific voice, novel structure), you need heavy prompting.

**The generic gravity well**: Without strong prompt signals, Claude falls back toward the statistical center — the most "average" response for the context. This is why generic output happens. It's not laziness; it's the default state.

**Implication**: The further your desired output is from "average," the more explicit your prompt needs to be. A standard REST API needs minimal instruction. A novel architectural pattern needs extensive instruction with examples.

---

## Model 6: The Conversation as Demonstration

Everything in the conversation — including your messages — teaches Claude what you want. If you write formally, Claude writes formally. If you use bullet points, Claude uses bullet points. If you accept mediocre output, Claude calibrates to mediocre.

**The feedback loop**: Claude matches the quality level you demonstrate and accept. Pushing back on bad output ("This is too generic. I need specific numbers for MY market, not generalizations about the industry.") recalibrates Claude's target quality.

**The momentum effect**: Early messages in a conversation set patterns that persist. A strong opening message with clear expectations produces better output throughout the session than a vague opening followed by corrections.

**Implication**: Your first message matters disproportionately. Invest time in it. And when Claude produces something below your bar, reject it explicitly rather than accepting and moving on. The correction improves all subsequent output in the conversation.

---

## Model 7: The Attention Budget

Claude doesn't process all parts of the context equally. It allocates more "attention" to certain regions:

- **Structural markers**: Headers, bold text, numbered lists, and code blocks attract more attention than plain paragraphs
- **Instruction words**: "MUST", "NEVER", "ALWAYS", "IMPORTANT" attract more attention than softer language
- **Recent context**: The last ~2000 tokens get disproportionate attention
- **Repeated patterns**: Information that appears multiple times is weighted higher

**Implication**: Format matters. A critical rule buried in a plain paragraph inside a long document may be overlooked. The same rule in a bold header or a `## NON-NEGOTIABLE` section gets followed consistently.

**Anti-pattern**: Formatting EVERYTHING as important (all caps, all bold). When everything is emphasized, nothing is. Reserve strong formatting for genuinely critical rules.

---

## Applying These Models

These models aren't competing explanations — they're different lenses for different problems:

| When you notice... | Apply this model |
|---------------------|-----------------|
| Output is too generic | Probability Funnel — add more filters |
| Rules being ignored | Instruction Hierarchy — check positioning and strength |
| Inconsistent output across turns | Context Window — check for interference |
| Wrong tone/style | Expert Impersonation — refine the role or add examples |
| Output feels "AI-like" | Training Distribution — push harder away from the average |
| Quality degrades over conversation | Conversation as Demonstration — recalibrate with explicit feedback |
| Some rules followed, others not | Attention Budget — check formatting and emphasis |
