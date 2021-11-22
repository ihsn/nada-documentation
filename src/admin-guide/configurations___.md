# Configurations 

This section provides instructions and recommendations for the configuration of your NADA catalog. Configuring the NADA catalog will provide data curators with the proper environment to populate the catalog and manage the content (data and metadata). 

## Core concepts

Understanding core concepts is important as it:

- Is critical to understanding the new permissions, and administrator types introduced in NADA 4. Administrators are now able to create collections within their NADA’s and assign different roles to administrators and more granular levels of access to catalog administration at the collection level. It is now possible, for example to have administrators who’s ‘powers’ range from being able to manage all parts of a collection’s administration down to ones with more restrictive access such as ones whose only function is as licensed survey reviewer, or report generator, or catalog reviewer, or citation manager. etc.
- Ensures that the correct level of permissions and access is assigned to users based on security policies within the institution. Unlike previous versions of NADA, not all users who have access to the Site Administration need have the level of access of an “unlimited site administrator”. This limits security risks associated with having too many “unlimited site administrators” managing a site.
- Assists in assigning an appropriate data access type to data based on institutional distribution polices.
- Makes it easier to explain more clearly to institutional managers what the capabilities of the NADA application are and to advise on how to best manage the allocation of responsibilities.

**CENTRAL DATA CATALOG**

The default catalog created when a NADA instance is installed is the Central Data Catalog. All studies uploaded to the NADA are visible, searchable and accessible from the Central Data Catalog. For many institutions the Central Data Catalog will remain the only catalog in their NADA instance. For some institutions being able to divide the contents of the Central Data Catalog into more refined collections will be desirable.

**CATALOG ENTRIES**

Previously referred to as "studies".

**EXTERNAL RESOURCES**

[to be defined]

**COLLECTIONS**

Collections are sub categories of the Central Data Catalog. They allow administrators of a NADA instance to group studies into what can be thought of as sub-catalogs of the Central Data Catalog. This has a number of benefits both from the user and the administrator perspective. From the users’ perspective, being able to filter and view groups (collections) of studies that logically belong together makes finding what they are looking for easier. From the administrators’ perspective, the ability to create collections of studies that may logically belong together facilitates the ability to decentralize the management of each collection of studies to specific administrators (for example collections can be managed by different departments in an institution).

>NOTE: The creation of collections will in general only be useful and necessary for large catalogs or for catalogs that desire more decentralized management of groups of studies by different departments.

**METADATA**

Metadata are data about the data. They are not the actual data collected from the survey, but rather the information that describes the survey process and the data. The NADA uses the Data Documentation Initiative (DDI) – ddialliance.org – standard for the presentation of metadata for each study. The DDI document (which is an XML document) is prepared outside the NADA application either manually or using a tool like the Nesstar Publisher – nesstar.com – and then imported into the NADA. The detailed information about the survey is searchable down to the variable level for each survey in the catalog.

**DATA ACCESS TYPES**

The NADA allows for the level of access to datasets for studies to be controlled at the study level. In other words the level of restriction can differ from study to study and can be defined on a scale ranging from direct access, with no restrictions, to no access. Briefly the available access types are:

- Data not available - data are not available for this study.
- Direct Access Data Files - data shared under this policy can be downloaded without any restrictions. The user is not required to be logged into the site and no personal information is collected on the person downloading the data.
- Public Use Data Files - data shared under this policy requires that the user be logged in and registered on the site before they are able to download the data. The user is required to agree to a terms of use of the data and the application keeps records of who downloads the data.
- Licensed Data Files - data shared under this policy requires that the user be logged in and registered on the site. Users are also required to fill in and submit a detailed application form listing their reasons for wanting access to the data. Once the user submits the application form the system informs the system administrator that an application has been made. In order for the person to get access to the data the system administrator needs to review the application and approve it.
- Data available in an Enclave - under this policy no data is shared through the application. Users submit an application to access the data at a secure facility physically located on the premises of the data producer or a facility nominated by the data producer.
- Data available from external repository – The NADA allows for studies and their metadata to be listed in a NADA catalog but for a link to be created to another site when the data for that study are available elsewhere.

**USERS**

Users in the NADA can be defined according to three broad groups: * General Users – this is the normal user who registers on a NADA site from the user interface. This user type has no access to the site administration. It is required to register as a user when accessing public use and licensed data types. * Site Administrators (unlimited) – this user has access to all functions and all collections within the Site Administration. System wide access. * Limited Administrators – these administrators have access to a limited set of functions within the Site Administration. Examples would be an administrator of a specific collections, or licensed survey reviewer for all or only some collections, or report generator etc.

**EMBEDDINGS**

Important for semantic search.


## Set users' permissions

### Types of users

Users in the NADA can be defined according to three broad groups:

- **General Users** – this is the normal user who registers on a NADA site from the user interface. This user type has no access to the site administration. It is required to register as a user before being granted access to public use and licensed data types.

