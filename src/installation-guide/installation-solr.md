# Installation (SOLR Fulltext search)

Solr is the popular, blazing-fast, open source enterprise search platform built on Apache Lucene™. - https://solr.apache.org/

Solr provides a much faster and better fulltext search as compared to the built-in database search. To use Solr with NADA, the steps provided below are for Solr 9. The same steps can be used for older versions of Solr with some minor changes.

## Solr installation on Windows

1. Download the Solr 9 binary zip package - https://solr.apache.org/downloads.html
2. Extract the zip file to a folder e.g. c:\solr
3. Solr requires JAVA installed on the machine. To download JAVA, visit https://jdk.java.net/19/ and download the version available for Windows:

<img src="https://user-images.githubusercontent.com/223824/200645009-657f8f28-033e-4d43-a3e9-38a3d7cdd21a.png" />

4. Extract the Java zip to a folder e.g. c:\java
5. For Solr to find Java on your machine, you'll need to create a environment variable for `JAVA_HOME`. Click on the system Start menu and search for `system environment variables`, open the settings page and then click on the `Environment Variables` option.

![image](https://user-images.githubusercontent.com/223824/200649307-8a069cc9-bad4-4b4d-abe8-ea8e34ab01f4.png)


Under `System variables`, click on the `New` button to create a new variable. For the `variable name` type `JAVA_HOME` and provide path to the folder where you have installed Java.

![image](https://user-images.githubusercontent.com/223824/200650274-5fef9594-8321-450f-9056-ff0b8b84dac3.png)


7. Test Solr installation: Go to the start menu and search for `Command` or `cmd` and open the App. Now switch to the folder where you have installed Solr by typing:

```bash
  cd c:\solr
```

To start Solr, type:

```bash
  bin/solr start
```

If the command was successful, you'll see the message reporting the status of Solr and the URL where Solr is running e.g. `http://localhost:8983`

8. Open the web browser and visit `http://localhost:8983` to confirm that Solr is running.
9. Go back to the command line and type `bin/solr stop` to stop Solr. 
10. Solr must be configured as service otherwise whenever your system restarts or Solr application crashes, it will not start on its own. 

Solr on Windows does not provide any built-in options to run as a service. To run Solr as service, we will use a third party tool NSSM to create a Windows service.

a. Download NSSM - https://nssm.cc/download

b. Extract NSSM to a folder - c:\nssm

c. Open `command line` and change folder to c:\nssm and run:

```
  nssm install solr9
```

This will open NSSM Service installer:

![image](https://user-images.githubusercontent.com/223824/200653863-0eba7922-856f-413c-ac75-0d03aa85f1fa.png)

Fill in the information with Solr path and start options:

* Path: Path to the Solr executable file
* Startup directory: Path to your Solr/bin folder
* Arguments: `start -f -p 8983`

Switch to the tab `Details`:

![image](https://user-images.githubusercontent.com/223824/200654641-7e963800-7d08-461e-b281-ea3964df26ea.png)

Precess `Install service` to finish the installation.

13. Now you can manage Solr via System services to start, stop and set it to automatically start on system reboot.
14. Visit http://localhost:8983 to confirm Solr is running. If you don't see it running, go to the 'Services' and change the service status to start.

## Create Solr core/collection for NADA

To use Solr with NADA, you'll need to create a new core/collection. To create a new core, you can do that using the following command:

```
bin/solr create_core -c nada
```

## Update Solr schema file 

todo

