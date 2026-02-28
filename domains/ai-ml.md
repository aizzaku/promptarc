# Domain: AI / ML Products

## Context Primer

AI product development has a failure mode that most software development doesn't: the gap between a compelling demo and a reliable product is enormous, and the path between them is non-deterministic. A model that performs brilliantly 90% of the time and fails unpredictably the other 10% is not a product — it's a liability. This makes AI product work fundamentally about identifying, measuring, and reducing that failure surface, not just maximizing average performance.

The LLM application stack has converged on a pattern: retrieval-augmented generation (RAG) for knowledge-intensive tasks, function calling / tool use for structured outputs and agentic workflows, and fine-tuning reserved for cases where prompt engineering genuinely hits a ceiling. Most teams over-reach to fine-tuning too early — it's expensive, requires ongoing maintenance, and can't be iterated on as quickly as a prompt. Structured outputs (JSON mode, Anthropic's tool use, OpenAI's response_format) should be the first tool when you need reliable output shapes.

Evaluation is the most under-invested area in AI product work and the most important. "It feels right in manual testing" is not an evaluation strategy. Production AI systems need a ground truth dataset, human raters or automated judges (LLM-as-judge), and metrics that track across prompt changes. Without this, every prompt change is a regression risk you can't quantify.

Latency and cost are product decisions, not just engineering concerns. GPT-4o vs. GPT-4o-mini, Claude Sonnet vs. Claude Haiku — these differ by 5-10x in cost and 2-5x in latency, and the right choice depends on the use case. Routing smaller/simpler queries to cheaper models while reserving larger models for complex ones is a real optimization pattern in production systems.

## Common Patterns

- **RAG (Retrieval-Augmented Generation)**: Embed your knowledge base into a vector store; retrieve relevant chunks at query time and inject into context. Reduces hallucination on domain-specific queries. Quality depends heavily on chunking strategy and retrieval quality — bad retrieval gives confident wrong answers.
- **Streaming responses**: LLMs produce output token-by-token. Streaming to the client with SSE or WebSockets dramatically reduces perceived latency. Not optional for chat interfaces.
- **Structured output with tool use**: Force JSON schemas via Anthropic tool use, OpenAI `response_format`, or instructor library. More reliable than parsing free text.
- **LLM-as-judge evaluation**: Use a stronger model to evaluate outputs from a weaker one. Cheap, scalable, but requires calibration against human ratings.
- **Prompt versioning**: Treat prompts as code. Version control them, test changes against a benchmark dataset before deploying, and track performance metrics per prompt version.
- **Fallback chains**: Primary model → cheaper model → cached response → graceful degradation message. Designing for partial failure is table stakes in production.
- **Context window management**: Long-context models exist, but stuffing the window degrades reasoning. Summarization, selective retrieval, and hierarchical memory structures are better for long-running conversations.

## Domain Vocabulary

- **RAG (Retrieval-Augmented Generation)**: Architecture that retrieves relevant context from external storage before generation, instead of relying on the model's parametric memory.
- **Embedding**: Dense vector representation of text that captures semantic meaning. Used for similarity search in RAG.
- **Vector store**: Specialized database for storing and querying embeddings by similarity (e.g., Pinecone, pgvector, Weaviate, Chroma).
- **Chunking**: Splitting source documents into segments before embedding. Chunk size and overlap strategy significantly affect retrieval quality.
- **Context window**: The maximum amount of text (tokens) a model can process in a single call. Filling it entirely often degrades performance.
- **Hallucination**: Model generating plausible but factually incorrect content. Increases when models lack context and are asked to produce specific facts.
- **Temperature**: Controls output randomness. Low temperature (0-0.3) for factual/structured tasks; higher (0.7-1.0) for creative tasks.
- **Prompt engineering**: Systematic design of model inputs to produce desired outputs — including system prompts, few-shot examples, chain-of-thought instructions, and output format constraints.
- **Fine-tuning**: Training an existing model on task-specific examples. Expensive and slow to iterate; most useful for format consistency, domain vocabulary, or tasks where prompt engineering provably fails.
- **Function calling / tool use**: Model API feature where the model selects and formats calls to predefined tools (functions), enabling reliable structured output and agentic workflows.
- **Agent**: System where a model iteratively selects actions, observes results, and repeats until a goal is complete. Requires careful design of the tool set and failure handling.
- **LLM-as-judge**: Using a model (often GPT-4 or Claude Opus) to score outputs from another model. A pragmatic evaluation approach when human rating isn't scalable.
- **Semantic search**: Retrieval based on meaning similarity (via embeddings) rather than keyword match.
- **Evals (evaluations)**: A benchmark dataset + scoring methodology used to measure model/prompt performance. The AI equivalent of a test suite.

