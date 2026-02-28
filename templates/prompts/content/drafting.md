# Pattern: Write a First Draft That Sounds Human

> "I want to generate a first draft that doesn't sound like AI"

**Principles used**: Role and Perspective Framing, Few-Shot Calibration, Negative Examples

---

## When to Use
- You have an outline and need to write the actual content
- Converting notes or bullet points into flowing prose
- Need a draft in a specific voice that doesn't sound like default AI

## The Pattern

```
Write a first draft based on this outline: {{OUTLINE}}

Voice sample (this is how I write):
"{{PASTE 2-3 PARAGRAPHS OF YOUR OWN WRITING}}"

Match that voice. Specifically:
- Sentence length variation: {{SHORT_AND_PUNCHY | LONGER_AND_FLOWING | MIX}}
- Formality level: {{CASUAL_CONVERSATIONAL | PROFESSIONAL_BUT_WARM | FORMAL_ANALYTICAL}}
- Use of "I": {{FREQUENTLY | OCCASIONALLY | NEVER}}
- Humor: {{YES_DRY | YES_PLAYFUL | MINIMAL | NONE}}

Do NOT:
- Open with a question
- Use the phrase "it's worth noting" or "let's dive in"
- Summarize at the end — close with something new
- Use more than one metaphor per 500 words
- Start consecutive paragraphs with the same word

Target length: {{WORD_COUNT}}

Write the draft. Prioritize voice accuracy over perfection — I'll edit.
```

## Why It Works
The voice sample gives Claude a concrete pattern to match rather than interpreting abstract style descriptions. The explicit DO NOT list eliminates the most common AI writing tics. Asking for a draft (not a final version) sets the right expectation — rough quality with accurate voice is better than polished quality with generic voice.

## Common Mistakes
- Not providing a voice sample → Claude defaults to its own register
- Over-constraining the draft → stiff, unnatural writing
- Asking for final copy instead of a draft → Claude over-polishes and loses voice

## Variations
- **From rough notes**: "Here are my rough notes: {{NOTES}}. Turn these into a coherent draft without losing any of the original insights, even the half-formed ones."
- **Section-at-a-time**: "Write only the {{SECTION_NAME}} section. End with a natural transition to the next topic."
