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
  4. Learning / Research
  5. Productivity
  6. Decision Frameworks
  7. Generic"

**Group 3 (after group 2 answer):**
- "Is there a secondary domain? For example, a SaaS product that also needs content strategy. (type 1-7 or 'none')"

**Group 4 (after group 3 answer):**
- "Quality bar?
  1. Quick prototype — move fast, cut corners deliberately
  2. Functional MVP — works reliably, not polished
  3. Production-ready — correctness, error handling, maintainability"

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
| 4 | Learning / Research | templates/claude-md/learning-research.md |
| 5 | Productivity | templates/claude-md/productivity.md |
| 6 | Decision Frameworks | templates/claude-md/decision-frameworks.md |
| 7 | Generic | templates/claude-md/generic.md |

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

Tone: [leave as "TBD — will calibrate during /arc-kickoff"]
Vocabulary: [leave as "TBD"]
Format preferences: [leave as "TBD"]
```

Replace all `{{VARIABLE}}` placeholders with actual values. Do not leave any placeholders unfilled.

Quality bar label mapping:
- 1 → "Prototype (speed over correctness)"
- 2 → "MVP (functional reliability)"
- 3 → "Production (correctness, error handling, maintainability)"

---

## Step 4: Create tasks/ directory

Create four files using the tasks-template/ formats:

- `tasks/plan.md` — Project plan with the project name, description, and goal filled in. Leave milestones as a single placeholder row for the user to expand.
- `tasks/todo.md` — Empty todo list with headers from the template, no fake tasks.
- `tasks/lessons.md` — Empty lessons log with headers and format from the template.
- `tasks/decisions.md` — Pre-populate with one entry: the domain and quality bar chosen, dated today.

---

## Step 5: Report completion

Tell the user exactly this (substituting values):

"Created CLAUDE.md and tasks/ for **{{PROJECT_NAME}}**.

- Primary domain: {{DOMAIN_NAME}}
- Quality bar: {{QUALITY_BAR_LABEL}}
- Constraints noted: {{CONSTRAINTS or "none"}}

Run **/arc-kickoff** for a full project interview that builds deeper context, or start working — CLAUDE.md is already active."

Do not offer to do anything else unless the user asks.
