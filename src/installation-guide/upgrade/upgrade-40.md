# Upgrade from 3.x to 4.0

For users with an existing NADA 3.x catalog an upgrade script is included that will update your NADA 3.x database to NADA 4.x. The process involves modifying your NADA 3.x database and thus carries some risks. The script will add new tables to the NADA 3.x database. All user accounts and survey information will be retained by the upgrade.

:::tip Important
Backup the NADA 3.x database before doing anything!!
:::

1. Follow the instructions on page 4 and set up a folder in the web root containing the NADA 4 files.

2. Edit the database.php file as instructed in the section above: NADA database configurations for MySQL.

3. Instead of entering a new database name, user account name and password -fill in the details of the existing NADA 3.x database. 

:::tip Note	
These can be found by looking at the existing NADA 3.x database.php file and entering the settings into the NADA 4 database.php file.
:::
	
![Database settings](/images/nada3-db-settings.png)

4. Save the file.

5. Navigate to the URL for the NADA4 site: Example: http://your-nada-site/nada4/index.php/nada4_upgrade

6. The following page loads:

![Upgrade page](/images/nada3-to-4-upgrade.png)

Take note of the warnings and make any necessary corrections before

clicking the “Upgrade database to NADA 4” button.

:::danger Warning 
This step makes changes to your nada 3 database that are not undo-able so make sure you do make a database backup before this step.
:::

Click on the “Upgrade database to NADA 4” button and wait for the page to
reload. The output of the page will look something like below:

The script will print number of messages about failed table updates. This does
not mean the script failed to upgrade. It just means some of the updates were
not needed on your version of NADA 3. Different versions of NADA have
different numbers of fields in the database and the upgrade script tries to fix
the missing fields for all these different versions of NADA. If the existing
NADA 3 database already has that field then it reports it as an error.

You can ignore the error messages that include the wording “Duplicate
column name” or “Duplicate entry”.

Now your database has been migrated to NADA version 4.1. 