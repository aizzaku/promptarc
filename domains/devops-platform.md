# Domain: DevOps & Platform Engineering

## Context Primer

Platform engineering is the discipline of building and maintaining internal developer platforms (IDPs) — the infrastructure, tooling, and workflows that product engineers use to build, test, and deploy software. The platform team's customers are internal developers, which creates an unusual product dynamic: the platform must be good enough to use voluntarily, or engineers will route around it. A platform that requires workarounds is worse than no platform, because it adds overhead without providing reliability.

The "golden path" concept is central to good platform design: the easiest way to deploy should also be the correct way. When the correct path (secure, observable, compliant) is harder than the ad-hoc path, engineers take the ad-hoc path. Platform teams succeed by making correctness frictionless.

The DORA metrics (deployment frequency, lead time for changes, change failure rate, time to restore service) are the industry standard for measuring DevOps effectiveness — not uptime or ticket counts. High-performing organizations deploy multiple times per day with low change failure rates. These metrics are the platform team's accountability framework. SRE (Site Reliability Engineering) principles — error budgets, SLIs/SLOs, toil reduction, blameless postmortems — provide the cultural and operational model that platform teams operate within.

## Common Patterns

- **Infrastructure as Code**: All infrastructure defined in version-controlled code (Terraform, Pulumi, CDK). No manual console changes — all changes go through code review and automated apply.
- **GitOps**: Declarative desired state in git; an operator (ArgoCD, Flux) continuously reconciles actual state to desired state. Git is the single source of truth.
- **Golden path templates**: Opinionated project scaffolding that gives engineers a production-ready starting point with CI/CD, observability, and security built in.
- **Service mesh**: Mutual TLS, traffic management, and observability at the network layer without application code changes (Istio, Linkerd).
- **Chaos engineering**: Deliberately inject failures in staging to validate resilience assumptions before incidents expose them.
- **SLO-based alerting**: Alert on error budget burn rate, not on individual metric thresholds — reduces alert fatigue and focuses on user impact.
- **Immutable infrastructure**: Replace instances rather than patching them. Eliminates configuration drift and enables reliable rollback.

## Domain Vocabulary

- **IDP (Internal Developer Platform)**: The self-service infrastructure and tooling layer that abstracts complexity from product engineers.
- **DORA metrics**: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore Service. The four key measures of software delivery performance.
- **SLI / SLO / SLA**: Service Level Indicator (what you measure), Service Level Objective (the target), Service Level Agreement (the contractual commitment).
- **Error budget**: The tolerable amount of unreliability implied by an SLO. If a service has a 99.9% SLO, the error budget is 0.1% — roughly 43 minutes per month.
- **Toil**: Repetitive, manual, automatable work with no enduring value. SRE principle: toil above ~50% of work is unsustainable and should be automated.
- **GitOps**: The practice of using git as the single source of truth for infrastructure and application configuration, with automated reconciliation.
- **Blast radius**: The scope of potential impact if a deployment, configuration change, or infrastructure component fails.
- **Runbook**: A documented procedure for responding to a specific alert or incident. Required before any alert goes to production.
- **Postmortem / retrospective**: A blameless analysis of an incident focused on identifying systemic failure causes and preventing recurrence.

## Regulatory/Compliance

- **SOC 2 Type II**: Platform teams typically own significant portions of SOC 2 evidence — access controls, change management, infrastructure configuration, incident response.
- **FedRAMP**: US federal cloud authorization. CI/CD pipelines, infrastructure configuration, and access controls must meet FedRAMP requirements if serving federal customers.
- **HIPAA / PCI-DSS**: If product data is subject to these, the platform infrastructure is in scope. Network segmentation, access logging, and encryption at rest/transit must be enforced at the platform layer.
- **CIS Benchmarks**: Baseline security configurations for operating systems, cloud accounts, and Kubernetes clusters. Often required by enterprise customers or compliance frameworks.

## Common Pitfalls

- Manual infrastructure changes not captured in IaC — creates drift that causes incidents months later
- Observability added after the fact — you cannot debug what you cannot observe; add metrics, logs, and traces before shipping
- Alerts without runbooks — an alert that fires without telling the on-call engineer what to do is noise, not signal
- Platform teams that optimize for their own elegance rather than developer adoption — the platform's success metric is developer productivity, not architectural purity
- Kubernetes deployed without understanding its operational complexity — K8s abstracts compute but adds significant operational overhead
- SLOs set too high ("five nines") without error budgets — creates perverse incentives against innovation
- Shared mutation state in CI/CD pipelines — race conditions in parallel pipeline jobs cause flaky builds and deployment failures

## Quality Signals

- Understands that platform teams are a product team with internal developers as customers
- Defines success in DORA metrics, not uptime SLAs alone
- Designs SLOs with error budgets, not just availability targets
- Proposes runbooks alongside alert definitions
- Treats every manual process as a toil item with a remediation plan
- Distinguishes between platform-managed golden paths and product team flexibility

## Anti-Patterns

- "Just use Kubernetes" without assessing whether the operational complexity is justified for the scale
- Deploying infrastructure without IaC and calling it a prototype (prototypes become production)
- Building alert dashboards without defining what action each alert triggers
- Platform teams that block product engineers rather than enabling them

## Recommended Stack/Tools

- **IaC**: Terraform (multi-cloud, large ecosystem), Pulumi (code-native IaC), AWS CDK (AWS-native), Ansible (configuration management)
- **Container orchestration**: Kubernetes (EKS, GKE, AKS for managed), k3s (lightweight), ECS (simpler AWS-native)
- **CI/CD**: GitHub Actions (GitHub-native), GitLab CI (GitLab-native), ArgoCD (GitOps for K8s), Tekton (Kubernetes-native)
- **Observability**: Prometheus + Grafana (metrics), Loki (logs), Tempo (traces), Datadog (full-stack managed), New Relic
- **Service mesh**: Istio (full-featured, complex), Linkerd (simpler, lower overhead)
- **Secrets management**: HashiCorp Vault, AWS Secrets Manager, External Secrets Operator (K8s)
- **Internal developer platform**: Backstage (CNCF, Spotify-origin developer portal), Port, Cortex
