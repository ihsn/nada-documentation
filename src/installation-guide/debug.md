# Debugging

By default NADA does not show any errors, warnings. use these settings to enable debug mode to see the errors written to a log file or displayed on the page.

## Enable error display
To show errors on the page (not recommended for `production` environments), edit `index.php` file in the nada root folder and change the environment from `production` to `development`.

Look for this line:

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'production');
```

and change the value to **`development`**:

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');
```

In `development` mode all PHP warnings and errors will be displayed on the page. 


## Enable error logging
To enable error logging, edit the file `application/config/config.php` and look for `error_threshold`. The default value is set to `0`, change that to `1` to enable error logging. 

The files are written to the folder `logs`, make sure the folder is writable by the webserver. For any PHP or database errors, you will see log files in the `logs` folder.


## Enable database debugging

For debugging database related issues, you can enable database debugging by editing the `application/config/database.php` file and change the value for the config option `db_debug` to `TRUE` to see database errors displayed on the page.


## Fixing composer dependencies
NADA uses Composer (package manager) for using third party libraries. The source code includes all vendor libraries and there is no need to manually install/update any libraries. However, if you see any errors related to `vendor/autoload.php` you can try solve them by updating the packages.

### Download composer

```bash
#Download composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

#update/install packages
php composer.phar install
```

:::tip Composer information
To learn more about composer, see https://getcomposer.org/
:::


If the commands fail to update the packages, you can try:

```bash
#remove the folder for vendor files
rm -rf vendor

#run composer to do a fresh install
rm composer.lock
php composer.phar install
```
