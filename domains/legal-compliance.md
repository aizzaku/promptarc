# Domain: Legal & Compliance

## Context Primer

Legal work in the context of technology companies operates in a different register than traditional legal practice. The pace is faster, the documentation is less formal, and the stakes of getting it wrong are often asymmetric — a missed clause in a contract might cost nothing for years and then cost millions in a single dispute. The core skill in technology legal work is calibrated risk assessment: not treating every issue as catastrophic (that creates paralysis) and not ignoring real exposure (that creates liability). Most in-house legal questions are not "is this legal?" but "what is the risk, how likely is it, and is it worth it given the business objective?"

Contract work is fundamentally about allocating risk between parties. Every negotiation is a conversation about who bears what risk if something goes wrong. Sophisticated counterparties understand this explicitly; less sophisticated ones argue about individual clauses without understanding the aggregate risk picture. The most important skills are identifying which clauses actually carry meaningful risk (limitation of liability, indemnification, IP ownership, data handling) versus which are boilerplate that everyone accepts — and knowing when to hold firm versus when to concede.

Compliance programs exist because the cost of systematic non-compliance at scale exceeds the cost of building a compliance function. The value proposition is not avoiding all violations — that's impossible in a large organization — but demonstrating reasonable care and systematic effort, which reduces penalties and preserves trust with regulators, customers, and partners. The worst compliance failure is not a violation; it's a pattern of willful ignorance that demonstrates no compliance program existed at all.

## Common Patterns

- MSA + SOW structure: Master Service Agreement establishes the terms, each Statement of Work specifies the deliverable — changes scope without renegotiating the whole MSA
- Data Processing Agreements (DPAs) as a standard attachment to any SaaS contract handling personal data — required by GDPR Article 28
- Mutual NDA as a precursor to business conversations, with asymmetric NDAs reserved for actual vendor relationships
- IP assignment and work-for-hire clauses in employment and contractor agreements — particularly critical for founders pre-company and post-acquisition
- Representations and warranties as risk allocation: seller represents facts are true; buyer gets remedies if they're not
- Limitation of liability caps pegged to contract value (often 12 months of fees) — the most negotiated term in SaaS contracts
- Carve-outs to limitation of liability for: fraud, IP infringement, death/personal injury, gross negligence — these are non-standard and each is a negotiation point

## Domain Vocabulary

- **Indemnification**: One party's obligation to compensate the other for specified losses. Indemnification clauses define what losses qualify, who controls the defense, and whether there are caps.
- **Limitation of liability**: A clause capping the total financial exposure of one or both parties. Typically excludes gross negligence, fraud, and IP infringement.
- **Representations and warranties**: Representations are statements of present fact ("the software does not contain malware"). Warranties are promises about future performance. Breach of either triggers contractual remedies.
- **Force majeure**: Excuses performance when prevented by extraordinary circumstances outside a party's control. COVID-19 tested whether standard force majeure clauses were adequate.
- **Covenant**: A contractual promise to do or not do something. Covenants can be positive (must do) or negative (must not do).
- **Condition precedent**: An event that must occur before an obligation arises or a contract is effective.
- **DPA (Data Processing Agreement)**: A contract required by GDPR between a data controller and data processor that specifies processing purposes, security measures, and sub-processor rules.
- **SOC 2**: An auditing standard for service organizations, assessing controls related to security, availability, processing integrity, confidentiality, and privacy.
- **BFSS / BFSS+**: Buyer's Form of Standard Services (abbreviations vary) — the starting point from which one side negotiates.
- **Materiality threshold**: A defined level of significance below which a breach does not trigger a remedy. Prevents nuisance claims.
- **Survival clause**: Specifies which contract provisions remain in effect after the agreement terminates (e.g., confidentiality, IP ownership, limitation of liability).

## Regulatory/Compliance

- **GDPR (EU)**: Requires lawful basis for processing personal data, data subject rights (access, deletion, portability), DPAs with processors, breach notification within 72 hours. Penalties up to 4% of global annual turnover.
- **CCPA/CPRA (California)**: Grants California residents rights to know, delete, and opt out of sale of personal data. CPRA extended the law in 2023 with new requirements.
- **HIPAA (US Healthcare)**: Protects PHI (Protected Health Information). Requires Business Associate Agreements (BAAs) with vendors who handle PHI. Technical, physical, and administrative safeguards required.
- **SOC 2 Type II**: Not a regulation, but a customer expectation in B2B SaaS. Type I is a point-in-time assessment; Type II covers a period (usually 6–12 months).
- **PCI-DSS**: Payment Card Industry Data Security Standard — required for any entity that stores, processes, or transmits cardholder data. 12 core requirements.
- **SEC/FINRA**: Apply to securities offerings, broker-dealer activities, and investment advisers. Fintech companies frequently trigger unintended securities law applicability.

## Common Pitfalls

- Leaving limitation of liability uncapped: standard SaaS contracts cap liability at 12 months of fees; failing to negotiate this exposes you to uncapped damages
- Vague IP ownership in contractor agreements: without explicit work-for-hire or assignment language, the contractor may retain rights to work product
- Boilerplate survival clauses that don't include the right provisions: common omissions are IP ownership, confidentiality, and limitation of liability
- Accepting a customer's paper without redlines: the first draft always favors the drafter; accepting it signals you haven't read it
- Treating "standard terms" as non-negotiable: every term is negotiable with sufficient leverage or sufficient relationship investment
- Compliance programs that exist on paper but aren't operationalized: a policy no one follows is worse than no policy — it demonstrates awareness without action
- Ignoring jurisdiction-specific requirements in international contracts: what's enforceable in the US may not be in Germany, France, or India

## Quality Signals

- Contracts clearly identify the parties, the obligations of each party, the consideration, the term, and the governing law
- Defined terms are used consistently throughout — no drift between "the Company" and "Acme" in the same document
- All obligations specify a responsible party and a timeline
- Risk analysis distinguishes between high-risk provisions (uncapped liability, IP ownership) and standard boilerplate
- Compliance analyses cite specific statutory or regulatory text, not general characterizations of "the law"
- Legal memos state a clear conclusion with the reasoning that supports it — not a list of considerations with no synthesis

## Anti-Patterns

- Writing contracts that are technically correct but unreadable: parties who don't understand the contract they signed create disputes
- Treating legal review as a checkbox: "legal has approved it" doesn't mean the business risk is acceptable
- Flagging every clause as high-risk: risk fatigue causes business teams to stop engaging with legal review
- Generic policies without operational procedures: a privacy policy with no deletion workflow is a promise without a delivery mechanism
- Legal analysis that ends with "it depends" without explaining what it depends on and how to evaluate those conditions

## Recommended Stack/Tools

- **Contract management**: Ironclad (workflow and negotiation), DocuSign CLM (enterprise), LinkSquares (AI-assisted review)
- **E-signature**: DocuSign (enterprise standard), HelloSign/Dropbox Sign (SMB), Adobe Sign
- **Legal research**: Westlaw or LexisNexis (US primary sources), EUR-Lex (EU law)
- **Privacy compliance**: OneTrust or TrustArc (consent management, DSAR handling, DPA tracking)
- **Policy management**: Confluence or Notion with version-controlled policies; Tugboat Logic or Drata for SOC 2 compliance automation
- **Contract templates**: NVCA model term sheets (venture), Bonterms (open source SaaS contracts), Common Paper (standardized agreements)
