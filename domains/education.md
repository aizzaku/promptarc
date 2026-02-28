# Domain: Education / EdTech

## Context Primer

EdTech has a notoriously poor product-market fit track record despite clear demand, for two reasons. First, the purchasing decision is separated from the usage experience: a school administrator buys curriculum software that teachers use and students suffer through. Aligning these three stakeholders requires fundamentally different product surfaces — the admin needs reporting, the teacher needs tools, the student needs engagement. Building one product that serves all three is hard; most teams either over-rotate to the purchaser (good sales, poor retention) or the student (loved by users, can't close institutional deals).

Second, "engagement" in education is a false metric. Time-on-platform doesn't correlate with learning outcomes. Apps that maximize engagement via streaks, badges, and notifications are building behavioral manipulation products, not education products. The real metric is learning transfer — does the learner demonstrate the skill in a context they didn't train in? Measuring this is harder than tracking sessions, which is why most EdTech metrics are proxies that decouple from the thing that actually matters.

Consumer EdTech (Duolingo, Khan Academy) and institutional EdTech (Canvas LMS, Coursera for Enterprise) operate by different rules. Consumer products must survive cold-start (no existing user base, no forced adoption), which means they optimize for viral moments and habit formation. Institutional products can be mandated but face the resistance of users who didn't choose them — adoption requires institutional champions, not just a good UX.

## Common Patterns

- **LMS integration (LTI)**: The Learning Tools Interoperability standard allows tools to embed inside LMS platforms (Canvas, Blackboard, Moodle, Google Classroom). LTI 1.3 is the current spec. A single LTI integration unlocks distribution to millions of institution-hosted students.
- **SCORM / xAPI content packaging**: Legacy standard (SCORM) and its modern successor (xAPI/Tin Can) for packaging self-contained learning content that reports completion and scores back to an LMS.
- **Spaced repetition and adaptive learning**: Algorithmically scheduling review sessions based on memory decay models (Leitner system, SM-2, FSRS). Proven for memorization-heavy domains; requires tracking per-learner item histories.
- **Progress and mastery tracking**: Distinguishing between "completed" (watched a video) and "mastered" (demonstrated the skill). Competency-based progression requires assessment data, not just activity data.
- **Cohort-based learning**: Synchronous or semi-synchronous learning with a fixed peer group. Creates accountability and social pressure that asynchronous self-paced cannot. Operationally complex — requires scheduling, facilitation, and cohort management.
- **Accessibility-first design**: WCAG 2.1 AA compliance is a legal requirement for most institutional customers (Section 508 in the US). Screen reader compatibility, keyboard navigation, and caption requirements are frequently checked in procurement.

## Domain Vocabulary

- **LMS (Learning Management System)**: Platform for delivering and managing educational content. Canvas, Blackboard, Moodle (institutional); Teachable, Thinkific (creator platforms).
- **LTI (Learning Tools Interoperability)**: Standard for embedding third-party tools inside an LMS while sharing user identity and reporting completion/grades back.
- **SCORM**: Legacy e-learning packaging standard that defines how content communicates completion and scores to an LMS. Ubiquitous in corporate training and older institutional contexts.
- **xAPI (Experience API / Tin Can)**: More flexible successor to SCORM. Can track learning that happens outside an LMS (reading, watching video, real-world activities). Stores data in an LRS.
- **LRS (Learning Record Store)**: Database for xAPI learning records. Can aggregate learning data across systems.
- **Mastery / Competency-based progression**: Advancement based on demonstrated skill, not time spent or content consumed. Requires assessment; common in professional certifications and K-12 standards-aligned curricula.
- **Spaced repetition**: Practice scheduling that increases intervals between reviews as retention improves. Highly effective for vocabulary and factual knowledge.
- **Section 508**: US law requiring federal agencies and federally funded organizations to make electronic content accessible to people with disabilities. Most institutional procurement requires 508 compliance (WCAG 2.1 AA).
- **FERPA (Family Educational Rights and Privacy Act)**: US law protecting the privacy of student education records. Applies to K-12 and higher education institutions that receive federal funding.
- **COPPA**: US federal law restricting data collection from children under 13. Applies to EdTech tools used in K-12 contexts.
- **IAB (Identified-Appropriate Behavior)**: Whether a learner's usage pattern indicates genuine engagement vs. gaming the system (e.g., clicking through content to mark it complete).

## Regulatory/Compliance

- **FERPA**: Student education records cannot be shared without parental consent (for minors) or student consent (for adults). School-issued tools operate under "school official" exception but have strict limitations on secondary use.
- **COPPA**: EdTech tools used with children under 13 require verifiable parental consent for data collection, or must operate under a school consent mechanism.
- **GDPR Article 8**: Children under 16 (or 13, per member state) require parental consent for processing personal data. Educational institutions in Europe face GDPR compliance requirements that affect EdTech vendors operating in their markets.
- **Section 508 / WCAG 2.1 AA**: Required for procurement by most US public institutions. Inaccessible software fails procurement evaluations regardless of functionality.
- **Student Data Privacy Consortium (SDPC)**: Many US school districts now require vendors to sign SDPC agreements governing data use and protection.

## Common Pitfalls

- Optimizing for engagement metrics (streaks, time-on-platform) that don't correlate with learning outcomes
- Building for students without considering that administrators control the procurement decision
- Ignoring LTI integration until post-launch — institutional distribution depends on it, and it's non-trivial to retrofit
- Under-investing in accessibility until a procurement check fails — Section 508 compliance is a hard gate for institutional sales
- Conflating completion (activity-level) with mastery (skill-level) in reporting
- Building for the US market with FERPA in mind but ignoring equivalent rules in UK, EU, and Australian markets
- Designing for a motivated adult learner when the actual user is a 14-year-old who didn't choose to be there

## Quality Signals

- Can reason about the learner/teacher/administrator split and which audience is being served
- Understands that FERPA and COPPA create specific data handling constraints, not just privacy considerations
- Knows the difference between SCORM (legacy, LMS-bound) and xAPI (modern, multi-context)
- Can distinguish adaptive difficulty from genuine mastery-based progression
- Recognizes that Section 508/WCAG compliance is a procurement gate, not an optional nice-to-have

## Anti-Patterns

- Designing primarily around "learning science principles" without validating in the actual target environment (kids, distracted, not intrinsically motivated)
- Assuming consumer user acquisition patterns transfer to institutional sales
- Building elaborate gamification without evidence it improves the learning outcome (not just engagement)
- Using engagement time as the primary success metric

## Recommended Stack/Tools

- **LTI integration**: IMS Global LTI 1.3 spec; `ims-lti` (Node.js) or `pylti1.3` (Python) for implementation
- **Content authoring**: H5P (open source, LMS-compatible interactive content); custom React components for proprietary content
- **Assessment**: Custom-built for most cases; avoid legacy assessment platforms — the UX is poor and integration is painful
- **Spaced repetition**: Implement SM-2 or FSRS algorithm; or use Anki's open-source scheduler logic as reference
- **Video delivery**: Mux or Cloudflare Stream for adaptive bitrate streaming; critical for lower-bandwidth users
- **Accessibility testing**: axe (automated), manual screen reader testing with NVDA (Windows) and VoiceOver (macOS/iOS)
- **LRS (xAPI)**: Learning Locker (open source) or SCORM Cloud for managed LRS
- **Analytics**: Custom event tracking against your mastery model; avoid generic product analytics as the primary learning metric
