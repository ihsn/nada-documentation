# Upgrade from 4.2 to 4.3

The upgrade includes changes to the theme and will not work with your existing NADA 4.2 theme.

## 1. Apply patch to upgrade

a. Make a backup of your existing NADA folders. If complete backup is not possible, at least backup the "Application" and "Themes" folder
b. Download the patch zip file: http://ihsn.org/download/nada42-to-43-update.zip 
c. Unzip the patch files in the NADA root folder to replace existing files
d. Run this query on the database to add the new "Open data" access type

```sql
INSERT INTO forms VALUES (7,'Open access','open','open','1');
```


## 2. Update Theme/template


:::tip Important
  The default theme has changed in NADA. This is a major change and will break your existing website layout/theme. To upgrade you theme, please follow the steps below:
:::

## 2.1. Website using the default theme "WB":

Edit the **application/config/template.php** and change the default theme name to **"wb2"** instead of **"wb"**


## 2.2. Websites with heavily customized theme

a. Backup your theme folder
b. Make a copy of the **themes/wb2** folder to create a new theme folder
c. Apply all the customizations (header, footer, styles, etc) to your copy of the **wb2 theme**.
d. Update the **application/config/template** to use your new theme.
