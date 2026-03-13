# Review Checklist

This file is loaded by `/arc-review` and `/arc-ship` (pre-landing review step). Customize it per-project by adding domain-specific checks and suppressions.

---

## How this file works

**Checks section**: Items that `/arc-review` will apply on every run. Add project-specific checks here.

**Suppressions section**: Known patterns in this codebase that `/arc-review` should not flag. Add suppressions when a finding is a false positive or an accepted tradeoff. Each suppression needs a rationale — "suppress everything" defeats the purpose.

---

## CRITICAL checks (Pass 1)

These are applied in addition to the built-in arc-review critical checks. Add project-specific CRITICAL items here.

### SQL safety
- [ ] All queries use parameterized statements or ORM query builders — no string concatenation with user input
- [ ] Bulk operations (DELETE, UPDATE without WHERE) require explicit confirmation
- [ ] Queries that could return unbounded result sets have LIMIT clauses

### Authentication & authorization
- [ ] Every new route has authentication middleware applied
- [ ] Authorization checked at the service layer, not just the controller (defense in depth)
- [ ] Resource ownership verified before read/write operations (IDOR prevention)

### LLM trust boundaries (if project uses LLMs)
- [ ] User input that reaches a prompt is sanitized or sandboxed
- [ ] Prompt injection: user content cannot break out of its designated slot
- [ ] LLM-generated content that's rendered to other users is escaped

### Data integrity
- [ ] Operations that span multiple tables/services use transactions or have idempotency keys
- [ ] Destructive operations (DELETE, archive) are soft-deletable or have a recovery path
- [ ] Asynchronous operations have retry logic and a dead-letter path

---

## INFORMATIONAL checks (Pass 2)

Applied in addition to built-in arc-review informational checks.

### Project-specific patterns
- [ ] [Add project-specific patterns here — e.g., "All service functions return Result types, not throw"]
- [ ] [e.g., "Dates stored as UTC ISO 8601 strings, never local time"]
- [ ] [e.g., "All external API calls have timeout configured"]

### Observability
- [ ] New user-facing features log at least one event per user action (for analytics)
- [ ] Error paths log enough context to debug without a reproduction case
- [ ] Slow operations (>100ms expected) have timing logs

---

## Suppressions

List known false positives or accepted tradeoffs. Format: `pattern` → `rationale`.

```
# Example suppressions:
# localStorage for session token → accepted: short-lived tokens, same-origin only, documented in SECURITY.md
# SELECT * in user_search query → accepted: search result shape is intentionally flexible, indexed properly
```

<!-- Add project suppressions below this line -->

---

## Domain-specific additions

If your project is in one of these domains, the corresponding items are automatically active. You do not need to copy them here — they're loaded from `domains/` by arc-review. Listed for reference:

| Domain | Auto-loaded checks |
|--------|-------------------|
| `fintech` | Monetary types, PCI surface, audit trail completeness |
| `healthcare` | PHI/PII in logs, audit trail, HIPAA access controls |
| `ai-ml` | Prompt injection, model output escaping, training data contamination |
| `cybersecurity` | Attack surface, privilege escalation, credential handling |
| `e-commerce` | Payment bypass, inventory race conditions, order idempotency |
| `devops-platform` | Shell injection, path traversal, secret handling in CI |

---

## Maintenance

This file should be reviewed:
- During `/arc-kickoff` setup (add project-specific checks)
- After any significant incident (add a check that would have caught it)
- When a suppression is resolved (remove it)

If this file is empty / default: arc-review uses the built-in checklist only. That's fine for projects without specific review requirements.
