# Tutorial: your first indicator

In this tutorial you publish the World Bank indicator **SI.POV.DDAY**, *Poverty headcount ratio at $3.00 a day (2021 PPP) (% of population)*, for 183 countries, directly in NADA. It takes about 15 minutes.

You will:

1. import a data structure and its country codelist;
2. create the indicator from its metadata file;
3. upload its data;
4. add a thumbnail and publish;
5. explore the indicator in the catalog;
6. see what happens when you upload different data.

If you are new to indicators, read [Key concepts](./indicators-concepts) first. It uses the same example.

::: info Before you begin
- NADA **5.6** or later, with **MongoDB** set up: see [MongoDB setup](/installation-guide/installation-mongodb). The screenshots are from NADA 5.7.
- A NADA account with permission to add and publish studies, and to manage data structures.
- The sample files: download [try_indicators.zip](https://github.com/ihsn/nada-documentation/raw/main/examples/indicators/try_indicators.zip) and unzip it. The files are described in the [sample README](https://github.com/ihsn/nada-documentation/tree/main/examples/indicators).
:::

---

## Step 1: Import the data structure

The data structure tells NADA what each column of the data means. The sample's data structure also contains the list of country codes and names.

1. In the admin, go to **Settings → Data structures**.
2. Click **Import JSON** and choose `SI.POV.DDAY_dsd.json`.
3. Leave **Overwrite** off and click **Import**.

![Import DSD from JSON dialog](/images/ind-dsd-import-json.png)

NADA shows *Import finished. Codelists touched: 1.* and opens the new data structure, *WDI indicators by country and year*. It has five **Components**: `INDICATOR`, `INDICATOR_LABEL`, `REF_AREA`, `YEAR` and `VALUE`. Its status is *Draft*.

![The imported data structure](/images/ind-dsd-imported.png)

**Check:**

- Click `REF_AREA`. Its **Column type** is `geography`, and its **Codelist** is `CL_REF_AREA` (`WB_CL_REF_AREA_1.0`), whose codes are listed below.

  ![The REF_AREA component and its codelist](/images/ind-dsd-component.png)

- Click **Validate**. NADA shows *Validation passed.*

::: tip Already imported?
If the import says the data structure already exists, it was imported before. Use the existing one and continue.
:::

## Step 2: Create the indicator from its metadata file

The file `SI.POV.DDAY_metadata.json` holds the indicator's metadata. It also names the data structure the indicator uses.

1. Go to **Studies → Manage studies** and click **Add study**.
2. Under **Import from file**, choose the **Collection**, then choose `SI.POV.DDAY_metadata.json` as the **Metadata file**.
3. Click **Submit**.

![Add study, Import from file](/images/ind-add-study-import.png)

NADA recognizes the file as a time series, creates the indicator, and opens it. The **Overview** shows the title, the **Reference No.** `SI.POV.DDAY`, the years 1963–2025 and the 183 countries. The indicator is a *Draft*: it is not visible in the catalog yet.

![The new indicator's Overview tab](/images/ind-entry-overview.png)

**Check:** open the **Metadata** tab, then **Indicator description → Title statement**. **Primary ID** is `SI.POV.DDAY` and **Name** is the indicator's name. The other sections hold the definitions, methodology, sources and coverage from the file.

![Metadata tab, Title statement](/images/ind-metadata-title-statement.png)

## Step 3: Upload the data

1. Open the **Indicator data** tab.

   The **Data structure** field already shows *WDI indicators by country and year — WB_WDI_COUNTRY_YEAR_1.0*: the metadata file linked it.

   ![Indicator data tab with the data structure linked](/images/ind-data-tab-linked.png)

2. Under **Upload data (CSV)**, choose `SI.POV.DDAY_data.csv` and click **Import**.

NADA shows *Imported 2794 observation(s)* and **Data attached 2,794**. The **Data preview** below lists the rows.

![Data uploaded](/images/ind-data-uploaded.png)

**Check:** open **Dimension summaries**. `REF_AREA` has **183** distinct codes and **2794** observations. These counts drive the country filter in the catalog.

![Dimension summaries](/images/ind-dimension-summaries.png)

## Step 4: Add a thumbnail and publish

1. Open the **Overview** tab. In the **Thumbnail** panel, click the pencil, choose `SI.POV.DDAY_thumbnail.jpg` and click **Upload**.
2. In the **Status** panel, click **Draft**. It changes to **Published**.

![Published indicator](/images/ind-published.png)

## Step 5: Explore the indicator in the catalog

Click **Preview study** under the title to open the indicator's catalog page. The header shows the thumbnail, the title, *Angola, Albania, Argentina...and 180 more, 1963 - 2025*, and the reference ID.

![Series description](/images/ind-public-series-description.png)

The page has five tabs:

- **Series description**: the metadata.
- **Chart & data**: an interactive chart. On the left, the **Year** slider and the **Country** list filter the data; the first country, Angola, is selected at first.
  1. Clear **Angola**, and select **Albania** and **Argentina**. The chart updates as you select.
  2. Click **Line**.

  Argentina has a value for most years. Albania's values are separate points (1996, 2002, 2005…) because poverty is measured only in the years a household survey was run. **Chart data** below the chart lists the **47** values shown.

  ![Chart & data, Albania and Argentina](/images/ind-public-chart.png)

- **Table**: the same data as a table, with countries as rows and years as columns. Use **Filters** and **Layout** to change it. The countries you selected on **Chart & data** are kept when you switch tabs.
- **Data API**: how to get the data with the API, and a **Data explorer** with all 2,794 observations.
- **Data structure**: the five columns and their roles. Expand `REF_AREA` to see its 183 codes. **Download JSON** and **Download SDMX/XML** download the data structure.

  ![Data structure tab](/images/ind-public-data-structure.png)

## Step 6: See how uploads work

An upload always **replaces** all of an indicator's data.

1. In the admin, on the **Indicator data** tab, choose `SI.POV.DDAY_data-6-countries.csv` and click **Import**.
2. NADA asks: *This import will replace all existing indicator observations for this study with the rows in your CSV. Continue?* Click **OK**.

**Check:** the tab shows **Data attached 91**. In the catalog, **Chart & data** now has 6 countries, and the **Year** range is 1981–2024.

![Chart after uploading the 6-country file](/images/ind-public-chart-6-countries.png)

Upload `SI.POV.DDAY_data.csv` again to restore all 2,794 rows.

---

## What you did

| You created | Where | Shared? |
|-------------|-------|---------|
| Data structure `WB_WDI_COUNTRY_YEAR_1.0` | **Settings → Data structures** | Yes: any annual, country-level indicator can use it |
| Codelist `WB_CL_REF_AREA_1.0` | **Settings → Codelists** | Yes |
| Indicator `SI.POV.DDAY`, with its metadata, data and thumbnail | **Studies → Manage studies** | No |

To publish another WDI indicator, repeat steps 2 to 5 with its own metadata and data files, and reuse the same data structure.

## Clean up

To remove the tutorial content:

1. Delete the indicator: open it and click **Delete study** in the **Status** panel.
2. Delete the data structure in **Settings → Data structures**, and the codelist in **Settings → Codelists**, if no other indicator uses them.

## Next steps

- [Create an indicator in NADA](./indicators-admin): the same workflow in detail, including creating an indicator without a metadata file
- [Choose a workflow](./indicators#choose-a-workflow): publish from the Metadata Editor or with the API instead
- [Catalog frontend](./indicators-frontend): everything users see on an indicator page
