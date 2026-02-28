# Prompt Engineering Principles

These are the foundational principles that underpin every ARC template and pattern. They're model-agnostic — they work because of how language models process instructions, not because of any particular model's quirks.

Each principle includes the mechanism (why it works), application (how to use it), and failure mode (what happens when you skip it).

---

## 1. Specificity Amplification

The single most impactful principle. Generic input produces generic output. Specific input produces specific output. Every detail you add eliminates a category of wrong answers.

**Mechanism**: LLMs generate tokens by predicting what's most likely given the context. Vague context → high-entropy predictions → generic output. Specific context → low-entropy predictions → targeted output.

**Application**:
- Replace "write good code" with "write a TypeScript function that validates email addresses using RFC 5322, returns a discriminated union of `Valid | Invalid<reason>`, and handles edge cases: plus addressing, international domains, quoted local parts"
- Replace "analyze the market" with "size the US enterprise market for developer productivity tools priced $50-200/seat/month, excluding pure CI/CD — focus on companies with 100-5000 engineers"
- Replace "write a blog post about AI" with "write 1500 words on why retrieval-augmented generation fails in production, targeting ML engineers who've tried it, using the tone of a post-mortem"

**Failure mode**: Insufficient specificity is the root cause of ~60% of bad Claude output. The user thinks "Claude should know what I mean" — but Claude optimizes for the most probable interpretation, which is the most common (generic) one.

**Diagnostic**: If the output could have been written without knowing anything about YOUR project, it wasn't specific enough.

---

## 2. Context Layering

Provide context in layers: identity → domain → task → constraints → format. Each layer narrows the solution space.

**Mechanism**: Each context layer acts as a filter. Identity sets the expertise level. Domain sets the vocabulary and norms. Task sets the goal. Constraints eliminate wrong approaches. Format shapes the output structure.

**Layer order matters**:
```
Layer 1 — Identity:    "You are a senior backend engineer at a fintech startup"
Layer 2 — Domain:      "Working on a payment processing service handling PCI-DSS data"
Layer 3 — Task:        "Design the retry logic for failed payment authorizations"
Layer 4 — Constraints: "Must be idempotent. Max 3 retries. Exponential backoff. Dead-letter after exhaustion."
Layer 5 — Format:      "Provide: sequence diagram, TypeScript implementation, test cases for each retry scenario"
```

**Failure mode**: Providing task without domain context → technically correct but domain-inappropriate solutions. Providing constraints without task → confused, over-constrained output.

---

## 3. Constraint-Driven Creativity

Paradoxically, more constraints produce better creative output. Constraints eliminate the vast space of mediocre solutions, forcing the model toward novel ones.

**Mechanism**: Without constraints, the model gravitates toward the statistical center — the most "average" solution. Constraints push it away from the center into less-explored regions where interesting solutions live.

**Application**:
- "Design a pricing page" → generic SaaS pricing page
- "Design a pricing page with exactly 2 tiers, no feature comparison table, the CTA must create urgency without using the word 'limited', and the page must work without JavaScript" → something actually interesting

**When to use**: Whenever output feels generic, add constraints rather than adding more description. Constraints are more effective than adjectives.

**Failure mode**: Too many contradictory constraints → incoherent output. Keep constraints logically consistent.

---

## 4. Role and Perspective Framing

Assigning a specific role changes the model's vocabulary, reasoning patterns, and quality standards. The role isn't decoration — it's a precision tool.

**Mechanism**: Different roles activate different knowledge distributions. "Explain Docker" produces different output than "Explain Docker as a Linux kernel developer would to a colleague who's never used containers." The role sets the expertise level, the audience sets the calibration, and the relationship (peer, teacher, advisor) sets the tone.

**Effective roles** (specific > generic):
- "Senior staff engineer at Stripe reviewing a junior's PR" > "experienced developer"
- "YC partner giving brutally honest feedback in office hours" > "business advisor"
- "Copy editor at The Atlantic with 15 years experience" > "editor"

