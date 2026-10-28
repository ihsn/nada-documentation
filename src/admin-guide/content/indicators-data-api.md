# Indicator data API

Every published indicator's data can be read through NADA's **indicator data API**. The catalog uses the same API for the chart, table and Data API tabs, so anything a user sees there can also be fetched by a script.

The examples use the sample indicator **SI.POV.DDAY** from the [tutorial](./indicators-tutorial). Replace `https://catalog.example.org` with your catalog's address.

::: tip The Data API tab
Each indicator's catalog page has a **Data API** tab. Its **API usage** panel lists the URLs for that indicator, and the **Data explorer** shows the rows the API returns.
:::

---

## Quick start

All endpoints start with `https://catalog.example.org/index.php/api/timeseries/`.

```bash
# The first 25 rows
curl "https://catalog.example.org/index.php/api/timeseries/data/SI.POV.DDAY?limit=25"

# Albania and Argentina, 2010 to 2020
curl -g "https://catalog.example.org/index.php/api/timeseries/data/SI.POV.DDAY?c[REF_AREA]=ALB,ARG&from=2010&to=2020"

# How many rows match
curl -g "https://catalog.example.org/index.php/api/timeseries/data/SI.POV.DDAY/count?c[REF_AREA]=ALB"
```

With `curl`, use `-g` when the URL contains `[` and `]`.

---

## Endpoints

`{idno}` is the indicator's IDNO, such as `SI.POV.DDAY`.

### Data

