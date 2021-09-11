# Installation

NADA is a light application. It can be installed on dedicated or shared web servers. Windows or Unix/Linux. Fully open source.

Docker? AWS?

Requires PHP, database for metadata (SQL), MongoDB for data API (optional). SOLR for indexing. Also Google ANalytics and widgets.

Need [Mb] for applications. Then space for content.

## Requirements

### PHP requirements

The minimum required version is PHP 7 with the following PHP extensions enabled:
- xsl
- xml
- mbstring
- mysql

For Microsoft SQL Server, you’ll need sqlsrv extension for PHP.

See section on PHP configurations for configuring your server for NADA.

### Web server requirements

Apache 2.4 or later
IIS 6/7.x or later
NGINX

### Supported databases

MySQL 5.x
Microsoft SQL Server with fulltext support

For MySQL, NADA supports version below 5.6 (no longer supported by MySQL community) but for better performance use the latest 5.7 or MySQL 8.

## Installation

### Download the application

Download the latest version of NADA.

NADA source code is hosted on Github: http://github.com/ihsn/nada

Visit the release tab and download the latest version zip file. https://github.com/ihsn/nada/releases

Open and extract (unzip) the files to your local hard drive.

### Set up application folder

Copy the files to a folder in the web server root folder. If installing on a localhost - for example the computer currently being working on – then copy and paste (or move) the files into the root folder (or a sub-folder) of the web server. If, however, the server is running on a remote host (such as an ISP), then this process will involve the use of a FTP client program or file manager from the ISP’s Cpanel.

>NOTE: The folder name chosen will in many cases become the URL for the catalog. Examples for a folder name might be – data, microdata, catalog etc.

The root folder is located in different places depending upon the operating system/distribution and web server package you are using and it might be called htdocs, httpd, or www. On Windows servers this might be located in the inetpub directory and on Linux in the /var/www/html directory. Consult the documentation for the operating system being used or contact the ISP if unsure where the root web folder is.

### Set folders permissions
Change the permissions for the following folders and their contents to READ/WRITE and on Windows servers make sure the IUSR_ user has read/write/delete permissions on these folders:

your-nada-web-folder/datafiles – this is the folder where the application will store the DDI‘s, documentation and data.

>NOTE: For added security, it is strongly recommended that the location of the datafiles directory be changed after installation to a location outside your web root structure.

your-nada-web-folder/cache – this is where cached web pages will be stored
your-nada-web-folder/logs – this is where the log files will be stored

### Configure MySQL database

1. Browse to the your-nada-web-folder/application/config folder.

![](/Images/installation_configure_MySQL_database_php.png)


2. Open the database.php file in a text editor like Notepad or Notepad ++, and change the database user name and password to match the database user name and password.

3. Optional: change the database name to use another name.

4. Save the file.

```
$db['default']['username'] = "your-database-username";
$db['default']['password'] = "your-database-password";
$db['default']['database'] = "nada4"
```

>NOTE: Do NOT use the root username and password (MySQL) or SA Account (MSSQL) on your production server. Create a separate user name and password for your NADA database. This can be done either from your Cpanel or from PhpMyadmin, MySQL Workbench.

### Create database user account

The goal being to avoid using Root for your NADA configuration.

From the command line type:

```
mysql -u root –p
```

Enter your root password you setup when installing MySQL.

Now create a database for the NADA – in this example we call the database nada

```
mysql> CREATE DATABASE nada;
```

Now create a user who can access the new nada database and give the user only the rights necessary to run the NADA.

```
mysql> GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES,LOCK TABLES ON nada.* TO 'nada'@'localhost' IDENTIFIED BY 'yourpassword';
```

`yourpassword` can be anything you choose. ‘nada’ is the name of the database the user gets access to. ‘localhost’ is the location which gets access to your database.

>NOTE: Remember this password, you will need it to configure your NADA installer!

Then exit MySQL console by typing exit.

```
mysql> exit
```

### Running the installer

Open web browser to the location of the NADA installation. For example: http://your-domain/nada-folder-name, or localhost/nada-folder-name.

![NADA installer](/images/installation_running_the_installer.png)
Check that all settings are marked with a green tick and fix any that are not on your webserver before running the installer.

Click on the Install Database button and complete the form to create an initial Site Administrator account.

>NOTE: create a complex password at least 12 characters long with some uppercase, punctuation and numbers to aid security of your site. Do not forget this username and password!

![NADA installer](/images/installation_NADA_installer.png)

Congratulations: Launch the new site.

