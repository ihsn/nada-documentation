# Migración de NADA 4.x a 5.x (Linux)

Esta guía cubre la migración completa desde cualquier instalación de NADA **4.x** hasta la versión más reciente **5.6** en un servidor Linux con Apache y MySQL o MariaDB.

El proceso despliega NADA 5.6 en una **carpeta nueva** junto a la instalación existente, la conecta a la base de datos actual y ejecuta las actualizaciones de base de datos de cada versión en secuencia. La instalación anterior permanece intacta hasta que esté listo para realizar el cambio.

Cadena de migración completa: **4.x → 5.0 → 5.2 → 5.4 → 5.5 → 5.6**

::: warning Requiere tiempo fuera de servicio
Esta es una actualización de versión mayor. Planifique una ventana de mantenimiento. Active el modo de mantenimiento antes de iniciar los pasos de migración de la base de datos.
:::

---

## 1. Verificar la versión actual de NADA

Abra el archivo `index.php` en la raíz de su instalación de NADA existente y busque la constante de versión cerca del inicio del archivo:

```php
define('APP_VERSION', '4.4');
```

Esto indica dónde debe comenzar en la cadena de migración. Si ya está en una versión 5.x, avance a la sección correspondiente.

Mientras el archivo está abierto, también anote la línea `ENVIRONMENT` — necesitará actualizarla antes de entrar en producción:

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');
```

---

## 2. Lista de verificación previa a la migración

- [ ] Versión de PHP: `php -v` — PHP **8.x** es requerido para NADA 5.6; planifique una actualización de PHP si está en 7.x
- [ ] Versión de MySQL / MariaDB: `mysql --version`
- [ ] Espacio en disco disponible para una carpeta de instalación paralela
- [ ] Apache `mod_rewrite` activo: `apache2ctl -M | grep rewrite`
- [ ] Tiene las credenciales de administrador de NADA del catálogo existente

---

## 3. Respaldar la base de datos

Tome una copia de seguridad completa de la base de datos antes de realizar cualquier cambio.

```bash
mysqldump -u nada_user -p nada_db > nada_backup_$(date +%Y%m%d).sql
```

También haga una copia de seguridad de los archivos de configuración:

```bash
cp -r /var/www/nada/application/config ~/nada_config_backup
```

---

## 4. Desplegar NADA 5.6 en una carpeta nueva

Descargue la última versión de NADA 5.6 desde [GitHub Releases](https://github.com/ihsn/nada/releases) y extráigala en un directorio nuevo:

```bash
cd /tmp
# Descargue nada-5.6.zip desde GitHub Releases, luego:
sudo unzip nada-5.6.zip -d /var/www/nada5
sudo chown -R www-data:www-data /var/www/nada5
sudo mkdir -p /var/www/nada5/files /var/www/nada5/logs
sudo chmod -R 755 /var/www/nada5
```

Copie la configuración de base de datos existente a la nueva instalación — esto conecta NADA 5 a su base de datos actual:

```bash
sudo cp /var/www/nada/application/config/database.php \
  /var/www/nada5/application/config/database.php
```

Abra el archivo `database.php` copiado y actualice dos configuraciones:

```php
$db['default']['dbdriver'] = 'mysqli';   // era 'mysql' en NADA 4
$db['default']['db_debug'] = FALSE;
```

---

## 5. Configurar la carpeta datafiles

La carpeta `datafiles/` contiene todo el contenido subido: archivos DDI/XML, microdatos, documentos y recursos asociados. La nueva instalación necesita acceso a esta carpeta. Elija una opción:

**Opción A — Enlace simbólico (recomendado)**

Crea un puntero a la carpeta existente sin duplicar ningún archivo:

```bash
sudo ln -s /var/www/nada/datafiles /var/www/nada5/datafiles
```

Verifique el enlace:

```bash
ls -la /var/www/nada5/datafiles
```

**Opción B — Copiar**

Use esta opción si los enlaces simbólicos no son posibles en su entorno o si desea una copia completamente independiente:

```bash
sudo cp -r /var/www/nada/datafiles /var/www/nada5/datafiles
sudo chown -R www-data:www-data /var/www/nada5/datafiles
```

::: tip Catálogos grandes
Para catálogos con carpetas `datafiles/` de gran tamaño, la Opción B puede requerir mucho tiempo y espacio en disco. La Opción A es ampliamente preferida.
:::

---

## 6. Activar el modo de mantenimiento

Edite `application/config/config.php` en la nueva instalación de NADA 5:

```php
$config["maintenance_mode"] = 1;
```

---

## 7. Configurar Apache

Cree un virtual host para la nueva instalación. Use un nombre de host de prueba o un puerto alternativo para probar antes de cambiar el tráfico de producción:

```bash
sudo nano /etc/apache2/sites-available/nada5.conf
```

```apache
<VirtualHost *:80>
    ServerName nada5-staging.ejemplo.org
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

