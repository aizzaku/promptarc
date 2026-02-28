# Domain: SaaS (B2B Software)

## Context Primer
B2B SaaS is fundamentally a business of compounding retention. The product ships continuously, but the economic engine is built on subscription renewals — meaning a product that works but loses customers slowly is a company in slow-motion failure. Understanding this forces different tradeoffs than traditional software: you ship fast to acquire, but invest heavily in the features that reduce churn, not the features that demo well.

The split between product-led growth (PLG) and sales-led growth (SLG) dictates almost every architectural and workflow decision. PLG companies (Figma, Notion, Slack) optimize their onboarding to convert free users without human intervention — the product must produce value before a user talks to anyone. SLG companies (Salesforce, Workday) treat the product as a proof point that closes deals that start in email threads — here, the enterprise demo matters more than self-serve UX. Hybrid motions exist but require intentional separation of concerns, and mixing them naively creates products that serve neither audience well.

Growth metrics in SaaS are deeply interconnected in ways that trip up outside observers. A company can show strong ARR growth while destroying unit economics by burning CAC to acquire customers who churn in 18 months. NRR (net revenue retention) above 120% means a cohort expands over time; below 100% means you're losing ground even on retained customers. These dynamics make the "just add more features and grow faster" instinct actively harmful — the right intervention depends on where in the funnel value is being destroyed.

## Common Patterns
- Multi-tenant architecture with tenant isolation at the data layer (row-level security or schema-per-tenant)
- Feature flagging tied to pricing tiers (not just on/off, but usage limits enforced server-side)
- Usage-based billing alongside or instead of flat seat pricing — requires metering infrastructure
- Customer success workflows triggered by health scores derived from product usage data
- Webhook-heavy integration layer because enterprise customers embed SaaS into their own workflows
- Role-based access control (RBAC) with organization hierarchy: workspace > team > member
- Audit logs as a first-class feature, not an afterthought — required for enterprise deals
- Admin/billing portal separated from product (Stripe Billing or Paddle for the former)

## Domain Vocabulary
- **ARR (Annual Recurring Revenue)**: Normalized annual value of subscription contracts. MRR x 12 is not the same if you have multi-year or variable contracts.
- **NRR / NDR (Net Revenue Retention / Net Dollar Retention)**: Revenue from existing customers at period end divided by period start. Above 100% means expansion exceeds churn.
- **CAC (Customer Acquisition Cost)**: Total sales + marketing spend divided by new customers acquired. Payback period = CAC / MRR.
- **PLG (Product-Led Growth)**: Acquisition model where the product itself drives signups, activation, and conversion — not a sales team.
- **ICP (Ideal Customer Profile)**: The specific customer segment that retains best and expands most. Not "everyone who could use this."
- **Expansion Revenue**: Additional revenue from existing customers via upsells, seat growth, or usage overages. The lever that drives NRR above 100%.
- **Churn**: Customer churn = accounts lost. Revenue churn = ARR lost. These diverge when you lose small customers but retain big ones.
- **Health Score**: Composite metric from product usage signals used to predict churn risk or expansion opportunity.
- **PQL (Product-Qualified Lead)**: A free or trial user whose behavior signals purchase intent — typically handed to sales.
- **Multi-tenancy**: Single deployment serving multiple isolated customer organizations. Isolation strategy affects security posture and performance.
- **Activation**: The moment a new user experiences core product value for the first time. The north star for onboarding flows.

## Regulatory/Compliance
- SOC 2 Type II is the baseline enterprise requirement. Expected before any significant B2B deal closes.
- GDPR and CCPA affect data residency, deletion rights, and consent mechanics — particularly relevant if storing PII.
- HIPAA applies if any customer uses the product in a healthcare context. BAAs become required.
- FedRAMP required for US federal customers — expensive and time-consuming; most startups avoid until Series C+.
- Enterprise contracts frequently require penetration testing results, vulnerability disclosure policies, and data processing agreements.

## Common Pitfalls
- Building for the demo rather than for activation — ships features that impress in sales calls but don't reduce time-to-value
- Treating all churn the same — voluntary churn (bad fit, no value) requires different responses than involuntary (failed payments)
- Seat-based pricing when usage-based would align better with customer value — misalignment kills expansion
- Building enterprise features (SSO, audit logs, SCIM) too late — these are table stakes to close deals, not nice-to-haves
- Confusing MoM growth with health — 10% MoM ARR growth means nothing if NRR is 80%
- Over-investing in new feature development when churn is the core problem
- Ignoring the admin/IT buyer persona — in mid-market and enterprise, the economic buyer is not the end user

## Quality Signals
- Distinguishes between free trial, freemium, and reverse trial models and why you'd choose each
- Talks about activation events specifically, not "onboarding" in the abstract
- Understands that enterprise and SMB require fundamentally different product surfaces
- Can reason about cohort analysis, not just aggregate metrics
- Knows that SSO is typically a gating requirement for enterprise, not an optional feature
- Distinguishes NRR from gross retention and knows which is more diagnostic

## Anti-Patterns
- Treating SaaS as a feature delivery problem rather than a retention and expansion problem
- Generic "build a dashboard" solutions that ignore the underlying data model complexity
- Recommending agile sprints without acknowledging that PLG requires continuous experimentation infrastructure
- Conflating B2B and B2C subscription dynamics — churn rates, sales cycles, and pricing strategies are entirely different
- Suggesting "just add a free tier" without modeling the conversion funnel implications

## Recommended Stack/Tools
- **Auth**: Auth0 or Clerk for speed; roll your own with NextAuth only if you have specific requirements
- **Billing**: Stripe Billing for most cases; Chargebee or Maxio for complex dunning and subscription management at scale
- **Analytics/Product**: PostHog (self-hostable, feature flags + analytics), Mixpanel for funnel analysis
- **CRM**: HubSpot for PLG/SMB; Salesforce when deal complexity requires custom objects and approval flows
- **Customer Success**: Gainsight (enterprise) or ChurnZero; custom health score pipelines using dbt + warehouse
- **Infrastructure**: Multi-tenant Postgres with RLS; consider PlanetScale or Neon for branching workflows
- **Feature Flags**: LaunchDarkly for enterprise compliance needs; Unleash or PostHog flags for simpler use cases
