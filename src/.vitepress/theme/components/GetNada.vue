<template>
  <div class="get-nada">
    <div class="get-nada__actions">
      <a
        v-for="item in actions"
        :key="item.title"
        :href="item.external ? item.link : withBase(item.link)"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
        class="get-nada__action"
        :class="{ 'get-nada__action--highlight': item.highlight }"
      >
        <span class="get-nada__action-title">
          <svg
            v-if="item.highlight"
            class="get-nada__action-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2Z"
            />
          </svg>
          {{ item.title }}
        </span>
        <span class="get-nada__action-details">{{ item.details }}</span>
      </a>
    </div>

    <a
      class="get-nada__demo"
      href="https://nada-demo.ihsn.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="get-nada__demo-img"
        :src="withBase('/images/nada_demo_browse.png')"
        alt="Demo NADA Catalog browse and search interface"
      />
      <span class="get-nada__demo-caption">Explore the live demo →</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const actions = [
  {
    title: 'Download',
    details: 'Latest stable builds and release notes on GitHub.',
    link: 'https://github.com/ihsn/nada/releases',
    external: true,
  },
  {
    title: 'System requirements',
    details: 'PHP, database, and web server requirements for self-hosting.',
    link: '/installation-guide/#system-requirements',
  },
  {
    title: 'Installation guide',
    details: 'Install on Linux or Windows, with Docker, or from source.',
    link: '/installation-guide/',
  },
  {
    title: 'Stay up to date',
    details: 'Release notifications, bug reports, and feature requests via GitHub.',
    link: '/intro/community',
    highlight: true,
  },
]
</script>
