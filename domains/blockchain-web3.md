# Domain: Blockchain & Web3

## Context Primer

Blockchain systems make a fundamental tradeoff: they sacrifice performance and mutability for verifiability and trustlessness. Every design decision flows from this. Transactions are immutable once confirmed — there is no "undo," no customer support, no database rollback. Smart contract bugs are permanent unless explicitly designed for upgradeability, and upgradeability introduces centralization risks that contradict the trustless premise. This tension is the central engineering challenge of Web3 development.

Gas costs on EVM chains make storage expensive and computation cheap relative to traditional software. This inverts normal engineering intuitions: what you store on-chain is a product decision with direct user cost implications. Off-chain computation with on-chain settlement is the dominant pattern precisely because on-chain storage and computation are expensive. The ecosystem distinction between Layer 1 (Ethereum, Solana, etc.) and Layer 2 (Arbitrum, Optimism, Base, etc.) affects cost, finality time, liquidity, and user expectations.

Smart contract security has a different threat model than web security. Contracts are publicly visible, immutable, and control real financial value. Audit by a reputable firm before mainnet deployment is not optional for any contract handling significant value — it is the minimum bar. The DeFi ecosystem has lost billions of dollars to exploits that would have been caught by standard audit processes.

## Common Patterns

- **On-chain/off-chain separation**: Store minimal data on-chain (hashes, ownership, state transitions). Computation and content off-chain with on-chain verification.
- **Proxy patterns for upgradeability**: Transparent proxy or UUPS proxy allows contract logic to be upgraded while preserving state. Introduces centralization — must be disclosed to users.
- **Multi-sig for critical operations**: Admin functions protected by multi-signature wallets (Gnosis Safe). No single key controls critical protocol parameters.
- **Event-driven indexing**: Smart contracts emit events; off-chain indexers (The Graph, custom indexers) listen and build queryable databases. On-chain state is not queryable like a SQL database.
- **Oracles for external data**: Chainlink, Pyth, or UMA provide real-world data to smart contracts. Oracle manipulation is a common attack vector — use decentralized oracles for high-value data.
- **ERC standards**: Token standards (ERC-20, ERC-721, ERC-1155) define interface contracts that enable ecosystem interoperability. Deviate from standards only with clear justification.

## Domain Vocabulary

- **Smart contract**: Code deployed to a blockchain that executes deterministically. Immutable unless designed with upgradeability. Controls its own funds.
- **Gas**: The unit of computational cost on EVM chains. Users pay gas fees; gas optimization reduces user cost.
- **EOA / Contract account**: Externally Owned Account (controlled by private key) vs. contract account (controlled by code). Wallets are EOAs.
- **ABI (Application Binary Interface)**: The interface specification for interacting with a smart contract. Required by frontend and backend code to call contract functions.
- **Layer 1 / Layer 2**: L1 is the base blockchain (Ethereum, Solana). L2 is a scalability layer built on top (Arbitrum, Optimism, Base) with lower fees and higher throughput.
- **Mainnet / Testnet**: Mainnet is the live network with real value. Testnet is a testing environment with no real value (Sepolia, Goerli for Ethereum).
- **DeFi (Decentralized Finance)**: Financial applications built on smart contracts — DEXes, lending, stablecoins, derivatives.
- **NFT (Non-Fungible Token)**: A unique, non-interchangeable token representing ownership of a specific asset. ERC-721 or ERC-1155.
- **DAO (Decentralized Autonomous Organization)**: An organization governed by smart contracts and token-based voting.
- **Slippage**: The difference between expected and actual trade price in a DEX, caused by price movement during transaction confirmation.
- **MEV (Maximal Extractable Value)**: Value extracted by block producers by reordering, inserting, or censoring transactions. Affects DEX users and DeFi protocols.
- **Reentrancy**: A smart contract vulnerability where external calls allow a contract to be called recursively before state updates complete. Classic exploit vector.

## Regulatory/Compliance

- **Securities law**: Tokens may be classified as securities depending on jurisdiction and how they're sold. Howey test (US) and equivalent frameworks elsewhere. Legal opinion required before any token launch.
- **AML/KYC**: DeFi is under increasing regulatory scrutiny. Centralized exchanges (CEXes) are required to implement KYC. DEXes face varying requirements by jurisdiction.
- **OFAC sanctions**: US-based projects must screen against OFAC sanctions lists. Tornado Cash sanctions set precedent for protocol-level obligations.
- **MiCA (Markets in Crypto-Assets)**: EU regulation effective 2024. Covers crypto-asset issuers and service providers operating in the EU.
- **FATF Travel Rule**: Applies to virtual asset service providers (VASPs) — requires sharing sender/receiver information for transactions above thresholds.

## Common Pitfalls

- Deploying contracts without a security audit — immutability means bugs are permanent unless upgrade mechanisms exist
- Insufficient test coverage before mainnet — testnets are cheap, exploits are expensive
- Centralized admin keys without multi-sig — single point of failure and attack target
- Oracle manipulation attacks from using low-liquidity or single-source price feeds
- Reentrancy vulnerabilities from calling external contracts before state updates
- Token economics designed for launch without modeling long-term incentive sustainability
- Assuming testnet behavior matches mainnet — gas prices, block times, and MEV differ

## Quality Signals

- Understands the on-chain/off-chain cost tradeoff and designs accordingly
- Proposes multi-sig for any admin functionality
- Requires security audit before mainnet deployment for any contract controlling value
- Knows the difference between ERC standards and when to comply vs. extend
- Can explain MEV and its implications for user experience in DeFi contexts
- Treats reentrancy, integer overflow, and access control as default review items

## Anti-Patterns

- Treating smart contracts like regular backend code (no audit, no formal verification, no immutability consideration)
- Storing content (images, metadata) on-chain when IPFS or Arweave handles it at a fraction of the cost
- "We'll audit before mainnet" without scheduling and budgeting the audit in advance
- Centralized upgrade keys controlled by a single person or single hot wallet

## Recommended Stack/Tools

- **Smart contract development**: Hardhat (JavaScript/TypeScript tooling), Foundry (Rust-based, fast, property testing), Truffle (legacy)
- **Languages**: Solidity (EVM), Vyper (EVM, more constrained), Rust (Solana, Near)
- **Indexing**: The Graph (decentralized, GraphQL), Alchemy Subgraphs, custom Node.js indexers with PostgreSQL
- **Security**: OpenZeppelin Contracts (audited base contracts), Slither (static analysis), Certora (formal verification), Trail of Bits / OpenZeppelin / Zellic (audit firms)
- **Frontend**: ethers.js, viem (modern, TypeScript-first), wagmi (React hooks), RainbowKit / ConnectKit (wallet UI)
- **Infrastructure**: Alchemy, Infura, QuickNode (RPC providers), Tenderly (debugging, simulation)
- **Multi-sig**: Gnosis Safe
