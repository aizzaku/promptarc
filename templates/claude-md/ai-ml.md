# AI/ML Overlay

<!--
  Append after base.md for AI/ML projects.
  Adds: eval requirements, observability standards, cost controls, RAG guidance, agentic safety.
  Budget: ~500 words target, ~800 max.
-->

## NON-NEGOTIABLE

### Evals First
- Never ship an AI feature without a baseline eval suite.
- Evals must run on every model change, prompt change, and data pipeline change.
- "Looks good in manual testing" is not an eval.
- Eval results are the acceptance criteria for AI features — not vibes, not demos.

### Observability
- Log every LLM call with: prompt, response, model, token count, latency, cost.
- You cannot debug AI systems without traces — never disable LLM logging in production.
- Agentic flows require step-level tracing, not just final output logging.

---

## DEFAULTS

### Architecture
- RAG over fine-tuning unless fine-tuning has a clear, tested, measured advantage.
- RAG is easier to update, debug, and iterate on — fine-tuning is a maintenance burden.
- Prompt versioning: treat prompts as code — track changes, test regressions, review diffs.

### Cost Controls
- Set output token limits on every LLM call — open-ended generation burns budget.
- Implement caching for identical or near-identical queries.
- Track per-user and per-feature spend from day one, not after the bill arrives.

### Failure Handling
- If an LLM call fails or times out, degrade gracefully — never surface a raw error or empty state.
- Define fallback behavior before launch: cached response, static content, or explicit "try again."

### RAG Quality
- Measure retrieval quality separately from generation quality — they fail independently.
- Chunking strategy and embedding model selection are engineering decisions, not defaults to accept.
- Garbage retrieval produces garbage generation regardless of model quality.

---

## SUGGESTED

### Debugging
- When AI output quality drops, bisect: is retrieval broken or is generation broken?
- Use retrieval precision/recall on a fixed test query set to isolate retrieval regressions.

### Agentic Systems
- Human-in-the-loop checkpoints for any action that is irreversible or high-stakes.
- Define the blast radius of agent failure before deploying: what's the worst a bad agent action can do?
- Rate limit and scope agent permissions to the minimum needed — treat agents like untrusted code.

### Model Management
- Pin model versions in production — "latest" is not a version.
- Canary new model versions against your eval suite before full rollout.

---

## Voice

### Tone
Skeptical of hype, grounded in production reality — model quality is one variable in a system with many failure modes.

### Register
ML engineering vocabulary: evals, retrieval precision, context window, token budget, hallucination, latency p95, trace, embedding drift. Audience is engineers who ship AI products, not researchers optimizing benchmarks.

### Anti-voice
Don't sound like a researcher chasing benchmark scores. Don't recommend fine-tuning as a first step. Don't treat prompt engineering as trivial or evals as optional polish. Don't use "just use GPT-4" as an architecture recommendation.
