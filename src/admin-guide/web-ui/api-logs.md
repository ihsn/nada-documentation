# API logs

The API logs page provides an audit trail of all API requests made to NADA. Use it to monitor API usage, troubleshoot integration issues, and review authorization failures.

::: info Screenshot
_Add screenshot: API logs list view with columns for timestamp, method, URI, response code, and authorized status_
:::

## Accessing API logs

Go to **Reports → API logs** in the administrator menu.

## Log fields

Each log entry records:

| Field | Description |
|---|---|
| Timestamp | Date and time of the request |
| Method | HTTP method: GET, POST, PUT, DELETE, or PATCH |
| URI | The API endpoint called |
| Response code | HTTP status code returned |
| Response time | Time taken to process the request |
| Authorized | Whether the request was authenticated |
| IP address | Client IP address |
| User ID | Authenticated user, if any |
| API key | First 10 characters of the key used |

::: info Screenshot
_Add screenshot: API log entry detail view showing all fields_
:::

## Searching and filtering

Use the search box to find entries by keyword across all fields, or select a specific field to target (URI, Method, API Key, IP Address, Authorized, Response Code, User ID).

Filter by date range using the **From** and **To** date pickers.

## Sorting

Click any column header to sort by that field. The default sort is by timestamp, most recent first.

## Log volume

When the API logs table grows large, the page shows a warning with the current row count. Use the **Cleanup** link to archive or delete old entries and maintain query performance.

## Common use cases

- **Troubleshoot a failed integration** — filter by the client's IP or API key and look for non-2xx response codes
- **Audit API key usage** — search by API key to see all requests made with that key
- **Identify unauthorized access attempts** — filter by Authorized = No
