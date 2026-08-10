# Codelists

Codelists are controlled vocabularies — standardized lists of codes and labels — used to ensure consistent classification across catalog entries. They can be linked to [data structures](./data-structures) to provide valid values for categorical variables.

::: info Screenshot
_Add screenshot: Codelists list view showing available codelists with name, agency, version, and status_
:::

## Accessing codelists

Go to **Settings → Codelists** in the administrator menu.

## Creating a codelist

1. Click **Add codelist**.
2. Fill in:
   - **Agency** — the organization responsible for the codelist (default: NADA)
   - **Name** — a unique identifier for the codelist
   - **Version** — semantic version number (e.g., `1.0.0`)
3. Click **Save**.

::: info Screenshot
_Add screenshot: Create codelist form_
:::

## Managing items

Each codelist contains a set of code–label pairs. To manage items:

1. Open a codelist from the list.
2. Click **Items**.
3. Add, edit, or delete items. Each item has:
   - **Code** — the machine-readable value
   - **Label** — the human-readable description
   - **Description** — optional extended description

::: info Screenshot
_Add screenshot: Codelist items editor_
:::

## Managing groups

Items can be organized into hierarchical groups. Groups are useful for large codelists where items benefit from categorization.

## Status workflow

Codelists follow a publication status progression:

| Status | Description |
|---|---|
| Draft | Under development, not yet published |
| Review | Submitted for review |
| Published | Active and available for use |
| Deprecated | Being phased out — still usable but flagged |
| Archived | No longer in use |

Only **Published** codelists can be linked as value domains in data structures.

## Multi-language support

Codelist item labels and descriptions can be defined in multiple languages. Select the target language when editing an item to add translations.