## 8. Ejecutar la migración de base de datos 4.x → 5.0

::: danger Cambios irreversibles en la base de datos
Los pasos de esta sección realizan cambios irreversibles en su base de datos. Confirme que el respaldo del Paso 3 está completo antes de continuar.
:::

Abra el controlador de migración en su navegador:

```
http://nada5-staging.ejemplo.org/index.php/nada5_upgrade/run
```

La página ejecutará cada paso de migración y mostrará el resultado:

- **Éxito:** el paso aparece con estado completado
- **Fallo:** se muestra la sentencia SQL que falló junto con el mensaje de error

**Ejecutar sentencias SQL fallidas manualmente**

Si algún paso falla, conéctese a la base de datos y ejecute la sentencia fallida directamente:

```bash
mysql -u nada_user -p nada_db
```

Pegue la sentencia SQL del resultado del fallo. Errores comunes:

| Error | Significado | Acción |
|-------|-------------|--------|
| `Duplicate column name` | El cambio ya fue aplicado | Omitir — es seguro ignorarlo |
| `Table doesn't exist` | Un paso previo falló | Corrija el fallo anterior primero, luego reintente |
| `Duplicate entry` | Los datos ya fueron insertados | Omitir — es seguro ignorarlo |

Después de corregir cualquier fallo, recargue la URL de actualización para confirmar que no quedan errores.

---

## 9. Aplicar cambios de base de datos 5.0 → 5.2

Conéctese a su base de datos:

```bash
mysql -u nada_user -p nada_db
```

Ejecute los siguientes bloques SQL en orden.

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

-- migrar administradores existentes de la versión anterior
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

### Actualizar tabla surveys

```sql
ALTER TABLE `surveys` ADD `doi` varchar(200) DEFAULT NULL;
ALTER TABLE `surveys` ADD `data_class_id` int DEFAULT NULL;
ALTER TABLE `surveys` ADD `var_keywords` mediumtext;

ALTER TABLE `surveys` DROP INDEX `ft_keywords`;
ALTER TABLE `surveys` ADD FULLTEXT INDEX `ft_keywords` (`keywords`, `var_keywords`);
```

### Actualizar tabla variables

Para catálogos con menos de un millón de filas de variables use la **Opción 1**. Para catálogos más grandes use la **Opción 2**.

**Opción 1 — ALTER TABLE (recomendado para la mayoría de los catálogos)**

```sql
ALTER TABLE `variables` ADD `keywords` text;
ALTER TABLE `variables` DROP INDEX `idx_nm_lbl_cat_qstn`;
ALTER TABLE variables ADD FULLTEXT INDEX `idx_nm_lbl_cat_qstn` (`name`,`labl`,`catgry`,`qstn`,`keywords`);
```

**Opción 2 — Recrear tabla (usar para catálogos con >1M filas de variables)**

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

### Eliminar tablas de permisos anteriores

El sistema de permisos fue reemplazado en la versión 5.2. Elimine las tablas antiguas:

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

## 10. Aplicar cambios de base de datos 5.2 → 5.4

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

## 11. Aplicar cambios de base de datos 5.4 → 5.5 y ejecutar migraciones

```sql
ALTER TABLE `users`
  ADD COLUMN `forgot_request_ts` INT NULL,
  ADD COLUMN `forgot_request_count` INT DEFAULT 0;

ALTER TABLE `public_requests`
  ADD COLUMN `title` VARCHAR(500) NULL AFTER `surveyid`;
```

Luego ejecute el ejecutor de migraciones PHP desde la raíz de NADA 5:

```bash
cd /var/www/nada5
php index.php cli/migrate latest
```

---

## 12. Aplicar configuración 5.5 → 5.6 y ejecutar migraciones

Cree el archivo de configuración de autenticación desde la plantilla:

```bash
cp application/config/auth.local.sample.php application/config/auth.local.php
```

Abra `auth.local.php` y complete sus credenciales SMTP y cualquier configuración de proveedor OAuth. Este archivo no debe ser incluido en el control de versiones.

Luego ejecute el ejecutor de migraciones:

```bash
cd /var/www/nada5
php index.php cli/migrate latest
```

---

## 13. Tareas posteriores a la migración

Los siguientes pasos son específicos de la actualización 4.x → 5.x y no son necesarios para actualizaciones dentro de la serie 5.x.

### 13.1 Actualización masiva DDI (requerida)

