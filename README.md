# ARC — Anthropic Runtime Configuration Framework

A modular prompt engineering system for Claude Code. Stop re-explaining your preferences on every project. Start with the right context, every time.

**What it solves**: Claude's output quality degrades when it lacks project context — your stack, constraints, quality bar, and conventions. ARC eliminates that friction by providing composable templates, a guided setup skill, and anti-slop guardrails baked into every project from the start.

---

## Quickstart (2 minutes)

### 1. Install

```bash
npx arc-setup
```

Installs all skills into `~/.claude/skills/`. Requires Node 16+ and git.

### 2. Set up a new project

Open Claude Code in your project folder, then:

```
/arc-init
```

3 quick questions. Creates `CLAUDE.md` and `tasks/`. Done.

### 3. Optional: Full kickoff interview

```
/arc-kickoff
```

~15 minute structured interview that builds deep project context — project brief, voice calibration, CLAUDE.md validation, and a portable context export. Strongly recommended for anything beyond a one-off script.

### 4. Start every session with

```
/arc-resume
```

---

## What you get

After setup, every Claude session on that project starts with:
- Project name, description, and domain loaded
- Quality bar set (prototype / MVP / production)
- Hard constraints captured
- Anti-slop rules enforced
- Plan-first workflow activated
- Voice calibrated to how you communicate

No re-explaining. No generic output.

---

## Repo structure

```
arc/
├── README.md                    ← you are here
├── SPEC.md                      ← full design specification
│
├── core/                        ← Principles (read these)
│   ├── principles.md            ← prompt engineering fundamentals
│   ├── anti-slop.md             ← anti-generic-output system
│   ├── mental-models.md         ← how to think about prompting
│   ├── execution-discipline.md  ← runtime behavior rules
│   ├── failure-modes.md         ← common failures + recovery
│   └── prompt-debugging.md      ← when your prompt isn't working
│
├── templates/                   ← Composable templates
│   ├── claude-md/               ← CLAUDE.md building blocks
│   │   ├── base.md              ← universal base (all projects)
│   │   ├── software-eng.md      ← software engineering overlay
│   │   ├── content-publishing.md
│   │   ├── business-strategy.md
│   │   ├── learning-research.md
│   │   ├── productivity.md
│   │   ├── decision-frameworks.md
│   │   └── generic.md
│   ├── kickoff/                 ← Domain-specific interview checklists
│   └── prompts/                 ← 50+ prompt patterns by domain
│
├── domains/                     ← Industry expertise modules
│   ├── README.md                ← how to use domain modules
│   ├── saas.md                  ← B2B SaaS
│   ├── fintech.md               ← financial technology
│   ├── e-commerce.md            ← online retail
│   ├── developer-tools.md       ← tools for developers
│   ├── mobile-app.md            ← native/cross-platform mobile
│   ├── ai-ml.md                 ← AI/ML products
│   ├── healthcare.md            ← health tech
│   ├── education.md             ← edtech
│   ├── marketplace.md           ← two-sided marketplaces
│   └── gaming.md                ← games
│
├── skills/                      ← Claude Code skills
│   ├── arc-init/skill.md        ← /arc-init: project setup
│   ├── arc-kickoff/skill.md     ← /arc-kickoff: full interview
│   ├── arc-resume/skill.md      ← /arc-resume: session start
│   ├── arc-rekickoff/skill.md   ← /arc-rekickoff: mid-project reset
│   ├── arc-check/skill.md       ← /arc-check: quality checker
│   ├── arc-progress/skill.md    ← /arc-progress: health dashboard
│   └── arc-export/skill.md      ← /arc-export: portable context export
│
├── tasks-template/              ← Per-project task tracking
│   ├── plan.md
│   ├── todo.md
│   ├── lessons.md
│   └── decisions.md
│
├── claude-code/                 ← Claude Code mastery layer
│   ├── features-guide.md
│   ├── claude-md-guide.md
│   ├── skills-guide.md
│   ├── hooks-guide.md
│   ├── mcp-guide.md
│   ├── memory-strategy.md
│   ├── subagents-guide.md
│   └── advanced-patterns.md
│
├── examples/                    ← Before/after prompt examples
│   └── software-eng/
│       ├── bad-prompt-vs-good.md
│       └── real-project-walkthrough.md
│
└── setup/
    └── install.md               ← Manual installation guide
```

---

## Skills reference

| Skill | When to use |
|-------|------------|
| `/arc-init` | Start of any new project. Creates `CLAUDE.md` + `tasks/`. Takes 2 minutes. |
| `/arc-kickoff` | After init, for serious projects. ~15 minute interview. Builds deep context, calibrates voice, exports portable context. |
| `/arc-resume` | Start of every working session. Reads context, surfaces blockers, asks what to work on. |
| `/arc-rekickoff` | Mid-project when scope changes, direction pivots, or you need to re-orient. |
| `/arc-check` | After generating any significant output. Runs a structured quality review. |
| `/arc-progress` | Project health dashboard. Shows context health, open questions, todo summary. |
| `/arc-export` | Assembles a portable context prompt. Paste into Claude.ai or share with teammates. |

---

## Composition model

A project's `CLAUDE.md` is assembled from layers:

```
base.md + domain overlay + [industry module] + project overrides
```

Examples:
- Fintech SaaS: `base.md + software-eng.md + fintech.md + saas.md`
- YouTube channel: `base.md + content-publishing.md + education.md`
- Market analysis: `base.md + business-strategy.md + saas.md`
- Learning Rust: `base.md + learning-research.md + developer-tools.md`

The `/arc-init` skill handles composition automatically based on your answers.

---

## The three non-negotiables

Every ARC project enforces three things, regardless of domain:

1. **Plan before building.** Non-trivial tasks start with a written plan in `tasks/plan.md`. This prevents the most common Claude failure: jumping into implementation before understanding the problem.

2. **Anti-slop.** Every output must contain information specific to your project. If it could apply to any project in the same category, it's generic and needs to be redone.

3. **Evidence before done.** Code needs clean diagnostics. Builds need exit code 0. Plans need verification steps. Nothing is marked complete without proof.

---

## How templates work

The `templates/claude-md/` files are building blocks, not complete CLAUDE.md files. They use `{{VARIABLE}}` placeholders that `/arc-init` fills with your project's actual values.

If you want to compose manually:
1. Start with `templates/claude-md/base.md`
2. Append the relevant overlay(s)
3. Append any domain module(s) from `domains/`
4. Fill all `{{VARIABLE}}` placeholders with real values
5. Add project-specific rules at the bottom

Target: under 3,000 words total. Over that, Claude's instruction-following degrades.

---

## Prompt patterns

`templates/prompts/` has 50+ patterns organized by domain and goal. Each pattern is a tested prompt template with variable slots and usage notes.

See `templates/prompts/README.md` for the goal-oriented index (start from what you want to accomplish, not which category it's in).

---

## Contributing a domain module

Domain modules in `domains/` follow a fixed structure. See `domains/README.md` for the format and the quality bar for inclusion. The test: does this module tell Claude something it couldn't infer from general knowledge? If not, it doesn't belong.

---

## License

MIT. Use it, fork it, modify it. Attribution appreciated but not required.
