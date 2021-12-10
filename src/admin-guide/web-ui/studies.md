# Managing studies 

This section of the Guide describes the various tools and approaches available to catalog administrators to add, edit, orgnize, and delete catalog entries (datasets).  

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

### External resources

External resources are electronic files (or links to electronic files) of any type, that you may want to attach to an entry metadata as "related materials". This could for example be the PDF version of the survey questionnaire and interviewer manual related to a survey microdataset, or visualizations related to a published document. A simple metadata schema (based on the Dublin Core standard) is used to document external resources. This schema includes an element that indicates the type of the resource (e.g., microdata, analytical document, administrative document, technical document, map, website, etc.) In NADA, you will publish the metadata related to a dataset, then add such external resources to it. 

## Adding an entry: multiple approaches

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

Metadata can also be generated programmatically, for example using R or Python, and uploaded to NADA using the API and the NADAR package of PyNADA library. This option allows automation of many tasks and offers the additional advantage of transparency and replicability. For administrators with knowledge of R and/or Python, this is a recommended approach except for microdata (for which the best approach is to use a specialized metadata editor). The metadata generated programmatically must comply with one of the metadata standards and schemas used by NADA, documented in the NADA API and in the Guide on the Use of Metadata Schemas. If you use this approach, you will need to provide an API key with administrator privileges and the catalog URL in your script, as shown in the previous paragraph. Then you add the code that generates the metadata and publish it in your catalog using the relevant *_add* function. Examples are provided in the next sections. 

## Adding microdata

Creating a Microdata entry can be done in two different ways using the administrator interface and the API:

-   By uploading pre-existing metadata (typically generated using a specialized metadata editor, like the Nesstar Publisher application for microdata) via the web interface.
-   By generating and uploading new metadata using the web interface (but with limited capability to document variables; this is thus not a recommended option).
-   By uploading pre-existing metadata (typically generated using a specialized metadata editor, like the Nesstar Publisher application for microdata) using the API.
-   By generating and uploading new metadata programatically, using R or Python and the API.

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

<code-block title="Python">

```Python

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

If you do not have metadata readily available, you can generate it using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. As the DDI schema is relatively complex, the use of a specialized DDI metadata editor like the Nesstar Publisher may be a better option to document microdata. But this can be done using R or Python. Typically, microdata will be documented programmatically when (i) the dataset is not too complex, and/or (ii) when there is no intent to generate detailed, variable-level metadata. We provide here an example of the documentation of a simple micro-dataset using R and Python.

@@@@@@ complete the example

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

<code-block title="Python">
```Python

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

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA. To upload metadata for a geographic dataset available in an XML file compliant with the ISO19139 standard, the API option (see below) must be used.

### From scratch (web interface)

This option is currently not provided. The ISO19139 schema is complex. An ISO19139 editor may be implemented in future versions. In the meantime, the GeoNetwork editor can be used, or the API option described below.

### Loading metadata (API) 

### From scratch (API)


## Adding a document

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

An example was provided in section "Getting Started -- Publishing a document". That example is available in the NADA GitHub repository as Use Case 001.

We provide here another example, where a list of documents with core metadata is available as a CSV file. A script (written in R or in Python) reads the file, maps the columns of the file to the schema elements, and publishes the documents in NADA. This example corresponds to Use Case 007 in the NADA GitHub repository.

Using R

