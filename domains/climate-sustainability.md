# Domain: Climate & Sustainability

## Context Primer

Climate and sustainability software is at an early-market inflection point where voluntary corporate programs are transitioning to mandatory regulatory reporting. The domain spans three distinct buyer categories with different requirements: corporations managing ESG compliance and supply chain emissions; governments and utilities running grid infrastructure, carbon markets, and policy systems; and project developers measuring, verifying, and monetizing carbon reduction or removal.

The core technical challenge is measurement uncertainty. Unlike financial accounting where numbers are exact, emissions calculations are estimates derived from activity data (energy consumption, fuel use, supply chain inputs) multiplied by emission factors (published coefficients from EPA, IPCC, or proprietary databases). Every number in a sustainability report has an uncertainty band, and the methodology used to calculate it determines whether the number is defensible to auditors, regulators, or counterparties. Software that hides this uncertainty is building on a weak foundation.

Carbon markets add a crediting and verification layer: credits must be issued against a methodology (Verra VCS, Gold Standard, ACR), verified by an accredited third party, serialized to prevent double-counting, and tracked through retirement. This is a financial instrument workflow with registry integrations and chain-of-custody requirements.

## Common Patterns

- **Carbon accounting platform**: Collects activity data (energy bills, travel records, procurement data), applies emission factors by scope and category, and produces GHG inventory reports (GHG Protocol, ISO 14064).
- **Supply chain emissions (Scope 3)**: Engaging suppliers to collect Tier 1 and Tier 2 emissions data. Primary data collection is rare; most companies use spend-based or average-data approaches with known accuracy limitations.
- **ESG reporting**: Aggregating sustainability metrics across TCFD, GRI, SASB, and CDP frameworks for investor and regulatory disclosure. Different frameworks have different materiality assessments and data requirements.
- **Renewable energy certificate (REC) tracking**: Market-based accounting for renewable energy procurement. RECs must be matched to consumption period and geography to comply with energy attribute certificate standards.
- **Carbon credit marketplace**: Connecting project developers (supply) with corporate buyers (demand). Credits require methodology verification and registry serialization (Verra, Gold Standard).
- **Energy management system (EMS)**: Real-time monitoring of facility energy consumption, demand response optimization, and utility rate analysis. Often IoT-sensor-driven with time-series data infrastructure.
- **Climate risk modeling**: Physical risk assessment (flood, heat, water stress) and transition risk analysis for financial institutions, real estate portfolios, and infrastructure.

## Domain Vocabulary

- **Scope 1 / 2 / 3**: GHG Protocol emissions categorization. Scope 1: direct emissions from owned sources. Scope 2: purchased electricity and heat. Scope 3: value chain emissions (upstream suppliers, downstream product use).
- **GHG Protocol**: The dominant corporate greenhouse gas accounting standard, published by WRI and WBCSD. Defines Scope 1/2/3 categories and calculation methodologies.
- **Emission factor**: A coefficient translating an activity (1 kWh of electricity, 1 gallon of diesel) into CO2-equivalent emissions. Sourced from EPA, IPCC, ecoinvent, or energy supplier data.
- **CO2e (CO2 equivalent)**: Normalized unit for all greenhouse gases, converting CH4, N2O, and other gases to their CO2 warming equivalent using GWP (Global Warming Potential) factors.
- **Market-based vs. location-based**: Two methods for Scope 2 electricity accounting. Market-based uses energy attribute certificates (RECs/GOs); location-based uses grid average emission factors.
- **TCFD (Task Force on Climate-related Financial Disclosures)**: Framework for climate risk disclosure, now mandatory in many jurisdictions. Requires scenario analysis for physical and transition risks.
- **VCS (Verified Carbon Standard)**: Verra's flagship carbon crediting standard. Issued credits are Verified Carbon Units (VCUs) registered on the Verra registry.
- **MRV (Measurement, Reporting, Verification)**: The process for quantifying, reporting, and independently verifying emissions reductions or removals for carbon crediting.
- **Additionality**: Carbon market principle requiring that emission reductions would not have occurred without the carbon credit revenue — the counterfactual requirement.
- **Double counting**: The risk of the same emission reduction being claimed by multiple parties. Carbon registries use serial numbers and retirement records to prevent this.
- **SBTi (Science Based Targets initiative)**: Framework for corporate emissions reduction targets aligned with Paris Agreement pathways. Targets must be validated and publicly disclosed.
- **CBAM (Carbon Border Adjustment Mechanism)**: EU regulation imposing carbon costs on imports from countries with weaker carbon pricing. Requires embedded carbon data from suppliers.

