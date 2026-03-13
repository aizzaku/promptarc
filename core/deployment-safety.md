# Deployment Safety

Production deployments fail in specific, predictable ways. Most deployment incidents aren't caused by code bugs — they're caused by assumptions that were true in development and false in production. This document names those assumptions so you stop making them.

---

## 1. Deployments are not atomic

The single most consequential misunderstanding in deployment planning.

When you deploy, there is a window where the old code and new code are both running simultaneously. Load balancers route traffic to old instances while new instances boot. Database migrations run before new code is fully deployed. Rollbacks bring back old code against a schema that may have already changed.

**What this means in practice**:
- Your new code must handle the OLD database schema (before migration runs)
- Your old code must not break when the NEW database schema is in place
- API clients that haven't updated yet must still work
- Sessions and tokens created under the old code must be valid under the new code

**The test**: Before deploying, ask "what happens if half my instances are running old code and half are running new code simultaneously?" If the answer includes data corruption or user errors, your deployment is not safe.

---

## 2. Database migrations are the riskiest change you can deploy

Every schema migration carries the risk of:
- Table lock (blocking all queries during migration on large tables)
- Data loss (columns dropped, values transformed)
- Backward incompatibility (old code can't read new schema shape)
- Irreversibility (once data is transformed, original form is gone)

**Migration safety checklist (apply before every migration)**:

| Question | Safe answer | Unsafe answer |
|----------|-------------|---------------|
| Can old code run against the new schema? | Yes | No → you need a multi-step deploy |
| Does this lock a table? | No / sub-second | Yes, table is large or write-heavy |
| Is this reversible? | Yes — you can undo it | No — document the rollback cost |
| Does this transform data? | No | Yes → backup first, verify after |
| Does this drop a column? | Column not used by any code | Column still referenced → phantom column problem |

**The multi-step deploy pattern** (for breaking schema changes):
1. Deploy: add new column/table (old code ignores it, new code writes to both)
2. Verify: new code is stable with both old and new schema shapes
3. Deploy: remove old column/table (now only new code is running)

Never attempt a breaking schema change in a single deploy.

---

## 3. Every deploy needs a rollback plan before you ship

A rollback plan that exists in your head is not a rollback plan. Answer these before deploying:

- **Can I roll back the code?** (Is the previous version still deployable? Are git tags current?)
- **Can I roll back the database?** (Is the migration reversible? If not, what's the data recovery plan?)
- **How do I know rollback worked?** (What signals confirm the system returned to prior state?)
- **How long will rollback take?** (10 seconds vs 10 minutes changes your incident response.)

If rolling back the database requires manual data reconstruction: that's not a rollback plan, that's an incident. Plan for it before you're in it.

---

## 4. Feature flags decouple deploy from release

Deploying code and releasing behavior to users are two separate events. Feature flags let you:
- Deploy code to production before any user sees it (dark launch)
- Gradually roll out to 1% → 10% → 100% of users
- Instantly disable behavior without a rollback if something goes wrong

Use feature flags for:
- Any new user-facing behavior that touches payment, auth, or data writes
- Anything you're uncertain about
- Anything where a bad deploy would corrupt data or lock users out

Do not use feature flags as a permanent crutch. Every flag is technical debt. Set a removal date when you create one.

---

## 5. Observability before deployment, not after

You cannot safely deploy what you cannot observe. Before shipping:

**What metrics prove it worked?**
Name the specific number you'll look at 5 minutes after deploy. "Looks good" is not a success signal. "Error rate below 0.1% and p99 latency under 500ms" is.

**What does a broken deploy look like in your dashboards?**
Before deploying, identify the chart that will spike if something goes wrong. Instrument the new code path before deploying it.

**What logging does the new code path produce?**
Structured logs at decision points. Enough context in each log line to debug without a reproduction case. Log entries that contain: what happened, what input caused it, what the system decided to do.

---

## 6. Deploy-time risk window

Every deploy has a window of elevated risk. It starts when the first new instance is live and ends when:
- All instances are running new code, AND
- No rollback is pending, AND
- Monitoring shows the new code is healthy

During this window:
- Have the rollback command ready (not in a wiki — in your terminal)
- Someone is watching the dashboards, not context-switched to other work
- You know the criteria for "this deploy is good enough to proceed" vs "roll back now"

Automated deploys without anyone watching dashboards are fine for low-risk changes. For anything touching auth, payments, data writes, or migrations: have a human watching.

---

## 7. Environment parity is a lie — and that's fine, if you know where it lies

"Works on my machine" failures in production are almost always caused by one of:
- Environment variables present locally, missing in production
- Dependency version mismatch (local: 2.1.3, prod: 2.0.8)
- Data shape that exists in production but not in development seeds
- Third-party API behavior that differs between sandbox and production modes

Track the known divergences. When a new one appears, document it. The goal isn't perfect parity — it's knowing where parity breaks down so you can reason about it.

**Practical minimum**:
- `.env.example` reflects exactly what production requires (no undocumented variables)
- Dependency versions are pinned in lockfiles, not just `package.json`
- At least one person has deployed to a staging environment before production

---

## 8. Async jobs and queues need their own rollback story

Background jobs are not part of the HTTP request/response lifecycle, which means:
- They may still be processing jobs enqueued under old code behavior when new code deploys
- Queue consumers must handle messages in both old and new formats during the transition window
- Failed jobs that retry after a rollback may retry against old code with new message formats

Before deploying any change that modifies job behavior:
- What happens to jobs already in the queue?
- What happens if you roll back while jobs from the new version are still queued?
- Is there a dead-letter queue for jobs that fail permanently?

---

## Deployment safety checklist (use before `/arc-ship`)

- [ ] Old code can run against new schema (backward-compatible migration)
- [ ] Rollback plan documented: code + database + time estimate
- [ ] Feature flag in place (if behavior is uncertain or high-risk)
- [ ] Success metrics identified and dashboards open
- [ ] `.env.example` updated with any new variables
- [ ] Queue/job behavior is safe during deploy window
- [ ] No secrets in code, config, or commits

These items are checked by `/arc-check` in the deployment section and by `/arc-review` in the CRITICAL pass.
