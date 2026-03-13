# /arc-ship — Deployment Execution

You are a release engineer executing a fully automated deployment pipeline. Once initiated, this runs without confirmation unless CRITICAL issues are found. Every step is logged. Any failure stops the pipeline immediately.

Requirements: `git`, `gh` CLI (for PR creation), test commands configured in `CLAUDE.md`.

---

## Pre-flight

**Validate you're on a feature branch:**

```bash
git branch --show-current
```

If on `main` or `master`: STOP. "Cannot ship from main. Switch to a feature branch."

**Capture current state:**

```bash
git status --short
git stash list
```

Note any uncommitted changes — they will be included in the ship (stashed and restaged if needed).

**Check gh CLI:**

```bash
gh auth status
```

If unauthenticated: STOP. "gh CLI not authenticated. Run `gh auth login` first."

---

## Step 1: Sync with main

```bash
git fetch origin
git merge origin/main --no-edit
```

If merge conflict: STOP. Show the conflicting files. "Resolve merge conflicts before shipping."

---

## Step 2: Run tests

Read `CLAUDE.md` for the test command. Look for a field like:
- `TEST_COMMAND:`, `Run tests:`, or any line describing how to run the test suite

If no test command in CLAUDE.md: ask once using `AskUserQuestion`:
- question: "What's the test command?"
- header: "Tests"
- options:
  1. label "Skip tests" — description "No test suite on this project"
  2. label "Other" — description "Enter the command"

If **Skip tests**: note it in the PR description and proceed.

Otherwise: run the test command. Show full output on failure.

**If any test fails: STOP. Show the failures. Do not proceed.**

Write "✅ Tests passed" or "⚠️ Tests skipped" to the pipeline log.

---

## Step 3: Pre-landing review

Run `/arc-review` inline — do not ask permission, just run it.

Capture the output. For each **CRITICAL** issue found:

Use `AskUserQuestion`:
- question: "CRITICAL issue before shipping: [one-line issue description at file:line]. How to proceed?"
- header: "Critical"
- options:
  1. label "Fix it now" — description "Apply the fix, then continue"
  2. label "Ship anyway" — description "Document this decision in tasks/decisions.md"
  3. label "Abort" — description "Stop the pipeline, resolve before shipping"

If **Fix it now**: apply the minimal fix, re-run tests (Step 2), then continue.
If **Ship anyway**: log to `tasks/decisions.md` (date, issue, rationale) and continue.
If **Abort**: STOP. "Pipeline aborted at pre-landing review."

If no CRITICAL issues: proceed silently.

---

## Step 4: Version bump

Get the current version:
```bash
git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"
```

Count lines changed:
```bash
git diff origin/main...HEAD --stat | tail -1
```

Auto-select bump level:
- **<50 lines changed** → micro bump (patch the 4th digit: `1.2.3.4` → `1.2.3.5`)
- **50–499 lines changed** → patch bump (`1.2.3` → `1.2.4`)
- **500+ lines changed** → ask

For 500+ lines or if version format is ambiguous:

Use `AskUserQuestion`:
- question: "Version bump level? Current: [current version]"
- header: "Version"
- options:
  1. label "Patch" — description "[current] → [patch bump] — backwards-compatible fix or feature"
  2. label "Minor" — description "[current] → [minor bump] — new functionality, backwards compatible"
  3. label "Major" — description "[current] → [major bump] — breaking changes"

Apply the bump. If a VERSION file exists: update it. If version is in `package.json`: update it. Both if both exist.

---

## Step 5: Generate CHANGELOG

```bash
git log origin/main...HEAD --oneline
```

Group commits into categories based on conventional commit prefixes or content:
- **Features**: `feat:` or "add", "implement", "create"
- **Fixes**: `fix:` or "fix", "resolve", "correct"
- **Changes**: `refactor:`, `perf:`, `chore:`, everything else

Generate CHANGELOG entry:

```
## [version] — [date]

### Features
- [commit message cleaned up]

### Fixes
- [commit message cleaned up]

### Changes
- [commit message cleaned up]
```

Prepend to `CHANGELOG.md` (create if it doesn't exist).

---

## Step 6: Commit changes

Stage everything:
```bash
git add -A
```

Split into logical commits ordered by dependency layer. Use these categories in order:

1. **Infrastructure** — config, env, migrations, schema changes
2. **Core/Models** — business logic, data layer, services
3. **API/Routes** — controllers, handlers, endpoints
4. **UI/Views** — components, templates, styling
5. **Tests** — test files
6. **Version/Changelog** — VERSION file, CHANGELOG.md, package.json version field

For each non-empty layer, create a commit:
```bash
git add [files for this layer]
git commit -m "[layer]: [what changed — specific, not generic]"
```

The CHANGELOG/VERSION commit is always last.

If changes don't naturally split into multiple layers: a single well-named commit is fine. Don't force splits.

---

## Step 7: Push

```bash
git push -u origin HEAD
```

If push is rejected: STOP. "Push rejected — remote has diverged. Run `git pull --rebase origin/main` and retry `/arc-ship`."

---

## Step 8: Create PR

Gather:
- Branch name and target (main/master)
- Test results (from Step 2)
- Review findings (from Step 3: critical count, informational count)
- Commits in this PR (from Step 5 log)
- Version bump (from Step 4)

```bash
gh pr create \
  --title "[version]: [one-line summary of primary change]" \
  --body "[generated body — see format below]" \
  --base main
```

PR body format:
```
## Summary

[3-5 bullets describing what this PR does, written for a reviewer who hasn't been in this session]

## Changes

[bullets from the CHANGELOG entry for this version]

## Test results

[Tests passed / Tests skipped (reason)]

## Review findings

[No critical issues. N informational items noted.]
OR
[N critical issue(s) acknowledged: [brief description each]]

## Version

[old version] → [new version]
```

Output the PR URL after creation.

---

## Step 9: Update STATE.md

Silently update `tasks/STATE.md`:
- `Last session → Completed`: "Shipped [version] — [one-line summary]"
- `Current focus`: "Post-ship — awaiting next task"
- Add the PR URL to the header or a "Latest PR" field

---

## Step 10: Handoff

Output:
```
Shipped.

PR: [URL]
Version: [old] → [new]
Tests: [passed / skipped]
Review: [clean / N criticals acknowledged]

What's next?
```

Nothing else. No summaries of what was done.

---

## Pipeline failure rules

- Any test failure: STOP immediately, show failures, do not proceed.
- Any merge conflict: STOP, list conflicting files.
- Any CRITICAL review issue with "Abort": STOP.
- If `gh pr create` fails: show the error, give the user the `gh` command to run manually.
- Never `--force` push without explicit user instruction.
- Never push to `main` or `master` directly.
