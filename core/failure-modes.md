# Failure Modes & Recovery

A taxonomy of the ways prompts fail, why each failure happens, and how to fix it. Organized by symptom — start with what you observe, trace to the root cause, apply the fix.

---

## Category 1: Scope Failures

### 1A. Claude Did Too Much
**Symptom**: You asked for a function, got a full module with tests, types, and a README. You asked for feedback on your plan, got a rewritten plan.

**Root cause**: No explicit scope boundary. Claude defaults to thoroughness — doing more feels helpful. Without a clear stop signal, it keeps going.

**Fix**: Add explicit scope boundaries.
```
# Before (scope failure)
"Write a retry function for API calls"

# After (scope controlled)
"Write a single function `retryWithBackoff(fn, maxRetries)` that:
- Wraps an async function with exponential backoff
- Returns the function's result on success
- Throws the last error after maxRetries exhausted
DO NOT: write tests, types file, export config, or any surrounding code."
```

**Prevention pattern**: End prompts with a "DO NOT" section for foreseeable scope creep.

### 1B. Claude Did Too Little
**Symptom**: You asked for an architecture design, got a bulleted list of component names. You asked for analysis, got a surface-level overview.

**Root cause**: Insufficient depth signal. Claude doesn't know how deep to go, so it stays shallow — shallow is safer (less chance of getting something wrong).

**Fix**: Signal depth explicitly.
```
# Before (too shallow)
"Design the auth system"

# After (depth signaled)
"Design the auth system. For each component, I need:
- Data flow diagram showing token lifecycle
- Database schema with exact column types
- API endpoint signatures with request/response shapes
- Error scenarios and how each is handled
- Security considerations specific to THIS architecture"
```

**Prevention pattern**: Specify the DELIVERABLES you expect, not just the topic.

---

## Category 2: Style Failures

### 2A. Right Content, Wrong Tone
**Symptom**: The information is correct but sounds like a corporate blog post when you wanted casual, or like a textbook when you wanted actionable.

**Root cause**: Missing or weak voice profile. Claude defaults to "helpful assistant" register.

**Fix**: Add a voice profile with reference examples and anti-examples. See `core/anti-slop.md` for the voice profile system.

```
# Before (default AI tone)
"Explain why our deployment failed"

# After (voice-controlled)
"Explain why our deployment failed. Write it like a post-mortem from a senior
SRE — direct, blame-free, focused on systems not people. No corporate hedging.
Example tone: 'The canary failed at 2% traffic because the health check
endpoint was hitting a cold cache. We should have load-tested the cache
warmup path.'"
```

### 2B. Right Content, Wrong Format
**Symptom**: You wanted a table, got paragraphs. Wanted prose, got bullet points. Wanted a code block, got an explanation.

**Root cause**: Format not specified. Claude picks the format that's most common for the topic in its training data.

**Fix**: Specify format explicitly. This is one of the cheapest, highest-ROI prompt improvements.

```
"Present this as a comparison table with columns: Approach | Pros | Cons | When to Use"
"Write this as continuous prose, no headers or bullet points"
"Give me ONLY the code. No explanation before or after."
```

---

## Category 3: Content Failures

### 3A. Generic / Non-Specific Output
**Symptom**: Output could apply to any project in the category. No details specific to YOUR situation.

**Root cause**: This is THE most common failure mode. Insufficient context about the specific situation. Claude fills gaps with generic patterns from training data.

**Fix**: Apply the Specificity principle aggressively. Every vague noun should be replaced with a specific one. See `core/principles.md` Principle 1.

**Diagnostic**: Take any sentence from the output and ask: "Is this true of ALL [type of project]?" If yes, it's generic.

### 3B. Hallucinated Details
**Symptom**: Claude invents API endpoints that don't exist, cites papers that were never written, uses library methods that aren't real.

**Root cause**: Claude generates the most probable continuation. When it doesn't have the actual information, it generates plausible-sounding alternatives.

**Fix**:
- For code: Provide the actual API signatures, imports, or documentation. Don't trust Claude's memory of library APIs — give it the reference.
- For citations: Ask Claude to flag uncertainty: "If you're not sure a source exists, say so rather than guessing."
- For facts: Cross-reference anything that matters. Claude is a reasoning engine, not a database.

### 3C. Outdated Information
**Symptom**: Claude recommends deprecated APIs, old syntax, or superseded approaches.

