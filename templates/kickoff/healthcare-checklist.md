# Healthcare Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a health technology project.

---

## Compliance & Data Classification

1. **Does this project handle PHI?** (Yes | No | Unsure — if unsure, assume yes and work backward)
2. **Is a BAA in place with every service that will touch PHI?** (Cloud provider, database, logging, analytics, support tools)
3. **Which cloud provider and which specific services are confirmed HIPAA-eligible?** (Verify at service level, not provider level)
4. **What compliance certifications are required?** (HIPAA | SOC 2 Type II | HITRUST | State-specific laws)

---

## Clinical vs. Administrative

5. **Is this clinical or administrative software?** (Clinical: directly supports patient care decisions; Administrative: billing, scheduling, operations)
6. **Does any feature interpret health data and recommend clinical actions?** (SaMD assessment required — flag before building)
7. **What user roles exist?** (Provider | Care team | Patient | Billing | Admin — which, and what data does each access?)

---

## Integration

8. **EHR integration required?** (Which EHR: Epic | Cerner | Athena | Other)
9. **FHIR R4 or legacy HL7 v2?** (Or both — HL7 v2 over MLLP is still widespread in hospital systems)
10. **Which FHIR resources are in scope?** (Patient | Encounter | Observation | MedicationRequest | DiagnosticReport | Other)
11. **EHR sandbox access confirmed?** (Production EHR access requires separate credentialing from sandbox)

---

## Audit & Retention

12. **Audit log implementation plan?** (Who, what resource, when, IP, result — contemporaneous, tamper-evident)
13. **Data retention requirements?** (HIPAA minimum 6 years for BAA and related records; clinical records may be longer)
14. **Breach notification process defined?** (HIPAA requires notification within 60 days of discovery)

---

## Conditional

### If patient-facing
15. **SMART on FHIR needed?** (Required for EHR-embedded apps; optional for standalone patient portals)
16. **Patient identity verification strategy?** (How are patients authenticated without creating PHI exposure risk?)

### If clinical decision support
17. **SaMD assessment completed with legal/regulatory counsel?**
18. **Regulatory pathway identified if SaMD applies?** (510(k) | De Novo | Exempt — who owns this decision?)

### If multi-state deployment
19. **State-specific health data laws reviewed?** (Mental health, SUD, reproductive health data often have protections exceeding HIPAA)
20. **Data residency requirements per health system customer?**
