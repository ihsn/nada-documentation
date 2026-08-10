# Publishing a document

This tutorial shows how to add a document when metadata are not provided as ready-made XML/RDF files. You generate metadata in the administrator interface or via the API.

![](/images/image28.png)

### Using the administrator interface

Unlike the [microdata tutorial](./microdata), where metadata were readily available (provided in XML and RDF files generated using a specialized metadata editor), this example has no pre-built metadata files. Metadata will be generated in the NADA administrator interface. This option is not recommended for complex datasets (like microdata, where a large number of variables may have to be documented individually), but it can be used for simpler "datasets" like a document, which does not require as much metadata.  
  
We assume here that you want to add the following document to your central catalog, and provide a link to it (not making the PDF file accessible from your website):
<https://openknowledge.worldbank.org/handle/10986/26269>
  
**Login** as administrator, then in the login sub-menu, select **Site administration**.

![](/images/image17.png)

In the **Studies** menu, select **Manage studies** / **Central Data Catalog**

![](/images/image18.png)

Click on **Add study**.

![](/images/image19.png)

In **Create new study**, select **Document**

![](/images/image29.png)

Click on **Metadata**. A form will be displayed (with a navigation bar), showing all metadata elements available to document the publication.

![](/images/image30.png)

Enter some information in this form including the title, date, author(s), abstract, and more (most of which can be found in the document itself), then click on the **Save** button.

![](/images/image31.png)

![](/images/image32.png)

![](/images/image33.png)

Go back to the catalog entry page (press the "back" button of your browser).

![](/images/image34.png)

What you have done so far is generating and publishing the *document description* in the catalog. We have not provided any link to the document, or uploaded the document on your file server. One option is to upload the PDF to your web server and make the document available directly from your website. In our example however, what we want is to provide a link to an external website where the documents is already published. To do that, click **Add new resource** and provide information on the type of resource you are providing a link to (in this case an *analytical document*), the resource title (in this case it will be the title of the document, but in some cases, you may want to attach multiple files to a document, e.g., an annex containing the tables in Excel format, etc.) Provide a URL to the site you want to link to (the alternative would be to provide the path and filename of the PDF file, for upload to your server). Click **Submit**.

![](/images/image35.png)

Now the document metadata and the link to the resource are both provided. But the entry is still in draft mode (i.e. only visible to administrators).

![](/images/image36.png)

The last step will be to upload a thumbnail (optional), and to make this entry visible in your catalog by changing its Status from **Draft** to **Published**. For a document, a screenshot of the cover page would be the recommended thumbnail.

![](/images/image37.png)

![](/images/image38.png)

![](/images/image39.png)

The entry is now visible to visitors of your catalog and in the Dashboard of the Site administration interface (where you can unpublish or delete it).

![](/images/image40.png)

If you want to delete this entry, click on **Delete study**. If you want to unpublish it without deleting it, click on **Published** to set it to **Draft**.

![](/images/image27.png)

  
### Using the API and R or Python

A document can also be published in NADA using the NADA API and R (NADAR package) or Python (PyNADA library). In such case, the document metadata will be created in the R or Python script. The metadata must be structured in strict compliance with the metadata standard used for documenting documents. In the example, below, we use a different document by the World Bank: "Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan African Countries" available at https://documents.worldbank.org/en/publication/documents-reports/documentdetail/656051621919132722/impact-of-covid-19-on-learning-evidence-from-six-sub-saharan-african-countries. Download this file and save it in a folder of your choice. In the code below, we assume that this file is saved as "C:/nada_get_started/COVID-19_Learning_LSMS_2021.pdf" (you can change the location and file name).

![](/images/image27b.png)  
  
::: code-group

