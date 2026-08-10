# Installation overview

NADA is deployed as a **web application** on a server with PHP and a supported database. Choose a platform guide below for complete install instructions. This overview follows the same pattern as the [Metadata Editor installation](https://worldbank.github.io/metadata-editor-docs/tech_installation.html), with NADA-specific options such as **Microsoft SQL Server**.

---

## System requirements

| Component | Requirement |
|-----------|-------------|
| **CPU** | Dual-core or higher |
| **RAM** | 4 GB minimum; 8 GB+ recommended for larger catalogs |
| **Storage** | 20 GB+ free; catalog files grow under `datafiles` |
| **Database** | **MySQL 8.x** or **MariaDB 10.x+**, *or* **Microsoft SQL Server** 2012+ with full-text (**pick one**) |
| **PHP** | **7.4** minimum; **PHP 8.x recommended**. Extensions: `xsl`, `xml`, `mbstring`, plus `mysqli` (MySQL/MariaDB) **or** `sqlsrv` (SQL Server) |
| **Web server** | Apache 2.4+, NGINX, or IIS 10+ |

::: tip Recommended
New installs should use **PHP 8.x** and **MySQL 8.x** or **MariaDB 10.x+**. PHP 7.4 remains the minimum supported version. MySQL 5.7 and older are not recommended.
:::

---

## Choose your installation path

| Environment | Guide |
|-------------|--------|
| **Linux server** (Apache or NGINX) | [Installation (Linux)](./platform-linux) |
| **Windows server** (IIS) | [Installation (Windows)](./platform-windows) |
| **Git + Composer** | [Install with Git](./installation-git) (then finish with your platform guide) |
| **Docker** | [Install with Docker](./installation-docker) |
| **Upgrade an existing install** | [Upgrading](./upgrade/) |

Linux and Windows installs differ substantially (packages vs PHP Manager/IIS, permissions, web server config). Use the platform guide for your OS — do not mix steps from both.

---

## Standard folder layout

The web server document root must point at the NADA **application root** (the folder that contains `index.php`).

```text
nada/                    ← application root (contains index.php)
├── application/
├── datafiles/           ← catalog data (writable)
├── files/               ← sessions, thumbnails, temp (writable)
├── logs/                ← logs (writable)
├── themes/
└── …
```

| Platform | Example path |
|----------|----------------|
| Linux | `/var/www/nada` or `/var/www/html/nada` |
| Windows (IIS) | `C:\inetpub\wwwroot\nada` |

Source: [https://github.com/ihsn/nada](https://github.com/ihsn/nada) — prefer [tagged releases](https://github.com/ihsn/nada/releases) for production.

::: tip NOTE
The folder name often becomes part of the catalog URL (for example `data`, `microdata`, or `catalog`).
:::

---

## Installation checklist

1. Follow **[Linux](./platform-linux)** or **[Windows](./platform-windows)** through stack install, download, database, permissions, web server, and installer.
2. Complete [Configurations](./configurations/) — especially [email](./configurations/email).
3. _(Optional)_ [Solr](./installation-solr), clean URLs, CSP, themes.
4. _(Production)_ Harden credentials; move `datafiles` outside the web root when possible; plan backups.
5. Continue with [Getting started](/getting-started/).

---

## Database options

| Database | Documentation |
|----------|----------------|
| **MySQL 8.x** or **MariaDB 10.x+** | Covered in each platform guide · also [MySQL / MariaDB](./database-mysql) |
| **Microsoft SQL Server** | [Install with SQL Server](./installation-sqlsrv) (common on Windows) |

---

## Related documentation

- [Installation (Linux)](./platform-linux) · [Installation (Windows)](./platform-windows)
- [PHP settings](./php-settings) · [MySQL / MariaDB](./database-mysql) · [SQL Server](./installation-sqlsrv)
- [Configurations](./configurations/) · [Upgrading](./upgrade/) · [Debug](./debug)
- [Getting started](/getting-started/) · [API guide](/api-guide/)

Metadata Editor (companion tool): [Installation overview](https://worldbank.github.io/metadata-editor-docs/tech_installation.html)
