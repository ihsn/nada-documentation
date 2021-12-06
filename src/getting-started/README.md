# Getting started

If you have just installed your NADA catalog and want to test it, we show you here how to publish some content that you can download from our GitHub repository. We will publish a micro-datasets and two documents. We also provide instructions for deleting the content you will upload for this try. To test the uploading of resources using the API, you need either the R package NADAR or the Python 3.n library PyNADA installed on your computer. See section "Tools for API users" of the NADA Administrator Guide.

## Publishing microdata 

Before you start, download the try_micro zip file from our GitHub repository and extract its content in a new folder. The content of this new folder should be as shown below. Note that this folder structure is not imposed by NADA (see section "Organizing your files" of the NADA Administrator Guide), but it is important to keep it as is as the AFR_1996_WDAAF_v01_M.rdf file, which contains metadata for the resources related to the dataset, includes relative paths where the resource files are expected to be found.

> ![](~@imageBase/images/image16.png)

In these folders, you will find the following content:
- In the root folder, the DDI-compliant metadata (xml file), the Dublin Core-compliant metadata for the related resources (rdf file), and a jpg image file to be used as a thumbnail in the NADA catalog.
- In the *Data* folder, the dataset to be published in the catalog. In this case, the dataset is contained in a single compressed file for each one of the three formats that we want to make available (Stata, SPSS, and CSV).
- In the *Doc* folder, all related documentation files. In this particular case, this is limited to a PDF file containing a working paper. In most cases, the documentation files will include survey questionnaires, interviewer manual, technical and analytical report, and others.
- In the *Programs* folder, a Stata script (do file) used to format teh original dataset. It is good practce to share scripts and code that would allow users to replicate data processing, editing, tabulation, analysis, and visualizations.  

### Using the administrator interface

To publish the dataset and the related materials in your new NADA catalog, first **login** as administrator, then in the login sub-menu, select **Site administration**.

![](~@imageBase/images/image17.png)

In the **Studies** menu, select **Manage studies** > **Central Data Catalog**

![](~@imageBase/images/image18.png)

Click on **Add study**

![](~@imageBase/images/image19.png)

In the **Add study to collection** frame, browse and select the DDI (.XML) and RDF files found in folder try_micro (respectively, *AFR_1996_WDAAF_v01_M.xml* and *AFR_1996_WDAAF_v01_M.rdf*).

![](~@imageBase/images/image20.png)

The metadata contained in the XML and RDF files will be uploaded. Please note that this will only upload metadata to your web server. No dataset, document, or other external resource file has been uploaded yet.

The **Overview** page will now be displayed, providing you with the possibility to take various actions.

In **Country**, you will notice that Eswatini is highlighted in red. This means that the country name is not found in a reference list of countries (in this case, it is because the reference list is outdated and still refers to Eswatini as Swaziland). You will see in section "Catalog administration \> Countries" why you should, and how you can address such issues. For now, let's ignore it.

In Metadata in PDF, click on **Generate PDF** (optional). Keep the options by default in the PDF generation form, and click Generate PDF. This will create a PDF version of the documentation, which will automatically be made available to users in your catalog.

![](~@imageBase/images/image21.png)

In **Data access**, select *Open access* then click **Update** to define the microdata access policy for this study.

![](~@imageBase/images/image22.png)

Leave all other components of the page unchanged (the Administrator guide provides a description of all components).

Skip the **Metadata** tab, which is only used to generate metadata from scratch, or to edit uploaded metadata.

In tab **Files**, you will upload all files that you want to make accessible on-line in your NADA catalog (data files, documents, scripts, or other). In our case, select the survey report (*multi_page.pdf* file found in folder */Doc*), the three zip files containing the microdata found in folder */Data*, and the Stata do file (script) found in folder */Programs*. You will see that the type of file is indicated by an icon and a specific font color. It is important to verify that the data files are indeed recognized as microdata (the restrictions that may come with the access policy you enter in "Data access" will only apply to these files).

