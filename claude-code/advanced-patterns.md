# Advanced Patterns — Power User Techniques

Techniques for getting consistently high-quality output from Claude Code. These are patterns that require understanding how Claude processes instructions, not just what instructions to give.

---

## 1. Constraint-driven creativity

The counterintuitive principle: adding constraints produces better output, not worse.

**Why it works**: Open-ended prompts require Claude to make assumptions about your preferences. Every assumption is a risk. Constraints collapse the solution space — Claude focuses energy on solutions that actually fit your context.

**Bad**: "Design an authentication system for my app."
**Good**: "Design auth for a B2B SaaS app. Constraints: must support SAML SSO for enterprise customers (non-negotiable), 3-engineer team, 6-week timeline, NextAuth is ruled out. Recommend one approach, name the main risk, and describe the alternative for if we had 18 months."

The constraint list forces specificity. The explicit "one approach" prevents hedge-everything output. The risk question prevents overconfidence.

**Pattern**: For any architectural decision, include: what's locked in (can't be changed), what the timeline is, and what alternatives you've already ruled out and why.

---

## 2. Chain-of-thought scaffolding

Telling Claude HOW to reason before asking for a conclusion dramatically improves output quality for complex decisions.

**Bad**: "Should I use PostgreSQL or MongoDB for this project?"
**Good**: "Walk through this in order before concluding: (1) What's the data structure and how relational is it? (2) What's the query pattern — are there complex joins? (3) What's the team's existing expertise? (4) What's the scale trajectory? Then recommend one, not both."

The numbered reasoning steps are a scaffold. Claude follows them, producing structured reasoning that you can verify — and the conclusion emerges from that reasoning rather than appearing as an arbitrary assertion.

**When to use**: Any decision with multiple competing factors. Tradeoff questions ("which database", "which architecture", "should I use X or Y"), risk assessments, and debugging root-cause analysis.

---

## 3. Role-based output shaping

Framing who Claude is changes what perspective it produces output from.

**Generic**: "Review my API design."
**Role-framed**: "You're a security engineer doing a threat model review on this API. I'm a backend engineer who built it. Tell me the top 3 risks and what an attacker would target first."

The role isn't decoration — it selects a point of view. A security engineer review focuses on attack surface. A staff engineer review focuses on maintainability and operability. A product manager review focuses on user-facing implications. The same API generates different and useful reviews from each role.

**Useful roles for code work**:
- "Security engineer reviewing for vulnerabilities"
- "On-call engineer seeing this in production for the first time"
- "Engineer who will maintain this in 2 years without the context you have now"
- "Technical interviewer deciding if this is senior-level work"

---

## 4. Specificity amplification

The output quality ceiling is set by the input specificity. Generic input = generic output, every time.

**Test**: Read your prompt and ask "could this question have been asked about ANY project?" If yes, add more context until the answer is no.

**Pattern for adding specificity**:
1. Add the exact error message or log excerpt (not a description of it)
2. Add the actual code, not a description of the code
3. Name the libraries, versions, and config options in play
4. Describe the behavior you observe, then the behavior you expect
5. Say what you've already tried and why it didn't work

**Before/after**:
- "My API is slow" → "POST /api/orders takes 2.3s at P95. The query plan shows a sequential scan on the `orders` table despite an index on `created_at`. This started 3 days ago after we added the `shipment_status` column."
- "Help me with the auth bug" → "The JWT token is being rejected with `invalid signature` on production but works in staging. The only difference between environments is the `JWT_SECRET` env var — but I've verified they match."

---

## 5. Negative space prompting

Telling Claude what NOT to do is often more efficient than describing what you want.

**Use when**: The default output pattern is predictable but wrong for your context.

**Pattern**:
```
Design a payment flow for a marketplace.

Do NOT:
- Recommend Stripe Connect — we've ruled it out, it's too expensive at our volume
- Suggest building our own payment processor from scratch
- Give a balanced overview of options — pick one and defend it
- Use generic examples — our context is [specific details]
```

The negative constraints eliminate the common failure modes before they happen. Claude doesn't have to infer what you don't want — it's explicit.

**Common "do not" patterns for code work**:
- "Do not add error handling for cases that can't happen" (prevents defensive over-engineering)
- "Do not refactor surrounding code — change only what's necessary for this fix"
- "Do not suggest adding a library — solve this with the existing dependencies"
- "Do not add comments to code that's self-explanatory"

---

## 6. Iterative zooming

Start wide, then narrow. Each response becomes the context for the next prompt.

**Broken pattern**: Trying to ask one perfect prompt that produces a complete solution. This fails for complex work because Claude can't infer which details matter to you.

**Iterative pattern**:
1. Wide prompt: "What's the architecture for a real-time notification system?"
2. Use the response to identify the decision you actually care about: "You mentioned WebSockets vs. SSE. We're on Vercel — which handles that better and why?"
3. Now focus on implementation: "Show me the SSE implementation with reconnect logic."
4. Now review: "Is there a race condition risk when a user has multiple tabs?"

Each iteration is a focused question that uses the previous answer as context. The total time is the same or less than crafting one elaborate prompt — and the output is more accurate.

---

## 7. The evidence anchor

For any claim you want Claude to validate (not generate), provide the raw evidence and ask for analysis — don't describe the evidence.

**Wrong**: "My query is slow because of a missing index." (Claude will agree.)
**Right**: Paste the `EXPLAIN ANALYZE` output. Ask: "What's the bottleneck in this query plan?"

**Wrong**: "Our churn is high because of bad onboarding." (Claude will develop that theory.)
**Right**: Paste the cohort data. Ask: "What's the pattern here?"

Without evidence, Claude works from your framing. With evidence, Claude can challenge your framing. The second is more useful for debugging.

---

## 8. The two-answer format

For decisions or designs where you want both the recommendation and the honest criticism, ask for both explicitly.

**Pattern**: "Give me the recommendation you'd make, then immediately after: what's the strongest argument against it?"

This is faster than asking for "pros and cons" (which produces balanced but useless tables) and more honest than asking just for a recommendation (which produces unjustified confidence).

**Variants**:
- "Best approach for [X], then the main risk of that approach"
- "What you'd build today vs. what you'd build with 10x the time"
- "The recommendation, then what a skeptic would say"

---

## 9. Context injection for resuming work

When resuming complex work in a new session, don't rely on Claude to read the task files and "figure out where we were." Give it an explicit re-entry point.

**Pattern**:
```
Resuming work on [feature]. Quick context:
- What's done: [specific items]
- What's blocking: [specific issue]
- What we decided NOT to do: [specific rejected approach, and why]
- What I need next: [specific next action]

Read tasks/ if you need more detail, but start with the above.
```

This 4-line re-entry prompt saves 5 minutes of Claude re-reading files and restating what it learned. It also prevents Claude from re-litigating decisions that are already made.

---

## 10. Anti-hedging enforcement

Claude defaults to hedged output ("it depends", "you might consider", "there are several approaches") when it's uncertain. Explicitly asking for commitment eliminates this.

**Pattern additions**:
- "Give one recommendation, not multiple options"
- "Make a call — don't give me a menu"
- "Commit to an answer. If you're uncertain, state what you're uncertain about specifically, but then commit anyway"
- "I don't want a balanced overview. Tell me what you'd actually do."

**Why this matters**: Hedged output puts the decision burden back on you. If you wanted to make the decision yourself, you wouldn't be asking Claude. Forcing commitment produces output you can act on — and if the recommendation is wrong, that's information.
