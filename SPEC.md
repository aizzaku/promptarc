# ARC — Anthropic Runtime Configuration Framework

## Spec v1.0 — Comprehensive Prompt Engineering System for Claude Code

---

## 1. Vision

ARC is a modular, principle-based prompt engineering framework that eliminates friction when starting any project with Claude Code. It provides composable templates, anti-slop guardrails, domain-specific modules, and a layered learning system — all accessible via both an interactive Claude Code skill and a standalone git repository.

**Success criteria** (all three must be met):
1. **Speed**: Quality Claude output in <5 minutes on any new project
2. **Consistency**: Uniformly high output regardless of project type or domain
3. **Zero re-explanation**: Preferences, conventions, and constraints never need restating

---

## 2. Target Domains

### 2.1 Software Engineering
- Stack evaluation and selection (pre-code phase)
- Architecture design and scaffolding
- Feature implementation, debugging, refactoring
- Greenfield and experimental projects (primary use case)
- All paradigms: functional, OOP, hybrid

### 2.2 Content Publishing
- Full pipeline: ideation → research → outline → draft → edit → publish
- Content types: long-form articles/blogs, video scripts/YouTube, social media/short-form, documentation, presentations, proposals, marketing copy
- Anti-slop as first-class concern


### 2.3 Business Strategy & Market Analysis
- Market sizing (TAM/SAM/SOM), competitive analysis, SWOT
- Business model design and validation (lean canvas, BMC)
- Go-to-market strategy, positioning, pricing
- Investor materials: pitch decks, executive summaries, financial projections
- Strategic planning: OKRs, roadmaps, scenario planning
- Partnership evaluation, M&A due diligence frameworks
- Unit economics modeling, cohort analysis narratives
- Anti-slop concern: no generic "synergy" / "disrupt" / "paradigm shift" filler

### 2.4 Learning & Research Synthesis
- Deep-dive research on unfamiliar topics (structured exploration)
- Literature review and source synthesis (academic, technical, industry)
- Mental model construction: turning scattered information into frameworks
- Curriculum design: self-directed learning plans with milestones
- Concept explanation at calibrated depth (ELI5 → expert)
- Comparative analysis across sources, identifying consensus vs. debate
- Knowledge gap identification: what you don't know that you don't know
- Anti-slop concern: no surface-level Wikipedia rewrites, must produce genuine insight

### 2.5 Personal Productivity & Planning
- Project breakdown: overwhelming scope → actionable task lists
- Weekly/monthly/quarterly planning and review cycles
- Goal setting frameworks (SMART, anti-SMART, commitment devices)
- Habit system design and tracking
- Time audit and priority frameworks (Eisenhower, ICE, RICE)
- Meeting prep: agendas, pre-reads, decision frameworks
- Personal knowledge management (PKM) system design
- Journaling and reflection prompts (structured introspection)
- Anti-slop concern: no generic productivity advice, must be specific to YOUR context

### 2.6 Decision Frameworks & Problem-Solving
- Structured decision-making: decision matrices, weighted scoring, pre-mortems
- First-principles decomposition of complex problems
- Pros/cons with second-order effects (not just surface tradeoffs)
- Risk assessment: probability × impact matrices, black swan identification
- Reversibility analysis: one-way doors vs. two-way doors
- Devil's advocate and red team prompting (steelman opposing views)
- Root cause analysis: 5 Whys, fishbone, fault tree
- Group decision facilitation: Delphi method, nominal group technique
- Anti-slop concern: no wishy-washy "it depends" — must commit to a recommendation with reasoning

### 2.7 Generic (Catch-All)
- Anything that doesn't fit domains 2.1–2.6
- Flexible base template with minimal assumptions
- Inherits core principles and anti-slop rules
- Designed to be extended per-project

---

## 3. Core Architecture

### 3.1 Layered File System

