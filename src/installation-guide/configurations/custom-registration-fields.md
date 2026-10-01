# Custom Fields for User Registration

This page covers how to enable optional fields on the public user registration form.

## Overview

By default, the registration form collects first name, last name, email, and password. NADA also supports two optional fields that are stored on the user record but hidden on registration unless you enable them:

| Config key | Database column | Default label (English) | Purpose |
|------------|-----------------|----------------------|---------|
| `company` | `company` | Company | Institution or organization name |
| `country` | `country` | Country | User's country |

When enabled, these fields appear on the registration page and are available elsewhere in NADA — for example on the Admin → Users edit page and in User Statistics reports (where `company` is shown as **Organization**).

::: warning Not the same as public data access fields
Registration fields are configured in `application/config/auth_fields.php`.

Custom fields on **public data access request** forms use a separate file: `application/config/public_request_fields.php`. See [Custom fields for public data access requests](./custom-public-access-fields).

:::

## Configuration file

Edit `application/config/auth_fields.php` on the server. Changes take effect immediately; no database migration is required because the `company` and `country` columns already exist on the `users` table.

### File structure

```php
<?php
$config['auth_fields'] = array(
    'company' => array(
        'enabled' => false,
        'required' => false,
        'validation' => 'required|trim|disable_html_tags|xss_clean|max_length[100]',
        'enum' => array(
            'Institution 1' => 'Institution 1',
            'Institution 2' => 'Institution 2',
            'Institution 3' => 'Institution 3',
        ),
        'display' => 'dropdown',
        'help_text' => 'Institution name',
    ),
    'country' => array(
        'enabled' => false,
        'required' => true,
        'validation' => 'trim|disable_html_tags|xss_clean|max_length[150]|check_user_country_valid',
        'display' => 'dropdown',
    ),
);
```

## Field properties

| Property | Applies to | Description |
|----------|------------|-------------|
| `enabled` | `company`, `country` | Set to `true` to show the field on the registration form |
| `required` | `company`, `country` | When `true`, shows a required-field marker (`*`) on the form label |
| `validation` | `company`, `country` | Validation rules applied on submit. Adjust this string to match whether the field is optional or mandatory |
| `enum` | `company` only | Suggested institution names used for typeahead autocomplete |
| `display` | `company`, `country` | Reserved for future use; the registration form renders `company` as a text field with suggestions and `country` as a dropdown |
| `help_text` | `company` | Descriptive text (not currently shown on the default registration template) |


## Enable the Institution field

Set `enabled` to `true` for the `company` field:

```php
'company' => array(
    'enabled' => true,
    'required' => true,
    'validation' => 'required|trim|disable_html_tags|xss_clean|max_length[100]',
    'enum' => array(
        'Ministry of Finance' => 'Ministry of Finance',
        'National Statistics Office' => 'National Statistics Office',
        'University of Example' => 'University of Example',
    ),
    'display' => 'dropdown',
    'help_text' => 'Institution name',
),
```

### Institution suggestions (`enum`)

When `company` is enabled, the registration form shows a text input with typeahead suggestions populated from the `enum` array. Users can pick a suggested name or type their own value. Replace the placeholder entries with your organization's approved institution list.

The field label comes from the site translation for `company` (English default: **Company**). To display **Institution** instead, update the translation — for example in `application/language/english/users_lang.php` — or customize the registration template. See [Extend login](/admin-guide/extend-login).

## Enable the Country field

Set `enabled` to `true` for the `country` field:

```php
'country' => array(
    'enabled' => true,
    'required' => true,
    'validation' => 'trim|disable_html_tags|xss_clean|max_length[150]|check_user_country_valid',
    'display' => 'dropdown',
),
```

The country dropdown is populated from NADA's built-in country list (Admin → Countries). The `check_user_country_valid` rule ensures the submitted value matches a configured country.

## Verify the change

1. Open the public registration page (Login → Register).
2. Confirm the Institution and/or Country fields appear.
3. Submit a test registration and check Admin → Users that the values were saved.

If registration uses captcha, complete that step as well. See [Captcha](./captcha).


## Related documentation

- [Managing users](/admin-guide/web-ui/users) — user accounts and registration overview
- [Custom fields for public data access requests](./custom-public-access-fields) — fields on dataset access request forms
- [Extend login](/admin-guide/extend-login) — authentication drivers and registration templates
- [Captcha](./captcha) — protect the registration form
