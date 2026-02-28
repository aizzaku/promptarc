# Pattern: Review Code for Issues I Might Miss

> "I want to review code for issues I might miss"

**Principles used**: Role and Perspective Framing, Negative Examples, Constraint-Driven Creativity

---

## When to Use
- Before merging significant changes
- Reviewing your own code (hardest to see your own blind spots)
- Onboarding to an unfamiliar codebase by reviewing recent changes

## The Pattern

```
Review this code as a senior staff engineer who's seen this pattern go wrong in production.

Code: {{PASTE_CODE_OR_DIFF}}

Context:
- This code does: {{WHAT_IT_DOES}}
- Part of: {{SYSTEM_CONTEXT}}
- Will be called: {{FREQUENCY_AND_CONTEXT — e.g., "on every API request" or "once during startup"}}

Focus your review on (in priority order):
1. Correctness: Does this actually do what it claims? Edge cases?
2. Failure modes: What happens when things go wrong? (Network failures, invalid input, race conditions, resource exhaustion)
3. Security: Any injection, auth bypass, data exposure, or OWASP top 10 issues?
4. Performance: Any obvious bottlenecks given the call frequency?

Do NOT review:
- Style/formatting (that's what linters are for)
- Naming preferences (unless genuinely confusing)
- Minor nitpicks that don't affect correctness or safety

For each issue found, state:
- Severity: 🔴 Must fix | 🟡 Should fix | 🟢 Consider
- The specific problem
- A concrete fix (code, not just description)
```

## Why It Works
The role framing ("seen this pattern go wrong in production") activates a more critical review stance than generic "review this code." The priority ordering prevents style bikeshedding. The severity ratings make the review actionable.

## Common Mistakes
- Not providing system context → review misses integration issues
- Not specifying call frequency → can't assess performance impact
- Asking for everything at once → review is shallow across all dimensions

## Variations
- **Security-focused**: Replace the focus list with OWASP top 10 specifically. Add: "Assume adversarial input on all external-facing endpoints."
- **Performance-focused**: Add expected latency budget and traffic patterns.
- **Architecture review**: Zoom out from code to design: "Review this design for coupling, extensibility, and failure isolation."
