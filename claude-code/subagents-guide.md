# Subagents Guide — When and How to Delegate

Claude Code can spawn subagents — separate Claude instances that run a focused task in parallel and return results to the main conversation. Used well, subagents are how you handle work that would otherwise bloat the context window or take twice as long done sequentially.

---

## The core mental model

Subagents are **expensive grep, not consultants**. They're fast, parallel, disposable. The right way to think about them:

- A subagent for "find all auth implementations in this codebase" = a very good grep
- A subagent for "research how Stripe handles webhook idempotency" = a very good web search
- A subagent for "review this architecture design" = a very good senior reviewer

The wrong mental model: a subagent as a slow, sequential, full-session Claude that you wait on before proceeding.

---

## When to use subagents

**Use a subagent when:**

| Situation | Reason |
|-----------|--------|
| Multiple independent search tasks | Run them in parallel, not sequentially |
| Large codebase exploration across many files | Protects main context window |
| External research (docs, OSS, web) | Offloads context-heavy web content |
| Second-opinion review on complex work | Fresh context produces better reviews |
| Parallel analysis of different approaches | Compare independently, not sequentially |

**Do NOT use a subagent when:**

- The task takes 5 seconds with direct tools (Glob, Grep, Read)
- You need the result before deciding the next step (use direct tools, then proceed)
- You're mid-implementation and just need to check one file
- The task requires knowledge of the conversation history (subagents start fresh)

---

## Available subagent types

| Type | Best for |
|------|---------|
| `explore` (codebase) | Finding patterns, implementations, conventions in this repo |
| `librarian` (external) | Library docs, OSS examples, web research |
| `general-purpose` | Complex multi-step tasks, open-ended research |
| `plan` | Designing implementation approaches before coding |
| `bash` | Running commands, git operations |

---

## The delegation prompt structure

Vague prompts produce vague results. Every delegation must include:

```
1. TASK: One atomic, specific goal. Not "research auth" — "Find every middleware function in /src that touches JWT tokens and list them with file paths."

2. EXPECTED OUTCOME: Concrete deliverable. "Return a list of file paths and function names. If none found, say so explicitly."

3. REQUIRED TOOLS: Whitelist what tools the subagent should use. Prevents tool sprawl.
   Example: "Use Grep and Read only. Do not use web search."

4. MUST DO: Exhaustive requirements. Everything left implicit is a risk.
   Example: "Search recursively. Include test files. Report any files where you're uncertain."

5. MUST NOT DO: Forbidden actions.
   Example: "Do not modify any files. Do not suggest refactors. Just report what exists."

6. CONTEXT: File paths, patterns, what you already know.
   Example: "Auth lives in /src/middleware/. We use the `jsonwebtoken` package. Check for both `verify` and `decode` calls."
```

Subagents that get vague prompts hallucinate, over-scope, or produce results you can't use.

---

## Parallel vs. sequential

The default pattern is parallel with deferred collection:

```
# Launch all in parallel:
task_1 = subagent("explore", "Find all API route handlers...")
task_2 = subagent("explore", "Find all database query functions...")
task_3 = subagent("librarian", "Find Stripe webhook best practices...")

# Continue other work immediately...
# Collect when needed:
result_1 = await task_1
result_2 = await task_2
result_3 = await task_3
```

Sequential is only correct when task B requires output from task A:

```
# Sequential (task B depends on A):
routes = await subagent("explore", "Find all API routes...")
# Now we know the routes; use them in the next prompt:
handlers = await subagent("explore", f"Find implementations for these routes: {routes}")
```

Most exploration work is parallelizable. When in doubt, launch parallel.

---

## How to verify subagent output

Subagents can hallucinate, miss things, or do only half the task. Before using a subagent result:

1. **Sanity check**: Does the result make sense given what you know about the codebase?
2. **Spot check**: Pick one item from the result and verify it manually with a direct tool (Grep/Read). If it's wrong, the rest is suspect.
3. **Completeness check**: Did the subagent actually follow the MUST DO requirements? Did it explicitly report if it found nothing?
4. **Contradiction check**: Does the result contradict what you already know? Investigate before assuming the subagent is right.

If a result fails the sanity check: ask more specifically, or do the search yourself with direct tools.

---

## Context window management

The primary reason to use subagents is to protect the main context window. Signs you're not doing this:

- You're reading large files yourself when an explore agent could summarize
- You're doing sequential research that fills your context with intermediate results
- You've been in the same session for 3+ hours on a complex task

When the main context gets long:
1. Move all further exploration to subagents
2. Keep only decisions and current task state in the main context
3. When resuming tomorrow, the `tasks/` files carry the state — not the conversation

---

## Common mistakes

**Launching a subagent when a Grep would do**: If you know the pattern, file type, and approximate location, just Grep. Subagents have overhead.

**Vague delegation**: "Research auth patterns" returns whatever the subagent thinks is useful. "Find every file in /src that imports `passport` and list the strategies configured" returns something actionable.

**Forgetting to cancel**: If you launch subagents and solve the problem a different way, cancel the running subagents. They consume resources needlessly.

**Using subagents for context-dependent work**: Subagents don't see your conversation history. If the task requires knowing what you've been working on, either provide that context in the prompt or do the task yourself.

**Trusting results without verification**: Subagents are fast and often right; they're also wrong in specific ways that look plausible. Spot-check before using.

---

## Quick decision checklist

Before spawning a subagent, ask:

- [ ] Can I do this with one Grep/Glob/Read call? → Do that instead
- [ ] Does this task require conversation history? → Do it yourself
- [ ] Is this result needed immediately? → Still background it and continue; collect when you actually need it
- [ ] Do I have a specific, concrete prompt? → If not, clarify before launching
- [ ] Can I run 2-3 of these in parallel? → Yes? Launch all at once