```
arc/
├── SPEC.md                          # This document
├── README.md                        # Quickstart guide
│
├── core/                            # Principle layer (timeless)
│   ├── principles.md                # Prompt engineering fundamentals
│   ├── anti-slop.md                 # Anti-generic-output system
│   ├── mental-models.md             # How to think about prompting
│   ├── failure-modes.md             # Common failures + recovery patterns
│   ├── execution-discipline.md      # Runtime behavior rules (plan-first, verification, elegance gate)
│   └── prompt-debugging.md          # "My prompt isn't working" — systematic troubleshooting
│
├── templates/                       # Template layer (composable)
│   ├── claude-md/                   # CLAUDE.md templates
│   │   ├── base.md                  # Universal base (all projects)
│   │   ├── software-eng.md          # Software engineering overlay
│   │   ├── content-publishing.md    # Content publishing overlay
│   │   ├── business-strategy.md     # Business & market analysis overlay
│   │   ├── learning-research.md     # Learning & research synthesis overlay
│   │   ├── productivity.md          # Personal productivity overlay
│   │   ├── decision-frameworks.md   # Decision & problem-solving overlay
│   │   └── generic.md               # Catch-all overlay
│   │
│   ├── kickoff/                     # Project kickoff checklists
│   │   ├── universal-checklist.md   # 30+ questions, every project
│   │   ├── software-eng-checklist.md
│   │   ├── content-checklist.md
│   │   ├── business-strategy-checklist.md
│   │   ├── learning-research-checklist.md
│   │   ├── productivity-checklist.md
│   │   ├── decision-frameworks-checklist.md
│   │   └── generic-checklist.md
│   │
│   └── prompts/                     # Prompt pattern library
│       ├── README.md                # How to use patterns (goal-oriented index)
│       ├── software-eng/            # SE-specific patterns
│       │   ├── architecture.md
│       │   ├── debugging.md
│       │   ├── code-review.md
│       │   ├── refactoring.md
│       │   ├── greenfield.md
│       │   └── stack-evaluation.md
│       ├── content/                 # Content-specific patterns
│       │   ├── ideation.md
│       │   ├── research.md
│       │   ├── outlining.md
│       │   ├── drafting.md
│       │   ├── editing.md
│       │   ├── video-scripts.md
│       │   └── social-media.md
│       ├── business-strategy/       # Business & strategy patterns
│       │   ├── market-analysis.md
│       │   ├── competitive-intel.md
│       │   ├── business-model.md
│       │   ├── go-to-market.md
│       │   ├── financial-modeling.md
│       │   └── pitch-materials.md
│       ├── learning-research/       # Learning & research patterns
│       │   ├── deep-dive.md
│       │   ├── source-synthesis.md
│       │   ├── mental-model-building.md
│       │   ├── curriculum-design.md
│       │   ├── concept-explanation.md
│       │   └── knowledge-gap-analysis.md
│       ├── productivity/            # Personal productivity patterns
│       │   ├── project-breakdown.md
│       │   ├── planning-cycles.md
│       │   ├── goal-setting.md
│       │   ├── priority-frameworks.md
│       │   ├── meeting-prep.md
│       │   └── reflection-journaling.md
│       ├── decision-frameworks/     # Decision & problem-solving patterns
│       │   ├── structured-decisions.md
│       │   ├── first-principles.md
│       │   ├── risk-assessment.md
│       │   ├── root-cause-analysis.md
│       │   ├── red-team-steelman.md
│       │   └── group-decisions.md
│       ├── cross-domain/             # Multi-domain patterns
│       │   ├── idea-to-architecture.md
│       │   ├── market-to-build-decision.md
│       │   ├── technical-content.md
│       │   ├── product-launch.md
│       │   ├── build-vs-buy.md
│       │   └── learning-for-project.md
│       └── generic/                 # Catch-all patterns
│           ├── analysis.md
│           ├── brainstorming.md
│           └── synthesis.md
│
├── tasks-template/                  # Per-project task tracking (generated by arc-init)
│   ├── plan.md                      # Current plan with checkable items
│   ├── todo.md                      # Active task list with status
│   ├── lessons.md                   # Mistakes + corrections (self-improvement loop)
│   └── decisions.md                 # Key decisions with rationale
│
├── domains/                         # Domain expertise modules (pre-built)
│   ├── README.md                    # How to use/create domain modules
│   ├── saas.md
│   ├── fintech.md
│   ├── e-commerce.md
│   ├── developer-tools.md
│   ├── mobile-app.md
│   ├── ai-ml.md
│   ├── gaming.md
│   ├── healthcare.md
│   ├── education.md
│   └── marketplace.md
│
├── claude-code/                     # Claude Code mastery layer
│   ├── features-guide.md           # Every CC feature explained
│   ├── claude-md-guide.md          # CLAUDE.md deep dive
│   ├── skills-guide.md             # Building and using skills
│   ├── hooks-guide.md              # Hook system mastery
│   ├── mcp-guide.md                # MCP servers guide
│   ├── memory-strategy.md          # What to persist where
│   ├── subagents-guide.md          # When and how to delegate
│   └── advanced-patterns.md        # Power user techniques
│
├── skills/                          # Claude Code skills
│   ├── arc-init/                    # Interactive project setup skill
│   │   └── skill.md
│   ├── arc-kickoff/                 # Project kickoff interview skill
│   │   └── skill.md
│   ├── arc-rekickoff/                # Mid-project re-kickoff skill
│   │   └── skill.md
│   └── arc-check/                   # Output quality checker skill
│       └── skill.md
│
├── examples/                        # Before/after examples
│   ├── software-eng/
│   │   ├── bad-prompt-vs-good.md
│   │   └── real-project-walkthrough.md
│   ├── content/
│   │   ├── bad-prompt-vs-good.md
│   │   └── real-project-walkthrough.md
│   ├── business-strategy/
│   │   ├── bad-prompt-vs-good.md
│   │   └── real-project-walkthrough.md
│   ├── learning-research/
│   │   ├── bad-prompt-vs-good.md
│   │   └── real-project-walkthrough.md
│   ├── productivity/
│   │   ├── bad-prompt-vs-good.md
│   │   └── real-project-walkthrough.md
│   ├── decision-frameworks/
│   │   ├── bad-prompt-vs-good.md
│   │   └── real-project-walkthrough.md
│   └── generic/
│       ├── bad-prompt-vs-good.md
│       └── real-project-walkthrough.md
│
└── setup/                           # Setup and distribution
    ├── npx-cli/                     # npx setup command
    │   ├── package.json
    │   ├── index.ts                 # Interactive CLI setup
    │   └── templates/               # Template files for generation
    └── install.md                   # Manual installation guide
```

### 3.2 Composition Model

Templates are **composable, not monolithic**. A project's CLAUDE.md is assembled from:

```
base.md + domain overlay + [domain module] + [project-specific overrides]
```

Example for a fintech SaaS project:
```
base.md + software-eng.md + fintech.md + saas.md + custom rules
```

Example for a YouTube tutorial series:
```
base.md + content-publishing.md + education.md + custom rules
```

Example for evaluating a market opportunity:
```
base.md + business-strategy.md + saas.md + custom rules
```

Example for learning a new programming language:
```
base.md + learning-research.md + developer-tools.md + custom rules
```

Example for quarterly planning:
```
base.md + productivity.md + custom rules
```

Example for choosing between two architecture approaches:
```
base.md + decision-frameworks.md + software-eng.md + custom rules
```

