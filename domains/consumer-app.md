# Domain: Consumer Apps

## Context Primer

Consumer apps live and die by retention. Acquisition is expensive and competitive; the economics only work if users return. Day 1, Day 7, and Day 30 retention are the diagnostic metrics — a high Day 1 to Day 7 drop-off means the app isn't delivering value fast enough. A high Day 7 to Day 30 drop-off means the value isn't sticky enough to form a habit. These are different problems requiring different interventions.

The consumer market is winner-take-most in most categories. Network effects, habit formation, and switching costs determine who wins. This means growth loops matter more than features: a product that spreads through word of mouth or inherent virality has fundamentally better unit economics than one that relies solely on paid acquisition. Building a viral loop (social sharing, referrals, collaborative features) is a product and engineering decision, not a marketing one.

Push notifications are both the most powerful and most abused retention tool in consumer apps. Notification fatigue — sending too many irrelevant notifications — accelerates churn. The difference between a well-timed, contextual notification and spam is whether the app understands the user's context well enough to interrupt at the right moment. Permission rates and notification-to-engagement ratios are the leading indicators.

## Common Patterns

- **Growth loops**: Viral mechanisms embedded in the product — sharing, inviting, creating public content — that drive acquisition from existing users rather than paid channels.
- **Onboarding activation gate**: A defined activation event (the "aha moment") that new users must reach within the first session. Everything in onboarding is optimized toward this event.
- **Push notification segmentation**: Notifications segmented by behavior, lifecycle stage, and engagement level — not broadcast to all users.
- **Infinite scroll / feed algorithms**: Personalized content ranking to maximize session engagement. Requires content signals, user signals, and feedback loops.
- **Referral programs**: Incentivized sharing with two-sided rewards. Effective referral programs are built into product flows, not tacked on as a separate feature.
- **A/B testing infrastructure**: Feature flag system that enables rapid experimentation on onboarding, notification copy, paywall placement, and growth loops.
- **Cohort-based analytics**: Analyzing retention, engagement, and LTV by acquisition cohort rather than aggregate metrics.

## Domain Vocabulary

- **D1/D7/D30 retention**: The percentage of users who return to the app 1, 7, or 30 days after their first session. The primary health metrics for consumer apps.
- **Aha moment / activation event**: The specific in-app action that correlates with long-term retention. The goal of all onboarding.
- **DAU/MAU ratio**: Daily Active Users / Monthly Active Users. A stickiness metric. Above 0.5 indicates strong habit formation; below 0.2 indicates occasional use.
- **Viral coefficient (K factor)**: The average number of new users each existing user generates. K > 1 means exponential organic growth.
- **Push permission rate**: The percentage of users who allow push notifications. Declining permission = declining reach.
- **LTV (Lifetime Value)**: The predicted revenue from a user over their entire relationship with the product. The ceiling on sustainable CAC.
- **CAC (Customer Acquisition Cost)**: The total cost to acquire one new user. Sustainable only when LTV / CAC > 3.
- **Paywall placement**: Where in the user journey a subscription or payment is introduced. Too early kills conversion; too late means free users never convert.
- **Churn**: The rate at which users stop using the app. Voluntary churn (lost interest) differs from involuntary (payment failure, app deletion).

## Regulatory/Compliance

- **COPPA**: US law requiring parental consent for data collection from users under 13. Age verification required; app stores enforce this for apps in the "Kids" category.
- **GDPR / CCPA**: Data subject rights (access, deletion, portability) must be implementable for consumer apps with EU or California users.
- **Apple ATT (App Tracking Transparency)**: iOS 14+ requires user opt-in for cross-app tracking (IDFA). Affects paid acquisition measurement significantly.
- **CCPA / opt-out requirements**: California users must be able to opt out of data sale. Required for apps with significant California user base.
- **Children's privacy**: Beyond COPPA, several states have enacted additional children's privacy laws. Apps that could attract underage users must assess applicability.

## Common Pitfalls

- Optimizing for DAU instead of retention — DAU inflated by re-acquisition hides churn
- Building features instead of fixing the activation funnel — more features don't help if users don't reach the aha moment
- Push notification abuse — high volume, low relevance notifications train users to disable them or uninstall
- Ignoring cohort analysis — aggregate metrics hide the fact that recent cohorts retain worse than older ones
- Paywalls placed before activation — users haven't experienced value and have no reason to pay
- Measuring DAU/MAU without context — a news app at 0.2 may be healthy; a messaging app at 0.2 is failing
- A/B testing without statistical significance — shipping winners based on insufficient data

## Quality Signals

- Defines the activation event before designing onboarding
- Thinks in retention cohorts, not aggregate engagement metrics
- Can reason about viral coefficient and what product changes would move it
- Treats push notification strategy as a product decision, not a growth hack
- Knows that a DAU/MAU ratio means different things in different app categories
- Designs paywalls with specific conversion hypotheses, not just "put it somewhere"

## Anti-Patterns

- Feature roadmaps disconnected from retention data
- "We'll figure out monetization later" with no plan for what later means
- Sending the same push notification to all users regardless of behavior or lifecycle stage
- Treating app reviews as vanity — they directly affect App Store and Play Store discoverability

## Recommended Stack/Tools

- **Analytics**: Amplitude (product analytics, cohort analysis), Mixpanel (event-based), PostHog (open source), Firebase Analytics (free, Google-integrated)
- **A/B testing**: Firebase Remote Config (simple), Statsig (product-grade experimentation), LaunchDarkly (feature flags + experiments)
- **Push notifications**: OneSignal (multi-platform, generous free tier), Braze (enterprise, sophisticated segmentation), Firebase Cloud Messaging (free, basic)
- **Attribution**: AppsFlyer, Adjust, Branch (paid acquisition measurement post-ATT)
- **Crash reporting**: Firebase Crashlytics, Sentry
- **Subscriptions**: RevenueCat (cross-platform subscription management, receipt validation), raw App Store / Play Billing APIs
- **Reviews / ratings**: Appbot (review aggregation and analysis), native App Store Connect analytics
