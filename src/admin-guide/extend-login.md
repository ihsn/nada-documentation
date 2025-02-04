# Extend Login

This page covers various options available to customize the login system.

## Customize login, logout and register pages 
To customize the pages, create a copy of the folder `application/views/auth` to `application/third_party/views/auth`. The `third_party` folder is used so your changes are not overwritten when upgrading your nada to newer versions.

**login page**

To change the login page with styles or formatting, you can edit the template file from the **third_party** folder `application/third_party/views/auth/login.php`. 

The templates for other pages are:

- user registration - `auth/create_user.php`
- forgot password - `auth/forgot_password.php`
- user profile - `auth/profile_view.php`

## Replace Login with Azure
You can replace the default login with Azure based authentication. NADA includes the drivers to use the Azure authentication. To enable Azure authentication:

1. Edit `application/config/auth.php` file. Make sure, the `AzureAuth` is list under `authentication_drivers`:

```php

$config['authentication_drivers'] = array(
    'DefaultAuth'   => 'application/libraries/Auth/DefaultAuth.php',
    'SsoAuth'       => 'application/libraries/Auth/SsoAuth.php',
    'AzureAuth'     => 'application/libraries/Auth/AzureAuth.php'        
);

```

2.  Switch authentication: To use the Azure authentication, change the value for `authentication_driver`:

```php
$config['authentication_driver'] = 'DefaultAuth';
```

Change the value to:

```php
$config['authentication_driver'] = 'AzureAuth';
```

3. Set Azure `client_id` and `tenant_id`: Update the config file and fill in the values. You only need to change client_id and tenant_id.

```php

$config['azure_auth']['client_id']='';
$config['azure_auth']['tenant_id']='';
$config['azure_auth']['authorize_endpoint']='https://login.microsoftonline.com/'.$config['azure_auth']['tenant_id'].'/oauth2/authorize';
$config['azure_auth']['token_endpoint'] = 'https://login.microsoftonline.com/'.$config['azure_auth']['tenant_id'].'/oauth2/token';
$config['azure_auth']['logout_endpoint'] = 'https://login.microsoftonline.com/'.$config['azure_auth']['tenant_id'].'/oauth2/logout';

```

4. Save the file


## Replace login with your custom solution

You can extend or replace login with your own custom solution by creating a new authentication driver. 

1. Create new driver class: Start by duplicating the default authentication class `application/libraries/Auth/DefaultAuth.php` to your own custom class e.g. `application/libraries/Auth/CustomAuth.php`

2. Register your custom driver: Edit `application/config/auth.php` and add your custom auth driver

```php

$config['authentication_drivers'] = array(
    'DefaultAuth'   => 'application/libraries/Auth/DefaultAuth.php',
    'SsoAuth'       => 'application/libraries/Auth/SsoAuth.php',
    'AzureAuth'     => 'application/libraries/Auth/AzureAuth.php',
    'CustomAuth'    => 'application/libraries/Auth/CustomAuth.php'
);

```

3. Activate your custom driver: Edit the config file and change the `authentication_driver` value to your custom driver e.g. `CustomAuth'

```php
$config['authentication_driver'] = 'DefaultAuth';
```
Change to:

```php
$config['authentication_driver'] = 'CustomAuth';
```

4. The driver class file `application/libraries/Auth/CustomAuth.php` can be used to override/replace the login, logout, register and other endpoints to handle the changes for new custom solution.

   
