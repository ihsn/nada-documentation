# Clean URLs

Clean URLs are user-friendly and readable web addresses that improve SEO, enhance user experieance and omit unnecessary elements like `index.php` or query strings from the URLs. Follow the steps below to configure your Apache server.


## Update config.php

Open `application/config/config.php` and update the setting:


```
$config['index_page'] = '';
```


## Enable Apache mod_rewrite

```
$ sudo a2enmod rewrite
$ sudo service apache2 restart
```

## Update Apache Configuration

Allow .htaccess overrides by editing Apache’s config:

```
<Directory "/var/www/html/nada">
    AllowOverride All
</Directory>
```


## Create or Edit .htaccess

In your NADA root folder (/nada/), create/edit `.htaccess` file:


```
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # enable line below, if using a sub-folder 
    #RewriteBase /myproject/

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d

    RewriteRule ^(.*)$ index.php/$1 [L]
</IfModule>
```

:::tip Note
Note: For hosting NADA in a subfolder e.g. `https://example.com/nada/`, uncomment the line for RewriteBase and make sure to use the correct subfolder name.
:::