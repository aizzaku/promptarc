# Execution Discipline

Runtime behavior rules for Claude while working on any ARC-configured project. These define HOW Claude works, not WHAT it produces. Templates handle the what; this handles the how.

These rules are embedded in `templates/claude-md/base.md` and inherited by every project.

---

## 1. Plan-First Protocol

**Rule**: Every non-trivial task (3+ steps or architectural decisions) MUST begin with a written plan before implementation.

**Non-trivial** means: any task where you could take a wrong approach that wastes significant time. If the task is "rename a variable," no plan needed. If the task is "add authentication," plan first.

### How It Works

1. Write a plan to `tasks/plan.md` with checkable items
2. Plan includes: scope, approach, files affected, risks, verification steps
3. Get alignment before executing (for significant work)
4. If execution deviates from the plan — STOP, re-plan, don't push through

### Plan Format

```markdown
## Plan: [Task Name]

**Scope**: [What's included and what's explicitly excluded]
**Approach**: [How you'll do it, in plain language]

### Steps
- [ ] Step 1: [concrete action]
- [ ] Step 2: [concrete action]
- [ ] ...

### Files Affected
- `path/to/file.ts` — [what changes]
- `path/to/other.ts` — [what changes]

### Risks
- [What could go wrong and how you'll handle it]

### Verification
- [How you'll confirm it works]
```

### Why Plans Live in Files

Conversations die. Files persist. When you resume a project next week, `tasks/plan.md` tells Claude exactly where things left off. Without a file, every session starts from zero.

**Embedded in base.md as**: NON-NEGOTIABLE

---

## 2. Persistent Task Tracking

**Rule**: All task state lives in files, not just in conversation memory.

### File Structure

```
tasks/
├── plan.md          # Current plan with checkable items
├── todo.md          # Active task list with status
├── lessons.md       # Mistakes made + corrections
└── decisions.md     # Key decisions with rationale
```

### Workflow

1. **Plan First**: Write plan to `tasks/plan.md` with checkable items
2. **Track Progress**: Mark items complete as you go (in the file, not just in conversation)
3. **Explain Changes**: Brief summary at each step
4. **Document Results**: Add review section to `tasks/todo.md`
5. **Capture Lessons**: Update `tasks/lessons.md` after corrections
6. **Log Decisions**: Add significant decisions to `tasks/decisions.md`

**Embedded in base.md as**: NON-NEGOTIABLE (the workflow) + DEFAULTS (file locations)

---

## 3. Session-Start Protocol

When Claude begins a new session on an existing project, read context in this order:

```
1. project/CLAUDE.md              → Project rules and conventions
2. tasks/lessons.md               → What went wrong before (DON'T REPEAT)
3. tasks/plan.md                  → Current plan status (WHERE WE LEFT OFF)
4. tasks/todo.md                  → Active task list (WHAT'S NEXT)
5. tasks/decisions.md             → Key decisions made (DON'T REVISIT)
```

**First action in any resumed session**:
- Read the above files silently
- If `tasks/plan.md` has incomplete items → resume from where the plan left off
- If `tasks/lessons.md` has entries → treat them as active constraints
- If no task files exist → new project, proceed normally

**Embedded in base.md as**: NON-NEGOTIABLE

---

## 4. Decision Log

Every significant decision gets logged in `tasks/decisions.md` — not just what was decided, but WHY and what was rejected.

### Format

```markdown
## [Date] — [Decision Title]
**Context**: [What prompted this decision]
**Options considered**:
1. [Option A] — [tradeoffs]
2. [Option B] — [tradeoffs]
**Decision**: [What was chosen]
**Rationale**: [Why this option won]
**Revisit if**: [Conditions that would invalidate this decision]
```

