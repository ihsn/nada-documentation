# Migrating from NADA 4.x to 5.x (Linux)

This guide covers a full migration from any NADA **4.x** installation to the latest **5.6** on a Linux server running Apache and MySQL or MariaDB.

The process deploys NADA 5.6 in a **new folder** alongside your existing install, connects it to your existing database, and runs each version's database updates in sequence. Your old install stays intact until you are ready to switch.

Full migration chain: **4.x → 5.0 → 5.2 → 5.4 → 5.5 → 5.6**

::: warning Downtime required
This is a major version upgrade. Plan a maintenance window. Enable maintenance mode before starting the database migration steps.
:::

---

## 1. Check your current NADA version

Open `index.php` at the root of your existing NADA install and look for the version constant near the top of the file:

```php
define('APP_VERSION', '4.4');
```

This tells you where to start in the migration chain. If you are already on a 5.x version, skip ahead to the matching section.

While the file is open, also note the `ENVIRONMENT` line — you will need to update this before go-live:

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');
```

---

## 2. Pre-migration checklist

- [ ] PHP version: `php -v` — PHP **8.x** required for NADA 5.6; plan a PHP upgrade if you are on 7.x
- [ ] MySQL / MariaDB version: `mysql --version`
- [ ] Disk space available for a parallel install folder
- [ ] Apache `mod_rewrite` is active: `apache2ctl -M | grep rewrite`
- [ ] You have the NADA admin credentials for the existing catalog

---

## 3. Back up the database

Take a full database backup before making any changes.

```bash
mysqldump -u nada_user -p nada_db > nada_backup_$(date +%Y%m%d).sql
```

Also back up your configuration files:

```bash
cp -r /var/www/nada/application/config ~/nada_config_backup
```

---

## 4. Deploy NADA 5.6 in a new folder

Download the latest NADA 5.6 release from [GitHub Releases](https://github.com/ihsn/nada/releases) and extract it to a new directory:

```bash
cd /tmp
# Download nada-5.6.zip from GitHub Releases, then:
sudo unzip nada-5.6.zip -d /var/www/nada5
sudo chown -R www-data:www-data /var/www/nada5
sudo mkdir -p /var/www/nada5/files /var/www/nada5/logs
sudo chmod -R 755 /var/www/nada5
```

Copy your existing database configuration into the new install — this connects NADA 5 to your existing database:

```bash
sudo cp /var/www/nada/application/config/database.php \
  /var/www/nada5/application/config/database.php
```

Open the copied `database.php` and update two settings:

```php
$db['default']['dbdriver'] = 'mysqli';   // was 'mysql' in NADA 4
$db['default']['db_debug'] = FALSE;
```

---

## 5. Set up the datafiles folder

The `datafiles/` folder contains all uploaded content: DDI/XML files, microdata, documents, and associated resources. The new install needs access to it. Choose one option:

**Option A — Symlink (recommended)**

Creates a pointer to the existing folder without duplicating any files:

```bash
sudo ln -s /var/www/nada/datafiles /var/www/nada5/datafiles
```

Verify the link:

```bash
ls -la /var/www/nada5/datafiles
```

**Option B — Copy**

Use this if symlinks are not supported in your environment or if you want a fully independent copy:

```bash
sudo cp -r /var/www/nada/datafiles /var/www/nada5/datafiles
sudo chown -R www-data:www-data /var/www/nada5/datafiles
```

::: tip Large catalogs
For catalogs with large `datafiles/` folders, Option B can take significant time and disk space. Option A is strongly preferred.
:::

---

## 6. Enable maintenance mode

Edit `application/config/config.php` in the new NADA 5 install:

```php
$config["maintenance_mode"] = 1;
```

---

## 7. Configure Apache

Create a virtual host for the new install. Use a staging hostname or alternate port to test before switching production traffic:

```bash
sudo nano /etc/apache2/sites-available/nada5.conf
```

```apache
<VirtualHost *:80>
    ServerName nada5-staging.example.org
    DocumentRoot /var/www/nada5

    <Directory /var/www/nada5>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/nada5-error.log
    CustomLog ${APACHE_LOG_DIR}/nada5-access.log combined
