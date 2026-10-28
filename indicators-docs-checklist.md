# Indicators / time series documentation — checklist

Working checklist for closing the gaps in the indicator and time series documentation (NADA 5.6+).
Not published: this file lives outside `src/`, so VitePress does not build it.

Status: `[x]` done · `[~]` in progress · `[ ]` to do

---

## 1. MongoDB setup (installation guide)

- [x] New page `src/installation-guide/installation-mongodb.md`
  - [x] What MongoDB is used for (indicator observations, tables data API) and when it can be skipped
  - [x] Requirements (MongoDB server, PHP 8.1+, `mongodb` PHP extension 2.1+, bundled library in `modules/mongodb`)
  - [x] Install MongoDB server (Linux, Windows, Docker)
  - [x] Install and verify the PHP extension (web and CLI `php.ini`)
  - [x] Option A: local server without authentication
  - [x] Option B: authentication with a dedicated `readWrite` user created in the NADA database
  - [x] Configure `application/config/mongo.php`
  - [x] Collections and indexes NADA creates
  - [x] `application/config/indicator_timeseries.php` settings
  - [x] Verify the connection (mongosh + PHP test)
  - [x] Backup / restore, CLI maintenance commands
  - [x] Security notes
  - [x] Current limitations and troubleshooting
- [x] Add the page to the sidebar (Installation → after Solr)
- [x] Add MongoDB row to the requirements table in `installation-guide/index.md`
- [x] Link from `admin-guide/content/data-api.md` ("See the Installation Guide")
- [x] Prerequisite note on `admin-guide/content/indicators-admin.md`
- [ ] Upgrade notes: mention MongoDB + PHP 8.1 requirement in `upgrade/upgrade-56.md` (confirm with release owner first)

## 2. NADA code: MongoDB connection (nada-release) — follow-up, not docs

Findings from reviewing `application/config/mongo.php`, `Timeseries_mongo_model.php`, `Data_table_mongo_model.php`.

What works today:
- Settings: `mongodb_host`, `mongodb_port`, `mongodb_database`, `mongodb_username`, `mongodb_password`.
- No auth: leave username **and** password empty.
- Auth: both set → connects with `authSource` = `mongodb_database`.
- Collections all live in `mongodb_database`: `indicator_ts_{dsd_id}`, `table_{db_id}_{table_id}`, `table_dictionary`, `table_types`. The database and collections are created on first write; indexes are created by NADA.
- Study delete cleans up observations and catches `Throwable`, so a missing Mongo does not break deletes.

Gaps to fix:
- [ ] `mongo.php` is tracked in Git with no `.sample` → credentials sit in a versioned file and are overwritten on upgrade. 5.6 moved other secrets to `auth.local.php`; do the same for Mongo (e.g. `mongo.local.php` or keys in `auth.local.php`, falling back to `mongo.php` defaults).
- [ ] `authSource` is hard-coded to the NADA database. Users created in `admin` (the most common setup) fail with "Authentication failed". Add `mongodb_auth_source` (default = database name for backward compatibility).
- [ ] No connection-string option → no replica set, TLS, `mongodb+srv://` (Atlas), timeouts. Add an optional `mongodb_uri` that, when set, overrides host/port.
- [ ] Only one of username/password set → silently connects unauthenticated. Log a warning or throw.
- [ ] Connection code is duplicated in two models; extract a small shared `Mongo_client` library.
- [ ] `'db'` is passed as a URI option to `MongoDB\Client`; it is not a recognised option. Remove it.
- [ ] `Data_table_mongo_model` uses `"${host}"` interpolation (deprecated in PHP 8.2) and a relative `require_once 'modules/mongodb/vendor/autoload.php'` (depends on the working directory; `Timeseries_mongo_model` uses `APPPATH`).
- [ ] Bundled `mongodb/mongodb` 2.1 requires PHP ≥ 8.1, while NADA documents PHP 7.4 minimum and root `composer.json` pins platform PHP 7.4. On PHP < 8.1 the Composer platform check raises a fatal error when the model loads. Decide: require 8.1 for indicators (documented now), or ship a 1.x library.
- [ ] No connection health check. Add a "MongoDB" status (extension loaded, ping, database name) to the admin dashboard / site configuration, plus a CLI `php index.php cli/catalog/mongo_ping`.
- [ ] Collection prefix is configurable only for indicators (`indicator_timeseries_collection_prefix`); table-store names are fixed. Fine for now; document if it changes.

