# Database migration

The database migration tool lets administrators apply database schema upgrades through the admin interface without requiring command-line access. It is used when upgrading NADA to a new version.

::: warning Back up your database before running migrations
Always take a full database backup before applying any migration. Migrations modify the schema and data and cannot be automatically reversed.
:::

## Accessing database migration

Go to **Settings → Database migration** in the administrator menu.

::: info Screenshot
_Add screenshot: Database migration page showing current version and list of pending/applied migrations_
:::

## Understanding the migration list

The page shows:

- **Current version** — the migration watermark currently applied to the database
- **Available migrations** — all migration files with their status:

| Status | Meaning |
|---|---|
| Pending | Not yet applied |
| Current | The most recently applied migration |
| Applied | Previously applied |

## Running migrations

### Run all pending migrations

Click **Run latest** to apply all pending migrations in sequence. This is the standard step when upgrading NADA.

### Run a specific migration

Click **Run** next to an individual migration to apply it in isolation.

::: info Screenshot
_Add screenshot: Migration list with Run and Run latest buttons_
:::

## Marking migrations manually

If you have applied a migration manually (for example, via a database administration tool), record it without re-running it by clicking **Mark as applied**. That sets the watermark through the selected migration and all earlier ones—it does **not** execute migration code. Use **Unmark** on an applied migration to lower the watermark to the previous migration so that migration and all later ones show as pending again (schema and data are unchanged).

::: warning Re-running migrations
Unmarking is for recovery only. Re-running migrations can fail with duplicate column errors or duplicate data unless the migration was written to be idempotent. Back up the database first.
:::

## Command line

The same migration runner is available from the NADA root:

```bash
php index.php cli/migrate latest
```

For inspecting versions, marking migrations after manual SQL, recovering from failed runs, and other CLI-only workflows, see [Database migrations (CLI)](/installation-guide/database-migrations-cli).

## Notes

- Database debug mode is automatically disabled during a migration run.
- Migration files are identified by a 14-digit timestamp prefix (e.g., `20260705120001`).
- Always read the NADA release notes for any special instructions before running migrations.
