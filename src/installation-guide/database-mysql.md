# Configure MySQL / MariaDB

NADA can use **MySQL 8.x** or **MariaDB 10.x+** as its database (same PHP `mysqli` driver and `database.php` pattern). For **Microsoft SQL Server**, see [Install with SQL Server](./installation-sqlsrv) instead.

This page is the shared reference for MySQL/MariaDB. The [Linux](./platform-linux) and [Windows](./platform-windows) guides include these steps in context.

::: tip Recommended
Use **MySQL 8.x** or **MariaDB 10.x+**. MySQL 5.7 and older are not recommended for new installs.
:::

## Create database and user

Connect as an administrator:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE nada CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nada'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER,
  CREATE TEMPORARY TABLES, LOCK TABLES ON nada.* TO 'nada'@'localhost';
FLUSH PRIVILEGES;
exit
```

Use a strong password and store it safely — you need it in `database.php`.

::: tip NOTE
Do **not** use the MySQL/MariaDB `root` user on a production server.
:::

On Windows you can use MySQL Workbench, MariaDB client, or the command line instead of `mysql` in a Linux shell.

## Configure database.php

1. In the NADA application root, open `application/config`.
2. Copy `database-sample.php` to `database.php`.
3. Edit credentials:

| Setting | Meaning |
|---------|---------|
| `hostname` | Database host (often `localhost`) |
| `username` | Database user |
| `password` | Database password |
| `database` | Database name |
| `dbdriver` | `mysqli` for MySQL or MariaDB |

```php
$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => 'nada_user',
	'password' => '<db-pass-here>',
	'database' => 'nada',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => FALSE,
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE,
	'prefix_short_words'=>TRUE
);
```

4. Save the file.

## Next steps

Return to your platform guide to finish permissions, web server, and the installer:

- [Installation (Linux)](./platform-linux)
- [Installation (Windows)](./platform-windows)
