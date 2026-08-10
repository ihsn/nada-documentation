# Custom Fields for Public Data Access Requests

This page covers how to configure and use custom fields for public data access request forms.

## Overview

Custom fields allow you to collect additional information from users when they request access to public data files. These fields are configurable and can be added without modifying the database schema manually.

## Features

- **Dynamic Field Creation**: Custom fields are automatically added to the database when needed
- **Multiple Field Types**: Support for text, textarea, select, checkbox, radio, email, number, date, URL, and phone fields
- **Validation Rules**: Built-in validation for required fields and data formats
- **Flexible Configuration**: Easy to add, modify, or disable fields through configuration
- **Cross-Database Support**: Works with both MySQL and SQL Server databases

## Configuration File

Custom fields are configured in the file: `application/config/public_request_fields.php`

### File Structure

```php
<?php
$config['public_request_fields'] = array(
    'field_key' => array(
        'name' => 'database_column_name',
        'type' => 'form_field_type',
        'title' => 'Display Title',
        'required' => true/false,
        'validation' => 'validation_rules',
        'help_text' => 'Help text for users',
        'placeholder' => 'Placeholder text',
        'enum' => array('value' => 'label'),
        'order' => 1,
        'enable' => true/false,
        'data_type' => 'database_field_type'
    )
);
```

## Field Properties

### Required Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `name` | string | Database column name | `'institution'` |
| `type` | string | Form field type | `'text'`, `'select'`, `'textarea'` |
| `title` | string | Display title | `'Research Institution'` |
| `enable` | boolean | Whether field is active | `true` |
| `order` | integer | Display order (1, 2, 3...) | `1` |

### Optional Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `required` | boolean | Field is mandatory | `true` |
| `validation` | string | Validation rules | `'required\|max_length[150]'` |
| `help_text` | string | Help text for users | `'Name of your research institution'` |
| `placeholder` | string | Placeholder text | `'Enter institution name'` |
| `enum` | array | Options for select/radio fields | `array('academic' => 'Academic Research')` |
| `data_type` | string | Database field type | `'string'`, `'text'`, `'int'` |

## Field Types

### Text Input
```php
'institution' => array(
    'name' => 'institution',
    'type' => 'text',
    'title' => 'Research Institution',
    'required' => true,
    'validation' => 'required|max_length[150]',
    'help_text' => 'Name of your research institution or organization',
    'placeholder' => 'Enter institution name',
    'order' => 1,
    'enable' => true,
    'data_type' => 'string',
)
```

### Textarea (Multi-line Text)
```php
'research_description' => array(
    'name' => 'research_description',
    'type' => 'textarea',
    'title' => 'Research Description',
    'required' => true,
    'help_text' => 'Describe your research methodology',
    'placeholder' => 'Please describe your research approach...',
    'order' => 2,
    'enable' => true,
    'data_type' => 'text',
)
```

### Select Dropdown
```php
'research_type' => array(
    'name' => 'research_type',
    'type' => 'select',
    'title' => 'Type of Research',
    'required' => true,
    'validation' => 'required',
    'help_text' => 'Select the type of research you will be conducting',
    'enum' => array(
        'academic' => 'Academic Research',
        'policy' => 'Policy Analysis',
        'commercial' => 'Commercial Research',
        'government' => 'Government Research',
        'ngo' => 'NGO/Non-profit Research',
        'other' => 'Other'
    ),
    'order' => 3,
    'enable' => true,
    'data_type' => 'string',
)
```

### Checkbox
```php
'data_sharing' => array(
    'name' => 'data_sharing',
    'type' => 'checkbox',
    'title' => 'Data Sharing Agreement',
    'required' => true,
    'help_text' => 'I agree to share my research findings',
    'order' => 4,
    'enable' => true,
    'data_type' => 'int',
)
```

### Radio Buttons
```php
'funding_source' => array(
    'name' => 'funding_source',
    'type' => 'radio',
    'title' => 'Primary Funding Source',
    'required' => true,
    'enum' => array(
        'government' => 'Government Grant',
        'foundation' => 'Foundation Grant',
        'university' => 'University Funding',
        'private' => 'Private Sector',
        'other' => 'Other'
    ),
    'order' => 5,
    'enable' => true,
    'data_type' => 'string',
)
```

### Email Field
```php
'contact_email' => array(
    'name' => 'contact_email',
    'type' => 'email',
    'title' => 'Contact Email',
    'required' => true,
    'validation' => 'required|valid_email',
    'help_text' => 'Email for research correspondence',
    'placeholder' => 'researcher@institution.edu',
    'order' => 6,
    'enable' => true,
    'data_type' => 'string',
)
```

### Number Field
```php
'team_size' => array(
    'name' => 'team_size',
    'type' => 'number',
    'title' => 'Research Team Size',
    'required' => false,
    'help_text' => 'Number of researchers in your team',
    'placeholder' => '1',
    'order' => 7,
    'enable' => true,
    'data_type' => 'int',
)
```

