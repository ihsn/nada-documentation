<template>
  <div class="showcase-strip">
    <p class="showcase-strip__label">Trusted by leading organizations worldwide</p>
    <div class="showcase-strip__orgs">
      <a
        v-for="item in featured"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="showcase-strip__org"
      >{{ item.org || item.name }}</a>
    </div>
    <a :href="showcasePage" class="showcase-strip__link">View all deployments →</a>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { showcaseItems } from '../../data/showcase'

const featured = showcaseItems.filter(i => i.category !== 'Demo')
const showcasePage = withBase('/showcase/')
</script>
