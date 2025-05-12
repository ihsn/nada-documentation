# Upgrade from 5.2 to 5.4

This upgrade covers all changes for NADA 5.2x to NADA 5.4x. 


## 1. Backup database
Before you make any changes to the database, make sure to backup your database.


## 2: Update database
Use a database client such as PHPMyAdmin/ MySQL Workbench or Command line (CLI) to connect to the database to apply these changes.


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