![NADA installer](/images/installation_NADA_installation_complete.png)


## Installation with Microsoft SQL Server

### PHP database drivers (sqlsrv)

The new Microsoft SQL drivers for PHP are called SQLSRV and provide native support for connecting to a Microsoft SQL Server database.

The drivers are available for download from here: http://www.microsoft.com/en-us/download/details.aspx?id=20098

### NADA Microsoft SQL Requirements

To use Microsoft SQL Server database for NADA, it is recommended to use SQL Server 2012, or later, with Full-Text support enabled. The full-text engine provides faster search than the normal SQL search.

The default installation of SQL Server does not include the Full-Text engine, so before continuing on to installing NADA, please make sure you have full-text installed on your database server.

To check whether you have FULLTEXT service installed and enabled on your instance of database, run this:

```
select FULLTEXTSERVICEPROPERTY('ISFULLTEXTINSTALLED');
```

The above statement should return a value ‘0’ or ‘1’. ‘1’ means FULLTEXT is installed.

### Download drivers

Microsoft provides different versions of the SQLSRV drivers e.g. version 2.0, 3.0, 4.0. Please download the drivers that correspond to the version of PHP you have installed.

### The Microsoft SQL Client

Microsoft SQL Client is required for connecting to your SQL database using NADA. The client is installed automatically if your database is hosted on the same machine as your web server. If your SQL database is running on a different machine then you must install the latest version of the SQL Client on your web server to ensure NADA can connect to your database. See section on installing Microsoft SQL Client.

### How to install the SQLSRV driver for PHP

>NOTE: The steps are for version 2.0 but the same applies to any version of the drivers.

The drivers are available from the Microsoft website: http://www.microsoft.com/downloads/en/details.aspx?FamilyID=80e44913-24b4-4113-8807-caae6cf2ca05

Download the drivers and run the setup file.

The setup file will extract a number of .dll files to your PHP extension folder.

Browse to the PHP extension folder E.g. c:phpext. Notice there are multiple dll files included all referencing _sqlsrv.

_images/multiple-php-dll.png
To find out which driver library is suitable for your version of PHP, create a php file using a text editor like Notepad e.g. info.php and place this code inside it:

```
<?php phpinfo(); ?>
```

Save the file and copy it to your web server root folder. Open your web browser and type the location and name of the file e.g. info.php into your browser URL. The phpinfo() function prints your PHP version and other configuration settings for PHP. For Example: localhost/info.php. To select the right sqlsrv DLL, you’ll need to know:

- The version of PHP. E.g. 5.3
- Which compiler is used e.g. either VC9 or VC6

Check whether Thread Safety is enabled or not.

_images/php-compiler-thread.png

With the above values you would choose the file:

```
php_sqlsrv_53_nts_vc9.dll

ts=Thread safety
nts=Non-thread safety

```

Once you know which dll file to use, open the php.ini file using a text editor and add the following entry at the end of your PHP.INI file.

```
extension=php_sqlsrv_53_nts_vc9.dll
```

Save your php.ini file and restart your web server.

### Testing the SQLSRV drivers and SQL Client

To make sure the driver/extension is installed correctly. Reload the phpinfo page and check if the extension SQLSRV is listed on the page.

_images/sqlsrv-extention-test.png

If the extension is not listed on the page, recheck if the correct php.ini file has been edited. To locate the php.ini file being used by PHP look at the output of the phpinfo page in the section shown below.

_images/php-ini-path.png

This step is only required if SQL Server is not on the same server as your web server. To check if the SQL Client is already installed or not, follow the steps below:

Open Control Panel, Administrative Tools on your server
Open ODBC and switch to the tab “Drivers”

_images/odbc-data-source.png

### Download the Microsoft SQL Client

>NOTE: The instructions here are provided for Microsoft SQL Server 2008, if are running on a later version of Microsoft SQL Server, the latest drivers can be obtained from the Microsoft website. The installation steps are the same.

The SQL Client is available from the Microsoft website from here: http://www.microsoft.com/en-us/download/details.aspx?id=16978

Download the appropriate package for the system being used i.e. (32bit/64bit) and run the installer to install the client.

Once the client is installed, restart your computer and check again from ODBC above to confirm that the client has been installed.

