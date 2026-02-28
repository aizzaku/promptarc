# Domain: Marketplace

## Context Primer

Marketplaces have a structural problem that every other software product doesn't: you need two groups of users before either one gets value. A freelancer platform with no clients is useless to freelancers. A client platform with no freelancers is useless to clients. This cold-start problem is the defining challenge of marketplace building, and it determines which design and go-to-market decisions actually matter in the early stage.

The conventional wisdom is "build supply first" — it's easier to recruit sellers, service providers, or inventory than to manufacture buyer demand. This is sometimes right and sometimes backward. The correct answer depends on which side is the bottleneck. In most local services (Uber, TaskRabbit), supply is the bottleneck — the product works once there are enough drivers/taskers in each city. In most creative or high-skill services (Toptal, 99designs), demand is the bottleneck — there are far more people offering the service than there are buyers willing to pay a premium.

Take rate and unit economics work differently in marketplaces than in SaaS. Revenue is a percentage of GMV (gross merchandise value), not a recurring subscription. This means revenue scales with transaction volume and average order value, not seat count. The margin structure is also different: marketplace margin = take rate minus cost of acquiring and retaining both sides. Leakage — where users transact outside the platform to avoid the take rate — is the endemic threat to margin.

## Common Patterns

- **Trust and verification**: Marketplace quality depends on the ability to verify participants. This ranges from email verification (minimal) to identity verification (government ID), background checks, credential verification (Uber, Rover, Toptal), and portfolio review. The right tier depends on stakes per transaction and liability exposure.
- **Escrow and payment timing**: Funds held in escrow until conditions are met (goods received, service delivered, dispute period expired) protects both parties. Stripe Connect supports split payments and escrow-like flows natively.
- **Dispute resolution**: Every marketplace needs a dispute resolution process. Who adjudicates? What's the default outcome? What evidence can either party provide? This needs to be designed before the first dispute arrives, not after.
- **Search and matching**: Matching supply to demand is core product value. Factors: relevance (keyword, category, attributes), quality (ratings, reviews, completion rate), availability (supply capacity, geographic proximity), and pricing. Most early marketplaces over-invest in search before supply-demand balance makes it matter.
- **Reviews and ratings**: Two-sided ratings (buyer rates seller, seller rates buyer) create accountability on both sides. Simultaneous reveal (ratings only shown after both parties submit) prevents strategic rating inflation.
- **Network effects measurement**: Strong marketplaces have same-side or cross-side network effects that increase value with scale. Know which type you have and how to measure it. Proxy metric: does adding one new supplier increase the average transaction value for existing buyers?
- **Leakage prevention**: Users transacting off-platform to avoid fees is the endemic revenue threat. Design countermeasures: in-platform communication, payment protection benefits, reviews tied to on-platform transactions.

## Domain Vocabulary

- **GMV (Gross Merchandise Value)**: Total transaction value flowing through the marketplace, before the platform's take rate. The top-line metric; revenue is GMV × take rate.
- **Take rate / rake**: The percentage of each transaction the marketplace keeps. Typically 10-30% depending on value delivered and market power.
- **Leakage**: Transactions that occur between matched parties outside the platform — the marketplace gets none of the value. Common when take rates are high and platform value-add beyond matching is low.
- **Liquidity**: The probability that a buyer finds a suitable match for their need within a reasonable time window. The operational definition of marketplace quality.
- **Supply-side / demand-side**: Sellers/service providers (supply) and buyers/customers (demand). Which side you subsidize and which you monetize is the core business model decision.
- **Bilateral marketplace**: Both buyers and sellers transact through the platform for each individual deal (Airbnb, Etsy). Contrast with aggregator, where suppliers sign up to be listed but buyers transact directly.
- **Managed marketplace**: The platform takes on operational responsibility (vetting, guaranteeing quality, handling disputes) rather than just matching. Higher cost, lower leakage, higher take rate justified.
- **Power users**: The small percentage of supply-side participants who generate a disproportionate share of transactions. In most horizontal marketplaces, 20% of sellers produce 80%+ of GMV. Losing one power user is a material revenue event.
- **Disintermediation**: Buyers and sellers developing direct relationships and bypassing the platform after the initial match. Common in high-repeat, relationship-based service categories.
- **Reverse marketplace**: Buyers post requests, sellers bid. (Traditional: sellers list, buyers browse.) Appropriate when buyer needs are complex and supply-side capacity is the constraint.

