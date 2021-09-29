# Debugging

By default NADA does not show any errors, warnings. use these settings to enable debug mode to see the errors written to a log file or displayed on the page. 

## Enable error logging

To enable error logging, edit the file `application/config/config.php` and look for `error_threshold`. The default value is set to `0`, change that to `1` to enable error logging. 

The files are written to the folder `logs`, make sure the folder is writable by the webserver. For any PHP or database errors, you will see log files in the `logs` folder.


## Enable database debugging

For debugging database related issues, you can enable database debugging by editing the `application/config/database.php` file and change the value for the config option `db_debug` to `TRUE`. And database errors will be printed on the page.


