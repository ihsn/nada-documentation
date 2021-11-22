# Site Settings

All settings for the application are controlled via the Settings menu at the top of the Site Administration page. There are seven main settings sections: See screenshot below.

![](~@imageBase/images/site-configuration.png)

## General Settings

![](~@imageBase/images/general-site-settings.png)

A.	Type the Title of the site here: This will become the front page title of the NADA site. In this case the Title is NADA

![](~@imageBase/images/nada-title.png)
 
B.	The footer text can be changed in this field. This displays at the bottom of your site page.

![](~@imageBase/images/nada-footer.png)

C.	The initial page that loads when a user visits the NADA site can be set here. In this case the catalog page is set to open by default. 

D.	The name of the webmaster can be set here. This is the name that will be used in system emails sent to users.

E.	Enter the webmaster email address here. This should be the address that will be used in communication with users. Typically this is a general enquiries email set up by the organization and not a personal email address for a particular person. Note: to avoid mail systems rejecting mail as spam make sure to enter an address here that is on the same domain as the server used in the email settings at setup. 

F.	This field sets the location of the Cache folder. The cache folder stores pre- generated pages of the site to allow for faster browsing by the user. By default it is set to ./cache. This can be moved to another location if desired but must be writable. The green tick indicates that the folder can be found and is set up correctly. Enter either relative or absolute paths to the folder location.

G.	Set the time that the Cache takes to expire. By default it is set to 2 hours (in milli seconds).

H.	If it is desired to turn off caching then select no here. Sometimes it is useful to turn off caching when developing or updating a site so as to ensure that content changes become immediately visible on the front-end without having to wait for the cache to expire and the new changes to show. Turn this back on to speed up page loading for users.

Click update to save all settings.


### Language

To change the language of the application expand the language section and choose the desired language. Click update to save and apply the setting.

![](~@imageBase/images/language-configuration.png)
 
### Enable or disable the HTML editor

A basic HTML editor is provided in the menu and page creating section of the application. This setting allows this to be turned on or off.

![](~@imageBase/images/html-setting.png)

### Survey catalog settings

![](~@imageBase/images/survey-catalog-details.png

A.	This is the folder where the files for the study are stored on the server. This includes the DDI, eternal resources and data files. This folder can be moved to a location outside the web root as described in the installation instructions in Chapter 1. Enter either relative or absolute paths to the folder location.

B.	This is the folder where DDI’s can be placed in order to use the bulk study import function in the NADA. In NADA3 files had to be physically copied to this folder on the server, but this is no longer necessary in NADA 4. Files can now be directly uploaded to this folder from the Site Administration – Manage Studies page page.

C.	Select the vocabulary to use for the topic filter. By default this is set to the CESSDA classification as recommended in the IHSN templates supplied at IHSN.org for the Nesstar Metadata Publisher.

D.	Enable or disable the Country filter on the user interface search page here. If the catalog only contains studies for one country then turning this filter off is recommended.

E.	Enable or disable the Topic filter on the user interface search page here. If no topics have been defined in the DDI’s being uploaded then it is recommended to turn this filter off (disable).

F.	Enable or disable the Year filter on the user interface search page here.

G.	Enable or disable the Collection filter on the user interface search page here. If no collections have been defined then it is recommended to disable this filter.

H.	Enable or disable the Data access filter on the user interface search page here. This filter is not needed if there are very few studies in the catalog or if all studies hare set to the same access type.

I.	This section controls the order in which the filters appear on the search page. Enter numbers here that rank the order of the filters in the order they should be displayed.

J.	This setting determines how many studies are displayed by default to the user on the search page – catalog view.


## Site Login settings

![](~@imageBase/images/site-login.png)

A.	To require that users login before being able to access the website set this option to Requires all users to login to access the website.

B.	Determined how long a user will stay logged in. After this time the user will be automatically logged out.

C.	Sets the minimum length for passwords created by the users at registration or for manual user creation.



## SMTP Settings

![](~@imageBase/images/smtp-settings-example.png)

A.	If the PHP/web server is configured to send email using PHP’s MAIL function, select the first option and don’t fill in anything else.

If your organization has a mail server and has have a dedicated account that can be setup for NADA, use the following settings: Check the radio button “Use SMTP Server”

B.	Enter the host name for the server

C.	Enter the port used by the server to send mail

D.	If required, enter the user name used to send mail on the server

E.	Enter the password used to send mail on the server

:::tip
If the organization does not own a mail server, a Gmail account can be configured to be used with NADA.
:::

* Check the radio button “Use SMTP Server”
* Host name:  ssl://smtp.googlemail.com or ssl://smtp.gmail.com
* SMTP port: 465
* Account username: email-address@gmail.com
* Account password: password for the gmail account

F. Test the email settings

The quickest way to test if the email settings are working is to use the “forgot password” option from the user login page. If no mail is received when doing this test then go back and correct the mail settings. Check with the ISP or server administrator for the correct settings.

*Click on update to save all settings

