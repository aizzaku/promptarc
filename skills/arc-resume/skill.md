# /arc-resume — Session Resume

You are resuming an in-progress project. This is the daily session-start skill — lightweight, no interview, no file rewrites. Read context, check health, orient, and get to work.

Distinct from `/arc-rekickoff`, which is for significant project pivots. Use arc-resume when returning after a break (hours, days). Use arc-rekickoff when the project direction, scope, or constraints have changed.

---

## Step 1: Read context silently

Read in this order, silently:
1. `tasks/STATE.md`
2. `CLAUDE.md`
3. `tasks/todo.md` (active + blocked items only — skip completed)
4. `tasks/lessons.md` (skim for entries — these are active constraints)

If STATE.md doesn't exist: read CLAUDE.md and tasks/brief.md as fallback. Note that STATE.md needs to be created.

Also run silently:
```bash
git status --short
gh pr list --state open --head $(git branch --show-current) 2>/dev/null
```

Note: uncommitted file count and any open PR on the current branch.

---

## Step 2: Context health check (silent)

Before orienting, run a quick health check. Surface warnings in Step 3 only if 🔴.

| Signal | Check | Status |
|--------|-------|--------|
| CLAUDE.md age | Last modified vs today | ✅ fresh / ⚠️ >30 days / 🔴 >90 days |
| STATE.md age | Last updated vs today | ✅ <7 days / ⚠️ 7-14 days / 🔴 >14 days |
| Open questions | Count in STATE.md | ✅ 0-2 / ⚠️ 3-5 / 🔴 6+ unresolved |

Only surface 🔴 signals in Step 3. Do not report ✅ or ⚠️ — they don't need attention.

---

## Step 3: Orient

Output exactly this — no more, no less:

```
Picking up **{{PROJECT_NAME}}**.

Last session: {{STATE.md "Last session → Completed" field, condensed to 1 sentence}}.
Working on: {{STATE.md "Current focus" field, 1 sentence}}.
{{IF open questions exist: "Open question: {{FIRST_OPEN_QUESTION}}"}}
{{IF blocked tasks exist: "Blocked: {{FIRST_BLOCKED_TASK}}"}}
{{IF uncommitted changes exist: "Uncommitted: {{N}} files changed."}}
{{IF open PR on current branch: "Open PR: {{PR title}} — {{URL}}"}}
{{IF any 🔴 context health signal: "⚠️ [signal description] — run /arc-rekickoff to refresh."}}
```

Then use `AskUserQuestion` to ask what to work on:
- question: "What should we work on?"
- header: "Next task"
- Build options dynamically from `tasks/todo.md`: take up to 3 tasks, prioritizing blocked first, then active, in listed order. Use the task title as the label and its status (blocked/active) as the description.
- If fewer than 3 tasks exist, add a "Something new" option — description "Start a task not in the list".
- The auto-added "Other" handles free-text input for anything else.

Rules:
- One sentence on last session. One sentence on current focus. That's it.
- If there are open questions: surface the most important one. One only.
- If there are blocked tasks: name the first one. One only.
- If there are uncommitted changes: surface the file count. One line only. Do not list files.
- If there is an open PR on the current branch: surface it. One line only.
- Do not summarize the brief, CLAUDE.md, or decisions log.
- Do not list all todo items.
- Do not acknowledge that you read STATE.md.

---

## Step 4: Handle the user's response

When the user says what to work on:

1. If it matches `tasks/todo.md`: mark it in_progress, proceed.
2. If it's a new task not in todo: add it, mark in_progress, proceed.
3. If it conflicts with an open question in STATE.md: flag the conflict once, concisely.

---

## Step 5: Update STATE.md

After the user confirms what to work on, update STATE.md:
- Update `Current focus` to what the user said
- Update `Last session → Completed` to a 1-sentence summary of what was done before this session
- Update `Last session → Next up` to what the user is now about to work on
- Update the date in the header line

Do this silently. Do not announce the update.

---

## Step 6: End-of-session lessons capture (run when user signals "done for today")

When the user indicates they are wrapping up (e.g., "done for today", "stopping here", "that's it"), ask one question:

Use `AskUserQuestion`:
- question: "Anything to capture before we stop? A mistake, a trick that worked, or an assumption that turned out wrong?"
- header: "Lessons"
- options:
  1. label "Something to capture" — description "Tell me what"
  2. label "Nothing this session" — description "No lessons to record"

If "Something to capture": write the entry to `tasks/lessons.md` in this format:
```
---
## Lesson — [date]
**What**: [what happened — specific, not generic]
**Rule**: [generalized rule to prevent recurrence or repeat the win]
```

Then update STATE.md `Last session → Completed` with a 1-sentence summary of what was accomplished.

If "Nothing this session": update STATE.md only.

---

## What not to do

- Do not ask the user to remind you of the project. You read STATE.md.
- Do not offer a menu of options ("Would you like to continue X, or start Y, or...?")
- Do not run arc-check or arc-rekickoff unless the user asks.
- Do not generate a progress report unless the user asks for one.
- Do not summarize the full STATE.md content to the user.

---

## Edge cases

**STATE.md is stale (last updated > 7 days)**

After orienting, add one line:
> "STATE.md is {{N}} days old. If the project has changed direction, run `/arc-rekickoff`."

Then proceed normally.

**STATE.md missing**

After the session starts, create STATE.md from `templates/STATE.md` using current knowledge from CLAUDE.md + the user's response. Fill in what you can; leave unknowns as "not recorded."

Tell the user once:
> "Created tasks/STATE.md for session continuity."

**Brief missing (tasks/brief.md doesn't exist)**

Proceed with the session normally. Mention once at the end:
> "No project brief found. Run `/arc-kickoff` to build deeper context."
