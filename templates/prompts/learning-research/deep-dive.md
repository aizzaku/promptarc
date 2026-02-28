# Pattern: Deep-Dive a Topic I Know Nothing About

> "I want to deep-dive a topic I know nothing about"

**Principles used**: Chain-of-Thought Scaffolding, Context Layering, Specificity Amplification

---

## When to Use
- Entering an unfamiliar domain from scratch
- Need working knowledge fast, not just surface familiarity
- Topic is complex enough that Wikipedia isn't sufficient

## The Pattern

```
I know almost nothing about {{TOPIC}}. I need working knowledge — enough to {{GOAL: make a decision | build something | have an informed conversation | write about it}}.

My relevant background: {{WHAT_YOU_DO_KNOW_THAT_MIGHT_HELP}}

Build my understanding in layers:
1. Foundation (5 minutes): What are the 3-5 core concepts I must understand? Define each in 2-3 sentences using analogies from domains I know.
2. Mechanics (15 minutes): How do these concepts interact? What's the system model? Draw the relationships.
3. Nuance (30 minutes): What do beginners get wrong about this? What's the counterintuitive part? Where does the simple model break down?
4. Frontier: What's currently debated or unresolved? Where is the field going?

At each layer, flag: "You can stop here if your goal is just {{LESSER_GOAL}}."

End with:
- The 3 sources I should read if I want to go deeper (specific, not generic)
- The 1 concept most likely to trip me up if I don't understand it properly
```

## Why It Works
Layered delivery means the reader can stop at the right depth for their goal. Flagging "you can stop here" prevents unnecessary depth. Asking for counterintuitive parts targets the knowledge that has the most value-per-minute.

## Common Mistakes
- Not stating the goal → Claude doesn't know what depth to target
- Not providing background → explanations start too basic or too advanced
- Asking for "everything about X" → shallow survey instead of layered depth
