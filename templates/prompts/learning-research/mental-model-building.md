# Pattern: Build a Mental Model for a Complex System

> "I want to build a mental model for a complex system"

**Principles used**: Chain-of-Thought Scaffolding, Specificity Amplification, Constraint-Driven Creativity

---

## When to Use
- Understanding how a complex system (technical, organizational, economic) works
- Need a predictive model, not just a description
- Want to identify leverage points and failure modes

## The Pattern

```
Help me build a mental model for {{SYSTEM}}.

I need to understand it well enough to: {{PREDICT_BEHAVIOR | IDENTIFY_LEVERAGE | DIAGNOSE_PROBLEMS | DESIGN_INTERVENTIONS}}

Build the model:
1. Components: What are the key parts of this system? (Aim for 5-9 — fewer means too abstract, more means too detailed)
2. Relationships: How do the components affect each other? (For each relationship: direction, mechanism, and strength)
3. Feedback loops: Where are the reinforcing loops (more → more) and balancing loops (more → less)? These drive the system's behavior.
4. Leverage points: Where would a small change produce a disproportionate effect?
5. Failure modes: How does this system break? What are the early warning signals?

Test the model:
- "If I change {{VARIABLE}}, what does the model predict happens?"
- "When {{REAL_WORLD_EVENT}} happened, does the model explain why?"
- "What does the model predict that's counterintuitive?"

End with: What does this model NOT capture? Where does the simplification break down?
```

## Why It Works
Building a model from components → relationships → feedback loops → leverage points follows the actual structure of systems thinking. Requiring the model to make predictions distinguishes a useful model from a descriptive diagram.

## Common Mistakes
- Too many components (15+) → model is a description, not an abstraction
- No feedback loops → model is static, can't predict dynamic behavior
- Not testing the model with real scenarios → no validation
