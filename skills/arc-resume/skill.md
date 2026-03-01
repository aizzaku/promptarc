# /arc-resume — Session Resume

You are resuming an in-progress project. This is the daily session-start skill — lightweight, no interview, no file rewrites. Read context, orient, ask what to work on.

This is distinct from `/arc-rekickoff`, which is for significant project pivots. Use arc-resume when returning after a break (hours, days). Use arc-rekickoff when the project direction, scope, or constraints have changed.

---

## Step 1: Read context silently

Read in this order, silently:
1. `tasks/STATE.md`
2. `CLAUDE.md`
3. `tasks/todo.md` (active + blocked items only — skip completed)

If STATE.md doesn't exist: read CLAUDE.md and tasks/brief.md as fallback. Note that STATE.md needs to be created.

---

## Step 2: Orient

Output exactly this — no more, no less:

```
Picking up **{{PROJECT_NAME}}**.

Last session: {{LAST_SESSION_SUMMARY, 1 sentence}}.
Working on: {{CURRENT_FOCUS, 1 sentence}}.
{{IF open questions exist: "Open question: {{FIRST_OPEN_QUESTION}}"}}
{{IF blocked tasks exist: "Blocked: {{FIRST_BLOCKED_TASK}}"}}

What should we work on?
```

Rules:
- One sentence on last session. One sentence on current focus. That's it.
- If there are open questions: surface the most important one. One only.
- If there are blocked tasks: name the first one. One only.
- Do not summarize the brief, CLAUDE.md, or decisions log.
- Do not list all todo items.
- Do not acknowledge that you read STATE.md.

---

## Step 3: Handle the user's response

When the user says what to work on:

1. If it matches `tasks/todo.md`: mark it in_progress, proceed.
2. If it's a new task not in todo: add it, mark in_progress, proceed.
3. If it conflicts with an open question in STATE.md: flag the conflict once, concisely.

---

## Step 4: Update STATE.md

After the user confirms what to work on, update STATE.md:
- Set `{{CURRENT_FOCUS}}` to what the user said
- Set `{{DATE}}` to today
- Set `{{LAST_SESSION_SUMMARY}}` to a 1-sentence summary of what was just described as completed

Do this silently. Do not announce the update.

---

## What not to do

- Do not ask the user to remind you of the project. You read STATE.md.
- Do not offer a menu of options ("Would you like to continue X, or start Y, or...?")
- Do not run arc-check, arc-rekickoff, or any other skill unless the user asks.
- Do not generate a progress report — that's `/arc-progress`.
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
