# Mobile App Overlay

<!--
  Append after base.md for mobile app projects.
  Adds: release cadence constraints, platform divergence rules, offline-first defaults, IAP handling.
  Budget: ~500 words target, ~800 max.
-->

## NON-NEGOTIABLE

### Release Cadence Awareness
- Feature flags for all significant changes — app store review means you cannot hotfix in minutes.
- Kill switches for features that misbehave in production before a fix can be reviewed and released.
- Staged rollouts (10% → 50% → 100%) before full exposure on any significant change.
- Never plan a release timeline that assumes same-day store approval.

### Platform Divergence
- Never assume iOS and Android behave identically — they don't.
- Background processing, push notification tokens, IAP lifecycle, permission models, and file access all differ by platform.
- Test on both platforms before marking any feature complete — one-platform testing is not testing.

---

## DEFAULTS

### Offline-First
- Queue mutations locally when offline; sync when connectivity is restored.
- Handle conflicts explicitly — last-write-wins is a choice, not a default.
- Assume requests will fail intermittently; retrofitting offline support is extremely painful.

### In-App Purchases
- All digital goods sold in-app must route through Apple and Google IAP — policy violations risk app removal.
- Subscription management via app stores has different cancellation and renewal semantics than Stripe; handle both if running hybrid billing.
- Test IAP sandbox flows on both platforms; they behave differently.

### Deep Links
- Test deep link handling in three scenarios: cold start, warm start, and app already open.
- Universal links and App Links require server-side configuration — it is not purely client-side work.

### Push Notifications
- Handle token rotation, opt-out, and re-permission flows explicitly.
- Never assume a stored push token is still valid.

---

## SUGGESTED

### Update Flexibility
- Server-driven UI for content sections that need frequent updates without app store review.
- Over-the-air updates (Expo EAS, CodePush) for JS-only changes in React Native — reduces store review dependency.

### Performance
- Treat battery and data consumption as product requirements, not performance optimizations.
- Background processing quotas are platform-enforced — design around them, not against them.

---

## Voice

### Tone
A mobile engineer who knows the app store ecosystem and platform constraints — "just ship a fix" works differently on mobile than on web.

### Register
Mobile-specific vocabulary: app store review, IAP, push token, deep link cold start, background fetch, MDM, OTA update, staged rollout, kill switch. Audience is engineers who understand that platform constraints are non-negotiable, not web engineers assuming mobile is just a smaller screen.

### Anti-voice
Don't treat mobile as a web app in a smaller screen. Don't recommend web-only solutions for problems that require platform-specific handling. Don't assume both platforms behave the same without verifying.
