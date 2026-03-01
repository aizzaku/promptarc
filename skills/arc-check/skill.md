# /arc-check — Output Quality Checker

You are running a structured quality review on a concrete output or work artifact. This is not a discussion — you produce a verdict and a specific list of problems. No softening. No praise for things that should be baseline.

---

## Phase 0: Anchor to the goal

Before evaluating quality, establish what success looks like.

1. Read the most recent user request that produced this output. What was actually asked?
2. State the goal in one sentence: "The task was to _____."
3. Hold that against everything below. Quality is secondary — goal achievement is primary.

If the output achieves the goal: quality issues are noted but don't automatically block.
If the output does not achieve the goal: it fails, regardless of how well-written it is.

---

## Phase 1: Identify what to check

If `/arc-check` was run with no argument: check the most recent substantive output (last thing produced — code, document, analysis, plan). If the user specified a target ("check the auth module" / "check the pricing section"), check that.

Do not ask. Infer from context.

---

## Phase 2: Artifact completeness (run first, always)

Borrowed from goal-backward verification. Check three levels before checking quality:

**EXISTENCE** — Does the thing actually exist as a concrete artifact?
- If the user asked for a file, does the file exist?
- If they asked for a section, does the section exist in the document?
- If they asked for a function, can you point to it?
- Failure: "I'll handle that" / "you can add X" / described in chat but not written

**SUBSTANTIVE** — Is it a real implementation, not a placeholder?
- See stub patterns in `references/verification-patterns.md`
- Universal stubs: `[INSERT...]`, `TBD`, `TODO`, `FIXME`, `PLACEHOLDER`, `{{VARIABLE}}`
- Domain-specific stubs: see Phase 3 checks below
- Failure: anything that requires the user to fill in the actual content

**WIRED** — Is it connected to the rest of the system?
- Domain-specific wiring patterns: see `references/verification-patterns.md`
- General: if it was created but nothing references it, it's an island
- Failure: function defined but not called, route defined but not registered, section referenced but not present

If ANY artifact fails EXISTENCE or SUBSTANTIVE: verdict is FAIL. Stop — wiring and quality don't matter for a thing that doesn't fully exist.

---

## Phase 3: Domain-specific quality checks

Identify the active domain from `CLAUDE.md`. Apply the matching check group plus universal checks.

### Universal checks (all domains)

**Anti-slop scan**
- Delete test: can any sentence be removed without information loss? If yes, it should be removed.
- Banned phrases: "In today's fast-paced world", "It's worth noting", "Let's dive in", "In conclusion", "game-changer", "leverage" (when "use" fits), "robust", "comprehensive", "seamless", "cutting-edge", "best-in-class" without evidence
- Generic content: could this output have been written without knowing anything specific about THIS project? If yes: it's generic, it fails specificity.
- Structure earned: are bullets/headers used where content benefits — or are they structural filler?

**Specificity**
- Recommendations: concrete ("Add Redis with 5-minute TTL on `/api/products`") or vague ("Use caching")?
- Tradeoffs: named with actual consequences, not just "pros and cons"?

**Completeness**
- Does it answer what was actually asked?
- Are obvious gaps present that the user would immediately notice?

---

### Software Engineering checks

**Stub detection** (from `references/verification-patterns.md`)
- `// TODO`, `// FIXME`, `// STUB`, `// PLACEHOLDER`
- `throw new Error('Not implemented')`
- Empty function bodies: `() => {}` or `function foo() {}`
- `return null` / `return undefined` where a value is required
- `as any`, `@ts-ignore`, `@ts-expect-error`
- Commented-out code blocks replacing real implementation

**Correctness**
- Does it do what it claims?
- Are edge cases handled, or deliberately excluded with a note?
- Are error paths explicit and typed (not swallowed)?

**Wiring check**
- New route registered in the router?
- New component imported where it's used?
- New env var in `.env.example`?
- New export in the barrel file?
- Migration applied, not just created?

**Type safety**
- Any type erasure (`as any`, `@ts-ignore`)?
- Return types match actual returns?

**Security surface**
- Injection vectors? (SQL, shell, HTML)
- Secrets hardcoded?
- User input validated before use?

---

### Content / Writing checks

**Stub detection**
- `[Insert statistic]`, `[Add example]`, `[Company name]` unfilled
- "As studies show" with no citation
- Section headers with no body

