# Upgrade from 5.2 to 5.4

This upgrade covers database changes from NADA **5.2.x** to **5.4.x**.

Also deploy the NADA **5.4** application files (zip release or Git tag) over your existing install, preserve your `application/config` customizations (especially `database.php` and `email.php`), and clear caches if your environment uses them. Then apply the SQL below.

## 1. Backup database

Before you change the database, take a full backup.

## 2. Update database

Use a database client (phpMyAdmin, MySQL Workbench, or the CLI) to run the following on your NADA database.

### Database changes for 5.2 to 5.4

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
)AUTO_INCREMENT=1;

ALTER TABLE `users` MODIFY COLUMN `forgotten_password_code` varchar(100) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `forgotten_code_expiry` int DEFAULT NULL;
```

