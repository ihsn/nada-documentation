# Core concepts

We use in this document some concepts and a jargon that need to be well understood, starting with a definition of what constitute *data* and *metadata*, and the different *data types* in NADA. A specific metadata schema is used for each data type, so these concepts are essential. The documentation of NADA (this Administrator Guide and other documentation) also make extensive use of the terms "entry", "dataset", and "study". In most cases, these terms refer to one same thing: a catalog entry.     

## Data

![](/images/nada_tabs.png)

NADA covers different types of **data used for quantitative analysis of social and economic issues**. This includes:

-   **Microdata**: Microdata are the unit-level data on a population of individuals, households, dwellings, facilities, establishments, or other. They can be generated from surveys, censuses, administrative recording systems, or sensors.

-   **Statistical tables**: Statistical tables are summary (aggregated) statistical information provided in the form of cross-tabulations, e.g., in statistics yearbooks or census reports. They will often be a derived product of microdata.

-   **Indicators and time series**: Indicators are summary (or aggregated) measures derived from observed facts (often from microdata). When repeated over time at a regular frequency, the indicators form a time series.

-   **Geographic datasets and geographic data services**: Geographic (or geospatial) data identify and depict geographic locations, boundaries, and characteristics of the surface of the earth. They can be provided in the form of datasets or data services (web applications).

-   **Text**: Text is data. Using natural language processing (NLP) techniques, text can be converted into structured information. NLP tools and models like named entity recognition, topic modeling, word embeddings, sentiment analysis, text summarization, and others make it possible to extract quantitative information from unstructured textual input.

-   **Images**: This refers to photos or images available in electronic format. Images can be processed using machine learning algorithms (for purposes of classification or other). Note that satellite or remote sensing imagery are considered here as geographic (raster) data, not as images.

-   **Videos**.

-   **Scripts**: Although they are not data *per se*, we also consider the programs and scripts used to edit, transform, tabulate, analyze and visualize data as resources that need to be documented, catalogued, and disseminated in data catalogs.

## Metadata

Metadata is the documentation associated with a dataset, or "data about the data". Depending on the data type, the content of metadata will vary. To describe and structure this content, metadata are presented in the form of schemas. The schemas are detailed "checklists" of all pieces of information a user may want to obtain about a dataset (of any type). These checklists differ by data type. This is the reason why NADA makes use of multiple, specialized metadata standards and schemas.

## Entries, datasets, and studies

An entry is a "dataset" of any type listed in NADA. It can be a micro-dataset, an indicator, a geographic dataset, a statistical table, a document, an image, a video, or a script. The word "entry" is thus a generic term (in some documents, the word "study" is used as an alternative).

## External resources

External resources are the materials you may want to share in your catalog together with a dataset, either by providing an option to download electronic files, or by providing an external link (URL) to a resource. You may consider "all materials related to a dataset/catalog entry" as an external resource. For a survey microdataset, this will for example include the survey questionnaire, the interviewer manual, the survey report, data processing and tabulation scripts, photos taken during data collection, visualizations, etc. For an image dataset, this may include multiple version of the image file (in different resolutions). For a publication, this may include a MS-Excel file containing all tables shown in the publication, the scripts used to generate visualizations, etc. A simple metadata schema is used to document external resources. In NADA, the external resources will be shown and made accessible in a DOWNLOADS tab. 

## Central data catalog

The default catalog created when a NADA instance is installed is the **Central Data Catalog**. All studies uploaded to the NADA are visible, searchable, and accessible from the Central Data Catalog. For many institutions the Central Data Catalog will remain the only catalog in their NADA instance. For some institutions, being able to divide the
contents of the Central Data Catalog into more refined *collections* will be desirable.

## Collection

Collections are sub-categories of the Central Data Catalog. They allow administrators of a NADA instance to group studies into what can be thought of as sub-catalogs of the Central Data Catalog. This has a number of benefits from the user, the administrator, and the contributors' perspective.

-   From the users' perspective, being able to filter and view groups (collections) of studies that logically belong together makes finding what they are looking for easier.

-   From the administrators' perspective, the ability to create collections of studies that may logically belong together facilitates the ability to decentralize the management of each collection of studies to specific administrators (for example collections can be managed by different departments in an institution).

-   Some catalogs will host data contributed by multiple organizations, or units within organizations, that may expect or require their contributions to be clearly identified as a sub-catalog or collection. Each collection will have a "home" page and URL, which provides this visibility and identity to the different contributors.

The creation of collections will in general only be useful and necessary large catalogs or for catalogs that desire more decentralized management of groups of studies by different departments.

## Data access type

NADA allows the level of access to datasets to be controlled at the study level. The level of restriction can differ from study to study and can be defined on a scale ranging from open access with no restrictions, to metadata-only publication with no data access.

Seven access types are available: **Open access**, **Direct access**, **Public Use Files (PUF)**, **Licensed**, **External repository**, **Data enclave**, and **Data not available**.

See [Data access types](/admin-guide/content/data-access-types) for a full description of each type, including the user experience, login requirements, admin workflow, and guidance on when to use each.

## Citation

Citations are references that can be included at the study level which point to published works that have used the data from a particular study. In many cases this will be a reference to a journal article, working paper, newspaper article, etc. Such resources are useful to researchers who are interested in seeing how the data have been used before. They are also a good way of showing the funders of surveys that the data are being used for policy and research purposes and thus are an indicator of some of the impact a study has had.

## User

Users in NADA can be defined according to three broad groups:

-   **General Users** - this is the user who registers on a NADA site from the user interface. This user type has no access to the site administration. It is required to register as a user when accessing public use and licensed data types.

-   **Site Administrators** (unlimited) - this user has access to all functions and all collections within the Site Administration.

-   **Limited Administrators** - these administrators have access to a limited set of functions within the Site Administration. Examples would be an administrator of a specific collection, or licensed survey reviewer for all or only some collections, or report generator etc.

NADA allows administrators to create profile of users with much specificity. This allows them to, for example, define a role as "**reviewer**" for those who would be allowed to view and comment on unpublished studies, but with no permission to edit the metadata. 
