# Email Configuration Guide

This guide covers email configuration for NADA using SMTP and SendGrid email drivers.

## Table of Contents

- [Quick Start](#quick-start)
- [Configuration File Location](#configuration-file-location)
- [Email Driver Selection](#email-driver-selection)
- [SMTP Configuration](#smtp-configuration)
- [SendGrid Configuration](#sendgrid-configuration)
- [Common Configuration Options](#common-configuration-options)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

All email configuration is managed in:
```
application/config/email.php
```

The configuration file uses a driver-based system that supports:
- **SMTP** - Standard SMTP servers (Gmail, Office 365, etc.)
- **SendGrid** - SendGrid email service
- **Microsoft Graph** - Office 365 via OAuth (future implementation)

---

## Configuration File Location

**File:** `application/config/email.php`

This file overrides any email settings stored in the database.

---

## Email Driver Selection

### Choose Your Email Driver

```php
$config['email_driver'] = 'smtp';  // Options: 'smtp', 'sendgrid', 'microsoft_graph'
```

**Options:**
- `smtp` - Use standard SMTP server
- `sendgrid` - Use SendGrid email service
- `microsoft_graph` - Use Microsoft Graph API (not yet implemented)

---

## SMTP Configuration

### Basic SMTP Setup

```php
// Select SMTP driver
$config['email_driver'] = 'smtp';

// SMTP Server Settings
$config['smtp_host']     = 'smtp.example.com';     // SMTP server hostname
$config['smtp_port']     = 587;                    // SMTP port (25, 465, 587)
$config['smtp_auth']     = true;                   // Enable authentication
$config['smtp_user']     = 'username@example.com'; // SMTP username
$config['smtp_pass']     = 'your-password';        // SMTP password
$config['smtp_crypto']   = 'tls';                  // Encryption: 'tls' or 'ssl'

// Sender Information (displayed in emails)
$config['smtp_email']        = 'noreply@example.com';  // FROM email address
$config['smtp_display_name'] = 'Your Organization';    // FROM display name

// Debug Settings (optional)
$config['smtp_debug']    = 0;                      // 0=off, 2=recommended for debugging
$config['debug_output']  = 'codeigniter';          // 'html', 'echo', 'codeigniter'
```

### SMTP Configuration Options

| Setting | Type | Description | Example Values |
|---------|------|-------------|----------------|
| `smtp_host` | string | SMTP server hostname or IP address | `smtp.gmail.com`, `localhost` |
| `smtp_port` | integer | SMTP server port number | `25`, `465` (SSL), `587` (TLS) |
| `smtp_auth` | boolean | Enable SMTP authentication | `true`, `false` |
| `smtp_user` | string | SMTP username (usually your email) | `user@example.com` |
| `smtp_pass` | string | SMTP password or app password | `your-password` |
| `smtp_crypto` | string | Encryption method | `''` (none), `'tls'`, `'ssl'` |
| `smtp_email` | string | Email address to send FROM | `noreply@example.com` |
| `smtp_display_name` | string | Sender's display name | `NADA Administrator` |
| `smtp_timeout` | integer | Connection timeout in seconds | `30` (default) |
| `smtp_auto_tls` | boolean | Auto-enable TLS if available | `false` (default) |
| `smtp_debug` | integer | Debug output level | `0` (off), `1`-`4` (verbose) |
| `debug_output` | string | Where to output debug info | `'codeigniter'`, `'html'`, `'echo'` |

### SMTP Examples

#### Example 1: Gmail with TLS (Port 587)

```php
$config['email_driver']      = 'smtp';
$config['smtp_host']         = 'smtp.gmail.com';
$config['smtp_port']         = 587;
$config['smtp_auth']         = true;
$config['smtp_user']         = 'your-email@gmail.com';
$config['smtp_pass']         = 'your-app-password';
$config['smtp_crypto']       = 'tls';
$config['smtp_email']        = 'your-email@gmail.com';
$config['smtp_display_name'] = 'Your Name';
```

**Note:** Gmail requires "App Passwords" if 2FA is enabled.  
Generate at: https://myaccount.google.com/apppasswords

#### Example 2: Gmail with SSL (Port 465)

```php
$config['email_driver']      = 'smtp';
$config['smtp_host']         = 'smtp.gmail.com';
$config['smtp_port']         = 465;
$config['smtp_auth']         = true;
$config['smtp_user']         = 'your-email@gmail.com';
$config['smtp_pass']         = 'your-app-password';
$config['smtp_crypto']       = 'ssl';
$config['smtp_email']        = 'your-email@gmail.com';
$config['smtp_display_name'] = 'Your Name';
```

#### Example 3: Office 365 / Outlook.com

```php
$config['email_driver']      = 'smtp';
$config['smtp_host']         = 'smtp.office365.com';
$config['smtp_port']         = 587;
$config['smtp_auth']         = true;
$config['smtp_user']         = 'username@yourdomain.com';
$config['smtp_pass']         = 'your-password';
$config['smtp_crypto']       = 'tls';
$config['smtp_email']        = 'username@yourdomain.com';
$config['smtp_display_name'] = 'Your Organization';
```

#### Example 4: Local SMTP Server (No Authentication)

```php
$config['email_driver']      = 'smtp';
$config['smtp_host']         = 'localhost';
$config['smtp_port']         = 25;
$config['smtp_auth']         = false;
$config['smtp_email']        = 'noreply@yourdomain.com';
$config['smtp_display_name'] = 'NADA System';
```

#### Example 5: MailHog (Local Testing)

```php
$config['email_driver']      = 'smtp';
$config['smtp_host']         = 'localhost';
$config['smtp_port']         = 1025;
$config['smtp_auth']         = false;
$config['smtp_email']        = 'test@localhost';
$config['smtp_display_name'] = 'NADA Development';
$config['smtp_debug']        = 2;
$config['debug_output']      = 'codeigniter';
```

---

## SendGrid Configuration

### Basic SendGrid Setup

```php
// Select SendGrid driver
$config['email_driver'] = 'sendgrid';

// SendGrid SMTP Settings
$config['smtp_host']     = 'smtp.sendgrid.net';
$config['smtp_port']     = 587;
$config['smtp_auth']     = true;
$config['smtp_user']     = 'apikey';                    // Always 'apikey'
$config['smtp_pass']     = 'your-api-key-here';     // Your SendGrid API key
$config['smtp_crypto']   = 'tls';

// Sender Information (must be verified in SendGrid)
$config['smtp_email']        = 'verified@yourdomain.com';  // Verified sender email
$config['smtp_display_name'] = 'Your Organization';        // FROM display name

// Debug Settings (optional)
$config['smtp_debug']    = 0;                          // 0=off, 2=recommended for debugging
$config['debug_output']  = 'codeigniter';              // 'html', 'echo', 'codeigniter'
```

### SendGrid Configuration Options

| Setting | Type | Description | Example Values |
|---------|------|-------------|----------------|
| `email_driver` | string | Must be set to 'sendgrid' | `'sendgrid'` |
| `smtp_host` | string | SendGrid SMTP server | `'smtp.sendgrid.net'` (fixed) |
| `smtp_port` | integer | SendGrid SMTP port | `587` (TLS) or `465` (SSL) |
| `smtp_auth` | boolean | Always true for SendGrid | `true` |
| `smtp_user` | string | Always 'apikey' for SendGrid | `'apikey'` (fixed) |
| `smtp_pass` | string | Your SendGrid API key | `'SG.xxxx...'` |
| `smtp_crypto` | string | Encryption method | `'tls'` (recommended) or `'ssl'` |
| `smtp_email` | string | **Verified** sender email address | `'verified@yourdomain.com'` |
| `smtp_display_name` | string | Sender's display name | `'NADA Administrator'` |
| `smtp_debug` | integer | Debug output level | `0` (off), `2` (recommended) |
| `debug_output` | string | Where to output debug info | `'codeigniter'`, `'html'` |

### SendGrid Requirements

1. **API Key:**
   - Create at: https://app.sendgrid.com/settings/api_keys
   - Requires "Mail Send" permission
   - Starts with `SG.`

2. **Sender Verification:**
   - Verify sender email at: https://app.sendgrid.com/settings/sender_auth
   - Options:
     - **Single Sender Verification** (easy, good for testing)
     - **Domain Authentication** (recommended for production)

### SendGrid Example Configurations

#### Example 1: SendGrid with TLS (Recommended)

```php
$config['email_driver']      = 'sendgrid';
$config['smtp_host']         = 'smtp.sendgrid.net';
$config['smtp_port']         = 587;
$config['smtp_auth']         = true;
$config['smtp_user']         = 'apikey';
$config['smtp_pass']         = 'your-full-api-key';
$config['smtp_crypto']       = 'tls';
$config['smtp_email']        = 'verified-sender@yourdomain.com';
$config['smtp_display_name'] = 'Your Organization';
```

#### Example 2: SendGrid with SSL

```php
$config['email_driver']      = 'sendgrid';
$config['smtp_host']         = 'smtp.sendgrid.net';
$config['smtp_port']         = 465;
$config['smtp_auth']         = true;
$config['smtp_user']         = 'apikey';
$config['smtp_pass']         = 'your-full-api-key';
$config['smtp_crypto']       = 'ssl';
$config['smtp_email']        = 'verified-sender@yourdomain.com';
$config['smtp_display_name'] = 'Your Organization';
```

#### Example 3: SendGrid with Debug Enabled

```php
$config['email_driver']      = 'sendgrid';
$config['smtp_host']         = 'smtp.sendgrid.net';
$config['smtp_port']         = 587;
$config['smtp_auth']         = true;
$config['smtp_user']         = 'apikey';
$config['smtp_pass']         = 'your-api-key-here';
$config['smtp_crypto']       = 'tls';
$config['smtp_email']        = 'verified-sender@yourdomain.com';
$config['smtp_display_name'] = 'Your Organization';
$config['smtp_debug']        = 2;
$config['debug_output']      = 'codeigniter';
```

**Note:** Debug output will be written to `application/logs/log-YYYY-MM-DD.php`

---

## Common Configuration Options

These settings apply to **both SMTP and SendGrid** drivers.

### Email Formatting

```php
$config['mailtype']  = 'html';      // 'html' or 'text'
$config['charset']   = null;        // null = use site charset, or 'UTF-8'
$config['wordwrap']  = true;        // Enable word wrapping
$config['wrapchars'] = 76;          // Characters per line
$config['priority']  = 3;           // 1=highest, 3=normal, 5=lowest
```

### Legacy Settings (Keep for Compatibility)

```php
$config['useragent'] = 'PHPMailer'; // Email engine indicator
$config['protocol']  = 'smtp';      // Legacy setting (not used by drivers)
```

### SSL/TLS Certificate Verification

For development/testing with self-signed certificates:

```php
$config['smtp_conn_options'] = array(
    'ssl' => array(
        'verify_peer'       => false,
        'verify_peer_name'  => false,
        'allow_self_signed' => true
    )
);
```

**⚠️ Warning:** Never disable SSL verification in production!

---

## Troubleshooting

### Enable Debug Mode

To see detailed SMTP communication:

```php
$config['smtp_debug']   = 2;              // Show server responses
$config['debug_output'] = 'codeigniter';  // Log to files
```

Debug logs are written to: `application/logs/log-YYYY-MM-DD.php`

### View Debug Logs

```bash
# View today's log
tail -100 application/logs/log-$(date +%Y-%m-%d).php

# Search for email errors
grep -i "email\|smtp\|phpmailer" application/logs/log-$(date +%Y-%m-%d).php
```

### Common Issues

#### SMTP Connection Failed

**Problem:** Cannot connect to SMTP server

**Solutions:**
- Check `smtp_host` and `smtp_port` are correct
- Verify firewall allows outbound connections on the SMTP port
- Try alternative ports (587 for TLS, 465 for SSL, 25 for unencrypted)
- Check if your hosting provider blocks outbound SMTP

#### Authentication Failed

**Problem:** Username or password rejected

**Solutions:**
- Verify `smtp_user` and `smtp_pass` are correct
- For Gmail: Use "App Passwords" if 2FA is enabled
- Ensure `smtp_auth` is set to `true`
- Check if account requires additional security settings

#### SendGrid: Sender Identity Not Verified

**Problem:** `The from address does not match a verified Sender Identity`

**Solutions:**
- Verify sender email at: https://app.sendgrid.com/settings/sender_auth
- Ensure `smtp_email` matches a verified sender in SendGrid
- Wait a few minutes after verification for DNS propagation

#### SendGrid: Invalid API Key

**Problem:** `Authentication failed` or `535` error

**Solutions:**
- Generate new API key at: https://app.sendgrid.com/settings/api_keys
- Ensure API key has "Mail Send" permission
- API key must start with `SG.`
- Copy the full API key (shown only once when created)

#### Emails Not Received

**Problem:** `send()` returns true but emails not received

**Solutions:**
- Check recipient's spam/junk folder
- Verify sender email is not blacklisted
- Enable debug mode and check logs
- Test with a different recipient email address
- For SendGrid: Check activity at https://app.sendgrid.com/email_activity

### Test Email Configuration

Use the admin panel to test your email configuration:

1. Go to: **Admin → Site Configurations**
2. Scroll to "Email Configuration"
3. Click "Test Email Configuration"
4. Enter a test recipient email
5. Check logs for any errors

---

## Configuration Priority

The system uses the following priority for sender information:

1. **Priority 1:** `smtp_email` and `smtp_display_name` (from `email.php`)
2. **Priority 2:** `website_webmaster_email` and `website_webmaster_name` (from database)
3. **Priority 3:** `noreply@{domain}` and `'NADA Administrator'` (fallback)

---

## Support

For additional help:

- **SendGrid Documentation:** https://docs.sendgrid.com/
- **PHPMailer Troubleshooting:** https://github.com/PHPMailer/PHPMailer/wiki/Troubleshooting
- **Gmail SMTP Guide:** https://support.google.com/a/answer/176600
- **Office 365 SMTP:** https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365

---

## Quick Reference

### Minimal SMTP Configuration

```php
$config['email_driver']      = 'smtp';
$config['smtp_host']         = 'smtp.example.com';
$config['smtp_port']         = 587;
$config['smtp_auth']         = true;
$config['smtp_user']         = 'user@example.com';
$config['smtp_pass']         = 'password';
$config['smtp_crypto']       = 'tls';
$config['smtp_email']        = 'user@example.com';
$config['smtp_display_name'] = 'Your Name';
```

### Minimal SendGrid Configuration

```php
$config['email_driver']      = 'sendgrid';
$config['smtp_host']         = 'smtp.sendgrid.net';
$config['smtp_port']         = 587;
$config['smtp_user']         = 'apikey';
$config['smtp_pass']         = 'your-api-key';
$config['smtp_crypto']       = 'tls';
$config['smtp_email']        = 'verified@example.com';
$config['smtp_display_name'] = 'Your Organization';
```
