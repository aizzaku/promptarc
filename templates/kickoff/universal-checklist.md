# Universal Kickoff Checklist

Every project answers these questions before work begins. The `/arc-kickoff` skill walks through these interactively and generates a project brief from the answers.

---

## Required (always asked)

### Identity
1. **What is this project?** (One sentence. If it takes more, the scope isn't clear yet.)
2. **Who is the end user?** (Specific person/role, not "everyone.")
3. **What's the one thing this must do well?** (The non-negotiable core. Everything else is secondary.)
4. **What's explicitly out of scope?** (What you're NOT building/doing. This prevents creep.)

### Constraints
5. **What's the timeline/urgency?** (Hard deadline? Soft target? No rush?)
6. **What's the quality bar?** (Quick prototype | Functional MVP | Production-ready | Polished product)
7. **What are the hard constraints?** (Tech, legal, budget, platform, etc.)
8. **What existing work does this build on?** (Codebase, documents, prior research, etc.)

### People
9. **Who else is involved?** (Solo | Small team | Cross-functional | External stakeholders)
10. **Who makes the final decisions?** (You? A manager? A client? A committee?)

### Success
11. **How will success be measured?** (Specific metrics, deliverables, or acceptance criteria.)
12. **What does "done" look like?** (When do you stop working on this?)

### Risk
13. **What's the biggest risk?** (The thing most likely to derail this.)
14. **What decisions have already been made?** (Don't re-litigate these.)
15. **What decisions are still open?** (These need resolution before or during work.)

---

## Conditional (asked based on answers above)

### If team project (Q9 ≠ Solo)
16. **What's the collaboration model?** (Async? Syncs? PR reviews? Shared docs?)
17. **What tools does the team use?** (Communication, project management, version control.)

### If existing codebase (Q8 mentions code)
18. **What's the codebase state?** (Well-maintained | Needs cleanup | Legacy | Greenfield)
19. **Are there existing conventions?** (Linting, formatting, naming, architecture patterns?)

### If deadline exists (Q5 has a date)
20. **What's the minimum viable deliverable by deadline?** (What can you cut if time runs short?)

### If client/stakeholder involved (Q10 ≠ You)
21. **What's the review/approval process?** (How do deliverables get signed off?)
22. **What's the communication cadence?** (How often do they want updates?)

---

## Domain Detection

Based on answers to Q1-Q4, the kickoff skill identifies the primary domain:

| Signals | Domain | Next Checklist |
|---------|--------|---------------|
| Building software, writing code, technical architecture | Software Engineering | `software-eng-checklist.md` |
| Writing articles, scripts, social content, publishing | Content Publishing | `content-checklist.md` |
| Market analysis, business model, pricing, GTM strategy | Business Strategy | `business-strategy-checklist.md` |
| UI/UX design, product design, user research, design systems | Design / UX | `design-ux-checklist.md` |
| SQL, dashboards, data modeling, pipelines, BI, experimentation | Data & Analytics | `data-analytics-checklist.md` |
| Contracts, policy, regulatory analysis, compliance programs | Legal & Compliance | `legal-compliance-checklist.md` |
| Outbound, sales sequences, deal execution, GTM playbooks | Sales / GTM | `sales-gtm-checklist.md` |
| Learning a topic, research synthesis, curriculum design | Learning & Research | `learning-research-checklist.md` |
| Planning, goal setting, habit design, time management | Productivity | `productivity-checklist.md` |
| Making a decision, evaluating options, risk assessment | Decision Frameworks | `decision-frameworks-checklist.md` |
| None of the above | Generic | `generic-checklist.md` |

**Disambiguation rules** (when signals overlap):
- "Build a GTM strategy" → Business Strategy (macro strategy) vs. Sales / GTM (execution-level sequences, playbooks, ICP definition)
- "Design a dashboard" → Data & Analytics (data-driven, BI) vs. Design / UX (user-experience-first)
- "Review a vendor contract" → Legal & Compliance; "Define pricing model" → Business Strategy
- When ambiguous, ask: "Is this more about analysis/strategy or execution/production?"

Multi-domain projects use multiple checklists. The first domain listed becomes the primary (its conventions take priority on conflicts).
