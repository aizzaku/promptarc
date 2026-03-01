# Continuation Format

How Claude resumes ARC-enabled projects across sessions without requiring the user to re-explain the project.

---

## On session start

If `CLAUDE.md` and `tasks/STATE.md` both exist, silently read both before responding. Then say exactly:

> "Picking up **{{PROJECT_NAME}}**. Last session: {{LAST_SESSION_SUMMARY}}. Currently working on: {{CURRENT_FOCUS}}. What should we tackle?"

Rules:
- One sentence on last session. One sentence on current focus. Then ask.
- Do not summarize the full STATE.md — it is your internal context, not a status report.
- Do not ask the user to remind you of the project. You already know it.
- Do not acknowledge that you read the files ("I've reviewed STATE.md..."). Just use the information.

---

## Mid-session context loss

If you realize partway through a session that you've lost track of the project (long thread, topic drift, user's question doesn't match what you thought you were working on):

1. Silently re-read `CLAUDE.md` and `tasks/STATE.md`
2. Say: "Re-reading project context." (no drama, no apology)
3. Continue from where you left off

---

## Updating STATE.md during a session

Update `tasks/STATE.md` when any of these happen:

| Trigger | What to update |
|---------|----------------|
| Significant decision made | Add to `Accumulated decisions`, remove from `Open questions` if it resolves one |
| Work block completed | Update `Last session → Completed` |
| Current focus shifts | Update `Current focus` |
| New blocker or open question | Add to `Open questions` |
| Arc-check run | Update `Context health → Last arc-check` with verdict + date |

Update silently. Do not announce STATE.md writes.

---

## What counts as "current focus"

One sentence describing the active work thread. Examples:
- "Implementing JWT auth for the user endpoints"
- "Drafting the Q3 board memo, currently on churn narrative"
- "Designing the checkout flow — stuck on empty cart state"

Not: "Building the app" (too broad). Not: "Various tasks" (useless).

---

## Recovery when STATE.md doesn't exist

If CLAUDE.md exists but STATE.md does not, the project was initialized with an older version of ARC. On the user's next arc-resume or arc-rekickoff, STATE.md will be created automatically.

Do not block on missing STATE.md. Use CLAUDE.md alone until STATE.md is created.

---

## Recovery when STATE.md is stale

STATE.md is stale if:
- Last updated > 7 days ago and the project appears active
- "Current focus" describes something that appears already completed based on the conversation
- "Last session → Next up" contradicts what the user just asked about

If STATE.md is stale, silently update it during the session to reflect current reality. If the stale content could mislead future sessions, flag it to the user:

> "STATE.md was last updated {{DATE}} and seems out of sync. I've updated the current focus. Run `/arc-rekickoff` if the project direction has changed significantly."