```r
# ==============================================================================
# NADA Demo Catalog - Use of API examples Use case ID: 002
#
# Use case description: generate metadata and publish in NADA a collection of
# documents for which metadata are available in a CSV file.
# The CSV file contains the following columns:
# - document_url
# - pdf_url (URL to the PDF version of the document)
# - txt_url (URL to the TXT version of the document, if available)
# - author (list of authors, as one string)
# - identifier (unique identifier of the document; could be a DOI or other)
# - abstract
# - series
# - language (we assume here that only English or French are valid values)
# - publisher
# - title
# - type
# - date_published (in ISO format; could be YYY, or YYYY-MM, or YYYY-MM-DD)
# - countries (country names, separated by a ";")
#

# The published metadata will be structured using a schema described in:
# https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Documents
#
# Script tested with NADA version: 5.0
# Date: 2021-09-10
# See output in http://nada-demo.ihsn.org/index.php/catalog
#
# \*\* This script requires a valid API key with administrator privileges.\*\*
#
# ==============================================================================

library(nadar)
library(readxl)
library(rlist)
library(stringr)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL 
my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)

set_api_key(my_keys\[5,1\]) # Assuming the key is in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/")
set_api_verbose(FALSE)

# Set the default folder, and load the CSV file
setwd("E:/demo_nada_files/UC002")

doc_list <- read.csv("NADA_demo_list_docs.csv",
stringsAsFactors=FALSE)

# Generate the schema-compliant metadata, and publish in NADA catalog

# We need to map the columns in the CSV file to elements of the schema.

for(i in 1:nrow(doc_list)) {

# Download the PDF file if not already done

pdf_url <- doc_list\$pdf_url\[i\]
pdf_filename <- paste0(doc_list\$identifier\[i\], ".pdf")
if(!file.exists(pdf_filename)) {
    download.file(pdf_url, pdf_filename, mode="wb")
}

# Take a screenshot of the cover page to be used as thumbnail

thumb_file <- gsub(".pdf", ".jpg", pdf_filename)
capture_pdf_cover(pdf_filename)

# Map the CSV columns to metadata elements from the schema

id <- doc_list\$identifier\[i\]

title <- doc_list\$title\[i\]

date <- as.character(doc_list\$date_published\[i\])

abstract <- doc_list\$abstract\[i\]

publisher <- doc_list\$publisher\[i\]

series <- doc_list\$series\[i\]

type <- doc_list\$type\[i\]

author_list = list()

authors <- unlist(strsplit(doc_list\$author\[i\], ";"))

for(a in authors) {

author = unlist(strsplit(a, ",")) # Format in CSV is "lastname, firstname"

ln = str_trim(author\[1\])

fn = str_trim(author\[2\])

this_author = list(last_name = ln, first_name = fn)

author_list = list.append(author_list, this_author)

}

if(doc_list\$language\[i\] == "English") {

lang_name = "English"

lang_code = "EN"

} else if (doc_list\$language\[i\] == "French") {

lang_name = "French"

lang_code = "FR"

}

language <- list(list(name=lang_name, code=lang_code))

ctry_list = list()

countries <- unlist(strsplit(doc_list\$countries\[i\], ";"))

for(c in countries) {

ctry = list(name = str_trim(c)) # Removes start/end whitespaces

ctry_list = list.append(ctry_list, ctry)

}

# Document the file, and publish in the NADA catalog

this_doc_metadata <- list(

metadata_information = list( # This block is optional but recommended

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

add_document(idno =
this_doc_metadata\$document_description\$title_statement\$idno,

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
# Note: to get a list of types found in the CSV file:
table(doc_list\$type)

if(doc_list\$type\[i\] == "book") dctype = "doc/ref" # Reference
document

if(doc_list\$type\[i\] == "manual") dctype = "doc/ref"

# Provide a link to the PDF file and to the TXT file if it exists
# If we have links to a PDF and a TXT file, we mention the format in the title.

title_pdf = title

if(doc_list\$txt_url\[i\] != "") {

title_pdf = paste0(title, " - PDF version")

title_txt = paste0(title, " - TXT version")

}

# Create link to PDF file

external_resources_add(

title = title_pdf,

idno = this_doc_metadata\$document_description\$title_statement\$idno,

dctype = dctype,

file_path = doc_list\$pdf_url\[i\],

overwrite = "yes"

)

# Create link to TXT file, if it exists

if(doc_list\$txt_url\[i\] != "") {

external_resources_add(

title = title_txt,

idno = this_doc_metadata\$document_description\$title_statement\$idno,

dctype = dctype,

file_path = doc_list\$txt_url\[i\],

overwrite = "yes"

)

}

}

# Alternative: If we wanted to upload the PDF file instead of providing a link :

# external_resources_add(

# title = title,

# idno = this_doc_metadata\$document_description\$title_statement\$idno,

# dctype = dctype,

# file_path = pdf_filename,

# overwrite = "yes"

# )
```


Using Python

