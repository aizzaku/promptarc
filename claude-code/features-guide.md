# Claude Code Features Reference

## Quick Reference

| Feature | Invocation | Best For | Common Misuse |
|---|---|---|---|
| CLAUDE.md | Auto-loaded | Persistent rules & context | Dumping everything in one file |
| Skills | `/skill-name` | Repeatable workflows | Duplicating what CLAUDE.md handles |
| Hooks | `.claude/settings.json` | Event-driven automation | Blocking the main loop |
| MCP Servers | `.claude/settings.json` | Adding persistent tool capabilities | Installing servers you use once |
| Auto-memory | `~/.claude/memory/` | Cross-session persistence | Persisting session-specific state |
| Subagents | Task tool | Parallel work, context isolation | Over-delegating trivial searches |
| Extended thinking | Prompt prefix | Architectural decisions | Burning tokens on simple tasks |
| Streaming | Default | All interactive use | — |

---

## CLAUDE.md Hierarchy

Three levels, all auto-loaded, all concatenated into context.

**`~/.claude/CLAUDE.md`** — Global. Applies to every project, every session. Put your personal engineering standards here: coding style preferences, universal tools, how you want Claude to communicate. Keep it under 800 words.

**`project/CLAUDE.md`** — Project-scoped. Loaded for any session inside that directory. Contains stack-specific rules, architecture decisions, naming conventions, which modules to avoid touching. This is where ARC stores its governance rules.

**`src/module/CLAUDE.md`** — Folder-level. Loaded only when Claude is working inside that subdirectory. Use for module-specific patterns that don't belong at the project level: an unusual state management approach, legacy code warnings, a local API contract.

**What it does**: Claude reads all three before responding. Rules are additive — lower levels can add specificity but shouldn't contradict upper levels.

**Common misuse**: Putting everything in global. Global rules apply everywhere including quick personal projects where they're irrelevant noise. Scope appropriately.

---

## Skills

Markdown files in `~/.claude/skills/` (personal) or `.claude/skills/` (project). Invoked with `/skill-name`. The file content becomes the prompt Claude executes.

**What it does**: Expands a short invocation into a full instructed workflow. `/arc-kickoff` might expand to 400 words of structured project analysis.

**When to use**: Any workflow you repeat more than twice. Code review, project initialization, pre-release checklist.

**Common misuse**: Using skills for rules that should always apply. If you want Claude to always write typed Python, that goes in CLAUDE.md. Skills are for deliberate invocation, not background enforcement.

---

## Hooks

Configured in `.claude/settings.json` under the `hooks` key. Scripts that fire on tool events.

**Hook types**:
- `PreToolUse` — runs before a tool executes. Can block the tool by exiting non-zero.
- `PostToolUse` — runs after. Good for formatting, testing, logging.
- `Stop` — runs before Claude ends a session turn. Use for cleanup or final validation.
- `Notification` — fires on Claude's notification events.

**What it does**: Injects automation into the tool loop without Claude needing to remember to do it.

**When to use**: Auto-formatting after file edits. Running the test suite after code changes. Logging all bash commands for audit trails. Blocking destructive commands unless a flag is present.

**Common misuse**: Long-running scripts in PreToolUse. If the hook takes 10 seconds, every tool call takes 10 extra seconds.

---

## MCP Servers

Configured in `.claude/settings.json` under `mcpServers`. Adds tool capabilities beyond Claude Code's built-ins.

**What it does**: Extends the tool palette. A browser automation MCP gives Claude a `browser_navigate` tool. A database MCP gives `sql_query`. Claude sees these exactly like native tools.

**When to use**: When you repeatedly need a capability that bash one-liners don't cleanly provide. Browser automation, database introspection, GitHub API, Slack messaging.

**Common misuse**: Installing an MCP for a one-time task. The overhead of server setup and maintenance isn't worth it for ad-hoc use. Use bash + curl instead.

---

## Auto-Memory

`~/.claude/memory/` — Claude Code can write persistent notes here across sessions when the memory feature is enabled. Files here are loaded automatically.

**What it does**: Provides session-to-session continuity without manual file management. Claude can record a learned fact and retrieve it in the next session.

**When to use**: Corrections you want to stick ("stop using semicolons in this codebase"), personal preferences, frequently-referenced project facts.

**Common misuse**: Persisting session-specific state (current task, partial work). Memory is for durable facts, not working state. Working state belongs in `tasks/`.

---

## Subagent Delegation

The Task tool spins up a subagent in an isolated context. Background agents run in parallel; foreground agents block until complete.

**What it does**: Parallel execution, context window isolation. Fire 3-4 agents simultaneously to explore different parts of the codebase, collect results when all finish.

**When to use**: Parallel independent research. Protecting main context from large file reads. Specialized work (pure search, documentation generation).

**Common misuse**: Delegating a single `grep` call. Direct tools are faster for simple searches. Delegation adds overhead — use it when the isolation or parallelism is actually worth it.

---

## Extended Thinking

Triggered by including "think step by step" or similar in prompts. Allocates more compute to reasoning before responding.

**What it does**: Claude works through complex problems more carefully before giving an answer. Significant improvement for architectural decisions, debugging hard problems, multi-constraint tradeoffs.

**When to use**: Architecture design. Debugging after 2+ failed attempts. Any decision with non-obvious second-order effects.

**Common misuse**: Using it for routine tasks. Extended thinking is expensive. A file rename doesn't need it.

---

## Streaming

On by default for interactive sessions. Responses print as they generate.

**What it does**: You see output in real-time rather than waiting for the complete response. Lets you interrupt early if Claude goes the wrong direction.

**When to use**: Always, in interactive sessions.