**Quality**
- Opener clichés: "In today's...", "Now more than ever..."
- Ending clichés: "In conclusion...", "To summarize..."
- Passive voice used as default (not deliberate)
- Superlatives without evidence
- Content that could apply to any project in this category

**Wiring**
- Referenced sections exist?
- Links have actual URLs?
- "As discussed above" — was it discussed?

---

### Legal / Compliance checks

**Stub detection**
- `[PARTY NAME]`, `[DATE]`, `[JURISDICTION]` unfilled
- "Standard terms apply" without citing which standard
- "As required by applicable law" without naming the law and section

**Quality**
- Each obligation has: who, what, by when?
- "May" vs. "shall" — is optionality intentional?
- Risk flagged specifically (not "this may create issues")?
- Statute cited with section number (not just "GDPR")?
- Defined terms used after definition, consistently?

**Wiring**
- Terms defined in Section 1 used consistently throughout?
- All exhibits referenced in body are attached?
- Signature block includes all parties named in recitals?

---

### Data / Analytics checks

**Stub detection**
- `# TODO: validate this` in transformations
- Hardcoded sample values where queries should be
- `SELECT *` without explanation

**Quality**
- Grain stated for every model (one row = one what)?
- Join type explicit (not implicit INNER)?
- Estimates labeled ("est.", confidence range)?
- Assumptions documented, not buried in comments?

**Wiring**
- `ref()` targets exist in the project?
- Dashboard metrics match underlying SQL definition?
- New columns added to staging models, not just sources?

---

### Sales / GTM checks

**Stub detection**
- `[CUSTOMER NAME]`, `[COMPANY]`, `[PAIN POINT]` unfilled
- Generic personalization tokens without real values

**Quality**
- Feature → outcome framing (not "we have SSO" but "your team stops managing passwords")?
- One CTA per piece?
- ICP specific enough to exclude someone?
- No superlatives without evidence?

**Wiring**
- Sequence step assumes a prior email the prospect actually received?
- CTA links to the right destination (not generic homepage)?

---

### Design / UX checks

**Stub detection**
- `[Placeholder image]`, `[Icon TBD]`, `[Copy goes here]`
- "Standard behavior" without specifying what that means

**Quality**
- Happy path only (no empty/error/loading states)?
- Accessibility: keyboard handling, focus states, color not the only differentiator?
- Touch targets ≥ 44×44px for mobile?
- Prefers-reduced-motion considered for animations?

**Wiring**
- References design tokens that are actually defined?
- Responsive behavior specified for all breakpoints?
- State changes have transitions specified?

---

## Phase 4: Produce the verdict

Output in this exact format — no preamble, no softening:

```
## /arc-check verdict

**Goal**: [One sentence: "The task was to _____"]
**Goal achieved**: [YES / PARTIALLY / NO]
**Overall**: [PASS / NEEDS WORK / FAIL]

### Artifact completeness
[PASS or note what's missing at EXISTENCE / SUBSTANTIVE / WIRED level]

### Issues found

[If PASS, write "None. Ship it."]

[If NEEDS WORK or FAIL, list specific issues:]
- [File/section/line]: [Specific problem] → [What to fix]
- [File/section/line]: [Specific problem] → [What to fix]

### Verdict rationale

[2-4 sentences. Why this verdict. Be blunt.]
```

If NEEDS WORK or FAIL, append this block for `/arc-rekickoff` to consume:

```
## Gaps
- [gap-type: stub | wiring | quality | goal]: [specific description]
- [gap-type: stub | wiring | quality | goal]: [specific description]
```

**Scoring guide:**
- **PASS**: Shippable. Goal achieved. Minor issues noted but don't block.
- **NEEDS WORK**: Goal partially achieved, or substantive quality issues that would be caught in a real review. Fix before shipping.
- **FAIL**: Goal not achieved, artifact is a stub, or output is so generic it's useless.

---

## Rules

- No softening. "This is a good start, but..." is banned.
- No praise for things that should be baseline. "Good use of TypeScript" is not feedback.
- Specific. "This section is vague" is not actionable. "Section 3: `handleError()` swallows all exceptions — callers have no signal" is.
- If PASS, say so and stop. Don't manufacture issues.
- If FAIL, say what the user must do differently, not just what's wrong.
- Update `tasks/STATE.md` → `Context health → Last arc-check` with the verdict and today's date.
