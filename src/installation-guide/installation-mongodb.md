# MongoDB (indicators and data API)

[MongoDB](https://www.mongodb.com/) stores the **data** behind indicators and time series: every observation uploaded for an indicator is saved in MongoDB, and the catalog's chart, table, Data API and embed pages read it from there. The [data API for tables](/admin-guide/content/data-api) (published with NADAR or PyNADA) also uses it.

MongoDB is **optional**. Skip this page if your catalog does not publish indicator or tabular data. Metadata, studies and search still work without it, and they stay in MySQL / SQL Server.

## Checklist

1. Install the MongoDB server ([Linux](#linux), [Windows](#windows) or [Docker](#docker)).
2. Install the `mongodb` PHP extension and confirm PHP loads it ([PHP extension](#install-the-php-extension)).
3. [Turn on authentication and create a NADA user](#recommended-with-authentication) (recommended). Skip this only for a [local development install](#development-only-no-authentication).
4. Copy `mongo.sample.php` to [`application/config/mongo.php`](#configure-nada) and enter your settings.
5. [Verify the connection](#verify-the-connection), then upload indicator data from the admin UI.

---

## Requirements

| Component | Notes |
|-----------|--------|
| **MongoDB server** | A currently supported release; 6.0 or later recommended. Community Edition is enough. |
| **PHP** | **8.1 or later**. The MongoDB library bundled with NADA does not run on PHP 7.4 or 8.0. |
| **PHP extension** | `mongodb` **2.1 or later** (the PECL / `ext-mongodb` driver) |
| **PHP library** | Bundled in `modules/mongodb/vendor` (`mongodb/mongodb` 2.1). No Composer step is needed. |
| **Network** | The NADA web server must reach MongoDB (usually `localhost:27017`). |

---

## Install the MongoDB server

### Linux

Follow MongoDB's official guide for your distribution. It adds the MongoDB package repository, which has newer versions than the distribution's own packages:

- [Install on Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
- [Install on Debian](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-debian/)
- [Install on Red Hat / Rocky / AlmaLinux](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/)

Then enable and start the service:

```bash
sudo systemctl enable --now mongod
sudo systemctl status mongod
```

The configuration file is `/etc/mongod.conf`. By default MongoDB listens only on `127.0.0.1`. Keep it that way when NADA runs on the same server.

### Windows

1. Download the MSI from the [MongoDB Community download page](https://www.mongodb.com/try/download/community).
2. Run the installer and choose **Install MongoDB as a Service** (Network Service user is fine).
3. Optionally install **mongosh** (the MongoDB shell) when prompted, or from the [mongosh download page](https://www.mongodb.com/try/download/shell).
4. Confirm the **MongoDB** service is running in `services.msc`.

The configuration file is `C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg`.

### Docker

Start MongoDB with an administrator account. Setting the two `MONGO_INITDB_ROOT_*` variables turns on access control:

```bash
docker run -d --name nada-mongo -p 127.0.0.1:27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD='choose-a-strong-password' \
  -v nada-mongo-data:/data/db mongo:7
```

Then create the NADA user as described in [step 3](#recommended-with-authentication), connecting with:

```bash
docker exec -it nada-mongo mongosh -u admin -p --authenticationDatabase admin
```

- The root variables are applied only on the **first start with an empty volume**. Changing them later has no effect.
- Binding to `127.0.0.1` keeps the port off the network.
- Keep the volume (`nada-mongo-data`): it holds your indicator data.

---

## Install the PHP extension

PHP talks to MongoDB through the `mongodb` extension. Install it for the **same PHP version** that runs NADA.

### Linux

Using PECL (works on all distributions):

```bash
sudo apt install php-pear php-dev   # Debian/Ubuntu; on RHEL: dnf install php-pear php-devel
sudo pecl install mongodb
```

Then enable it, for example in `/etc/php/8.3/mods-available/mongodb.ini`:

```ini
extension=mongodb
```

```bash
sudo phpenmod mongodb           # Debian/Ubuntu
sudo systemctl restart php8.3-fpm   # or: sudo systemctl restart apache2
```

Distribution packages such as `php-mongodb` also work, but check that the version is **2.1 or later**. Older distributions ship 1.x.

### Windows

1. Download the extension DLL from the [mongo-php-driver releases](https://github.com/mongodb/mongo-php-driver/releases). Pick the build that matches your PHP **version**, **architecture** (x64) and **thread safety** (NTS for IIS/FastCGI). Run `php -i | findstr "Thread"` to check.
2. Copy `php_mongodb.dll` into PHP's `ext` folder (for example `C:\PHP\ext`).
3. Add to `php.ini`:

   ```ini
   extension=mongodb
   ```

4. Restart IIS (`iisreset`) or the PHP service.

### Check the extension

```bash
php --ri mongodb
```

This should print `MongoDB support => enabled` and a version of 2.1 or higher. The web server and the command line can use **different `php.ini` files**, so also check that `mongodb` appears in **phpinfo()** served through the web server.

---

## Create the database and user

NADA uses a single MongoDB **database** (default name `nada_db`). You do **not** create the database or its collections yourself. MongoDB creates the database the first time NADA writes to it, and NADA creates each collection and its indexes when data is uploaded (see [Collections NADA creates](#collections-nada-creates)).

Running `use nada_db` in mongosh does not create the database either. It appears in `show dbs` only after the first upload.

The only setup is the user NADA logs in with.

### Recommended: with authentication

Use this on every production server, and always when MongoDB is reachable from another machine.

**1. Create an administrator** (skip this if your server already has one, or if you used the Docker command above).

On a new server, access control is still off, so you can connect without a password:

```js
// mongosh
use admin
db.createUser({
  user: "admin",
  pwd: passwordPrompt(),   // prompts for the password
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
})
```

If access control is already on but no user exists yet, MongoDB still lets you create this first user, but only from a shell running on the MongoDB server itself (the *localhost exception*).

**2. Turn on access control.** In `mongod.conf` (Linux: `/etc/mongod.conf`; Windows: `mongod.cfg`):

```yaml
security:
  authorization: enabled
```

Restart MongoDB (`sudo systemctl restart mongod`, or restart the **MongoDB** service on Windows).

**3. Create the NADA user _in the NADA database_.**

NADA authenticates against the database set in `mongodb_database`, because it uses that database as the `authSource`. Create the user **in that database, not in `admin`**:

```bash
mongosh -u admin -p --authenticationDatabase admin
```

```js
use nada_db
db.createUser({
  user: "nada",
  pwd: passwordPrompt(),
  roles: [ { role: "readWrite", db: "nada_db" } ]
})
```

`readWrite` on the NADA database is all NADA needs. It lets NADA create, rename and drop collections, create indexes, insert and delete data, and read collection statistics. Do not give the NADA user an `admin`, `root` or `*AnyDatabase` role.

**4. Test the login:**

```bash
mongosh "mongodb://nada@localhost:27017/nada_db?authSource=nada_db" --eval "db.runCommand({ ping: 1 })"
```

Expected output: `{ ok: 1 }`. Then set the username and password in [`mongo.php`](#configure-nada).

### Development only: no authentication

Use this only on a development machine, or when MongoDB listens on `127.0.0.1` (the default) and nobody else can log in to the server.

Nothing to create. [Create `mongo.php`](#configure-nada) from the sample and leave the username and password empty.

---

## Configure NADA

NADA ships `application/config/mongo.sample.php`. Copy it to `mongo.php` and edit the copy, as you did for `database.php`:

```bash
cp application/config/mongo.sample.php application/config/mongo.php
```

`mongo.php` is not tracked in git and is not included in releases, so upgrades leave your settings alone.

```php
$config['mongodb_database'] = 'nada_db';
$config['mongodb_username'] = 'nada';    // empty = no authentication
$config['mongodb_password'] = '';        // the NADA user's password
$config['mongodb_host']     = 'localhost';
$config['mongodb_port']     = '27017';
```

| Setting | Description |
|---------|-------------|
| `mongodb_database` | Database that holds all NADA collections. Required. With authentication, it is also the database the user is created in. |
| `mongodb_username` | Leave empty for no authentication. |
| `mongodb_password` | Leave empty for no authentication. NADA authenticates only when **both** the username and the password are set. Special characters need no escaping: NADA does not put the password in a URL. |
| `mongodb_host` | Host name or IP of the MongoDB server. |
| `mongodb_port` | Usually `27017`. |

Restrict read access to `mongo.php` (for example `chmod 640`, readable by the web server user), because it contains the password.

::: warning Upgrading from an earlier NADA version
Earlier versions shipped `mongo.php` itself. Back it up before upgrading. If your install is a git checkout, `git pull` deletes `mongo.php` because it is no longer tracked; restore it from your backup afterwards.
:::

### Collections NADA creates

All collections are created in `mongodb_database`:

| Collection | Used for |
|------------|----------|
| `indicator_ts_{id}` | Indicator observations, one collection per data structure (DSD). `{id}` is the DSD's internal ID. Every indicator that uses the same DSD shares the collection, and rows are separated by study. |
| `table_{db}_{table}` | Data API tables: one collection per published table |
| `table_dictionary`, `table_types` | Data API tables: field dictionaries and table definitions |

NADA creates the indexes it needs on `indicator_ts_*` collections (a unique series-key index and a time-period index) when data is imported. The `indicator_ts_` prefix can be changed in `application/config/indicator_timeseries.php` (`indicator_timeseries_collection_prefix`). Change it only before loading any data.

For data API tables, NADA creates indexes on each table collection when the table is published, but it does **not** create the indexes on `table_dictionary`. Create them once, after publishing the first table (repeating the call is harmless):

```bash
curl -X POST -H "X-API-KEY: your-api-key" \
  https://your-catalog/index.php/api/tables/create_dictionary_indexes
```

### Indicator data settings

`application/config/indicator_timeseries.php` has tuning options. The defaults suit most catalogs.

| Setting | Default | Description |
|---------|---------|-------------|
| `indicator_timeseries_collection_prefix` | `indicator_ts_` | Collection name prefix |
| `indicator_timeseries_bulk_batch_size` | `500` | Rows buffered per write during CSV import (limits memory use) |
| `indicator_timeseries_max_bulk_insert` | `5000` | Maximum rows per insert call. Larger batches are split. |
| `indicator_timeseries_default_page_size` | `100` | Default rows per page for the data API |
| `indicator_timeseries_max_page_size` | `500` | Maximum rows per page for the data API |
| `indicator_timeseries_chart_max_raw_rows` | `5000` | Maximum observations read to draw one chart. Narrow the filters if a chart is incomplete. |

---

## Verify the connection

**1. From the MongoDB shell** (on the NADA server):

```bash
mongosh "mongodb://localhost:27017/nada_db" --eval "db.runCommand({ ping: 1 })"
# with authentication (prompts for the password):
mongosh "mongodb://nada@localhost:27017/nada_db?authSource=nada_db" --eval "db.runCommand({ ping: 1 })"
```

Expected output: `{ ok: 1 }`.

**2. With the NADA check command.** From the NADA root folder (the one with `index.php`):

```bash
php index.php cli/mongo_check
```

It uses the settings in `mongo.php` and the same connection code as NADA, and reports each step as PASS, WARN or FAIL, with a fix for each problem:

| Check | What it tests |
|-------|---------------|
| Setup | PHP 8.1+, the `mongodb` extension (2.1+), the bundled library, `mongo.php` present and filled in, authentication configured, `mongo.php` not readable by all users |
| Connection | Connects and logs in, server version |
| Permissions | The user's roles (warns about roles broader than `readWrite`), listing collections, and a write test |
| Data | Number of indicator collections, observations and data API tables; missing `table_dictionary` indexes |

The write test creates, indexes, renames and drops a temporary `nada_check_*` collection. To skip it, run `php index.php cli/mongo_check read-only`. The exit code is `0` when all checks pass, `1` with warnings and `2` with failures, so the command can also run in monitoring scripts.

::: tip Command line vs web server
The command line can load a different `php.ini` than the web server. If the check passes but the site still fails, compare with **phpinfo()** served through the web server.
:::

**3. In NADA**, open an indicator in the admin, attach a data structure and upload a CSV on the **Indicator data** tab. The upload creates the `indicator_ts_*` collection. The **Chart & data** tab then appears on the catalog page.

---

## Backup and maintenance

Observations in MongoDB are linked to studies in the MySQL / SQL Server database. Back up **both databases at the same time**, and restore them together.

```bash
# Backup
mongodump --db nada_db --out /backups/mongo-$(date +%F)
# with authentication add: --username nada --authenticationDatabase nada_db

# Restore
mongorestore --nsInclude='nada_db.*' /backups/mongo-2026-10-25
# with authentication add: --username nada --authenticationDatabase nada_db
```

NADA has CLI commands to keep the two databases consistent:

```bash
# Report observations whose study no longer exists (add "purge" to delete them)
php index.php cli/catalog/indicator_ts_orphans
php index.php cli/catalog/indicator_ts_orphans purge

# Recompute observation counts shown in the admin (one study, or all)
php index.php cli/catalog/indicator_ts_refresh_counts
php index.php cli/catalog/indicator_ts_refresh_counts 369
```

---

## Security

- Do not expose port `27017` to the internet. Keep `bindIp: 127.0.0.1` when MongoDB runs on the NADA server, or allow only the NADA server's address in your firewall.
- Turn on [authentication](#recommended-with-authentication) on every production server. It is required whenever MongoDB is reachable from another machine.
- Give the NADA user `readWrite` on the NADA database only, never a cluster-wide or `root` role.

---

## Current limitations

NADA connects with host, port, username and password only. It does **not** yet support:

- a full connection string: replica sets, `mongodb+srv://` (for example MongoDB Atlas), or TLS options;
- users stored in another database (such as `admin`). The user must be created in `mongodb_database`.

---

## Troubleshooting

Run `php index.php cli/mongo_check` first. It finds most of the problems below and prints the fix.

| Symptom | Cause / fix |
|---------|-------------|
| *Composer detected issues in your platform: … PHP version ">= 8.1.0"* | PHP is older than 8.1. Upgrade PHP to use indicator data. |
| *Class "MongoDB\Driver\Manager" not found* | The `mongodb` extension is not loaded by the web server's PHP. Check phpinfo and restart PHP-FPM / Apache / IIS. |
| *Authentication failed* | The user was created in `admin` or another database. Create it in `mongodb_database` (see [step 3](#recommended-with-authentication)). Check the username and password. |
| *No suitable servers found* / *Connection refused* | MongoDB is not running, or the host/port is wrong, or a firewall blocks it. Run `systemctl status mongod` and the [shell check](#verify-the-connection). |
| The tables or indicator API returns HTTP 503 *The API is not available.* | NADA cannot use MongoDB. Visitors see only this generic message; the cause is in the NADA log. Run `php index.php cli/mongo_check` to find it. |
| *MongoDB is not configured* (in the log or `cli/mongo_check`) | `application/config/mongo.php` is missing, or `mongodb_database` is empty in it. Copy `mongo.sample.php` to `mongo.php`. |
| Connected, but writes fail with *not authorized* | Only one of username/password is set (NADA then connects without authentication), or the user lacks `readWrite`. |
| Settings lost after an upgrade | An older release replaced `mongo.php`, or `git pull` removed it. Restore it from your backup. |
| Chart is incomplete for large selections | `indicator_timeseries_chart_max_raw_rows` was reached. Narrow the filters or raise the limit. |

See also: [Create an indicator in NADA](/admin-guide/content/indicators-admin) · [Indicator data API](/admin-guide/content/indicators-data-api) · [Data tables API](/admin-guide/content/data-api) · [PHP settings](./php-settings)
