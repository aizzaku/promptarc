# SaaS Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a B2B SaaS project.

---

## Business Model

1. **Pricing model?** (Seat-based | Usage-based | Feature-tiered | Hybrid seat + usage)
2. **Growth motion?** (PLG: self-serve signup and activation | SLG: sales-led | Hybrid — which is primary?)
3. **Billing provider?** (Stripe | Chargebee | Paddle | Recurly | Custom)
4. **Free tier or trial model?** (Freemium | Time-limited trial | Reverse trial | No free tier)

---

## Multi-Tenancy

5. **Tenant isolation model?** (Shared schema with RLS | Schema-per-tenant | Instance-per-tenant)
6. **Tenant ID source confirmed as auth context, not user input?** (This is a security requirement, not a preference)
7. **Tenant hierarchy?** (Organization → Team → Member | Workspace → Member | Flat — which and why)
8. **Per-tenant configuration needed?** (Custom SSO, custom roles, data residency, custom branding)

---

## Pricing Enforcement

9. **What features and limits are gated by pricing tier?**
10. **Server-side enforcement confirmed for all gates?** (Never client-side only)
11. **Usage metering needed?** (What's measured: API calls | Seats | Storage | Events | Other)
12. **Metering source of truth?** (Server-side events — confirm it's not client-reported)

---

## Enterprise Readiness

13. **SSO requirement?** (SAML 2.0 | OIDC | Both | Not yet — but confirm timeline)
14. **SCIM provisioning needed?** (Automated user provisioning/deprovisioning for identity governance)
15. **Audit logs required?** (Format: actor/action/resource/timestamp/IP | Retention | Exportable | Customer-queryable)
16. **Custom roles/permissions?** (Enterprise customers always need roles you didn't anticipate)

---

## Operational

17. **Webhook strategy?** (Signature verification | Retry with backoff | Idempotency on receipt)
18. **Soft deletes for customer data?** (Confirm — hard deletes in B2B create irrecoverable support incidents)
19. **Data export capability?** (Customers must be able to export their data — often a contract requirement)

---

## Conditional

### If PLG
20. **Activation event defined?** (The specific moment a new user experiences core product value for the first time)
21. **Onboarding flow reaching activation without sales contact?** (PLG requires self-serve value delivery)

### If enterprise / SLG
22. **Security questionnaire process?** (SOC 2 Type II report ready | Pen test results | Who fills out customer questionnaires?)
23. **Change management for enterprise customers?** (Advance notice of breaking changes, deprecation timelines)
