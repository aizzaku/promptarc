# Hooks Guide

## What Hooks Are

Hooks are scripts that fire on Claude Code tool events. They run outside Claude's context — they're OS-level processes that Claude Code executes before or after specific tool calls.

The value: automation that doesn't depend on Claude remembering to do something. If you hook PostToolUse on the Edit tool to run prettier, code gets formatted after every file write, every time, without Claude needing to be told.

---

## Hook Types

**`PreToolUse`** — Fires before a tool executes. Exit non-zero to block the tool from running.

Use for: validating commands before they run, blocking destructive operations, requiring confirmation for specific patterns.

Example: Block `rm -rf` unless an environment variable is set.

**`PostToolUse`** — Fires after a tool executes successfully. Receives the tool's output.

Use for: formatting code after file edits, running tests after code changes, logging tool calls, updating state files.

Example: Run `prettier --write` on any file the Edit tool just modified.

**`Stop`** — Fires before Claude ends a session turn.

Use for: cleanup, final validation, ensuring required checks ran before the session closes.

Example: Warn if any files in `/src` were modified but `npm run typecheck` wasn't run in this turn.

**`Notification`** — Fires on Claude's notification events (task completion, errors, etc.)

Use for: system notifications, Slack pings, logging.

---

## Configuration

Hooks live in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": {
          "tool_name": "Edit"
        },
        "command": "scripts/hooks/format-on-save.sh"
      }
    ],
    "PreToolUse": [
      {
        "matcher": {
          "tool_name": "Bash"
        },
        "command": "scripts/hooks/validate-bash.sh"
      }
    ]
  }
}
```

The `matcher` filters which tool calls trigger the hook. Match by `tool_name`, or leave it empty to fire on all tool calls of that type.

---

## Hook Script Interface

Hook scripts receive context via stdin as JSON. The structure varies by hook type.

PreToolUse stdin:
```json
{
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/src/components/Button.tsx",
    "old_string": "...",
    "new_string": "..."
  }
}
```

PostToolUse stdin:
```json
{
  "tool_name": "Edit",
  "tool_input": { ... },
  "tool_output": { "success": true }
}
```

Scripts can read this with standard stdin parsing. In bash: `input=$(cat)`. In Node: `process.stdin.read()`.

To block a PreToolUse hook from proceeding: exit with a non-zero code. Claude Code will abort the tool call and surface the hook's stdout as an error message. Use this to communicate why the block happened.

---

## Concrete Examples

**Auto-format after file writes:**
```bash
#!/bin/bash
input=$(cat)
file=$(echo "$input" | jq -r '.tool_input.file_path')
if [[ "$file" == *.ts || "$file" == *.tsx ]]; then
  npx prettier --write "$file" 2>/dev/null
fi
```

**Run tests after modifying test-adjacent files:**
```bash
#!/bin/bash
input=$(cat)
file=$(echo "$input" | jq -r '.tool_input.file_path')
if [[ "$file" == */src/* ]]; then
  npm test --testPathPattern="$(basename $file .ts)" --passWithNoTests 2>&1
fi
```

**Warn before destructive bash commands:**
```bash
#!/bin/bash
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command')
if echo "$cmd" | grep -qE 'rm -rf|DROP TABLE|DELETE FROM.*WHERE'; then
  echo "BLOCKED: Destructive command requires manual execution: $cmd"
  exit 1
fi
```

**Log all bash commands for audit:**
```bash
#!/bin/bash
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command')
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) BASH: $cmd" >> ~/.claude/audit.log
```

---

## Performance Constraints

Hooks run synchronously in the tool loop. A PreToolUse hook that takes 3 seconds adds 3 seconds to every matching tool call.

Rules:
- Hooks that run on high-frequency tools (Edit, Bash) must complete in under 500ms
- Run tests in PostToolUse only if scoped to the changed file — don't run the full suite on every edit
- If you need a slow operation, do it in Stop (once per turn) rather than PostToolUse (every tool call)

---

## Security

Hooks run with the same OS permissions as Claude Code — your user permissions. This is significant:

- Don't put credentials or API keys in hook scripts. They're in a git-tracked file.
- Don't write hooks that silently exfiltrate data.
- Hooks can be a supply chain attack vector if your `.claude/settings.json` is modified by a dependency or a compromised file. Audit your hook scripts like code, because they are code.
- Keep hook scripts in a `scripts/hooks/` directory you control, not inline commands in settings.json.
