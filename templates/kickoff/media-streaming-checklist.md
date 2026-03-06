# Media & Streaming Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a media or streaming project.

---

## Platform Model

1. **Video on demand, live streaming, or both?**
2. **Revenue model?** (SVOD: subscription | AVOD: advertising | TVOD: transactional rental/purchase | Hybrid)
3. **Content source?** (Licensed studio content | Creator UGC | Internal original content | Live events | Mixed)
4. **Primary viewer platform?** (Web | iOS | Android | Smart TV/OTT | All)

---

## Content Delivery

5. **CDN provider?** (Cloudflare | Fastly | AWS CloudFront | Akamai | Mux | None yet)
6. **Adaptive streaming protocol?** (HLS | MPEG-DASH | CMAF for both | Not yet decided)
7. **Transcoding pipeline?** (Mux | AWS Elemental MediaConvert | FFmpeg self-hosted | None yet)
8. **Rendition set?** (Which resolutions and bitrates — minimum for your target audience's bandwidth range?)

---

## DRM & Rights

9. **DRM required?** (Premium licensed content requires Widevine + FairPlay + PlayReady — which platforms must be covered?)
10. **DRM provider?** (BuyDRM/KeyOS | EZDRM | Axinom | Cloud provider DRM | None)
11. **Rights management data model?** (Jurisdiction | Format type | Time window | Platform — all four dimensions?)
12. **Geo-restriction enforcement needed?** (At CDN layer — which regions are in/out of scope per content?)

---

## Live Streaming (if applicable)

13. **Latency mode?** (Broadcast: ~30s delay | Low latency: 3-10s | Ultra-low latency: <1s — which use case?)
14. **Ingest protocol?** (RTMP | SRT | WebRTC — broadcaster equipment determines this)
15. **Live transcoding?** (Mux Live | AWS MediaLive | Self-hosted FFmpeg | Third-party encoder)

---

## Accessibility & Captions

16. **Caption generation?** (Automated: AWS Transcribe / AssemblyAI | Manual | Not planned — CVAA compliance requires captions for broadcast-origin content)
17. **Caption formats supported?** (WebVTT for web | SRT | CEA-608/708 for broadcast)

---

## Conditional

### If UGC video platform
18. **Content ID / fingerprinting for copyright detection?** (AcrCloud | Audible Magic | YouTube Content ID licensing | None)
19. **DMCA notice-and-takedown process defined?**
20. **Video moderation pipeline?** (Pre-publish review | Post-publish with user reporting | Automated classifiers)

### If OTT / Smart TV distribution
21. **Platform SDKs?** (Roku | Apple TV | Fire TV | Android TV | Samsung | LG — each has distinct certification requirements)
22. **DRM certification for each platform?** (Each platform has its own DRM certification process)
