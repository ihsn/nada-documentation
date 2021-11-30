# Managing facets

Facets (filters) play a critical role in making data more discoverable.
The following facets are displayed by default in NADA:

-   Range of years

-   Country

-   Data type (shown only when a catalog includes entries of more than
    one type)

![](~@imageBase/images/image146.png)

You can add your own facets and apply them to each data type
independently. Facets must be created based on metadata elements in the
standard standards and schemas. They only make sense when the metadata
element is categorical and has a reasonably small number of categories.
When metadata are documented using CVs, make it easier. All metadata
schemas used in NADA have an element "tags" that provides much
flexibility to create custom facets.

![](~@imageBase/images/image4.png)

## Creating a new facet

## Using the administrator interface 

To manage facets, click on Settings \> Facets in the main menu.

![](~@imageBase/images/image133.png)

![](~@imageBase/images/image147.png)

Click on **Create new facet**. In each relevant schema, you will have to
identify the element that corresponds to the facet being created. In
some cases, a facet will apply to only one data type (for example, a
facet "Document type" would only apply to entries of type "document").
In others, it can apply to multiple data types. A few facets other than
the ones provided by default in NADA (year, type, country) may cover all
data types (this could be the case of "topics", "keywords", or "tags").

In the Create Facet form, you will provide a short name for the facet, a
title (header to be displayed in the user interface), and a status
(Enabled/Disabled).

![](~@imageBase/images/image148.png)

In the **Field** section, select the metadata field that correspond to
your facet. For example, if you create a facet to allow users to filter
documents by their publishing status (the document schema suggests the
use of a controlled vocabulary for this field with possible values
"first draft, draft, reviewed draft, final draft, final"), you will
select the field "document_description/status".

**Subfields**: Some metadata fields may have more than one component.
For example, the field "language" has a component "name" and a component
"code". If you want to use the name of the language in the filter, you
will have to select the element "name". The fields that contain more
than one component are identified with a \* in the drop-down list.

![](~@imageBase/images/image149.png)

**Filter and Filter value**: These options allow you to limit the filter
to some specific values in the metadata. An example of the use of filter
and filter value is provided below in the section "Use of tags for
custom facets".

After creating a new facet, you must click on the **Indexer** button to
reindex the metadata in your catalog. Without doing this, the facet will
not be displayed in your catalog.

![](~@imageBase/images/image150.png)

## Using the API 

Facets cannot be created using the API in NADA 5.2.0.

## Activating and ordering facets

## Using the administrator interface 

To activate the facets and change the order in which they appear in the
user interface, click on Configure.

![](~@imageBase/images/image151.png)

The different data types are displayed in tabs where all available
facets are listed. In each tab, select the facet you want to display in
the corresponding data type tabs in the user interface (setting them as
On/Off). The order of the facets can be modified by drag and drop. When
a change is made in the selection and/or order, click on **Update** to
save it.

![](~@imageBase/images/image152.png)

## Using the API 

Facets cannot be managed using the API in NADA 5.2.0.

## Use of tags for custom facets

Tags provide a very convenient and flexible solution to generate
customized tags based on information that may not be found in the
specific elements found in the metadata schemas. The "tags" field
available in all metadata schemas contains two elements: tag, and
tag_group.

![](~@imageBase/images/image153.png)

Let's assume you want to create a facet that would apply to ALL data
types and filter entries by pricing policy, with two possible options:
"For free" or "For a fee". No metadata schema using in NADA other than
the Document schema provides an element related to the pricing policy.
The NADA API makes it easy to add this information to the metadata for
all catalog entries, in a tag. The "tag" would contain value "For free"
or "For a fee", and in all cases the tag_group would be named
"fee_or_free". A new facet can then be created with the following
parameters:

-   Name: *pricing*

-   Title: *Pricing policy*

-   Mapping: *tags* (for all data types)

-   Filter: *tag_group*

-   Filter value: *fee_or_free*

![](~@imageBase/images/image154.png)

The selection of the "tags" field and the filter and filter value must
be entered for ALL data types. After saving it and reindexing, a new
facet will be available that will apply to the tags that belong to the
group "fee_or_free" (ignoring all other tags that may have been entered
in the metadata).

## Using the API 

Facets cannot be managed using the API in NADA 5.2.0.