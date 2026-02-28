# /arc-kickoff — Full Project Interview

You are conducting a structured project kickoff interview. This is a one-time investment that pays back across every future task in this project.

Tell the user: "This interview takes 15-30 minutes and builds the context that makes every future request faster and more accurate. I'll ask questions in small groups — answer as briefly or in as much detail as you want."

---

## Phase 1: Universal questions

Ask 2-3 questions at a time. Acknowledge the answer before continuing. Do not rush.

**Batch 1:**
- What is this project? Describe it in your own words, not a pitch.
- Who is the end user? Be specific — not "developers" but "backend engineers at mid-size companies who are already using Kubernetes."

**Batch 2 (after acknowledging batch 1):**
- What's the one thing this project must do well? If it does only one thing, what is it?
- What's explicitly out of scope? What are you deliberately not doing?

**Batch 3:**
- What's the timeline? Is there a hard deadline or a soft target?
- What's the quality bar? (prototype speed / MVP reliability / production correctness)
- What hard constraints exist that aren't negotiable? Tech stack, budget, regulations, team skills.

**Batch 4:**
- What existing work does this build on? Prior codebase, prior research, prior strategy docs?
- What decisions have already been made that we shouldn't revisit?

**Batch 5:**
- Who else is involved? Stakeholders, collaborators, reviewers?
- Who makes the final call when there's disagreement?

**Batch 6:**
- How will success be measured? Quantitatively if possible.
- What does "done" look like for the first milestone?

**Batch 7:**
- What's the biggest risk? What's most likely to go wrong?
- What's still genuinely open and undecided?

After each batch: give a one-sentence acknowledgment that shows you heard the answer ("Got it — so the constraint is X, not Y") before asking the next batch. Do not summarize extensively.

---

## Phase 2: Domain-specific questions

Based on the domain in CLAUDE.md (or ask if CLAUDE.md doesn't exist yet), run the relevant checklist. Ask 3-4 questions at a time.

**Software Engineering:** architecture decisions already made, existing test coverage, deployment environment, performance requirements, external integrations, team's primary language expertise, rollback strategy.

**Content Publishing:** target audience literacy level, SEO requirements, publication cadence, brand voice examples (link or paste), approval workflow, content lifecycle (evergreen vs. dated), distribution channels.

**Business Strategy:** current stage (pre-product / post-revenue / scaling), known competitors and how they're differentiated, customer acquisition hypothesis, unit economics targets, board or investor constraints.

**Learning / Research:** research question or hypothesis, sources already reviewed, methodology constraints, output format (paper / internal report / personal notes), deadline, audience for findings.

**Productivity:** current workflow being replaced or augmented, friction points in the current system, tools already in use that must integrate, definition of "captured" vs. "done," review cadence.

**Decision Frameworks:** decision frequency (one-off vs. recurring), stakeholders who must align on the framework, criteria that are non-negotiable inputs, how decisions will be documented and revisited.

**Generic:** skip domain-specific phase.

---

## Phase 3: Generate the Project Brief

Write a Project Brief directly in the chat (not to a file yet). Format:

```
## Project Brief — {{PROJECT_NAME}}
Date: {{TODAY}}

### What this project is
[2-3 sentences from the user's own description, not paraphrased into corporate language]

### Core constraints
[Bulleted list of the hard non-negotiables that came up: timeline, tech, budget, scope limits]

### Decisions already made
[Bulleted list — what's locked, what's not up for debate]

### What's still open
[Bulleted list of genuinely undecided questions]

### Initial approach
[Your read on how to tackle this, based on the interview — 3-5 sentences]

### How success is measured
[From their answer — be specific, use their numbers if they gave any]
```

After showing the brief, ask: "Does this capture it accurately? Anything wrong or missing?"

Revise if they correct anything.

---

## Phase 4: Update CLAUDE.md

**Voice section:** Based on how the user communicated during this interview, fill in the Voice section of CLAUDE.md:

Observe and record:
- Vocabulary: did they use technical jargon freely, or stay plain? Domain-specific terms they used naturally.
- Tone: direct and terse? Narrative and exploratory? Precise and formal?
- Format preferences: did they bullet everything, or write in sentences? Did they ask for examples?
- Length tolerance: did they give long answers or short ones? That signals how long your responses should be.

Write the Voice section with specific observations, not generic labels. "Uses 'surface area' and 'blast radius' as natural vocabulary — technical audience assumed" is useful. "Professional tone" is not.

**Update CLAUDE.md silently** — no need to show the diff unless the user asks.

---

## Phase 5: Log decisions

Add 2-3 entries to `tasks/decisions.md` for significant constraints or choices discussed. Use the format from the decisions template: date, what was decided, why, who decided.

Only log genuinely significant decisions — not every answer is a decision. Log: technology choices, scope exclusions, quality trade-offs, hard deadlines.

---

## Phase 6: Handoff

Tell the user: "Ready to start. What's the first task?"

Nothing else. Do not summarize the interview back at them. Do not offer a menu of options. Just ask what's next.
