# Content Security Policy (CSP)

## What is Content Security Policy (CSP)?

Content Security Policy (CSP) is a security standard that helps prevent cross-site scripting (XSS), clickjacking, and other code injection attacks by controlling the sources from which content (like scripts, stylesheets, images, fonts, etc.) can be loaded on your website. To learn more about CSP, visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP.

- **Protects against hacking attempts** - Prevents malicious code from running on your site
- **Improves security** - Controls which external resources can be loaded
- **Prevents data theft** - Blocks unauthorized access to your data
- **Compliance** - Helps meet security standards and regulations

## How to Enable or Disable CSP

**Note**: CSP is disabled by default. You should only enable it after testing in report-only mode.


### Using Report-Only Mode (For Testing)

If you want to test CSP without blocking any content:

1. **Enable CSP in report-only mode**
   ```php
   $config['csp_enabled'] = TRUE;
   $config['csp_report_only'] = TRUE;
   ```

2. **Check for violations** in your browser's developer console
3. **When ready**, switch to enforcement mode:
   ```php
   $config['csp_report_only'] = FALSE;
   ```


###  Using the Configuration File (Recommended)

1. **Locate the CSP configuration file**
   - Navigate to your NADA installation folder
   - Go to `application/config/`
   - Open the file `csp.php`

2. **Enable CSP**
   ```php
   $config['csp_enabled'] = TRUE;
   $config['csp_report_only'] = FALSE;
   ```

3. **Disable CSP**
   ```php
   $config['csp_enabled'] = FALSE;
   ```

4. **Save the file** and refresh the web page.


## Adding External Resources to CSP

When you enable CSP, you may need to add external sources (like CDNs, APIs, or third-party services) to allow them to load properly.

### Common External Sources You Might Need

#### **JavaScript Libraries (script-src)**
```php
'script-src' => array(
    "'self'",                    // Your own website
    "https://cdn.jsdelivr.net",  // Bootstrap, jQuery, etc.
    "https://code.jquery.com",   // jQuery CDN
    "https://unpkg.com",         // Unpkg CDN
    "https://cdnjs.cloudflare.com", // Cloudflare CDN
    "https://maps.googleapis.com",   // Google Maps
    "https://api.example.com"    // Your API domain
),
```

#### **CSS and Stylesheets (style-src)**
```php
'style-src' => array(
    "'self'",                    // Your own website
    "https://cdn.jsdelivr.net",  // Bootstrap CSS
    "https://fonts.googleapis.com", // Google Fonts
    "https://cdnjs.cloudflare.com", // Cloudflare CDN
    "'unsafe-inline'"            // Inline styles (if needed)
),
```

#### **Images (img-src)**
```php
'img-src' => array(
    "'self'",                    // Your own website
    "data:",                     // Data URLs (base64 images)
    "https:",                    // HTTPS images
    "https://maps.googleapis.com", // Google Maps images
    "https://your-cdn.com"       // Your image CDN
),
```

#### **Fonts (font-src)**
```php
'font-src' => array(
    "'self'",                    // Your own website
    "https://fonts.gstatic.com", // Google Fonts
    "https://cdn.jsdelivr.net",  // Bootstrap fonts
    "https://cdnjs.cloudflare.com" // Cloudflare CDN
),
```

#### **AJAX/Fetch Requests (connect-src)**
```php
'connect-src' => array(
    "'self'",                    // Your own website
    "https://api.example.com",   // Your API
    "https://analytics.google.com", // Google Analytics
    "https://your-third-party-api.com" // Other APIs
),
```

### How to Add a New Source

1. **Identify the blocked resource**
   - Check your browser's console for CSP violation messages
   - Look for messages like: "Refused to load script from 'https://example.com'"

2. **Find the correct directive**
   - **Scripts** → `script-src`
   - **Styles** → `style-src`
   - **Images** → `img-src`
   - **Fonts** → `font-src`
   - **AJAX requests** → `connect-src`

