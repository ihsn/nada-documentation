# Overview

For a NADA catalog administrator, the process of publishing data and metadata consists of:

1.  **Documenting the dataset**. Generating structured metadata compliant with one of the supported standards and schemas, documented at https://ihsn.github.io/nada-api-redoc/catalog-admin/# (and in the Schema Guide). The metadata can be generated using specialized software (metadata editors), using programming languages (like R or Python), or directly in NADA using the administrator interface (for all data types except geospatial). For microdata and for geographic datasets, it is highly recommended to make use of a specialized metadata editor, due to the complexity of the metadata standard. For other types of data, the use of a programming language like R or Python offers a powerful and higly-flexible option, recommended for automating tasks and when there is a need to "augment" metadata for example using machine learning solutions. The NADA administrator interface provides a user-friendly option to generate metadata, but should not be the preferred option as it does not provide (in its current version) the advanced functionalites of specialized metadata editors (especially for microdata), and the flexibility and reproducibility that the API option provides. 

2. **Publishing the metadata** in NADA, using the NADA administrator interface or programmatically with the NADA API and NADAR or PyNADA.

3. **Uploading external resources** (files or links) to be made accessible in the catalog, with a brief description. These resources will be described using the **external resources** schema.

4. **Defining an access policy** that applies to the dataset, when relevant. This will determine how users can obtain access to the data (direct access, access from another repository, licensed access, no access, or other). This typically applies to microdata and geographic datasets.
