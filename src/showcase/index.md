---
layout: page
title: Showcase
description: Organizations around the world using NADA to publish and manage their data catalogs.
sidebar: false
---

<script setup>
import { withBase } from 'vitepress'
import { showcaseItems } from '../.vitepress/data/showcase'
</script>

<div class="showcase-page">

<h1>Showcase</h1>

<div class="showcase-grid">
  <a
    v-for="item in showcaseItems"
    :key="item.name"
    :href="item.url"
    target="_blank"
    rel="noopener noreferrer"
    class="showcase-card"
  >
    <div v-if="item.screenshot" class="showcase-card__thumb">
      <img :src="withBase(item.screenshot)" :alt="item.name" loading="lazy" />
    </div>
    <div class="showcase-card__body">
      <p v-if="item.org" class="showcase-card__org">{{ item.org }}</p>
      <h2 class="showcase-card__name">{{ item.name }}</h2>
      <span class="showcase-card__link">Visit catalog ↗</span>
    </div>
  </a>
</div>

</div>
