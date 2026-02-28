# Pattern: Model Unit Economics for a Product

> "I want to model unit economics for a new product"

**Principles used**: Chain-of-Thought Scaffolding, Specificity Amplification

---

## When to Use
- Validating whether a business can be profitable at target scale
- Preparing financial projections for fundraising
- Comparing pricing strategies by their economic impact

## The Pattern

```
Model the unit economics for: {{PRODUCT/SERVICE}}

Known inputs:
- Price: {{PRICE}} per {{UNIT}} per {{PERIOD}}
- COGS per customer: {{COST_TO_SERVE — hosting, support, etc.}}
- Current CAC: {{COST_TO_ACQUIRE — or "unknown, estimate"}}
- Churn rate: {{MONTHLY_CHURN — or "unknown, estimate for this category"}}
- Expansion revenue: {{UPSELL_POTENTIAL — or "none yet"}}

Build the model:
1. Gross margin per customer per month
2. LTV (using churn rate — show formula and calculation)
3. LTV:CAC ratio (is this sustainable? What's the benchmark for this category?)
4. Payback period (months to recover CAC)
5. Revenue projection: {{TIME_HORIZON}} with {{GROWTH_RATE — or "suggest a realistic rate"}}

Sensitivity analysis:
- What happens if churn is 2x higher?
- What happens if CAC is 50% higher?
- What's the break-even price point?
- At what customer count does the business become cash-flow positive?

State every assumption explicitly. Mark each as: (measured data | industry benchmark | educated guess).

Deliver as: structured text with calculations shown, ready to transfer to a spreadsheet.
```

## Why It Works
Sensitivity analysis reveals which assumptions actually matter — if the model survives 2x churn but breaks at 50% higher CAC, you know where to focus validation efforts. Marking assumption quality prevents false precision.

## Common Mistakes
- Using "industry average" churn for a product that doesn't exist yet → false precision
- Modeling revenue without costs → looks profitable until you add reality
- No sensitivity analysis → false confidence in a single scenario
