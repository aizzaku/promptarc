# Decisions

<!--
  Log of significant decisions with rationale. Prevents re-litigating settled choices.
  Only log decisions that affect architecture, scope, or direction — not trivial choices.
-->

<!-- Example format:

## 2025-01-15 — PostgreSQL over MongoDB
**Context**: Needed a primary database for the user service. Data is relational (users, orgs, roles).
**Options considered**:
1. PostgreSQL — Strong relational support, ACID, team has experience. Slightly more ops overhead.
2. MongoDB — Flexible schema, faster initial development. Weaker relational queries, eventual consistency concerns.
**Decision**: PostgreSQL
**Rationale**: Data is inherently relational. Team has 3+ years PG experience. The flexibility of MongoDB doesn't justify the relational query workarounds we'd need.
**Revisit if**: Schema changes become very frequent, or we need document-style storage for a specific feature.

-->