**Root cause**: Training data has a cutoff. Information after the cutoff is absent. Information before the cutoff includes both current and outdated patterns.

**Fix**: Provide the current documentation or examples. Don't assume Claude knows the latest version of anything. When starting work with a library, feed it the current docs or let it search.

---

## Category 4: Instruction Failures

### 4A. Rules Partially Followed
**Symptom**: Claude follows some CLAUDE.md rules but ignores others. Inconsistent compliance.

**Root cause (ranked by likelihood)**:
1. **Too many rules**: Instruction-following degrades past ~50 distinct rules. Priority gets ambiguous.
2. **Contradictory rules**: Two rules that can't both be satisfied simultaneously.
3. **Buried rules**: Critical rules lost in low-emphasis positions (plain text in a long paragraph).
4. **Soft language**: "Try to..." and "Consider..." are treated as optional.

**Fix by cause**:
1. Reduce rules. Merge related rules. Delete rules that duplicate other rules in different words.
2. Find the contradiction and resolve it. Explicitly state which rule wins.
3. Move critical rules to prominent positions: section headers, bold text, `## NON-NEGOTIABLE`.
4. Use strong language for important rules: "MUST", "NEVER", "ALWAYS".

### 4B. Rules Completely Ignored
**Symptom**: A specific rule in CLAUDE.md is never followed despite being clearly stated.

**Root cause**:
1. **Conflict with default behavior**: The rule fights a strong default. Claude's training pushes toward the default, the rule pushes away, and the default wins.
2. **Rule is too abstract**: "Write clean code" — Claude thinks it IS writing clean code.
3. **Rule lacks examples**: Abstract rules without examples are interpreted differently than intended.

**Fix**: Make the rule concrete with positive and negative examples. If the rule fights a strong default, emphasize it more heavily and repeat it.

### 4C. Instructions from Previous Turns Forgotten
**Symptom**: Claude follows rules in the first response but drifts away from them over a long conversation.

**Root cause**: Recency bias. In long conversations, recent messages outweigh earlier ones. Rules from the CLAUDE.md persist (they're loaded each turn), but ad-hoc instructions within the conversation fade.

**Fix**: For rules that matter, put them in CLAUDE.md or a file that Claude reads, not just in conversation. If you must give ad-hoc instructions, repeat them periodically or reference them explicitly.

---

## Category 5: Reasoning Failures

### 5A. Confident But Wrong
**Symptom**: Claude presents incorrect information with the same confidence as correct information. No hedging, no uncertainty signal.

**Root cause**: Claude's confidence level is not calibrated to its accuracy. It generates text that SOUNDS authoritative regardless of whether it has strong evidence.

**Fix**: For high-stakes outputs, add explicit uncertainty instructions:
```
"For any claim you're less than 90% confident about, flag it with [VERIFY].
I'd rather have gaps I know about than confident errors I don't."
```

### 5B. Circular Reasoning
**Symptom**: Claude's explanation restates the question as an answer. "Why is this slow?" → "Because the performance is suboptimal."

**Root cause**: Claude generated a response that's semantically similar to the input without advancing the reasoning. This happens when the actual answer requires knowledge Claude doesn't have.

**Fix**: Force concrete reasoning steps:
```
"Don't restate the problem. Identify the specific bottleneck:
which function, which line, which operation, and why THAT operation
is slow in THIS context."
```

### 5C. Sycophantic Agreement
**Symptom**: You propose a bad idea, Claude enthusiastically endorses it. You change your position, Claude agrees with the new position too.

**Root cause**: Claude's training includes strong alignment toward being agreeable. Disagreement requires overcoming this default.

**Fix**: Explicitly request pushback:
```
"Before implementing, tell me if this approach has problems.
I want genuine criticism — agreeing with me when I'm wrong
wastes both our time. If you think this is a bad idea, say so
and explain why."
```

---

## Recovery Meta-Pattern

When you notice a failure mode, resist the urge to rewrite the entire prompt. Instead:

1. **Classify** the failure (use the categories above)
2. **Identify** the single most likely root cause
3. **Apply** the minimal fix for that root cause
4. **Test** with one generation
5. **Iterate** if needed — change ONE thing per iteration

Changing multiple things simultaneously makes it impossible to learn which fix worked. Single-variable iteration is slower per round but faster to convergence.

Log what you learn in `tasks/lessons.md`. Patterns that recur across projects should be promoted to your CLAUDE.md.
