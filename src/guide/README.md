# Introduction

## What is NADA

NADA is a data cataloging and dissemination system. It serves as a portal for researchers to browse, search, compare, apply for access, and download datasets of multiple types: microdata from surveys and censuses, geospatial data, tables and time series, images, documents, as well as reproducible scripts. It complies with multiple metadata standards (DDI Codebook, Dublin Core/MARC, ISO19139, IPTC).

The name NADA stems for **NA**tional **D**ata **A**rchive. This software was originally developed for the International Household Survey Network (IHSN) to support statistical agencies in building microdata catalogs. It has since then evolved into a more comprehensive data cataloguing application.

NADA is used among others by the World Bank, FAO, ILO, SPC, and many others organizations.

One version of the application, with various options depending on capacity and needs (volume).

NADA is an open source application. The code is published under the MIT license. The source code is available on Github. Project home page is http://www.ihsn.org/nada and GitHub repo is ... You can contribute to the open source solution [...link to the For developers and contributors" chapter]

## Objectives

Promote **access and use** for more and more diverse research; in particular on development issues.

Provide **data discovery solutions** applicable to multiple environments and disciplines.

Promote **reproducibility and replicability** of research and analytics.

Improve **transparency** in analytics leading to development policies and programs.

## Structured metadata

NADA relies on structured metadata compliant with standards or schemas.

What are schemas?

Reasons for using schemas:
   - Comprehensive
   - Inter-operability
   - Discoverability

Which schemas?
   - DDI Codebook for microdata
   - ISO 19115 for geospatial
   - DCMI / MARC for documents
   - IPTC for images
   - Own for tables, time series, visualizations, tables, scripts

![](/images/introduction_DDI_logo.jpeg =200x100)


All in JSON.

How do we generate metadata compliant with these schemas?
   - Specialized editors
   - Some software are compliant
   - NADA editor
   - R, Python, etc.

Examples provided in our Metadata Schemas Users' Guide.

## Rich metadata

Importance of detailed metadata (provide examples). Metadata can be augmented with ML. More metadata means more discoverability and improved usability.
