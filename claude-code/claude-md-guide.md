# CLAUDE.md Deep Dive

## The Three Levels

CLAUDE.md is not one file. It's a hierarchy. All three levels load simultaneously. Understand what goes where or you'll constantly fight conflicting or irrelevant rules.

### `~/.claude/CLAUDE.md` — Global

Applies to every session, every project. Personal engineering identity: your preferred communication style, universal language rules, cross-project tool preferences.

What belongs here:
- "No `as any`. No `@ts-ignore`. Fix the type properly."
- "Write self-documenting code. Comments only for non-obvious decisions."
- "Don't create files unless the task requires a new file."
- Communication preferences ("be terse, no filler")

What does not belong here: anything project-specific. The moment you add a Next.js rule to global, it becomes noise in every Python project you open.

Word budget: 600-800 words max. Global rules have to survive in every context. Tight and essential only.

### `project/CLAUDE.md` — Project-Scoped

The main working file. Loaded for every session inside that project directory.

What belongs here:
- Stack and architecture rules ("this is a Next.js App Router project, no Pages Router patterns")
- Naming conventions ("components in PascalCase, utilities in camelCase")
- Which directories are off-limits or require care
- Architecture decisions that affect everything ("we use Zustand for state, not Context")
- ARC governance sections (NON-NEGOTIABLE / DEFAULTS / SUGGESTED)

Word budget: 1500-2500 words. This is where most rules live. Don't exceed 2500 without trimming.

### `src/module/CLAUDE.md` — Folder-Level

Loaded only when Claude is actively working inside that subdirectory. Use it for local context that's wrong or confusing outside that module.

What belongs here:
- "This module uses a legacy state machine pattern. Don't refactor it to hooks."
- "This API wrapper has a non-obvious contract: always call `init()` before `fetch()`."
- Module-specific conventions that differ from the project norm.

What does not belong here: rules that should apply everywhere. If the rule is broadly applicable, it goes up the hierarchy.

---

## Governance Sections

Structure your project CLAUDE.md into three tiers. This isn't cosmetic — it tells Claude which rules are negotiable.

### NON-NEGOTIABLE

Hard constraints. Claude must not violate these regardless of what seems expedient. Use strong language. No exceptions.

```
## NON-NEGOTIABLE
- NEVER modify files in /core/auth without explicitly asking first.
- NEVER suppress type errors with `as any` or `@ts-ignore`.
- NEVER commit without being asked.
- ALWAYS run `npm run typecheck` before marking any task complete.
```

Rules here should genuinely be blockers if violated. If you put 20 things as NON-NEGOTIABLE, none of them are.

### DEFAULTS

Standard operating procedure. Claude follows these unless the specific situation calls for deviation — and deviation requires reasoning.

```
## DEFAULTS
- Write tests for new public functions.
- Follow existing file structure in the directory you're modifying.
- Prefer editing existing files over creating new ones.
- Run `npm run lint` after significant changes.
```

### SUGGESTED

Soft preferences. Claude should lean this way but judgment applies.

```
## SUGGESTED
- Prefer named exports over default exports.
- Keep functions under 40 lines.
- Extract repeated logic after the second occurrence.
```

---

## Word Count Budget

Instruction-following degrades past approximately 3500 total words loaded across all CLAUDE.md levels. This is a hard constraint imposed by attention, not a soft guideline.

The math:
- Global: ~700 words max
- Project: ~2500 words max
- Folder (if active): ~300 words max
- Total: under 3500

When you're over budget, rules toward the end of the file degrade. Claude doesn't explicitly ignore them — they just carry less weight. This means your buried rules are effectively optional.

How to stay under budget:
- Ruthlessly cut rules you haven't needed in the last two weeks
- Consolidate duplicate rules ("always do X" and "never skip X" are the same rule)
- Move folder-specific rules to folder-level CLAUDE.md files
- Archive old decisions to `tasks/decisions.md` rather than keeping them in CLAUDE.md

---

## Writing Rules That Get Followed

### Strong language for hard requirements

Weak: "try to avoid using `var`"
Strong: "NEVER use `var`. Always `const`, `let` if reassigned."

Weak: "it's good practice to write tests"
Strong: "ALL new public functions require at least one test. No exceptions."

If the rule is actually NON-NEGOTIABLE, the language must reflect that.

### Prominent position

Rules at the top of the file get more weight than rules at the bottom. Put your most critical rules first — not last. The "bottom of the file" graveyard is where important rules go to be ignored.

### Specific over abstract

Abstract: "write clean code"
Specific: "functions do one thing. If a function name has 'and' in it, split it."

Abstract: "follow existing patterns"
Specific: "match the file structure in `/components` — one component per file, co-located test"

### Examples over descriptions

If the rule is about code style, show the pattern:

```
// CORRECT
const result = items.filter(Boolean).map(transform)

// WRONG
const results = []
for (let i = 0; i < items.length; i++) { ... }
```

Claude matches patterns better from examples than from prose descriptions.

---

## Common Mistakes

**Too many rules**: Every rule added dilutes the ones that matter. If you have 40 rules, you effectively have zero enforced rules. Aim for 10-15 in project CLAUDE.md, 5-8 in global.

**Contradictory rules**: "always write tests" in global + "don't add tests to this project" nowhere visible causes silent conflict. Audit for contradictions when combining global + project rules.

**Buried rules**: A critical rule on line 200 of a 250-line file is nearly invisible. Structure matters. NON-NEGOTIABLE section goes first.

**Soft language on hard requirements**: "Please try to remember to run typecheck" will be forgotten. "ALWAYS run typecheck before marking complete. This is required." will be followed.

**Outdated rules**: Rules from a previous architectural phase that no longer apply add noise and occasionally contradict current behavior. Audit CLAUDE.md when the project pivots.
