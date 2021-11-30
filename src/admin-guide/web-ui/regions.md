# Regions

![](~@imageBase/images/image77.png)

By region, we mean "country groups". The regions can be of different
types, determined based on a geographic criterion (e.g., by continent),
an administrative criteria (e.g., "OECD countries"), an economic
criteria (e.g., high/middle/low-income countries), or other type of
criteria (e.g., "landlocked"). In the example below, two types of groups
are created: one by administrative region of the World Bank, and one by
income level. Within a type, the groups do not have to be mutually
exclusive. A country can belong to multiple groups.

## Using the administrator interface 

![](~@imageBase/images/image78.png)

A region or type of region is created by clicking on the "Create region"
button, then entering the relevant information. If you create a region
without specifying a "parent", you are creating a region parent. If you
create a region and specify a "parent", you are creating a group within
this parent group.

![](~@imageBase/images/image79.png)

Once a region has been created, the countries that belong to it can be
selected (from the reference list of countries). The "weight" argument
is a numeric value that will determine the order in which regions are to
be displayed. Lower weight higher or lower?

![](~@imageBase/images/image80.png)

Groups can be edited or deleted; this does not impact the metadata in
the catalog in any way.

## Using the API 

Uploading and maintaining a list of countries

R

Python