## Regulatory/Compliance

- EU AI Act (2025+): High-risk AI systems (healthcare, employment, credit) require conformity assessments, transparency disclosures, and human oversight mechanisms. General-purpose AI systems above certain capability thresholds face additional obligations.
- GDPR / CCPA: User inputs processed by LLMs may contain PII. Understand the data retention policies of your model provider (OpenAI, Anthropic, Google) — most retain prompts for safety monitoring by default. Opt-out options exist for enterprise contracts.
- Copyright: Training data provenance is legally contested. Outputs from models trained on copyrighted data may carry risk for certain use cases (code generation, creative content reproduction).
- Healthcare (HIPAA): LLM providers are generally not HIPAA-compliant out of the box. Azure OpenAI or on-premise deployments are typically required for PHI.
- Financial advice: Automated investment recommendations face regulatory requirements in most jurisdictions. Disclosure that output is AI-generated and not professional advice is a minimum requirement.

## Common Pitfalls

- Shipping without an eval set — no way to know if prompt changes improve or regress quality
- Using the same model for all tasks when a tiered routing approach would cut costs by 70%+
- Building custom chunking/retrieval infrastructure before validating that RAG is the right architecture
- Ignoring context window utilization — models perform worse when context is near-full
- Fine-tuning before exhausting prompt engineering options (fine-tuning is expensive; prompting is free to iterate)
- Treating hallucination as a model problem rather than a system design problem — grounding, retrieval, and structured outputs all reduce it
- Not building human review into the loop for high-stakes outputs
- Assuming latency is fixed — model choice, streaming, caching, and async processing all affect perceived speed significantly

## Quality Signals

- Distinguishes between accuracy on benchmarks and reliability in production
- Understands that evaluation is a continuous engineering investment, not a one-time check
- Can reason about token cost × quality tradeoffs for specific use cases
- Knows when RAG is the right architecture vs. when fine-tuning is justified
- Treats prompt changes as code changes — with testing and version control

## Anti-Patterns

- "Just use GPT-4 for everything" without reasoning about cost and latency profile
- Building elaborate agentic pipelines before the underlying model can reliably complete the base task
- Treating model API providers as interchangeable without accounting for model-specific behaviors (context handling, instruction following, refusals)
- Ignoring latency as a UX concern
- Measuring success by "it works in a demo" rather than performance on a representative test set

## Recommended Stack/Tools

- **Models**: Claude (Anthropic) — Opus 4 for complex reasoning, Sonnet 4 for production balance, Haiku 4 for high-volume/low-cost; GPT-4o / GPT-4o-mini (OpenAI); Gemini 1.5 Pro for long-context tasks
- **Orchestration**: LangChain (large ecosystem, heavy); LlamaIndex (RAG-focused); Vercel AI SDK (if Next.js); raw SDK calls for simple use cases (often preferable)
- **Vector stores**: pgvector (if already on PostgreSQL — zero new infra); Pinecone (managed, scalable); Chroma (local dev); Weaviate (self-hosted, complex schema)
- **Embeddings**: OpenAI text-embedding-3-small (cost-efficient); Cohere Embed; sentence-transformers (self-hosted)
- **Evals**: Braintrust, LangSmith, or homegrown pytest-based eval harnesses
- **Structured output**: Instructor (Python), Zod + Vercel AI SDK (TypeScript), Anthropic tool use, OpenAI `response_format`
- **Observability**: LangSmith, Langfuse, or Helicone for tracing/monitoring LLM calls
- **Caching**: Semantic caching (GPTCache, or custom embedding similarity threshold) for repeated similar queries
