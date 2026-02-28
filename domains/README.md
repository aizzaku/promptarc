# Domain Modules

Domain modules add industry-specific context on top of the domain overlays in `templates/claude-md/`. They're not templates — they're pre-built knowledge layers that Claude reads at session start to understand the specific dynamics, vocabulary, and constraints of your industry.

---

## When to use a domain module

Domain modules are optional. Use one when:

- Your project is in a **specific industry** with non-obvious dynamics (not just "we're building software")
- You want Claude to understand **industry vocabulary** without explaining it every time
- The domain has **regulatory requirements** that affect architecture decisions
- There are **known pitfalls** in the domain that Claude should avoid by default

Skip domain modules when you're building something truly cross-industry (a generic CRUD app, a personal tool, a one-off script) — the overhead isn't worth it.

---

## Available modules

| Module | Use for |
|--------|---------|
| `saas.md` | B2B subscription software — ARR, churn, PLG vs. SLG, multi-tenancy |
| `fintech.md` | Financial technology — payment rails, KYC/AML, compliance, unit economics |
| `e-commerce.md` | Online retail and DTC brands — conversion, inventory, payment processing |
| `developer-tools.md` | Products for developers — DX, CLI design, SDK quality, adoption patterns |
| `mobile-app.md` | Native and cross-platform mobile — release cycles, platform constraints, IAP |
| `ai-ml.md` | AI/ML products — LLMs, RAG, evals, latency/cost tradeoffs |
| `healthcare.md` | Health tech — HIPAA, PHI handling, FHIR, EHR integration, FDA SaMD |
| `education.md` | EdTech — LMS integration, FERPA/COPPA, assessment, learning outcomes |
| `marketplace.md` | Two-sided marketplaces — cold start, liquidity, take rate, leakage |
| `gaming.md` | Games — engines, netcode, F2P economics, platform certification |

---

## How to use them

### Via `/arc-init`

The `/arc-init` skill asks what industry your project is in and automatically selects the right module if one matches. You don't need to do anything manually.

### Manual composition

If you're composing `CLAUDE.md` manually, append the relevant module after the domain overlay:

```
# My Project
[base.md content]
[software-eng.md content]
[saas.md content]  ← domain module appended here
```

Multiple modules can be stacked:

```
[base.md]
[software-eng.md]
[fintech.md]
[saas.md]  ← fintech SaaS: both modules apply
```

### Word count budget

Each domain module adds ~600-800 words to your `CLAUDE.md`. With base + overlay + one module, you should be well under the 3,500-word total budget. With two modules, check your total.

If you're over budget, the module's context section can be moved to a reference file Claude reads on-demand rather than on every session start.

---

## Module structure

Every module follows the same sections:

| Section | Purpose |
|---------|---------|
| **Context Primer** | How this domain actually works — the non-obvious dynamics that affect product and architecture decisions |
| **Common Patterns** | Recurring technical and product patterns in this domain |
| **Domain Vocabulary** | Terms with specific meanings in this industry |
| **Regulatory/Compliance** | Legal and regulatory constraints that affect architecture |
| **Common Pitfalls** | What goes wrong, and why |
| **Quality Signals** | What a Claude output that demonstrates domain understanding looks like |
| **Anti-Patterns** | Responses Claude should avoid — the generic AI answer for this domain |
| **Recommended Stack/Tools** | What actually works in this domain, and why |

---

## Contributing a new module

The quality bar for inclusion: **the module must tell Claude something it couldn't infer from general knowledge.** A module that says "SaaS companies care about retention" is not useful. A module that explains the specific mechanics of NRR, the PLG vs. SLG architectural split, and why audit logs are a first-class enterprise requirement is useful.

Before writing:
1. Work through the structure above
2. For each section, ask: "Would a competent engineer already know this, or does this require domain experience?"
3. If most of the content would be obvious to a competent engineer, the module doesn't justify its word count budget

Format requirements:
- Under 800 words
- Plain markdown, no nesting beyond H2/H3
- Prose in Context Primer; lists elsewhere
- Specific over general in every sentence
