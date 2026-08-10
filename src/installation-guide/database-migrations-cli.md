# Database migrations (CLI)

From NADA **5.5** onward, schema changes ship as timestamped PHP migration files under `application/migrations/`. The usual upgrade step is:

```bash
cd /path/to/nada
php index.php cli/migrate latest
```

The same runner is available in the admin UI at **Settings → Database migration**. For day-to-day upgrades, CLI and UI behave the same; the UI adds clearer output capture and buttons for adjusting the tracked version without re-running SQL. This page documents **CLI commands** and **troubleshooting** when `latest` fails or the database is already partly upgraded.

::: warning Back up first
Migrations change schema and data. Take a full database backup before running or re-running any migration.
:::

## Before you run migrations

1. **Working directory** — Run commands from the NADA web root (the folder that contains `index.php`), not from `application/` or a parent directory.
2. **Enable migrations** — In `application/config/migration.php`, set `$config['migration_enabled'] = TRUE;`. The CLI exits with an error if migrations are disabled.
3. **Database config** — Confirm `application/config/database.php` points at the correct catalog database.
4. **After a successful upgrade** — Set `$config['migration_enabled'] = FALSE;` again on production systems (same recommendation as the admin UI).

## How the version watermark works

NADA stores a single version number in the `migrations` table. That value is a **watermark**: every migration file whose 14-digit timestamp is **less than or equal to** the stored version is treated as **applied**; newer files are **pending**.

Migration files are named like `20260705120001_admin_menu_url_cleanup.php` (timestamp + descriptive suffix).

This is important for troubleshooting: **marking** or **setting** a version only updates the watermark—it does not run SQL. **Unmarking** (lowering the watermark) makes migrations pending again without undoing schema changes.

## CLI command reference

Run `php index.php cli/migrate` with no arguments to print built-in help.

| Command | Purpose |
|--------|---------|
| `php index.php cli/migrate current` | Show the stored migration version |
| `php index.php cli/migrate list_migrations` | List migration files with Pending / Applied / Current |
| `php index.php cli/migrate latest` | Apply all pending migrations in order |
| `php index.php cli/migrate version YYYYMMDDHHIISS` | Migrate up (or down) to a specific version |
| `php index.php cli/migrate set_version YYYYMMDDHHIISS` | Set the watermark **without** running migration code |

::: info Listing migrations
Use `list_migrations`, not `list` — the latter is not a valid CLI command.
:::

### Equivalent admin UI actions

| Goal | CLI | Admin UI (**Settings → Database migration**) |
|------|-----|-----------------------------------------------|
| Apply all pending | `cli/migrate latest` | **Migrate to Latest** |
| Apply one pending migration | `cli/migrate version <ver>` | **Run** on that row |
| Record manual SQL as done | `cli/migrate set_version <ver>` | **Mark as applied** on that row |
| Make a migration pending again | `cli/migrate set_version <previous_ver>` | **Unmark** on that row |

For **Mark as applied**, the UI only allows marking versions **newer** than the current watermark. **Unmark** on version `V` sets the watermark to the migration **immediately before** `V`, so `V` and all later migrations become pending again.

CLI `set_version` is more general (it sets the watermark to any valid 14-digit version) but has the same effect when you choose the previous migration’s timestamp to unmark.

## Troubleshooting

### `latest` fails with a SQL or PHP error

1. Read the full error line printed after `Error:` (CLI) or the output panel (UI).
2. Run `php index.php cli/migrate current` and `php index.php cli/migrate list_migrations` to see which migration was last applied.
3. Fix the underlying issue (permissions, disk space, incompatible SQL, wrong database, and so on).
4. Restore from backup if the failure left the database in an unknown state.
5. Re-run **`php index.php cli/migrate latest`** (or `version <ver>` for a single step).

Migrations run in timestamp order; a failed step usually leaves the watermark at the last **successful** migration. Do not assume a failed migration was recorded as applied unless `current` shows a higher version.

Common causes:

- **Duplicate column or table** — Changes were already applied manually or from an older upgrade guide while the watermark was still low. See [Migration partially applied already](#migration-partially-applied-already) below.
- **Migrations disabled** — Enable in `application/config/migration.php`.
- **Wrong database** — CLI uses the same `database.php` as the site.
- **Debug output on production** — `db_debug` is turned off for the migration session; permanent setting should be `$db['default']['db_debug'] = FALSE;` in `database.php`.

### Migration partially applied already

Typical after running SQL from an upgrade document by hand, or after a failed retry.

1. Compare the error (for example “Duplicate column name”) with your schema.
2. If the schema **already matches** what that migration would do, advance the watermark without re-running it:

   ```bash
   php index.php cli/migrate set_version YYYYMMDDHHIISS
   ```

   Use the version of the migration you want to treat as applied (usually the one that failed).

3. Run `php index.php cli/migrate latest` again for any remaining pending migrations.

Only use `set_version` when you are sure the database already contains that migration’s changes.

### Need to re-run a migration marked as applied

Migrations are not guaranteed to be safe to run twice. Re-running can fail with duplicate-object errors or, for data migrations, duplicate or inconsistent data.

If you must retry:

1. Back up the database.
2. Lower the watermark to the migration **before** the one you need to re-run:

   ```bash
   php index.php cli/migrate set_version PREVIOUS_14_DIGIT_VERSION
   ```

   Example: to re-run `20260705120001`, set the version to the timestamp of the prior file in `list_migrations`.

3. Run `php index.php cli/migrate latest` or `version` for that target only.

Prefer fixing schema manually and **marking as applied** when the migration is not idempotent.

### `migrations` table missing or empty

The CLI creates the `migrations` table and initializes version `0` when you run `latest` or `version`. You can also inspect it directly:

```sql
SELECT * FROM migrations;
```

There should normally be one row. If multiple rows exist, NADA uses the **highest** `version` value as the current watermark.

### CLI shows HTML instead of text

Usually means the request did not hit the CLI controller (wrong path, web-only bootstrap, or invalid method name). Confirm:

- You are in the NADA root with `index.php`.
- The command uses `cli/migrate/...` as documented above.
- PHP is invoked from the shell, not via a browser URL.

### When to use the admin UI instead

Use **Settings → Database migration** when you want captured migration output on screen, or when you prefer **Mark as applied** / **Unmark** with confirmations. Use CLI for automation, SSH-only servers, and deployment scripts.

## Related documentation

- [Database migration (admin UI)](/admin-guide/web-ui/database-migration) — Running and marking migrations in the browser
- [Upgrade overview](/installation-guide/upgrade/) — Version-specific upgrade steps