</VirtualHost>
```

```bash
sudo a2enmod rewrite
sudo a2ensite nada5.conf
sudo systemctl reload apache2
```

---

## 8. Run the 4.x → 5.0 database migration

::: danger Database changes ahead
The steps in this section make irreversible changes to your database. Confirm your backup from Step 3 is complete before continuing.
:::

Open the migration controller in your browser:

```
http://nada5-staging.example.org/index.php/nada5_upgrade/run
```

The page runs through each migration step and displays the result:

- **Success:** step listed with a completed status
- **Failure:** the SQL statement that failed is shown alongside the error message

**Running failed SQL statements manually**

If any step fails, connect to the database and run the failed statement directly:

```bash
mysql -u nada_user -p nada_db
```

Paste the SQL statement from the failure output. Common errors:

| Error | Meaning | Action |
|-------|---------|--------|
| `Duplicate column name` | That change was already applied | Skip — safe to ignore |
| `Table doesn't exist` | A prerequisite step failed | Fix the earlier failure first, then retry |
| `Duplicate entry` | Data already inserted | Skip — safe to ignore |

After fixing any failures, reload the upgrade URL to confirm no remaining errors.

---

## 9. Apply 5.0 → 5.2 database changes

Connect to your database:

```bash
mysql -u nada_user -p nada_db
```

Run the following SQL blocks in order.

### 5.0.4 → 5.0.5

```sql
CREATE TABLE `variable_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `vgid` varchar(45) DEFAULT NULL,
  `variables` varchar(5000) DEFAULT NULL,
  `variable_groups` varchar(500) DEFAULT NULL,
  `group_type` varchar(45) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `universe` varchar(255) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `txt` varchar(500) DEFAULT NULL,
  `definition` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `users` ADD `otp_code` varchar(45) DEFAULT NULL;
ALTER TABLE `users` ADD `otp_expiry` int(11) DEFAULT NULL;
```

### 5.0.5 → 5.0.6

```sql
ALTER TABLE `api_keys` DROP INDEX `key_UNIQUE`;
ALTER TABLE `api_keys` CHANGE `key` `api_key` VARCHAR(255) NOT NULL;
ALTER TABLE `api_keys` ADD UNIQUE KEY `idx_api_key_unq` (`api_key`);
```

### 5.0.6 → 5.2

```sql
ALTER TABLE `api_logs` ADD `user_id` int DEFAULT NULL;

