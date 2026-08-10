---
layout: home

hero:
  name: NADA
  text: Open Source Data Catalog
  tagline: Discover, access, and publish microdata, indicators, geospatial data, documents, and more — with rich metadata and powerful search.
  actions:
    - theme: brand
      text: Download
      link: https://github.com/ihsn/nada/releases/latest
    - theme: alt
      text: Documentation
      link: /intro/
    - theme: alt
      text: Live Demo
      link: https://nada-demo.ihsn.org/

features:
  - icon:
      src: /images/icon-getting-started.svg
      alt: Getting Started
      width: 40
      height: 40
    title: Getting Started
    details: Start here — learn what NADA is and publish your first catalog entry step by step.
    link: /getting-started/
    linkText: Open documentation
  - icon:
      src: /images/metadata-editor-logo.svg
      alt: Metadata Editor
      width: 48
      height: 28
    title: Metadata Editor
    details: Create and edit structured metadata for surveys and other data types, then publish to NADA.
    link: https://github.com/worldbank/metadata-editor
    linkText: View on GitHub
  - icon:
      src: /images/icon-metadata-standards.svg
      alt: Metadata Standards
      width: 40
      height: 40
    title: Metadata Standards
    details: DDI, Dublin Core, ISO 19115, IPTC, and related standards used to document each NADA data type.
    link: /intro/#metadata-standards-and-schemas
    linkText: Learn more
  - icon:
      src: /images/icon-json-schemas.svg
      alt: JSON Schemas
      width: 40
      height: 40
    title: JSON Schemas
    details: Machine-readable schemas for all NADA-supported data types — validate metadata and build integrations.
    link: https://worldbank.github.io/metadata-schemas/
    linkText: Browse schemas
---

<script setup>
import { withBase } from 'vitepress'

const docLinks = [
  {
    title: 'Introduction',
    details: 'What NADA is, the data types it supports, and the metadata standards behind it.',
    link: '/intro/',
  },
  {
    title: 'Installation',
    details: 'Install on Linux or Windows, with Docker, or from source.',
    link: '/installation-guide/',
  },
  {
    title: 'Getting Started',
    details: 'Publish your first microdata, document, indicator, or geospatial entry.',
    link: '/getting-started/',
  },
  {
    title: 'Admin Guide',
    details: 'Manage content, users, collections, and site-wide settings.',
    link: '/admin-guide/overview',
  },
  {
    title: 'API & Automation',
    details: 'REST API plus NADAR and PyNADA for programmatic catalog work.',
    link: '/api-guide/',
  },
]
</script>

<div class="home-content">

## Get NADA

<GetNada />

## Documentation

<nav class="home-doc-list" aria-label="Documentation">
  <a
    v-for="item in docLinks"
    :key="item.title"
    :href="withBase(item.link)"
    class="home-doc-list__item"
  >
    <span class="home-doc-list__title">{{ item.title }}</span>
    <span class="home-doc-list__details">{{ item.details }}</span>
  </a>
</nav>

</div>