```r [R]
library(nadar)
library(readxl)

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys <- read.csv("C:/CONFIDENTIAL/my_keys.csv", header=F, stringsAsFactors=F)
set_api_key(my_keys[5,1])  # Assuming the key is stored in cell A5
set_api_url("http://nada-demo.ihsn.org/index.php/api/") 
set_api_verbose(FALSE)

# Set the default folder, and create a thumbnail (screenshot of cover page) 

setwd("C:/nada_get_started")   # Provide your own folder name here
doc_file <- "COVID-19_Learning_LSMS_2021.pdf"
thumb_file <- gsub(".pdf", ".jpg", doc_file)
capture_pdf_cover(doc_file) 

# Generate the document metadata

my_doc_metadata <- list(
  
  metadata_information = list(    # This block is optional but recommended
    producers = list(
      list(name = "NADA team")
    ),
    production_date = "2021-09-11",
    version = "v01"
  ),  
  
  document_description = list(
    
    title_statement = list(idno = "WB_159274", 
                           title = "Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan African Countries"),
    
    date_published = "2021-05",
    
    authors = list(list(last_name = "Dang", first_name = "Hai-Anh H.", 
                        affiliation = "World Bank"),
                   list(last_name = "Siwatu", first_name = "Gbemisola Oseni", 
                        affiliation="World Bank"),
                   list(last_name = "Zezza", first_name = "Alberto",   
                        affiliation = "World Bank"),
                   list(last_name = "Abanokova", first_name = "Kseniya", 
                        affiliation = "World Bank")),
    
    series = "LSMS COVID-19 Cross Country Brief",
    
    publisher = "World Bank",
    
    ref_country =  list(list(name = "Burkina Faso", code = "BFA"),
                        list(name = "Ethiopia", code = "ETH"),
                        list(name = "Malawi", code = "MWI"),
                        list(name = "Mali", code = "MLI"),
                        list(name = "Nigeria", code = "NGA"),
                        list(name = "Uganda", code = "UGA")),
    
    abstract = "The COVID-19 pandemic has wreaked havoc upon global learning, with many countries facing severe school disruptions and closures. 
                An emerging literature based on household survey data points to the pandemic as having exacerbated inequalities in education and learning in countries from Italy to Denmark, the United Kingdom, and the United States. 
                This brief offers new analysis on the impacts of the COVID-19 pandemic on learning outcomes for six sub-Saharan African countries. 
                The authors analyze detailed household level data from several rounds of panel phone surveys collected by the World Bank in Burkina Faso, Ethiopia, Malawi, Mali, Nigeria, and Uganda. 
                These surveys were first implemented between late April and early June 2020, after school closures due to the pandemic. 
                In each survey round, the surveyed households were asked a set of core questions on topics such as knowledge of COVID and mitigation measures, access to educational activities during school closures, dynamics of employment, household income and livelihood, income loss and coping strategies, and received assistance.",
    
    languages = list(list(name="English", code="EN")),
    
    keywords = list(list(name = "learning activity"),
                    list(name = "participation rate"),
                    list(name = "in need of protection"),
                    list(name = "households with child"),
                    list(name = "national research"),
                    list(name = "low socioeconomic status"),
                    list(name = "education level"),
                    list(name = "household head"),
                    list(name = "education for all"),
                    list(name = "consumption quintile"),
                    list(name = "school closure"),
                    list(name = "urban household"),
                    list(name = "household survey data"),
                    list(name = "educational radio program")),

    topics = list(list(name = "Teachers Management", vocabulary = "World Bank"),
                  list(name = "Agriculture and Food Security", vocabulary = "World Bank"),
                  list(name = "Education", vocabulary = "World Bank"),
                  list(name = "Education for All", vocabulary = "World Bank"),
                  list(name = "Coronavirus (COVID-19)", vocabulary = "World Bank"))
    
  )

)

# Publish the document in the NADA central catalog 

add_document(idno = my_doc_metadata$document_description$title_statement$idno, 
             metadata = my_doc_metadata, 
             repositoryid = "central", 
             published = 1, 
             thumbnail = thumb_file, 
             overwrite = "yes")

# Note: to publish the document in a collection (e.g. "Africa"), we would enter
# repositoryid = "Africa" instead of "repositoryid = "central".
# The collection must have been previously created in the catalog.

# ==============================================================================
# Uploading the document metadata will not upload the document itself. To make 
# the document available in/from the catalog, we need to upload the file to the
# server or provide a link to an external URL, as an "external resource".
# More than one resource can be attached to a catalog entry, as long as their 
# title differ.
# ==============================================================================

# Upload the PDF file to the web server

external_resources_add(
  title = "Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan African Countries",
  idno = my_doc_metadata$document_description$title_statement$idno,
  dctype = "doc/anl",
  file_path = "COVID-19_Learning_LSMS_2021.pdf",
  overwrite = "yes"
)

# Alternative: If we wanted to provide a link instead of uploading the PDF file: 

# external_resources_add(
#   title = "Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan African Countries",
#   idno = my_doc_metadata$document_description$title_statement$idno,
#   dctype = "doc/anl",
#   file_path = "http://documents.worldbank.org/curated/en/656051621919132722/Impact-of-COVID-19-on-Learning-Evidence-from-Six-Sub-Saharan-African-Countries",
#   overwrite = "yes"
# )
  
# -------  
# To delete the document: catalog_delete("DOC_001_test")
# -------
  
```

