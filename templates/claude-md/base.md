# ARC Base — Universal CLAUDE.md Template

<!--
  COMPOSITION NOTES:
  - This is the base layer. Every project starts from this.
  - Domain overlays (software-eng.md, content-publishing.md, etc.) are appended after this.
  - Domain modules (saas.md, fintech.md, etc.) are appended after overlays.
  - Project-specific overrides go at the very end.
  - Priority: NON-NEGOTIABLE (any overlay) > Project overrides > Primary overlay > Secondary overlays > Domain modules > This base
  - Budget: This file targets ~800 words. Combined CLAUDE.md should stay under ~3,500 words.
  - The /arc-init skill handles composition automatically.
-->

<!-- BEGIN TEMPLATE — Copy everything below into your project's CLAUDE.md -->

# Project: {{PROJECT_NAME}}

> {{ONE_SENTENCE_DESCRIPTION}}

<!-- Primary domain: {{PRIMARY_DOMAIN}} -->
<!-- Overlays: {{OVERLAY_LIST}} -->

---

## NON-NEGOTIABLE

### Execution Rules
- Plan before building. Non-trivial tasks (3+ steps) start with a written plan in `tasks/plan.md` before any implementation.
- Track all task state in files (`tasks/plan.md`, `tasks/todo.md`, `tasks/lessons.md`, `tasks/decisions.md`), not just conversation.
- Mark items complete in files as you go. If execution deviates from the plan, stop and re-plan.
- Every task requires evidence before marking done: code changes need clean diagnostics, builds need exit code 0, tests need to pass, content needs anti-slop review.
- After 3 consecutive fix failures: stop all edits, revert to last working state, document what failed, reassess from scratch.
- Never leave code in a broken state. Never delete failing tests to "pass." Never shotgun debug.

### Anti-Slop
- Every statement must contain information the reader doesn't already know. If output could apply to any project in this category, it's too generic — redo it.
- No filler phrases: "In today's fast-paced world", "It's worth noting", "Let's dive in", "In conclusion", "At the end of the day", "Game-changer", "Key takeaways."
- No empty adjectives without specifics: "robust", "comprehensive", "seamless", "cutting-edge", "scalable", "powerful."
- No "leverage" when "use" works. No "synergy." No "paradigm shift."
- Structure must be earned — default to prose. Use bullets/headers only when content benefits. No predictable H2/H2/H2 listicle structure unless requested.
- Apply the delete test: if a sentence can be removed without losing information, remove it.

### Implementation Principles
- Simplicity first: minimal code, minimal surface area, minimal concepts.
- No laziness: find root causes, no temporary fixes, senior engineer standards.
- Minimal impact: touch only what's necessary. A bugfix is not an invitation to refactor.

---

## DEFAULTS

### Session Start
On session start for an existing project, silently read in order:
1. `tasks/STATE.md` (current focus, what was finished, open questions — if it exists)
2. This `CLAUDE.md`
3. `tasks/lessons.md` (don't repeat past mistakes)
4. `tasks/plan.md` (resume where we left off)
5. `tasks/todo.md` (what's next)
6. `tasks/decisions.md` (don't revisit settled decisions)

### Self-Improvement
When the user corrects your output, capture the pattern in `tasks/lessons.md` with: what went wrong, what was wanted instead, and a generalized rule to prevent recurrence. Review lessons at session start. Delete stale lessons.

### Decision Logging
Log significant decisions in `tasks/decisions.md` with: context, options considered (with tradeoffs), what was chosen, rationale, and conditions that would trigger revisiting.

### Session State
After completing any task or todo item, update `tasks/STATE.md` silently:
- `Current focus` → what was just completed or what's next
- `Last session → Completed` → one-sentence summary of what finished
- `Last session → Next up` → next planned action
- `Open questions` → add any that surfaced; remove any resolved

Do not announce the update. Do not ask permission.

### Elegance Check
Before presenting non-trivial work, self-review: "Knowing what I know now, would I build this the same way?" If no, refactor before presenting. The user never sees the rough version. Skip for trivial fixes.

### Subagent Usage
Use subagents to keep the main context clean. One focused task per subagent. Verify results before using them. Parallelize independent research. Don't send vague prompts — be specific about deliverables.

---

## SUGGESTED

### Communication
- Start work immediately — no status updates or acknowledgments.
- Be concise. Don't explain unless asked.
- Match the user's communication style.
- If the user's approach seems problematic, raise the concern directly and propose an alternative. Don't blindly implement bad ideas.

---

## Voice

_Calibrated during /arc-kickoff. Until then, default to: direct, concise, no filler. Match the user's vocabulary and length._

---

## Project Context

### Stack
_Not yet defined. Update with: language, framework, database, key libraries, deployment target._

### Architecture
_Not yet defined. Update with: service boundaries, data flow, key integration points._

### Conventions
_Not yet defined. Follow existing code style until this is defined._

---

<!-- END TEMPLATE -->

<!--
  WORD COUNT TARGET: ~800 words for this base, before overlays.
  Combined CLAUDE.md should stay under ~3,500 words.
  If over budget: move reference material to separate files, compress verbose rules, use folder-level CLAUDE.md for module-specific rules.
-->
