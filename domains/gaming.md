# Domain: Gaming

## Context Primer

Game development has a different relationship with correctness than other software. A bug that crashes a web app is a failure; a bug that creates an unintended but amusing interaction in a game is sometimes a feature players remember for years. This doesn't mean games ship broken — it means the quality bar is defined by player experience and emotional resonance, not technical correctness per se. The question is always: does this serve the experience?

The economics of games are bimodal. Indie games (1-5 person teams, $5-30 one-time price) operate on unit sales economics: make something compelling enough that players pay once. Live service games (mobile F2P, GaaS) operate on retention economics: you need players to return daily and spend over time. These two models require completely different design philosophies, tech stacks, and success metrics. Most failed games fail because the economic model wasn't clear at the start, so the design optimized for the wrong outcome.

Game performance requirements are often the inverse of web: consistent low-latency frame rendering matters more than throughput. Dropping from 60fps to 30fps midway through a fight creates a worse experience than running at steady 30fps throughout. Hitching (frame time spikes) is almost always worse than lower average framerate. Memory budget management — knowing exactly how much memory the target platform has and allocating it deliberately — is a first-class engineering discipline.

## Common Patterns

- **Entity-component-system (ECS)**: Architecture pattern where game objects (entities) are composed of data components rather than deep inheritance hierarchies. Highly cache-friendly for physics, AI, and rendering loops. Unity DOTS and Bevy use ECS natively.
- **Game loop**: The core update-render cycle. Typically runs at a fixed simulation rate (physics, game logic) decoupled from rendering rate. Fixed timestep physics prevents simulation instability at variable framerates.
- **State machines for game logic**: Player state (idle, walking, attacking, stunned), NPC AI, and UI flow are all well-modeled as state machines. Hierarchical state machines (HSM) and behavior trees scale to complex NPC behavior.
- **Object pooling**: Instantiating and destroying objects (bullets, particles, enemies) at runtime is expensive. Object pools pre-allocate and reuse objects, avoiding garbage collection pressure.
- **Server-authoritative multiplayer**: Clients send input, server computes game state, clients render that state. Prevents cheating but requires latency compensation (client-side prediction, rollback netcode). Peer-to-peer is simpler but fundamentally insecure for competitive games.
- **Rollback netcode**: Each client simulates the game independently and predicts opponent inputs. When the actual input arrives, the client rolls back to the moment of divergence and resimulates. Standard for fighting games and low-player-count competitive games (GGPO library).
- **Save system design**: What to persist (progress, settings, inventory, world state) and how (cloud save, local file, database). Save corruption destroys player investment — checksums and backup saves are not optional for anything meaningful.
- **Telemetry and analytics**: Death heatmaps, funnel drop-off in tutorials, economy inflow/outflow — game analytics are unique and require custom event tracking. Generic product analytics tools work but need game-specific event schemas.

## Domain Vocabulary

- **GDD (Game Design Document)**: Design spec for a game — mechanics, systems, art direction, target platform, player experience goals. The equivalent of a PRD.
- **Game loop**: The central update-render cycle that runs continuously while the game is active.
- **Frame time**: Time to render a single frame. 16.67ms = 60fps; 33.33ms = 30fps. Spikes (hitches) cause perceptible stuttering.
- **GaaS (Games as a Service)**: Live service model where the game is continuously updated with new content, events, and seasons. Revenue from ongoing engagement (F2P, battle passes, DLC).
- **F2P (Free to Play)**: Business model where the game is free; revenue from in-game purchases. Requires balancing monetization vs. player experience — predatory monetization kills retention.
- **Battle pass**: Seasonal progression track with free and paid tiers. Players earn rewards by playing; paying unlocks premium rewards. Fortnite popularized the model.
- **ARPU / ARPPU**: Average Revenue Per User / Per Paying User. ARPPU is more diagnostic for F2P — it tells you average spend among those who convert.
- **LTV (Lifetime Value)**: Expected revenue from a player over their entire engagement with the game. The ceiling on sustainable user acquisition cost.
- **Whales**: The small percentage (1-5%) of paying players who generate the majority of F2P revenue. Losing whale players is disproportionately harmful to revenue.
- **Netcode**: The networking code that synchronizes game state between clients in multiplayer. Quality of netcode determines how fair and responsive online play feels.
- **Tick rate**: How often a multiplayer server updates game state per second. Higher tick rate = more accurate hit detection but more server load. Counter-Strike runs at 64-128 tick.
- **NAT traversal / hole punching**: Technique for establishing peer-to-peer connections between players behind NAT routers without a relay server.
- **Shader**: GPU program that determines how surfaces are rendered. Vertex shaders position geometry; fragment/pixel shaders determine final pixel color.
- **LOD (Level of Detail)**: Swapping lower-detail models for objects at distance to reduce GPU load. Standard optimization for open-world games.

