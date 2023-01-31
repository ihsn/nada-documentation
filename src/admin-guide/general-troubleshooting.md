# Troubleshooting

## Reset admin password

There are two ways to reset Admin password. 

### 1. Forgot password via Email

This requires your NADA catalog to have a working email system. To reset the password, navigate to the login page and click the `Forgot Password` link and provide your email address. NADA will send you a one time login link via email, clicking on the link will log you in without typing any password. Once you are logged-in, you can reset your password.


### 2. Change password via database

You can reset the password by running a query on your NADA database. You can use a database client such as PHPMyAdmin, MySQL WorkBench or any other third party UI tool. Or you can connect to the database using a command line interface (CLI).



**Using CLI:** 

Run the command below to connect to the database.

```bash

mysql -uroot -p

```

Once you are connected to the database, run:

```sql

use your-database-name-here;
update users set password=md5('type-your-new-password') where email='your-email-address';

```
