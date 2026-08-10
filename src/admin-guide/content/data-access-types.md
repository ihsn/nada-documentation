# Data access types

NADA allows administrators to control how users can access data on a study-by-study basis. Seven access types are available, ranging from unrestricted open access to metadata-only publication.

All access types that serve data files display terms and conditions to users before they can proceed. The terms text for each access type can be customized by administrators to reflect their organization's policies and requirements via **Admin > Settings > Translate**.

## Quick reference

| Access type | Login required | User action | Admin approval | Data served from |
|---|---|---|---|---|
| Open access | No | Accept terms | No | NADA |
| Direct access | No | Accept terms | No | NADA |
| Public Use Files | Yes | Fill request form | No | NADA |
| Licensed data | Yes | Submit application | **Yes** | NADA |
| External repository | No | Click link | No | External site |
| Data enclave | No | Download PDF form | No (offline) | Secure facility |
| Data not available | — | — | — | — |

---

## Open access

Open access data can be downloaded and used by anyone, with virtually no restrictions. Like direct access, no login is required and users simply accept terms before downloading. The key distinction from direct access is that open access datasets should be published in **open, non-proprietary file formats** — such as CSV or plain text — rather than software-specific formats like SPSS (`.sav`) or Stata (`.dta`). This ensures the data is truly accessible without requiring users to have licensed software.

**User experience**

1. User visits the dataset page — no login required.
2. User is shown the open data license terms and clicks to accept.
3. Data files are listed and can be downloaded immediately.

No personal information is collected from the user.

**Admin workflow**

Set the access type to *Open access* in the dataset's Overview tab. No further configuration is needed. Ensure the data files are uploaded in open formats (CSV, etc.) and properly tagged as data files in the Resources tab — the access policy applies only to files tagged as data files.

**Terms & conditions**

Yes. Terms are shown before the download list appears (language key: `open_data_lang`).

**When to use**

Use open access when the data carries no use restrictions and is published under an open license. Prepare the data files in open formats (CSV, JSON, GeoJSON, etc.) before publishing so that any user can work with the data regardless of the software they have available.

---

## Direct access

Direct access datasets can be downloaded by anyone without registration, but the use of the data is subject to conditions (e.g., no commercial use, citation required, no re-identification of respondents).

**User experience**

1. User visits the dataset page — no login required.
2. User is shown a terms and conditions page and must accept before proceeding.
3. Data files are listed and can be downloaded immediately.

As with open access, no personal information is collected from the user.

**Admin workflow**

Set the access type to *Direct access* in the dataset's Overview tab. No approval workflow is involved. Ensure data files are correctly tagged in the Resources tab.

**Terms & conditions**

Yes. Terms are shown before the download list appears, covering restrictions on redistribution, commercial use, re-identification of respondents, and citation requirements (language key: `direct_access_terms_lang`).

**When to use**

Use direct access when you want anyone to be able to download the data, but with explicit conditions of use — and when the data is distributed in software-specific formats such as SPSS or Stata. If the data is instead published in open formats with no use restrictions, use *Open access*.

---

## Public Use Files (PUF)

Public Use Files are available to any registered user who fills in a brief request form describing their intended use. No administrator approval is required — access is granted automatically once the form is submitted.

**User experience**

1. User visits the dataset page. If not logged in, they are prompted to log in or register.
2. After logging in, user is shown the terms and conditions.
3. User fills in a request form providing their name, organization, email address, and a description of their intended use of the data.
4. On submission, access is granted immediately and the data files are listed for download.

Once submitted, the user does not need to fill the form again for the same dataset on subsequent visits.

**Admin workflow**

Set the access type to *Public use files* in the dataset's Overview tab. No approval step is required — requests are automatically approved. Submitted requests are logged and can be reviewed in **Admin > Reports**.

Optional: Additional custom fields can be added to the request form (e.g., research institution, project type). See [Custom fields for public data access requests](/installation-guide/configurations/custom-public-access-fields).

**Terms & conditions**

Yes. Terms are shown before the request form, covering redistribution, research use, re-identification, and citation requirements (language key: `public_access_terms_lang`).

**Collection-level access**

Public use access can also be granted at the collection level (bulk access), allowing users to request access to all PUF datasets within a collection in a single step. See [Bulk data access](/admin-guide/web-ui/bulk-data-access).

::: tip
Use public use files when you want to track who is accessing the data and for what purpose, but do not need to review and approve each request individually.
:::

---

## Licensed data

Licensed data requires users to submit a formal application that must be reviewed and approved by an administrator before any data files can be downloaded. This type is suited for sensitive or confidential datasets where access must be carefully controlled.

**User experience**

