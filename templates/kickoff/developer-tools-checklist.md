# Developer Tools Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a developer tools project.

---

## Product Type

1. **What type of developer tool?** (CLI | SDK/Library | REST API | IDE extension | Developer platform | Infrastructure / cloud service)
2. **Target developer?** (Frontend | Backend | Full-stack | DevOps/Platform | Data engineer | Specific language community)
3. **Delivery model?** (Open source | SaaS | Self-hosted | Managed service | CLI installed locally)

---

## Developer Experience

4. **Time-to-first-success target?** (How fast does a developer get from signup to working integration? What's acceptable?)
5. **Quickstart experience designed?** (What does the first 15 minutes look like step by step?)
6. **Local development without production dependencies?** (Sandbox? Mock server? Local emulator?)

---

## API / Interface Design

7. **Interface style?** (REST | GraphQL | SDK-first | gRPC | CLI | Library functions)
8. **Versioning strategy?** (URL versioning `/v1/` | Header versioning | Semver for SDKs | Not defined yet)
9. **Breaking change policy?** (Deprecation window in months | Minor version backport | Nothing defined)
10. **Error format?** (Structured errors with code, message, and remediation guidance — or plain strings?)

---

## Documentation

11. **Docs platform?** (Docusaurus | Mintlify | ReadTheDocs | GitBook | Custom | None yet)
12. **Quickstart → Guides → Reference → Examples structure in place?**
13. **API reference auto-generated from spec?** (OpenAPI | TypeDoc | JSDoc | Handwritten — which?)

---

## Distribution

14. **Package registries?** (npm | PyPI | Maven/Gradle | NuGet | Homebrew | Other — which languages?)
15. **CLI distribution?** (Homebrew tap | Scoop | Direct download | Package manager | Shell install script)

---

## Conditional

### If SDK
16. **Which languages/runtimes?** (Each needs idiomatic patterns — not just translated code from a primary language)
17. **Type safety?** (TypeScript types | Python type hints | Go interfaces | None)

### If API product
18. **Authentication model?** (API keys | OAuth | Both | Mutual TLS)
19. **Rate limiting and quota model?** (Per-key | Per-IP | Per-endpoint | Communicated in error responses?)

### If CLI
20. **Shell completion scripts?** (bash | zsh | fish — auto-generated or manual?)
21. **Configuration file format?** (YAML | TOML | JSON | Env vars | Flags only)
