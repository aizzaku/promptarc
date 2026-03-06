# Domain: Government & Civic Tech

## Context Primer

Government software operates under constraints that have no equivalent in commercial software: procurement rules that can take 12-24 months, security frameworks requiring formal authorization before deployment, accessibility requirements that are legally mandated rather than best practices, and an obligation to serve every constituent — including those with limited English proficiency, disabilities, and low digital literacy. The failure mode is not churn; it's a constituent who cannot access a benefit they are legally entitled to.

The public sector is not a monolith. Federal agencies operate under FedRAMP, FISMA, and agency-specific requirements (DoD, VA, IRS each have additional layers). State and local governments are more varied — some have strong technology offices modernizing aggressively, many operate on decade-old legacy systems with tight budgets. The procurement process itself is a technical constraint: requirements must be specified in an RFP before a vendor is selected, meaning the team designing the solution often doesn't know the system environment until after contract award.

Section 508 / WCAG 2.1 AA compliance is not optional for US federal work. Unlike commercial accessibility where violations are reputational, in government they are legal compliance failures that block procurement and can result in lawsuits under the Rehabilitation Act.

## Common Patterns

- **Benefits eligibility and enrollment**: Determines eligibility rules (income, residency, categorical requirements), manages applications, integrates with state databases, and tracks case status. Logic is codified law — changes require legal review, not just product decisions.
- **Permitting and licensing**: Digitizes paper-based approval workflows — building permits, business licenses, professional certifications. Requires document management, inspection scheduling, and fee collection.
- **Case management**: Tracks individuals or cases through multi-step government processes (social services, law enforcement, court systems). Long-lived records with strict retention and access requirements.
- **311 / constituent services**: Non-emergency service request intake, routing to appropriate agency, and status tracking. Multichannel (web, mobile, phone, in-person) with accessibility requirements on every channel.
- **Open data portal**: Public-facing dataset publication, search, and API access. DCAT metadata standard, machine-readable formats, and data update pipelines from source agency systems.
- **Voting and election systems**: Voter registration, poll book management, results reporting. Extremely high security and audit requirements; procurement is state-specific and politically scrutinized.
- **Public records and FOIA**: Tracks and responds to public records requests. Requires document review workflows, redaction tooling, and audit trails.

## Domain Vocabulary

- **FedRAMP (Federal Risk and Authorization Management Program)**: Federal cloud security authorization framework. Required for cloud services sold to US federal agencies. Authorization is expensive and time-consuming; maintain a valid ATO or a FedRAMP-authorized infrastructure baseline.
- **ATO (Authority to Operate)**: Formal authorization granted by an Authorizing Official allowing a system to operate in a federal environment. Requires a System Security Plan (SSP) and risk acceptance documentation.
- **FISMA (Federal Information Security Management Act)**: Federal law requiring agencies to implement information security programs. Categorizes systems as Low, Moderate, or High impact.
- **Section 508**: US federal accessibility law requiring electronic and information technology to be accessible to people with disabilities. Based on WCAG 2.1 AA with additional requirements.
- **WCAG 2.1 AA**: Web Content Accessibility Guidelines — the international standard for web accessibility. Government and many commercial sites are legally required to meet the AA conformance level.
- **SORN (System of Records Notice)**: Federal Privacy Act requirement to publicly disclose any system that maintains records about individuals by their name or identifier.
- **ATO (Authority to Operate)**: Formal federal authorization to deploy a system. Can take 6-18 months for a new authorization; reusing existing ATOs or FedRAMP authorizations is the common shortcut.
- **RFP (Request for Proposals)**: Government procurement document soliciting bids. Defines requirements, evaluation criteria, and contract terms before vendor selection.
- **COTS (Commercial Off-the-Shelf)**: Commercially available software used in government systems. COTS selection is preferred in federal acquisition to reduce custom development risk.
- **PII (Personally Identifiable Information)**: Any information that can identify an individual. Government systems have strict data minimization and retention requirements for PII under Privacy Act and agency policies.
- **GSA Schedule / MAS**: General Services Administration Multiple Award Schedule — pre-negotiated government contract vehicle that simplifies procurement for eligible products and services.

