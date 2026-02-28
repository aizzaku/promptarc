# Anti-Slop System

Slop is generic AI output that could have been produced without any knowledge of the user's actual situation. Eliminating slop is ARC's first-class architectural concern — not an afterthought, not a filter applied at the end, but a principle that shapes every template and pattern.

---

## The Five Anti-Slop Principles

### 1. Specificity Over Generality
Every statement should contain information the reader doesn't already know. If a sentence is true of any project in the category, it's slop.

**Test**: Cover the project name. Can you tell which project the output is about? If not, it's generic.

### 2. Voice Preservation
Output should sound like the author, not like "an AI assistant." Every project has a voice (defined in the Voice Profile section of CLAUDE.md). Output that doesn't match the voice is slop, regardless of accuracy.

**Test**: Read the output aloud. Does it sound like a person would say it, or does it sound like a press release?

### 3. Earned Structure
Structure should emerge from content, not be imposed on it. Default to prose. Use headers, bullets, and numbered lists only when the content genuinely benefits from them.

**Test**: Remove all formatting. Is the content still clear? If yes, the structure was earned. If the formatting was hiding thin content, that's slop.

### 4. Surprising > Correct
A technically correct but boring output is a failure. If the reader's reaction is "yeah, I already knew that" — the output added no value. Every response should contain at least one insight, angle, or connection the reader didn't anticipate.

**Test**: Highlight every sentence that tells the reader something they couldn't have guessed. If fewer than 30% of sentences pass, it's too generic.

### 5. The Delete Test
If you can delete a sentence, paragraph, or section without losing information, delete it. Slop is padding. Every word must earn its place.

**Test**: Delete the first and last paragraph. Did you lose any content that isn't restated elsewhere? If not, they were throat-clearing and summary — pure slop.

---

## Banned Phrases

These phrases are almost never the best way to say what they're trying to say. When tempted to use them, find the specific version instead.

### Filler Openers
| Banned | Why | Instead |
|--------|-----|---------|
| "In today's fast-paced world" | Says nothing. Every era thinks it's fast-paced. | Start with the specific claim. |
| "It's worth noting that" | If it's worth noting, just note it. | Delete. State the thing directly. |
| "Let's dive in / deep dive" | Throat-clearing. Delays the actual content. | Start with the content. |
| "As we all know" | Patronizing and filler. | Delete. If it's known, why say it? |
| "When it comes to [X]" | Empty transition. | Delete. Start with X. |

### Filler Closers
| Banned | Why | Instead |
|--------|-----|---------|
| "In conclusion" | The reader can see it's the end. | Delete or make your final point. |
| "At the end of the day" | Cliché that weakens the point. | State the point directly. |
| "Key takeaways" | Implies the reader can't identify them. | If you must summarize, make it additive — add a NEW insight. |
| "To summarize" | Same as restating what was just said. | Delete. |
| "Moving forward" | Vague and corporate. | Specify what's actually next. |

### Empty Adjectives
| Banned | Why | Instead |
|--------|-----|---------|
| "Robust" (without specifics) | What makes it robust? Say THAT. | "Handles 10K concurrent connections with graceful degradation" |
| "Comprehensive" | Comprehensive how? Relative to what? | List what's actually covered. |
| "Seamless" | Nothing is seamless. What friction was removed? | "Eliminates the manual CSV export step" |
| "Cutting-edge" | Meaningless marketing. | Name the specific technology or technique. |
| "Best-in-class" | Compared to what class? By what metric? | Cite the actual comparison. |
| "Innovative" | Self-proclaimed innovation is cringe. | Describe what's new and why it matters. |
| "Scalable" (without specifics) | Everything claims to be scalable. | "Scales to 1M events/day on a single node" |
| "Powerful" | Powerful how? | Describe the specific capability. |

### Buzzwords
| Banned | Why | Instead |
|--------|-----|---------|
| "Leverage" (when "use" works) | Corporate jargon inflation. | "Use" |
| "Synergy" | Almost never means anything concrete. | Describe the specific interaction. |
| "Paradigm shift" | Overused to the point of meaninglessness. | Describe what actually changed. |
| "Game-changer" | If it were, you wouldn't need the label. | Show the impact with numbers. |
| "Disrupt" | Startup cliché. | Describe the market change specifically. |
| "Ecosystem" (for non-biological systems) | Often vague hand-waving. | "The npm package registry" / "AWS service integrations" |
| "Holistic" | Usually means "vague." | Specify what's included. |
| "Actionable" | Ironic — the word itself adds nothing actionable. | Just make the content actionable. |

---

## Structural Anti-Patterns