- **Site Administrators (unlimited)** – this user has access to all functions and all collections within the Site Administration. System wide access.

- **Limited Administrators** – these administrators have access to a limited set of functions within the Site Administration. Examples would be an administrator of a specific collections, or licensed survey reviewer for all or only some collections, or report generator, or citation manager etc.

The user created by this process has no access to the site administration. This account can only be used to apply and gain access to public and licensed datasets.

A user account can also be created by a Site Administrator. 
To do this:
- login as a Site Administrator
- Go to the site administration section of the application.
- Select Users – Add user from the top menu.

../_images/register.png

- Fill in the information for the user in the form and be sure to mark the account status as Active. Then click the Create button.

../_images/create-new-user.png

Note that the user always starts off as a General User with no access permissions to the Site Administration. The user group column displays as empty for users with only general user accounts.

To see a list of all users in the system go to the Users – All Users menu item at the top of the screen.
../_images/user-list.png

>Note: the new users created have no User group assigned (they are general users). Also note the Actions column on the far right. From these links an account can be edited (including changing the password and blocking an account), deleted and Permissions managed for the account.

### Managing User Account Permissions

User accounts permissions can be only be set and changed by a Site Administrator. To change the permissions for an account:

Click on the Permissions link next to the account to be changed. All accounts start of as General users accounts

../_images/edit-user-permissions.png

To change this user to a full site administrator who will have full system wide access to all parts and functions of the NADA administration select the Site administrators (full access) option and tick the admin box as well. 

Click update to save the changes.

../_images/site-administrator.png

### Collection level administrators

To create a user who only has permissions to administer studies or administration functions for a particular collection. Select Site administrators (limited access)

../_images/site-administrator-limited.png

It is then necessary to assign a role to this new limited administrator account. To create a limited access administrator for a particular collection – select Site administrators (limited access) and then select Collection administrators. Notice: The form expands to reveal a list of collections in the system.
Select the appropriate level of access that this account will have for this collection. In the example below an administrator is being created who can manage only licensed requests for the collection – Health Surveys. This account will not be able to upload or publish studies. The account will only be able to process licensed requests for the collection – Health Surveys.

../_images/site-administrator-collection-selection.png

Other levels of access for Site administrators (limited access) – Collection administrators include:
- Accounts that are given full access to manage studies
- Accounts that are given access to upload studies but not publish them
- Accounts that are limited to reviewing studies.

### Global level Limited access accounts

Other types of limited access accounts include:

- Accounts that can only view system reports at a global level.
- Accounts that can only access the citations section and manage citations
- Accounts that can only access the Licensed Request management system – at the global level for all collections.

../_images/global-level.png

**Impersonating a user**

The system includes a function that allows a Site Administrator to impersonate (take on the role) a user created in the system. This is a useful testing tool when creating users and assigning permissions. It essentially allows the administrator to take on the role of another user temporarily.

To access the Impersonate User feature go to the Users – Impersonate user menu at the top of the screen

../_images/impersonating-user.png

A list of users to impersonate is shown.

../_images/listofuser.png

Select the user to impersonate and click on the impersonate button.
The dashboard view for the impersonated user now shows

../_images/impersonating-user-dashboard.png

Note in the example above the account being impersonated is a Limited Account administrator with rights only to manage licensed requests for the Health Surveys Collection. Note that all other dashboard menus are either hidden or clicking on any other function other than manage studies results in an access denied message.

This is a good way to test if the roles assigned to a user account have the expected results.

To exit the impersonate mode and return to the Site Administrator role – Click on the top right menu and select Exit impersonate mode.

../_images/exit-impersonating-mode.png

### The Reviewer Limited access account

Sometimes it is desirable for catalog administrators to allow certain users to see a collection before it is published but without granting access to the site administration functions.

This is useful for getting feedback on the correctness of information on collections or studies before publishing.

To do this:

- First create an account for the user or get the user to create an account by using the register form on the login screen.
- Then edit the permissions for that user selecting Site Administrator (limited access) – Collection administrator
- Then for the appropriate collection select Reviewer and click update to save the changes

../_images/user-reviewer.png

The newly created reviewer account user can now view all studies in a collection even if the study or collection is unpublished.

## Generating API keys

Needed to allow administration of catalog using R, Python or other.
Important to keep API secret.

## Set-up catalog parameters

### Search options

Word embeddings API 
Required for semantic search

### Facets options

Facets are specific to each data type.

Some come by default:
- Year
- Countries
- Entry type
Some are controlled by tags in the metadata.
Importance of controlled vocabularies.

Lookup table for countries/regions/groups.

## Collections
### Create a collection
### Delete a collection

## Controlled vocabularies
Lookup file for list of countries (with grouping)

## Data deposit
Optional; allows acquisition with tracking.
Should only be implemented in controlled environment (intranet / password protection)
WHite list of authorized files

## Editing access policies

## Enabling HTML Widgets and iFrames

## Log files

## Managing the cache

## Backups






