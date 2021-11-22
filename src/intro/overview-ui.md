# Overview of the user interface

A demo catalog is available at
[http://nada-demo.ihsn.org](http://nada-demo.ihsn.org/index.php/home)
which demonstrates the main features of the NADA application. The
examples we provide here are extracted from this catalog. As the content
may be subject to frequent changes, the examples below may not fully
correspond to the on-line version.

![](~@imageBase/images/image2.png)

The main page of NADA is a listing of all datasets available in the
catalog. In the default view, all data types are listed in the same
page. Tabs (and a facet) are provided allowing users to filter the
listing by data type. Only tabs for which data are available in the
catalog will be displayed. Few catalogs are expected to have tabs for
all data types.

![](~@imageBase/images/image3.png)

The left panel will provide a set of facets (filters), which can be
specific to each data type. Facets provide a convenient solution for
users to select data that meet their requirements based on a selection
of categorical (not continuous) metadata elements. As some metadata
elements may be specific to the data type (e.g., the element \"album\"
is only used for documenting images, or the element "Software/language"
is only applicable to scripts), different facets are displayed in the
type-specific tabs.

![](~@imageBase/images/image4.png)

When filters are applied, the selection(s) will be displayed in pills
above the listing of results.

![](~@imageBase/images/image5.png)

In addition to facets, users can identify datasets of interest using the
**search** tool. Depending on the configuration of the catalog. In NADA
5.2, a lexical search is implemented (future versions will provide
lexical and semantic searchability).

![](~@imageBase/images/image6.png)

The results of search and filter(s) will be displayed for the whole
catalog ("All" tab) and by data type.

![](~@imageBase/images/image7.png)

For **[microdata]{.underline}**, the search engine will not only
identify the [datasets]{.underline} where the keyword was found, but
also the specific [variables]{.underline} that match the query.

![](~@imageBase/images/image8.png)

For microdata, a "Variable view" option is provided to display a list of
variables (instead of a list of studies) that match the keyword.
Variables can be selected for comparison. The more metadata are provided
in the catalog, the more useful these comparisons will be to users who
want to assess the consistency of variables across sources. The metadata
can (and should) contain elements like the formulation of the question
and the interviewer instructions (for survey and census microdata),
information on how the variable was calculated, universe of population
covered by the variable, variable and value labels, and summary
statistics as relevant.

![](~@imageBase/images/image9.png)

![](~@imageBase/images/image10.png)

For all entries in the catalog, all available metadata are displayed in
the entry page.

![](~@imageBase/images/image11.png)

Some entries may include visualizations, if provided by the data
curator.

![](~@imageBase/images/image12.png)

Some entries may also provide a data preview grid.

![](~@imageBase/images/image13.png)

Some entries will provide direct, unrestricted access to the related
resources (documents, images, datasets, scripts, etc.) Other entries may
impose some restrictions. This will often be the case for microdata.
Microdata may be published as open data, as public use files, as
datasets accessible under license, as datasets available from external
repositories, as data accessible in data enclaves, or as data not
accessible (in which case only the metadata and resources like
questionnaires, reports, tables, and others will be published).
Depending on the access policy, users will be able to download the data,
or to register and request access to datasets.

![](~@imageBase/images/image14.png)

Users will have access to all metadata and to selected data via API.

<https://nada-demo.ihsn.org/index.php/api/tables>

![](~@imageBase/images/image15.png)

