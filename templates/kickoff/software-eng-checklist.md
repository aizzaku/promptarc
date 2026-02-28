# Software Engineering Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a software project.

---

## Stack & Architecture

1. **What's the tech stack?** (Language, framework, runtime. If undecided, say so — stack evaluation is a valid first task.)
2. **What paradigm?** (OOP | Functional | Hybrid | "Whatever fits")
3. **What's the deployment target?** (Cloud provider, serverless, containers, bare metal, local-only)
4. **What's the architecture style?** (Monolith | Microservices | Serverless | Static | "Not sure yet")
5. **What database(s)?** (Relational, document, graph, none, undecided)

## Code Quality

6. **What's the testing strategy?** (Unit | Integration | E2E | "Tests would be nice" | No tests)
7. **Is there a linter/formatter configured?** (ESLint, Prettier, Biome, Black, etc.)
8. **What's the type safety level?** (Strict TypeScript | Loose typing | Dynamic language | N/A)
9. **Any CI/CD pipeline?** (What runs on push/PR? Or nothing yet?)

## API & Data

10. **Does this have an API?** (REST | GraphQL | gRPC | tRPC | Internal only | No API)
11. **What's the auth model?** (Session | JWT | OAuth | API keys | None yet)
12. **What are the performance requirements?** (Latency targets? Throughput? Concurrent users? "Just make it work"?)

## Operational

13. **What's the monitoring/observability plan?** (Logging, metrics, alerting — or none yet?)
14. **What's the security model?** (PCI? HIPAA? SOC2? OWASP top 10? "Don't ship obvious vulnerabilities"?)
15. **What's the maintenance expectation?** (Active development | Occasional updates | Ship and forget)

---

## Conditional

### If existing codebase
16. **Where's the code?** (Repo URL or local path)
17. **What's the entry point?** (Main file, start command, README location)
18. **Known tech debt?** (Areas of the codebase that are known to be problematic)

### If team project
19. **Branching strategy?** (Trunk-based | Git flow | Feature branches | "We just push to main")
20. **Code review process?** (PR reviews | Pair programming | No review | Automated only)

### If greenfield
21. **Is there a reference project or architecture to emulate?** (A similar project you admire)
22. **What's the scaffolding preference?** (Framework CLI | Manual setup | Template repo)
