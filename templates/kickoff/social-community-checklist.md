# Social & Community Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a social or community platform project.

---

## Platform Model

1. **Platform type?** (Social network | Interest community | Creator platform | Professional network | Chat / messaging | Forum)
2. **Primary social graph?** (Follow model (asymmetric) | Friends model (symmetric) | Interest graph | Group-based)
3. **Content types?** (Text | Images | Video | Audio | Long-form | Mixed)
4. **Creator focus?** (Consumer-created content | Professional creators | Both — does monetization for creators matter?)

---

## Cold Start

5. **Cold start strategy?** (What value does a new user with no connections get on day one?)
6. **Initial community focus?** (Geographic | Interest vertical | Professional category — which niche to prove liquidity in first?)
7. **Social graph import?** (Phone contacts | Twitter OAuth | LinkedIn | Manual — or bootstrapping from scratch?)

---

## Trust & Safety

8. **UGC moderation pipeline designed?** (Automated classifiers → user reporting → human review → appeals)
9. **CSAM detection in place?** (PhotoDNA or equivalent hash-matching — legally required before any image/video UGC)
10. **NCMEC reporting process established?** (US legal requirement for platforms with UGC)
11. **Harassment and spam policy defined?** (Who is responsible, what's the enforcement process)

---

## Feed & Content

12. **Feed model?** (Algorithmic ranking | Chronological | User-controlled | Hybrid)
13. **Fan-out architecture?** (Fan-out on write vs. read — decision documented with high-follower account volume in mind)
14. **Content discovery mechanism?** (Hashtags | Topics | Recommendations | Explore feed | None)

---

## Notifications

15. **Notification types?** (Activity: likes/comments/follows | Content: new posts from followed accounts | Both)
16. **Notification delivery infrastructure?** (FCM + APNs for mobile | Email | Web push | SMS)

---

## Conditional

### If creator platform
17. **Creator monetization model?** (Subscriptions | Tips | Paid access | Ad revenue share | Brand deals | None yet)
18. **Creator analytics?** (Reach, engagement, earnings — creators need data to improve)

### If significant video content
19. **Video hosting and CDN?** (Mux | Cloudflare Stream | AWS Elemental | YouTube | Custom)
20. **Video moderation?** (Real-time streaming moderation vs. post-upload review — which applies?)

### If regulated or large platform
21. **EU DSA applicability assessed?** (Applies at >45M EU users — what obligations would apply at target scale?)
22. **Age verification strategy?** (For platforms that may attract users under 13 or 18)
