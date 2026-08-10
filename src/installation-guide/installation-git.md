# Install with Git

Use Git when you want to track upstream changes or work from a specific branch/tag. Confirm [system requirements](./#system-requirements), clone and run Composer below, then **finish the install with your platform guide** ([Linux](./platform-linux) or [Windows](./platform-windows)) — permissions, database, web server, and installer.

## Install a Git client

You need Git on the machine where you clone the code:

- [Git SCM](https://git-scm.com/downloads)
- [GitHub Desktop](https://desktop.github.com/)
- [SourceTree](https://www.sourcetreeapp.com/)

The examples below use the Git command line.

## Clone NADA

```bash
# Creates a folder named nada
git clone https://github.com/ihsn/nada.git

# Or choose a folder name
git clone https://github.com/ihsn/nada.git <folder-name>
```

### Choose a release / branch

`git clone` checks out the default branch (usually `master` / `main`). For a specific release, prefer a **tagged release** from [GitHub Releases](https://github.com/ihsn/nada/releases):

```bash
cd <your-nada-folder>
git fetch --tags
git checkout V5.4.1   # example — use the tag you need
```

If you follow a maintenance branch instead, check the project README or release notes for the correct branch name for your target version (for example NADA 5.4.x).

## Install PHP dependencies (Composer)

NADA uses Composer for third-party libraries. Release zip packages often already include `vendor/`. After a fresh Git clone you usually need to run Composer.

Install Composer using the official installer: [https://getcomposer.org/download/](https://getcomposer.org/download/)

Then, from the NADA root:

```bash
php composer.phar install
# or, if composer is installed globally:
composer install
```

If install fails, try a clean vendor tree:

```bash
rm -rf vendor
rm -f composer.lock
php composer.phar install
```

::: tip
More about Composer: [https://getcomposer.org/](https://getcomposer.org/)
:::

## Continue on your platform

1. [Installation (Linux)](./platform-linux) — from permissions / database onward (or start at download if the clone already created your app root)
2. **or** [Installation (Windows)](./platform-windows)
3. Database: [MySQL / MariaDB](./database-mysql) or [SQL Server](./installation-sqlsrv)
4. Then post-install [Configurations](./configurations/)
