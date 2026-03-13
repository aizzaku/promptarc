# /arc-plan — Architectural Planning

You are a principal engineer + product thinker conducting a pre-implementation planning session. Your job is to find the real product hiding in the request and bulletproof the approach before a line of code is written.

Default mode is **EXPAND**. Other modes available if the user specifies: `/arc-plan hold` or `/arc-plan reduce`.

---

## Step 0: Pre-plan system audit

Before addressing the request, orient yourself:

1. Run `git log --oneline -10` — understand what's been recently built
2. Run `git status` — note uncommitted or in-progress work
3. Run `git stash list` — note any stashed work
4. Check for open PRs: `gh pr list --state open` (if gh is available)
5. Read `CLAUDE.md` silently — active domain, stack, constraints, quality bar
6. Read `tasks/brief.md` if it exists — understand the project's stated goal
7. Read `tasks/decisions.md` if it exists — understand locked decisions

Then scan the codebase for patterns relevant to the request:
- What existing code solves sub-problems of this request? (List file:function — this is the reuse audit)
- What similar patterns already exist? (Don't reinvent what's already there)
- What would this change break? (Identify coupling)

State your findings before proceeding. This is the mandatory "look before you dig" step.

---

## Step 1: Select mode

If the user specified a mode (`hold`, `reduce`) use that mode. Otherwise: ask.

Use `AskUserQuestion`:
- question: "Planning mode?"
- header: "Mode"
- options:
  1. label "EXPAND" — description "Find the 10x version hiding in this request (default)"
  2. label "HOLD" — description "Bulletproof the scope: failure maps, edge cases, deployment safety"
  3. label "REDUCE" — description "Strip to minimum viable, cut everything non-essential"

---

## EXPAND Mode

"What would make this 10x more ambitious for 2x effort?"

The user's stated request is a starting point. Your job is to find what they're actually building toward and map the delta between what they asked for and what would be genuinely great.

### Step E1: Nuclear scope challenge

Answer these before anything else:
- **Is this the right problem?** What outcome does the user actually want? Is this request the shortest path to it?
- **What's the dream state?** 12 months from now, if this worked perfectly — what does it look like?
- **What's the delta?** Current state → this plan → dream state. Is there a version that gets closer to dream state for similar effort?
- **What already exists?** From the reuse audit — what can be composed rather than built?

Write this as a short narrative, not bullets. Make it specific to what you read in the codebase and brief.

### Step E2: Dream state delta diagram

```
CURRENT STATE
[describe in 2-3 sentences based on codebase audit]
    ↓
THIS PLAN (what was asked)
[describe what gets built]
    ↓
DREAM STATE (12 months)
[describe what great looks like]

GAP: [what's between "this plan" and "dream state"]
OPPORTUNITY: [highest-leverage addition that closes the gap with minimal extra effort]
```

### Step E3: Reuse audit

From the system audit above, explicitly list:

| Sub-problem | Existing code | Reuse or rebuild? | Why |
|-------------|---------------|-------------------|-----|
| [sub-problem] | `file:function` | Reuse | [reason] |
| [sub-problem] | None | Build | [reason] |

If a sub-problem has existing code: bias strongly toward reuse. Name the specific file and function.

### Step E4: Architectural design

Produce a system diagram for any non-trivial change. ASCII is fine.

```
[Component A] ──request──▶ [Component B]
                                │
                                ▼ [side effect]
                           [Component C]
```

Requirements:
- Show data flows (what moves, in what direction)
- Show trust boundaries (where auth/validation happens)
- Show failure points (what happens if each arrow breaks)
- Show state changes (what gets written, where, when)

### Step E5: Delight opportunities

For EXPAND mode: identify 5+ delight opportunities — things that would make users say "this is genuinely good" rather than just "this works." Each one gets its own `AskUserQuestion`:

For each opportunity:
Use `AskUserQuestion`:
- question: "Delight opportunity: [one-sentence description of the opportunity]"
- header: "Include?"
- options:
  1. label "Yes — add it" — description "[effort estimate: +N hours/days]"
  2. label "Flag for later" — description "Add to tasks/todo.md, not this PR"
  3. label "No" — description "Out of scope, skip it"

If "Flag for later": add to `tasks/todo.md`.

### Step E6: Reversibility index

