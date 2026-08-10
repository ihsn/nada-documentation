---
layout: home

hero:
  name: NADA
  text: Open Source Data Catalog
  tagline: Discover, access, and publish microdata, indicators, geospatial data, documents, and more — with rich metadata and powerful search.
  image:
    src: /images/nada_cover.jpg
    alt: NADA
  actions:
    - theme: brand
      text: Get Started
      link: /intro/
    - theme: alt
      text: Installation
      link: /installation-guide/
    - theme: alt
      text: GitHub
      link: https://github.com/ihsn/nada

features:
  - icon: 🔍
    title: Powerful Search
    details: Full-text search powered by Apache Solr. Browse and filter by keywords, geographic extent, data type, and custom facets.
    link: /admin-guide/overview
    linkText: Learn more
  - icon: 📊
    title: Multiple Data Types
    details: Catalog microdata, indicators, geospatial data, documents, images, videos, statistical tables, and scripts in one place.
    link: /getting-started/
    linkText: Get started
  - icon: 🏷️
    title: Rich Metadata Standards
    details: Built on DDI, Dublin Core, ISO 19115, and custom schemas. DCAT mappings improve SEO and interoperability.
    link: /intro/
    linkText: Read more
  - icon: 🔒
    title: Flexible Access Control
    details: Publish open data or manage licensed access requests. Control downloads with granular user and collection permissions.
    link: /admin-guide/content/
    linkText: Admin guide
  - icon: ⚙️
    title: API & Automation
    details: Full REST API for automation. Use NADAR (R) or PyNADA (Python) to publish and manage catalog content programmatically.
    link: /api-guide/
    linkText: API guide
  - icon: 🌍
    title: Open Source
    details: Developed by the World Bank Development Data Group. Free to use, self-host, and extend under the MIT license.
    link: https://github.com/ihsn/nada
    linkText: View on GitHub
---

<div class="home-content">

## Latest Release

<div class="release-banner">
  <span class="release-version">v5.6</span>
  <span class="release-date">Latest stable release</span>
  <a href="https://github.com/ihsn/nada/releases" target="_blank" class="release-link">All releases →</a>
</div>

## NADA Around the World

NADA powers data catalogs at national statistics offices, international organizations, and research institutions worldwide.

<ClientOnly>
  <NadaMap />
</ClientOnly>

</div>
