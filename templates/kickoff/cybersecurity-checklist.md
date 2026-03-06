# Cybersecurity Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a cybersecurity product project.

---

## Product Type

1. **What type of security product?** (SIEM | SOAR | IAM/PAM | Vulnerability management | SAST/DAST | Pen testing tool | GRC/compliance | Threat intelligence | EDR/XDR | Security data lake)
2. **Primary buyer persona?** (CISO | SOC analyst | IT administrator | Security engineer | Developer / AppSec team)
3. **Deployment model?** (SaaS cloud | On-premises | Hybrid | Air-gapped — security buyers often require on-prem)

---

## Data & Detection

4. **What data sources does it ingest?** (Logs | Network traffic | Endpoint telemetry | Cloud provider events | Application events)
5. **Detection model?** (Rule-based | ML-based | Threat intelligence correlation | Behavioral analytics | Hybrid)
6. **Expected alert volume?** (Events per day at target scale — and what's the acceptable false positive rate?)
7. **MITRE ATT&CK coverage mapping planned?** (Which tactics and techniques does the product detect?)

---

## Compliance & Certifications

8. **Target compliance frameworks?** (SOC 2 | ISO 27001 | FedRAMP | CMMC | PCI-DSS | HIPAA | NIST CSF)
9. **What compliance evidence does the product help customers produce?** (Audit logs, access reports, vulnerability scan results)
10. **Data residency requirements?** (Log data is often subject to data sovereignty regulations)

---

## Integrations

11. **SIEM integrations needed?** (Splunk | Microsoft Sentinel | CrowdStrike | SentinelOne | Custom)
12. **Ticketing and alerting integrations?** (Jira | ServiceNow | PagerDuty | Opsgenie)
13. **Identity provider integration?** (Okta | Azure AD | Ping Identity | LDAP)

---

## Security of the Product Itself

14. **Threat model of the product completed?** (What are the assets, threats, and controls for the product itself?)
15. **Pen test / red team engagement planned before launch?**
16. **Vulnerability disclosure policy published?**

---

## Conditional

### If detection product (SIEM/EDR/XDR)
17. **How is detection logic updated?** (Vendor-managed only | Customer-editable rules | Both)
18. **Threat intelligence feeds integrated?** (Which feeds, at what refresh rate)
19. **False positive rate measurement and SLA?**

### If IAM / access management
20. **Protocol support?** (SAML 2.0 | OIDC | SCIM | LDAP | Kerberos — which are required)
21. **MFA methods?** (TOTP | Hardware key | Push notification | Biometric)
22. **Privileged access management features?** (Session recording | Just-in-time access | Credential vaulting)
