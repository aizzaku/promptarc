# Domain: Enterprise Software

## Context Primer

Enterprise software is sold to organizations, not individuals. This creates a three-way tension that shapes every product decision: the economic buyer (who approves budget), the internal champion (who advocates for the product), and the end user (who actually uses it) have different priorities. A product that delights end users but can't survive a security questionnaire never gets purchased. A product that satisfies procurement but frustrates end users doesn't get renewed. Both problems are product problems.

Enterprise sales cycles of 3–12 months are normal at mid-market and above. During that cycle, the product must survive a security review (often 200+ questions covering access control, encryption, incident response, and third-party risk), legal review of the MSA and DPA, IT review of SSO and data handling, and sometimes a proof-of-concept or pilot. Features that block any of these gates block the deal. SSO, SCIM provisioning, audit logs, role-based access, and data export are not enterprise differentiators — they are table stakes whose absence blocks deals.

Once purchased, enterprise accounts expect change management: advance notice of breaking changes, migration paths with defined timelines, and dedicated customer success touchpoints for significant incidents or product changes. The enterprise product motion is fundamentally different from consumer or SMB — it requires designing for the organization as a unit, not just individual users.

## Common Patterns

- **SSO/SAML + SCIM**: Single Sign-On via SAML 2.0 or OIDC, with SCIM 2.0 for automated user provisioning and deprovisioning. Expected by any organization with identity governance requirements.
- **Per-tenant customization**: Enterprise customers need custom roles, custom fields, custom workflows, and custom integrations that the vendor didn't anticipate. Configuration surfaces, not code changes.
- **Audit logs as a contract requirement**: Immutable, exportable logs of all significant actions — actor, action, resource, timestamp, IP, result. Queried during security reviews and sometimes contractually required.
- **Data residency**: Ability to specify where data is stored at the tenant level. EU customers often require EU residency; highly regulated industries may require country-specific storage.
- **SLA monitoring and reporting**: Uptime and latency measured against contractual SLAs. Customer-visible status pages and uptime reports are expected.
- **Change management for enterprises**: Advance notice (30–90 days) before breaking changes, deprecated features, or pricing changes. Enterprise budgets are annual — surprise changes break procurement cycles.
- **Professional services and onboarding**: White-glove implementation for large accounts. The product alone is often insufficient — data migration, configuration, and training are expected.

## Domain Vocabulary

- **ACV (Annual Contract Value)**: The normalized annual value of a contract, excluding one-time fees. Core metric for enterprise SaaS.
- **MSA (Master Service Agreement)**: The overarching legal agreement governing the relationship. Enterprise deals require a signed MSA before any access is granted.
- **DPA (Data Processing Agreement)**: Required under GDPR for any vendor that processes personal data on behalf of a customer. Often required even for non-EU customers.
- **SLA (Service Level Agreement)**: Contractual uptime and performance commitments, typically with financial penalties (credits) for breaches.
- **SCIM (System for Cross-domain Identity Management)**: Protocol for automated user provisioning and deprovisioning from an identity provider.
- **ICP (Ideal Customer Profile)**: The specific company profile — size, industry, pain point, tech stack — that closes fastest and retains best.
- **Security questionnaire**: A vendor assessment document (often 100–300 questions) submitted during procurement. Must be answerable with evidence, not just assertions.
- **POC / Pilot**: Proof of concept or pilot deployment. A gating requirement before full enterprise commitment. Product must demonstrate specific value within a defined scope.
- **ELA (Enterprise License Agreement)**: A volume deal covering an entire organization rather than per-seat pricing. Unlocked at scale, often with significant discounts in exchange for commitment.
- **NPS / CSAT**: Net Promoter Score / Customer Satisfaction score. Enterprise CS teams track these as leading indicators of renewal risk.

## Regulatory/Compliance

- **SOC 2 Type II**: The baseline enterprise security certification. Required before any significant enterprise deal closes. Type II (12-month observation period) is expected; Type I is insufficient for security-conscious buyers.
- **ISO 27001**: International security standard. Required for EU and global enterprise customers who need a certification aligned with international frameworks.
- **GDPR / DPA**: Any product handling EU customer data requires a Data Processing Agreement. Failure to provide one blocks deals in any GDPR-jurisdictional enterprise.
- **HIPAA / HITRUST**: Required if enterprise customers are in healthcare. BAA required before any PHI flows.
- **FedRAMP**: Required for US federal agency customers. A significant certification investment; most startups defer until Series C+.
- **Penetration testing**: Most enterprise security teams require annual pen test results with remediation documentation. Some require a right-to-audit clause.

## Common Pitfalls

- Building enterprise features (SSO, audit logs, SCIM, data export) as post-launch items — they block deals, not delight users after purchase
- Treating the end user as the only buyer — ignoring the economic buyer's security, legal, and IT requirements
- No data export capability — enterprise customers require the ability to extract their data; without it, no deal closes
- Custom role requests handled as engineering tickets — configuration surfaces, not code changes, are the scalable solution
- Surprise pricing or feature changes without advance notice — breaks annual budget cycles and damages trust
- Security questionnaire responses that say "contact us for details" instead of providing evidence — kills procurement momentum
- Underestimating the POC stage — POCs require product investment; underprepared POCs lose deals to competitors

## Quality Signals

- Knows that SSO, SCIM, audit logs, and data export must be built before enterprise sales begins, not during
- Can explain the difference between the economic buyer, champion, and end user — and design for all three
- Treats security questionnaires as a product surface that requires the same quality as the API
- Understands that enterprise accounts require change management, not just product updates
- Designs custom roles as configuration, not as engineering requests

## Anti-Patterns

- "We'll add enterprise features after product-market fit" — enterprise features are required for enterprise PMF
- Treating all enterprise requests as custom work — patterns emerge across customers and should become product
- Conflating mid-market and enterprise requirements — $20K ACV and $200K ACV customers have different expectations

## Recommended Stack/Tools

- **SSO/SAML**: Okta, Auth0, WorkOS (enterprise auth abstraction), Saml Jackson, or native SAML/OIDC libraries
- **SCIM provisioning**: WorkOS Directory Sync, Okta SCIM, or direct SCIM 2.0 implementation
- **Audit logs**: Purpose-built audit log service (Pangea, WorkOS Audit), or internal implementation with append-only database table + export
- **Data residency**: Multi-region deployment with per-tenant storage routing. AWS/GCP/Azure all support this with regional infrastructure.
- **Security questionnaire automation**: Conveyor, SafeBase, Whistic — reduces manual questionnaire effort significantly at scale
- **Status pages**: Statuspage.io (Atlassian), Instatus — customer-visible uptime reporting