Indicator data API (2026-10-27):
- [x] Unknown filters in `d[ROLE]` / `c[COLUMN]` (and `d[ROLE]` with no matching column) now return HTTP 400 instead of being ignored (`Timeseries_mongo_model::build_observation_query_filter`). Other unknown top-level params (e.g. `utm_source`) are still ignored, so a mistyped short filter (`REFAREA=ALB`) still returns all rows; docs recommend `c[…]`. Catalog `indicator-table-export` returns 400 instead of a 500 for a bad filter. **Uncommitted in nada-release.**
- [ ] `table-export` supports only `format=html` (default) and `xlsx`; any other value (e.g. `csv`) silently falls back to HTML. Reject unknown formats, or add CSV.
- [ ] No public CSV download of an indicator's data (only JSON pages via `data/{idno}`, or HTML/XLSX tables). Consider `data/{idno}?format=csv`.

Catalog Chart & data / Table tabs (2026-10-28), **uncommitted in nada-release** (frontend source + rebuilt `frontend/dist`):
- [x] Table tab now applies filters as they change, like the chart; Apply button hidden on both (`IndicatorFilterSidebar` `showApply` prop).
- [x] Root cause of the table needing Apply: `IndicatorTableTab.vue` called `filterDraftSnapshot()` but never defined it (since 8a30d8b9, July), so its filter watchers threw a ReferenceError. Function added.
- [x] Filters carry over between Chart & data and Table (`frontend/shared/timeseries/indicatorTabLinkFilters.js`, installed in the app's `main.js`): from, to, geo, period, c[…] copied onto the tab links.
- [x] Table tab **Year** slider showed its hard-coded default (2000–2020) instead of the applied range: `useIndicatorTimeFilter` only synced on change, and the table's Filters sidebar mounts after filters are set. Now syncs once on creation. Verified: default 1963–2025, URL `from=2005&to=2015` on table and chart, slider move → one debounced request, no loop.
- Data API tab: not part of the filter carry-over, by decision (2026-10-28).

Found during the end-to-end run (2026-10-27):
- [ ] Public **Data structure** tab shows the codelist as `#96` (internal id) instead of its name / IDNO.
- [ ] Public **Data API** explorer shows internal fields (`PERIOD_START`, `PERIOD_END`, `REPORTING_YEAR`, `REPORTING_FREQ`, `sid`) next to the DSD columns.
- [ ] Importing a DSD stores version `1.0` as `1.0.0` while the IDNO keeps `_1.0`; consider keeping the given version or documenting the normalization.
- [ ] Old screenshots `src/public/images/indicators-*.png` (14 files) are no longer referenced; delete after review.
- [ ] Tutorial content left on the local instance: indicator `SI.POV.DDAY` (sid 1930, published), DSD `WB_WDI_COUNTRY_YEAR_1.0` (id 53), codelist `WB_CL_REF_AREA_1.0` (id 96).

Found while building the sample (2026-10-27):
- [ ] Indicator CSV import does not strip a UTF-8 BOM → the first header becomes `﻿REF_AREA` and the upload fails with "CSV is missing required DSD column(s)". Excel saves CSVs with a BOM, so this will hit users. Strip it in `data_import_post`.
- [ ] `data-structure-schema.json`: `definitions.data_structure` combines `allOf` with `additionalProperties: false`, so every valid payload fails schema validation (`idno`, `name`… "not defined"). The import library does its own checks, so imports work; fix the schema before publishing it as reference.
- [ ] **Attribute codelists dropped by JSON import.** Rule (by design): codelists on geography, periodicity, dimension, attribute and measure columns; never on indicator ID / indicator name (one indicator per entry), observation value, time period or annotation. The component model / admin UI and SDMX import keep attribute codelists, and the public catalog uses any codelist-backed column. But `Data_structure_json_import` (`api/admin/data_structures/import_json`) only binds codelists for dimension/geography (validation) and dimension/geography/periodicity (save), and drops attribute codelists silently. The Metadata Editor publishes through this endpoint, so **attribute codelists are lost on Editor → NADA publish**. Fix in NADA: accept attribute and measure (validation + save) and periodicity (validation). Same fix in the editor's own `Data_structure_json_import.php` (dimension/geography only today).
- [ ] Measures: a DSD can define one or more measure columns, but NADA and the editor do not support measures in data yet (import, chart, table use the single observation value). Documented as "not yet supported" on the concepts page; update when supported.
- [ ] Admin UI / component API accept a codelist on any role, including indicator ID / name. Consider enforcing the rule above there too.

## 3. Fix existing indicator pages

- [x] `admin-guide/content/indicators.md`: replaced by the new overview (old content in `indicators-wdi-example.md`).
- [~] Move Use Case 007 (NADA 5.0, widgets, personal paths) out of `indicators.md` (done: now in `indicators-wdi-example.md`, not in sidebar); its widget parts belong to the Widgets section, the publishing parts get rewritten for "Publish with the API". Fix language codes (`sp`→`es`, `cn`→`zh`).
- [x] Merge `web-ui/codelists.md` and `web-ui/data-structures.md` with the codelist/DSD sections of `indicators-admin.md` (rewritten 2026-10-27 from the NADA admin UI source labels).
- [x] `data-api.md`: retitled "Data tables API", moved out of the indicators group into a new "Data tables API & widgets" group (with Widgets, Widgets API, Visualizations & preview; nothing removed elsewhere). Still to review: the section's content (old text, `@@@` placeholders), and whether the WDI example (`indicators-wdi-example.md`) belongs there.
- [x] `api-guide-extended.md`: empty "Publishing time series" sections replaced by a pointer to the indicators guide.
- [x] Sidebar: group all indicator pages together (nested "Indicators & time series" group under Managing content; new indicator pages go here).

## 4. Agreed structure (flat list under "Indicators & time series")

Three workflows: **Metadata Editor → NADA (recommended)**, **directly in NADA**, **NADA API**.
Editor-side steps are documented in the Metadata Editor docs; NADA docs link to them.

1. [~] Indicators overview (drafted 2026-10-25 in `admin-guide/content/indicators.md`; old content incl. Use Case 007 preserved in `indicators-wdi-example.md`, not in sidebar; screenshots to be updated by the user later): what you get, building blocks, **Choose a workflow** table (editor row marked Recommended, with NADA-side prerequisites: MongoDB, admin account + API key for the editor's catalog connection, where to verify after publish, link to editor docs: https://worldbank.github.io/metadata-editor-docs/documenting_indicator.html), cross-workflow rules (upload replaces data, shared DSD change → "sync pending" for every indicator using it, cleared by Resync or re-upload; IDNOs must match), requirements
2. [~] Key concepts + glossary (drafted 2026-10-25 in `admin-guide/content/indicators-concepts.md`; running example switched to SI.POV.DDAY on 2026-10-27)

Sample data:
- [x] NADA copy of the SI.POV.DDAY sample in `examples/indicators/` (data CSV, 6-country CSV, DSD + country codelist JSON, metadata JSON, thumbnail, README, `build_sample.py`, `try_indicators.zip`). Checked against NADA's import rules; not yet imported into a running NADA.
- [x] Test-import `SI.POV.DDAY_dsd.json`, both CSVs and `SI.POV.DDAY_metadata.json` into a NADA instance (5.7.1, 2026-10-27): all imported as documented
- [ ] Push to `main`: the overview, concepts page and README link to GitHub raw URLs for these files
- [x] Metadata Editor docs: sample files moved to `docs/public/quick_start_files/indicator/` so their links work on the published site
- [ ] Metadata Editor docs: rebuild `public/quick_start_files.zip` (2025; missing the long CSV, partial CSV and README); commit the untracked partial CSV
3. [x] Tutorial: your first indicator (`admin-guide/content/indicators-tutorial.md`). Run end to end on NADA 5.7.1 (localhost) on 2026-10-27 with headless Chrome; 23 screenshots in `src/public/images/ind-*.png`. Flow verified: Import JSON DSD → Add study → Import from file (metadata JSON, links the DSD) → Indicator data upload (2,794) → thumbnail → publish → public tabs → 6-country upload (91, confirm prompt) → restore. Out of sync / Resync verified.
4. [~] Create an indicator in NADA (rewritten 2026-10-27 in `indicators-admin.md`; labels from admin UI source: Add study → Create new study → Timeseries; Metadata → Indicator description → Title statement → Primary ID / Name; Indicator data tab; Out of sync + Resync). Old claim "Use Import to load metadata from a JSON file" removed: no Import button found on the Metadata tab.
5. [ ] Publish with the API (call sequence; R / Python / HTTP tabs; full scripts in `examples/indicators/`)
6. [~] Codelists (merged 2026-10-27; callout for editor users; no codelist import in the UI, only via data structure import or API)
7. [~] Data structures (DSD) (merged 2026-10-27; Import JSON / Import SDMX XML / Add data structure; column types shown as raw values; locked while Published/Archived; attribute-codelist import warning)
8. [ ] Preparing indicator data (CSV)
9. [ ] Catalog pages and embedding
10. [~] Indicator data API (drafted 2026-10-27 in `admin-guide/content/indicators-data-api.md`; every endpoint and filter tested on localhost with SI.POV.DDAY; notes documented with TRN_NOTES_TEST_LIT; HTTP examples only, R/Python tabs pending packages)
11. [ ] Troubleshooting & FAQ

Not part of this group: **Widgets** and the **Tables data API** are separate features and get their own sections (to be revised separately).

Code snippets: by task, not by language. `::: code-group` tabs R | Python | HTTP; no code on concept/UI pages; header "tested with"; API key from env var; R/Python parity.

**Blocked on packages:** NADAR and PyNADA must be updated to support the 5.6 endpoints before the R / Python tabs on pages 5 and 10 can be written. Until then those pages use HTTP examples.
- [ ] NADAR: codelists (`admin/codelists/...`), data structures (`admin/data_structures/...`), timeseries data import / attach-dsd / clear-data (`admin/timeseries/...`), resumable upload, public `api/timeseries/...` reads
- [ ] PyNADA: same coverage
- [ ] Update `admin-guide/api-tools.md` with a function coverage table for indicators once released

## 5. Content backlog for the pages above

P1
- [ ] Concepts & workflow options: Metadata Editor publish / NADA admin UI / API
- [ ] Preparing indicator data (CSV): long format, required roles, time period formats, codes vs codelists, unique series key, delimiter/encoding, column mapping
- [ ] DSD concepts: component roles, data types, codelist binding, versioning/status, validation, SDMX XML / JSON import-export, worked example
- [ ] Admin page warnings: switching/detaching a DSD deletes data; "sync pending" state; uploaded CSV becomes resource `ts_csv_latest`
- [ ] Public timeseries API reference (`api/timeseries/...`): endpoints, filters (`from`, `to`, `d[…]`, `c[…]`, `sort`, `sort_by`, `limit`, `offset`), limits, access rules
- [ ] Admin timeseries / data structures / codelists API reference; check NADAR / PyNADA coverage

P2
- [ ] Embedding charts and tables (`/embed/catalog/{sid}/chart|table`), CSP
- [ ] Catalog page URLs, pivot table view and export
- [ ] Dimension facets in catalog search
- [ ] Series metadata field guide (recommended fields, newer fields, where they display)
- [ ] Source database entries in 5.6
- [ ] Updating / replacing data
- [ ] Troubleshooting (duplicates, codes not in codelist, sync pending, large uploads, 5,000-row chart cap)

P3
- [ ] Sample package `examples/indicators/try_indicators.zip` + tutorial
- [ ] Data notes / footnotes (once released)
- [ ] SDMX compatibility note
- [ ] Short note on the overview: when to use built-in indicator charts vs widgets / the tables data API (link to their sections)
- [ ] Permissions; codelist translations