## Regulatory/Compliance

- **ESRB / PEGI ratings**: Game rating agencies (Entertainment Software Rating Board in US, Pan European Game Information in EU). Ratings affect distribution platform eligibility and whether games can include certain content.
- **COPPA and loot boxes**: Several countries (Belgium, Netherlands, and others) classify loot boxes as gambling and have banned them. COPPA applies to games targeting children — real-money mechanics require careful design.
- **Platform terms of service**: App stores (Apple, Google), console stores (PlayStation, Xbox, Nintendo) each have rules about content, payment mechanics, and what IAP systems must be used. Violations result in removal.
- **GDPR for player data**: Player accounts, play history, and behavioral data are personal data under GDPR. Cross-border data transfer from EU players requires standard contractual clauses or other mechanisms.
- **Age verification**: Age-rated content requires age gates. Mechanics that resemble gambling (loot boxes, gacha) face increasing regulatory scrutiny globally.

## Common Pitfalls

- Optimizing for average framerate instead of frame time consistency — players feel hitches, not averages
- Building multiplayer as peer-to-peer for simplicity, discovering the cheating problem post-launch
- Designing an economy (F2P) without a trained economist or game economy designer — inflation and deflation of in-game currency destroys retention
- Scope creep — game development is notorious for features that seem small and expand into massive systems
- Ignoring platform certification requirements until submission — Microsoft, Sony, and Nintendo certification processes take weeks and have specific technical requirements
- Building save systems that overwrite a single save file — save corruption with no backup is a player-hostile design
- Under-testing on minimum-spec hardware — games that run well on developer machines often have performance issues on target hardware

## Quality Signals

- Understands the difference between indie unit-sales economics and live-service retention economics
- Can reason about the design implications of the target platform (mobile constraints vs. PC freedom vs. console certification)
- Knows that networking architecture (authoritative server, rollback) is decided at the start, not retrofitted
- Distinguishes frame rate from frame time consistency
- Treats game economy design as a specialized skill, not a general product design problem

## Anti-Patterns

- Treating game development like web development — the performance requirements, build tooling, and design philosophy are fundamentally different
- "Just use Unity" or "just use Unreal" without reasoning about project scale, platform targets, and team skills
- Designing F2P monetization as an afterthought added after the core game loop is built
- Generic game design recommendations that ignore genre conventions (what works in an RPG fails in a puzzle game)

## Recommended Stack/Tools

- **Engines**: Unity (C#, broad platform support, strong asset ecosystem, mobile-friendly); Unreal Engine (C++/Blueprints, high-fidelity visuals, best for AAA console/PC); Godot (open source, GDScript/C#, good for 2D indie and small 3D projects); Bevy (Rust ECS, for systems programmers)
- **Multiplayer**: Photon (managed, easy to integrate); Mirror (Unity open source); Netcode for GameObjects (Unity MLAPI); Fishnet (Unity, rollback support); custom authoritative server via Node.js/Go/Rust for dedicated server games
- **Voice chat**: Vivox (industry standard, integrated with major engines); Discord GameSDK for PC games
- **Analytics**: GameAnalytics (free tier, game-specific), Amplitude or Mixpanel with custom game event schemas
- **Economy management**: Playfab (Azure, managed economy, catalog, player data); custom if full control is needed
- **Cloud saves**: Playfab, Unity Gaming Services, or custom PostgreSQL backend
- **Anti-cheat**: Easy Anti-Cheat (Epic, free for EGS/Steam); BattlEye; custom server-authoritative validation
- **CI/CD for games**: Fastlane (mobile), GameCI (Unity GitHub Actions), or custom pipeline with Unity's batch build mode