![](~@imageBase/images/image23.png)

In the **Resources** tab, you will see a list of external resources, which should correspond to the files you uploaded. This list was extracted from the rdf file.

![](~@imageBase/images/image24.png)

![](~@imageBase/images/image25.png)

Last, upload a logo/thumbnail for your dataset (file *logo.jpg* or any other JPG file of your choice), and click on **Draft** to change the status of your new entry to **Published**. Your dataset is now visible in your catalog. See the latest addition in the "Home page" or browse the catalog to find it.

![](~@imageBase/images/image26.png)


If you want to delete this entry, click on **Delete study**. If you want to unpublish it without deleting it, click on **Published** to set it to **Draft** (in which case it will remain in your catalog, but only visible to the catalog administrators).

![](~@imageBase/images/image27.png)


### Using the API and R or Python

Another option to publish a dataset in a NADA catalog is to make use of the NADA API. We show below how the same dataset and resources that were used in the example above can be uploaded in your catalog using R (using the NADAR package) or Python (using the PyNADA library). Using the API to maintain a NADA catalog requires an API authentication key with administrator privileges.  

<code-group>
  
<code-block title="R">

```r

library(nadar)

# Set administrator API key and catalog URL
# The API key must be kept strictly confidential and never be entered in clear in a script, 
# to avoid accidental sharing. A recommended option is to read it from an external file. 
  
my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
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

```Python

import pynada as nada
import pandas as pd
import os

# Set administrator API key and catalog URL
# The API key must be kept strictly confidential and never be entered in clear in a script, 
# to avoid accidental sharing. A recommended option is to read it from an external file. 
  
my_keys = pd.read_csv("confidential/my_keys.csv", header=None)
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
  
  

## Publishing a document 

We assume you want to add the following document to your central catalog, and provide a link to it (not making the PDF file accessible from your website):
<https://openknowledge.worldbank.org/handle/10986/26269>

![](~@imageBase/images/image28.png)

### Using the interface

Login as administrator, then in the login sub-menu, select Site
administration

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

What has been done so far is generating and publishing the document
description on the catalog. We have not provided any link to the
document. One option would be to upload the PDF to your web server and
make the document available from your website. In this case however, we
want to provide a link to an external server. Click Add new resource and
provide information on the type of resource you are providing a link to
(in this case an analytical document), the resource title (in this case
it will be the title of the document, but in some cases, you may want to
attach multiple files to a document, e.g., an annex containing the
tables in Excel format, etc.) Provide a URL to the site you want to link
to (the alternative would be to provide the path and filename of the PDF
file, for upload to your server). Click Submit.

![](~@imageBase/images/image35.png)

Now the document metadata and the link to the resource are both
provided. But the entry is still in draft mode (i.e. only visible to
administrators).

![](~@imageBase/images/image36.png)

The last step will be to upload a thumbnail (optional), and to make this
entry visible in your catalog by changing its Status from "Draft" to
"Published". For a document, a screenshot of the cover page is the
recommended thumbnail.

![](~@imageBase/images/image37.png)

![](~@imageBase/images/image38.png)

![](~@imageBase/images/image39.png)

The entry is now visible to visitors of your catalog and in the
Dashboard of the Site administration interface (where you can unpublish
or delete it).

![](~@imageBase/images/image40.png)

If you want to delete this entry, click on "Delete study". If you want
to unpublish it without deleting it, click on "Published" to set it to
"Draft".

![](~@imageBase/images/image27.png)

### Using the API

Use Case 001. Other use case: list of documents.

COVID-19_Learning_LSMS_2021.pdf

<code-group>

