# Domain: E-Commerce

## Context Primer
E-commerce is a margin compression business masquerading as a technology business. The product experience matters, but the actual levers are unit economics: contribution margin per order, customer acquisition cost, return rate, and repeat purchase rate. A DTC brand with a 15% net margin can be destroyed by a 5-point increase in return rates or a Facebook CPM spike. This makes every technical decision — from page load time to checkout flow to returns portal design — an economics decision with measurable P&L impact.

The DTC (direct-to-consumer) model has been under pressure since 2021 as paid acquisition costs rose and platform dependency became existential. Brands that survived shifted toward owned channels (email, SMS, loyalty programs) and multi-channel distribution (Shopify + Amazon + wholesale). The "pure DTC" model — acquire via paid social, sell on your own Shopify store — now requires either very strong brand differentiation or LTV that justifies high CAC. Most mature brands are omnichannel, and the complexity of inventory and fulfillment across channels is where most operational problems live.

Conversion rate optimization (CRO) in e-commerce is highly empirical — the difference between a 2.5% and 3.2% conversion rate on meaningful traffic is significant revenue, and it's driven by small, specific changes to product pages, checkout flows, trust signals, and pricing presentation. AI-generated advice about "improving conversion" without data is worthless here. The standard toolkit is A/B testing frameworks, session recording, and checkout funnel analytics, and the interventions are usually boring: faster load times, fewer checkout steps, better product photography, clearer return policies.

## Common Patterns
- Shopify as the commerce engine for most brands under $50M GMV; BigCommerce or custom platforms (Medusa, Commerce.js) for specific needs
- Headless commerce architecture for performance-sensitive or heavily customized storefronts — Shopify backend, custom frontend
- 3PL (third-party logistics) for fulfillment once volume exceeds self-fulfillment capacity
- Email/SMS flows: welcome series, abandoned cart, post-purchase, winback — these are the retention engine
- Product catalog with variant management: each SKU combination (size x color) is a distinct inventory unit
- Inventory buffers by channel: don't promise the same unit to Shopify and Amazon simultaneously
- Subscription products (consumables, replenishment) handled separately — different billing, fulfillment, and churn mechanics
- Reviews and UGC integrated into product pages — critical trust signal, directly correlated with conversion

## Domain Vocabulary
- **GMV (Gross Merchandise Value)**: Total transaction value processed. Revenue net of returns and marketplace fees is lower.
- **AOV (Average Order Value)**: GMV divided by order count. Raising AOV through bundles or upsells improves contribution margin per shipping unit.
- **Contribution Margin**: Revenue minus variable costs (COGS, fulfillment, payment processing, returns). The actual profitability metric per order.
- **ROAS (Return on Ad Spend)**: Revenue generated per dollar of advertising spend. A 3x ROAS means $3 revenue per $1 ad spend — whether that's profitable depends on gross margin.
- **LTV (Lifetime Value)**: Total revenue (or margin) expected from a customer across all purchases. LTV/CAC ratio is the unit economics health check.
- **SKU (Stock Keeping Unit)**: Unique identifier for a specific product variant. A shirt in size M/blue is a different SKU from M/red.
- **3PL (Third-Party Logistics)**: Warehouse and fulfillment provider. Brands ship inventory to 3PL; 3PL picks/packs/ships orders.
- **Return Rate**: Percentage of items returned. High return rates (>25%) in apparel destroy margins; anything causing inflated returns is a critical problem.
- **Cart Abandonment Rate**: Percentage of users who add to cart but don't purchase. Industry average ~70%. Recovery via email/SMS is a key revenue lever.
- **CRO (Conversion Rate Optimization)**: Systematic process of increasing the percentage of visitors who purchase.
- **Headless Commerce**: Architecture where the storefront (frontend) is decoupled from the commerce engine (cart, inventory, checkout backend).
- **DTC (Direct-to-Consumer)**: Brand selling directly to customers, bypassing wholesale or retail intermediaries.

## Regulatory/Compliance
- Sales tax nexus rules vary by state — economic nexus thresholds (typically $100K or 200 transactions) trigger collection obligations. Most brands use TaxJar or Avalara.
- COPPA applies if any marketing or product targets under-13s.
- CAN-SPAM and TCPA govern email and SMS marketing respectively — consent mechanics matter, especially for SMS.
- California Prop 65 requires warnings on products sold in California containing certain chemicals.
- Product liability exposure for physical goods — particularly relevant for food, supplements, children's products, and electronics.
- GDPR/CCPA for customer data; cookie consent banners are legally required for EU visitors.

## Common Pitfalls
- Optimizing for conversion rate without considering return rate — a confusing product page might suppress returns even if it reduces conversion
- Ignoring fulfillment SLAs when designing feature launches — a viral product drop that overwhelms 3PL capacity destroys the customer experience
- Treating all traffic sources as equivalent in analytics — paid social, organic search, and email have different intent and conversion behavior
- Building inventory management as a simple count — multi-channel overselling, reserved quantities, and backorders require more structure
- Underweighting page performance — each 100ms of load time has measurable conversion impact, especially on mobile
- Designing checkout without considering mobile — majority of traffic is mobile; desktop-optimized checkout is a conversion killer
- Recommending "just use Shopify" for marketplaces or B2B commerce scenarios where it's the wrong tool

## Quality Signals
- Talks about contribution margin per order, not just revenue or gross margin
- Understands that email/SMS flows are the highest-ROI retention tool, not loyalty points programs
- Knows that return rate is a margin problem before it's a logistics problem
- Can reason about inventory allocation across channels
- Distinguishes between new customer economics (high CAC, uncertain LTV) and repeat customer economics
- Knows that A/B test significance requires sample sizes most small brands don't have — understands when to trust data vs. intuition

## Anti-Patterns
- Generic "improve your checkout" advice without specific, testable changes
- Recommending loyalty programs as the primary retention strategy (email/SMS win on ROI for most brands)
- Treating Shopify as a one-size-fits-all solution for B2B, marketplace, or high-SKU catalog businesses
- Ignoring mobile-first design in any customer-facing feature
- Suggesting custom-built inventory management before exhausting Shopify's native tools or established alternatives

## Recommended Stack/Tools
- **Commerce Platform**: Shopify (most brands); Medusa or Commerce.js for custom/headless needs; BigCommerce for B2B edge cases
- **Email/SMS**: Klaviyo is the standard for DTC — deep Shopify integration, flow builder, segmentation
- **Analytics**: Triple Whale or Northbeam for multi-touch attribution; GA4 + Shopify Analytics for baseline
- **CRO**: Hotjar for session recording; VWO or Optimizely for A/B testing; Checkout extensions for Shopify checkout optimization
- **Search**: Algolia for faceted search on large catalogs; Searchie or Boost Commerce for Shopify-native
- **Reviews**: Okendo or Yotpo for reviews + UGC — both integrate tightly with Shopify
- **Tax**: TaxJar or Avalara for automated nexus tracking and filing
- **Returns**: Loop Returns for Shopify; saves CS time and converts returns to exchanges
