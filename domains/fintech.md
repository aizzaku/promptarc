# Domain: Fintech

## Context Primer
Fintech operates at the intersection of software speed and regulated financial infrastructure — and the gap between those two realities creates most of the complexity. Building a payment flow looks like an API integration until you encounter settlement timing, failed ACH returns, card network rules, and fraud vectors that only appear at scale. The regulatory layer is not optional configuration; it is load-bearing architecture. Companies that treat compliance as a phase-two concern routinely get shut down or hit with consent orders.

The industry segments differently from how outsiders perceive it. Payments (cards, ACH, wire, real-time rails like RTP and FedNow) is plumbing that most companies build on top of. Banking-as-a-service (BaaS) lets non-banks offer accounts and cards by partnering with sponsor banks — the sponsor holds the charter, the BaaS company (Unit, Column, Synctera) provides the tech layer, and the fintech is the end product. Lending requires separate licensing in most US states plus underwriting models that must satisfy fair lending standards. Investment platforms touch SEC regulations and custody requirements. Each vertical has distinct compliance obligations that compound when products cross verticals.

The trust problem in fintech is existential, not marketing. Fraud, chargebacks, AML hits, and data breaches don't just hurt metrics — they trigger regulatory scrutiny and can result in losing the banking partnership that the entire product depends on. This means risk and compliance are not back-office functions; they are core product constraints. Every UX decision in onboarding, transaction limits, and disputes has a risk dimension that a payment processor or bank partner will scrutinize.

## Common Patterns
- Sponsor bank + program manager + end user structure for most neo-bank and card products
- Double-entry bookkeeping as the data model for any ledger (not just "update balance" mutations)
- Idempotency keys on every financial API call — network retries must not create duplicate transactions
- Async transaction processing with state machines (pending → posted → settled, or pending → failed → reversed)
- KYC/KYB at onboarding via identity verification vendors; tiered access based on verification level
- Webhook + reconciliation loop for payment status — never trust a single webhook as ground truth
- Separate ledger from core database — financial records are append-only; no deletes
- Fraud scoring on transactions before authorization, with manual review queues for high-risk signals

## Domain Vocabulary
- **ACH (Automated Clearing House)**: US batch payment network. T+1 or T+2 settlement. Returns can arrive 2–5 days after initiation — funds released before return create risk.
- **BaaS (Banking-as-a-Service)**: Infrastructure layer allowing non-banks to offer banking products via a licensed sponsor bank.
- **Chargeback**: Card dispute initiated by a cardholder through their issuing bank. Merchant bears liability unless dispute is won. High rates trigger processor penalties.
- **KYC/KYB (Know Your Customer / Know Your Business)**: Identity verification processes required by BSA/AML regulations before opening accounts or processing above certain limits.
- **Sponsor Bank**: FDIC-insured bank that provides the regulatory umbrella for fintech products. Risk appetite of sponsor determines what the fintech can build.
- **Float**: The value of money in transit before it settles. Earning yield on float is a revenue model for payment processors and BaaS platforms.
- **Ledger**: Double-entry accounting system recording all financial movements. Every debit has a corresponding credit.
- **Interchange**: Fee paid by the merchant's bank to the cardholder's bank on card transactions. Primary revenue source for card-issuing fintechs.
- **AML (Anti-Money Laundering)**: Regulatory framework requiring monitoring for suspicious transaction patterns and filing SARs (Suspicious Activity Reports).
- **SAR (Suspicious Activity Report)**: Required filing to FinCEN when a financial institution suspects money laundering. Filing must be kept confidential from the subject.
- **Nacha**: Governing body for ACH network rules. Non-compliance can result in losing ACH access.
- **PCI-DSS**: Payment Card Industry Data Security Standard. Scope reduction (not storing raw card data) is the preferred approach.
- **Settlement**: The actual movement of funds between banks. Authorization and settlement are distinct events.

## Regulatory/Compliance
- **Bank Secrecy Act (BSA) / AML**: Requires transaction monitoring, KYC, SAR filing. Enforced by FinCEN. Violations result in severe fines.
- **Regulation E**: Governs electronic fund transfers and consumer dispute rights for debit transactions. Error resolution timelines are legally mandated.
- **Regulation Z (TILA)**: Truth in Lending Act — disclosure requirements for credit products. APR must be stated precisely.
- **State Money Transmitter Licenses (MTL)**: Required in most US states to transmit money. 50-state licensing is a multi-year project; companies often launch in low-requirement states first.
- **FCRA**: Governs use of credit data. Adverse action notices required when credit is denied based on a consumer report.
- **SEC regulations**: Apply to investment products, broker-dealer activity, and custody. Separate licensing from banking.
- **Fair lending laws (ECOA, Fair Housing Act)**: Underwriting models must not produce disparate impact on protected classes, regardless of intent.

## Common Pitfalls
- Treating ACH as synchronous — returns arrive days after initiation; releasing funds immediately creates fraud exposure
- Building a balance as a single database field rather than a ledger — makes reconciliation and audit impossible
- Ignoring idempotency — network failures + retries = duplicate charges without idempotency enforcement
- Underestimating sponsor bank influence — the bank can restrict features, require compliance reviews, or terminate the relationship
- Treating fraud as an edge case to handle "later" — fraud vectors appear in week one at any meaningful volume
- Missing the distinction between authorization and settlement in reporting — showing authorized amounts as settled is misleading
- PCI scope expansion by storing card data in application databases

## Quality Signals
- Uses double-entry ledger data model, not balance mutations
- Understands that ACH returns are a delayed, async event that must be accounted for in product design
- Knows the difference between card issuing and card acquiring (processing)
- Treats idempotency as a hard requirement on all financial writes
- Distinguishes between program manager, sponsor bank, and network in card product architecture
- Knows what triggers a SAR obligation and that it cannot be disclosed to the subject

## Anti-Patterns
- Modeling financial state as a mutable balance field
- Using soft deletes or updates on transaction records
- Assuming real-time settlement for ACH
- Recommending "just use Stripe" for complex financial product builds where Stripe's terms prohibit the use case
- Ignoring state licensing requirements as a "legal problem"
- Generic fraud detection that doesn't account for specific attack vectors (account takeover vs. synthetic identity vs. first-party fraud)

## Recommended Stack/Tools
- **Payments**: Stripe for standard use cases; Adyen for global enterprise card acquiring; Dwolla or Modern Treasury for ACH/wire orchestration
- **BaaS**: Unit, Column, or Synctera for building bank accounts and cards; Treasury Prime for sponsor bank connectivity
- **KYC/KYB**: Persona, Alloy, or Sardine — each has different coverage and risk model integrations
- **Ledger**: Modern Treasury's ledger API; Ledger (open source); or purpose-built double-entry in Postgres
- **Fraud**: Sardine or Sift for behavioral fraud scoring; in-house rules engine for velocity checks
- **Compliance monitoring**: Unit21 or Hawk AI for AML transaction monitoring
- **Infrastructure**: Event sourcing preferred for transaction history — Kafka or Postgres with append-only event log
