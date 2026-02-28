# Pattern: Debug a Problem I Can't Figure Out

> "I want to debug a problem I can't figure out"

**Principles used**: Specificity Amplification, Chain-of-Thought Scaffolding, Context Layering

---

## When to Use
- Bug that persists after initial investigation
- Unexpected behavior you can't explain
- Production issue that needs systematic diagnosis

## The Pattern

```
I have a bug I can't figure out.

What I observe: {{EXACT_SYMPTOMS}}
What I expected: {{EXPECTED_BEHAVIOR}}
When it started: {{TRIGGER_EVENT_OR_TIMEFRAME}}

What I've already tried:
1. {{ATTEMPT_1}} → Result: {{RESULT_1}}
2. {{ATTEMPT_2}} → Result: {{RESULT_2}}

Relevant code:
{{PASTE_THE_ACTUAL_CODE — not a summary}}

Environment: {{RUNTIME_VERSION_OS_DEPS}}

Before proposing a fix, walk through:
1. What are the possible causes? (List at least 3)
2. For each cause, what evidence supports or contradicts it?
3. What's the most likely cause based on the evidence?
4. What's the minimal test to confirm the hypothesis?

THEN propose a fix. Explain WHY it fixes the root cause, not just what to change.
```

## Why It Works
Listing what's already been tried prevents Claude from suggesting things you've already done. Requiring multiple hypotheses before a fix prevents pattern-matching to the first plausible explanation. The "minimal test" step prevents shotgun debugging.

## Common Mistakes
- Describing the bug in abstract terms instead of exact symptoms ("it doesn't work" vs. "returns 403 on POST /api/users with a valid JWT")
- Omitting what you've already tried → wasted time on duplicate suggestions
- Not including the actual code → Claude guesses at implementation details

## Variations
- **Performance debugging**: Replace symptoms with metrics: "P99 latency is 2.3s, expected <500ms. Profiler shows 60% time in database queries."
- **Intermittent bugs**: Add "Reproduction rate: ~1 in 20 requests. Cannot reproduce locally."
- **Production triage**: Add "Impact: {{USERS_AFFECTED}}. Priority: {{SEVERITY}}. Current mitigation: {{WORKAROUND_IF_ANY}}."
