# Upgrade from 5.5 to 5.6

This upgrade covers database and configuration changes from NADA **5.5.x** to **5.6**.

Deploy the NADA **5.6** application files (zip release or Git tag) over your existing install, preserve your `application/config` customizations, and clear caches if your environment uses them. Then apply the steps below **in order**.

## 1. Backup database

Before you change the database, take a full backup.

## 2. Update configuration

### auth.local.php (new required file)

In 5.6, email credentials and authentication secrets have moved from `email.php` and `config.php` into a new file: `application/config/auth.local.php`.

Copy the sample template and fill in your values:

```bash
cp application/config/auth.local.php.sample application/config/auth.local.php
```

Move your SMTP credentials, SendGrid API key (if used), and any OAuth client secrets into this file. It is excluded from version control and must not be committed.

## 3. Run PHP migrations

Run the built-in CLI migration runner **before** opening the admin interface:

```bash
php index.php cli/migrate latest
```

This applies all database schema changes for 5.6.

If the command fails or the database was partly upgraded already, see [Database migrations (CLI)](/installation-guide/database-migrations-cli).

## What's new in 5.6

- **Vue 3 admin interface** — catalog, dashboard, facets, site configuration, and menu management pages rebuilt in Vue 3
- **OAuth social login** — configurable providers via `auth.local.php`
- **Revamped permissions** — per-user and per-collection access control
- **Vue 3 catalog search** — replaces legacy PHP search pages
- **Time-series & indicator support** — Data Structure Definitions, codelists, dimension facets, and embeddable indicator charts
- **ZIP/JSON import** — import packages directly from the Metadata Editor
- **Resumable file uploads** — bypasses PHP upload size limits for large data files
- **Built-in analytics** — page-view and download tracking with server-side deduplication, admin dashboard, and API logs interface
- **SHA-256 API key hashing** — with expiry and revocation support; legacy keys must be regenerated
- **SendGrid API email driver** — alternative to SMTP, configured in `auth.local.php`
- **ISO 3-letter country codes** — added to country lookups
- **PHP 8.x compatibility** improvements
- **Widgets** — Bootstrap and jQuery dependencies removed (already introduced in 5.5.1)
