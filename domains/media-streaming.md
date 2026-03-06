# Domain: Media & Streaming

## Context Primer

Streaming media is a content delivery problem at scale. Unlike most software, the "product" is bandwidth — video and audio data delivered reliably to millions of concurrent users with low latency and without buffering. This creates an engineering model organized around CDNs, adaptive bitrate streaming, and transcoding pipelines rather than application servers and databases. The end user experience metric is not uptime or response time — it is rebuffer rate and startup latency.

Content licensing is the invisible architecture of streaming media businesses. Rights to distribute content are jurisdictional, format-specific, and time-limited. A film licensed for SVOD in the US may not be licensed for AVOD, for download, for Europe, or after a specific date. The rights management system must enforce these constraints at every delivery point — not just the UI. Rights errors are not just product bugs; they are contractual violations with financial penalties.

Live streaming has fundamentally different requirements than on-demand. Glass-to-glass latency (camera to viewer) is a product feature: a 30-second delay is fine for broadcast sports; a 1-second delay is required for interactive live streams. The tradeoff between latency and quality is explicit and must match the use case.

## Common Patterns

- **Adaptive bitrate (ABR) streaming**: HLS and MPEG-DASH protocols that serve different quality levels based on viewer bandwidth. The player selects the appropriate quality in real time.
- **Transcoding pipelines**: Video uploaded or ingested at one quality and transcoded into multiple resolutions and codecs (H.264, H.265/HEVC, AV1) for adaptive streaming.
- **CDN distribution**: Video delivered from edge nodes geographically close to the viewer. Origin serves the CDN, not the viewer directly.
- **DRM (Digital Rights Management)**: Widevine (Google/Chrome/Android), FairPlay (Apple), and PlayReady (Microsoft) are the three DRM systems required to cover all major platforms.
- **Packaging and segmentation**: Video stored as a single file, packaged into segments (2-10 second chunks) for streaming. CMAF enables a single set of segments to serve both HLS and DASH.
- **Content ID and fingerprinting**: Hash-based or audio/video fingerprinting to detect copyrighted content in UGC (YouTube's Content ID, AcrCloud, Audible Magic).
- **Live ingest**: Broadcasters push live streams via RTMP or SRT protocols; the platform transcodes in real-time and distributes via HLS/DASH.

## Domain Vocabulary

- **HLS (HTTP Live Streaming)**: Apple's adaptive streaming protocol. Dominant on iOS and widely supported.
- **MPEG-DASH**: Open standard adaptive streaming protocol. Equivalent to HLS, more common in Android and non-Apple ecosystems.
- **Transcoding**: Converting video from one format, codec, or resolution to another. CPU-intensive; typically done on GPU instances.
- **CDN (Content Delivery Network)**: Network of edge servers that cache and deliver content from geographically distributed locations.
- **DRM (Digital Rights Management)**: Encryption and key management systems that prevent unauthorized copying of content.
- **SVOD / AVOD / TVOD**: Subscription Video on Demand / Advertising Video on Demand / Transactional Video on Demand — the three primary streaming revenue models.
- **Glass-to-glass latency**: The delay between a live event occurring in front of a camera and appearing on a viewer's screen.
- **Rebuffer rate**: The percentage of video playback sessions that experience buffering. The primary quality metric for streaming.
- **CMAF (Common Media Application Format)**: A container format enabling a single set of media segments to be served via both HLS and DASH.
- **Ingest**: The process of receiving a live stream from a broadcaster (RTMP, SRT, WebRTC) for processing and distribution.

## Regulatory/Compliance

- **Content licensing**: Rights to distribute content are jurisdictional, format-specific, and time-bound. Contractual violations from rights mismanagement have significant financial penalties.
- **COPPA**: Any streaming platform that may reach users under 13 must implement age verification and apply COPPA-compliant data practices.
- **GDPR / CCPA**: Viewing history, behavioral data, and content preferences are personal data subject to access, deletion, and portability rights.
- **Accessibility (CVAA, WCAG)**: US CVAA requires closed captions on video distributed online that previously aired on broadcast TV. WCAG 2.1 AA requires captions and audio descriptions on video content in accessible products.
- **DMCA / copyright**: UGC platforms must implement notice-and-takedown procedures and, for large platforms, content fingerprinting to avoid DMCA liability exposure.

## Common Pitfalls

- Building video delivery without CDN — serving video from origin at scale is expensive and unreliable
- Ignoring DRM requirements until major studio licensing negotiations — DRM must be in place before premium content delivery
- Transcoding to a single resolution — adaptive bitrate requires multiple renditions or users on slow connections get poor experience
- Live streaming without latency/quality mode selection — interactive and broadcast use cases have different requirements
- Content rights metadata modeled as a simple boolean ("is licensed?") — rights are jurisdictional, format-specific, and time-limited
- Launching with captions absent on video content — CVAA compliance and accessibility expectation from launch

## Quality Signals

- Knows the difference between HLS, DASH, and CMAF and when each is appropriate
- Designs rights management data model with jurisdiction, format, and time dimensions
- Proposes DRM before discussing premium content licensing
- Distinguishes live streaming latency modes and asks which use case applies
- Treats caption generation as a default, not an optional accessibility feature

## Anti-Patterns

- "We'll use S3 and stream directly" without a CDN for any significant viewer volume
- Treating video as a large file download rather than an adaptive streaming problem
- Implementing a single DRM system and discovering the others are required for distribution agreements

## Recommended Stack/Tools

- **Video infrastructure**: Mux (managed video API, analytics), Cloudflare Stream (simple hosting), AWS Elemental (MediaConvert, MediaLive for advanced workloads), self-hosted FFmpeg
- **CDN**: Cloudflare (best developer experience), Fastly (advanced caching control), AWS CloudFront, Akamai (enterprise)
- **DRM**: BuyDRM/KeyOS (multi-DRM management), Axinom, EZDRM, or cloud provider DRM (AWS Elemental MediaPackage)
- **Live streaming**: Mux Live, Cloudflare Stream Live, AWS MediaLive (enterprise broadcast)
- **Player**: Video.js (open source), Shaka Player (Google, DASH + HLS), JW Player (commercial), HLS.js
- **Transcoding**: FFmpeg (self-hosted), AWS Elemental MediaConvert, Mux (managed)
- **Captions / subtitles**: AWS Transcribe, AssemblyAI, Rev.ai (automated transcription)