<code-block title="R">
```r
    library(nadar)
    library(readxl)

    \# Set API key (stored in a CSV file; not to be entered in clear) and
    catalog URL

    my_keys \<- read.csv(\"C:/CONFIDENTIAL/my_keys.csv\", header=F,
    stringsAsFactors=F)

    set_api_key(my_keys\[5,1\]) \# Assuming the key is in cell A5

    set_api_url(\"http://nada-demo.ihsn.org/index.php/api/\")

    set_api_verbose(FALSE)

    \# Set the default folder, and create a thumbnail (screenshot of cover
    page)

    setwd(\"E:/demo_nada_files/UC001b\")

    doc_file \<- \"COVID-19_Learning_LSMS_2021.pdf\"

    thumb_file \<- gsub(\".pdf\", \".jpg\", doc_file)

    capture_pdf_cover(doc_file)

    \# Generate the document metadata

    my_doc_metadata \<- list(

    metadata_information = list( \# This block is optional but recommended

    producers = list(

    list(name = \"NADA team\")

    ),

    production_date = \"2021-09-11\",

    version = \"v01\"

    ),

    document_description = list(

    title_statement = list(idno = \"WB_159274\",

    title = \"Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan
    African Countries\"),

    date_published = \"2021-05\",

    authors = list(list(last_name=\"Dang\", first_name=\"Hai-Anh H.\",

    affiliation=\"World Bank\"),

    list(last_name=\"Siwatu\", first_name=\"Gbemisola Oseni\",

    affiliation=\"World Bank\"),

    list(last_name=\"Zezza\", first_name=\"Alberto\",

    affiliation=\"World Bank\"),

    list(last_name=\"Abanokova\", first_name=\"Kseniya\",

    affiliation=\"World Bank\")),

    series = \"LSMS COVID-19 Cross Country Brief\",

    publisher = \"World Bank\",

    ref_country = list(list(name=\"Burkina Faso\", code=\"BFA\"),

    list(name=\"Ethiopia\", code=\"ETH\"),

    list(name=\"Malawi\", code=\"MWI\"),

    list(name=\"Mali\", code=\"MLI\"),

    list(name=\"Nigeria\", code=\"NGA\"),

    list(name=\"Uganda\", code=\"UGA\")),

    abstract = \"The COVID-19 pandemic has wreaked havoc upon global
    learning, with many countries facing severe school disruptions and
    closures.

    An emerging literature based on household survey data points to the
    pandemic as having exacerbated inequalities in education and learning in
    countries from Italy to Denmark, the United Kingdom, and the United
    States.

    This brief offers new analysis on the impacts of the COVID-19 pandemic
    on learning outcomes for six sub-Saharan African countries.

    The authors analyze detailed household level data from several rounds of
    panel phone surveys collected by the World Bank in Burkina Faso,
    Ethiopia, Malawi, Mali, Nigeria, and Uganda.

    These surveys were first implemented between late April and early June
    2020, after school closures due to the pandemic.

    In each survey round, the surveyed households were asked a set of core
    questions on topics such as knowledge of COVID and mitigation measures,
    access to educational activities during school closures, dynamics of
    employment, household income and livelihood, income loss and coping
    strategies, and received assistance.\",

    languages = list(list(name=\"English\", code=\"EN\")),

    keywords = list(list(name = \"learning activity\"),

    list(name = \"participation rate\"),

    list(name = \"in need of protection\"),

    list(name = \"households with child\"),

    list(name = \"national research\"),

    list(name = \"low socioeconomic status\"),

    list(name = \"education level\"),

    list(name = \"household head\"),

    list(name = \"education for all\"),

    list(name = \"consumption quintile\"),

    list(name = \"school closure\"),

    list(name = \"urban household\"),

    list(name = \"household survey data\"),

    list(name = \"educational radio program\")),

    topics = list(list(name = \"Teachers Management\", vocabulary = \"World
    Bank\"),

    list(name = \"Agriculture and Food Security\", vocabulary = \"World
    Bank\"),

    list(name = \"Education\", vocabulary = \"World Bank\"),

    list(name = \"Education for All\", vocabulary = \"World Bank\"),

    list(name = \"Coronavirus (COVID-19)\", vocabulary = \"World Bank\"))

    )

    )

    \# Publish the document in the NADA central catalog

    add_document(idno =
    my_doc_metadata\$document_description\$title_statement\$idno,

    metadata = my_doc_metadata,

    repositoryid = \"central\",

    published = 1,

    thumbnail = thumb_file,

    overwrite = \"yes\")

    \# Note: to publish the document is a collection (e.g. \"Africa\"), we
    would enter

    \# repositoryid = \"Africa\" instead of \"repositoryid = \"central\".

    \# The collection must have been previously created in the catalog.

    \#
    ==============================================================================

    \# Uploading the document metadata will not upload the document itself.
    To make

    \# the document available in/from the catalog, we need to upload the
    file to the

    \# server or provide a link to an external URL, as an \"external
    resource\".

    \# More than one resource can be attached to a catalog entry, as long as
    their

    \# title differ.

    \#
    ==============================================================================

    \# Upload the PDF file to the web server

    external_resources_add(

    title = \"Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan
    African Countries\",

    idno = my_doc_metadata\$document_description\$title_statement\$idno,

    dctype = \"doc/anl\",

    file_path = \"COVID-19_Learning_LSMS_2021.pdf\",

    overwrite = \"yes\"

    )

    To delete the document:

    catalog_delete("DOC_001_test")
```
</code-block>

