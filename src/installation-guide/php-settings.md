# PHP settings

## Finding the correct php.ini

Create a temporary PHP file (for example `info.php`) in your NADA web folder:

```php
<?php phpinfo(); ?>
```

Open it in the browser and note **Loaded Configuration File**. Edit that `php.ini`, then **delete `info.php`** from the server.

![PHP info](/images/php-info.png)

---

## File upload limits

By default PHP often allows only small uploads (for example 2MB). For large data files, raise both of these together:

```ini
upload_max_filesize = 800M
post_max_size = 800M
```

`post_max_size` must be at least as large as `upload_max_filesize`.

---

## Time zone

Set your site’s time zone ([list of time zones](https://www.php.net/manual/en/timezones.php)):

```ini
date.timezone = "America/New_York"
```

---

## Execution time and memory

```ini
max_execution_time = 300
memory_limit = 128M
```

Increase further if large imports or API jobs time out.

---

## Enable PHP extensions

NADA requires:

- xsl
- xml
- mbstring
- **mysqli** — if using MySQL or MariaDB
- **sqlsrv** — if using Microsoft SQL Server ([Install with SQL Server](./installation-sqlsrv))

Use the extension that matches your database choice (MySQL/MariaDB **or** SQL Server — not both required).

**Minimum PHP version:** 7.4 · **Recommended:** PHP 8.x

### Windows

**Recommended:** use [PHP Manager for IIS](https://www.iis.net/downloads/community/2018/05/php-manager-150-for-iis-10) to register PHP and enable extensions — see [Installation (Windows) — Install PHP](./platform-windows#step-1-install-php-and-register-it-with-iis).

You can also edit `php.ini` directly. Enable extensions with `.dll` names (exact names depend on your PHP build):

```ini
extension=php_xsl.dll
extension=php_mbstring.dll
extension=php_mysqli.dll
```

Restart IIS or recycle the app pool after saving (or use PHP Manager’s refresh). See [Installation (Windows)](./platform-windows).

### Linux

Prefer your distribution’s packages / `phpenmod`, for example:

```bash
sudo apt install php-xsl php-xml php-mbstring php-mysql
# or enable modules if already installed:
sudo phpenmod xsl mbstring mysqli
sudo systemctl restart apache2
```

If you edit `php.ini` directly, module lines typically look like:

```ini
extension=xsl
extension=mbstring
extension=mysqli
```

See [Installation (Linux)](./platform-linux).

---

## Related

- [Installation](./)  
- [Debug](./debug)  
