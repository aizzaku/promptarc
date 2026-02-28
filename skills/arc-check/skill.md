# /arc-check — Output Quality Checker

You are running a structured quality review on the most recent output or work product in this project. This is a fast, opinionated pass — not a discussion. You produce a verdict and a list of specific problems to fix.

---

## Phase 1: Identify what to check

If the user ran `/arc-check` with no arguments, check the most recent substantive output: the last thing you produced (code, document, analysis, decision, plan). If the user specified a target ("check the architecture doc" or "check this function"), check that.

Do not ask clarifying questions. Infer the target from context.

---

## Phase 2: Run the checks

Apply every check that's relevant to the output type. Skip checks that don't apply (e.g., don't run code-specific checks on a marketing document).

### Universal checks (apply to all output types)

**Anti-slop scan**
- Does any sentence fail the delete test? (Can it be removed without information loss?)
- Are there banned phrases? ("In today's fast-paced world", "It's worth noting", "Let's dive in", "In conclusion", "game-changer", "leverage" when "use" works, "robust", "comprehensive", "seamless", "cutting-edge")
- Does any statement apply to any project in this category equally well? (Generic = red flag)
- Is structure earned? Are bullets/headers used only where content benefits — or are they filler?
- Is there a real claim in every paragraph, or is there throat-clearing?

**Specificity check**
- Could this output have been produced without knowing anything specific about THIS project?
- Are recommendations concrete or vague? ("Use caching" = vague. "Add Redis with a 5-minute TTL on /api/products responses" = concrete.)
- Are tradeoffs named with actual consequences, not just "pros and cons"?

**Completeness check**
- Does the output answer what was actually asked?
- Are there obvious gaps the user would immediately notice?
- Are verification steps present where relevant?

### Code checks (apply when output is code)

**Correctness**
- Does it do what it claims to do?
- Are edge cases handled — or deliberately excluded with a note?
- Are error paths explicit?

**Type safety** (TypeScript / typed languages)
- Any `as any`, `@ts-ignore`, or `@ts-expect-error`?
- Are types structural or nominal where it matters?
- Do return types match actual returns?

**Simplicity**
- Is there unnecessary abstraction? Is the code more complex than the problem requires?
- Are there variables, functions, or imports that aren't used?
- Would a reviewer immediately understand the intent?

**Security** (surface-level)
- Any obvious injection vectors? (SQL, shell, HTML)
- Are secrets handled correctly (env vars, not hardcoded)?
- Is user input validated before use?

### Document checks (apply when output is prose — analysis, strategy, plan)

**Claim quality**
- Are claims supported or asserted? ("X is better" requires evidence or explicit reasoning.)
- Are numbers present and sourced, or are they estimates? Is that labeled?
- Does the document commit to a position, or hedge into "it depends" without resolution?

**Decision quality** (for recommendations/plans)
- Are alternatives explicitly named and rejected with reasons?
- Is the recommendation reversible or one-way? Is that labeled?
- Are success metrics stated?

**Structure**
- Is there a clear beginning (context/problem), middle (analysis), and end (recommendation/conclusion)?
- Are section headers self-explanatory, or do they require reading the body to understand?

---

## Phase 3: Produce the verdict

Output in this exact format — no preamble, no softening language:

```
## /arc-check verdict

**Overall**: [PASS / NEEDS WORK / FAIL]

### Issues found

[If PASS, write "None. Ship it."]

[If NEEDS WORK or FAIL, list specific issues with location:]
- [File/section/line if applicable]: [Specific problem] → [What to fix]
- [File/section/line if applicable]: [Specific problem] → [What to fix]
...

### Verdict rationale

[2-4 sentences max. Why PASS/NEEDS WORK/FAIL. Be blunt.]
```

**Scoring guide:**
- **PASS**: Shippable. Minor issues are noted but don't block.
- **NEEDS WORK**: Substantive problems that would be caught in a real review. Fix before shipping.
- **FAIL**: Output is wrong, dangerous, or so generic it's useless. Do not ship.

---

## Rules

- No softening. "This is a good start, but..." is banned. The output either passes or it doesn't.
- No praise for things that should be baseline. "Good use of TypeScript" is not feedback.
- Be specific. "This section is too vague" is not actionable. "Line 47: `handleError()` swallows all exceptions — callers have no signal" is.
- If the output passes, say so clearly and stop. Don't manufacture issues.
- If the output fails hard (FAIL), say what the user needs to do differently, not just what's wrong.
