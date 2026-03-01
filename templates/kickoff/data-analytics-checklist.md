# Data & Analytics Kickoff Checklist

Run after universal checklist Phase 1. Ask 3 questions at a time.

---

## Required

### Role & Output

1. **What role is doing this work?**
   - Data analyst (SQL, dashboards, ad-hoc analysis)
   - Analytics engineer (dbt, data modeling, warehouse)
   - Data engineer (pipelines, ingestion, orchestration)
   - Data scientist (modeling, experimentation, ML)
   - BI developer (Looker, Tableau, Power BI)

2. **What's the primary deliverable?**
   - Dashboard / report (recurring)
   - Ad-hoc analysis (one-off)
   - Data model / dbt project
   - Pipeline / ETL
   - A/B test design and analysis
   - Metric definition

3. **Who consumes the output?**
   - Technical team (engineers, analysts)
   - Business stakeholders (product, marketing, ops)
   - Executives / board
   - External (customers, partners)
   - Mixed — specify

---

### Stack & Scale

4. **What's the data warehouse / database?**
   - BigQuery
   - Snowflake
   - Redshift
   - Postgres / MySQL (not a warehouse, but...)
   - Databricks
   - Multiple / unknown

5. **What's the approximate data scale?**
   - < 1M rows in the relevant tables
   - 1M–100M rows
   - 100M–10B rows
   - Petabyte scale / streaming
   - Unknown

6. **What transformation tooling is in use?**
   - dbt (Core / Cloud)
   - Custom SQL scripts
   - Spark / PySpark
   - Python (pandas, polars)
   - None — raw SQL queries

---

### Data Quality & Context

7. **How well-documented is the source data?**
   - Well-documented (data catalog, field-level docs, owner known)
   - Partially documented (some tables known, others opaque)
   - Poorly documented (have to reverse-engineer meaning)
   - Unknown — first exploration

8. **Are there known data quality issues?**
   - Yes — describe them
   - Unknown — validation is part of this work
   - No known issues

9. **What BI / visualization tool is used?**
   - Looker (LookML)
   - Tableau
   - Power BI
   - Metabase
   - Mode / Hex / Observable
   - Custom (React, etc.)
   - None — raw output only

---

## Conditional

### If dashboard / reporting

10. **What's the refresh cadence?**
    - Real-time / near real-time (< 5 min)
    - Hourly
    - Daily
    - Weekly / on demand

11. **What decisions should this dashboard inform?** (If no decision is attached, the dashboard won't get used.)

12. **What metrics already exist that this must be consistent with?** (Inconsistent metric definitions are the #1 cause of data distrust.)

---

### If data modeling / dbt

13. **What modeling layer convention is in use?**
    - Staging → Intermediate → Marts (standard dbt)
    - Star schema (facts and dims)
    - Data vault
    - No convention — new project

14. **What's the grain of the primary model?** (One row = one what, at what timestamp?)

15. **What existing models does this build on or replace?**

---

### If A/B testing / experimentation

16. **What's the experimentation platform?** (Optimizely, LaunchDarkly, internal, none)

17. **What's the minimum detectable effect?** (Or: what size difference actually matters for the business decision?)

18. **What's the expected traffic / sample size?** (Determines how long the test needs to run.)
