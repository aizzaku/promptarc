# ARC — Anthropic Runtime Configuration Framework

A complete development operating system for Claude Code. Setup, planning, execution, quality, and retrospectives — in one coherent framework.

**What it solves**: Claude's output quality degrades when it lacks project context. And even with context, there's no standard workflow for planning before building, reviewing before shipping, or extracting lessons after shipping. ARC gives you the full cycle: context setup → plan → build → review → ship → retro.

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

**Context layer**: Every session starts loaded — domain, stack, constraints, quality bar, voice calibration. No re-explaining.

**Planning layer**: `/arc-plan` surfaces the real product before a line of code is written, maps failure modes, and produces a sequenced implementation plan.

**Execution layer**: `/arc-review` catches security holes and data bugs before PR creation. `/arc-ship` automates the entire deployment pipeline — tests, review, version bump, changelog, PR.

**Quality layer**: `/arc-check` validates outputs against anti-slop rules, domain-specific checks, and deployment safety.

**Memory layer**: `/arc-retro` extracts lessons after each sprint. `tasks/lessons.md` accumulates institutional knowledge. `STATE.md` keeps sessions continuous.

No re-explaining. No generic output. No lost context between sessions.

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
│   ├── deployment-safety.md     ← production deployment principles
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
├── domains/                     ← Industry expertise modules (23 domains)
│   ├── README.md                ← how to use domain modules
│   ├── saas.md / fintech.md / healthcare.md ...
│   └── [20+ more domains]
│
├── skills/                      ← Claude Code skills
│   ├── arc-init/skill.md        ← /arc-init: project setup
│   ├── arc-kickoff/skill.md     ← /arc-kickoff: full interview + arch diagram
│   ├── arc-resume/skill.md      ← /arc-resume: session start + git awareness
│   ├── arc-rekickoff/skill.md   ← /arc-rekickoff: mid-project reset
│   ├── arc-plan/skill.md        ← /arc-plan: architectural planning (EXPAND/HOLD/REDUCE)
│   ├── arc-review/skill.md      ← /arc-review: pre-PR code review
│   ├── arc-ship/skill.md        ← /arc-ship: automated deployment pipeline
│   ├── arc-check/skill.md       ← /arc-check: quality + deployment safety checker
│   ├── arc-progress/skill.md    ← /arc-progress: health dashboard
│   ├── arc-retro/skill.md       ← /arc-retro: sprint retrospective
│   └── arc-export/skill.md      ← /arc-export: portable context export
│
├── references/
│   ├── review-checklist.md      ← customizable review checklist for arc-review
│   ├── continuation-format.md
│   └── verification-patterns.md
│
├── tasks-template/              ← Per-project task tracking
│   ├── plan.md
│   ├── todo.md
│   ├── lessons.md
│   └── decisions.md
│
├── claude-code/                 ← Claude Code mastery layer
│   └── [guides: features, hooks, mcp, memory, subagents, advanced]
│
├── examples/                    ← Before/after prompt examples
│   └── software-eng/
│
└── setup/
    └── install.md               ← Manual installation guide
```

---

## Skills reference

### Setup & context

| Skill | When to use |
|-------|------------|
| `/arc-init` | Start of any new project. Creates `CLAUDE.md` + `tasks/`. Takes 2 minutes. |
| `/arc-kickoff` | After init, for serious projects. ~15 minute interview. Builds deep context, calibrates voice, generates architecture diagram, exports portable context. |
| `/arc-resume` | Start of every working session. Reads context, surfaces blockers, uncommitted changes, open PRs. |
| `/arc-rekickoff` | Mid-project when scope changes, direction pivots, or you need to re-orient. |
| `/arc-export` | Assembles a portable context prompt. Paste into Claude.ai or share with teammates. |

### Planning & execution

| Skill | When to use |
|-------|------------|
| `/arc-plan` | Before writing code. Default EXPAND mode: finds the real product, maps delight opportunities, failure modes, produces sequenced implementation plan. Modes: EXPAND / HOLD / REDUCE. |
| `/arc-review` | Before creating a PR. Two-pass diff review: CRITICAL (security, data, auth) then INFORMATIONAL (quality, wiring, tests). Domain-aware. |
| `/arc-ship` | When ready to land a feature. Fully automated: merge → tests → review → version bump → changelog → commits → push → PR. |

### Quality & retrospective

| Skill | When to use |
|-------|------------|
| `/arc-check` | After generating any significant output. Structured quality review with domain-specific checks, stub detection, wiring verification, and deployment safety. |
| `/arc-progress` | Project health dashboard. Shows context health, open questions, todo summary. |
| `/arc-retro` | End of sprint or after a significant milestone. Reviews what shipped, what broke, context health, extracts actionable lessons. |

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

## The workflow

```
New project:   /arc-init → /arc-kickoff
Every session: /arc-resume
Before coding: /arc-plan
After coding:  /arc-check → /arc-review → /arc-ship
End of sprint: /arc-retro
```

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
