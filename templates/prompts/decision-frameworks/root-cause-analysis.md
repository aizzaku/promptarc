# Pattern: Find the Root Cause of a Recurring Problem

> "I want to find the root cause of a recurring problem"

**Principles used**: Chain-of-Thought Scaffolding, Specificity Amplification

---

## When to Use
- A problem keeps recurring despite fixes
- Symptoms are clear but the underlying cause isn't
- Need to distinguish between proximate cause and systemic cause

## The Pattern

```
This problem keeps happening: {{DESCRIBE_THE_RECURRING_PROBLEM}}

It's happened {{N}} times: {{BRIEF_DESCRIPTION_OF_EACH_OCCURRENCE}}
Previous fixes: {{WHAT_WAS_DONE_EACH_TIME}}

Why the previous fixes didn't stick: {{YOUR_THEORY — or "I don't know"}}

Walk through the 5 Whys:
Starting from "{{THE_PROBLEM}}":
- Why? → {{FIRST_LEVEL_CAUSE}}
- Why? → ...
- Continue until you reach something ACTIONABLE (a process, a system, a decision that can be changed)

Then distinguish:
1. Proximate cause: What triggered THIS specific instance?
2. Systemic cause: Why does the SYSTEM allow this to happen repeatedly?
3. Fix for proximate cause: (Stops the bleeding NOW)
4. Fix for systemic cause: (Prevents ALL future occurrences)

Both fixes are needed. A proximate fix without a systemic fix means it will happen again. A systemic fix without a proximate fix means the current instance is still broken.

If the 5 Whys lead outside my domain of control, stop and name the boundary: "The root cause is {{X}} which requires {{AUTHORITY/TEAM}} to change."
```

## Why It Works
5 Whys prevents stopping at symptoms. Separating proximate and systemic causes prevents band-aid fixes. Acknowledging domain-of-control limits prevents recommending changes you can't make.

## Common Mistakes
- Stopping at the first why → fixing symptoms, not causes
- 5 Whys degenerating into blame ("Why? Because Bob made a mistake") → always ask about the system, not the person
- Not implementing the proximate fix → waiting for the systemic fix while the problem persists
