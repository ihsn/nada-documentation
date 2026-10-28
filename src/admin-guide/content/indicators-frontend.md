# Indicators — Catalog frontend

Also see the [overview](./indicators) and [Create an indicator in NADA](./indicators-admin).

A published indicator has its own page in the catalog. The screenshots show the sample indicator SI.POV.DDAY from the [tutorial](./indicators-tutorial).

The page header shows the thumbnail, the title, the countries and years covered (for example *Angola, Albania, Argentina...and 180 more, 1963 - 2025*), the **Reference ID**, and a link to download the metadata as **JSON**.

The page has five tabs.

::: info Tabs depend on the data
The **Data structure** tab appears when the indicator has a data structure. **Chart & data**, **Table** and **Data API** also need its data, and are hidden while the indicator is out of sync. A **Downloads** tab appears when resources, such as documents or links, are attached to the indicator.
:::

---

## Series description

The default tab. It shows the indicator's metadata, organized into sections listed on the left, such as **overview**, **Data structure**, **Geographic information**, **License** and **Metadata production**. Which sections appear depends on the metadata entered.

![Series description](/images/ind-public-series-description.png)

---

## Chart & data

An interactive chart of the indicator's data.

- On the left, a filter for each coded column: a **Year** slider and, for the sample, a **Country** list with a search box. The first code is selected at first. The chart updates as soon as you change a filter.
- Above the chart, choose the chart type: **Auto**, **Line**, **Columns** or **Bars**.
- The chart title, subtitle (years and selected countries) and **Source** are added automatically.
- **Chart data**, below the chart, lists the values shown, with the number of rows.

![Chart & data, Albania and Argentina](/images/ind-public-chart.png)

::: tip Filters follow you between tabs
The filters you choose on **Chart & data** are kept when you open **Table**, and the other way round. They are also part of the page address, so a copied link opens with the same selection.
:::

---

## Table

The same data as a table, for example with countries as rows and years as columns. **Filters** shows the filters, which update the table as soon as you change them; **Layout** changes the rows and columns, and **Full window** enlarges the table.

![Table](/images/ind-public-table.png)

---

## Data API

How to get the data programmatically:

- a short description of the indicator;
- **API usage**: example calls and their parameters;
- **Data explorer**: all observations, with paging.

For the endpoints and parameters, see [Indicator data API](./indicators-data-api).

![Data API](/images/ind-public-data-api.png)

---

## Data structure

The columns of the data, so that users understand them before using the data:

- **Name**: the column name used in the data and the API.
- **Label**: a readable description.
- **Role**: shown as a badge, such as `INDICATOR_ID`, `GEOGRAPHY`, `TIME_PERIOD` or `OBSERVATION_VALUE`.
- **Type**: the data type.
- **Codelist**: for coded columns. Expand the row to see and search the codes.

**Download JSON** and **Download SDMX/XML** download the data structure.

![Data structure, REF_AREA expanded](/images/ind-public-data-structure.png)