### NADA Database configurations for SQLSRV
Create a database and the user account to use with NADA beforehand. The permissions need to include - create/alter tables, indexes. ( See the following reference from Microsoft for instructions on how to do this.

Database - http://msdn.microsoft.com/en-us/library/ms186312.aspx
User - http://msdn.microsoft.com/en-us/library/aa337545.aspx
Open the nada database configuration file /your-nada-folder/application/config/database.php file and look for the following lines:

```
$db['sqlsrv']['hostname'] = "localhost\sqlexpress";
$db['sqlsrv']['username'] = "db-user-name";
$db['sqlsrv']['password'] = "password";
$db['sqlsrv']['database'] = "nada-database";
$db['sqlsrv']['dbdriver'] = "sqlsrv";
$db['sqlsrv']['dbprefix'] = "";
$db['sqlsrv']['pconnect'] = FALSE;
$db['sqlsrv']['db_debug'] = FALSE;
$db['sqlsrv']['cache_on'] = FALSE;
$db['sqlsrv']['cachedir'] = "";
$db['sqlsrv']['char_set'] = "utf8";
$db['sqlsrv']['dbcollat'] = "utf8_general_ci";
```

Fill in the database connection settings for the database created for NADA.

Save the changes.

### Running the installer

Open a web browser to the location of the NADA installation. For example:http://your-domain/nada-folder-name, or localhost/nada-folder-name.
If the Microsoft database connection is setup correctly, you should see the nada installer.
_images/nada-installer.png
Check that all settings are marked with a green tick and fix any that are not on your webserver before running the installer.
Click on the Install Database button and complete the form to create an initial Site Administrator account.

>NOTE: Create a complex password of atleast 12 characters long with some uppercase, punctuation and numbers to aid security of your site. Do not forget this username and password!

_images/admin-account-image.png
Congratulations: Launch the new site

## Activating the SOLR indexing

Optional
Advantages:
Requirements and installation

## MongoDB for data store


## PHP settings

### Finding the correct PHP.INI

To make sure you are editing the correct PHP.INI settings file, create a PHP file (e.g. info.php) in your nada website folder with the following contents:

```
<?php phpinfo(); ?>
```

Open the phpinfo page in your web browser and you should see output similar to below screenshot. Edit the php.ini file displayed by the setting Loaded Configuration File.

_images/phpinfo.png

### File upload limits

By default PHP allows uploads of 2MB which could be a problem if you have large DDIs and external resource files. To change the settings:

Edit the php.ini file in notepad and look for the setting upload_max_filesize

The line should look like:

```
; Maximum allowed size for uploaded files.
; http://php.net/upload-max-filesize
upload_max_filesize = 2M
```

Change it to the required file upload limit per your needs

```
upload_max_filesize = 50M
```

There is another setting that MUST be changed as well for the file upload limits to work. Look for the configuration post_max_size and change it to match the value for upload_max_filesize:

```
post_max_size = 50M
```

### TimeZone settings

This is for setting the timezone for your application. To findout what is the correct timezone for your website, go to http://php.net/manual/en/timezones.php and find your country/city.

Example:

```
date.timezone = "America/New_York"
```

### Increase page execution/timeout

This setting controls the maximum execution time of a page in seconds.

```
max_execution_time = 300
```


### Increase PHP memory limit

It controls the memory available to PHP scripts.

```
memory_limit = 128M
```

### Enable/disable PHP extensions

NADA requires the following PHP extensions:

- xsl
- mbstring
- mysql or sqlsrv

To enable XSL extension, add this line:

```
extension=php_xsl.dll
```

To enable mbstring:

```
extension=php_mbstring.dll
```

## Configure Captcha

NADA includes a built-in image captcha and also the Google Recaptcha v2.

### Using builtin Image Captcha

Edit the configuration file `application/config/captcha.php`.
Change the config option on line 12 to image_captcha.

_images/captcha_options.png

Save the file.

To test, go to the login page and click on the Register link and you should see the Recaptcha visible at the bottom of the User Registration form.

### Using Google Recpatcha v2

To use Google Captcha please follow the steps given below:

To use the Google Recaptcha, you’ll need to generate the public/private keys using the google recaptcha website.
Visit the Google Recaptcha website - https://www.google.com/recaptcha

Login to the website, or sign up.

Once you have logged in, go to the Admin console to Register a new site or visit https://www.google.com/recaptcha/admin/create

_images/create_google_captcha.png

Provide a Label.

For ReCaptcha type, choose reCaptcha v2 > “I’m not a robot” Checkbox option.
Submit the form, which will open a confirmation page with the Site Key and Secret Key. We will need the keys to be added to the NADA configurations for ReCaptcha.

Edit the NADA configuration file application/config/captcha.php.

Change the config option on line 12 to recaptcha.

Copy Site key and Secret key from Google ReCaptcha page and inserte it on line number 51 and 52 respectively as shown in below image

_images/pp_key.png

To verify Recpatcha, visit the user registration page in NADA and verify that you can see the reCaptcha similar to the screenshot below.

## Email configurations

For the NADA to function correctly it is important that this step be completed.

Many of the functions within the NADA – such as registration and applying for access to datasets require that the NADA be able to send emails to users.

There are two ways to setup your email configurations. 1) Create a email.php file in the application/config folder 2) Edit email settings on the site configurations page.