```python [Python]

import os
import pynada as nada
import pandas as pd

# Set API key (stored in a CSV file; not to be entered in clear) and catalog URL

my_keys = pd.read_csv("C:/CONFIDENTIAL/my_keys.csv", header = None)
nada.set_api_key(my_keys.iat[1, 0])  
nada.set_api_url('https://nada-demo.ihsn.org/index.php/api/')

# Set the default folder, and create a thumbnail (screenshot of cover page)

os.chdir("C:/nada_get_started")
doc_file = "COVID-19_Learning_LSMS_2021.pdf"
thumb_file = nada.pdf_to_thumbnail(doc_file, page_no=1)

# Generate the document metadata
my_doc_metadata = {
    'metadata_information': {
        "producers": [{"name": "NADA Team"}],
        "production_date": "2021-09-11",
        "version": "v01"
    },
    'document_description': {
        "title_statement": {'idno': "WB_159274",
                            'title': "Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan "
                                     "African Countries"},
        "abstract": "The COVID-19 pandemic has wreaked havoc upon global learning, with many countries facing severe "
                    "school disruptions and closures. An emerging literature based on household survey data points to the "
                    "pandemic as having exacerbated inequalities in education and learning in countries from Italy to "
                    "Denmark, the United Kingdom, and the United States. This brief offers new analysis on the impacts of "
                    "the COVID-19 pandemic on learning outcomes for six sub-Saharan African countries. The authors "
                    "analyze detailed household level data from several rounds of panel phone surveys collected by the "
                    "World Bank in Burkina Faso, Ethiopia, Malawi, Mali, Nigeria, and Uganda. These surveys were first "
                    "implemented between late April and early June 2020, after school closures due to the pandemic. In "
                    "each survey round, the surveyed households were asked a set of core questions on topics such as "
                    "knowledge of COVID and mitigation measures, access to educational activities during school closures, "
                    "dynamics of employment, household income and livelihood, income loss and coping strategies, "
                    "and received assistance.",
        "ref_country": [
            {'name': "Burkina Faso", 'code': "BFA"},
            {'name': "Ethiopia", 'code': "ETH"},
            {'name': "Malawi", 'code': "MWI"},
            {'name': "Mali", 'code': "MLI"},
            {'name': "Nigeria", 'code': "NGA"},
            {'name': "Uganda", 'code': "UGA"}
        ],
        "date_published": "2021-05",
        "languages": [{
            "name": "English",
            "code": "EN"
        }],
        "series": "LSMS COVID-19 Cross Country Brief",
        "authors": [
            {
                "first_name": "Hai-Anh H.",
                "last_name": "Dang",
                "affiliation": "World Bank"
            },
            {
                "first_name": "Gbemisola Oseni",
                "last_name": "Siwatu",
                "affiliation": "World Bank"
            },
            {
                "first_name": "Alberto",
                "last_name": "Zezza",
                "affiliation": "World Bank"
            },
            {
                "first_name": "Kseniya",
                "last_name": "Abanokova",
                "affiliation": "World Bank"
            }
        ],
        "publisher": "World Bank",
        "keywords": [
            {'name': "learning activity"},
            {'name': "participation rate"},
            {'name': "in need of protection"},
            {'name': "households with child"},
            {'name': "national research"},
            {'name': "low socioeconomic status"},
            {'name': "education level"},
            {'name': "household head"},
            {'name': "education for all"},
            {'name': "consumption quintile"},
            {'name': "school closure"},
            {'name': "urban household"},
            {'name': "household survey data"},
            {'name': "educational radio program"}
        ],
        "topics": [
            {'name': "Teachers Management", 'vocabulary': "World Bank"},
            {'name': "Agriculture and Food Security", 'vocabulary': "World Bank"},
            {'name': "Education", 'vocabulary': "World Bank"},
            {'name': "Education for All", 'vocabulary': "World Bank"},
            {'name': "Coronavirus (COVID-19}", 'vocabulary': "World Bank"}
        ]
    }
}

# Publish the document in the NADA central catalog
nada.create_document_dataset(
    dataset_id = my_doc_metadata['document_description']['title_statement']['idno'],
    repository_id = "central",
    published = 1,
    overwrite = "yes",
    **my_doc_metadata,
    thumbnail_path = thumb_file
)

# Note: to publish the document is a collection (e.g. "Africa"), we would enter
# repositoryid = "Africa" instead of "repositoryid = "central".
# The collection must have been previously created in the catalog.

# ==============================================================================
# Uploading the document metadata will not upload the document itself. To make
# the document available in/from the catalog, we need to upload the file to the
# server or provide a link to an external URL, as an "external resource".
# More than one resource can be attached to a catalog entry, as long as their
# title differ.
# ==============================================================================

# Upload the PDF file to the web server
nada.add_resource(dataset_id = my_doc_metadata['document_description']['title_statement']['idno'],
                  dctype = "doc/anl",
                  dcformat = "application/pdf",
                  title = "Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan African Countries",
                  file_path = doc_file,
                  overwrite = "yes"
                  )

# Alternative: If we wanted to provide a link instead of uploading a file:

# nada.add_resource(dataset_id = my_doc_metadata['document_description']['title_statement']['idno'],
#                   dctype = "doc/anl",    # To inform NADA that this is an analytical document
#                   dcformat = "application/pdf",
#                   title = "Impact of COVID-19 on Learning : Evidence from Six Sub-Saharan African Countries",
#                   file_path = "http://documents.worldbank.org/curated/en/656051621919132722/Impact-of-COVID-19-on-Learning-Evidence-from-Six-Sub-Saharan-African-Countries",
#                   overwrite = "yes"
#                   )
```

:::    

That's it ! The document is now listed and accessible in your NADA catalog.
  
![](/images/image27b_catalog_listing.png)
