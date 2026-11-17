# NADA-AI semantic search (Docker)

[NADA-AI](https://github.com/mah0001/nada-ai) is an **optional** search service that runs next to NADA. It adds
**semantic search**: the catalog finds studies by meaning, not only by matching words, and it searches across
languages. It also serves NADA's variable and citation search, and includes an MCP server for AI assistants.

NADA-AI stores its indexes in [OpenSearch](https://opensearch.org/). This guide installs both with Docker on the NADA
server or on a separate host. When it is running, continue in the admin guide:
[NADA-AI search](/admin-guide/web-ui/nada-ai), to connect NADA, build the index and switch the catalog over.

::: tip Which version
Use the NADA-AI repository at **[github.com/mah0001/nada-ai](https://github.com/mah0001/nada-ai)**. It receives
changes first. NADA-AI support in NADA appears as **Site administration → Search index**; if your NADA has no such
page, upgrade NADA first.
:::

## Checklist

1. Check the [requirements](#requirements).
2. [Download NADA-AI](#_1-download-nada-ai) and [create the compose file](#_2-create-the-compose-file).
3. [Configure `.env`](#_3-configure-env), including a NADA API key for NADA-AI.
4. [Download the embedding model](#_4-download-the-embedding-model) once.
5. [Start the stack](#_5-start-and-check) and check it.
6. [Create the key NADA will use](#_6-create-the-key-nada-will-use).
7. Continue in [NADA-AI search](/admin-guide/web-ui/nada-ai) (admin guide).

---

## Requirements

| Component | Notes |
|-----------|-------|
| **Docker** | Docker Engine with Compose v2 (`docker compose`). On Windows or macOS, Docker Desktop |
| **Memory** | 8 GB RAM at least for OpenSearch and the embedding model together; 16 GB for large catalogs |
| **Disk** | About 2 GB for images and the model, plus the index (several GB for a catalog of thousands of studies) |
| **CPU** | Any modern x86-64 or ARM CPU. A GPU is not needed; indexing a large catalog the first time takes hours on CPU |
| **Network** | NADA-AI must reach NADA's URL, and NADA's PHP must reach NADA-AI on port 8020 |
| **NADA** | A version with the **Search index** page, and a site administrator account |

On Linux, OpenSearch needs a higher memory-map limit. Set it once on the Docker host:

```bash
echo 'vm.max_map_count=262144' | sudo tee /etc/sysctl.d/99-opensearch.conf
sudo sysctl --system
```

---

## 1. Download NADA-AI

```bash
sudo mkdir -p /opt/nada-ai && sudo chown "$USER" /opt/nada-ai
git clone https://github.com/mah0001/nada-ai.git /opt/nada-ai
cd /opt/nada-ai
mkdir -p data/models data/nada-discovery data/config
```

| Folder | Holds |
|--------|-------|
| `data/models` | The embedding model, downloaded once |
| `data/nada-discovery` | Cached metadata read from NADA |
| `data/config` | NADA-AI's API keys, audit log and job checkpoints. **Back it up** |

---

## 2. Create the compose file

The repository's own `docker-compose.opensearch.yml` is for development. For a server, save the following as
`docker-compose.nada.yml` in `/opt/nada-ai`:

```yaml
name: nada-ai

services:
  opensearch:
    image: opensearchproject/opensearch:3.6.0
    restart: unless-stopped
    environment:
      - discovery.type=single-node
      - plugins.security.disabled=true
      - DISABLE_INSTALL_DEMO_CONFIG=true
      - OPENSEARCH_JAVA_OPTS=-Xms2g -Xmx2g
    volumes:
      - opensearch-data:/usr/share/opensearch/data
    ulimits:
      memlock: { soft: -1, hard: -1 }
      nofile: { soft: 65536, hard: 65536 }
    networks: [backend]
    healthcheck:
      test: ["CMD-SHELL", "curl -fs 'http://localhost:9200/_cluster/health?wait_for_status=yellow&timeout=5s' >/dev/null"]
      interval: 10s
      timeout: 10s
      retries: 30
      start_period: 30s

  nada-ai:
    build: .
    image: nada-ai:latest
    restart: unless-stopped
    env_file: .env
    environment:
      NADA_SEARCH_BACKEND: opensearch
      NADA_OPENSEARCH_URL: http://opensearch:9200
      NADA_EMBEDDING_BACKEND: local
      NADA_EMBEDDING_DEVICE: cpu
      NADA_QUERY_PROMPT: "Instruct: Retrieve texts that help answer the user's query or find related information\nQuery: "
      HF_HOME: /models/huggingface
      SENTENCE_TRANSFORMERS_HOME: /models/huggingface/hub
      HF_HUB_OFFLINE: "1"
      HF_HUB_DISABLE_XET: "1"
      TRANSFORMERS_OFFLINE: "1"
      AI4DATA_DISCOVERY_DATA_PATH: /workspace/data/nada-discovery
    ports:
      - "127.0.0.1:8020:8020"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - ./data/models:/models/huggingface
      - ./data/nada-discovery:/workspace/data/nada-discovery
      - ./data/config:/workspace/config
    networks: [backend, default]
    depends_on:
      opensearch:
        condition: service_healthy

volumes:
  opensearch-data:

networks:
  backend:
    internal: true
```

What it does:

- **OpenSearch has no published port.** It sits on an internal Docker network that only NADA-AI can reach, so its
  security plugin can stay off. If OpenSearch must be reachable from other hosts, or you run your own cluster, turn
  security on instead: see NADA-AI's
  [secured cluster notes](https://github.com/mah0001/nada-ai/blob/main/docs/opensearch-setup-guide.md#secured-opensearch-cluster).
- **NADA-AI listens on `127.0.0.1:8020` only.** NADA on the same server calls it there. For NADA on another server,
  put a reverse proxy with HTTPS in front of it ([below](#nada-on-another-server)).
- **The heap is 2 GB.** Raise `-Xms`/`-Xmx` together (to about half of the RAM you give OpenSearch) for a large
  catalog.
- **The model runs offline.** It is downloaded once into `data/models` in step 4.

---

## 3. Configure `.env`

```bash
cp .env.example .env
chmod 600 .env
```

`.env.example` documents every variable. Set these:

| Variable | Value |
|----------|-------|
| `NADA_AI_ADMIN_KEY` | A long random secret. Generate one with `openssl rand -hex 32`. NADA-AI's master admin key: it protects NADA-AI's admin API, and you use it to issue the key NADA uses |
| `AI4DATA_METADATA_CATALOG_URL` | NADA's URL, up to and including `index.php`, e.g. `https://nada.example.org/index.php`. Leave out `index.php` if NADA uses [clean URLs](./configurations/clean-urls) |
| `AI4DATA_METADATA_CATALOG_X_API_KEY` | A NADA API key for NADA-AI, see below |
| `NADA_REPORT_SEARCH_INDEX_STATE_ENABLED` | `true` (the template's value). NADA's Search index page depends on it |
| `FASTMCP_STATELESS_HTTP` | `true`, needed when the MCP endpoint sits behind a proxy. Not in `.env.example`; add it. See [MCP server](./installation-mcp) |

**NADA on the same server.** From inside Docker, `localhost` is the container itself. Use
`http://host.docker.internal/...` in `AI4DATA_METADATA_CATALOG_URL`, or NADA's public URL if the server can reach it.

### The NADA API key for NADA-AI

NADA-AI reads studies, variables, citations and the change queue from NADA with this key.

1. In NADA, create a user for NADA-AI, e.g. `nada-ai@example.org`.
2. Give it a role with two permissions (see [Defining roles](/admin-guide/web-ui/users#defining-roles)):
   - **Search index**: view and edit, to read the change queue and the metadata extract, and to record what was
     indexed;
   - **Studies**: view, for every collection, to read each study's variables.
3. Log in as that user and generate an API key ([API keys](/admin-guide/web-ui/login)).
4. Put the key in `AI4DATA_METADATA_CATALOG_X_API_KEY`.

::: warning This key can read unpublished studies
Study view lets this user read unpublished studies. Keep the key secret and give the user no other permissions.
NADA-AI uses it for indexing only; its MCP server calls NADA without it, so MCP clients see published studies only.
:::

Do not reuse `NADA_AI_ADMIN_KEY` as the NADA API key, or the other way round.

---

## 4. Download the embedding model

The default model is `microsoft/harrier-oss-v1-270m` (about 1 GB, multilingual). Build the image and download the
model into `data/models` once:

```bash
docker compose -f docker-compose.nada.yml build
docker compose -f docker-compose.nada.yml run --rm --no-deps \
  -e HF_HUB_OFFLINE=0 -e TRANSFORMERS_OFFLINE=0 nada-ai \
  python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('microsoft/harrier-oss-v1-270m')"
```

The first build takes several minutes. If the server has no internet access, download the model on another machine
and copy the folder over, as described in NADA-AI's
[host setup guide](https://github.com/mah0001/nada-ai/blob/main/docs/opensearch-host-setup.md#get-the-harrier-model).

---

## 5. Start and check

```bash
docker compose -f docker-compose.nada.yml up -d
docker compose -f docker-compose.nada.yml ps        # both services "running", opensearch "healthy"
curl -s http://127.0.0.1:8020/health
```

`/health` answers `"status": "degraded"` until the first index exists. That is expected now.

Load the model into memory, which takes a few seconds the first time:

```bash
curl -s -X POST http://127.0.0.1:8020/health/embeddings/warmup \
  -H "X-NADA-Admin-Key: $(grep '^NADA_AI_ADMIN_KEY=' .env | cut -d= -f2-)"
```

---

## 6. Create the key NADA will use

NADA calls NADA-AI with one **admin** key, for searches and for indexing. Issue a separate one rather than giving NADA
`NADA_AI_ADMIN_KEY`:

```bash
H="X-NADA-Admin-Key: $(grep '^NADA_AI_ADMIN_KEY=' .env | cut -d= -f2-)"
curl -s -X POST http://127.0.0.1:8020/admin/keys -H "$H" \
  -H 'content-type: application/json' -d '{"name": "nada", "role": "admin"}'
```

The response shows the key once. Copy it for the next step in
[NADA-AI search](/admin-guide/web-ui/nada-ai#_2-connect-nada).

---

## NADA on another server

When NADA runs elsewhere, publish NADA-AI through a reverse proxy with HTTPS on the Docker host, and allow only NADA's
server to reach it. Keep the compose port on `127.0.0.1`.

Apache example (needs `mod_proxy`, `mod_proxy_http`, `mod_ssl`):

```apache
<VirtualHost *:443>
    ServerName nada-ai.example.org
    SSLEngine on
    # SSLCertificateFile / SSLCertificateKeyFile ...

    ProxyPreserveHost On
    ProxyTimeout 300
    ProxyPass        /mcp http://127.0.0.1:8020/mcp flushpackets=on
    ProxyPassReverse /mcp http://127.0.0.1:8020/mcp
    ProxyPass        /    http://127.0.0.1:8020/
    ProxyPassReverse /    http://127.0.0.1:8020/
</VirtualHost>
```

The MCP endpoint `/mcp` has no authentication. Restrict or block it at the proxy unless you mean to offer it; see
[MCP server](./installation-mcp#_3-publish-it-through-a-reverse-proxy). An nginx example is in
NADA-AI's [host setup guide](https://github.com/mah0001/nada-ai/blob/main/docs/opensearch-host-setup.md#nginx).

---

## Updating NADA-AI

```bash
cd /opt/nada-ai
git pull
docker compose -f docker-compose.nada.yml up -d --build
```

Check NADA's **Search index** page afterwards. When an update changes how an index is built, the page asks for a
rebuild under **Maintenance**.

## Backups

| What | How |
|------|-----|
| `data/config` | Copy it with your server backups. It holds the API keys; losing it means issuing new keys |
| The index | Optional. It can always be rebuilt from NADA, which takes hours for a large catalog. For faster recovery, use [OpenSearch snapshots](https://docs.opensearch.org/latest/tuning-your-cluster/availability-and-recovery/snapshots/index/) |
| `.env` | Keep a copy somewhere safe; it contains secrets |

---

## Troubleshooting

| Issue | What to check |
|-------|---------------|
| `opensearch` restarts in a loop | `vm.max_map_count` too low (Linux), or not enough memory for the heap. `docker compose -f docker-compose.nada.yml logs opensearch` |
| `nada-ai` waits and never starts | OpenSearch is not healthy yet; check its logs |
| `/health` fails or hangs | `docker compose -f docker-compose.nada.yml logs nada-ai`. A hang on the first search usually means the model is missing from `data/models`: repeat step 4 |
| NADA-AI cannot reach NADA (`ConnectError`) | `AI4DATA_METADATA_CATALOG_URL` uses `localhost`. Use `host.docker.internal` or NADA's public URL |
| NADA cannot reach NADA-AI | From the NADA server: `curl http://127.0.0.1:8020/health`. On another server, check the proxy and firewall |
| Worked, then stopped after a firewall change | Some firewall tools (firewalld reloads, CSF) remove Docker's network rules. Restart Docker: `sudo systemctl restart docker` |
| `401`/`403` from NADA in NADA-AI's logs | The NADA API key is wrong, or its user lacks the Search index or Studies permission. Variables fail alone when only Studies view is missing |
| `SSL: CERTIFICATE_VERIFY_FAILED` | An organisation proxy inspects TLS. See NADA-AI's [`certs/README.md`](https://github.com/mah0001/nada-ai/blob/main/certs/README.md) |

## Related

- [NADA-AI search](/admin-guide/web-ui/nada-ai): connect NADA, index, switch, monitor
- [MCP server](./installation-mcp): connect AI assistants, list of tools
- [Site configurations](/admin-guide/web-ui/site-configurations#search): the Search settings
- NADA-AI documentation: [OpenSearch setup guide](https://github.com/mah0001/nada-ai/blob/main/docs/opensearch-setup-guide.md),
  [host setup without Docker](https://github.com/mah0001/nada-ai/blob/main/docs/opensearch-host-setup.md),
  [MCP guide](https://github.com/mah0001/nada-ai/blob/main/docs/mcp.md)
