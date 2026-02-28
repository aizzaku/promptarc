# Domain: Healthcare / Health Tech

## Context Primer

Healthcare software operates under a constraint that most other domains don't: a bug or data error can directly harm a person. This isn't hypothetical — misrouted lab results, incorrect dosage suggestions, and unauthorized data access have caused real patient harm. The regulatory framework (HIPAA in the US, GDPR for health data in Europe, equivalents elsewhere) exists because of these failure modes, not despite them. Understanding this reframes compliance from "overhead" to "load-bearing."

The US healthcare market is uniquely fragmented. Hospitals, physician practices, payers (insurance companies), pharmacy benefit managers, and pharmacy chains are all separate entities with conflicting incentives — and most of them communicate via HL7 FHIR APIs or, in legacy contexts, HL7 v2 messages over MLLP. Interoperability is a solved problem in theory (FHIR R4 is the standard) and an ongoing nightmare in practice (every EHR vendor implements it differently). Expect integration work to take longer than estimated.

The FDA has jurisdiction over software that qualifies as a Software as a Medical Device (SaMD) — which includes clinical decision support tools, diagnostic algorithms, and certain AI/ML functions. Most administrative and operational software doesn't qualify, but the distinction matters: a tool that displays a lab value is not regulated; a tool that interprets that value and recommends treatment is.

## Common Patterns

- **PHI (Protected Health Information) handling**: PHI must be encrypted at rest and in transit, access-logged, and accessible only to authorized users. Audit logs are a compliance requirement, not a feature.
- **Role-based access with healthcare-specific roles**: Provider, care team member, billing, admin, and patient roles have meaningfully different access requirements. RBAC must be designed with healthcare organizational structures in mind, not just generic permission levels.
- **FHIR R4 integration**: The current standard for health data exchange. Resources (Patient, Observation, Encounter, MedicationRequest, etc.) have specific required and optional fields defined by the spec. Epic, Cerner, and other EHRs expose FHIR APIs — each with vendor-specific extensions.
- **Audit logging**: Every access, modification, and transmission of PHI must be logged with user identity, timestamp, and what was accessed. Logs must be tamper-evident and retained for 6 years under HIPAA.
- **Data residency**: Some health systems require data to remain within specific geographic regions. Multi-tenant architectures need per-tenant storage configuration, not just a single region deployment.
- **Care coordination workflows**: Multi-party care involves multiple systems that need to share state — referrals, care plans, prescriptions, and lab orders all cross organizational boundaries and require explicit coordination patterns.

## Domain Vocabulary

- **PHI (Protected Health Information)**: Individually identifiable health information — includes name, DOB, address, diagnosis, treatment, payment information, and 16 other identifiers defined by HIPAA.
- **BAA (Business Associate Agreement)**: Legal contract required between a covered entity (hospital, payer) and a business associate (SaaS vendor) who handles PHI on their behalf. Required before any PHI handling begins.
- **EHR (Electronic Health Record)**: The primary system of record for patient care. Epic, Cerner (now Oracle Health), and Meditech dominate the US market. Athenahealth and eClinicalWorks are common in smaller practices.
- **HL7 FHIR (Fast Healthcare Interoperability Resources)**: The current standard API protocol for health data exchange. R4 is the current required version under the 21st Century Cures Act.
- **HL7 v2**: Legacy message format used by older healthcare systems for ADT (admission/discharge/transfer), lab results, and orders. Still widespread despite FHIR adoption.
- **SaMD (Software as a Medical Device)**: Software that performs a medical purpose without being part of a hardware medical device. Subject to FDA oversight (US) or CE marking (EU).
- **ICD-10**: Diagnostic classification codes used for billing and documentation. ICD-11 is the current international standard; ICD-10-CM remains the US billing standard.
- **CPT codes**: Current Procedural Terminology codes — what procedures were performed, used for billing. Maintained by the AMA, licensed for commercial use.
- **Prior authorization**: The process of getting payer (insurance) approval before delivering care. A major source of administrative friction and a common automation target.
- **HIPAA Safe Harbor**: One of two methods for de-identifying PHI — requires removing 18 specific identifiers. Expert determination is the other method.
- **NPI (National Provider Identifier)**: Unique 10-digit identifier for healthcare providers in the US. Required on claims; used in FHIR resources.

