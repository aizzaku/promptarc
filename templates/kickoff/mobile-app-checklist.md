# Mobile App Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a mobile app project.

---

## Platform

1. **Target platform?** (iOS only | Android only | Both | Cross-platform: React Native | Flutter | other)
2. **If both: shared codebase or separate native apps?**
3. **Minimum OS versions?** (Determines API availability and what percentage of devices you support)

---

## Distribution & Updates

4. **Distribution channel?** (App stores only | Enterprise / MDM | Both)
5. **Release cadence expectation?** (How often are you planning to ship? Weekly? Monthly?)
6. **Feature flag and kill switch strategy for production issues?** (What's the plan when something breaks after store approval?)

---

## Revenue & Monetization

7. **In-app purchases or subscriptions?** (Digital goods sold in-app must route through app stores — Apple/Google policy)
8. **Subscription management: app store native or external billing (Stripe)?** (Or hybrid?)
9. **Monetization model?** (Free | Free with ads | Freemium | Paid up front)

---

## Data & Offline

10. **Offline functionality required?** (What must work without network access?)
11. **Local storage strategy?** (SQLite | Realm | Core Data | AsyncStorage | Pure server-side)
12. **Sync conflict resolution needed?** (What happens when offline changes conflict with server state?)

---

## Platform Features

13. **Push notifications needed?** (Local | Remote | Both)
14. **Background processing needed?** (Location tracking | Background sync | Processing — platform limits apply)
15. **Deep links or universal links?** (Cold start, warm start, and already-open scenarios all need testing)
16. **Sensitive permissions needed?** (Camera | Microphone | Contacts | Location — which and why)

---

## Conditional

### If React Native or Flutter
17. **OTA update strategy?** (Expo EAS | CodePush | None — for JS-only hotfixes between store releases)
18. **Native modules needed?** (Which platform-specific APIs require native bridging beyond the framework?)

### If existing web product being mobilized
19. **Shared backend or mobile-specific API layer?**
20. **Feature scope: full parity with web, or mobile-first subset?**
