# /arc-kickoff — Full Project Interview

You are conducting a structured project kickoff interview. This is a one-time investment that pays back across every future task in this project.

Tell the user: "Kickoff interview — two phases. Phase 1 is 8 core questions (~10 min). After that, I'll ask if you want 8-12 domain-specific questions for deeper context. Answer as briefly or in as much detail as you want."

---

## Phase 1: Core questions

**Show progress before each batch**: "Phase 1 of 2 — Core (Q[N] of 8)"

Ask 2 questions at a time. Give a one-sentence acknowledgment before the next batch — show you heard the answer ("Got it — so the constraint is X, not Y"). Do not summarize extensively.

---

**Q1–2** *(Phase 1 — Core | Q1 of 8)*

- What is this project? Describe it in your own words, not a pitch.
- Who is the end user or primary beneficiary? Be specific — not "developers" but "backend engineers at mid-size B2B SaaS companies who already use Kubernetes."

---

**Q3–4** *(Phase 1 — Core | Q3 of 8)*

- What's the one thing this project must do well? If it only does one thing, what is it?
- What's explicitly out of scope? What are you deliberately not building?

---

**Q5–6** *(Phase 1 — Core | Q5 of 8)*

- What's the quality bar? Present as a numbered list:
  1. Prototype — fastest path, rough edges OK
  2. MVP — functional and shippable, not polished
  3. Production — reliable, maintainable, ready for real users
  4. Polished — high craft, presentation and detail matter

- What hard constraints exist that aren't negotiable? (Tech stack, budget, regulation, timeline, team skills.) If none, say none.

---

**Q7–8** *(Phase 1 — Core | Q7 of 8)*

- What's the biggest risk? What's most likely to derail this?
- How will success be measured? Quantitatively if possible — what number or outcome signals this worked?

---

## Opt-in to Phase 2

After Phase 1, tell the user:

"Core complete. Want to go deeper? I'll ask 8-12 domain-specific questions that sharpen the context further and unlock more tailored templates. It takes about 10 more minutes.

1. Yes — continue to domain-specific questions
2. No — generate the brief now"

If they say **No** (or anything equivalent): skip to Phase 3.
If they say **Yes**: continue to Phase 2.

---

## Phase 2: Domain-specific questions

**Show progress before each batch**: "Phase 2 of 2 — [Domain] (Q[N] of ~[TOTAL])"

Identify the domain from:
1. `CLAUDE.md` if it exists and has a domain set
2. If not, ask: "What's the primary domain for this project?" — present as a numbered list:
   1. Software Engineering
   2. Content & Writing
   3. Business Strategy
   4. Design / UX
   5. Data & Analytics
   6. Legal & Compliance
   7. Sales / GTM
   8. Learning & Research
   9. Productivity
   10. Decision-Making
   11. Generic (skip to Phase 3)

Ask 3 questions at a time from the relevant checklist in `templates/kickoff/`. Use the full checklist for that domain, prioritizing the required questions and skipping conditional questions that clearly don't apply based on Phase 1 answers.

**Domain → checklist file map:**

| Domain | Checklist |
|--------|-----------|
| Software Engineering | `templates/kickoff/software-eng-checklist.md` |
| Content & Writing | `templates/kickoff/content-checklist.md` |
| Business Strategy | `templates/kickoff/business-strategy-checklist.md` |
| Design / UX | `templates/kickoff/design-ux-checklist.md` |
| Data & Analytics | `templates/kickoff/data-analytics-checklist.md` |
| Legal & Compliance | `templates/kickoff/legal-compliance-checklist.md` |
| Sales / GTM | `templates/kickoff/sales-gtm-checklist.md` |
| Learning & Research | `templates/kickoff/learning-research-checklist.md` |
| Productivity | `templates/kickoff/productivity-checklist.md` |
| Decision-Making | `templates/kickoff/decision-frameworks-checklist.md` |
| Generic | skip Phase 2 entirely |

---

## Phase 3: Generate and save the Project Brief

### 3a — Generate the brief

Write the brief in the chat first:

```
## Project Brief — {{PROJECT_NAME}}
Date: {{TODAY}}

### What this project is
[2-3 sentences from the user's own description — their words, not corporate paraphrase]

### Core constraints
[Bulleted list of hard non-negotiables: timeline, tech, budget, scope limits]

### Decisions already made
[Bulleted list — what's locked, not up for debate]

### What's still open
[Bulleted list of genuinely undecided questions that need resolution]

### Initial approach
[Your read on how to tackle this — 3-5 sentences grounded in the interview answers]

### How success is measured
[Specific metrics or outcomes from their answer. Use their numbers if they gave any.]
```

Ask: "Does this capture it accurately? Anything wrong or missing?"

Revise if they correct anything.

### 3b — Save the brief

Once confirmed accurate, write the brief to `tasks/brief.md`.

If `tasks/brief.md` already exists (from a previous kickoff), prepend the new brief above the old one — do not overwrite it. Add a `---` divider between entries.

---

## Phase 4: Calibrate voice and update CLAUDE.md

### Voice observation rubric

Based on how the user communicated during this interview, fill in the Voice section of `CLAUDE.md`. Observe and record **specific signals**, not generic labels:

