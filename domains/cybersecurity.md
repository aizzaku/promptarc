# Domain: Cybersecurity

## Context Primer

Security products carry an unusual liability: a bug in your product can directly enable an attacker to compromise your customer's systems. The security vendor's own software is an attack surface — and a high-value one, because a compromised security tool provides access to everything it was protecting. This reframes quality requirements: security products must meet a higher correctness bar than typical software, and their own security posture must be auditable by expert-skeptical buyers.

The security market is fragmented by buyer and use case. A CISO evaluating a SIEM has completely different requirements than a DevSecOps team evaluating a SAST tool. The common thread is that the buyer is a security professional — an expert skeptic who has seen vendor hype cycles, evaluates claims against evidence, and will dismiss products that cannot be validated in their environment. Marketing claims without technical substance kill deals with security buyers faster than with any other audience.

False positives are the operational failure mode for detection products. A high false positive rate means analysts stop investigating alerts — which defeats the product entirely. Alert fatigue is not user experience friction; it is a product correctness problem.

## Common Patterns

- **Defense in depth**: Layer controls so that failure of any single control doesn't create complete compromise. Security architecture is designed for control failure.
- **Least privilege**: Every service account, IAM role, API key, and database user has only the minimum permissions required. Audited quarterly.
- **Threat modeling before design**: Assets, threats, attack paths, and controls identified before implementation, not after.
- **Immutable audit logs**: Append-only, tamper-evident logs of all significant security events. Required for incident response and compliance evidence.
- **Zero-trust network model**: No implicit trust based on network location. Every request authenticated and authorized regardless of origin.
- **Secrets management**: Credentials stored in a secrets vault (HashiCorp Vault, AWS Secrets Manager), never in code, config files, or environment variables in production.
- **Detection and response lifecycle**: MTTD (mean time to detect) and MTTR (mean time to respond) are the KPIs for security operations.

## Domain Vocabulary

- **SIEM (Security Information and Event Management)**: Platform that aggregates and correlates logs and events from across an environment to detect threats.
- **SOAR (Security Orchestration, Automation, and Response)**: Platform that automates security workflows, especially incident response playbooks.
- **SOC (Security Operations Center)**: Team responsible for monitoring, detecting, and responding to security incidents.
- **EDR (Endpoint Detection and Response)**: Software that monitors endpoints (laptops, servers) for malicious activity and enables investigation and response.
- **IAM / PAM (Identity and Access Management / Privileged Access Management)**: Systems controlling who can access what, with PAM focused on high-privilege accounts.
- **CVE (Common Vulnerabilities and Exposures)**: Standardized identifiers for publicly known vulnerabilities. CVSS score rates severity.
- **Threat intelligence**: Structured information about threats, threat actors, and attack techniques used to improve detection and prevention.
- **MITRE ATT&CK**: A knowledge base of adversary tactics and techniques used as a common framework for threat modeling and detection coverage mapping.
- **MTTD / MTTR**: Mean time to detect / mean time to respond. The core operational KPIs for SOC efficiency.
- **False positive rate**: The rate at which a detection system flags legitimate activity as malicious. High false positive rates cause alert fatigue.
- **Red team / Blue team**: Red team simulates attackers; blue team defends. Purple team exercises combine both.
- **Zero-day**: A vulnerability with no existing patch. Exploited before the vendor is aware or before a fix is available.

## Regulatory/Compliance

- **SOC 2 Type II**: The baseline enterprise security certification. Requires evidence of controls across security, availability, confidentiality, integrity, and privacy trust service criteria.
- **ISO 27001**: International standard for information security management systems. Often required for EU and global enterprise customers.
- **FedRAMP**: US federal cloud security authorization. Required for selling to US federal agencies. Expensive and time-consuming; ATO requires a 3PAO assessment.
- **CMMC (Cybersecurity Maturity Model Certification)**: Required for US Department of Defense contractors. Level depends on contract sensitivity.
- **NIST Cybersecurity Framework**: Voluntary framework (Identify, Protect, Detect, Respond, Recover) widely used as a baseline for security programs.
- **GDPR / CCPA**: Data handling regulations with security implications — breach notification requirements, right to erasure, and data minimization requirements.

## Common Pitfalls

- Building detection without measuring false positive rate — high FPR renders the product operationally useless
- Treating compliance certification as equivalent to security — SOC 2 certification doesn't mean the product is actually secure
- Security theater: controls that satisfy checklists without reducing real risk (rate limiting with no lockout, encryption with a hardcoded key)
- Failing to model the product itself as an attack target — security vendors are high-value targets
- Building on broad permissions "for flexibility" — least privilege is not a post-launch optimization
- Deploying without immutable audit logs — retroactive logging is useless for incident investigation
- Underestimating the expertise of the security buyer — vague claims or marketing language without technical substance kills credibility

## Quality Signals

- Threat models the product itself, not just the customer's environment
- Distinguishes between compliance and security, and explains the gap
- Specifies false positive rate implications when discussing detection design
- Maps detection coverage to MITRE ATT&CK techniques
- Designs audit logs as tamper-evident from the start
- Proposes least privilege at every layer without being asked

## Anti-Patterns

- Generic "add HTTPS and sanitize inputs" advice when the context is a security product with sophisticated buyers
- Treating compliance certification as the goal rather than actual risk reduction
- Designing broad permissions "to avoid friction" in security tooling
- Recommending shared credentials or long-lived API keys for service-to-service communication

## Recommended Stack/Tools

- **SIEM/observability**: Elasticsearch/OpenSearch (self-hosted), Splunk (enterprise), CrowdStrike (cloud-native)
- **Secrets management**: HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager
- **Identity / PAM**: Okta, Azure AD, CyberArk (PAM), BeyondTrust
- **Vulnerability scanning**: Snyk (code/dependencies), Trivy (containers), Nessus (infrastructure), Semgrep (SAST)
- **Threat intelligence**: MISP (open source), Recorded Future, Mandiant Advantage
- **SOAR**: Palo Alto XSOAR, Splunk SOAR, open source: n8n with security integrations
- **Pen testing / red team**: Metasploit, Burp Suite, Cobalt Strike, Nuclei
