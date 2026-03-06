# Domain: Logistics & Supply Chain

## Context Primer

Logistics is a coordination problem at physical scale. Unlike software systems, logistics operations involve physical objects, time-sensitive movements, and human execution — and the cost of software errors is measured in missed deliveries, stranded inventory, and customer churn, not just failed requests. The software model must account for the gap between what the system says should happen and what actually happens in a warehouse or on a delivery route.

Real-time visibility is the core value proposition of modern logistics software. The question "where is my shipment?" is not a simple database lookup — it requires integrating with carrier APIs, IoT tracking devices, EDI messages from freight forwarders, and driver apps, all with different latency and reliability characteristics. The challenge is reconciling multiple sources of truth into a coherent picture of physical reality, knowing that physical reality is often ahead of the data.

Logistics operates in a world of external constraints: carrier API rate limits, customs clearance delays, border regulations, dimensional weight pricing, and weather. Systems that assume controllable outcomes fail when carriers miss pickups or customs holds shipments. The operational model must be built for exception handling and rerouting, not just the happy path.

## Common Patterns

- **Order management system (OMS)**: The system of record for orders, their fulfillment status, and their history. Multiple downstream systems (WMS, TMS, carrier APIs) take direction from the OMS.
- **Warehouse management system (WMS)**: Manages physical inventory location, pick/pack/ship workflows, and labor within a warehouse.
- **Transportation management system (TMS)**: Plans and executes shipments — carrier selection, rate shopping, booking, tracking, and freight audit.
- **EDI (Electronic Data Interchange)**: The legacy standard for B2B logistics data exchange. Large retailers require EDI compliance (X12 810, 856, 850) for vendor integration.
- **Last-mile routing optimization**: Algorithm-driven delivery route planning that minimizes cost (distance, time, fuel) subject to time window, capacity, and vehicle constraints.
- **Track-and-trace**: Real-time visibility into shipment location from carrier APIs, GPS devices, and status webhooks.
- **Inventory allocation**: The logic that assigns available inventory to orders — FIFO, FEFO (expiration dates), zone-specific allocation, demand forecasting.

## Domain Vocabulary

- **SKU (Stock Keeping Unit)**: A unique identifier for a product variant. The atomic unit of inventory.
- **WMS (Warehouse Management System)**: Software that manages inventory, picking, packing, and shipping within a warehouse.
- **TMS (Transportation Management System)**: Software that manages carrier selection, shipment booking, tracking, and freight billing.
- **OMS (Order Management System)**: Software that manages order lifecycle from creation through fulfillment.
- **EDI (Electronic Data Interchange)**: Structured data exchange between trading partners using standardized formats (X12, EDIFACT). Required for many retail and B2B logistics relationships.
- **3PL (Third-Party Logistics)**: An outsourced logistics provider handling warehousing, fulfillment, or transportation on behalf of a shipper.
- **Last mile**: The final delivery leg from a distribution facility to the end recipient. The most expensive and complex leg per unit.
- **Dimensional weight (DIM weight)**: A pricing method that charges for the space a package occupies rather than its actual weight, when DIM weight exceeds actual weight.
- **SLA (Shipping SLA)**: Committed delivery timeframe. Missing shipping SLAs at scale has contractual and reputational consequences.
- **FIFO / FEFO**: First-In-First-Out / First-Expired-First-Out. Inventory rotation strategies. FEFO critical for perishable or expiring goods.
- **Carrier rate shopping**: Comparing rates across multiple carriers in real time to select the optimal service for a given shipment's cost and SLA requirements.

## Regulatory/Compliance

- **Customs and import/export regulations**: Cross-border shipments require customs declarations (HS codes, declared value, country of origin). Inaccurate declarations cause delays and fines.
- **Hazardous materials (HazMat)**: Shipping regulated materials requires IATA (air), IMDG (sea), or DOT (ground) compliance — specific packaging, labeling, and documentation.
- **Food safety (FSMA)**: US Food Safety Modernization Act requires traceability for food products. FSMA 204 mandates specific traceability records for high-risk foods.
- **Pharmaceutical supply chain**: FDA Drug Supply Chain Security Act (DSCSA) requires unit-level serialization and traceability for pharmaceutical products.
- **Driver regulations (ELD)**: US trucking requires Electronic Logging Devices for HOS (hours of service) compliance. Software integrating with fleets must be ELD-aware.

## Common Pitfalls

- Modeling inventory as a simple count instead of tracking location, condition, lot, and expiration
- Assuming carrier API responses are the ground truth — carrier data lags physical reality
- EDI integrations underestimated in timeline — EDI is complex, retailer-specific, and requires certification
- Last-mile routing that doesn't handle failed delivery attempts, re-delivery, and return-to-sender flows
- No exception handling workflow for missed pickups, late shipments, and carrier failures — the happy path is not the common path in logistics
- Shipping SLA commitments without real-time carrier capacity checks — SLAs can't be honored if carrier capacity is unavailable
- Inventory allocation logic that doesn't account for safety stock and reorder points

## Quality Signals

- Understands the gap between system state and physical reality in logistics
- Designs exception workflows as prominently as happy path workflows
- Knows when EDI is required and what the integration complexity entails
- Treats inventory as location × quantity × condition × lot × expiration, not just a count
- Can reason about carrier rate shopping and what tradeoffs determine carrier selection

## Anti-Patterns

- Treating logistics as a CRUD app for shipments and inventory counts
- Assuming real-time carrier data reflects physical reality with no lag
- Building last-mile routing without modeling failed delivery and re-delivery
- Ignoring EDI requirements until a large retail customer mandates it at the last minute

## Recommended Stack/Tools

- **OMS**: Shopify (for DTC), NetSuite (ERP-embedded), Extensiv (3PL-focused), custom-built for complex workflows
- **WMS**: Manhattan Associates (enterprise), Blue Yonder, Infoplus, Extensiv WMS, or custom
- **TMS**: Project44 (visibility), FourKites, EasyPost (API-first carrier integration), Shippo, Shipstation
- **EDI**: SPS Commerce (managed EDI), TrueCommerce, Boomi (integration platform with EDI connectors)
- **Routing optimization**: Google Maps Platform (Distance Matrix + Routes API), HERE, Routific, OptimoRoute
- **Real-time tracking**: Project44, FourKites, AfterShip (customer-facing tracking)
- **Time-series / event store**: Apache Kafka (event streaming for shipment events), PostgreSQL with JSONB for flexible event schema
