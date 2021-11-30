# Dashboard

## Using the administrator interface 

After logging in to the site with administrator credentials, you will be
taken to the Dashboard page of the Administrator interface. The page
also includes the menu that provides access to all sections of the
administrator interface.

![](~@imageBase/images/image52.png)

The Dashboard provides a quick glance summary for administrators to get
an overall picture of the content of the catalog as well as of pending
tasks for the administrator.

![](~@imageBase/images/image53.png)

Box 1 (*Central Data Catalog*) provides information on the total number
of entries (of any type) listed in the catalog. It distinguishes the
entries that are "owned" by the Central Catalog (entries managed by the
Central Catalog administrator, that are not owned by a specific
collection or "sub-catalog) from the "linked" entries (those that are
owned by a collection but displayed in the Central catalog). It also
distinguishes the entries that are published (i.e., visible by visitors
of the catalog site) from those that are in draft ("unpublished") mode,
only visible to the administrators and reviewers. The box also contains
some warnings. It will for example indicate the number of micro-datasets
published as "Public Use Files" but for which no data files are
available in the catalog, or the number of microdata entries for which
no document of type "questionnaire" is provided.

The button Manage studies will open the catalog administration page that
provides the tools for adding, editing, and deleting catalog entries
(described in section Manage studies of this Guide). The button History
provides a listing of additions to the Collection (in this case the
Central Catalog), with information on the date when the entry was
created and last modified (the buttons displayed in this page are
described in section Manage collections).

![](~@imageBase/images/image54.png)

Box 2 (*Collection: \[collection name\]*) will only be displayed when
your catalog contains Collections. One box will be displayed per
collection, with the same information as in Box 1. Two additional
buttons are provided, which provide access respectively to a page
allowing the catalog administrator(s) with appropriate credentials to
edit the permissions attached to the collection, and to edit the
description of the collection (see Managing collections section).

Box 3 (*Users*) provides summary information on the number of users
registered to the catalog (which includes not only the catalog and
collections administrators, but also users who registered to the catalog
to obtain or request access to non-public data).

Box 4 (*Recently updated studies*) is a listing of the most-recently
added (or modified) entries in the catalog, with a link to the entry
page allowing administrators to edit it.

## Using the API 

Related endpoints:

<https://ihsn.github.io/nada-api-redoc/catalog-admin/#operation/listDatasets>

<https://ihsn.github.io/nada-api-redoc/catalog-admin/#operation/singleDataset>

Using R:

The content of the dashboard can be generated using the API as follows:

Datasets