## Regulatory/Compliance

- **Payment facilitation (PayFac) vs. aggregator model**: Handling funds between buyers and sellers involves money transmission regulations. Using Stripe Connect (aggregator model) or similar puts regulatory compliance on the payment provider. Operating as a PayFac requires state money transmitter licenses in the US and equivalent in other jurisdictions.
- **1099-K reporting (US)**: Platforms that process $600+ in payments to a single seller in a year must issue 1099-K forms. Requires collecting seller tax information (W-9 for US, W-8BEN for international).
- **Gig economy / worker classification**: Platforms that use independent contractors face ongoing scrutiny over whether they should be classified as employees (AB5 in California, EU Platform Work Directive). The distinction has payroll tax and benefits implications.
- **Escrow licensing**: Holding funds in escrow for extended periods may require an escrow license in some US states. Consult legal counsel before building a non-trivial escrow flow.
- **Background check compliance**: FCRA (Fair Credit Reporting Act) in the US governs background check consent, adverse action notices, and data accuracy. Relevant for marketplaces that run checks on service providers.

## Common Pitfalls

- Solving the wrong cold-start problem — subsidizing supply when demand is the bottleneck, or vice versa
- Setting a take rate based on competitor analysis rather than unit economics — take rate must cover customer acquisition cost for both sides plus cost of trust/verification
- Building sophisticated search and recommendation before achieving liquidity — ranking quality doesn't matter when there are only 50 listings
- Ignoring leakage until revenue plateau makes it visible — it's usually a leading indicator that take rate and platform value aren't aligned
- Building 1:1 matching flows when many categories benefit from auction or reverse-marketplace dynamics
- Treating both sides of the marketplace identically — supply and demand typically need different onboarding, retention, and communication strategies

## Quality Signals

- Can identify which side of the marketplace is the current bottleneck before recommending features
- Understands that take rate is a product and pricing decision, not just a business model input
- Knows the difference between GMV growth and revenue quality (GMV from low-take-rate categories vs. high)
- Can design a dispute resolution process before being asked to
- Thinks about leakage risk when designing communication and payment flows

## Anti-Patterns

- Recommending generic SaaS metrics (MRR, churn) when GMV, take rate, and liquidity are the operative metrics
- "Just add ratings" without designing simultaneous reveal and response mechanisms
- Building for scale before achieving liquidity in a single cohesive market
- Conflating marketplace network effects with simple referral program effects

## Recommended Stack/Tools

- **Payments**: Stripe Connect (the default — handles splits, payouts, KYC for sellers, 1099 generation)
- **Identity verification**: Stripe Identity, Persona, or Jumio — for high-stakes categories requiring government ID
- **Background checks**: Checkr (integrates with Stripe for gig platforms), Sterling for employment-grade checks
- **Search**: Elasticsearch or Algolia for marketplace search; start with Algolia (managed, instant) and move to self-hosted ES at scale
- **Messaging**: Stream (chat infrastructure); Sendbird; or Twilio Conversations — don't build messaging from scratch
- **Reviews**: Custom-built with simultaneous reveal logic — generic review widgets don't support marketplace-specific patterns
- **Geo / local matching**: Google Maps Platform for geocoding and radius queries; PostGIS if distance queries are complex and PostgreSQL is already in use
- **Fraud detection**: Stripe Radar (built-in) for payment fraud; custom ML or third-party tools for marketplace-specific fraud (fake listings, review manipulation)
