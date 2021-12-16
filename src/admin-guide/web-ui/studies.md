# Adding and managing content 

This section of the Guide describes the various tools and approaches available to catalog administrators to add, edit, organize, and delete catalog entries (datasets).  

## Data types and external resources

NADA distinguishes entries by data type. For each data type, a specific metadata standard or schema must be used to generate and store the metadata. The information contained in the metadata, and the way the metadata will be displayed and made searchable and accessible, is thus specific to each data type. Instructions are thus provided for each type of data, although the core principles are the same for all types of data. Also, **external resources** (which you can interpret as "any related electronic file that should be provided in a catalog entry page") can be attached to catalog entries independently of the data type.

### Data types

As a reminder, the data types that NADA can ingest, and the related metadata standards and schemas, are the following:

-   **Microdata**: Microdata are the unit-level data on a population of individuals, households, dwellings, facilities, establishments, or other. They can be generated from surveys, censuses, administrative recording systems, or sensors. Microdata are documented using the DDI-Codebook metadata standard.

-   **Statistical tables**: Statistical tables are summary (aggregated) statistical information provided in the form of cross-tabulations, e.g., in statistics yearbooks or census reports. They will often be a derived product of microdata. Statistical tables are documented using a metadata schema developed by the World Bank Data Group.

-   **Indicators and time series**: Indicators are summary (or aggregated) measures derived from observed facts (often from microdata). When repeated over time at a regular frequency, the indicators form a time series. Indicators and time series are documented using a metadata schema developed by the World Bank Data Group.

-   **Geographic datasets and geographic data services**: Geographic (or geospatial) data identify and depict geographic locations, boundaries, and characteristics of the surface of the earth. They can be provided in the form of datasets or data services (web applications). Geographic datasets and data services are documented using the ISO 19139 metadata standard.

-   **Documents**: Text is data. Using natural language processing (NLP) techniques, documents (i.e. any bibliographic citation, such as a book, a paper, and article, a manual, etc.) can be converted into structured information. NLP tools and models like named entity recognition, topic modeling, word embeddings, sentiment analysis, text summarization, and others make it possible to extract quantitative information from unstructured textual input. Documents are documented using a schema based on the Dublin Core with a few aditional elements inspired by the MARC21 standard.

-   **Images**: This refers to photos or images available in electronic format. Images can be processed using machine learning algorithms (for purposes of classification or other). Note that satellite or remote sensing imagery are considered here as geographic (raster) data, not as images. Images are documented using either the IPTC metadata standard, or the Dublin Core standard.

-   **Videos**. Videos are documented using a metadata schema inspired by the Dublin Core and the VideoObject schema from schema.org.

-   **Scripts**: Although they are not data *per se*, we also consider the programs and scripts used to edit, transform, tabulate, analyze and visualize data as resources that need to be documented, catalogued, and disseminated in data catalogs. Scripts are documented using a metadata schema developed by the World Bank Data Group.

Information on the metadata standard and schemas is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/# and in a Schema Guide. 

### Data type tabs

In the NADA catalog, data will be organized by type. ALL entries are listed in the first tab, labeled "All". The entries for each data type will be displayed in a separate tab in the catalog listing. This will allow users to focus their attention to data of the type of interest. 

NADA will only display a tab when there is at least one data of the corresponding type in the catalog. Tabs are automatically added when an entry for a new data type is added. 

The sequence in which the tabs are displayed can be controlled. 

@@@@@@@@@

![](~@imageBase/images/nada_tabs.png)

### External resources

External resources are electronic files (or links to electronic files) of any type, that you may want to attach to an entry metadata as "related materials". This could for example be the PDF version of the survey questionnaire and interviewer manual related to a survey microdataset, or visualizations related to a published document. A simple metadata schema (based on the Dublin Core standard) is used to document external resources. This schema includes an element that indicates the type of the resource (e.g., microdata, analytical document, administrative document, technical document, map, website, etc.) In NADA, you will publish the metadata related to a dataset, then add such external resources to it. 

## Adding a catalog entry: four approaches

A new entry can be added to a NADA catalog in different manners. We already mentioned that this can be done either **using the web interface**, or **using the catalog API** and a programming language. 

The way an entry is added to a NADA catalog will also depends on the form in which the metadata are available: 
- When **metadata compliant with one of the recognized standards and schemas is provided** in electronic files: the process will then consist of uploading the metadata file(s), uploading the related resource files (data, documents, etc.), and selecting data dissemination options (access policy). Uploading such files can be done using the web interface or using the API. 
- When metadata are not readily available in an electronic file, **metadata can be created from scratch in NADA** and published using the web interface. This option is not (yet) available for Geospatial data, and is not recommended for microdata.  
- When metadata are not readily available in an electronic file, **metadata can be created using a programming language (R or Python)** and published using the API. 

We briefly present these three options below. In subsequent sections, we will describe in detail how they are applied (when available) to each data type. 

### Loading metadata files using the web interface

When metadata files compliant with a metadata standard or schema recognized by NADA are available (typically generated using a specialized metadata editor), these files can be uploaded in NADA using the web interface. The interface will also be used to upload the related resource files (the *external resources*), to add a logo/thumbnail, and to specify the dataset access policy. This approach currently applies only to microdata and external resources. It will be added to other data types in future releases of NADA.

To use this approach, you will need to access the page in the administrator interface where you can add, edit, and delete entries. 

Click on **Studies** > **Manage studies** and select the collection in which you want to add an entry (if you have not created collections, the only option will be the Central Data Catalog).

![](~@imageBase/images/image92.png)

A list of entries previously entered in the catalog/collection will be displayed, with options to search and filter them.

![](~@imageBase/images/image93.png)

In this page, the **Add study** button will allow you to access the pages where entries can be added.

![](~@imageBase/images/image94.png)

### Creating an entry from scratch using the web interface

The metadata can be created directly in NADA, using the embedded metadata editor. This approach will also require access to the "Add entry" page of the NADA administrator interface (see above). The option is available for all data types but is recommended only for data that require limited metadata (such as images, or documents). For other types of data, manually generating comprehensive metadata can be a very tedious process (e.g., for microdata where metadata related to hundreds if not thousands of variables would have to be manually entered).

### Loading metadata files using the API

This approach currently applies only to microdata, geographic datasets, and external resources. It will be added to other data types in future releases of NADA. 

If you use this approach, you will need an API key with administrator privileges. API keys must be kept strictly confidential. Avoid entering them in clear in your scripts, as you may accidentally reveal your API key when sharing your scripts (if that happens, immediately cancel your key, and issue a new one).

Once you have obtained a key (issued by a NADA administrator), you will have to enter it (and the URL of the catalog you are administering) before you implement any of the catalog administration functions available in NADAR or PyNADA. This will be the first commands in your R or Python scripts. It is done as follows:

Using R:

```r
library(nadar)

my_key <- read.csv("*...*/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_key\[5,1\]) # Assuming the key is in cell A5
set_api_url("http://*your_catalog_url*/index.php/api/")
set_api_verbose(FALSE)
```

Using Python:

```python
import pynada as nada
my_key = pd.read_csv(".../my_keys.csv", header=None)
nada.set_api_key(my_keys.iat\[4, 0\])
nada.set_api_url(\'https:// *your_catalog_url* /index.php/api/\')
```

Then use function in NADAR or PyNADA to add an entry by ***importing*** the metadata using the available *import* functions. 
In NADAR:
    - import_ddi
    - geospatial_import
    - external_resources_import

Examples are provided in the next sections. 

### Creating an entry from scratch using the API 

Metadata can also be generated and published programmatically, for example using R or Python, and uploaded to NADA using the API and the NADAR package of PyNADA library. This option allows automation of many tasks and offers the additional advantage of transparency and replicability. For administrators with knowledge of R and/or Python, this is a recommended approach except for microdata (for which the best approach is to use a specialized metadata editor). 

The metadata generated programmatically must comply with one of the metadata standards and schemas used by NADA, documented in the NADA API and in the Guide on the Use of Metadata Schemas. If you use this approach, you will need to provide an API key with administrator privileges and the catalog URL in your script, as shown in the previous paragraph. Then you add the code that generates the metadata and publish it in your catalog using the relevant *_add* function.

:::tip Metadata standards and schemas 
The documentation of the metadata standards and schemas recognized by NADA is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
:::

In all schemas, most elements are *optional*. This means that schema-compliant metadata can be very brief and simple. Almost no one will ever make use of all metadata elements available in a schema to document a datatset. We provide below a very simple example of the use of R and Python for publishing a document (with only a few metadata elements).

#### Generating compliant metadata using R

Metadata compliant with a standard/schema can be generated using R, and directly uploaded in a NADA catalog without having to be saved as a JSON file. An object must be created in the R script that contains metadata compliant with the JSON schema. The example below shows how such an object is created and published in a NADA catalog. We assume here that we have a document with the following information: 

   - document unique id: *ABC123* 
   - title: *Teaching in Lao PDR*
   - authors: *Luis Benveniste, Jeffery Marshall, Lucrecia Santibañez (World Bank)*
   - date published: *2007*
   - countries: *Lao PDR*. 
   - The document is available from the World Bank Open knowledge Repository at http://hdl.handle.net/10986/7710.   

We will use the DOCUMENT schema to document the publication, and the EXTERNAL RESOURCE schema to publish a link to the document.

In R or Python, publishing metadata (and data) in a NADA catalog requires that we first identify the on-line catalog where the metadata will be published (by providing its URL) and provide a key to authenticate as a catalog administrator. We then create an object (a list in R, or a dictionary in Python) that we will name *my_doc* (this is a user-defined name, not an imposed name). Within this list (dictionary), we will enter all metadata elements, some of which can be simple elements, while others are lists (dictionaries). The first element to be included is the `document_description`, which is required. Within it, we add the `title_statement` which is also required and contains the mandatory elements `idno` and `title` (all documents must have a unique ID number for cataloguing purpose, and a title). The list of countries that the document covers is a <u>repeatable</u> element, i.e. a list of lists (although we only have one country in this case). Information on the authors is also a repeatable element, allowing us to capture the information on the three co-authors individually. This *my_doc* object is then published in a NADA catalog. Last, we publish (as an external resource) a link to the file, with only basic information. We do not need to document this resource in detail, as it corresponds to the metadata provided in *my_doc*. If we had a different external resource (for example an Excel table that contains all tables shown in the publication), we would make use of more of the external resources metadata elements to document it. Note that instead of a URL, we could have provided a path to an electronic file (e.g., to the PDF document), in which case the file would be uploaded to the web server and made available directly from the on-line catalog. We had previously captured a screenshot of the cover page of the document to be used as thumbnail in the catalog (optional).

```r
library(nadar)

# Define the NADA catalog URL and provide an API key
set_api_url("http://nada-demo.ihsn.org/index.php/api/")
set_api_key("a1b2c3d4e5")  # Note: an API key must always be kept confidential

thumb  <- "C:/DOCS/teaching_lao.JPG"  # Cover page image to be used as thumbnail

# Generate and publish the metadata on the publication

doc_id <- "ABC001" 

my_doc <- list(

   document_description = list(
   
      title_statement = list(
        idno = doc_id, 
        title = "Teaching in Lao PDR"
      ),
      
      date_published = "2007",
  
      ref_country = list(
        list(name = "Lao PDR",  code = "LAO")
      ),
      
      # Authors: we only have one author, but this is a list of lists 
      # as the 'authors' element is a repeatable element in the schema
      authors = list(
        list(first_name = "Luis",     last_name = "Benveniste", affiliation = "World Bank"),
        list(first_name = "Jeffery",  last_name = "Marshall",   affiliation = "World Bank"),
        list(first_name = "Lucrecia", last_name = "Santibañez", affiliation = "World Bank")
      )

   )
   
)

# Publish the metadata in the central catalog 
add_document(idno = doc_id, 
             metadata = my_doc, 
             repositoryid = "central", 
             published = 1,
             thumbnail = thumb,
             overwrite = "yes")

# Add a link as an external resource of type document/analytical (doc/anl).
external_resources_add(
  title = "A comparison of the poverty profiles of Chad and Niger, 2020",
  idno = doc_id,
  dctype = "doc/anl",
  file_path = "http://hdl.handle.net/10986/7710",
  overwrite = "yes"
)
```

The document is now available in the NADA catalog.

#### Generating compliant metadata using Python @@@@

The Python equivalent of the R example provided above is as follows:

```python

# Define the NADA catalog URL and provide an API key
set_api_url("http://nada-demo.ihsn.org/index.php/api/")
set_api_key("a1b2c3d4e5")  # Note: an API key must always be kept confidential

thumb  <- "C:/DOCS/teaching_lao.JPG"  # Cover page image to be used as thumbnail

# Generate and publish the metadata on the publication

@@@ doc_id = "ABC001"

document_description = {

  'title_statement': {
      'idno': "ABC001",
      'title': "Teaching in Lao PDR"
  },
  
  'date_published': "2007",

  'ref_country': [
		{'name': "Lao PDR", 'code': "Lao"}
	],
  
  # Authors: we only have one author, but this is a list of lists 
  # as the 'authors' element is a repeatable element in the schema
  'authors': [
      {'first_name': "Luis",     'last_name': "Benveniste", 'affiliation' = "World Bank"},
      {'first_name': "Jeffery",  'last_name': "Marshall",   'affiliation' = "World Bank"},
      {'first_name': "Lucrecia", 'last_name': "Santibañez", 'affiliation' = "World Bank"},
  ]
  
}
```

Examples specific to each data type are provided in the next sections. 

## Adding microdata

![](~@imageBase/images/data_tabs_microdata.png)

Creating a Microdata entry can be done in two different ways using the administrator interface and the API:

-   By uploading pre-existing metadata (typically generated using a specialized metadata editor, like the Nesstar Publisher application for microdata) via the web interface.
-   By generating and uploading new metadata using the web interface (but with limited capability to document variables; this is thus not a recommended option).
-   By uploading pre-existing metadata (typically generated using a specialized metadata editor, like the Nesstar Publisher application for microdata) using the API.
-   By generating and uploading new metadata programatically, using R or Python and the API.

:::tip Metadata standard: the DDI Codebook 

For microdatasets, NADA makes use of the DDI Codebook (or DDI 2.n) metadata standard. 

The documentation of the DDI Codebook metadata standards is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Survey. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
:::

