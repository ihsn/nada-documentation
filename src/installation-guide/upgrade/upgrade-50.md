# Upgrade from 4.4 to 5.0

For users with an existing NADA 4.x catalog an upgrade script is included that will update your NADA 4.x database to NADA 5. The process will modify your current NADA database.  Please make sure you are running on PHP 7, see section `installation guide` for NADA 5 requirements.

::: tip Important
Backup your NADA database before doing anything!!
:::

1. Make a backup of your NADA database.

2. Download and unzip NADA 5 files to a new folder on your web server. 

3. Copy  **application/config/database.php** file from your existing NADA and place it in the new NADA folder **application/config**.

4. Open the **database.php** and make sure the database debug mode is set to false:

```php
  $db['default']['db_debug'] = FALSE;
```


5. Change the database drivers to **mysqli**:

```php
$db['default']['dbdriver'] = "mysqli";
```


6. Edit the configuration file **application/config/config.php** and enable `maintenance mode` by adding or enabling this line of code:

```php
$config["maintenance_mode"]=1;
```

The line can be added anywhere in the `config.php` file. 


:::danger Warning
This step makes changes to your NADA database that are not undo-able so make sure you do make a database backup before this step.
:::

7. Navigate to the URL for the NADA5 website: Example: http://your-nada5-site/index.php/nada5_upgrade/run

8. The upgrade will update database tables and indexes. For any failed updates, it will show the SQL queries and the error messages. You will need to run the failed queries on your database directly to finish the upgrade. 

9. To verify the database upgrade. Open the NADA catalog page by going to http://[your-nada5-site]/index.php/catalog page and verify all studies from NADA 4 are listed.

10. Edit `application/config/config.php` file and disable `maintenance mode`:

```php
$config["maintenance_mode"]=0;
```


## Linking data files

The upgrade script has only upgraded the database. It is now necessary to tell the NADA where to locate the data files that were uploaded to the original NADA website.

**There are two options available:**

**Option 1:** Copy the datafiles folder from your old NADA to the new NADA. This works best if you have only a few studies and the datafiles folder size is small enough to be moved easily from one location to another.

**Option 2:** If it is not possible to easily move the datafiles folder from your old NADA, you can tell NADA the location of the datafiles without moving the files. Here are the steps:

* Use your old NADA administrator login credentials to login to your new NADA 5 site.

* Click on Site administration in the top right corner of the screen.

* Go to the “Settings” menu and click on the “Settings” sub-menu.

* Under Site configurations, expand the “Survey Catalog Settings” section

![Catalog settings](~@imageBase/images/settings-catalog-storage.png)

* For the setting “Catalog folder”, enter the relative or full path to where the NADA `datafiles` folder is located. For example, if the nada4 datafiles are located on `c:/nada4/datafiles`, enter that path here.

* Save the configurations by clicking on the update button. If now errors are shown then you have successfully updated the folder path.

* Check your new NADA site to make sure the migration was successful

  - Check the `Data Catalog` page and view the studies by clicking on the study title to make sure the study information pages are correct.

  - Check the site menus are the same as your old NADA site.


## Update study metadata

To update the metadata stored in the database for studies, metadata needs to be reloaded from the DDI files. The refresh DDI feature in NADA updates the database with metadata from the DDI without having re-uploading the DDIs. 
To update the metadata for all studies in your catalog:

*	Open the following NADA URL in your browser: `http://[your-nada-5-site]/index.php/admin/catalog/batch_refresh`

*	Select all studies

*	Click on the “Refresh DDI” button

![Batch refresh](~@imageBase/images/admin-batch-refresh.png)


## Updating the Site theme/template

In NADA 5, website templates have been rewritten using Bootstrap 4. You will not be abl to use your old NADA templates. Here are the general guidelines on creating or customizing the template.

*	Themes are stored in the `themes` folder. The default template is named `nada`.

* Duplicate the folder `themes/nada` folder 

* The layout.php file is the main file that controls the template. If you just want to change the site header with your own logo and/or text, edit the file `header.php`. 

*	To use your custom theme, edit the `[nada4-root]/config/template.php` following the steps below:

*	Look for the setting `theme_name`, by default it is set to `nada`:

*	 Change `nada` to the theme name you want to use. Theme name is the folder name you created for your custom theme.

*	Save the file.

:::tip NOTE
See the Bootstrap 4 website for usage and styling - https://getbootstrap.com/ 	
:::