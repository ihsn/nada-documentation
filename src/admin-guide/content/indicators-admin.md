# Create an indicator in NADA

This page covers the **directly in NADA** workflow: you create the indicator, attach its data structure, upload its data and publish it, all in the NADA admin interface. For the other workflows, see [Choose a workflow](./indicators#choose-a-workflow).

For a guided walk-through with sample files, see the [tutorial](./indicators-tutorial).

::: info Before you begin
- **MongoDB** is set up: see [MongoDB setup](/installation-guide/installation-mongodb).
- The indicator's **data structure** exists in NADA, with its codelists: see [Data structures](/admin-guide/web-ui/data-structures).
- The data is a **CSV file in long format**, with one header per column of the data structure: see [Key concepts](./indicators-concepts#data-observations-in-long-format).
:::

---

## 1. Create the indicator

Go to **Studies → Manage studies** and click **Add study**. The page offers two ways to create the indicator.

### From a metadata file (recommended)

If you have the indicator's metadata as a JSON file (exported from the Metadata Editor, or written by a script):

1. Under **Import from file**, choose the **Collection** and the **Metadata file**.
2. Click **Submit**.

NADA recognizes a file with a `series_description` section as a time series. It creates the indicator with the file's metadata, and opens it. If the file has a `data_structure_reference`, the indicator is also linked to that data structure.

![Add study, Import from file](/images/ind-add-study-import.png)

Turn on **Overwrite if the study already exists?** to replace an indicator that has the same IDNO.

### From scratch

1. Under **Create new study**, choose the **Collection**, and set **Select data type** to **Timeseries**.
2. Click **Create**.

![Create new study, Timeseries](/images/ind-create-new-study.png)

NADA creates an entry titled *untitled*, with a generated IDNO, and opens it. Enter its metadata in the next step.

### The indicator's page in the admin

The indicator opens on its **Overview** tab. It shows the **Reference No.** (the IDNO), the years and countries covered, and a **Draft** status: it is not visible in the catalog yet.

![The indicator's Overview tab](/images/ind-entry-overview.png)

## 2. Enter or check the metadata

1. Open the **Metadata** tab.
2. Under **Indicator description → Title statement**, enter or check:
   - **Primary ID**: the indicator's unique identifier (its IDNO), such as `SI.POV.DDAY`.
   - **Name**: the indicator's name. It becomes the indicator's title.
3. Fill in the other sections you have information for: **Sources, concepts, and methods**, **Geographic and time coverage**, **Description** and the others.
4. Click **Save**.

Use **Required** and **Recommended** above the tree to show only those fields.

![Metadata tab, Title statement](/images/ind-metadata-title-statement.png)

## 3. Attach the data structure

1. Open the **Indicator data** tab.
2. Under **Data structure**, pick the data structure in **Select data structure**. If it is already shown, it was linked by the metadata file.

Two links appear next to the field:

- **Open DSD** opens the data structure.
- **Download template** downloads an empty CSV with the right headers.

![Indicator data tab with the data structure linked](/images/ind-data-tab-linked.png)

## 4. Upload the data

1. Under **Upload data (CSV)**, choose the CSV file.
2. Click **Import**.

The headers must match the column names of the data structure (case does not matter). Columns that are not in the data structure are skipped. Every geography, dimension, time period and observation value column must be present, or the upload is rejected.

When the upload is done, NADA shows *Imported … observation(s)* and **Data attached** with the number of rows. NADA also adds a copy of the uploaded file to the indicator's **Files**.

![Data uploaded](/images/ind-data-uploaded.png)

::: warning An upload replaces all of the indicator's data
If the indicator already has data, NADA asks: *This import will replace all existing indicator observations for this study with the rows in your CSV. Continue?* Every upload deletes the existing rows first. To add one year, upload the complete file again.
:::

## 5. Check the data

The tab has two views:

- **Data preview**: the uploaded rows, sorted by time (**Time ↑** / **Time ↓**).
- **Dimension summaries**: for each coded column, the number of distinct codes and observations. These counts drive the filters on the catalog page. Click **Sync dimension summaries** if they look out of date.

![Dimension summaries](/images/ind-dimension-summaries.png)

## 6. Add a thumbnail and publish

1. On the **Overview** tab, in the **Thumbnail** panel, click the pencil, choose an image and click **Upload**.
2. In the **Status** panel, click **Draft**. It changes to **Published**.

![Published indicator](/images/ind-published.png)

Click **Preview study** under the title to open the indicator in the catalog. See [Catalog frontend](./indicators-frontend).

---

## Changing an indicator later

| To | Do this on the Indicator data tab |
|----|----|
| Correct or add data | Upload the complete file again. |
| Remove the data but keep the data structure | Click **Remove data**. |
| Download the data currently stored | Click **Download data**. |
| Detach the data structure | Click **Remove structure & data**. This deletes the uploaded data too. |
| Use another data structure | Pick it in **Select data structure**. This deletes the uploaded data: upload it again afterwards. |

### Out of sync

When the indicator's data structure changes, the **Indicator data** tab shows **Out of sync**. Until it is resynced, the indicator's chart, table and Data API are not available in the public catalog: the public API answers *Indicator timeseries data is temporarily unavailable until the catalogue entry is synchronised.*

Click **Resync** to update the stored data to the changed data structure. If you changed the data structure's columns or need new values, upload the data again instead.

![Out of sync](/images/ind-out-of-sync.png)

---

## Next steps

- [Catalog frontend](./indicators-frontend): what users see on the published page
- [Indicator data API](./indicators-data-api): read the data with scripts
- [Data structures](/admin-guide/web-ui/data-structures) and [Codelists](/admin-guide/web-ui/codelists)