For microdata, the use of a specialized DDI metadata editor to generate metadata is highly recommended (like the Nesstar Publisher or the World Bank's Metadata Editor). Indeed, the DDI should contain a description of the variables included in the data files, preferably with summary statistics. Generating variable-level metadata can be a very tedious process as some datasets may include hundreds, even thousands of variables. Metadata editors have the capacity to extract the list of variables and some metadata (variable names, labels, value labels, and summary statistics) directly from the data files. The alternatives to generating the metadata using a specialized editor are to enter the metadata in NADA, or to enter them in R or Python scripts.

### Loading metadata (web interface) 

If you have used a specialized metadata editor like the Nesstar Publisher software application to document your microdata, you have obtained as an output an XML file that contains the study metadata (compliant with the DDI Codebook metadata standard), and a RDF file containing a description of the related resources (questionnaires, reports, technical documents, data files, etc.) These two files can be uploaded in NADA. 

In the administrator interface, select **Studies \> Manage studies** and the collection in which you want to add the dataset (if you have not created any collection, the only option will be to upload the dataset in the Central catalog; this can be transferred to another collection later if necessary). Then click on **Add study**.

![](~@imageBase/images/image95.png)

In the Select a DDI file and Select RDF file, select the relevant files. Select the "Overwrite if the study already exists" option if you want to replace metadata that may have been previously entered for that same study. A study will be considered the same if the unique identification number provided in the DDI metadata field "study_desc \> title statement \> idno" is the same (in the user and administrator interface, IDNO will be labeled "Reference No"). Then click **Submit**.

![](~@imageBase/images/image96.png)

The metadata will be uploaded, and an **Overview** tab will be displayed, providing you with the possibility to take various actions.

![](~@imageBase/images/image22.png)

![](~@imageBase/images/image97.png)

In **Country**, the names that are not compliant with the reference list of countries will be highlighted in red. By clicking on any of these country names, you will open the page where the mapping of these non-compliant names to a compliant name can be done. This is optional, but highly recommended to ensure that the filter by country (facet) shown in the user interface will operate in the best possible manner. See section "Catalog administration \> Countries".

**Metadata in PDF**: Allows you to generate a PDF version of the metadata (applies to microdata only).

![](~@imageBase/images/image21.png)

![](~@imageBase/images/image98.png)

**Data access**: This is where you will indicate the access policy for microdata. The restrictions associated with some of these access policies will apply to all files declared as "Data files" in NADA (see description of tabs "Files" and "Resources" below. NADA must be informed of what files are "Data files"; it is very important when you document and upload external resources to make sure that data files are properly identified. If a data file is uploaded as a "document" for example, it will be accessible to users no matter the access policy you apply to the dataset.

The options for Data access are:

-   ***Open data***: visitors to your catalog will be able to download and use the data almost without any restriction

-   ***Direct access***: visitors will be able to download the data without restriction, but the use of the data is subject to some (minor) conditions

-   ***Public Use Files (PUF)***: all registered visitors will be able to download the files after login; they will be asked but not forced to provide a description of the intended use.

-   ***Licensed data***: registered visitors will be able to submit a request for access to the data by filling out an on-line form, which will be reviewed by the catalog administrator who can approve, deny, or request more information (see section "Managing data requests").

-   ***Data accessible in external repository***: this is the option you will select when you want to publish metadata in your catalog but provide a link to an external repository where users will be able to download or request access to the data.

-   ***Data enclave***: in this option, information is provided to users on how to access the data in a data enclave.

-   ***Data not accessible***: in some cases, you will want to publish metadata and some related resources (report, questionnaire, technical documents, and others) but not the data.

**Indicator database**: this applies to microdata only. The field allows administrators to provide the URL of a website were indicators generated out of the microdata are published. 

**Study website**: a link to an external website dedicated to the survey.

**Featured study**: This allows administrators to mark entries as "featured". Featured studies will be shown on top of the list of entries in NADA catalogs, with a "Featured" pill.

**Tags**: Enter tags (each one with an optional tag group; tag groups will typically be used for creating custom facets; see section on Adding facets).

**Display in other collections**: The list of collections (if any) created in the catalog will be displayed. You can select the collections (other than the one in which you are publishing the dataset) in which you want your dataset to be visible. These collections will show but not own the dataset.

**Study aliases**: This field can be used to enter alternative names by which the dataset may be referred to.

**DOI**: The system allows administrators to request the issuance of a DOI for the dataset.

An image file can be selected to be used as thumbnail in the catalog. This thumbnail will be visible in the catalog listing page, and in the banner of the dataset page.

![](~@imageBase/images/select_thumbnail_microdata.png)

By default, the metadata you just published will be in draft mode in your catalog, i.e. not visible to users. To make the metadata visible in your catalog, click on "Draft" to convert the status to "Published". You can at any time unpublish a dataset; it will then become invisible to users, but will not be deleted from your catalog.

![](~@imageBase/images/image99.png)

In the **Files** tab, you have the option to upload the files (data files or external resources) that you want users to be able to access from the online catalog. Some files have already been uploaded (the XML and RDF files); others will have to be manually uploaded to the web server.

![](~@imageBase/images/image23.png)

In the **Resources** tab, you will see a list of external resources, which should correspond to the files you uploaded. A green icon should appear next to the "Link", indicating that a file has indeed been identified that corresponds to the resource. If you see a red icon, click on "Link resources" to try and fix the issue. If the problem persists, the filename identified in the RDF metadata probably does not match the name of the uploaded file, or the file has not been uploaded yet (see **Files** tab).

![](~@imageBase/images/image24.png)

That's it. Your data and metadata are now visible to all users who have access to your catalog.

![](~@imageBase/images/image26.png)

### From scratch (web interface)

If you want to add a microdata entry to your catalog using the web interface, but do not have metadata ready to be uploaded (in the form of a DDI-compliant XML file and an optional RDF file), you have the possibility to create a new entry in the NADA administrator web interface. Note however that this option is limited to the *study description* section of the DDI metadata standard. The *study description* of the DDI standard describes the overall aspects of the study (typically a survey). Other sections of the DDI are used to document each data file (*file description*), and each variable (*variable description*). In the current version of the metadata editor embedded in the NADA web interface, the file and variable description sections are not included. For that reason, the use of this option is not recommended except for cases when no file and variable description is available. In other cases, the use of a specialized metadata editor (like the Nesstar Publisher) or the more complex programatic option (described below) are recommended. Documenting files and variables (when available) adds rich metadata that will increase the visibility, discoverability, and usability of your datasets.

To document a micro-dataset from scratch using the web interface, select "Add study" in the dashboard page, then select the option *microdata* in the **Create new study** box. Then click **Create**.

![](~@imageBase/images/image100.png)

The *Overview* tab of a new, empty entry will be displayed. 

![](~@imageBase/images/image101.png)

Click on the **Metadata** tab to open the (limited) DDI metadata editor. The left navigation bar allows you to navigate in the metadata entry form. Enter a much information as you can in the metadata fields, then click **Save**.

![](~@imageBase/images/image102.png)

![](~@imageBase/images/image103.png)

Once you have entered and saved metadata, proceed as explained in the previous section to upload files, select options, add a thumbnail, and publish your metadata. To add external resources, use the **Add resource** in the External resources page.

### Loading metadata (API)

If you have used a specialized metadata editor like the Nesstar Publisher software application to document your microdata, you have obtained as an output an XML file that contains the study metadata (compliant with the DDI Codebook metadata standard), and a RDF file containing a description of the related resources (questionnaires, reports, technical documents, data files, etc.) These two files can be uploaded in NADA using the API and the R package NADAR or the Python library Pynada. We provided an example in section "Getting started -- Publishing microdata", which we replicate here.

<code-group>
<code-block title="R">

```r
library(nadar)
library(readxl)
  
# Set administrator API key and catalog URL
# The API key must be kept strictly confidential and never be entered in clear in a script, 
# to avoid accidental sharing. A recommended option is to read it from an external file. 
  
my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header = F, stringsAsFactors = F)
set_api_key(my_keys[5,1])  # We assume here that the key is stored in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/")  # Enter the URL of your catalog
set_api_verbose(FALSE)

# Set the default folder, where the DDI and RDF files are stored.
# This folder has a sub-folder /Doc where the external resource is located (the
# resources must be stored in a folder with a relative path corresponding to the
# path provided in the RDF file)

setwd("C:/demo_nada_files/try_micro")  

# Upload the DDI (only contains the dataset metadata; does not contain data)

import_ddi(xml_file = "./AFR_1996_WDAAF_v01_M.xml", 
           repositoryid = "central",
           overwrite = "yes", 
           access_policy = "open",  # This is where we set the access policy
           published = 1)  # Set this to 0 to upload as draft

# Upload the RDF and the resource files
# The location (relative path) of the resource files is provided in the RDF file;
# As long as the files are found in the correct folders, they will be uploaded to
# the web server and made accessible in the NADA catalog. To avoid entering the
# same resources multiple times, we delete all resources (in case any had been 
# uploaded previously) before running the function.

external_resources_delete_all(dataset_idno = "AFR_1996_WDAAF_v01_M")

external_resources_import(dataset_idno = "AFR_1996_WDAAF_v01_M", 
                          rdf_file = "./AFR_1996_WDAAF_v01_M.rdf",
                          skip_uploads = FALSE,
                          overwrite = "yes")

# We want to make the data accessible from the NADA catalog; the data files must
# therefore be uploaded on the web server. It is essential to declare the type
# as "microdata" (dctype = "dat/micro") as this will allow NADA to apply the
# appropriate access restrictions corresponding to the access policy for the  
# dataset (in this case, we entered option access_policy = "open" in the 
# ddi_import function, so the data files will be made directly accessible from
# the catalog without requiring users to register or request permission).

external_resources_add(
  idno = "AFR_1996_WDAAF_v01_M",
  dctype = "dat/micro",
  title = "Data in CSV format",
  overwrite = "yes",
  file_path = "./Data/AFR_1996_WDAAF_v01_CSV.zip"
)

external_resources_add(
  idno = "AFR_1996_WDAAF_v01_M",
  dctype = "dat/micro",
  title = "Data in Stata 8 format",
  overwrite = "yes",
  file_path = "./Data/AFR_1996_WDAAF_v01_M_STATA8.zip"
)

external_resources_add(
  idno = "AFR_1996_WDAAF_v01_M",
  dctype = "dat/micro",
  title = "Data in SPSS format",
  overwrite = "yes",
  file_path = "./Data/AFR_1996_WDAAF_v01_SPSS.zip"
)

# Add a thumbnail

thumbnail_upload(idno = "AFR_1996_WDAAF_v01_M", thumbnail = "./logo.JPG")
```
</code-block>
    
<code-block title="Python">

```python

import pynada as nada
import pandas as pd
import os

# Set administrator API key and catalog URL
# The API key must be kept strictly confidential and never be entered in clear in a script, 
# to avoid accidental sharing. A recommended option is to read it from an external file. 
  
my_keys = pd.read_csv("C:/CONFIDENTIAL/my_keys.csv", header = None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is stored in cell A5
nada.set_api_url('https://nada-demo.ihsn.org/index.php/api/')  # Enter the URL of your catalog

# Set the default folder, where the DDI and RDF files are stored.
# This folder has a sub-folder /Doc where the external resource is located (the
# resources must be stored in a folder with a relative path corresponding to the
# path provided in the RDF file)

os.chdir("demo_nada_files/try_micro")

# Upload the DDI

nada.import_DDI(file = "AFR_1996_WDAAF_v01_M.xml",
                overwrite = "yes",
                repository_id = "central",
                access_policy = "open",  # This is where we set the access policy
                published = 1)  # Set this to 0 to upload as draft

# Upload the RDF and the resource files
# The location (relative path) of the resource files is provided in the RDF file;
# As long as the files are found in the correct folders, they will be uploaded to
# the web server and made accessible in the NADA catalog. To avoid entering the
# same resources multiple times, we delete all resources (in case any had been 
# uploaded previously) before running the function.

nada.delete_all_resources("AFR_1996_WDAAF_v01_M")

nada.import_RDF(dataset_id = "AFR_1996_WDAAF_v01_M",
                file = "AFR_1996_WDAAF_v01_M.rdf")

# We want to make the data accessible from the NADA catalog; the data files must
# therefore be uploaded on the web server. It is essential to declare the type
# as "microdata" (dctype = "dat/micro") as this will allow NADA to apply the
# appropriate access restrictions corresponding to the access policy for the  
# dataset (in this case, we entered option access_policy = "open" in the 
# ddi_import function, so the data files will be made directly accessible from
# the catalog without requiring users to register or request permission).

nada.add_resource(dataset_id = "AFR_1996_WDAAF_v01_M",
                  dctype = "dat/micro",
                  title = "Data in CSV format",
                  file_path = "Data/AFR_1996_WDAAF_v01_CSV.zip",
                  overwrite = "yes")

nada.add_resource(dataset_id = "AFR_1996_WDAAF_v01_M",
                  dctype = "dat/micro",
                  title = "Data in Stata 8 format",
                  file_path = "Data/AFR_1996_WDAAF_v01_M_STATA8.zip",
                  overwrite = "yes")

nada.add_resource(dataset_id = "AFR_1996_WDAAF_v01_M",
                  dctype = "dat/micro",
                  title = "Data in SPSS format",
                  file_path = "Data/AFR_1996_WDAAF_v01_SPSS.zip",
                  overwrite = "yes")

# Add a thumbnail

nada.upload_thumbnail(dataset_id = "AFR_1996_WDAAF_v01_M", file_path = "logo.JPG")
  
```
</code-block>
    
</code-group>

### From scratch (API)

If you do not have DDI-compliant metadata readily available, you can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
	
As the DDI schema is relatively complex, the use of a specialized DDI metadata editor like the Nesstar Publisher may be a better option to document microdata. But this can be done using R or Python. Typically, microdata will be documented programmatically when (i) the dataset is not too complex, and/or (ii) when there is no intent to generate detailed, variable-level metadata. We provide here an example of the documentation of a simple micro-dataset using R and Python.

@@@@@@ Provide a complete example in R and Python


<code-group>
<code-block title="R">

```r
library(nadar)
library(readxl)
  
# Set administrator API key and catalog URL
# The API key must be kept strictly confidential and never be entered in clear in a script, 
# to avoid accidental sharing. A recommended option is to read it from an external file. 
  
my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header = F, stringsAsFactors = F)
set_api_key(my_keys[5,1])  # We assume here that the key is stored in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/")  # Enter the URL of your catalog
set_api_verbose(FALSE)
```
</code-block>
    
<code-block title="Python">

```python

import pynada as nada
import pandas as pd
import os

# Set administrator API key and catalog URL
# The API key must be kept strictly confidential and never be entered in clear in a script, 
# to avoid accidental sharing. A recommended option is to read it from an external file. 
  
my_keys = pd.read_csv("C:/CONFIDENTIAL/my_keys.csv", header = None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is stored in cell A5
nada.set_api_url('https://nada-demo.ihsn.org/index.php/api/')  # Enter the URL of your catalog
  
```
</code-block>
</code-group>

    
## Adding a geographic dataset

![](~@imageBase/images/data_tabs_geospatial.png)	
	
:::tip Metadata standard: ISO 19139 

For geographic data, NADA makes use of the ISO 19139 metadata standard.
	
The documentation of the ISO 19139 metadata standard (as implemented in NADA) is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Geospatial. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas.
:::	
	
### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA. To upload metadata for a geographic dataset available in an XML file compliant with the ISO19139 standard, the API option (see below) must be used.

### From scratch (web interface)

This option is currently not provided. The ISO19139 schema is complex. An ISO19139 editor may be implemented in future versions. In the meantime, the GeoNetwork editor can be used, or the API option described below.

### Loading metadata (API) 
@@@    
    
### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
        
<code-group>
<code-block title="R">

```r
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 014
#
# Use case description: document a geographic dataset (vector / shape files)
# containing the outline of Rohingyas refugee camps in Cox Bazar (Bangladesh) in
# January 2021. The data are downloaded from the OCHA open data platform (HDX).
#
# In this example, we DO NOT seek to extract all metadata available in the data
# files. We could extract information on the features contained in the shape 
# files and document them using the ISO19110 (features description) of the schema.
# This would document the fact that the data contain variables District, Upazila,
# Settlement, Union, Area_Acres, Camp_name, and more (with categories for each).
# Another script example is provided that shows how to include features
# descriptions.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Geospatial
#
# Script tested with NADA version: 5.0
# Date: 2021-09-14
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

library(nadar)
library(sf)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 
set_api_verbose(FALSE)

setwd("E:/demo_nada_files/UC014/GEO_COX")

thumb_file = "shape_camps.JPG"

# Download the data files
# -----------------------

urls <- list("https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/7cec91fb-d0a8-4781-9f8d-9b69772ef2fd/download/210415_rrc_geodata_al1al2al3.gdb.zip",
             "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/ace4b0a6-ef0f-46e4-a50a-8c552cfe7bf3/download/200908_rrc_outline_camp_al1.zip",
             "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/bd5351e7-3ffc-4eaa-acbc-c6d917b5549c/download/200908_rrc_outline_camp_al1.kmz",
             "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/9d5693ec-eeb8-42ed-9b65-4c279f523276/download/200908_rrc_outline_block_al2.zip",
             "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/ed119ae4-b13d-4473-9afe-a8c36e07870b/download/200908_rrc_outline_block_al2.kmz",
             "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/0d2d87ae-52a5-4dca-b435-dcd9c617b417/download/210118_rrc_outline_subblock_al3.zip",
             "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/6286c4a5-d2ab-499a-b019-a7f0c327bd5f/download/210118_rrc_outline_subblock_al3.kmz")

for(url in urls) {
  f <- basename(url) 
  if (!file.exists(f)) {
    download.file(url, destfile=f, mode="wb")
  }
}

# We extract the bounding box and nb of features from the available shape files
# (Note: all shape files cover the same area)

unzip("./Data/200908_rrc_outline_camp_al1.zip", exdir = "./temp")
al1 <- st_read("./temp/200908_rrc_outline_camp_al1/200908_rrc_outline_camp_al1.shp")
al1_bb <- st_bbox(al1)
al1_nf <- length(al1)

unzip("./Data/200908_rrc_outline_block_al2.zip", exdir = "./temp")
al2 <- st_read("./temp/200908_rrc_outline_block_al2/200908_rrc_outline_block_al2.shp")
al2_bb <- st_bbox(al2)
al2_nf <- length(al2)

unzip("./Data/210118_rrc_outline_subblock_al3.zip", exdir = "./temp")
al3 <- st_read("./temp/210118_rrc_outline_subblock_al3/210118_rrc_outline_subblock_al3.shp")
al3_bb <- st_bbox(al3)
al3_nf <- length(al3)

# Generate the metadata compliant with the schema (ISO 19139)

geo_id = "UC014"

meta_cox <- list(

  metadata_information = list(    
    producers = list(list(name = "NADA team")),
    production_date = "2021-09-14",
    version = "v01"
  ),
    
  description = list(
    
    idno=geo_id,
    
    language="English",
    
    characterSet = list(
      codeListValue = "utf8"
    ),
    
    hierarchyLevel = list("dataset"),
    
    contact = list(
      list(
        organisationName = "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
        contactInfo = list(
          address = list(country = "Bangladesh"),
          onlineResource = list(
            linkage = "https://www.humanitarianresponse.info/en/operations/bangladesh/",
            name = "Website"
          )
        ),
        role = "owner"
      )
    ),
    
    dateStamp="2021-04-18",
    
    metadataStandardName = "ISO 19115:2003/19139",
    
    dataSetURI="https://data.humdata.org/dataset/outline-of-camps-sites-of-rohingya-refugees-in-cox-s-bazar-bangladesh",
    
    spatialRepresentationInfo = list(
      #al1
      list(
        vectorSpatialRepresentationInfo = list(
          topologyLevel = "geometryOnly",
          geometricObjects = list(
            geometricObjectType = "surface",
            geometricObjectCount = as.character(al1_nf) 
          )
        )
      ),
      # al2
      list(
        vectorSpatialRepresentationInfo = list(
          topologyLevel = "geometryOnly",
          geometricObjects = list(
            geometricObjectType = "surface",
            geometricObjectCount = as.character(al2_nf)
          )
        )
      ),
      # al3
      list(
        vectorSpatialRepresentationInfo = list(
          topologyLevel = "geometryOnly",
          geometricObjects = list(
            geometricObjectType = "surface",
            geometricObjectCount = as.character(al3_nf)
          )
        )
      )
    ),
    
    referenceSystemInfo = list(
      list(
        code = "4326", 
        codeSpace = "EPSG"
      )
    ),
    
    identificationInfo = list(
      list(
        citation = list(
          title="Bangladesh, Outline of camps of Rohingya refugees in Cox's Bazar, January 2021",
          date=list(list(date="2021-01-20", type= "creation")),
          citedResponsibleParty = list(
            list(
              organisationName = "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
              contactInfo = list(
                address = list(
                  country = "Bangladesh"
                ),
                onlineResource = list(
                  linkage = "https://www.humanitarianresponse.info/en/operations/bangladesh/",
                  name = "Website"
                )
              ),
              role = "owner"
            )
          )
        ),
        
        abstract = "These polygons were digitized through a comnibination of methodologies, originally using VHR satellite imagery and GPS points collected in the field, verified and amended according to Site Management Sector, RRRC, Camp in Charge (CiC) officers inputs, with technical support from other partners.",

        credit = "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
        
        status = "completed",
        
        pointOfContact = list(
          list(
            organisationName = "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
            contactInfo = list(
              address = list(
                country = "Bangladesh"
              ),
              onlineResource = list(
                linkage = "https://www.humanitarianresponse.info/en/operations/bangladesh/",
                name = "Website"
              )
            ),
            role = "pointOfContact"
          )
        ),
        
        resourceMaintenance = list(
          list(
            maintenanceOrUpdateFrequency="asNeeded"
          )
        ),
        
        graphicOverview = list(
          list(fileName = "41405641910_e05b7ff46c_c.jpg", 
               fileDescription = "Block D5, Kutupalong extension camp, Cox's Bazar - 1 (photo WB)",
               fileType = "image"),
          list(fileName = "41405643020_0e6fd51506_c.jpg", 
               fileDescription = "Block D5, Kutupalong extension camp, Cox's Bazar - 2 (photo WB)",
               fileType = "image"),
          list(fileName = "41405642400_16fa81c6a9_c.jpg", 
               fileDescription = "Near Block D5, Kutupalong extension Camp, Cox's Bazar (photo WB)",
               fileType = "image")
        ),
        
        resourceFormats = list(
          list(name = "application/zip", 
               specification = "ESRI Shapefile (zipped)", 
               FormatDistributor = list(organisationName = "ESRI")),
          list(name = "application/vnd.google-earth.kmz", 
               specification = "KMZ file", 
               FormatDistributor = list(organisationName = "Google")),
          list(name = "ESRI Geodatabase", 
               FormatDistributor = list(organisationName = "ESRI"))
        ),
        
        descriptiveKeywords = list(
          list(type = "theme", keyword = "Refugee camp"),
          list(type = "theme", keyword = "forced displacement"),
          list(type = "theme", keyword = "Rohingya"
          )
        ),	
        
        resourceConstraints = list(
          list(
            legalConstraints = list(
              accessConstraints = list("unrestricted"),
              useConstraints = list("licenceUnrestricted"),
              uselimitation = list("License: http://creativecommons.org/publicdomain/zero/1.0/legalcode")
            )
          )
        ),
        
        spatialRepresentationType = "vector",
        
        language = list("eng"),
        
        characterSet = list(),
        
        topicCategory = list("structure"),
        
        extent=list(
          geographicElement = list(
            list(
              geographicBoundingBox = list(
                southBoundLatitude = 20.91856,
                westBoundLongitude = 92.12973,
                northBoundLatitude = 21.22292,
                eastBoundLongitude = 92.26863
              )
            )
          ),
          temporalElement=list(
            list(extent="")
          )
        )
      )
    ),
    
    #contentInfo,
    distributionInfo = list(
      distributionFormat = list(
        list(name = "application/zip", specification = "ESRI Shapefile (zipped)", FormatDistributor = list(organisationName = "ESRI")),
        list(name = "application/vnd.google-earth.kmz", specification = "KMZ file", FormatDistributor = list(organisationName = "Google")),
        list(name = "ESRI Geodatabase", FormatDistributor = list(organisationName = "ESRI"))
      ),
      distributor = list(
        list(
          organisationName = "OCHA", 
          contactInfo = list(
            onlineResource = list(
              linkage = "https://data.humdata.org/dataset/outline-of-camps-sites-of-rohingya-refugees-in-cox-s-bazar-bangladesh",
              name = "Website"
            )
          )
        )
      ),
      
      # The data are publicly available on-line. As we do not plan to control 
      # access in the NADA catalog, we provide links in the transferOptions
      # section below. AN alternative would be to drop this section, and to
      # document/upload the data as external resources. Declaring them as 
      # dctype = 'dat/mic" would then offer the possibility to select a data
      # access policy. 
      
      transferOptions = list(
        onLine = list(
          list(
            filename="https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/7cec91fb-d0a8-4781-9f8d-9b69772ef2fd/download/210118_rrc_geodata_al1al2al3.gdb.zip",
            title="210118_RRC_GeoData_AL1,AL2,AL3.gdb.zip",
            description="This zipped geodatabase file (GIS) contains the Camp boundary (Admin level-1) and and camp-block boundary (admin level-2 or camp sub-division) and sub-block boundary of Rohingya refugee camps and administrative level-3 or sub block division of Camp 1E-1W, Camp 2E-2W, Camp 8E-8W, Camp 4 Extension, Camp 3-7, Camp 9-20, and Camp 21-27 in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
            dctype="map",
            dcformat="application/zip"
          ),
          list(
            filename="https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/ace4b0a6-ef0f-46e4-a50a-8c552cfe7bf3/download/200908_rrc_outline_camp_al1.zip",
            title="200908_RRC_Outline_Camp_AL1.zip",
            description="This zipped shape file (GIS) contains the Camp boundary (Admin level-1) of Rohingya refugees in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
            dctype="map",
            dcformat="application/zip"
          ),
          list(
            filename="https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/bd5351e7-3ffc-4eaa-acbc-c6d917b5549c/download/200908_rrc_outline_camp_al1.kmz",
            title="200908_RRC_Outline_Camp_AL1.kmz",
            description="This kmz file (Google Earth) contains the Camp boundary (Admin level-1) of Rohingya refugees in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
            dctype="map",
            dcformat="application/zip"
          ),
          list(
            filename="https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/9d5693ec-eeb8-42ed-9b65-4c279f523276/download/200908_rrc_outline_block_al2.zip",
            title="200908_RRC_Outline_Block_AL2.zip",
            description="This zipped shape file (GIS) contains the camp-block boundary (admin level-2 or camp sub-division) of Rohingya refugees in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
            dctype="map",
            dcformat="application/zip"
          ),
          list(
            filename="https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/ed119ae4-b13d-4473-9afe-a8c36e07870b/download/200908_rrc_outline_block_al2.kmz",
            title="200908_RRC_Outline_Block_AL2.kmz",
            description="This kmz file (Google Earth) contains the camp-block boundary (admin level-2 or camp sub-division) of Rohingya refugees in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
            dctype="map",
            dcformat="application/zip"
          ),
          list(
            filename="https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/0d2d87ae-52a5-4dca-b435-dcd9c617b417/download/210118_rrc_outline_subblock_al3.zip",
            title="210118_RRC_Outline_SubBlock_AL3.zip",
            description="This zipped shape file (GIS) contains the camp-sub-block (Admin level-3) of Camp 1E-1W, Camp 2E-2W, Camp 8E-8W, Camp 4 Extension, Camp 3-7, Camp 9-20, and Camp 21-27 in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
            dctype="map",
            dcformat="application/zip"
          ),
          list(
            filename="https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/6286c4a5-d2ab-499a-b019-a7f0c327bd5f/download/210118_rrc_outline_subblock_al3.kmz",
            title="210118_RRC_Outline_SubBlock_AL3.kmz",
            description="This kmz file (Google Earth) contains the camp-sub-block (Admin level-3) of Camp 1E-1W, Camp 2E-2W, Camp 8E-8W, Camp 4 Extension, Camp 3-7, Camp 9-20, and Camp 21-27 in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
            dctype="map",
            dcformat="application/zip"
          )
        )
      ),
      
      dataQualityInfo=list(
        scope="dataset", 
        lineage=list(
          processStep=list(
            list(
              description="The camps are continuously expanding, and Camp Boundaries are structured around the GoB, RRRC official governance structure of the camps, taking into account the potential new land allocation. The database is kept as accurate as possible, given these challenges."
            )
          )
        )
      ),
      
      metadataMaintenance=list(
        maintenanceAndUpdateFrequency="asNeeded"
      )
      
    )
  )  
)

# Publish metadata in catalog

geospatial_add(idno = geo_id, 
               metadata = meta_cox, 
               repositoryid = "central", 
               published = 1, 
               thumbnail = thumb_file, 
               overwrite = "yes")


# Add a link to Google Earth as an external resource

external_resources_add(
  title = "Google Earth aerial image",
  idno = geo_id,
  dctype = "web",
  description = "Link to Google Earth aerial image of the Kutupalong Refugee Camp",
  file_path = "https://earth.google.com/web/search/rohingya+cox+camp/@21.2127084,92.1634829,15.88307203a,976.95413757d,35y,0h,45t,0r/data=CnwaUhJMCiUweDMwYWRlNzZkNTlkMGM1NGY6MHg0ZjllZDY5MWExMzg5YTlmGU6D_TJzNjVAIRDM0eN3CldAKhFyb2hpbmd5YSBjb3ggY2FtcBgCIAEiJgokCT3JGaHIwztAEZgmrtRF0irAGZzEE0DJu1RAIcpYcp98KzzAKAI",
  overwrite = "yes"
)
```
</code-block>
    
<code-block title="Python">

```python
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 014
#
# Use case description: document a geographic dataset (vector / shape files)
# containing the outline of Rohingyas refugee camps in Cox Bazar (Bangladesh) in
# January 2021. The data are downloaded from the OCHA open data platform (HDX).
#
# In this example, we DO NOT seek to extract all metadata available in the data
# files. We could extract information on the features contained in the shape
# files and document them using the ISO19110 (features description) of the schema.
# This would document the fact that the data contain variables District, Upazila,
# Settlement, Union, Area_Acres, Camp_name, and more (with categories for each).
# Another script example is provided that shows how to include features
# descriptions.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Geospatial
#
# Script tested with NADA version: 5.0
# Date: 2021-09-14
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================
import urllib
import pynada as nada
import pandas as pd
import geopandas as gpd
import os
from os.path import exists as file_exists
from zipfile import ZipFile

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys = pd.read_csv("confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is in cell A5
nada.set_api_url('https://nada-demo.ihsn.org/index.php/api/')

os.chdir("demo_nada_files/UC014/GEO_COX")

thumb_file = "shape_camps.JPG"

# Download the data files
# -----------------------

urls = [
    "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/7cec91fb-d0a8-4781-9f8d"
    "-9b69772ef2fd/download/210415_rrc_geodata_al1al2al3.gdb.zip",
    "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/ace4b0a6-ef0f-46e4-a50a"
    "-8c552cfe7bf3/download/200908_rrc_outline_camp_al1.zip",
    "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/bd5351e7-3ffc-4eaa-acbc"
    "-c6d917b5549c/download/200908_rrc_outline_camp_al1.kmz",
    "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/9d5693ec-eeb8-42ed-9b65"
    "-4c279f523276/download/210415_rrc_outline_block_al2.zip",
    "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/ed119ae4-b13d-4473-9afe"
    "-a8c36e07870b/download/210413_rrc_outline_block_al2.kmz",
    "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/0d2d87ae-52a5-4dca-b435"
    "-dcd9c617b417/download/210118_rrc_outline_subblock_al3.zip",
    "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource/6286c4a5-d2ab-499a-b019"
    "-a7f0c327bd5f/download/210118_rrc_outline_subblock_al3.kmz"
]

for url in urls:
    f = os.path.basename(url)
    if not file_exists(f'Data/{f}'):
        try:
            nada.download_file(url, f'Data/{f}', mode="wb")
        except urllib.error.HTTPError:
            print("Not found")

# We extract the bounding box and nb of features from the available shape files
# (Note: all shape files cover the same area)
ZipFile("Data/200908_rrc_outline_camp_al1.zip").extractall("temp")
al1 = gpd.read_file("temp/200908_rrc_outline_camp_al1/200908_rrc_outline_camp_al1.shp")
# or read file directly from zipfile:
# al1 = gpd.read_file("Data/200908_rrc_outline_camp_al1.zip!200908_RRC_Outline_Camp_AL1/200908_RRC_Outline_Camp_AL1
# .shp")
al1_bb = al1.total_bounds
al1_nf = len(al1.columns)

ZipFile("Data/210415_rrc_outline_block_al2.zip").extractall("temp")
al2 = gpd.read_file("temp/210415_rrc_outline_block_al2/210413_rrc_outline_block_al2.shp")
al2_bb = al2.total_bounds
al2_nf = len(al2.columns)

ZipFile("Data/210118_rrc_outline_subblock_al3.zip").extractall("temp")
al3 = gpd.read_file("temp/210118_rrc_outline_subblock_al3/210118_rrc_outline_subblock_al3.shp")
al3_bb = al3.total_bounds
al3_nf = len(al3.columns)

# Generate the metadata compliant with the schema (ISO 19139)

geo_id = "UC014"
metadata_information = {
    'producers': [{'name': "NADA team"}],
    'production_date': "2021-09-14",
    'version': "v01"
}
description = {
    'idno': geo_id,
    'language': "English",
    'characterSet': {
        'codeListValue': "utf8"
    },
    'hierarchyLevel': ["dataset"],
    'contact': [
        {
            'organisationName': "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
            'contactInfo': {
                'address': {'country': "Bangladesh"},
                'onlineResource': {
                    'linkage': "https://www.humanitarianresponse.info/en/operations/bangladesh/",
                    'name': "Website"
                }
            },
            'role': "owner"
        }
    ],
    'dateStamp': "2021-04-18",
    'metadataStandardName': "ISO 19115:2003/19139",
    'dataSetURI': "https://data.humdata.org/dataset/outline-of-camps-sites-of-rohingya-refugees-in-cox-s-bazar"
                  "-bangladesh",
    'spatialRepresentationInfo': [
        # al1
        {
            'vectorSpatialRepresentationInfo': {
                'topologyLevel': "geometryOnly",
                'geometricObjects': [
                    {
                        'geometricObjectType': "surface",
                        'geometricObjectCount': al1_nf
                    }]
            }
        },
        # al2
        {
            'vectorSpatialRepresentationInfo': {
                'topologyLevel': "geometryOnly",
                'geometricObjects': [
                    {
                        'geometricObjectType': "surface",
                        'geometricObjectCount': al2_nf
                    }]
            }
        },
        # al3
        {
            'vectorSpatialRepresentationInfo': {
                'topologyLevel': "geometryOnly",
                'geometricObjects': [
                    {
                        'geometricObjectType': "surface",
                        'geometricObjectCount': al3_nf
                    }]
            }
        }
    ],
    'referenceSystemInfo': [
        {
            'code': "4326",
            'codeSpace': "EPSG"
        }
    ],
    'identificationInfo': [
        {
            'citation': {
                'title': "Bangladesh, Outline of camps of Rohingya refugees in Cox's Bazar, January 2021",
                'date': [{'date': "2021-01-20", 'type': "creation"}],
                'citedResponsibleParty': [
                    {
                        'organisationName': "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
                        'contactInfo': {
                            'address': {
                                'country': "Bangladesh"
                            },
                            'onlineResource': {
                                'linkage': "https://www.humanitarianresponse.info/en/operations/bangladesh/",
                                'name': "Website"
                            }
                        },
                        'role': "owner"
                    }
                ]},
            'abstract': "These polygons were digitized through a combination of methodologies, "
                        "originally using VHR satellite imagery and GPS points collected in the "
                        "field, verified and amended according to Site Management Sector, RRRC, "
                        "Camp in Charge (CiC) officers inputs, with technical support from other "
                        "partners.",
            'credit': "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
            'status': "completed",
            'pointOfContact': [
                {
                    'organisationName': "Site Management Sector, RRRC, Inter Sector Coordination Group (ISCG)",
                    'contactInfo': {
                        'address': {
                            'country': "Bangladesh"
                        },
                        'onlineResource': {
                            'linkage': "https://www.humanitarianresponse.info/en/operations/bangladesh/",
                            'name': "Website"
                        }
                    },
                    'role': "pointOfContact"
                }
            ],
            'resourceMaintenance': [
                {
                    'maintenanceOrUpdateFrequency': "asNeeded"
                }
            ],
            'graphicOverview': [
                {
                    'fileName': "41405641910_e05b7ff46c_c.jpg",
                    'fileDescription': "Block D5, Kutupalong extension camp, Cox's Bazar - 1 (photo WB)",
                    'fileType': "image"},
                {
                    'fileName': "41405643020_0e6fd51506_c.jpg",
                    'fileDescription': "Block D5, Kutupalong extension camp, Cox's Bazar - 2 (photo WB)",
                    'fileType': "image"},
                {
                    'fileName': "41405642400_16fa81c6a9_c.jpg",
                    'fileDescription': "Near Block D5, Kutupalong extension Camp, Cox's Bazar (photo WB)",
                    'fileType': "image"}
            ],
            'resourceFormats': [
                {
                    'name': "application/zip",
                    'specification': "ESRI Shapefile (zipped)",
                    'FormatDistributor': {'organisationName': "ESRI"}},
                {
                    'name': "application/vnd.google-earth.kmz",
                    'specification': "KMZ file",
                    'FormatDistributor': {'organisationName': "Google"}},
                {
                    'name': "ESRI Geodatabase",
                    'FormatDistributor': {'organisationName': "ESRI"}}
            ],
            'descriptiveKeywords': [
                {'type': "theme", 'keyword': "Refugee camp"},
                {'type': "theme", 'keyword': "forced displacement"},
                {'type': "theme", 'keyword': "Rohingya"}
            ],
            'resourceConstraints': [
                {
                    'legalConstraints': {
                        'accessConstraints': ["unrestricted"],
                        'useConstraints': ["licenceUnrestricted"],
                        'uselimitation': ["License: http://creativecommons.org/publicdomain/zero/1.0/legalcode"]
                    }
                }
            ],
            'spatialRepresentationType': "vector",
            'language': ["eng"],
            'characterSet': [],
            'topicCategory': ["structure"],
            'extent': {
                'geographicElement': [
                    {
                        'geographicBoundingBox': {
                            'southBoundLatitude': 20.91856,
                            'westBoundLongitude': 92.12973,
                            'northBoundLatitude': 21.22292,
                            'eastBoundLongitude': 92.26863
                        }
                    }
                ],
                'temporalElement': [{'extent': ""}]
            }
        }
    ],
    'contentInfo': [],
    'distributionInfo': {
        'distributionFormat': [
            {
                'name': "application/zip", 'specification': "ESRI Shapefile (zipped)",
                'FormatDistributor': {'organisationName': "ESRI"}},
            {
                'name': "application/vnd.google-earth.kmz", 'specification': "KMZ file",
                'FormatDistributor': {'organisationName': "Google"}},
            {'name': "ESRI Geodatabase", 'FormatDistributor': {'organisationName': "ESRI"}}
        ],
        'distributor': [
            {
                'organisationName': "OCHA",
                'contactInfo': {
                    'onlineResource': {
                        'linkage': "https://data.humdata.org/dataset/outline-of-camps-sites-of-rohingya-refugees-in"
                                   "-cox-s-bazar-bangladesh",
                        'name': "Website"
                    }
                }
            }
        ],
        # The data are publicly available on-line. As we do not plan to control
        # access in the NADA catalog, we provide links in the transferOptions
        # section below. AN alternative would be to drop this section, and to
        # document/upload the data as external resources. Declaring them as
        # dctype = 'dat/mic" would then offer the possibility to select a data
        # access policy.

        'transferOptions': {
            'onLine': [
                {
                    'filename': "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource"
                                "/7cec91fb-d0a8-4781-9f8d-9b69772ef2fd/download/210415_rrc_geodata_al1al2al3.gdb.zip",
                    'title': "210415_RRC_GeoData_AL1,AL2,AL3.gdb.zip",
                    'description': "This zipped geodatabase file (GIS) contains the Camp boundary (Admin level-1) and "
                                   "and camp-block boundary (admin level-2 or camp sub-division) and sub-block "
                                   "boundary of Rohingya refugee camps and administrative level-3 or sub block "
                                   "division of Camp 1E-1W, Camp 2E-2W, Camp 8E-8W, Camp 4 Extension, Camp 3-7, "
                                   "Camp 9-20, and Camp 21-27 in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
                    'dctype': "map",
                    'dcformat': "application/zip"
                },
                {
                    'filename': "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource"
                                "/ace4b0a6-ef0f-46e4-a50a-8c552cfe7bf3/download/200908_rrc_outline_camp_al1.zip",
                    'title': "200908_RRC_Outline_Camp_AL1.zip",
                    'description': "This zipped shape file (GIS) contains the Camp boundary (Admin level-1) of "
                                   "Rohingya refugees in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
                    'dctype': "map",
                    'dcformat': "application/zip"
                },
                {
                    'filename': "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource"
                                "/bd5351e7-3ffc-4eaa-acbc-c6d917b5549c/download/200908_rrc_outline_camp_al1.kmz",
                    'title': "200908_RRC_Outline_Camp_AL1.kmz",
                    'description': "This kmz file (Google Earth) contains the Camp boundary (Admin level-1) of "
                                   "Rohingya refugees in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
                    'dctype': "map",
                    'dcformat': "application/zip"
                },
                {
                    'filename': "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource"
                                "/9d5693ec-eeb8-42ed-9b65-4c279f523276/download/210415_rrc_outline_block_al2.zip",
                    'title': "210415_RRC_Outline_Block_AL2.zip",
                    'description': "This zipped shape file (GIS) contains the camp-block boundary (admin level-2 or "
                                   "camp sub-division) of Rohingya refugees in Cox's Bazar, Bangladesh. Updated: "
                                   "April 18, 2021",
                    'dctype': "map",
                    'dcformat': "application/zip"
                },
                {
                    'filename': "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource"
                                "/ed119ae4-b13d-4473-9afe-a8c36e07870b/download/210413_rrc_outline_block_al2.kmz",
                    'title': "210413_RRC_Outline_Block_AL2.kmz",
                    'description': "This kmz file (Google Earth) contains the camp-block boundary (admin level-2 or "
                                   "camp sub-division) of Rohingya refugees in Cox's Bazar, Bangladesh. Updated: "
                                   "April 18, 2021",
                    'dctype': "map",
                    'dcformat': "application/zip"
                },
                {
                    'filename': "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource"
                                "/0d2d87ae-52a5-4dca-b435-dcd9c617b417/download/210118_rrc_outline_subblock_al3.zip",
                    'title': "210118_RRC_Outline_SubBlock_AL3.zip",
                    'description': "This zipped shape file (GIS) contains the camp-sub-block (Admin level-3) of Camp "
                                   "1E-1W, Camp 2E-2W, Camp 8E-8W, Camp 4 Extension, Camp 3-7, Camp 9-20, "
                                   "and Camp 21-27 in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
                    'dctype': "map",
                    'dcformat': "application/zip"
                },
                {
                    'filename': "https://data.humdata.org/dataset/1a67eb3b-57d8-4062-b562-049ad62a85fd/resource"
                                "/6286c4a5-d2ab-499a-b019-a7f0c327bd5f/download/210118_rrc_outline_subblock_al3.kmz",
                    'title': "210118_RRC_Outline_SubBlock_AL3.kmz",
                    'description': "This kmz file (Google Earth) contains the camp-sub-block (Admin level-3) of Camp "
                                   "1E-1W, Camp 2E-2W, Camp 8E-8W, Camp 4 Extension, Camp 3-7, Camp 9-20, "
                                   "and Camp 21-27 in Cox's Bazar, Bangladesh. Updated: April 18, 2021",
                    'dctype': "map",
                    'dcformat': "application/zip"
                }
            ]
        },
    },
    'dataQualityInfo': [
        {
            'scope': "dataset",
            'lineage': {
                'processStep': [
                    {
                        'description': "The camps are continuously expanding, and Camp Boundaries are structured around "
                                       "the GoB, RRRC official governance structure of the camps, taking into account "
                                       "the potential new land allocation. The database is kept as accurate as possible, "
                                       "given these challenges."
                    }
                ]
            }
        }],
    'metadataMaintenance': {
        'maintenanceAndUpdateFrequency': "asNeeded"
    }
}

# Publish metadata in catalog
nada.create_geospatial_dataset(
    dataset_id=geo_id,
    repository_id="central",
    published=1,
    overwrite="yes",
    description=description,
    metadata_information=metadata_information
)
nada.upload_thumbnail(dataset_id=geo_id, file_path=thumb_file)

# Add a link to Google Earth as an external resource
nada.add_resource(
    dataset_id=geo_id,
    dctype="web",
    title="Google Earth aerial image",
    description="Link to Google Earth aerial image of the Kutupalong Refugee Camp",
    file_path="https://earth.google.com/web/search/rohingya+cox+camp/@21.2127084,92.1634829,15.88307203a,"
             "976.95413757d,35y,0h,45t,"
             "0r/data=CnwaUhJMCiUweDMwYWRlNzZkNTlkMGM1NGY6MHg0ZjllZDY5MWExMzg5YTlmGU6D_TJzNjVAIRDM0eN3CldAKhFyb2hpbmd5YSBjb3ggY2FtcBgCIAEiJgokCT3JGaHIwztAEZgmrtRF0irAGZzEE0DJu1RAIcpYcp98KzzAKAI",
)
```
</code-block>
</code-group>
    
### Displaying a slide show of previews
	
@@@	
![](~@imageBase/images/geospatial_slide_show.png)

## Adding an indicator / time series
	
![](~@imageBase/images/data_tabs_timeseries.png)
	
**Indicators** are summary (or "aggregated") measures related to key issues or phenomena, derived from a series of observed facts. Indicators form **time series** when provided with a temporal ordering, i.e. when their values are provided with an annual, quarterly, monthly, daily, or other time reference. In the context of this Guide, we consider as time series all indicators provided with an associated time, whether this time represents a regular, continuous series or not. For example, the indicators provided by the Demographic and Health Surveys (DHS) [StatCompiler](https://www.statcompiler.com/en/), which are only available for the years when DHS are conducted in countries (which for some countries can be a single year), would be considered as "time series".

Time series are often contained in multi-indicators databases, like the World Bank's [World Development Indicators - WDI](https://datatopics.worldbank.org/world-development-indicators/), whose on-line version contains 1,430 indicators (as of 2021). To document not only the series but also the databases they belong to, we propose two metadata schemas: one to document series/indicators, and one to document databases. In the NADA application, a series can be documented and published without an associated database, but information on a database will only be published when associated with a series. The information on a database is thus treated as an "attachment" to the information on a series. 

In a NADA catalog, a **SERIES DESCRIPTION** tab will display all metadata related to the series. The (optional) **SOURCE DATABASE** tab will display the metadata related to the database, is any. The database information is displayed for information; it is not indexed by the NADA catalog.

:::tip Metadata schemas 

For documenting indicators/time series and their databases, NADA makes use of two metadata schemas developed by the World Bank Development Data Group: one for documenting the time series/indicators, the other one to document the database (if any) they belong to.
	
The documentation of the time series metadata schema is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#operation/createTimeSeries. The documentation of the database metadata schema is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#operation/createTimeseriesDB. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
:::	

![](~@imageBase/images/series_database_tabs.png)	
	
### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

![](~@imageBase/images/image110.png)

![](~@imageBase/images/image111.png)

### Loading metadata (API) 
    
This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
    
Use Case 007
    
<code-group>
<code-block title="R">

```r
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 007
#
# Use case description: document time series (extracted with their metadata from
# the World Bank World Development Indicators Database - WDI), and document the
# database (WDI), then publish the series metadata and the corresponding data 
# in a NADA catalog with a chart.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Timeseries
#
# Script tested with NADA version: 5.0
# Date: 2021-09-15
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

library(nadar)
library(jsonlite)
library(curl)
library(httr)
library(rlist)
library(dplyr)
library(tidyr)
library(readxl)
library(stringr)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 
set_api_verbose(FALSE)

setwd("C:/Users/wb147665/OneDrive - WBG/_OD/NADA_HOW_TO/demo_files/UC007")   

# ------------------------------------------------------------------------------
# Widgets to be used for visualizations and data preview
# ------------------------------------------------------------------------------ 

# Bar/line chart (eCharts)

widgets_delete("chart_line-bar")
widget_created <- FALSE
if(widget_created == FALSE) {
  widgets_create(
    uuid = "chart_line-bar",
    options = list(
      title = "Series chart",
      thumbnail = "thumbnail.jpg",
      description = "Series chart"
    ),
    zip_file = "WDI_chart_individual_series.zip"
  )
  widget_created = TRUE
}

# Choropleth world map(eCharts)

widgets_delete("map_world")
widget_created <- FALSE
if(widget_created == FALSE) {
  widgets_create(
    uuid = "map_world",
    options = list(
      title = "Map",
      thumbnail = "thumbnail.jpg",
      description = "Choropleth map"
    ),
    zip_file = "WDI_map_individual_series.zip"
  )
  widget_created = TRUE
}

# Race chart (eCharts)

widgets_delete("race_chart")
widget_created <- FALSE
if(widget_created == FALSE) {
  widgets_create(
    uuid = "race_chart",
    options = list(
      title = "Race chart",
      description = "Race chart"
    ),
    zip_file = "WDI_bar_race_chart.zip"
  )
  widget_created = TRUE
}

# Data preview (Tabulator)

widgets_delete("data_preview_tabulator")
widget_created <- FALSE
if(widget_created == FALSE) {
  widgets_create(
    uuid = "data_preview_tabulator",
    options = list(
      title = "Data preview",
      thumbnail = "grid.jpg",
      description = "Data preview"
    ),
    zip_file = "WDI_grid_individual_series.zip"
  )
  widget_created = TRUE
}

# ------------------------------------------------------------------------------

#-------------------------------------------------------------------------------
# Selection of WDI series to be published
# Note: the script extracts information for ALL time series available in the 
# WDI database (1443); but only the selected series will be published

selected_series <- list("SP.POP.TOTL", 
                        "SI.POV.DDAY", 
                        "NY.GDP.PCAP.KN", 
                        "NY.GDP.PCAP.PP.KD", 
                        "SP.DYN.IMRT.IN", 
                        "SP.POP.DPND",
                        "SM.POP.REFG",
                        "SM.POP.REFG.OR",
                        "SH.STA.STNT.ZS",
                        "IQ.SPI.OVRL")

# List of series for which we want to include a choropleth map
map_it <- c("SI.POV.DDAY", "NY.GDP.PCAP.PP.KD", "SP.DYN.IMRT.IN", "SP.POP.DPND",
            "SH.STA.STNT.ZS", "IQ.SPI.OVRL", "SM.POP.REFG.OR", "SM.POP.REFG")
#-------------------------------------------------------------------------------
  
# Information on the producer of WDI:

src_prod   <- list(name = "Development Data Group", 
                   role = "Producer", 
                   affiliation = "The World Bank Group")

# REMINDER: the Time Series schema has two main sections:
# - One section contains elements to document the time series
# - One section contains elements to document the database from which the series
#   is extracted. 
# The first section is required to publish metadata in NADA. 
# The second section is optional. It will only be displayed as an "attachment"
# to a series metadata. 

# ------------------------------------------------------------------------------
# We extract information from the World Bank Data Catalog API that we will use
# to generate metadata for the DATABASE section.
# Information on the WB data catalog API can be found at:
#   https://datahelpdesk.worldbank.org/knowledgebase/topics/125589
# ------------------------------------------------------------------------------

url = "https://api.worldbank.org/v2/datacatalog/metatypes?format=json"
WB_catalog <- GET(url)

if(http_error(WB_catalog)){
  stop("The request failed")
} else {
  info <- fromJSON(content(WB_catalog, as = "text"))  
}

# The ID of the WDI database is "1" 
src_name  <- info$datacatalog$metatype[[1]]$value[1]  # Name
src_acron <- info$datacatalog$metatype[[1]]$value[2]  # Acronym
src_descr <- info$datacatalog$metatype[[1]]$value[3]  # Description
src_url   <- info$datacatalog$metatype[[1]]$value[4]  # URL
src_type  <- info$datacatalog$metatype[[1]]$value[5]  # Type
src_lang  <- info$datacatalog$metatype[[1]]$value[6]  # Languages supported 
src_perio <- info$datacatalog$metatype[[1]]$value[7]  # Periodicity
src_ecoco <- info$datacatalog$metatype[[1]]$value[8]  # Economy coverage
src_granu <- info$datacatalog$metatype[[1]]$value[9]  # Granularity
src_nbeco <- info$datacatalog$metatype[[1]]$value[10] # Nb of economies
src_topic <- info$datacatalog$metatype[[1]]$value[11] # Topics              
src_updfr <- info$datacatalog$metatype[[1]]$value[12] # Update frequency
src_updsc <- info$datacatalog$metatype[[1]]$value[13] # Update schedule
src_lastr <- info$datacatalog$metatype[[1]]$value[14] # Last revision
src_conta <- info$datacatalog$metatype[[1]]$value[15] # Contact
src_acopt <- info$datacatalog$metatype[[1]]$value[16] # Access options
src_bulkd <- info$datacatalog$metatype[[1]]$value[17] # Bulk download (not used)
src_cite  <- info$datacatalog$metatype[[1]]$value[18] # Cite
src_pageu <- info$datacatalog$metatype[[1]]$value[19] # Detail page url
src_popul <- info$datacatalog$metatype[[1]]$value[20] # Popularity (not used)
src_yrcov <- info$datacatalog$metatype[[1]]$value[21] # Coverage (years)
src_api   <- info$datacatalog$metatype[[1]]$value[22] # API (not used)
src_apiur <- info$datacatalog$metatype[[1]]$value[23] # API access url 
src_apiid <- info$datacatalog$metatype[[1]]$value[24] # API source ID (not used)

# We split the information extracted on language 
# (make it a list with codes and names as required by our metadata schema)

lang <- as.list(strsplit(src_lang, ', ')[[1]])
list_lang <- list()
for (i in 1:length(lang)){
  if (lang[[i]] == "English") cc = "en"
  if (lang[[i]] == "French")  cc = "fr"
  if (lang[[i]] == "Spanish") cc = "sp"
  if (lang[[i]] == "Russian") cc = "ru"
  if (lang[[i]] == "Arabic")  cc = "ar"
  if (lang[[i]] == "Chinese") cc = "cn"
  list_lang[[i]] <- list(name = lang[[i]], code = cc)   
}

# We split the information extracted on topics 
# (make it a list with codes and names as required by our metadata schema)

list_topics <-list()
top <- strsplit(src_topic, ",")
for(t in top[[1]]) {
  t <- str_trim(t, side = c("both")) # Trim whitespaces
  list_topics <- list.append(list_topics, list(id = "", name=t)) 
}

# ------------------------------------------------------------------------------
# We extract some additional information from WDI API (last update, and year)
# ------------------------------------------------------------------------------

url = "http://api.worldbank.org/v2/source/2?format=json"
WB_sources <- GET(url)

if(http_error(WB_sources)){
  stop("The request failed")
} else {
  sources <- fromJSON(content(WB_sources, as = "text"))[[2]]  
}

# Core metadata
src_update  <- sources$lastupdated
src_year    <- substr(sources$lastupdated, start=1, stop = 4)
src_id      <- paste0("WLD_", src_year, "_", src_acron, "_v01_M")
src_version <- list(
  list(version = src_update,
       date = src_update, 
       responsibility = "World Bank, Development Data Group")
)

# ------------------------------------------------------------------------------
# We extracting information on the time series from CSV files available on-line 
# (bulk import). For each series, we identify the countries and years with data.
# We also derive the list of countries and year range for the whole database.
# ------------------------------------------------------------------------------

# Download and unzip WDI CSV files if not previously done
if(!file.exists("WDI_csv.zip")) {
  download.file("http://databank.worldbank.org/data/download/WDI_csv.zip", 
                "WDI_csv.zip")
}
# Unzip the file, and read some of the CSV files it contains
unzip(zipfile = "WDI_csv.zip", exdir = getwd())
wdi_ser <- read.csv("WDISeries.csv", header = T, sep = ",", encoding="UTF-8")
wdi_dat <- read.csv("WDIData.csv", header = T, sep = ",", encoding="UTF-8")
wdi_cty <- read.csv("WDICountry.csv", header = T, sep = ",", encoding="UTF-8")

# Convert factors to characters in data frames
wdi_ser <- rapply(wdi_ser, as.character, classes = "factor", how = "replace")
wdi_dat <- rapply(wdi_dat, as.character, classes = "factor", how = "replace")
wdi_cty <- rapply(wdi_cty, as.character, classes = "factor", how = "replace")

# Check that the number of series in WDIData corresponds to the number of series
# for which metadata are provided in WDISeries
stopifnot(identical(length(unique(wdi_dat$Indicator.Code)), 
                    length(unique(wdi_ser$X.U.FEFF.Series.Code)))) 

# Comma-separated list of countries in database
ctries <- wdi_cty %>% 
          select(Short.Name, X.U.FEFF.Country.Code) %>% 
          spread(X.U.FEFF.Country.Code, Short.Name)
ctries_l <- list()
for(c in 1:length(ctries)) {
  ctries_l[[c]] <- list(name = as.character(ctries[c]), 
                        code = names(ctries)[c])
}

# Reshape the data file to identify the range of years with data, by series
wdi_dat2 <- gather(wdi_dat, 
                   year, 
                   value, 
                   -X.U.FEFF.Country.Name, 
                   -Country.Code, 
                   -Indicator.Name, 
                   -Indicator.Code)
wdi_dat2$X <- NULL
wdi_dat2 <- wdi_dat2 %>% drop_na(value)
wdi_dat2$year <- as.numeric(substr(wdi_dat2$year, start = 2, stop = 5))

ser_yrs <- wdi_dat2 %>%
  group_by(Indicator.Code) %>% 
  summarise(min_year = min(year, na.rm = TRUE),
            max_year = max(year, na.rm = TRUE))

wdi_ser <- wdi_ser %>% 
           left_join(ser_yrs, by = c("X.U.FEFF.Series.Code" = "Indicator.Code"))
wdi_ser$X <- NULL

src_start <- min(wdi_ser$min_year, na.rm = TRUE)
src_end   <- max(wdi_ser$max_year, na.rm = TRUE)

# Reshape the data file to identify the list of countries with data, by series

wdi_dat3 <- wdi_dat2 %>% 
            filter(Indicator.Code %in% selected_series) %>% 
            drop_na(value) %>% 
            arrange(Indicator.Code) %>% 
            group_by(Indicator.Code, Country.Code) %>% 
            summarize(mv = 1) %>% 
            group_by(Indicator.Code) %>% 
            mutate(ctry = 1:n()) %>% 
            spread(ctry, Country.Code) %>% 
            mutate_if(is.factor, as.character) 

wdi_dat3[is.na(wdi_dat3)] <- ""
wdi_dat3 <- as.data.frame(wdi_dat3)

wdi_dat3$countries <- apply(wdi_dat3[ ,3:267], 1, paste, collapse = ' ')
wdi_dat3 <- wdi_dat3 %>% select(Indicator.Code, countries)

wdi_ser <- wdi_ser %>% 
           filter(X.U.FEFF.Series.Code %in% selected_series) %>%
           left_join(wdi_dat3, by = c("X.U.FEFF.Series.Code" = "Indicator.Code"))

# Generate API links for each series, in XML and Jason formats 

wdi_ser$url_data_J <- paste0(
  "https://api.worldbank.org/v2/countries/all/indicators/", 
  wdi_ser$X.U.FEFF.Series.Code, "?date=", wdi_ser$min_year, ":", wdi_ser$max_year, 
  "&format=json") 

wdi_ser$url_data_X <- paste0(
  "https://api.worldbank.org/v2/countries/all/indicators/", 
  wdi_ser$X.U.FEFF.Series.Code, "?date=", wdi_ser$min_year, ":", wdi_ser$max_year) 

wdi_ser$url_meta_J <- paste0(
  "https://api.worldbank.org/v2/sources/2/series/",  
  tolower(wdi_ser$X.U.FEFF.Series.Code), "/metadata?format=json")

wdi_ser$url_meta_X <- paste0(
  "https://api.worldbank.org/v2/sources/2/series/", 
  tolower(wdi_ser$X.U.FEFF.Series.Code), "/metadata")

# Add the URL license (series ar CC BY-4.0)

wdi_ser$License.Url <- ""
wdi_ser$License.Url[wdi_ser$License.Type=="CC BY-4.0"] <- 
  "https://creativecommons.org/licenses/by/4.0/"

# ------------------------------------------------------------------------------
# GENERATE THE DATABASE-LEVEL METADATA FOR NADA
# ------------------------------------------------------------------------------

wdi_db <- list(
  
  database_description = list(    
    
    title_statement = list(
      idno = src_id,
      title = src_name,
      alternate_title = src_acron
    ),
    authoring_entity = list(src_prod),
    abstract = src_descr,
    url = src_url,
    type = "Time series database",
    date_created = src_update,
    date_published = src_update,
    version = src_version,
    update_frequency = src_updfr,
    update_schedule = list(list(update = src_updsc)),
    time_coverage = list(list(start = toString(src_start), 
                              end = toString(src_end))),
    periodicity = list(list(period = src_perio)),
    topics = list_topics,
    geographic_units = ctries_l,
    geographic_granularity = "global, national, regional",                           
    geographic_area_count = toString(length(ctries_l)),           
    languages = list_lang,
    contacts = list(list(name="Data Help Desk", 
                         affiliation="World Bank",
                         uri="https://datahelpdesk.worldbank.org/",
                         email="data@worldbank.org")),    
    access_options = list(
      list(type="API",   
           uri="https://datahelpdesk.worldbank.org/knowledgebase/articles/889386"),
      list(type="Bulk",  
           uri="https://data.worldbank.org/data-catalog/world-development-indicators"),
      list(type="Query", 
           uri="http://databank.worldbank.org/data/source/world-development-indicators"),
      list(type="PDF",   
           uri="https://openknowledge.worldbank.org/bitstream/handle/10986/26447/WDI-2017-web.pdf")),    
    license = list(list(type="CC BY-4.0", uri="https://creativecommons.org/licenses/by/4.0/")),
    citation = src_cite
  )    
)

timeseries_database_add(idno = src_id, 
                        published = 1, 
                        overwrite = "yes", 
                        metadata = wdi_db)

# --------------------------------------------------------------------------------------
# GENERATE SERIES-LEVEL METADATA AND PUBLISH IN NADA
# --------------------------------------------------------------------------------------

this_series <- list()

for (row in 1:nrow(wdi_ser)){
  
  # Skip series that are not selected
  if (wdi_ser$X.U.FEFF.Series.Code[row] %in% selected_series == FALSE) {
    next
  }

  # Get list of countries as list of country codes with no empty element
  x <- strsplit(wdi_ser$countries[row], " ")[[1]]
  x <- x[x != ""]
  geo_u <- list()
  for (i in 1: length(x)) {
    cname = get(x[i], ctries)
    geo_u[[i]] = list(name=cname, code=x[i], type="")
  }
  
  # Split information on topics (make it a list of lists)
  list_topics_series <-list()
  top <- strsplit(wdi_ser$Topic[row], ",")
  for(t in top[[1]]) {
    list_topics_series <- list.append(
      list_topics_series, 
      list(id = "", name = t)) 
  }
  
  # We add selected keywords where relevant  
  keyw = list()
  if(grepl("global financial inclusion database", tolower(wdi_ser$Source[row]))) { 
    keyw <- list.append(keyw, list(name = "findex"))
  }  
  if(grepl("povcalnet", tolower(wdi_ser$Source[row]))) {
    keyw <- list.append(keyw, list(name = "povcal"))
  }
  
  # Generate series metadata for NADA
  this_series <- list(
    
    series_description = list(
      
      idno                   = wdi_ser$X.U.FEFF.Series.Code[row],
      name                   = wdi_ser$Indicator.Name[row],
      database_id            = wdi_db$database_description$title_statement$idno,
      measurement_unit       = wdi_ser$Unit.of.measure[row],
      periodicity            = wdi_ser$Periodicity[row],
      base_period            = wdi_ser$Base.Period[row],
      definition_short       = wdi_ser$Short.definition[row],
      definition_long        = wdi_ser$Long.definition[row],
      methodology            = wdi_ser$Statistical.concept.and.methodology[row],
      limitation             = wdi_ser$Limitations.and.exceptions[row],
      topics                 = list_topics_series,
      relevance              = wdi_ser$Development.relevance[row],
      time_periods           = list(list(start = as.character(wdi_ser$min_year[row]), 
                                         end = as.character(wdi_ser$max_year[row]))),
      geographic_units       = geo_u,
      aggregation_method     = wdi_ser$Aggregation.method[row],
      license                = list(type = wdi_ser$License.Type[row], 
                                    uri = wdi_ser$License.Url[row]),
      links                  = list(list(type = "API", 
                                         description = "Data in JSON",     
                                         uri = wdi_ser$url_data_J[row]),
                                    list(type = "API", 
                                         description = "Data in XML",     
                                         uri = wdi_ser$url_data_X[row]),
                                    list(type = "API", 
                                         description = "Metadata in JSON", 
                                         uri = wdi_ser$url_meta_J[row]),
                                    list(type = "API", 
                                         description = "Metadata in XML" , 
                                         uri = wdi_ser$url_meta_X[row])
                               ),
      api_documentation      = list(description = "See the Developer Information webpage for detailed documentation of the API", 
                                    uri = "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information"),
      source                 = wdi_ser$Source[row],
      source_note            = wdi_ser$Note[row],
      keywords               = keyw,
      notes                  = list(list(note = wdi_ser$Other.notes[row]))
      
    ) 
    
  )  
  
  # We want to apply thumbnails specific to each series
  
  thumb = "thumb_wdi.jpg"  #Default thumbnail file   
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "SP.POP.TOTL") thumb = "thumb_pop.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "SI.POV.DDAY") thumb = "thumb_pov.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "NY.GDP.PCAP.KN") thumb = "thumb_eco.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "NY.GDP.PCAP.PP.KD") thumb = "thumb_eco.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "SP.DYN.IMRT.IN") thumb = "thumb_hea.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "SP.POP.DPND") thumb = "thumb_dep.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "SM.POP.REFG") thumb = "thumb_refugee.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "SM.POP.REFG.OR") thumb = "thumb_refugee.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "SH.STA.STNT.ZS") thumb = "thumb_stunt.jpg"
  if(wdi_ser$X.U.FEFF.Series.Code[row] == "IQ.SPI.OVRL") thumb = "thumb_spi.jpg"

  # Publish the metadata in NADA
  
  timeseries_add(
    idno = this_series$series_description$idno, 
    repositoryid = "central", 
    published = 1, 
    overwrite = "yes", 
    metadata = this_series, 
    thumbnail = thumb
  )
```
</code-block>
    
<code-block title="Python">

```python
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 007
#
# Use case description: document time series (extracted with their metadata from
# the World Bank World Development Indicators Database - WDI), and document the
# database (WDI), then publish the series metadata and the corresponding data
# in a NADA catalog with a chart.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Timeseries
#
# Script tested with NADA version: 5.0
# Date: 2021-09-15
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================
import json
import os
import sys
import numpy as np
import pynada as nada
import pandas as pd
import urllib.request
from zipfile import ZipFile

my_keys = pd.read_csv("../confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is in cell A5
nada.set_api_url('https://nada-demo.ihsn.org/index.php/api/')

os.chdir("demo_nada_files/UC007")

# # -------------------------------------------------------------------------------
# # Selection of WDI series to be published
# # Note: the script extracts information for ALL time series available in the
# # WDI database (1443); but only the selected series will be published

selected_series = ["SP.POP.TOTL",
                   "SI.POV.DDAY",
                   "NY.GDP.PCAP.KN",
                   "NY.GDP.PCAP.PP.KD",
                   "SP.DYN.IMRT.IN",
                   "SP.POP.DPND"]

# List of series for which we want to include a choropleth map
map_it = ["SI.POV.DDAY", "NY.GDP.PCAP.PP.KD", "SP.DYN.IMRT.IN", "SP.POP.DPND"]
# # -------------------------------------------------------------------------------

# Information on the producer of WDI:

src_prod = [{"name": "Development Data Group",
             "role": "Producer",
             "affiliation": "The World Bank Group"}]

# REMINDER: the Time Series schema has two main sections:
# - One section contains elements to document the time series
# - One section contains elements to document the database from which the series
#   is extracted.
# The first section is required to publish metadata in NADA.
# The second section is optional. It will only be displayed as an "attachment"
# to a series metadata.

# ------------------------------------------------------------------------------
# We extract information from the World Bank Data Catalog API that we will use
# to generate metadata for the DATABASE section.
# Information on the WB data catalog API can be found at:
#   https://datahelpdesk.worldbank.org/knowledgebase/topics/125589
# ------------------------------------------------------------------------------

url = "https://api.worldbank.org/v2/datacatalog/metatypes?format=json"

try:
    WB_catalog = urllib.request.urlopen(url)
except Exception as e:
    print(f"The request failed - {e}")
    exit()
info = json.loads(WB_catalog.read())

# The id of the WDI database is "0"
src_name = info['datacatalog'][0]['metatype'][0]['value']  # Name
src_acron = info['datacatalog'][0]['metatype'][1]['value']  # Acronym
src_descr = info['datacatalog'][0]['metatype'][2]['value']  # Description
src_url = info['datacatalog'][0]['metatype'][3]['value']  # URL
src_type = info['datacatalog'][0]['metatype'][4]['value']  # Type
src_lang = info['datacatalog'][0]['metatype'][5]['value']  # Languages supported
src_period = info['datacatalog'][0]['metatype'][6]['value']  # Periodicity
src_ecoco = info['datacatalog'][0]['metatype'][7]['value']  # Economy coverage
src_granu = info['datacatalog'][0]['metatype'][8]['value']  # Granularity
src_nbeco = info['datacatalog'][0]['metatype'][9]['value']  # Nb of economies
src_topic = info['datacatalog'][0]['metatype'][10]['value']  # Topics
src_updfr = info['datacatalog'][0]['metatype'][11]['value']  # Update frequency
src_updsc = info['datacatalog'][0]['metatype'][12]['value']  # Update schedule
src_lastr = info['datacatalog'][0]['metatype'][13]['value']  # Last revision
src_conta = info['datacatalog'][0]['metatype'][14]['value']  # Contact
src_acopt = info['datacatalog'][0]['metatype'][15]['value']  # Access options
src_bulkd = info['datacatalog'][0]['metatype'][16]['value']  # Bulk download (not used)
src_cite = info['datacatalog'][0]['metatype'][17]['value']  # Cite
src_pageu = info['datacatalog'][0]['metatype'][18]['value']  # Detail page url
src_popul = info['datacatalog'][0]['metatype'][19]['value']  # Popularity (not used)
src_yrcov = info['datacatalog'][0]['metatype'][20]['value']  # Coverage (years)
src_api = info['datacatalog'][0]['metatype'][21]['value']  # API (not used)
src_apiur = info['datacatalog'][0]['metatype'][22]['value']  # API access url
src_apiid = info['datacatalog'][0]['metatype'][23]['value']  # API source ID (not used)

# We split the information extracted on language
# (make it a list of dictionaries with codes and names as required by our metadata schema)

lang = src_lang.split(",")
list_lang = []
for l in lang:
    ldict = {"name": (l.strip()), "code": ""}
    list_lang.append(ldict)

for i in list_lang:
    if i['name'] == "English": i['code'] = "en"
    if i['name'] == "French": i['code'] = "fr"
    if i['name'] == "Spanish": i['code'] = "sp"
    if i['name'] == "Russian": i['code'] = "ru"
    if i['name'] == "Arabic": i['code'] = "ar"
    if i['name'] == "Chinese": i['code'] = "cn"

# We split the information extracted on topics
# (make it a list of dictionaries with codes and names as required by our metadata schema)

list_topics = []
top = src_topic.split(",")
for t in top:
    tdict = {"id": "", "name": (t.strip())}
    list_topics.append(tdict)

# ------------------------------------------------------------------------------
# We extract some additional information from WDI API (last update, and year)
# ------------------------------------------------------------------------------

url = "http://api.worldbank.org/v2/source/2?format=json"

try:
    WB_sources = urllib.request.urlopen(url)
except Exception as e:
    print("The request failed")
    exit()

sources = json.loads(WB_sources.read())[1][0]

# Core metadata
src_update = sources['lastupdated']
src_year = sources['lastupdated'][0:4]
src_id = "WLD_" + src_year + "_" + src_acron + "_v01_M"
src_version = [{"version": src_update,
                "date": src_update,
                "responsibility": "World Bank, Development Data Group"}]

# ------------------------------------------------------------------------------
# We extracting information on the time series from CSV files available on-line
# (bulk import). For each series, we identify the countries and years with data.
# We also derive the list of countries and year range for the whole database.
# ------------------------------------------------------------------------------

# Download and unzip WDI CSV files if not previously done
if not os.path.exists("WDI_csv.zip"):
    nada.download_file("http://databank.worldbank.org/data/download/WDI_csv.zip", "WDI_csv.zip")

# Unzip the file, and read some of the CSV files it contains
with ZipFile("WDI_csv.zip", 'r') as z:
    z.extractall(os.getcwd())

wdi_ser = pd.read_csv("WDISeries.csv", header='infer', sep=",", encoding="utf-8")
wdi_ser = wdi_ser.loc[:, ~wdi_ser.columns.str.match('Unnamed')]  # drop sys generated unnamed column full of nan

wdi_dat = pd.read_csv("WDIData.csv", header='infer', sep=",", encoding="utf-8")
wdi_dat = wdi_dat.loc[:, ~wdi_dat.columns.str.match('Unnamed')]  # drop sys generated unnamed column full of nan

wdi_cty = pd.read_csv("WDICountry.csv", header='infer', sep=",", encoding="utf-8")
wdi_cty = wdi_cty.loc[:, ~wdi_cty.columns.str.match('Unnamed')]  # drop sys generated unnamed column full of nan


# Convert factors to characters in data frames
def cat_tostring(var):
    return var.astype(str) if type(var) == "category" else var


dfs = ['wdi_ser', 'wdi_dat', 'wdi_cty']
for d in dfs:
    df = eval(d)
    df.applymap(lambda x: cat_tostring(x))

# Check that the number of series in WDIData corresponds to the number of series
# for which metadata are provided in WDISeries
try:
    assert (len(pd.unique(wdi_dat['Indicator Code'])) == len(pd.unique(wdi_ser['Series Code'])))
except AssertionError:
    sys.exit("Number of series in WDIData series does not correspond to number of series in WDISeries")

# Comma-separated list of countries in database
ctries_l = []
ctries = wdi_cty[['Short Name', 'Country Code']].values.tolist()
for c in range(len(ctries)):
    cd = {"name": ctries[c][0], "code": ctries[c][1]}
    ctries_l.append(cd)

wdi_dat2 = wdi_dat.melt(id_vars=['Country Name', 'Country Code', 'Indicator Name', 'Indicator Code'], var_name="year",
                        value_name="value")
wdi_dat2['year'] = wdi_dat2['year'].astype(int)

# Reshape the data file to identify the range of years with data, by series
wdi_dat2 = wdi_dat2[wdi_dat2.value.notnull()]
ser_yrs = wdi_dat2.groupby('Indicator Code').agg(min_year=('year', 'min'), max_year=('year', 'max'))
wdi_ser = pd.merge(wdi_ser, ser_yrs, left_on=["Series Code"], right_on=["Indicator Code"], how='left')
src_start = int((wdi_ser['min_year'].min(skipna=True)))
src_end = int(wdi_ser['max_year'].max(skipna=True))

# Reshape the data file to identify the list of countries with data, by series
wdi_dat3 = wdi_dat2[wdi_dat2['Indicator Code'].isin(selected_series)]
wdi_dat3 = wdi_dat3[wdi_dat3['value'].notnull()]
wdi_dat3 = wdi_dat3.sort_values(by=['Indicator Code']).groupby(['Indicator Code', 'Country Code']).count().reset_index()
wdi_dat3 = wdi_dat3[['Indicator Code', 'Country Code']]
wdi_dat3['ctry'] = wdi_dat3.groupby('Indicator Code').cumcount() + 1
wdi_dat3 = wdi_dat3.pivot(index=["Indicator Code"], columns=["ctry"], values=["Country Code"])
wdi_dat3 = wdi_dat3.applymap(lambda col: cat_tostring(col))

wdi_dat3['countries'] = wdi_dat3[wdi_dat3.columns[0:]].apply(
    lambda ctry: ' '.join(ctry.dropna().astype(str)),
    axis=1
)

wdi_dat3 = wdi_dat3['countries'].reset_index()

wdi_ser = wdi_ser[wdi_ser['Series Code'].isin(selected_series)]
wdi_ser = pd.merge(wdi_ser, wdi_dat3, left_on=["Series Code"], right_on=["Indicator Code"], how='left')
assert (wdi_ser['Indicator Code'].equals(wdi_ser['Series Code'])) # series code and indicator code exist in merged df
wdi_ser = wdi_ser.drop(columns=['Indicator Code'])
wdi_ser['min_year'] = wdi_ser['min_year'].astype(int)
wdi_ser['max_year'] = wdi_ser['max_year'].astype(int)
wdi_ser = wdi_ser.fillna("")

# Generate API links for each series, in XML and Jason formats
wdi_ser['url_data_J'] = "https://api.worldbank.org/v2/countries/all/indicators/" \
                        + wdi_ser['Series Code'] + "?date=" + (wdi_ser['min_year'].astype(str)) + ":" \
                        + (wdi_ser['max_year'].astype(str)) + "&format=json"

wdi_ser['url_data_X'] = "https://api.worldbank.org/v2/countries/all/indicators/" \
                        + wdi_ser['Series Code'] + "?date=" + (wdi_ser['min_year'].astype(str)) + ":" \
                        + (wdi_ser['max_year'].astype(str))

wdi_ser['url_meta_J'] = "https://api.worldbank.org/v2/sources/2/series/" \
                        + (wdi_ser['Series Code']).str.lower() + "/metadata?format=json"

wdi_ser['url_meta_X'] = "https://api.worldbank.org/v2/sources/2/series/" \
                        + (wdi_ser['Series Code']).str.lower() + "/metadata"

# Add the URL license (series ar CC BY-4.0)
wdi_ser['License Url'] = np.where(wdi_ser['License Type'] == "CC BY-4.0",
                                  "https://creativecommons.org/licenses/by/4.0/", "")

# ------------------------------------------------------------------------------
# GENERATE THE DATABASE-LEVEL METADATA FOR NADA
# ------------------------------------------------------------------------------
database_description = {
    'title_statement': {
        'idno': src_id,
        'title': src_name,
        'alternate_title': src_acron
    },
    'authoring_entity': src_prod,
    'abstract': src_descr,
    'url': src_url,
    'type': "Time series database",
    'date_created': src_update,
    'date_published': src_update,
    'version': src_version,
    'update_frequency': src_updfr,
    'update_schedule': [{'update': src_updsc}],
    'time_coverage': [{'start': str(src_start),
                       'end': str(src_end)}],
    'periodicity': [{'period': src_period}],
    'topics': list_topics,
    'geographic_units': ctries_l,
    'geographic_granularity': "global, national, regional",
    'geographic_area_count': str(len(ctries_l)),
    'languages': list_lang,
    'contacts': [{'name': "Data Help Desk",
                  'affiliation': "World Bank",
                  'uri': "https://datahelpdesk.worldbank.org/",
                  'email': "data@worldbank.org"}],
    'access_options': [
        {'type': "API", 'uri': "https://datahelpdesk.worldbank.org/knowledgebase/articles/889386"},
        {'type': "Bulk", 'uri': "https://data.worldbank.org/data-catalog/world-development-indicators"},
        {'type': "Query", 'uri': "http://databank.worldbank.org/data/source/world-development-indicators"},
        {'type': "PDF",
         'uri': "https://openknowledge.worldbank.org/bitstream/handle/10986/26447/WDI-2017-web.pdf"}],
    'license': [{'type': "CC BY-4.0", 'uri': "https://creativecommons.org/licenses/by/4.0/"}],
    'citation': src_cite
}

nada.create_timeseries_database(published=1,
                                overwrite="yes",
                                database_description=database_description)

# --------------------------------------------------------------------------------------
# GENERATE SERIES-LEVEL METADATA AND PUBLISH IN NADA
# --------------------------------------------------------------------------------------

for index, row in wdi_ser.iterrows():
    if row['Series Code'] not in selected_series:
        continue
    # Get list of countries as list of country codes with no empty element
    x = row["countries"].split(" ")
    if '' in x: x.remove('')

    geo_u = []
    for c in x:
        for n in ctries:
            if c in n:
                geo_u.append({"name": n[0], "code": c, "type": ""})

    # Split information on topics (make it a list of dictionaries)
    list_topics_series = []
    top = row["Topic"].split(",")
    for t in top:
        list_topics_series.append({"id": "", "name": t})

    # We add selected keywords where relevant
    keyw = []
    if "global financial inclusion database" in row['Source'].lower():
        keyw.append({"name": "findex"})
    if "povcalnet" in row['Source'].lower():
        keyw.append({"name": "povcal"})

    # Generate series metadata for NADA
    series_description = {
        "idno": row['Series Code'],
        "name": row['Indicator Name'],
        "database_id": database_description['title_statement']['idno'],
        "measurement_unit": row['Unit of measure'],
        "periodicity": row['Periodicity'],
        "base_period": row['Base Period'],
        "definition_short": row['Short definition'],
        "definition_long": row['Long definition'],
        "methodology": row['Statistical concept and methodology'],
        "limitation": row['Limitations and exceptions'],
        "topics": list_topics_series,
        "relevance": row['Development relevance'],
        "time_periods": [{"start": str(row['min_year']),"end": str(row['max_year'])}],
        "geographic_units": geo_u,
        "aggregation_method": row['Aggregation method'],
        "license": {"type": row['License Type'], "uri": row['License Url']},
        "links": [{"type": "API", "description": "Data in JSON", "uri": row['url_data_J']},
                  {"type": "API", "description": "Data in XML", "uri": row['url_data_X']},
                  {"type": "API", "description": "Metadata in JSON", "uri": row['url_meta_J']},
                  {"type": "API", "description": "Metadata in XML", "uri": row['url_meta_X']}],

        "api_documentation": {"description": "See the Developer Information webpage for detailed documentation of the "
                                             "API",
                              "uri": "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer"
                                     "-information"},
        "source": row['Source'],
        "source_note": row['Notes from original source'],
        "keywords": keyw,
        "notes": [{"note": row['Other notes']}]
    }
    # print(series_description)
    # We want to apply thumbnails specific to each series

    thumb = "thumb_wdi.jpg"  # Default thumbnail file
    if row['Series Code'] == "SP.POP.TOTL": thumb = "thumb_pop.jpg"
    if row['Series Code'] == "SI.POV.DDAY": thumb = "thumb_pov.jpg"
    if row['Series Code'] == "NY.GDP.PCAP.KN": thumb = "thumb_eco.jpg"
    if row['Series Code'] == "NY.GDP.PCAP.PP.KD": thumb = "thumb_eco.jpg"
    if row['Series Code'] == "SP.DYN.IMRT.IN": thumb = "thumb_hea.jpg"
    if row['Series Code'] == "SP.POP.DPND": thumb = "thumb_dep.jpg"

    # Publish the metadata in NADA
    nada.create_timeseries_dataset(dataset_id=series_description['idno'],
                                   repository_id="central",
                                   published=1,
                                   overwrite="yes",
                                   series_description=series_description
                                   )
    nada.upload_thumbnail(dataset_id=series_description['idno'], file_path=thumb)  
```
</code-block>
</code-group>     

### Making the data accessible via API
	
@@@@ Data can be published and made accessible via API. See section ...	

### Adding data visualizations

When data are made accessible via API (or when the dataset is small enough to be embedded in a visualization script), you may add interactive visualizations (charts, maps) in the series' metadata page. The visualizations are generated using external charting or mapping tools, so there is considerable flexibility in the type of visualizations you can embed in a NADA page. The example below provides a very simple example (line chart) developed using eCharts, an open source JavaScript library developed by Baidu and published by the Apache Foundation.   
	
![](~@imageBase/images/visualization_series.png)

Adding visualizations is done by using widgets. See section ...	
	
### Adding a data preview

When data are made accessible via API, they can also be displayed and made searchable in a data (pre)view grid. As for data visualizations, this option makes use of external tools and of the widget solution, to provide maximum flexibility to catalog administrators. Multiple open source JavaScript grid applications are availble, as well as commercial ones. The example below makes use of the ... library. For information on how to implement widgets, see section ... 
	
![](~@imageBase/images/data_preview_series.png)
		
	
## Adding a table

![](~@imageBase/images/data_tabs_table.png)
	
 

:::tip Metadata schema
	
For documenting tables, NADA makes use of a metadata schema developed by the World Bank Development Data Group.
	
The documentation of the table metadata schema is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Tables. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
:::
	
### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA. 
    
### From scratch (web interface)

You can create, document, and publish a table using the metadata editor embedded in NADA. To do so, login as administrator, then in the login sub-menu, select **Site administration**. In the **Studies** menu, select **Manage studies** / **Central Data Catalog** (or another collection), then click on **Add study**. In the **Create new study** box, select **Table**. 
    
![](~@imageBase/images/image108.png)

Click on **Metadata**. In the metadata editor form, enter all available information to describe the table, then click on the **Save** button.    
    
![](~@imageBase/images/image109.png)

What has been done so far is generating and publishing the table description in the catalog. We have not provided any link to the table, or uploaded the table file to the web server (e.g. as an XLS file, or as a PDF file). Click **Add new resource** and provide information on the type of resource (in this case a table). Click **Submit**.
@@@@@@@ provide URL or filename/path.    

![](~@imageBase/images/image35.png)

Now the table metadata and the link to the table are both provided. But the entry is still in draft mode (i.e. only visible to administrators); to make it visible to users, change its staus to "Published".   
    
### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
    
We provide here an example of R and Python scripts in which a collection of tables ("Country profiles") from the World Bank's World Development Indicators (WDI) are published and publish in a NADA catalog. These tables are published by the World Bank and made available in CSV, XLS and PDF formats. See "COUNTRY PROFILES" at http://wdi.worldbank.org/table. The table is available separately for the world and for geographic regions, country groups (income level, etc), and country. The same metadata apply to all, except for the country tables. We therefore generate the metadata once, and use a function to publish all tables in a loop. In this example, we only publish tables for world, WB operations geographic regions, and countries of South Asia. This will result in publishing 15 tables. We could provide the list of all countries to the loop to publish 200+ tables. The example shows the advantage that R or Python (and the NADA API) provide for automating data documentation and publishing tasks.
    
When documenting a table using R or Python, the table metadata must be structured using a schema described in https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Tables.

<code-group>
<code-block title="R">

```r
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 013
#
# Use case description: document a collection of tables ("Country profiles") 
# from the World Bank's World Development Indicators (WDI), and publish them in 
# a NADA catalog. The tables are published by the World Bank and made available 
# in CSV, XLS and PDF formats. See "COUNTRY PROFILES" at 
#    http://wdi.worldbank.org/table
#  
# The table is available separately for the world and for geographic regions, 
# country groups (income level, etc), and country. The same metadata apply to 
# all, except for the country tables. We therefore generate the metadata once, 
# and use a function to publish all tables in a loop. 
#
# In this example, we only publish tables for world, WB operations geographic 
# regions, and countries of South Asia. This will result in publishing 15 tables. 
# We could provide the list of all countries to the loop to publish 200+ tables.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Tables
#
# Script tested with NADA version: 5.0
# Date: 2021-09-14
# See output in http://nada-demo.ihsn.org/index.php/catalog 
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

library(nadar)
library(jsonlite)
library(httr)
library(rlist)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 
set_api_verbose(FALSE)

thumb_file <- "E:/demo_nada_files/UC013/WB_country_profiles_WLD.jpg"

src_data <- "World Bank, World Development Indicators database - WDI Central, 2021"

# The tables contain data extracted from WDI time series. We identified these 
# series ID and list them in their order of appearance in the table. 
# We then use the WDI API to retrieve information on the series (name, label, 
# definition) which we will include in the published metadata. 

tbl_series = list("SP.POP.TOTL", "SP.POP.GROW", "AG.SRF.TOTL.K2", "EN.POP.DNST",
                  "SI.POV.NAHC", "SI.POV.DDAY", "NY.GNP.ATLS.CD", "NY.GNP.PCAP.CD",
                  "NY.GNP.MKTP.PP.CD", "NY.GNP.PCAP.PP.CD", "SI.DST.FRST.20",
                  "SP.DYN.LE00.IN", "SP.DYN.TFRT.IN", "SP.ADO.TFRT", "SP.DYN.CONU.ZS",
                  "SH.STA.BRTC.ZS", "SH.DYN.MORT", "SH.STA.MALN.ZS", "SH.IMM.MEAS",
                  "SE.PRM.CMPT.ZS", "SE.PRM.ENRR", "SE.SEC.ENRR", "SE.ENR.PRSC.FM.ZS",
                  "SH.DYN.AIDS.ZS", "AG.LND.FRST.K2", "ER.PTD.TOTL.ZS", 
                  "ER.H2O.FWTL.ZS", "SP.URB.GROW", "EG.USE.PCAP.KG.OE", 
                  "EN.ATM.CO2E.PC", "EG.USE.ELEC.KH.PC", "NY.GDP.MKTP.CD", 
                  "NY.GDP.MKTP.KD.ZG", "NY.GDP.DEFL.KD.ZG", "NV.AGR.TOTL.ZS", 
                  "NV.IND.TOTL.ZS", "NE.EXP.GNFS.ZS", "NE.IMP.GNFS.ZS",
                  "NE.GDI.TOTL.ZS", "GC.REV.XGRT.GD.ZS", "GC.NLD.TOTL.GD.ZS", 
                  "FS.AST.DOMS.GD.ZS", "GC.TAX.TOTL.GD.ZS", "MS.MIL.XPND.GD.ZS",
                  "IT.CEL.SETS.P2", "IT.NET.USER.ZS", "TX.VAL.TECH.MF.ZS", 
                  "IQ.SCI.OVRL", "TG.VAL.TOTL.GD.ZS", "TT.PRI.MRCH.XD.WD", 
                  "DT.DOD.DECT.CD", "DT.TDS.DECT.EX.ZS", "SM.POP.NETM", 
                  "BX.TRF.PWKR.CD.DT", "BX.KLT.DINV.CD.WD", "DT.ODA.ODAT.CD")

rows = list()
defs = list()

for(s in tbl_series) {
  
  url = paste0("https://api.worldbank.org/v2/sources/2/series/", s, 
               "/metadata?format=JSON")
  s_meta <- GET(url)
  if(http_error(s_meta)){
    stop("The request failed")
  } else {
    s_metadata <- fromJSON(content(s_meta, as = "text"))  
    s_metadata <- s_metadata$source$concept[[1]][[2]][[1]][[2]][[1]]
  }
  
  indic_lbl = s_metadata$value[s_metadata$id=="IndicatorName"]
  indic_def = s_metadata$value[s_metadata$id=="Longdefinition"]

  this_row = list(var_name = s, dataset = src_data, label = indic_lbl)
  rows = list.append(rows, this_row)
  
  this_def = list(name = indic_lbl, definition = indic_def)
  defs = list.append(defs, this_def)
  
}

# ------------------------------------------------------------------------------
# We create a function that takes two parameters: the country (or region) 
# name, and the country (or region) code. This function will generate the 
# table metadata and publish the selected table in the NADA catalog.
# ------------------------------------------------------------------------------

publish_country_profile <- function(country_name, country_code) {
  
  # Generate the country/region-specific unique table ID and table title
  idno_tbl  <- paste0("UC013_", country_code)
  tbl_title <- paste0("World Development Indicators, Country Profile, ", 
                      country_name, " - 2021")
  citation  <- paste("World Bank,", tbl_title, 
                     ", https://datacatalog.worldbank.org/dataset/country-profiles, accessed on [date]")

  # Generate the schema-compliant metadata
  
  my_tbl <- list(
    
    metadata_information = list(    
      producers = list(list(name = "NADA team")),
      production_date = "2021-09-14",
      version = "v01"
    ),
    
    table_description = list(
      
      title_statement = list(
        idno = idno_tbl,
        title = tbl_title
      ),
      
      authoring_entity = list(
        list(name = "World Bank, Development Data Group",
             abbreviation = "WB",
             uri = "https://data.worldbank.org/")
      ),
      
      date_created = "2021-07-03",
      date_published = "2021-07",
      
      description = "Country profiles present the latest key development data drawn from the World Development Indicators (WDI) database. They follow the format of The Little Data Book, the WDI's quick reference publication.",
      
      table_columns = list(
        list(label = "Year 1990"),
        list(label = "Year 2000"),
        list(label = "Year 2010"),
        list(label = "Year 2018")
      ),
      
      table_rows = rows,
      
      table_series = list(
        list(name = "World Development Indicators, Country Profiles",
             maintainer = "World Bank, Development Data Group (DECDG)")
      ),
      
      data_sources = list(
        list(source = src_data)
      ),
      
      time_periods = list(
        list(from = "1990", to = "1990"),
        list(from = "2000", to = "2000"),
        list(from = "2010", to = "2010"),
        list(from = "2018", to = "2018")
      ),
      
      ref_country = list(
        list(name = country_name, code = country_code)
      ),
      
      geographic_granularity = area,
      
      languages = list(
        list(name = "English", code = "EN")
      ),
      
      links = list(
        list(uri = "https://datacatalog.worldbank.org/dataset/country-profiles",
             description = "Country Profiles in World Bank Data Catalog website"),
        list(uri = "http://wdi.worldbank.org/tables",
             description = "Country Profiles in World Bank Word Development Indicators website"),
        list(uri = "https://datatopics.worldbank.org/world-development-indicators/",
             description = "Word Development Indicators website")
      ),
      
      keywords = list(
        list(name = "World View"),
        list(name = "People"),
        list(name = "Environment"),
        list(name = "Economy"),
        list(name = "States and markets"),
        list(name = "Global links")
      ),
      
      topics = list(
        list(id = "1", name = "Demography", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "2", name = "Economics", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "3", name = "Education", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "4", name = "Health", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "5", name = "Labour And Employment", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "6", name = "Natural Environment", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "7", name = "Social Welfare Policy And Systems", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "8", name = "Trade Industry And Markets", 
             vocabulary = "CESSDA", 
             uri = "https://vocabularies.cessda.eu/vocabulary/TopicClassification"),
        list(id = "9", name = "Economic development")
      ),

      definitions = defs,
      
      license  = list(
        list(name = "Creative Commons - Attribution 4.0 International - CC BY 4.0",
             uri = "https://creativecommons.org/licenses/by/4.0/")
      ),
      
      citation = citation,
      
      contacts = list(
        list(name = "World Bank, Development Data Group, Help Desk",
             telephone = "+1 (202) 473-7824 or +1 (800) 590-1906",
             email = "data@worldbank.org",
             uri = "https://datahelpdesk.worldbank.org/")
      )
    )    
  )  
  
  # Publish the table in the NADA catalog

  table_add(idno = my_tbl$table_description$title_statement$idno, 
            metadata = my_tbl, 
            repositoryid = "central", 
            published = 1, 
            overwrite = "yes",
            thumbnail = thumb_file)    
  
  # Although the metadata provides links, we also add a link to the table as an 
  # external resource; this will result in a "DOWNLOAD" button being shown in 
  # the NADA catalog page for the table.
  
  external_resources_add(
    idno = my_tbl$table_description$title_statement$idno,
    title = "World Development Indicators, Country Profiles",
    dctype = "tbl",
    file_path = "https://databank.worldbank.org/views/reports/reportwidget.aspx?Report_Name=CountryProfile&Id=b450fd57&tbar=y&dd=y&inf=n&zm=n",
    overwrite = "yes"
  )
  
}

# ------------------------------------------------------------------------------
# Run the function in a loop to publish selected tables 
# ------------------------------------------------------------------------------

# List of regions and countries (and corresponding codes)
# We also include the geographic area type.

geo_list <- list(
  list(name = "World",                        code = "WLD", area = "World"),
  list(name = "East Asia and Pacific",        code = "EAP", area = "Region"),
  list(name = "Europe and Central Asia",      code = "ECA", area = "Region"),
  list(name = "Latin America and Caribbean",  code = "LAC", area = "Region"),
  list(name = "Middle East and North Africa", code = "MNA", area = "Region"),
  list(name = "South Asia",                   code = "SAR", area = "Region"),
  list(name = "Sub-Saharan Africa",           code = "AFR", area = "Region"),
  list(name = "Afghanistan",                  code = "AFG", area = "Country"),
  list(name = "Bangladesh",                   code = "BGD", area = "Country"),
  list(name = "Bhutan",                       code = "BHU", area = "Country"),
  list(name = "India",                        code = "IND", area = "Country"),
  list(name = "Maldives",                     code = "MDV", area = "Country"),
  list(name = "Nepal",                        code = "NPL", area = "Country"),
  list(name = "Pakistan",                     code = "PAK", area = "Country"),
  list(name = "Sri Lanka",                    code = "LKA", area = "Country"))

# Loop through the list to publish the tables

for(i in 1:length(geo_list)) {
  area <- as.character(geo_list[[i]][3])
  publish_country_profile(
    country_name = as.character(geo_list[[i]][1]), 
    country_code = as.character(geo_list[[i]][2]))
}  
```
</code-block>
    
<code-block title="Python">

```python
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 013
#
# Use case description: document a collection of tables ("Country profiles")
# from the World Bank's World Development Indicators (WDI), and publish them in
# a NADA catalog. The tables are published by the World Bank and made available
# in CSV, XLS and PDF formats. See "COUNTRY PROFILES" at
#    http://wdi.worldbank.org/table
#
# The table is available separately for the world and for geographic regions,
# country groups (income level, etc), and country. The same metadata apply to
# all, except for the country tables. We therefore generate the metadata once,
# and use a function to publish all tables in a loop.
#
# In this example, we only publish tables for world, WB operations geographic
# regions, and countries of South Asia. This will result in publishing 15 tables.
# We could provide the list of all countries to the loop to publish 200+ tables.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Tables
#
# Script tested with NADA version: 5.0
# Date: 2021-09-14
# See output in http://nada-demo.ihsn.org/index.php/catalog
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

import pynada as nada
import pandas as pd
import urllib.request
import json

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys = pd.read_csv("../confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is in cell A5
nada.set_api_url('https://nada-demo.ihsn.org/index.php/api/')

thumb_file = "demo_nada_files/UC013/WB_country_profiles_WLD.jpg"
src_data = "World Bank, World Development Indicators database - WDI Central, 2021"

# The tables contain data extracted from WDI time series. We identified these
# series ID and list them in their order of appearance in the table.
# We then use the WDI API to retrieve information on the series (name, label,
# definition) which we will include in the published metadata.

tbl_series = ["SP.POP.TOTL", "SP.POP.GROW", "AG.SRF.TOTL.K2", "EN.POP.DNST",
              "SI.POV.NAHC", "SI.POV.DDAY", "NY.GNP.ATLS.CD", "NY.GNP.PCAP.CD",
              "NY.GNP.MKTP.PP.CD", "NY.GNP.PCAP.PP.CD", "SI.DST.FRST.20",
              "SP.DYN.LE00.IN", "SP.DYN.TFRT.IN", "SP.ADO.TFRT", "SP.DYN.CONU.ZS",
              "SH.STA.BRTC.ZS", "SH.DYN.MORT", "SH.STA.MALN.ZS", "SH.IMM.MEAS",
              "SE.PRM.CMPT.ZS", "SE.PRM.ENRR", "SE.SEC.ENRR", "SE.ENR.PRSC.FM.ZS",
              "SH.DYN.AIDS.ZS", "AG.LND.FRST.K2", "ER.PTD.TOTL.ZS",
              "ER.H2O.FWTL.ZS", "SP.URB.GROW", "EG.USE.PCAP.KG.OE",
              "EN.ATM.CO2E.PC", "EG.USE.ELEC.KH.PC", "NY.GDP.MKTP.CD",
              "NY.GDP.MKTP.KD.ZG", "NY.GDP.DEFL.KD.ZG", "NV.AGR.TOTL.ZS",
              "NV.IND.TOTL.ZS", "NE.EXP.GNFS.ZS", "NE.IMP.GNFS.ZS",
              "NE.GDI.TOTL.ZS", "GC.REV.XGRT.GD.ZS", "GC.NLD.TOTL.GD.ZS",
              "FS.AST.DOMS.GD.ZS", "GC.TAX.TOTL.GD.ZS", "MS.MIL.XPND.GD.ZS",
              "IT.CEL.SETS.P2", "IT.NET.USER.ZS", "TX.VAL.TECH.MF.ZS",
              "IQ.SCI.OVRL", "TG.VAL.TOTL.GD.ZS", "TT.PRI.MRCH.XD.WD",
              "DT.DOD.DECT.CD", "DT.TDS.DECT.EX.ZS", "SM.POP.NETM",
              "BX.TRF.PWKR.CD.DT", "BX.KLT.DINV.CD.WD", "DT.ODA.ODAT.CD"]

rows = []
defs = []

for s in tbl_series:
    url = "https://api.worldbank.org/v2/sources/2/series/" + s + "/metadata?format=JSON"
    try:
        s_meta = urllib.request.urlopen(url)
    except Exception as e:
        print(f"The request failed - {e}")
        exit()
    s_metadata = json.loads(s_meta.read())
    s_metadata = s_metadata['source'][0]['concept'][0]['variable'][0]['metatype']
    indic_lbl = next(m['value'] for m in s_metadata if m["id"] == "IndicatorName")
    indic_def = next(m['value'] for m in s_metadata if m["id"] == "Longdefinition")
    this_row = {'var_name': s, 'dataset': src_data, 'label': indic_lbl}
    rows.append(this_row)
    this_def = {'name': indic_lbl, 'definition': indic_def}
    defs.append(this_def)


# ------------------------------------------------------------------------------
# We create a function that takes two parameters: the country (or region)
# name, and the country (or region) code. This function will generate the
# table metadata and publish the selected table in the NADA catalog.
# ------------------------------------------------------------------------------

def publish_country_profile(country_name, country_code):
    # Generate the country/region-specific unique table ID and table title
    idno_tbl = "UC013_" + country_code
    tbl_title = "World Development Indicators, Country Profile, " + country_name + " - 2021"
    citation = "World Bank," + tbl_title + \
               ", https://datacatalog.worldbank.org/dataset/country-profiles, " \
               "accessed on [date]"
    # Generate the schema-compliant metadata
    metadata_information = {
        'producers': [{'name': "NADA team"}],
        'production_date': "2021-09-14",
        'version': "v01"
    }
    table_description = {
        'title_statement': {
            'idno': idno_tbl,
            'title': tbl_title
        },
        'authoring_entity': [
            {
                'name': "World Bank, Development Data Group",
                'abbreviation': "WB",
                'uri': "https://data.worldbank.org/"
            }
        ],
        'date_created': "2021-07-03",
        'date_published': "2021-07",
        'description': "Country profiles present the latest key development data "
                       "drawn from the World Development Indicators (WDI) database. "
                       "They follow the format of The Little Data Book, the "
                       "WDI's quick reference publication.",
        'table_columns': [
            {'label': "Year 1990"},
            {'label': "Year 2000"},
            {'label': "Year 2010"},
            {'label': "Year 2018"}
        ],
        'table_rows': rows,
        'table_series': [
            {
                'name': "World Development Indicators, Country Profiles",
                'maintainer': "World Bank, Development Data Group (DECDG)"}
        ],
        'data_sources': [{'source': src_data}],

        'time_periods': [{'from': "1990", 'to': "1990"},
                         {'from': "2000", 'to': "2000"},
                         {'from': "2010", 'to': "2010"},
                         {'from': "2018", 'to': "2018"}],
        'ref_country': [{'name': country_name, 'code': country_code}],
        'geographic_granularity': area,
        'languages': [{'name': "English", 'code': "EN"}],
        'links': [
            {
                'uri': "https://datacatalog.worldbank.org/dataset/country-profiles",
                'description': "Country Profiles in World Bank Data Catalog website"},
            {
                'uri': "http://wdi.worldbank.org/tables",
                'description': "Country Profiles in World Bank Word Development "
                               "Indicators website"},
            {
                'uri': "https://datatopics.worldbank.org/world-development-indicators/",
                'description': "Word Development Indicators website"}
        ],
        'keywords': [
            {'name': "World View"},
            {'name': "People"},
            {'name': "Environment"},
            {'name': "Economy"},
            {'name': "States and markets"},
            {'name': "Global links"}
        ],
        'topics': [
            {
                'id': "1", 'name': "Demography",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {
                'id': "2", 'name': "Economics",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {
                'id': "3", 'name': "Education",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {
                'id': "4", 'name': "Health",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {
                'id': "5", 'name': "Labour And Employment",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {
                'id': "6", 'name': "Natural Environment",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {
                'id': "7", 'name': "Social Welfare Policy And Systems",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {
                'id': "8", 'name': "Trade Industry And Markets",
                'vocabulary': "CESSDA",
                'uri': "https://vocabularies.cessda.eu/vocabulary/TopicClassification"},
            {'id': "9", 'name': "Economic development"}
        ],
        'definitions': defs,
        'license': [
            {
                'name': "Creative Commons - Attribution 4.0 International - CC BY 4.0",
                'uri': "https://creativecommons.org/licenses/by/4.0/"}
        ],
        'citation': citation,
        'contacts': [
            {
                'name': "World Bank, Development Data Group, Help Desk",
                'telephone': "+1 (202) 473-7824 or +1 (800) 590-1906",
                'email': "data@worldbank.org",
                'uri': "https://datahelpdesk.worldbank.org/"}

        ]
    }

    # Publish the table in the NADA catalog

    nada.create_table_dataset(
        dataset_id=table_description['title_statement']['idno'],
        repository_id="central",
        published=1,
        overwrite="yes",
        metadata_information=metadata_information,
        table_description=table_description,
        thumbnail=thumb_file
    )

    # Although the metadata provides links, we also add a link to the table as an
    # external resource; this will result in a "DOWNLOAD" button being shown in
    # the NADA catalog page for the table.
    nada.add_resource(
        dataset_id=table_description['title_statement']['idno'],
        dctype="tbl",
        title="World Development Indicators, Country Profiles",
        file_path="https://databank.worldbank.org/views/reports/reportwidget.aspx?Report_Name=CountryProfile&Id"
                 "=b450fd57&tbar=y&dd=y&inf=n&zm=n",
        overwrite="yes"
    )

# ------------------------------------------------------------------------------
# Run the function in a loop to publish selected tables
# ------------------------------------------------------------------------------

# List of regions and countries (and corresponding codes)
# We also include the geographic area type.

geo_list = [
    {'name': "World", 'code': "WLD", 'area': "World"},
    {'name': "East Asia and Pacific", 'code': "EAP", 'area': "Region"},
    {'name': "Europe and Central Asia", 'code': "ECA", 'area': "Region"},
    {'name': "Latin America and Caribbean", 'code': "LAC", 'area': "Region"},
    {'name': "Middle East and North Africa", 'code': "MNA", 'area': "Region"},
    {'name': "South Asia", 'code': "SAR", 'area': "Region"},
    {'name': "Sub-Saharan Africa", 'code': "AFR", 'area': "Region"},
    {'name': "Afghanistan", 'code': "AFG", 'area': "Country"},
    {'name': "Bangladesh", 'code': "BGD", 'area': "Country"},
    {'name': "Bhutan", 'code': "BHU", 'area': "Country"},
    {'name': "India", 'code': "IND", 'area': "Country"},
    {'name': "Maldives", 'code': "MDV", 'area': "Country"},
    {'name': "Nepal", 'code': "NPL", 'area': "Country"},
    {'name': "Pakistan", 'code': "PAK", 'area': "Country"},
    {'name': "Sri Lanka", 'code': "LKA", 'area': "Country"}
]

# Loop through the list to publish the tables

for i in range(len(geo_list)):
    area = str(geo_list[i]['area'])
    publish_country_profile(country_name=geo_list[i]['name'],
                            country_code=geo_list[i]['code'])
  
```
</code-block>
</code-group> 

### Making the data accessible via API
	
@@@@ Content of table can be published and made accessible via API. See section ...	
	
### Adding data visualizations
@@@	
	
### Adding a data preview
@@@	
	
	
## Adding a document
	
![](~@imageBase/images/data_tabs_document.png)
	


:::tip Metadata standard: Dublin Core 

For documents, NADA makes use of the Dublin Core metadata standard, augmented with a few elements inspired by the MARC21 standard. 
	
The documentation of the Dublin Core metadata standard (as implemented in NADA for documenting publications) is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Documents. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
:::

In the examples below, we will show different ways to upload a document taken from the World Bank website:
	
![](~@imageBase/images/image28.png)

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA. 

### From scratch (web interface)

Login as administrator, then in the login sub-menu, select **Site administration**

![](~@imageBase/images/image17.png)

In the Studies menu, select Manage studies / Central Data Catalog

![](~@imageBase/images/image18.png)

Click on Add study

![](~@imageBase/images/image19.png)

In Create new study, select Document

![](~@imageBase/images/image29.png)

Click on Metadata.

![](~@imageBase/images/image30.png)

Enter some information in the form, then click on the Save button.

![](~@imageBase/images/image31.png)

![](~@imageBase/images/image32.png)

![](~@imageBase/images/image33.png)

Go back to the entry page (press the "back" button of your browser).

![](~@imageBase/images/image34.png)

What has been done so far is generating and publishing the document description on the catalog. We have not provided any link to the document. One option would be to upload the PDF to your web server and make the document available from your website. In this case however, we want to provide a link to an external server. Click Add new resource and provide information on the type of resource you are providing a link to (in this case an analytical document), the resource title (in this case it will be the title of the document, but in some cases, you may want to attach multiple files to a document, e.g., an annex containing the tables in Excel format, etc.) Provide a URL to the site you want to link to (the alternative would be to provide the path and filename of the PDF file, for upload to your server). Click Submit.

![](~@imageBase/images/image35.png)

Now the document metadata and the link to the resource are both provided. But the entry is still in draft mode (i.e. only visible to administrators).

![](~@imageBase/images/image36.png)

The last step will be to upload a thumbnail (optional), and to make this entry visible in your catalog by changing its Status from "Draft" to "Published". For a document, a screenshot of the cover page is the recommended thumbnail.

![](~@imageBase/images/image37.png)

![](~@imageBase/images/image38.png)

![](~@imageBase/images/image39.png)

The entry is now visible to visitors of your catalog and in the Dashboard of the Site administration interface (where you can unpublish or delete it).

![](~@imageBase/images/image40.png)

The study listing page in the user interface, with no thumbnail:

![](~@imageBase/images/image104.png)

The study listing page in the user interface, with thumbnail:

![](~@imageBase/images/image105.png)

The header of the entry page, with no thumbnail:

![](~@imageBase/images/image106.png)

The header of the entry page, with a thumbnail:

![](~@imageBase/images/image107.png)

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA. 

### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
	
An example of R and Python scripts was provided in section "Getting Started -- Publishing a document". That example is available in the NADA GitHub repository as Use Case 001. 

We provide here another example, where a list of documents with their core metadata is available as a CSV file. A script (written in R or in Python) reads the file, maps the columns of the file to the schema elements, and publishes the documents in NADA. This example corresponds to Use Case 002 in the NADA GitHub repository.

<code-group>
<code-block title="R">

```r
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 002
#
# Use case description: generate metadata and publish in NADA a collection of 
# documents for which metadata are available in a CSV file. 
# The CSV file contains the following columns:
#   - document_url	
#   - pdf_url	(URL to the PDF version of the document)
#   - txt_url	(URL to the TXT version of the document, if available)	
#   - author (list of authors, as one string)	
#   - identifier (unique identifier of the document; could be a DOI or other)	
#   - abstract 	
#   - series	
#   - language (we assume here that only English or French are valid values)	
#   - publisher	
#   - title	
#   - type	
#   - date_published (in ISO format; could be YYY, or YYYY-MM, or YYYY-MM-DD)
#   - countries (country names, separated by a ";")
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Documents
#
# Script tested with NADA version: 5.0
# Date: 2021-09-10
# See output in http://nada-demo.ihsn.org/index.php/catalog 
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

library(nadar)
library(readxl)
library(rlist)
library(stringr)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 
set_api_verbose(FALSE)

# Set the default folder, and load the CSV file 

setwd("E:/demo_nada_files/UC002")   
doc_list <- read.csv("NADA_demo_list_docs.csv", stringsAsFactors=FALSE)

# Generate the schema-compliant metadata, and publish in NADA catalog
# We need to map the columns in the CSV file to elements of the schema.

for(i in 1:nrow(doc_list)) {
  
  # Download the PDF file if not already done
  
  pdf_url  <- doc_list$pdf_url[i]
  pdf_filename <- paste0(doc_list$identifier[i], ".pdf")
  if(!file.exists(pdf_filename)) {
    download.file(pdf_url, pdf_filename, mode="wb")
  }
  
  # Take a screenshot of the cover page to be used as thumbnail 
  
  thumb_file <- gsub(".pdf", ".jpg", pdf_filename)
  capture_pdf_cover(pdf_filename)
  
  # Map the CSV columns to metadata elements from the schema
  
  id        <- doc_list$identifier[i]
  title     <- doc_list$title[i]
  date      <- as.character(doc_list$date_published[i])
  abstract  <- doc_list$abstract[i]
  publisher <- doc_list$publisher[i]
  series    <- doc_list$series[i]
  type      <- doc_list$type[i]

  author_list = list()
  authors <- unlist(strsplit(doc_list$author[i], ";"))
  for(a in authors) {
    author = unlist(strsplit(a, ","))  # Format in CSV is "lastname, firstname"
    ln = str_trim(author[1])
    fn = str_trim(author[2])
    this_author = list(last_name = ln, first_name = fn)    
    author_list = list.append(author_list, this_author)
  }
  
  if(doc_list$language[i] == "English") {
    lang_name = "English"
    lang_code = "EN"
  } else if (doc_list$language[i] == "French") {
    lang_name = "French"
    lang_code = "FR"
  }  
  language  <- list(list(name=lang_name, code=lang_code))
  
  ctry_list = list()
  countries <- unlist(strsplit(doc_list$countries[i], ";"))
  for(c in countries) {
    ctry = list(name = str_trim(c)) # Removes start/end whitespaces    
    ctry_list = list.append(ctry_list, ctry)
  }

  # Document the file, and publish in the NADA catalog
  
  this_doc_metadata <- list(
    
    metadata_information = list(    # This block is optional but recommended
      producers = list(
        list(name = "NADA team")
      ),
      production_date = "2021-09-11",
      version = "v01"
    ),  

    document_description = list(
      title_statement = list(idno = id, title = title),
      date_published = date,
      type = type,
      authors = author_list,
      series = series,
      publisher = publisher,
      abstract = abstract,
      ref_country = ctry_list,
      languages = language
    )
    
  )

  # Publish the document in the NADA central catalog 
  
  add_document(idno = this_doc_metadata$document_description$title_statement$idno, 
               metadata = this_doc_metadata, 
               repositoryid = "central", 
               published = 1, 
               thumbnail = thumb_file, 
               overwrite = "yes")
  
  # Note: to publish the document in a collection (e.g. "Handbooks"), we would 
  # enter repositoryid = "Handbooks" instead of "repositoryid = "central".
  # The collection must have been previously created in the catalog.
  
  # ==============================================================================
  # Uploading the document metadata will not upload the document itself. To make 
  # the document available in/from the catalog, we need to upload the file to the
  # server or provide a link to an external URL, as an "external resource".
  # More than one resource can be attached to a catalog entry, as long as their 
  # title differ; here, some documents are available in PDF and TXT formats.
  # ==============================================================================
  
  # The "type" column in the CSV file does not comply with dctype in the 
  # external resources schema; we map the types accordingly 
  # Note: to get a list of types found in the CSV file: table(doc_list$type) 
  
  if(doc_list$type[i] == "book")   dctype = "doc/ref"   # Reference document
  if(doc_list$type[i] == "manual") dctype = "doc/ref"

  # Provide a link to the PDF file and to the TXT file if it exists
  # If we have links to a PDF and a TXT file, we mention the format in the title. 
  title_pdf = title
  if(doc_list$txt_url[i] != "") {
    title_pdf = paste0(title, " - PDF version")
    title_txt = paste0(title, " - TXT version")
  } 

  # Create link to PDF file
  external_resources_add(
    title = title_pdf,
    idno = this_doc_metadata$document_description$title_statement$idno,
    dctype = dctype,
    file_path = doc_list$pdf_url[i],
    overwrite = "yes"
  )
  
  # Create link to TXT file, if it exists
  if(doc_list$txt_url[i] != "") {
    external_resources_add(
      title = title_txt,
      idno = this_doc_metadata$document_description$title_statement$idno,
      dctype = dctype,
      file_path = doc_list$txt_url[i],
      overwrite = "yes"
    )
  }  

}

# Alternative: If we wanted to upload the PDF file instead of providing a link : 

  # external_resources_add(
  #   title = title,
  #   idno = this_doc_metadata$document_description$title_statement$idno,
  #   dctype = dctype,
  #   file_path = pdf_filename,
  #   overwrite = "yes"
  # )
```
    
</code-block>
    
<code-block title="Python">

```python
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 002
#
# Use case description: generate metadata and publish in NADA a collection of
# documents for which metadata are available in a CSV file.
# The CSV file contains the following columns:
#   - document_url
#   - pdf_url	(URL to the PDF version of the document)
#   - txt_url	(URL to the TXT version of the document, if available)
#   - author (list of authors, as one string)
#   - identifier (unique identifier of the document; could be a DOI or other)
#   - abstract
#   - series
#   - language (we assume here that only English or French are valid values)
#   - publisher
#   - title
#   - type
#   - date_published (in ISO format; could be YYY, or YYYY-MM, or YYYY-MM-DD)
#   - countries (country names, separated by a ";")
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Documents
#
# Script tested with NADA version: 5.0
# Date: 2021-09-29
# See output in http://nada-demo.ihsn.org/index.php/catalog
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

import os
import pandas as pd
import pynada as nada

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys = pd.read_csv("confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[1, 0])
nada.set_api_url('https://nada-demo.ihsn.org/index.php/api/')

# Set the default folder, and load the CSV file

os.chdir("E:/demo_nada_files/UC002")
doc_list = pd.read_csv("NADA_demo_list_docs.csv", encoding='cp1252')

# Generate the schema-compliant metadata, and publish in NADA catalog
# We need to map the columns in the CSV file to elements of the schema.

for i in range(len(doc_list)):

    # Download the file if not already done

    pdf_url = doc_list['pdf_url'][i]
    pdf_filename = doc_list['identifier'][i] + ".pdf"
    if not os.path.exists(pdf_filename):
        nada.download_file(url=pdf_url, output_fname=pdf_filename, mode='wb')

    # Take a screenshot of the cover page to be used as thumbnail

    thumb_file = nada.pdf_to_thumbnail(pdf_filename, page_no=1)

    # Map the CSV columns to metadata elements from the schema

    idno = doc_list['identifier'][i]
    title = doc_list['title'][i]
    date = str(doc_list['date_published'][i])
    abstract = doc_list['abstract'][i]
    publisher = doc_list['publisher'][i]
    series = doc_list['series'][i] if pd.notna(doc_list['series'][i]) else ""
    dtype = doc_list['type'][i]
    author_list = []
    authors = doc_list['author'][i].split(';')
    # Format in CSV is "lastname, firstname"
    # NADA API - "authors":[{"first_name":"","initial":"", "last_name":""}]
    for a in authors:
        this_author = {'first_name': (a.split(',')[1]).strip(),
                       'last_name': (a.split(',')[0]).strip()
                       }
        author_list.append(this_author)

    language = []
    lang_list = doc_list['language'][i].split()
    for lang in lang_list:
        ln = {}
        if lang == "English":
            ln = {"name": 'English', "code": 'EN'}
        elif lang == "French":
            ln = {"name": 'French', "code": 'FR'}
        language.append(ln)

    ctry_list = []
    countries = doc_list['countries'][i].split(';')
    for c in countries:
        ctry = {'name': c.strip()}
        ctry_list.append(ctry)

    # Document the file, and publish in the NADA catalog

    this_doc_metadata = {
        'metadata_information': {
            # This block is optional but recommended
            'producers': [{'name': "NADA team"}],
            'production_date': "2021-09-11",
            'version': "v01",
        },
        'document_description': {
            'title_statement':
                {"idno": idno,
                 "title": title
                 },
            'type': dtype,
            'abstract': abstract,
            'ref_country': ctry_list,
            'date_published': date,
            'languages': language,
            'series': series,
            'authors': author_list,
            'publisher': publisher,
        }
    }

    # Publish the document in the NADA central catalog
    idno = this_doc_metadata['document_description']['title_statement']['idno']

    nada.create_document_dataset(
        dataset_id=idno,
        repository_id="central",
        published=1,
        overwrite="yes",
        **this_doc_metadata,
        thumbnail_path=thumb_file
    )
    
    # Note: to publish the document in a collection (e.g. "Handbooks"), we would
    # enter repositoryid = "Handbooks" instead of "repositoryid = "central".
    # The collection must have been previously created in the catalog.
    
    # ==============================================================================
    # Uploading the document metadata will not upload the document itself. To make
    # the document available in/from the catalog, we need to upload the file to the
    # server or provide a link to an external URL, as an "external resource".
    # More than one resource can be attached to a catalog entry, as long as their
    # title differ; here, some documents are available in PDF and TXT formats.
    # ==============================================================================
    
    # The "type" column in the CSV file does not comply with dctype in the
    # external resources schema; we map the types accordingly
    # Note: to get a list of types found in the doc_list dataframe, use:
    # doc_list['type'].value_counts()
    reference_documents = ["book", "manual"]
    if doc_list['type'][i] in reference_documents:
        dctype = "doc/ref"

    # Provide a link to the PDF file and to the TXT file if it exists
    # If we have links to a PDF and a TXT file, we mention the format in the title.

    if pd.notna(doc_list['pdf_url'][i]):
        title_pdf = title + " - PDF version"

    if pd.notna(doc_list['txt_url'][i]):
        title_txt = title + " - TXT version"

    # Create link to PDF file
    if pd.notna(doc_list['pdf_url'][i]):
        nada.add_resource(
            dataset_id=idno,
            dctype=dctype,
            title=title_pdf,
            file_path=doc_list['pdf_url'][i],
            overwrite="yes"
        )
    
    # Create link to TXT file, if it exists
    if pd.notna(doc_list['txt_url'][i]):
        nada.add_resource(
            dataset_id=idno,
            dctype=dctype,
            title=title_txt,
            file_path=doc_list['txt_url'][i],
            overwrite="yes"
        )

    # Alternative: If we wanted to upload the PDF file instead of providing a link :

    # nada.add_resource(
    #     dataset_id=idno,
    #     dctype=dctype,
    #     title=title,
    #     file_path=pdf_filename,
    #     overwrite="yes"
    # )
```
</code-block>
</code-group>

### Enabling a PDF document viewer

@@@@ iFrame - Show document in NADA page
	

## Adding an image

![](~@imageBase/images/data_tabs_image.png)
	


:::tip Metadata standards: IPTC and Dublin Core
	
For documenting images, NADA offers two options: the IPTC metadata standard, or the Dublin Core metadata standard. 
	
The documentation of the image metadata schema is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Images. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
::: 	
	
There is currently no option to upload a metadata file (this option will be implemented in future versions of NADA). The available options are to create the metadata in the NADA web interface or programatically using R or Python.

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

![](~@imageBase/images/image112.png)

![](~@imageBase/images/image113.png)

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
    
The API advantage: face detection, labels, ...

<code-group>
<code-block title="R">

```r
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 003
#
# Use case description: document an image and publish it in a NADA catalog.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Images
#
# Script tested with NADA version: 5.0
# Date: 2021-09-10
# See output in http://nada-demo.ihsn.org/index.php/catalog 
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

library(nadar)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 
set_api_verbose(FALSE)

# Set the default folder and download the image files (in 3 resolutions)

setwd("E:/demo_nada_files/UC003")   

download.file("https://live.staticflickr.com/8176/8000988887_777a58e8cb_w_d.jpg",
              "img_001_small.jpg", mode = "wb")
download.file("https://live.staticflickr.com/8176/8000988887_777a58e8cb_c_d.jpg",
              "img_001_medium.jpg", mode = "wb")
download.file("https://live.staticflickr.com/8176/8000988887_58b6766162_o_d.jpg",
              "img_001_original.jpg", mode = "wb")

# Generate the image metadata

my_image <- list(
  
  metadata_information = list(    
    producers = list(list(name = "NADA team")),
    production_date = "2021-09-11",
    version = "v01"
  ),
  
  image_description = list(
    
    idno = "IMG_001",
    
    iptc = list(
      photoVideoMetadataIPTC = list(
        title                = "Somo Samo village well",
        imageSupplierImageId = "8000988887",
        headline             = "Residents get water from an artesian well, Sindh, Pakistan",
        dateCreated          = "2007-02-08T00:00:00Z",
        creatorNames         = list("Caroline Suzman"),
        description          = "The village was settled about 100 years ago. There are over 120 traditional wells that villagers have used to try to get water from over the years. The PPAF funded artesian well has greatly improved the quality of life in the village. One of the challenges that the PPAF and the villagers faced was having to convince the government to construct an artesian well so close to the Indian border. There are 553 households in the village and an equal mix of Hindus and Muslims who co- exist harmoniously. By April 2007 the community will have a water management plan. Amongst other things, this will involve the transporting of the water from the artesian well to other Hamlets. Some of the challenges faced by the Pakistan Poverty Action Fund (PPAF) projects is the difficulty in bringing qualified people into remote areas like the Thar desert.",
        digitalImageGuid     = "8000988887",
        locationsShown       = list(list(countryCode = "PAK", countryName = "Pakistan")),
        keywords             = list("Well, Carrying, Gathering, Activity, 
                                     Thar desert, Sindh, Water, Woman, 
                                     South Asia, Water supply"),
        sceneCodes           = list("010600, 011000, 011100, 011900"),
        subjectCodes         = list("06000000, 09000000, 14000000"),
        source               = "World Bank",
        supplier             = list(list(name = "World Bank")),
        usageTerms           = "Attribution License"
      )
    ),  

    license = list(list(name = "Attribution License", 
                        uri = "https://creativecommons.org/licenses/by/2.0/")),
      
    album = list(list(name = "World Bank Projects in Pakistan"))

  )
  
) 

# Publish the image metadata in the NADA catalog

image_add(idno = my_image$image_description$idno, 
          metadata = my_image,
          repositoryid = "central",
          overwrite = "yes", 
          published = 1,
          thumbnail = "img_001_small.jpg")

# Add the image (in 3 different resolutions) as external resources (type "pic")

external_resources_add(
  title = "Somo Samo village well - Small size (400 x 267)",
  idno = my_image$image_description$idno,
  dctype = "pic",
  file_path = "img_001_small.jpg",
  overwrite = "yes"
)

external_resources_add(
  title = "Somo Samo village well - Medium size (800 x 533)",
  idno = my_image$image_description$idno,
  dctype = "pic",
  file_path = "img_001_medium.jpg",
  overwrite = "yes"
)

external_resources_add(
  title = "Somo Samo village well - Original size (4368 x 2912)",
  idno = my_image$image_description$idno,
  dctype = "pic",
  file_path = "img_001_original.jpg",
  overwrite = "yes"
)
```
</code-block>
    
<code-block title="Python">
    
```python
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 003
#
# Use case description: document an image and publish it in a NADA catalog.
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Images
#
# Script tested with NADA version: 5.0
# Date: 2021-09-10
# See output in http://nada-demo.ihsn.org/index.php/catalog
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

import os
import pynada as nada
import pandas as pd

# # Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys = pd.read_csv("confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is in cell A5
nada.set_api_url('http://nada-demo.ihsn.org/index.php/api/')

# Set the default folder and download the image files (in 3 resolutions)

os.chdir("E:/demo_nada_files/UC003")

nada.download_file("https://live.staticflickr.com/8176/8000988887_777a58e8cb_w_d.jpg",
                   "img_001_small.jpg", mode="wb")
nada.download_file("https://live.staticflickr.com/8176/8000988887_777a58e8cb_c_d.jpg",
                   "img_001_medium.jpg", mode="wb")
nada.download_file("https://live.staticflickr.com/8176/8000988887_58b6766162_o_d.jpg",
                   "img_001_original.jpg", mode="wb")

# Generate the image metadata

my_image = {
    "metadata_information": {
        "producers": [{"name": "NADA team"}],
        "production_date": "2021-09-11",
        "version": "v01"
    },
    "image_description": {
        "idno": "IMG_001",
        "iptc": {
            "photoVideoMetadataIPTC": {
                "title": "Somo Samo village well",
                "imageSupplierImageId": "8000988887",
                "headline": "Residents get water from an artesian well, Sindh, Pakistan",
                "dateCreated": "2007-02-08T00:00:00Z",
                "creatorNames": ["Caroline Suzman"],
                "description": "The village was settled about 100 years ago. There are over 120 traditional wells that villagers have used to try to get water from over the years. The PPAF funded artesian well has greatly improved the quality of life in the village. One of the challenges that the PPAF and the villagers faced was having to convince the government to construct an artesian well so close to the Indian border. There are 553 households in the village and an equal mix of Hindus and Muslims who co- exist harmoniously. By April 2007 the community will have a water management plan. Amongst other things, this will involve the transporting of the water from the artesian well to other Hamlets. Some of the challenges faced by the Pakistan Poverty Action Fund (PPAF) projects is the difficulty in bringing qualified people into remote areas like the Thar desert.",
                "digitalImageGuid": "8000988887",
                "locationsShown": [{"countryCode": "PAK", "countryName": "Pakistan"}],
                "keywords": [
                    "Well, Carrying, Gathering, Activity,Thar,desert, Sindh, Water, Woman,South Asia, Water supply"],
                "sceneCodes": ["010600, 011000, 011100, 011900"],
                "subjectCodes": ["06000000, 09000000, 14000000"],
                "source": "World Bank",
                "supplier": [{"name": "World Bank"}],
                "usageTerms": "Attribution License"
            }
        },
        "license": [{"name": "Attribution License",
                     "uri": "https://creativecommons.org/licenses/by/2.0/"
                     }],
        "album": [{"name": "World Bank Projects in Pakistan"}],
    }
}

# Publish the image metadata in the NADA catalog

nada.create_image_dataset(
    dataset_id=my_image['image_description']['idno'],
    repository_id="central",
    published=1,
    overwrite="yes",
    **my_image,
    thumbnail_path="img_001_small.jpg"
)

# Add the image (in 3 different resolutions) as external resources (type "pic")

nada.add_resource(
    dataset_id=my_image['image_description']['idno'],
    dctype="pic",
    dcformat="image/jpeg",
    title="Somo Samo village well - Small size (400 x 267)",
    file_path="img_001_small.jpg",
    overwrite="yes"
)

nada.add_resource(
    dataset_id=my_image['image_description']['idno'],
    dctype="pic",
    dcformat="image/jpeg",
    title="Somo Samo village well - Medium size (800 x 533)",
    file_path="img_001_medium.jpg",
    overwrite="yes"
)

nada.add_resource(
    dataset_id=my_image['image_description']['idno'],
    dctype="pic",
    dcformat="image/jpeg",
    title="Somo Samo village well - Original size (4368 x 2912)",
    file_path="img_001_original.jpg",
    overwrite="yes"
)
```
</code-block>
</code-group>    

## Adding a video

![](~@imageBase/images/data_tabs_video.png)
	


:::tip Metadata standards: Dublin Core and schema.org 
	
For documenting videos, NADA uses the Dublin Core metadata standard augmented with some elements from the videoObject from schema.org. 
	
The documentation of the video metadata schema is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Videos. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
:::
	
### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

@@@

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
    
<code-group>
<code-block title="R">

```r
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 005
#
# Use case description: document a video and publish it in a NADA catalog.
# The video will be embedded in the catalog page (not provided as an external
# resource).
#
# The video used in this example is a UNHCR video available on YouTube at 
# https://www.youtube.com/watch?v=7Aif1xjstws
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Videos
#
# Script tested with NADA version: 5.0
# Date: 2021-09-11
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

library(nadar)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 
set_api_verbose(FALSE)

thumb_file = "E:/demo_nada_files/UC005/vdo_001.jpg"

# Generate the schema-compliant metadata, and publish it in NADA catalog

my_video = list(
  
  metadata_information = list(    
    producers = list(list(name = "NADA team")),
    production_date = "2021-09-11",
    version = "v01"
  ),
  
  video_description = list(
    idno = "VDO_001",
    title = "Mogadishu, Somalia: A Call for Help",
    alt_title = "Somalia: Guterres in Mogadishu",
    date_published = "2011-09-01",
    description = "During a landmark visit, the UN High Commissioner for Refugees calls on the international community to rapidly increase aid to Somalia.",
    genre = "Documentary",
    persons = list(
      list(name = "António Guterres", role = "High Commissioner for Refugees"),
      list(name = "Fadhumo", role = "Somali internally displaced person (IDP)")
    ),  
    main_entity = "United Nations High Commission for Refugees (UNHCR), the UN Refugee Agency",
    ref_country = list(
      list(name = "Somalia", code = "SOM")
    ),   
    content_location = "Mogadishu, Somalia",
    content_reference_time = "2011-09",
    languages = list(
      list(name = "English", code = "EN")
    ),
    creator = "United Nations High Commission for Refugees (UNHCR)",
    video_url = "https://www.youtube.com/watch?v=7Aif1xjstws",
    embed_url = "https://www.youtube.com/embed/7Aif1xjstws",
    duration = "PT2M14S"  # 2 minutes and 14 seconds
  )
  
)

# Publish the video in the NADA catalog

video_add(idno = my_video$video_description$idno, 
          metadata = my_video,
          published = 1, 
          overwrite = "yes", 
          thumbnail = thumb_file)
```
</code-block>
    
<code-block title="Python">
    
```python
# ==============================================================================
# NADA Demo Catalog - Use of API examples                      Use case ID: 005
#
# Use case description: document a video and publish it in a NADA catalog.
# The video will be embedded in the catalog page (not provided as an external
# resource).
#
# The video used in this example is a UNHCR video available on YouTube at
# https://www.youtube.com/watch?v=7Aif1xjstws
#
# The published metadata will be structured using a schema described in:
#    https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Videos
#
# Script tested with NADA version: 5.0
# Date: 2021-10-05
#
#   ** This script requires a valid API key with administrator privileges.**
#
# ==============================================================================

import pandas as pd
import pynada as nada

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys = pd.read_csv("confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is in cell A5
nada.set_api_url('http://nada-demo.ihsn.org/index.php/api/')

thumb_file = "E:/demo_nada_files/UC005/vdo_001.jpg"

# Generate the schema-compliant metadata, and publish it in NADA catalog

my_video = {
    "metadata_information": {
        "producers": [{"name": "NADA team"}],
        "production_date": "2021-10-05",
        "version": "v01"},
    "video_description": {
        "idno": "VDO_001",
        "title": "Mogadishu, Somalia: A Call for Help",
        "alt_title": "Somalia: Guterres in Mogadishu",
        "description": "During a landmark visit, the UN High Commissioner for Refugees calls on the international "
                       "community to rapidly increase aid to Somalia.",
        "genre": "Documentary",
        "persons": [{"name": "António Guterres", "role": "High Commissioner for Refugees"},
                    {"name": "Fadhumo", "role": "Somali internally displaced person (IDP)"}],
        "main_entity": "United Nations High Commission for Refugees (UNHCR), the UN Refugee Agency",
        "video_url": "https://www.youtube.com/watch?v=7Aif1xjstws",
        "embed_url": "https://www.youtube.com/embed/7Aif1xjstws",
        "duration": "PT2M14S",  # 2 minutes and 14 seconds
        "content_location": "Mogadishu, Somalia",
        "content_reference_time": "2011-09",
        "country": "Somalia",
        "language": "English",
        "creator": "United Nations High Commission for Refugees (UNHCR)"
    }
}

nada.upload_video(idno = my_video['video_description']['idno'],
                  metadata = my_video,
                  published = 1,
                  overwrite = "yes",
                  thumbnail = thumb_file)
```
</code-block>
</code-group>    
    

## Adding scripts

![](~@imageBase/images/data_tabs_script.png)
	
Documenting, cataloguing and disseminating data has the potential to increase the volume and diversity of data analysis. There is also much value in documenting, cataloguing and disseminating **data processing and analysis scripts**. There are multiple reasons to include reproducibility, replicability, and auditability of data analytics as a component of a data dissemination system. They include:  

   -	Improve the **quality of research and analytical work**. Public scrutiny enables contestability and independent quality control; it is a strong incentive for additional rigor. 
   -	Allow the **re-purposing or expansion of analytical work** by the research community, thereby increasing its relevance, utility and value of both the data and of the analytical work that makes use of them. 
   -	Protect the **reputation and credibility** of the analysis. 
   -	Provide students and researchers with useful **training and reference materials** on socio-economic development analysis.  
   -	Satisfy a **requirement** imposed by peer reviewed journals or financial sponsors of research. 	

Technological solutions such as GitHub, Jupyter Notebooks and Jupiter Lab have been developed to facilitate the preservation, versioning, and sharing of code, and to enable collaborative work around data analysis. And recommendations and style guides have been produced to foster usability, adaptability, and reproducibility of code. But these solutions do not fully address the issue of discoverability of data analysis scripts, which requires better documentation and cataloguing solutions. We therefore propose --as a complement to existing solutions-- a metadata schema to document data analysis projects and the related scripts. The production of structured metadata will contribute not only to discoverability, but also to the reproducibility, replicability, and auditability of data analytics.
	


:::tip Metadata schema

For documenting scripts/research projects, NADA uses a metadata schema developed by the World Bank Development Data Group. 
	
The documentation of the script metadata schema is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Scripts. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
:::	
	
### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

You have the possibility to create a new *script* entry in the NADA administrator web interface, using the embedded metadata editor. A *script* entry is used to document and publish all scripts related to one same data processing and/or ananlysis project that involves scripts written in any programming language (R, Python, Stata, SPSS, SAS, other, or a combination of them). The objective of documenting and publishing scripts is to make research and analysis fully transparent, reproducible, and replicable. Ideally, the data that serve as input the the scripts, and the publications that are the output of the analysis, will also be documented and published in the catalog (as microdata, indicators, documents, tables, or other). 
    
To document a research project (scripts) from scratch using the web interface, select "Add study" in the dashboard page, then select the option *script* in the **Create new study** box. Then click **Create**.
    
![](~@imageBase/images/image114.png)

The *Overview* tab of a new, empty entry will be displayed. Click on the **Metadata** tab. The metadata editor embedded in NADA will be displayed, providing a form compliant with the NADA metadata schema for documenting data processing and analysis projects. After filling out the fields with as much detail as possible, click on **Save**.     

![](~@imageBase/images/image115.png)
    
Once you have entered and saved metadata, proceed as explained in previous section to upload files, select options, add a thumbnail, and publish your metadata. To add external resources, use the **Add resource** in the *External resources* page.    

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
    
<code-group>
<code-block title="R">

```r

```
</code-block>
    
<code-block title="Python">

```Python
  
```
</code-block>
</code-group> 

## Featuring an entry

@@@	
	
    
## Deleting an entry

### Using the administrator interface 

### Using the API 

Deleting an entry (of any type except external resource) from a catalog only requires knowing the unique identifier of the entry in the catalog. The entry can then be deleted using NADAR (for R users) or PyNADA (for Python users), after providing an API authentication key and the URL of the catalog, as follows (assuming the entry to be deleted has an ID = ABC123):
    
In R:
```r
library(nadar)
    
my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 

catalog_delete(idno = "ABC123")
```   

In Python:
```python
import pynada as nada

my_keys = pd.read_csv("confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is in cell A5
nada.set_api_url('http://nada-demo.ihsn.org/index.php/api/')
           
nada.catalog_delete(idno = "ABC123")           
```   
  
    
## Deleting external resources 
           
### Using the administrator interface 

### Using the API 
  
In R:
```r
library(nadar)
    
my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 

@@@@@@@
```   

In Python:
```python
import pynada as nada

my_keys = pd.read_csv("confidential/my_keys.csv", header=None)
nada.set_api_key(my_keys.iat[4, 0])  # Assuming the key is in cell A5
nada.set_api_url('http://nada-demo.ihsn.org/index.php/api/')
           
@@@@@@@@    
```     

## Replacing an entry

### Using the administrator interface 

### Using the API 


## Editing an entry

Risk of discrepancy

### Using the administrator interface 

### Using the API 

Powerful automation options. Can programmatically change any specific piece of metadata, for one or multiple entries.

See the NADAR or PyNADA documentation.


## Publishing/unpublishing

### Using the administrator interface 

In the Manage studies page:

![](~@imageBase/images/image116.png)
![](~@imageBase/images/image117.png)

![](~@imageBase/images/image118.png)

In the study page:

![](~@imageBase/images/image119.png)

### Using the API 




	
## Making data accessible via API 

In addition to providing tools to maintain **metadata** via API, NADA provides a solution to store and disseminate **data** via API. In the current version of NADA, this solution applies to **indicators/time series** and **tabular** data. It could also be implemented to microdata (this option is not documented here, but will be added in future versions of the documentation).
	
Making your data accessible via API has multiple advantages: 
- Many data users will appreciate such mode of access; all modern data dissemination systems provide an API option. 
- By making your data accessible programatically, you provide new opportunities to data users, which will increase the use and value of your data.
- The API can be used internally by your NADA catalog, to create dynamic visualizations, display data, and create on-line data extraction tools.

NADA stores the data and the related data dictionary in a mongoDB database (an open source software). To make use of the data API solution, mongoDB must have been installed on your server. See the Installation Guide for more information. 
	
Publishing data in mongoDB and making them accessible via API is a simple process that consists of:
- Preparing your data: data must be stored in a CSV file (or a zipped CSV file) and organized in a *long format*. The content of this CSV file will be a "table" in mongoDB. 
- The CSV (or zip) file is published in a mongoDB database using the NADAR package (for R users) or the PyNADA library (for Python users). A name will have to be given to the database. A database can contain multiple tables. There is currently no option to publish data to mongoDB using the NADA web interface. 
- A data dictionary is created (in R or Python) and published together with the data.
- The data is then accessible via API.

### Formatting and publishing time series data

Time series / indicators will typically come in a format suitable for publishing in the NADA API. The CSV data file must include (i) the series’ unique *identifier*, (ii) the series *features* (or *dimensions*), and (iii) the *value*. 
- The *identifier* will be a string or a numeric variable that provides a unique identifier for the series/indicator. For example, the World Bank’s identifier for the *Population, Total* series of the World Development Indicators (WDI) database is *SP.POP.TOTL*. It is *SP.POP.TOTL.FE.IN* for the female population and *SP.POP.TOTL.MA.IN* for the male population.
- The *features* (or *dimensions*) of the series/indicator are additional qualifiers of the values of the series/indicator. For example, the features for the *Population, Total* series could be “country_name”, “country_code”, and “Year”. The features are the information that, combined with the series identifier, will provide the necessary information to define what a given value represents.  
- The *value* is the estimate that corresponds to the series and its features.
	
Example:
	
![](~@imageBase/images/data_api_00.png)	

Note that the database could have be organized differently. The WDI database generates separate series for “Population, Total”, “Population, Male”, and “Population, Female”.  Another option would have been to create one series “Population” and to provide the sex as a feature: 
	
![](~@imageBase/images/data_api_01.png)	

To be published in the NADA data API (as a mongoDB table), the data must first be formatted and saved as a CSV file. The data must be organized as displayed in the examples above, i.e. in a **long format** (by opposition to a *wide* format). This means that:
- the data file must have one and only one *value* per row
- the combination of the series/indicator identifier with the features cannot contain duplicates (in the example above, this means that each combination of *series* + *country_code* + *country_name* + *year* must be unique in the data file; this will guarantee for example that we would nnot have two different values for the total population of Afghanistan for a same year).
	
Note that a CSV file may contain more than one series/indicator.

For efficiency reason (reduced file size and speed of data filtering and extraction), it is recommended to store the information in the CSV file as numeric variables whenever possible. In our example, instead of storing the *sex* feature as a string variable with categories “total”, “male”, and “female”, we could store it as 0 (for total), 1 (for male), and 2 (for female). Also, the *country_name* variable could be dropped, as the country_code variable provides the necessary information (as long as the user is provided with the country name corresponding to each code). A data dictionary will always be uploaded with the CSV file, which will contain the necessary data dictionnary.
	
![](~@imageBase/images/data_api_04.png)
	
When published in mongoDB, the CSV file will be provided with the following core metadata:
- A unique **table identifier** (the *table* refers to a mongoDB table; it corresponds to the dataset being published, which may contain one or multiple time series/indicators).
- The table (dataset) **title**	
- An optional (but recommended) **description of the table** (dataset).	
- A description of the *indicator* for which values are provided, including a label and a measurement unit. 	
- A **data dictionary** containing the variable and value labels for all features (dimensions), except when the value labels are available in a separate lookup file (see section "Using lookup files" below).
	
Using R

Description of the NADAR function:	
data_api_create_table(
  db_id,
  table_id,
  metadata,
  api_key = NULL,
  api_base_url = NULL
)
Arguments
db_id (Required) database name
table_id (Required) Table name
metadata Table metadata
	
```r
library(nadar)
library(readxl)

# ------------------------------------------------------------------------------
# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL
my_keys <- read.csv("C:/confidential/my_API_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[2,2])  # Assuming the key is in cell B2 
set_api_url("https://nada-demo.ihsn.org./index.php/api/")
set_api_verbose(FALSE)
# ------------------------------------------------------------------------------

tblid = "POP_2010_2020" 
csv_data = "C:\test_files\POP_SEX_2010_2020.CSV"

# Generate the table metadata

my_tbl <- list(
  
  table_id    = tblid,
  title       = "Population by sex, 2010 and 2020, Afghanistan and Albania",
  description = "The table provides population data for two countries, in 2020 and 2020.
	         Source: World Bank, World Development Indicators database, 2021",
  
  indicator = list(
	list(code   = 10, 
             label  = "Population, Total",
             measurement_unit = "Number of persons"),
	list(code   = 11, 
	     label  = "Population, Male",
	     measurement_unit = "Number of persons"),
	list(code   = 12, 
	     label  = "Population, Female",
	     measurement_unit = "Number of persons")
  ),
	
  features = list(
    
    list(feature_name  = "country_code",
         feature_label = "Country",
         code_list = list(list(code="AFG", label="Afghanistan"),
                          list(code="ALB", label="Albania"))),
	
    list(feature_name  = "sex",
         feature_label = "Sex",
         code_list = list(list(code=0, label="All"),
                          list(code=1, label="Male"),
                          list(code=2, label="Female")))	
    
    list(feature_name  = "year",
         feature_label = "Year")
	
  )
  
)

# Publish the CSV file to MongoDB database 
publish_table_to_MongoDB(tblid, csv_data, my_tbl) 
	
```	

Using Python
	
Description of the PyNADA function:
@@@	
	
```python
# Same example, in Python	
```	
	
### Formatting and publishing tabular data
	
The content of statistical tables (cross-tabulations), when it can be converted to a long format, can also be published in the data API. We provide here a simple example. Using R or Python, the format of statistical tables can be reshaped to match the requirements of the NADA data API, saved as CSV, and published in mongoDB. We provide here a simple example.
	
The source table
![](~@imageBase/images/data_api_05.png)
	
The table contains 108 cells with values. When converted to a long format, we therefore expect to have 108 observations in the resulting CSV file.
The indicator is “population”. The features are the province (including the total), the age group (with 4 possible values), the area of residence (with 3 possible values), and the sex (with 3 possible values). The conversion to the long format can be done in Excel, or programmatically (Excel, R, Python, Stata, SPSS, etc. provide tools to reshape tables and to encode variables).

Note: empty/missing values in CSV …
Note: do not round

Rule: most detailed and full transparency to users (when they see a value, they need to know what it represents).
	
Converted to long format	
![](~@imageBase/images/data_api_06.png)
	
Optimized (encoded strings)	
![](~@imageBase/images/data_api_07.png)
	
	
Using R

```r
library(nadar)
library(readxl)

# ------------------------------------------------------------------------------
# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL
my_keys <- read.csv("C:/confidential/my_API_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[2,2])  # Assuming the key is in cell B2 
set_api_url("https://nada-demo.ihsn.org./index.php/api/")
set_api_verbose(FALSE)
# ------------------------------------------------------------------------------

tblid = "POP_AGE_2020" 
csv_data = "C:\test_files\POP_AGE_2020.CSV"

# Generate the table metadata

my_tbl <- list(
  
  table_id    = tblid,
  title       = "Popstan, Population by province, age group, sex, and area of residence, 2020 (thousands)",
  description = "The table provides data on the resident population of Popstan as of June 30, 2020, 
                 by province, age group, area of residence, and sex. 
                 The data are the results of the population census 2020.",
  
  indicator = list(list(code   = 1, 
                        label  = "Population",
                        measurement_unit = "Thousands of persons")),
  
  features = list(
    
    list(feature_name  = "province",
         feature_label = "Province",
         code_list = list(list(code=0, label="All"),
                          list(code=1, label="Province A"),
                          list(code=2, label="Province B"))),
    
    list(feature_name  = "area",
         feature_label = "Area of residence (urban/rural)",
         code_list = list(list(code=0, label="All"),
                          list(code=1, label="Rural"),
                          list(code=2, label="Urban"))),
    
    list(feature_name  = "age_group",
         feature_label = "Age group",
         code_list = list(list(code=0,  label="Total"),
                          list(code=1,  label="0 to 17 years"),
                          list(code=2,  label="18 to 64 years"),
                          list(code=3,  label="65 years and above"))),
    
    list(feature_name  = "sex",
         feature_label = "Sex",
         code_list = list(list(code=0, label="All"),
                          list(code=1, label="Male"),
                          list(code=2, label="Female")))
  )
  
)

# Publish the CSV file to MongoDB database 

publish_table_to_MongoDB(tblid, csv_data, my_tbl) 
	
```	
	
Example using Python	
	

### Using lookup files

@@@@@	
For long lists of value labels (such as detailed, nested geographic codes): instead of long data dictionary, refer to a table in database.
	
Example: Census data with population total, by state, district, sub-district, town (urban) or village (rural). System with nested codes. Can be thousands of observations.
(show table). Not only very long list, also used for multiple tables. 

Another example would be a list of occupations, or industries, used in many tables (national or international classifications, which can be long). Many tables can use the same classification. 
	
In such cases, it would be too tedious and inconvenient to produce a data dictionary in R or Python script.
	
To do that: ...	
	
### Deleting a mongoDB table
@@@	
NADAR: 
data_api_delete_table(db_id, table_id, api_key = NULL, api_base_url = NULL)
Arguments:
   db_id (Required) database name
   table_id (Required) Table name	
	
### Replacing a mongoDB table
@@@ 
overwrite = "yes" in NADAR
data_api_publish_table(
  db_id,
  table_id,
  table_metadata,
  csvfile,
  overwrite = "no",
  api_key = NULL,
  api_base_url = NULL
)
	
### Appending to a mongoDB table	
@@@	
Not yet implemented.	

### Listing tables available in mongDB

NADAR: data_api_list_tables(api_key = NULL, api_base_url = NULL)
	
PyNADA: 
	
Web browser: You can view a list of all tables published in your catalog's mongoDB database by entering the following URL in your browser (after replacing "nada-demo.ihsn.org" with your own catalog URL): https://nada-demo.ihsn.org/index.php/api/tables/list. A list of all tables with some summary information on each table will be displayed.
	
![](~@imageBase/images/data_api_list.png)	
	
### Retrieving metadata on a table
@@@
https://nada-demo.ihsn.org/index.php/api/tables/info/demo/tbl_uc_016	
	
![](~@imageBase/images/data_api_info1.png)
![](~@imageBase/images/data_api_info2.png)	
	
### Viewing data in JSON
https://nada-demo.ihsn.org/index.php/api/tables/data/demo/tbl_uc_016

![](~@imageBase/images/data_api_data1.png)	
	
### Querying the data
@@@	

The API will extract data from a database where each cell of each table represents an observation. Some tables contain thousands or even millions of observations. By building and running an API query, you will filter and extract the observations and variables that match your criteria. To build such a filter, you will need (i) the list of variables available in the table, and (ii) the codes used for each variable. For example, if you are interested in extracting ...
	
Build your query 

The information on variables and codes gives you what you need to build your query. The query will always be structured as follows:   
[base URL][/maximum number of observations (optional)][?][your query][format of data] 

The base URL will always be [URL] 

The maximum number of observations is an optional parameter. By default, the API will return only the first 400 observations (the rest being available in subsequent pages]. To change this parameter, enter "/" followed by the number.  

Your query will start with a "? followed by a list of filters describing the variables and values of interest. This filter can use the operators "AND", "OR", and "!" (not). To select multiple values for a variable, use the "," as a separator or "-" to define a range. For example, to select ... 

To list the variables you are interested in, enter "features=" followed by a list of variables separated by commas. 

Last, select the format in which you want the data to be returned by the API; the options are "format=JSON" or "format= CSV".  

In our example, assume we want  ...	
		
	
### Informing and guiding users

Users will need some instructions to make use of the data API.
What to provide? @@@@	
	
### A note on SDMX compatibility
@@@@	

## Adding data visualizations 

Dynamic visualizations such as charts and maps can be added to a catalog entry page using widgets. The use of widgets is only possible via the API (this cannot be done through the administrator interface). The visualizations are generated outside NADA, for example using a JavaScript library. NADA itself does not provide a tool for creating visualizations; it only provides a convenient solution to embed visualizations in catalog pages. The NADA demo catalog includes such visualizations. See for example:

-   <https://nada-demo.ihsn.org/index.php/catalog/49> (line/bar chart,     choropleth map, data preview)

-   <https://nada-demo.ihsn.org/index.php/catalog/87> (choropleth map)

-   <https://nada-demo.ihsn.org/index.php/catalog/97> (age pyramid)

Visualizations can however be applied to any data type, as long as the underlying data are available via an API (the NADA data API, or an external API).

The widgets (zip files) used in the NADA demo catalog are available in the NADA GitHub repository (Use Cases).

### Requirements

A visualization widget can be added to a catalog page in two steps. First, upload a zipped widget source file to a catalog. Second, attach the widget to entry page(s). A zipped widget file contains one [index.html]{.underline} file, and supporting files such as a CSS and a thumbnail image.

In R:

```r
library(nadar)

widgets_create
uuid = widget_uuid,

options = list(
   title = "title of widget",
   thumbnail = "thumbnail.jpg",
   description = "description of widget"
),

zip_file = zip_file

)

widgets_attach(
   idno = dataset_id,
   uuid = widget_uuid
)
```

In Python:

```python
import pynada as nada

nada.upload_widget(
widget_id = widget_uuid,
title = " title of widget ",
file_path = zip_file,
thumbnail = "thumbnail.JPG",
description = " description of widget "
)

nada.attach_widget(
dataset_id = dataset_id,
widget_id = widget_uuid,
)
```

With the widget APIs, you can manage widgets and attachments separately. Oftentimes, many entry pages have a common data API and a same type of visualization, in which case a single widget can be used to display different datasets by reading the dataset ID that the widget is attached to as follows:

datasetID = parent.document.getElementsByClassName(\'study-idno\')\[0\]

Thus, it is advisable to codify key contents of entry pages, such as country names and indicator series, and include the codes in dataset IDs so that a widget can load different data with the codified parameters from data API.

Since a widget is a self-sufficient web application, it is possible to import any JavaScript libraries to visualize data. It is also desirable to utilize a front-end framework (ex. Vue JS) and a CSS framework (ex. Bootstrap JS) to implement a JavaScript widget in a more structured way. The following examples are implemented using open-source Java libraries including jQuery, Vue, Bootstrap, eCharts (chart), Leaflet (map), and Tabulator (grid). Other libraries/frameworks could be used.

### Example 1: eCharts bar/line chart

![](~@imageBase/images/image120.png)

![](~@imageBase/images/image121.png)

### Example 2: eCharts map

![](~@imageBase/images/image122.png)

![](~@imageBase/images/image123.png)

### Example 3: location of image in a OSM map

![](~@imageBase/images/image124.png)

![](~@imageBase/images/image125.png)

### Other examples

Demo catalog ; links to GitHub

## Adding a data preview grid 

For time series / indicators
	
The grids are generated outside NADA. In the example below, the grid produced using the open-source W2UI application. Other applications could be used, such as Grid JS, Tabulator, or other (including commercial applications). NADA itself does not provide a tool for generating data grids; it only provides a convenient solution to embed grids in catalog pages.

![](~@imageBase/images/image126.png)
