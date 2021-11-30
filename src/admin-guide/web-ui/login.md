# Login

## Using the administrator interface 

A login link is provided at the top-right of the NADA catalog site. This
login will be used by administrators to access the administrator
interface, or by registered users who need to login to request access to
non- public datasets. The administrator interface will only be
accessible to users who have been granted some administrative role in
the catalog (full administrator, collection administrator, reviewer, or
data request approver; the specific administrator privileges are defined
by the full administrator in the "Users" section of the administrator
interface).

![](~@imageBase/images/image49.png)

After login as administrator, the login button will display a menu as
follows.

![](~@imageBase/images/image50.png)

The Site administration link will open the administrator interface
("Dashboard").

The Profile link will display your profile, with an option to edit its
content and to generate your API keys. An API key will be required to
programmatically add, edit, extract, or delete information from the NADA
catalog, using R or Python for example. The privileges that the API key
will provide depend on the permissions you have to administer the
catalog or specific component of it.

API keys, especially those with administrator privileges attached to
them, are like your password and must be kept strictly confidential. If
you have any reason to believe that your key has been compromised,
cancel it immediately, and generate a new key.

![](~@imageBase/images/image51.png)

## Using the API 

The profile can only be edited in the administrator interface.

The equivalent of login when using the API is to provide the URL and
entering your key.

In R:

set_api_key

set_api_url

set_api_verbose

In Python:

Note: restricting the API use to certain IP addresses.