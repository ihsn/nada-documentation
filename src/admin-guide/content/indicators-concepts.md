# Key concepts

This page explains the parts of an indicator in NADA and the words used throughout this guide. Read it before you create your first indicator.

The same example is used on every page: the World Bank indicator **SI.POV.DDAY**, *Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population)*, for 183 countries from 1963 to 2025. The [sample files](https://github.com/ihsn/nada-documentation/tree/main/examples/indicators) contain its data, data structure and metadata.

For the overall workflow, see the [overview](./indicators).

---

## Indicator and time series

An **indicator** is a summary measure of something, such as a poverty rate or an infant mortality rate. It is usually produced from other data: a census, surveys, administrative records. SI.POV.DDAY, for example, is computed from household surveys.

When an indicator's values are given for several points in time (years, quarters, months…), they form a **time series**. NADA treats indicators and time series the same way, whether the series is regular (every year) or not (only the years a survey was run). SI.POV.DDAY is irregular: most countries have values only for the years they ran a household survey.

In NADA, each indicator is one **catalog entry**, of type *Time series*. It has:

- **metadata**, which describes the indicator;
- **data**, which holds its values;
- a **data structure**, which describes the columns of the data.

## Metadata: series description and source database

The **series description** documents the indicator: its name, definition, unit of measure, periodicity, methodology, sources, geographic and time coverage, license, and more. For SI.POV.DDAY, the unit is `%`, the periodicity is *Annual* and the source is the World Bank's Poverty and Inequality Platform. The series description is shown on the **Series description** tab of the catalog page, and it is what catalog search finds.

Indicators often come from a larger **source database**. SI.POV.DDAY comes from the World Bank's *World Development Indicators* (WDI). The database can be documented once, as its own entry, and linked from each indicator that comes from it. It is shown on the indicator's page as extra information. It is not a separate search result.

Both use metadata schemas developed for indicators: one for the series, and one for the database.

## Data: observations in long format

The data of an indicator is a table of **observations**. Each row holds **one value**, and the other columns say exactly what that value is. These rows come from the sample data file:

| INDICATOR | INDICATOR_LABEL | REF_AREA | YEAR | VALUE |
|-----------|-----------------|----------|------|-------|
| SI.POV.DDAY | Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population) | ALB | 2012 | 1.8 |
| SI.POV.DDAY | Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population) | ALB | 2014 | 3.7 |
| SI.POV.DDAY | Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population) | ARG | 2012 | 1.3 |
| SI.POV.DDAY | Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population) | ARG | 2014 | 1.1 |

This layout is called **long format**: one value per row. The alternative, a spreadsheet with one row per country and one column per year, is called **wide format**. NADA only accepts long format, so reshape wide data before uploading it.

The data is stored in MongoDB, separately from the metadata. See [MongoDB setup](/installation-guide/installation-mongodb).

### One indicator, or a dimension?

The sample has one value for each country and year. Many indicators are also broken down further, for example by sex. There are two ways to publish such data:

- **As separate indicators**: one indicator for the total, one for women and one for men, each with its own code. This is what WDI does.
- **As one indicator with a dimension**: a `SEX` column with the codes `_T` (total), `F` and `M`, added to the data structure as a **dimension**.

Both work. Choose one design and use it consistently across your catalog.

## Data structure (DSD)

A **data structure definition**, or **DSD**, describes the columns of the data: their names, labels, data types, and the **role** each column plays. NADA uses the roles to build the chart, the filters, the data table and the Data API.

The data structure of the sample, `WB_WDI_COUNTRY_YEAR_1.0`:

| Column | Role | Data type | Codelist |
|--------|------|-----------|----------|
| `INDICATOR` | Indicator ID | string | |
| `INDICATOR_LABEL` | Indicator name | string | |
| `REF_AREA` | Geography | string | Countries (`WB_CL_REF_AREA_1.0`) |
| `YEAR` | Time period, format `YYYY` | string | |
| `VALUE` | Observation value | double | |

The column names in the data file must match the column names of the data structure.

A data structure is created once and can be **shared by many indicators** that have the same columns. Nothing in this one is specific to poverty: any annual, country-level indicator from WDI could use it. Each indicator links to exactly one data structure.

