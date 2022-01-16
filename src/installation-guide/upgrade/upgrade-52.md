# Upgrade from 5.x to 5.2

This upgrade covers all changes for NADA 5.0 to NADA 5.2. If you are not sure which version of NADA 5 you are upgrading from, you can run all of them safely. 


## 1. Backup database
Before you make any changes to the database, make sure to backup your database.


## 2: Update database
Use a database client such as PHPMyAdmin/ MySQL Workbench or Command line (CLI) to connect to the database to apply these changes.


### Database changes for 5.0.4 to 5.0.5

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

### Database changes from 5.0. to 5.0.6

```sql

-- api_keys 
ALTER TABLE `api_keys` DROP INDEX `key_UNIQUE`;
ALTER TABLE `api_keys` CHANGE `key` `api_key` VARCHAR(255) NOT NULL;
ALTER TABLE `api_keys` ADD UNIQUE KEY `idx_api_key_unq` (`api_key`);
```

### Database changes from 5.0.6 to 5.2

```sql

-- api logs
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


drop table if exists `data_classifications`;
CREATE TABLE `data_classifications` (
  `id` int NOT NULL,
  `code` varchar(45) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) DEFAULT CHARSET=utf8;


LOCK TABLES `data_classifications` WRITE;
/*!40000 ALTER TABLE `data_classifications` DISABLE KEYS */;
INSERT INTO `data_classifications` (id,code,title) VALUES 
(1,'public','Public use'),
(2,'official','Official use'),
(3,'confidential','Confidential');
/*!40000 ALTER TABLE `data_classifications` ENABLE KEYS */;
UNLOCK TABLES;

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


insert into facets(name,title,facet_type,enabled)
values 
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

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
insert into roles(id,name,description, weight, is_admin, is_locked) values 
(1,'admin','It is the site administrator and has access to all site content', 0,1,1),
(2,'user','General user account with no access to site administration', 0,1,1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;



CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- migrate admins from previous version
insert into user_roles (user_id, role_id) select user_id, group_id from users_groups where group_id=1;


drop table survey_types;

CREATE TABLE `survey_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `weight` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`code`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(1,'survey','Survey',100);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(2,'geospatial','Geospatial',90);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(3,'timeseries','Time series',80);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(4,'document','Document',50);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(5,'table','Table',70);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(6,'image','Photo',40);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(7,'script','Script',30);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(8,'visualization','Visualization',60);
INSERT INTO `survey_types`(`id`,`code`,`title`, weight) VALUES(9,'video','Video',40);



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
)  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE `survey_widgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int NOT NULL,
  `widget_uuid` varchar(145) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid_uuid` (`sid`,`widget_uuid`) USING BTREE
)  AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



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

### Update **surveys** table

```sql
-- surveys
ALTER TABLE `surveys` ADD `doi` varchar(200) DEFAULT NULL;
ALTER TABLE `surveys` ADD `data_class_id` int DEFAULT NULL;
ALTER TABLE `surveys` ADD `var_keywords` mediumtext;


-- surveys fulltext index
ALTER TABLE `surveys` DROP INDEX `ft_keywords`;
ALTER TABLE `surveys` ADD FULLTEXT INDEX `ft_keywords` (`keywords`, `var_keywords`);

```

### Update **variables** table
If you catalog contains a large number of rows for variables (>1 million rows), the sql statements to alter columns might take a very long time or fail. There are two options provided to update the table.

**Update option 1**

```sql 
-- variables table
ALTER TABLE `variables` ADD `keywords` text;
ALTER TABLE `variables` DROP INDEX `idx_nm_lbl_cat_qstn`;
alter table variables
ADD FULLTEXT INDEX `idx_nm_lbl_cat_qstn` (`name`,`labl`,`catgry`,`qstn`,`keywords`);

```

**Update option 2**: Run these only if option 1 does not work for you

```sql
-- rename variables table 
ALTER TABLE `variables` RENAME TO  `variables_old` ;

-- delete table
DROP TABLE `variables`;

-- create new variables table
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
)  DEFAULT CHARSET=utf8;

-- copy data
insert into variables (uid,sid,fid,vid,name,labl,qstn,catgry,metadata) 
    select uid,sid,fid,vid,name,labl,qstn,catgry,metadata from variables_old;

-- remove variables_old table
drop table variables_old;
```


### Remove old user permissions tables
User permissions has been replaced with a new implementation. The following tables can be removed.

```sql

-- remove user roles + groups 
drop table group_permissions;
drop table group_repo_access;
drop table groups;
drop table permission_urls;
drop table permissions;
drop table repo_perms_groups;
drop table repo_perms_urls;
drop table user_repo_permissions_disabled;
```


## 3: NADA theme changes
The NADA theme has been updated to use Bootstrap 4 with FontAwesome5. The default theme name has changed from `nada` to `nada52`. 

To keep your customizations such as the header, site logo and other styles, follow these steps:

1. Change your current theme to `nada52` by editing the `application/config/template.php` file.
2. Copy the header.php and your site logo to the nada52 folder. 
3. If you had made style changes, you can transfer them by copying all your styles to the nada52/css/custom.css file. 

