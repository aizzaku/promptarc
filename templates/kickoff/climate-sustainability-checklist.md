# Climate & Sustainability Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a climate tech, carbon accounting, or sustainability reporting project.

---

## Product Scope

1. **What does this product do?** (Corporate carbon accounting | ESG reporting | Carbon credit marketplace | Energy management | Supply chain emissions | Climate risk analysis | Sustainability data collection from suppliers | Renewable energy / grid)
2. **Primary buyer?** (Corporate sustainability teams | Financial institutions / investors | Carbon project developers | Utilities / energy companies | Government / regulators | SMBs)
3. **Reporting standard?** (GHG Protocol | ISO 14064 | CDP | GRI | TCFD | SASB | CSRD | Multiple — which frameworks must the output support?)
4. **Regulatory driver?** (Voluntary | SEC Climate Rule | EU CSRD | California SB 253 | CBAM | Other mandate — regulatory requirement determines required rigor and third-party verification needs)

---

## Emissions Accounting

5. **Scope coverage?** (Scope 1 only | Scope 1+2 | Scope 1+2+3 — Scope 3 dramatically increases data collection complexity)
6. **Scope 3 categories?** (If Scope 3 in scope: which of the 15 categories? Purchased goods (Cat 1), employee commuting (Cat 7), use of sold products (Cat 11) each require different methodologies)
7. **Scope 2 accounting method?** (Market-based | Location-based | Both — REC tracking required for market-based)
8. **Emission factor strategy?** (Which factor databases: EPA eGRID, DEFRA, ecoinvent, supplier-specific? Factor versioning and restatement capability required?)

---

## Data Collection

9. **Activity data sources?** (Utility bills | Fuel invoices | Travel booking systems | ERP / procurement data | IoT / meter data | Manual entry — what are the primary data ingestion paths?)
10. **Supplier data collection?** (Scope 3 Category 1 — primary data from suppliers required? Engagement campaign workflow needed?)
11. **Data quality tiers?** (GHG Protocol data quality tiers: primary measured data vs. calculated vs. estimated vs. proxy — must the system track and report data quality by emission source?)
12. **Third-party verification?** (Audit-ready reports required? ISO 14064 verification or limited assurance — what level of rigor do auditors require?)

---

## Carbon Markets

13. **Carbon credits in scope?** (Buying | Selling | Registry integration | Marketplace | None)
14. **Registry integration?** (Verra, Gold Standard, ACR, CAR — which registries? API integration for retirement verification or manual certificate upload?)
15. **Credit quality tracking?** (Methodology, vintage, project type, permanence risk, co-benefits — which provenance fields must be tracked per credit?)

---

## Reporting

16. **Report output format?** (PDF report | Excel export | API for external filing systems | CDP questionnaire integration | Regulatory submission format)
17. **Restatement capability?** (When emission factors are updated, can historical reports be restated from preserved activity data — or must users re-enter data?)

---

## Conditional

### If energy management in scope
18. **Data ingestion?** (Green Button / utility API | Smart meter / IoT | Manual bill upload — what's the primary energy data source?)
19. **Real-time vs. monthly?** (Interval data (15-min) for demand response vs. monthly billing data for annual reporting — different infrastructure requirements)

### If climate risk in scope
20. **Physical vs. transition risk?** (Physical risk: flood, heat, water stress modeling | Transition risk: carbon pricing, stranded assets — which scenarios required?)
21. **Asset portfolio?** (Real estate, infrastructure, supply chain locations — geographic coordinates required for physical risk analysis?)
