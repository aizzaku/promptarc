# Blockchain / Web3 Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies a blockchain or Web3 project.

---

## Chain & Network

1. **Target blockchain?** (Ethereum mainnet | Layer 2: Arbitrum | Optimism | Base | Polygon | Solana | Other)
2. **Layer 2 or Layer 1?** (L2 preferred for lower gas costs — why L1 if chosen?)
3. **Testnet deployment before mainnet?** (Which testnet? What's the mainnet deployment timeline?)

---

## Smart Contracts

4. **Smart contract language?** (Solidity | Vyper | Rust — aligned with target chain)
5. **Security audit scheduled?** (Which firm? Timeline relative to mainnet deployment? Budget allocated?)
6. **Base contracts from OpenZeppelin?** (For ERC standards, access control, pausability — don't reinvent audited code)
7. **Upgradeability needed?** (Proxy pattern type if yes: UUPS | Transparent | Beacon | None — state the tradeoff)
8. **Admin / privileged operations?** (Multi-sig wallet for all admin functions — which multi-sig, what threshold?)

---

## On-Chain / Off-Chain Design

9. **What data is stored on-chain vs. off-chain?** (On-chain: hashes, ownership, state transitions. Off-chain: content, metadata, computation)
10. **Indexing strategy for off-chain queries?** (The Graph subgraph | Custom indexer | Alchemy/Infura APIs)
11. **Oracle requirements?** (External data needed for on-chain logic — which oracle provider, for what data?)

---

## Token Economics (if applicable)

12. **Token type?** (Fungible: ERC-20 | Non-fungible: ERC-721 | Semi-fungible: ERC-1155 | No token)
13. **Token distribution and launch plan?** (Legal review completed for securities classification?)
14. **Incentive sustainability modeled?** (What happens to the token economy after initial distribution ends?)

---

## Frontend & Integration

15. **Wallet connection library?** (wagmi + RainbowKit | ethers.js | viem | WalletConnect)
16. **RPC provider?** (Alchemy | Infura | QuickNode | Self-hosted node)

---

## Conditional

### If DeFi protocol
17. **Economic attack vectors assessed?** (Flash loan attacks, oracle manipulation, price impact — threat modeled?)
18. **MEV implications reviewed?** (How does MEV affect user experience and protocol economics?)
19. **Liquidity bootstrapping plan?** (Where does initial liquidity come from? What are the incentives?)

### If NFT project
20. **Metadata storage?** (IPFS | Arweave | Centralized — and what's the permanence commitment to holders?)
21. **Royalty standard?** (ERC-2981 for on-chain royalties — or marketplace-specific?)

### If DAO
22. **Governance framework?** (OpenZeppelin Governor | Compound Governor Bravo | Custom)
23. **Timelock on governance actions?** (How much delay between vote passing and execution?)
