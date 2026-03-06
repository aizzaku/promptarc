# Domain: Real Estate & Proptech

## Context Primer

Real estate software operates where legal documents, regulated financial transactions, and physical property intersect. Unlike most software categories, a single real estate transaction involves 5-15 distinct parties (buyer, seller, agents, lender, title company, escrow, inspectors, attorneys) each with different data access rights and workflow dependencies. State-by-state variation in real estate law means that what's a standard form in California is legally meaningless in Texas — software that assumes uniformity will fail at expansion.

The core value tension in proptech is data freshness vs. authoritative source. MLS data (the source of truth for listings) is licensed, fragmented across 600+ regional MLSs, and available through aggregators (RETS, RESO Web API) with varying update latency. Consumer-facing portals (Zillow, Redfin) have trained users to expect near-real-time listing data, but the underlying MLS infrastructure was designed for agent-to-agent exchange, not consumer streaming.

Property management software combines the compliance complexity of tenant-landlord law (which varies dramatically by state and city) with the operational complexity of maintenance workflows, unit turn scheduling, and vendor coordination. Rent payment processing is regulated in many jurisdictions — security deposit handling has specific accounting requirements, and late fees have statutory caps.

## Common Patterns

- **MLS integration**: Fetching listing data via RETS or RESO Web API from regional MLS systems. Normalization of address formats, property types, and status codes across providers is a significant data engineering challenge.
- **Property search and filtering**: Geospatial queries (within radius, within polygon/school district/neighborhood), faceted filtering on property attributes, and saved search with new-match alerting.
- **Transaction coordination**: Workflow tool for managing the 30-60 day process from accepted offer to closing — document collection, contingency deadlines, title search, escrow, and closing disclosure.
- **CRM for agents**: Contact and lead management, activity tracking, drip campaigns, and referral network management specific to the long-cycle, relationship-driven real estate sales process.
- **Property management (PM)**: Lease management, rent collection, maintenance request workflow, unit inspection, and vendor payment for residential or commercial landlords.
- **Mortgage origination (LOS)**: Loan application, document collection (1003 form), underwriting workflow, automated underwriting system (AUS) integration (Fannie/Freddie), and compliance (TRID disclosures).
- **Title and escrow**: Document management, lien search, commitment issuance, and closing coordination. Highly regulated, state-specific workflow.

## Domain Vocabulary

- **MLS (Multiple Listing Service)**: Regional database of property listings maintained by NAR-affiliated associations. The authoritative source of listing data; access requires licensed agent membership.
- **RESO (Real Estate Standards Organization)**: Standards body defining the RESO Web API and data dictionary for interoperability between MLS systems.
- **IDX (Internet Data Exchange)**: MLS policy allowing brokers to display each other's listings on their websites. Governs how listing data can be shown to consumers.
- **Cap rate**: Capitalization rate — net operating income ÷ property value. Primary valuation metric for income-producing properties.
- **NOI (Net Operating Income)**: Gross rental income minus operating expenses (excluding debt service). Core financial metric in commercial real estate.
- **1031 exchange**: Tax-deferral strategy allowing investors to defer capital gains by reinvesting proceeds into a "like-kind" property within strict timelines.
- **TRID (TILA-RESPA Integrated Disclosure)**: Federal regulation requiring Loan Estimate and Closing Disclosure forms with specific timing and content requirements. Non-compliance is a major lender liability.
- **AVM (Automated Valuation Model)**: Algorithm-based property value estimate (e.g., Zestimate). Not legally equivalent to an appraisal but used for underwriting pre-qualification.
- **LTV (Loan-to-Value)**: Loan amount ÷ property value. Core underwriting metric.
- **Escrow**: Third-party holding of funds and documents during a transaction. Regulated differently by state — some states use escrow companies, others use attorneys.
- **Title insurance**: Insurance protecting against defects in property title (unknown liens, ownership disputes). Required by most lenders.
- **CAP (Common Area Maintenance)**: In commercial leases, additional charges for shared building expenses passed through to tenants.

## Regulatory/Compliance

- **Fair Housing Act**: Prohibits discrimination in housing based on protected classes. Search result ordering, ad targeting, and "neighborhood quality" features require careful review.
- **RESPA (Real Estate Settlement Procedures Act)**: Prohibits kickbacks in settlement services. Referral relationships between agents, title companies, and lenders are regulated.
- **TRID (TILA-RESPA Integrated Disclosure)**: Loan Estimate must be delivered within 3 business days of application; Closing Disclosure 3 business days before closing. Timing violations trigger liability.
- **HMDA (Home Mortgage Disclosure Act)**: Lenders must report demographic data on loan applicants to identify discriminatory patterns. Loan origination software must collect and report HMDA data.
- **State landlord-tenant laws**: Security deposit limits, return timelines, habitability standards, and eviction procedures vary significantly by state and city. Software that standardizes across jurisdictions will violate local law.
- **AML / BSA**: Real estate is a known money laundering vector. FinCEN Geographic Targeting Orders require identification of beneficial owners in all-cash transactions above thresholds in target metros.

## Common Pitfalls

- Assuming MLS data is real-time — RETS polling and RESO webhooks both have latency; showing stale listing status (active vs. pending vs. sold) damages user trust
- Building address-matching without understanding that address normalization is a solved but complex problem (use USPS or a dedicated geocoding API, not regex)
- Ignoring Fair Housing implications of personalization features — recommending "similar neighborhoods" can encode demographic discrimination
- Treating rent collection as a simple payment — security deposits require separate accounting, and many jurisdictions require interest-bearing escrow accounts
- Underestimating state-by-state variance in forms and workflows — a transaction workflow that works in California may be legally incorrect in New York
- Skipping TRID timing enforcement in mortgage software — the 3-day disclosure windows are not soft guidelines

## Quality Signals

- Knows that MLS is fragmented and regional, not a single national data source
- Understands that transaction workflows are legally time-bound with statutory deadlines
- Treats property addresses as structured data requiring normalization, not free-form strings
- Knows the Fair Housing implications of personalization and sorting algorithms
- Designs rent accounting to separate security deposits from operating funds

## Anti-Patterns

- Treating real estate as a simple listings CRUD app — the transaction lifecycle and regulatory layer make it far more complex
- Building a single national property database without accounting for MLS data licensing and regional authority
- Ignoring state-specific forms — using generic templates for legally mandated disclosure forms
- Assuming property valuations (AVMs) are equivalent to appraisals for underwriting purposes

## Recommended Stack/Tools

- **MLS data**: RETS (legacy), RESO Web API (modern), Spark Platform, Trestle (aggregators)
- **Property data enrichment**: ATTOM Data, CoreLogic, First American (property characteristics, tax assessments, ownership history)
- **Geocoding / address normalization**: Google Maps Geocoding API, SmartyStreets, USPS Address Verification
- **Geospatial**: PostGIS, Mapbox (neighborhood polygons, school district boundaries), Google Maps Platform
- **Mortgage LOS**: Encompass (enterprise), BytePro, SimpleNexus (point-of-sale)
- **AVM**: ATTOM AVM, Quantarium, HouseCanary
- **Property management**: Yardi (enterprise), AppFolio, Buildium (SMB), RentManager
- **Payments (rent)**: Stripe (with careful state compliance review), PayNearMe (cash pay), Dwolla (ACH)
- **E-signature / document management**: DocuSign (dominant in real estate), SkySlope, Dotloop
