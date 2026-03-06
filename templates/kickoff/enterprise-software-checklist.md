# Enterprise Software Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies an enterprise software project.

---

## Sales Motion & Buyers

1. **Target deal size and sales cycle?** (SMB: <$10K ACV, weeks | Mid-market: $10–100K, months | Enterprise: $100K+, quarters)
2. **Who is the economic buyer?** (CIO | CISO | VP Engineering | CFO | Department head — who approves budget?)
3. **Who is the champion and who is the end user?** (Different people — identify and design for both)
4. **Sales-assisted or product-led entry?** (Sales-led at this size? Or PLG with enterprise upgrade path?)

---

## Security & Compliance

5. **SOC 2 Type II report available?** (Required before most mid-market and enterprise deals close)
6. **Pen test results available?** (Many enterprise security teams require annual pen test + remediation docs)
7. **SSO in place?** (SAML 2.0 | OIDC | Both — is it per-tenant configurable?)
8. **SCIM provisioning in place?** (Automated user lifecycle management — blocks deals at identity-mature organizations)
9. **What compliance certifications do target customers require?** (SOC 2 | ISO 27001 | HIPAA | FedRAMP | GDPR | CMMC)

---

## Multi-Tenancy & Customization

10. **Tenant isolation model?** (Shared schema + RLS | Schema-per-tenant | Instance-per-tenant)
11. **Per-tenant customization required?** (Custom roles | Custom fields | Custom workflows | Custom integrations — which?)
12. **Data residency requirements?** (EU only | US only | Customer-specified — can you route storage by tenant?)

---

## SLA & Operations

13. **Contractual uptime SLA?** (99.9% | 99.95% | 99.99% — with financial penalties for breach?)
14. **Customer-visible status page in place?**
15. **Data export commitment?** (All customer data exportable in what format? What SLA for delivery?)

---

## Customer Success

16. **Onboarding model?** (Self-serve | Guided CSM | White-glove professional services | Depends on ACV)
17. **Change management process?** (Advance notice window for breaking changes? How are enterprise customers notified?)
18. **Security questionnaire process?** (Who fills them out? Automation tooling? Turnaround SLA?)

---

## Conditional

### If GDPR / EU customers
19. **DPA (Data Processing Agreement) available as a standard document?**
20. **Sub-processor list maintained and kept current?**

### If regulated industry (healthcare, finance, government)
21. **Industry-specific compliance certifications assessed?** (HIPAA BAA | FedRAMP | PCI-DSS level — which apply?)
22. **Right-to-audit clause in contracts accepted or rejected?** (Some enterprise customers require it)
