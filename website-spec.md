# ARC Interactive Website — Specification
Date: 2026-03-01

---

## 1. Purpose & Core Beliefs

This site exists to shift three beliefs in people who already use Claude but get inconsistent results:

1. **Claude without structure = wasted potential** — their current approach is leaving serious capability on the table
2. **Setup upfront = speed for life** — 15 minutes of kickoff saves hundreds of hours across a project
3. **Prompting is a craft, not luck** — good Claude output is engineered, not accidental, and anyone can learn it

This is not a pitch to the unsure. It does not explain the product for those unfamiliar with Claude. It does not apologize for being opinionated.

---

## 2. Target Audience

**Who this is for**: People who use Claude regularly (for work, for projects), get inconsistent results, and haven't figured out why. They suspect they're doing something wrong but don't have a framework.

**Who this is NOT for**:
- People who've never used Claude — too much baseline context needed
- Prompt engineering academics — they already know this material

**Implied persona**: A developer, analyst, or knowledge worker who's used Claude 100+ times, gotten great output occasionally, mediocre output often, and has no systematic way to close the gap.

---

## 3. Page Structure

**Single long-scroll page.** One URL, one narrative, one exit. Standard for developer tools.

### Section order:
1. Hero
2. Demo (before/after comparison with domain switcher)
3. Principles Teaser (2 principles)
4. Final CTA

---

## 4. Section Specifications

### 4.1 Hero

**Opening**: The install command, above the fold, with no preamble.

```
npx arc-setup
```

**Subtext** (tight, no fluff): A single line that implies the problem without stating it. Example direction: *"The framework that makes every Claude session consistent."*

**Intent**: Filters immediately. If you have to ask what it does, you're not the audience. The command is the hook, not a button labeled "Get Started."

**No animated typing effect** — the command is static, confident.

**Hero CTA**: "View on GitHub" link below the command (secondary, not primary). The command itself is the primary action invitation.

---

### 4.2 Demo Section

**Title**: Something short and assertive. Direction: *"The gap is real."* or *"Before and after."*

**Layout**: Side-by-side comparison. Left: naive prompt. Right: ARC prompt. Static — no animations.

**Domain switcher**: Three tabs above the comparison — `Software Engineering` | `Content` | `Business Strategy`. Tab switch triggers a 200ms fade (content fades out, new content fades in). No slide, no instant swap.

**Quality score**: Each prompt (before and after) has a visible score, benchmark-style. Not subjective language — a number or a grade. Example: `Prompt Score: 2/10` vs. `Prompt Score: 9/10`. Displays below each prompt block. This makes the gap measurable, not a matter of taste.

**"Before" prompt character**: Embarrassingly bad. Immediately recognizable as something anyone has typed. Examples:
- Software Eng: `"write me a function to handle users"`
- Content: `"write me a good blog post about AI"`
- Business: `"analyze the market for my startup"`

**"After" prompt character**: Generated as part of the build process. Should apply at minimum: role framing, domain context, specific task, constraints, output format. Should feel like it was written by someone who knows what they're doing, not a robot filling a template.

**No simulated Claude output shown**: The prompts themselves make the argument. Trust the reader to extrapolate. A quality score makes the gap feel objective.

**Content source**: Generate all 3 domain pairs (before/after prompts + scores) during implementation using Claude, derived from the ARC principles and existing templates. They do not need to come from the user.

---

### 4.3 Principles Teaser

**Not a list of all 8**. Tease 2. The rest are the reward for installing.

**Principles to feature**:

1. **Specificity Amplification** — Generic input produces generic output. Every detail you add eliminates a category of wrong answers. (The single highest-leverage principle.)

2. **Negative Examples** — Showing Claude what you *don't* want is more instructive than showing what you do want. Precise negative examples eliminate entire failure categories.

**Format for each principle**:
- Name + 1-sentence explanation
- A concrete "without / with" micro-example that demonstrates the principle in action
- No lengthy exposition

**Tone**: The principles should feel like secrets worth knowing, not documentation worth skimming. Short, confident, immediately applicable.

---

### 4.4 Final CTA

**Primary**: GitHub repo link — "Clone or star on GitHub"

**Copy direction**: Minimal. The demo has done the work. A single sentence at most. Example direction: *"The full framework, 8 principles, and all templates are in the repo."*

**No email capture, no signup, no "try for free" framing.** This is a developer acquisition page, not a SaaS funnel.

