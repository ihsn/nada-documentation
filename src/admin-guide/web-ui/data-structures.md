# Data structures

Data structures define the metadata schema for datasets — the set of variables, their types, and the valid values for each. They standardize how tabular data is documented and can link to [codelists](./codelists) to constrain categorical variables to approved values.

::: info Screenshot
_Add screenshot: Data structures list view showing name, agency, version, and status_
:::

## Accessing data structures

Go to **Settings → Data structures** in the administrator menu.

## Creating a data structure

1. Click **Add data structure**.
2. Fill in:
   - **Agency** — the responsible organization
   - **Name** — a unique identifier
   - **Version** — semantic version number (e.g., `1.0.0`)
3. Click **Save**.

::: info Screenshot
_Add screenshot: Create data structure form_
:::

## Managing variables

Each data structure contains a set of variable definitions. To manage variables:

1. Open a data structure from the list.
2. Click **Variables**.
3. Add or edit variables. Each variable has:
   - **Name** — the variable identifier
   - **Type** — the data type (text, numeric, date, etc.)
   - **Label** — a human-readable description
   - **Value domain** — optionally link a published codelist for categorical variables

::: info Screenshot
_Add screenshot: Variable editor within a data structure_
:::

## Linking codelists

When a codelist is set as the value domain for a variable, only codes from that codelist are considered valid for the variable. Ensure the codelist is in **Published** status before linking it.

## Status workflow

Data structures follow the same status workflow as codelists: Draft → Review → Published → Deprecated → Archived.
