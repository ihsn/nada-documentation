# Widgets API

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/widgets/` | GET | Public | List all widgets |
| `/api/widgets/{uuid}` | GET | Public | Get single widget |
| `/api/widgets/{uuid}` | POST | Admin | Create/update widget |
| `/api/widgets/{uuid}` | DELETE | Admin | Delete widget |
| `/api/widgets/delete/{uuid}` | POST | Admin | Delete widget (alias) |
| `/api/widgets/attach_to_study` | POST | Admin | Attach widget to study |
| `/api/widgets/detach_study` | POST | Admin | Detach widget from study |
| `/api/widgets/by_dataset/{idno}` | GET | Public | Get widgets by dataset |


### 1. List All Widgets

**Endpoint:** `GET /api/widgets/`

**Authentication:** Public (no authentication required)

**Example Request:**
```bash
curl -X GET "https://your-catalog-url.com/api/widgets/" \
  -H "Accept: application/json"
```

**Example Response:**
```json
{
  "total": 3,
  "records": [
    {
      "id": 1,
      "uuid": "abc123-def456-ghi789",
      "title": "Sample Line Chart",
      "description": "A basic line chart visualization",
      "thumbnail": "thumbnail.png",
      "thumbnail_url": "https://your-catalog-url.com/files/embed/.../thumbnail.png",
      "storage_path": "5d41402abc4b2a76b9719d911017c592",
      "published": 1,
      "changed": "1704067200",
      "created": "1703980800",
      "link": "https://your-catalog-url.com/widgets/view/abc123-def456-ghi789"
    }
  ]
}
```

*[List Widgets API — screenshot asset not in repo: `screenshots/api-list-widgets.png`]*

---

### 2. Get Single Widget

**Endpoint:** `GET /api/widgets/{uuid}`

**Authentication:** Public

**Example Request:**
```bash
curl -X GET "https://your-catalog-url.com/api/widgets/abc123-def456-ghi789" \
  -H "Accept: application/json"
```

**Example Response:**
```json
{
  "record": {
    "id": 1,
    "uuid": "abc123-def456-ghi789",
    "title": "Sample Line Chart",
    "description": "A basic line chart visualization",
    "thumbnail": "thumbnail.png",
    "storage_path": "5d41402abc4b2a76b9719d911017c592",
    "published": 1,
    "created": "1703980800",
    "changed": "1704067200",
    "full_path": "files/embed/5d41402abc4b2a76b9719d911017c592",
    "link": "https://your-catalog-url.com/widgets/view/abc123-def456-ghi789",
    "related_studies": [
      {
        "sid": 123,
        "idno": "STUDY-001",
        "link": "https://your-catalog-url.com/catalog/123"
      }
    ]
  }
}
```

---

### 3. Create Widget

**Endpoint:** `POST /api/widgets/{uuid}`

**Authentication:** Admin required

**Parameters:**
- `uuid` (path parameter): Unique identifier for the widget (alphanumeric and dashes only, max 100 characters)
- `title` (form data): Widget title (required, max 255 characters)
- `description` (form data): Widget description (optional, max 500 characters)
- `thumbnail` (form data): Thumbnail filename (optional, max 200 characters)
- `file` (form data): ZIP file containing widget files (required)
- `overwrite` (form data): Set to "yes" to overwrite existing widget (optional)

**Example Request using cURL:**
```bash
curl -X POST "https://your-catalog-url.com/api/widgets/my-widget-uuid-001" \
  -H "X-API-KEY: your-api-key" \
  -H "Accept: application/json" \
  -F "title=My Line Chart Widget" \
  -F "description=An interactive line chart showing data trends" \
  -F "thumbnail=thumbnail.png" \
  -F "file=@/path/to/my-widget.zip" \
  -F "overwrite=yes"