## Regulatory/Compliance

- **HIPAA**: Governs PHI handling by covered entities and their business associates. Technical safeguards (encryption, access controls, audit logs), physical safeguards, and administrative safeguards are all required.
- **21st Century Cures Act / Information Blocking Rule**: US law requiring EHRs and healthcare providers to share patient data electronically via FHIR APIs. Prohibits "information blocking" — practices that obstruct access to patient data.
- **FDA SaMD**: If your software performs a clinical function (diagnoses, treats, mitigates), assess whether it qualifies as a medical device. Predicate-based 510(k) clearance is the most common path; De Novo for novel devices.
- **SOC 2 Type II**: Expected by most health system procurement teams, even if not legally required.
- **HITRUST**: Healthcare-specific security framework built on top of HIPAA, ISO 27001, and NIST. Some large health systems require HITRUST certification for vendors.
- **State-specific laws**: Several states (California, Texas, NY) have health data laws that go beyond HIPAA. Mental health, substance use disorder, and reproductive health data often have additional protections.

## Common Pitfalls

- Starting PHI handling before a BAA is signed — creates HIPAA liability immediately
- Building on a cloud provider or service that is not HIPAA-eligible (not all AWS/GCP/Azure services qualify)
- Treating FHIR integration as straightforward — every EHR vendor has gaps and extensions that break spec-compliant clients
- Underestimating audit log requirements — retroactive logging is not compliant; it must be contemporaneous and complete
- Using deidentified data that still allows re-identification — statistical re-identification from "anonymous" health data is a documented risk
- Building clinical decision support without understanding FDA SaMD jurisdiction — the line between advisory and regulatory territory is not intuitive
- Assuming US-based compliance covers international markets — EU health data regulations differ significantly

## Quality Signals

- Can distinguish between HIPAA compliance (legal minimum) and clinical-grade data handling (higher bar)
- Understands that EHR integration timelines are always longer than estimated and accounts for this in planning
- Can identify when a feature crosses into SaMD territory and flags it before building
- Treats audit logging as infrastructure, not a feature added post-launch
- Knows the BAA conversation happens before any PHI flows, not after

## Anti-Patterns

- Generic "just add encryption" advice without addressing access controls, audit logs, and breach notification requirements
- Building FHIR integrations against a sandbox/demo environment and declaring integration complete before testing against production EHR instances
- Recommending consumer-grade tools (Notion, Airtable, standard Google Workspace) for PHI storage without verifying BAA availability
- "We'll handle compliance later" — PHI handling requires compliance architecture decisions from the start

## Recommended Stack/Tools

- **Cloud infrastructure**: AWS (GovCloud or standard with appropriate service selection), Google Cloud Healthcare API, Azure Health Data Services — all offer HIPAA-eligible environments with signed BAAs
- **Database**: PostgreSQL with column-level encryption for sensitive fields; consider Vault for key management
- **FHIR server**: HAPI FHIR (open source Java), Azure FHIR Service, Google Cloud Healthcare API FHIR Store
- **Authentication**: SMART on FHIR (OAuth 2.0 extension for healthcare) for EHR-embedded apps; standard OAuth/OIDC with MFA for standalone apps
- **Audit logging**: Immutable audit log (append-only) — AWS CloudTrail, dedicated audit log table with row-level security
- **De-identification**: philter (open source), AWS Comprehend Medical (PII detection), or cloud-specific medical NLP services
- **Interoperability testing**: Inferno (ONC's FHIR conformance testing suite), Touchstone for HL7