3. **Add the source to the configuration**
   ```php
   // Example: Adding a new script source
   'script-src' => array(
       "'self'",
       "https://cdn.jsdelivr.net",
       "https://your-new-script.com"  // Add your new source here
   ),
   ```

4. **Save the file and test**
   - Refresh your website
   - Check the browser console for any remaining violations


### Troubleshooting External Resources

#### **Problem: External script not loading**
**Solution:**
```php
'script-src' => array(
    "'self'",
    "https://your-external-script.com"  // Add the domain here
),
```

#### **Problem: External CSS not loading**
**Solution:**
```php
'style-src' => array(
    "'self'",
    "https://your-external-css.com"  // Add the domain here
),
```

#### **Problem: Images from external domain not showing**
**Solution:**
```php
'img-src' => array(
    "'self'",
    "https://your-image-domain.com"  // Add the domain here
),
```

#### **Problem: AJAX requests to external API failing**
**Solution:**
```php
'connect-src' => array(
    "'self'",
    "https://your-api-domain.com"  // Add the domain here
),
```

### Security Best Practices

1. **Only add trusted sources** - Don't add domains you don't trust
2. **Use HTTPS** - Always use `https://` instead of `http://`
3. **Be specific** - Add exact domains rather than wildcards
4. **Test thoroughly** - Always test after adding new sources
5. **Monitor violations** - Keep an eye on CSP violation reports

### Quick Reference for Common Additions

```php
// Add Google Analytics
'connect-src' => array(
    "'self'",
    "https://www.google-analytics.com",
    "https://analytics.google.com"
),

// Add Google Maps
'script-src' => array(
    "'self'",
    "https://maps.googleapis.com"
),
'img-src' => array(
    "'self'",
    "https://maps.googleapis.com",
    "https://maps.gstatic.com"
),

```


## CSP Settings Explained

### Basic Settings

| Setting | Description | Recommended Value |
|---------|-------------|-------------------|
| `csp_enabled` | Turns CSP on or off | `TRUE` for production |
| `csp_report_only` | Reports violations without blocking | `TRUE` for testing |
| `csp_development_mode` | Uses development-friendly settings | `TRUE` for development |

### Development vs Production

**For Development Environment:**
```php
$config['csp_enabled'] = TRUE;
$config['csp_report_only'] = TRUE;
$config['csp_development_mode'] = TRUE;
```

**For Production Environment:**
```php
$config['csp_enabled'] = TRUE;
$config['csp_report_only'] = FALSE;
$config['csp_development_mode'] = FALSE;
```

**Default Setting (Disabled):**
```php
$config['csp_enabled'] = FALSE;  // CSP is disabled by default
```

## Troubleshooting Common Issues

### Problem: Website looks broken after enabling CSP

**Solution:**
1. Check your browser's developer console for error messages
2. Temporarily enable report-only mode to see what's being blocked
3. Contact your system administrator to adjust the CSP policy

### Problem: External resources (images, scripts) not loading

**Solution:**
1. This is normal behavior - CSP is blocking untrusted sources
2. Your system administrator needs to add the trusted sources to the CSP policy
3. Contact your IT team to update the configuration

### Problem: Forms or AJAX requests not working

**Solution:**
1. CSP might be blocking form submissions to external domains
2. Your system administrator needs to update the `form-action` directive
3. Contact your technical team for assistance

## Checking if CSP is Working

### Method 1: Browser Developer Tools

1. **Open your website** in a web browser
2. **Right-click** and select "Inspect" or "Inspect Element"
3. **Go to the Console tab**
4. **Look for CSP-related messages**:
   - ✅ No CSP violations = CSP is working correctly
   - ❌ CSP violations = Contact your hosting provider or IT consultant

### Method 2: Network Tab

1. **Open browser developer tools**
2. **Go to the Network tab**
3. **Refresh the page**
4. **Look for CSP headers** in the response headers