```

**Example Response:**
```json
{
  "status": "success",
  "options": {
    "title": "My Line Chart Widget",
    "description": "An interactive line chart showing data trends",
    "thumbnail": "thumbnail.png",
    "uuid": "my-widget-uuid-001"
  },
  "result": {
    "folder": "5d41402abc4b2a76b9719d911017c592",
    "uuid": "my-widget-uuid-001",
    "link": "https://your-catalog-url.com/widgets/view/my-widget-uuid-001"
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "VALIDATION_ERROR: The Title field is required."
}
```

*[Create Widget API — screenshot asset not in repo: `screenshots/api-create-widget.png`]*

---

### 4. Update Widget

**Endpoint:** `POST /api/widgets/{uuid}` (same as create)

**Authentication:** Admin required

Updating a widget uses the same endpoint as creating. If a widget with the specified UUID already exists, it will be updated. Include `overwrite=yes` in your request.

**Example Request:**
```bash
curl -X POST "https://your-catalog-url.com/api/widgets/my-widget-uuid-001" \
  -H "X-API-KEY: your-api-key" \
  -H "Accept: application/json" \
  -F "title=Updated Widget Title" \
  -F "description=Updated description" \
  -F "file=@/path/to/updated-widget.zip" \
  -F "overwrite=yes"
```

---

### 5. Delete Widget

**Endpoint:** `DELETE /api/widgets/{uuid}` or `POST /api/widgets/delete/{uuid}`

**Authentication:** Admin required

**Example Request (DELETE):**
```bash
curl -X DELETE "https://your-catalog-url.com/api/widgets/my-widget-uuid-001" \
  -H "X-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

**Example Request (POST alias):**
```bash
curl -X POST "https://your-catalog-url.com/api/widgets/delete/my-widget-uuid-001" \
  -H "X-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

**Example Response:**
```json
{
  "status": "success"
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "RECORD_NOT_FOUND"
}
```

*[Delete Widget API — screenshot asset not in repo: `screenshots/api-delete-widget.png`]*

---

### 6. Get Widgets by Dataset

**Endpoint:** `GET /api/widgets/by_dataset/{idno}`

**Authentication:** Public

**Parameters:**
- `idno` (path parameter): Study/dataset identifier or IDNO

**Query Parameters:**
- `id_format` (optional): Set to "id" if passing study ID instead of IDNO

**Example Request:**
```bash
curl -X GET "https://your-catalog-url.com/api/widgets/by_dataset/STUDY-001" \
  -H "Accept: application/json"
```

**Example Request with Study ID:**
```bash
curl -X GET "https://your-catalog-url.com/api/widgets/by_dataset/123?id_format=id" \
  -H "Accept: application/json"
```

**Example Response:**
```json
{
  "record": [
    {
      "id": 1,
      "uuid": "abc123-def456-ghi789",
      "title": "Sample Line Chart",
      "description": "A basic line chart visualization",
      "link": "https://your-catalog-url.com/widgets/view/abc123-def456-ghi789"
    }
  ]
}
```

---

## Previewing Widgets

### Web Interface Preview

You can preview widgets through the web interface at:

**Widget Info Page:**
```
https://your-catalog-url.com/widgets/view/{uuid}
```

This page displays widget information, metadata, and related studies.

*[Widget View Page — screenshot asset not in repo: `screenshots/widget-view-page.png`]*

**Embed Preview:**
```
https://your-catalog-url.com/widgets/embed/{uuid}
```

This page shows the widget as it would appear when embedded, with responsive iframe support via pym.js.

*[Widget Embed Preview — screenshot asset not in repo: `screenshots/widget-embed-preview.png`]*

**Widgets List:**
```
https://your-catalog-url.com/widgets/
```

Browse all available widgets in the catalog.

*[Widgets List Page — screenshot asset not in repo: `screenshots/widgets-list-page.png`]*

---

## Attaching Widgets to Studies

Widgets can be attached to studies, making them appear on study pages.

### Attach Widget to Study

**Endpoint:** `POST /api/widgets/attach_to_study`

**Authentication:** Admin required

**Request Body (JSON):**
```json
{
  "uuid": "abc123-def456-ghi789",
  "idno": "STUDY-001"
}
```

**Example Request:**
```bash
curl -X POST "https://your-catalog-url.com/api/widgets/attach_to_study" \
  -H "X-API-KEY: your-api-key" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "uuid": "abc123-def456-ghi789",
    "idno": "STUDY-001"
  }'