::: warning Changing a shared data structure
When a data structure changes, every indicator that uses it is marked **sync pending**, and its chart, table and Data API are hidden until it is resynced (the **Resync** button on its **Indicator data** tab) or its data is uploaded again. See [Rules that apply to every workflow](./indicators#rules-that-apply-to-every-workflow).
:::

### Column roles

| Role | What the column holds | How many | Example |
|------|-----------------------|----------|---------|
| **Indicator ID** | The code of the indicator | One (required) | `INDICATOR`: `SI.POV.DDAY` |
| **Indicator name** | The name of the indicator | At most one | `INDICATOR_LABEL` |
| **Geography** | The country or area code | At most one (recommended) | `REF_AREA`: `ALB` |
| **Time period** | When the value applies (see [formats](#time-period-formats)) | One (required) | `YEAR`: `2012` |
| **Observation value** | The value itself | One (required) | `VALUE`: `1.8` |
| **Periodicity** | The frequency of the time period | At most one | A `FREQ` column: `A` (annual), `Q`, `M` |
| **Dimension** | Any other breakdown of the value | Any number | A `SEX` column: `_T`, `F`, `M` |
| **Measure** | Another measured value stored in the same row | Can be defined, but not yet supported for data (see below) | |
| **Attribute** | Information about a value, which does not change what the value is | Any number | A status column: estimated, provisional |
| **Annotation** | A note about a value | Any number | *Break in series* |

The sample uses the first five roles. The others are shown with columns it does not have.

::: info Measures
A data structure can define measure columns, including more than one. NADA and the Metadata Editor do not yet support measures in the data: uploads, charts and tables use the single observation value. Use one indicator per measured quantity for now.
:::

### The series key

The columns with the roles **indicator ID, geography, dimension, periodicity and time period** together identify a value. That combination is the **series key**, and it must be **unique**. In the sample, the key is `INDICATOR` + `REF_AREA` + `YEAR`, so the data cannot have two values for Albania in 2012.

Attributes, annotations and measures are not part of the key. They describe a value without changing what the value is.

### Time period formats

The time period column uses one of these formats. Set the format on the time period column of the data structure. The sample uses `YYYY`.

| Format | Example | Meaning |
|--------|---------|---------|
| `YYYY` | `2012` | Year |
| `YYYY-Sn` | `2012-S1` | Half-year |
| `YYYY-Qn` | `2012-Q3` | Quarter |
| `YYYY-MM` | `2012-07` | Month |
| `YYYY-Www` | `2012-W27` | Week |
| `YYYY-MM-DD` | `2012-07-01` | Day |
| `YYYY-MM-DDTHH:mm:ss` | `2012-07-01T12:00:00` | Date and time (`Z` suffix for UTC) |

### Identity and status

Each data structure is identified by an **agency** (the organization responsible), a **name** and a **version**, and gets an **IDNO**. The sample's data structure has agency `WB`, name `WDI_COUNTRY_YEAR`, version `1.0` and IDNO `WB_WDI_COUNTRY_YEAR_1.0`.

The indicator refers to its data structure by this IDNO, so the IDNO must stay the same in the Metadata Editor, in scripts and in NADA.

Data structures and codelists both have a **status**: *draft*, *review*, *published*, *deprecated* or *archived*.

## Codelist

A **codelist** is a list of codes and their labels. The sample's country codelist, `WB_CL_REF_AREA_1.0`, has the 183 countries in the data:

| Code | Label |
|------|-------|
| `AGO` | Angola |
| `ALB` | Albania |
| `ARG` | Argentina |
| `ARM` | Armenia |
| … | … |

Columns whose values are **codes** can use a codelist: geography, periodicity, dimensions, attributes and measures. The catalog then shows labels instead of codes in filters, charts and tables, and documents the codes on the **Data structure** tab.

These columns do not use a codelist:

- **Indicator ID and indicator name.** Each indicator entry holds exactly one indicator, so the column has a single value. The indicator's name and description come from its metadata.
- **Observation value, time period and annotation.** They hold numbers, dates or free text.

Like data structures, codelists are shared: one country codelist can serve every indicator in the catalog.

Make sure every code used in the data exists in the codelist. NADA does not check this when data is uploaded.

::: tip Codelists from label columns
Data files often have a label column next to each code column (`REF_AREA_LABEL` next to `REF_AREA`, for example). The Metadata Editor can build the codelist from such pairs. NADA cannot: in NADA, import the codelist with the data structure, and leave label columns out of the data file.
:::

Codelists can follow international standards. Importing an SDMX structure file (SDMX-ML 2.1, as published by OECD or Eurostat) creates the data structure and its codelists together, and reuses codelists that already exist.

---

## Glossary

| Term | Meaning |
|------|---------|
| **Attribute** | A column with information about a value (status, unit multiplier…). Not part of the series key. |
| **Catalog entry** | Any item listed in the NADA catalog. An indicator is an entry of type *Time series*. |
| **Codelist** | A list of codes and labels, used by a geography, periodicity, dimension, attribute or measure column. |
| **Component** | A column of a data structure. NADA screens use this word. |
| **Data structure (DSD)** | The definition of the data's columns, their roles and codelists. Shared by indicators with the same columns. |
| **Dimension** | A column that breaks values down (sex, age…). Part of the series key. |
| **IDNO** | The unique identifier of an entry, a data structure or a codelist. |
| **Indicator** | A summary measure published as a catalog entry, with metadata and data. |
| **Long format** | One value per row, with columns describing what the value is. Required by NADA. |
| **Observation** | One row of the data: one value and the columns that identify it. |
| **Series description** | The metadata that documents an indicator. |
| **Series key** | The combination of indicator ID, geography, dimensions, periodicity and time period that identifies a value. Must be unique. |
| **Source database** | A database that indicators come from, documented once and linked from each indicator. |
| **Sync pending** | The state of an indicator whose data structure changed (shown as **Out of sync** in the admin). Its data is hidden until it is resynced or uploaded again. |
| **Time series** | An indicator with values for several points in time. |

---

## Next steps

- [Overview](./indicators): choose a workflow
- [Codelists](/admin-guide/web-ui/codelists) and [Data structures](/admin-guide/web-ui/data-structures): create them in NADA
- [Tutorial](./indicators-tutorial): publish SI.POV.DDAY step by step
- [Create an indicator in NADA](./indicators-admin): create an indicator and upload its data
