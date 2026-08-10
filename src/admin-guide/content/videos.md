# Adding a video

![](/images/data_tabs_video.png)
	


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
    
::: code-group

```r [R]
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

```python [Python]
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

:::
