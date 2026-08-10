# Adding an image

![](/images/data_tabs_image.png)
	


:::tip Metadata standards: IPTC and Dublin Core
	
For documenting images, NADA offers two options: the IPTC metadata standard, or the Dublin Core metadata standard. 
	
The documentation of the image metadata schema is available at https://ihsn.github.io/nada-api-redoc/catalog-admin/#tag/Images. A Schema Guide is also available, which provides more detailed information on the structure, content, and use of the metadata standards and schemas. 
::: 	
	
There is currently no option to upload a metadata file (this option will be implemented in future versions of NADA). The available options are to create the metadata in the NADA web interface or programatically using R or Python.

### Loading metadata (web interface) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (web interface)

![](/images/image112.png)

![](/images/image113.png)

### Loading metadata (API) 

This option is currently not available. It will be added in a future version of NADA.

### From scratch (API)

You can generate the metadata using R or Python, then publish it using the NADA API and the NADAR package or PyNADA library. 
    
The API advantage: face detection, labels, ...

::: code-group

```r [R]
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

```python [Python]
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

:::
