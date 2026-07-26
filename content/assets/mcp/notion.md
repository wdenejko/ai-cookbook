---
title: "Notion MCP Connector"
description: "A remote HTTP MCP server that connects ChatGPT to a Notion workspace for searching pages, reading content, and creating or updating pages and databases. Use when you want ChatGPT to work with your Notion knowledge base directly instead of copy-pasting."
library:
  tags: [mcp, notion]
  category: "Connectors"
  visibility: local
  targets: [codex, openai-api]
  sourceProject: null
  trustRequired: false
  containsSecrets: true
---

## What this connects
Wires ChatGPT to Notion's hosted MCP server so it can search, read, and write pages
and databases in your workspace.

## Install
Connect the server from ChatGPT Plugins, or add it to Codex with:

```bash
codex mcp add --transport http notion https://mcp.notion.com/mcp \
  --header "Authorization: Bearer ${NOTION_TOKEN}"
```

## Auth — set the token, never commit it
The config reads the bearer token from the `NOTION_TOKEN` environment variable; the
literal value is **not** stored in this file.

1. Create a Notion internal integration and copy its secret:
   https://www.notion.so/my-integrations
2. In Notion, share each page/database you want ChatGPT to reach with that integration
   (Notion scopes access per share).
3. Export the token in your shell (add to `~/.zshrc`, or a git-ignored `.env`):
   ```bash
   export NOTION_TOKEN="ntn_xxx..."
   ```

> `containsSecrets: true` — this connector requires a secret. Keep it in the
> environment or a secrets manager. Never paste the literal token into the committed
> JSON.

## Notes
- `trustRequired: false` — the server runs remotely over HTTPS and executes no local
  code, so it needs no workspace trust. It does gain read/write access to the Notion
  content you share with the integration, so scope that sharing narrowly.
- Notion's hosted endpoint also supports an OAuth browser flow. To use OAuth instead,
  drop the `Authorization` header and complete the sign-in prompt ChatGPT surfaces on
  first connection.
- Revoke access anytime by deleting the integration or unsharing pages in Notion.