### Date Field
```php
'project_start' => array(
    'name' => 'project_start',
    'type' => 'date',
    'title' => 'Project Start Date',
    'required' => false,
    'help_text' => 'When will your research project begin?',
    'order' => 8,
    'enable' => true,
    'data_type' => 'string',
)
```

### URL Field
```php
'project_website' => array(
    'name' => 'project_website',
    'type' => 'url',
    'title' => 'Project Website',
    'required' => false,
    'validation' => 'valid_url',
    'help_text' => 'Website for your research project',
    'placeholder' => 'https://your-project.org',
    'order' => 9,
    'enable' => true,
    'data_type' => 'string',
)
```

### Phone Field
```php
'contact_phone' => array(
    'name' => 'contact_phone',
    'type' => 'phone',
    'title' => 'Contact Phone',
    'required' => false,
    'help_text' => 'Phone number for research inquiries',
    'placeholder' => '+1-555-123-4567',
    'order' => 10,
    'enable' => true,
    'data_type' => 'string',
)
```

## Database Field Types

### Supported Types

| Type | Description | Database Column | Max Length |
|------|-------------|-----------------|------------|
| `string` | Variable length text | `VARCHAR(500)` | 500 characters |
| `text` | Long text | `TEXT` | Unlimited |
| `int` | Integer | `INT(11)` | -2,147,483,648 to 2,147,483,647 |

### Default Behavior
- **String fields**: Always use VARCHAR(500) regardless of validation rules
- **Text fields**: Use TEXT for unlimited length
- **Integer fields**: Use INT(11) for numbers

## Validation Rules

### Built-in Rules

| Rule | Description | Example |
|------|-------------|---------|
| `required` | Field is mandatory | `'required'` |
| `valid_email` | Valid email format | `'required\|valid_email'` |
| `valid_url` | Valid URL format | `'valid_url'` |
| `numeric` | Numeric values only | `'numeric'` |
| `min_length[X]` | Minimum character length | `'min_length[10]'` |
| `max_length[X]` | Maximum character length | `'max_length[150]'` |
| `alpha` | Alphabetic characters only | `'alpha'` |
| `alpha_numeric` | Alphanumeric characters only | `'alpha_numeric'` |
| `alpha_dash` | Alphanumeric with dashes/underscores | `'alpha_dash'` |

### Multiple Rules
Combine rules with the pipe character (`|`):
```php
'validation' => 'required|max_length[150]|alpha_numeric'
```

## Complete Example

Here's a complete configuration with multiple field types:

```php
<?php
$config['public_request_fields'] = array(
    
    // Research Institution
    'institution' => array(
        'name' => 'institution',
        'type' => 'text',
        'title' => 'Research Institution',
        'required' => true,
        'validation' => 'required|max_length[150]',
        'help_text' => 'Name of your research institution or organization',
        'placeholder' => 'Enter institution name',
        'order' => 1,
        'enable' => true,
        'data_type' => 'string',
    ),
    
    // Research Type
    'research_type' => array(
        'name' => 'research_type',
        'type' => 'select',
        'title' => 'Type of Research',
        'required' => true,
        'validation' => 'required',
        'help_text' => 'Select the type of research you will be conducting',
        'enum' => array(
            'academic' => 'Academic Research',
            'policy' => 'Policy Analysis',
            'commercial' => 'Commercial Research',
            'government' => 'Government Research',
            'ngo' => 'NGO/Non-profit Research',
            'other' => 'Other'
        ),
        'order' => 2,
        'enable' => true,
        'data_type' => 'string',
    ),
    
    // Research Description
    'research_description' => array(
        'name' => 'research_description',
        'type' => 'textarea',
        'title' => 'Research Description',
        'required' => false,
        'help_text' => 'Brief description of your research methodology',
        'placeholder' => 'Describe your research approach...',
        'order' => 3,
        'enable' => true,
        'data_type' => 'text',
    ),
    
    // Contact Email
    'contact_email' => array(
        'name' => 'contact_email',
        'type' => 'email',
        'title' => 'Contact Email',
        'required' => true,
        'validation' => 'required|valid_email',
        'help_text' => 'Email for research correspondence',
        'placeholder' => 'researcher@institution.edu',
        'order' => 4,
        'enable' => true,
        'data_type' => 'string',
    ),
    
    // Team Size
    'team_size' => array(
        'name' => 'team_size',
        'type' => 'number',
        'title' => 'Research Team Size',
        'required' => false,
        'help_text' => 'Number of researchers in your team',
        'placeholder' => '1',
        'order' => 5,
        'enable' => true,
        'data_type' => 'int',
    ),
    
    // Data Sharing Agreement
    'data_sharing' => array(
        'name' => 'data_sharing',
        'type' => 'checkbox',
        'title' => 'Data Sharing Agreement',
        'required' => true,
        'help_text' => 'I agree to share my research findings',
        'order' => 6,
        'enable' => true,
        'data_type' => 'int',
    ),
);
```

## Managing Custom Fields

### Adding New Fields

