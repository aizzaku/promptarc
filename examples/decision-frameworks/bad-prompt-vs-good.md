# Bad Prompt vs. Good Prompt: Decision Frameworks

## Example 1: Evaluating a Career Decision

### Bad Prompt

```
I got two job offers. How do I decide which one to take?
```

### What You Get

> Making a career decision between two job offers can be challenging! Here are some factors to consider:
>
> **Compensation**: Look beyond base salary to include benefits, equity, bonus, and other perks...
>
> **Growth potential**: Consider which role offers more opportunities for advancement...
>
> **Company culture**: Research both companies to understand their values and work environment...
>
> **Work-life balance**: Consider the expected hours and flexibility of each role...
>
> **Your gut feeling**: Sometimes your instincts know what's right. Which offer excites you more?
>
> Make a pros/cons list for each offer and weight the factors that matter most to you. Trust the process!

### Why It Failed

This is the textbook generic answer. "Make a pros/cons list" is not a decision framework — it's an instruction to do the obvious thing without a method. "Trust your gut" at the end of a structured framework undermines the framework. Nothing in this response requires knowing anything about the two offers, the person, their values, or what's actually at stake. The response applies to every job offer anyone has ever received.

More fundamentally: the prompt is missing the thing that would make this answerable. Two offers means there's a specific tension — if both were obviously good or obviously bad, there'd be no decision. The vague prompt prevents Claude from identifying what the actual decision is.

### Good Prompt

```
Deciding between two job offers. Help me structure this properly because I keep going in circles.

Offer A: Seed-stage startup, founding engineer role, 0.8% equity, $130K base. Product is interesting; I know the founder and trust them. Company might not exist in 2 years.

Offer B: Series B company (~$50M ARR), senior engineer, 0.1% equity (post-B valuation, so much lower upside), $185K base. Stable, growing, less exciting.

My situation: I'm 34, no major financial obligations, currently at BigCo making $210K. I have enough savings that neither offer represents financial hardship.

The thing I actually can't decide: I genuinely don't know if I want the risk/reward of the startup path or if that's just something I tell myself I want.

Structure this as a real decision, not a pros/cons list. Specifically:
1. What's the actual question I'm trying to answer? (I suspect it's not "which offer is better")
2. What information do I not have that would materially change this decision?
3. If I imagine myself 5 years out, what's the worst regret scenario in each direction?
```

### What You Get

> **The actual question:**
>
> This isn't "which offer is better." The offers encode different bets about what you want your career to be. Offer A bets that you want the building experience, the founding-team identity, and the relationship with the founder more than income stability and upside certainty. Offer B bets that you want financial optionality, reduced risk, and a later move to a startup once you've seen a company scale through Series B.
>
> The question underneath the question: do you actually want startup risk, or do you want the identity of someone who takes startup risk? These are different. One produces satisfaction when the company struggles (you're there for the experience). The other produces resentment (you took a pay cut for this?).
>
> **What you don't know:**
>
> The equity math is incomplete. At 0.8% seed-stage with unknown dilution ahead, you need to model: at what outcome does this equity actually matter? If the company raises a Series A at 25% dilution, B at 20%, and exits at $100M, your 0.8% is worth roughly $440K pre-tax — not life-changing. If it exits at $500M, it's $2.2M. The range is wide enough that "interesting equity" might mean nothing or it might matter a lot. What's the founder's outcome ambition?
>
> **Worst regret scenarios:**
>
> Offer A regret: The company fails in 18 months. You spent that time not at a company that IPO'd (Offer B's plausible trajectory). You also took a $80K/year pay cut. Net financial cost: potentially $160K over 2 years plus opportunity cost. Emotional cost depends entirely on whether the experience was what you wanted.
>
> Offer B regret: You spend 3-4 years being a "senior engineer" at a company you found less interesting. You had the chance to be a founding engineer and you optimized for salary at 34, when you had the savings and freedom to take risk. This is the regret you can't undo — the window for taking risk at 34 with no obligations is finite.
>
> Notably: the Offer B regret is harder to recover from than the Offer A regret. If Offer A fails, you rejoin the job market with founding-engineer experience. If you take Offer B and regret it, you've spent the risk-taking window on the wrong thing.

### Why It Works

The prompt named the specific tension: "I keep going in circles" and "I don't know if I want the risk/reward or if that's just something I tell myself." This prevented Claude from producing a generic framework when the actual problem was meta-level (what do I want?) not object-level (which offer is better?). The three specific questions replaced "help me decide" with "help me think clearly." The regret framing (question 3) produced the most useful output — Claude asymmetrically weighted the regrets in a way a pros/cons list wouldn't.

---

## Example 2: Technical Risk Assessment

### Bad Prompt

```
Should we use microservices or a monolith for our new product?
```

### What You Get

> This is a classic architectural debate! Both approaches have merits:
>
> **Monolith pros**: Simpler to develop and deploy initially, easier to reason about, lower operational overhead...
>
> **Microservices pros**: Better scalability, team autonomy, technology flexibility, fault isolation...
>
> **Recommendation**: For most early-stage products, a monolith is recommended. You can always break it up later as your needs grow...

### Why It Failed

"You can always break it up later" is not advice — it's a hedge. Every architecture discussion about monolith vs. microservices produces this output because the question gives Claude nothing to differentiate. Team size, current scale, deployment environment, and operational maturity all determine the right answer, and none are provided.

### Good Prompt

```
Architectural decision for a new internal tool, not a product.

Context:
- Tool: replaces a manual Excel-based process for tracking vendor compliance across 200 vendors
- Users: 8 internal users (procurement team), no public access, no SLAs
- Scale: ~500 reads/day, ~50 writes/day, not going to 10x
- Team: 2 engineers, both full-stack, comfortable with Postgres but no Kubernetes experience
- Deployment: self-hosted on one company VM, no cloud budget approved yet

The decision: monolith vs. separate frontend/backend service.

I'm not asking about full microservices. The specific question is: does it make sense to have a React frontend talking to a REST API backend as separate deployable units, or do we deploy everything together (Next.js or similar)?

Bias toward the simpler answer unless there's a concrete reason not to. No speculation about future scale.
```

### What You Get

> **Recommendation: Unified deployment (Next.js or similar).**
>
> At 8 internal users and 500 reads/day on a single VM, a separate frontend/backend deployment adds operational overhead — two things to deploy, two things to update, CORS configuration, two logs to check on incidents — with no benefit that applies to your actual constraints.
>
> The "separate services" model pays off when you have multiple teams who need to deploy independently, or when the frontend and API need to scale differently, or when you need to run multiple API consumers. None of these apply here.
>
> Next.js with API routes gives you the separation of concerns (React frontend, TypeScript API handlers, Postgres via an ORM) without the operational overhead. One deployment. One set of logs. One thing for two engineers to maintain.
>
> If this tool later needs to be accessed by a mobile app or a third party, the API routes can be extracted at that point. That's not "breaking up the monolith" — it's a day of work. Don't pay the operational overhead today for a hypothetical that might never happen.
>
> **The one case to reconsider**: If your company has an existing internal API standard that all internal tools must conform to (a common enterprise requirement), use that standard. Otherwise, unified deployment.

### Why It Works

"Bias toward the simpler answer unless there's a concrete reason not to" explicitly licensed Claude to give the obvious recommendation without hedging. The constraint list (8 users, 500 reads/day, no Kubernetes experience, single VM) eliminated any answer that required operational sophistication. The specific question ("not full microservices — just separate frontend/backend") prevented Claude from expanding the scope to architecture patterns that weren't being considered. The "no speculation about future scale" instruction removed the most common hedging mechanism.