---

## 5. Design Constraints

### What this site is NOT:
- Not a gradient-heavy SaaS landing page (no Stripe-adjacent purple-to-blue gradients, no blob animations)
- Not dark-mode-obsessed (no forced dark theme, readability over aesthetic)
- Not a dense text blog post (strong visual hierarchy required)
- Not a README ported to HTML (the emotional component matters)

### What this site IS:
- Light mode primary
- Strong typographic hierarchy (size and weight do the work, not color)
- Technical but human — not cold, not warm, exactly right
- Confident in its own point of view

### Typography:
- Monospace for code blocks and the install command — makes the technical content feel at home
- A clean sans-serif for body copy (Inter, Geist, or similar)
- No decorative fonts

### Color palette:
- Near-white background
- Dark text (high contrast)
- One accent color (used sparingly — for scores, active tab, CTA button)
- Avoid: multiple accent colors, gradients, heavy use of color as decoration

### Spacing:
- Generous whitespace — this is not a feature-matrix marketing page
- Content breathes

---

## 6. Copy Tone

**Confident but explanatory.** Bold claim first, immediate proof second, in the same breath.

**Not**: opinionated to the point of antagonism. Not educational/earnest. Not terse documentation.

**Examples of right tone**:
- "Generic input produces generic output. Always." (claim)
- "Here's what that looks like in practice." (immediate pivot to proof)

**Examples of wrong tone**:
- "Are you getting the most out of Claude? Many users find that..." (too soft)
- "Most people prompt Claude wrong and we're here to tell them." (too antagonistic)
- "ARC provides a comprehensive framework of 8 evidence-based principles..." (too documentation)

---

## 7. Technical Specification

### Stack:
**No hard constraint — build fast, refactor later.** Preferred approach given the scope (single-page marketing site, no backend):
- HTML/CSS/JS: Maximum portability, instant deployment, zero build tooling
- OR Next.js: If component structure becomes necessary

**Recommendation**: Start with plain HTML/CSS/JS. The site is one page with no dynamic data. A build pipeline adds complexity with no return here. If the domain switcher + fade transition requires JS complexity, a small vanilla script is sufficient.

### Deployment:
**Vercel or Netlify**. Either works. Drag-and-drop or GitHub integration. No preference between them.

### Content generation:
Before/after prompt pairs and quality scores for all 3 domains should be generated by Claude during the implementation phase, drawing from:
- `core/principles.md` (for the principles)
- `templates/prompts/` (for domain-specific patterns)
- `core/anti-slop.md` (for what "bad" looks like)

---

## 8. Out of Scope

- No email capture or newsletter signup
- No user accounts or authentication
- No real Claude API integration (all examples are static/hardcoded)
- No multi-page routing (single scroll page only)
- No mobile-first optimization required for v1, but must not break on mobile
- No SEO optimization beyond basic meta tags
- No analytics integration for v1

---

## 9. Success Criteria

The site succeeds if:
1. A developer who lands on it, reads it in 2 minutes, and either stars the repo or doesn't — with no confusion about what ARC is or who it's for
2. The before/after quality gap is immediately obvious without reading any explanatory text
3. The install command and GitHub link are impossible to miss
4. A first-time visitor can describe what ARC does in one sentence after one scroll-through

---

## 10. Decisions Made

| Decision | Rationale |
|----------|-----------|
| Single-page scroll | One narrative, one exit, lower scope |
| Open with install command | Filters immediately. Confidence signal. |
| Static side-by-side (no typing animation) | Developers distrust over-designed sites |
| Quality scores, not actual Claude output | Measurable gap, no need to simulate LLM output |
| 200ms fade on domain switch | Subtle polish without false drama |
| 2 principles teased, not 8 | Intrigue > completeness. Full framework = reward for install |
| No objection handling copy | The demo speaks for itself |
| Primary CTA = GitHub star | Developer acquisition funnel, not SaaS conversion |
| Light mode | Readability over dark aesthetic |
| Generate demo content during build | Leverages existing templates, no manual copy needed |

---

## 11. Open Questions

- Domain name / final URL (or GitHub Pages as fallback?)
- Whether the quality score is a number (0-10), letter grade (A-F), or something custom to ARC branding
- Whether to include a mobile hamburger nav or just let the page scroll on mobile
- Whether the principles teaser links to the GitHub repo's `core/principles.md` or to a future `/principles` page
