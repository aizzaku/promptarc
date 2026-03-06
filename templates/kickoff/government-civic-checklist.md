# Government & Civic Tech Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a government or civic technology project.

---

## Jurisdiction and Deployment

1. **Government level?** (US Federal | US State | US Local / municipal | International — compliance framework and procurement process differ significantly)
2. **Agency type?** (Health and human services | Law enforcement / justice | Permitting / licensing | Revenue / tax | Elections | General administration | Public infrastructure)
3. **Deployment environment?** (Federal cloud (requires FedRAMP authorization) | State data center | Commercial cloud with state approval | On-premises)
4. **Procurement path?** (Direct contract | GSA Schedule / MAS | State contract vehicle | Open source / FOSS deployment | Grant-funded)

---

## Security and Authorization

5. **FedRAMP requirement?** (Federal deployment — is FedRAMP authorization required? In-process ATO or existing authorized infrastructure planned? Timeline accounted for?)
6. **FISMA impact level?** (Low | Moderate | High — determines NIST 800-53 control baseline and documentation requirements)
7. **Data sensitivity?** (PII only | Health data (HIPAA) | Law enforcement (CJIS) | Tax / financial | None — determines security and access control requirements)
8. **Audit logging scope?** (All PII access | Admin actions only | Full activity log — Privacy Act compliance requires logging who accessed what and when)

---

## Accessibility

9. **Accessibility standard?** (Section 508 / WCAG 2.1 AA | WCAG 2.1 AAA | EN 301 549 (EU) — non-negotiable for public-facing federal and most state systems)
10. **Assistive technology testing plan?** (NVDA + Firefox, JAWS + Chrome, VoiceOver + Safari — manual testing cadence defined before launch?)
11. **Multilingual requirements?** (English only | Spanish required | Other languages — Limited English Proficiency (LEP) requirements for federally funded programs)

---

## Constituent-Facing Features

12. **Authentication method?** (Login.gov | State identity system | Agency SSO | Email/SMS MFA — not all constituents have smartphones; fallback methods required)
13. **Offline / low-bandwidth access?** (Constituents with poor connectivity — progressive enhancement and low-bandwidth mode required?)
14. **Plain language requirement?** (Federal Plain Language Act for .gov sites | Best practice — reading level target for public-facing content?)

---

## Business Rules and Compliance

15. **Eligibility rules or business logic source?** (Codified in statute or regulation — are these rules configurable by admins, or will they require code changes when policy changes?)
16. **Appeals and exceptions workflow?** (What happens when a constituent is denied? Appeal process, exception review, and escalation path — designed with equal priority as the happy path?)
17. **Records retention policy?** (Case records, application data, audit logs — retention schedule defined per record type? Deletion vs. archival policy?)

---

## Conditional

### If benefits or social services
18. **Eligibility determination model?** (Income thresholds, categorical eligibility, automatic enrollment from other programs — rules must be configurable, not hardcoded)
19. **Cross-agency data sharing?** (Integration with other government systems for eligibility verification — data sharing agreements and privacy impact assessments required?)

### If law enforcement / justice
20. **CJIS compliance?** (Criminal Justice Information Services security policy — required for any system accessing FBI NCIC or CJIS-regulated data)
21. **Chain of custody?** (Evidence management, audit trail integrity requirements — are records legally admissible in court?)