## Regulatory/Compliance

- **SEC Climate Disclosure Rule**: Requires US public companies to disclose material climate risks and Scope 1/2 emissions (large accelerated filers), with Scope 3 if material.
- **EU CSRD (Corporate Sustainability Reporting Directive)**: Mandatory sustainability reporting for large EU companies and EU subsidiaries of global companies. Broader than SEC rule; covers social and governance topics.
- **CBAM (Carbon Border Adjustment Mechanism)**: EU carbon tariff on imports. Exporters to EU must calculate and report embedded emissions per product category.
- **California AB 1305 / SB 253 / SB 261**: State-level climate disclosure laws affecting companies doing business in California; SB 253 requires third-party verification of Scope 1/2/3 emissions.
- **ISO 14064**: International standard for GHG quantification and reporting at organizational and project levels. Basis for third-party verification.
- **CORSIA**: Carbon offsetting scheme for international aviation. Airlines must purchase eligible credits from specific approved registries.

## Common Pitfalls

- Treating emission factors as static — they are updated annually by EPA, IPCC, and grid operators; stale factors produce non-compliant reports
- Ignoring double counting risk in Scope 2 market-based accounting — RECs must be retired in the same period and geography as consumption
- Building carbon accounting without uncertainty quantification — every calculated number has an error range that auditors will ask about
- Scope 3 completeness theater — listing all 15 Scope 3 categories without actually having methodology for each creates audit risk
- Carbon credit quality undifferentiation — treating all credits as equivalent regardless of methodology, vintage, and permanence risk
- Hardcoding GWP (Global Warming Potential) values — IPCC updates these with each assessment report (AR4 → AR5 → AR6 have different values)

## Quality Signals

- Understands the difference between Scope 1, 2, and 3 and why Scope 3 is the hardest to measure
- Knows that emissions calculations are estimates with uncertainty, not exact figures
- Distinguishes between market-based and location-based Scope 2 accounting
- Understands carbon credit quality dimensions: methodology, vintage, additionality, permanence
- Designs data models that preserve the source activity data alongside calculated emissions (for restatement when factors are updated)

## Anti-Patterns

- Treating sustainability software as a simple data aggregation and reporting tool without understanding the accounting standards
- Hardcoding emission factors in application code instead of a versioned, updatable factor database
- Displaying carbon numbers without confidence intervals or methodology disclosure
- Building carbon offset functionality without registry integration for retirement verification

## Recommended Stack/Tools

- **Carbon accounting platforms**: Persefoni (enterprise), Watershed, Sweep, Greenly (SMB), Plan A (EU-focused)
- **Emission factor databases**: EPA eGRID (US electricity), ecoinvent (LCA database), DEFRA (UK), climatiq API (programmatic factor access)
- **Carbon registries**: Verra (VCS), Gold Standard, American Carbon Registry (ACR), Climate Action Reserve (CAR)
- **ESG reporting frameworks**: GRI Standards, SASB, TCFD, CDP (formerly Carbon Disclosure Project)
- **Energy data**: ENERGY STAR Portfolio Manager (buildings), Green Button (utility data API), EnergyHub (demand response)
- **Climate risk data**: Jupiter Intelligence, Climanomics (physical risk), MSCI Climate (transition risk)
- **IoT / energy monitoring**: InfluxDB or TimescaleDB (time-series), Siemens Desigo, Schneider EcoStruxure
- **Supply chain data collection**: Salesforce Net Zero Cloud (large enterprise), EcoVadis (supplier assessments)
