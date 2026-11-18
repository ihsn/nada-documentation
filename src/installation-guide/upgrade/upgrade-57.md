# Upgrade from 5.6 to 5.7 and later

Use this guide to upgrade NADA **5.6** or any **5.7.x** release to **5.7**, **5.8** or a later release. The steps are the same for every release from 5.6 onward, so you do not need to upgrade through each release in between: one run of the database migrations brings the database up to date.

If your catalog runs a release older than 5.6, first follow [Upgrade to 5.6](/installation-guide/upgrade/upgrade-56).

::: tip AI search and MCP
AI search and the MCP server for AI assistants need **NADA 5.8** or later. Upgrade NADA first, then follow [After the upgrade: new components](#after-the-upgrade-new-components).
:::

## How database upgrades work

Database changes are applied by migrations in `application/migrations/`. The database records the latest migration it has applied, and `migrate latest` runs every newer one in order.

- Every migration is **idempotent**. If one fails part way, fix the cause and run `migrate latest` again; steps already applied are skipped.
- Migrations are **one-way**. There is no rollback, so restore your backup if you need to go back.

For the CLI commands and troubleshooting, see [Database migrations (CLI)](/installation-guide/database-migrations-cli).

## Before you start

- [ ] Back up the **database** (full backup).
- [ ] Back up the NADA folder, especially `application/config/`, `datafiles/`, `files/` and your theme folder under `themes/`.
- [ ] Test the upgrade on a copy of the site first, if you can.
- [ ] Note your current version: open **Site administration**, or check the release you deployed.

## 1. Deploy the new code

Replace the application files with the new release, from the [release zip](https://github.com/ihsn/nada/releases) or with Git:

```bash
cd /path/to/nada
git fetch --tags
git checkout v5.8   # use the release you are upgrading to
```

### Configuration files

These files hold your site's settings and are not part of the release. A release zip or `git checkout` leaves them in place:

| File | Contents |
|------|----------|
| `application/config/database.php` | Database connection |
| `application/config/email.php` | Email settings |
| `application/config/auth.local.php` | Email credentials, OAuth and other secrets |
| `application/config/mongo.php` | MongoDB connection (indicators) |

The other files in `application/config/` are part of the release and are replaced with the new versions. If you edited any of them (for example `config.php`, `solr.php` or `rest.php`), copy your changes into the new files rather than restoring the old files. An old file keeps the site from getting the release's changes.

::: warning Upgrading from 5.6 with MongoDB
In 5.6, `application/config/mongo.php` was part of the release. From 5.7.2 it is a local file, and the release ships `mongo.sample.php` instead. Copy your `mongo.php` somewhere safe **before** deploying, because `git checkout` removes it. After deploying, put it back, or create it again from the sample:

```bash
cp application/config/mongo.sample.php application/config/mongo.php
```
:::

These configuration files were removed and can be deleted if they are still on the server:

- `semantic_search.php`: replaced by `nada_ai.php`. NADA-AI is set up under **Site configurations → Search**.
- `opensearch.php`: NADA's own OpenSearch search engine was removed. Sites that used it are switched to the database search engine by the migrations.

### Custom themes

If the site uses its own theme (a copy of `themes/nada52`), do not replace it with the stock theme. When upgrading from **5.6**, copy these new files from `themes/nada52/` into your theme, or catalog search fails:

| File | Why |
|------|-----|
| `layout_vue.php` | Page shell for catalog search |
| `head_vue.php` | `<head>` for catalog search |
| `css/catalog-vue-chrome.css` | Fonts and colors for catalog search |
| `css/fonts.css` | Web fonts, moved out of `style.css` |

`layout_vue.php` includes your theme's `header.php` and `footer.php`, so your logo, menu and footer still appear. If your `head.php` comes from the 5.6 `nada52`, add the `fonts.css` stylesheet before `style.css`.

See [Customizing themes](/installation-guide/configurations/customizing-themes).

## 2. Run the database migrations

Run the migrations **before anyone logs in or uses the site**. The new code expects the upgraded database, and login and the catalog fail until the migrations finish.

1. Enable migrations in `application/config/migration.php`:

   ```php
   $config['migration_enabled'] = TRUE;
   ```

2. From the NADA folder (the one that contains `index.php`), run:

   ```bash
   php index.php cli/migrate current           # show the current version
   php index.php cli/migrate list_migrations   # list pending and applied migrations
   php index.php cli/migrate latest            # apply all pending migrations
   ```

3. On production, set `migration_enabled` back to `FALSE`.

::: warning Use the command line
The command line is the recommended way to run the migrations. If it is not available, use **Site administration → Database migration** and run the pending migrations **one at a time** with **Run**. Do not use **Migrate to latest** for an upgrade: it runs everything in one web request, which can time out. See [Database migration](/admin-guide/web-ui/database-migration).
:::

### SQL Server

- SQL Server needs **Full-Text Search** installed. The upgrade from 5.6 rebuilds the full-text index on the variables table.
- On IIS, long migrations can exceed the FastCGI request limit in the web interface. Use the command line, or see the SQL Server notes in the NADA repository: [SQL Server upgrade notes](https://github.com/ihsn/nada/blob/v5.8/install/NADA57_SQLSRV_UPGRADE.md) and [manual runbook](https://github.com/ihsn/nada/blob/v5.8/install/NADA57_SQLSRV_MANUAL_RUNBOOK.md).

## 3. Check the upgrade

1. Run `php index.php cli/migrate current`. The version should match the highest-numbered file in `application/migrations/`.
2. Log in as an administrator and open **Site administration → Database migration**. It shows the same version, with no pending migrations.
3. Open the catalog, a study page and an indicator page (if you have indicators).

## 4. Review changes that may affect your site

### Solr

If the catalog uses Solr and you are upgrading from **5.6**, rebuild the Solr index after the migrations. The catalog search fields changed in 5.7, so an old index returns wrong or empty results. Update the schema and re-index the catalog as described in [Solr search](/admin-guide/web-ui/solr). Catalog search is incomplete until indexing finishes.

### Search settings

The migrations rename the search settings, so there is nothing to change by hand.

| Old setting | New setting |
|---|---|
| `search_provider` | `search_engine`: `database`, `solr` or `nada_ai` |
| `semantic_search_url` | `nada_ai_url` |
| `semantic_search_api_key`, `semantic_search_admin_api_key` | `nada_ai_api_key` |
| `semantic_search_debug` | `nada_ai_debug` |

### Permissions and API changes

- **Site and API logs:** the Site logs, API logs and log clean-up pages use a new **Site and API logs** permission. Full administrators are not affected; grant it to other roles that need these pages.
- **Filestore:** each filestore action checks its own privilege of the **Filestore** permission (view, download, upload, delete). Roles that edit menu pages need **view** and **upload** for the image picker.
- **API URLs moved:** `api/db_logs`, `api/api_logs` and `api/filestore` are now under `api/admin/` (`api/admin/db_logs`, `api/admin/api_logs`, `api/admin/filestore`). Update any scripts that call the old URLs.
- **API keys created before 5.6** that were never converted are rejected. Users need to create a new key. To accept old keys for a while, set `$config['api_key_enable_legacy_support'] = TRUE;` in `application/config/rest.php`.

### Indicators

Indicators accept only the **Open access**, **Direct access** and **Data not available** data access types. Existing indicators keep their stored type, and the admin study page warns about any indicator whose type is no longer allowed.

### Data deposit

The migrations create the new data deposit tables, but the feature stays off until you set `enable_datadeposit` to `true` in `application/config/datadeposit.php`. Projects created before 5.7 need to be imported into the new format; see [Data deposit migration](https://github.com/ihsn/nada/blob/v5.8/install/DATADEPOSIT_MIGRATION.md).

### robots.txt

Catalog search pages beyond the numbered pages use a cursor in the URL (`…&cursor=…`). Stop crawlers from following them:

- If the web root has no `robots.txt`, copy NADA's `robots.txt.example` there as `robots.txt`.
- If it already has one, add:

  ```
  User-agent: *
  Disallow: /*cursor=
  ```

`robots.txt` must be at the root of the host. If NADA is installed in a subfolder, put it in the host's root folder.

## After the upgrade: new components

These components are optional. Install the ones you need after NADA is upgraded:

| Component | Needed for | Guide |
|-----------|-----------|-------|
| MongoDB | Indicator (time series) data and the indicator data API | [MongoDB](/installation-guide/installation-mongodb) |
| NADA-AI | Semantic and multilingual search (NADA 5.8+) | [NADA-AI](/installation-guide/installation-nada-ai), then [NADA-AI search](/admin-guide/web-ui/nada-ai) |
| MCP server | Connecting AI assistants to the catalog (NADA 5.8+) | [MCP server](/installation-guide/installation-mcp) |

### Sites already running NADA-AI

If the site already uses NADA-AI, update NADA-AI first, then upgrade NADA and run the migrations. Afterwards:

1. In **Site configurations → Search**, check the search engine, the NADA-AI URL and the API key, which must be NADA-AI's admin key.
2. Check that the NADA API key NADA-AI uses belongs to a full administrator, or to a user whose role has **view** and **edit** on the **Search index** permission. Without it, indexing stops with access denied.
3. On the **Search index** admin page, open **Indexing** and run **Force re-index** for each study type, so NADA-AI has the new filter fields.

See the [NADA-AI repository](https://github.com/mah0001/nada-ai) for the NADA-AI side of the update.

## Troubleshooting

| Problem | Likely cause | Action |
|---------|--------------|--------|
| Login fails with a 500 error | Migrations not run | Run `php index.php cli/migrate latest` |
| Catalog search shows a division by zero error | Migrations not run | Run the migrations |
| `/catalog` fails with a custom theme | `layout_vue.php` missing from the theme | Copy the new theme files ([Custom themes](#custom-themes)) |
| Indicator pages fail after upgrading from 5.6 | `mongo.php` removed by `git checkout` | Restore it or create it from `mongo.sample.php` |
| A migration fails part way | Partly applied | Fix the error and run `latest` again |
| Catalog search empty with Solr | Old Solr index | Rebuild the schema and re-index ([Solr](#solr)) |

For more, see [Database migrations (CLI) — troubleshooting](/installation-guide/database-migrations-cli#troubleshooting).

## What's new

### 5.8

- Home page redesigned around search, with the most viewed, featured and latest studies.
- Site notices: a header bar and a pop-up notice.
- **View PDF** tab for document studies.
- AI search through NADA-AI, and an MCP server for AI assistants.
- Indicators: configurable default chart and table view; timeseries API documentation with a Swagger UI playground.
- More admin pages moved to Vue 3.
- Email configuration is now optional; PHP 8.4 compatibility fixes.

### 5.7

- Study pages rendered from JSON display templates, with a display template manager.
- Built-in metadata editor uses the same templates as the Metadata Editor.
- New data deposit interface and API.
- Geospatial feature catalogue tab.
- 5.7.2: security hardening, consolidated migrations, SQL Server upgrade fixes.

Full release notes are on [GitHub](https://github.com/ihsn/nada/releases).