| Endpoint | Returns |
|----------|---------|
| `data/{idno}` | The rows, as JSON, one page at a time |
| `data/{idno}/count` | The number of rows that match the filters |
| `data/{idno}/chart` | Rows shaped for charts: `time_period`, `observation_value`, `series_key` and the coded columns. Reads at most 5,000 rows. |
| `data/{idno}/table-export` | A table to download, as HTML or Excel (see [Table export](#table-export)) |
| `data/{idno}/notes` | The indicator's notes (see [Notes](#notes)) |

### Structure

| Endpoint | Returns |
|----------|---------|
| `data/{idno}/schema` | The indicator's data structure and its columns |
| `data/{idno}/filter-options` | For each coded column: the codes used in the data, their labels, and the number of rows for each |
| `data/{idno}/export` | The data structure as JSON (the **Download JSON** link of the Data structure tab) |
| `data/{idno}/export-xml` | The data structure as SDMX-ML 2.1 (the **Download SDMX/XML** link) |
| `data-structures/by_idno/{dsd_idno}` | A data structure, with its columns |
| `codelists/by_idno/{codelist_idno}` | A codelist, with its codes and labels |

---

## Filters

Filter the rows of `data`, `count`, `chart` and `table-export` with these parameters. Combine as many as you need.

| Parameter | Filters on | Example |
|-----------|-----------|---------|
| `c[COLUMN]=…` | Any column of the data structure | `c[REF_AREA]=ALB` |
| `COLUMN=…` | The same, shorter | `REF_AREA=ALB` |
| `d[ROLE]=…` | The column with that role: `geography`, `time_period`, `periodicity` or `observation_value` | `d[geography]=ALB` |
| `from`, `to` | The reporting year, both included | `from=2010&to=2020` |

- **Several codes**: separate them with commas, which means *or*. `c[REF_AREA]=ALB,ARG` returns both countries.
- **Periods**: `from` and `to` also accept months (`2005-01`) and quarters (`2023-Q3`) for monthly and quarterly data.
- **Case**: column names are not case-sensitive (`ref_area` works), but **codes are**: `ALB` matches, `alb` does not.

---

## Paging and sorting

| Parameter | Meaning |
|-----------|---------|
| `limit` | Rows per page. Default 100, maximum 500. |
| `offset` | Rows to skip, for the next pages |
| `sort` | `asc` (default) or `desc` |
| `sort_by` | The column to sort by |

The response says where you are:

```json
{
  "status": "success",
  "result": {
    "data": [ … ],
    "limit": 25,
    "offset": 0,
    "total": 2794,
    "found": 25
  }
}
```

`total` is the number of rows that match the filters, and `found` the number in this page. To read everything, repeat the request with `offset` increased by `limit` until `offset` reaches `total`.

---

## Rows

Each row holds the indicator's columns, as defined by its data structure, followed by fields that NADA adds:

```json
{
  "INDICATOR": "SI.POV.DDAY",
  "INDICATOR_LABEL": "Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population)",
  "REF_AREA": "ALB",
  "YEAR": "2012",
  "VALUE": "1.8",
  "sid": 1930,
  "dsd_id": 53,
  "idno": "SI.POV.DDAY",
  "period_start": "2012-01-01T00:00:00+00:00",
  "period_end": "2013-01-01T00:00:00+00:00",
  "reporting_year": 2012,
  "reporting_freq": "A"
}
```

| Field | Meaning |
|-------|---------|
| `period_start`, `period_end` | The start and end of the time period, as dates |
| `reporting_year` | The year of the time period, used by `from` and `to` |
| `reporting_freq` | The frequency: `A` (annual), `Q`, `M`… |
| `sid`, `dsd_id`, `idno` | The indicator's internal ID, its data structure's internal ID, and its IDNO |

Values are returned as they were uploaded. Use `filter-options` or the codelist to turn codes into labels.

---

## Notes

Indicators published from the Metadata Editor can carry **notes**: footnotes on single values, and notes on the whole indicator.

- **Cell notes**: a footnote column of the data (an annotation column shown as a footnote) holds note IDs, several separated by `;`, such as `N02;N03`.
- **Table notes**: apply to the whole indicator, and are shown under every chart and table.

`data/{idno}/notes` returns the text of every note:

```json
{
  "status": "success",
  "result": {
    "footnote_columns": ["NOTE_ID", "SOURCE_NOTE_ID"],
    "notes": [
      { "id": "N01", "note": "Includes refugees living in camps.", "column": "NOTE_ID" },
      { "id": "S01", "note": "Source: Ministry of Education administrative records.", "column": "SOURCE_NOTE_ID" }
    ],
    "table_notes": [
      { "id": "T01", "note": "Literacy: ability to read and write a short simple statement about everyday life." }
    ]
  }
}
```

To show the note of a value, read its footnote columns (`"NOTE_ID": "N01"`) and look up each ID in `notes`. An indicator without notes returns empty lists.

---

## Table export

`data/{idno}/table-export` returns the data as a table, like the **Table** tab.

| Parameter | Meaning |
|-----------|---------|
| `format` | `html` (default) or `xlsx` |
| `table_rows` | Columns to use as table rows, comma-separated, such as `REF_AREA` |
| `table_cols` | Columns to use as table columns, such as `YEAR` |
| `table_time_order` | `asc` or `desc` |
| `geo`, `period` | Shortcuts for `d[geography]` and `d[periodicity]` |

```bash
curl -g -o poverty.xlsx "https://catalog.example.org/index.php/api/timeseries/data/SI.POV.DDAY/table-export?format=xlsx&c[REF_AREA]=ALB,ARG&table_rows=REF_AREA&table_cols=YEAR"
```

---

## Access and errors

- **Published** indicators can be read by anyone, without an API key.
- **Unpublished** indicators need an API key, sent in the `X-API-KEY` header, from a user who can view the indicator.

| Status | When |
|--------|------|
| `403` | The indicator is not published and the key cannot view it |
| `404` | No indicator with that IDNO (`IDNO-NOT-FOUND`) |
| `503` | The indicator is **out of sync**: *Indicator timeseries data is temporarily unavailable until the catalogue entry is synchronised.* See [Out of sync](./indicators-admin#out-of-sync). |

Errors have the form `{"status": "error", "message": "…"}`.

---

## Next steps

- [Catalog frontend](./indicators-frontend): the Data API tab and the other tabs
- [Key concepts](./indicators-concepts): columns, roles and codelists