## Regulatory/Compliance

- **Section 508 / WCAG 2.1 AA**: Web and digital accessibility is legally mandatory for federal agencies and required by many state/local procurements. Keyboard navigation, screen reader support, and color contrast are testable requirements, not aspirational.
- **FISMA**: Federal agencies must categorize information systems (Low/Moderate/High) and implement NIST SP 800-53 controls. Software sold to federal agencies must support agency compliance.
- **FedRAMP**: Cloud services must be FedRAMP authorized (or in process) to be procured by federal agencies. The authorization process typically takes 12-18 months.
- **Privacy Act of 1974**: Governs federal agency collection, maintenance, and use of records about individuals. Requires SORNs and limits use to stated purposes.
- **CJIS (Criminal Justice Information Services)**: FBI security policy governing access to criminal justice information. Any software touching law enforcement data must meet CJIS requirements.
- **HIPAA**: Federal agencies administering health programs (CMS, VA, IHS) must comply with HIPAA for health data, in addition to federal-specific requirements.
- **Plain Language Act**: Federal agencies must write public-facing communications in plain language. Content quality is a compliance requirement in digital services.

## Common Pitfalls

- Building accessibility as an afterthought — WCAG 2.1 AA must be designed in from the start; retrofitting is far more expensive than building correctly
- Underestimating FedRAMP authorization timelines — plan for 12-18 months for a new authorization; design the architecture to sit on existing authorized infrastructure where possible
- Assuming government users have modern browsers and devices — enterprise government IT environments often run older versions; test on older browsers and assistive technologies
- Hardcoding business rules that are actually codified law — eligibility rules change with legislation, budget cycles, and regulatory updates; they must be configurable
- Ignoring the procurement constraint — government buyers cannot make technical decisions outside the RFP process; documentation and compliance artifacts are as important as the software itself
- Building for the happy path without modeling the exceptions (appeals, denials, edge cases) that are the majority of actual caseload in benefits systems

## Quality Signals

- Understands that accessibility is a legal requirement, not a UX nice-to-have, and knows the difference between WCAG A, AA, and AAA conformance levels
- Knows that FedRAMP authorization is a prerequisite for federal cloud sales, not a post-launch certification
- Designs benefits eligibility rules as configurable logic rather than hardcoded conditionals
- Treats constituent PII with the Privacy Act's data minimization and purpose limitation principles
- Knows that government procurement requires documentation artifacts (SSP, PIA, SORN) that are as important as the software itself

## Anti-Patterns

- Treating government as just another vertical with stricter compliance checkboxes
- Launching a federal product without an ATO strategy — this blocks deployment regardless of software quality
- Building a beautiful UI that fails keyboard navigation or screen reader testing
- Designing for a single language without considering multilingual requirements (LEP — Limited English Proficiency — is a civil rights requirement for federally funded programs)

## Recommended Stack/Tools

- **Cloud infrastructure (FedRAMP authorized)**: AWS GovCloud, Azure Government, Google Cloud Public Sector
- **Identity / SSO**: Login.gov (federal), ID.me, Max.gov, Okta Government Community Cloud
- **Accessibility testing**: axe (automated), WAVE, NVDA + Firefox (screen reader), JAWS + Chrome, VoiceOver + Safari
- **Forms / service delivery**: US Web Design System (USWDS), GOV.UK Design System (UK analog)
- **CMS**: Drupal (dominant in .gov), Wagtail (Python), custom USWDS-based implementations
- **Case management**: Salesforce Government Cloud, ServiceNow (ITSM), Microsoft Dynamics (state/local)
- **Open data**: CKAN (open source data portal), Socrata (commercial), data.gov infrastructure
- **Security scanning**: Tenable Nessus (vulnerability), OWASP ZAP (DAST), SonarQube (SAST) — all required in ATO documentation
- **Compliance documentation**: GovReady-Q (SSP generation), Xacta, eMASS (DoD)
