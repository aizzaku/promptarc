# /arc-export — Context Export

You are assembling a single, portable prompt that captures everything Claude needs to work on this project. This is useful for using ARC context in Claude.ai, sharing with teammates, or keeping a snapshot of project state.

---

## Step 1: Read source files

Silently read in order:
1. `CLAUDE.md` — rules, quality bar, voice, stack
2. `tasks/brief.md` — project description and context (if it exists)
3. `tasks/STATE.md` — current focus and open questions (if it exists)

Note which files exist. Missing files = those sections are omitted from the export.

---

## Step 2: Assemble the export

Write the following to `tasks/context-export.md`, substituting real values:

```
# [PROJECT_NAME] — ARC Context
Generated: [TODAY'S DATE]

---

## Project

[One-sentence description from CLAUDE.md]

[If tasks/brief.md exists: include the "What this project is" section verbatim — 2-3 sentences max.]

---

## Rules (Non-Negotiable)

[Copy the NON-NEGOTIABLE section from CLAUDE.md exactly — no summarizing.]

---

## Defaults

Quality bar: [quality bar label from CLAUDE.md]
[Copy any other DEFAULTS content from CLAUDE.md that isn't just session-start read instructions.]

---

## Voice

[Copy the Voice section from CLAUDE.md exactly.]

---

## Stack & Architecture

[Copy the Project Context section from CLAUDE.md. If still "Not yet defined", write that.]

---

## Current State

[If tasks/STATE.md exists:]
Focus: [Current focus field]
Open questions: [Open questions field, or "None"]
Next up: [Last session → Next up field]

[If tasks/STATE.md doesn't exist:]
_No session state recorded — run /arc-resume to initialize._

---

## Core Constraints

[If tasks/brief.md exists: copy the "Core constraints" section.]
[If not: write "Not yet documented — run /arc-kickoff to capture."]

---

## Locked Decisions

[If tasks/brief.md exists: copy the "Decisions already made" section.]
[If not: write "Not yet documented — run /arc-kickoff to capture."]
```

Do not summarize or paraphrase. Copy exact text from the source files. The goal is fidelity, not compression.

---

## Step 3: Show it

Print the assembled export in the chat so the user can read it immediately.

Then say exactly this:

> "Saved to `tasks/context-export.md`. Paste this into any Claude session to bring it up to speed on [PROJECT_NAME]. Re-run `/arc-export` after major project changes to keep it current."

Nothing else.
