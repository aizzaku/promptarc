# /arc-init — ARC Project Setup

You are setting up a new project with the ARC framework. This takes about 2 minutes.

Tell the user: "Setting up ARC for this project. I'll ask 6 quick questions — answer as briefly as you like."

---

## Step 1: Ask questions in groups

Ask group 1, wait for the answer, then ask group 2, and so on. Never ask all questions at once.

**Group 1 (ask together):**
- "What's the project name and what does it do? (one sentence)"

**Group 2 (after group 1 answer):**
- "What's the primary domain?
  1. Software Engineering
  2. Content Publishing
  3. Business Strategy
  4. Design / UX
  5. Data & Analytics
  6. Legal & Compliance
  7. Sales / GTM
  8. Learning / Research
  9. Productivity
  10. Decision Frameworks
  11. Generic"

**Group 3 (after group 2 answer):**
- "Is there a secondary domain? For example, a SaaS product that also needs content strategy. (type 1-11 or 'none')"

**Group 4 (after group 3 answer):**
- "Quality bar?
  1. Quick prototype — move fast, cut corners deliberately
  2. Functional MVP — works reliably, not polished
  3. Production-ready — correctness, error handling, maintainability
  4. Polished — high craft bar, presentation and detail matter"

**Group 5 (after group 4 answer):**
- "Team size? (solo / small team 2-5 / larger)"

**Group 6 (after group 5 answer):**
- "Any hard constraints? Tech stack locked, regulatory requirements, timeline, budget ceiling. Type 'none' if not applicable."

---

## Step 2: Determine overlays and modules

Map the domain number to its overlay file (in `templates/claude-md/`). Domain modules are optional add-ons from `domains/` — pick one if it matches the project's industry vertical (e.g., saas.md, fintech.md).

| # | Domain | Overlay file |
|---|--------|-------------|
| 1 | Software Engineering | templates/claude-md/software-eng.md |
| 2 | Content Publishing | templates/claude-md/content-publishing.md |
| 3 | Business Strategy | templates/claude-md/business-strategy.md |
| 4 | Design / UX | templates/claude-md/design-ux.md |
| 5 | Data & Analytics | templates/claude-md/data-analytics.md |
| 6 | Legal & Compliance | templates/claude-md/legal-compliance.md |
| 7 | Sales / GTM | templates/claude-md/sales-gtm.md |
| 8 | Learning / Research | templates/claude-md/learning-research.md |
| 9 | Productivity | templates/claude-md/productivity.md |
| 10 | Decision Frameworks | templates/claude-md/decision-frameworks.md |
| 11 | Generic | templates/claude-md/generic.md |

**Domain modules** (optional, stack on top of overlays):
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

If a secondary domain was specified, identify the same overlay for it. Domain modules can be stacked (e.g., saas.md + fintech.md for a fintech SaaS).

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
[If secondary domain: add its hard rules, prefixed with "({{SECONDARY_DOMAIN}}):"]

## DEFAULTS

Quality bar: {{QUALITY_BAR_LABEL}}
Team: {{TEAM_SIZE}}
Constraints: {{CONSTRAINTS or "None specified"}}

[Include defaults from base.md DEFAULTS section]
[Add domain-specific defaults from primary overlay]

## SUGGESTED

[Include suggestions from base.md SUGGESTED section]
[Add domain-specific suggestions from primary overlay]
[If secondary domain: add relevant suggestions]

## Voice

_Calibrated during /arc-kickoff. Until then, default to: direct, concise, no filler. Match the user's vocabulary and length._

## Project Context

### Stack
{{If Group 6 specified a tech stack, list it here. Otherwise write: "Not yet specified — will be defined during /arc-kickoff."}}

### Architecture
_Not yet defined. Update with: service boundaries, data flow, key integration points._

### Conventions
_Not yet defined. Follow existing code style until this is defined._
```

Replace all `{{VARIABLE}}` placeholders with actual values. Do not leave any placeholders unfilled.

Quality bar label mapping:
- 1 → "Prototype (speed over correctness)"
- 2 → "MVP (functional reliability)"
- 3 → "Production (correctness, error handling, maintainability)"
- 4 → "Polished (high craft, presentation and detail matter)"

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

- `{{PROJECT_NAME}}` → project name from Group 1
- `{{DATE}}` → today's date
- `{{DOMAIN}}` → primary domain name (not number)
- `{{QUALITY_BAR}}` → quality bar label
- `{{CURRENT_FOCUS}}` → "Project initialized — awaiting first task"
- `{{WHAT_FINISHED}}` → "arc-init: CLAUDE.md and tasks/ directory created"
- `{{NEXT_ACTION}}` → "Run /arc-kickoff for deeper context, or start working"
- `{{KEY_DECISIONS}}` → "Domain: {{DOMAIN}}, Quality bar: {{QUALITY_BAR}}, Constraints: {{CONSTRAINTS}}"
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
- Constraints noted: {{CONSTRAINTS or "none"}}

Run **/arc-kickoff** for a full project interview that builds deeper context, or start working — CLAUDE.md is already active."

Do not offer to do anything else unless the user asks.
