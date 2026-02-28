# Pattern: Design a Self-Study Curriculum

> "I want to design a self-study curriculum"

**Principles used**: Context Layering, Chain-of-Thought Scaffolding, Constraint-Driven Creativity

---

## When to Use
- Learning a new skill or domain systematically
- Need structure for self-directed learning
- Want to avoid the "tutorial hell" trap of consuming without producing

## The Pattern

```
Design a learning curriculum for: {{SKILL/DOMAIN}}

My current level: {{WHAT_I_ALREADY_KNOW}}
My goal: {{WHAT_I_WANT_TO_BE_ABLE_TO_DO — specific capability, not "learn X"}}
Time available: {{HOURS_PER_WEEK}} for {{TOTAL_WEEKS}}
Learning style: {{READ | WATCH | BUILD | MIX}}

Build the curriculum:
1. Dependency map: What must be learned before what? (Don't organize by difficulty — organize by prerequisite chain)
2. For each topic:
   - What to study (specific resource — name the book chapter, video, or documentation section)
   - What to build (a concrete project or exercise that REQUIRES this knowledge — not optional, required)
   - How to know you've got it (specific test: "Can I explain X to someone?" / "Can I build Y without reference?" / "Can I debug Z?")
3. Milestones: At week {{N}}, you should be able to: {{CAPABILITY}}
4. The plateau warning: Where do most learners get stuck, and what to do about it

Total estimated time: {{HOURS}} — does this fit in {{TOTAL_WEEKS}} at {{HOURS_PER_WEEK}}?
If not, what to cut (and what you'll sacrifice by cutting it).

Do NOT: Front-load all theory before any practice. Interleave learning and building from week 1.
```

## Why It Works
Dependency-based ordering prevents wasting time on topics that need prerequisites you haven't covered. The "what to build" requirement for each topic prevents tutorial hell. Milestone-based progress tracking gives clear signals of whether you're on track.

## Common Mistakes
- Organizing by topic difficulty instead of prerequisites → gaps that surface later
- Not including projects → passive learning that doesn't stick
- Overly ambitious timeline → demoralization when you fall behind
