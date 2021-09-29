# Installation using GIT

You can use GIT to install NADA, make sure your web server meets the software requirements, [see installation page](/installation-guide/installation). 


## GIT client

For running the GIT commands to get/clone the source code, you'll need to install GIT on your web server or your local machine. There are several options available:

- SourceTree - https://www.sourcetreeapp.com/
- GIT SCM - https://git-scm.com/downloads
- Github Desktop - https://desktop.github.com/

There are many other GIT tools available, you can use whichever you prefer. Almost all GIT tools, come with a command line (CLI) tool. We will be using the GIT CLI commands.

## Download NADA 

To get the source code, use the following command. This will create a copy of the source code into a local folder on your machine or web server.

```bash

#this will create a folder named nada
git clone https://github.com/ihsn/nada.git 

#to create a different folder name
git clone https://github.com/ihsn/nada.git <folder-name>

```

## NADA 5.2
The above command will download the source code and by default switch to the `master` branch. For NADA 5.2, you'll need to switch to the 5.2 branch, run the below code:

```bash
cd <your-nada-folder>
git checkout nada-5.2
```

## Update dependencies (Composer)
NADA uses a Composer (package manager) for managing third party libraries. To update the dependencies, run these commands to download composer and update any packages/libraries that need updating:

```bash
#Download composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

#update/install packages
php composer.phar install
```

:::tip Composer information
To learn more about composer, see https://getcomposer.org/
:::


If the commands fail to update the packages, you can try:

```bash
#remove the folder for vendor files
rm -rf vendor

#run composer to do a fresh install
rm composer.lock
php composer.phar install
```

## Configure database


