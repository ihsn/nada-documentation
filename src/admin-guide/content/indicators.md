# Indicators and time series

NADA publishes **indicators** (summary measures such as a poverty rate or *GDP per capita*) together with their **data**. When an indicator's values have a time reference (annual, quarterly, monthly…), it forms a **time series**. NADA treats both the same way, so this guide uses "indicator" for both.

A published indicator has its own catalog page with documentation, an interactive chart, a data table, downloads and an API for its data.

![Indicator page in the catalog, Chart & data tab](/images/ind-public-chart.png)

::: info Requirements
- **NADA 5.6** or later.
- **MongoDB**, which stores the indicator data used by charts, tables, the Data API and embeds. See [MongoDB setup](/installation-guide/installation-mongodb). MongoDB needs **PHP 8.1+**.
- A NADA account with permission to add and publish entries.

You can document an indicator's metadata without MongoDB, but its data cannot be uploaded or shown.
:::

---

## What users see

Each published indicator has a catalog page with these tabs:

| Tab | Shows |
|-----|-------|
| **Series description** | The indicator's documentation: definition, methodology, sources, coverage |
| **Chart & data** | An interactive chart, with filters for each dimension (country, year, sex…) |
| **Table** | The same data as a table, for example countries by years |
| **Data API** | How to get the data with the API, and a data explorer |
| **Data structure** | The columns of the data, what each one means, and the codes it uses |
| **Downloads** | Documents and links attached to the indicator (shown only when there are some) |

See [Catalog frontend](./indicators-frontend) for a full tour.

---

## How it fits together

An indicator in NADA is built from four parts. Each part depends on the ones above it. The examples use the World Bank indicator **SI.POV.DDAY**, *Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population)*, which is used throughout this guide.

| Part | What it is | Example |
|------|-----------|---------|
| **Codelist** | A list of allowed codes and their labels | Country codes: `AGO` = Angola, `ALB` = Albania… |
| **Data structure (DSD)** | The columns of the data, the role of each (indicator, country, year, value…), and which codelist each column uses. One data structure can be shared by many indicators. | `INDICATOR`, `INDICATOR_LABEL`, `REF_AREA` (uses the country codelist), `YEAR`, `VALUE` |
| **Indicator** | The catalog entry: its metadata (series description) and the data structure it uses. It can optionally be linked to a **source database** entry describing the database it comes from. | *Poverty headcount ratio at $3.00 a day* (`SI.POV.DDAY`) |
| **Data** | The observations: one value per row, for each combination of indicator, country and year | `SI.POV.DDAY, ALB, 2012, 1.8` |