```

**Example Response:**
```json
{
  "status": "success",
  "options": {
    "uuid": "abc123-def456-ghi789",
    "idno": "STUDY-001"
  },
  "result": true
}
```

### Detach Widget from Study

**Endpoint:** `POST /api/widgets/detach_study`

**Authentication:** Admin required

**Request Body (JSON):**
```json
{
  "uuid": "abc123-def456-ghi789",
  "idno": "STUDY-001"
}
```

**Example Request:**
```bash
curl -X POST "https://your-catalog-url.com/api/widgets/detach_study" \
  -H "X-API-KEY: your-api-key" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "uuid": "abc123-def456-ghi789",
    "idno": "STUDY-001"
  }'
```

**Example Response:**
```json
{
  "status": "success",
  "options": {
    "uuid": "abc123-def456-ghi789",
    "idno": "STUDY-001"
  },
  "result": true
}
```

*[Detach Widget from Study — screenshot asset not in repo: `screenshots/detach-widget-study.png`]*

---

## Managing Widgets

### Widget Metadata

Each widget has the following metadata fields:

- **UUID**: Unique identifier (alphanumeric and dashes, max 100 chars)
- **Title**: Widget title (required, max 255 chars)
- **Description**: Widget description (optional, max 500 chars)
- **Thumbnail**: Thumbnail image filename (optional, max 200 chars)
- **Storage Path**: Auto-generated MD5 hash of UUID
- **Published**: Publication status (0 or 1)
- **Created**: Creation timestamp (Unix timestamp)
- **Changed**: Last modification timestamp (Unix timestamp)
- **Related Studies**: List of studies the widget is attached to

### Widget Lifecycle

1. **Create**: Upload widget ZIP file via API
2. **Update**: Re-upload with same UUID (use `overwrite=yes`)
3. **Attach**: Link widget to one or more studies
4. **Preview**: View widget in web interface
5. **Delete**: Remove widget and all associations

### Best Practices

- **UUID Naming**: Use descriptive, unique UUIDs (e.g., `line-chart-population-2024`)
- **File Organization**: Keep widget files organized in subfolders if needed
- **Responsive Design**: Ensure widgets work on mobile and desktop
- **Performance**: Optimize images and minimize JavaScript bundle size
- **Testing**: Test widgets locally before uploading
- **Height**: Always use fixed pixel heights (e.g., `500px`) instead of percentage heights

---

## Advanced Features

### Responsive Iframe Embedding

Widgets are automatically enhanced with pym.js for responsive iframe embedding. The embed endpoint automatically injects:

```html
<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"><\/script>
<script>window.onload = function () {var pymChild = new pym.Child();}<\/script>
```

This ensures widgets automatically resize to fit their container.

### External Libraries

You can use external CDN libraries in your widgets. Common libraries include:

- **ECharts**: `https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js`
- **D3.js**: `https://d3js.org/d3.v7.min.js`
- **Chart.js**: `https://cdn.jsdelivr.net/npm/chart.js`
- **jQuery**: `https://code.jquery.com/jquery-3.6.0.min.js`
- **Bootstrap 5**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`

### Dependencies and Version Compatibility

**Important Dependency Changes:**

- **Versions prior to 5.5.1**: jQuery and Bootstrap 4 or 5 are required and you must include them in your widget.
- **Version 5.5.1 and later**: These dependencies are **removed** from the widget environment. 

**Including Dependencies:**

You can include dependencies in two ways:

1. **Via CDN** (recommended for most cases):
```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"><\/script>

<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

2. **Bundled in ZIP file** (for offline use or version control):
   - Download jQuery and Bootstrap files
   - Include them in your widget ZIP file
   - Reference them with relative paths in your HTML

**Height Requirements:**

Widgets must use **fixed pixel heights** (e.g., `500px`, `400px`) instead of percentage heights (e.g., `100%`, `100vh`). Percentage heights will cause the widget to not render correctly in the embedded iframe.

**Correct:**
```html
<div id="chart-container" style="width: 100%; height: 500px;"></div>
```

