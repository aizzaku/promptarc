# Real Estate & Proptech Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a real estate or proptech project.

---

## Product Scope

1. **What does this product do?** (Property search / listings | Transaction coordination | CRM for agents/brokers | Property management | Mortgage origination | Investment analysis | Title / escrow | Market data / analytics)
2. **Primary user?** (Home buyers/sellers | Real estate agents | Brokers / teams | Property managers / landlords | Investors | Mortgage lenders | Title companies)
3. **Property type?** (Residential for-sale | Residential rental | Commercial | Industrial | Mixed-use | Land)
4. **Geographic scope?** (Single metro | Multi-state | National — state-specific legal requirements expand significantly with geographic scope)

---

## Listings and Data

5. **MLS data required?** (Yes — which MLS(es) or aggregator? RESO Web API or RETS? | No MLS — off-market or direct data sources)
6. **Data freshness requirements?** (Near-real-time listing status | Daily refresh acceptable — listing status staleness is the highest-trust failure in consumer-facing products)
7. **Address and property data normalization?** (Address normalization strategy for MLS data? Geocoding provider? Property deduplication across data sources?)
8. **Geospatial search requirements?** (Radius search | Polygon (neighborhood, school district, flood zone) | Map-based browsing — what spatial queries are needed?)

---

## Transactions

9. **Transaction workflow in scope?** (Offer management | Contract management | Contingency deadline tracking | Document collection | Closing coordination | None)
10. **Document management?** (E-signature required (DocuSign)? Document storage, version control, and retention requirements?)
11. **TRID compliance?** (Mortgage product — Loan Estimate and Closing Disclosure timing enforcement required?)
12. **State-specific forms?** (Which states? Disclosure forms and contract templates are state-specific — standardized across states is not acceptable)

---

## Property Management

13. **Lease management in scope?** (Lease lifecycle, renewal workflows, rent escalations | Not in scope)
14. **Rent collection?** (Payment processing for rent — security deposit handling separated from operating funds? State-specific late fee caps?)
15. **Maintenance workflow?** (Request intake, vendor assignment, work order tracking, habitability escalation — response time SLAs by issue type?)
16. **Tenant portal?** (Self-service rent payment, maintenance requests, document access — accessibility and mobile requirements?)

---

## Compliance

17. **Fair Housing review process?** (Search sorting, personalization, and neighborhood features reviewed for Fair Housing Act compliance before launch?)
18. **Data retention policy?** (Transaction documents, lease records, rental applications — retention schedule per document type and state requirements?)

---

## Conditional

### If investment / commercial real estate
19. **Financial modeling?** (Cap rate, NOI, cash-on-cash return, IRR calculations — which metrics must the system produce?)
20. **Portfolio management?** (Multi-property ownership tracking, consolidated reporting, waterfalls for syndicated deals?)

### If mortgage origination
21. **AUS integration?** (Fannie Mae DU, Freddie Mac LP — automated underwriting system integration required?)
22. **HMDA reporting?** (Demographic data collection and regulatory reporting required for HMDA compliance?)
