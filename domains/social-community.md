# Domain: Social & Community Platforms

## Context Primer

Social platforms have a unique cold start problem: a social network with no users is worthless to each individual user. The chicken-and-egg problem of social — supply and demand are the same users — requires a bootstrapping strategy before any growth loop can activate. The successful approaches concentrate on a specific community (geographic, interest-based, professional), provide value before network effects kick in (tools, content, information), or import an existing social graph (via phone contacts, Twitter OAuth, etc.).

Content moderation is an existential operational challenge, not a product feature. Platforms that scale UGC without investment in trust and safety face regulatory risk (EU DSA, potential US liability reform), reputational damage, and advertiser pressure. The economics of moderation at scale require automation — human review alone cannot keep up. But automated moderation over-blocks legitimate content and under-blocks sophisticated bad actors. The combination of automated filtering, user reporting, and human review is the operational standard.

Network effects create winner-take-most dynamics in most social categories, but also create defensibility once established. The goal is to reach a liquidity threshold in a specific community where the network is valuable enough that leaving has real cost. This is why niche communities often outperform broad horizontal platforms for early-stage products — liquidity is achievable, and the community is more defensible.

## Common Patterns

- **Feed algorithm**: Personalized content ranking based on engagement signals, recency, social graph proximity, and content quality. The algorithm determines what users see and shapes the platform's culture.
- **Social graph / interest graph**: Connections between users (social graph) or connections between users and topics/content (interest graph). Most platforms use both.
- **Notification system**: Activity notifications (likes, comments, follows) and content notifications (new posts from followed accounts). High volume, time-sensitive, requires fan-out architecture.
- **Fan-out on write vs. read**: For feeds, precompute and write to follower feeds on post creation (fan-out on write, fast reads, expensive for high-follower accounts) or compute on read (fan-out on read, slower, scales better for celebrities).
- **UGC moderation pipeline**: Automated content classifiers → user reporting queue → human review → appeals process.
- **Verified accounts / credibility signals**: Trust signals (checkmarks, follower counts, engagement rates) that help users assess content credibility.
- **Creator monetization**: Subscriptions, tips, paid communities, sponsored content, ad revenue share — the mechanisms that keep creators on the platform.

## Domain Vocabulary

- **DAU/MAU ratio**: Stickiness metric. Above 0.5 is strong; below 0.2 suggests occasional or seasonal use.
- **Feed**: The stream of content shown to a user. Algorithmic (personalized ranking) or chronological (time-ordered).
- **Fan-out**: The process of distributing a new post to all followers' feeds. A celebrity with 10M followers creates a massive fan-out event.
- **Social graph**: The network of connections between users (follows, friends, connections).
- **Network effect**: The mechanism by which a platform becomes more valuable as more users join. The basis of social platform defensibility.
- **UGC (User-Generated Content)**: Content created by users rather than the platform. Creates scale but requires moderation.
- **Trust and Safety (T&S)**: The function responsible for platform health: spam, harassment, misinformation, illegal content, CSAM.
- **CSAM (Child Sexual Abuse Material)**: Illegal content. Platforms are legally required to detect, remove, and report it (NCMEC in the US). Non-negotiable.
- **EU DSA (Digital Services Act)**: EU regulation requiring large platforms to assess and mitigate systemic risks, provide algorithmic transparency, and cooperate with regulatory authorities.
- **Shadowban**: Limiting a user's content visibility without notifying them. Controversial moderation mechanism.

## Regulatory/Compliance

- **CSAM reporting**: US law (PROTECT Our Children Act) requires platforms to report known CSAM to NCMEC using PhotoDNA or equivalent hash-matching. Non-compliance is criminal.
- **EU DSA (Digital Services Act)**: Applies to very large online platforms (>45M EU users). Requires risk assessments, algorithmic transparency, researcher data access, and regulatory cooperation.
- **GDPR / CCPA**: Data subject rights apply to social graph data, content, and behavioral data. User deletion requests must remove content and behavioral data.
- **COPPA**: Any platform that could attract users under 13 must implement age verification or COPPA-compliant data practices.
- **Section 230 (US)**: Provides liability protection for platforms hosting third-party content. Subject to ongoing legislative debate; compliance with good-faith moderation practices supports Section 230 protection.

## Common Pitfalls

- Launching a social feature without a cold start strategy — empty feeds and empty communities drive immediate abandonment
- Underinvesting in moderation infrastructure until after a PR crisis
- Designing notification systems that maximize raw volume rather than engagement quality — trains users to disable notifications
- Feed algorithms optimized for engagement without considering downstream effects (outrage, misinformation amplification)
- Building creator tools without creator monetization — creators leave platforms that don't pay
- Ignoring CSAM detection as a legal and operational requirement from day one

## Quality Signals

- Addresses cold start strategy before designing social features
- Treats content moderation as infrastructure, not a post-launch concern
- Designs fan-out architecture with celebrity/high-follower cases in mind
- Understands that feed algorithm design has cultural and societal implications beyond engagement metrics
- Knows CSAM detection is legally required and proposes PhotoDNA or equivalent

## Anti-Patterns

- "We'll handle moderation when we scale" — CSAM and harassment don't wait for scale
- Optimizing feed for maximum time-on-app without considering what content gets amplified
- Building a social network that replicates an existing large platform without a specific differentiated community

## Recommended Stack/Tools

- **Feed infrastructure**: Redis (sorted sets for feed storage), Cassandra (high-write time-series), custom feed service
- **Notification delivery**: Firebase Cloud Messaging, Apple APNs, SNS + SQS for fan-out
- **Content moderation**: AWS Rekognition (image/video), Google Cloud Vision, PhotoDNA (CSAM hash matching), Hive Moderation, ActiveFence
- **Search**: Elasticsearch (full-text + social graph search), Algolia (hosted)
- **Real-time**: WebSockets via Socket.io, Ably, Pusher; or SSE for simpler use cases
- **Analytics**: Amplitude or Mixpanel for behavioral analytics; custom data warehouse for feed algorithm signals
- **Anti-spam / fraud**: Arkose Labs, hCaptcha, custom ML classifiers
