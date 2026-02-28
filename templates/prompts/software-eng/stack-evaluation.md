# Pattern: Evaluate Which Tech Stack to Use

> "I want to evaluate which tech stack to use"

**Principles used**: Chain-of-Thought Scaffolding, Constraint-Driven Creativity, Negative Examples

---

## When to Use
- Starting a project where the stack isn't predetermined
- Considering a migration from one technology to another
- Evaluating whether a new tool/framework is worth adopting

## The Pattern

```
I need to choose a {{COMPONENT_TYPE — e.g., "frontend framework" / "database" / "auth solution"}} for {{PROJECT_DESCRIPTION}}.

Requirements (ranked by importance):
1. {{MOST_IMPORTANT_REQUIREMENT}} (non-negotiable)
2. {{SECOND_REQUIREMENT}}
3. {{THIRD_REQUIREMENT}}

Constraints:
- Team experience: {{WHAT_THE_TEAM_KNOWS}}
- Timeline: {{HOW_FAST_WE_NEED_TO_SHIP}}
- Scale: {{EXPECTED_LOAD}}
- Budget: {{COST_CONSTRAINTS}}

Options I'm considering: {{OPTION_A}}, {{OPTION_B}}, {{OPTION_C}}
(If I'm missing an obvious option, add it.)

For each option:
1. How well does it meet each requirement? (Strong / Adequate / Weak — with specifics)
2. What's the team ramp-up cost? (Days/weeks to productivity)
3. What's the 2-year maintenance outlook? (Community health, release cadence, bus factor)
4. What will hurt? (The specific tradeoff or pain point this choice brings)
5. What's the migration path if this choice turns out wrong?

Recommend ONE option. State your confidence level and what would change your recommendation.
Do NOT hedge with "it depends on your situation" — I've given you my situation.
```

## Why It Works
Ranked requirements prevent "it depends" answers by establishing clear priorities. The "what will hurt" question forces honest tradeoff analysis instead of a feature checklist where every option looks good. Requiring migration path assessment acknowledges that no choice is permanent.

## Common Mistakes
- Not ranking requirements → Claude treats them as equal, can't make a recommendation
- Listing too many options (5+) → analysis becomes shallow across all of them
- Not mentioning team experience → Claude recommends the "best" tool regardless of learning curve

## Variations
- **Build vs. buy**: "Compare building {{FEATURE}} in-house vs. using {{SERVICE}}. Include: dev cost, ongoing maintenance, vendor lock-in risk, feature gap."
- **Migration assessment**: "We're on {{CURRENT_STACK}}. Is migrating to {{NEW_STACK}} worth the cost? Break-even analysis."
- **Quick filter**: "I need a {{COMPONENT}} that supports {{MUST_HAVE}}. Eliminate any option that doesn't. From the survivors, recommend one."
