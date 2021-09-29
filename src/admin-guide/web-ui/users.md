# Managing Users

Users in the NADA can be defined according to three broad groups:

**General Users**– this is the normal user who registers on a NADA site from the user interface. This user type has no access to the site administration. It is required to register as a user before being granted access to public use and licensed data types.

**Site Administrators (unlimited)** – this user has access to all functions and all collections within the Site Administration. System wide access.

**Limited Administrators** – these administrators have access to a limited set of functions within the Site Administration. Examples would be an administrator of a specific collection\s, or licensed survey reviewer for all or only some collections, or report generator, or citation manager etc.
 

## Creating User accounts

**User accounts can be created in two ways:** 

A.	A General User account can be created by a user directly from the register screen from the login link on the user interface of the application.
 
![](/images/register.png) 

The user created by this process has no access to the site administration. This account can only be used to apply and gain access to public and licensed datasets.

B.	A user account can also be created by a Site Administrator. 

* To do this login as a Site Administrator

* Go to the site administration section of the application.

*	Select Users – Add user from the top menu.

![](/images/register.png) 

*	Fill in the information for the user in the form and be sure to mark the account status as Active. Then click the Create button.
 
![](/images/create-new-user.png) 

*	Note that the user always starts off as a General User with no access permissions to the Site Administration. The user group column displays as empty for users with only general user accounts.

*	To see a list of all users in the system go to the Users – All Users menu item at the top of the screen.

![](/images/user-list.png) 

*	Note: the new users created have no User group assigned (they are general users). Also note the Actions column on the far right. From these links an account can be edited (including changing the password and blocking an account), deleted and Permissions managed for the account.  


## Managing User Account Permissions

User accounts permissions can be only be set and changed by a Site Administrator. To change the permissions for an account:

*	Click on the Permissions link next to the account to be changed. All accounts start of as General users accounts
 
![](/images/edit-user-permissions.png) 

*	To change this user to a full site administrator who will have full system wide access to all parts and functions of the NADA administration select the Site administrators (full access) option and tick the admin box as well. Click update to save the changes.
 
![](/images/site-administrator.png) 

## Collection level administrators

*	To create a user who only has permissions to administer studies or administration functions for a particular collection. Select Site administrators (limited access)

![](/images/site-administrator-limited.png) 

*	It is then necessary to assign a role to this new limited administrator account. To create a limited access administrator for a particular collection – select Site administrators (limited access) and then select Collection administrators. Notice: The form expands to reveal a list of collections in the system. 

*	Select the appropriate level of access that this account will have for this collection. In the example below an administrator is being created who can manage only licensed requests for the collection – Health Surveys. This account will not be able to upload or publish studies. The account will only be able to process licensed requests for the collection – Health Surveys.

![](/images/site-administrator-collection-selection.png)

**Other levels of access for Site administrators (limited access) – Collection administrators include:**

A. Accounts that are given full access to manage studies
B. Accounts that are given access to upload studies but not publish them 
C. Accounts that are limited to reviewing studies.
 

## Global level Limited access accounts

**Other types of limited access accounts include:**

A. Accounts that can only view system reports at a global level.
B. Accounts that can only access the citations section and manage citations
C. Accounts that can only access the Licensed Request management system – at the global level for all collections.
 
![](/images/global-level.png)


**Impersonating a user**

The system includes a function that allows a Site Administrator to impersonate (take on the role) a user created in the system. This is a useful testing tool when creating users and assigning permissions. It essentially allows the administrator to take on the role of another user temporarily.

*	To access the Impersonate User feature go to the Users – Impersonat user menu at the top of the screen
 
![](/images/impersonating-user.png)

*	A list of users to impersonate is shown. 

![](/images/listofuser.png)

*	Select the user to impersonate and click on the impersonate button.

*	The dashboard view for the impersonated user now shows

![](/images/impersonating-user-dashboard.png)
 
* Note in the example above the account being impersonated is a Limited Account administrator with rights only to manage licensed requests for the Health Surveys Collection. Note that all other dashboard menus are either hidden or clicking on any other function other than manage studies results in an access denied message. 

*	This is a good way to test if the roles assigned to a user account have the expected results.

*	To exit the impersonate mode and return to the Site Administrator role – Click on the top right menu and select Exit impersonate mode.
 
![](/images/exit-impersonating-mode.png)


## The Reviewer Limited access account

Sometimes it is desirable for catalog administrators to allow certain users to see a collection before it is published but without granting access to the site administration functions. 

This is useful for getting feedback on the correctness of information on collections or studies before publishing.

To do this:

*	First create an account for the user or get the user to create an account by using the register form on the login screen.

*	Then edit the permissions for that user selecting Site Administrator (limited access) – Collection administrator

*	Then for the appropriate collection select Reviewer and  click update to save the changes

![](/images/user-reviewer.png)
 

*	The newly created reviewer account user can now view all studies in a collection even if the study or collection is unpublished. 
