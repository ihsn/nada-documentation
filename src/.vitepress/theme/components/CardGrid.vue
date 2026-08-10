<template>
  <div class="home-card-grid">
    <a
      v-for="card in cards"
      :key="card.title"
      :href="resolveHref(card)"
      :target="card.external ? '_blank' : '_self'"
      :rel="card.external ? 'noopener noreferrer' : undefined"
      class="home-card"
    >
      <div v-if="card.icon" class="home-card__icon">{{ card.icon }}</div>
      <h3 class="home-card__title">{{ card.title }}</h3>
      <p class="home-card__details">{{ card.details }}</p>
      <span class="home-card__arrow">{{ card.external ? '↗' : '→' }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

type Card = {
  icon?: string
  title: string
  details: string
  link: string
  external?: boolean
}

defineProps<{
  cards: Card[]
}>()

function resolveHref(card: Card) {
  return card.external ? card.link : withBase(card.link)
}
</script>
