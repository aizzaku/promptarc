# /arc-rekickoff — Mid-Project Re-Kickoff

You are conducting a structured re-orientation for a project that's already in progress. This is for projects that have drifted, changed direction, or need a reset before entering a new phase. It's NOT a full kickoff — it's focused on what's changed and what needs to be recalibrated.

Total time: 10-15 minutes.

Tell the user: "Re-orienting the project. I'll ask a few targeted questions to sync context before we continue."

---

## Phase 1: Read existing context

Before asking anything, silently read in order:
1. `tasks/STATE.md` — current project state, last session, open questions
2. `CLAUDE.md` — current project configuration
3. `tasks/decisions.md` — what's already been locked in
4. `tasks/plan.md` — where the plan currently stands
5. `tasks/todo.md` — what's pending
6. `tasks/lessons.md` — what went wrong before

If STATE.md doesn't exist: the project was initialized before this version of ARC. Create it at the end of Phase 4.
If other files don't exist: note it and proceed anyway.

---

## Phase 2: Rapid status questions

Ask 2 questions at a time. Acknowledge briefly before continuing.

**Batch 1:**
- What's changed since the project started? This could be: scope, timeline, team, constraints, technical findings, or direction.
- Is the original goal still the goal? If not, what's the actual goal now?

**Batch 2 (after batch 1):**
- What's the current state? Not what's planned — what actually exists right now?
- What's blocked or stuck? What's the thing you keep circling back to?

**Batch 3 (after batch 2):**
- What decisions have been made that we locked in — even informally? Things that are no longer up for debate.
- What's the next milestone? Not the end state — the next concrete deliverable.

---

## Phase 3: Gap analysis

Based on the answers and the existing task files, identify and state:

1. **Stale decisions**: Anything in `tasks/decisions.md` that contradicts what the user just described as current reality. Name them specifically.

2. **Plan drift**: Anything in `tasks/plan.md` that's no longer accurate given what's changed. Don't list everything — only things that would actively mislead Claude in future sessions.

3. **Missing context**: Critical information that the user mentioned but that isn't captured anywhere in the task files. Specifically: new constraints, new scope exclusions, new technical decisions.

State the gaps plainly:
```
I see X gaps between your current state and what's captured in the project files:
- [specific gap 1]
- [specific gap 2]
...
```

If there are no gaps ("everything looks current"), say so and move to Phase 4.

---

## Phase 4: Update the project files

Update the following files based on the re-kickoff conversation. Do this silently — no play-by-play. Report what you changed at the end.

**`tasks/decisions.md`**: Add any new decisions that came up. Update any decisions that have been reversed or superseded.

**`tasks/plan.md`**: If the plan has drifted, rewrite only the sections that are no longer accurate. Don't rewrite the whole thing — surgical edits only.

**`tasks/todo.md`**: Move any tasks that are no longer relevant to the Dropped section with a reason. Add any new tasks that emerged from the conversation.

**`CLAUDE.md`** (only if scope or constraints changed meaningfully): Update the relevant sections — constraints, quality bar, scope. Do NOT rewrite the Voice section unless the user explicitly asks.

**`tasks/STATE.md`**: Always update, regardless of whether other files changed.
- Update `Current focus` to what emerged from this re-kickoff
- Update `Last session → Completed` to what was finished before this re-kickoff
- Update `Last session → Next up` to the first task in the new phase
- Update `Accumulated decisions` with any new locked decisions
- Update `Open questions` — remove anything resolved, add anything new
- Update the date in the header line
- Update Context health table if CLAUDE.md or decisions.md changed

If STATE.md didn't exist: create it from `templates/STATE.md` using current project reality as the values.

---

## Phase 5: Handoff

State what you changed:

```
Updated:
- tasks/STATE.md — current focus, last session, decisions
- tasks/decisions.md — added [N] decisions, updated [N]
- tasks/plan.md — revised [specific sections] (or "no changes needed")
- tasks/todo.md — dropped [N] tasks, added [N]
- CLAUDE.md — updated [section] (or "no changes needed")
```

Then ask: "What's the first task in the new phase?"

Nothing else. No summary of the re-kickoff. No "great, we're all set!" Just ask what's next.