**Ineffective roles**:
- "Expert" (expert at what?)
- "Professional" (meaningless modifier)
- "Helpful assistant" (Claude's default — you gain nothing)

**Failure mode**: Role without task context → Claude performs the role generically. Always pair role with specific task and domain.

---

## 5. Chain-of-Thought Scaffolding

For complex reasoning, structure the thinking process explicitly rather than asking for the final answer directly.

**Mechanism**: When you ask for a conclusion directly, the model may skip intermediate reasoning steps that would have caught errors. Explicit thinking structure forces those steps to happen.

**Application**:
```
Before recommending a database, work through:
1. What are the read/write patterns? (ratio, frequency, peak load)
2. What consistency guarantees does the domain require?
3. What's the data shape? (relational, document, graph, time-series)
4. What's the team's operational expertise?
5. What's the scaling trajectory over 18 months?
THEN recommend, citing which factors drove the choice.
```

**When NOT to use**: Simple, well-defined tasks. Asking Claude to "think step by step" about formatting a string is overhead for no benefit.

**Failure mode**: Over-scaffolding simple tasks → verbose output that buries the answer. Match scaffolding depth to problem complexity.

---

## 6. Few-Shot Calibration

Show, don't tell. One concrete example communicates more than a paragraph of description.

**Mechanism**: Examples define a pattern that the model extrapolates. They set the tone, depth, format, and quality bar simultaneously — things that are hard to specify in words.

**Application**:
```
Write commit messages in this style:

GOOD: "fix: prevent duplicate webhook delivery when idempotency key collides during concurrent requests"
GOOD: "feat: add circuit breaker to payment gateway client with 5s timeout and 3-failure threshold"
BAD:  "fixed stuff"
BAD:  "update payment service to add new functionality for handling errors better"
```

**Power move**: Include one "bad" example alongside good ones. Negative examples are disproportionately effective because they define the boundary — the model learns what NOT to do, which eliminates entire categories of wrong output.

**Failure mode**: Examples that are too similar → model over-fits to the superficial pattern. Include diverse examples that share the TARGET quality, not the SURFACE format.

---

## 7. Negative Examples

Explicitly showing what you DON'T want is often more instructive than showing what you do want.

**Mechanism**: "Write clearly" is ambiguous — there are infinite ways to be "clear." "Don't use jargon, don't write sentences over 20 words, don't use passive voice" eliminates specific failure modes. The model can avoid concrete anti-patterns more reliably than it can hit vague positive targets.

**Application**:
```
DO NOT:
- Start with "In today's fast-paced world" or any throat-clearing
- Use bullet points as default organization
- Summarize what was just said
- Use the word "robust" without specifying what makes it robust
- End sections with "In conclusion" or "To summarize"
```

**Pairing**: Best combined with positive examples (Principle 6). Show what's good, show what's bad, let the model triangulate.

**Failure mode**: All-negative prompts with no positive guidance → the model knows what to avoid but not what to aim for. Always pair negative examples with at least one positive example or clear target description.

---

## 8. Meta-Prompting

Prompts that generate prompts. Use Claude to help you write better prompts for Claude.

**Mechanism**: You know your domain better than any prompt template can capture. But Claude knows its own instruction-following patterns. Meta-prompting combines both — you provide the domain knowledge, Claude structures it into effective instructions.

**Application**:
```
I need to write a CLAUDE.md for a fintech project. Here's what I care about:
- PCI-DSS compliance is non-negotiable
- We use TypeScript strict mode
- Team of 3 senior engineers
- Moving fast but can't ship security bugs

Generate the CLAUDE.md rules section. Make each rule specific and actionable.
No vague guidelines — every rule should be testable (I can look at code and verify compliance).
```

**When to use**:
- Setting up a new project (use Claude to generate its own instructions)
- When your prompts produce inconsistent results (ask Claude to diagnose why)
- When translating domain expertise into prompt format

**Failure mode**: Treating meta-prompted output as final without review. Always review and edit generated prompts — they're a starting point, not a deliverable.

---

## Principle Interactions

These principles compound. A prompt using all 8 is dramatically more effective than one using 1-2. But priority order matters when you're constrained:

**If you can only apply one**: Specificity (Principle 1). It's the highest-leverage single change.

**If you can apply three**: Specificity + Context Layering + Negative Examples. This combination eliminates the most failure modes.

**If you have time for all eight**: Layer them in order: Role (4) → Context (2) → Task with Specificity (1) → Constraints (3) → Thinking Structure (5) → Examples (6+7) → and use Meta-prompting (8) to refine the whole thing.

The ARC pattern library (`templates/prompts/`) builds every pattern from these principles. Each pattern cites which principles it uses and why.
