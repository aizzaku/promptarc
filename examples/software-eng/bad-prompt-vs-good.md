# Bad Prompt vs. Good Prompt: Software Engineering

## Example 1: Debugging a Production 500 Error

### Bad Prompt

```
My API is returning 500 errors. Can you help me debug it?
```

### What You Get

> To debug 500 errors in your API, start by checking your server logs for error messages. Common causes include database connection issues, null pointer exceptions, and unhandled promise rejections. Make sure you have proper error handling in place. Check your environment variables are set correctly. You might also want to add more logging to identify where the error is occurring.
>
> Here are some steps to follow:
> 1. Check the logs
> 2. Look for stack traces
> 3. Verify environment variables
> 4. Test the endpoint with different inputs
> 5. Add error handling

### Why It Failed

Generic input produces generic output (Principle 1 — Specificity Amplification). Claude has no context about the stack, the error pattern, when it started, or what the logs show — so it produces the same advice it would give to anyone with any API in any language. This output could have been written without knowing a single thing about the actual problem.

### Good Prompt

```
Production incident. Node.js/Express API (TypeScript), PostgreSQL via Prisma ORM.

Endpoint: POST /api/v1/subscriptions/upgrade
HTTP 500 started ~40 minutes ago. Affects ~15% of requests, not all.
No deploys in the last 6 hours.

Relevant log excerpt:
```
PrismaClientKnownRequestError: Transaction API error
  code: 'P2034'
  message: 'Transaction failed due to a write conflict or a deadlock. Please retry your transaction'
  at /app/src/services/subscription.service.ts:147
  at processTicksAndRejections
```

The upgrade endpoint: reads the current plan, creates a new subscription record, updates the user.planId, and calls Stripe to prorate. All in a single Prisma transaction.

Theory I have: the deadlock might be from concurrent upgrade attempts by the same user. But I'm not 100% sure.

What's the root cause, and what's the minimal fix that's safe to ship right now while I design a proper solution?
```

### What You Get

> The P2034 is a PostgreSQL deadlock, not a Prisma bug. Your transaction is likely acquiring locks in this order:
>
> 1. Read `subscriptions` for current plan
> 2. Insert into `subscriptions` (new record)
> 3. Update `users.planId`
> 4. External Stripe call (blocking the transaction open while waiting on network I/O)
>
> The Stripe call is the critical issue. Keeping a database transaction open during an external HTTP call is a classic deadlock amplifier — you're holding locks on `users` and `subscriptions` while waiting 200-2000ms for Stripe. Any concurrent request for the same user hits the same locks and you get a cycle.
>
> **Minimal safe fix (ship now):**
> Move the Stripe call out of the transaction entirely. Call Stripe first, get the proration result, then open the transaction, do the DB writes, and commit. If the transaction fails after Stripe succeeds, you'll need idempotency on the Stripe call (use `idempotencyKey: userId + planId + timestamp`) to safely retry without double-charging.
>
> ```typescript
> // Before (dangerous):
> await prisma.$transaction(async (tx) => {
>   const current = await tx.subscription.findFirst(...)
>   const newSub = await tx.subscription.create(...)
>   await tx.user.update(...)
>   await stripe.subscriptions.update(...)  // ← holding DB locks here
> })
>
> // After (safe):
> const stripeResult = await stripe.subscriptions.update(stripeSubId, {
>   items: [...],
> }, { idempotencyKey: `upgrade-${userId}-${newPlanId}-${Date.now()}` })
>
> await prisma.$transaction(async (tx) => {
>   const newSub = await tx.subscription.create(...)
>   await tx.user.update(...)
> })
> ```
>
> **Proper solution (design later):** Consider an outbox pattern or saga for the Stripe + DB coordination. The current transaction boundary spans two systems with different failure modes.

### Why It Works

Context Layering (Principle 2) provided the stack, the error code, a log excerpt, and the transaction structure — so Claude could diagnose the specific P2034 cause rather than speculating. Specificity Amplification (Principle 1) in the question ("minimal fix safe to ship now vs. proper solution") forced a two-part answer that's immediately actionable. The concrete code examples in the response came directly from Claude having the actual structure described.

---

## Example 2: Designing an Auth System

### Bad Prompt

