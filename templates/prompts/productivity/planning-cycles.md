# Pattern: Plan My Week / Month / Quarter

> "I want to plan my week/month/quarter"

**Principles used**: Context Layering, Specificity Amplification, Constraint-Driven Creativity

---

## When to Use
- Starting a new planning period
- Current plan isn't working and needs reset
- Need to align daily actions with longer-term goals

## The Pattern

```
Help me plan my {{WEEK | MONTH | QUARTER}}.

Current commitments (non-negotiable):
{{LIST — meetings, deadlines, recurring obligations}}

Active projects:
{{LIST — with current status and next milestone for each}}

Goals for this period:
{{LIST — what must be accomplished by end of period}}

Available time blocks:
{{TYPICAL_SCHEDULE — e.g., "deep work mornings M-Th, meetings Tu/Th afternoons, Fri is flex"}}

Build the plan:
1. Priority stack: Rank the goals/projects by impact. Only the top 3 get scheduled time this period. The rest go on the "not now" list (explicitly — so they stop causing guilt).
2. Time allocation: For each of the top 3, how many hours per week do they need? Does this fit in the available blocks?
3. Weekly rhythm: What happens on which days? Assign deep work and meetings to specific blocks.
4. Buffer: Block {{20%}} of time as buffer. Plans with zero slack fail on the first unexpected event.
5. Weekly check-in prompt: One question to ask myself every {{FRIDAY}} — "Did I spend time on the top 3, or did everything else eat it?"

If the plan doesn't fit in the available time, tell me what to cut. Don't just list everything and hope it works.
```

## Why It Works
Limiting to top 3 priorities prevents the "everything is important" trap. Explicitly listing "not now" items reduces anxiety about dropped projects. The 20% buffer accounts for reality.

## Common Mistakes
- Planning for 100% capacity → first interruption breaks the entire week
- Not distinguishing between priorities and obligations → obligations eat all the time
- Planning the quarter in weekly detail → too rigid, can't adapt
