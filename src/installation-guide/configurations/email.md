# Email configurations

For the NADA to function correctly it is important that this step be completed.

Many of the functions within the NADA – such as registration and applying for access to datasets require that the NADA be able to send emails to users. 

There are two ways to setup your email configurations. 1) Create a email.php file in the application/config folder 2) Edit email settings on the site configurations page.

## 1. Configure email via email config file

A. Open the file application/config/email.php in notepad

B. Fill in the section using SMTP server with authentication enabled highlighted in below image

![](/images/smtp-config.png)

C. For Gmail user will have to fill the gmail smtp section shown as below

![](/images/gmail-email-config.png)

D. Save file

:::tip Note
Using a file for email configuration disable the email configuration page from the site administration.
:::


## 2. Configure email via site administration

A.	Login to your NADA as an administrator

B.	Go to Site administration, click on the Settings menu and choose “Settings”

C.	Find the section “SMTP settings”

![](/images/smtp-settings.png)

D.	If the PHP/web server is configured to send email using PHP’s MAIL function, select the first option and don’t fill in anything else.

If your organization has a mail server and has have a dedicated account that can be setup for NADA, use the following settings: Check the radio button “Use SMTP Server”

E.	Enter the host name for the server

F.	Enter the port used by the server to send mail

G.	If required, enter the user name used to send mail on the server

H.	Enter the password used to send mail on the server

:::tip Note
If the organization does not own a mail server, a Gmail account can be configured to be used with NADA.
:::

* Check the radio button “Use SMTP Server”

* Host name:  ssl://smtp.googlemail.com or ssl://smtp.gmail.com

* SMTP port: 465

* Account username: email-address@gmail.com

* Account password: password for the gmail account

**Test the email settings**

The quickest way to test if the email settings are working is to use the “forgot password” option from the user login page. 

*	Click on forgot password 

![](/images/forgot-password.png)
 
*	Enter the administrator or any other accounts email address. 

*	Check to the email account the mail was sent to.

*	If no mail is received the settings are wrong and need to be corrected.

