# Debugging

By default NADA does not show errors or warnings on the page. Use these settings to log errors or display them while troubleshooting.

::: danger Production
Do not leave `development` mode or on-page database errors enabled on a public production site.
:::

## Enable error display

To show errors on the page, edit `index.php` in the NADA root and set the environment to `development`.

Look for:

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'production');
```

Change the default to **`development`**:

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');
```

In `development` mode, PHP warnings and errors are displayed on the page.

## Enable error logging

Edit `application/config/config.php` and look for `log_threshold`. The default value is often `0`; change it to `1` to enable error logging.

Log files go under the **`logs`** folder — that folder must be writable by the web server (see [Linux](./platform-linux) or [Windows](./platform-windows) permissions steps).

## Enable database debugging

In `application/config/database.php`, set `db_debug` to `TRUE` to show database errors on the page (development only).

## Fixing Composer dependencies

Release packages usually include `vendor/`. If you see errors about `vendor/autoload.php` after a Git install or a partial deploy, reinstall dependencies.

Install Composer from [https://getcomposer.org/download/](https://getcomposer.org/download/), then from the NADA root:

```bash
php composer.phar install
# or: composer install
```

If that fails:

```bash
rm -rf vendor
rm -f composer.lock
php composer.phar install
```

See also [Install with Git](./installation-git).
