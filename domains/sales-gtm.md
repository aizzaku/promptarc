# Domain: Sales / GTM

## Context Primer

Sales is a system, not a talent. The romanticized version — natural closers who charm their way to quota — is a bad model at scale. What actually produces consistent revenue is a repeatable process: a defined ICP, a message that resonates with that ICP's real problems, a pipeline stage definition that reflects genuine buyer behavior (not internal wishful thinking), and a qualification framework that prevents mismatches from consuming rep time. Companies with strong sales systems outperform companies with strong individual reps in every growth scenario except the very early days.

Go-to-market strategy is the translation layer between product and revenue. It answers: who is this for, how do they find out about it, how do they decide to buy it, and how do we make that process repeatable at the cost structure that supports the business model. The mistake most companies make is treating GTM as a marketing problem (get more leads) when it's actually a fit problem (are we selling to the right people with the right message at the right price). Adding more pipeline on top of a broken conversion model produces more wasted effort, not more revenue.

The ICP (Ideal Customer Profile) is the most important and most abused concept in B2B sales. Companies routinely define it too broadly (any company with > 100 employees) or too aspirationally (Fortune 500 companies we haven't sold yet). The actual ICP comes from looking backward: which customers retained, expanded, and generated referrals? What did those companies have in common? The ICP is a description of your best historical customers, not your desired future customers — though those will converge over time as you deliberately pursue the right ones.

## Common Patterns

- MEDDIC / MEDDPICC as a qualification and deal management framework: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion (+ Competition, Paper Process for MEDDPICC)
- Multi-threading as a closing discipline: relationships with 3+ stakeholders in a deal — economic buyer, technical evaluator, champion — reduces single-threaded risk
- Mutual Action Plans (MAPs) for enterprise deals: joint timelines co-created with the buyer that make the buying process visible and reduce stalls
- Sales-led PLG motion: product-qualified leads (PQLs) identified via usage signals and handed to sales for upgrade conversations
- Outcome-based messaging framework: Problem → Impact → Capabilities → Proof → Differentiation
- Win/loss analysis as a feedback loop: systematic interviews with won and lost deals produce insight that improves ICP definition, messaging, and objection handling
- Revenue operations (RevOps) as the connective tissue: the function that owns CRM hygiene, pipeline reporting, and sales process enforcement

## Domain Vocabulary

- **ICP (Ideal Customer Profile)**: A description of the companies most likely to buy, retain, and expand. Defined by firmographics (size, industry, tech stack, growth stage) and behavioral signals.
- **ACV (Annual Contract Value)**: The normalized annual value of a contract. $120K for a 2-year contract = $60K ACV.
- **MQL / SQL / SAL**: Marketing Qualified Lead → Sales Accepted Lead → Sales Qualified Lead. Each handoff has defined criteria; without them, you're guessing.
- **BANT**: Budget, Authority, Need, Timeline — a basic qualification framework. Increasingly replaced by MEDDIC for complex deals.
- **MEDDIC**: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion — a more rigorous qualification and deal management framework for enterprise.
- **Champion**: A buyer-side contact who wants the deal to succeed and is willing to advocate internally for you. The most important relationship in a deal.
- **Economic Buyer**: The person with budget authority. Often not the person you talk to most — and not talking to them is why deals stall.
- **Multi-threading**: Building relationships with multiple stakeholders in a deal, reducing dependence on a single champion.
- **Pipeline coverage**: The ratio of pipeline value to quota. A 3x coverage ratio means $3M in pipeline to hit $1M quota. Coverage below 2.5x is a risk signal.
- **Win rate**: Deals won divided by total deals completed (won + lost). Should be tracked by stage and by segment to understand where value is leaking.
- **Churn**: Lost revenue from existing customers — either cancellations (logo churn) or downgrades (revenue churn).
- **Quota attainment**: The percentage of quota achieved by a rep or team. Below 50% team attainment usually signals a quota or process problem, not a talent problem.
- **PLG (Product-Led Growth)**: Growth motion where the product itself drives adoption, with sales involved only when accounts hit defined upgrade signals.
- **Discovery call**: The first structured sales conversation — the goal is to understand the prospect's situation, not to pitch.
- **Proof of concept (PoC)**: A structured technical evaluation with defined success criteria, timeline, and champion commitment. Distinct from an open-ended "trial."

## Regulatory/Compliance

- CAN-SPAM (US) and CASL (Canada) regulate commercial email: require opt-out mechanisms, honest subject lines, and sender identification. Outbound sales email must comply.
- GDPR applies to prospecting EU contacts: legitimate interest is the most defensible lawful basis for B2B outbound, but requires balancing test documentation.
- CCPA affects how sales teams collect and use contact data for California residents in a commercial context.
- Securities regulations (SEC Rule 10b-5) affect how publicly traded companies communicate financial projections to prospects — avoid informal forward-looking statements in sales materials.
- Export controls (ITAR, EAR) apply to sales of certain technologies (defense, cryptography, semiconductor equipment) — sales teams in these sectors need training on restricted party screening.

## Common Pitfalls

- Solving a pipeline quantity problem when the real problem is pipeline quality: more unqualified leads produces more wasted effort
- Building sequences before the message is validated: if the message doesn't convert in 1:1 conversations, automating it at scale makes the problem worse
- Multi-product pitching before single-product land: enterprise buyers want to solve one problem, then expand; leading with the full portfolio creates confusion
- Confusing activity metrics with progress metrics: calls made and emails sent are activity; qualified pipeline created and demo-to-proposal conversion are progress
- Single-threading enterprise deals: when the champion leaves, the deal dies with them
- Ignoring the economic buyer: building a great relationship with the technical evaluator who has no budget authority
- Conflating "they're interested" with "they're going to buy": interest is cheap; intent — demonstrated by timeline, budget confirmation, and internal sponsor — is what matters

## Quality Signals

- Every piece of outbound copy is grounded in a specific pain, not a product feature
- Discovery questions surface impact, not just situation — "what does that cost you?" not just "how do you currently do this?"
- Qualification follows a framework (MEDDIC or equivalent) with documented evidence for each element
- Pipeline deals have a documented champion, an identified economic buyer, and a known decision process
- Win/loss analysis is conducted quarterly and findings are reflected in updated ICP and messaging
- Outbound sequences have measured open rates, reply rates, and meeting conversion rates — and are iterated based on data

## Anti-Patterns

- "Always be closing" as a philosophy: pressure tactics that work short-term destroy trust and drive churn
- Pitching features when the prospect has described a problem: connecting the feature to the problem outcome is the entire job
- Demo-ing the product before understanding the prospect's situation: demos without discovery are product tours, not sales conversations
- Using "just checking in" as follow-up: every follow-up must offer something — an insight, a resource, a relevant trigger — not just occupy space in the inbox
- Building GTM strategy from the product roadmap outward: start from customer problems, work backward to the product, then to the message

## Recommended Stack/Tools

- **CRM**: Salesforce (enterprise standard, high flexibility, high overhead), HubSpot (SMB to mid-market, easier to implement), Pipedrive (SMB, sales-focused)
- **Sequencing / engagement**: Outreach, Salesloft (enterprise sequencing), Apollo (SMB, prospecting + sequencing combined), Instantly (high-volume cold email)
- **Prospecting / data enrichment**: Apollo.io, ZoomInfo (enterprise), Clay (enrichment workflows), LinkedIn Sales Navigator
- **Conversation intelligence**: Gong, Chorus by ZoomInfo — records, transcribes, and analyzes sales calls
- **Revenue intelligence**: Clari, Boostup — pipeline inspection and forecasting
- **Proposal / CPQ**: PandaDoc, DealHub — quote-to-close automation
- **RevOps / reporting**: Salesforce reports + dbt + Looker for mature orgs; HubSpot reports for earlier stage
