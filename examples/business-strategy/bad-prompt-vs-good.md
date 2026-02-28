# Bad Prompt vs. Good Prompt: Business Strategy

## Example 1: Competitive Analysis

### Bad Prompt

```
Can you do a competitive analysis of the project management software market?
```

### What You Get

> The project management software market is highly competitive, with several key players vying for market share. Here are the main competitors:
>
> **Asana**: A comprehensive project management tool known for its user-friendly interface and strong collaboration features. Strengths: intuitive UI, good integrations. Weaknesses: can be expensive for large teams.
>
> **Monday.com**: A visual work OS with a highly customizable interface. Strengths: flexible, visually appealing. Weaknesses: can be complex to set up.
>
> **Jira**: Popular among software development teams for its robust issue tracking. Strengths: powerful for dev teams. Weaknesses: steep learning curve.
>
> **Notion**: An all-in-one workspace combining notes and project management. Strengths: versatile, increasingly popular. Weaknesses: can lack structure for strict project management...

### Why It Failed

This is a Wikipedia summary of a market that has been Wikipedia-summarized ten thousand times. Every "strength" and "weakness" listed could be found in the first Google result. There's no analysis — just a tour of companies. It doesn't answer any specific question, it doesn't produce any insight Claude couldn't have written without knowing anything about YOUR situation, and it doesn't tell you anything you couldn't find in three minutes of searching.

"Competitive analysis" is not a deliverable — it's a category. The question doesn't specify what decision this analysis is meant to inform, which means Claude can't be useful.

### Good Prompt

```
I'm building a project management tool specifically for architecture and engineering (AEC) firms. These firms work on long-timeline projects (18-36 months), with multiple contractors, subcontractors, complex document versioning, and regulatory approval workflows.

The incumbent tools in this space are Procore (construction-focused, $600M ARR, widely hated but deeply entrenched) and Autodesk Construction Cloud (formerly BIM 360).

I need competitive analysis that answers THREE specific questions:

1. What does Procore do badly that AEC customers complain about most? I need real pain points, not "UI is outdated."

2. Is there a segment of AEC customers that Procore doesn't serve well enough that switching cost would be lower? I'm looking for where the moat is thinnest.

3. What has failed in this market before? What startups have tried to displace Procore and how did they fail?

Don't give me a balanced overview of the market. Answer these three questions specifically.
```

### What You Get

> **Procore's actual pain points (from customer reviews and forum analysis):**
>
> The most consistent complaint is not the UI — it's the subcontractor onboarding tax. Every subcontractor on every project must create a Procore account, learn the platform, and manage their information there. GC project managers report spending significant time troubleshooting subcontractor access issues and re-entering data that subs submitted incorrectly. The platform treats subs as users who should want to be there; the reality is subs see Procore as overhead imposed by the GC with no benefit to themselves.
>
> The second consistent complaint is document control at scale. Procore's document management works acceptably for a single project. Firms managing 15+ concurrent projects report that cross-project document organization and search becomes unmanageable. The folder hierarchy is flat per-project; there's no meaningful cross-project document intelligence.
>
> **Where the moat is thinnest:**
>
> Small AEC firms (under $50M annual project volume) are weakly locked in. They typically use Procore for 2-3 tools (RFIs, submittals, daily logs) and have low cross-functional adoption — meaning switching a department doesn't require switching the whole firm. Specialty contractors (MEP, structural steel) are particularly weakly tied in because their workflows often don't match Procore's GC-centric model...

### Why It Works

Three specific questions with deliverable format replaced the generic "do a competitive analysis" request. The negative constraint ("not 'UI is outdated'") prevented the most generic answer. The specific incumbent companies gave Claude concrete competitors to analyze rather than "the market." The segment question framed the analysis around a decision — where to compete first — rather than as a neutral overview.

---

## Example 2: Go-to-Market Strategy

### Bad Prompt

```
Help me think about go-to-market strategy for my B2B SaaS.
```

### What You Get

> A successful go-to-market strategy for B2B SaaS involves several key components:
>
> **1. Define your ICP (Ideal Customer Profile)**: Identify the specific companies and decision-makers most likely to buy your product...
>
> **2. Choose your sales motion**: Decide between product-led growth (PLG) or sales-led growth (SLG)...
>
> **3. Pricing strategy**: Consider value-based pricing rather than cost-plus...
>
> **4. Marketing channels**: Content marketing, SEO, and LinkedIn are popular for B2B...
>
> **5. Sales process**: Map out your sales cycle and identify key stakeholders...

### Why It Failed

This is a glossary of GTM concepts dressed as a strategy. It lists categories of decisions without making any of them. "Choose between PLG or SLG" is not strategic advice — it's a chapter heading. Without knowing the product, the market, the current stage, or the team's strengths, this output is identical to what Claude would produce for any B2B SaaS. The delete test fails completely.

### Good Prompt

```
B2B SaaS, legal document automation for small law firms (1-10 attorneys). Current state: 12 paying customers, all from founder's personal network. $850 MRR. The tool automates contract drafting, with AI that learns firm-specific clause preferences.

Constraint: I'm a solo founder with a $40K runway (8 months). No sales background.

The problem I'm trying to solve: How do I get to 100 paying customers without hiring salespeople I can't afford?

Two specific questions:
1. Which acquisition channel is most likely to produce 100 customers in 8 months given these constraints? Not a list of channels to test — pick one and tell me why.
2. What's the most likely reason this fails even if the product is good?

Assume I've already heard "content marketing" and "cold email." Give me something more specific to this market.
```

### What You Get

> **Channel recommendation: bar association partnership and referral.**
>
> Small law firms trust recommendations from peers and their state bar association more than any inbound channel. They are not LinkedIn users. They do not read SaaS newsletters. Cold email from a non-attorney is noise. Content marketing builds trust over years, not months.
>
> The path to 100 customers in 8 months: identify 3-5 state or local bar associations with active technology committees, offer free member trials, and get a co-promotion agreement. One bar association email to members is worth 6 months of content marketing to this audience.
>
> The secondary channel: referrals from your existing 12 customers. Small firm lawyers talk to each other constantly — practice group listservs, local bar lunch groups, referral relationships. Ask each of your 12 customers to name 3 peers who would benefit. Do warm introductions, not cold outreach.
>
> **Most likely reason this fails even if the product is good:**
>
> AI clause learning works only after the firm has used the tool long enough to train on their preferences. The first 2-4 weeks, the output is generic. Small firm attorneys are time-constrained and will evaluate based on first-use experience — before the personalization has kicked in. If the onboarding doesn't set accurate expectations ("this gets better after your first 20 contracts"), you'll lose most trials before the product demonstrates its core value.

### Why It Works

The constraint ("$40K runway, 8 months, no sales background") collapsed the solution space. Generic channels (paid ads, enterprise sales) were eliminated by context before Claude had to address them. The explicit negative ("I've already heard content marketing and cold email") prevented the most predictable suggestions. Asking for ONE channel rather than a ranked list forced a commitment. The second question (failure mode) produced actionable insight about onboarding — something a standard GTM framework would not surface.
