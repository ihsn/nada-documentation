# Backup and Restore

## Backup
To backup NADA, you need to backup the database and NADA application directory separately.

### Backup NADA Database
Depeding on your database type, follow the steps below to create a backup.

* Backup and restore MySQL database
* Backup and restore Microsoft SQL Server database


### Backup and restore MYSQL database
Depending on your hosting envoriment, you can backup and restore a MYSQL database using the following methods:

* Command line tools mysqldump and mysqlimport
* MySQLWorkBench GUI
* PHPMYADMIN


#### a) Backup and restore using MySQL via command line

MySQL provides a command line tool called MYSQLDUMP. This should be included with your installation of MYSQL.

**Steps to use MYSQLDUMP:**

i) Depending on your operating system, open the command line or shell terminal. For Windows, open the command window "cmd.exe" or "Command Prompt" from the start menu.

ii) Run the following command to backup the database:

```bash        
mysqldump -u dbuser -p [db_name] > [dumpfilename.sql]
```
- **-u** - is the user name for the database 
- **-p** - enter the password or leave it empty to enter password in interactive mode
- **[db_name]** - put the nada database name
- **[dumpfilename.sql]** - enter the output file name

    
    
Example: Exports the database **nada4** into a file **nada4.sql**
        
```
mysqldump -u root -p nada4 > nada4.sql
```

:::tip Note
For more information about using the command, see: https://dev.mysql.com/doc/refman/5.6/en/mysqldump.html
:::
    

**Steps to restore a database backup using MYSQLIMPORT**

i) From the command line, run the command:

```
mysqlimport -u [user name] -p[password] [db_name] [db_backup.sql]
```

- **-u** - is the user name for the database
- **-p** - enter the password or leave it empty to enter password in interactive mode
- **[db_name]** - database name where the backup will be restored to
- **[db_backup.sql]** - enter the backup file name
    
:::tip Note::    
For more information about using the tool, read: http://dev.mysql.com/doc/refman/5.6/en/mysqlimport.html
:::    


    

#### b) Backup database using MySQLWorkBench
MySQLWorkBench (https://www.mysql.com/products/workbench/) is a free tool available for various operating systems and provides a visual tool for database administration. To download the software, visit:
https://www.mysql.com/products/workbench/

**To backup using MySQLWorkBench, follow the steps:**

i) Launch the MySQL WorkBench application
ii) On launching the application for first time, you will need to setup a "New Server Instance". This is needed to setup a connection to the database to run queries and backup/restore databases.

![](/images/mysql-workbench.png)


**Steps to Create New Server Instance:**

i) Select New Server Instance option within Server Administrator.
ii) Provide connection details such as the database server host name, user name, password to access the database.
iii) Test the database connection and save it as new instance.
iv) Double click on Server instance you have created OR Click on Manage Import/Export option and Select Server Instance.
v) Under "Server Administration", you have the options to import and export database.
vi) To backup an existing database:

![](/images/mysql-workbench-export.png)


Select "Data Export" under DATA EXPORT/RESTORE. Select the database for export and then pick the option at the bottom "Export to Self-Contained File", take note of the file path as this is where the backup file will be created. Now click on the "Start Export" button to export the database.

**Restore a database using MySQLWorkBench**

To restore the database, use the menu option "Data Import/Restore" under the DATA EXPORT/RESTORE. The steps to import are:

i) Click on the option "Import from Self-Contained File" and then provide the path to the backup file (.sql).
ii) Default target Schema option: You can either leave it empty or fill in with the name of the database where you want the backup to be restored. If you provide a name of an existing database, the backup will overwrite the existing database.