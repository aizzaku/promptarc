# Domain: HR & Talent

## Context Primer

HR and talent software operates at the intersection of legal compliance, employee trust, and organizational process. Unlike most software domains, HR systems carry significant legal exposure: mishandling employment data triggers EEOC liability, FLSA violations carry back-pay penalties, and GDPR/CCPA give employees rights to their own data that must be technically enforced. The system of record for compensation, employment history, and performance data is not just a database — it is legal evidence. Errors in payroll have direct financial consequences for employees, which means correctness requirements are closer to fintech than typical SaaS.

HR systems also serve multiple stakeholders with competing interests: HR administrators who configure policies, managers who review their teams, employees who access their own data, and executives who see org-wide analytics. Access control must be role-aware, org-hierarchy-aware, and often context-aware (a manager can see their direct reports' salaries, but not peers').

The talent acquisition funnel introduces structured process requirements: EEOC compliance demands that rejection reasons be defensible and documented, interview scoring be consistent, and demographic data be firewalled from hiring decisions. ATS systems that allow free-form notes without structure create legal risk at every step.

## Common Patterns

- **ATS (Applicant Tracking System)**: Manages job requisitions, candidate pipeline stages, interview scheduling, offer generation, and background check orchestration. Integration hub for job boards, background check vendors, HRIS.
- **HRIS (Human Resources Information System)**: System of record for employee data — headcount, org structure, employment status, compensation, benefits enrollment. Source of truth that other systems sync from.
- **Payroll engine**: Gross-to-net calculation with federal, state, and local tax tables. Must handle multi-state employees, garnishments, deferred compensation, equity vesting events, and PTO payouts.
- **Performance management**: Review cycles, goal tracking (OKR/KPI), calibration workflows, and promotion nomination. Sensitive data requiring manager-specific access scoping.
- **Benefits administration**: Open enrollment, carrier feeds (834 EDI transactions), life events, and COBRA administration. Deep insurance carrier integration with strict file format requirements.
- **Workforce analytics**: Headcount reports, attrition analysis, diversity metrics, compensation equity analysis. Requires careful demographic data handling to avoid EEOC exposure.
- **Org hierarchy modeling**: Tree structure with manager relationships, cost center assignments, and reporting chains. Most access control policies derive from this hierarchy.

## Domain Vocabulary

- **HRIS (Human Resources Information System)**: The central employee database — source of truth for org structure, employment records, compensation, and demographic data.
- **ATS (Applicant Tracking System)**: Software managing the recruiting funnel from job posting through offer acceptance and onboarding.
- **EEO-1 / EEOC**: Equal Employment Opportunity Commission reporting. Requires demographic data collection with strict access controls separating it from hiring decisions.
- **FLSA (Fair Labor Standards Act)**: US federal law governing minimum wage, overtime, and employee classification (exempt vs. non-exempt). Misclassification is a major employer liability.
- **I-9 / E-Verify**: Employment eligibility verification. Must be completed within 3 business days of hire; documents must be retained per federal schedule.
- **Garnishment**: Court-ordered payroll deductions (child support, tax levies, student loans). Must be calculated before net pay and remitted to the correct agency.
- **834 EDI**: Benefits enrollment transaction format used by insurance carriers. Benefits admin platforms transmit enrollment changes to carriers via this standard.
- **COBRA**: Federal law requiring continuation of health coverage after a qualifying event (termination, reduction in hours). Strict notice and election timelines with employer liability for non-compliance.
- **Exempt vs. non-exempt**: FLSA classification determining overtime eligibility. Misclassifying employees costs employers back wages and penalties.
- **Open enrollment**: Annual period when employees can change benefits elections. High-stakes batch processing that feeds carrier integrations.
- **Headcount / FTE**: Full-time equivalent tracking. Finance and HR reconcile headcount reports to budget; discrepancies are escalation events.

## Regulatory/Compliance

- **EEOC compliance**: Demographic data (race, gender, disability) must be collected separately from application data and protected from influencing hiring decisions. Adverse impact analysis required for objective screening criteria.
- **FLSA (Fair Labor Standards Act)**: Overtime calculation, minimum wage, employee classification. Non-exempt employees must be paid 1.5x for hours over 40/week.
- **FMLA (Family and Medical Leave Act)**: Eligible employees entitled to 12 weeks unpaid leave. Tracking, notification, and benefit continuation obligations.
- **ADA (Americans with Disabilities Act)**: Reasonable accommodation workflow required. Interactive process must be documented.
- **GDPR / CCPA**: Employees have rights to access, correct, and delete their personal data. HR systems must support data subject requests with defined retention schedules.
- **SOC 2 Type II**: Expected by enterprise buyers evaluating HR platforms handling sensitive employee data.
- **State-specific requirements**: California (CFRA, pay transparency, pay data reporting), New York, Illinois — significantly expand baseline federal requirements.

## Common Pitfalls

- Storing EEO demographic data in the same tables as hiring decision data — creates legal exposure when discovery-requested
- Payroll calculations that don't account for multi-state tax nexus or mid-period pay rate changes
- Manager access control based on email domain or title instead of live org hierarchy — breaks after reorgs
- Missing audit log on compensation data changes — HR needs to know who changed an offer letter, and when
- Benefits open enrollment without idempotency — double-processing carrier 834 feeds creates coverage gaps
- No COBRA notification workflow — employer liability starts on the day of the qualifying event
- Interview feedback stored as free-form text without structure — legally indefensible if challenged

## Quality Signals

- Understands that org hierarchy is the foundation of most HRIS access control policies
- Knows the difference between exempt and non-exempt classification and its payroll implications
- Treats demographic data (EEO) as a separate, access-restricted data layer
- Designs payroll as a calculation engine with immutable audit history, not a simple record update
- Knows that benefits carrier feeds (834 EDI) are high-stakes batch integrations with strict timing

## Anti-Patterns

- Building a single "employee" table with all HR data instead of separating compensation, performance, and demographics into access-controlled layers
- Assuming payroll is simple arithmetic — ignoring tax tables, garnishments, and multi-state rules
- Soft-deleting terminated employees instead of maintaining employment history with status transitions
- Hardcoding org hierarchy relationships instead of modeling them as a queryable structure

## Recommended Stack/Tools

- **HRIS**: Workday (enterprise), BambooHR (SMB), Rippling (modern, API-first), HiBob, Personio (EU)
- **ATS**: Greenhouse, Lever, Workable, iCIMS (enterprise), Ashby (modern)
- **Payroll engines**: Gusto (SMB), ADP (enterprise), Paylocity, Ceridian Dayforce
- **Benefits administration**: bswift, Benefitfocus, Ease (SMB)
- **Background checks**: Checkr, Sterling, First Advantage
- **Job board integrations**: Indeed, LinkedIn Talent, ZipRecruiter (via unified APIs like Findem or direct)
- **Org chart / hierarchy**: Orgviz, Pingboard, or custom graph model in PostgreSQL
- **Compliance**: Trusaic (pay equity), Syndio (compensation analytics)