DROP TABLE IF EXISTS `ci_sessions`;
CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int unsigned NOT NULL DEFAULT '0',
  `data` blob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ci_sessions_timestamp` (`timestamp`)
);

DROP TABLE IF EXISTS `data_classifications`;
CREATE TABLE `data_classifications` (
  `id` int NOT NULL,
  `code` varchar(45) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) DEFAULT CHARSET=utf8;

INSERT INTO `data_classifications` (id,code,title) VALUES
(1,'public','Public use'),
(2,'official','Official use'),
(3,'confidential','Confidential');

CREATE TABLE `facets` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(20) DEFAULT NULL,
    `title` varchar(45) DEFAULT NULL,
    `facet_type` varchar(10) DEFAULT NULL,
    `enabled` int DEFAULT '0',
    `mappings` mediumtext,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_UNIQUE` (`name`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO facets(name,title,facet_type,enabled) VALUES
('year','Years','core',1),
('data_class','Data classifications','core',1),
('dtype','License','core',1),
('country','Countries','core',1),
('collection','Collections','core',1),
('type','Data types','core',1),
('tag','Tags','core',1);

CREATE TABLE `facet_terms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facet_id` int DEFAULT NULL,
  `value` varchar(300) DEFAULT NULL,
  `weight` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `survey_facets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `facet_id` int DEFAULT NULL,
  `term_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `filestore` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `file_ext` varchar(10) DEFAULT NULL,
  `is_image` tinyint(4) DEFAULT NULL,
  `changed` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_filestore_file` (`file_name`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `survey_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `location` geometry NOT NULL,
  PRIMARY KEY (`id`),
  SPATIAL KEY `idx_location` (`location`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` varchar(45) NOT NULL,
  `resource` varchar(45) DEFAULT NULL,
  `permissions` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `weight` int(11) DEFAULT '0',
  `is_admin` tinyint(4) DEFAULT '0',
  `is_locked` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO roles(id,name,description,weight,is_admin,is_locked) VALUES
(1,'admin','It is the site administrator and has access to all site content',0,1,1),
(2,'user','General user account with no access to site administration',0,1,1);

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- migrate existing admins from previous version
INSERT INTO user_roles (user_id, role_id)
  SELECT user_id, group_id FROM users_groups WHERE group_id=1;

DROP TABLE survey_types;

CREATE TABLE `survey_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `weight` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`code`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `survey_types`(`id`,`code`,`title`,weight) VALUES
(1,'survey','Survey',100),
(2,'geospatial','Geospatial',90),
(3,'timeseries','Time series',80),
(4,'document','Document',50),
(5,'table','Table',70),
(6,'image','Photo',40),
(7,'script','Script',30),
(8,'visualization','Visualization',60),
(9,'video','Video',40);

CREATE TABLE `widgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) NOT NULL,
  `title` varchar(250) NOT NULL,
  `thumbnail` varchar(300) DEFAULT NULL,
  `description` varchar(450) DEFAULT NULL,
  `storage_path` varchar(255) DEFAULT NULL,
  `published` int DEFAULT NULL,
  `created` int DEFAULT NULL,
  `changed` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `changed_by` int DEFAULT NULL,
  `options` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `survey_widgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int NOT NULL,
  `widget_uuid` varchar(145) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid_uuid` (`sid`,`widget_uuid`) USING BTREE
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ts_databases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idno` varchar(150) DEFAULT NULL,
  `title` varchar(300) DEFAULT NULL,
  `abstract` text,
  `published` tinyint(4) DEFAULT NULL,
  `created` varchar(45) DEFAULT NULL,
  `changed` varchar(45) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `metadata` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idno_UNIQUE` (`idno`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `configurations` VALUES ('facets_all','["year","data_class","dtype","country"]',NULL,NULL,NULL);
INSERT INTO `configurations` VALUES ('facets_microdata','["year","data_class","dtype","country"]',NULL,NULL,NULL);
```

### Update surveys table

```sql
ALTER TABLE `surveys` ADD `doi` varchar(200) DEFAULT NULL;
ALTER TABLE `surveys` ADD `data_class_id` int DEFAULT NULL;
ALTER TABLE `surveys` ADD `var_keywords` mediumtext;

ALTER TABLE `surveys` DROP INDEX `ft_keywords`;
ALTER TABLE `surveys` ADD FULLTEXT INDEX `ft_keywords` (`keywords`, `var_keywords`);
```

### Update variables table

For catalogs with fewer than 1 million variable rows use **Option 1**. For larger catalogs use **Option 2**.

**Option 1 — ALTER TABLE (recommended for most catalogs)**

```sql
ALTER TABLE `variables` ADD `keywords` text;
ALTER TABLE `variables` DROP INDEX `idx_nm_lbl_cat_qstn`;
ALTER TABLE variables ADD FULLTEXT INDEX `idx_nm_lbl_cat_qstn` (`name`,`labl`,`catgry`,`qstn`,`keywords`);
```

**Option 2 — Recreate table (use for catalogs with >1M variable rows)**

```sql
ALTER TABLE `variables` RENAME TO `variables_old`;
DROP TABLE `variables`;

CREATE TABLE `variables` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) NOT NULL,
  `fid` varchar(45) DEFAULT NULL,
  `vid` varchar(45) DEFAULT '',
  `name` varchar(100) DEFAULT '',
  `labl` varchar(255) DEFAULT '',
  `qstn` text,
  `catgry` text,
  `keywords` text,
  `metadata` mediumtext,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `idxSurvey` (`vid`,`sid`),
  KEY `idxsurveyidfk` (`sid`),
  FULLTEXT KEY `idx_nm_lbl_qstn` (`name`,`labl`,`qstn`,`catgry`),
  FULLTEXT KEY `idx_nm_lbl_cat_qstn` (`name`,`labl`,`catgry`,`qstn`,`keywords`)
) DEFAULT CHARSET=utf8;

INSERT INTO variables (uid,sid,fid,vid,name,labl,qstn,catgry,metadata)
  SELECT uid,sid,fid,vid,name,labl,qstn,catgry,metadata FROM variables_old;

DROP TABLE variables_old;
```

### Remove legacy permission tables

The permissions system was replaced in 5.2. Remove the old tables:

```sql
DROP TABLE group_permissions;
DROP TABLE group_repo_access;
DROP TABLE groups;
DROP TABLE permission_urls;
DROP TABLE permissions;
DROP TABLE repo_perms_groups;
DROP TABLE repo_perms_urls;
DROP TABLE user_repo_permissions_disabled;
```

---

## 10. Apply 5.2 → 5.4 database changes

```sql
ALTER TABLE `surveys` ADD `subtitle` varchar(255) DEFAULT NULL;
ALTER TABLE `data_files` ADD `metadata` varchar(5000) DEFAULT NULL;

CREATE TABLE `data_access_whitelist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `repository_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

CREATE TABLE `survey_data_api` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `db_id` varchar(45) DEFAULT NULL,
  `table_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

ALTER TABLE `users` MODIFY COLUMN `forgotten_password_code` varchar(100) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `forgotten_code_expiry` int DEFAULT NULL;
```

---

## 11. Apply 5.4 → 5.5 database changes and run migrations

```sql
ALTER TABLE `users`
  ADD COLUMN `forgot_request_ts` INT NULL,
  ADD COLUMN `forgot_request_count` INT DEFAULT 0;

ALTER TABLE `public_requests`
  ADD COLUMN `title` VARCHAR(500) NULL AFTER `surveyid`;
```

Then run the built-in PHP migration runner from the NADA 5 root:

```bash
cd /var/www/nada5
php index.php cli/migrate latest
```

---

## 12. Apply 5.5 → 5.6 configuration and run migrations

Create the authentication configuration file from the sample:

```bash
cp application/config/auth.local.sample.php application/config/auth.local.php
```

Open `auth.local.php` and fill in your SMTP credentials and any OAuth provider settings. This file must not be committed to version control.

Then run the migration runner:

```bash
cd /var/www/nada5
php index.php cli/migrate latest
```

---

## 13. Post-migration tasks

The following steps are specific to the 4.x → 5.x upgrade and are not required for 5.x-to-5.x upgrades.

### 13.1 Batch DDI refresh (required)

The DDI/XML files in `datafiles/` contain the authoritative study metadata. The batch refresh reads those files and repopulates the NADA 5 database schema — without this step, study metadata will be incomplete.

1. Log in to the NADA 5 admin interface
2. Navigate to: `http://your-site/index.php/admin/catalog/batch_refresh`
3. Select all studies
4. Click **Refresh DDI**

Wait for the process to complete, then verify the study count matches your old catalog.

::: tip
If the refresh shows errors, confirm the `datafiles/` symlink or path is readable by the web server user (`www-data`): `ls -la /var/www/nada5/datafiles`
:::

### 13.2 Update data access translations

NADA 4 used different terminology for data access types. Review and update the terms and conditions text for each access type through the admin translations interface.

Go to **Admin → Settings → Translate**. The sections most likely to need updates after a 4.x migration are:

- **Public access terms** (`public_access_terms_lang`) — terms and conditions shown when downloading public use files
- **Direct access terms** (`direct_access_terms_lang`) — terms shown for direct download access
- **Licensed request** (`licensed_request_lang`) — labels and instructions on the licensed data request form
- **Licensed access form** (`licensed_access_form_lang`) — field labels on the access application form

Review the text in each section, update it to match your organization's current terms and conditions, and save each section after editing.

::: tip File-based overrides (advanced)
From NADA 5.5 onward, translation overrides can be placed in `userdata/language/english/`. Files in this folder take precedence over the core `application/language/english/` files and are not overwritten by future NADA upgrades — the preferred approach for permanent customizations that go beyond what the UI supports.
:::

### 13.3 Update site theme

NADA 4 themes are not compatible with the Bootstrap 4-based NADA 5 templates. Update the header, footer, and styles using the default `nada52` theme as your starting point. Two options are available:

**Option 1 — Edit the nada52 theme directly**

The simplest approach. No configuration changes required.

*Header* — edit `themes/nada52/header.php`. The default ships with a text-only navbar. To add a logo, locate the commented-out logo block and uncomment it:

```php
<div class="navbar-brand--logo">
    <img src="<?php echo base_url();?>themes/nada52/images/logo.png">
</div>
```

Place your logo file at `themes/nada52/images/logo.png`. To update the subtitle, find and edit:

```php
<div class="nada-site-subtitle">Data Catalog</div>
```

*Footer* — edit `themes/nada52/footer.php`. The copyright line is generated automatically from the `website_title` site setting. To add a content section above the footer bar, uncomment the `footer_top.php` include:

```php
<?php include_once 'footer_top.php'; ?>
```

Edit `footer_top.php` to add links, logos, or other footer content.

*Styles* — add custom CSS to `themes/nada52/css/custom.css`. This file is designated for user-defined overrides and takes effect automatically. Do not edit `style.css` or `bootstrap.min.css` directly.

**Option 2 — Copy the theme and set it as active**

Safer for future upgrades: a new NADA release will not overwrite your custom theme folder.

```bash
sudo cp -r /var/www/nada5/themes/nada52 /var/www/nada5/themes/mytheme
sudo chown -R www-data:www-data /var/www/nada5/themes/mytheme
```

Activate it in `application/config/template.php`:

```php
$template['theme_name'] = 'mytheme';
```

Then edit `themes/mytheme/header.php`, `themes/mytheme/footer.php`, and `themes/mytheme/css/custom.css` following the same steps as Option 1.

### 13.4 Configure SMTP

Email is required for user registration, password reset, and data access request workflows.

For NADA 5.6, add your SMTP credentials to `application/config/auth.local.php`. Alternatively, configure SMTP through the admin interface at **Settings → Settings → SMTP settings**.

Test by using the **Forgot password** link on the login page and confirming delivery to the target email account.

See [Email configurations](/installation-guide/configurations/email) for full details.

### 13.5 Configure Google Analytics

NADA supports Google Analytics 4 (GA4).

1. In your Google Analytics account, create a GA4 property and copy the Measurement ID (format: `G-XXXXXXXXXX`)
2. Add the tracking snippet to your active theme's `head.php`, just before the closing `</head>` tag:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

3. Verify tracking under **GA4 → Reports → Realtime** by browsing a few catalog pages

See [Google Analytics](/installation-guide/configurations/google-analytics) for additional options including file download tracking.

---

## 14. Disable maintenance mode

```php
$config["maintenance_mode"] = 0;
```

---

## 15. Production checklist

Before switching DNS or directing live traffic to the new install:

- [ ] **`index.php`**: `ENVIRONMENT` set to `'production'` — the stock file defaults to `'development'` and **must** be changed:
  ```php
  define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'production');
  ```
- [ ] `database.php`: `db_debug` is `FALSE`
- [ ] `auth.local.php`: all credentials filled in; file permissions set to `640`
- [ ] Maintenance mode disabled
- [ ] Batch DDI refresh completed; study count matches old catalog
- [ ] At least one study detail page tested end-to-end
- [ ] At least one file download tested
- [ ] Admin login works with existing credentials
- [ ] Email delivers — tested via forgot-password flow
- [ ] Google Analytics tracking confirmed in GA4 Realtime view
- [ ] Apache error log is clean: `sudo tail -f /var/log/apache2/nada5-error.log`

---

## 16. Debugging

| Symptom | Where to look | Fix |
|---------|--------------|-----|
| Upgrade controller returns 404 | Apache error log | `AllowOverride All` in VirtualHost; `sudo a2enmod rewrite` then reload Apache |
| SQL step fails on upgrade page | Text output on the upgrade page | Run the statement in `mysql` CLI; see error table in Step 8 |
| Blank page / HTTP 500 | `/var/log/apache2/nada5-error.log`, `logs/` in NADA root | Temporarily set `ENVIRONMENT` to `development` in `index.php`; check extensions: `php -m \| grep mysqli` |
| Studies missing after migration | — | Batch DDI refresh not yet run — see Step 13.1 |
| DDI refresh fails or returns errors | `logs/` in NADA root | `datafiles/` symlink broken or wrong ownership; check with `ls -la /var/www/nada5/datafiles` |
| File downloads return 404 | — | Verify symlink target; or set path in Admin → Settings → Survey Catalog Settings → Catalog folder |
| `cli/migrate` command fails | Terminal output | Confirm working directory is `/var/www/nada5`; verify PHP version and `database.php` |
| Email not delivered | NADA logs, admin SMTP panel | Check `auth.local.php` credentials; confirm SMTP port not blocked by firewall |
| Site shows PHP errors publicly | `index.php` | `ENVIRONMENT` not changed to `production` |

**Log file locations**

| Log | Path |
|-----|------|
| Apache error log | `/var/log/apache2/nada5-error.log` (or as set in VirtualHost) |
| NADA application log | `/var/www/nada5/logs/log-[date].php` |
| MySQL error log | `/var/log/mysql/error.log` |

**Temporarily enable on-screen errors for debugging**

In `index.php`, change the environment to `development`. Revert to `production` before going live.

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');
```