```python
# ==============================================================================

# NADA Demo Catalog - Use of API examples Use case ID: 002

#

# Use case description: generate metadata and publish in NADA a collection of

# documents for which metadata are available in a CSV file.

# The CSV file contains the following columns:

# - document_url

# - pdf_url (URL to the PDF version of the document)

# - txt_url (URL to the TXT version of the document, if available)

# - author (list of authors, as one string)

# - identifier (unique identifier of the document; could be a DOI or other)

# - abstract

# - series

# - language (we assume here that only English or French are valid values)

# - publisher

# - title

# - type

# - date_published (in ISO format; could be YYY, or YYYY-MM, or YYYY-MM-DD)

# - countries (country names, separated by a ";")

#

# The published metadata will be structured using a schema described in:

# https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Documents

#

# Script tested with NADA version: 5.0

# Date: 2021-09-29

# See output in http://nada-demo.ihsn.org/index.php/catalog

#

# \*\* This script requires a valid API key with administrator privileges.\*\*

#

# ==============================================================================

import os

import pandas as pd

import pynada as nada

# # Set API key (stored in a CSV file; not to be entered in clear) and
catalog URL

my_keys = pd.read_csv("confidential/my_keys.csv", header=None)

nada.set_api_key(my_keys.iat\[1, 0\])

nada.set_api_url(\'https://nada-demo.ihsn.org/index.php/api/\')

# # Set the default folder, and load the CSV file

os.chdir("E:/demo_nada_files/UC002")

doc_list = pd.read_csv("NADA_demo_list_docs.csv", encoding=\'cp1252\')

# # Generate the schema-compliant metadata, and publish in NADA
catalog

# # We need to map the columns in the CSV file to elements of the
schema.

for i in range(len(doc_list)):

# Download the file if not already done

pdf_url = doc_list\[\'pdf_url\'\]\[i\]

pdf_filename = doc_list\[\'identifier\'\]\[i\] + ".pdf"

if not os.path.exists(pdf_filename):

nada.download_file(url=pdf_url, output_fname=pdf_filename, mode=\'wb\')

# # Take a screenshot of the cover page to be used as thumbnail

thumb_file = nada.pdf_to_thumbnail(pdf_filename, page_no=1)

# # Map the CSV columns to metadata elements from the schema

idno = doc_list\[\'identifier\'\]\[i\]

title = doc_list\[\'title\'\]\[i\]

date = str(doc_list\[\'date_published\'\]\[i\])

abstract = doc_list\[\'abstract\'\]\[i\]

publisher = doc_list\[\'publisher\'\]\[i\]

series = doc_list\[\'series\'\]\[i\] if
pd.notna(doc_list\[\'series\'\]\[i\]) else ""

dtype = doc_list\[\'type\'\]\[i\]

author_list = \[\]

authors = doc_list\[\'author\'\]\[i\].split(\';\')

# Format in CSV is "lastname, firstname"

# NADA API - "authors":\[{"first_name":"","initial":"",
"last_name":""}\]

for a in authors:

this_author = {\'first_name\': (a.split(\',\')\[1\]).strip(),

\'last_name\': (a.split(\',\')\[0\]).strip()

}

author_list.append(this_author)

language = \[\]

lang_list = doc_list\[\'language\'\]\[i\].split()

for lang in lang_list:

ln = {}

if lang == "English":

ln = {"name": \'English\', "code": \'EN\'}

elif lang == "French":

ln = {"name": \'French\', "code": \'FR\'}

language.append(ln)

ctry_list = \[\]

countries = doc_list\[\'countries\'\]\[i\].split(\';\')

for c in countries:

ctry = {\'name\': c.strip()}

ctry_list.append(ctry)

# Document the file, and publish in the NADA catalog

this_doc_metadata = {

\'metadata_information\': {

# This block is optional but recommended

\'producers\': \[{\'name\': "NADA team"}\],

\'production_date\': "2021-09-11",

\'version\': "v01",

},

\'document_description\': {

\'title_statement\':

{"idno": idno,

"title": title

},

\'type\': dtype,

\'abstract\': abstract,

\'ref_country\': ctry_list,

\'date_published\': date,

\'languages\': language,

\'series\': series,

\'authors\': author_list,

\'publisher\': publisher,

}

}

# Publish the document in the NADA central catalog

idno =
this_doc_metadata\[\'document_description\'\]\[\'title_statement\'\]\[\'idno\'\]

nada.create_document_dataset(

dataset_id=idno,

repository_id="central",

published=1,

overwrite="yes",

\*\*this_doc_metadata,

thumbnail_path=thumb_file

)

# # # Note: to publish the document in a collection (e.g.
"Handbooks"), we would

# # # enter repositoryid = "Handbooks" instead of "repositoryid =
"central".

# # # The collection must have been previously created in the
catalog.

# #

# # #
==============================================================================

# # # Uploading the document metadata will not upload the document
itself. To make

# # # the document available in/from the catalog, we need to upload
the file to the

# # # server or provide a link to an external URL, as an "external
resource".

# # # More than one resource can be attached to a catalog entry, as
long as their

# # # title differ; here, some documents are available in PDF and TXT
formats.

# # #
==============================================================================

# #

# # # The "type" column in the CSV file does not comply with dctype
in the

# # # external resources schema; we map the types accordingly

# # # Note: to get a list of types found in the doc_list dataframe,
use:

# # doc_list\[\'type\'\].value_counts()

reference_documents = \["book", "manual"\]

if doc_list\[\'type\'\]\[i\] in reference_documents:

dctype = "doc/ref"

# # # # # Provide a link to the PDF file and to the TXT file if it
exists

# # # # # If we have links to a PDF and a TXT file, we mention the
format in the title.

if pd.notna(doc_list\[\'pdf_url\'\]\[i\]):

title_pdf = title + " - PDF version"

if pd.notna(doc_list\[\'txt_url\'\]\[i\]):

title_txt = title + " - TXT version"

# # # # # # Create link to PDF file

if pd.notna(doc_list\[\'pdf_url\'\]\[i\]):

nada.add_resource(

dataset_id=idno,

dctype=dctype,

title=title_pdf,

file_path=doc_list\[\'pdf_url\'\]\[i\],

overwrite="yes"

)

#

# # # # Create link to TXT file, if it exists

if pd.notna(doc_list\[\'txt_url\'\]\[i\]):

nada.add_resource(

dataset_id=idno,

dctype=dctype,

title=title_txt,

file_path=doc_list\[\'txt_url\'\]\[i\],

overwrite="yes"

)

# # # Alternative: If we wanted to upload the PDF file instead of
providing a link :

# nada.add_resource(

# dataset_id=idno,

# dctype=dctype,

# title=title,

# file_path=pdf_filename,

# overwrite="yes"

# )
```

