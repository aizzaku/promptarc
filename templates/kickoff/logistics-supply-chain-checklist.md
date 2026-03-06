# Logistics & Supply Chain Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a logistics or supply chain project.

---

## Operations Model

1. **What does this software manage?** (Order management | Warehouse / fulfillment | Transportation / carrier | Last-mile delivery | Supply chain visibility | Full-stack)
2. **Who operates it?** (Internal operations team | 3PL / carrier | Merchants / sellers | End customers)
3. **Physical goods type?** (Consumer products | Industrial / B2B | Perishables / food | Hazardous | Pharmaceutical | Mixed)
4. **Geographic scope?** (Domestic only | Cross-border / international — customs and compliance complexity increases significantly)

---

## Inventory

5. **Inventory dimensions tracked?** (Location | Quantity | Lot / batch | Expiration date | Condition — which are required?)
6. **Inventory rotation requirement?** (FIFO | FEFO (for expiring goods) | LIFO | None)
7. **Multi-location inventory?** (Multiple warehouses, stores, or fulfillment centers?)
8. **Demand forecasting and reorder points?** (Automated replenishment, or manual?)

---

## Fulfillment & Shipping

9. **Fulfillment model?** (In-house warehouse | 3PL outsourced | Dropship from supplier | Hybrid)
10. **Carrier integration?** (Which carriers — FedEx, UPS, USPS, DHL | API-first (EasyPost, Shippo) | Direct carrier contracts)
11. **Carrier rate shopping?** (Real-time rate comparison at checkout or at time of fulfillment?)
12. **Shipping SLA requirements?** (Same-day | Next-day | 2-day | Economy — what are the contractual commitments?)

---

## Integration

13. **EDI required?** (Large retail customers often mandate EDI — which transaction sets: 850, 856, 810?)
14. **ERP integration?** (NetSuite | SAP | Oracle — which systems must sync with this platform?)
15. **Track-and-trace sources?** (Carrier APIs | GPS hardware | Driver app | All three)

---

## Exception Handling

16. **Failed delivery handling?** (Re-delivery attempt | Customer notification | Return-to-sender — workflow defined?)
17. **Carrier failure handling?** (Missed pickup | Lost in transit | Damaged — how are these surfaced and resolved?)
18. **Inventory discrepancy resolution?** (System count vs. physical count doesn't match — what's the process?)

---

## Conditional

### If international / cross-border
19. **Customs documentation?** (HS codes, declared value, country of origin — who generates it, how is it validated?)
20. **Customs broker integration?** (Which broker, what API or EDI format?)
21. **Duties and taxes?** (DDP vs. DDU — who pays, how is it calculated and collected?)

### If last-mile delivery (own fleet)
22. **Route optimization?** (Routific | OptimoRoute | Google Routes API | Manual dispatch)
23. **Driver app?** (Custom or third-party — proof of delivery, signature capture, failed delivery reporting)
24. **ELD compliance?** (US HOS regulations for commercial drivers)
