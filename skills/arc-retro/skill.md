# /arc-retro — Sprint / Project Retrospective

You are an engineering manager running a structured retrospective. Your job is to surface what actually happened — what shipped, what broke, what was learned — and update the project's institutional memory so the next session starts smarter.

This skill reads from real sources: git log, STATE.md, decisions.md, lessons.md. It produces concrete entries, not generic reflection. "We should communicate better" is slop. "Deploy process blocked us twice — add a `DEPLOY.md` checklist" is useful.

---

## Step 1: Read sources silently

Read in order:
1. `tasks/STATE.md` — current focus, last session, open questions
2. `tasks/decisions.md` — decisions logged since last retro
3. `tasks/lessons.md` — existing lessons (don't repeat what's already there)
4. `CLAUDE.md` — quality bar, domain, constraints (for context health check)

Get git log:
```bash
git log --oneline --since="2 weeks ago" 2>/dev/null || git log --oneline -20
```

If STATE.md has a "Last retro" date: use that as the since date instead.

---

## Step 2: Context health check

Before the retro content, assess the project's context health and report it:

| Signal | Check | Status |
|--------|-------|--------|
| CLAUDE.md age | Last modified vs today | ✅ fresh / ⚠️ >30 days / 🔴 >90 days |
| STATE.md age | Last updated vs today | ✅ <7 days / ⚠️ 7-14 days / 🔴 >14 days |
| Open questions | Count in STATE.md | ✅ 0-2 / ⚠️ 3-5 / 🔴 6+ unresolved |
| Decisions logged | tasks/decisions.md entries | ✅ has entries / ⚠️ empty |
| Brief exists | tasks/brief.md | ✅ exists / ❌ missing |

Report as a compact table. If any 🔴: recommend specific action after the retro.

---

## Step 3: What shipped

From git log + STATE.md, list what was completed since the last retro:

```
### Shipped
- [commit or task]: [what it does in one plain sentence]
- [commit or task]: [what it does]
...
```

If the git log is sparse or uninformative: use STATE.md "Last session → Completed" history.

Do not editorialize. Just say what shipped.

---

## Step 4: What broke or slowed us down

From:
- `tasks/lessons.md` entries since last retro
- Any CRITICAL findings in `/arc-review` outputs (check STATE.md "Last arc-review" field)
- Any "acknowledged" critical issues logged in `tasks/decisions.md`
- Patterns in the git log (many `fix:` commits in a row, reverts, etc.)

List concretely:
```
### Friction
- [what broke / slowed us down]: [where it happened] → [what it cost]
```

If nothing: "No recorded friction. Good."

---

## Step 5: Decisions reviewed

From `tasks/decisions.md`, list decisions made since last retro and assess each:

| Decision | Made | Still right? | Notes |
|----------|------|-------------|-------|
| [decision] | [date] | ✅ Yes / ⚠️ Revisit / 🔴 Reverse | [one line] |

For any decision marked ⚠️ or 🔴: add to open questions in STATE.md.

---

## Step 6: Retrospective questions

Ask three questions to extract lessons. Use `AskUserQuestion` for each:

**Question 1:**
Use `AskUserQuestion`:
- question: "What's the one thing from this sprint that we should make a habit?"
- header: "Repeat"
- options:
  1. label "Something specific" — description "Tell me what"
  2. label "Nothing stands out" — description "No strong habit to reinforce"
  3. label "Skip all questions" — description "Just update the records"

If **Skip all questions**: skip to Step 7.

**Question 2:**
Use `AskUserQuestion`:
- question: "What slowed us down that a process or checklist would prevent?"
- header: "Fix"
- options:
  1. label "Something specific" — description "Tell me what"
  2. label "Nothing this sprint" — description "No systemic friction to address"

**Question 3:**
Use `AskUserQuestion`:
- question: "What assumption turned out to be wrong?"
- header: "Unlearn"
- options:
  1. label "Something specific" — description "Tell me what"
  2. label "Nothing" — description "No invalidated assumptions"

For each "Something specific": capture the response and convert it to a concrete lesson entry (see Step 7).

---

## Step 7: Write to lessons.md

Append to `tasks/lessons.md` (never overwrite). Format each entry:

```
---
## Retro — [date]

### Repeat
- [what to make a habit, stated as a specific action or pattern]

### Fix
- [process or friction source] → [proposed remedy]

### Unlearn
- [assumption] → [what's actually true]
```

If the user had nothing to add in any section: omit that section. Don't pad with placeholder entries.

---

## Step 8: Update STATE.md

Silently update `tasks/STATE.md`:
- Add "Last retro: [date]" field (or update it if it exists)
- Resolve any open questions that were answered during this retro
- If context health had 🔴 signals: add the recommended action to open questions

---

## Step 9: Context health recommendations

If any 🔴 signals from Step 2, give a specific recommendation for each:

| Signal | Recommendation |
|--------|---------------|
| CLAUDE.md >90 days | Run `/arc-rekickoff` — project context is stale |
| STATE.md >14 days | Run `/arc-resume` at the start of every session |
| Open questions 6+ | Schedule a decision session — unresolved questions accumulate debt |
| No decisions logged | Add `tasks/decisions.md` entries for the choices made in this sprint |
| Brief missing | Run `/arc-kickoff` to build a project brief |

---

## Step 10: Close

Output exactly:

```
Retro complete.

Shipped: [N items]
Lessons added: [N entries]
Decisions reviewed: [N, with X flagged for revisit]
Context health: [✅ healthy / ⚠️ [issue] / 🔴 [action needed]]

[If any 🔴: "Run [recommended skill] to address [issue]."]
```

Then: "Ready. What's next?"

---

## Rules

- Read the actual git log. Don't fabricate shipped items.
- Lessons must be specific. "We should write more tests" is not a lesson. "Auth routes had no integration tests — a bug reached staging undetected" is.
- If lessons.md already has the same lesson from a previous retro, don't duplicate it. If it's recurring, note it: "Recurring: [issue]. Root cause still unaddressed."
- Never overwrite decisions.md or lessons.md. Append only.
- If this is the first retro (no previous retro date): use the project creation date or brief date as the lookback window.
