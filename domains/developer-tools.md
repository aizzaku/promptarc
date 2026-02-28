# Domain: Developer Tooling

## Context Primer
Developer tools are bought by people who can read the source code of what they're buying. This changes every design constraint. The audience has zero tolerance for abstraction leaks, confusing error messages, or documentation that doesn't cover edge cases — and they will publicly roast a tool that wastes their time. DX (developer experience) is not a polish layer; it is the product. A tool with great capabilities and poor ergonomics loses to a tool with slightly worse capabilities and excellent ergonomics every time.

The distribution model for developer tools is fundamentally different from enterprise SaaS. Developers adopt bottom-up: they find the tool, try it locally, integrate it in a side project, then advocate for it at work. This means the free tier or open-source version is the primary acquisition channel, not sales. The open-source → commercial pipeline (OSS core + paid cloud or enterprise) is the dominant business model for infrastructure and tooling companies. The tension is in defining what stays free versus what gets gatekept — get it wrong and you alienate the community that drives adoption.

CLIs, SDKs, and APIs each have distinct design contracts that developers take seriously. A CLI is expected to follow POSIX conventions, compose with pipes, respect environment variables, exit with meaningful codes, and have a `--help` that actually helps. An SDK is expected to be idiomatic in the target language — a Python SDK written like a Java SDK will be rejected on style grounds alone. An API is evaluated on its schema design, versioning strategy, error response consistency, and whether the authentication model matches the threat model. Violating these contracts signals that the tool was built by people who don't use it.

## Common Patterns
- CLI tools built with cobra (Go), click or typer (Python), oclif (Node) — not raw argument parsing
- SDK generation from OpenAPI spec using generators (Speakeasy, Stainless, openapi-generator) + hand-written overlays for idiomatic polish
- Auth via API keys for programmatic access; OAuth for user-facing integrations; service accounts for CI/CD environments
- Semantic versioning enforced rigorously — patch for bug fixes, minor for new features, major for breaking changes
- Changelog maintained as CHANGELOG.md following Keep a Changelog format — developers read these
- Local development mode that doesn't require cloud connectivity or production credentials
- Webhooks with retry logic, signature verification (HMAC-SHA256), and event replay
- Rate limiting with clear headers (`X-RateLimit-Remaining`, `Retry-After`) and documented limits per tier

## Domain Vocabulary
- **DX (Developer Experience)**: The totality of a developer's interaction with a tool — from finding it to debugging it in production. Analogous to UX for end users.
- **SDK (Software Development Kit)**: Language-specific library wrapping an API. Expected to be idiomatic for its language, not a thin HTTP wrapper.
- **OpenAPI / Swagger**: Machine-readable API specification format. The source of truth for SDK generation and documentation.
- **Idempotency**: Property of an operation that produces the same result regardless of how many times it's called. Critical for retry-safe API design.
- **POSIX conventions**: Unix CLI behavioral standards — flags with dashes, stdin/stdout/stderr use, exit codes, signal handling.
- **Semantic Versioning (semver)**: MAJOR.MINOR.PATCH scheme. Breaking changes increment MAJOR. Developers expect this to be followed strictly.
- **Webhook**: HTTP callback from a service to a developer's endpoint when an event occurs. Requires signature verification.
- **Rate Limiting**: Throttling API requests per client. Should communicate limits in response headers, not silently drop requests.
- **Feature Flag**: Runtime switch controlling feature availability. In dev tools, often used to roll out API features before GA.
- **Ergonomics**: The ease and naturalness of using a tool. Good ergonomics = less code to do the same thing, fewer surprises.
- **Local-first**: Development workflow that works without network connectivity or cloud services. Expected for CLIs and test environments.

## Regulatory/Compliance
Regulatory requirements are minimal compared to fintech or healthcare, but have specific concerns:
- Export control (EAR/ITAR) applies if the tool could be used for encryption or dual-use technology — relevant for crypto libraries and certain security tools.
- SOC 2 Type II becomes a blocker for enterprise deals even for dev tools — procurement requires it.
- OSS license compliance: GPL, AGPL, MIT, and Apache 2.0 have different commercial implications. AGPL in a dependency can force open-sourcing of commercial code.
- GitHub and npm require clear license declarations; omitting licenses creates legal ambiguity for adopters.

## Common Pitfalls
- Writing error messages that describe what failed instead of what to do — "Connection refused" is worse than "Cannot connect to localhost:5432. Is the service running?"
- Inconsistent flag naming across subcommands — mixing `--output-dir` and `--out` and `--outputDir` in the same CLI
- Breaking changes in minor or patch versions — developers who follow semver will never forgive this
- SDK that's a thin HTTP wrapper with no convenience methods — forces users to construct requests manually
- Requiring authentication even in local development or testing environments
- Documentation that only covers the happy path — developers need to know what happens when things go wrong
- Designing API responses inconsistently — some endpoints return `{data: {...}}`, others return the object directly
- Not exposing machine-readable output (JSON) from CLIs — `--json` flag is expected

## Quality Signals
- Error messages include the cause and the fix, not just the symptom
- CLI follows `--help`, `--version`, `--json`, and respects `NO_COLOR` env var
- SDK examples show real-world usage patterns, not trivial "hello world" calls
- API versioning strategy is explicit — URL versioning (`/v1/`) or header versioning with a migration path
- Breaking changes documented in CHANGELOG with migration guides
- Local dev setup works in under 5 minutes with documented prerequisites
- Webhooks include timestamp, event type, idempotency key, and HMAC signature

## Anti-Patterns
- Treating developers like non-technical end users — verbose wizards and confirmations where a flag would do
- SDK that doesn't handle pagination, retries, or rate limit errors automatically
- Authentication that requires UI interaction for programmatic use cases
- Documentation generated solely from code comments with no real examples
- Changelog written as git log output ("fix bug", "add feature")
- Designing a CLI that requires reading the docs to do basic operations — happy path must be discoverable

## Recommended Stack/Tools
- **CLI (Go)**: cobra + viper for config; charmbracelet/lipgloss for output styling; survey for interactive prompts
- **CLI (Python)**: typer (click-based with type hints); rich for output; pydantic for config
- **CLI (Node)**: oclif for complex multi-command CLIs; commander for simpler tools
- **SDK generation**: Speakeasy or Stainless for high-quality idiomatic SDKs from OpenAPI
- **API framework**: FastAPI (Python) for OpenAPI-first design; Hono or Fastify (Node) for performance; gin or echo (Go)
- **Docs**: Mintlify or Readme.com for hosted API docs; Docusaurus for OSS project docs
- **Testing CLIs**: bats-core for shell integration tests; testify (Go) with exec-based subprocess testing
- **Versioning/releases**: conventional commits + semantic-release for automated changelog and version bumping