Los archivos DDI/XML en `datafiles/` contienen los metadatos oficiales de los estudios. La actualización masiva lee esos archivos y repopula el esquema de base de datos de NADA 5 — sin este paso, los metadatos de los estudios estarán incompletos.

1. Inicie sesión en la interfaz de administración de NADA 5
2. Navegue a: `http://su-sitio/index.php/admin/catalog/batch_refresh`
3. Seleccione todos los estudios
4. Haga clic en **Refresh DDI**

Espere a que el proceso se complete y verifique que el recuento de estudios coincide con el catálogo anterior.

::: tip
Si la actualización muestra errores, confirme que el enlace simbólico o la ruta de `datafiles/` es accesible por el usuario del servidor web (`www-data`): `ls -la /var/www/nada5/datafiles`
:::

### 13.2 Actualizar traducciones de acceso a datos

NADA 4 utilizaba terminología diferente para los tipos de acceso a datos. Revise y actualice el texto de los términos y condiciones para cada tipo de acceso a través de la interfaz de traducciones del administrador.

Vaya a **Admin → Settings → Translate**. Las secciones que probablemente necesiten actualización después de una migración 4.x son:

- **Términos de acceso público** (`public_access_terms_lang`) — términos y condiciones mostrados al descargar archivos de uso público
- **Términos de acceso directo** (`direct_access_terms_lang`) — términos mostrados para acceso de descarga directa
- **Solicitud de datos con licencia** (`licensed_request_lang`) — etiquetas e instrucciones en el formulario de solicitud de datos con licencia
- **Formulario de acceso con licencia** (`licensed_access_form_lang`) — etiquetas de campos en el formulario de solicitud de acceso

Revise el texto en cada sección, actualícelo para que corresponda a los términos y condiciones actuales de su organización, y guarde cada sección después de editar.

::: tip Anulaciones basadas en archivos (avanzado)
Desde NADA 5.5 en adelante, las anulaciones de traducción pueden colocarse en `userdata/language/spanish/`. Los archivos en esta carpeta tienen prioridad sobre los archivos principales en `application/language/spanish/` y no son sobreescritos por futuras actualizaciones de NADA — el enfoque preferido para personalizaciones permanentes que van más allá de lo que admite la interfaz de usuario.
:::

### 13.3 Actualizar el tema del sitio

Los temas de NADA 4 no son compatibles con las plantillas de NADA 5 basadas en Bootstrap 4. Actualice el encabezado, el pie de página y los estilos usando el tema predeterminado `nada52` como punto de partida. Hay dos opciones disponibles:

**Opción 1 — Editar el tema nada52 directamente**

El enfoque más simple. No se requieren cambios de configuración.

*Encabezado* — edite `themes/nada52/header.php`. El tema predeterminado viene con una barra de navegación solo de texto. Para agregar un logotipo, localice el bloque de logotipo comentado y descoméntelo:

```php
<div class="navbar-brand--logo">
    <img src="<?php echo base_url();?>themes/nada52/images/logo.png">
</div>
```

Coloque su archivo de logotipo en `themes/nada52/images/logo.png`. Para actualizar el texto del subtítulo, busque y edite:

```php
<div class="nada-site-subtitle">Data Catalog</div>
```

*Pie de página* — edite `themes/nada52/footer.php`. La línea de derechos de autor se genera automáticamente a partir de la configuración del sitio `website_title`. Para agregar una sección de contenido encima de la barra del pie de página, descomente el include de `footer_top.php`:

```php
<?php include_once 'footer_top.php'; ?>
```

Edite `footer_top.php` para agregar enlaces, logotipos u otro contenido del pie de página.

*Estilos* — agregue CSS personalizado a `themes/nada52/css/custom.css`. Este archivo está designado para anulaciones definidas por el usuario y tiene efecto automáticamente. No edite `style.css` ni `bootstrap.min.css` directamente.

**Opción 2 — Copiar el tema y configurarlo como activo**

Más seguro para futuras actualizaciones: una nueva versión de NADA no sobreescribirá su carpeta de tema personalizada.

```bash
sudo cp -r /var/www/nada5/themes/nada52 /var/www/nada5/themes/mitema
sudo chown -R www-data:www-data /var/www/nada5/themes/mitema
```

Actívelo en `application/config/template.php`:

```php
$template['theme_name'] = 'mitema';
```

Luego edite `themes/mitema/header.php`, `themes/mitema/footer.php` y `themes/mitema/css/custom.css` siguiendo los mismos pasos de la Opción 1.

### 13.4 Configurar SMTP

El correo electrónico es necesario para el registro de usuarios, el restablecimiento de contraseñas y los flujos de trabajo de solicitud de acceso a datos.

