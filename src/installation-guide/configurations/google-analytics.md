# Tracking website traffic using Google Analytics

NADA provides basic website traffic tracking for study pages and downloads. The reports for site visits are available under site administration > reports > Study downloads.


## Using Google Analytics

### 1. Sign up for Google analytics
You will need to sign up for an Analytics account (free), visit: http://www.google.com/analytics


### 2. Create a Google Analytics tracking ID for your website
The Tracking ID will have the format UA-XXXXXXXX-X. You will need to copy the tracking code (will look something like below) and add to your NADA theme.

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-15191223-3');
</script>
```

### 3. Adding the tracking code to your NADA

You will need to findout the theme used by your NADA catalog. To do so, Open the file **/application/config/template.php** and look for the setting `theme_name`, see example below:

```php
$template['theme_name']='wb';
```


The configuration setting `theme_name` points to the folder inside the themes folder in NADA. Locate the theme under the themes folder, and open the `layout.php` file in any text editor such as notepad or notepad++.

Paste the Google site tracking code just before the closing </head> tag and save the file.


### 4. Verify the tracking is working

To verify your tracking code is working, visit the pages on the NADA catalog and then go to Google Analytics to see if you can see any traffic under the `Real Time reports`.


### 5. Tracking file downloads

To track file downloads such as the data files or external resources. You will need to edit the `layout.php` file for your NADA theme and add the following code right after the Google Analytics code you had added before.


```js
$(function() {
    $(document).ajaxSend(function(event, request, settings) {
        _gaq.push(['_trackPageview', settings.url]);
    });

    //track file downloads
    $('.resources .download').on('click', function() {
        _gaq.push(['_trackEvent', 'Downloads', $(this).attr("title"), $(this).attr("href")]);
    });
    
});
```

To view the downloads, see the `Events` page under `BEHAVIOR`.
