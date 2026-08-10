# Solr search

[Solr](https://solr.apache.org/) is an **optional** full-text search engine. It is typically faster and more capable than NADA’s built-in database search, especially for large catalogs and variable-level search.

By default NADA uses database search (`search_provider = db`). After Solr is installed and indexed, switch the catalog to Solr in [Site configurations](./site-configurations).

## Before you start

Install Java and Solr on the server, then confirm the Solr Admin UI (usually `http://localhost:8983`). Full platform steps:

- [Solr full-text search — install guide](/installation-guide/installation-solr) (Windows and Linux)

Do not expose Solr’s Admin UI (`8983`) to the public internet without authentication and a firewall.

## Connect NADA to Solr

Edit **`application/config/solr.php`** on the NADA application server:

```php
$config['solr_host'] = "localhost";
$config['solr_port'] = "8983";
$config['solr_collection'] = "nada";
```

| Setting | Meaning |
|---------|---------|
| `solr_host` | Hostname or IP of the Solr server |
| `solr_port` | Usually `8983` |
| `solr_collection` | Core/collection name (default **`nada`**) |

The collection name must match the core you create next.

## Solr admin UI

NADA includes a Solr management page for cores, schema setup, and indexing. You do **not** need to hand-edit Solr’s `managed-schema.xml` for a normal install.

1. Log in as a site administrator.
2. Open **Site administration → Solr**  
   (URL pattern: `/index.php/admin/solr`).

You need permission to **edit configurations**.

### Recommended order

#### 1. Dashboard — Ping Solr

Use **Ping SOLR**. Status should show **Online**. The dashboard also shows Solr version and document counts when the connection works.

#### 2. Core Management — create the core

1. Open **Core Management**.
2. Click **Check Core Status** for the core named in `solr.php` (default `nada`).
3. If the core is missing, click **Create Core "nada"** (or your configured name).

**Alternative (Solr host command line):**

```bash
# Linux
sudo -u solr /opt/solr/bin/solr create_core -c nada

# Windows (from the Solr install folder)
bin\solr.cmd create_core -c nada
```

Use the same name as `$config['solr_collection']`.

#### 3. Schema Management — initialize the schema

1. Open **Schema Management**.
2. Click **Setup Complete Schema** (creates the field definitions NADA expects for studies, variables, and citations).
3. Click **Validate Schema**.

Optional:

- **Setup Variable Fields** / **Setup Survey Fields** — partial setups  
- **Replace existing fields** — only when rebuilding schema on purpose  

Field definitions are defined in `application/config/solr.php` and applied through Solr’s Schema API.

#### 4. Index the catalog

Use **Index Operations** in this order for a full catalog:

| Action | Purpose |
|--------|---------|
| **Index Studies** | Catalog entries / studies |
| **Index Variables** | Variable-level metadata (microdata) |
| **Index by Survey** | Variables for one survey at a time (useful for large catalogs) |
| **Index Citations** | Citations, if you use them |

Each screen shows progress and supports stop/resume where available. Keep the browser tab open while a job runs.

**Core Operations:**

- **Commit** — flush pending index changes  
- **Clear Index** — deletes all Solr documents; you must reindex afterward  

Compare **database** vs **index** counts on the dashboard when indexing finishes.

### Optional: CLI indexing

For large catalogs or automation, from the NADA application root:

```bash
php index.php cli/solr/index_studies
php index.php cli/solr/index_variables
```

See `application/controllers/cli/Solr.php` for available commands and parameters.

## Enable Solr as the search provider

After the core exists, the schema is set up, and indexing has completed:

1. Open **Site Administration → Settings** ([Site configurations](./site-configurations)).
2. Set **Search provider** to **Solr**.
3. Save.

Until you switch this setting, the public catalog continues to use database search even if Solr is indexed.

Then test keyword search on the public catalog (studies and, for microdata, variables).

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| Ping fails / Offline | Solr service running; host/port in `solr.php`; firewall; PHP can reach Solr |
| Core not found | Create core in admin UI or CLI; name matches `solr_collection` |
| Schema errors | Run **Setup Complete Schema** again; check Solr logs; Validate Schema |
| Empty search after enabling Solr | Indexing incomplete; still on `db` provider; Clear Index then reindex |
| Indexing stalls | PHP timeouts; use Index by Survey or CLI; check `solr_timeout` in `solr.php` |
| Cannot open admin Solr page | Logged in as admin with configurations **edit** permission |

More install-related troubleshooting: [Solr install guide](/installation-guide/installation-solr#troubleshooting).

## Related

- [Solr install (Windows & Linux)](/installation-guide/installation-solr)
- [Site configurations](./site-configurations) — search provider
- [Apache Solr documentation](https://solr.apache.org/guide/)