Para NADA 5.6, agregue sus credenciales SMTP a `application/config/auth.local.php`. Alternativamente, configure SMTP a través de la interfaz de administración en **Settings → Settings → SMTP settings**.

Pruebe usando el enlace **Forgot password** en la página de inicio de sesión y confirme la entrega al correo electrónico de destino.

Consulte [Configuración de correo electrónico](/installation-guide/configurations/email) para más detalles.

### 13.5 Configurar Google Analytics

NADA admite Google Analytics 4 (GA4).

1. En su cuenta de Google Analytics, cree una propiedad GA4 y copie el ID de medición (formato: `G-XXXXXXXXXX`)
2. Agregue el fragmento de seguimiento a `head.php` de su tema activo, justo antes de la etiqueta de cierre `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Reemplace `G-XXXXXXXXXX` con su ID de medición real.

3. Verifique el seguimiento en **GA4 → Reports → Realtime** navegando por algunas páginas del catálogo

Consulte [Google Analytics](/installation-guide/configurations/google-analytics) para opciones adicionales incluyendo el seguimiento de descargas de archivos.

---

## 14. Desactivar el modo de mantenimiento

```php
$config["maintenance_mode"] = 0;
```

---

## 15. Lista de verificación de producción

Antes de cambiar el DNS o dirigir tráfico real a la nueva instalación:

- [ ] **`index.php`**: `ENVIRONMENT` establecido en `'production'` — el archivo original tiene `'development'` como valor predeterminado y **debe** cambiarse:
  ```php
  define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'production');
  ```
- [ ] `database.php`: `db_debug` es `FALSE`
- [ ] `auth.local.php`: todas las credenciales completadas; permisos del archivo configurados en `640`
- [ ] Modo de mantenimiento desactivado
- [ ] Actualización masiva DDI completada; el recuento de estudios coincide con el catálogo anterior
- [ ] Al menos una página de detalle de estudio probada de principio a fin
- [ ] Al menos una descarga de archivo probada
- [ ] El inicio de sesión de administrador funciona con las credenciales existentes
- [ ] El correo electrónico se entrega — probado mediante el flujo de contraseña olvidada
- [ ] Seguimiento de Google Analytics confirmado en la vista en tiempo real de GA4
- [ ] El registro de errores de Apache está limpio: `sudo tail -f /var/log/apache2/nada5-error.log`

---

## 16. Depuración

| Síntoma | Dónde buscar | Solución |
|---------|-------------|---------|
| El controlador de actualización devuelve 404 | Registro de errores de Apache | `AllowOverride All` en VirtualHost; `sudo a2enmod rewrite` y recargar Apache |
| Un paso SQL falla en la página de actualización | Texto de salida en la página de actualización | Ejecute la sentencia en el CLI de `mysql`; consulte la tabla de errores en el Paso 8 |
| Página en blanco / HTTP 500 | `/var/log/apache2/nada5-error.log`, carpeta `logs/` en la raíz de NADA | Establezca temporalmente `ENVIRONMENT` en `development` en `index.php`; verifique extensiones: `php -m \| grep mysqli` |
| Estudios faltantes después de la migración | — | La actualización masiva DDI aún no se ha ejecutado — consulte el Paso 13.1 |
| La actualización masiva DDI falla o muestra errores | Carpeta `logs/` en la raíz de NADA | Enlace simbólico de `datafiles/` roto o propietario incorrecto; verifique con `ls -la /var/www/nada5/datafiles` |
| Las descargas de archivos devuelven 404 | — | Verifique el destino del enlace simbólico; o establezca la ruta en Admin → Settings → Survey Catalog Settings → Catalog folder |
| El comando `cli/migrate` falla | Salida del terminal | Confirme que el directorio de trabajo es `/var/www/nada5`; verifique la versión de PHP y `database.php` |
| El correo electrónico no se entrega | Registros de NADA, panel SMTP del administrador | Verifique las credenciales en `auth.local.php`; confirme que el puerto SMTP no está bloqueado por el firewall |
| El sitio muestra errores de PHP públicamente | `index.php` | `ENVIRONMENT` no ha sido cambiado a `'production'` |

**Ubicaciones de archivos de registro**

| Registro | Ruta |
|----------|------|
| Registro de errores de Apache | `/var/log/apache2/nada5-error.log` (o según lo definido en VirtualHost) |
| Registro de la aplicación NADA | `/var/www/nada5/logs/log-[fecha].php` |
| Registro de errores de MySQL | `/var/log/mysql/error.log` |

**Habilitar temporalmente errores en pantalla para depuración**

En `index.php`, cambie el entorno a `development`. Revierta a `production` antes de entrar en producción.

```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');
```
