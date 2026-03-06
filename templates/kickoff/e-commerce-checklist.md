# E-Commerce Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies an e-commerce project.

---

## Business Model

1. **Business type?** (DTC brand | Marketplace seller | Multi-vendor platform | B2B wholesale)
2. **Product type?** (Physical goods | Digital goods | Services | Subscription boxes | Mixed)
3. **Recurring subscriptions or one-time purchase?** (Or both)
4. **Selling internationally?** (Multi-currency, tax, and shipping complexity increases significantly per country added)

---

## Inventory

5. **Inventory ownership model?** (In-house | Dropship | 3PL | Print-on-demand)
6. **Real-time inventory sync with warehouse or 3PL?** (Yes | Batch sync | Manual — what's the lag?)
7. **Oversell protection strategy?** (How are simultaneous purchases of the last unit in stock handled?)
8. **Variant complexity?** (Simple: size only | Multi-dimensional: size × color × material | No variants)

---

## Payments

9. **Payment processor?** (Stripe | Shopify Payments | PayPal | Adyen | Other)
10. **Subscriptions or recurring billing?** (Dunning, retry logic, and cancellation all need design)
11. **Buy-now-pay-later options?** (Affirm | Klarna | Afterpay | None)
12. **Fraud prevention?** (Processor-native | Signifyd | NoFraud | Manual review threshold)

---

## Tax & Compliance

13. **Tax calculation provider?** (Avalara | TaxJar | Platform-native | Manual — US has 12,000+ jurisdictions)
14. **International VAT/GST obligations?** (Which countries? Is the platform the deemed seller?)

---

## Catalog & Search

15. **Catalog size?** (Under 100 | 100s | 1,000s | 100,000+)
16. **Search: platform-native or dedicated?** (Algolia | Elasticsearch | Typesense | Platform default)

---

## Conditional

### If Shopify
17. **Customization scope?** (Theme only | Custom storefront (Hydrogen) | Private app | Shopify Functions)
18. **Shopify Plus needed?** (Required for checkout extensibility, B2B features, dedicated support)

### If headless / custom stack
19. **Storefront framework?** (Next.js | Remix | SvelteKit | Custom)
20. **Headless CMS for content?** (Contentful | Sanity | Prismic | None)

### If marketplace / multi-vendor
21. **Seller onboarding and payout model?** (Stripe Connect | Manual payouts | Platform-managed)
22. **Seller-specific tax reporting?** (1099-K obligations in the US for platforms with significant GMV)