1. **Edit Configuration**: Open `application/config/public_request_fields.php`
2. **Add Field Definition**: Add a new array entry with field properties
3. **Set Enable**: Set `'enable' => true` to activate the field
4. **Save File**: The field will be automatically added to the database on next form submission

### Disabling Fields

Set `'enable' => false` to hide a field from the form:
```php
'old_field' => array(
    'name' => 'old_field',
    'type' => 'text',
    'title' => 'Old Field',
    'enable' => false,  // Field will not appear in form
    // ... other properties
)
```

### Modifying Fields

1. **Change Properties**: Update any field properties in the configuration
2. **Database Updates**: Field changes are applied automatically
3. **Existing Data**: Existing data is preserved when modifying fields

### Reordering Fields

Change the `order` property to control field display order:
```php
'field1' => array(
    'order' => 1,  // Appears first
    // ...
),
'field2' => array(
    'order' => 2,  // Appears second
    // ...
)
```

## Database Management

### Automatic Field Creation

Custom fields are automatically added to the database when:
- A form is submitted with custom fields
- The field doesn't exist in the `public_requests` table
- The field is enabled in the configuration

### Field Types in Database

| Config Type | Database Type | Description |
|-------------|---------------|-------------|
| `string` | `VARCHAR(500)` | Fixed-length text field |
| `text` | `TEXT` | Unlimited text field |
| `int` | `INT(11)` | Integer field |

### Cross-Database Support

The system works with both:
- **MySQL**: Uses `VARCHAR(500)`, `TEXT`, `INT(11)`
- **SQL Server**: Uses `VARCHAR(500)`, `VARCHAR(MAX)`, `INT`

### Manual Database Field Creation

In some cases, automatic field creation may fail due to:
- **Database Permissions**: User account lacks ALTER TABLE permissions
- **Database Lock**: Table is locked by another process
- **Connection Issues**: Database connection problems
- **Server Configuration**: Database server restrictions

#### When Manual Creation is Needed

1. **Permission Errors**: Database user lacks ALTER TABLE privileges
2. **Production Environments**: Stricter security policies
3. **Database Hosting**: Managed database services with limited permissions
4. **Audit Requirements**: Organizations requiring manual database changes

#### Manual Field Addition Process

##### Step 1: Identify Required Fields

Check your configuration file to identify fields that need to be added:

```php
// In application/config/public_request_fields.php
$config['public_request_fields'] = array(
    'institution' => array(
        'name' => 'institution',        // Database column name
        'data_type' => 'string',        // Database field type
        // ...
    ),
    'research_type' => array(
        'name' => 'research_type',      // Database column name
        'data_type' => 'string',        // Database field type
        // ...
    ),
);
```

##### Step 2: Generate SQL Commands

Based on your configuration, generate the appropriate SQL commands:

**For MySQL:**
```sql
-- String fields (VARCHAR(500))
ALTER TABLE public_requests ADD COLUMN institution VARCHAR(500) NULL;
ALTER TABLE public_requests ADD COLUMN research_type VARCHAR(500) NULL;

-- Text fields (TEXT)
ALTER TABLE public_requests ADD COLUMN research_description TEXT NULL;

-- Integer fields (INT)
ALTER TABLE public_requests ADD COLUMN team_size INT(11) NULL;
```

**For SQL Server:**
```sql
-- String fields (VARCHAR(500))
ALTER TABLE public_requests ADD institution VARCHAR(500) NULL;
ALTER TABLE public_requests ADD research_type VARCHAR(500) NULL;

-- Text fields (VARCHAR(MAX))
ALTER TABLE public_requests ADD research_description VARCHAR(MAX) NULL;

-- Integer fields (INT)
ALTER TABLE public_requests ADD team_size INT NULL;
```

##### Step 3: Execute SQL Commands

**Option A: Database Management Tool**
1. Connect to your database using phpMyAdmin, MySQL Workbench, or SQL Server Management Studio
2. Select the NADA database
3. Execute the ALTER TABLE commands
4. Verify the columns were added successfully

**Option B: Command Line**
```bash
# MySQL
mysql -u username -p database_name < add_custom_fields.sql

# SQL Server
sqlcmd -S server_name -d database_name -i add_custom_fields.sql
```



##### Step 4: Verify Field Creation

Check that the fields were added successfully:

**MySQL:**
```sql
DESCRIBE public_requests;
-- or
SHOW COLUMNS FROM public_requests;
```

**SQL Server:**
```sql
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'public_requests';
```

#### Field Type Mapping Reference

Use this reference to determine the correct SQL syntax:

| Config Type | MySQL Column | SQL Server Column | Nullable |
|-------------|--------------|-------------------|----------|
| `string` | `VARCHAR(500) NULL` | `VARCHAR(500) NULL` | Yes |
| `text` | `TEXT NULL` | `VARCHAR(MAX) NULL` | Yes |
| `int` | `INT(11) NULL` | `INT NULL` | Yes |

## Reports and Administration

### Public Requests Report

Custom fields automatically appear in:
- **Admin Reports**: Go to site administration > reports and select `Public Requests` report
- **Data Export**: All custom field data is included in exports

