# Managing citations

![](~@imageBase/images/image155.png)

Citations are the published and unpublished works that make use and cite
datasets listed in your catalog. NADA provides the option to maintain a
catalog of such citations.

Citations can be found in Semantics Scholar or Google Scholar. Or
authors may inform you. Has to use multiple queries. Many false
positives. Filter by year (exclude years < dataset year). Requires some
visual validation.

Can be a tedious process. We are developing a tool to assist.

Semantic scholar: <https://www.semanticscholar.org/>

Advantage: open, has API

![](~@imageBase/images/image156.png)

Google Scholar: <https://scholar.google.com/>

No API, and does not allow programmatic extraction. But convenient
automated notification (alert).

![](~@imageBase/images/image157.png)

Cannot guarantee exhaustivity and perfect accuracy. Data are poorly
cited (no information on the version; translated or incomplete title
mentioned in publications. Still can have much value to show that well
documented and easily accessible data are used.

## Adding a citation

Citations are added from the Citations menu.

One citation can be related to more than one dataset. And of course, one
dataset can have multiple citations. When you add a dataset to your
catalog, and want to add citations to it, it may be the case that the
citations was already entered but attached to another dataset. In such
case, you will only have to add a dataset to the list of related
datasets. You do not want to duplicate citations in your catalog.

## Using the administrator interface 

To add a citation - click on All citations then click on the Add New
Citation button at the top right.

![](~@imageBase/images/image158.png)

It is important to know whether the citation is already in your citation
catalog. Enter the title, possibly author, and the page will display the
closest matches.

If no match, add the new citation by filling the citation form.

![](~@imageBase/images/image159.png)

-   **Citation type:** Select the appropriate kind of publication. These
    were presented in the introduction of the manual. A drop-down list
    is provided.

-   **Title**: Title of the document

-   **Authors**: List of authors

-   **Edition**

-   **Volume**

-   **Publication date**: Enter at least the year

-   **ISSN/ISBN/Other number**: Unique identification number of the
    document (other than the DOI, for which a specific field is
    provided)

-   **Publisher**: Name of the publisher

-   **City**: City of the publisher address

-   **Country/State**: Cuntry/State of the publisher address

-   **URL**: Link to the document or to a page where the document is
    found

-   **DOI**: Digital Object Identifier of the document

-   **Language**: Language (if multiple, main language)

-   **Abstract**: The abstract is optional, but we want to include it
    whenever possible. When copy/pasted from a PDF document, edit the
    content if necessary, to ensure that the flow of the text is
    continuous.

    -   Instead of:

![](~@imageBase/images/image160.png)

-   we want:

![](~@imageBase/images/image161.png)

-   **Keywords**: a list of keywords (entered in a single text field.

-   **Notes**: additional notes, if any

-   **Attach file**: Filename (with path) of the document (in most
    cases, this will not be provided; only the URL field will be filled)

-   **Flag**: the flag will be used internally for adminisrtaive/review
    purpose. Citations that need review or confirmation for example can
    be flagged. The citations can be filtered by flag in the "All
    citations" page, allowing administrators and reviewers to take
    action accordingly.

![](~@imageBase/images/image162.png)

-   **Publish**: Publish (or not) the citation in the citation catalog.

After entering all relevant information, click SAVE.

If the citation had already been entered (in which case it appears in
the Similar citations box), you only have to attach an additional
dataset to it. Select the citations in the "Similar citations" box (to
avoid creating a duplicate). The form will be automatically filled out.
Go to the **Attach surveys** tab to attach the relevant dataset(s), and
save the change.

![](~@imageBase/images/image163.png)

The citation (if the status has been set to "Published") will now be
visible in the user interface. The number of citations will be displayed
in the catalog listings.

![](~@imageBase/images/image164.png)

In a study page, the citations (if any) will be shown in a tab.

![](~@imageBase/images/image165.png)

All citations will also be listed and searchable in the Citations
catalog.

![](~@imageBase/images/image166.png)

## Using the API 

...

## Importing citations

It is also possible to import citations in common citation formats such
as BibTex and EndNote (RIS).

## Using the administrator interface 

To do this use the Import Citations link from the top menu. Paste the
BibTex or RIS text into the form and then at the bottom of the screen
click on Attach studies to link the citation to a particular study in
the catalog.

![](~@imageBase/images/image167.png)

## Using the API 

...

## Exporting citations

## Using the administrator interface 

The list of citations in your catalog can be exported to JSON or CSV
format.

![](~@imageBase/images/image168.png)

![](~@imageBase/images/image169.png)

Citations exported as JSON:

![](~@imageBase/images/image170.png)

Citations exported as CSV:

![](~@imageBase/images/image171.png)

## Using the API 

...

## Deleting citations

## Using the administrator interface 

## Using the API 