## Adding a table

Currently no option to upload a metadata file (will be implemented in future versions of NADA). Can enter from scratch, or generate the metadata and upload using the API.

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA. 

### From scratch (web interface)

![](~@imageBase/images/image108.png)

![](~@imageBase/images/image109.png)

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

Use Case 006

Use Case 013

Use Case 016

Deleting:

## Adding an indicator / time series

Currently no option to upload a metadata file (will be implemented in future versions of NADA). Can enter from scratch, or generate the metadata and upload using the API.

Two components: series, and source database.

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

![](~@imageBase/images/image110.png)

![](~@imageBase/images/image111.png)

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

Use Case 007


## Adding an image

Currently no option to upload a metadata file (will be implemented in future versions of NADA). Can enter from scratch, or generate the metadata and upload using the API.

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

![](~@imageBase/images/image112.png)

![](~@imageBase/images/image113.png)

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

The API advantage: face detection, labels, ...

Use Case 002

Use Case 003

Use Case 006

## Adding a video



### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)



### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

Use Case 005

## Adding scripts

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

![](~@imageBase/images/image114.png)

![](~@imageBase/images/image115.png)

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)


## Deleting an entry

### Using the administrator interface 

### Using the API 


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



## Enabling a document viewer

### Using the administrator interface 

### Using the API 


## Publishing data in MongoDB 

Data can be published in MongoDB (assuming installed). Data will then be accessible via API. Applies to time series and tables, possibly microdata.

Condition: data in long format. Use R, Python or other tool to convert to appropriate format.

Preferably, numeric (factor) variables for efficiency.

Saved in CSV.

Uploaded with data dictionary. Then available.

Can only be done via API (not UI).

Access policy for data published in API: ...


### Organizing/formatting data

### Data dictionary

### Lookup file

### Uploading

### Informing users


## Adding visualizations using widgets

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

### Other examples:

Demo catalog ; links to GitHub

## Adding a data preview grid 

The grids are generated outside NADA. In the example below, the grid produced using the open-source W2UI application. Other applications could be used, such as Grid JS, Tabulator, or other (including commercial applications). NADA itself does not provide a tool for generating data grids; it only provides a convenient solution to embed grids in catalog pages.

![](~@imageBase/images/image126.png)
