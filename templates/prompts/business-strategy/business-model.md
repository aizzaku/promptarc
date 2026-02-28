# Pattern: Design or Validate a Business Model

> "I want to design or validate a business model"

**Principles used**: Chain-of-Thought Scaffolding, Constraint-Driven Creativity, Negative Examples

---

## When to Use
- Designing how a product/service makes money
- Stress-testing an existing business model
- Comparing revenue model options

## The Pattern

```
{{DESIGN | VALIDATE}} the business model for: {{PRODUCT/SERVICE}}.

What it does: {{VALUE_PROPOSITION}}
Target customer: {{SPECIFIC_SEGMENT}}
Current stage: {{IDEA | PRE_REVENUE | EARLY_REVENUE | GROWTH}}

{{IF DESIGN}}:
Propose 2-3 viable revenue models. For each:
1. How does money flow? (Who pays, for what, how often)
2. Unit economics: CAC, LTV, payback period (estimate with stated assumptions)
3. Scaling dynamics: does revenue grow linearly or nonlinearly with effort?
4. Risk: what kills this model? (churn, competition, regulation, market shift)

Recommend ONE model and justify why.
{{END IF}}

{{IF VALIDATE}}:
Current model: {{DESCRIBE_EXISTING_MODEL}}
Revenue: {{CURRENT_NUMBERS}}

Stress-test:
1. What are the unit economics? (Show the math: CAC, LTV, gross margin, payback period)
2. Where does the model break? (At what scale, churn rate, or CAC does it become unsustainable?)
3. What are the hidden costs that aren't in the model yet? (Support, infrastructure, compliance)
4. What's the competitive vulnerability? (Could a competitor offer the same at a lower price? How?)
5. What would make this model 3x better? (Pricing change, upsell, usage-based, expansion revenue)
{{END IF}}

Do NOT: Present a business model without unit economics. "Revenue = customers × price" is necessary but not a business model — costs, margins, and payback period make it one.
```

## Why It Works
Requiring unit economics prevents hand-waving. The "what kills this model" question forces risk identification upfront. The "3x better" question pushes beyond validation into optimization.

## Common Mistakes
- Designing the revenue model without considering CAC → profitable on paper, unprofitable in reality
- Not stress-testing with realistic churn rates → LTV is fantasy
- Ignoring hidden costs (support scaling, infrastructure, compliance) → margins look better than they are
