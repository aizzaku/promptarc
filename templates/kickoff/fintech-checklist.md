# Fintech Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a financial technology project.

---

## Payment Rails

1. **What payment methods are in scope?** (ACH | Card | Wire | RTP/instant | Crypto | Multiple)
2. **Initiating payments, receiving payments, or both?**
3. **Synchronous checkout flow or async payment initiation?** (ACH and wire are never synchronous — confirm the team understands this)

---

## Compliance & Licensing

4. **What's the regulatory exposure?** (MSB/MTL required? KYC/AML required? Which jurisdiction?)
5. **KYC/KYB provider?** (Persona, Stripe Identity, Jumio, in-house — or no identity verification yet?)
6. **Sanctions screening?** (OFAC at minimum — is it in place, and does it run before money moves?)
7. **PCI-DSS scope assessed?** (SAQ A, SAQ D, or full QSA? Has scope been deliberately minimized?)

---

## Money Architecture

8. **Ledger model or balance field?** (Double-entry ledger is correct — surfaces the assumption early)
9. **Where does money actually sit?** (Sponsor bank? Stripe? Adyen? Company-owned account? Whose funds are held?)
10. **Reconciliation strategy?** (Daily automated | Weekly manual | No reconciliation yet)

---

## Infrastructure

11. **Idempotency on all payment endpoints?** (Every mutation that touches money must be idempotent)
12. **Fraud strategy?** (Rule-based | ML scoring provider: Sift, Kount | Third-party | None yet)
13. **Webhook delivery strategy?** (Signature verification, retry with backoff, idempotency on receipt)
14. **Transaction state machine defined?** (pending → authorized → captured → settled → reconciled)

---

## Conditional

### If card payments
15. **PCI-DSS card vault provider?** (Stripe, Basis Theory, Spreedly, Braintree — or handling raw card data?)
16. **Chargeback dispute workflow designed?** (Who handles disputes, what evidence is collected, what's the SLA?)

### If ACH or bank-level transfers
17. **Sponsor bank or BaaS provider identified?** (Column, Synapse, Unit, Stripe Treasury — or direct bank relationship?)
18. **Failed payment and NSF handling?** (ACH returns can arrive days after initiation)

### If subscription/recurring billing
19. **Dunning flow designed?** (Retry schedule, payment method fallback, cancellation logic)
20. **Proration model for plan changes?** (Upgrade mid-cycle, downgrade mid-cycle — both need explicit handling)
