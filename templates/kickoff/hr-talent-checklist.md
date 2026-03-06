# HR & Talent Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies an HR, talent, or workforce management project.

---

## Product Scope

1. **What does this product manage?** (ATS / recruiting | HRIS / employee records | Payroll | Benefits administration | Performance management | Workforce analytics | Full HCM suite)
2. **Primary buyer?** (HR team | People ops at startup | Enterprise CHROs | Staffing / recruiting agencies)
3. **Company size target?** (SMB < 200 employees | Mid-market 200-2,000 | Enterprise 2,000+ — compliance complexity scales with headcount and multi-state exposure)
4. **Geographic scope?** (Single US state | Multi-state US | International — multi-country payroll and labor law adds significant complexity)

---

## Data and Compliance

5. **EEO / demographic data handling?** (Collected for compliance reporting — is it isolated from hiring decision workflows and access-restricted separately from candidate data?)
6. **Employment law compliance scope?** (FLSA, FMLA, ADA — which apply? Multi-state compliance adds state-specific requirements: California, New York, Illinois have significantly expanded obligations)
7. **Data retention requirements?** (I-9 retention, payroll records, performance history — retention schedules defined per document type?)
8. **Audit logging requirements?** (Compensation changes, termination actions, benefits elections — who needs to see the change history and for how long?)

---

## Payroll and Compensation

9. **Payroll in scope?** (In-house payroll engine | Integration with ADP, Gusto, Paylocity | Out of scope)
10. **Multi-state payroll?** (Employees in multiple states — state tax table management, nexus rules, and local tax jurisdictions required?)
11. **Compensation structures?** (Base salary only | Hourly + overtime | Commission / variable | Equity / RSU vesting events | Shift differentials)
12. **Exempt vs. non-exempt classification?** (FLSA classification managed in system — overtime calculation for non-exempt employees required?)

---

## Benefits

13. **Benefits administration in scope?** (Open enrollment | Life events | Carrier feeds (834 EDI) | COBRA administration | None)
14. **Insurance carrier integrations?** (Which carriers, what data exchange format — 834 EDI file or API?)
15. **COBRA workflow?** (Qualifying event triggers, required notification timeline, election tracking — who manages this process?)

---

## Recruiting and ATS

16. **ATS in scope?** (Job requisitions | Candidate pipeline | Interview scheduling | Offer management | Background check integration | Onboarding handoff)
17. **Job board integrations?** (Indeed, LinkedIn, ZipRecruiter, Greenhouse, Lever — which job boards or ATS platforms require integration?)
18. **Structured interview process?** (Standardized scorecards and reason codes for rejections — required for EEOC defensibility?)

---

## Conditional

### If performance management in scope
19. **Review cycle model?** (Annual | Bi-annual | Continuous feedback | 360-degree — what's the review cadence and participant structure?)
20. **Calibration workflow?** (Managers calibrate ratings across teams before publishing — who participates and what access levels are needed?)

### If workforce analytics in scope
21. **Demographic reporting?** (Pay equity analysis, diversity metrics — access must be restricted to HR and compliance roles, not available to general managers)
22. **Headcount reconciliation?** (HR headcount must reconcile with Finance budget data — is there an ERP integration or export workflow for this?)
