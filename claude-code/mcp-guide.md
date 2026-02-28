# MCP Guide

## What MCP Does

MCP (Model Context Protocol) adds tools to Claude beyond its built-ins. After installing an MCP server, Claude gains new tool calls it can invoke — a browser automation server gives it `browser_navigate` and `browser_screenshot`; a database server gives it `sql_query`. Claude treats these exactly like native tools.

The key difference from hooks: MCP servers are persistent processes with their own state. A browser automation server keeps a browser session alive across tool calls. A database server maintains a connection pool. Hooks are fire-and-forget scripts; MCP servers are long-lived capabilities.

---

## Configuration

MCP servers are configured in `.claude/settings.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp"]
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**Transport types**:
- `stdio` — Server runs as a subprocess, communicates over stdin/stdout. Most common. Works for local servers and npx-installed packages.
- `sse` — Server runs as an HTTP server, communicates over Server-Sent Events. Use for remote servers or when you need the server to persist between Claude Code sessions.

Environment variables: use `${VAR_NAME}` syntax to reference from the environment. Never hardcode tokens in settings.json.

---

## High-Value Servers

**Browser automation — `@playwright/mcp`**
Navigate pages, click elements, extract content, take screenshots. Useful for testing flows, scraping structured data, filling forms. The stateful session means Claude can maintain a logged-in browser state across multiple tool calls in one session.

**GitHub — `@modelcontextprotocol/server-github`**
Create issues, comment on PRs, list repositories, manage branches. Higher capability than bash + curl for complex GitHub workflows.

**Database clients**
Servers exist for Postgres, SQLite, MySQL. Direct SQL access from Claude — useful for data analysis, schema exploration, migration validation. More reliable than parsing `psql` CLI output.

**Filesystem extras — `@modelcontextprotocol/server-filesystem`**
Extended filesystem operations beyond what the native tools provide. Useful if you need operations Claude Code's built-ins don't expose.

**Slack — `@modelcontextprotocol/server-slack`**
Post messages, read channels, react to messages. Useful for automation workflows where Claude needs to communicate results.

---

## MCP vs Hooks vs Bash

These three overlap and the wrong choice adds complexity for no gain.

| Capability | Best Tool | Why |
|---|---|---|
| Format code after edit | Hook | Event-driven, file-scoped, no persistence needed |
| Run tests after change | Hook | Event-driven, triggered by tool type |
| Navigate a website | MCP (playwright) | Stateful session, structured API |
| Query a database repeatedly | MCP | Connection reuse, structured results |
| One-off API call | Bash + curl | Zero setup overhead |
| Git operations | Bash | Git CLI is already complete |
| Audit log every command | Hook | Event-driven, append-only |
| Persistent GitHub workflow | MCP | Better than repeatedly constructing curl commands |

The heuristic: if you need state between calls or a structured API that's cumbersome to use through bash, use MCP. If it's event-driven automation on tool calls, use hooks. If it's a one-off command, use bash.

---

## Creating a Minimal MCP Server

The MCP protocol requires two endpoints: `tools/list` (returns available tools) and `tools/call` (executes a tool).

Minimal TypeScript stdio server:

```typescript
import { createInterface } from "readline";

const tools = [
  {
    name: "get_timestamp",
    description: "Returns the current UTC timestamp",
    inputSchema: { type: "object", properties: {} }
  }
];

const rl = createInterface({ input: process.stdin });

rl.on("line", (line) => {
  const request = JSON.parse(line);

  if (request.method === "tools/list") {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0",
      id: request.id,
      result: { tools }
    }) + "\n");
  }

  if (request.method === "tools/call" && request.params.name === "get_timestamp") {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        content: [{ type: "text", text: new Date().toISOString() }]
      }
    }) + "\n");
  }
});
```

This is the entire protocol for a simple server. Real servers add error handling, validation, and more tools — but the shape is always the same: read JSON from stdin, write JSON to stdout, respond to `tools/list` and `tools/call`.

Register it in settings.json:
```json
{
  "mcpServers": {
    "my-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "path/to/server.ts"]
    }
  }
}
```

---

## Maintenance Overhead

Every MCP server is a dependency. It can break when packages update, when tokens expire, when the server process crashes. Before installing a server, ask: will I use this at least weekly? Is bash + curl genuinely inadequate? If the answer to either is no, skip the MCP and use bash.
