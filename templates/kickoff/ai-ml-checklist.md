# AI/ML Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies an AI/ML project.

---

## Model & Architecture

1. **LLM provider?** (OpenAI | Anthropic | Google | Open source / self-hosted)
2. **RAG, fine-tuning, or prompt-only?** (RAG is the default recommendation — why is fine-tuning being considered?)
3. **Agentic (multi-step tool use) or single-turn?**
4. **Context window requirements?** (How long are typical inputs? Does history accumulate per session?)

---

## Evaluation

5. **Eval strategy?** (How will you measure whether the AI feature is working correctly?)
6. **Baseline established before any model changes?** (Current performance measured before iterating?)
7. **Regression testing on model upgrades?** (Automated or manual — but it must exist)

---

## Cost & Latency

8. **Latency requirement?** (Real-time interactive | Background processing | Async batch)
9. **Cost budget per request?** (Token costs projected at expected volume)
10. **Caching strategy?** (Semantic cache | Exact-match cache | None — and why)

---

## Data & Retrieval

11. **Knowledge source?** (Documents | Database | APIs — how fresh does it need to be?)
12. **Chunking and embedding strategy decided?** (Or still at defaults?)
13. **Retrieval quality measured?** (Precision and recall on a test query set)

---

## Observability

14. **LLM call logging in place?** (Prompt, response, model, tokens, latency, cost per call)
15. **Tracing for multi-step agentic flows?** (Step-level, not just final output)

---

## Conditional

### If agentic
16. **What actions can the agent take?** (File writes | External API calls | Database mutations — explicit list)
17. **Human-in-the-loop checkpoints defined?** (Which actions require human approval before execution?)
18. **Failure and rollback strategy for bad agent actions?**

### If user-facing AI output
19. **Hallucination risk assessment done?** (What happens if the output is factually wrong? Who is harmed?)
20. **Content moderation or output filtering needed?**
