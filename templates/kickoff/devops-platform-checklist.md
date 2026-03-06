# DevOps & Platform Engineering Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a DevOps or platform engineering project.

---

## Platform Scope

1. **What does this platform manage?** (CI/CD | Container orchestration | IaC | Developer portal | Observability | Secret management | Service mesh | All of the above)
2. **Who are the internal customers?** (Which product teams, what languages/frameworks, what scale?)
3. **Current state?** (Greenfield | Improving existing system | Migration from legacy tools | Consolidating fragmented tooling)

---

## Infrastructure

4. **Cloud provider?** (AWS | GCP | Azure | Multi-cloud | On-prem | Hybrid)
5. **Container orchestration?** (Kubernetes: EKS/GKE/AKS | ECS | Nomad | None)
6. **IaC tool?** (Terraform | Pulumi | CDK | Ansible | None — if none, IaC adoption is the starting point)
7. **Deployment strategy?** (Blue/green | Canary | Rolling | Feature flags | Direct)

---

## CI/CD

8. **CI/CD platform?** (GitHub Actions | GitLab CI | Jenkins | CircleCI | ArgoCD | Tekton)
9. **GitOps model?** (ArgoCD | Flux | Manual kubectl | Not in use)
10. **Rollback strategy?** (How long does rollback take? Who can trigger it? Is it tested?)
11. **Average deployment lead time today?** (Time from commit to production — the DORA lead time metric)

---

## Observability

12. **Metrics?** (Prometheus + Grafana | Datadog | New Relic | CloudWatch | None)
13. **Logging?** (ELK/OpenSearch | Loki | Datadog | CloudWatch Logs | None)
14. **Distributed tracing?** (Jaeger | Tempo | Datadog APM | AWS X-Ray | None)
15. **On-call and alerting?** (PagerDuty | Opsgenie | OpsLevel | Manual)

---

## Reliability

16. **DORA metrics currently tracked?** (Deployment frequency, lead time, change failure rate, time to restore)
17. **SLOs defined for existing services?** (If not, is this a gap to address?)
18. **Incident response process defined?** (Runbooks, blameless postmortems, on-call rotation)

---

## Conditional

### If Kubernetes
19. **Cluster management model?** (Self-managed | EKS | GKE | AKS | Rancher)
20. **GitOps in place?** (ArgoCD | Flux | Manual — and is drift detection active?)
21. **Service mesh?** (Istio | Linkerd | None — justify if deploying a mesh)

### If building an internal developer platform
22. **Developer portal?** (Backstage | Port | Custom | None)
23. **Golden path templates defined?** (What does the "correct" way to start a new service look like?)
24. **Self-service provisioning?** (Can developers request resources without a ticket to the platform team?)
