# Upgrade from 4.x to 4.2

The patch includes a subset of files changed from version 4.x to 4.2. Download the patch - Download the patch [http://www.ihsn.org/download/nada42.1-patch-APR-24-2014.zip](http://www.ihsn.org/download/nada42.1-patch-APR-24-2014.zip)


To apply the patch, follow the steps:

1. Make a backup of your existing NADA folders. If complete backup is not possible, at least back the `Application` and `Themes` folder

2. Unzip the files in the NADA root folder to replace existing files

3. Set write permissions on the language folder located at `/application/language`. This is needed for the upgrade script to update language files with new translations.

4. Run the upgrade script from `http://[nada-url]/index.php/nada42_upgrade/run`


:::tip Note
The patch does not overwrite the settings for database, config and template configurations.
:::