::: tip Sample files
The sample files for SI.POV.DDAY (data, data structure, metadata and thumbnail) are in [`examples/indicators`](https://github.com/ihsn/nada-documentation/tree/main/examples/indicators). Download them all as [try_indicators.zip](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/try_indicators.zip). The Metadata Editor documentation uses the same indicator.
:::

The metadata is stored in NADA's database (MySQL / SQL Server). The data is stored in MongoDB. For more on each part, the column roles and a glossary, see [Key concepts](./indicators-concepts).

---

## Choose a workflow

There are three ways to publish an indicator. All three produce the same result in NADA.

| Workflow | Where you work | Best for |
|----------|---------------|----------|
| **[Metadata Editor → NADA](#metadata-editor-to-nada)** · *Recommended* | In the Metadata Editor. Publishing sends everything to NADA. | Most users. You can check the data before publishing, and updating an indicator is just re-publishing it. |
| **[Directly in NADA](#directly-in-nada)** | In the NADA admin interface | A few indicators, quick corrections, or catalogs without the Metadata Editor |
| **[NADA API](#using-the-nada-api)** | Your own scripts (R, Python or any HTTP client) | Many indicators at once, and scheduled updates |

### Metadata Editor → NADA {#metadata-editor-to-nada}

You document the indicator, define its data structure and import its data in the **Metadata Editor**. Publishing then sends the metadata, data structure (with its codelists) and data to NADA in one step.

How to do this in the editor: [Documenting indicators (Metadata Editor documentation)](https://worldbank.github.io/metadata-editor-docs/documenting_indicator.html).

**What NADA needs:**

- MongoDB installed and configured: see [MongoDB setup](/installation-guide/installation-mongodb).
- A NADA user account with permission to add and publish entries, and an **API key** for that account. The editor uses the key in its catalog connection to NADA.

**After publishing, check in NADA:**

1. The indicator appears in **Studies → Manage studies**.
2. Its data structure appears under **Settings → Data structures**.
3. The indicator's **Indicator data** tab shows the uploaded rows.
4. The catalog page shows the **Chart & data** tab.

### Directly in NADA {#directly-in-nada}

You create everything in the NADA admin interface:

1. Import the data structure with its codelists, or create them: see [Data structures](/admin-guide/web-ui/data-structures) and [Codelists](/admin-guide/web-ui/codelists).
2. Create the indicator in **Studies → Manage studies → Add study**, from a metadata JSON file or from scratch.
3. Enter or check its metadata.
4. Attach the data structure and upload the data as a CSV file.
5. Publish the indicator.

Steps 2–5 are covered in [Create an indicator in NADA](./indicators-admin). To try it with sample files, follow the [tutorial](./indicators-tutorial).

### Using the NADA API {#using-the-nada-api}

Your script makes the same calls that the Metadata Editor makes when it publishes:

| Step | Endpoint |
|------|----------|
| 1. Import codelists | `POST api/admin/codelists/import_json` |
| 2. Import the data structure | `POST api/admin/data_structures/import_json` (JSON) or `POST api/admin/data_structures/import` (SDMX XML) |
| 3. Create the indicator with its metadata | `POST api/datasets/create/timeseries/{idno}` |
| 4. Upload the data file (large files) | `POST api/uploads/init`, then `POST api/uploads/chunk/{upload_id}` |
| 5. Import the data | `POST api/admin/timeseries/data/{idno}/import` with the file or `upload_id`, and the data structure's `dsd_idno` |

All of these calls need an API key with administrator rights. The [NADAR](/admin-guide/api-tools) (R) and [PyNADA](/admin-guide/api-tools) (Python) packages do not cover these calls yet. Until they do, call the endpoints directly.

---

## Rules that apply to every workflow

- **Uploading data replaces all of the indicator's data.** It never appends. To add one year, upload the complete file again.
- **Data structures are shared.** When a data structure changes, every indicator that uses it is marked **sync pending**. Its chart, table, Data API and embeds are hidden until it is resynced (the **Resync** button on its **Indicator data** tab) or its data is uploaded again. Before you edit a data structure, check how many indicators use it (shown in the data structures list).
- **Switching or detaching an indicator's data structure deletes its uploaded data.** Upload the data again afterwards.
- **IDNOs connect everything.** The indicator's IDNO and its data structure's IDNO must be the same in the Metadata Editor, in your scripts and in NADA.

---

## Built-in indicators, widgets and the data tables API

NADA has two other features that can show data. They are separate from built-in indicators:

- **[Widgets](/admin-guide/widgets)** embed custom charts, maps or data viewers that you build yourself on catalog pages.
- **[The data tables API](./data-api)** publishes tabular data to MongoDB with its own data dictionary, mainly for statistical tables.

Use built-in indicators when the data fits a data structure: you get the chart, table, Data API and downloads without writing any code.

---

## Next steps

- [Key concepts](./indicators-concepts): the parts of an indicator, column roles and a glossary
- [Indicator data API](./indicators-data-api): read an indicator's data with scripts
- [Tutorial](./indicators-tutorial): publish SI.POV.DDAY step by step, directly in NADA
- [Create an indicator in NADA](./indicators-admin): create an indicator, attach a data structure and upload data
- [Catalog frontend](./indicators-frontend): what users see on a published indicator page
- [Codelists](/admin-guide/web-ui/codelists) and [Data structures](/admin-guide/web-ui/data-structures)
- [Example: publishing WDI series with R and Python](./indicators-wdi-example) (NADA 5.0 example, being revised)
