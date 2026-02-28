# Prompt Pattern Library

Goal-oriented prompt patterns for getting quality output from Claude. Organized by "I want to..." — find your goal, grab the pattern, fill in the variables.

---

## How to Use

1. Find your goal in the index below
2. Open the pattern file
3. Fill in the `{{VARIABLES}}` with your specifics
4. Use it directly or adapt it to your CLAUDE.md

Each pattern includes: when to use it, the template, why it works (which principles it applies), common mistakes, and variations.

---

## Index

### Software Engineering
| I want to... | Pattern |
|---|---|
| Design an architecture from scratch | [architecture.md](software-eng/architecture.md) |
| Debug a problem I can't figure out | [debugging.md](software-eng/debugging.md) |
| Review code for issues I might miss | [code-review.md](software-eng/code-review.md) |
| Refactor without breaking things | [refactoring.md](software-eng/refactoring.md) |
| Scaffold a new project the right way | [greenfield.md](software-eng/greenfield.md) |
| Evaluate which tech stack to use | [stack-evaluation.md](software-eng/stack-evaluation.md) |

### Content Publishing
| I want to... | Pattern |
|---|---|
| Generate content angles that aren't generic | [ideation.md](content/ideation.md) |
| Research a topic for an article | [research.md](content/research.md) |
| Structure my content before writing | [outlining.md](content/outlining.md) |
| Write a first draft that sounds human | [drafting.md](content/drafting.md) |
| Edit my draft without losing voice | [editing.md](content/editing.md) |
| Write a video script with natural pacing | [video-scripts.md](content/video-scripts.md) |
| Create social content from long-form | [social-media.md](content/social-media.md) |

### Business Strategy
| I want to... | Pattern |
|---|---|
| Size a market I'm considering entering | [market-analysis.md](business-strategy/market-analysis.md) |
| Analyze my competitive landscape | [competitive-intel.md](business-strategy/competitive-intel.md) |
| Design or validate a business model | [business-model.md](business-strategy/business-model.md) |
| Build a go-to-market strategy | [go-to-market.md](business-strategy/go-to-market.md) |
| Model unit economics for a product | [financial-modeling.md](business-strategy/financial-modeling.md) |
| Create a pitch deck narrative | [pitch-materials.md](business-strategy/pitch-materials.md) |

### Learning & Research
| I want to... | Pattern |
|---|---|
| Deep-dive a topic I know nothing about | [deep-dive.md](learning-research/deep-dive.md) |
| Synthesize multiple sources into a coherent view | [source-synthesis.md](learning-research/source-synthesis.md) |
| Build a mental model for a complex system | [mental-model-building.md](learning-research/mental-model-building.md) |
| Design a self-study curriculum | [curriculum-design.md](learning-research/curriculum-design.md) |
| Explain a concept at the right depth | [concept-explanation.md](learning-research/concept-explanation.md) |
| Find what I don't know that I don't know | [knowledge-gap-analysis.md](learning-research/knowledge-gap-analysis.md) |

### Personal Productivity
| I want to... | Pattern |
|---|---|
| Break down an overwhelming project | [project-breakdown.md](productivity/project-breakdown.md) |
| Plan my week/month/quarter | [planning-cycles.md](productivity/planning-cycles.md) |
| Set goals I'll actually follow through on | [goal-setting.md](productivity/goal-setting.md) |
| Prioritize when everything feels urgent | [priority-frameworks.md](productivity/priority-frameworks.md) |
| Prepare for an important meeting | [meeting-prep.md](productivity/meeting-prep.md) |
| Design a system, habit, or routine | [reflection-journaling.md](productivity/reflection-journaling.md) |

### Decision Frameworks
| I want to... | Pattern |
|---|---|
| Make a decision between multiple options | [structured-decisions.md](decision-frameworks/structured-decisions.md) |
| Decompose a problem from first principles | [first-principles.md](decision-frameworks/first-principles.md) |
| Assess risks I might be blind to | [risk-assessment.md](decision-frameworks/risk-assessment.md) |
| Find the root cause of a recurring problem | [root-cause-analysis.md](decision-frameworks/root-cause-analysis.md) |
| Stress-test my thinking with opposing views | [red-team-steelman.md](decision-frameworks/red-team-steelman.md) |
| Facilitate a group decision | [group-decisions.md](decision-frameworks/group-decisions.md) |

### Cross-Domain
| I want to... | Pattern |
|---|---|
| Turn a business idea into a technical architecture | [idea-to-architecture.md](cross-domain/idea-to-architecture.md) |
| Research a market to decide whether to build | [market-to-build-decision.md](cross-domain/market-to-build-decision.md) |
| Write a technical blog post about something I built | [technical-content.md](cross-domain/technical-content.md) |
| Plan a product launch end-to-end | [product-launch.md](cross-domain/product-launch.md) |
| Evaluate build vs. buy | [build-vs-buy.md](cross-domain/build-vs-buy.md) |
| Learn a new tech stack for a project | [learning-for-project.md](cross-domain/learning-for-project.md) |

### Generic
| I want to... | Pattern |
|---|---|
| Analyze something without a framework | [analysis.md](generic/analysis.md) |
| Brainstorm ideas without going generic | [brainstorming.md](generic/brainstorming.md) |
| Synthesize scattered information into structure | [synthesis.md](generic/synthesis.md) |

---

## Principles Reference

Every pattern maps back to the core principles in `core/principles.md`:

| Principle | What It Does |
|---|---|
| Specificity Amplification | Replace generic with concrete → eliminates wrong answers |
| Context Layering | Identity → domain → task → constraints → format |
| Constraint-Driven Creativity | More constraints → better creative output |
| Role and Perspective Framing | Specific role activates specific knowledge/quality |
| Chain-of-Thought Scaffolding | Structure the reasoning, not just the output |
| Few-Shot Calibration | Show examples of what you want |
| Negative Examples | Show what you DON'T want |
| Meta-Prompting | Use Claude to write better prompts for Claude |
