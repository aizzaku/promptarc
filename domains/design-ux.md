# Domain: Design / UX

## Context Primer

Design work exists on a spectrum from pure visual craft to behavioral science, and confusing the two is the source of most team friction. UI design is the production of artifacts (screens, components, specs) that communicate intent to engineers. UX design is the discipline of understanding user behavior and shaping product decisions to serve it. In practice, most "designers" do both — but the distinction matters because the quality criteria are different: UI quality is measured by precision and consistency, UX quality is measured by whether users accomplish their goals with less friction.

The relationship between design and engineering has fundamentally changed with component-based systems. Figma components map to React components. Design tokens map to CSS variables. The gap between design and code is narrower than it was in the Photoshop era, which means design decisions have direct engineering cost implications — a component designed inconsistently will be implemented inconsistently. Design systems exist specifically to close this gap, but they require maintenance discipline to stay useful. A design system that engineers stop trusting becomes a liability, not an asset.

Design research is often undersold and over-claimed simultaneously. It's undersold when teams skip it entirely and ship based on assumptions. It's over-claimed when teams conduct a 3-person usability test and conclude they've "validated" a product direction. The honest middle ground: research reduces uncertainty, it doesn't eliminate it. Quantitative data tells you what is happening; qualitative research tells you why. Both have sample size limitations. Both inform, not decide.

## Common Patterns

- Component-first design: build a library of reusable components before designing screens; screens become compositions of components
- Design tokens as the contract between design and engineering: named values for color, spacing, typography that both Figma and code reference
- Design critique as a process: structured sessions separate from working sessions, with explicit roles (presenter, critic, note-taker)
- Jobs-to-be-done framing for user research: understand what users are trying to accomplish in their context, not just their stated preferences
- Progressive disclosure as a default pattern for complex interfaces: show only what's needed at each step, reveal depth on demand
- Accessibility-first as a forcing function: designing to WCAG standards often improves the design for all users, not just disabled users
- Atomic design methodology: atoms (buttons, inputs) → molecules (form fields with labels) → organisms (forms, cards) → templates → pages

## Domain Vocabulary

- **Affordance**: A visual property that suggests how an element can be interacted with. A button that looks pressable has good affordance.
- **Information architecture (IA)**: The structure and labeling of content/navigation in a product. Determines whether users can find what they're looking for.
- **Mental model**: The user's internal understanding of how something works. Good design matches the product behavior to existing mental models; great design introduces new mental models carefully.
- **Progressive disclosure**: Showing only the information or options relevant to the user's current task, revealing complexity on demand.
- **Gestalt principles**: Visual perception principles (proximity, similarity, closure, etc.) that explain how users group and interpret visual elements.
- **Design token**: A named value (e.g., `color-primary-500`, `spacing-4`) that represents a design decision and can be referenced in both design tools and code.
- **Atomic design**: A design methodology (Brad Frost) that structures components from small, reusable atoms up to full-page templates.
- **Usability testing**: Observing real users attempting to complete tasks with a product or prototype. Distinct from user interviews, which gather attitudes rather than behaviors.
- **Card sorting**: A UX research technique where participants group labeled cards to reveal their mental models of how information should be organized.
- **Heuristic evaluation**: Expert review of an interface against established usability principles (Nielsen's 10 heuristics being the standard set).
- **Interaction design (IxD)**: The design of the behavior of a system — how it responds to user input, transition animations, error states.
- **Design debt**: Accumulated inconsistency and improvised solutions in a design system that increases the cost of future changes.

## Regulatory/Compliance

- WCAG 2.1 AA is the de facto accessibility standard for most products. AA is achievable and expected. AAA is aspirational and rarely fully achievable.
- ADA (Americans with Disabilities Act) compliance in digital products is increasingly litigated, particularly in e-commerce. WCAG 2.1 AA is the current judicial benchmark.
- COPPA applies to products collecting data from children under 13 — affects consent flows and data handling in design.
- GDPR requires clear consent flows for data collection — affects cookie banners, form design, and data subject rights interfaces.
- Section 508 applies to US federal government technology — stricter requirements than WCAG in some areas.

## Common Pitfalls

- Designing for the happy path: ignoring empty states, error states, loading states, edge cases with unusual data lengths
- Solving aesthetic problems instead of behavioral ones: spending time on visual polish when the underlying flow is broken
- Skipping information architecture: jumping to UI components before establishing navigation structure and content hierarchy
- Treating consistency as the highest value: over-applying patterns to situations where a different solution would genuinely serve the user better
- Research theater: conducting user interviews and then ignoring inconvenient findings that contradict existing plans
- Design-to-handoff as a phase: design and engineering are parallel, not sequential; involving engineers in design decisions prevents rework
- Designing for the average user: ignoring the distribution — designing for 95th-percentile data lengths, 5th-percentile color vision, 99th-percentile error cases

## Quality Signals

- Every screen has a defined empty state, error state, and loading state
- Component names are consistent between design (Figma) and code (React/CSS)
- Color and spacing use tokens, not hardcoded values
- All interactive elements meet 44×44px minimum touch target size
- Text contrast ratios are verified (4.5:1 for body text, 3:1 for large text)
- Research findings are presented with sample size, methodology, and explicit distinction between observation and inference
- Design critique sessions produce specific, actionable feedback — not "this doesn't feel right"

## Anti-Patterns

- "Make it pop": vague aesthetic direction that provides no design guidance
- Designing in a vacuum: shipping to engineering handoff without involving engineers in the design process
- Validating with teammates: calling internal reviews "user research"
- Pixel-perfect as the quality bar: obsessing over 1px differences when the underlying UX is broken
- Treating accessibility as an audit at the end: accessibility is a design constraint, not a post-production checklist

## Recommended Stack/Tools

- **Design**: Figma (industry standard; component library, prototyping, handoff in one tool)
- **Design systems**: Figma + Storybook combination; design tokens managed with Style Dictionary or Tokens Studio
- **Prototyping**: Figma (high-fi), Framer (code-near, animation-heavy), Maze (unmoderated testing)
- **User research**: Lookback or Dovetail (moderated research repository), Maze (unmoderated), UserTesting (panel)
- **Analytics/behavior**: Hotjar or FullStory (session replay), Mixpanel (funnel analysis), PostHog (open source, combined)
- **Accessibility**: Stark (Figma plugin), Axe (browser extension for QA), WAVE
- **Handoff**: Figma's native inspect panel; Zeroheight for living design system documentation
