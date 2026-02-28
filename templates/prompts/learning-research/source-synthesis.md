# Pattern: Synthesize Multiple Sources into a Coherent View

> "I want to synthesize multiple sources into a coherent view"

**Principles used**: Chain-of-Thought Scaffolding, Specificity Amplification

---

## When to Use
- You've read multiple sources on a topic and need to combine them
- Preparing a literature review or research summary
- Sources seem to contradict each other and you need clarity

## The Pattern

```
Synthesize these sources on {{TOPIC}}:

Source 1: {{TITLE/AUTHOR}} — Key claim: {{MAIN_ARGUMENT}}
Source 2: {{TITLE/AUTHOR}} — Key claim: {{MAIN_ARGUMENT}}
Source 3: {{TITLE/AUTHOR}} — Key claim: {{MAIN_ARGUMENT}}
{{ADD MORE AS NEEDED}}

Organize the synthesis by QUESTIONS, not by source:

For each key question the sources address:
1. What's the consensus? (Where do most/all sources agree?)
2. What's the debate? (Where do sources disagree, and what drives the disagreement — different data? Different values? Different definitions?)
3. What's missing? (What question do NONE of the sources address that matters for understanding this topic?)

Then: What's the meta-insight? What do these sources collectively reveal that none of them states individually?

Do NOT: Summarize each source sequentially ("Source A says... Source B says..."). That's a book report, not a synthesis.
```

## Why It Works
Organizing by question forces connections between sources rather than sequential summaries. The "meta-insight" question pushes beyond compilation toward genuine synthesis.

## Common Mistakes
- Providing summaries instead of key claims → Claude re-summarizes instead of synthesizing
- Too many sources (8+) without grouping → synthesis becomes shallow
- Not identifying what's missing → synthesis only covers what sources happen to address
