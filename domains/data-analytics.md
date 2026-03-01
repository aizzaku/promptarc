# Domain: Data & Analytics

## Context Primer

The central problem in data work is the gap between what data exists and what decisions it can reliably inform. Most organizations have more data than they can use, but the data is wrong, undocumented, inconsistent, or answering a different question than the one being asked. The first instinct of every data analyst should be skepticism — not toward the data itself, but toward the assumption that data means what it appears to mean. A query that returns numbers is not the same as a query that returns correct numbers.

Data work has quietly split into two disciplines. Analytics engineers build and maintain the data models that make clean data available to the organization — they're closer to software engineering (version control, testing, CI/CD). Data analysts consume those models to answer specific business questions — they're closer to domain experts who happen to write SQL. Conflating the two roles creates bad incentives: analysts who are constantly rebuilding foundations don't analyze, and engineers who are asked to just-answer-this-one-question don't build reliable systems.

The concept of metric trust is foundational and underappreciated. A metric that different stakeholders define differently — or that produces different numbers depending on how the query is written — destroys analytical credibility. Once stakeholders stop trusting the numbers, they stop using them. The solution is metric governance: explicit, written definitions that are enforced at the data model layer, not re-implemented in every ad-hoc query. Companies that succeed at this have a single source of truth for key metrics. Companies that fail at this have five definitions of "active user" and none of them are right.

## Common Patterns

- ELT over ETL: extract raw data into the warehouse first, transform it there — leverages warehouse compute, keeps raw data available
- Layered data modeling: staging (1:1 with source, clean and rename) → intermediate (business logic joins) → marts (aggregated, consumer-facing)
- Semantic layer: an abstraction between raw models and BI tools that defines metrics once and reuses them everywhere (dbt Metrics, Looker's LookML)
- Incremental models: only process new/changed records to reduce compute cost — requires reliable change data capture or `updated_at` timestamps
- Data contracts: explicit schema agreements between producers (application teams) and consumers (data teams) — prevents silent schema changes from breaking pipelines
- Observability monitoring: data quality checks that alert on row count drops, null rate increases, or value distribution shifts in production
- Cohort analysis as the default frame for retention, engagement, and LTV — aggregate metrics obscure cohort behavior

## Domain Vocabulary

- **Grain**: What one row in a table represents. "One row = one order line item" is a grain definition. Mismatched grains cause incorrect joins.
- **Cardinality**: The number of distinct values in a column, or the relationship ratio between joined tables (one-to-one, one-to-many, many-to-many).
- **SCD (Slowly Changing Dimension)**: A dimension whose attributes change over time. SCD Type 2 tracks history by adding new rows; SCD Type 1 overwrites.
- **Surrogate key**: A generated, meaningless identifier for a dimension record — distinct from the natural key from the source system.
- **Idempotent**: A transformation that produces the same result regardless of how many times it runs. Required for reliable pipelines.
- **dbt**: A SQL-based transformation framework that brings software engineering practices (testing, documentation, version control) to data modeling.
- **Fact table**: A table recording events or transactions at fine grain (orders, page views, payments). Contains measures and foreign keys to dimensions.
- **Dimension table**: A table describing entities (customers, products, channels) referenced by fact tables.
- **DAU/WAU/MAU**: Daily/Weekly/Monthly Active Users. The definition of "active" must be explicit — different products define it differently.
- **NRR (Net Revenue Retention)**: Revenue from a customer cohort at period end divided by period start. Above 100% means expansion exceeds churn.
- **p-value**: In experimentation, the probability of observing the measured effect (or larger) if the null hypothesis were true. Not the probability the hypothesis is true.
- **Confidence interval**: The range of values that likely contains the true population parameter. A 95% CI means: if you repeated the experiment 100 times, 95 of the intervals would contain the true value.

## Regulatory/Compliance

- GDPR and CCPA impose requirements on how personal data is stored, processed, and deleted. Data warehouses containing PII require documented retention policies and the ability to execute deletion requests (right to erasure).
- HIPAA applies to health data — even analytics pipelines that touch PHI must implement appropriate safeguards, audit logging, and access controls.
- SOC 2 audits require evidence of access controls, audit logs, and data handling procedures — data teams often own significant parts of this evidence.
- Financial data (revenue, transactions) may be subject to audit requirements — data pipelines producing financial reports must have documented methodology and change control.

## Common Pitfalls

- Mixing grain in a single model: joining a daily aggregate to a monthly aggregate and treating the result as valid
- Building dashboards before defining decisions: a dashboard no one acts on is expensive decoration
- P-hacking: running an A/B test until it reaches significance, then stopping — this inflates false positive rates
- Survivorship bias in cohort analysis: analyzing only retained customers instead of all customers from that cohort
- Confusing correlation with causation: a metric that moves with revenue is not necessarily a driver of revenue
- Underinvesting in data documentation: models without documentation become unmaintainable within months
- Trusting `COUNT(*)` without checking for duplicates: joined tables frequently produce fan-out that inflates row counts

## Quality Signals

- SQL queries have consistent formatting, explicit JOIN types, and aliased columns with meaningful names
- Models include `dbt` tests: `not_null`, `unique`, `accepted_values`, and relationship tests on foreign keys
- Metrics have written definitions with grain, numerator, denominator, and exclusion rules documented
- Dashboards include a last-refreshed timestamp and a link to the underlying model or query
- Analyses state assumptions explicitly and flag the sensitivity of conclusions to those assumptions
- A/B test results include confidence intervals, not just point estimates

## Anti-Patterns

- "Just pull the data": treating data requests as mechanical — the right response to "pull X metric" is to ask what decision it informs
- Rebuilding the same metric 5 different ways in different queries instead of centralizing the definition
- Dashboard proliferation: building new dashboards for every request instead of maintaining canonical ones
- Presenting sample sizes without context: "20% of users..." — 20% of how many? When? From what cohort?
- Trusting source data without validation: assuming the application database is the source of truth, when it often contains data entry errors, duplicates, or schema drift

## Recommended Stack/Tools

- **Warehouses**: BigQuery (Google Cloud, usage-based pricing), Snowflake (multi-cloud, separation of compute/storage), Redshift (AWS, strong for existing AWS shops), Databricks (large-scale / Spark workloads)
- **Transformation**: dbt Core (open source, runs anywhere) or dbt Cloud (managed, CI/CD built in)
- **Orchestration**: Airflow (flexible, complex), Dagster (data-aware, asset-based), Prefect (simpler than Airflow)
- **Ingestion/ETL**: Fivetran (managed, 300+ connectors), Airbyte (open source alternative), Stitch (simpler/cheaper)
- **BI**: Looker (LookML semantic layer, enterprise), Metabase (self-service, lower learning curve), Mode (analyst-focused, SQL-first), Hex (notebooks + dashboards)
- **Experimentation**: Optimizely, LaunchDarkly, or purpose-built internal systems backed by the warehouse
- **Data quality / observability**: Monte Carlo, Soda, or dbt tests + alerting