| What to observe | What to record |
|-----------------|----------------|
| Vocabulary | Technical terms they used naturally (e.g., "idempotent", "blast radius", "surface area") → assume that vocabulary is shared. Plain language → calibrate down. |
| Tone | Terse one-liners → be terse. Full paragraphs → match length. Exploratory/narrative → engage discursively. |
| Format | If they bulleted their answers → they likely want bullets. If prose → prose. If they asked for examples → include examples by default. |
| Length signal | Short answers (1-2 sentences) → short responses. Long answers → they want depth. |
| Directness | Did they state opinions strongly, or hedge? → Match their directness in recommendations. |

**Write the Voice section with specific observations:**
- Good: "Uses 'surface area' and 'blast radius' as natural vocabulary — technical audience assumed. Terse answers, 1-2 sentences each — keep responses short and direct."
- Bad: "Professional tone, clear communicator."

Update CLAUDE.md silently. Show the diff only if the user asks.

---

## Phase 5: Log decisions

Add 2-3 entries to `tasks/decisions.md` for significant constraints or choices that came up. Only log genuinely significant decisions — technology choices, scope exclusions, quality tradeoffs, hard deadlines.

Use the format from the decisions template: date, context, options considered, decision, rationale, revisit conditions.

---

## Phase 5: CLAUDE.md validation (gap closure)

This step verifies that CLAUDE.md is actually doing its job — not just that it exists.

### 5a — Generate a synthetic test

Based on the domain, construct a realistic sample request the user would make in a real session. Use the domain-appropriate examples:

| Domain | Sample request |
|--------|---------------|
| Software Engineering | "Add rate limiting to the API endpoints." |
| Content & Writing | "Write an intro section for the feature announcement." |
| Business Strategy | "Draft the exec summary for the Q3 review." |
| Design / UX | "Design the empty state for the dashboard." |
| Data & Analytics | "Write a query for the weekly retention report." |
| Legal & Compliance | "Draft a mutual NDA for the enterprise partnership." |
| Sales / GTM | "Write the first email in the outbound sequence." |
| Other domains | Use a realistic first task for the project described in the brief. |

### 5b — Self-evaluate as a fresh session

Answer the sample request AS IF you are starting a new session with only `CLAUDE.md` as context. Do not use any information from the kickoff interview beyond what was written to CLAUDE.md.

Then evaluate your own answer against this rubric:

| Signal | Good | Bad |
|--------|------|-----|
| Stack specificity | References the actual tech stack by name | "Choose a framework that fits your needs" |
| Constraint application | Applies the quality bar, hard constraints | Ignores them, goes generic |
| Voice match | Matches the tone calibrated above | Generic professional tone |
| Domain vocabulary | Uses domain terminology naturally | Explains basics the user already knows |
| Would be different for another project | Yes — this answer couldn't be copy-pasted to a different project | No — this is a generic answer |

### 5c — Identify and close gaps

If the self-evaluation reveals generic output: CLAUDE.md doesn't have enough specific context. Identify what's missing and add it now.

Common gaps and where to add them:

| Gap type | Fix |
|----------|-----|
| Stack not specific enough | Add exact versions/libraries to DEFAULTS |
| Quality bar not translating to rules | Add 2-3 concrete enforcement rules to NON-NEGOTIABLE |
| Voice calibration generic | Add specific vocabulary signals observed during interview |
| Domain constraints missing | Add to NON-NEGOTIABLE from the domain overlay's checklist |
| Project-specific anti-patterns | Add 2-3 "DO NOT" rules specific to this project |

After adding: run the synthetic test again mentally. If the answer would now be specific, proceed. If still generic, add more context and repeat once.

### 5d — Report to the user

Tell the user what was tested and what (if anything) was added:

> "Tested CLAUDE.md against a sample task: _'{{SAMPLE_REQUEST}}'_. {{ONE OF: 'Context was specific — no gaps found.' / 'Found {{N}} gaps and added them: {{WHAT_WAS_ADDED}}.'}}"

---

## Phase 6: Initialize STATE.md

Create `tasks/STATE.md` from `templates/STATE.md`, filling in values from this session:

- `{{PROJECT_NAME}}` → project name from the brief
- `{{DATE}}` → today's date
- `{{DOMAIN}}` → primary domain selected
- `{{QUALITY_BAR}}` → quality bar label
- `{{CURRENT_FOCUS}}` → "Kickoff complete — awaiting first task"
- `{{WHAT_FINISHED}}` → "arc-kickoff interview, project brief, CLAUDE.md calibration"
- `{{NEXT_ACTION}}` → first task if user mentioned one, otherwise "TBD"
- `{{KEY_DECISIONS}}` → 3-5 decisions from `tasks/decisions.md`, one line each
- `{{OPEN_QUESTIONS}}` → open questions from the brief's "What's still open" section
- `{{CLAUDE_MD_STATUS}}` → "✅ active, calibrated"
- `{{BRIEF_STATUS}}` → "✅ tasks/brief.md"
- `{{DECISIONS_STATUS}}` → "✅ tasks/decisions.md ({{N}} entries)"
- `{{VOICE_CALIBRATED}}` → "✅ yes"
- `{{LAST_CHECK_RESULT}}` → "not yet run"
- `{{LAST_CHECK_DATE}}` → "—"

---

## Phase 7: Handoff

Tell the user: "Ready to start. What's the first task?"

Nothing else. No summary. No menu of options. Just ask what's next.
