# Managing users

![](~@imageBase/images/image178.png)

## Types of user accounts

When the NADA software is first installed a **Site administrator** account will be created as part of the installation process.

Three types of user accounts are possible in NADA: (i) Site administrator; and (ii) Regular user; (iii) Administrator with specific roles

**Regular user** - A regular user who registers on a NADA site from the user interface. This user type has no access to the site administration. It is required to register as a user before being granted access to public use and licensed data types.

**Site administrator (unlimited**) - A user who has access to all functions and all collections within the site administration (system wide access).

**Administrator with specific (limited) roles** - A user who has a limited set of administrator roles assigned to her/him. For example, to manage licensed requests or manage collections. Unlike Site administrators, these users are limited to administering only particular parts of the NADA catalog and the Administrator web interface.

## User roles

Often organizations will not want to assign full administrative rights to all members of staff managing a catalog. It may be desirable to only assign roles to administrative users based on a limited set of responsibilities they may have in maintaining the catalog. NADA allows granular roles to be assigned to administrator user accounts. For example, some administrators can be limited to managing licensed requests but would not be able to manage user accounts or create collections. Other administrators would be limited to metadata reviewer roles, etc.

## Creating user accounts

A.  **Regular user accounts** can be created in two ways: (i) by registering an account through the account login page from the  **User interface** of the application or (ii) by an administrator through the *User management* section of the Administrator web interface.

(i) A **Regular user** account can be created by a site visitor directly from the *register* screen from the login link on the user interface of the application.

![](~@imageBase/images/image179.png)

![](~@imageBase/images/image180.png)

The **regular user** created by this process ***has no access to the site administration.*** This account can only be used to apply and gain access to public and licensed datasets.

(ii) **Regular user** accounts can also be created by an **administrator** from the **Users** menu in the **Administrator web interface**.

B.  **Administrator accounts** can only be created/ modified/deleted/ by an **administrator** from the **Users** menu in the **Administrator web interface**.

User accounts can be viewed, created, modified, and deleted from the Administrator web interface through the ***All users*** menu item in the top menu bar ***once logged in as an administrator***.

![](~@imageBase/images/image178.png)

The **User management** interface displays all accounts listed in the catalog in a tabular format.

![](~@imageBase/images/image181.png)

To create a new user from the administrator view, either (i) select the **Add user** option in **Users** menu, or (ii) click on the **Create new user account** button in **User management** interface. Both methods will take the administrator to the account creation form.

![](~@imageBase/images/image178.png)

![](~@imageBase/images/image182.png)

![](~@imageBase/images/image183.png)

Administrators can also **Edit** and **Delete** accounts. This is done from the ***Actions*** column in the *User Management* section.

![](~@imageBase/images/image184.png)

## Defining roles

### Creating and assigning user roles

Often organizations will not want to assign full administrative rights to all members of staff managing the catalog. It is may be desirable to only assign roles to administrative users based on a limited set of responsibilities they may have in maintaining the catalog. The NADA allows granular roles to be assigned to administrator user accounts. For example, some administrators can be limited to managing licensed requests but would not be able to manage user accounts or create collections. Other administrators might be limited to metadata reviewer roles etc.

#### Creating a user role

**A role needs to be defined before it can be assigned to a User.**

A.  To create a user role, click on the ***User Roles*** button in the top right of the **User Management** screen.

![](~@imageBase/images/image185.png)

B.  In the ***Create a new role box*** enter a role name (label) and a short description for the role. Then click the **Create a new role button**.

The new role will be created and listed in the **Manage roles** table.

![](~@imageBase/images/image186.png)

C.  Next the permissions for the new role need to be defined. To set the permissions click on the ***Permissions*** link next to the role you wish to assign permissions to.

![](~@imageBase/images/image187.png)

D.  Select the set of permissions you wish to assign and then click the ***Submit*** button at the bottom of the screen.

![](~@imageBase/images/image188.png)

The following permissions/roles can be assigned:

-   Site Administration -- View
-   Site menu pages -- View, Create, Edit, Delete
-   Citations -- View, Create, Edit, Delete
-   Users -- View, Create, Edit, Delete
-   Licensed Requests -- View, Create, Edit, Delete
-   Manage Collections -- View, Create, Edit, Delete, Publish
-   Manage Studies -- View, Create, Edit, Delete, Publish
-   Reports-- View
-   Site Configurations-- Edit
-   Site Configurations-- Edit
-   Vocabularies-- Edit
-   Country configurations-- Edit
-   Regions-- Edit
-   Site translations -- Edit
-   Permissions by collection-- View, Create, Edit, Delete, Publish

In the example above permissions were assigned that would allow the user to only process licensed requests. The user was assigned permissions to View, Create, Edit, Delete licensed requests.

E.  To edit or delete a role click on the ***Edit, Delete*** links for that role in the **Roles** section

#### Assigning a role to a user

In our example we created a role for a *Licensed dataset reviewer* that would allow the person assigned that role to manage all parts of the Licensed data management system.
To assign that role to the user Peter in the example below we need to edit the information for that user.

A.  Click the ***edit*** button next to the user you want to assign the role to.

![](~@imageBase/images/image189.png)

B.  Select the ***Licensed Request Review*** role at the bottom of the page as well as any other role(s) you want user Peter to fulfill. Then click the **Update** button.

![](~@imageBase/images/image190.png)

![](~@imageBase/images/image191.png)

Note that if a role is deleted, it will not delete user accounts that are associated with the role. The users will just not have access to the deleted role anymore. For example, if a user has the "Licensed reviewer" role, and if we delete the "Licensed reviewer" role from the catalog. The user account won't be deleted, but it loses the Licensed reviewer role.
