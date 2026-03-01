# Verification Patterns

Reference for `/arc-check`. Use the patterns matching the active domain to detect stubs, incomplete work, and wiring failures.

---

## Artifact completeness (apply to all domains)

Before checking quality, check existence at three levels:

| Level | Question | Failure signal |
|-------|----------|----------------|
| **Exists** | Does the thing actually exist as a concrete artifact? | Described in chat but no file / no section / no entry written |
| **Substantive** | Is it a real implementation, not a placeholder? | See domain-specific stub patterns below |
| **Wired** | Is it connected to the rest of the system? | See domain-specific wiring patterns below |

A thing that exists but isn't substantive is a stub. A thing that's substantive but not wired is an island. Both are failures.

---

## Universal stub patterns

Immediately flag any of these, regardless of domain:

**Text stubs**
- `[INSERT ...]`, `[ADD ...]`, `[YOUR ...]`, `[EXAMPLE ...]`
- `TBD`, `TODO`, `FIXME`, `PLACEHOLDER`
- "Lorem ipsum" or obvious filler text
- "This section will be updated"
- Bracketed unfilled template variables: `{{VARIABLE}}`

**Hedge phrases that substitute for content**
- "This may vary depending on context"
- "Consult a professional" with no other substance
- "Results may vary"
- Any sentence that could appear verbatim in any project in this category

---

## Software Engineering patterns

### Stubs
- `// TODO`, `// FIXME`, `// STUB`, `// PLACEHOLDER`, `// HACK`
- `throw new Error('Not implemented')`, `throw new Error('TODO')`
- Empty function bodies: `function foo() {}` or `const foo = () => {}`
- `return null` / `return undefined` where a value is expected
- `pass` (Python), `todo!()` (Rust), unimplemented stubs in any language
- `as any`, `@ts-ignore`, `@ts-expect-error` — type erasure, not type safety
- Commented-out code blocks replacing real implementation
- `console.log` left as the only function body

### Wiring failures
- New route defined but not registered in the router
- New component created but not imported in the parent
- New service instantiated but not injected where used
- Migration file created but not applied (`migrations/` file without corresponding schema change)
- Environment variable referenced but not in `.env.example`
- New module exported but not added to barrel (`index.ts`)
- Hook created but not called from the component
- Event emitted but no listener registered

### Code quality anti-patterns (beyond universal)
- `catch(e) {}` — empty catch, errors silently swallowed
- `catch(e) { console.log(e) }` — logged but not handled
- Magic numbers without named constants
- Hardcoded secrets, API keys, or connection strings
- SQL string concatenation (injection vector)
- `parseInt()` without radix parameter
- `==` instead of `===` (JavaScript)
- Mutating function arguments directly

---

## Content / Writing patterns

### Stubs
- `[Insert statistic here]`, `[Add example]`, `[Company name]`
- "As studies show..." with no citation
- "Experts agree..." with no attribution
- Placeholder image descriptions: `[IMAGE: ...]`
- Section headers with no body below them

### Quality anti-patterns
- Opening with "In today's fast-paced world" or any temporal cliché
- "It's worth noting that..." (filler — just say the thing)
- "At the end of the day..."
- Ending with "In conclusion" or "To summarize" followed by a restatement of what was just said
- Passive voice as a default (not deliberately chosen)
- Bullet lists where the bullets are complete sentences that could be prose
- "Leverage" when "use" is correct
- "Robust", "comprehensive", "seamless", "cutting-edge", "game-changer" with no evidence
- Content that could have been written without knowing anything about this specific project

### Wiring failures
- Article references a section that doesn't exist
- "See figure X" with no figure
- Link text says "click here" with no URL
- "As discussed above" when nothing was discussed

---

## Legal / Compliance patterns

### Stubs
- `[PARTY NAME]`, `[DATE]`, `[JURISDICTION]` unfilled in a "complete" document
- `[INSERT GOVERNING LAW]`
- "Standard terms apply" with no citation to which standard
- "As required by applicable law" without specifying which law or section
- "Subject to regulatory approval" without naming the regulator or approval type

### Quality anti-patterns
- An obligation stated without: who must do it, what they must do, by when
- "May" used where "shall" or "must" is intended (creates optionality where there should be none)
- "Commercially reasonable efforts" without a definition of what that means in this context
- Defined term used before it's defined
- Defined term defined but never used
- Risk flagged as "this may create issues" without naming the specific issue or consequence
- Citation to a statute or standard without the section number (e.g., "GDPR" with no Article reference)
- Jurisdiction named without confirming it applies to all parties

### Wiring failures
- Term defined in Section 1 but used differently in Section 7
- Exhibit referenced in the body but not attached
- Obligation in the body that contradicts the limitation of liability clause
- Signature block missing a party named in the recitals

---

## Data / Analytics patterns

### Stubs
- `# TODO: validate this` in a data transformation
- Hardcoded sample data where a query should be
- `df.head()` left as the only output
- Column referenced that doesn't exist in the schema yet
- `SELECT *` without a comment explaining why

### Quality anti-patterns
- Metric defined differently in two places (e.g., "active user" means different things in two queries)
- Grain not stated for a model or table (what is one row?)
- Join without specifying join type (implicit INNER JOIN)
- `DISTINCT` used to paper over a fan-out rather than fixing the underlying join
- Estimate presented without a confidence range or "est." label
- Assumption buried in a comment instead of documented in the model's description
- Source system referenced but not cited (where does this data come from?)
- DAU/WAU/MAU defined without specifying the activity event that counts

### Wiring failures
- Model references `ref('stg_orders')` but `stg_orders` doesn't exist in the project
- Dashboard metric doesn't match the underlying SQL definition
- New column added to source but not to the staging model
- Test added for a field that doesn't exist in the schema

---

## Sales / GTM patterns

### Stubs
- `[CUSTOMER NAME]`, `[COMPANY]`, `[PAIN POINT]` unfilled in outreach copy
- "Personalization token goes here"
- Generic prospect description: "your team", "your business", "your industry"

### Quality anti-patterns
- Feature described without the customer outcome it enables ("We have SSO" vs. "Your team stops managing 47 passwords")
- Superlative without evidence: "best-in-class", "industry-leading", "the most powerful"
- ICP described so broadly it includes most companies ("B2B companies with 10+ employees")
- Subject line that's a statement rather than a hook
- Email with more than one CTA
- "I wanted to reach out" as an opener (no reason given)
- Pain point described generically instead of specifically ("You're probably struggling with X" with no evidence)
- Pitch that leads with company history before the prospect's problem

### Wiring failures
- Sequence step references a previous email the prospect never received in this context
- Case study referenced but no link or attachment
- CTA links to a generic homepage instead of a relevant landing page
- "As I mentioned" when nothing was mentioned in this context

---

## Design / UX patterns

### Stubs
- `[Placeholder image]`, `[Icon TBD]`, `[Copy goes here]`
- "TBD" in a component spec
- Interaction described as "standard behavior" without specifying what that means

### Quality anti-patterns
- Component designed only for the happy path (no empty state, no error state, no loading state)
- Accessibility ignored: interactive element with no keyboard handling or focus state specified
- Color used as the only differentiator (fails color-blind users)
- Touch target smaller than 44×44px specified for mobile
- Animation specified without considering prefers-reduced-motion
- User flow that assumes the user always follows the intended path (no back/escape/cancel)

### Wiring failures
- Component references a design token that isn't defined
- Responsive behavior specified for desktop only
- Interaction references a component that doesn't exist in the design system
- State change described but no transition or loading indicator specified
