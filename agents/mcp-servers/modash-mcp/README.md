# Modash MCP Server

MCP server that exposes the [Modash Influencer Discovery API](https://docs.modash.io/) as tools for AI agents.
Built for OpenClaw agents via mcporter (stdio transport).

## Tools

| Tool | Endpoint | Cost | Description |
|------|----------|------|-------------|
| `modash_account_info` | `GET /user/info` | Free | Check credits, plan, rate limits |
| `modash_search_instagram` | `POST /instagram/search` | 0.01/result | Search IG influencers by filters |
| `modash_search_tiktok` | `POST /tiktok/search` | 0.01/result | Search TikTok influencers by filters |
| `modash_profile_report` | `GET /{platform}/profile/{id}/report` | 1 credit | Full profile + audience report |
| `modash_ai_text_search` | `POST /ai/{platform}/text-search` | 0.025/profile | Natural language creator search |
| `modash_lookalikes` | `POST /ai/{platform}/lookalikes` | 0.025/profile | Find similar creators |
| `modash_locations` | `GET /{platform}/locations` | Free | Look up location IDs for filters |

## Prerequisites

- Node.js >= 22 (the VM uses `fnm` with Node 22)
- A Modash API key with active credits

## Local setup (development)

```bash
cd modash-mcp
npm install
MODASH_API_KEY=your_token_here node src/index.js
```

The server communicates over stdio using the MCP protocol. It is not meant to be
run standalone in a terminal (it will appear to hang waiting for JSON-RPC input).

## Deploy to VM

1. Copy the project to the VM:

```bash
# From your local machine
scp -r modash-mcp/ juanj@34.176.239.204:/home/juanj/mcp-servers/modash-mcp/
```

2. Install dependencies on the VM:

```bash
ssh juanj@34.176.239.204
cd /home/juanj/mcp-servers/modash-mcp
npm install --production
```

3. Register in mcporter config (`~/.openclaw/mcporter.json` on the VM):

```json
{
  "mcpServers": {
    "modash": {
      "command": "node",
      "args": ["/home/juanj/mcp-servers/modash-mcp/src/index.js"],
      "description": "Modash Influencer Discovery API",
      "env": {
        "MODASH_API_KEY": "your_real_token_here"
      }
    }
  }
}
```

4. Restart the OpenClaw gateway so mcporter picks up the new server:

```bash
# Find and kill the existing gateway process
kill $(pgrep -f "openclaw gateway")
# Restart
nohup openclaw gateway > /dev/null 2>&1 &
```

5. Verify in Telegram: send a message to the agent asking it to check Modash credits.
   The agent should invoke `modash_account_info` and report the result.

## Usage notes

- **Always call `modash_account_info` first** to check available credits before running searches.
- **Use `modash_locations` before location-based searches** to get the correct location IDs.
  - Colombia (Instagram): `102803938`
- **AI text search is rate-limited** to 1 request per second. The server returns a clear warning if you hit 429.
- **Credit costs** are documented in each tool description. Profile reports cost 1 full credit; be selective.
- Refer to the [Modash Playbook](../../knowledge/modash-playbook.md) for credit optimization rules and vetting workflow.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MODASH_API_KEY` | Yes | Bearer token for Modash API authentication |
