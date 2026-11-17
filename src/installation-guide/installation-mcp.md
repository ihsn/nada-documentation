# MCP server (AI assistants)

The [Model Context Protocol](https://modelcontextprotocol.io) (MCP) lets an AI assistant, such as Claude, use your
catalog as a tool. Connected to NADA's MCP server, an assistant can search the catalog, read a study's metadata, and
fetch and analyse indicator data: "rank countries by under-5 mortality in 2022", "is literacy correlated with GDP?".

The MCP server is part of [NADA-AI](./installation-nada-ai). It is running as soon as NADA-AI runs; this page explains
how to make it reachable, how to configure it and how to connect assistants.

## Checklist

1. Install NADA-AI: [NADA-AI semantic search (Docker)](./installation-nada-ai).
2. For indicator analytics, set up [MongoDB](./installation-mongodb) and upload indicator data.
3. [Check the endpoint](#_1-check-the-endpoint) on the NADA-AI host.
4. [Configure it](#_2-configure-it) in NADA-AI's `.env`.
5. [Publish it](#_3-publish-it-through-a-reverse-proxy) through a reverse proxy, and decide who may reach it.
6. [Connect an assistant](#_4-connect-an-assistant).

---

## Requirements

| Component | Notes |
|-----------|-------|
| **NADA-AI** | Installed and running. See [NADA-AI semantic search (Docker)](./installation-nada-ai) |
| **NADA** | Reachable from NADA-AI at `AI4DATA_METADATA_CATALOG_URL` |
| **MongoDB** | Needed only for the indicator data and analytics tools. Without it, search and metadata still work. See [MongoDB](./installation-mongodb) |
| **Reverse proxy** | Apache or nginx with HTTPS, to make `/mcp` reachable from outside the NADA-AI host |
| **AI assistant** | Any MCP client that supports the *streamable HTTP* transport: Claude (claude.ai, Claude Desktop, Claude Code), VS Code, the MCP Inspector |

---

## What the assistant can see

The MCP tools call NADA's **public API** (`/api/catalog/search`, `/api/catalog/{idno}` and
`/api/timeseries/data/...`), **anonymously**. They send no API key or cookie, so they see exactly what a visitor to
the catalog sees: published studies only. An unpublished study answers as not found.

NADA-AI's own NADA API key (`AI4DATA_METADATA_CATALOG_X_API_KEY`) is used for indexing only and is never sent by the
MCP tools.

- The tools do not query NADA-AI's search index directly. Their catalog searches go through NADA, so they are
  **semantic only when NADA's search engine is NADA-AI** (see [NADA-AI search](/admin-guide/web-ui/nada-ai)).
  Otherwise they get NADA's database or Solr results.
- Every tool is **read-only**.
- Every data type can be searched and its metadata read. The **analytics tools work on indicators (time series)
  only**, and need the indicator's data loaded in MongoDB.
- Variables and citations have no MCP tools.

---

## 1. Check the endpoint

The MCP server listens on the same port as the NADA-AI API, at `/mcp`. No setting turns it on. On the NADA-AI host:

```bash
curl -s -X POST http://127.0.0.1:8020/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"check","version":"1"}}}'
```

The answer includes `"serverInfo"` with the server name. With the compose file from the installation guide, NADA-AI
listens on `127.0.0.1:8020` only, so `/mcp` cannot be reached from other machines yet.

---

## 2. Configure it

Add these to NADA-AI's `.env` (in `/opt/nada-ai` with the installation guide), then restart:
`docker compose -f docker-compose.nada.yml up -d`.

| Variable | Default | Purpose |
|----------|---------|---------|
| `FASTMCP_STATELESS_HTTP` | `false` | Set to **`true`** whenever a reverse proxy, a load balancer or more than one process sits in front of NADA-AI. Without it, clients lose their session between calls |
| `NADA_MCP_CATALOG_NAME` | `NADA catalog` | Your catalog's name, used in the tool descriptions the assistant reads, e.g. `Kenya National Data Archive` |
| `NADA_MCP_SERVER_NAME` | `NADA MCP Server` | Name shown in the assistant's list of connectors |
| `NADA_MCP_TOOL_PREFIX` | `nada` | Prefix of every tool and prompt name. Lowercase letters, digits and underscores. Change it when an assistant connects to several catalogs, e.g. `knbs` |
| `NADA_MCP_SEARCH_CATALOG_DESCRIPTION` | unset | Replaces the description of the search tool entirely |
| `NADA_MCP_GET_METADATA_DESCRIPTION` | unset | Replaces the description of the metadata tool entirely |
| `NADA_MCP_LOG_LEVEL`, `NADA_MCP_LOG_FILE` | `INFO`, unset | Logging |

`NADA_MCP_PORT` and `NADA_MCP_TRANSPORT` apply only to the standalone server
([below](#standalone-server)), not to `/mcp`.

---

## 3. Publish it through a reverse proxy

::: warning No authentication
`/mcp` has **no authentication** and **no rate limit**. The tools see only published content, but every call costs
NADA requests. Decide who may use it:

- only your organisation: allow your network's addresses at the proxy, or keep it on a VPN;
- anyone: publish it openly, as you would the catalog itself, and watch NADA's load;
- in between: put authentication in front of it at the proxy.

claude.ai and Claude Desktop connectors call the server **from Anthropic's cloud**, so for them `/mcp` must be
reachable from the internet. Claude Code, VS Code and the MCP Inspector call it from the user's machine.
:::

### Apache

In the NADA-AI virtual host from the [installation guide](./installation-nada-ai#nada-on-another-server), the `/mcp`
lines must come **before** the catch-all `ProxyPass /`, because Apache uses the first match:

```apache
ProxyPreserveHost On
ProxyTimeout 300

ProxyPass        /mcp http://127.0.0.1:8020/mcp flushpackets=on
ProxyPassReverse /mcp http://127.0.0.1:8020/mcp

<Location "/mcp">
    # Remove to allow everyone
    Require ip 10.0.0.0/8
</Location>

ProxyPass        /    http://127.0.0.1:8020/
ProxyPassReverse /    http://127.0.0.1:8020/
```

`flushpackets=on` sends streamed answers to the client as they are written. Needs `mod_proxy` and `mod_proxy_http`.

To publish **only** `/mcp` and keep the rest of the NADA-AI API private, leave out the two `ProxyPass /` lines.

### nginx

```nginx
location /mcp {
    allow 10.0.0.0/8;   # remove both lines to allow everyone
    deny  all;

    proxy_pass http://127.0.0.1:8020/mcp;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_read_timeout 300s;
}
```

Check from outside:

```bash
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://nada-ai.example.org/mcp \
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"ping"}'
```

Any answer other than `403`, `404` or a connection error means the proxy reaches NADA-AI.

---

## 4. Connect an assistant

Replace the URL with your own.

**claude.ai or Claude Desktop:** *Settings → Connectors → Add custom connector*, then enter
`https://nada-ai.example.org/mcp`. The server must be reachable from the internet.

**Claude Code:**

```bash
claude mcp add --transport http nada https://nada-ai.example.org/mcp
```

**VS Code** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "nada": { "type": "http", "url": "https://nada-ai.example.org/mcp" }
  }
}
```

**MCP Inspector**, for testing: run `npx @modelcontextprotocol/inspector`, choose the *Streamable HTTP* transport and
enter the URL.

### Check that it works

1. Ask the assistant to list the NADA tools. The 17 tools [below](#tools) should appear with your prefix.
2. Ask it to "find indicators about poverty". It should call `nada_search_catalog`.
3. Ask for data from one of the results, e.g. "rank countries by this indicator for the latest year". It should
   call `nada_get_schema`, then `nada_rank`.

---

## Tools

All tool names start with `NADA_MCP_TOOL_PREFIX` (default `nada`).

### Catalog

| Tool | Works on | What it does |
|------|----------|--------------|
| `nada_search_catalog` | All data types | Searches the catalog by keywords and filters. The data type defaults to indicators (time series); the assistant asks for another type, e.g. survey or document, when needed |
| `nada_get_metadata` | All data types | Full metadata of one study, by `idno` |

### Indicator data

These need the indicator's data in MongoDB.

| Tool | What it does |
|------|--------------|
| `nada_get_schema` | The indicator's data structure: columns and their roles (geography, time period, value, dimensions), and the time format. The assistant calls it before any analytics |
| `nada_get_codelist` | The codes and labels of one dimension, e.g. `SEX`: `M`, `F`, `T`, to filter the data correctly |
| `nada_get_data` | Observations, page by page, with filters |

### Indicator analytics

Computed by NADA-AI from the indicator's data. Each accepts filters on dimensions for disaggregated indicators.

| Tool | What it answers |
|------|-----------------|
| `nada_rank` | Top or bottom geographies by value for one period |
| `nada_extremes` | Highest and lowest observation, across all geographies and periods |
| `nada_compare` | Side-by-side time series of several geographies |
| `nada_summarize` | Minimum, maximum, mean, median and standard deviation across geographies for one period |
| `nada_growth` | Change between two periods per geography, absolute and in percent |
| `nada_trend` | Linear trend per geography: slope, R² and direction (improving, declining, stable) |
| `nada_coverage` | Data availability per geography: periods covered and gaps |
| `nada_outliers` | Geographies whose value is unusual for a period (Z-score) |
| `nada_benchmark` | Where one or more geographies stand among all others: percentile, Z-score, distance from the mean |
| `nada_aggregate` | Group statistics per period, e.g. for a region or a custom group of countries |
| `nada_correlate` | Correlation between two indicators across geographies for one period |
| `nada_join` | Two indicators merged by geography and period, for further analysis |

### Interactive apps

Assistants that support MCP apps (for example claude.ai and Claude Desktop) can also show forms and charts inline.
These tool names have no prefix:

| App | Shows |
|-----|-------|
| `search_catalog_ui` | A catalog search form with results |
| `explore_indicator_schema` | An indicator's structure and codelists |
| `visualize_indicators` | A chart of one or more indicators |
| `summarize_indicator`, `rank_ref_areas`, `compare_ref_areas` | Summary, ranking and comparison, as charts |
| `show_extremes`, `show_growth`, `show_trend`, `show_coverage`, `show_outliers`, `show_benchmark`, `show_aggregate`, `show_correlate`, `show_join` | The matching analytics tool's results as a chart or table |

### Prompts and resources

| Kind | Name | Use |
|------|------|-----|
| Prompt | `nada_explore_indicator` | A first look at one indicator: structure, coverage and trend |
| Prompt | `nada_compare_countries` | Compares chosen geographies on one indicator for one period: values, rank, benchmark |
| Prompt | `nada_find_anomalies` | Unusual values: geographies that stand out in one period, or unusual years for one geography |
| Resource | `nada://search-usage` | Notes on using the search tool |
| Resource | `nada://analytics-workflow` | The order in which to call the analytics tools |

Prompts appear as slash commands in clients that support them. Their names use the tool prefix.

---

## Standalone server

The MCP server can also run on its own, without the NADA-AI API, for example on another host. It reads the same
`.env` and only needs to reach NADA:

```bash
uv run python -m nada_ai.mcp_server --port 8025
```

It always runs stateless. Publish it through a proxy as above, pointing at port `8025`.

---

## Troubleshooting

| Issue | What to check |
|-------|---------------|
| The client cannot connect, or loses its session between calls | `FASTMCP_STATELESS_HTTP=true` is missing behind the proxy. Add it and restart NADA-AI |
| Answers arrive only at the end, or time out | The proxy buffers. Use `flushpackets=on` (Apache) or `proxy_buffering off` (nginx) |
| `404` from the proxy | The `/mcp` lines come after `ProxyPass /` (Apache), or the location is missing |
| claude.ai cannot add the connector | `/mcp` is not reachable from the internet, or the certificate is not valid |
| Searches find no surveys or documents | The search tool defaults to indicators. Ask for the data type in the question |
| Search results are not semantic | NADA's search engine is not NADA-AI. See [NADA-AI search](/admin-guide/web-ui/nada-ai#_5-switch-the-catalog-to-nada-ai) |
| A study is "not found" | It is unpublished. The tools see only published studies |
| Indicator data tools fail | The indicator has no data in MongoDB, or MongoDB is not configured. Run `php index.php cli/mongo_check` on the NADA server |
| Tool calls fail with connection errors | NADA-AI cannot reach NADA at `AI4DATA_METADATA_CATALOG_URL`. From Docker, a NADA on the same server is `http://host.docker.internal/...` |
| A call is rejected before it runs | NADA-AI's input check blocked it: an argument over 5,000 characters, a search under 3 characters, or text that looks like a prompt injection |

## Related

- [NADA-AI semantic search (Docker)](./installation-nada-ai) · [NADA-AI search](/admin-guide/web-ui/nada-ai)
- [MongoDB](./installation-mongodb) · [Indicators](/admin-guide/content/indicators)
- NADA-AI's [MCP guide](https://github.com/mah0001/nada-ai/blob/main/docs/mcp.md)