**Incorrect:**
```html
<div id="chart-container" style="width: 100%; height: 100%;"></div>
```

### Data Fetching

For your widgets, you can use APIs to fetch data using javascript.

```javascript
// Fetch data via API
fetch('https://example.com/api/data')
  .then(response => response.json())
  .then(data => {
    // Process and display data
  });
```

### Thumbnail Images

Include a thumbnail image in your widget ZIP file and reference it in the `thumbnail` field when creating the widget. The thumbnail will be displayed in widget listings.

---

## Troubleshooting

### Common Issues

#### 1. "ZIP does not contain an HTML file"

**Problem:** Your ZIP file doesn't contain any HTML files.

**Solution:** Ensure your ZIP contains at least one `.html` file. The system will automatically rename the first HTML file to `index.html` if needed.

#### 2. "VALIDATION_ERROR: The Title field is required"

**Problem:** Missing required field when creating widget.

**Solution:** Ensure you include the `title` field in your API request. All required fields:
- `title` (required)
- `uuid` (required, in URL path)
- `file` (required, ZIP file)

#### 3. Widget not displaying correctly

**Problem:** Widget appears broken or doesn't load.

**Solutions:**
- Check browser console for JavaScript errors
- Verify all external CDN links are accessible
- Ensure file paths are relative (not absolute)
- Check that `index.html` exists and is valid HTML
- **include jQuery and Bootstrap**: Ensure you've included them in your widget (required for version 5.5 or earlier)
- **If widget height is 0 or not visible**: Check that you're using fixed pixel heights (e.g., `500px`) instead of percentage heights (e.g., `100%`)

#### 3a. Widget height is zero or not rendering

**Problem:** Widget container has no height or doesn't display.

**Cause:** Using percentage-based heights (e.g., `height: 100%`, `height: 100vh`) which don't work correctly in embedded iframes.

**Solution:** Always use fixed pixel heights:
```html
<!-- Correct -->
<div id="chart-container" style="width: 100%; height: 500px;"></div>

<!-- Incorrect -->
<div id="chart-container" style="width: 100%; height: 100%;"></div>
```

Also ensure parent containers have fixed heights if needed:
```css
/* Correct */
.container {
    height: 500px;
}

/* Incorrect */
.container {
    height: 100%;
}
```

#### 4. "ACCESS-DENIED" error

**Problem:** Insufficient permissions for API operation.

**Solution:** Ensure you have admin privileges and a valid API key. Check that your API key is included in the request headers.

#### 5. File upload fails

**Problem:** ZIP file upload returns error.

**Solutions:**
- Verify ZIP file contains only allowed file types (html, js, css, png, jpg, gif, ttf, json)
- Check file size limits
- Ensure ZIP file is not corrupted
- Verify the `file` field name in form data is correct

#### 6. Widget not appearing on study page

**Problem:** Widget is created but doesn't show on study page.

**Solutions:**
- Verify widget is attached to the study using `attach_to_study` endpoint
- Check that the study IDNO is correct
- Verify widget is published (published = 1)
- Check study page template includes widget display code

---

## Examples

### Complete Example: Creating a Widget

```bash
# 1. Create widget files (index.html, style.css, script.js)
# 2. Package into ZIP file
zip -r my-widget.zip index.html style.css script.js

# 3. Create widget via API
curl -X POST "https://your-catalog-url.com/api/widgets/my-widget-001" \
  -H "X-API-KEY: your-api-key" \
  -F "title=My First Widget" \
  -F "description=An example widget" \
  -F "file=@my-widget.zip"

# 4. Attach to study
curl -X POST "https://your-catalog-url.com/api/widgets/attach_to_study" \
  -H "X-API-KEY: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"uuid": "my-widget-001", "idno": "STUDY-001"}'

# 5. Preview widget
# Visit: https://your-catalog-url.com/widgets/view/my-widget-001
```

---

For more information about the widget API, see the API documentation include with NADA by visiting the URL - https://your-nada-catalog/api-documentation/api-documentation/catalog-admin/#operation/createWidget.

