# Prompt Debugging

When a prompt produces bad output, follow this systematic diagnostic sequence instead of randomly rewriting. Change ONE thing per iteration — if you change three things and it improves, you can't learn which fix worked.

---

## The Diagnostic Flow

```
STEP 1: DIAGNOSE — What type of failure?
├── Wrong scope      → Claude did too much or too little
├── Wrong style      → Right content, wrong tone/format/structure
├── Wrong content    → Factually wrong, generic, or off-topic
├── Wrong depth      → Too shallow or too detailed
└── Ignored rules    → Claude didn't follow explicit instructions

STEP 2: IDENTIFY ROOT CAUSE
├── Wrong scope      → Missing or ambiguous scope boundaries in prompt
├── Wrong style      → Missing voice profile, no reference examples
├── Wrong content    → Insufficient context, no domain grounding
├── Wrong depth      → No calibration signal (who is the audience?)
└── Ignored rules    → Rules buried, contradicted, or too numerous

STEP 3: FIX (one change at a time)
├── Wrong scope      → Add explicit "DO this, do NOT do that" boundaries
├── Wrong style      → Add reference example or anti-example
├── Wrong content    → Add domain context, facts, constraints
├── Wrong depth      → Add audience signal: "explain as if to [persona]"
└── Ignored rules    → Move rule higher, simplify, reduce total count

STEP 4: TEST — Run the prompt again

STEP 5: ITERATE — If still broken, return to Step 1
```

---

## Detailed Diagnosis

### Wrong Scope

**Symptoms**:
- Output is 3x longer or shorter than expected
- Includes components you didn't ask for (tests, types, docs)
- Misses components you assumed would be included
- Addresses a broader or narrower problem than intended

**Diagnostic questions**:
1. Did you specify what's IN scope?
2. Did you specify what's OUT of scope?
3. Could a reasonable person interpret your scope differently?

**Fixes (try in order)**:
1. Add a "Scope" section: "This task includes X, Y. It does NOT include Z."
2. Add explicit deliverables: "Deliver exactly: [list]"
3. Add a size constraint: "This should be ~200 lines" or "Keep it to 3 paragraphs"

---

### Wrong Style

**Symptoms**:
- Content is correct but sounds like a press release / textbook / customer support
- Output is formatted differently than you wanted (bullets vs prose, table vs list)
- Tone mismatch (formal when you wanted casual, or vice versa)

**Diagnostic questions**:
1. Is there a voice profile in the prompt or CLAUDE.md?
2. Does it include positive examples of the desired style?
3. Does it include negative examples (anti-voice)?
4. Is the format specified explicitly?

**Fixes (try in order)**:
1. Add a reference example: "Write in this style: [example paragraph]"
2. Add anti-voice: "Do NOT sound like [specific thing you don't want]"
3. Specify format explicitly: "Use a table" / "Write as continuous prose" / "Code only, no explanation"
4. Add a role with style implications: "Write as a [specific person/role] would"

---

### Wrong Content

**Symptoms**:
- Output is generic — could apply to any project in the category
- Contains hallucinated facts, fake API methods, nonexistent libraries
- Addresses the wrong problem or a strawman version of the real problem
- Missing critical details specific to your situation

**Diagnostic questions**:
1. Did you provide enough context about YOUR specific situation?
2. Did you provide the actual data/code/docs Claude needs?
3. Did you assume Claude would "know" something it can't know?

**Fixes (try in order)**:
1. Add specifics: replace every generic noun with a concrete one from your project
2. Provide reference material: paste the actual code, docs, or data
3. Constrain with facts: "Our database is PostgreSQL 15. We have 2M rows in the users table. Average query latency is 45ms."
4. Ask Claude to flag gaps: "If you need information I haven't provided, ask before proceeding."

---

### Wrong Depth

**Symptoms**:
- Output is a high-level overview when you wanted implementation details
- Output is overwhelmingly detailed when you wanted a summary
- Explanation is pitched at the wrong level (too basic or too advanced)

**Diagnostic questions**:
1. Did you specify the target audience's knowledge level?
2. Did you indicate how the output will be used?
3. Did you provide a depth reference ("like X" or "as detailed as Y")?

**Fixes (try in order)**:
1. Add audience: "Explain as if to a [specific persona with stated knowledge]"
2. Add purpose: "This will be used for [decision/implementation/presentation]"
3. Add depth anchor: "Go as deep as a senior engineer's design doc, not a manager's summary"
4. Add length constraint: sometimes fixing length fixes depth as a side effect

---

### Ignored Rules

**Symptoms**:
- Specific CLAUDE.md rules not being followed
- Rules followed in first response but forgotten in later turns
- Some rules followed, others ignored inconsistently

**Diagnostic questions**:
1. How many total rules are in the CLAUDE.md? (>50 = likely overload)
2. Are any rules contradictory?
3. Where is the ignored rule positioned? (buried in a paragraph? bottom of a long list?)
4. Is the rule phrased softly? ("Consider..." / "Try to...")

**Fixes (try in order)**:
1. Check for contradictions — find rules that conflict and resolve them
2. Move critical rules to prominent positions with strong formatting
3. Strengthen language: "MUST" / "NEVER" / "ALWAYS" instead of "try to" / "consider"
4. Reduce total rule count — merge related rules, delete redundant ones
5. Add examples showing the rule being followed (few-shot is more reliable than description)

---

## The Iteration Log

When debugging a prompt across multiple iterations, track what you changed and what happened. This prevents circular fixes (changing A to fix X, then changing it back when Y breaks).

```markdown
## Prompt Debug: [task]

### Iteration 1
**Symptom**: [what went wrong]
**Diagnosis**: [failure type + root cause]
**Change**: [exactly what you changed]
**Result**: [what happened — better, worse, different problem?]

### Iteration 2
**Symptom**: [new or remaining problem]
**Diagnosis**: [failure type + root cause]
**Change**: [exactly what you changed]
**Result**: [what happened]
```

After 3 iterations without convergence, step back and re-examine assumptions. You may be fixing the wrong root cause, or multiple failures may be interacting.

---

## When to Stop Debugging

A prompt is "good enough" when:
- Output quality meets the bar for its intended use
- Results are consistent across multiple generations
- The prompt is shorter than 500 words (shorter prompts are more maintainable)

A prompt is NOT done when:
- It works once but fails on slight variations
- It requires a specific phrasing that breaks if you change a word
- It's over 1000 words (it's probably doing too much — split into multiple prompts)

---

## Reusable Insights

When a prompt fix reveals something generalizable, capture it:

- If it applies to THIS project → `tasks/lessons.md`
- If it applies to ALL your projects → `~/.claude/CLAUDE.md` or auto-memory
- If it applies to a DOMAIN → suggest updating the domain overlay template

The goal is never debugging the same issue twice.
