# /arc-progress — Project State Dashboard

You are generating a structured project health report. Read, report, and flag. No opinions beyond what the data shows.

---

## Step 1: Read all context files

Silently read in this order:
1. `tasks/STATE.md`
2. `CLAUDE.md`
3. `tasks/brief.md`
4. `tasks/plan.md`
5. `tasks/todo.md`
6. `tasks/decisions.md`
7. `tasks/lessons.md`

Note which files exist and which are missing. Missing files are not errors — they're information.

---

## Step 2: Produce the dashboard

Output this exact format, substituting real values. Do not omit any section.

```
## Project: {{PROJECT_NAME}}
Domain: {{DOMAIN}} · Quality bar: {{QUALITY_BAR}} · Updated: {{STATE_LAST_UPDATED}}

─────────────────────────────────────────────
CURRENT FOCUS
─────────────────────────────────────────────
{{CURRENT_FOCUS from STATE.md, or "Not set — run /arc-kickoff"}}

Last session: {{LAST_SESSION_SUMMARY}}
Next up:      {{NEXT_ACTION}}

─────────────────────────────────────────────
CONTEXT HEALTH
─────────────────────────────────────────────
CLAUDE.md       {{✅ active / ⚠️ missing}}
Brief           {{✅ tasks/brief.md / ❌ not created}}
Voice           {{✅ calibrated / ❌ TBD — run /arc-kickoff}}
Decisions log   {{✅ N entries / ❌ not created}}
STATE.md        {{✅ current / ⚠️ stale (last updated DATE) / ❌ missing}}
Last arc-check  {{VERDICT + DATE, or "never run"}}

─────────────────────────────────────────────
OPEN QUESTIONS
─────────────────────────────────────────────
{{List from STATE.md open questions, one per line, or "None recorded"}}

─────────────────────────────────────────────
LOCKED DECISIONS
─────────────────────────────────────────────
{{List from STATE.md accumulated decisions, one per line, or "None recorded — run /arc-kickoff"}}

─────────────────────────────────────────────
TODO SUMMARY
─────────────────────────────────────────────
{{Count of active/blocked/done tasks from tasks/todo.md, or "No todo file"}}
{{If tasks exist: list only the active and blocked ones, max 5}}

─────────────────────────────────────────────
RECOMMENDED ACTION
─────────────────────────────────────────────
{{One of the options below — pick the single most appropriate one}}
```

**Recommended action logic** (pick the first one that applies):

| Condition | Recommended action |
|-----------|-------------------|
| CLAUDE.md missing | Run `/arc-init` |
| Brief missing + project is active | Run `/arc-kickoff` |
| Voice not calibrated | Run `/arc-kickoff` |
| STATE.md stale > 7 days + project active | Run `/arc-resume` or `/arc-rekickoff` |
| Last arc-check: FAIL or NEEDS WORK | Run `/arc-check` on the specific artifact flagged |
| No open questions, no blocked tasks | "On track — continue working" |
| Blocked tasks exist | "Resolve the blocked task above before continuing" |
| Open questions exist | "Resolve the open question above before starting new work" |

---

## Rules

- Do not invent data. If a field is missing from the files, say "not recorded" or "missing."
- Do not summarize CLAUDE.md content to the user — just report its status (exists / missing / stale).
- One recommended action. Not a list of suggestions.
- If all health signals are green and no open questions exist: say "On track" and stop. Don't manufacture action items.
