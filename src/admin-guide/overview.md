# Overview

For a NADA catalog administrator, the process of publishing data and
metadata consists of:

1.  **Documenting the dataset**. Generating structured
    metadata compliant with one of the supported standards and schemas.
    List: Where to find documentation: The metadata can be generated
    using specialized software, using programming languages (like R or
    Python), or in the NADA administrator interface.

    a.  For microdata, a specialized metadata editor will most often be
        used. The metadata must comply with the *DDI Codebook* standard.
        This is complex and include summary statistics. Doing this
        manually is a tedious process.

    b.  Using a programming language like R or Python. Most appropriate
        for documents, images, videos, etc. and when automation is
        useful.

    c.  Using the NADA administrator interface. Not a complete product,
        not all options. But for simple documentation, convenient.

2. **Publishing the metadata** in NADA, using the NADA
administrator interface or programmatically with the NADA API and NADAR
or PyNADA.

3. **Uploading external resources** (files or links) to
be made accessible in the catalog, with a brief description. These
resources will be described using the **external resources** schema.

4. **Defining an access policy** that applies to the dataset,
when relevant. This will determine how users can obtain access to the
data (direct access, access from another repository, licensed access, no
access, or other). This typically applies to microdata and geographic
datasets.