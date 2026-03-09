# /arc-init — ARC Project Setup

You are setting up a new project with the ARC framework. This takes about 2 minutes.

Tell the user: "Setting up ARC for this project. Three quick questions."

---

## Step 1: Gather project details

### Q1 — Project name and description

Ask as a plain message:
> "What's the project name AND what does it do?"

Wait for the answer before proceeding.

### Q2 — Primary domain (two-step)

**Step 2a — Domain area**

Use `AskUserQuestion`:
- question: "What's the primary domain?"
- header: "Domain"
- options:
  1. label "Technical" — description "Software engineering, data & analytics, design/UX"
  2. label "Business" — description "Strategy, sales/GTM, legal & compliance"
  3. label "Content & Knowledge" — description "Content publishing, research, productivity, decision frameworks"
  4. label "Generic" — description "Doesn't fit a specific domain"

If the user selects **Generic**: skip Step 2b. Domain = Generic (#11).

**Step 2b — Specific domain**

Use `AskUserQuestion` with the sub-options matching their Step 2a answer:

If **Technical**:
- question: "Which technical domain?"
- header: "Domain"
- options:
  1. label "Software Engineering" — description "Codebases, APIs, systems, infrastructure"
  2. label "Data & Analytics" — description "Pipelines, warehouses, BI, metrics"
  3. label "Design & UX" — description "Product design, design systems, UX research"

If **Business**:
- question: "Which business domain?"
- header: "Domain"
- options:
  1. label "Business Strategy" — description "Planning, competitive analysis, exec communication"
  2. label "Sales & GTM" — description "Outbound, go-to-market strategy, deal execution"
  3. label "Legal & Compliance" — description "Contracts, policy, regulatory work"

If **Content & Knowledge**:
- question: "Which content domain?"
- header: "Domain"
- options:
  1. label "Content Publishing" — description "Editorial, blogs, documentation, media"
  2. label "Learning & Research" — description "Courses, research synthesis, knowledge management"
  3. label "Productivity" — description "Workflows, tooling, task management systems"
  4. label "Decision Frameworks" — description "Decision-making tools, strategic frameworks"

### Q3 — Quality bar

Use `AskUserQuestion`:
- question: "What's the quality bar?"
- header: "Quality"
- options:
  1. label "Prototype" — description "Move fast, cut corners deliberately"
  2. label "MVP" — description "Works reliably, not polished"
  3. label "Production" — description "Correctness, error handling, maintainability"
  4. label "Polished" — description "High craft bar, presentation and detail matter"

---

## Step 2: Determine overlay and module

Map the selected domain to its overlay file (in `templates/claude-md/`):

| Domain | Overlay file |
|--------|-------------|
| Software Engineering | templates/claude-md/software-eng.md |
| Content Publishing | templates/claude-md/content-publishing.md |
| Business Strategy | templates/claude-md/business-strategy.md |
| Design & UX | templates/claude-md/design-ux.md |
| Data & Analytics | templates/claude-md/data-analytics.md |
| Legal & Compliance | templates/claude-md/legal-compliance.md |
| Sales & GTM | templates/claude-md/sales-gtm.md |
| Learning & Research | templates/claude-md/learning-research.md |
| Productivity | templates/claude-md/productivity.md |
| Decision Frameworks | templates/claude-md/decision-frameworks.md |
| Generic | templates/claude-md/generic.md |

**Domain modules** (optional, applied during /arc-kickoff based on deeper context):
- `domains/saas.md` — B2B SaaS products
- `domains/fintech.md` — financial technology
- `domains/e-commerce.md` — online retail and marketplaces
- `domains/developer-tools.md` — tools built for developers
- `domains/mobile-app.md` — native or cross-platform mobile
- `domains/ai-ml.md` — AI/ML products and pipelines
- `domains/healthcare.md` — health tech and medical software
- `domains/education.md` — edtech and learning platforms
- `domains/marketplace.md` — two-sided marketplace products
- `domains/gaming.md` — games and interactive entertainment
- `domains/design-ux.md` — product design, design systems, UX research
- `domains/data-analytics.md` — data warehouses, BI, metrics, pipelines
- `domains/legal-compliance.md` — contracts, policy, regulatory work
- `domains/sales-gtm.md` — outbound, GTM strategy, deal execution

---

## Step 3: Compose CLAUDE.md

Build the CLAUDE.md with this structure, filling real values from the answers:

```
# {{PROJECT_NAME}}

{{ONE_SENTENCE_DESCRIPTION}}

---

## NON-NEGOTIABLE

[Include rules from base.md NON-NEGOTIABLE section]
[Add hard rules from the primary domain overlay's NON-NEGOTIABLE section]

## DEFAULTS

Quality bar: {{QUALITY_BAR_LABEL}}

[Include defaults from base.md DEFAULTS section]
[Add domain-specific defaults from primary overlay]

## SUGGESTED

[Include suggestions from base.md SUGGESTED section]
[Add domain-specific suggestions from primary overlay]

## Voice

_Calibrated during /arc-kickoff. Until then, default to: direct, concise, no filler. Match the user's vocabulary and length._

## Project Context

### Stack
_Not yet specified — will be defined during /arc-kickoff._

### Architecture
_Not yet defined. Update with: service boundaries, data flow, key integration points._

### Conventions
_Not yet defined. Follow existing code style until this is defined._
```

Replace all `{{VARIABLE}}` placeholders with actual values. Do not leave any placeholders unfilled.

Quality bar label mapping:
- Prototype → "Prototype (speed over correctness)"
- MVP → "MVP (functional reliability)"
- Production → "Production (correctness, error handling, maintainability)"
- Polished → "Polished (high craft, presentation and detail matter)"

---

## Step 4: Create tasks/ directory

Create four files using the tasks-template/ formats:

- `tasks/plan.md` — Project plan with the project name, description, and goal filled in. Leave milestones as a single placeholder row for the user to expand.
- `tasks/todo.md` — Empty todo list with headers from the template, no fake tasks.
- `tasks/lessons.md` — Empty lessons log with headers and format from the template.
- `tasks/decisions.md` — Pre-populate with one entry: the domain and quality bar chosen, dated today.

---

## Step 4b: Initialize STATE.md

Create `tasks/STATE.md` from `templates/STATE.md`, filling in values from the setup answers:

- `{{PROJECT_NAME}}` → project name from Q1
- `{{DATE}}` → today's date
- `{{DOMAIN}}` → selected domain name
- `{{QUALITY_BAR}}` → quality bar label
- `{{CURRENT_FOCUS}}` → "Project initialized — awaiting first task"
- `{{WHAT_FINISHED}}` → "arc-init: CLAUDE.md and tasks/ directory created"
- `{{NEXT_ACTION}}` → "Run /arc-kickoff for deeper context, or start working"
- `{{KEY_DECISIONS}}` → "Domain: {{DOMAIN}}, Quality bar: {{QUALITY_BAR}}"
- `{{OPEN_QUESTIONS}}` → "Voice not yet calibrated — run /arc-kickoff to set"
- `{{CLAUDE_MD_STATUS}}` → "✅ active (voice not yet calibrated)"
- `{{BRIEF_STATUS}}` → "❌ not created — run /arc-kickoff"
- `{{DECISIONS_STATUS}}` → "✅ tasks/decisions.md (1 entry)"
- `{{VOICE_CALIBRATED}}` → "❌ no — run /arc-kickoff"
- `{{LAST_CHECK_RESULT}}` → "not yet run"
- `{{LAST_CHECK_DATE}}` → "—"

---

## Step 5: Report completion

Tell the user exactly this (substituting values):

"Created CLAUDE.md and tasks/ for **{{PROJECT_NAME}}**.

- Primary domain: {{DOMAIN_NAME}}
- Quality bar: {{QUALITY_BAR_LABEL}}

Run **/arc-kickoff** for a full project interview, or start working — CLAUDE.md is already active."

Do not offer to do anything else unless the user asks.