### The Listicle Trap
**Pattern**: H2 / H2 / H2 with bullet points under each. Every section starts with a topic sentence, has 3-5 bullets, ends with a transition.

**Problem**: This is the default structure LLMs produce because it's the most common structure in training data. It's never wrong, but it's rarely the BEST structure for any given content.

**Rule**: Don't use uniform H2/bullet structure unless the content genuinely calls for it. Let the content's natural shape determine the structure. A narrative argument needs paragraphs. A comparison needs a table. A process needs a flowchart or numbered steps. A single key insight needs a single paragraph with no headers at all.

### The "N Ways To" Opening
**Pattern**: "Here are 7 ways to improve your..."

**Problem**: Forces content into a count-based structure that prioritizes quantity over quality. Often results in padding weaker items to hit the number.

**Rule**: If you must list approaches, lead with the BEST one and go deep. Mentioning 7 shallow approaches is less useful than deeply exploring 2 good ones.

### The Summary That Restates
**Pattern**: Introduction says what you'll cover. Body covers it. Conclusion restates what was covered.

**Problem**: The reader gets the same information three times. Two of those are pure waste.

**Rule**: Introductions set up the PROBLEM or create tension. Conclusions add a NEW insight, make a call to action, or connect to a bigger picture. Neither should restate the body.

### Filler Transitions
**Pattern**: "Now that we've covered X, let's move on to Y."

**Problem**: Zero information content. The reader can see the next section heading.

**Rule**: If the connection between sections isn't obvious, make a SUBSTANTIVE transition that adds information: "X is necessary but insufficient — Y addresses the gap." If the connection IS obvious, no transition needed.

---

## Code Anti-Patterns

### Over-Abstraction (YAGNI Violation)
Creating interfaces, factories, or abstraction layers for things that only have one implementation. Building for hypothetical future requirements instead of current needs.

**Rule**: Three concrete uses before abstracting. One use = inline. Two uses = maybe extract. Three uses = abstract.

### Enterprise Patterns in Simple Projects
Applying repository pattern, CQRS, event sourcing, or hexagonal architecture to a CRUD app with 5 endpoints.

**Rule**: Match architectural complexity to problem complexity. A todo app doesn't need domain-driven design.

### Unnecessary Design Patterns
Using Observer, Strategy, Factory, or other GoF patterns when a simple function call would suffice.

**Rule**: Patterns solve specific problems. Name the problem before applying the pattern. If you can't articulate what problem the pattern solves in THIS context, you don't need it.

### Boilerplate Comments
```
// This function calculates the total
function calculateTotal() { ... }
```

**Rule**: Comments explain WHY, never WHAT. If the code needs a comment to explain what it does, rename the function/variable instead.

### Premature Optimization
Caching, memoization, lazy loading, or algorithmic optimization before measuring a performance problem.

**Rule**: Make it work, make it clear, make it fast — in that order. Optimize only what you've measured as slow.

---

## Domain-Specific Slop

### Software Engineering Slop
- "Clean code" without specifying what clean means in context
- "Follow best practices" without naming which practices
- "Production-ready" as a hand-wave for "add error handling I guess"
- Comments that restate code
- Tests that test the mock, not the behavior

### Content Publishing Slop
- Opening with a question ("Have you ever wondered...?")
- Statistics without sources or context
- Quotes from famous people used as filler
- "As [Authority] once said..."
- Rhetorical questions that don't advance the argument

### Business Strategy Slop
- "First-mover advantage" without evidence it applies
- TAM calculations that include everyone with internet access
- "We have no direct competitors" (you do — the status quo)
- Financial projections with hockey-stick growth and no justification
- "Strategic partnerships" with no named partners

### Learning & Research Slop
- Definitions copied from Wikipedia
- "This is a complex topic" — everything is complex; say something useful
- Source synthesis that just lists what each source says without connecting them
- "Further research is needed" as a conclusion

### Productivity Slop
- "Start your day with intention" — meaningless without specifics
- Generic habit advice ("wake up at 5 AM, exercise, journal")
- Frameworks presented without adaptation to the user's actual situation
- "Work smarter, not harder" and its variants

### Decision Framework Slop
- Pros/cons lists that are perfectly balanced (a decision tool that doesn't help decide)
- "It depends on your situation" without clarifying WHAT about the situation
- Risk assessments where everything is "medium"
- SWOT analyses where every quadrant has exactly 4 items

---

## Enforcement

Anti-slop rules are embedded in `templates/claude-md/base.md` as NON-NEGOTIABLE. They cannot be overridden per-project. The full banned phrase list and structural anti-patterns are active by default.

The `arc-check` skill validates output against these rules. But prevention is better than detection — the templates are designed to produce non-sloppy output in the first place, not to catch slop after it's been generated.
