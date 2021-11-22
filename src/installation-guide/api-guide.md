# API guide

You need a NADA catalog, an administrator API key, and NADAR or PyNADA installed.

**NADA catalog**

We assume your catalog is http://nada-demo.ihsn.org/

![](~@imageBase/images/nada_site_1.jpg)

**NADA administrator API**

To get an administrator API: 
- At installation
- After installation
We assume your API key is 1a2b3c4d5e6f7g8h9i (not a real one; make sure you keep it protected !)
Never put your key directly in the script. If you share the script, it will be revealed. Better save it in a separate, protected file.
Assume in CSV file, cell ...

Entering your credentials for use of the API (for any catalog maintenance purpose) will be as follows:

In R:

```r

# Load API credentials and catalog URL
my_keys <- read.csv("/OD_API_keys.csv", header=F, stringsAsFactors=F)
my_key  <- my_keys[8,1]
set_api_key(my_key)
set_api_url("http://digital-library.census.ihsn.org/index.php/api/")
set_api_verbose(FALSE)

```


In Python:

```
```


**NADAR or PyNADA**

To use R, install NADAR.

```r
library(devtools)
install_github(mah0001/nadar)
```

To use Python, install PyNADA.

```
```



# Uploading content to the catalog

## Uploading a DDI and RDF

**Scenario description**: I documented microdata using the Nesstar Publisher and generated a DDI and RDF. I want to upload the metadata in my catalog, and make the external resources and data available. Data will be licensed. I have an image file to be used as thumbnail.

**What you need to know**: DDI is an XML file. RDF also (Dublin Core). When uploading, will upload metadata and index. But it will NOT load the related materials on the web server. This has to be done separately.

**If it does not work:**
[list of suggestions on what to check]


```r

# ==============================================================================
# Purpose: Publish microdata in the catalog  
# ==============================================================================

library(nadar)
 
setwd("E:/NADA_DEMO/")

# ------------------------------------------------------------------------------
# Load API credentials and catalog URL
my_keys <- read.csv("/OD_API_keys.csv", 
                    header=F, stringsAsFactors=F)
my_key  <- my_keys[8,1]
set_api_key(my_key)
set_api_url("http://nada-demo.ihsn.org/index.php/api/")
set_api_verbose(FALSE)
# ------------------------------------------------------------------------------

# Upload the DDI 
import_ddi(xml_file = "./NADA_demo_microdata_01.xml", 
           repositoryid = "central",
           overwrite = "yes", 
           access_policy = "licensed", 
           published = 1)

# Upload the RDF and resource files
external_resources_delete_all(dataset_idno = "IND_2001_CIHMS_1PC_SDC")
external_resources_import(dataset_idno = "IND_2001_CIHMS_1PC_SDC", 
           rdf_file = "./NADA_demo_microdata_01.rdf",
           skip_uploads = FALSE,
           overwrite = "yes")

# Add the thumbnail
thumbnail_upload(idno = "IND_2001_CIHMS_1PC_SDC", 
                 thumbnail = "./IND_2001_CIHMS_1PC_SDC/census_logo.JPG")

```


## Documenting and publishing a document

**Scenario description**: I have a PDF document to publish in the catalog. I document it then publish it in NADA. I want to use the cover page as thumbnail.

**What you need to know**: If more than one file ... (e.g. PDF and Word version, or JPG with charts)

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

## Publishing tabular data with data in API 

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

## Publishing time series  

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

## Publishing time series with data in API and chart 

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```



## Publishing data with data in API and a chart and map 

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

## Harvesting data from an external NADA catalog

**Scenario description**: I want to extract metadata from the IHSN catalog and display them in my catalog. I have informed IHSN as a courtesy. I will edit the access policy to provide links to the IHSN catalog (not download their materials and publish in my catalog).

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```


# Deleting content

## Deleting a catalog entry

**Scenario description**: 

**What you need to know**: Can delete one or multiple; provide list of IDs. How to get IDs?

**If it does not work:**

In R:

```r

library(nadar)
# Enter NADA credentials

# List the ID of the entries to be deleted 
to_delete = list("abc123", "def456", "ghi789")

for(x in to_delete) {
  catalog_delete(x)
}

```

In Python:
```
```
## Delting a specific metadata element in an entry

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

## Deleting a specific file in an entry

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

# Editing content

## Replacing metadata

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```
## Changing a specific metadata element

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

## Changing the access policy

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

## Transferring an entry to another collection

**Scenario description**: 

**What you need to know**: 

**If it does not work:**

In R:

```r
library(nadar)

```

In Python:
```
```

# Other

## Exporting to CKAN

In R:

```r
library(nadar)

```

In Python:
```
```


## Importing from CKAN

In R:

```r
library(nadar)

```

In Python:
```
```







