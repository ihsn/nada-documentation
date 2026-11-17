# NADA-AI search

[NADA-AI](https://github.com/mah0001/nada-ai) is an **optional** search service that adds **semantic search** to the
catalog. With it, a search for "household spending" also finds studies about "consumption expenditure", and a query
in French or Spanish finds English titles. It serves the catalog's study, variable and citation searches from its own
OpenSearch indexes.

NADA keeps NADA-AI's index in step with the catalog: every change to a study or citation is queued, and NADA-AI picks
it up within minutes. You manage all of this from **Settings → Search index**.

## Before you start

- NADA-AI is installed and running: [NADA-AI installation (Docker)](/installation-guide/installation-nada-ai).
- You have the URL NADA's server uses to reach it (often `http://127.0.0.1:8020`) and the **admin key** created for
  NADA in the last installation step.
- You are a site administrator, or have the permissions below.

## Overview of the steps

1. [Grant permissions](#_1-grant-permissions) to the staff who manage the index.
2. [Connect NADA](#_2-connect-nada) to NADA-AI and start tracking changes.
3. [Build the index](#_3-build-the-index) while the database keeps serving searches.
4. [Test](#_4-test-the-search) the search.
5. [Switch the catalog](#_5-switch-the-catalog-to-nada-ai) to NADA-AI.

---

## 1. Grant permissions

The **Search index** permission group controls the Search index page:

| Permission | Allows |
|------------|--------|
| **view** | Open the page: status, coverage, jobs, change queue, test search |
| **edit** | Start indexing, cancel jobs, requeue, pause and resume |
| **delete** | Rebuild or delete the whole index |

Add them to a role in [Users → Roles](/admin-guide/web-ui/users#defining-roles). Site administrators have them already.
Changing the search settings themselves needs permission to edit site configurations.

---

## 2. Connect NADA

1. Open **Settings → Settings** ([Site configurations](./site-configurations)) and go to the **Search** section.
2. Expand the **NADA-AI** panel. Do not select its radio button yet.
3. Under **Connection**, fill in:

   | Field | Value |
   |-------|-------|
   | **NADA-AI API URL** | Where NADA's server reaches NADA-AI, without a trailing slash, e.g. `http://127.0.0.1:8020` or `https://nada-ai.example.org` |
   | **NADA-AI API Key** | The admin key created for NADA. It is stored and never shown again |

4. Under **Search behaviour**:

   | Field | Choose |
   |-------|--------|
   | **When NADA-AI is unavailable** | **Serve the search from the catalog database** (recommended), or **Show an error** |
   | **Multilingual search** | **Yes** with the default embedding model, which matches queries across languages. The home page then shows example searches in several languages |

5. Leave **Advanced → NADA-AI debug** off, except while troubleshooting.
6. Below the panels, set **Index kept in sync** to **NADA-AI**.
7. Click **Update** to save.

The top of the section now shows *Catalog search uses: Database (built-in)* and *Index kept in sync: NADA-AI*.
From this moment NADA records every study and citation change for NADA-AI, while the public catalog still searches
the database.

::: tip Why two settings
**Index kept in sync** decides which index NADA keeps up to date. **Search engine** decides which engine answers
searches. Setting the first one alone lets you build and check the index before visitors use it. The search engine can
only be the database or the engine whose index is kept in sync; NADA refuses any other combination.
:::

---

## 3. Build the index

1. Open **Settings → Search index**. The **Overview** page opens.
2. Check the **Search engine** card and the health strip at the top. Both should show NADA-AI answering. If a banner
   says NADA-AI is not answering, check the URL and key from step 2.
3. Click **Warm up** in the health strip to load the embedding model.
4. Open **Indexing** and click **Update all**. NADA queues every published study and citation that is not in the
   index yet. NADA-AI then works through the queue on its own.
5. On the **Overview** page, the **Variables** card shows how many variables are indexed. If it reports variables not
   indexed after the studies are done, click its **Update**.

Indexing a large catalog the first time takes hours. Follow it on the **Activity** page, or in the **Indexing
activity** card on the Overview, which shows what is being indexed and an estimate of the time left. Search keeps
working from the database meanwhile, and catalog edits made during the build are queued too.

---

## 4. Test the search

Open **Test search**. It runs the catalog search exactly as the public catalog would with NADA-AI as the search engine,
and shows each result's score and the search driver's debug output.

Try a few searches your users make, including ones phrased differently from the titles. Compare the results with the
public catalog, which still uses the database.

---

## 5. Switch the catalog to NADA-AI

When the **Overview** shows the studies as searchable:

1. Open **Settings → Settings**, section **Search**.
2. Select the radio button on the **NADA-AI** panel.
3. Click **Update**.

Search the public catalog to confirm. To go back at any time, select **Database (built-in)** and save; the index
stays in sync as long as **Index kept in sync** is NADA-AI.

---

## The Search index page

### Overview

*Is the search index working, and what can be found with it.*

| Part | What it tells you |
|------|-------------------|
| **Health strip** | Whether NADA-AI, its OpenSearch backend, the index and the embedding model are all answering. **Details** shows more, including embedding drift (a model change that needs a rebuild). **Warm up** loads the model |
| **Search engine** card | Which engine serves studies, variables and citations now, what NADA-AI can serve, and whether NADA-AI is paused or unreachable. **Settings** opens Site configurations |
| **What is searchable** | Per data type: studies in the catalog, searchable, to add, to remove, and errors |
| **Variables** and **Citations** cards | Database counts against indexed counts, with **Update** to catch up |
| **Indexing activity** | What NADA-AI is doing now, how much is waiting, and the time left. **Pause** and **Resume** are here |
| **Recent changes** | Catalog edits waiting to be indexed, and the ones indexed last |

### Indexing

*Keep the search index in step with the catalog.*

| Part | Use |
|------|-----|
| **Update all**, **Update** per type | Queues studies missing from the index and the ones no longer in the catalog. Use it for routine catch-up |
| **Studies to add** | Published studies that are not searchable yet, with the last error if indexing failed. **Index** retries one |
| **Studies to remove** | Studies still in the index but no longer in the catalog. **Update** or **Clean up** removes them |
| **Force re-index…** | Reads every study of a type again, including those already indexed, as a job outside the queue. Use it after an upgrade that changes how metadata is read, or when one type looks wrong. Microdata studies re-index their variables too |
| **Maintenance** | Repairs and rebuilds, see below |

**Maintenance actions:**

| Action | When to use it | Needs |
|--------|----------------|-------|
| **Clean up** | Remove studies and citations no longer in the catalog | edit |
| **Restore tracking** | After switching engines: NADA-AI reports what it already holds, so NADA does not index it all again | edit |
| **Rebuild the study index** | The Overview asks for it after an upgrade. Embeddings are reused, so it is much faster than a full rebuild | delete |
| **Rebuild the variable / citation index** | The Overview asks for it after an upgrade | delete |
| **Delete and rebuild** | Start over: empties every index and indexes everything again, embeddings included. Slow. Type `RECREATE` to confirm | delete |
| **Delete index** | Empties every index and indexes nothing. Searches fail until you rebuild. Type `DELETE` to confirm | delete |

When the health strip lists indexes "created before a change to what they hold", they reject updates until rebuilt.
Use **Rebuild the study index** for the study index, or **Delete and rebuild** for the others.

### Activity

*Indexing jobs, and catalog edits waiting to be applied.*

- **Change queue**: catalog edits waiting for NADA-AI, and the ones that failed. **Process now** asks NADA-AI to
  start at once instead of at its next check. **Requeue failed** tries the failed ones again. The header shows whether
  change tracking is on, when NADA-AI last read the queue, and the last full sync.
- **Jobs**: indexing runs started by hand (Force re-index, variable or citation sync, Restore tracking), with
  progress, errors and **Cancel**. Catalog edits are not jobs; they go through the change queue.

### Test search

Runs a query against the live index with filters and options, as described in [step 4](#_4-test-the-search).

---

## Day to day

Nothing needs to be done by hand. When a study or citation is published, edited, unpublished or deleted, NADA queues the
change and NADA-AI applies it within a few minutes.

Check the **Search index** page from time to time, or when users report missing results:

- a red badge on **Indexing** counts studies that failed to index; the error is listed under **Studies to add**;
- a badge on **Activity** counts failed queue items, or what is waiting.

To stop indexing for a while, for example during a large import, click **Pause** in the **Indexing activity** card.
NADA-AI finishes the item in hand and waits. Changes keep queuing and are applied after **Resume**.

## When NADA-AI is unavailable

| Situation | What visitors see |
|-----------|-------------------|
| NADA-AI is down, times out or is overloaded | With **Serve the search from the catalog database**, normal database results. With **Show an error**, an error message |
| NADA-AI rejects the request, e.g. a wrong key | An error, whatever the outage setting: this is a configuration problem |
| NADA-AI does not offer a search, e.g. citations | The database serves it |

After a failure that means NADA-AI is down, NADA stops calling it for 30 seconds, then tries one request. Searches
do not each wait for a timeout meanwhile. The **Search engine** card shows when NADA-AI is not answering. The admin API
`GET /api/admin/semantic/engine_status` also reports how many searches fell back to the database in the last hour.

NADA-AI must run OpenSearch. If it runs anything else, catalog searches fail with a message naming both, and the
Search index page shows a banner.

## Switching away from NADA-AI

- **Back to database search:** select **Database (built-in)** in the Search section and save. Keep **Index kept in
  sync** on NADA-AI to keep the index current for a later switch back.
- **Stop using NADA-AI:** set **Index kept in sync** to **None**. Changes stop being queued. When you return, use
  **Restore tracking** on the Indexing page, then **Update all**.

## Upgrading from earlier semantic search settings

Sites that used the earlier "semantic" search settings are converted by the database migration:

```bash
php index.php cli/migrate latest
```

It renames the settings, sets **Search engine** to NADA-AI where semantic search was in use, and sets **Index kept in
sync** to match. Earlier separate search and admin keys become one key; check that the stored key is a NADA-AI
**admin** key. NADA's former built-in OpenSearch engine has been removed; sites that used it are switched back to the
database. Back up the database first. See [Database migrations (CLI)](/installation-guide/database-migrations-cli).

## Troubleshooting

| Issue | What to check |
|-------|---------------|
| Cannot select NADA-AI | Enter the **NADA-AI API URL** first. The search engine also requires **Index kept in sync** to be NADA-AI |
| Banner: NADA-AI is not answering | NADA-AI is running (`/health` on its host); the URL is reachable from NADA's server; firewall |
| Banner: the search engine is set to NADA-AI, but NADA-AI is running another engine | NADA-AI was started with a non-OpenSearch backend. Restart it with OpenSearch |
| Indexing actions greyed out | You have **view** only, or **Index kept in sync** is not NADA-AI |
| Errors when searching or indexing, `401` or `403` | The **NADA-AI API Key** is wrong or is not an admin key. Enter it again and save |
| Queue grows but nothing is indexed | NADA-AI is paused (Indexing activity card), or cannot reach NADA. Check NADA-AI's logs and its NADA API key |
| Studies fail with errors under **Studies to add** | Read the error. A metadata problem in one study does not stop the others; fix the study, then **Index** it again |
| Variables not indexed | NADA-AI's NADA user lacks **Studies** view. See [the NADA API key](/installation-guide/installation-nada-ai#the-nada-api-key-for-nada-ai) |
| Search results look outdated after an upgrade | The health strip asks for a rebuild. Use **Maintenance** |
| Need the raw requests and responses | Turn on **NADA-AI debug** briefly; the details appear in NADA's logs and in catalog API errors for administrators |

## Related

- [NADA-AI installation (Docker)](/installation-guide/installation-nada-ai)
- [Site configurations](./site-configurations#search): the Search section
- [Solr search](./solr): the other optional search engine
- [MCP server](/installation-guide/installation-mcp): connect AI assistants to the catalog, list of tools
- NADA-AI documentation: [NADA search engine settings](https://github.com/mah0001/nada-ai/blob/main/docs/nada-search-engine-settings.md),
  [MCP guide](https://github.com/mah0001/nada-ai/blob/main/docs/mcp.md)
