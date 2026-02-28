# Memory Strategy — What to Persist Where

Claude Code has multiple memory layers. Using the wrong one for the wrong information is common and causes real problems: instructions that should be global get buried in a project; project-specific context bleeds into unrelated sessions; corrections get lost between conversations. This guide maps information types to the right layer.

---

## The four layers

| Layer | Location | Scope | Lifetime |
|-------|----------|-------|---------|
| Global instructions | `~/.claude/CLAUDE.md` | All projects, all sessions | Permanent |
| Auto memory | `~/.claude/projects/[project]/memory/` | Single conversation history | Permanent |
| Project instructions | `[project]/CLAUDE.md` | That project, all sessions | Permanent |
| Session task files | `[project]/tasks/` | That project, survives sessions | Manual (you manage) |

---

## Layer 1: Global `~/.claude/CLAUDE.md`

**What belongs here**: Instructions and preferences that apply to every project regardless of domain.

Good candidates:
- Communication style preferences ("be concise", "no preamble", "skip the 'I'll help you with that'")
- Code style absolutes that never change (no `as any`, no empty catch blocks)
- Tool preferences (which editor, which shell, file operation conventions)
- Persona / role definition ("senior staff engineer")
- Workflow preferences that apply everywhere (plan-first, anti-slop rules)

Bad candidates:
- Anything project-specific (stack choices, naming conventions, specific APIs)
- Domain knowledge (goes in project CLAUDE.md + domain modules)
- Things you're still calibrating (lock it in after it's proven, not before)

**Budget**: Under 2,000 words. If it's longer, you're over-specifying.

**Common mistake**: Writing a global CLAUDE.md so long that Claude can't actually follow all of it. Instructions compete for attention — 20 rules followed well beats 80 rules followed inconsistently.

---

## Layer 2: Auto Memory (`~/.claude/projects/[project]/memory/`)

**What belongs here**: Observations and preferences Claude discovers across sessions — things not explicitly instructed but that Claude learned from corrections and interactions.

This layer is managed by Claude automatically via the auto-memory system. When Claude learns something stable from a correction or repeated interaction, it writes it here so it persists.

**Good candidates for Claude to write here**:
- Preferences revealed through corrections ("user prefers Zod over Yup for validation")
- Patterns observed in the project ("this team uses functional components only")
- Things that changed from defaults ("user asked to never suggest React Query, they use SWR")
- Debugging insights ("this test environment requires DATABASE_URL to be set from .env.test, not .env")

**You as a human can write here too**:
- Explicit instructions: "Remember this forever: always use bun, not npm"
- Cross-session state you want preserved

**What NOT to put here**: Session-specific context (what you were working on today, in-progress state). That goes in `tasks/`.

---

## Layer 3: Project `CLAUDE.md`

**What belongs here**: Everything Claude needs to know about THIS project to do good work.

Good candidates:
- Stack and architecture ("Next.js 14 App Router, PostgreSQL via Drizzle, deployed on Railway")
- Conventions specific to this project ("we use `camelCase` for database columns, not `snake_case`")
- Quality bar ("MVP — correctness, not elegance")
- Hard constraints ("never touch the legacy auth module — it's being replaced next quarter")
- Domain overlay rules (anti-slop for this domain, communication style for this project)
- Voice profile (how Claude should communicate in this project's context)

Bad candidates:
- Universal rules that apply to all projects (put them in global CLAUDE.md)
- Temporary task context (put it in `tasks/`)
- Reference material Claude reads once (link to a file, don't embed it)

**Budget**: Under 3,500 words including all appended overlays and modules. The `/arc-init` skill tracks this automatically and warns when over budget.

**Over-budget recovery**: Move detailed reference material (API specs, database schemas, large lists) out of CLAUDE.md into separate files. In CLAUDE.md, write: "See `docs/api-reference.md` for full API spec." Claude will read it when relevant.

---

## Layer 4: Session Task Files (`tasks/`)

**What belongs here**: All working state for the current project — what's planned, what's done, what went wrong, what was decided.

| File | Contents |
|------|---------|
| `tasks/plan.md` | Current plan with checkable items |
| `tasks/todo.md` | Active task list with status markers |
| `tasks/lessons.md` | Mistakes + corrections (self-improvement loop) |
| `tasks/decisions.md` | Significant decisions with rationale |

**`tasks/lessons.md` is the most underused file.** Every time you correct Claude — wrong approach, style mismatch, bad assumption — add it here. Claude reads this at session start and uses it to avoid repeating the mistake. Delete lessons that are no longer relevant. Promote universal lessons to auto-memory.

**Session start protocol**: Claude reads the task files silently in order:
1. `CLAUDE.md`
2. `tasks/lessons.md`
3. `tasks/plan.md`
4. `tasks/todo.md`
5. `tasks/decisions.md`

This means a project you haven't touched in three months picks up exactly where you left off — no re-explanation required.

---

## Decision framework: where does this information go?

Ask in order:

1. **Does this apply to every project I ever work on?** → `~/.claude/CLAUDE.md`
2. **Is this something Claude learned from working with me (not an explicit instruction)?** → Auto memory
3. **Does this apply only to this project?** → `[project]/CLAUDE.md`
4. **Is this in-progress working state (plan, current tasks, lessons, decisions)?** → `tasks/`

---

## What NOT to put anywhere

- **Secrets and credentials**: Never in CLAUDE.md, never in task files, never in any file Claude can read. Use environment variables.
- **Large reference docs embedded in CLAUDE.md**: Link to them. Don't embed.
- **Speculative preferences**: Only write instructions after they've been validated — if you're not sure you want this rule for every project, don't put it in global CLAUDE.md yet.
- **Duplicate information**: If something is in your global CLAUDE.md, don't repeat it in the project CLAUDE.md unless you're explicitly overriding it.

---

## Common symptoms of a broken memory strategy

| Symptom | Likely cause |
|---------|-------------|
| Claude ignores preferences established earlier in the session | Context window overflow; move to files |
| Claude doesn't remember corrections from last session | Corrections weren't added to `tasks/lessons.md` |
| Claude applies project-specific rules on unrelated projects | Rules in global `~/.claude/CLAUDE.md` instead of project CLAUDE.md |
| CLAUDE.md is very long but Claude isn't following it all | Over 3,500 words — compress or move material to reference files |
| Same mistake happens every session | Not in `tasks/lessons.md`, or lessons file is stale and not being read |