<code-block title="Python">
```python
    import os
    import pynada as nada
    import pandas as pd

    \# Set API key (stored in a CSV file; not to be entered in clear) and
    catalog URL

    my_keys = pd.read_csv(\"confidential/my_keys.csv\", header=None)

    nada.set_api_key(my_keys.iat\[1, 0\])

    nada.set_api_url(\'https://nada-demo.ihsn.org/index.php/api/\')

    \# Set the default folder, and create a thumbnail (screenshot of cover
    page)

    os.chdir(\"E:/demo_nada_files/UC001b\")

    doc_file = \"COVID-19_Learning_LSMS_2021.pdf\"

    thumb_file = nada.pdf_to_thumbnail(doc_file, page_no=1)

    \# Generate the document metadata

    my_doc_metadata = {

    \'metadata_information\': {

    \"producers\": \[{\"name\": \"NADA Team\"}\],

    \"production_date\": \"2021-09-11\",

    \"version\": \"v01\"

    },

    \'document_description\': {

    \"title_statement\": {\'idno\': \"WB_159274\",

    \'title\': \"Impact of COVID-19 on Learning : Evidence from Six
    Sub-Saharan \"

    \"African Countries\"},

    \"abstract\": \"The COVID-19 pandemic has wreaked havoc upon global
    learning, with many countries facing severe \"

    \"school disruptions and closures. An emerging literature based on
    household survey data points to the \"

    \"pandemic as having exacerbated inequalities in education and learning
    in countries from Italy to \"

    \"Denmark, the United Kingdom, and the United States. This brief offers
    new analysis on the impacts of \"

    \"the COVID-19 pandemic on learning outcomes for six sub-Saharan African
    countries. The authors \"

    \"analyze detailed household level data from several rounds of panel
    phone surveys collected by the \"

    \"World Bank in Burkina Faso, Ethiopia, Malawi, Mali, Nigeria, and
    Uganda. These surveys were first \"

    \"implemented between late April and early June 2020, after school
    closures due to the pandemic. In \"

    \"each survey round, the surveyed households were asked a set of core
    questions on topics such as \"

    \"knowledge of COVID and mitigation measures, access to educational
    activities during school closures, \"

    \"dynamics of employment, household income and livelihood, income loss
    and coping strategies, \"

    \"and received assistance.\",

    \"ref_country\": \[

    {\'name\': \"Burkina Faso\", \'code\': \"BFA\"},

    {\'name\': \"Ethiopia\", \'code\': \"ETH\"},

    {\'name\': \"Malawi\", \'code\': \"MWI\"},

    {\'name\': \"Mali\", \'code\': \"MLI\"},

    {\'name\': \"Nigeria\", \'code\': \"NGA\"},

    {\'name\': \"Uganda\", \'code\': \"UGA\"}

    \],

    \"date_published\": \"2021-05\",

    \"languages\": \[{

    \"name\": \"English\",

    \"code\": \"EN\"

    }\],

    \"series\": \"LSMS COVID-19 Cross Country Brief\",

    \"authors\": \[

    {

    \"first_name\": \"Hai-Anh H.\",

    \"last_name\": \"Dang\",

    \"affiliation\": \"World Bank\"

    },

    {

    \"first_name\": \"Gbemisola Oseni\",

    \"last_name\": \"Siwatu\",

    \"affiliation\": \"World Bank\"

    },

    {

    \"first_name\": \"Alberto\",

    \"last_name\": \"Zezza\",

    \"affiliation\": \"World Bank\"

    },

    {

    \"first_name\": \"Kseniya\",

    \"last_name\": \"Abanokova\",

    \"affiliation\": \"World Bank\"

    }

    \],

    \"publisher\": \"World Bank\",

    \"keywords\": \[

    {\'name\': \"learning activity\"},

    {\'name\': \"participation rate\"},

    {\'name\': \"in need of protection\"},

    {\'name\': \"households with child\"},

    {\'name\': \"national research\"},

    {\'name\': \"low socioeconomic status\"},

    {\'name\': \"education level\"},

    {\'name\': \"household head\"},

    {\'name\': \"education for all\"},

    {\'name\': \"consumption quintile\"},

    {\'name\': \"school closure\"},

    {\'name\': \"urban household\"},

    {\'name\': \"household survey data\"},

    {\'name\': \"educational radio program\"}

    \],

    \"topics\": \[

    {\'name\': \"Teachers Management\", \'vocabulary\': \"World Bank\"},

    {\'name\': \"Agriculture and Food Security\", \'vocabulary\': \"World
    Bank\"},

    {\'name\': \"Education\", \'vocabulary\': \"World Bank\"},

    {\'name\': \"Education for All\", \'vocabulary\': \"World Bank\"},

    {\'name\': \"Coronavirus (COVID-19}\", \'vocabulary\': \"World Bank\"}

    \]

    }

    }

    \# \# Publish the document in the NADA central catalog

    nada.create_document_dataset(

    dataset_id=my_doc_metadata\[\'document_description\'\]\[\'title_statement\'\]\[\'idno\'\],

    repository_id=\"central\",

    published=1,

    overwrite=\"yes\",

    \*\*my_doc_metadata,

    thumbnail_path=thumb_file

    )

    \# \# Note: to publish the document is a collection (e.g. \"Africa\"),
    we would enter

    \# \# repositoryid = \"Africa\" instead of \"repositoryid = \"central\".

    \# \# The collection must have been previously created in the catalog.

    \#

    \# \#
    ==============================================================================

    \# \# Uploading the document metadata will not upload the document
    itself. To make

    \# \# the document available in/from the catalog, we need to upload the
    file to the

    \# \# server or provide a link to an external URL, as an \"external
    resource\".

    \# \# More than one resource can be attached to a catalog entry, as long
    as their

    \# \# title differ.

    \# \#
    ==============================================================================

    \#

    \#

    \# Upload the PDF file to the web server

    nada.add_resource(dataset_id=my_doc_metadata\[\'document_description\'\]\[\'title_statement\'\]\[\'idno\'\],

    dctype=\"doc/anl\",

    dcformat=\"application/pdf\",

    title=\"Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan
    African Countries\",

    file_path=doc_file,

    overwrite=\"yes\"

    )

    To delete the document:
```
</code-block>
</code-group>    
