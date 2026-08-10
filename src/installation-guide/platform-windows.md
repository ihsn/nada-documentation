# Installation (Windows server)

How to install NADA on **Windows Server with IIS**, PHP, and either **MySQL 8.x / MariaDB 10.x+** or **Microsoft SQL Server**.

Before you start: [Installation overview](./) (requirements and folder layout).  
Pattern aligned with the Metadata Editor [Windows installation](https://worldbank.github.io/metadata-editor-docs/tech_installation_windows.html).

IIS on Windows 10/11 Pro — the same steps apply; enable IIS and CGI via “Turn Windows features on or off.”

---

## Prerequisites

| Component | Version |
|-----------|---------|
| OS | Windows Server with **IIS 10+** recommended |
| PHP | **7.4** minimum; **8.x recommended** — **Non-Thread Safe (NTS) x64** for IIS |
| Database | **MySQL 8.x** / **MariaDB 10.x+**, *or* **SQL Server** 2012+ with full-text |
| Web server | IIS 10+ with CGI / FastCGI |
| PHP Manager for IIS | **Optional but recommended** |
| URL Rewrite | Optional — [iis.net URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite) |

Enable **IIS** and the **CGI** feature (Server Manager or Windows Features) before registering PHP.

---

## Step 1: Install PHP and register it with IIS

### 1a. Download PHP

1. Download **PHP NTS x64** from [windows.php.net](https://windows.php.net/download/) (prefer **8.x**; minimum **7.4**).
2. Extract to a stable path, for example `C:\PHP` or `C:\PHP\8.3`.
3. Copy `php.ini-production` to `php.ini` if needed.

### 1b. PHP Manager for IIS (recommended)

[PHP Manager for IIS](https://www.iis.net/downloads/community/2018/05/php-manager-150-for-iis-10) registers PHP and manages extensions from IIS Manager.

1. Install PHP Manager (match your IIS version); restart IIS Manager.
2. IIS Manager → server node → **PHP Manager** → **Register new PHP version** → select `php-cgi.exe` (e.g. `C:\PHP\php-cgi.exe`).
3. Enable extensions:
   - `xsl` / `php_xsl.dll`
   - `mbstring`
   - `mysqli` — MySQL or MariaDB  
   - `sqlsrv` — only if using SQL Server (install drivers first: [SQL Server guide](./installation-sqlsrv))
4. Use **Check phpinfo()** (or a temporary `info.php`), confirm extensions, then **delete** any test `info.php`.

Recycle the app pool (or use PHP Manager refresh) after `php.ini` changes.

### 1c. Manual FastCGI (without PHP Manager)

1. Confirm CGI/FastCGI is installed for IIS.
2. IIS Manager → **Handler Mappings** → **Add Module Mapping**:
   - Request path: `*.php`
   - Module: `FastCgiModule`
   - Executable: `C:\PHP\php-cgi.exe`
   - Name: e.g. `PHP_via_FastCGI`
3. Edit `php.ini` — see [PHP settings](./php-settings).
4. Recycle the application pool.

### 1d. Recommended php.ini values

```ini
memory_limit = 256M
max_execution_time = 300
post_max_size = 800M
upload_max_filesize = 800M
```

More: [PHP settings](./php-settings).

---

## Step 2: Folder layout and download

Typical path:

```text
C:\inetpub\wwwroot\nada
```

Create the folder. The application root must contain `index.php` (see [folder layout](./#standard-folder-layout)).

**Download options:**

1. **Zip (recommended for production):** [NADA Releases](https://github.com/ihsn/nada/releases) — extract so `index.php` is under `C:\inetpub\wwwroot\nada` (remove an extra nested folder if the zip creates one).
2. **Git:** [Install with Git](./installation-git), then continue from Step 3.

Prefer tagged releases for production.

---

## Step 3: Database

Choose **one** database for the whole install.

### Option A — MySQL 8.x or MariaDB 10.x+

1. Install [MySQL](https://dev.mysql.com/downloads/mysql/) or MariaDB for Windows; set and record the root password.
2. Create database and user (Workbench, MariaDB client, or CLI):

```sql
CREATE DATABASE nada CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nada'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER,
  CREATE TEMPORARY TABLES, LOCK TABLES ON nada.* TO 'nada'@'localhost';
FLUSH PRIVILEGES;
```

3. In the NADA folder, copy `application\config\database-sample.php` to `database.php` and set credentials with `dbdriver` = `mysqli`.

Full field reference and sample array: [Configure MySQL / MariaDB](./database-mysql).

### Option B — Microsoft SQL Server

SQL Server is a **full install option**, not an add-on.

1. Ensure SQL Server has **full-text** enabled.
2. Install PHP **sqlsrv** drivers and (if needed) SQL Client — follow **[Install with SQL Server](./installation-sqlsrv)** through `database.php` configuration.
3. Enable the `sqlsrv` extension in PHP Manager (or `php.ini`), then return here for Step 4.

---

## Step 4: Permissions

Grant the IIS application pool identity **Modify** on `datafiles`, `logs`, and `files` (create the folders if missing).

Default identity:

```text
IIS AppPool\DefaultAppPool
```

Elevated command prompt (from the NADA root):

```bat
icacls datafiles /grant "IIS AppPool\DefaultAppPool:(OI)(CI)M" /T
icacls logs /grant "IIS AppPool\DefaultAppPool:(OI)(CI)M" /T
icacls files /grant "IIS AppPool\DefaultAppPool:(OI)(CI)M" /T
```

For a custom app pool, use `IIS AppPool\<YourAppPoolName>`.

::: tip Security
Consider locating `datafiles` outside `inetpub` after install.
:::

---

## Step 5: Configure the IIS site

1. Open **IIS Manager**.
2. Add a **Website** or **Application** with physical path = NADA application root (`...\nada` where `index.php` lives).
3. Application pool: **No Managed Code**, **Integrated** pipeline.
4. Confirm `.php` maps to FastCGI (PHP Manager or Step 1c).
5. Recycle the app pool after PHP changes.

Optional: install [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite). Apache-oriented clean URL docs: [Clean URLs](./configurations/clean-urls).

---

## Step 6: Run the web installer

1. Browse to `http://localhost/nada` (or your site binding/host header).
2. Fix any failed prerequisite checks (extensions, writable folders, database).
3. Click **Install Database** and create the Site Administrator account.

![NADA installer](/images/nada-installer.png)

::: tip Complex password
Use at least 12 characters with uppercase, numbers, and punctuation. Do not lose this account.
:::

---

## Step 7: Post-install

1. [Email](./configurations/email) and other [Configurations](./configurations/)
2. Optional: [Solr](./installation-solr), themes, CSP
3. [Getting started](/getting-started/)

### Hardening

- Dedicated DB user (not `root` / `sa`)
- Strong admin password
- Delete temporary `info.php`
- Move `datafiles` outside the web root when possible
- Plan backups ([Backup](/admin-guide/web-ui/backup))

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| 500 / handler errors | PHP Manager registration or FastCGI mapping; path to `php-cgi.exe`; recycle app pool |
| Wrong php.ini / missing extensions | PHP Manager phpinfo; enable extensions; [PHP settings](./php-settings) |
| Installer cannot write | App pool identity on `datafiles`, `files`, `logs` |
| Database connection failed | `database.php`; MySQL service or SQL Server / sqlsrv drivers |
| PHP Manager missing | Correct IIS version installer; restart IIS Manager as administrator |

---

## Related

- [Installation overview](./) · [Installation (Linux)](./platform-linux)
- [Configure MySQL / MariaDB](./database-mysql) · [Install with SQL Server](./installation-sqlsrv)
- [PHP settings](./php-settings) · [Configurations](./configurations/)