```
I need to build authentication for my web app. What's the best approach?
```

### What You Get

> There are several approaches to authentication for web applications. Here are the most common options:
>
> **Session-based authentication**: The server creates a session and stores it in memory or a database. The client receives a session cookie.
>
> **JWT (JSON Web Tokens)**: Stateless tokens that contain user information. Popular for SPAs and mobile apps.
>
> **OAuth 2.0**: Delegate authentication to a third party like Google or GitHub.
>
> **Magic links**: Passwordless authentication via email.
>
> The best approach depends on your specific requirements, team experience, and use case. Consider your scalability needs, security requirements, and whether you need social login.
>
> I recommend starting with a well-tested library rather than building from scratch.

### Why It Failed

No role, no domain, no constraints (Principles 2 and 4 — Context Layering and Role Framing). "Best approach" is unanswerable without knowing what application, what users, what threat model, what stack, and what tradeoffs matter. The result is a textbook overview of auth options — indistinguishable from the first 10 results on Google. The "it depends" answer without a recommendation violates basic usefulness.

### Good Prompt

```
You're a senior backend engineer reviewing the auth architecture for a B2B SaaS product. Here's the context:

**App**: TypeScript, Next.js 14 (App Router), PostgreSQL, deployed on Vercel
**Users**: Business employees (not consumers). ~50-500 users per tenant. Company email = identity.
**Requirements**:
- SSO via SAML/OIDC is a hard requirement for enterprise customers (Okta, Azure AD)
- Smaller customers use email/password or Google OAuth
- Multi-tenant: each org is isolated, no cross-tenant data access
- We are NOT building auth from scratch — we'll use a library or managed service

**Constraints**:
- Team of 3, no dedicated security engineer
- Need to ship in 6 weeks
- Must handle: JWT refresh rotation, rate limiting on login, account lockout after failed attempts

Compare Auth.js v5 (NextAuth), Clerk, and WorkOS for this use case. I want:
1. Which fits best and why (be specific, not balanced)
2. The main risk of your recommendation
3. What you'd do differently if we had 18 months instead of 6 weeks
```

### What You Get

> **Recommendation: WorkOS**, but with a caveat.
>
> For your specific constraint set — SAML/OIDC hard requirement, multi-tenant B2B, 6-week timeline, team without a security specialist — WorkOS is the right call. It's purpose-built for exactly this use case and handles the enterprise SSO complexity that will otherwise eat your 6 weeks whole.
>
> Clerk is compelling UX-wise but its multi-tenant model requires their "organizations" feature, which adds pricing complexity and forces you into their data model. Their SAML support is newer and less battle-tested at scale. Auth.js v5 would give you full control but SAML support requires the `@auth/core` adapter plus a SAML library (like `samlify`) — you'd be assembling pieces with a team that doesn't own security. That's where vulnerabilities hide.
>
> **The main risk of WorkOS:** Vendor lock-in at the identity layer. Your user identity lives in WorkOS's system. Migrating out later is painful — user sessions, SAML configurations, and the entire auth flow need to be re-plumbed. This is a one-way door for at least 18 months.
>
> **If you had 18 months:** Run Keycloak self-hosted or use Auth.js with a dedicated SAML library. You'd own the entire auth stack, have full audit log control, and pay $0 in auth service fees at scale. The setup cost is ~3-4 weeks of solid engineering work — worth it with runway, not worth it with 6 weeks.
>
> **Implementation note:** WorkOS's Next.js SDK has a bug with App Router middleware and parallel routes (issue #XXX in their repo, still open as of this writing). Intercept routes for sign-in modals need a custom wrapper — I'd route all auth flows to dedicated pages to avoid it.

### Why It Works

Role Framing (Principle 4) produced an opinionated engineering review, not a neutral overview. The explicit constraints (6 weeks, SAML hard requirement, no security engineer) triggered Constraint-Driven Creativity (Principle 3) — the constraints eliminated the options that would otherwise be defensible, forcing a specific recommendation with specific reasoning. The three-part output format (best choice, main risk, long-term alternative) was a Chain-of-Thought scaffold (Principle 5) that forced coverage of tradeoffs.

---

## Example 3: Evaluating Two ORMs

### Bad Prompt

