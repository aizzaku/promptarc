# Skills Guide

## What Skills Are

Skills are markdown files that expand into prompts when invoked with `/skill-name`. When you type `/arc-kickoff`, Claude reads the file at `.claude/skills/arc-kickoff.md` and executes its contents as if you'd typed that whole prompt yourself.

That's it. There's no magic. Skills are prompt templates you've pre-written for workflows you repeat.

The distinction that matters: CLAUDE.md rules are always-on background enforcement. Skills are deliberate invocations. You trigger them when you want them. A skill for "initialize a new project" doesn't run every session — you call it once when you're actually initializing.

---

## Where Skills Live

**`~/.claude/skills/`** — Personal skills. Available in every project, every session. Put workflows that are yours: how you like to do code reviews, your debugging process, how you want onboarding docs structured.

**`.claude/skills/`** — Project-scoped. Only available in that project. Use for workflows specific to this codebase: the ARC initialization flow, a project-specific release checklist, a database migration walkthrough.

Skills in both directories are available simultaneously. Project skills take precedence if names conflict.

---

## Skill File Format

A skill file is a markdown prompt. That's the whole format. Whatever you write is what Claude executes.

```markdown
# Arc Kickoff

You are starting a new feature for this project. Before writing any code:

1. Read CLAUDE.md and summarize the three most relevant constraints for this feature.
2. Read tasks/plan.md and identify the current active work item.
3. Check tasks/decisions.md for any prior decisions that affect this feature.

Then produce:
- A one-paragraph implementation plan
- A list of files you'll need to modify
- Any concerns or blockers you see before starting

Do NOT start writing code yet. This is planning only.
Output your plan and wait for approval.
```

The file name (without `.md`) is the invocation command. `arc-kickoff.md` → `/arc-kickoff`.

Good practices for the file itself:
- Start with what the skill does (one sentence)
- State the concrete deliverable
- Include explicit stop conditions ("do not proceed beyond this point")
- List what NOT to do (prevents Claude from improvising in the wrong direction)

---

## Skills vs CLAUDE.md

The question to ask: do I want this behavior always, or only when I ask for it?

| Scenario | Use |
|---|---|
| "Never use `var` in this project" | CLAUDE.md |
| "When I ask for a code review, follow this checklist" | Skill |
| "Always run typecheck before marking tasks done" | CLAUDE.md |
| "When starting a new feature, do this planning sequence" | Skill |
| "Prefer functional components" | CLAUDE.md |
| "When releasing, run these checks in this order" | Skill |

If you find yourself writing a CLAUDE.md rule that says "when I ask you to X, do Y" — that's a skill, not a CLAUDE.md rule.

---

## Writing Good Skills

**Make it atomic**: One skill, one workflow. A skill that "does code review AND updates the changelog AND checks for security issues" will half-execute each thing. Break compound workflows into separate skills or sequence them explicitly.

**Be specific about deliverables**: "Analyze the code" is not a deliverable. "Produce a numbered list of issues found, each with: file:line, description, severity (high/medium/low), suggested fix" is a deliverable.

**Include the trigger context**: Skills are invoked at a point in time. Tell Claude what state to assume. "You have just been asked to implement a feature. The user has not given you a spec yet." Different from "You have a spec in tasks/plan.md. Implement it."

**State explicit stop conditions**: Skills that keep going past their scope are annoying and hard to interrupt cleanly. End with what Claude should do when the skill completes: "Output your plan and wait for user approval before proceeding."

**Include must-not-do**: Every skill has a natural way to go wrong. Name it explicitly. "Do NOT start writing code during kickoff." "Do NOT modify files during the audit." "Do NOT commit anything."

---

## ARC's Four Skills

**`/arc-init`** — Project initialization. Reads the project directory, generates an appropriate CLAUDE.md based on ARC templates, creates the `tasks/` directory structure, and outputs a proposed project governance document for review. Invoked once per project.

**`/arc-kickoff`** — Feature start. Before touching code: reads CLAUDE.md for relevant constraints, checks `tasks/plan.md` for current work, checks `tasks/decisions.md` for prior decisions, produces an implementation plan and file list. Outputs the plan and waits. Does not write code.

**`/arc-rekickoff`** — Session resumption. For returning to an in-progress feature after a break or context loss. Reads `tasks/todo.md` for current state, `tasks/lessons.md` for recent corrections, and `tasks/decisions.md` for active decisions. Reconstructs context from files, not from conversation history. Outputs: "Here's where we are. Here's what's next. Ready to proceed?"

**`/arc-check`** — Pre-completion verification. Before calling a task done: runs diagnostics on changed files, verifies the build passes, checks that all todo items are marked complete, reviews against CLAUDE.md NON-NEGOTIABLE rules. If anything fails, reports it without marking complete. Does not auto-fix — surfaces failures for human review.

---

## The Core Value

Skills encode your process, not just your preferences. CLAUDE.md captures what the code should look like. Skills capture how the work should happen. Both are necessary. Neither replaces the other.

If you're repeatedly typing the same 5-sentence prompt to start a specific kind of task, that's a skill waiting to be written.
