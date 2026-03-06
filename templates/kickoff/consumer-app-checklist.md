# Consumer App Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a consumer app project.

---

## Retention & Metrics

1. **Activation event defined?** (The specific in-app action that correlates with long-term retention — the "aha moment")
2. **D1/D7/D30 retention targets?** (What's the goal? What's the current baseline if an existing app?)
3. **Analytics platform?** (Amplitude | Mixpanel | PostHog | Firebase Analytics | None yet)
4. **Cohort analysis capability in place?** (Or tracking aggregate metrics only?)

---

## Growth & Acquisition

5. **Primary acquisition channel?** (Organic / ASO | Paid UA | Viral / word of mouth | Content / SEO | Influencer)
6. **Viral loop in the product?** (What built-in mechanism drives existing users to invite new users?)
7. **Referral program planned?** (Two-sided incentives — what's the reward for sender and receiver?)
8. **Post-ATT attribution?** (iOS tracking consent affects paid UA measurement — which attribution provider?)

---

## Monetization

9. **Monetization model?** (Subscription | In-app purchases | Advertising | Free | Freemium)
10. **Paywall placement?** (After activation — where exactly in the user journey, and what's the hypothesis?)
11. **Subscription management?** (RevenueCat | Native App Store / Play Billing | Stripe | None yet)
12. **LTV estimate at target scale?** (Rough LTV / CAC ratio — is paid acquisition viable?)

---

## Notifications & Engagement

13. **Push notification strategy?** (Segmented by behavior | Broadcast | Not yet planned)
14. **Notification categories and trigger conditions?** (What events trigger a notification, for which users, at what time?)
15. **Re-engagement campaign plan?** (How to win back lapsed users — email, push, or paid retargeting?)

---

## Onboarding

16. **Onboarding flow maps to activation event?** (Every step should move toward the aha moment)
17. **Permission request timing?** (Push/contacts/location requested after value delivered, not on first launch?)
18. **A/B testing infrastructure?** (Firebase Remote Config | Statsig | LaunchDarkly | None — how will onboarding be iterated?)

---

## Conditional

### If social / community features
19. **Cold start strategy for social features?** (How does the app work when a new user has no connections?)
20. **Content moderation plan?** (UGC requires moderation — human review, automated, or both?)

### If subscription model
21. **Free-to-paid conversion rate hypothesis?** (What percentage of free users are expected to convert, and why?)
22. **Churn reduction strategy?** (Win-back flows, cancellation surveys, pause option?)