1. User visits the dataset page. If not logged in, they are prompted to log in or register.
2. User fills in a detailed application form that typically includes:
   - Organization and contact details
   - Description of the intended use of the data
   - Expected outputs and completion date
   - Research team information
3. The application is submitted and the user sees a pending status.
4. An email notification is sent to the site administrator.
5. Once the administrator reviews and approves the request, the user is notified by email.
6. User can then return to the dataset page and download the approved files.

Users can track the status of their request at any time by visiting their request page.

**Admin workflow**

Pending requests appear as alerts in the administrator dashboard and in **Admin > Studies > Licensed requests**.

For each request, the administrator can:

- **Approve** — grant access to specific files, optionally setting a maximum number of downloads per file and an expiry date.
- **Deny** — reject the request with a comment sent to the applicant.
- **Request more information** — send a message to the applicant asking for clarification before deciding.
- **Forward** — forward the request to another administrator for review.

Download activity for approved requests (which files were downloaded, how many times, and when) can be monitored from the licensed request detail page.

See [Managing licensed data requests](/admin-guide/web-ui/licensed-requests) for the full workflow.

**Terms & conditions**

Yes. Terms are shown before the application form (language key: `licensed_access_form_lang`).

**When to use**

Use licensed access for datasets that are sensitive, contain potentially identifiable information, or are subject to legal or donor restrictions. This type provides the highest level of access control while still enabling online requests and approvals.

---

## External repository (remote)

The external repository type allows administrators to publish metadata for a dataset in NADA while directing users to another website for access to the actual data. No files are stored in or served from NADA.

**User experience**

1. User visits the dataset page and reads the metadata.
2. A link to the external repository is displayed on the data access section of the page.
3. Clicking the link takes the user to the external site, where that site's access process applies.

No login is required in NADA. No terms are shown by NADA.

**Admin workflow**

Set the access type to *External repository* and enter the URL of the external data source in the **Link** field in the dataset's Overview tab. The URL is stored in the `link_da` field and displayed to users on the dataset page.

**When to use**

Use this type when:
- The dataset originates from or is officially hosted in another repository.
- You want to improve discoverability by listing the dataset in your NADA catalog, but the data owner manages access directly.
- The external repository has its own access workflow (e.g., licensed access managed by another institution).

---

## Data enclave

The data enclave type is used for datasets where access is restricted to a secure, supervised computing environment. Users cannot download data; instead, they must apply to visit or connect to the enclave facility.

**User experience**

1. User visits the dataset page and reads the metadata.
2. The data access section displays a description of the enclave and instructions for access.
3. A link to a downloadable PDF application form is provided.
4. The user submits the completed form offline to the data archive.

All subsequent steps (review, approval, scheduling, supervised data access) are managed outside of NADA.

**Admin workflow**

Set the access type to *Data enclave* in the dataset's Overview tab. There is no online workflow in NADA for managing enclave access. The PDF application form should be placed in the `/files/data_enclave_access.pdf` path on the server.

The description text shown to users (location of the enclave, access procedures, available software, etc.) can be customized via **Admin > Settings > Translate** (key: `data_enclave_lang`).

**When to use**

Use this type for highly confidential datasets where even anonymized data cannot be released outside a controlled environment. Typical use cases include census microdata with detailed geographic identifiers, administrative records linked across multiple sources, or data subject to strict legal access restrictions.

---

## Data not available

This option is used when you want to publish a dataset's metadata and related materials (reports, questionnaires, technical documents) without making any data available for download or access.

**User experience**

The dataset page shows the metadata, documentation, and any external resources that have been published. There is no data access section and no download options for data files.

**Admin workflow**

Set the access type to *Not available* in the dataset's Overview tab. Published metadata and attached documents remain visible to users.

**When to use**

Use this type when:
- Data collection is complete but data processing or anonymization is still in progress.
- The dataset exists but data sharing is not permitted.
- You want to document a historical survey or study for which no data file has survived.
- The study metadata contributes to discoverability or citation tracking even without data access.

---

## Setting the access type

The access type for a dataset is set in the **Overview** tab of the dataset editor in the NADA administrator interface.

1. Go to **Admin > Studies > Manage studies**.
2. Click on the dataset you want to configure.
3. In the **Data access** section of the Overview tab, select the desired access type from the dropdown.
4. For the *External repository* type, also enter the link to the external data source.
5. Click **Update** to save.

::: warning Data files must be correctly tagged
The access policy applies only to files marked as data files in NADA. If a data file is uploaded as a document or other resource type, it will be publicly downloadable regardless of the access type set on the dataset. Always verify the file type in the **Resources** tab.
:::

The access type can be changed at any time. Changing the type does not affect existing approved licensed requests.
