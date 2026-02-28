# Real Project Walkthrough: Greenfield SaaS Backend

This is a realistic session log showing how ARC-calibrated prompting produces different outcomes than default prompting. The project: building an API backend for a B2B invoicing SaaS. Stack: TypeScript, Node.js, PostgreSQL, deployed on Railway.

---

## Session 1: Architecture

### Context (after `/arc-init` and `/arc-kickoff` are complete)

The project's `CLAUDE.md` includes:
- Stack: TypeScript, Fastify, Drizzle ORM, PostgreSQL
- Domain: B2B SaaS (software-eng overlay + saas.md module)
- Quality bar: Production
- Hard constraint: Must support multi-tenancy from day one — retrofitting it later is not an option

### The prompt

```
Design the multi-tenant architecture for the database layer.

Non-negotiables:
- Row-level security (RLS) in PostgreSQL, not application-layer tenant filtering
- Every query must be tenant-scoped — no way to accidentally query across tenant boundaries
- Schema must support the access model: Organization > Teams > Members

Current state: empty database. Starting from scratch.

Two specific decisions I need:
1. How to propagate tenant context to PostgreSQL for RLS without passing it in every query
2. How to structure the `organizations`, `teams`, and `members` tables to support the hierarchy without becoming a maintenance nightmare at 50+ tables

Skip recommending connection pooling — we're using PgBouncer, already decided.
```

### What Claude produces

The response addresses both questions specifically:

**On context propagation**: `SET LOCAL app.tenant_id = $1` within a transaction, read in RLS policies via `current_setting('app.tenant_id')`. The Drizzle middleware wraps every db call with a transaction that sets the context first. This avoids passing tenant ID through every query — it's a session variable that RLS reads automatically.

**On table structure**: Three approaches evaluated with tradeoffs:
1. `tenant_id` column on every table (simplest, most explicit, easiest to audit) — recommended
2. Separate schema per tenant (strongest isolation, impossible to run cross-tenant queries accidentally) — ruled out because cross-tenant analytics queries become impossible
3. Row-level policies on a shared schema (hybrid) — what the recommendation ends up being

The response includes the actual RLS policy SQL, the Drizzle middleware wrapper, and a note about the one place this breaks: `SELECT` from a reference table (currencies, countries) that shouldn't be tenant-scoped — this needs an explicit `SECURITY DEFINER` function or a `SET app.tenant_id = 'global'` convention.

### Why this worked

The negative constraint ("skip recommending connection pooling") eliminated one predictable output chunk. The two specific decisions framed the question as "resolve these, don't give me an overview." The non-negotiable list gave Claude a filter: anything that doesn't satisfy RLS-first is off the table. The current state ("empty database, starting from scratch") prevented suggestions conditioned on migrating an existing schema.

---

## Session 2: Debugging a production incident

Two weeks later. The tenant context propagation is deployed and working. A new bug surfaces.

### Context read by Claude at session start
- `tasks/lessons.md` has one entry: "Discovered that Drizzle's `db.transaction()` doesn't automatically inherit the tenant context set in middleware — must explicitly pass the db reference with context already set."
- `tasks/decisions.md` records: "Decided to use `SET LOCAL` not `SET` for tenant context — `SET LOCAL` is automatically reset at transaction end, preventing context leakage."

### The incident

```
Production issue. Reports show that approximately 0.1% of invoice reads are returning data from the wrong tenant. No reproducing pattern yet.

Relevant facts:
- Happens only during high-concurrency periods (>200 req/s)
- All requests hit the same read replica
- The read replica is using PgBouncer in transaction mode

Suspected cause: PgBouncer in transaction mode reuses connections between transactions, and `SET LOCAL` from a previous transaction might be leaking into the next one.

I don't think that's actually possible since SET LOCAL is transaction-scoped. But I can't explain the bug otherwise. Tell me:
1. Is my understanding of SET LOCAL correct?
2. If yes, what else could cause cross-tenant data leakage?
```

### What Claude produces

Direct diagnosis: the understanding of `SET LOCAL` is correct — it IS transaction-scoped and automatically resets. PgBouncer in transaction mode is not the bug.

But Claude flags a different interaction: PgBouncer in **transaction mode** means each statement can hit a different backend connection. If tenant context is set in a `BEGIN` block and then a subsequent statement happens in a "new" connection (from PgBouncer's perspective), the context isn't there.

The specific failure path: a small number of requests use Drizzle's implicit transaction wrapping for reads — which, under transaction-mode pooling, don't guarantee all statements go to the same backend connection. The `SET LOCAL` runs on connection A; the SELECT runs on connection B with no tenant context; RLS has no context, applies the `USING (false)` fallback incorrectly, and either leaks or blocks.

Fix: ensure every query that relies on tenant context uses an explicit transaction (not Drizzle's implicit one), or switch PgBouncer to session mode for the read replica (with latency tradeoff noted).

### Why this worked

The `tasks/lessons.md` entry about Drizzle's transaction behavior surfaced at session start — Claude already knew the relevant pattern before the question was asked. The specific technical hypothesis ("my theory is X, is it right?") forced Claude to either confirm or refute with reasoning rather than produce a generic list of "common causes of data leakage." The prompt gave enough operational context (>200 req/s, read replica, PgBouncer mode) that Claude could reason about the actual system topology.

---

## Session 3: Code review

One sprint later. A junior engineer submitted a PR adding a new endpoint.

### The prompt

```
Code review this endpoint. You're a senior engineer on this team who knows:
- We use RLS for tenant isolation (no application-layer tenant filtering)
- We write explicit error types, not string errors
- All external inputs go through Zod schemas

Function is: POST /api/invoices — creates a new invoice for the authenticated tenant.

[code block]
```

### What Claude produces

Specific issues, not general advice:

1. **Missing Zod validation on `line_items`**: The body is destructured directly without validation. If `line_items` is undefined (client bug), the query fails with a Postgres error that leaks the table schema.

2. **Tenant ID sourced from request body, not auth context**: Line 34 uses `req.body.tenantId`. The tenant ID must come from the authenticated session (`req.session.tenantId`), not user input. This is a multi-tenancy security bug — any user can create invoices for any tenant by passing a different `tenantId`.

3. **No idempotency key**: Invoice creation is not idempotent. Double-click or network retry creates two invoices. Suggest `idempotency_key` column with unique constraint.

4. **String error at line 52**: `throw new Error('Invoice not found')` violates the explicit error types convention. Should be `throw new InvoiceNotFoundError(invoiceId)`.

### Why this worked

The three context bullets gave Claude the team conventions without requiring it to read the whole codebase. The "you're a senior engineer on this team" role framing produced review output at the level of someone who knows the codebase, not generic advice. The tenant ID security bug was caught specifically because the multi-tenancy convention was in context — a generic review without that context would likely have missed it.

---

## Session 4: `/arc-check` on a finished feature

After implementing the invoice creation endpoint with the fixes applied.

### Running the check

```
/arc-check
```

Claude runs the universal checks + code checks on the most recent output (the revised endpoint).

### Sample verdict

```
## /arc-check verdict

**Overall**: PASS

### Issues found

None. Ship it.

### Verdict rationale

RLS tenant isolation correct — tenant ID sourced from session, not request body. Zod schema covers all external inputs including line_items. Explicit error types used throughout. One minor note: the idempotency key is stored but not checked on duplicate insert — the unique constraint will throw a Postgres error rather than returning a 409. Acceptable for now given the quality bar, but worth a follow-up task.
```

The note about idempotency handling gets added to `tasks/todo.md` as a follow-up, not a blocker.
