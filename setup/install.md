# ARC Installation Guide

Three ways to install: the one-line setup command (recommended), clone directly, or copy only the pieces you need.

---

## Option A: npx (recommended, one-time)

```bash
npx arc-setup
```

Clones the repo, copies skills to `~/.claude/skills/`, and prints next steps. Requires git and Node 16+.

### Verify

In any Claude Code session, run `/arc-init`. If the skill loads and starts asking questions, installation is complete.

---

## Option B: git clone (manual)

Clone the repo to a permanent location:

```bash
git clone https://github.com/aizzaku/promptarc ~/.arc
```

### Install skills

Copy the skill files into Claude Code's skills directory:

```bash
cp -r ~/.arc/skills/* ~/.claude/skills/
```

Or add this to Claude Code's `settings.json` to reference the skills directly without copying:

```json
{
  "skillsDirectories": ["~/.arc/skills"]
}
```

### Verify

In any Claude Code session, run `/arc-init`. If the skill loads and starts asking questions, installation is complete.

---

## Option B: Manual install (just the templates)

If you only want the templates without the skills:

1. Find the template you need in `templates/claude-md/`
2. Copy `base.md` plus the relevant overlay into your project's `CLAUDE.md`
3. Replace all `{{VARIABLE}}` placeholders with real values
4. Copy `tasks-template/` files into your project's `tasks/` directory

That's it. The skills are a convenience layer; the templates work standalone.

---

## Per-project setup (after installing ARC)

For each new project:

### Quick setup (2 minutes)
```
/arc-init
```
Answers 6 questions, creates `CLAUDE.md` and `tasks/`.

### Full kickoff (15-30 minutes)
```
/arc-kickoff
```
Runs after `/arc-init`. Full structured interview that builds deep context.

---

## Updating ARC

```bash
cd ~/.arc && git pull
```

If you copied skills rather than referencing them directly, re-copy after pulling:

```bash
cp -r ~/.arc/skills/* ~/.claude/skills/
```

---

## File locations reference

| What | Where |
|------|-------|
| ARC repo | `~/.arc/` (recommended) or anywhere you prefer |
| Claude Code global config | `~/.claude/CLAUDE.md` |
| Claude Code skills | `~/.claude/skills/` |
| Per-project config | `[project]/CLAUDE.md` |
| Per-project task files | `[project]/tasks/` |

---

## Troubleshooting

**`/arc-init` doesn't work**: Check that the skill file is at `~/.claude/skills/arc-init/skill.md`. Claude Code looks for skills in subdirectories of the skills directory.

**Skills not loading**: In Claude Code settings, verify the skills directory path is correct. On Windows, use backslashes or check that the path expansion works.

**CLAUDE.md changes aren't taking effect**: In Claude Code, changes to CLAUDE.md take effect at the start of the next session. If you edited CLAUDE.md mid-session, start a new session.

**Word count over budget**: Run this from your project root to count words in your CLAUDE.md:
```bash
wc -w CLAUDE.md
```
Target is under 3,500 words. If over, see the compression guide in `claude-code/claude-md-guide.md`.

---

## Optional: `.gitignore` for task files

If you're using git in your project and don't want to commit task files:

```gitignore
# ARC task files (project-specific, often not needed in repo)
tasks/lessons.md
tasks/todo.md
tasks/plan.md
# Keep decisions.md in git — it's useful for teams
```

Or commit all of them — `tasks/decisions.md` and `tasks/plan.md` are particularly useful in team contexts.
