# Domain: Mobile App

## Context Primer

Mobile product development has two failure modes that don't exist in web: the release cycle tax and the platform authority problem. Every significant change requires an app store submission — typically 1-3 days for iOS, hours for Android — which means "we'll fix it in a hotpatch" isn't a reliable strategy. This changes the risk calculus for shipping. The second failure mode is that Apple and Google can reject your app, break it with an OS update, or remove it entirely. You are always a dependency on a platform you don't control.

The native vs. cross-platform decision is not primarily a technical one. React Native and Flutter have closed the performance gap for most apps — the real question is team composition and maintenance surface. Teams with strong web engineers and no native experience ship faster with React Native. Teams that need deep OS integration (Bluetooth, background processing, custom camera pipelines, system-level permissions) will eventually hit React Native's limits and need native bridges or platform-specific code anyway. Flutter produces more consistent UIs across platforms but requires learning Dart and doesn't leverage existing JS ecosystem knowledge.

The performance perception gap matters more on mobile than any benchmark. A 16ms frame drop on web is invisible. On mobile, users feel it as "jank" and associate it with low quality. This makes animation and scroll performance first-class engineering concerns, not polish.

## Common Patterns

- **Offline-first architecture**: Assume connectivity is unreliable. Local persistence (SQLite, Realm, MMKV) + sync layer is the correct default for data that users need to access.
- **Push notification architecture**: APNs (iOS) and FCM (Android) require server-side certificate management and per-device token tracking. Token rotation is a routine maintenance concern, not a one-time setup.
- **Deep linking**: Universal Links (iOS) and App Links (Android) require domain verification and careful routing. Deferred deep linking (sending a user to a specific post-install destination) requires a third-party service or custom solution.
- **In-app purchases**: Apple takes 15-30% and has strict rules about what can be sold outside IAP. If you're building a subscription business on iOS, this is a hard cost built into your unit economics.
- **Background processing**: iOS aggressively kills background apps. Background fetch, background tasks, and push-triggered background refresh all have different APIs, capabilities, and reliability profiles. Don't assume anything runs reliably in the background.
- **Crash reporting**: Unlike web, you won't see errors in a console. Crashlytics (Firebase) or Sentry's mobile SDK is table stakes — not optional instrumentation.

## Domain Vocabulary

- **APNs (Apple Push Notification service)**: Apple's push delivery infrastructure. Requires a certificate or token-based authentication registered with Apple.
- **FCM (Firebase Cloud Messaging)**: Google's cross-platform push infrastructure. The Android equivalent of APNs; also works on iOS as a wrapper.
- **Jank**: Perceptible frame drops causing stuttering animation or scroll. On mobile, 60fps is the expectation; drops below register immediately.
- **TestFlight / Internal Testing Track**: Apple and Google's beta distribution mechanisms. Required for pre-release distribution without App Store approval.
- **Keychain (iOS) / Keystore (Android)**: Secure storage provided by the OS for sensitive values like auth tokens. Never store tokens in plain local storage.
- **Cold start / warm start**: Cold start = app launched from scratch. Warm start = app resumed from background. Cold starts are measurably slower and are a common performance complaint.
- **Deferred deep link**: A link that routes a new user to specific in-app content after they install — requires tracking the link intent before the app exists on the device.
- **Universal Links / App Links**: Domain-verified URLs that open the app instead of the browser when the app is installed. More reliable than custom URL schemes (`myapp://`).
- **Background fetch**: iOS/Android API for periodically waking an app to fetch data. iOS limits frequency and can disable it if the app uses it inefficiently.
- **Haptic feedback**: Physical vibration through the device motor. Used to confirm actions and communicate state changes. iOS has a rich haptics API; Android is more variable by device.

## Regulatory/Compliance

- Apple App Store Review Guidelines prohibit certain content categories, competitor comparisons in screenshots, and apps that "duplicate" built-in iOS functionality without clear added value.
- COPPA applies if your app targets children under 13 — requires parental consent flows and restrictions on data collection.
- In-app purchase rules: digital goods and subscriptions must use Apple/Google IAP on their platforms. External payment links for digital goods are forbidden on iOS (with narrow exceptions post-litigation).
- GDPR/CCPA: Device identifiers (IDFA on iOS, GAID on Android) are considered personal data. iOS's App Tracking Transparency (ATT) framework requires explicit user opt-in before accessing IDFA.
- Health data (Apple HealthKit, Google Fit): requires specific entitlements, privacy policy language, and cannot be used for advertising.

## Common Pitfalls

- Assuming iOS and Android behave the same — they don't. Permission flows, background behavior, deep link handling, and system UI all differ in ways that require platform-specific code paths.
- Building for iPhone only during development and discovering Android layout/font/spacing bugs at release
- Ignoring app size — large bundles hurt install conversion, especially in lower-bandwidth markets
- Not handling token rotation for push notifications — stale tokens cause silent delivery failures
- Forgetting that App Store review can take 1-3 days — "we'll push a hotfix tonight" is not a viable incident response for iOS
- Building complex background sync logic that iOS kills under memory pressure
- Treating the simulator as equivalent to physical hardware — performance, camera, biometrics, Bluetooth, and haptics all behave differently on real devices

## Quality Signals

- Understands platform-specific UX conventions (bottom navigation on iOS vs. Android back gesture model)
- Can reason about release cycle constraints when planning feature rollouts
- Knows when to use platform-native components vs. custom implementations
- Aware that crash rates and ANR (App Not Responding) rates affect App Store rankings
- Distinguishes between client-side validation (UX) and server-side validation (security)

## Anti-Patterns

- Treating mobile as "just a smaller web browser" — ignores platform constraints and conventions
- Building offline support as an afterthought — requires rethinking data flow from the start
- Recommending real-time sync without addressing conflict resolution in poor connectivity
- Generic "use React Native" recommendations without discussing the team's native bridge capacity
- Ignoring the economics of Apple's 30% cut when modeling subscription pricing

## Recommended Stack/Tools

- **Cross-platform**: React Native (Expo for most projects; bare workflow for deep native access) or Flutter (better if no JS ecosystem dependency, need consistent UI)
- **Native iOS**: SwiftUI for new projects; UIKit still required for some advanced layouts and older OS targets
- **Native Android**: Jetpack Compose for new projects; View system still present in most production codebases
- **State management (RN)**: Zustand or Jotai for simple cases; Redux Toolkit when you need DevTools and time-travel debugging
- **Navigation (RN)**: React Navigation — the de facto standard; avoid reinventing routing
- **Local persistence**: MMKV for key-value (faster than AsyncStorage), SQLite via Drizzle/Expo SQLite for structured data
- **Push**: Firebase Cloud Messaging (unified Android/iOS delivery); Expo Notifications as an abstraction layer
- **Crash reporting**: Sentry mobile SDK or Firebase Crashlytics
- **OTA updates (RN)**: Expo Updates for JS bundle updates without App Store review; limited to JS layer changes
- **Analytics**: PostHog (self-hostable), Amplitude, or Mixpanel — all have mobile SDKs
