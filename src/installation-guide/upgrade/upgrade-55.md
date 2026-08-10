# Upgrade from 5.4 to 5.5

This upgrade covers database and configuration changes from NADA **5.4.x** to **5.5**.

Deploy the NADA **5.5** application files (zip release or Git tag) over your existing install, preserve your `application/config` customizations (especially `database.php` and `email.php`), and clear caches if your environment uses them. Then apply the changes below.

## 1. Backup database

Before you change the database, take a full backup.

## 2. Update database

Use a database client (phpMyAdmin, MySQL Workbench, or the CLI) to run the following on your NADA database.

```sql
ALTER TABLE `users`
  ADD COLUMN `forgot_request_ts` INT NULL,
  ADD COLUMN `forgot_request_count` INT DEFAULT 0;

ALTER TABLE `public_requests`
  ADD COLUMN `title` VARCHAR(500) NULL AFTER `surveyid`;
```

## 3. Run PHP migrations

After deploying the application files, run the built-in migration runner from the command line:

```bash
php index.php cli/migrate latest
```

If this command fails or you applied schema changes manually, see [Database migrations (CLI)](/installation-guide/database-migrations-cli) for troubleshooting and for marking migrations without re-running SQL.

## What's new in 5.5

- **Driver-based email** — SMTP and SendGrid/API drivers, configurable in `application/config/email.php`
- **OAuth/SSO login** — social login support via the new `authtype` field on users
- **Catalog search API** — user-defined filters and DOI search support
- **Study IDNO replacement** — IDNO can be replaced via metadata import
- **Custom fields on request forms** — administrators can add fields to public data-access request forms
- **Tables API** — CSV and JSON export endpoints for tabular data
- **CSV export for licensed requests** — download licensed request lists as CSV from the admin interface
- **CSRF protection** — site-wide tokens including file-upload endpoints; session regenerated on login
- **Forgot-password throttling** — default limit of 3 requests per 5 minutes
- **Optional CSP headers** — Content Security Policy support, disabled by default and configurable in site settings