**Cross-domain composition**: Domains can stack. A project that involves building a SaaS product AND creating its go-to-market strategy uses:
```
base.md + software-eng.md + business-strategy.md + saas.md + custom rules
```

### 3.2A Composition Conflict Resolution

When multiple overlays are stacked, conflicts are inevitable. Resolution rules:

**Priority order** (highest wins):
1. `## NON-NEGOTIABLE` from ANY overlay (these never conflict — if they do, it's a framework bug)
2. Project-specific overrides (user's explicit customization)
3. Primary domain overlay (first overlay listed after base)
4. Secondary domain overlays (in listed order)
5. Domain modules
6. `base.md` defaults

**Example**: For `base.md + software-eng.md + content-publishing.md`:
- If SE says "be terse" and Content says "be detailed" → SE wins (listed first = primary domain)
- User can flip this by listing content first: `base.md + content-publishing.md + software-eng.md`

**Rule**: The first overlay after `base.md` is the PRIMARY domain. Its conventions take precedence on conflicts. This is stated in the composed CLAUDE.md's header.

### 3.2B Context Window Budget

Combined CLAUDE.md instructions have a practical ceiling. Exceeding it degrades Claude's instruction-following.

**Budget guidelines**:
| Component | Target Size | Max Size |
|-----------|-------------|----------|
| `base.md` | ~800 words | 1,200 words |
| Domain overlay | ~500 words each | 800 words each |
| Domain module | ~400 words | 600 words |
| Voice profile | ~150 words | 250 words |
| Project overrides | ~200 words | 400 words |
| **Total composed CLAUDE.md** | **~2,000 words** | **~3,500 words** |

**If over budget**:
1. Move detailed reference material out of CLAUDE.md into separate files Claude can read on-demand
2. Compress verbose rules into terse imperatives (guidelines file: `claude-code/claude-md-guide.md` covers how)
3. Use folder-level CLAUDE.md to offload module-specific rules from the root
4. Never sacrifice NON-NEGOTIABLE rules for space — trim SUGGESTED first, then DEFAULTS

**The `/arc-init` skill** automatically tracks word count during composition and warns if the result exceeds 3,000 words.

### 3.3 Governance Model

**Strong defaults, overridable.**

- Every template has clearly marked sections:
  - `## NON-NEGOTIABLE` — rules that should never be overridden (anti-slop, type safety, etc.)
  - `## DEFAULTS` — strong conventions, override with `<!-- OVERRIDE: reason -->` comment
  - `## SUGGESTED` — recommendations, take or leave

- Collaborators inherit the framework's conventions unless they explicitly opt out with documented reasoning.

---

## 3A. Runtime Execution Discipline

ARC's templates tell Claude WHAT to produce. This section defines HOW Claude should behave while working. These rules are embedded in `templates/claude-md/base.md` and inherited by every project.

> **Origin**: Adapted from a Manus-style file-based workflow system. ARC integrates these as first-class execution principles rather than ad-hoc instructions.

### 3A.1 Plan-First Protocol

Every non-trivial task (3+ steps or architectural decisions) MUST begin with a written plan before implementation.

**Mechanism**:
- Claude writes a plan to `tasks/plan.md` with checkable items before touching any code or producing deliverables
- Plan includes: scope, approach, files affected, risks, verification steps
- If execution deviates from the plan → STOP, re-plan, don't push through
- Plan mode applies to verification steps too, not just building

**Why this matters for prompting**: Most Claude failures come from premature execution — jumping into code before understanding the problem. The plan-first protocol forces the "think" step that prevents scope misunderstanding (your #1 pain point).

**Embedded in**: `base.md` as NON-NEGOTIABLE

### 3A.2 Persistent Task Tracking

All task state lives in files, not just in conversation memory.

**File structure** (generated per-project):
```
tasks/
├── plan.md          # Current plan with checkable items
├── todo.md          # Active task list with status
├── lessons.md       # Mistakes made + corrections (self-improvement loop)
└── decisions.md     # Key decisions with rationale (decision log)
```

**Workflow**:
1. **Plan First**: Write plan to `tasks/plan.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go (in the file, not just conversation)
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

**Why file-based, not just conversation**: Conversations die. Files persist. When you resume a project next week, `tasks/lessons.md` tells Claude what went wrong last time — preventing repeat mistakes. This directly addresses the "repetitive setup" pain point.

**Embedded in**: `base.md` as NON-NEGOTIABLE (the workflow steps) with DEFAULTS for file locations (teams may use different paths, but the workflow itself is mandatory)

> **Note**: This matches 3A.1 Plan-First — the plan-first protocol requires files to write plans to. The workflow is non-negotiable; the specific file paths are configurable.

### 3A.2B Decision Log (`tasks/decisions.md`)

Every significant decision gets logged — not just what was decided, but WHY and what was rejected.

**Format**:
```markdown
## [Date] — [Decision Title]
**Context**: [What prompted this decision]
**Options considered**:
1. [Option A] — [tradeoffs]
2. [Option B] — [tradeoffs]
**Decision**: [What was chosen]
**Rationale**: [Why this option won]
**Revisit if**: [Conditions that would invalidate this decision]
```

**When to log**:
- Architecture choices (database, framework, API design)
- Scope decisions (what's in, what's out, what's deferred)
- Business/strategy pivots
- Any decision the user explicitly makes after Claude presents options
- NOT for trivial choices (variable names, minor formatting)

**Relationship to Decision Frameworks domain**: The domain provides PATTERNS for making decisions. `tasks/decisions.md` is the LOG of decisions made. Different purposes.

**Embedded in**: `base.md` as DEFAULTS

### 3A.2C Session-Start Protocol

When Claude begins a new session on an existing project, it reads context in this order:

```
1. project/CLAUDE.md              → Project rules and conventions
2. tasks/lessons.md               → What went wrong before (DON'T REPEAT)
3. tasks/plan.md                  → Current plan status (WHERE WE LEFT OFF)
4. tasks/todo.md                  → Active task list (WHAT'S NEXT)
5. tasks/decisions.md             → Key decisions made (DON'T REVISIT)
```

**Claude's first action** in any resumed session:
- Read the above files (silently, no status update to user)
- If `tasks/plan.md` has incomplete items → resume from where the plan left off
- If `tasks/lessons.md` has entries → acknowledge them internally as active constraints
- If no task files exist → this is a new project, proceed normally

**Embedded in**: `base.md` as NON-NEGOTIABLE (the read order) + DEFAULTS (the files themselves)

### 3A.3 Self-Improvement Loop

Claude learns from corrections within a project via `tasks/lessons.md`.

**Trigger**: Any time the user corrects Claude's output — wrong pattern, bad assumption, style mismatch, etc.

**Process**:
1. After ANY correction from the user: capture the pattern in `tasks/lessons.md`
2. Write rules for Claude that prevent the same mistake
3. Review lessons at session start for the relevant project
4. Ruthlessly iterate — delete lessons that are no longer relevant

**Format**:
```markdown
## Lesson: [Date]
**Mistake**: [What went wrong]
**Correction**: [What the user wanted instead]
**Rule**: [Generalized rule to prevent recurrence]
```

**Relationship to Memory Strategy (Section 7.2)**:
- `tasks/lessons.md` = project-level corrections (lives with the project)
- Auto-memory = global preferences (lives with the user)
- If a lesson applies across ALL projects → promote it to auto-memory or global CLAUDE.md

**Embedded in**: `base.md` as DEFAULTS

### 3A.4 Verification-Before-Done Protocol

No task is marked complete without evidence.

| Action | Required Evidence |
|--------|-------------------|
| Code change | Linter/diagnostics clean on changed files |
| Build | Exit code 0 |
| Test run | Pass (or explicit note of pre-existing failures) |
| Content draft | Passes anti-slop checklist |
| Analysis/research | Sources cited, claims verifiable |
| Decision | Alternatives documented, reasoning explicit |
| Delegated work | Agent result received AND verified |

**The "staff engineer" test**: Before marking done, ask — "Would a staff engineer approve this?" If no, it's not done.

**Embedded in**: `base.md` as NON-NEGOTIABLE

### 3A.5 Elegance Check (Self-Review)

Before presenting non-trivial work, Claude reviews its own implementation — not as a quality gate after the fact, but as the final step OF implementation.

**Framing**: This is not "detection after the fact." It's the last phase of the build process, like a carpenter sanding before delivering furniture. The work isn't done until this step completes.

**Rules**:
- Before presenting a non-trivial implementation, evaluate: "Knowing everything I know now, would I implement this the same way?"
- If the answer is no → refactor before presenting. The user never sees the rough version.
- If a fix feels hacky → implement the elegant solution, not the quick patch
- Skip this for simple, obvious fixes — don't over-engineer
- This is self-directed, not user-facing (Claude doesn't ask the user, Claude challenges itself)

**Relationship to Anti-Slop**: Anti-slop prevents generic output. The elegance check prevents sloppy implementation. Different layers, same quality standard. Both are prevention mechanisms — they fire before the user sees anything.

**Embedded in**: `base.md` as SUGGESTED (can be skipped for speed-critical work)

### 3A.6 Failure Recovery Protocol

When implementation goes sideways:

1. **After a fix fails**: Fix root causes, not symptoms. Re-verify after EVERY attempt.
2. **After 3 consecutive failures**: STOP all edits. Revert to last working state. Document what was attempted. Reassess approach from scratch.
3. **Never**: Leave code in broken state, continue hoping it'll work, delete failing tests to "pass", shotgun debug (random changes).

**Embedded in**: `base.md` as NON-NEGOTIABLE

### 3A.7 Implementation Principles

Three rules that govern all Claude output during execution:

1. **Simplicity First**: Make every change as simple as possible. Minimal code. Minimal impact.
2. **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
3. **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs. A bugfix is NOT an invitation to refactor surrounding code.

**Embedded in**: `base.md` as NON-NEGOTIABLE

### 3A.8 Subagent Orchestration Philosophy

When Claude delegates to subagents:

- **Use subagents liberally** to keep the main context window clean
- **Offload** research, exploration, and parallel analysis to subagents
- **One task per subagent** — focused execution, not kitchen-sink prompts
- **For complex problems**: throw more compute at it via multiple parallel subagents
- **Always verify** subagent results before using them — agents can hallucinate too

**Relationship to Claude Code Mastery (Section 7)**: The mastery layer teaches you HOW to use subagents. This section defines WHEN and WHY. The `subagents-guide.md` will reference these principles.

**Embedded in**: `base.md` as DEFAULTS

---

## 4. Anti-Slop System

The #1 enemy is generic AI output. This is a first-class architectural concern, not an afterthought.

### 4.1 Anti-Slop Rules (embedded in every template)

**Banned phrases** (auto-enforced via CLAUDE.md):
- "In today's fast-paced world"
- "It's worth noting"
- "Let's dive in/deep dive"
- "In conclusion"
- "At the end of the day"
- "Game-changer"
- "Leverage" (when "use" works)
- "Robust" / "Comprehensive" / "Seamless" (without specifics)
- "Key takeaways"
- Full banned list maintained in `core/anti-slop.md`

**Structural anti-patterns** (prevented via instructions):
- No predictable H2/H2/H2 listicle structure unless explicitly requested
- No numbered lists as default organization
- No "Here are N ways to..." openings
- No summary paragraphs that restate what was just said
- No filler transitions between sections

**Code anti-patterns**:
- No over-abstraction (YAGNI enforced)
- No enterprise patterns in simple projects
- No unnecessary design patterns
- No boilerplate comments
- No premature optimization

### 4.2 Anti-Slop Principles (in core/anti-slop.md)

1. **Specificity over generality**: Every statement should contain information the reader doesn't already know
2. **Voice preservation**: Output should sound like the author, not like "an AI"
3. **Earned structure**: Structure should emerge from content, not be imposed on it
4. **Surprising > correct**: A technically correct but boring output is a failure
5. **Delete test**: If you can delete a sentence without losing information, delete it

### 4.3 Voice Profile System

Anti-slop tells Claude what NOT to sound like. Voice profiles tell Claude what TO sound like.

**Problem**: Banning generic phrases is necessary but insufficient. Without a target voice, Claude defaults to its own "helpful assistant" register — which is itself a form of slop.

**Mechanism**: Every project CLAUDE.md includes a `## Voice` section (generated during kickoff):

```markdown
## Voice

### Tone
[e.g., Direct and opinionated. Like a senior engineer explaining to a peer, not a teacher explaining to a student.]

### Register
[e.g., Technical but accessible. Use jargon when precise, plain language when possible.]

### Personality
[e.g., Confident, slightly irreverent. Willing to say "this is a bad idea" directly.]

### Reference Examples
[e.g., "Write like Paul Graham's essays" or "Match the tone of this existing doc: <link>"]

### Anti-voice (what NOT to sound like)
[e.g., Corporate blog post. Marketing copy. Wikipedia article. Customer support bot.]
```

**Per-domain defaults**:

| Domain | Default Voice |
|--------|--------------|
| Software Engineering | Senior engineer peer review — direct, technical, no hand-holding |
| Content Publishing | Author's own voice (captured from samples during kickoff) |
| Business Strategy | Analyst/advisor — data-driven, specific, no buzzwords |
| Learning & Research | Knowledgeable peer explaining — calibrated to stated level |
| Productivity | Coach — actionable, specific to YOUR situation, no platitudes |
| Decision Frameworks | Devil's advocate — challenges assumptions, forces clarity |
| Generic | Neutral-professional — adapts based on kickoff answers |

**Kickoff integration**: The `arc-kickoff` skill asks voice-related questions:
- "Paste a paragraph you've written that sounds like YOU" (for content domains)
- "Who writes the way you want Claude to write?" (reference voices)
- "What tone makes you cringe?" (anti-voice signals)

**Embedded in**: Domain overlays as DEFAULTS, overridable per-project

### 4.4 External Anti-Slop Tools

- **Humanizer skill**: https://github.com/blader/humanizer — use as a post-processing pass when content must pass AI-detection scrutiny (client deliverables, published articles). NOT a substitute for good prompting; use only when the stakes require it.
- **Integration**: Optional skill, not bundled. Referenced in `content-publishing.md` and `business-strategy.md` overlays as a SUGGESTED tool.

---

## 5. Prompt Pattern Library

### 5.1 Organization: Goal-Oriented

Patterns organized by "I want to..." not by technique name.

```
I want to...
│
├── SOFTWARE ENGINEERING
│   ├── Debug a problem I can't figure out
│   ├── Design an architecture from scratch
│   ├── Evaluate which tech stack to use
│   ├── Write code that matches an existing codebase
│   ├── Refactor without breaking things
│   ├── Review code for issues I might miss
│   └── Scaffold a new project the right way
│
├── CONTENT PUBLISHING
│   ├── Generate a first draft that doesn't sound like AI
│   ├── Turn rough notes into polished content
│   ├── Write a video script with natural pacing
│   ├── Create a social media thread from a long-form piece
│   ├── Edit my draft for clarity without losing voice
│   └── Research a topic for an article I'm writing
│
├── BUSINESS STRATEGY
│   ├── Size a market I'm considering entering
│   ├── Analyze my competitive landscape
│   ├── Design or validate a business model
│   ├── Build a go-to-market strategy
│   ├── Create a pitch deck narrative
│   └── Model unit economics for a new product
│
├── LEARNING & RESEARCH
│   ├── Deep-dive a topic I know nothing about
│   ├── Synthesize multiple sources into a coherent view
│   ├── Build a mental model for a complex system
│   ├── Design a self-study curriculum
│   ├── Explain a concept at the right depth for my level
│   └── Find what I don't know that I don't know
│
├── PERSONAL PRODUCTIVITY
│   ├── Break down an overwhelming project into tasks
│   ├── Plan my week/month/quarter
│   ├── Set goals that I'll actually follow through on
│   ├── Prioritize when everything feels urgent
│   ├── Prepare for an important meeting
│   └── Design a system/habit/routine
│
├── DECISION FRAMEWORKS
│   ├── Make a decision between multiple options
│   ├── Decompose a complex problem from first principles
│   ├── Assess risks I might be blind to
│   ├── Find the root cause of a recurring problem
│   ├── Stress-test my thinking with opposing views
│   └── Facilitate a group decision
│
├── CROSS-DOMAIN (multi-domain tasks)
│   ├── Research a market to decide whether to build a product (Learning + Business + Decision)
│   ├── Turn a business idea into a technical architecture (Business + SE)
│   ├── Write a technical blog post about something I built (SE + Content)
│   ├── Plan a product launch end-to-end (SE + Business + Content + Productivity)
│   ├── Evaluate build vs. buy for a component (Decision + SE + Business)
│   └── Create a learning plan for a new tech stack I need for a project (Learning + SE)
│
└── GENERIC
    ├── Analyze something I don't have a framework for
    ├── Brainstorm ideas without going generic
    └── Synthesize scattered information into structure
```

Each pattern includes:
- **When to use** (situation/trigger)
- **The pattern** (actual prompt template with variables)
- **Why it works** (principle explanation — the learning layer)
- **Common mistakes** (what goes wrong if you use it incorrectly)
- **Example** (real before/after)
- **Variations** (for different contexts)

### 5.2 Principle Anchoring

Every pattern maps back to a core principle from `core/principles.md`:
- Specificity amplification
- Context layering
- Constraint-driven creativity
- Role and perspective framing
- Chain-of-thought scaffolding
- Few-shot calibration
- Negative examples (what NOT to do)
- Meta-prompting (prompts that generate prompts)

### 5.3 Prompt Debugging Flow (in `core/prompt-debugging.md`)

When a prompt produces bad output, follow this diagnostic sequence instead of randomly rewriting:

```
STEP 1: DIAGNOSE — What type of failure?
├── Wrong scope      → Claude did too much or too little
├── Wrong style      → Right content, wrong tone/format/structure
├── Wrong content    → Factually wrong, generic, or off-topic
├── Wrong depth      → Too shallow or too detailed
└── Ignored rules    → Claude didn't follow explicit instructions

STEP 2: IDENTIFY ROOT CAUSE
├── Wrong scope      → Missing or ambiguous scope boundaries in prompt
├── Wrong style      → Missing voice profile, no anti-examples
├── Wrong content    → Insufficient context, no domain grounding
├── Wrong depth      → No calibration signal (who is the audience?)
└── Ignored rules    → Rules buried too deep, contradicted by other rules, too many rules

STEP 3: FIX (one change at a time)
├── Wrong scope      → Add explicit "DO this, do NOT do that" boundaries
├── Wrong style      → Add reference example or anti-example
├── Wrong content    → Add domain context, facts, constraints
├── Wrong depth      → Add audience signal: "explain as if to [persona]"
└── Ignored rules    → Move rule higher in prompt, simplify, reduce total rule count
```

**Key principle**: Change ONE thing per iteration. If you change three things and it improves, you don't know which fix worked — and you can't learn from it.

**Log iterations in `tasks/lessons.md`** when a prompt fix reveals a reusable insight.

---

## 6. Project Kickoff System

### 6.1 Comprehensive Checklist (30+ questions)

Universal questions (every project):
1. What is this project? (one sentence)
2. Who is the end user?
3. What's the one thing this must do well?
4. What's explicitly out of scope?
5. What's the timeline/urgency?
6. What's the quality bar? (MVP vs production vs perfection)
7. Who else is involved? (solo vs team, stakeholders)
8. What are the hard constraints? (tech, legal, budget, etc.)
9. What existing work does this build on?
10. How will success be measured?
11. What's the biggest risk?
12. What decisions have already been made?
13. What decisions are still open?
14. What's the deployment target?
15. What's the maintenance expectation?

Domain-specific questions branch from here (detailed in respective checklist files):

**Software Engineering** (15+ additional): Stack preferences, paradigm, testing strategy, deployment target, performance requirements, security model, API design, database choices, CI/CD, monitoring...

**Content Publishing** (15+ additional): Target audience, voice/tone, platform(s), content format, publication cadence, SEO requirements, visual assets, distribution channels, CTAs, existing content to reference...

**Business Strategy** (15+ additional): Stage (idea/seed/growth/scale), funding status, revenue model, target customer profile, competitive moat, key metrics, team composition, runway, regulatory landscape, partnership landscape...

**Learning & Research** (10+ additional): Current knowledge level, learning style preference, time commitment, source quality requirements, output format (notes/article/presentation), depth vs. breadth, specific knowledge gaps, prerequisite topics...

**Personal Productivity** (10+ additional): Current system (if any), main bottleneck, energy patterns, tools in use, accountability preferences, review cadence, work/life boundaries, delegation options...

**Decision Frameworks** (10+ additional): Decision type (reversible/irreversible), stakeholders involved, time pressure, information availability, risk tolerance, decision history (past similar decisions), success criteria, failure cost...

**Generic** (5+ additional): Primary objective, output format, quality definition, constraints, prior attempts...

### 6.2 Adaptive Depth

While the framework is comprehensive by default (30+ questions), the interactive skill (`arc-kickoff`) adapts:
- Required questions always asked
- Follow-up questions branch based on answers
- Can skip sections the user marks as "not applicable"
- Generates a project brief from answers that feeds into CLAUDE.md

### 6.3 Mid-Project Re-Kickoff

Projects change. The kickoff system must handle pivots, not just starts.

**Triggers for re-kickoff**:
- Tech stack change (e.g., switching from REST to GraphQL)
- Scope expansion or contraction beyond original plan
- New team member joining who needs context
- Domain pivot (e.g., MVP became a real product — shift from greenfield to production)
- Quality bar change (e.g., prototype → investor demo → production)

**Process** (`/arc-rekickoff` or manual):
1. Review existing `tasks/decisions.md` and project CLAUDE.md
2. Identify what changed (diff against original kickoff answers)
3. Re-ask only the affected questions (not the full checklist)
4. Update the composed CLAUDE.md with new overlay priorities if needed
5. Archive the previous CLAUDE.md as `CLAUDE.md.prev` for reference
6. Update `tasks/decisions.md` with the pivot rationale

**Embedded in**: `arc-kickoff` skill as a secondary mode. Also documented in `claude-code/advanced-patterns.md`.

---

## 7. Claude Code Mastery Layer

### 7.1 Feature Coverage

Complete guide to every Claude Code feature:

| Feature | Guide File | Depth |
|---------|-----------|-------|
| CLAUDE.md hierarchy | claude-md-guide.md | Deep — global, project, folder-level strategies |
| Custom skills | skills-guide.md | Deep — building, installing, sharing skills |
| Hooks system | hooks-guide.md | Full — pre/post hooks, validation, automation |
| MCP servers | mcp-guide.md | Full — available servers, custom server creation |
| Auto-memory | memory-strategy.md | Strategic — what to persist, layered system |
| Subagent delegation | subagents-guide.md | Deep — when to use each agent type, prompt patterns |
| Advanced patterns | advanced-patterns.md | Power user — combining features, workflows |

### 7.2 Memory Strategy (Layered Persistence)

| Layer | Location | What Goes Here | Lifecycle |
|-------|----------|----------------|-----------|
| **Global preferences** | `~/.claude/CLAUDE.md` + auto-memory | Communication style, universal rules, tool preferences | Permanent, rarely changes |
| **Project conventions** | `project/CLAUDE.md` | Stack-specific rules, patterns, architecture decisions | Per-project, evolves with codebase |
| **Project lessons** | `project/tasks/lessons.md` | Mistakes made + corrections, project-specific rules learned | Per-project, grows over time |
| **Project state** | `project/tasks/plan.md`, `todo.md`, `decisions.md` | Current plan, active tasks, decision rationale | Per-project, active during work |
| **Folder context** | `project/src/module/CLAUDE.md` | Module-specific patterns, local conventions | Per-module |
| **Session context** | Ephemeral (conversation) | Current task, immediate goals | Dies with session |

**Promotion path**: If a lesson in `tasks/lessons.md` applies globally → move it to `~/.claude/CLAUDE.md` or auto-memory. If it's project-specific but permanent → move it to the project's `CLAUDE.md`.

---

## 8. Domain Modules (Pre-Built)

Each domain module contains:

```markdown
# Domain: [Name]

## Context Primer
[What Claude needs to know about this domain]

## Common Patterns
[Typical architectures, workflows, conventions]

## Domain Vocabulary
[Terms Claude should use correctly]

## Regulatory/Compliance
[Legal or regulatory considerations if applicable]

## Common Pitfalls
[Domain-specific mistakes to avoid]

## Quality Signals
[What "good" looks like in this domain]

## Anti-Patterns
[What "bad" looks like — domain-specific slop]

## Recommended Stack/Tools
[If software: tech stack. If content: tools/platforms.]
```

Pre-built domains: SaaS, Fintech, E-commerce, Developer Tools, Mobile App, AI/ML, Gaming, Healthcare, Education, Marketplace.

---

## 9. Distribution: Dual-Path

### 9.1 Path A: Git Repository (Standalone)

```bash
git clone <repo> my-project/.arc
# or
git clone <repo> ~/.arc  # global installation
```

- README with clear quickstart
- Copy relevant templates into project
- Works without Claude Code (templates are just markdown)

### 9.2 Path B: Interactive Claude Code Skill

```
/arc-init
```

Conversational setup that:
1. Asks about project type, domain, preferences
2. Selects appropriate templates
3. Composes a CLAUDE.md from base + overlays + domain
4. Generates project-specific kickoff checklist
5. Installs relevant prompt patterns as reference

Both paths produce identical output — the skill just automates the composition.

### 9.3 npx CLI (Bridge)

```bash
npx arc-init
```

Interactive CLI that:
- Works outside Claude Code
- Asks the same questions as the skill
- Generates the same file structure
- Can be used in CI/CD or scripted setups

---

## 10. Examples System

All 7 domains include before/after examples showing:

1. **Bad prompt** → generic/sloppy output
2. **Good prompt** (using ARC pattern) → specific/quality output
3. **Why the difference** → principle explanation
4. **Real project walkthrough** → end-to-end example of using the framework on a real project

Examples are the primary learning mechanism. The framework teaches by showing, not telling.

---

## 11. Governance & Collaboration

### 11.1 Convention Levels

| Level | Marker | Meaning | Override Process |
|-------|--------|---------|-----------------|
| **Non-negotiable** | `## NON-NEGOTIABLE` | Type safety, anti-slop, security | Cannot be overridden |
| **Default** | `## DEFAULTS` | Strong conventions | Override with documented reason |
| **Suggested** | `## SUGGESTED` | Recommendations | Override freely |

### 11.2 Team Onboarding

When sharing with collaborators:
1. **Opinionated defaults** — clone and it works
2. **Guided customization** — `/arc-init` skill walks through personalization
3. **Example-driven learning** — `examples/` directory teaches by showing

---

## 12. Design Principles (Meta)

### Template Principles (what to say)
1. **Composable > monolithic**: Small pieces that combine, not one massive template
2. **Principle-based > rule-based**: Understand WHY so you can improvise
3. **Goal-oriented > technique-oriented**: "I want to debug" not "Use chain-of-thought"
4. **Prevention > detection**: Strong prompts upfront, not quality checks after
5. **Opinionated defaults > blank slates**: Works out of the box, customize later
6. **Show > tell**: Examples over explanations
7. **Layered depth**: Quick-grab on top, deep understanding underneath
8. **Model-agnostic principles**: Core principles survive Claude model updates

### Execution Principles (how to work)
9. **Plan before build**: Write the plan to a file before writing any code or content
10. **File-based state > conversation state**: Persistent artifacts outlive sessions
11. **Self-correction compounds**: Every captured mistake prevents future mistakes
12. **Evidence-based completion**: No task is done without proof it works
13. **Elegance is part of building, not checking**: Self-review before delivery is the last build step, not a quality gate
14. **Fail fast, revert faster**: 3 failures = stop, revert, reassess from scratch

---

## 13. Implementation Phases

### Phase 1: Core Foundation
- [ ] `core/principles.md` — Prompt engineering fundamentals
- [ ] `core/anti-slop.md` — Anti-generic-output system
- [ ] `core/mental-models.md` — How to think about prompting
- [ ] `core/failure-modes.md` — Common failures + recovery
- [ ] `core/execution-discipline.md` — Runtime behavior rules (Section 3A)
- [ ] `core/prompt-debugging.md` — Systematic prompt troubleshooting (Section 5.3)
- [ ] `templates/claude-md/base.md` — Universal CLAUDE.md base (includes execution discipline + voice profile skeleton)
- [ ] `tasks-template/` — Plan, todo, lessons, decisions templates

### Phase 2: Domain Templates
- [ ] `templates/claude-md/software-eng.md`
- [ ] `templates/claude-md/content-publishing.md`
- [ ] `templates/claude-md/business-strategy.md`
- [ ] `templates/claude-md/learning-research.md`
- [ ] `templates/claude-md/productivity.md`
- [ ] `templates/claude-md/decision-frameworks.md`
- [ ] `templates/claude-md/generic.md`
- [ ] `templates/kickoff/` — All 8 checklists (universal + 7 domain-specific)
- [ ] `templates/prompts/` — Pattern library (all 7 domains)

### Phase 3: Domain Modules
- [ ] All 10 pre-built domain modules in `domains/`

### Phase 4: Claude Code Mastery
- [ ] All guides in `claude-code/`

### Phase 5: Examples
- [ ] Before/after examples for all 7 domains
- [ ] Real project walkthroughs for each domain

### Phase 6: Distribution
- [ ] Claude Code skills (`arc-init`, `arc-kickoff`)
- [ ] npx CLI tool
- [ ] README and installation guide

### Phase 7: Polish
- [ ] Cross-link everything (patterns → principles → examples)
- [ ] Test with real projects across all three domains
- [ ] Collaborator testing and feedback

---

## 14. Interview-Derived Requirements Summary

| Requirement | Source | Priority |
|-------------|--------|----------|
| Eliminate all 4 friction points (scope, style, context, repetition) | Pain points Q | P0 |
| No debugging process → framework prevents failures upfront | Debug style Q | P0 |
| Full content pipeline support (ideation → publish) | Content flow Q | P0 |
| Shareable with teams + personal use | Team context Q | P1 |
| Anti-over-engineering AND anti-under-engineering | Style gaps Q | P0 |
| Correct paradigm selection | Style gaps Q | P0 |
| Guided setup + opinionated defaults + examples | Onboarding Q | P0 |
| Flexible base for experimental/greenfield projects | Project types Q | P0 |
| Layered learning (quick-grab + deep understanding) | Learning Q | P0 |
| Claude involved before any code (stack eval phase) | Entry point Q | P0 |
| All content types supported | Content types Q | P1 |
| AI slop elimination as #1 priority | Slop factor Q | P0 |
| Business Strategy as dedicated domain | Generic scope Q → promoted | P1 |
| Learning & Research as dedicated domain | Generic scope Q → promoted | P1 |
| Personal Productivity as dedicated domain | Generic scope Q → promoted | P1 |
| Decision Frameworks as dedicated domain | Generic scope Q → promoted | P1 |
| Generic catch-all for remaining use cases | Generic scope Q | P2 |
| All slop signals addressed (phrases, insight, tone, structure) | Slop signals Q | P0 |
| Goal-oriented pattern organization | Pattern org Q | P0 |
| Principle-based (survives model updates) | Versioning Q | P0 |
| Full Claude Code feature mastery | CC fluency Q | P1 |
| Comprehensive kickoff (30+ questions) | Kickoff depth Q | P1 |
| Strong defaults, overridable governance | Governance Q | P0 |
| Layered persistence strategy | Memory Q | P1 |
| Dual distribution (repo + skill) + npx bridge | First run Q | P1 |
| Prevention over detection (strong prompts > quality gates) | Quality gates Q | P0 |
| Pre-built domain modules (10 domains) | Domain modules Q | P2 |
| Plan-first protocol for non-trivial tasks | External workflow merge | P0 |
| File-based task tracking (plan.md, todo.md, lessons.md, decisions.md) | External workflow merge | P0 |
| Self-improvement loop via lessons.md | External workflow merge | P0 |
| Verification-before-done with evidence requirements | External workflow merge | P0 |
| Elegance gate for non-trivial implementations | External workflow merge | P1 |
| Failure recovery protocol (3-strike revert rule) | External workflow merge | P0 |
| Subagent orchestration philosophy in base template | External workflow merge | P1 |
| Implementation principles (simplicity, no laziness, minimal impact) | External workflow merge | P0 |
| Voice Profile system per-project with domain defaults | Audit gap #1 | P0 |
| Context window budget and composition conflict resolution | Audit gap #2 | P0 |
| Mid-project re-kickoff protocol | Audit gap #4 | P1 |
| Cross-domain prompt patterns | Audit gap #5 | P1 |
| Systematic prompt debugging flow | Audit gap #6 | P0 |
| Decision log format and session-start protocol | Audit gap #7-8 | P0 |
| Success = speed + consistency + zero re-explanation | Success metric Q | P0 |
