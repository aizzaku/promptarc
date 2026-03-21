# ARC — Context & Quality Layer for Claude

The setup and quality system for Claude Code. Gives Claude everything it needs to know about your project before writing a line — domain context, voice calibration, anti-slop rules, composition model. **Works alongside any execution engine** (GSD, Superpowers, or vanilla Claude Code).

**What it solves**: Claude's output quality degrades when it lacks project context, and even with context there's no consistent quality baseline across domains. ARC fixes both: composable `CLAUDE.md` templates for any project type, an anti-slop system that enforces quality at the output level, and voice calibration so Claude sounds like you — not a chatbot.

**Three core domains**: Software Engineering · Content Publishing · Business Strategy

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

**Context layer**: Every session starts loaded — domain, stack, voice, constraints, quality bar. Zero re-explaining.

**Anti-slop layer**: `/arc-check` enforces banned phrases, structural anti-patterns, and domain-specific quality rules. Nothing outputs until it passes.

**Quality layer**: Domain-aware quality checks, stub detection, wiring verification, and deployment safety — built into `/arc-check`.

**Memory layer**: `/arc-resume` reads context, runs health checks, and captures end-of-session lessons in `tasks/lessons.md`. Institutional knowledge accumulates automatically.

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
│   │   ├── generic.md
│   │   └── [industry overlays]  ← saas, fintech, healthcare, etc.
│   ├── kickoff/                 ← Domain-specific interview checklists
│   └── prompts/                 ← 50+ prompt patterns by domain
│
├── domains/                     ← Industry expertise modules (10 domains)
│   ├── README.md                ← how to use domain modules
│   └── saas / fintech / healthcare / ai-ml / gaming / ...
│
├── skills/                      ← Claude Code skills
│   ├── arc-init/skill.md        ← /arc-init: project setup
│   ├── arc-kickoff/skill.md     ← /arc-kickoff: full interview + context export
│   ├── arc-resume/skill.md      ← /arc-resume: session start + health check + lessons
│   ├── arc-rekickoff/skill.md   ← /arc-rekickoff: mid-project reset
│   ├── arc-check/skill.md       ← /arc-check: quality + anti-slop checker
│   └── arc-export/skill.md      ← /arc-export: portable context export
│
├── references/
│   ├── review-checklist.md      ← customizable quality checklist for arc-check
│   ├── continuation-format.md
│   └── verification-patterns.md
│
├── tasks-template/              ← Per-project task tracking
│   ├── plan.md
│   ├── todo.md
│   ├── lessons.md
│   └── decisions.md
│
└── examples/                    ← Before/after prompt examples
    ├── software-eng/
    ├── content/
    └── business-strategy/
```

---

## Skills reference

### Setup & context

| Skill | When to use |
|-------|------------|
| `/arc-init` | Start of any new project. Creates `CLAUDE.md` + `tasks/`. Takes 2 minutes. |
| `/arc-kickoff` | After init, for serious projects. ~15 minute interview. Builds deep context, calibrates voice, exports portable context. |
| `/arc-resume` | Start of every working session. Reads context, runs health checks, surfaces blockers + open questions. |
| `/arc-rekickoff` | Mid-project when scope changes, direction pivots, or you need to re-orient. |
| `/arc-export` | Assembles a portable context prompt. Paste into Claude.ai or share with teammates. |

### Quality

| Skill | When to use |
|-------|------------|
| `/arc-check` | After generating any significant output. Anti-slop enforcement, domain-specific checks, stub detection, wiring verification, deployment safety. |

---

## The workflow

```
New project:       /arc-init → /arc-kickoff
Every session:     /arc-resume
After any output:  /arc-check
Scope change:      /arc-rekickoff
Share context:     /arc-export
```

### Works alongside GSD and Superpowers

Arc is a **context layer**, not a full SDLC engine. Pair it with execution tools:

| Layer | Tool |
|-------|------|
| Context & quality | **Arc** (this repo) |
| Code execution & planning | [GSD](https://github.com/gsd-build/get-shit-done) |
| TDD & subagent workflow | [Superpowers](https://github.com/obra/superpowers) |

Arc configures Claude right. GSD and Superpowers build the code. For content, business strategy, and cross-domain work, Arc is the only layer you need.

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
- Learning Rust: `base.md + learning-research.md`

The `/arc-init` skill handles composition automatically based on your answers.

Target: under 3,000 words total. Over that, Claude's instruction-following degrades.

---

## The three non-negotiables

Every ARC project enforces three things, regardless of domain:

1. **Plan before building.** Non-trivial tasks start with a written plan in `tasks/plan.md`. This prevents the most common Claude failure: jumping into implementation before understanding the problem.

2. **Anti-slop.** Every output must contain information specific to your project. If it could apply to any project in the same category, it's generic and needs to be redone.

3. **Evidence before done.** Code needs clean diagnostics. Builds need exit code 0. Plans need verification steps. Nothing is marked complete without proof.

---

## Anti-slop system

The `core/anti-slop.md` file defines what Arc enforces across every domain:

- **Banned phrases**: "In today's fast-paced world", "Let's dive in", "Robust solution", "Game-changer", "Leverage" (when "use" works), and 30+ more
- **Structural anti-patterns**: Predictable H2/H2/H2 listicles, numbered lists as default structure, summary paragraphs that restate what was just said
- **Code anti-patterns**: Over-abstraction, enterprise patterns in simple projects, premature optimization
- **Voice profiles**: Per-project tone/register/personality calibration with domain defaults

`/arc-check` runs all of these against any output.

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