```
Should I use Prisma or Drizzle for my project?
```

### What You Get

> Both Prisma and Drizzle are excellent ORM choices for Node.js applications! Here's a comparison:
>
> **Prisma**:
> - Great developer experience with auto-generated types
> - Prisma Studio for database visualization
> - Large community and good documentation
> - Slightly slower query performance due to query engine overhead
>
> **Drizzle**:
> - Lightweight and performant
> - More SQL-like syntax
> - Better TypeScript inference
> - Smaller bundle size
>
> The choice depends on your preferences and project requirements. Prisma is better for beginners, while Drizzle gives more control to experienced developers.
>
> Both are great options! Choose the one that feels right for your team.

### Why It Failed

"Both are great options" is the canonical failure of unanswered tradeoff questions. This output requires no knowledge of the actual project — it's a Wikipedia comparison. Principle 5 (Chain-of-Thought Scaffolding) was never invoked: there was no request to reason through the actual decision criteria before concluding. Principle 1 (Specificity) wasn't applied because the question provided nothing specific to work with.

### Good Prompt

```
Evaluating Prisma vs. Drizzle for a specific project. Walk through the actual decision criteria before recommending.

**Project context:**
- TypeScript strict mode
- PostgreSQL on RDS, ~15 tables, schema changes ~2x/week during active development
- API: ~20 endpoints, mostly CRUD + 3-4 complex queries with joins and aggregations
- Performance: 99th percentile response time target is <200ms; current stack handles ~500 req/min, expect 10x over 18 months
- Team: 2 engineers, both comfortable with SQL but joined from a Rails/ActiveRecord background
- Existing migration history in Flyway (350 migration files)

**Decision criteria to work through:**
1. Migration workflow — we have existing Flyway migrations and need to layer onto them, not restart
2. Complex query capability — will we hit Prisma's abstraction ceiling on the 3-4 complex queries?
3. Runtime overhead at 5000 req/min
4. Schema change velocity — 2x/week means migration tooling matters

**Output wanted:** Recommendation with one-sentence rationale per criterion, not a balanced overview.
```

### What You Get

> **Recommendation: Drizzle**, primarily driven by the Flyway constraint.
>
> **Migration workflow**: The Flyway constraint is the deciding factor. Prisma migrations expect to own the migration history — running `prisma migrate dev` alongside 350 existing Flyway files creates a management nightmare. Drizzle's `drizzle-kit` can be configured to generate raw SQL migration files that you commit to your Flyway directory, keeping one migration source of truth. With Prisma, you're looking at either a complex migration shim or rewriting your entire history.
>
> **Complex query capability**: At 3-4 complex queries, you're not hitting the ceiling with either tool. Drizzle's SQL-like builder (`.select().from().leftJoin().where()`) reads more naturally for people with SQL backgrounds and gives you `sql` template literal escapes for anything the builder doesn't cover. Prisma's `$queryRaw` works too but loses type inference.
>
> **Runtime overhead at 5000 req/min**: Prisma's Rust-based query engine adds ~3-5ms per query at cold start and ~0.5ms at steady state. Drizzle is essentially zero overhead — it generates SQL strings. At 5000 req/min with a <200ms P99 target, Prisma won't be your bottleneck unless you're chaining many queries per request. This criterion is a wash.
>
> **Schema change velocity**: Both handle 2x/week comfortably. Prisma has the better introspection workflow if your schema source of truth is the DB (which, given Flyway, it is). Drizzle's schema-first approach means you're also maintaining a TypeScript schema file — more work on schema changes, but the type safety payoff is worth it.
>
> **Rails/ActiveRecord background note**: The mental model shift to Drizzle is smaller than expected — it's closer to ActiveRecord's query interface than Prisma's object-graph model. The main adjustment is thinking in explicit joins rather than nested includes.

### Why It Works

Chain-of-Thought Scaffolding (Principle 5) was explicit: "walk through the actual decision criteria before recommending" with four named criteria. This forced structured reasoning per criterion before a conclusion, rather than a gut-feel recommendation dressed up in analysis. The project context (Specificity Amplification, Principle 1) gave Claude the actual constraints — particularly the Flyway history — which surfaced the migration workflow as the deciding factor that a generic comparison would never surface.
