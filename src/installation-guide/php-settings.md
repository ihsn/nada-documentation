# PHP settings

## Finding the correct PHP.INI

To make sure you are editing the correct PHP.INI settings file, create a PHP file (e.g. info.php) in your nada website folder with the following contents:

```php
<?php phpinfo(); ?>
```

Open the phpinfo page in your web browser and you should see output similar to below screenshot. Edit the php.ini file displayed by the setting **Loaded Configuration File**.

![NADA installer](~@imageBase/images/php-info.png)



## File upload limits

By default PHP allows uploads of 2MB which could be a problem if you have large files that you want to upload. To change the settings:

1. Edit the `php.ini` file in notepad/notepad++ and look for the setting **upload_max_filesize**

2. The line should look like: 

```php
; Maximum allowed size for uploaded files.
; http://php.net/upload-max-filesize

upload_max_filesize = 2M
```

3. Change it to the required file upload limit per your needs

```php
upload_max_filesize = 800M
```

4. There is another setting that MUST be changed as well for the file upload limits to work. Look for the configuration **post_max_size** and change it to match the value for upload_max_filesize:

```php
post_max_size = 800M
```

## TimeZone settings

This is for setting the timezone for your application. To findout what is the correct timezone for your website, go to http://php.net/manual/en/timezones.php and find your country/city. 

Example::

```php
date.timezone = "America/New_York"
```


## Increase page execution/timeout
This setting controls the maximum execution time of a page in seconds.

```php
max_execution_time = 300
```


## Increase PHP memory limit

It controls the memory available to PHP scripts.

```php
memory_limit = 128M
```


## Enable PHP extensions

NADA requires the following PHP extensions:

* xsl
* mbstring
* mysqli
* sqlsrv - only if you are using Microsoft SQL Server, see page [Installation with SQL Server](installation-guide/installation-sqlsrv)

To enable XSL extension, add this line:

```php
extension=php_xsl.dll
```

To enable mbstring:

```php
extension=php_mbstring.dll
```