### When to Log
- Architecture choices (database, framework, API design)
- Scope decisions (what's in, what's out, what's deferred)
- Business/strategy pivots
- Any decision the user explicitly makes after options are presented
- NOT for trivial choices (variable names, minor formatting)

**Embedded in base.md as**: DEFAULTS

---

## 5. Self-Improvement Loop

Claude learns from corrections within a project via `tasks/lessons.md`.

### Trigger
Any time the user corrects Claude's output — wrong pattern, bad assumption, style mismatch.

### Process
1. After ANY correction: capture the pattern in `tasks/lessons.md`
2. Write a generalized rule that prevents the same mistake
3. Review lessons at session start
4. Delete lessons that are no longer relevant

### Format

```markdown
## Lesson: [Date]
**Mistake**: [What went wrong]
**Correction**: [What the user wanted instead]
**Rule**: [Generalized rule to prevent recurrence]
```

### Promotion Path
- If a lesson applies across ALL projects → promote to global `~/.claude/CLAUDE.md` or auto-memory
- If a lesson is project-specific but permanent → promote to the project's `CLAUDE.md`

**Embedded in base.md as**: DEFAULTS

---

## 6. Verification-Before-Done Protocol

No task is marked complete without evidence.

| Action | Required Evidence |
|--------|-------------------|
| Code change | Linter/diagnostics clean on changed files |
| Build | Exit code 0 |
| Test run | Pass (or explicit note of pre-existing failures) |
| Content draft | Passes anti-slop checklist |
| Analysis/research | Sources cited, claims verifiable |
| Decision | Alternatives documented, reasoning explicit |
| Delegated work | Agent result received AND verified |

**The staff engineer test**: Before marking done, ask — "Would a staff engineer approve this?" If no, it's not done.

**Embedded in base.md as**: NON-NEGOTIABLE

---

## 7. Elegance Check

Before presenting non-trivial work, Claude reviews its own implementation as the final step of building — not a quality gate after the fact.

### Rules
- Before presenting a non-trivial implementation, evaluate: "Knowing everything I know now, would I implement this the same way?"
- If the answer is no → refactor before presenting. The user never sees the rough version.
- If a fix feels hacky → implement the elegant solution, not the quick patch.
- Skip this for simple, obvious fixes — don't over-engineer.
- This is self-directed, not user-facing. Claude doesn't ask the user; Claude challenges itself.

**Embedded in base.md as**: SUGGESTED (can be skipped for speed-critical work)

---

## 8. Failure Recovery Protocol

When implementation goes sideways:

### Escalation Ladder

**After a fix fails**: Fix root causes, not symptoms. Re-verify after EVERY attempt.

**After 3 consecutive failures**:
1. STOP all edits immediately
2. Revert to last known working state
3. Document what was attempted and what failed
4. Reassess approach from scratch
5. If still stuck → ask the user before proceeding

### Never
- Leave code in broken state
- Continue hoping it'll work
- Delete failing tests to "pass"
- Shotgun debug (random changes hoping something sticks)

**Embedded in base.md as**: NON-NEGOTIABLE

---

## 9. Implementation Principles

Three rules governing all Claude output during execution:

### Simplicity First
Make every change as simple as possible. Minimal code. Minimal surface area. The solution that touches the fewest lines and introduces the fewest concepts wins.

### No Laziness
Find root causes. No temporary fixes. No `// TODO: fix later` that never gets fixed. Senior developer standards at all times.

### Minimal Impact
Changes touch only what's necessary. A bugfix is NOT an invitation to refactor surrounding code. Avoid introducing bugs in adjacent code by keeping the blast radius tight.

**Embedded in base.md as**: NON-NEGOTIABLE

---

## 10. Subagent Orchestration

When Claude delegates to subagents:

- **Use subagents liberally** to keep the main context window clean
- **One task per subagent** — focused execution, not kitchen-sink prompts
- **For complex problems**: throw more compute via multiple parallel subagents
- **Always verify** subagent results before using them
- **Offload** research, exploration, and parallel analysis

**Embedded in base.md as**: DEFAULTS