1. Configure email via email config file

Open the file `application/config/email.php` in notepad
Fill in the section using SMTP server with authentication enabled highlighted in below image

_images/smtp-config.png

For Gmail user will have to fill the gmail smtp section shown as below

_images/gmail-email-config.png

Save file

>NOTE: Using a file for email configuration disable the email configuration page from the site administration.

Login to your NADA as an administrator
Go to Site administration, click on the Settings menu and choose “Settings”
Find the section “SMTP settings”

_images/smtp-settings.png

If the PHP/web server is configured to send email using PHP’s MAIL function, select the first option and don’t fill in anything else.

If your organization has a mail server and has have a dedicated account that can be setup for NADA, use the following settings: Check the radio button “Use SMTP Server”

Enter the host name for the server

Enter the port used by the server to send mail

If required, enter the user name used to send mail on the server

Enter the password used to send mail on the server

If the organization does not own a mail server, a Gmail account can be configured to be used with NADA.

Check the radio button “Use SMTP Server”
Host name: ssl://smtp.googlemail.com or ssl://smtp.gmail.com
SMTP port: 465
Account username: email-address@gmail.com
Account password: password for the gmail account
Test the email settings

The quickest way to test if the email settings are working is to use the “forgot password” option from the user login page.

Click on forgot password

_images/forgot-password.png

Enter the administrator or any other accounts email address.
Check to the email account the mail was sent to.
If no mail is received the settings are wrong and need to be corrected.

## Tracking website trafic using Google Analytics

NADA provides basic website traffic tracking for study pages and downloads. The reports for site visits are available under site administration > reports > Study downloads.

Using Google Analytics
1. Sign up for Google analytics
You will need to sign up for an Analytics account (free), visit: http://www.google.com/analytics

2. Create a Google Analytics tracking ID for your website
The Tracking ID will have the format UA-XXXXXXXX-X. You will need to copy the tracking code (will look something like below) and add to your NADA theme.

```
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-15191223-3');
</script>
```

3. Adding the tracking code to your NADA
You will need to findout the theme used by your NADA catalog. To do so, Open the file /application/config/template.php and look for the setting theme_name, see example below:

$template['theme_name']='wb';
The configuration setting theme_name points to the folder inside the themes folder in NADA. Locate the theme under the themes folder, and open the layout.php file in any text editor such as notepad or notepad++.

Paste the Google site tracking code just before the closing </head> tag and save the file.

4. Verify the tracking is working
To verify your tracking code is working, visit the pages on the NADA catalog and then go to Google Analytics to see if you can see any traffic under the Real Time reports.

5. Tracking file downloads
To track file downloads such as the data files or external resources. You will need to edit the layout.php file for your NADA theme and add the following code right after the Google Analytics code you had added before.

```
$(function() {
    $(document).ajaxSend(function(event, request, settings) {
        _gaq.push(['_trackPageview', settings.url]);
    });

    //track file downloads
    $('.resources .download').on('click', function() {
        _gaq.push(['_trackEvent', 'Downloads', $(this).attr("title"), $(this).attr("href")]);
    });

});
```

To view the downloads, see the Events page under BEHAVIOR.

## Upgrades

### Upgrade from NADA 4.4 to NADA 5.0
Linking data files
Update study metadata
Updating the Site theme/template

### Upgrade from NADA 4.3 to 4.4
1. Apply patch to upgrade
Upgrade from NADA 4.2 to 4.3
1. Apply patch to upgrade
2. Update Theme/template

### Upgrade from NADA 4.x to 4.2

### Upgrade from NADA 3
Linking your NADA 3 data files to NADA 4
Refresh DDI
Transferring ownership
Updating the Site theme/template

### Migrate MySQL to Microsoft SQL

## Customizations

### CSS style

How to edit?
What happens when you upgrade NADA?

## Translation

NADA catalog can be translated.
Also from English to English (to change some labels)
Translations should be shared...

## Multilingual catalog

Operating a multilingual catalog

## Security 

Following security measures are in NADA: ...
You should scan before launching.
Important to test security in your specific environment.