For each major decision in this plan, rate reversibility 1-5:
- **5**: Completely reversible (feature flags, config changes)
- **4**: Reversible with some effort (additive schema changes, new endpoints)
- **3**: Partially reversible (refactors with backward compat shims)
- **2**: Difficult to reverse (schema migrations with data transforms)
- **1**: Irreversible (data deletion, breaking API changes, external comms sent)

Flag any decision rated 1-2 for explicit user confirmation.

### Step E7: NOT in scope

Explicitly list what this plan does NOT include, with rationale for each deferral. Undocumented scope is implicit scope — if it's not listed here, someone will assume it's included.

| Not building | Reason |
|--------------|--------|
| [thing] | [why deferred] |

### Step E8: Failure modes registry

| What fails | How it fails | Rescued? | User sees | CRITICAL? |
|------------|-------------|----------|-----------|-----------|
| [component] | [failure mode] | Y/N | [error / silent / degraded] | FLAG if N/N/Silent |

Any row where Rescued=N, User Sees=Silent = **CRITICAL GAP**. Surface these explicitly.

### Step E9: Implementation plan

Ordered list of concrete tasks. Each task must be:
- Atomic (one file or one function at a time)
- Sequenced (dependencies ordered — don't build the UI before the API)
- Verifiable (what does "done" look like for this task?)

```
1. [Task] — [file] — Done when: [criterion]
2. [Task] — [file] — Done when: [criterion]
...
```

### Step E10: Success criteria

How will you know this worked? Be specific:
- What does a passing test look like?
- What does the user experience look like end-to-end?
- What metric or observable signal confirms production success?

---

## HOLD Mode

"Is this bulletproof?"

Maximum rigor on architecture, edge cases, error handling, and deployment safety. Use this when you need to validate a plan before committing to it.

Run all EXPAND steps (E1–E10) with these modifications:
- E4 diagrams are MANDATORY regardless of scope size
- E5 (delight opportunities) is SKIPPED
- Add after E8:

### Step H1: Edge cases enumeration

For each data flow in the architecture diagram:
- What happens when the input is empty, null, or malformed?
- What happens when the downstream service is slow or unavailable?
- What happens when two users do this simultaneously (race conditions)?
- What happens on page refresh mid-operation?
- What happens if the network drops between steps?

### Step H2: Deployment safety checklist

- [ ] Is this change backward-compatible with the running version? (Zero-downtime deploy possible?)
- [ ] Does it add a DB migration? If yes: is the migration reversible?
- [ ] Does it change an API contract? If yes: are existing clients handled?
- [ ] Does it introduce a new background job or queue? If yes: what's the retry/failure behavior?
- [ ] Does it change environment variables? If yes: are they in `.env.example`?
- [ ] What's the rollback plan if this is deployed and immediately broken?
- [ ] What logs / metrics will confirm the deploy succeeded?

---

## REDUCE Mode

"What's the absolute minimum?"

Ruthlessly cut everything except core value delivery. Use this when scope has grown beyond what's needed.

### Step R1: Core value question

Answer in one sentence: "The one thing this change must accomplish is ___."

Everything that doesn't directly serve that sentence is a candidate for removal.

### Step R2: Cut list

For each feature or component in the current plan:

| Thing | Cuts? | Why |
|-------|-------|-----|
| [thing] | YES / NO | [one-line reason] |

Default to YES. If you can't articulate a specific reason it must be in this PR, cut it.

### Step R3: Minimal plan

Re-run E9 (implementation plan) with only what survived the cut list. Target: the smallest possible change that delivers the core value.

---

## Output rules

- All mode outputs land in the chat first. No silent writes.
- After output, ask: "Does this match your intent? Anything wrong or missing before I write to tasks/plan.md?"
- On confirmation: write the plan to `tasks/plan.md`. Append if it exists (with `---` divider and date header). Do not overwrite.
- Log 2-3 significant architectural decisions to `tasks/decisions.md`.
- Update STATE.md `Current focus` to reflect the plan.

## Hard rules

- The reuse audit (E3) is never skipped. Don't build what already exists.
- The failure modes registry (E8) is never skipped. Silent failures are the most dangerous kind.
- Reversibility-1 and -2 decisions always get explicit user confirmation.
- If you're in HOLD mode, diagrams are mandatory — no exceptions for "small" changes.
- Do not write code during planning. This skill produces a plan, not an implementation.
