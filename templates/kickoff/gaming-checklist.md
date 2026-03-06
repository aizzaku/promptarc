# Gaming Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a game development project.

---

## Game Type

1. **Genre?** (Action | Puzzle | RPG | Strategy | Simulation | Casual | Platformer | Other)
2. **Platform target?** (Mobile iOS | Mobile Android | PC: Steam/Epic | Console: which | WebGL | Multi-platform)
3. **Single-player, multiplayer, or both?**
4. **Business model?** (F2P with IAP | Premium paid up front | Subscription | Demo + paid unlock)

---

## Engine & Tools

5. **Engine?** (Unity | Unreal | Godot | Custom engine | GameMaker | No engine)
6. **Target framerate?** (30fps | 60fps | Uncapped | VR: 90fps+)
7. **Art style and pipeline?** (2D / 3D | Pixel art | Vector | Hand-drawn | 3D low-poly)

---

## Multiplayer (if applicable)

8. **Multiplayer type?** (Real-time PvP | Turn-based async | Co-op | MMO | None)
9. **Netcode model?** (Authoritative server + client-side prediction | Authoritative server only | P2P | Not defined)
10. **Server infrastructure?** (Dedicated servers | Player-hosted | Cloud gaming service: Playfab, Nakama, AWS GameLift)

---

## Monetization (if F2P)

11. **Monetization mechanics?** (IAP cosmetics | Battle pass | Gacha / loot boxes | Energy/stamina systems | Direct purchase)
12. **Premium currency or direct pricing?** (Two-currency systems vs. direct dollar pricing — tradeoffs in perception and conversion)
13. **Pay-to-win elements?** (Must justify from retention design perspective — P2W kills long-term community health)

---

## Live Operations

14. **Live service with ongoing content updates?** (Patch cadence? Content pipeline?)
15. **Events, seasons, or rotating content?**
16. **Community features?** (Guilds | Leaderboards | Clans | Social — which and why)

---

## Conditional

### If mobile
17. **Platform certification requirements reviewed?** (Apple App Review, Google Play policies on content and monetization)
18. **Privacy compliance?** (iOS ATT/IDFA prompt | Android GAID | COPPA if under-13 users)
19. **Analytics and attribution?** (Adjust | AppsFlyer | GameAnalytics — what for retention vs. UA attribution)

### If console
20. **Which platform certification?** (Xbox | PlayStation | Nintendo — each has distinct TRC/TCR requirements)
21. **First-party SDK integration needed?** (Achievement system | Social features | Save data sync)

### If PC (Steam)
22. **Steam features to integrate?** (Achievements | Cloud saves | Workshop | Trading cards | Steam Input)
