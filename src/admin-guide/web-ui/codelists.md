# Codelists

A **codelist** is a list of codes and their labels, such as country codes (`ALB` = Albania) or the categories of sex (`F` = Female). Columns of a [data structure](./data-structures) use codelists, so that the catalog can show labels instead of codes in an indicator's filters, chart and table.

Codelists can be used by **geography, periodicity, dimension, attribute and measure** columns. See [Key concepts](/admin-guide/content/indicators-concepts#codelist) for why other columns do not use them.

::: tip Using the Metadata Editor?
Create codelists in the Metadata Editor. They are sent to NADA with the data structure when you publish. Use these screens to check them.
:::

---

## Three ways to create a codelist

| Way | When to use it |
|-----|----------------|
| **Import a data structure** that includes its codelists, as JSON or SDMX XML. See [Data structures](./data-structures#import-a-data-structure). | Most cases. The codelists are created together with the data structure. Codelists that already exist are reused. |
| **Add it by hand** in **Settings → Codelists** | Short lists, or corrections |
| **Use the API**: `POST api/admin/codelists/import_json` | Scripts and bulk loads |

The [indicator sample](https://github.com/ihsn/nada-documentation/tree/main/examples/indicators) creates its country codelist (`WB_CL_REF_AREA_1.0`, 183 countries) through the data structure import.

---

## The codelists list

Go to **Settings → Codelists**. The list shows each codelist's **Name**, **Agency**, **Latest version**, number of **Versions**, **IDNO**, **Status**, number of **Items**, and the data structures (**DSD**) that use it.

Search by name, IDNO, agency or version, or filter by **Status**.

![](/images/ind-codelist-list.png)

---

## Add a codelist

1. Go to **Settings → Codelists** and click **Add codelist**.
2. Fill in:

   | Field | Description |
   |-------|-------------|
   | **Agency** | The organization that maintains the codelist. Default: `NADA`. |
   | **Version** | Default: `1.0.0`. |
   | **Name** | A short identifier, such as `CL_SEX`. It must be unique for the same agency and version. |
   | **IDNO** | Leave it empty to generate it from agency, name and version. Data structures refer to the codelist by this IDNO. |
   | **Description** | Optional. |

3. Save. The codelist opens on its **Codelist details** tab.

![](/images/ind-codelist-details.png)

### Add codes

1. Open the **Codelist items** tab.
2. Click **Add item** and fill in:
   - **Code**: the value used in the data, such as `F`. It must be unique within the codelist.
   - **Default title**: the label shown in the catalog, such as *Female*.
   - **Sort order**: the order of the code in filters and lists.
3. Save. Repeat for each code.

Use **Translations** on an item to add its label in other languages. The default title is used when a translation is missing.

![](/images/ind-codelist-items.png)

The **Groups** tab organizes the items of a long codelist into groups.

---

## Versions and status

A codelist has a **status**: *Draft*, *Review*, *Published*, *Deprecated* or *Archived*. Once a codelist is **locked**, only its status can be changed: its details, items and groups are read-only.

To change a locked codelist, create a new version of it, and attach the new version to the data structure.

::: warning Codes must match the data
Every code used in an indicator's data should exist in its codelist. NADA does not check this when data is uploaded.
:::

---

## Next steps

- [Data structures](./data-structures): attach the codelist to a column
- [Key concepts](/admin-guide/content/indicators-concepts): codelists, roles and the series key
