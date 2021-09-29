# Overview and core concepts

## About NADA

NADA is a web-based cataloging application that allows for the creation of portals that allows users to browse, search, compare, apply for access, and download relevant census or survey information.

It was originally developed to support the establishment of national survey data archives. The application is used by a diverse and growing number of national, regional, and international organizations. NADA, as with other IHSN tools, uses the Data Documentation Initiative (DDI), XML-based international metadata standard.

## Concepts

### CENTRAL DATA CATALOG

The default catalog created when a NADA instance is installed is the Central Data Catalog.  All studies uploaded to the NADA are visible, searchable and accessible from the Central Data Catalog. For many institutions the Central Data Catalog will remain the only catalog in their NADA instance. For some institutions being able to divide the contents of the Central Data Catalog into more refined collections will be desirable. 

### COLLECTIONS

Collections are sub categories of the Central Data Catalog. They allow administrators of a NADA instance to group studies into what can be thought of as sub-catalogs of the Central Data Catalog. This has a number of benefits both from the user and the administrator perspective. From the users’ perspective, being able to filter and view groups (collections) of studies that logically belong together makes finding what they are looking for easier. From the administrators’ perspective, the ability to create collections of studies that may logically belong together facilitates the ability to decentralize the management of each collection of studies to specific administrators (for example collections can be managed by different departments in an institution). 

NOTE: The creation of collections will in general only be useful and necessary for large catalogs or for catalogs that desire more decentralized management of groups of studies by different departments.

### STUDIES

Studies are carried out to gather more knowledge about a subject. Studies may gather information from a number of different sources in order to answer the questions asked. The information gathered for a study will, in the context of NADA catalogs, usually come from either a census or a survey\s. It is therefore not uncommon to hear the terms survey and study used interchangeably when listening to people talk about their NADA catalog.

### METADATA

Metadata are data about the data. They are not the actual data collected from the survey, but rather the information that describes the survey process and the data. The NADA uses the Data Documentation Initiative (DDI) – ddialliance.org – standard for the presentation of metadata for each study. The DDI document (which is an XML document) is prepared outside the NADA application either manually or using a tool like the Nesstar Publisher – nesstar.com – and then imported into the NADA. The detailed information about the survey is searchable down to the variable level for each survey in the catalog.

### DATA ACCESS TYPES

The NADA allows for the level of access to datasets for studies to be controlled at the study level. In other words the level of restriction can differ from study to study and can be defined on a scale ranging from direct access, with no restrictions, to no access. Briefly the available access types are: 

* Data not available - data are not available for this study.
* Direct Access Data Files - data shared under this policy can be downloaded without any restrictions. The user is not required to be logged into the site and no personal information is collected on the person downloading the data.
* Public Use Data Files - data shared under this policy requires that the user be logged in and registered on the site before they are able to download the data. The user is required to agree to a terms of use of the data and the application keeps records of who downloads the data.
* Licensed Data Files - data shared under this policy requires that the user be logged in and registered on the site. Users are also required to fill in and submit a detailed application form listing their reasons for wanting access to the data. Once the user submits the application form the system informs the system administrator that an application has been made. In order for the person to get access to the data the system administrator needs to review the application and approve it. 
* Data available in an Enclave - under this policy no data is shared through the application. Users submit an application to access the data at a secure facility physically located on the premises of the data producer or a facility nominated by the data producer.
* Data available from external repository – The NADA allows for studies and their metadata to be listed in a NADA catalog but for a link to be created to another site when the data for that study are available elsewhere.

### CITATIONS

Citations are references that can be included at the study level which point to published works that have used the data from a particular study. In many cases this will be a reference to a Journal Article, Working paper, Newspaper article etc. Such resources are useful to researchers who are interested in seeing how the data have been used before. They are also a good way of showing the funders of surveys that the data are being used for policy and research purposes and thus are an indicator of some of the impact a study has had.

### USERS

Users in the NADA can be defined according to three broad groups:
* General Users – this is the normal user who registers on a NADA site from the user interface. This user type has no access to the site administration. It is required to register as a user when accessing public use and licensed data types.
* Site Administrators (unlimited) – this user has access to all functions and all collections within the Site Administration. System wide access.
* Limited Administrators – these administrators have access to a limited set of functions within the Site Administration. Examples would be an administrator of a specific collection\s, or licensed survey reviewer for all or only some collections, or report generator etc.


### Why do NADA administrators need to understand these concepts?

Understanding these concepts is important as it:

* Is critical to understanding the new permissions, and administrator types introduced in NADA 4. Administrators are now able to create collections within their NADA’s and assign different roles to administrators and more granular levels of access to catalog administration at the collection level. It is now possible, for example to have administrators who’s ‘powers’ range from being able to manage all parts of a collection’s administration down to ones with more restrictive access such as ones whose only function is as licensed survey reviewer, or report generator, or catalog reviewer, or citation manager. etc. 
* Ensures that the correct level of permissions and access is assigned to users based on security policies within the institution. Unlike previous versions of NADA, not all users who have access to the Site Administration need have the level of access of an “unlimited site administrator”. This limits security risks associated with having too many “unlimited site administrators” managing a site.
* Assists in assigning an appropriate data access type to data based on institutional distribution polices. 
* Makes it easier to explain more clearly to institutional managers what the capabilities of the NADA application are and to advise on how to best manage the allocation of responsibilities.



