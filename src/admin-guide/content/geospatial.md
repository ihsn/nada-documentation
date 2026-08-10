# Adding a geographic dataset

![](/images/data_tabs_geospatial.png)	
	
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
        
::: code-group

```r [R]
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

```python [Python]
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

:::
    
### Displaying a slide show of previews
	
@@@	
![](/images/geospatial_slide_show.png)
