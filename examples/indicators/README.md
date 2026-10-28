# Indicator sample: SI.POV.DDAY

Sample files for the NADA [indicators documentation](https://ihsn.github.io/nada-documentation/admin-guide/content/indicators.html). They all describe one World Bank indicator:

- **Code:** `SI.POV.DDAY`
- **Name:** Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population)
- **Source:** World Bank, World Development Indicators (WDI) / Poverty and Inequality Platform
- **License:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

The Metadata Editor documentation uses the same indicator, so both guides can be followed with the same data.

## Download

Download everything as one file: [try_indicators.zip](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/try_indicators.zip), or download the files one at a time below.

## Files

| File | What it is | Used for |
|------|-----------|----------|
| [SI.POV.DDAY_data.csv](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/SI.POV.DDAY_data.csv) | The data: 2,794 observations, 183 countries, 1963–2025, long format | Uploading data (all workflows) |
| [SI.POV.DDAY_data-6-countries.csv](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/SI.POV.DDAY_data-6-countries.csv) | The same data for 6 countries only (91 observations) | Showing that an upload **replaces** all of an indicator's data |
| [SI.POV.DDAY_dsd.json](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/SI.POV.DDAY_dsd.json) | The data structure (DSD) with its country codelist | Importing the data structure in NADA (admin UI or `POST api/admin/data_structures/import_json`) |
| [SI.POV.DDAY_metadata.json](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/SI.POV.DDAY_metadata.json) | The indicator's metadata (series description), linked to the data structure | Creating the indicator with the API (`POST api/datasets/create/timeseries/SI.POV.DDAY`) |
| [SI.POV.DDAY_thumbnail.jpg](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/SI.POV.DDAY_thumbnail.jpg) | Thumbnail image | The indicator's thumbnail in the catalog |
| `build_sample.py` | The script that produced these files from the Metadata Editor copy | Maintainers only |

## Data file

One row per country and year. The CSV columns are exactly the columns of the data structure:

| Column | Role in the data structure | Data type | Example |
|--------|---------------------------|-----------|---------|
| `INDICATOR` | Indicator ID | string | `SI.POV.DDAY` |
| `INDICATOR_LABEL` | Indicator name | string | Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population) |
| `REF_AREA` | Geography, with the country codelist | string | `ALB` |
| `YEAR` | Time period, format `YYYY` | string | `2012` |
| `VALUE` | Observation value | double | `1.2` |

The file is UTF-8 without a byte-order mark, comma-separated, sorted by country and year. Each country and year appears once, and no value is empty.

## Data structure file

`SI.POV.DDAY_dsd.json` creates one data structure and one codelist:

- **Data structure** `WB_WDI_COUNTRY_YEAR_1.0` (agency `WB`, name `WDI_COUNTRY_YEAR`, version `1.0`): *WDI indicators by country and year*. It is not specific to this indicator, so other annual, country-level indicators can share it.
- **Codelist** `WB_CL_REF_AREA_1.0`: the 183 country codes in the data, with World Bank country names, attached to `REF_AREA`.

If a data structure with the same IDNO, or the same agency, name and version, already exists in your catalog, the import is rejected unless you choose to overwrite it. A codelist that already exists with the same IDNO is reused instead of created.

## Differences from the Metadata Editor sample

These files are a copy of the [Metadata Editor sample](https://github.com/worldbank/metadata-editor-docs/tree/main/docs/public/quick_start_files/indicator), adjusted for NADA:

| Change | Why |
|--------|-----|
| Removed the `REF_AREA_LABEL` column | The Metadata Editor uses it to build the country codelist. NADA has no role for a label column: the country names come from the codelist in `SI.POV.DDAY_dsd.json` instead. |
| Removed the byte-order mark (BOM) from the 6-country file | NADA does not strip it, so the first column header would not match the data structure and the upload would fail. |
| Reordered columns and sorted rows by country and year | Easier to read. Has no effect on the import. |
| Added the data structure and metadata JSON files | The Metadata Editor creates the data structure from the CSV. NADA cannot, so it needs them as files. |
| No codelist on `INDICATOR` or `INDICATOR_LABEL` | By design: each indicator entry holds exactly one indicator, so these columns have a single value and need no codelist. |
| Shortened the methodology and limitations text | The WDI methodology text still describes the earlier $2.15 (2017 PPP) poverty line, which contradicts the indicator's $3.00 (2021 PPP) definition. Those sentences were removed. |
| Wide-format file not included | NADA only accepts long format. |

## Updating the files

Edit the Metadata Editor sample first, then regenerate the NADA copy and the zip:

```bash
python3 -I build_sample.py /path/to/metadata-editor-docs/docs/public/quick_start_files/indicator .
zip -X try_indicators.zip README.md SI.POV.DDAY_*.csv SI.POV.DDAY_*.json SI.POV.DDAY_thumbnail.jpg
```
